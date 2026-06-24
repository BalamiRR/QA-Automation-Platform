import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { OtpLoginPage } from '../pages/OtpLoginPage';

let browser: Browser;
let page: Page;
let otpLoginPage: OtpLoginPage;

Given('I am on the OTP login page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  otpLoginPage = new OtpLoginPage(page);
  await otpLoginPage.navigate();
});

When('I enter email {string} for OTP login', async function (email: string): Promise<void> {
  await otpLoginPage.fillEmail(email);
});

When('I click the send OTP button', async function (): Promise<void> {
  await otpLoginPage.clickSendOtp();
});

When('I enter OTP code {string}', async function (otp: string): Promise<void> {
  await otpLoginPage.fillOtp(otp);
});

When('I click the verify OTP button', async function (): Promise<void> {
  await otpLoginPage.clickVerifyOtp();
});

Then('I should see the OTP sent message for {string}', async function (email: string): Promise<void> {
  const message = await otpLoginPage.getOtpSentMessage();
  if (!message || !message.includes(email)) {
    throw new Error(`Expected OTP sent message for ${email}, but got: ${message}`);
  }
});

Then('the OTP input field should be visible', async function (): Promise<void> {
  const isVisible = await otpLoginPage.isOtpInputVisible();
  if (!isVisible) {
    throw new Error('OTP input field is not visible');
  }
});

Then('the verify OTP button should be visible', async function (): Promise<void> {
  const isVisible = await otpLoginPage.isVerifyButtonVisible();
  if (!isVisible) {
    throw new Error('Verify OTP button is not visible');
  }
});

Then('I should be logged in successfully via OTP', async function (): Promise<void> {
  const successMessage = await otpLoginPage.getSuccessMessage();
  if (!successMessage) {
    throw new Error('Success message not found');
  }
  await browser.close();
});

Then('I should see an OTP error message', async function (): Promise<void> {
  const errorMessage = await otpLoginPage.getErrorMessage();
  if (!errorMessage) {
    throw new Error('Error message not found');
  }
  await browser.close();
});
