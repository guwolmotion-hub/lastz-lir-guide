import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import { decodeAstro } from './reference-literals.mjs';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
try {
  const page=await browser.newPage({viewport:{width:1440,height:1100}});
  await page.goto('https://wild-hoggs.com/ko/tools/research/alliance_recognition/',{waitUntil:'networkidle'});
  await page.screenshot({path:'qa/research-source-desktop.png',fullPage:true});
  const raw=JSON.parse(await page.locator('astro-island[component-url*="ResearchCategoryCalculator"]').getAttribute('props'));
  const props=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,decodeAstro(v)]));
  await writeFile('qa/research-source-props.json',JSON.stringify(props,null,2));
  console.log(JSON.stringify({keys:Object.keys(props),categoryKeys:Object.keys(props.categoryData),node:props.categoryData.technologies[0],buttons:await page.getByRole('button').allTextContents(),images:await page.locator('img').evaluateAll(els=>els.slice(0,10).map(e=>({src:e.getAttribute('src'),alt:e.alt})))}));
  await page.goto('https://wild-hoggs.com/ko/tools/research/',{waitUntil:'networkidle'});
  await page.screenshot({path:'qa/research-source-index.png',fullPage:true});
} finally {await browser.close();}
