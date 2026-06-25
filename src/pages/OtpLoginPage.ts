import { Page } from '@playwright/test';
import { getBaseUrl } from '../config/baseUrl';

export class OtpLoginPage {
  private page: Page;
  private emailInput: string = '#email';
  private otpInput: string = '#otp';
  private sendOtpButton: string = '#btn-send-otp';
  private verifyOtpButton: string = '#btn-send-verify';
  private otpSentAlert: string = '.alert-info';
  private successMessage: string = '.alert-success';
  private errorMessage: string = '.alert-danger';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${getBaseUrl()}/otp-login`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
  }

  async fillOtp(otp: string): Promise<void> {
    await this.page.fill(this.otpInput, otp);
  }

  async clickSendOtp(): Promise<void> {
    await this.page.click(this.sendOtpButton);
    await this.page.waitForSelector(this.otpInput, { timeout: 10000 });
  }

  async clickVerifyOtp(): Promise<void> {
    await this.page.click(this.verifyOtpButton);
    await this.page.waitForLoadState('load');
  }

  async getOtpSentMessage(): Promise<string | null> {
    const alert = await this.page.$(this.otpSentAlert);
    return alert ? await alert.textContent() : null;
  }

  async getSuccessMessage(): Promise<string | null> {
    const alert = await this.page.$(this.successMessage);
    return alert ? await alert.textContent() : null;
  }

  async getErrorMessage(): Promise<string | null> {
    const alert = await this.page.$(this.errorMessage);
    return alert ? await alert.textContent() : null;
  }

  async isOtpInputVisible(): Promise<boolean> {
    return await this.page.isVisible(this.otpInput);
  }

  async isVerifyButtonVisible(): Promise<boolean> {
    return await this.page.isVisible(this.verifyOtpButton);
  }
}
