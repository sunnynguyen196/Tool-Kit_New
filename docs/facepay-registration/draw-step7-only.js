import http from 'node:http';

const token = "479ac1abb5a90d33777c610b6cfed7f450959e522ae1dbb2";

function sendRpc(op, params = {}) {
  const payload = JSON.stringify({ op, params });
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 38470,
      path: '/rpc',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function drawStep7Only() {
  console.log("🎨 Đang tiến hành vẽ BƯỚC 7 & FOOTER BANNER BẢO MẬT lên Figma...");

  // 1. Tạo Canvas Frame cho Bước 7 & Footer (x: 2470)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "[BƯỚC 7 & FOOTER BANNER] LƯU TRỮ RÀNG BUỘC SINH TRẮC HỌC VỚI TOKEN & TÍNH BẢO MẬT",
    x: 2470,
    y: 0,
    width: 850,
    height: 650,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 16
  });

  const parentId = mainCanvas.result.id;

  // 2. Tiêu đề Canvas
  const titleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 20, y: 24, fontSize: 16 });
  await sendRpc("set_text", { nodeId: titleNode.result.id, content: "BƯỚC 7 & BANNER TUÂN THỦ BẢO MẬT" });
  await sendRpc("modify", { nodeId: titleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // 3. Circle Badge 7
  const circle = await sendRpc("create", {
    type: "ELLIPSE",
    parentId: parentId,
    x: 30,
    y: 70,
    width: 36,
    height: 36,
    fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }]
  });

  const numNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 42, y: 78, fontSize: 18 });
  await sendRpc("set_text", { nodeId: numNode.result.id, content: "7" });
  await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Step 7 Header Title
  const headTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 78, y: 78, width: 720, fontSize: 14 });
  await sendRpc("set_text", { nodeId: headTitleNode.result.id, content: "Hệ thống Petrolimex 2.0 lưu trữ thông tin sinh trắc học với token tương ứng" });
  await sendRpc("modify", { nodeId: headTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 4. Dashed Border Data Binding Container
  const dashedCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Dashed Binding Container",
    x: 30,
    y: 150,
    width: 480,
    height: 100,
    fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], // #F0F9FF
    strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }],
    strokeWeight: 1.5,
    cornerRadius: 12
  });

  const dashId = dashedCard.result.id;

  // Face ID Item inside Dashed Card
  const faceIconNode = await sendRpc("create", { type: "TEXT", parentId: dashId, x: 15, y: 35, fontSize: 24 });
  await sendRpc("set_text", { nodeId: faceIconNode.result.id, content: "😊" });

  const bioTextNode = await sendRpc("create", { type: "TEXT", parentId: dashId, x: 48, y: 32, width: 140, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: bioTextNode.result.id, content: "Dữ liệu sinh trắc học\n(đã mã hóa)" });
  await sendRpc("modify", { nodeId: bioTextNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // Plus Sign
  const plusNode = await sendRpc("create", { type: "TEXT", parentId: dashId, x: 200, y: 38, fontSize: 18 });
  await sendRpc("set_text", { nodeId: plusNode.result.id, content: "+" });
  await sendRpc("modify", { nodeId: plusNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // Token Badge Card inside Dashed Container
  await sendRpc("create", { type: "RECTANGLE", parentId: dashId, x: 225, y: 32, width: 90, height: 36, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.314, b: 0.635 } }], cornerRadius: 6 });
  const tHeadNode = await sendRpc("create", { type: "TEXT", parentId: dashId, x: 255, y: 36, fontSize: 9 });
  await sendRpc("set_text", { nodeId: tHeadNode.result.id, content: "TOKEN" });
  await sendRpc("modify", { nodeId: tHeadNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  const tValNode = await sendRpc("create", { type: "TEXT", parentId: dashId, x: 243, y: 48, fontSize: 12 });
  await sendRpc("set_text", { nodeId: tValNode.result.id, content: "********" });
  await sendRpc("modify", { nodeId: tValNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const tokenSubNode = await sendRpc("create", { type: "TEXT", parentId: dashId, x: 325, y: 40, width: 140, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: tokenSubNode.result.id, content: "Token thanh toán tương ứng" });
  await sendRpc("modify", { nodeId: tokenSubNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }], fontWeight: "Bold" } });

  // 5. Right Lock Storage Card
  const lockCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Lock Storage Container",
    x: 530,
    y: 150,
    width: 290,
    height: 100,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }],
    strokeWeight: 1,
    cornerRadius: 12
  });

  const lockId = lockCard.result.id;

  const lockIconNode = await sendRpc("create", { type: "TEXT", parentId: lockId, x: 20, y: 36, fontSize: 22 });
  await sendRpc("set_text", { nodeId: lockIconNode.result.id, content: "🔒" });

  const lockTextNode = await sendRpc("create", { type: "TEXT", parentId: lockId, x: 55, y: 32, width: 220, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: lockTextNode.result.id, content: "Lưu trữ an toàn, bảo mật theo chuẩn bảo mật của Petrolimex" });
  await sendRpc("modify", { nodeId: lockTextNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 6. Footer Capsule Banner (Dưới cùng)
  const footerCapsule = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Security Compliance Footer Banner",
    x: 30,
    y: 420,
    width: 790,
    height: 48,
    fills: [{ type: "SOLID", color: { r: 0.91, g: 0.945, b: 0.976 } }], // #E8F1F9
    strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], // #BBE0F9
    strokeWeight: 1,
    cornerRadius: 24
  });

  const footId = footerCapsule.result.id;

  const shieldNode = await sendRpc("create", { type: "TEXT", parentId: footId, x: 20, y: 12, fontSize: 20 });
  await sendRpc("set_text", { nodeId: shieldNode.result.id, content: "🛡️" });

  const footTextNode = await sendRpc("create", { type: "TEXT", parentId: footId, x: 50, y: 16, width: 720, fontSize: 12 });
  await sendRpc("set_text", { nodeId: footTextNode.result.id, content: "Bảo mật – An toàn – Tuân thủ quy định của Ngân hàng Nhà nước và các tiêu chuẩn bảo mật quốc tế" });
  await sendRpc("modify", { nodeId: footTextNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG HOÀN CHỈNH BƯỚC 7 & BANNER BẢO MẬT FOOTER VỚI ĐẦY ĐỦ CHỮ VÀ ICON!");
}

drawStep7Only();
