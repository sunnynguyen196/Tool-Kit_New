import { runFigmaCode } from './figma-runner.mjs';

const code = `
const screenNodes = await figma.searchNodes({ query: "SCR-" });
const frames = (screenNodes?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-"));

function findKeywords(node, acc = []) {
  if (node.characters) {
    const text = node.characters;
    if (text.includes("Bậc thang") || text.includes("bậc thang") || text.includes("Mức phí bậc") || text.includes("Hình thức thu phí")) {
      acc.push(text);
    }
  }
  if (node.children) {
    for (const c of node.children) {
      findKeywords(c, acc);
    }
  }
  return acc;
}

const report = [];
for (const f of frames) {
  const node = await figma.getNodeById(f.id);
  const keywords = findKeywords(node);
  if (keywords.length > 0) {
    report.push({
      id: f.id,
      name: f.name,
      x: f.x,
      y: f.y,
      keywords: [...new Set(keywords)]
    });
  }
}

return report;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
