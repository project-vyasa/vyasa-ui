const { chromium } = require('playwright');
(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	page.on('console', (msg) => {
		console.log(`[Browser Console ${msg.type()}] ${msg.text()}`);
	});
	page.on('pageerror', (err) => {
		console.log(`[Browser Error] ${err.message}`);
	});

	await page.goto('http://localhost:4321/vyasa-docs/demos/viewer', { waitUntil: 'networkidle' });

	// Wait a bit
	await page.waitForTimeout(2000);

	// Evaluate script on page to check sqlite3
	await page.evaluate(async () => {
		try {
			// get the sqliteService from the window if it was exported, or just import it dynamically
			const { sqliteService } = await import('/vyasa-docs/src/lib/sqlite-service.ts?import');
			await sqliteService.init();
			console.log('sqlite3 keys:', Object.keys(sqliteService.sqlite3));
			console.log('sqlite3._wasm:', !!sqliteService.sqlite3._wasm);
			if (sqliteService.sqlite3._wasm) {
				console.log('_wasm keys:', Object.keys(sqliteService.sqlite3._wasm));
			}
		} catch (e) {
			console.error('eval error:', e);
		}
	});

	await browser.close();
})();
