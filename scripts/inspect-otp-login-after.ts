import { chromium } from 'playwright';

async function inspectOtpLoginAfterSend() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://practice.expandtesting.com/otp-login', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Fill email and click send OTP
    await page.fill('#email', 'practice@expandtesting.com');
    await page.click('#btn-send-otp');

    // Wait a bit for the page to update
    await page.waitForTimeout(2000);

    // Get all input elements after sending OTP
    const inputs = await page.$$eval('input', (elements) =>
      elements.map(el => ({
        type: el.type,
        name: el.name,
        id: el.id,
        placeholder: el.placeholder,
        value: el.value
      }))
    );

    // Get all button elements
    const buttons = await page.$$eval('button', (elements) =>
      elements.map(el => ({
        type: el.type,
        text: el.textContent?.trim(),
        id: el.id,
        class: el.className
      }))
    );

    // Get any alert or message elements
    const alerts = await page.$$eval('.alert, .alert-success, .alert-danger, .alert-info', (elements) =>
      elements.map(el => ({
        class: el.className,
        text: el.textContent?.trim()
      }))
    );

    console.log('Inputs after sending OTP:', JSON.stringify(inputs, null, 2));
    console.log('Buttons after sending OTP:', JSON.stringify(buttons, null, 2));
    console.log('Alerts after sending OTP:', JSON.stringify(alerts, null, 2));

  } catch (error) {
    console.error('Error inspecting page:', error);
  } finally {
    await browser.close();
  }
}

inspectOtpLoginAfterSend();