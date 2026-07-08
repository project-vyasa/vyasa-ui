const { chromium } = require('playwright');
(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	page.on('console', (msg) => {
		console.log(`[Browser Console ${msg.type()}] ${msg.text()}`);
	});
	await page.goto('http://localhost:4321/vyasa-docs/demos/viewer', { waitUntil: 'networkidle' });

	console.log('Clicking Bhagavad Gita...');
	await page.click('text="Bhagavad Gita"');
	await page.waitForTimeout(2000);

	// Wait for the dropdown and chapters
	console.log(
		'Saving screenshot to /Users/anand/.gemini/antigravity-ide/brain/7b8fe286-38f4-405d-a4dd-9d2c037d0463/scratch/screenshot1.png...'
	);
	await page.screenshot({
		path: '/Users/anand/.gemini/antigravity-ide/brain/7b8fe286-38f4-405d-a4dd-9d2c037d0463/scratch/screenshot1.png'
	});

	await browser.close();
})();
