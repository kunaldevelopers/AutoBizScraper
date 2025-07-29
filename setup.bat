@echo off
REM Ranchi Business Scraper Setup Script for Windows
echo 🚀 Setting up Ranchi Business Directory Scraper Bot
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!

REM Extract business links
echo 🔗 Extracting business links...
node extract_links.js

if %errorlevel% neq 0 (
    echo ❌ Failed to extract business links
    pause
    exit /b 1
)

echo ✅ Business links extracted successfully!
echo.
echo 🎉 Setup completed successfully!
echo.
echo To start the bot, run:
echo npm start
echo.
echo or
echo.
echo node bot.js
echo.
pause
