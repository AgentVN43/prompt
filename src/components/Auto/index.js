const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Step 1: Visit the URL
  const url = 'https://vn.shp.ee/HPAR6SD'; // Replace with your target URL
  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  // Step 2: Copy the title of the page
  const titleSelector = 'span.oh0Xh2';
  await page.waitForSelector(titleSelector);

  // Step 3: Copy the title from the span tag with class "oh0Xh2"
  const title = await page.$eval(titleSelector, span => span.textContent);

  // Step 3: Copy all image URLs
  const imgUrls = await page.$$eval('img', imgs => imgs.map(img => img.src)); // Get all image src URLs

  // Step 4: Create an object with product title and image URLs
  const productData = {
    product: title,
    img: imgUrls
  };

  console.log(productData);

  // Close the browser
  await browser.close();
})();
