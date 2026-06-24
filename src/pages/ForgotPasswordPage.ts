import { Page } from '@playwright/test';

export class ForgotPasswordPage {
  private page: Page;
  private emailInput: string = 'input[type="email"]';
  private submitButton: string = 'button[type="submit"]';
  private infoMessage: string = '.alert-info';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://practice.expandtesting.com/forgot-password', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
  }

  async submitForm(): Promise<void> {
    await this.page.click(this.submitButton);
    // Wait for info message to appear
    await Promise.race([
      this.page.waitForSelector(this.infoMessage, { timeout: 10000 }).catch(() => null),
      this.page.waitForNavigation({ timeout: 10000, waitUntil: 'load' }).catch(() => null)
    ]);
  }

  async getSuccessMessage(): Promise<string | null> {
    try {
      await this.page.waitForSelector(this.infoMessage, { timeout: 5000 });
      return await this.page.textContent(this.infoMessage);
    } catch {
      return null;
    }
  }
}