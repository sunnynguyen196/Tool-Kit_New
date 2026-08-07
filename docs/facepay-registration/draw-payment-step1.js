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

async function drawPaymentStep1() {
  console.log("🎨 Đang vẽ BƯỚC 1 sơ đồ 'LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX' lên Figma...");

  // 1. Tạo Frame Canvas Tổng cho Bước 1 của sơ đồ mới
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "[BƯỚC 1] LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX",
    x: 0,
    y: 750, // Đặt bên dưới sơ đồ cũ
    width: 440,
    height: 680,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 16
  });

  const parentId = mainCanvas.result.id;

  // 2. Tiêu đề Canvas Sơ đồ Mới
  const titleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 20, y: 24, fontSize: 15 });
  await sendRpc("set_text", { nodeId: titleNode.result.id, content: "LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX" });
  await sendRpc("modify", { nodeId: titleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // 3. Circle Badge 1 da cam
  const circle = await sendRpc("create", {
    type: "ELLIPSE",
    parentId: parentId,
    x: 20,
    y: 60,
    width: 36,
    height: 36,
    fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }]
  });

  const numNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 32, y: 68, fontSize: 18 });
  await sendRpc("set_text", { nodeId: numNode.result.id, content: "1" });
  await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Step 1 Header Title Text
  const headTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 68, y: 60, width: 350, fontSize: 11.5 });
  await sendRpc("set_text", { nodeId: headTitleNode.result.id, content: "Khách hàng thực hiện đổ xăng tại cột bơm\nsố 1 có gắn thiết bị miniPos S30" });
  await sendRpc("modify", { nodeId: headTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 4. Graphic Cột Bơm Xăng Petrolimex 01
  const pumpFrame = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Gas Pump Station 01 Graphic",
    x: 100,
    y: 130,
    width: 220,
    height: 460,
    fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 16
  });

  const pId = pumpFrame.result.id;

  // Header Cột bơm (Xanh dương Petrolimex)
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 20, y: 15, width: 180, height: 36, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 4 });
  // Logo P da cam
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 30, y: 23, width: 20, height: 20, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 4 });
  const pLogoNode = await sendRpc("create", { type: "TEXT", parentId: pId, x: 36, y: 26, fontSize: 13 });
  await sendRpc("set_text", { nodeId: pLogoNode.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pLogoNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pBrandNode = await sendRpc("create", { type: "TEXT", parentId: pId, x: 56, y: 26, fontSize: 11 });
  await sendRpc("set_text", { nodeId: pBrandNode.result.id, content: "PETROLIMEX" });
  await sendRpc("modify", { nodeId: pBrandNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Thân Cột bơm
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 30, y: 60, width: 160, height: 260, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });

  // Màn hình Cột bơm
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 45, y: 80, width: 130, height: 90, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  // Number Badge 01 trên cột bơm
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 175, y: 120, width: 28, height: 28, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 4 });
  const num01Node = await sendRpc("create", { type: "TEXT", parentId: pId, x: 180, y: 125, fontSize: 12 });
  await sendRpc("set_text", { nodeId: num01Node.result.id, content: "01" });
  await sendRpc("modify", { nodeId: num01Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Tủ dưới cột bơm có logo P
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 50, y: 200, width: 120, height: 100, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 80, y: 220, width: 60, height: 60, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 10 });
  const bigPNode = await sendRpc("create", { type: "TEXT", parentId: pId, x: 96, y: 228, fontSize: 36 });
  await sendRpc("set_text", { nodeId: bigPNode.result.id, content: "P" });
  await sendRpc("modify", { nodeId: bigPNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Dấu Khoanh Nét Đứt Cam highlights miniPos S30
  await sendRpc("create", { type: "ELLIPSE", parentId: pId, x: 135, y: 160, width: 65, height: 65, fills: [], strokes: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], strokeWeight: 2 });
  
  // Thiết bị miniPos S30
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 155, y: 172, width: 25, height: 42, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pId, x: 158, y: 177, width: 19, height: 32, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });

  // Caption text under Step 1
  const captionNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 30, y: 610, width: 380, fontSize: 11 });
  await sendRpc("set_text", { nodeId: captionNode.result.id, content: "Khách hàng thực hiện đỗ xăng tại cột bơm số 1 có gắn thiết bị miniPos S30" });
  await sendRpc("modify", { nodeId: captionNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG BƯỚC 1 SƠ ĐỒ 'LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX' LÊN FIGMA!");
}

drawPaymentStep1();
