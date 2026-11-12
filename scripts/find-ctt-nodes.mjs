import { runFigmaCode } from './figma-runner.mjs';

const code = `
const res = await figma.searchNodes({ query: "SCR-CTT-CR" });
const nodes = res?.nodes || [];
return { count: nodes.length, nodes: nodes.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y, width: n.width, height: n.height })) };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Result:\n', res?.content?.[0]?.text);
