import fs from 'node:fs';

const files = [
  { json: 'scripts/qr-cr-01.json', out: 'scripts/run-draw-qr-cr-01.js' },
  { json: 'scripts/qr-cr-02.json', out: 'scripts/run-draw-qr-cr-02.js' },
  { json: 'scripts/qr-cr-03.json', out: 'scripts/run-draw-qr-cr-03.js' },
  { json: 'scripts/qr-cr-04.json', out: 'scripts/run-draw-qr-cr-04.js' },
];

for (const item of files) {
  const content = fs.readFileSync(item.json, 'utf8');
  const code = `const spec = ${content};\nconst res = await figma.create(spec);\nreturn { ok: true, id: res.id, name: res.name };`;
  fs.writeFileSync(item.out, code, 'utf8');
  console.log(`Generated ${item.out}`);
}
