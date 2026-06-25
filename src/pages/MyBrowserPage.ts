import { Page } from '@playwright/test';
import { getBaseUrl } from '../config/baseUrl';

export class MyBrowserPage {
  private page: Page;
  private url = `${getBaseUrl()}/my-browser`;
  private browserToggleButton = '#browser-toggle';
  private browserInfoSection = 'div:has-text("User Agent")';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  async isShowBrowserButtonVisible(): Promise<boolean> {
    return this.page.isVisible(this.browserToggleButton);
  }

  async showBrowserInformation(): Promise<void> {
    await this.page.click(this.browserToggleButton);
    await this.page.waitForSelector('#browser-user-agent', { timeout: 10000 });
  }

  async isBrowserInfoVisible(): Promise<boolean> {
    return this.page.isVisible('#browser-user-agent');
  }

  async getBrowserUserAgent(): Promise<string> {
    return (await this.page.textContent('#browser-user-agent'))?.trim() ?? '';
  }
}
