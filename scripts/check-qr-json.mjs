import { generateSpecQrCr04 } from './update-qr-screens-perfect.mjs';

const spec = generateSpecQrCr04();
const main = spec.children.find(c => c.name === 'Main Content Wrapper');
const pageArea = main.children.find(c => c.name === 'Page Content Area');

const k1 = pageArea.children.find(c => c.name.includes('Khối 1'));
const k2 = pageArea.children.find(c => c.name.includes('Khối 2'));

console.log('K1 found:', !!k1, k1.name);
console.log('K2 found:', !!k2, k2.name);
