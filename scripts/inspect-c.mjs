import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const c1 = await figma.getChildren('4116:29922');
    const c2 = await figma.getChildren('4116:29924');
    const c3 = await figma.getChildren('4116:29926');
    return { c1, c2, c3 };
  `;
  const result = await runFigmaCode(code, 'Page 2');
  console.log('C1-C3 children:', JSON.stringify(result, null, 2));
}

main();
