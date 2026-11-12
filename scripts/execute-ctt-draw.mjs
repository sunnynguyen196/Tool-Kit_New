import fs from 'node:fs';

const rawSpec = fs.readFileSync('d:/BA Master Flow/scripts/ctt-list-spec.json', 'utf8');
const specs = JSON.parse(rawSpec);

// Construct the sandboxed javascript code to execute in figma_write
export const drawCode = `
  const doc = await figma.currentPage();
  console.log("Active page:", doc.name);

  // Clean old screens on current page if any
  const children = [...doc.children];
  for (const c of children) {
    try {
      await figma.delete(c.id);
    } catch(e) {}
  }

  // Create CTT List Screen
  const listScreen = await figma.create(${JSON.stringify(specs[0])});

  // Create Action Menus Component Frame
  const actionMenuFrame = await figma.create(${JSON.stringify(specs[1])});

  // Run layout audit
  let audit = null;
  try {
    audit = await figma.layoutAudit(listScreen.id);
  } catch(e) {}

  return {
    ok: true,
    page: doc.name,
    listScreenId: listScreen.id,
    actionMenuFrameId: actionMenuFrame.id,
    issues: audit?.summary?.issues || []
  };
`;

console.log('✅ drawCode ready, length:', drawCode.length);
