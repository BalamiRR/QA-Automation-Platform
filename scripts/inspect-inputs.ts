import { chromium } from 'playwright';

async function inspectInputs() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://practice.expandtesting.com/inputs', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  const inputs = await page.$$('input, textarea, select');
  console.log('Found controls:', inputs.length);
  for (let i = 0; i < inputs.length; i++) {
    const tag = await inputs[i].evaluate((el) => el.tagName.toLowerCase());
    const type = await inputs[i].getAttribute('type');
    const id = await inputs[i].getAttribute('id');
    const name = await inputs[i].getAttribute('name');
    const placeholder = await inputs[i].getAttribute('placeholder');
    console.log(`Control ${i}: tag=${tag}, type=${type}, id=${id}, name=${name}, placeholder=${placeholder}`);
  }

  const buttons = await page.$$('button, input[type="submit"], input[type="button"]');
  console.log('Found buttons:', buttons.length);
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    const type = await buttons[i].getAttribute('type');
    console.log(`Button ${i}: text=${text?.trim()}, type=${type}`);
  }

  await browser.close();
}

inspectInputs().catch(console.error);
