/* Audit every image on every page for aspect-ratio distortion. */
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:8976';
const PAGES = ['index.html', 'about.html', 'programs.html', 'impact.html',
  'get-involved.html', 'thank-you.html', 'privacy.html', '404.html'];

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox'], defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
let problems = 0;

for (const p of PAGES) {
  await page.goto(`${BASE}/${p}`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  const bad = await page.evaluate(() => {
    const out = [];
    for (const img of document.querySelectorAll('img')) {
      if (!img.naturalWidth || !img.complete) continue;
      const r = img.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      const fit = getComputedStyle(img).objectFit;
      // object-fit cover/contain intentionally reshapes the box — not distortion
      if (fit === 'cover' || fit === 'contain') continue;
      const natural = img.naturalWidth / img.naturalHeight;
      const shown = r.width / r.height;
      const skew = Math.abs(shown - natural) / natural;
      if (skew > 0.02) {
        out.push({
          src: img.currentSrc.split('/').pop(),
          natural: natural.toFixed(3),
          shown: shown.toFixed(3),
          box: `${Math.round(r.width)}x${Math.round(r.height)}`,
          skewPct: (skew * 100).toFixed(0) + '%',
        });
      }
    }
    return out;
  });
  if (bad.length) {
    problems += bad.length;
    console.log(`\n${p}  — ${bad.length} distorted:`);
    for (const b of bad) console.log('   ', b.src, `natural ${b.natural} vs shown ${b.shown} (${b.box}) off by ${b.skewPct}`);
  } else {
    console.log(`${p.padEnd(20)} OK`);
  }
}
await browser.close();
console.log(problems ? `\nTOTAL DISTORTED: ${problems}` : '\nALL IMAGES CORRECT ASPECT RATIO');
