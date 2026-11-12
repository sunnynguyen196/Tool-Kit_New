import { runFigmaCode } from './figma-runner.mjs';

const code = `
const node3 = await figma.getNode("4097:12430");
let res3 = null;
if (node3) {
  try {
    res3 = await figma.deleteNode("4097:12430");
  } catch (e) {
    res3 = { err: e.message };
  }
}

return {
  methodsOnFigma: Object.keys(figma).filter(k => typeof figma[k] === 'function'),
  res3
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Result:\n', res?.content?.[0]?.text);
