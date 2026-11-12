import fs from 'node:fs';
import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  console.log('--- BƯỚC 1: XÓA 2 FRAME CŨ VÀ SHIFT CÁC FRAME QRGW SANG PHẢI 1540PX ---');

  const shiftCode = `
  // 1. Delete old CTT CR-03 and CR-04
  const oldNodes = await figma.searchNodes({ query: "SCR-CTT-CR" });
  for (const n of (oldNodes?.nodes || [])) {
    if (n.name.includes("SCR-CTT-CR-03") || n.name.includes("SCR-CTT-CR-04")) {
      const node = await figma.getNode(n.id);
      if (node) {
        await figma.deleteNode(n.id);
        console.log("Deleted old node:", n.id, n.name);
      }
    }
  }

  // 2. Shift all QRGW frames to x += 1540
  const qrNodes = await figma.searchNodes({ query: "SCR-QR" });
  const shifted = [];
  for (const n of (qrNodes?.nodes || [])) {
    if (n.type === "FRAME" && n.name.startsWith("SCR-QR-")) {
      // Check if not already shifted (i.e. x < 8000 for column 1)
      if (n.x === 6500 || n.x === 8040 || n.x === 9580 || n.x === 11120) {
        const newX = n.x + 1540;
        await figma.setProperties(n.id, { x: newX });
        shifted.push({ id: n.id, name: n.name, oldX: n.x, newX });
      }
    }
  }

  return { ok: true, shiftedCount: shifted.length, shifted };
  `;

  console.log('Đang chạy dịch chuyển và dọn dẹp...');
  const shiftRes = await runFigmaCode(shiftCode, 'Page 2');
  console.log('Kết quả dịch chuyển:\n', shiftRes?.content?.[0]?.text);

  console.log('\n--- BƯỚC 2: VẼ SCR-CTT-CR-03 (THẺ NỘI ĐỊA) ---');
  const spec03 = fs.readFileSync('scripts/scr-ctt-cr-03-new.min.json', 'utf8');
  const draw03Code = `
  const spec = ${spec03};
  const res = await figma.create(spec);
  return { ok: true, id: res.id, name: res.name };
  `;
  const res03 = await runFigmaCode(draw03Code, 'Page 2');
  console.log('Kết quả vẽ SCR-CTT-CR-03:\n', res03?.content?.[0]?.text);

  console.log('\n--- BƯỚC 3: VẼ SCR-CTT-CR-04A (THẺ QUỐC TẾ - ÁP DỤNG CHUNG) ---');
  const spec04A = fs.readFileSync('scripts/scr-ctt-cr-04a.min.json', 'utf8');
  const draw04ACode = `
  const spec = ${spec04A};
  const res = await figma.create(spec);
  return { ok: true, id: res.id, name: res.name };
  `;
  const res04A = await runFigmaCode(draw04ACode, 'Page 2');
  console.log('Kết quả vẽ SCR-CTT-CR-04A:\n', res04A?.content?.[0]?.text);

  console.log('\n--- BƯỚC 4: VẼ SCR-CTT-CR-04B (THẺ QUỐC TẾ - THEO THƯƠNG HIỆU THẺ) ---');
  const spec04B = fs.readFileSync('scripts/scr-ctt-cr-04b.min.json', 'utf8');
  const draw04BCode = `
  const spec = ${spec04B};
  const res = await figma.create(spec);
  return { ok: true, id: res.id, name: res.name };
  `;
  const res04B = await runFigmaCode(draw04BCode, 'Page 2');
  console.log('Kết quả vẽ SCR-CTT-CR-04B:\n', res04B?.content?.[0]?.text);

  console.log('\n--- BƯỚC 5: KIỂM TRA LẠI TOÀN BỘ CÁC FRAMES TRÊN CANVAS FIGMA ---');
  const checkCode = `
  const res = await figma.searchNodes({ query: "SCR" });
  const nodes = (res?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-"));
  nodes.sort((a,b) => a.y !== b.y ? a.y - b.y : a.x - b.x);
  return { total: nodes.length, nodes: nodes.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y })) };
  `;
  const checkRes = await runFigmaCode(checkCode, 'Page 2');
  console.log('Danh sách tất cả các frames hiện có:\n', checkRes?.content?.[0]?.text);
}

main().catch(err => {
  console.error('Lỗi thực thi:', err);
  process.exit(1);
});
