# Start UniVerse Connect Backend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  UniVerse Connect - Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$backendPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Backend directory: $backendPath" -ForegroundColor Yellow
Write-Host "Starting server..." -ForegroundColor Yellow
Write-Host ""

Set-Location $backendPath
node start.js

Write-Host ""
Write-Host "Server stopped." -ForegroundColor Red
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
