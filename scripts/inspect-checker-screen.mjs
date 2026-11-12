import { runFigmaCode } from './figma-runner.mjs';

const code = `
const n = await figma.getNodeById('4116:16035');
const children = await figma.getChildren('4116:16035');
return {
  id: n.id,
  name: n.name,
  x: n.x,
  y: n.y,
  width: n.width,
  height: n.height,
  children: children.map(c => ({ id: c.id, name: c.name, type: c.type, x: c.x, y: c.y, w: c.w, h: c.h }))
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
