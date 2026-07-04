const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[Browser Console ${msg.type()}] ${msg.text()}`);
  });
  await page.goto('http://localhost:4321/vyasa-docs/demos/viewer', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
     try {
       const { sqliteService } = await import('/vyasa-docs/src/lib/sqlite-service.ts?import');
       await sqliteService.init();
       const db = await sqliteService.sqlite3.open_v2("my-temp-db", sqliteService.sqlite3.OPEN_READWRITE | sqliteService.sqlite3.OPEN_CREATE, "memory");
       const keys = Array.from(sqliteService.memoryVfs.mapNameToFile.keys());
       console.log('MemoryVFS files created:', keys);
     } catch (e) {
       console.error("eval error:", e);
     }
  });
  await browser.close();
})();
