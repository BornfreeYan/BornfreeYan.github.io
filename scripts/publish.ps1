param(
  [string]$Message = ""
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Invoke-Git {
  param([string[]]$GitArgs)
  & git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') 失败"
  }
}

Write-Host "==> [1/4] 构建站点..."
npm run build
if ($LASTEXITCODE -ne 0) {
  throw "构建失败"
}

Write-Host "==> [2/4] 提交并推送源码 (main)..."
$hasChanges = (git status --porcelain)
if ($hasChanges) {
  $msg = if ($Message) { $Message } else { "blog: update content" }
  git add -A
  git commit -m $msg
} else {
  Write-Host "    无源码变更，跳过提交"
}
Invoke-Git push origin main

Write-Host "==> [3/4] 发布产物到 gh-pages 分支..."
$branchExists = $false
git show-ref --verify --quiet refs/heads/gh-pages
if ($LASTEXITCODE -eq 0) { $branchExists = $true }

if ($branchExists) {
  Invoke-Git checkout gh-pages
} else {
  Invoke-Git checkout --orphan gh-pages
}

Invoke-Git rm -rf . --quiet
Set-Content -Path (Join-Path $root '.gitignore') -Value "node_modules/`ndist/`n.astro/" -Encoding UTF8
Copy-Item -Path (Join-Path $root 'dist\*') -Destination $root -Recurse -Force
Invoke-Git add -A
Invoke-Git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
Invoke-Git push origin gh-pages

Write-Host "==> [4/4] 切回 main..."
Invoke-Git checkout main

Write-Host ""
Write-Host "完成! 站点: https://BornfreeYan.github.io"
Write-Host "提示: 首次发布请先在仓库 Settings > Pages 中设置 Source = Deploy from a branch，选择 gh-pages。"