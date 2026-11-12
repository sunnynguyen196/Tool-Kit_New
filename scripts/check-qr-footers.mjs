import { runFigmaCode } from './figma-runner.mjs';

const code = `
const qrScreens = await figma.searchNodes({ query: "SCR-QR-CR-" });
const res = [];
for (const n of (qrScreens?.nodes || [])) {
  if (n.type === 'FRAME' && n.name.startsWith('SCR-QR-CR-')) {
    const children = await figma.getChildren(n.id);
    const main = children.find(c => c.name === 'Main Content Wrapper');
    const mainChildren = main ? await figma.getChildren(main.id) : [];
    const pageArea = mainChildren.find(c => c.name === 'Page Content Area');
    const pageChildren = pageArea ? await figma.getChildren(pageArea.id) : [];
    const footer = pageChildren.find(c => c.name.includes('Footer'));
    const fChildren = footer ? await figma.getChildren(footer.id) : [];
    res.push({
      screen: n.name,
      screenId: n.id,
      footerId: footer ? footer.id : null,
      buttons: fChildren.map(c => c.name)
    });
  }
}
return res;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
