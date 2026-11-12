import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const res = await figma.searchNodes({ query: "SCR-CTT-DT-02B" });
    const frame = res?.nodes?.[0];
    if (!frame) return { error: "Not found" };

    const drawer = (await figma.getChildren(frame.id)).find(c => c.name.includes('Drawer'));
    if (!drawer) return { error: "Drawer not found" };

    const drawerChildren = await figma.getChildren(drawer.id);
    const body = drawerChildren.find(c => c.name.includes('Body'));
    const bodyChildren = await figma.getChildren(body.id);
    const table = bodyChildren.find(c => c.name.includes('Table'));
    const tableChildren = await figma.getChildren(table.id);

    return {
      drawer: { layoutMode: drawer.layoutMode, primaryAxisAlignItems: drawer.primaryAxisAlignItems, itemSpacing: drawer.itemSpacing, height: drawer.h },
      body: { layoutMode: body.layoutMode, primaryAxisAlignItems: body.primaryAxisAlignItems, itemSpacing: body.itemSpacing, height: body.h, layoutGrow: body.layoutGrow },
      table: { layoutMode: table.layoutMode, primaryAxisAlignItems: table.primaryAxisAlignItems, itemSpacing: table.itemSpacing, height: table.h, layoutGrow: table.layoutGrow, counterAxisSizingMode: table.counterAxisSizingMode, primaryAxisSizingMode: table.primaryAxisSizingMode },
      rows: tableChildren.map(r => ({ id: r.id, name: r.name, h: r.h, layoutGrow: r.layoutGrow }))
    };
  `;

  const result = await runFigmaCode(code, 'Page 2');
  console.log('Inspection:', JSON.stringify(result, null, 2));
}

main();
