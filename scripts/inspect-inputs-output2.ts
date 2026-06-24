import { chromium } from 'playwright';

async function inspectInputsOutput() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://practice.expandtesting.com/inputs', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  await page.fill('#input-number', '42');
  await page.fill('#input-text', 'Hello');
  await page.fill('#input-password', 'P@ssw0rd');
  await page.fill('#input-date', '2026-04-13');
  await page.click('button:has-text("Display Inputs")');

  await page.waitForTimeout(2000);

  const matches = await page.$$eval('*', els =>
    els
      .map(el => ({ tag: el.tagName.toLowerCase(), text: el.textContent?.trim() }))
      .filter(x => x.text && (x.text.includes('42') || x.text.includes('Hello') || x.text.includes('P@ssw0rd') || x.text.includes('2026-04-13')))
  );

  console.log(JSON.stringify(matches, null, 2));
  await browser.close();
}

inspectInputsOutput().catch(e => {
  console.error(e);
  process.exit(1);
});
