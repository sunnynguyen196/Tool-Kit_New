import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const res = await figma.searchNodes({ query: "SCR-CTT-DT-02B" });
    const frame = res?.nodes?.[0];
    if (!frame) return { error: "Not found" };

    const drawer = (await figma.getChildren(frame.id)).find(c => c.name.includes('Drawer'));
    const drawerChildren = await figma.getChildren(drawer.id);
    const subheader = drawerChildren.find(c => c.name.includes('Subheader'));
    const rows = await figma.getChildren(subheader.id);

    const rowDetails = [];
    for (const r of rows) {
      const children = await figma.getChildren(r.id);
      rowDetails.push({
        rowName: r.name,
        children: children.map(c => ({ name: c.name, type: c.type, characters: c.characters, x: c.x, w: c.w }))
      });
    }

    return { subheaderName: subheader.name, rowCount: rows.length, rowDetails };
  `;

  const result = await runFigmaCode(code, 'Page 2');
  console.log('Subheader Meta Details:', JSON.stringify(result, null, 2));
}

main();
