import fs from 'node:fs';

const files = [
  'scr-ctt-cr-01a.min.json',
  'scr-ctt-cr-01b.min.json',
  'scr-ctt-cr-03-2tabs.min.json',
  'scr-ctt-cr-04a-2tabs.min.json',
  'scr-ctt-cr-04b-2tabs.min.json',
  'scr-qr-cr-01-2tabs.min.json',
  'scr-qr-cr-02-2tabs.min.json',
  'scr-qr-cr-03-2tabs.min.json',
  'scr-qr-cr-04-2tabs.min.json'
];

for (const f of files) {
  const p = 'scripts/' + f;
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  
  function findFeeInfo(n) {
    const hits = [];
    function walk(curr) {
      if (curr.characters && (curr.characters.includes('Bậc thang') || curr.characters.includes('bậc thang') || curr.characters.includes('1 bậc') || curr.characters.includes('Hình thức thu phí'))) {
        hits.push(curr.characters);
      }
      if (curr.children) {
        for (const c of curr.children) walk(c);
      }
    }
    walk(n);
    return hits;
  }

  const hits = findFeeInfo(data);
  console.log(`=== ${f} === (${data.name})`);
  console.log('Fee related texts:', hits);
}
