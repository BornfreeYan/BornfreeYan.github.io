import { siteConfig } from '../config'

export interface Memo {
  id: string
  text: string
  images: string[]
  createdAt: string
  replyTo?: string
}

interface MemoFile {
  version: number
  memos: Memo[]
}

const TOKEN_KEY = 'bfy_memo_token'
const CDN_URL = (path: string) =>
  `https://cdn.jsdelivr.net/gh/${siteConfig.memoRepo}@${siteConfig.memoBranch}/${path}`
const RAW_URL = (path: string) =>
  `https://raw.githubusercontent.com/${siteConfig.memoRepo}/${siteConfig.memoBranch}/${path}`
const API_FILE_URL = `https://api.github.com/repos/${siteConfig.memoRepo}/contents/${siteConfig.memoFile}`
const API_FILE_REF = `${API_FILE_URL}?ref=${siteConfig.memoBranch}`
const API_IMAGE_URL = (name: string) =>
  `https://api.github.com/repos/${siteConfig.memoRepo}/contents/${siteConfig.memoImagesDir}/${name}`

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) ?? ''
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export async function validateToken(token: string): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch(API_FILE_REF, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (res.ok) return { ok: true }
  if (res.status === 401) return { ok: false, message: 'Token 无效或已过期（bad credentials）' }
  if (res.status === 403) {
    const detail = await res.json().catch(() => null)
    if (detail?.message && /rate limit/i.test(String(detail.message))) {
      return { ok: false, message: 'GitHub API 请求过于频繁，请稍后再试' }
    }
    return { ok: false, message: 'Token 有效但权限不足，需要该仓库 Contents 读写权限' }
  }
  if (res.status === 404) {
    return { ok: false, message: '找不到数据文件，请确认仓库与分支配置' }
  }
  return { ok: false, message: `连接失败（${res.status}）` }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function memoImageUrl(path: string): string {
  return CDN_URL(path)
}

function decodeBase64(b64: string): string {
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export async function fetchMemos(): Promise<Memo[]> {
  const sources: { url: string; auth?: boolean }[] = []
  if (getToken()) {
    sources.push({ url: API_FILE_REF, auth: true })
  }
  sources.push({ url: API_FILE_REF, auth: false })
  sources.push({ url: CDN_URL(siteConfig.memoFile), auth: false })
  sources.push({ url: RAW_URL(siteConfig.memoFile), auth: false })

  for (const { url, auth } of sources) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 8000)
      const headers: Record<string, string> = {}
      if (auth) headers.Authorization = `Bearer ${getToken()}`
      const res = await fetch(url, { signal: controller.signal, headers })
      clearTimeout(timer)
      if (!res.ok) continue
      let file: MemoFile
      if (url === API_FILE_REF) {
        const json = await res.json()
        file = JSON.parse(decodeBase64(json.content))
      } else {
        file = await res.json()
      }
      if (file && Array.isArray(file.memos)) {
        return file.memos.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }
    } catch {
      continue
    }
  }
  return []
}

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function apiRequest(method: string, url: string, body?: unknown): Promise<any> {
  const token = getToken()
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const detail = await res.json().catch(() => null)
    const message = detail?.message ?? `GitHub API 请求失败 (${res.status})`
    throw new ApiError(message, res.status)
  }
  return res.json()
}

async function readMemoFileWithToken(): Promise<{ memos: Memo[]; sha: string | null }> {
  let json: any
  try {
    json = await apiRequest('GET', API_FILE_REF)
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { memos: [], sha: null }
    }
    throw err
  }
  const file: MemoFile = JSON.parse(decodeBase64(json.content))
  return { memos: file.memos ?? [], sha: json.sha }
}

function encodeBase64(content: string): string {
  const bytes = new TextEncoder().encode(content)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

async function writeMemoFile(memos: Memo[], sha: string | null, retried = false): Promise<void> {
  const content = JSON.stringify({ version: 1, memos }, null, 2)
  try {
    await apiRequest('PUT', API_FILE_URL, {
      message: 'memo: update memos',
      content: encodeBase64(content),
      sha: sha ?? undefined,
      branch: siteConfig.memoBranch,
    })
  } catch (err) {
    if (!retried && err instanceof Error && /sha|409|conflict/i.test(err.message)) {
      const latest = await readMemoFileWithToken()
      await writeMemoFile(memos, latest.sha, true)
      return
    }
    throw err
  }
}

export async function postMemo(text: string, images: File[], replyTo?: string): Promise<void> {
  const trimmed = text.trim()
  if (!trimmed && images.length === 0) return

  const id = genId()
  const imagePaths: string[] = []

  for (let i = 0; i < images.length; i++) {
    const name = `${id}-${i + 1}.jpg`
    const compressed = await compressImage(images[i])
    await apiRequest('PUT', API_IMAGE_URL(name), {
      message: `memo: add image ${name}`,
      content: compressed,
      branch: siteConfig.memoBranch,
    })
    imagePaths.push(`${siteConfig.memoImagesDir}/${name}`)
  }

  const { memos, sha } = await readMemoFileWithToken()
  memos.unshift({
    id,
    text: trimmed,
    images: imagePaths,
    createdAt: new Date().toISOString(),
    ...(replyTo ? { replyTo } : {}),
  })
  await writeMemoFile(memos, sha)
}

export async function deleteMemo(id: string): Promise<void> {
  const { memos, sha } = await readMemoFileWithToken()
  const next = memos.filter((m) => m.id !== id)
  await writeMemoFile(next, sha)
}

function genId(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const rand = Math.random().toString(36).slice(2, 5)
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}-${rand}`
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('读取图片失败'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('图片解析失败'))
      img.onload = () => {
        const MAX = 1600
        let { width, height } = img
        if (width > MAX || height > MAX) {
          const scale = MAX / Math.max(width, height)
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('无法创建画布'))
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        resolve(dataUrl.replace(/^data:image\/jpeg;base64,/, ''))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}