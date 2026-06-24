import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { InputsPage } from '../pages/InputsPage';

let browser: Browser;
let page: Page;
let inputsPage: InputsPage;

Given('I am on the inputs page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  inputsPage = new InputsPage(page);
  await inputsPage.navigate();
});

When('I enter number {string}', async function (value: string): Promise<void> {
  await inputsPage.fillNumber(value);
});

When('I enter text {string}', async function (value: string): Promise<void> {
  await inputsPage.fillText(value);
});

When('I enter the input password {string}', async function (value: string): Promise<void> {
  await inputsPage.fillPassword(value);
});

When('I enter date {string}', async function (value: string): Promise<void> {
  await inputsPage.fillDate(value);
});

When('I click the display inputs button', async function (): Promise<void> {
  await inputsPage.clickDisplayInputs();
});

When('I click the clear inputs button', async function (): Promise<void> {
  await inputsPage.clickClearInputs();
});

Then('I should see the output number {string}', async function (expected: string): Promise<void> {
  const actual = await inputsPage.getOutputNumber();
  if (actual?.trim() !== expected) {
    throw new Error(`Expected output number to be "${expected}" but got "${actual}"`);
  }
});

Then('I should see the output text {string}', async function (expected: string): Promise<void> {
  const actual = await inputsPage.getOutputText();
  if (actual?.trim() !== expected) {
    throw new Error(`Expected output text to be "${expected}" but got "${actual}"`);
  }
});

Then('I should see the output password {string}', async function (expected: string): Promise<void> {
  const actual = await inputsPage.getOutputPassword();
  if (actual?.trim() !== expected) {
    throw new Error(`Expected output password to be "${expected}" but got "${actual}"`);
  }
});

Then('I should see the output date {string}', async function (expected: string): Promise<void> {
  const actual = await inputsPage.getOutputDate();
  if (actual?.trim() !== expected) {
    throw new Error(`Expected output date to be "${expected}" but got "${actual}"`);
  }
  await browser.close();
});

Then('the inputs should be cleared', async function (): Promise<void> {
  const numberValue = await inputsPage.getNumberValue();
  const textValue = await inputsPage.getTextValue();
  const passwordValue = await inputsPage.getPasswordValue();
  const dateValue = await inputsPage.getDateValue();

  if (numberValue !== '' || textValue !== '' || passwordValue !== '' || dateValue !== '') {
    throw new Error('Expected all input fields to be cleared');
  }
});

Then('there should be no input outputs visible', async function (): Promise<void> {
  const numberOutput = await inputsPage.getOutputNumber();
  const textOutput = await inputsPage.getOutputText();
  const passwordOutput = await inputsPage.getOutputPassword();
  const dateOutput = await inputsPage.getOutputDate();

  if (numberOutput || textOutput || passwordOutput || dateOutput) {
    throw new Error('Expected no input outputs to be visible after clearing the inputs');
  }
  await browser.close();
});
