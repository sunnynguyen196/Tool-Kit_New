import fs from 'node:fs';

for (let i = 1; i <= 4; i++) {
  const json = JSON.parse(fs.readFileSync('scripts/scr-ctt-dt-0' + i + '.json', 'utf8'));
  const minified = JSON.stringify(json);
  fs.writeFileSync('scripts/scr-ctt-dt-0' + i + '.min.json', minified);
  console.log('scr-ctt-dt-0' + i + '.min.json size:', minified.length);
}
for (let i = 1; i <= 3; i++) {
  const json = JSON.parse(fs.readFileSync('scripts/scr-qr-dt-0' + i + '.json', 'utf8'));
  const minified = JSON.stringify(json);
  fs.writeFileSync('scripts/scr-qr-dt-0' + i + '.min.json', minified);
  console.log('scr-qr-dt-0' + i + '.min.json size:', minified.length);
}
