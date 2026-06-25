import { Page } from '@playwright/test';
import { getBaseUrl } from '../config/baseUrl';

export class DynamicPaginationTablePage {
  private page: Page;
  private url = `${getBaseUrl()}/dynamic-pagination-table`;
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
    await this.page.waitForSelector(this.tableSelector, { timeout: 10000 });
  }

  async getHeaders(): Promise<string[]> {
    return this.page.$$eval(this.headerCells, (headers) =>
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
    return (await this.getTableRows()).length;
  }

  async getCurrentPageNumber(): Promise<number> {
    const currentPageText = await this.page.textContent('.paginate_button.page-item.active');
    return Number(currentPageText?.trim() ?? '0');
  }

  async goToPage(pageNumber: number): Promise<void> {
    const target = this.page.locator('.paginate_button.page-item a', { hasText: pageNumber.toString() });
    await target.first().click();
    await this.page.waitForSelector(this.rowSelector, { timeout: 10000 });
  }

  async goToNextPage(): Promise<void> {
    await this.page.locator('a.page-link', { hasText: 'Next' }).click();
    await this.page.waitForSelector(this.rowSelector, { timeout: 10000 });
  }

  async isPageNumberVisible(pageNumber: number): Promise<boolean> {
    return await this.page.locator('.paginate_button.page-item', { hasText: pageNumber.toString() }).count() > 0;
  }
}
