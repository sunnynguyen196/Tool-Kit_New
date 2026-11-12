import { runFigmaCode } from './figma-runner.mjs';

const code = `
const ids = ['4104:10732', '4104:11075', '4115:14629', '4105:13357', '4109:14259', '4115:14818', '4115:15071', '4115:15255', '4115:15465'];
const res = [];
for (const id of ids) {
  let n = null;
  try { n = await figma.getNodeById(id); } catch {}
  let p = null;
  let grandP = null;
  if (n && n.parentId) {
    try { p = await figma.getNodeById(n.parentId); } catch {}
  }
  if (p && p.parentId) {
    try { grandP = await figma.getNodeById(p.parentId); } catch {}
  }
  res.push({
    footerId: id,
    name: n ? n.name : null,
    parentId: n ? n.parentId : null,
    parentName: p ? p.name : null,
    grandParentName: grandP ? grandP.name : null
  });
}
return res;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
