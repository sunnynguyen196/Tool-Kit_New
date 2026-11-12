import { runFigmaCode } from './figma-runner.mjs';

const code = `
const res = await figma.searchNodes({ query: "SCR" });
const nodes = (res?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-"));
nodes.sort((a,b) => a.y !== b.y ? a.y - b.y : a.x - b.x);

return {
  total: nodes.length,
  row1_y0: nodes.filter(n => n.y === 0).map(n => ({ id: n.id, name: n.name, x: n.x })),
  row2_y1560: nodes.filter(n => n.y === 1560).map(n => ({ id: n.id, name: n.name, x: n.x })),
  row3_y2600: nodes.filter(n => n.y === 2600).map(n => ({ id: n.id, name: n.name, x: n.x })),
  others: nodes.filter(n => n.y !== 0 && n.y !== 1560 && n.y !== 2600).map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y }))
};
`;

const res = await runFigmaCode(code, 'Page 2');
const parsed = JSON.parse(res?.content?.[0]?.text);
console.log('Result:\n', JSON.stringify(parsed?.result, null, 2));
