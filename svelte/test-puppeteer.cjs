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
  
  // Wait a bit for db queries to resolve
  await page.waitForTimeout(2000);

  // Select the bg sample from the dropdown (assume it's populated)
  console.log("Selecting bg sample...");
  try {
    await page.selectOption('select', 'vedabase-bg');
    await page.waitForTimeout(2000);
  } catch (e) {
    console.log("Could not select vedabase-bg", e);
  }
  
  console.log("Done. Closing.");
  await browser.close();
})();
