param(
  [string]$Title = "",
  [string]$Slug = ""
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dir = Join-Path $root 'src\content\articles'
if (-not (Test-Path $dir)) {
  throw "目录不存在: $dir"
}

if (-not $Title) { $Title = Read-Host '文章标题' }
if (-not $Slug) { $Slug = Read-Host '文件名 slug（英文小写短横线，回车自动用日期）' }

$date = Get-Date -Format 'yyyy-MM-dd'
if (-not $Slug) { $Slug = $date }

$file = Join-Path $dir "$date-$Slug.md"
if (Test-Path $file) {
  throw "文件已存在: $file"
}

$content = @"
---
"title": "$Title"
"date": "$date"
"categories": []
"tags": []
---

"@

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "已创建: $file"
Write-Host "下一步: 填充正文，然后运行 .\scripts\publish.ps1 发布。"