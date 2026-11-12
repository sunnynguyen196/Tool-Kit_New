import { runFigmaCode } from './figma-runner.mjs';

const code = `
const node = await figma.getNodeById('4109:14268');

// Function to dump a node tree deeply
async function dumpNode(id, depth = 0) {
  if (depth > 8) return null;
  const n = await figma.getNodeById(id);
  if (!n) return null;
  const item = {
    id: n.id,
    name: n.name,
    type: n.type,
    width: n.width,
    height: n.height
  };
  if (n.characters !== undefined) item.characters = n.characters;
  if (n.layoutMode) item.layoutMode = n.layoutMode;
  if (n.itemSpacing !== undefined) item.itemSpacing = n.itemSpacing;
  
  const ch = await figma.getChildren(id);
  if (ch?.children?.length > 0) {
    item.children = [];
    for (const c of ch.children) {
      const childDump = await dumpNode(c.id, depth + 1);
      if (childDump) item.children.push(childDump);
    }
  }
  return item;
}

// We only need the Page Content Area
const rootCh = await figma.getChildren('4109:14268');
const mainWrapper = rootCh?.children?.find(c => c.name.includes('Main Content'));
const wrapperCh = await figma.getChildren(mainWrapper.id);
const pageContent = wrapperCh?.children?.find(c => c.name.includes('Page Content'));
const contentCh = await figma.getChildren(pageContent.id);

return {
  screenId: node.id,
  screenName: node.name,
  pageContentChildren: (contentCh?.children || []).map(c => ({ id: c.id, name: c.name }))
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
