import { Page } from '@playwright/test';

export class DragAndDropPage {
  private page: Page;
  private url = 'https://practice.expandtesting.com/drag-and-drop';
  private header = 'h1';
  private columnA = '#column-a';
  private columnB = '#column-b';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(this.columnA, { state: 'visible', timeout: 10000 });
    await this.page.waitForSelector(this.columnB, { state: 'visible', timeout: 10000 });
  }

  async getHeader(): Promise<string> {
    return (await this.page.textContent(this.header))?.trim() ?? '';
  }

  async getColumnText(columnId: string): Promise<string> {
    return (await this.page.textContent(columnId))?.trim() ?? '';
  }

  private async performDragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
    const source = this.page.locator(sourceSelector);
    const target = this.page.locator(targetSelector);
    await source.waitFor({ state: 'visible', timeout: 10000 });
    await target.waitFor({ state: 'visible', timeout: 10000 });
    await source.scrollIntoViewIfNeeded();
    await target.scrollIntoViewIfNeeded();
    await this.page.evaluate(({ sourceSelector, targetSelector }) => {
      const dataTransfer = new DataTransfer();

      const dispatchDragEvent = (element: Element | null, type: string) => {
        if (!element) {
          throw new Error(`Element not found for ${type}`);
        }
        const event = new DragEvent(type, {
          bubbles: true,
          cancelable: true,
          composed: true
        });
        Object.defineProperty(event, 'dataTransfer', {
          get: () => dataTransfer
        });
        element.dispatchEvent(event);
      };

      const sourceElement = document.querySelector(sourceSelector);
      const targetElement = document.querySelector(targetSelector);
      if (!sourceElement || !targetElement) {
        throw new Error('Drag source or target not found');
      }

      dispatchDragEvent(sourceElement, 'dragstart');
      dispatchDragEvent(targetElement, 'dragenter');
      dispatchDragEvent(targetElement, 'dragover');
      dispatchDragEvent(targetElement, 'drop');
      dispatchDragEvent(sourceElement, 'dragend');
    }, { sourceSelector, targetSelector });
    await this.page.waitForTimeout(500);
  }

  async dragAtoB(): Promise<void> {
    await this.performDragAndDrop(this.columnA, this.columnB);
    await this.page.waitForSelector(`${this.columnA}:has-text("B")`, { timeout: 10000 });
    await this.page.waitForSelector(`${this.columnB}:has-text("A")`, { timeout: 10000 });
  }

  async dragBtoA(): Promise<void> {
    await this.performDragAndDrop(this.columnB, this.columnA);
    await this.page.waitForSelector(`${this.columnA}:has-text("A")`, { timeout: 10000 });
    await this.page.waitForSelector(`${this.columnB}:has-text("B")`, { timeout: 10000 });
  }
}
