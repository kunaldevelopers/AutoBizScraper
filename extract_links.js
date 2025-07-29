const fs = require("fs");

// Read the HTML file
const html = fs.readFileSync("page1.html", "utf8");

// Extract all business category links
const linkRegex = /href="https:\/\/ranchi\.idbf\.in\/([a-z0-9-]+)"/g;
const links = [];
let match;

while ((match = linkRegex.exec(html)) !== null) {
  const url = match[0].replace('href="', "").replace('"', "");
  const category = match[1];

  // Skip general pages
  if (
    ![
      "register",
      "about-us",
      "contact",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ].includes(category)
  ) {
    links.push({
      url: url,
      category: category,
      displayName: category.replace(/-/g, " ").toUpperCase(),
    });
  }
}

// Remove duplicates
const uniqueLinks = links.filter(
  (link, index, self) => index === self.findIndex((l) => l.url === link.url)
);

// Save to file
fs.writeFileSync("business_links.json", JSON.stringify(uniqueLinks, null, 2));
console.log(`Extracted ${uniqueLinks.length} business category links`);
console.log("Sample links:");
uniqueLinks.slice(0, 10).forEach((link) => {
  console.log(`- ${link.displayName}: ${link.url}`);
});
