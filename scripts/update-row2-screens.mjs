import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const res = await figma.searchNodes({ query: "-CR-" });
    const frames = (res?.nodes || []).filter(n => n.type === 'FRAME' && n.name.includes('-CR-'));
    
    let updatedTexts = 0;
    let deletedTabs = 0;

    for (const f of frames) {
      async function walk(nodeId) {
        const children = await figma.getChildren(nodeId);
        if (!children || !children.length) return;

        for (const c of children) {
          if (c.type === 'TEXT' && (c.characters === 'Thông tin chung' || c.characters === '1. Thông tin chung')) {
            await figma.modify(c.id, { characters: 'Thông tin cấu hình phí' });
            updatedTexts++;
          }
          if (c.name && (c.name.includes('Fee Category Tabs') || c.name.includes('Tabs (2 Tabs)'))) {
            await figma.delete(c.id);
            deletedTabs++;
            continue; // node deleted, don't walk children
          }
          if (c.type === 'FRAME' || c.type === 'GROUP') {
            await walk(c.id);
          }
        }
      }

      await walk(f.id);
    }

    return { framesCount: frames.length, updatedTexts, deletedTabs };
  `;

  const result = await runFigmaCode(code, 'Page 2');
  console.log('Result:', JSON.stringify(result, null, 2));
}

main();
