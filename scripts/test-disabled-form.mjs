import fs from 'node:fs';

const specCTT = JSON.parse(fs.readFileSync('scripts/scr-ctt-cr-04b-perfect.min.json', 'utf8'));
const mainCTT = specCTT.children.find(c => c.name === 'Main Content Wrapper');
const pageAreaCTT = mainCTT.children.find(c => c.name === 'Page Content Area' || c.name === 'Page Scroll Area');

const tabsCTT = pageAreaCTT.children.find(c => c.name.includes('Tabs'));
const k1CTT = pageAreaCTT.children.find(c => c.name.includes('Khối 1'));
const k2CTT = pageAreaCTT.children.find(c => c.name.includes('Khối 2'));

console.log('tabsCTT:', !!tabsCTT, tabsCTT?.name);
console.log('k1CTT:', !!k1CTT, k1CTT?.name);
console.log('k2CTT:', !!k2CTT, k2CTT?.name);
