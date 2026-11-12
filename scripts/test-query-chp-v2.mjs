import { runFigmaCode } from './figma-runner.mjs';

const code = `
const cttNode = await figma.getNodeById('4139:39');
const qrNode = await figma.getNodeById('4139:40');

const cttChildren = await figma.getChildren('4139:39');
const qrChildren = await figma.getChildren('4139:40');

return {
  ctt: {
    id: cttNode?.id,
    name: cttNode?.name,
    childCount: cttChildren?.length,
    children: cttChildren?.map(c => ({ id: c.id, name: c.name, type: c.type, x: c.x, y: c.y, width: c.width, height: c.height }))
  },
  qrgw: {
    id: qrNode?.id,
    name: qrNode?.name,
    childCount: qrChildren?.length,
    children: qrChildren?.map(c => ({ id: c.id, name: c.name, type: c.type, x: c.x, y: c.y, width: c.width, height: c.height }))
  }
};
`;

async function main() {
  try {
    const res = await runFigmaCode(code, 'CHP Đối tác v2', 'ForWork');
    const text = res?.content?.[0]?.text;
    console.log('Result:\n', text);
  } catch (e) {
    console.error('Catch error:', e.message);
  }
}

main();
