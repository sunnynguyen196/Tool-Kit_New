import { runFigmaCode } from './figma-runner.mjs';

const code = `
const screenNodes = await figma.searchNodes({ query: "SCR-" });
const screens = (screenNodes?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-"));

const tierQueries = ["Bậc thang", "Mức phí bậc", "Tổng SLGD/ Tổng GTGD", "Hình thức thu phí"];
const foundMap = {};

for (const q of tierQueries) {
  const res = await figma.searchNodes({ query: q });
  for (const n of (res?.nodes || [])) {
    // find which screen it belongs to by coordinates
    const scr = screens.find(s => n.x >= s.x && n.x < s.x + (s.width || 1440) && n.y >= s.y && n.y < s.y + (s.height || 1000));
    const scrName = scr ? scr.name : "Unknown / Outside";
    if (!foundMap[scrName]) foundMap[scrName] = [];
    foundMap[scrName].push({ query: q, id: n.id, name: n.name, type: n.type, x: n.x, y: n.y });
  }
}

return {
  screensCount: screens.length,
  foundMap
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
