import fs from 'node:fs';

const spec = JSON.parse(fs.readFileSync('scripts/scr-ctt-cr-04b-perfect.min.json', 'utf8'));
const main = spec.children.find(c => c.name === 'Main Content Wrapper');
const pageArea = main.children.find(c => c.name === 'Page Content Area' || c.name === 'Page Scroll Area');

const k1 = pageArea.children.find(c => c.name.includes('Khối 1'));
const k2 = pageArea.children.find(c => c.name.includes('Khối 2'));

console.log('K1 name:', k1.name);
console.log('K1 children count:', k1.children.length);
console.log('K2 name:', k2.name);
console.log('K2 children count:', k2.children.length);
