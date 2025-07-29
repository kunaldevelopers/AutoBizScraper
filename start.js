const chalk = require("chalk");
const inquirer = require("inquirer");
const { spawn } = require("child_process");

function showHackerWelcome() {
  console.clear();
  console.log(
    chalk.red.bold(`
    ██████╗  █████╗ ███╗   ██╗ ██████╗██╗  ██╗██╗    ██████╗  ██████╗ ████████╗
    ██╔══██╗██╔══██╗████╗  ██║██╔════╝██║  ██║██║    ██╔══██╗██╔═══██╗╚══██╔══╝
    ██████╔╝███████║██╔██╗ ██║██║     ███████║██║    ██████╔╝██║   ██║   ██║   
    ██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══██║██║    ██╔══██╗██║   ██║   ██║   
    ██║  ██║██║  ██║██║ ╚████║╚██████╗██║  ██║██║    ██████╔╝╚██████╔╝   ██║   
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
  `)
  );

  console.log(
    chalk.cyan.bold(`
    ╔═══════════════════════════════════════════════════════════════════════════╗
    ║                    🔥 ADVANCED WEB INTELLIGENCE SUITE �                 ║
    ║                         Business Directory Infiltrator                   ║
    ╠═══════════════════════════════════════════════════════════════════════════╣
    ║  🎯 Creator: ${chalk.green.bold(
      "KUNAL KUMAR PANDIT"
    )} - Elite Developer                    ║
    ║  🐙 GitHub: ${chalk.yellow(
      "https://github.com/kunaldevelopers"
    )}                     ║  
    ║  💼 LinkedIn: ${chalk.blue(
      "https://www.linkedin.com/in/kunalkumarpandit/"
    )}       ║
    ║  🚀 Version: ${chalk.magenta.bold("2.0.0")} | ${chalk.red.bold(
      "STEALTH MODE ENABLED"
    )}                           ║
    ╚═══════════════════════════════════════════════════════════════════════════╝
  `)
  );

  console.log(
    chalk.yellow(
      `    ${chalk.red("[")}${chalk.green("●")}${chalk.red(
        "]"
      )} System Status: ${chalk.green.bold("OPERATIONAL")}`
    )
  );
  console.log(
    chalk.yellow(
      `    ${chalk.red("[")}${chalk.cyan("●")}${chalk.red(
        "]"
      )} Target Database: ${chalk.cyan.bold("RANCHI.IDBF.IN")}`
    )
  );
  console.log(
    chalk.yellow(
      `    ${chalk.red("[")}${chalk.magenta("●")}${chalk.red(
        "]"
      )} Categories Available: ${chalk.magenta.bold("286+")}`
    )
  );
  console.log();
}

async function main() {
  showHackerWelcome();

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: chalk.cyan("🎯 Select Operation Mode:"),
      choices: [
        {
          name: `${chalk.green("🚀")} ${chalk.bold(
            "Launch Full Infiltration Bot"
          )}`,
          value: "start",
        },
        {
          name: `${chalk.yellow("🧪")} ${chalk.bold(
            "Execute Quick Test Protocol"
          )}`,
          value: "test",
        },
        {
          name: `${chalk.blue("📋")} ${chalk.bold("View Target Categories")}`,
          value: "categories",
        },
        {
          name: `${chalk.magenta("📊")} ${chalk.bold(
            "Display System Documentation"
          )}`,
          value: "readme",
        },
        {
          name: `${chalk.red("❌")} ${chalk.bold("Terminate Session")}`,
          value: "exit",
        },
      ],
    },
  ]);

  switch (answer.action) {
    case "start":
      console.log(
        chalk.green(`
    ${chalk.red("[")}${chalk.green("►")}${chalk.red(
          "]"
        )} Initializing full infiltration protocol...
    ${chalk.red("[")}${chalk.yellow("◐")}${chalk.red(
          "]"
        )} Loading stealth modules...
      `)
      );
      spawn("node", ["bot.js"], { stdio: "inherit" });
      break;

    case "test":
      console.log(
        chalk.yellow(`
    ${chalk.red("[")}${chalk.yellow("►")}${chalk.red(
          "]"
        )} Executing diagnostic sequence...
    ${chalk.red("[")}${chalk.blue("◐")}${chalk.red("]")} Running system tests...
      `)
      );
      spawn("node", ["test.js"], { stdio: "inherit" });
      break;

    case "categories":
      try {
        const fs = require("fs");
        const links = JSON.parse(
          fs.readFileSync("./business_links.json", "utf8")
        );

        console.log(
          chalk.green(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║               📋 TARGET CATEGORIES DATABASE                           ║
    ║                    ${chalk.cyan.bold(
      links.length
    )} Categories Identified                        ║
    ╚═══════════════════════════════════════════════════════════════════════╝
        `)
        );

        links.forEach((link, index) => {
          const number = String(index + 1).padStart(3, "0");
          console.log(
            chalk.gray(
              `    ${chalk.red("[")}${chalk.cyan(number)}${chalk.red("]")} ${
                link.displayName
              }`
            )
          );
        });

        console.log(
          chalk.blue(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║  🔗 SAMPLE TARGET URLS                                                ║
    ╚═══════════════════════════════════════════════════════════════════════╝`)
        );

        links.slice(0, 5).forEach((link, index) => {
          console.log(
            chalk.gray(
              `    ${chalk.red("[")}${chalk.yellow(index + 1)}${chalk.red(
                "]"
              )} ${link.url}`
            )
          );
        });
      } catch (error) {
        console.log(
          chalk.red(`
    ${chalk.red("[")}${chalk.red("✗")}${chalk.red(
            "]"
          )} ERROR: Cannot access target database
    ${chalk.red("[")}${chalk.yellow("!")}${chalk.red(
            "]"
          )} Please execute: node extract_links.js
        `)
        );
      }
      break;

    case "readme":
      console.log(
        chalk.blue(`
    ${chalk.red("[")}${chalk.blue("►")}${chalk.red(
          "]"
        )} Accessing system documentation...
    ${chalk.red("[")}${chalk.green("◐")}${chalk.red("]")} Loading README.md...
      `)
      );
      const fs = require("fs");
      try {
        const readme = fs.readFileSync("./README.md", "utf8");
        console.log(chalk.gray(readme));
      } catch (error) {
        console.log(chalk.red("❌ README.md not found"));
      }
      break;

    case "exit":
      console.log(chalk.green("👋 Goodbye!"));
      process.exit(0);
      break;
  }
}

main().catch(console.error);
