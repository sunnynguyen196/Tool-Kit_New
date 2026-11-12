import { runFigmaCode } from './figma-runner.mjs';

const code = `
const qrIds = ['4105:13364', '4109:14268', '4105:13646', '4105:13796'];

async function inspectScreen(id) {
  const root = await figma.getNodeById(id);
  const texts = [];
  
  // Recursively find all texts
  async function walk(nodeId) {
    const ch = await figma.getChildren(nodeId);
    for (const c of (ch?.children || [])) {
      if (c.characters !== undefined) {
        texts.push({ id: c.id, name: c.name, text: c.characters });
      }
      await walk(c.id);
    }
  }
  
  // get top frames
  const topCh = await figma.getChildren(id);
  return {
    id,
    name: root?.name,
    topChildren: (topCh?.children || []).map(c => ({ id: c.id, name: c.name }))
  };
}

const out = {};
for (const id of qrIds) {
  out[id] = await inspectScreen(id);
}

return out;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
