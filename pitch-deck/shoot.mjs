/* QA harness: drive the built deck in real Chrome, advance all builds, screenshot each slide. */
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = process.argv[2] || './qa-shots';
const BASE = 'http://127.0.0.1:8973';
const SLIDES = 12;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--window-size=1460,880'],
  defaultViewport: { width: 1440, height: 810 },
});
const page = await browser.newPage();
await page.goto(BASE + '/#1', { waitUntil: 'networkidle0' });
await wait(1500);

import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

for (let i = 1; i <= SLIDES; i++) {
  await page.goto(BASE + `/#${i}`, { waitUntil: 'networkidle0' });
  await wait(1200);
  // advance through this slide's builds without leaving it: press ArrowRight,
  // but stop if the hash moves to the next slide
  for (let k = 0; k < 8; k++) {
    const before = await page.evaluate(() => location.hash);
    await page.keyboard.press('ArrowRight');
    await wait(350);
    const after = await page.evaluate(() => location.hash);
    if (after !== before) {
      // stepped to next slide — ArrowLeft rewinds to this slide fully built
      await page.keyboard.press('ArrowLeft');
      await wait(500);
      break;
    }
  }
  await wait(1400); // let CountUp / draw-ins finish
  await page.screenshot({ path: `${OUT}/s${i}.png` });
  console.log('shot', i);
}
await browser.close();
console.log('done');
