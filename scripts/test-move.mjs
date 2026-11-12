import { runFigmaCode } from './figma-runner.mjs';

const code = `
const r = await figma.setProperties("4103:9955", { x: 3080, y: 1560 });
return { r };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Result:\n', res?.content?.[0]?.text);
