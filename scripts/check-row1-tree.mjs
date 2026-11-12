import { runFigmaCode } from './figma-runner.mjs';

const code = `
const t1 = await figma.getNodeById('4104:12472');
const row1 = t1?.parent?.parent; // or row

function getTree(n, depth=0) {
  if (!n || depth > 4) return null;
  const res = { id: n.id, name: n.name, type: n.type };
  if (n.characters !== undefined) res.characters = n.characters;
  if (n.children) res.children = n.children.map(c => getTree(c, depth+1));
  return res;
}

return {
  t1Parent: t1?.parent?.name,
  row1Tree: getTree(row1)
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
