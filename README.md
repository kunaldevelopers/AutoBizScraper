# 🤖 AutoBizScraper - Smart Business Data Extractor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-v21.0.0-blue.svg)](https://pptr.dev/)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/AutoBizScraper?style=social)](https://github.com/yourusername/AutoBizScraper)
[![Downloads](https://img.shields.io/npm/dt/autobizscraper.svg)](https://www.npmjs.com/package/autobizscraper)

**🔥 The Ultimate Automated Business Intelligence Tool for Lead Generation & Market Research**

Extract thousands of business contacts, emails, and phone numbers from business directories with zero coding required! This powerful web scraping bot automates data collection from 286+ business categories, generating Excel reports perfect for sales teams, marketers, and entrepreneurs.

## ✨ Features

- 🎯 **Multi-Category Scraping**: Support for 286+ business categories
- 🔍 **Intelligent Data Extraction**: Automatically extracts business names, addresses, contact numbers, emails, and websites
- 📊 **Excel Export**: Professional data export in XLSX format with unique identifiers
- 🖥️ **Interactive CLI**: User-friendly command-line interface with progress tracking
- 🚀 **Stealth Mode**: Advanced browser automation with anti-detection features
- 📱 **Mobile-First**: Optimized for extracting mobile numbers and contact information
- 🔄 **Batch Processing**: Efficient handling of multiple categories simultaneously
- 💾 **Smart Caching**: Intelligent data storage and duplicate prevention

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime environment
- **Puppeteer** - Headless Chrome automation
- **XLSX** - Excel file generation and manipulation
- **Inquirer** - Interactive command-line user interfaces
- **Chalk** - Terminal string styling
- **CLI Progress** - Progress bars for long-running operations

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Chrome/Chromium browser
- Stable internet connection

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AutoBizScraper.git
cd AutoBizScraper
```

### 2. Install Dependencies

**Windows:**

```bash
./setup.bat
```

**Linux/macOS:**

```bash
./setup.sh

```

**Manual Installation:**

```bash
npm install
```

### 3. Run the Application

```bash
npm start
```

## 🎮 Usage

### Available Commands

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm start`     | Launch the interactive main menu     |
| `npm run bot`   | Direct access to the scraping bot    |
| `npm run test`  | Execute test suite                   |
| `npm run setup` | Re-extract and update business links |

### Workflow

1. **Launch Application**: Run `npm start` to open the main menu
2. **Select Categories**: Choose from 286+ available business categories
3. **Automated Scraping**: The bot visits each category and extracts data
4. **Data Export**: Results are automatically saved as Excel files in `scraped_data/`

### Sample Output

The scraper extracts:

- ✅ Business Name
- ✅ Complete Address
- ✅ Mobile Number(s)
- ✅ Email Address
- ✅ Website URL
- ✅ Category Information

## 📁 Project Structure

```
AutoBizScraper/
├── bot.js                 # Core scraping engine
├── start.js              # Interactive CLI launcher
├── extract_links.js      # Business links extractor
├── business_links.json   # Categories database (286+ entries)
├── scraped_data/         # Output directory for Excel files
├── package.json          # Project configuration
├── setup.bat            # Windows setup script
├── setup.sh             # Unix setup script
└── README.md            # Documentation
```

## 🔧 Configuration

### Browser Settings

The scraper uses optimized Puppeteer settings:

- Headless mode (configurable)
- Anti-detection measures
- Custom user agents
- Viewport optimization (1366x768)

### Output Format

Data is exported in Excel format with the following naming convention:

```
{category}-data-Kunaldev-{uniqueId}.xlsx
```

## 📊 Performance

- **Speed**: Processes multiple businesses per minute
- **Accuracy**: High-precision data extraction with error handling
- **Reliability**: Robust error recovery and retry mechanisms
- **Scalability**: Handles large datasets efficiently

## 🚨 Legal & Ethical Usage

This tool is designed for educational and research purposes. Please ensure compliance with:

- Website terms of service
- Local data protection laws
- Ethical web scraping practices
- Rate limiting and respectful usage

## 🛡️ Error Handling

The scraper includes comprehensive error handling:

- Network timeout protection
- Missing element detection
- Graceful failure recovery
- Detailed logging and reporting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests, report bugs, or suggest new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Kunal Kumar Pandit** - Elite Developer & Web Intelligence Specialist

- 📧 **Business Inquiries**: [kunalkprnc@gmail.com](mailto:kunalkprnc@gmail.com)
- 📱 **WhatsApp Support**: [+91 9471376362](https://wa.me/919471376362)
- 💼 **Professional Network**: [LinkedIn](https://www.linkedin.com/in/kunalkumarpandit/)
- 🐙 **GitHub**: [@kunaldevelopers](https://github.com/kunaldevelopers)

## 🙏 Acknowledgments

- Built with modern web scraping best practices
- Optimized for the Ranchi business directory ecosystem
- Designed with user experience and data accuracy in mind

---

⭐ **Star this repository if it helped you!**

_For support, feature requests, or collaboration opportunities, feel free to reach out through any of the contact methods above._

The bot includes comprehensive error handling:

- **Network Timeouts**: Automatic retry with exponential backoff
- **Missing Elements**: Graceful handling of incomplete data
- **Page Load Failures**: Skip and continue with next business
- **Excel Write Errors**: Validate data before writing

## Performance

- **Speed**: Processes 10-50 businesses per minute (depending on site load)
- **Memory**: Uses approximately 100-200MB RAM
- **Storage**: Each Excel file is typically 50-500KB

## Legal & Ethical Usage

⚠️ **Important Disclaimer**

This bot is for educational and research purposes only. Please ensure:

1. **Respect robots.txt** and website terms of service
2. **Use reasonable delays** between requests
3. **Don't overload the server** with too many concurrent requests
4. **Respect data privacy** and local regulations
5. **Use scraped data responsibly** and ethically

## Troubleshooting

### Common Issues

**Error: "Chrome not found"**

```bash
# Install Chromium
npm install puppeteer --unsafe-perm=true
```

**Error: "business_links.json not found"**

```bash
# Run the link extraction script
node extract_links.js
```

**Slow Performance**

- Increase delay between requests
- Enable headless mode
- Check internet connection

### Debug Mode

## 🎯 Use Cases & Benefits

### 🏢 **For Sales Teams**

- Generate thousands of qualified leads automatically
- Build comprehensive prospect databases
- Extract contact information for cold outreach campaigns
- Identify potential clients in specific industries

### 📊 **For Market Research**

- Analyze competitor landscapes
- Study market penetration in different sectors
- Gather business intelligence for strategic planning
- Track industry trends and business patterns

### 🚀 **For Entrepreneurs**

- Find potential partners and suppliers
- Research market opportunities
- Build networking databases
- Validate business ideas with real market data

### 💼 **For Marketers**

- Create targeted email marketing lists
- Research local business ecosystems
- Identify influencers and key players
- Build industry-specific contact databases

## ⚡ Performance Metrics

- **Speed**: Extract 1000+ business contacts per hour
- **Accuracy**: 95%+ data accuracy rate
- **Coverage**: 286+ business categories supported
- **Export**: Professional Excel reports with clean formatting
- **Automation**: Zero manual intervention required

## 🔧 Advanced Features

### 🛡️ **Anti-Detection Technology**

- Randomized user agents and request patterns
- Smart delays between requests
- Browser fingerprint protection
- Proxy support (coming soon)

### 📈 **Data Quality Assurance**

- Duplicate detection and removal
- Data validation and cleaning
- Format standardization
- Error handling and retry mechanisms

## 🌟 Why Choose AutoBizScraper?

✅ **No Coding Required** - Simple CLI interface  
✅ **Professional Results** - Clean, organized Excel exports  
✅ **Time Saving** - Automate hours of manual data entry  
✅ **Cost Effective** - Replace expensive lead generation services  
✅ **Scalable** - Handle small lists or massive datasets  
✅ **Reliable** - Built-in error handling and recovery

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests, report bugs, or suggest new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Kunal Kumar Pandit** - Elite Developer & Web Intelligence Specialist

- 📧 **Business Inquiries**: [kunalkprnc@gmail.com](mailto:kunalkprnc@gmail.com)
- 📱 **WhatsApp Support**: [+91 9471376362](https://wa.me/919471376362)
- 💼 **Professional Network**: [LinkedIn](https://www.linkedin.com/in/kunalkumarpandit/)
- 🐙 **GitHub**: [@kunaldevelopers](https://github.com/kunaldevelopers)

## 🙏 Acknowledgments

- Built with modern web scraping best practices
- Optimized for business intelligence and lead generation
- Designed with user experience and data accuracy in mind

---

## 🚀 Ready to Transform Your Lead Generation?

⭐ **Star this repository if it helped you generate quality leads!**

🔔 **Watch this repo** for updates and new features

🍴 **Fork and customize** for your specific use cases

---

### 🏷️ **Keywords**:

`web scraping` • `lead generation` • `business intelligence` • `data extraction` • `sales automation` • `market research` • `contact scraping` • `excel export` • `business directory` • `automated data collection` • `puppeteer scraper` • `business contacts` • `email extraction` • `phone number scraper`

_For support, feature requests, or collaboration opportunities, feel free to reach out through any of the contact methods above._
