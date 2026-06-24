import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/LoginPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('I am on the login page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

When('I enter username {string}', async function (username: string): Promise<void> {
  await loginPage.fillUsername(username);
});

When('I enter password {string}', async function (password: string): Promise<void> {
  await loginPage.fillPassword(password);
});

When('I click the login button', async function (): Promise<void> {
  await loginPage.submitForm();
});

Then('I should be logged in successfully', async function (): Promise<void> {
  const dashboardHeading = await loginPage.getDashboardHeading();
  if (!dashboardHeading) {
    throw new Error('Dashboard heading not found');
  }
  await browser.close();
});

Then('I should see an error message', async function (): Promise<void> {
  const errorMessage = await loginPage.getErrorMessage();
  if (!errorMessage) {
    throw new Error('Error message not found');
  }
  await browser.close();
});
