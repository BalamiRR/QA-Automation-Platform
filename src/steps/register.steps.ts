import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { RegisterPage } from '../pages/RegisterPage';

let browser: Browser;
let page: Page;
let registerPage: RegisterPage;

Given('I am on the registration page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  registerPage = new RegisterPage(page);
  await registerPage.navigate();
});

When('I fill in the registration form with valid details', async function (): Promise<void> {
  await registerPage.fillUsername('testuser' + Date.now());
  await registerPage.fillPassword('password123');
  await registerPage.fillConfirmPassword('password123');
});

When('I submit the registration form', async function (): Promise<void> {
  await registerPage.submitForm();
});

Then('I should see a success message', async function (): Promise<void> {
  const successMessage = await registerPage.getSuccessMessage();
  if (!successMessage || !successMessage.includes('Successfully registered')) {
    throw new Error('Success message not found');
  }
  await browser.close();
});

