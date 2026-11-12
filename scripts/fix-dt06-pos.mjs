import { runFigmaCode } from './figma-runner.mjs';

const code = `
await figma.modify('4116:21762', { x: 7378, y: 2600 });
const after = await figma.getNodeById('4116:21762');
return { id: after.id, x: after.x, y: after.y };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
