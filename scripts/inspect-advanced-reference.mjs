import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import { staticLiterals } from './reference-literals.mjs';

const files = {
  buildings: 'BuildingCalculator.H_YmbtGX.js', tank: 'ModFahrzeug.D2T7t--j.js',
  heroAccount: 'heroKonto.Bt25h_jl.js', equipment: 'equipment.BKHYN01c.js',
  heroPlanner: 'HeroPlanner.QBPSk7bF.js', lucky: 'LuckyDiscounter.5Yw-gVa8.js',
};
const browser = await chromium.launch({ executablePath: process.env.GUIDE_BROWSER_EXECUTABLE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
try {
  const page = await browser.newPage();
  const data = {};
  for (const [name, file] of Object.entries(files)) {
    const response = await page.request.get('https://wild-hoggs.com/_astro/' + file);
    if (!response.ok()) throw new Error(file + ': ' + response.status());
    data[name] = staticLiterals(await response.text());
    console.log(name, JSON.stringify(Object.entries(data[name]).map(([key, value]) => ({ key, type: Array.isArray(value) ? 'array' : 'object', length: Array.isArray(value) ? value.length : Object.keys(value).length, sample: JSON.stringify(value).slice(0,180) }))));
  }
  await mkdir('qa', { recursive: true });
  await writeFile('qa/reference-literals.json', JSON.stringify(data));
} finally { await browser.close(); }
