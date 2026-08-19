param(
  [string]$Message = ""
)

$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Check-LastExit {
  param([string]$Step)
  if ($LASTEXITCODE -ne 0) {
    throw "$Step 失败 (exit $LASTEXITCODE)"
  }
}

Write-Host "==> [1/4] 构建站点..."
pnpm run build
Check-LastExit '构建'

Write-Host "==> [2/4] 提交并推送源码 (main)..."
$hasChanges = (git status --porcelain)
if ($hasChanges) {
  $msg = if ($Message) { $Message } else { 'blog: update content' }
  git add -A
  git commit -m $msg
} else {
  Write-Host "    无源码变更，跳过提交"
}
$null = git push origin main 2>&1
Check-LastExit 'push main'

Write-Host "==> [3/4] 发布产物到 gh-pages 分支..."
$tmp = Join-Path $env:TEMP 'bfy-deploy'
if (Test-Path $tmp) {
  Remove-Item $tmp -Recurse -Force
}
$null = git clone --quiet --branch main --single-branch $root $tmp 2>&1
Check-LastExit '临时克隆'
$remoteUrl = (git remote get-url origin).Trim()
$null = git -C $tmp remote set-url origin $remoteUrl 2>&1

Push-Location $tmp
try {
  $null = git checkout --orphan gh-pages 2>&1
  Check-LastExit '创建 gh-pages 分支'
  $null = git rm -rf . --quiet 2>&1
  Set-Content -Path (Join-Path $tmp '.gitignore') -Value "node_modules/`ndist/`n.astro/" -Encoding UTF8
  Copy-Item -Path (Join-Path $root 'dist\*') -Destination $tmp -Recurse -Force
  git add -A
  $null = git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" 2>&1
  Check-LastExit 'gh-pages 提交'
  $null = git push --force origin gh-pages 2>&1
  Check-LastExit 'push gh-pages'
} finally {
  Pop-Location
  Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "==> [4/4] 完成"
Write-Host ""
Write-Host "完成! 站点: https://BornfreeYan.github.io"
Write-Host "提示: 首次发布请先在仓库 Settings > Pages 中设置 Source = Deploy from a branch，选择 gh-pages。"