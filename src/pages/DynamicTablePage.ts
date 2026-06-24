import { Page } from '@playwright/test';

export class DynamicTablePage {
  private page: Page;
  private url = 'https://practice.expandtesting.com/dynamic-table';
  private tableSelector = 'table';
  private headerCells = 'table thead th';
  private rowSelector = 'table tbody tr';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  async getHeaders(): Promise<string[]> {
    await this.page.waitForSelector(this.headerCells, { timeout: 10000 });
    return this.page.$$eval(this.headerCells, headers =>
      headers.map((header) => header.textContent?.trim() ?? '')
    );
  }

  async getTableRows(): Promise<string[][]> {
    await this.page.waitForSelector(this.rowSelector, { timeout: 10000 });
    return this.page.$$eval(this.rowSelector, (rows) =>
      rows.map((row) =>
        Array.from(row.querySelectorAll('td')).map((cell) => cell.textContent?.trim() ?? '')
      )
    );
  }

  async getRowCount(): Promise<number> {
    const rows = await this.getTableRows();
    return rows.length;
  }

  async getRowData(name: string): Promise<string[] | null> {
    const rows = await this.getTableRows();
    const normalizedName = name.trim().toLowerCase();
    const row = rows.find((cells) => cells[0].trim().toLowerCase() === normalizedName);
    return row ?? null;
  }

  async isRowPresent(name: string): Promise<boolean> {
    const row = await this.getRowData(name);
    return row !== null;
  }
}
