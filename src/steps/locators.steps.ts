import { Given, Then, When } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LocatorsPage } from '../pages/LocatorsPage';

let browser: Browser;
let page: Page;
let locatorsPage: LocatorsPage;

Given('I am on the locators page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  locatorsPage = new LocatorsPage(page);
  await locatorsPage.navigate();
});

Then('I should see the locators page heading', async function (): Promise<void> {
  const heading = await locatorsPage.getHeading();
  if (!heading.toLowerCase().includes('locators test page')) {
    await browser.close();
    throw new Error(`Expected locators page heading, but found ${heading}`);
  }
});

When('I select {string} from the country dropdown', async function (country: string): Promise<void> {
  await locatorsPage.selectCountry(country);
});

Then('the selected country should be {string}', async function (country: string): Promise<void> {
  const selectedCountry = await locatorsPage.getSelectedCountry();
  if (selectedCountry.toLowerCase() !== country.toLowerCase()) {
    await browser.close();
    throw new Error(`Expected selected country to be ${country}, but found ${selectedCountry}`);
  }
});

When('I enter {string} into the newsletter email field', async function (email: string): Promise<void> {
  await locatorsPage.enterNewsletterEmail(email);
});

Then('the newsletter email field should contain {string}', async function (email: string): Promise<void> {
  const value = await locatorsPage.getNewsletterEmailValue();
  if (value !== email) {
    await browser.close();
    throw new Error(`Expected newsletter email input to contain ${email}, but found ${value}`);
  }
});

When('I search for {string} using the search box', async function (term: string): Promise<void> {
  await locatorsPage.searchSite(term);
});

Then('the search input should display {string}', async function (term: string): Promise<void> {
  const value = await locatorsPage.getSearchInputValue();
  if (value !== term) {
    await browser.close();
    throw new Error(`Expected search input value to be ${term}, but found ${value}`);
  }
});

When('I click the reload button', async function (): Promise<void> {
  await locatorsPage.clickReload();
});

Then('the reload button should be visible', async function (): Promise<void> {
  const visible = await locatorsPage.isReloadButtonVisible();
  if (!visible) {
    await browser.close();
    throw new Error('Expected reload button to be visible');
  }
});

Then('the status message should include {string}', async function (expectedText: string): Promise<void> {
  const message = await locatorsPage.getStatusMessage();
  if (!message.toLowerCase().includes(expectedText.toLowerCase())) {
    await browser.close();
    throw new Error(`Expected status message to include ${expectedText}, but found ${message}`);
  }
});

Then('the Expand Testing link should point to a valid href', async function (): Promise<void> {
  const href = await locatorsPage.getExpandTestingLinkHref();
  if (!href || !href.includes('expandtesting.com')) {
    await browser.close();
    throw new Error(`Expected Expand Testing link href to include expandtesting.com, but found ${href}`);
  }
});

Then('I close the locators browser', async function (): Promise<void> {
  await browser.close();
});
