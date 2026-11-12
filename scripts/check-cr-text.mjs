import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const res = await figma.searchNodes({ query: "SCR-CTT-CR-01A" });
    const frame = res?.nodes?.[0];
    if (!frame) return { error: "Not found" };

    const children = await figma.getChildren(frame.id);
    return { frame, childrenCount: children?.length, children: children?.map(c => ({ id: c.id, name: c.name, type: c.type })) };
  `;

  const result = await runFigmaCode(code, 'Page 2');
  console.log('Result:', JSON.stringify(result, null, 2));
}

main();
