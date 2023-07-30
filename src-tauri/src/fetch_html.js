// const puppeteer = require("puppeteer");

// async function fetchHTML(url, customHeaders) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Set custom headers
//   await page.setExtraHTTPHeaders(customHeaders);

//   await page.goto(url, { waitUntil: "domcontentloaded" });
//   const html = await page.content();

//   await browser.close();
//   return html;
// }

// const url = process.argv[2];
// const customHeaders = {
//   // Add your custom headers here
//   "User-Agent": "ali man ",
//   Authorization: "aisldkfjqslmkdfjqlsd",
//   // Add more headers as needed
// };

// fetchHTML(url, customHeaders).then((html) => {
//   console.log(html);
// });
const puppeteer = require("puppeteer");

async function fetchHTML(url, customHeaders) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set custom headers
  await page.setExtraHTTPHeaders(customHeaders);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const html = await page.content();
    return html;
  } catch (error) {
    console.error("Error fetching HTML:", error);
    return null;
  } finally {
    await browser.close();
  }
}

module.exports = fetchHTML;