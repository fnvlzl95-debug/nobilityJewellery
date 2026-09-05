@echo off
cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\check-port.ps1" -Mode app
if not errorlevel 1 (
  start "" http://127.0.0.1:8788
  exit /b 0
)

powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\check-port.ps1" -Mode port
if errorlevel 1 goto port_free

echo [Noblesse Guide Manager] Port 8788 is already used by another local app.
echo Close that app and run this file again. The wrong page will not be opened.
pause
exit /b 2

:port_free
if not exist node_modules (
  echo [Noblesse Guide Manager] Installing local dependencies...
  call npm install
  if errorlevel 1 goto failed
)
if not exist client\dist\index.html (
  echo [Noblesse Guide Manager] Building the management screen...
  call npm run build
  if errorlevel 1 goto failed
)
start "" /b cmd /c "timeout /t 2 /nobreak > nul && start http://127.0.0.1:8788"
echo [Noblesse Guide Manager] http://127.0.0.1:8788
rem Windows 보안 프로그램/사내망의 HTTPS 검사 인증서도 안전하게 검증한다.
node --use-system-ca server\index.js
if errorlevel 1 goto failed
exit /b 0

:failed
echo [Noblesse Guide Manager] Startup failed. Review the message above.
pause
exit /b 1
