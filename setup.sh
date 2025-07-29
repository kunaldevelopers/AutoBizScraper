#!/bin/bash

# Ranchi Business Scraper Setup Script
echo "🚀 Setting up Ranchi Business Directory Scraper Bot"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Extract business links
echo "🔗 Extracting business links..."
node extract_links.js

if [ $? -eq 0 ]; then
    echo "✅ Business links extracted successfully!"
else
    echo "❌ Failed to extract business links"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the bot, run:"
echo "npm start"
echo ""
echo "or"
echo ""
echo "node bot.js"
