import { Page } from '@playwright/test';
import { getBaseUrl } from '../config/baseUrl';

export class LocatorsPage {
  private page: Page;
  private url = `${getBaseUrl()}/locators`;
  private heading = 'h1';
  private countrySelect = '#countrySelect';
  private newsletterEmailInput = '#newsletterEmail';
  private searchInput = 'input[placeholder="Search the site"]';
  private filterInput = 'input[placeholder="Filter by tag"]';
  private reloadButton = 'button[title="Refresh content"]';
  private externalLink = 'a.my-link';
  private statusMessage = '[data-testid="status-message"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    await this.page.waitForSelector(this.heading, { timeout: 10000 });
  }

  async getHeading(): Promise<string> {
    return (await this.page.textContent(this.heading))?.trim() ?? '';
  }

  async selectCountry(country: string): Promise<void> {
    await this.page.selectOption(this.countrySelect, { label: country });
  }

  async getSelectedCountry(): Promise<string> {
    return this.page.inputValue(this.countrySelect);
  }

  async enterNewsletterEmail(email: string): Promise<void> {
    await this.page.fill(this.newsletterEmailInput, email);
  }

  async getNewsletterEmailValue(): Promise<string> {
    return this.page.inputValue(this.newsletterEmailInput);
  }

  async searchSite(term: string): Promise<void> {
    await this.page.fill(this.searchInput, term);
  }

  async getSearchInputValue(): Promise<string> {
    return this.page.inputValue(this.searchInput);
  }

  async clickReload(): Promise<void> {
    await this.page.click(this.reloadButton);
  }

  async isReloadButtonVisible(): Promise<boolean> {
    return (await this.page.isVisible(this.reloadButton));
  }

  async getExpandTestingLinkHref(): Promise<string> {
    return (await this.page.getAttribute(this.externalLink, 'href')) ?? '';
  }

  async getStatusMessage(): Promise<string> {
    return (await this.page.textContent(this.statusMessage))?.trim() ?? '';
  }
}
