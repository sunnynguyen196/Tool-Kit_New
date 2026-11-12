import { runFigmaCode } from './figma-runner.mjs';

const code = `
const p = await figma.currentPage();
const node = await figma.getNode(p.currentPage.id);
const frames = (node.children || []).map(c => ({ id: c.id, name: c.name, x: c.x, y: c.y, w: c.width, h: c.height }));
frames.sort((a,b) => a.y !== b.y ? a.y - b.y : a.x - b.x);
return { total: frames.length, frames };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Frames on Page 2:\n', res?.content?.[0]?.text);
