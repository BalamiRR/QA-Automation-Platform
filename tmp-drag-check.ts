import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://practice.expandtesting.com/drag-and-drop-circles', { waitUntil: 'networkidle', timeout: 60000 });
  console.log('green before count', await page.$$eval('#source .green', els => els.length));
  await page.dragAndDrop('#source .green', '#target');
  await page.waitForTimeout(1000);
  console.log('targetAfter', await page.innerHTML('#target'));
  console.log('sourceAfter', await page.$$eval('#source div', els => els.map(el => el.className)));
  await browser.close();
})();