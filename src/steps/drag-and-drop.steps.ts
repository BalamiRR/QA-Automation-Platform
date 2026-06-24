import { Given, Then, When } from '@cucumber/cucumber';
import { DragAndDropPage } from '../pages/DragAndDropPage';
import { CustomWorld } from '../support/hooks';

let dragAndDropPage: DragAndDropPage;

Given('I am on the drag and drop page', async function (this: CustomWorld): Promise<void> {
  dragAndDropPage = new DragAndDropPage(this.page);
  await dragAndDropPage.navigate();
});

Then('the drag and drop page should have a visible header', async function (this: CustomWorld): Promise<void> {
  const header = await dragAndDropPage.getHeader();
  if (!header.toLowerCase().includes('drag and drop page')) {
    throw new Error(`Expected drag and drop page header, but found: ${header}`);
  }
});

Then('I should see draggable boxes A and B', async function (this: CustomWorld): Promise<void> {
  const textA = await dragAndDropPage.getColumnText('#column-a');
  const textB = await dragAndDropPage.getColumnText('#column-b');
  if (textA !== 'A' || textB !== 'B') {
    throw new Error(`Expected column-a to contain A and column-b to contain B, but found: ${textA} / ${textB}`);
  }
});

When('I drag box A onto box B', async function (this: CustomWorld): Promise<void> {
  await dragAndDropPage.dragAtoB();
});

Then('box A and box B should swap places', async function (this: CustomWorld): Promise<void> {
  const textA = await dragAndDropPage.getColumnText('#column-a');
  const textB = await dragAndDropPage.getColumnText('#column-b');
  if (textA !== 'B' || textB !== 'A') {
    throw new Error(`Expected columns to swap after drag, but found: ${textA} / ${textB}`);
  }
});

When('I drag box B back onto box A', async function (this: CustomWorld): Promise<void> {
  await dragAndDropPage.dragBtoA();
});

Then('box A and box B should return to their original positions', async function (this: CustomWorld): Promise<void> {
  const textA = await dragAndDropPage.getColumnText('#column-a');
  const textB = await dragAndDropPage.getColumnText('#column-b');
  if (textA !== 'A' || textB !== 'B') {
    throw new Error(`Expected columns to return to A/B, but found: ${textA} / ${textB}`);
  }
});

Then('I close the drag page browser', async function (this: CustomWorld): Promise<void> {
  // Browser and page cleanup handled in After hook
});
