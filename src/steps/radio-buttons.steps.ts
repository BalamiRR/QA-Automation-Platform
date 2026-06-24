import { Given, Then, When } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { RadioButtonsPage } from '../pages/RadioButtonsPage';

let browser: Browser;
let page: Page;
let radioButtonsPage: RadioButtonsPage;

Given('I am on the radio buttons page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  radioButtonsPage = new RadioButtonsPage(page);
  await radioButtonsPage.navigate();
});

Then('the default selected color should be {string}', async function (color: string): Promise<void> {
  const selectedColor = await radioButtonsPage.getSelectedColor();
  if (selectedColor.toLowerCase() !== color.toLowerCase()) {
    await browser.close();
    throw new Error(`Expected default color to be ${color}, but found ${selectedColor}`);
  }
});

Then('the default selected sport should be {string}', async function (sport: string): Promise<void> {
  const selectedSport = await radioButtonsPage.getSelectedSport();
  if (selectedSport.toLowerCase() !== sport.toLowerCase()) {
    await browser.close();
    throw new Error(`Expected default sport to be ${sport}, but found ${selectedSport}`);
  }
});

When('I choose the color {string}', async function (color: string): Promise<void> {
  await radioButtonsPage.selectColor(color);
});

When('I choose the sport {string}', async function (sport: string): Promise<void> {
  await radioButtonsPage.selectSport(sport);
});

Then('the selected color should be {string}', async function (color: string): Promise<void> {
  const selectedColor = await radioButtonsPage.getSelectedColor();
  if (selectedColor.toLowerCase() !== color.toLowerCase()) {
    await browser.close();
    throw new Error(`Expected selected color to be ${color}, but found ${selectedColor}`);
  }
});

Then('the selected sport should be {string}', async function (sport: string): Promise<void> {
  const selectedSport = await radioButtonsPage.getSelectedSport();
  if (selectedSport.toLowerCase() !== sport.toLowerCase()) {
    await browser.close();
    throw new Error(`Expected selected sport to be ${sport}, but found ${selectedSport}`);
  }
});

Then('I should see {int} color options', async function (expectedCount: number): Promise<void> {
  const options = await radioButtonsPage.getColorOptions();
  if (options.length !== expectedCount) {
    await browser.close();
    throw new Error(`Expected ${expectedCount} color options, but found ${options.length}`);
  }
});

Then('I close the radio buttons browser', async function (): Promise<void> {
  await browser.close();
});
