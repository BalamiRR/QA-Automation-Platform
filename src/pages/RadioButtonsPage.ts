import { Page } from '@playwright/test';

export class RadioButtonsPage {
  private page: Page;
  private url = 'https://practice.expandtesting.com/radio-buttons';
  private colorRadioGroup = 'input[name="color"]';
  private sportRadioGroup = 'input[name="sport"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  async getSelectedColor(): Promise<string> {
    return this.page.inputValue(`${this.colorRadioGroup}:checked`);
  }

  async getSelectedSport(): Promise<string> {
    return this.page.inputValue(`${this.sportRadioGroup}:checked`);
  }

  async selectColor(color: string): Promise<void> {
    await this.page.check(`input[name="color"][value="${color}"]`);
  }

  async selectSport(sport: string): Promise<void> {
    await this.page.check(`input[name="sport"][value="${sport}"]`);
  }

  async getColorOptions(): Promise<string[]> {
    return this.page.$$eval(this.colorRadioGroup, els =>
      els.map(el => (el as HTMLInputElement).value)
    );
  }
}
