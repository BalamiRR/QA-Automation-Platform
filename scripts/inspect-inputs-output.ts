import { chromium } from 'playwright';

async function inspectInputsOutput() {
  const browser = await chromium.launch({ headless: false });
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
  const output = await page.$$('*');
  for (let i = 0; i < output.length; i++) {
    const text = (await output[i].textContent())?.trim();
    if (text && text.length > 0 && text !== 'Display Inputs' && text !== 'Clear Inputs') {
      console.log(`Element ${i}: ${text}`);
    }
  }

  await browser.close();
}

inspectInputsOutput().catch(console.error);
