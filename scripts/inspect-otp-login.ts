import { chromium } from 'playwright';

async function inspectOtpLoginPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://practice.expandtesting.com/otp-login', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Get all input elements
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

    console.log('Inputs:', JSON.stringify(inputs, null, 2));
    console.log('Buttons:', JSON.stringify(buttons, null, 2));
    console.log('Alerts:', JSON.stringify(alerts, null, 2));

    // Check for any specific OTP related elements
    const otpInputs = await page.$$eval('input[type="text"], input[type="number"]', (elements) =>
      elements.map(el => {
        const input = el as HTMLInputElement;
        return {
          type: input.type,
          name: input.name,
          id: input.id,
          maxlength: input.maxLength
        };
      })
    );

    console.log('OTP-like inputs:', JSON.stringify(otpInputs, null, 2));

  } catch (error) {
    console.error('Error inspecting page:', error);
  } finally {
    await browser.close();
  }
}

inspectOtpLoginPage();