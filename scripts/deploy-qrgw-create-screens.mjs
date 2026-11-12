import fs from 'node:fs';
import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  console.log('=== BƯỚC 1: XÓA CÁC FRAME QRGW CREATE CŨ (Y: 1560) ===');
  const deleteCode = `
    const nodes = await figma.searchNodes({ query: "SCR-QR-CR" });
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

  const screens = [
    { name: 'SCR-QR-CR-01: Phí XLGD QRGW - Thu hộ QR', file: 'scripts/scr-qr-cr-01-2tabs.min.json' },
    { name: 'SCR-QR-CR-02: Phí XLGD QRGW - Chi hộ QR', file: 'scripts/scr-qr-cr-02-2tabs.min.json' },
    { name: 'SCR-QR-CR-03: Phí Thanh toán QRGW - Thu hộ QR', file: 'scripts/scr-qr-cr-03-2tabs.min.json' },
    { name: 'SCR-QR-CR-04: Phí Thanh toán QRGW - Chi hộ QR', file: 'scripts/scr-qr-cr-04-2tabs.min.json' }
  ];

  for (let i = 0; i < screens.length; i++) {
    const sc = screens[i];
    console.log(`\n=== BƯỚC 2.${i + 1}: VẼ MÀN HÌNH ${sc.name} ===`);
    const specJson = fs.readFileSync(sc.file, 'utf8');
    const drawCode = `
      const spec = ${specJson};
      const res = await figma.create(spec);
      return { ok: true, id: res.id, name: res.name, x: res.x, y: res.y, width: res.width, height: res.height };
    `;
    const drawRes = await runFigmaCode(drawCode, 'Page 2');
    console.log(`Kết quả vẽ ${sc.name}:\n`, drawRes?.content?.[0]?.text);
  }

  console.log('\n=== BƯỚC 3: KIỂM TRA LẠI TẤT CẢ CÁC MÀN HÌNH TẠI ROW 2 (CTT & QRGW) ===');
  const verifyCode = `
    const res = await figma.searchNodes({ query: "SCR" });
    const nodes = (res?.nodes || []).filter(n => n.type === "FRAME" && n.y === 1560 && (n.name.startsWith("SCR-CTT-CR") || n.name.startsWith("SCR-QR-CR")));
    nodes.sort((a,b) => a.x - b.x);
    return { total: nodes.length, nodes: nodes.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y })) };
  `;
  const verifyRes = await runFigmaCode(verifyCode, 'Page 2');
  console.log('Danh sách Row 2 sau khi cập nhật:\n', verifyRes?.content?.[0]?.text);
}

main().catch(err => {
  console.error('Lỗi thực thi:', err);
  process.exit(1);
});
