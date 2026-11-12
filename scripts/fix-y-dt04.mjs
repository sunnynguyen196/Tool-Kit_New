import { runFigmaCode } from './figma-runner.mjs';

const code = `
const n = await figma.getNodeById('4116:16556');
const oldY = n ? n.y : null;
if (n && n.y !== 2600) {
  await figma.modify('4116:16556', { y: 2600 });
}
const nAfter = await figma.getNodeById('4116:16556');
return {
  id: '4116:16556',
  name: n ? n.name : null,
  oldY,
  newY: nAfter ? nAfter.y : null
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
