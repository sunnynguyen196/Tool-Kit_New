import fs from 'node:fs';
import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  console.log('=== BƯỚC 1: XÓA FRAME SCR-CTT-CR-04B LỆCH TEMPLATE CŨ ===');
  const deleteCode = `
    const nodes = await figma.searchNodes({ query: "SCR-CTT-CR-04B" });
    const deleted = [];
    for (const n of (nodes?.nodes || [])) {
      try {
        await figma.delete(n.id);
        deleted.push({ id: n.id, name: n.name });
      } catch (err) {
        deleted.push({ id: n.id, name: n.name, error: err.message });
      }
    }
    return { ok: true, deleted };
  `;
  const delRes = await runFigmaCode(deleteCode, 'Page 2');
  console.log('Kết quả xóa node cũ:\n', delRes?.content?.[0]?.text);

  console.log('\n=== BƯỚC 2: TẠO MỚI SCR-CTT-CR-04B GIỮ NGUYÊN 100% TEMPLATE CHUẨN CÁC MÀN KHÁC ===');
  const specJson = fs.readFileSync('scripts/scr-ctt-cr-04b-2tabs.min.json', 'utf8');
  const drawCode = `
    const spec = ${specJson};
    const res = await figma.create(spec);
    return { ok: true, id: res.id, name: res.name, x: res.x, y: res.y, width: res.width, height: res.height };
  `;
  const drawRes = await runFigmaCode(drawCode, 'Page 2');
  console.log('Kết quả vẽ màn hình mới:\n', drawRes?.content?.[0]?.text);

  console.log('\n=== BƯỚC 3: KIỂM TRA LẠI VỊ TRÍ TOÀN BỘ CÁC MÀN HÌNH HÀNG 2 TRÊN CANVAS ===');
  const checkCode = `
    const res = await figma.searchNodes({ query: "SCR-CTT-CR" });
    const nodes = (res?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-CTT-CR"));
    nodes.sort((a,b) => a.x - b.x);
    return { total: nodes.length, nodes: nodes.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y, width: n.width, height: n.height })) };
  `;
  const checkRes = await runFigmaCode(checkCode, 'Page 2');
  console.log('Danh sách các frame CTT Create hiện có:\n', checkRes?.content?.[0]?.text);
}

main().catch(err => {
  console.error('Lỗi thực thi:', err);
  process.exit(1);
});
