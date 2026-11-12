import { runFigmaCode } from './figma-runner.mjs';

const code = `
// 1. Shift QRGW frames if they are at 6500+
const resQR = await figma.searchNodes({ query: "SCR-QR" });
const qrFrames = (resQR?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-QR-"));

const qrMoves = [];
for (const f of qrFrames) {
  // If f.x is currently in the unshifted positions (6500, 8040, 9580, 11120)
  // Let's determine desired newX based on their role
  let targetX = null;
  if (f.name.includes("LIST-01") || f.name.includes("CR-01") || f.name.includes("DT-01")) targetX = 8040;
  else if (f.name.includes("LIST-02") || f.name.includes("CR-02") || f.name.includes("DT-02")) targetX = 9580;
  else if (f.name.includes("LIST-03") || f.name.includes("CR-03") || f.name.includes("DT-03")) targetX = 11120;
  else if (f.name.includes("CR-04")) targetX = 12660;

  if (targetX && f.x !== targetX) {
    await figma.move(f.id, { x: targetX, y: f.y });
    qrMoves.push({ name: f.name, from: f.x, to: targetX, y: f.y });
  }
}

// 2. Move CTT screens
const ctt03 = await figma.searchNodes({ query: "SCR-CTT-CR-03" });
const node03 = ctt03?.nodes?.find(n => n.type === "FRAME" && n.name.startsWith("SCR-CTT-CR-03"));
if (node03) {
  await figma.move(node03.id, { x: 3080, y: 1560 });
}

const ctt04A = await figma.searchNodes({ query: "SCR-CTT-CR-04A" });
const node04A = ctt04A?.nodes?.find(n => n.type === "FRAME" && n.name.startsWith("SCR-CTT-CR-04A"));
if (node04A) {
  await figma.move(node04A.id, { x: 4620, y: 1560 });
}

const ctt04B = await figma.searchNodes({ query: "SCR-CTT-CR-04B" });
const node04B = ctt04B?.nodes?.find(n => n.type === "FRAME" && n.name.startsWith("SCR-CTT-CR-04B"));
if (node04B) {
  await figma.move(node04B.id, { x: 6160, y: 1560 });
}

return {
  ok: true,
  qrMoves,
  ctt: {
    cr03: node03?.id,
    cr04A: node04A?.id,
    cr04B: node04B?.id
  }
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Arrange result:\n', res?.content?.[0]?.text);
