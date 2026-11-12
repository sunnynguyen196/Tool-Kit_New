import { runFigmaCode } from './figma-runner.mjs';

const code = `
const res = await figma.searchNodes({ query: "SCR-QR" });
const qrNodes = (res?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-QR-"));
return {
  count: qrNodes.length,
  nodes: qrNodes.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y }))
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('QRGW Nodes to shift:\n', res?.content?.[0]?.text);
