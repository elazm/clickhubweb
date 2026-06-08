const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "..", "clickhub_website.html");
const html = fs.readFileSync(htmlPath, "utf8");

if (!html.includes("<!DOCTYPE html>") || !html.includes("</html>")) {
  console.error("clickhub_website.html does not look like a complete HTML document.");
  process.exit(1);
}

console.log("Static site check passed: clickhub_website.html is ready.");
