import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const page = figma.currentPage;
    return page.children.map(c => ({ id: c.id, name: c.name, y: c.y }));
  `;
  const res = await runFigmaCode(code, 'Page 2');
  console.log('Result:', res);
}

main();
