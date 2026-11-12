import { runFigmaCode } from './figma-runner.mjs';

const code = `
const jcbNode = await figma.getNodeById('4104:12463');

function summarize(n) {
  const obj = { id: n.id, name: n.name, type: n.type };
  if (n.characters !== undefined) obj.characters = n.characters;
  if (n.children) obj.children = n.children.map(summarize);
  return obj;
}

return summarize(jcbNode);
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
