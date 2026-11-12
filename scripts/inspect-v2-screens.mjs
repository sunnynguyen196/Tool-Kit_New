import { runFigmaCode } from './figma-runner.mjs';

const code = `
async function deepGetTexts(rootId) {
  const texts = [];
  async function recurse(id) {
    const n = await figma.getNodeById(id);
    if (!n) return;
    if (n.type === 'TEXT' && n.characters) {
      texts.push(n.characters.trim());
    }
    const children = await figma.getChildren(id);
    if (children && children.length > 0) {
      for (const c of children) {
        await recurse(c.id);
      }
    }
  }
  await recurse(rootId);
  return texts;
}

const cttCr04b = await deepGetTexts('4109:13966');
const cttDt02b = await deepGetTexts('4118:863');
const qrCr02 = await deepGetTexts('4116:18825');
const qrDt02b = await deepGetTexts('4118:1345');

return { cttCr04b, cttDt02b, qrCr02, qrDt02b };
`;

async function main() {
  const res = await runFigmaCode(code, 'CHP Đối tác v2', 'ForWork');
  console.log('Result:\n', res?.content?.[0]?.text);
}

main();
