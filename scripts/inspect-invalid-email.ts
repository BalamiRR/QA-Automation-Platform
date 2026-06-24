import { chromium } from 'playwright';

async function inspectInvalidEmail() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://practice.expandtesting.com/forgot-password', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  // Fill invalid email and submit
  await page.fill('input[type="email"]', 'invalid@example.com');
  
  // Listen for navigation
  const navigationPromise = page.waitForNavigation({ waitUntil: 'load' }).catch(() => null);
  await page.click('button[type="submit"]');
  await navigationPromise;

  // Wait a bit for page to settle
  await page.waitForTimeout(2000);

  console.log('Current URL:', page.url());

  // Check for all alert messages and any message divs
  const allAlerts = await page.$$('.alert');
  console.log('\nFound all alerts:', allAlerts.length);
  
  for (let i = 0; i < allAlerts.length; i++) {
    const className = await allAlerts[i].getAttribute('class');
    const text = await allAlerts[i].textContent();
    console.log(`Alert ${i}: class="${className}", text="${text?.trim()}"`);
  }

  // Check for alert container or message elements
  const alertContainers = await page.$$('[class*="alert"]');
  console.log('\nFound alert containers:', alertContainers.length);
  for (let i = 0; i < alertContainers.length; i++) {
    const className = await alertContainers[i].getAttribute('class');
    const text = await alertContainers[i].textContent();
    console.log(`Container ${i}: class="${className}", text="${text?.substring(0, 100)}..."`);
  }

  await page.waitForTimeout(3000);
  await browser.close();
}

inspectInvalidEmail().catch(console.error);
