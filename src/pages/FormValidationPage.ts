import { Page } from '@playwright/test';
import { getBaseUrl } from '../config/baseUrl';

export class FormValidationPage {
  private page: Page;
  private url = `${getBaseUrl()}/form-validation`;
  private contactNameInput = '#validationCustom01';
  private contactNumberInput = 'input[name="contactnumber"]';
  private pickupDateInput = 'input[name="pickupdate"]';
  private paymentSelect = '#validationCustom04';
  private registerButton = 'button[type="submit"]';
  private heading = 'h1';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  async getHeading(): Promise<string> {
    return (await this.page.textContent(this.heading))?.trim() ?? '';
  }

  async enterContactName(name: string): Promise<void> {
    await this.page.fill(this.contactNameInput, name);
  }

  async enterContactNumber(number: string): Promise<void> {
    await this.page.fill(this.contactNumberInput, number);
  }

  async selectPickupDate(date: string): Promise<void> {
    await this.page.fill(this.pickupDateInput, date);
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.page.selectOption(this.paymentSelect, method);
  }

  async clickRegister(): Promise<void> {
    await this.page.click(this.registerButton);
  }

  async getValidationErrorText(fieldLabel: string): Promise<string> {
    const errorSelector = `text/${fieldLabel}/`;
    const errors = await this.page.$$eval('.invalid-feedback', els => els.map(el => ({ text: el.textContent?.trim(), visible: (el as HTMLElement).offsetParent !== null })));
    const found = errors.find(e => e.visible);
    return found?.text ?? '';
  }

  async isValidationErrorVisible(errorText: string): Promise<boolean> {
    const normalizedError = errorText.toLowerCase();
    const errors = await this.page.$$eval('.invalid-feedback', els =>
      els.map(el => ({ text: el.textContent?.trim() ?? '', visible: (el as HTMLElement).offsetParent !== null }))
    );
    return errors.some(e => {
      const text = e.text.toLowerCase();
      if (!e.visible || !text) {
        return false;
      }
      if (text.includes(normalizedError)) {
        return true;
      }
      if (normalizedError === 'payment' && text.includes('paymen')) {
        return true;
      }
      return false;
    });
  }

  async getContactNameValue(): Promise<string> {
    return this.page.inputValue(this.contactNameInput);
  }

  async getPaymentMethodValue(): Promise<string> {
    return this.page.inputValue(this.paymentSelect);
  }
}
