import { chromium } from 'playwright';

async function inspectForgotPasswordPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://practice.expandtesting.com/forgot-password', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  // Get all input fields
  const inputs = await page.$$('input');
  console.log('Found inputs:', inputs.length);
  
  for (let i = 0; i < inputs.length; i++) {
    const type = await inputs[i].getAttribute('type');
    const name = await inputs[i].getAttribute('name');
    const id = await inputs[i].getAttribute('id');
    const placeholder = await inputs[i].getAttribute('placeholder');
    console.log(`Input ${i}: type=${type}, name=${name}, id=${id}, placeholder=${placeholder}`);
  }

  // Get all buttons
  const buttons = await page.$$('button');
  console.log('\nFound buttons:', buttons.length);
  
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    const type = await buttons[i].getAttribute('type');
    console.log(`Button ${i}: text="${text?.trim()}", type=${type}`);
  }

  // Get all links
  const links = await page.$$('a');
  console.log('\nFound links:', links.length);
  
  for (let i = 0; i < links.length; i++) {
    const text = await links[i].textContent();
    const href = await links[i].getAttribute('href');
    console.log(`Link ${i}: text="${text?.trim()}", href=${href}`);
  }

  await browser.close();
}

inspectForgotPasswordPage().catch(console.error);
