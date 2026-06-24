import { Page } from '@playwright/test';

export class InputsPage {
  private page: Page;
  private numberInput: string = '#input-number';
  private textInput: string = '#input-text';
  private passwordInput: string = '#input-password';
  private dateInput: string = '#input-date';
  private displayButton: string = '#btn-display-inputs';
  private clearButton: string = '#btn-clear-inputs';
  private outputNumber: string = '#output-number';
  private outputText: string = '#output-text';
  private outputPassword: string = '#output-password';
  private outputDate: string = '#output-date';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://practice.expandtesting.com/inputs', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  async fillNumber(value: string): Promise<void> {
    await this.page.fill(this.numberInput, value);
  }

  async fillText(value: string): Promise<void> {
    await this.page.fill(this.textInput, value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.page.fill(this.passwordInput, value);
  }

  async fillDate(value: string): Promise<void> {
    await this.page.fill(this.dateInput, value);
  }

  async clickDisplayInputs(): Promise<void> {
    await this.page.click(this.displayButton);
    await this.page.waitForSelector(this.outputNumber, { timeout: 10000 });
  }

  async clickClearInputs(): Promise<void> {
    await this.page.click(this.clearButton);
  }

  async getOutputNumber(): Promise<string | null> {
    const output = await this.page.$(this.outputNumber);
    return output ? await output.textContent() : null;
  }

  async getOutputText(): Promise<string | null> {
    const output = await this.page.$(this.outputText);
    return output ? await output.textContent() : null;
  }

  async getOutputPassword(): Promise<string | null> {
    const output = await this.page.$(this.outputPassword);
    return output ? await output.textContent() : null;
  }

  async getOutputDate(): Promise<string | null> {
    const output = await this.page.$(this.outputDate);
    return output ? await output.textContent() : null;
  }

  async getNumberValue(): Promise<string> {
    return await this.page.inputValue(this.numberInput);
  }

  async getTextValue(): Promise<string> {
    return await this.page.inputValue(this.textInput);
  }

  async getPasswordValue(): Promise<string> {
    return await this.page.inputValue(this.passwordInput);
  }

  async getDateValue(): Promise<string> {
    return await this.page.inputValue(this.dateInput);
  }
}
