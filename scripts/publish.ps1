param(
  [string]$Message = "",
  [string]$VaultRoot = "D:\Local Knowledge_Base",
  [switch]$DryRun
)

$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$today = Get-Date -Format 'yyyy-MM-dd'
$articlesDir = Join-Path $root 'src\content\articles'
$imagesDir = Join-Path $root 'public\images'
$excludePattern = '\\7 Projects\\BornfreeYan\\|\\.trash\\|\\.obsidian\\|\\.git\\|\\node_modules\\'

function Check-LastExit {
  param([string]$Step)
  if ($LASTEXITCODE -ne 0) {
    throw "$Step 失败 (exit $LASTEXITCODE)"
  }
}

function Get-DatedFiles {
  param([string]$Root, [string]$Date, [string]$Exclude)
  $mdFiles = Get-ChildItem $Root -Recurse -Filter "*.md" -ErrorAction SilentlyContinue | Where-Object {
    $_.FullName -notmatch $Exclude
  }
  $matched = @()
  foreach ($f in $mdFiles) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
    if ($content -match "(?m)^date:\s*['""]?$Date['""]?\s*$") {
      $matched += $f
    }
  }
  return $matched
}

function Fix-FrontmatterQuotes {
  param([string]$Content)
  $lines = $Content -split "`n"
  $inFrontmatter = $false
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line.Trim() -eq '---') { $inFrontmatter = -not $inFrontmatter; continue }
    if (-not $inFrontmatter) { continue }
    if ($line -match '^(\s*[\w-]+\s*:\s*)(.*)$') {
      $prefix = $matches[1]
      $value = $matches[2].Trim()
      if ($value -eq '') { continue }
      if ($value -match '^["'']' -or $value -match '^[\[{]' -or $value -match '^\|') { continue }
      $lines[$i] = "$prefix`"$value`""
    }
  }
  return ($lines -join "`n")
}

function Convert-ImageEmbeds {
  param([string]$Content, [string]$VaultRoot, [string]$BlogImagesDir, [string]$Exclude)
  $imageMap = @{}
  $result = [regex]::Replace($Content, '!\[\[([^\]]+)\]\]', {
    param($m)
    $raw = $m.Groups[1].Value
    $parts = $raw -split '\|'
    $filename = $parts[0].Trim()
    $altText = if ($parts.Count -gt 1) { $parts[1].Trim() } else { [System.IO.Path]::GetFileNameWithoutExtension($filename) }

    $srcPath = ""
    $found = Get-ChildItem $VaultRoot -Recurse -Filter $filename -ErrorAction SilentlyContinue | Where-Object {
      $_.FullName -notmatch $Exclude
    } | Select-Object -First 1
    if ($found) { $srcPath = $found.FullName }

    if (-not $srcPath) {
      Write-Host "  WARNING: 图片未找到: $filename"
      return $m.Value
    }

    if ($imageMap.ContainsKey($srcPath)) {
      $destName = $imageMap[$srcPath]
    } else {
      $baseName = [System.IO.Path]::GetFileName($srcPath)
      $destName = $baseName
      $destPath = Join-Path $BlogImagesDir $destName
      $counter = 1
      while (Test-Path $destPath) {
        $srcHash = (Get-FileHash $srcPath -Algorithm MD5).Hash
        $dstHash = (Get-FileHash $destPath -Algorithm MD5).Hash
        if ($srcHash -eq $dstHash) { break }
        $stem = [System.IO.Path]::GetFileNameWithoutExtension($baseName)
        $ext = [System.IO.Path]::GetExtension($baseName)
        $destName = "${stem}_$counter$ext"
        $destPath = Join-Path $BlogImagesDir $destName
        $counter++
      }
      if (-not (Test-Path $destPath)) {
        Copy-Item $srcPath $destPath -Force
        Write-Host "  图片: $baseName -> public\images\$destName"
      }
      $imageMap[$srcPath] = $destName
    }
    return "![$altText](/images/$destName)"
  })
  return $result
}

Write-Host ""
Write-Host "========== BornfreeYan 发布 =========="
Write-Host "日期: $today"

# [1] 扫描知识库并迁移今日文章
Write-Host "==> [1/5] 扫描知识库迁移今日文章..."
$matchedFiles = Get-DatedFiles -Root $VaultRoot -Date $today -Exclude $excludePattern

if ($matchedFiles.Count -eq 0) {
  Write-Host "    今日（$today）没有文章，跳过迁移"
} else {
  if ($DryRun) {
    Write-Host "    [DRY-RUN] 以下文章将被迁移（未实际执行）："
    foreach ($f in $matchedFiles) {
      Write-Host "      $($f.Name)"
    }
    Write-Host "    共 $($matchedFiles.Count) 篇"
  } else {
    if (-not (Test-Path $articlesDir)) { New-Item -ItemType Directory -Path $articlesDir -Force | Out-Null }
    if (-not (Test-Path $imagesDir)) { New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null }

    $migrated = 0
    foreach ($f in $matchedFiles) {
      $content = Get-Content $f.FullName -Raw -Encoding UTF8
      $outName = [System.IO.Path]::GetFileName($f.FullName) -replace ' ', '-'
      $outFile = Join-Path $articlesDir $outName

      $content = Fix-FrontmatterQuotes $content
      $content = Convert-ImageEmbeds -Content $content -VaultRoot $VaultRoot -BlogImagesDir $imagesDir -Exclude $excludePattern

      [System.IO.File]::WriteAllText($outFile, $content, [System.Text.UTF8Encoding]::new($false))
      Write-Host "  已迁移: $outName"
      $migrated++
    }
    Write-Host "    共迁移 $migrated 篇"
  }
}

if ($DryRun) {
  Write-Host ""
  Write-Host "[DRY-RUN] 仅预览，未迁移、未构建、未发布。"
  exit 0
}

# [2] 构建站点
Write-Host "==> [2/5] 构建站点..."
# 清理旧内容缓存与产物，避免已删除的文章残留
$null = Remove-Item (Join-Path $root 'node_modules\.astro') -Recurse -Force -ErrorAction SilentlyContinue
$null = Remove-Item (Join-Path $root 'dist') -Recurse -Force -ErrorAction SilentlyContinue
pnpm run build
Check-LastExit '构建'

# [3] 提交并推送源码 (main)
Write-Host "==> [3/5] 提交并推送源码 (main)..."
$hasChanges = (git status --porcelain)
if ($hasChanges) {
  $msg = if ($Message) { $Message } else { "blog: update $today" }
  git add -A
  git commit -m $msg
  $null = git push origin main 2>&1
  Check-LastExit 'push main'
} else {
  Write-Host "    无变更，跳过提交"
}

# [4] 发布产物到 gh-pages 分支
Write-Host "==> [4/5] 发布产物到 gh-pages 分支..."
$tmp = Join-Path $env:TEMP 'bfy-deploy'
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
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

# [5] 完成
Write-Host "==> [5/5] 完成"
Write-Host ""
Write-Host "完成! 站点: https://BornfreeYan.github.io"
