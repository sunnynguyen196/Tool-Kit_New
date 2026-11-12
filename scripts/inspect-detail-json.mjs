import fs from 'node:fs';

const dtFiles = [
  'scr-ctt-dt-01.min.json',
  'scr-ctt-dt-02.min.json',
  'scr-ctt-dt-03.min.json',
  'scr-ctt-dt-04.min.json',
  'scr-qr-dt-01.min.json',
  'scr-qr-dt-02.min.json',
  'scr-qr-dt-03.min.json'
];

for (const f of dtFiles) {
  const p = 'scripts/' + f;
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  
  function findFeeInfo(n) {
    const hits = [];
    function walk(curr) {
      if (curr.characters && (curr.characters.includes('Bậc thang') || curr.characters.includes('bậc thang') || curr.characters.includes('1 bậc') || curr.characters.includes('Mức phí bậc') || curr.characters.includes('Hình thức thu phí'))) {
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
