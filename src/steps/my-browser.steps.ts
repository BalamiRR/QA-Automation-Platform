import { Given, Then, When } from '@cucumber/cucumber';
import { MyBrowserPage } from '../pages/MyBrowserPage';
import { CustomWorld } from '../support/hooks';

let myBrowserPage: MyBrowserPage;

Given('I am on the my browser page', async function (this: CustomWorld): Promise<void> {
  myBrowserPage = new MyBrowserPage(this.page);
  await myBrowserPage.navigate();
});

Then('I should see the browser information button', async function (this: CustomWorld): Promise<void> {
  const visible = await myBrowserPage.isShowBrowserButtonVisible();
  if (!visible) {
    throw new Error('Expected the Show Browser Information button to be visible');
  }
});

When('I request browser information', async function (this: CustomWorld): Promise<void> {
  await myBrowserPage.showBrowserInformation();
});

Then('browser information should be visible', async function (this: CustomWorld): Promise<void> {
  const visible = await myBrowserPage.isBrowserInfoVisible();
  if (!visible) {
    throw new Error('Expected browser information section to be visible after clicking the button');
  }
});

Then('the browser user agent should contain {string}', async function (this: CustomWorld, expectedText: string): Promise<void> {
  const userAgent = await myBrowserPage.getBrowserUserAgent();
  if (!userAgent.toLowerCase().includes(expectedText.toLowerCase())) {
    throw new Error(`Expected user agent to include ${expectedText}, but found: ${userAgent}`);
  }
});

Then('I close the my browser page browser', async function (this: CustomWorld): Promise<void> {
  // Browser and page cleanup handled in After hook
});
