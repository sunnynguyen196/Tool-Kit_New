import { runFigmaCode } from './figma-runner.mjs';

const code = `
const jcbNode = await figma.getNodeById('4104:12463');
const children = await figma.getChildren('4104:12463');

const subChildren = {};
for (const c of (children?.children || [])) {
  const sc = await figma.getChildren(c.id);
  subChildren[c.name] = (sc?.children || []).map(x => x.name);
}

return {
  jcbNodeName: jcbNode?.name,
  children: (children?.children || []).map(c => ({ id: c.id, name: c.name, type: c.type })),
  subChildren
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
