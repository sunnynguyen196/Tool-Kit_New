import { runFigmaCode } from './figma-runner.mjs';

const code = `
const node = await figma.getNodeById('4104:12251');
const ch = await figma.getChildren('4104:12251');

return {
  id: node.id,
  name: node.name,
  x: node.x,
  y: node.y,
  width: node.width,
  height: node.height,
  children: (ch?.children || []).map(c => ({ id: c.id, name: c.name, type: c.type }))
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
