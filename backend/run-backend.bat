@echo off
echo ========================================
echo   UniVerse Connect - Backend Server
echo ========================================
echo.
cd /d "%~dp0"
echo Starting server...
echo.
node start.js
echo.
echo Server stopped. Press any key to exit...
pause >nul
