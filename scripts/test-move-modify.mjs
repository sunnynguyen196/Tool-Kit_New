import { runFigmaCode } from './figma-runner.mjs';

const code = `
let rMove = null, rModify = null;
try {
  rMove = await figma.move("4103:9955", { x: 3080, y: 1560 });
} catch (e) {
  rMove = { err: e.message };
}

try {
  rModify = await figma.modify("4103:9955", { x: 3080, y: 1560 });
} catch (e) {
  rModify = { err: e.message };
}

return { rMove, rModify };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Result:\n', res?.content?.[0]?.text);
