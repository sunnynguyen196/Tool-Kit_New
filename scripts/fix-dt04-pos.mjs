import { runFigmaCode } from './figma-runner.mjs';

const code = `
const n = await figma.getNodeById('4116:21039');
if (n) {
  await figma.modify('4116:21039', { y: 2600 });
}
const after = await figma.getNodeById('4116:21039');
return { id: '4116:21039', oldY: n ? n.y : null, newY: after ? after.y : null };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
