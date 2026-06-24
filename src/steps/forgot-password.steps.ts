import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

let browser: Browser;
let page: Page;
let forgotPasswordPage: ForgotPasswordPage;

Given('I am on the forgot password page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.navigate();
});

When('I enter email {string} in the password recovery form', async function (email: string): Promise<void> {
  await forgotPasswordPage.fillEmail(email);
});

When('I submit the password recovery form', async function (): Promise<void> {
  await forgotPasswordPage.submitForm();
});

Then('I should see a success message for password recovery', async function (): Promise<void> {
  const successMessage = await forgotPasswordPage.getSuccessMessage();
  if (!successMessage) {
    throw new Error('Success message not found');
  }
  await browser.close();
});


