import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
try{const page=await browser.newPage();const names=process.argv.slice(3);for(const name of (names.length?names:['calculators','research'])){
  const source=await readFile((process.argv[2]||'qa')+'/'+name+'.png');
  const encoded=await page.evaluate(async data=>{const image=new Image();image.src=data;await image.decode();const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;canvas.getContext('2d').drawImage(image,0,0);return canvas.toDataURL('image/webp',.9).split(',')[1];},'data:image/png;base64,'+source.toString('base64'));
  const bytes=Buffer.from(encoded,'base64');await writeFile('public/cards/'+name+'.webp',bytes);console.log(name+': '+source.length+' → '+bytes.length+' bytes');
}}finally{await browser.close();}
