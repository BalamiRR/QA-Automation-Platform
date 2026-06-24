import { chromium } from 'playwright';

async function inspectForgotPasswordAfterSubmit() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://practice.expandtesting.com/forgot-password', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  // Fill email and submit
  await page.fill('input[type="email"]', 'practice@expandtesting.com');
  
  // Listen for navigation
  const navigationPromise = page.waitForNavigation({ waitUntil: 'load' }).catch(() => null);
  await page.click('button[type="submit"]');
  await navigationPromise;

  // Wait a bit for page to settle
  await page.waitForTimeout(2000);

  console.log('Current URL:', page.url());

  // Check for all alert messages
  const alerts = await page.$$('.alert');
  console.log('\nFound alerts:', alerts.length);
  
  for (let i = 0; i < alerts.length; i++) {
    const className = await alerts[i].getAttribute('class');
    const text = await alerts[i].textContent();
    console.log(`Alert ${i}: class="${className}", text="${text?.trim()}"`);
  }

  // Check for any success or error classes
  const successElements = await page.$$('.alert-success, .success, [class*="success"]');
  console.log('\nFound success elements:', successElements.length);
  for (let i = 0; i < successElements.length; i++) {
    const text = await successElements[i].textContent();
    console.log(`Success element ${i}: "${text?.trim()}"`);
  }

  const errorElements = await page.$$('.alert-danger, .error, [class*="error"]');
  console.log('\nFound error elements:', errorElements.length);
  for (let i = 0; i < errorElements.length; i++) {
    const text = await errorElements[i].textContent();
    console.log(`Error element ${i}: "${text?.trim()}"`);
  }

  await page.waitForTimeout(3000);
  await browser.close();
}

inspectForgotPasswordAfterSubmit().catch(console.error);
