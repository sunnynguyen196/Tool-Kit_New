import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const row = await figma.getNodeById('4116:29866');
    const children = await figma.getChildren('4116:29866');
    return { row, children };
  `;
  const result = await runFigmaCode(code, 'Page 2');
  console.log('Row 29866 inspection:', JSON.stringify(result, null, 2));
}

main();
