import { Page } from '@playwright/test';

export class DragAndDropCirclesPage {
  private page: Page;
  private url = 'https://practice.expandtesting.com/drag-and-drop-circles';
  private header = 'h1';
  private target = '#target';
  private sourceRed = '#source .red';
  private sourceGreen = '#source .green';
  private sourceBlue = '#source .blue';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(this.sourceRed, { state: 'visible', timeout: 10000 });
    await this.page.waitForSelector(this.sourceGreen, { state: 'visible', timeout: 10000 });
    await this.page.waitForSelector(this.sourceBlue, { state: 'visible', timeout: 10000 });
  }

  async getHeader(): Promise<string> {
    return (await this.page.textContent(this.header))?.trim() ?? '';
  }

  async getSourceCircleClasses(): Promise<string[]> {
    return this.page.$$eval('#source div', els => els.map(el => el.className.trim()));
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

  async dragCircleToTarget(color: 'red' | 'green' | 'blue'): Promise<void> {
    await this.performDragAndDrop(`#source .${color}`, this.target);
    await this.page.waitForSelector(`${this.target} .${color}`, { timeout: 5000 });
  }

  async isCircleInTarget(color: 'red' | 'green' | 'blue'): Promise<boolean> {
    await this.page.waitForTimeout(250);
    return await this.page.isVisible(`${this.target} .${color}`);
  }
}
