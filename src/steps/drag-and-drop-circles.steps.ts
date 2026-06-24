import { Given, Then, When } from '@cucumber/cucumber';
import { DragAndDropCirclesPage } from '../pages/DragAndDropCirclesPage';
import { CustomWorld } from '../support/hooks';

let dragAndDropCirclesPage: DragAndDropCirclesPage;

Given('I am on the drag and drop circles page', async function (this: CustomWorld): Promise<void> {
  dragAndDropCirclesPage = new DragAndDropCirclesPage(this.page);
  await dragAndDropCirclesPage.navigate();
});

Then('the drag and drop circles page should have the correct header', async function (this: CustomWorld): Promise<void> {
  const header = await dragAndDropCirclesPage.getHeader();
  if (!header.toLowerCase().includes('drag and drop circles')) {
    throw new Error(`Expected drag and drop circles header, but found: ${header}`);
  }
});

Then('I should see three draggable circle options', async function (this: CustomWorld): Promise<void> {
  const options = await dragAndDropCirclesPage.getSourceCircleClasses();
  const expected = ['red', 'green', 'blue'];
  for (const color of expected) {
    if (!options.includes(color)) {
      throw new Error(`Expected color circle ${color} to be present, but source has: ${options.join(', ')}`);
    }
  }
});

When('I drag the red circle into the target area', async function (this: CustomWorld): Promise<void> {
  await dragAndDropCirclesPage.dragCircleToTarget('red');
});

Then('the target area should contain the red circle', async function (this: CustomWorld): Promise<void> {
  const visible = await dragAndDropCirclesPage.isCircleInTarget('red');
  if (!visible) {
    throw new Error('Expected the red circle to be visible inside the target area after drag');
  }
});

When('I drag the green circle into the target area', async function (this: CustomWorld): Promise<void> {
  await dragAndDropCirclesPage.dragCircleToTarget('green');
});

Then('the target area should contain the green circle', async function (this: CustomWorld): Promise<void> {
  const visible = await dragAndDropCirclesPage.isCircleInTarget('green');
  if (!visible) {
    throw new Error('Expected the green circle to be visible inside the target area after drag');
  }
});

Then('I close the drag circles browser', async function (this: CustomWorld): Promise<void> {
  // Browser and page cleanup handled in After hook
});
