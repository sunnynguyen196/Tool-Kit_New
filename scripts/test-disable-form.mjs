import { generateSpecQrCr04 } from './update-qr-screens-perfect.mjs';

const specQR = generateSpecQrCr04();
const mainQR = specQR.children.find(c => c.name === 'Main Content Wrapper');
const pageAreaQR = mainQR.children.find(c => c.name === 'Page Content Area' || c.name === 'Page Scroll Area');

const tabsQR = pageAreaQR.children.find(c => c.name.includes('Tabs'));
const k1QR = pageAreaQR.children.find(c => c.name.includes('Khối 1'));
const k2QR = pageAreaQR.children.find(c => c.name.includes('Khối 2'));

console.log('tabsQR:', !!tabsQR, tabsQR?.name);
console.log('k1QR:', !!k1QR, k1QR?.name);
console.log('k2QR:', !!k2QR, k2QR?.name);
