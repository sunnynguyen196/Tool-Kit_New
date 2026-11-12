import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const test = await figma.create({
      type: 'FRAME',
      name: 'FontTest',
      width: 200,
      height: 60,
      fill: '#FFFFFF',
      children: [
        { type: 'TEXT', characters: 'Bold text', fontSize: 16, fontWeight: 700, fill: '#000000' }
      ]
    });
    const id = test.id;
    await figma.delete(id);
    return { ok: true, id };
  `;
  const res = await runFigmaCode(code);
  console.log('Result:', res);
}

main().catch(console.error);
