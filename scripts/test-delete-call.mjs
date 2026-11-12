import { runFigmaCode } from './figma-runner.mjs';

const code = `
const r1 = await figma.delete("4097:12430");
const r2 = await figma.delete("4098:12590");
return { r1, r2 };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Result:\n', res?.content?.[0]?.text);
