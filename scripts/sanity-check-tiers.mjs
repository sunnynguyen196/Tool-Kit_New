import { runFigmaCode } from './figma-runner.mjs';

const code = `
const ctt04b = await figma.getNodeById('4109:13966');
const qr02 = await figma.getNodeById('4109:14268');

const tSearch = await figma.searchNodes({ query: "Tổng SLGD/ Tổng GTGD" });

return {
  ctt04b: { id: ctt04b?.id, name: ctt04b?.name, x: ctt04b?.x, y: ctt04b?.y, width: ctt04b?.width, height: ctt04b?.height },
  qr02: { id: qr02?.id, name: qr02?.name, x: qr02?.x, y: qr02?.y, width: qr02?.width, height: qr02?.height },
  tieredHeadersCount: (tSearch?.nodes || []).length,
  tieredHeaders: (tSearch?.nodes || []).map(n => ({ id: n.id, name: n.name, type: n.type }))
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
