import { runFigmaCode } from './figma-runner.mjs';

const code = `
const screenIds = [
  '4104:10585',
  '4105:13189',
  '4104:10909',
  '4104:11084',
  '4109:13966',
  '4115:14663',
  '4115:14825',
  '4115:15078',
  '4115:15262'
];

const res = [];
for (const sid of screenIds) {
  const node = await figma.getNodeById(sid);
  if (!node) {
    res.push({ sid, found: false });
    continue;
  }
  // search inside node for footer
  function findFooter(n) {
    if (n.name && (n.name.includes('Footer') || n.name.includes('Action'))) return n;
    if (n.children) {
      for (const c of n.children) {
        const found = findFooter(c);
        if (found) return found;
      }
    }
    return null;
  }
  const footer = findFooter(node);
  res.push({
    sid,
    name: node.name,
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    footer: footer ? {
      id: footer.id,
      name: footer.name,
      parentName: footer.parent ? footer.parent.name : null,
      children: (footer.children || []).map(c => ({ id: c.id, name: c.name, type: c.type, text: c.characters }))
    } : null
  });
}
return res;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
