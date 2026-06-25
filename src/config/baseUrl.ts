import * as path from 'path';
import * as fs from 'fs';

export function getBaseUrl(): string {
  const configPath = path.resolve(__dirname, '../../conf/env/playwright.sint.conf.json');

  if (!fs.existsSync(configPath)) {
    throw new Error(`Base URL config not found: ${configPath}`);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8')) as { baseUrl?: string };

  if (!config.baseUrl) {
    throw new Error(`baseUrl is not defined in ${configPath}`);
  }

  return config.baseUrl.replace(/\/+$/, '');
}
