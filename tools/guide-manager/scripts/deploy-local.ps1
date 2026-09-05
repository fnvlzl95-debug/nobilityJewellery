param([string]$Destination = (Join-Path $env:USERPROFILE 'Desktop\귀족가이드관리'))
$ErrorActionPreference = 'Stop'
$sourceRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$targetRoot = (Resolve-Path -LiteralPath $Destination).Path
$package = Get-Content -LiteralPath (Join-Path $targetRoot 'package.json') -Raw | ConvertFrom-Json
if ($package.name -ne 'noblesse-guide-manager') { throw '대상 폴더가 귀족 가이드 관리 도구가 아닙니다.' }
if (-not (Test-Path -LiteralPath (Join-Path $sourceRoot 'client\dist\index.html'))) { throw '관리 화면 빌드를 먼저 실행하세요.' }
$health = Invoke-RestMethod 'http://127.0.0.1:8788/api/health' -TimeoutSec 10
if ($health.app -ne 'noblesse-guide-manager') { throw '8788 포트의 앱이 일치하지 않습니다.' }
$active = Invoke-RestMethod 'http://127.0.0.1:8788/api/generations' -TimeoutSec 10
if ($active | Where-Object { $_.status -in @('generating','humanizing') }) { throw '진행 중인 원고 작업이 있습니다.' }
$applies = Invoke-RestMethod 'http://127.0.0.1:8788/api/applies' -TimeoutSec 10
if ($applies | Where-Object { $_.state -eq 'running' }) { throw '진행 중인 저장소 반영이 있습니다.' }
$audit = Invoke-RestMethod 'http://127.0.0.1:8788/api/audits/analyze/status' -TimeoutSec 10
if ($audit.state -eq 'running') { throw '진행 중인 전수 분석이 있습니다.' }
$needsInstall = -not (Test-Path -LiteralPath (Join-Path $targetRoot 'node_modules')) -or ((Get-FileHash -LiteralPath (Join-Path $sourceRoot 'package-lock.json')).Hash -ne (Get-FileHash -LiteralPath (Join-Path $targetRoot 'package-lock.json')).Hash)
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupRoot = Join-Path $targetRoot "data\backups\upgrade-$stamp"
New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
foreach ($directory in @('server','client','scripts','test')) {
  & robocopy (Join-Path $targetRoot $directory) (Join-Path $backupRoot $directory) /E /XD node_modules /NFL /NDL /NJH /NJS /NP | Out-Null
  if ($LASTEXITCODE -gt 7) { throw "원본 백업 실패: $directory" }
}
Copy-Item -LiteralPath (Join-Path $targetRoot 'package.json'), (Join-Path $targetRoot 'package-lock.json') -Destination $backupRoot
Push-Location $sourceRoot
try {
  $databaseBackup = "const Database=require('better-sqlite3');const db=new Database(process.argv[1],{readonly:true,fileMustExist:true});db.backup(process.argv[2]).then(()=>db.close()).catch(e=>{console.error(e.message);process.exitCode=1});"
  & node -e $databaseBackup (Join-Path $targetRoot 'data\app.db') (Join-Path $backupRoot 'app.db')
  if ($LASTEXITCODE -ne 0) { throw 'SQLite 백업 실패' }
} finally { Pop-Location }
$listener = Get-NetTCPConnection -LocalPort 8788 -State Listen | Where-Object { $_.LocalAddress -in @('127.0.0.1','::1') } | Select-Object -First 1
if (-not $listener) { throw '로컬 관리 서버 프로세스를 확인할 수 없습니다.' }
$owner = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)"
if ($owner.Name -ne 'node.exe' -or $owner.CommandLine -notmatch 'server[\\/]index.js') { throw '중지할 프로세스가 관리 서버와 일치하지 않습니다.' }
Stop-Process -Id $listener.OwningProcess
foreach ($directory in @('server','client','scripts','test')) {
  & robocopy (Join-Path $sourceRoot $directory) (Join-Path $targetRoot $directory) /E /XD node_modules /NFL /NDL /NJH /NJS /NP | Out-Null
  if ($LASTEXITCODE -gt 7) { throw "코드 반영 실패: $directory. 원본: $backupRoot" }
}
foreach ($file in @('package.json','package-lock.json','README.md','.env.example','.gitignore')) {
  Copy-Item -LiteralPath (Join-Path $sourceRoot $file) -Destination (Join-Path $targetRoot $file)
}
Push-Location $targetRoot
try {
  if ($needsInstall) { & npm.cmd ci --no-audit --no-fund } else { $global:LASTEXITCODE = 0 }
  if ($LASTEXITCODE -ne 0) { throw "의존성 설치 실패. 원본: $backupRoot" }
} finally { Pop-Location }
$env:GUIDE_MANAGER_DATA_DIR = Join-Path $targetRoot 'data'
$env:PORT = '8788'
$process = Start-Process -FilePath (Get-Command node).Source -ArgumentList @('--use-system-ca','server\index.js') -WorkingDirectory $targetRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $targetRoot 'data\logs\server-stdout.log') -RedirectStandardError (Join-Path $targetRoot 'data\logs\server-stderr.log')
for ($attempt = 0; $attempt -lt 20; $attempt++) {
  Start-Sleep -Milliseconds 500
  try {
    $ready = Invoke-RestMethod 'http://127.0.0.1:8788/api/session' -TimeoutSec 2
    if ($ready.token) { Write-Output "배포 완료: http://localhost:8788/ · PID $($process.Id) · 백업 $backupRoot"; exit 0 }
  } catch { }
}
throw "관리 서버 시작 확인 실패. 로그와 원본 백업을 확인하세요: $backupRoot"
