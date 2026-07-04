const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[Browser Console ${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', err => {
    console.log(`[Browser Error] ${err.message}`);
  });

  console.log("Navigating to page...");
  await page.goto('http://localhost:4321/vyasa-docs/demos/viewer', { waitUntil: 'networkidle' });
  
  // Wait a bit
  await page.waitForTimeout(2000);

  console.log("Clicking Bhagavad Gita...");
  try {
    await page.click('text="Bhagavad Gita"');
    await page.waitForTimeout(2000);
  } catch (e) {
    console.log("Could not click", e);
  }
  
  console.log("Done. Closing.");
  await browser.close();
})();
