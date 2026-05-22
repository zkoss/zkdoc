@echo off
setlocal
cd /d "%~dp0"

for /f "tokens=2,*" %%a in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul ^| findstr /i "Path"') do set "_MPATH=%%b"
for /f "tokens=2,*" %%a in ('reg query "HKCU\Environment" /v Path 2^>nul ^| findstr /i "Path"') do set "_UPATH=%%b"
if defined _MPATH set "PATH=%_MPATH%;%_UPATH%"

bundle exec jekyll serve --incremental --config _config.yml %*
