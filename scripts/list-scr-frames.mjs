import { runFigmaCode } from './figma-runner.mjs';

const code = `
const res = await figma.searchNodes({ query: "SCR" });
const nodes = (res?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-"));
nodes.sort((a,b) => a.y !== b.y ? a.y - b.y : a.x - b.x);
return { total: nodes.length, nodes: nodes.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y, w: n.width, h: n.height })) };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('SCR frames on Page 2:\n', res?.content?.[0]?.text);
