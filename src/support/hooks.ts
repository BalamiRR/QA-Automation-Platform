import { Before, After, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
}

setWorldConstructor(CustomWorld);

setDefaultTimeout(60000);

Before(async function (this: CustomWorld): Promise<void> {
  this.browser = await chromium.launch({ headless: true }); // Or false for debugging
  this.page = await this.browser.newPage();
});

After(async function (this: CustomWorld): Promise<void> {
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});
