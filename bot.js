const puppeteer = require("puppeteer");
const XLSX = require("xlsx");
const chalk = require("chalk");
const inquirer = require("inquirer");
const cliProgress = require("cli-progress");
const fs = require("fs-extra");
const path = require("path");

class RanchiBusinessScraper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.businessLinks = [];
    this.scrapedData = new Map();
    this.outputDir = "./scraped_data";
    this.uniqueId = `Kunaldev-${Math.random().toString(36).substr(2, 9)}`;

    // Create output directory
    fs.ensureDirSync(this.outputDir);
  }

  async init() {
    this.showHackerBanner();
    
    // Load business links
    await this.loadBusinessLinks();

    // Initialize Puppeteer
    console.log(chalk.cyan("📦 Initializing stealth browser..."));
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for production
      defaultViewport: { width: 1366, height: 768 },
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--disable-features=VizDisplayCompositor",
      ],
    });

    this.page = await this.browser.newPage();
    await this.page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    console.log(chalk.green("✅ Browser initialized successfully!"));
  }

  showHackerBanner() {
    console.clear();
    console.log(chalk.green.bold(`
    ██████╗  █████╗ ███╗   ██╗ ██████╗██╗  ██╗██╗    ██████╗  ██████╗ ████████╗
    ██╔══██╗██╔══██╗████╗  ██║██╔════╝██║  ██║██║    ██╔══██╗██╔═══██╗╚══██╔══╝
    ██████╔╝███████║██╔██╗ ██║██║     ███████║██║    ██████╔╝██║   ██║   ██║   
    ██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══██║██║    ██╔══██╗██║   ██║   ██║   
    ██║  ██║██║  ██║██║ ╚████║╚██████╗██║  ██║██║    ██████╔╝╚██████╔╝   ██║   
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
    `));
    
    console.log(chalk.red.bold(`
    ╔═══════════════════════════════════════════════════════════════════════════╗
    ║                  🔥 BUSINESS DIRECTORY SCRAPER v2.0 🔥                   ║
    ║                        Advanced Web Intelligence Tool                     ║
    ╠═══════════════════════════════════════════════════════════════════════════╣
    ║  💻 Designed & Developed by: ${chalk.cyan.bold('KUNAL KUMAR PANDIT')}                        ║
    ║  🐙 GitHub: ${chalk.cyan('https://github.com/kunaldevelopers')}                    ║
    ║  💼 LinkedIn: ${chalk.cyan('https://www.linkedin.com/in/kunalkumarpandit/')}      ║
    ║  🎯 Target: Ranchi Business Directory (ranchi.idbf.in)                   ║
    ║  📊 Capabilities: 286+ Categories | Excel Export | Real-time Progress    ║
    ╚═══════════════════════════════════════════════════════════════════════════╝
    `));
    
    console.log(chalk.yellow(`    ${chalk.red('[')}${chalk.green('●')}${chalk.red(']')} Status: ${chalk.green.bold('ONLINE')}`));
    console.log(chalk.yellow(`    ${chalk.red('[')}${chalk.yellow('●')}${chalk.red(']')} Mode: ${chalk.cyan.bold('STEALTH SCRAPING')}`));
    console.log(chalk.yellow(`    ${chalk.red('[')}${chalk.blue('●')}${chalk.red(']')} Version: ${chalk.magenta.bold('2.0.0')}`));
    console.log();
  }

  async loadBusinessLinks() {
    try {
      const data = fs.readFileSync("./business_links.json", "utf8");
      this.businessLinks = JSON.parse(data);
      console.log(
        chalk.green(
          `✅ Loaded ${this.businessLinks.length} business categories`
        )
      );
    } catch (error) {
      console.log(
        chalk.red(
          "❌ Error loading business links. Please run extract_links.js first."
        )
      );
      process.exit(1);
    }
  }

  async selectCategories() {
    console.log(chalk.green(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║                     🎯 TARGET SELECTION INTERFACE                    ║
    ║                   ${chalk.cyan.bold(`${this.businessLinks.length} CATEGORIES DETECTED`)}                      ║
    ╚═══════════════════════════════════════════════════════════════════════╝
    `));

    const choices = this.businessLinks.map((link, index) => ({
      name: `${chalk.gray(`[${String(index + 1).padStart(3, '0')}]`)} ${chalk.cyan('»')} ${link.displayName}`,
      value: link,
      short: link.displayName,
    }));

    const answer = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedCategories",
        message: chalk.yellow("🎯 Select categories to infiltrate (spacebar=select, enter=execute):"),
        choices: choices,
        pageSize: 15,
      },
    ]);

    if (answer.selectedCategories.length === 0) {
      console.log(chalk.red(`
    ${chalk.red('[')}${chalk.yellow('!')}${chalk.red(']')} OPERATION ABORTED: No targets selected
    ${chalk.red('[')}${chalk.yellow('!')}${chalk.red(']')} Terminating connection...`));
      process.exit(0);
    }

    return answer.selectedCategories;
  }

  async scrapeCategory(categoryInfo) {
    const categoryName = categoryInfo.displayName;
    const categoryUrl = categoryInfo.url;

    console.log(chalk.green(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║  🎯 INFILTRATING TARGET: ${chalk.cyan.bold(categoryName.padEnd(47))} ║
    ║  🌐 URL: ${chalk.gray(categoryUrl.padEnd(59))} ║
    ╚═══════════════════════════════════════════════════════════════════════╝`));

    try {
      console.log(chalk.yellow(`    ${chalk.red('[')}${chalk.yellow('◐')}${chalk.red(']')} Establishing connection...`));
      await this.page.goto(categoryUrl, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      console.log(chalk.yellow(`    ${chalk.red('[')}${chalk.green('●')}${chalk.red(']')} Connection established, scanning targets...`));

      // Check if there are businesses or no data
      const hasBusinesses = await this.page.evaluate(() => {
        // Look for business listings in portfolio items
        const businessElements = document.querySelectorAll(
          ".portfolio-item .list-group-item-action a"
        );
        return businessElements.length > 0;
      });

      if (!hasBusinesses) {
        console.log(chalk.red(`    ${chalk.red('[')}${chalk.yellow('!')}${chalk.red(']')} NO TARGETS FOUND in ${categoryName}`));
        console.log(chalk.red(`    ${chalk.red('[')}${chalk.yellow('!')}${chalk.red(']')} Area appears to be empty...`));
        return [];
      }

      // Extract all business listing links
      const businessUrls = await this.page.evaluate(() => {
        const links = [];
        const businessElements = document.querySelectorAll(
          ".portfolio-item .list-group-item-action a"
        );

        businessElements.forEach((element) => {
          const href = element.getAttribute("href");
          const text = element.textContent.trim();
          if (
            href &&
            text &&
            !href.includes("/register") &&
            !href.includes("/about") &&
            !href.includes("/contact") &&
            href.match(/https:\/\/ranchi\.idbf\.in\/\d+\//)
          ) {
            links.push({
              url: href,
              name: text,
            });
          }
        });

        return links;
      });

      console.log(chalk.green(`    ${chalk.red('[')}${chalk.green('✓')}${chalk.red(']')} ${chalk.cyan.bold(businessUrls.length)} TARGETS ACQUIRED in ${categoryName}`));
      console.log(chalk.yellow(`    ${chalk.red('[')}${chalk.blue('◉')}${chalk.red(']')} Initiating data extraction protocol...`));

      // Scrape each business
      const businesses = [];
      const progressBar = new cliProgress.SingleBar({
        format: chalk.cyan("    [") + chalk.red("●") + chalk.cyan("] EXTRACTING") + 
          " |{bar}| " + chalk.yellow("{percentage}%") + " | " + 
          chalk.green("{value}") + "/" + chalk.cyan("{total}") + " targets | " +
          chalk.magenta("ETA: {eta}s"),
        barCompleteChar: "█",
        barIncompleteChar: "░",
        hideCursor: true,
      });

      progressBar.start(businessUrls.length, 0);

      for (let i = 0; i < businessUrls.length; i++) {
        try {
          const businessData = await this.scrapeBusiness(businessUrls[i]);
          if (businessData) {
            businesses.push(businessData);
          }
          progressBar.update(i + 1);

          // Add delay to avoid being blocked
          await this.delay(1000 + Math.random() * 2000);
        } catch (error) {
          console.log(
            chalk.red(
              `❌ Error scraping business ${businessUrls[i].name}: ${error.message}`
            )
          );
        }
      }

      progressBar.stop();

      // Save to Excel
      if (businesses.length > 0) {
        await this.saveToExcel(categoryName, businesses);
      }

      return businesses;
    } catch (error) {
      console.log(
        chalk.red(
          `❌ Error scraping category ${categoryName}: ${error.message}`
        )
      );
      return [];
    }
  }

  async scrapeBusiness(businessInfo) {
    try {
      await this.page.goto(businessInfo.url, {
        waitUntil: "networkidle0",
        timeout: 20000,
      });

      // Try to click "Show Number & More Information" button if exists
      try {
        const showMoreButton = await this.page.$('a[href*="Show Number"]');
        if (showMoreButton) {
          await showMoreButton.click();
          await this.page.waitForTimeout(2000); // Wait for content to load
        }
      } catch (e) {
        // Button might not exist, continue with scraping
      }

      // Extract business details
      const businessData = await this.page.evaluate(() => {
        const data = {
          name: "",
          address: "",
          mobile: "",
          email: "",
          website: "",
          timings: "",
          paymentOptions: "",
          description: "",
          location: "",
          pincode: "",
          state: "",
          country: "",
        };

        // Try to extract business name from h1 or title
        const nameSelectors = [
          "h1",
          ".business-name",
          '[class*="name"]',
          "title",
        ];

        for (const selector of nameSelectors) {
          const nameElement = document.querySelector(selector);
          if (nameElement && nameElement.textContent.trim()) {
            data.name = nameElement.textContent.trim();
            break;
          }
        }

        // If no name found in specific elements, get it from the URL or page content
        if (!data.name) {
          const titleElement = document.querySelector("title");
          if (titleElement) {
            data.name = titleElement.textContent
              .replace(/\s*-\s*.*$/, "")
              .trim();
          }
        }

        // Extract all text content for pattern matching
        const pageText = document.body.innerText;

        // Extract address - look for patterns
        const addressPatterns = [
          /Address[:\s]*([^\n\r]+(?:\n[^\n\r]+)*?)(?=\n(?:Mobile|Phone|Email|Website|Time|Payment|$))/i,
          /([^:\n\r]+(?:Road|Street|Lane|Colony|Chowk|Market|Complex|Building|Floor)[^:\n\r]*(?:\n[^:\n\r]*)*?)(?=\n(?:Mobile|Phone|Email|Website|Ranchi|$))/i,
        ];

        for (const pattern of addressPatterns) {
          const match = pageText.match(pattern);
          if (match && match[1] && match[1].trim().length > 10) {
            data.address = match[1].trim();
            break;
          }
        }

        // Extract pincode from address
        if (data.address) {
          const pincodeMatch = data.address.match(/(\d{6})/);
          if (pincodeMatch) {
            data.pincode = pincodeMatch[1];
          }

          // Extract state and country
          const locationMatch = data.address.match(/\(([^)]+)\)\s*([^)]*)/);
          if (locationMatch) {
            data.state = locationMatch[1];
            data.country = locationMatch[2] || "India";
          }
        }

        // Extract mobile number - multiple patterns
        const mobilePatterns = [
          /Mobile Number[:\s]*([0-9\s\-\+\(\)]{8,15})/i,
          /Phone[:\s]*([0-9\s\-\+\(\)]{8,15})/i,
          /Contact[:\s]*([0-9\s\-\+\(\)]{8,15})/i,
          /(\+91[\s\-]?[0-9]{10})/i,
          /([0-9]{10})/g,
        ];

        for (const pattern of mobilePatterns) {
          const match = pageText.match(pattern);
          if (match && match[1]) {
            data.mobile = match[1].trim();
            break;
          }
        }

        // Extract email
        const emailMatch = pageText.match(
          /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
        );
        if (emailMatch) {
          data.email = emailMatch[1];
        }

        // Extract website
        const websiteMatch = pageText.match(
          /Website[:\s]*((?:https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s]*)/i
        );
        if (websiteMatch) {
          data.website = websiteMatch[1];
        }

        // Extract timings
        const timingsMatch = pageText.match(/Time[:\s]*([^\n\r]+)/i);
        if (timingsMatch) {
          data.timings = timingsMatch[1].trim();
        }

        // Extract payment options
        const paymentMatch = pageText.match(/Payment[^:]*:[^\n\r]+([^\n\r]+)/i);
        if (paymentMatch) {
          data.paymentOptions = paymentMatch[1].trim();
        }

        return data;
      });

      // Set the scraped URL and timestamp
      businessData.sourceUrl = businessInfo.url;
      businessData.scrapedAt = new Date().toISOString();

      // Use business name from the original link if not found on page
      if (!businessData.name && businessInfo.name) {
        businessData.name = businessInfo.name;
      }

      return businessData;
    } catch (error) {
      console.log(
        chalk.red(`❌ Error scraping business details: ${error.message}`)
      );
      return null;
    }
  }

  async saveToExcel(categoryName, businesses) {
    const fileName = `${categoryName.toLowerCase().replace(/\s+/g, "-")}-data-${
      this.uniqueId
    }.xlsx`;
    const filePath = path.join(this.outputDir, fileName);

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(businesses);

    // Auto-adjust column widths
    const colWidths = [
      { wch: 30 }, // Name
      { wch: 50 }, // Address
      { wch: 15 }, // Mobile
      { wch: 25 }, // Email
      { wch: 30 }, // Website
      { wch: 20 }, // Timings
      { wch: 20 }, // Payment Options
      { wch: 10 }, // Pincode
      { wch: 15 }, // State
      { wch: 15 }, // Country
      { wch: 40 }, // Source URL
      { wch: 20 }, // Scraped At
    ];
    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Businesses");
    XLSX.writeFile(workbook, filePath);

    console.log(chalk.green(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║  💾 DATA EXTRACTION COMPLETE                                         ║
    ║  📊 Records: ${chalk.cyan.bold(String(businesses.length).padEnd(3))} businesses                                      ║
    ║  📁 File: ${chalk.yellow(fileName.padEnd(50))} ║
    ║  📍 Location: ${chalk.gray('./scraped_data/')}                                       ║
    ╚═══════════════════════════════════════════════════════════════════════╝
    `));
  }

  async askContinue() {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: chalk.yellow("🎯 Select next operation:"),
        choices: [
          { name: `${chalk.green('►')} Continue infiltrating another category`, value: "continue" },
          { name: `${chalk.red('■')} Terminate operation`, value: "stop" },
          { name: `${chalk.blue('📊')} View intelligence summary`, value: "summary" },
        ],
      },
    ]);

    return answer.action;
  }

  async showSummary() {
    console.log(chalk.green(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║                    📊 INTELLIGENCE SUMMARY REPORT                    ║
    ║                        Operation Complete                             ║
    ╚═══════════════════════════════════════════════════════════════════════╝`));

    const files = fs
      .readdirSync(this.outputDir)
      .filter((f) => f.endsWith(".xlsx"));

    if (files.length === 0) {
      console.log(chalk.red(`    ${chalk.red('[')}${chalk.yellow('!')}${chalk.red(']')} No intelligence files found in database.`));
      return;
    }

    let totalBusinesses = 0;
    for (const file of files) {
      const filePath = path.join(this.outputDir, file);
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      console.log(chalk.cyan(`    ${chalk.red('[')}${chalk.green('✓')}${chalk.red(']')} ${file}: ${chalk.yellow.bold(data.length)} records extracted`));
      totalBusinesses += data.length;
    }

    console.log(chalk.green(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║  🎯 TOTAL INTELLIGENCE GATHERED: ${chalk.cyan.bold(String(totalBusinesses).padEnd(30))} ║
    ║  📁 DATA LOCATION: ${chalk.yellow('./scraped_data/'.padEnd(42))} ║
    ║  👨‍💻 OPERATOR: ${chalk.cyan.bold('KUNAL KUMAR PANDIT'.padEnd(37))} ║
    ╚═══════════════════════════════════════════════════════════════════════╝`));
    console.log(
      chalk.gray(`📁 Data saved in: ${path.resolve(this.outputDir)}`)
    );
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async run() {
    try {
      await this.init();

      while (true) {
        const selectedCategories = await this.selectCategories();

        for (const category of selectedCategories) {
          await this.scrapeCategory(category);
        }

        const action = await this.askContinue();

        if (action === "stop") {
          break;
        } else if (action === "summary") {
          await this.showSummary();
          break;
        } else if (action === "continue") {
          continue;
        }
      }
    } catch (error) {
      console.log(chalk.red(`    ${chalk.red('[')}${chalk.red('✗')}${chalk.red(']')} FATAL ERROR: ${error.message}`));
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
      console.log(chalk.green(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║  🔒 CONNECTION TERMINATED                                             ║
    ║  ✅ All systems shutdown successfully                                 ║
    ║  👨‍💻 Session closed by: ${chalk.cyan.bold('KUNAL')}                                      ║
    ║  💻 GitHub: ${chalk.cyan('github.com/kunaldevelopers')}                           ║
    ╚═══════════════════════════════════════════════════════════════════════╝
      `));
    }
  }
}

// Main execution
const bot = new RanchiBusinessScraper();
bot.run().catch(console.error);
