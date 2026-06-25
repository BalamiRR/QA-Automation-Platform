import { chromium, Browser } from 'playwright';

export async function createBrowser(): Promise<Browser> {
  const headlessEnv = process.env.BROWSER_HEADLESS;
  const headless = headlessEnv ? headlessEnv.toLowerCase() === 'true' : false;
  return await chromium.launch({ headless });
}

export function isHeadless(): boolean {
  const headlessEnv = process.env.BROWSER_HEADLESS;
  return headlessEnv ? headlessEnv.toLowerCase() === 'true' : false;
}
