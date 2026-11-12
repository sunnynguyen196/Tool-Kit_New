import fs from 'node:fs';
import vm from 'node:vm';

const detailFiles = [
  { json: 'scripts/scr-ctt-dt-01.json', out: 'scripts/run-draw-ctt-dt-01.js' },
  { json: 'scripts/scr-ctt-dt-02.json', out: 'scripts/run-draw-ctt-dt-02.js' },
  { json: 'scripts/scr-ctt-dt-03.json', out: 'scripts/run-draw-ctt-dt-03.js' },
  { json: 'scripts/scr-ctt-dt-04.json', out: 'scripts/run-draw-ctt-dt-04.js' },
  { json: 'scripts/scr-qr-dt-01.json', out: 'scripts/run-draw-qr-dt-01.js' },
  { json: 'scripts/scr-qr-dt-02.json', out: 'scripts/run-draw-qr-dt-02.js' },
  { json: 'scripts/scr-qr-dt-03.json', out: 'scripts/run-draw-qr-dt-03.js' },
];

for (const item of detailFiles) {
  const content = fs.readFileSync(item.json, 'utf8');
  const code = `const spec = ${content};\nconst res = await figma.create(spec);\nreturn { ok: true, id: res.id, name: res.name };`;
  
  // Syntax test
  try {
    new vm.Script(`(async () => { ${code} })`);
    console.log(`[PASS] Syntax check ok for ${item.out}`);
  } catch (err) {
    console.error(`[FAIL] Syntax error in ${item.out}:`, err.message);
    process.exit(1);
  }

  fs.writeFileSync(item.out, code, 'utf8');
}
console.log('All 7 detail screen JS runners prepared successfully!');
