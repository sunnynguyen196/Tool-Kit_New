import { runFigmaCode } from './figma-runner.mjs';

const code = `
const screenRes = await figma.searchNodes({ query: "SCR-" });
const crScreens = (screenRes?.nodes || []).filter(n => n.type === "FRAME" && (n.name.includes("-CR-") || n.name.includes("Thêm mới")));
crScreens.sort((a,b) => a.x - b.x);

const results = [];
for (const s of crScreens) {
  // search buttons within this screen
  const texts = [];
  const searchT = await figma.searchNodes({ query: "Tạo mới" });
  for (const t of (searchT?.nodes || [])) {
    if (t.x >= s.x && t.x < s.x + 1440 && t.y >= s.y && t.y < s.y + 1200) {
      texts.push({ id: t.id, name: t.name, text: t.characters, parent: t.parent?.name });
    }
  }
  results.push({ id: s.id, name: s.name, x: s.x, y: s.y, createBtns: texts });
}

return results;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
