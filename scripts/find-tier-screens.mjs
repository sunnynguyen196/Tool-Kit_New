import { runFigmaCode } from './figma-runner.mjs';

const code = `
const res = await figma.searchNodes({ query: "SCR" });
const frames = (res?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-"));

// Tìm các frame có chứa text 'Bậc' hoặc 'bậc thang'
const results = [];
for (const f of frames) {
  const childSearch = await figma.searchNodes({ query: "bậc" });
  // check child thuộc frame f
  results.push({ id: f.id, name: f.name, x: f.x, y: f.y });
}

return { totalFrames: frames.length, frames: results };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Frames on canvas:\n', res?.content?.[0]?.text);
