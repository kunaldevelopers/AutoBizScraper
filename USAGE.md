# 🚀 Ranchi Business Directory Scraper - Usage Guide

## Quick Start

### 1. Setup (One-time only)

```bash
# Windows
setup.bat

# Linux/Mac
./setup.sh
```

### 2. Start the Bot

```bash
npm start
```

## Available Commands

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm start`     | Opens the main menu              |
| `npm run bot`   | Directly starts the scraping bot |
| `npm run test`  | Runs a quick test                |
| `npm run setup` | Re-extracts business links       |

## How It Works

### Step 1: Category Selection

- Bot shows you 286+ business categories
- Use spacebar to select multiple categories
- Press Enter to confirm selection

### Step 2: Data Extraction

For each selected category:

1. **Visits category page** (e.g., https://ranchi.idbf.in/flex-printing)
2. **Finds all businesses** in that category
3. **Clicks "Show Number & More Information"** for each business
4. **Extracts data**:
   - Business Name
   - Complete Address
   - Mobile Number(s)
   - Email Address
   - Website URL
   - Operating Hours
   - Payment Options
   - Pincode, State, Country

### Step 3: Excel Export

- Creates Excel file for each category
- Filename format: `{category}-data-Kunaldev-{unique-id}.xlsx`
- Saves in `./scraped_data/` folder

### Step 4: Continue or Stop

After each category, you can:

1. **Continue** with another category
2. **Stop** scraping
3. **View summary** of scraped data

## Sample Output

### Console Output

```
🚀 Ranchi Business Directory Scraper Bot
=============================================
✅ Loaded 286 business categories
📋 Available Business Categories:
? Select categories to scrape:
❯◯ 1. CHILD SPECIALIST DOCTORS
 ◯ 2. AC DEALERS
 ◯ 3. AC REPAIR
 ◯ 4. ACADEMY
```

### Excel File Structure

| Name                          | Address                                              | Mobile     | Email | Website | Timings       | Payment Options | Pincode | State     | Country |
| ----------------------------- | ---------------------------------------------------- | ---------- | ----- | ------- | ------------- | --------------- | ------- | --------- | ------- |
| RS Flex Printing & Pintoo Art | Shop No. 28, 19, Station Overbridge, Rajender Market | 9304249353 | -     | -       | 10 AM onwards | Cash accepted   | 834002  | Jharkhand | India   |

## Tips for Best Results

### 🎯 Category Selection

- Start with 1-2 categories first to test
- Popular categories: `flex-printing`, `restaurants`, `mobile-stores`
- Medical categories have most data: `doctors`, `hospitals`, `clinics`

### ⚡ Performance Tips

- Don't select too many categories at once (max 5-10)
- Bot automatically adds delays to avoid being blocked
- Run during off-peak hours for better performance

### 🛡️ Avoiding Issues

- Don't run multiple instances simultaneously
- Keep browser window visible (don't minimize)
- Ensure stable internet connection
- Close other browser tabs to free up memory

## Troubleshooting

### ❌ Common Errors

**"Chrome not found"**

```bash
# Reinstall Puppeteer
npm uninstall puppeteer
npm install puppeteer
```

**"business_links.json not found"**

```bash
npm run setup
```

**"No businesses found"**

- Some categories may be empty
- Try different categories
- Check if website is accessible

**Browser crashes**

- Reduce number of selected categories
- Restart the bot
- Check available RAM

### 🔧 Advanced Configuration

**Enable Headless Mode** (faster, no browser window)

```javascript
// In bot.js, line ~30
headless: true, // Change to true
```

**Adjust Scraping Speed**

```javascript
// In bot.js, line ~200+
await this.delay(2000); // Increase delay (milliseconds)
```

**Change Output Directory**

```javascript
// In bot.js, line ~15
this.outputDir = "./my_data"; // Change folder name
```

## Example Workflow

```bash
# 1. Start the bot
npm start

# 2. Select "Start Full Scraping Bot"

# 3. Choose categories (example):
[x] FLEX PRINTING
[x] RESTAURANTS
[x] MOBILE STORES

# 4. Wait for scraping to complete
🔍 Scraping category: FLEX PRINTING
📊 Found 18 businesses in FLEX PRINTING
Progress |████████████| 100% | 18/18 businesses
💾 Saved 18 businesses to: flex-printing-data-Kunaldev-abc123.xlsx

# 5. Choose next action:
? What would you like to do next?
❯ 1. Continue with another category
  2. Stop scraping
  3. View scraped data summary
```

## Data Quality

### ✅ High Quality Data

- **Medical**: Doctors, Hospitals, Clinics
- **Food**: Restaurants, Bakeries, Sweet Shops
- **Retail**: Mobile Stores, Electronics, Garments
- **Services**: Printing, Repair Services, Consultants

### ⚠️ Variable Quality

- **New Categories**: Recently added categories
- **Niche Services**: Very specific business types
- **Rural Areas**: Limited business listings

## File Management

### Output Structure

```
bot2/
├── scraped_data/
│   ├── flex-printing-data-Kunaldev-abc123.xlsx
│   ├── restaurants-data-Kunaldev-def456.xlsx
│   └── mobile-stores-data-Kunaldev-ghi789.xlsx
├── business_links.json
└── bot.js
```

### Backup Your Data

```bash
# Copy scraped data to backup folder
cp -r scraped_data/ backup_$(date +%Y%m%d)/
```

## Legal Considerations

⚠️ **Important**: This bot is for educational/research purposes only.

✅ **Good Practices**:

- Reasonable request delays (1-3 seconds)
- Respect website terms of service
- Use data responsibly
- Don't overload the server

❌ **Avoid**:

- Running multiple bots simultaneously
- Scraping copyrighted content
- Commercial use without permission
- Excessive request frequency

---

## Need Help?

1. **Check this guide** first
2. **Run the test**: `npm run test`
3. **View available categories**: Use main menu option
4. **Check README.md** for technical details

**Happy Scraping! 🎉**
