import { runFigmaCode } from './figma-runner.mjs';

const code = `
const screens = figma.currentPage.children.filter(n => n.type === 'FRAME' && n.name.startsWith('SCR-'));

function scanNode(node, targetScreen) {
  const matches = [];
  function walk(n) {
    if (n.characters && (n.characters.includes('Bậc thang') || n.characters.includes('Mức phí bậc') || n.characters.includes('Tổng SLGD'))) {
      matches.push({ id: n.id, text: n.characters, name: n.name });
    }
    if (n.children) {
      for (const c of n.children) walk(c);
    }
  }
  walk(node);
  return matches;
}

const results = [];
for (const scr of screens) {
  const m = scanNode(scr);
  if (m.length > 0) {
    results.push({
      id: scr.id,
      name: scr.name,
      x: scr.x,
      y: scr.y,
      matches: m
    });
  }
}

return results;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
