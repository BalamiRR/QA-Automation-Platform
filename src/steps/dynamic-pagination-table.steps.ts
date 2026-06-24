import { Given, Then, When } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { DynamicPaginationTablePage } from '../pages/DynamicPaginationTablePage';

let browser: Browser;
let page: Page;
let dynamicPaginationTablePage: DynamicPaginationTablePage;

Given('I am on the dynamic pagination table page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  dynamicPaginationTablePage = new DynamicPaginationTablePage(page);
  await dynamicPaginationTablePage.navigate();
});

Then('the dynamic pagination table should display the correct headers', async function (): Promise<void> {
  const expectedHeaders = ['Student Name', 'Gender', 'Class Level', 'Home State', 'Major', 'Extracurricular Activity'];
  const headers = await dynamicPaginationTablePage.getHeaders();

  for (const expectedHeader of expectedHeaders) {
    if (!headers.includes(expectedHeader)) {
      await browser.close();
      throw new Error(`Expected header ${expectedHeader} not found. Actual headers: ${headers.join(', ')}`);
    }
  }
});

Then('the dynamic pagination table should contain at least {int} rows on the current page', async function (expectedRowCount: number): Promise<void> {
  const rowCount = await dynamicPaginationTablePage.getRowCount();
  if (rowCount < expectedRowCount) {
    await browser.close();
    throw new Error(`Expected at least ${expectedRowCount} rows but found ${rowCount}`);
  }
});

When('I move to page {int} of the pagination controls', async function (pageNumber: number): Promise<void> {
  await dynamicPaginationTablePage.goToPage(pageNumber);
});

Then('page {int} should be active in the pagination controls', async function (pageNumber: number): Promise<void> {
  const currentPage = await dynamicPaginationTablePage.getCurrentPageNumber();
  if (currentPage !== pageNumber) {
    await browser.close();
    throw new Error(`Expected current page to be ${pageNumber}, but found ${currentPage}`);
  }
});

When('I move to the next table page', async function (): Promise<void> {
  await dynamicPaginationTablePage.goToNextPage();
});

Then('the next page button should be visible', async function (): Promise<void> {
  const visible = await dynamicPaginationTablePage.isPageNumberVisible(2);
  if (!visible) {
    await browser.close();
    throw new Error('Expected page 2 to be visible in pagination controls');
  }
});

Then('I close the pagination browser', async function (): Promise<void> {
  await browser.close();
});
