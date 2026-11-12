import fs from 'node:fs';

const spec = JSON.parse(fs.readFileSync('scripts/scr-ctt-cr-04b-perfect.min.json', 'utf8'));
const main = spec.children.find(c => c.name === 'Main Content Wrapper');
const pageArea = main.children.find(c => c.name === 'Page Content Area' || c.name === 'Page Scroll Area');

for (const c of pageArea.children) {
  console.log('--- Child:', c.name, 'type:', c.type);
  if (c.children) {
    console.log('   subchildren:', c.children.map(x => x.name));
  }
}
