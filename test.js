const puppeteer = require("puppeteer");
const XLSX = require("xlsx");
const chalk = require("chalk");
const fs = require("fs");

console.log(chalk.blue.bold("🚀 Quick Test - Ranchi Business Scraper"));
console.log(chalk.blue("=" + "=".repeat(40)));

async function quickTest() {
  console.log(chalk.yellow("📦 Starting browser..."));

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 },
  });

  const page = await browser.newPage();

  try {
    // Test navigation to main page
    console.log(chalk.cyan("🌐 Navigating to main page..."));
    await page.goto("https://ranchi.idbf.in/", { waitUntil: "networkidle0" });
    console.log(chalk.green("✅ Successfully loaded main page"));

    // Test navigation to a category page
    console.log(chalk.cyan("🔍 Testing category page (flex-printing)..."));
    await page.goto("https://ranchi.idbf.in/flex-printing", {
      waitUntil: "networkidle0",
    });

    // Check if businesses exist
    const businesses = await page.evaluate(() => {
      const businessElements = document.querySelectorAll(
        'a[href*="ranchi.idbf.in"]'
      );
      const businesses = [];

      businessElements.forEach((element) => {
        const href = element.getAttribute("href");
        const text = element.textContent.trim();
        if (
          (href && text && href.includes("/ranchi/")) ||
          text.toLowerCase().includes("show number")
        ) {
          businesses.push({
            text: text,
            url: href,
          });
        }
      });

      return businesses;
    });

    console.log(
      chalk.green(`✅ Found ${businesses.length} potential business elements`)
    );

    if (businesses.length > 0) {
      console.log(chalk.gray("Sample businesses:"));
      businesses.slice(0, 3).forEach((business, index) => {
        console.log(
          chalk.gray(`  ${index + 1}. ${business.text.substring(0, 50)}...`)
        );
      });
    }

    console.log(chalk.green("🎉 Quick test completed successfully!"));
    console.log(chalk.yellow('\n📝 Run "node bot.js" to start full scraping'));
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}`));
  } finally {
    await browser.close();
  }
}

quickTest().catch(console.error);
