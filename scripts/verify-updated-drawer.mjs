import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const res = await figma.searchNodes({ query: "SCR-QR-DT-02B" });
    const frame = res?.nodes?.[0];
    if (!frame) return { error: "Not found" };

    const drawer = (await figma.getChildren(frame.id)).find(c => c.name.includes('Drawer'));
    const drawerChildren = await figma.getChildren(drawer.id);
    const body = drawerChildren.find(c => c.name.includes('Body'));
    const bodyChildren = await figma.getChildren(body.id);
    const table = bodyChildren.find(c => c.name.includes('Table'));
    const tableChildren = await figma.getChildren(table.id);

    const bottomSection = drawerChildren.find(c => c.name.includes('Bottom Section'));
    const bottomChildren = await figma.getChildren(bottomSection.id);

    return {
      frame: { x: frame.x, y: frame.y, w: frame.w, h: frame.h },
      tableHeight: table.h,
      sampleRows: tableChildren.map(r => ({ name: r.name, h: r.h })),
      bottomElements: bottomChildren.map(c => ({ name: c.name, h: c.h }))
    };
  `;

  const result = await runFigmaCode(code, 'Page 2');
  console.log('QR Verification Result:', JSON.stringify(result, null, 2));
}

main();
