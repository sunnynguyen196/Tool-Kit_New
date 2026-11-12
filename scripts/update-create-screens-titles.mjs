import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const res = await figma.searchNodes({ query: "CR-" });
    const frames = (res?.nodes || []).filter(n => n.type === 'FRAME' && n.name.includes('-CR-'));
    
    let updatedCount = 0;
    let tabsRemovedCount = 0;

    for (const f of frames) {
      // Find text "Thông tin chung" inside f and update to "Thông tin cấu hình phí"
      async function walk(node) {
        if (node.type === 'TEXT' && (node.characters === 'Thông tin chung' || node.characters === '1. Thông tin chung')) {
          await figma.loadFontAsync(node.fontName);
          node.characters = 'Thông tin cấu hình phí';
          updatedCount++;
        }
        if (node.name && (node.name.includes('Fee Category Tabs') || node.name.includes('Tabs (2 Tabs)'))) {
          await figma.delete(node.id);
          tabsRemovedCount++;
          return;
        }
        if (node.children) {
          for (const c of [...node.children]) {
            await walk(c);
          }
        }
      }
      await walk(f);
    }

    return { framesCount: frames.length, updatedCount, tabsRemovedCount };
  `;

  const result = await runFigmaCode(code, 'Page 2');
  console.log('Result:', JSON.stringify(result, null, 2));
}

main();
