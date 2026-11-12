import fs from 'node:fs';

const content = fs.readFileSync('scripts/update-qr-screens-perfect.mjs', 'utf8');
const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('function generateSpecQrCr04('));
console.log('generateSpecQrCr04 found at line:', start);
console.log(lines.slice(start, start + 80).join('\n'));
