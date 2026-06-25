import { Before, After, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page } from 'playwright';
import { createBrowser } from './browser';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
}

setWorldConstructor(CustomWorld);

setDefaultTimeout(60000);

Before(async function (this: CustomWorld): Promise<void> {
  this.browser = await createBrowser();
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
