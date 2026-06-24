import { Page } from '@playwright/test';

export class RegisterPage {
  private page: Page;
  private usernameInput: string = 'input[name="username"]';
  private passwordInput: string = 'input[name="password"]';
  private confirmPasswordInput: string = 'input[name="confirmPassword"]';
  private submitButton: string = 'button[type="submit"]';
  private successMessage: string = '.alert';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://practice.expandtesting.com/register', {
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

  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.page.fill(this.confirmPasswordInput, confirmPassword);
  }

  async submitForm(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  async getSuccessMessage(): Promise<string | null> {
    await this.page.waitForSelector(this.successMessage, { timeout: 10000 });
    return await this.page.textContent(this.successMessage);
  }
}
