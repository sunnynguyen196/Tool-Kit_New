import { runFigmaCode } from './figma-runner.mjs';

const code = `
const n = await figma.getNodeById('4083:10606');
const children = await figma.getChildren('4083:10606');
const menusRow = children.find(c => c.name === 'Menus Row');
const menus = menusRow ? await figma.getChildren(menusRow.id) : [];

const result = [];
for (const m of menus) {
  const mFull = await figma.getNodeById(m.id);
  const mChildren = await figma.getChildren(m.id);
  const groups = [];
  for (const g of mChildren) {
    const gChildren = await figma.getChildren(g.id);
    const items = [];
    for (const it of gChildren) {
      const itNode = await figma.getNodeById(it.id);
      const itSub = await figma.getChildren(it.id);
      items.push({
        name: it.name,
        text: itSub.map(s => s.characters).filter(Boolean).join(' ')
      });
    }
    groups.push({
      groupName: g.name,
      items
    });
  }
  result.push({
    menuName: m.name,
    groups
  });
}

return result;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
