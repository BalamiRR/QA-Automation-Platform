import { Given, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { DynamicTablePage } from '../pages/DynamicTablePage';

let browser: Browser;
let page: Page;
let dynamicTablePage: DynamicTablePage;

Given('I am on the dynamic table page', async function (): Promise<void> {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  dynamicTablePage = new DynamicTablePage(page);
  await dynamicTablePage.navigate();
});

Then('I should see the dynamic table headers', async function (): Promise<void> {
  const headers = await dynamicTablePage.getHeaders();
  const expectedHeaders = ['Name', 'Network', 'Disk', 'Memory', 'CPU'];

  for (const expectedHeader of expectedHeaders) {
    if (!headers.includes(expectedHeader)) {
      await browser.close();
      throw new Error(`Expected header ${expectedHeader} not found in table headers: ${headers.join(', ')}`);
    }
  }
});

Then('the dynamic table should contain at least {int} rows', async function (expectedRowCount: number): Promise<void> {
  const rowCount = await dynamicTablePage.getRowCount();
  if (rowCount < expectedRowCount) {
    await browser.close();
    throw new Error(`Expected at least ${expectedRowCount} rows but found ${rowCount}`);
  }
  await browser.close();
});

Then('I should see a row for {string}', async function (rowName: string): Promise<void> {
  const present = await dynamicTablePage.isRowPresent(rowName);
  if (!present) {
    await browser.close();
    throw new Error(`Expected to find row for ${rowName} in the dynamic table`);
  }
});

Then('the row for {string} should have {int} columns', async function (rowName: string, expectedColumns: number): Promise<void> {
  const rowData = await dynamicTablePage.getRowData(rowName);
  if (!rowData) {
    await browser.close();
    throw new Error(`Row ${rowName} was not found in the dynamic table`);
  }
  if (rowData.length !== expectedColumns) {
    await browser.close();
    throw new Error(`Expected ${expectedColumns} columns for ${rowName} but found ${rowData.length}`);
  }
});

Then('the row for {string} should have valid performance values', async function (rowName: string): Promise<void> {
  const rowData = await dynamicTablePage.getRowData(rowName);
  if (!rowData) {
    await browser.close();
    throw new Error(`Row ${rowName} was not found in the dynamic table`);
  }

  const [, network, disk, memory, cpu] = rowData;
  const values = { network, disk, memory, cpu };

  for (const [key, value] of Object.entries(values)) {
    if (!value || value.length === 0) {
      await browser.close();
      throw new Error(`Expected ${key} value to be visible for ${rowName}, but it was empty`);
    }
  }
});

Then('I close the browser', async function (): Promise<void> {
  await browser.close();
});
