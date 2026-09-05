param(
  [ValidateSet('app', 'port')]
  [string]$Mode,
  [int]$Port = 8788
)

if ($Mode -eq 'app') {
  try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/api/health" -TimeoutSec 2
    if ($response.app -eq 'noblesse-guide-manager') {
      exit 0
    }
  } catch {
    # A failed health request simply means the guide manager is not running.
  }
  exit 1
}

$listener = Get-NetTCPConnection `
  -LocalAddress 127.0.0.1 `
  -LocalPort $Port `
  -State Listen `
  -ErrorAction SilentlyContinue

if ($listener) {
  exit 0
}

exit 1
