import { runFigmaCode } from './figma-runner.mjs';

const code = `
// Align QR List screens to y: 0
const listIds = ['4088:11297', '4089:11559', '4090:11821'];
const listXs = [9580, 11120, 12660];
for (let i = 0; i < listIds.length; i++) {
  try {
    await figma.modify(listIds[i], { x: listXs[i], y: 0 });
  } catch (e) {}
}

// Align QR Create screens to y: 1560
const crIds = ['4116:18663', '4116:18825', '4116:19078', '4116:19262'];
const crXs = [9580, 11120, 12660, 14200];
for (let i = 0; i < crIds.length; i++) {
  try {
    await figma.modify(crIds[i], { x: crXs[i], y: 1560 });
  } catch (e) {}
}

return { ok: true };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
