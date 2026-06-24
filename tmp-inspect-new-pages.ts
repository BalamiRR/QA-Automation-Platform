import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = [
    'https://practice.expandtesting.com/dynamic-pagination-table',
    'https://practice.expandtesting.com/locators'
  ];

  for (const url of urls) {
    console.log(`\n=== ${url} ===`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForLoadState('load');
    const title = await page.title();
    console.log('title=', title);
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', els => els.map(e => `${e.tagName}:${e.textContent?.trim()}`));
    console.log('headings=', headings.slice(0, 20));
    const ids = await page.$$eval('[id]', els => els.map(e => ({ tag: e.tagName, id: e.id, text: e.textContent?.trim() })));
    console.log('id count=', ids.length);
    const classes = await page.$$eval('[class]', els => els.slice(0,20).map(e => ({ tag: e.tagName, class: e.className, text: e.textContent?.trim() })));
    console.log('sample classes=', classes);
    const buttonsAndLinks = await page.$$eval('button, a, input[type=button], input[type=submit]', els => els.map(e => ({ tag: e.tagName, type: (e as HTMLInputElement).type || null, text: e.textContent?.trim(), id: e.id, class: e.className })).slice(0, 50));
    console.log('buttons/links sample=', buttonsAndLinks);
    const tables = await page.$$eval('table', els => els.map((table, index) => ({ index, rows: table.querySelectorAll('tr').length, headers: Array.from(table.querySelectorAll('th')).map(th => th.textContent?.trim()) })));
    console.log('tables=', tables);

    if (url.includes('dynamic-pagination-table')) {
      const pager = await page.$$eval('.pagination, nav[aria-label], .pager, .paginate', els => els.map(e => e.outerHTML));
      console.log('pager count=', pager.length);
      const next = await page.$('button:has-text("Next"), a:has-text("Next"), .next');
      const prev = await page.$('button:has-text("Previous"), a:has-text("Previous"), .prev');
      console.log('next found=', !!next, 'prev found=', !!prev);
      const currentPage = await page.$$eval('.page-item.active, .active', els => els.map(e => e.textContent?.trim()));
      console.log('active page text=', currentPage);
      const visibleRows = await page.$$eval('table tbody tr', rows => rows.map(r => Array.from(r.querySelectorAll('td')).map(td => td.textContent?.trim())));
      console.log('visibleRows sample=', visibleRows.slice(0, 5));
    }

    if (url.includes('/locators')) {
      const locatorSection = await page.$$eval('section, .container, .row, .card, .page', els => els.slice(0, 20).map(e => ({ tag: e.tagName, class: e.className, id: e.id, text: e.textContent?.trim()?.slice(0, 120) })));
      console.log('locator sections sample=', locatorSection);
      const inputs = await page.$$eval('input, textarea, select, button, a', els => els.slice(0, 50).map(e => ({ tag: e.tagName, type: (e as HTMLInputElement).type || null, id: e.id, name: (e as HTMLInputElement).name || null, class: e.className, text: e.textContent?.trim() }) ));
      console.log('inputs sample=', inputs.slice(0, 30));
      const labelTexts = await page.$$eval('label', els => els.map(e => e.textContent?.trim()));
      console.log('label texts=', labelTexts.slice(0, 20));
    }
  }

  await browser.close();
})();
