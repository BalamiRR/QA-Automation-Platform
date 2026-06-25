import { Page } from '@playwright/test';
import { getBaseUrl } from '../config/baseUrl';

export class LoginPage {
  private page: Page;
  private usernameInput: string = 'input[name="username"]';
  private passwordInput: string = 'input[name="password"]';
  private submitButton: string = 'button[type="submit"]';
  private errorMessage: string = '.alert-danger';
  private dashboardHeading: string = 'h1';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${getBaseUrl()}/login`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async submitForm(): Promise<void> {
    await this.page.click(this.submitButton);
    await this.page.waitForLoadState('load');
  }

  async getDashboardHeading(): Promise<string | null> {
    await this.page.waitForSelector(this.dashboardHeading, { timeout: 10000 });
    return await this.page.textContent(this.dashboardHeading);
  }

  async getErrorMessage(): Promise<string | null> {
    const errorVisible = await this.page.$(this.errorMessage);
    if (!errorVisible) {
      return null;
    }
    return await this.page.textContent(this.errorMessage);
  }
}
