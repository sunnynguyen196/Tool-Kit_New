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

async function drawStep2Only() {
  console.log("🎨 Đang tiến hành vẽ BƯỚC 2 (HỆ THỐNG LƯU TRỮ SINH TRẮC HỌC) lên Figma...");

  // 1. Tạo Canvas Frame cho Bước 2 đặt kế bên Bước 1 (x: 450)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "[BƯỚC 2] HỆ THỐNG LƯU TRỮ SINH TRẮC HỌC",
    x: 450,
    y: 0,
    width: 320,
    height: 650,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 16
  });

  const parentId = mainCanvas.result.id;

  // 2. Circle Badge 2
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
  await sendRpc("set_text", { nodeId: numNode.result.id, content: "2" });
  await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Step 2 Header Title
  const headTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 68, y: 68, width: 230, fontSize: 13 });
  await sendRpc("set_text", { nodeId: headTitleNode.result.id, content: "Hệ thống lưu trữ sinh trắc học" });
  await sendRpc("modify", { nodeId: headTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 3. Cloud Background Oval
  await sendRpc("create", {
    type: "ELLIPSE",
    parentId: parentId,
    x: 75,
    y: 200,
    width: 170,
    height: 130,
    fills: [{ type: "SOLID", color: { r: 0.882, g: 0.937, b: 0.996 } }] // #E1EFFE
  });

  // Server Rack Unit 1 (Upper)
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: parentId,
    x: 110,
    y: 230,
    width: 100,
    height: 24,
    fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }],
    cornerRadius: 4
  });
  // LED dots
  await sendRpc("create", { type: "ELLIPSE", parentId: parentId, x: 120, y: 239, width: 6, height: 6, fills: [{ type: "SOLID", color: { r: 0.376, g: 0.647, b: 0.98 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: parentId, x: 132, y: 239, width: 6, height: 6, fills: [{ type: "SOLID", color: { r: 0.376, g: 0.647, b: 0.98 } }] });

  // Server Rack Unit 2 (Lower)
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: parentId,
    x: 110,
    y: 260,
    width: 100,
    height: 24,
    fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }],
    cornerRadius: 4
  });
  // LED dots
  await sendRpc("create", { type: "ELLIPSE", parentId: parentId, x: 120, y: 269, width: 6, height: 6, fills: [{ type: "SOLID", color: { r: 0.376, g: 0.647, b: 0.98 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: parentId, x: 132, y: 269, width: 6, height: 6, fills: [{ type: "SOLID", color: { r: 0.376, g: 0.647, b: 0.98 } }] });

  // Lock Badge Circle
  await sendRpc("create", {
    type: "ELLIPSE",
    parentId: parentId,
    x: 140,
    y: 272,
    width: 40,
    height: 40,
    fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }],
    strokes: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokeWeight: 2
  });

  // Lock Icon Symbol (text 🔒)
  const lockIcon = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 151, y: 282, fontSize: 16 });
  await sendRpc("set_text", { nodeId: lockIcon.result.id, content: "🔒" });

  // Inner Label under Cloud
  const cloudLabel = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 40, y: 350, width: 240, fontSize: 11 });
  await sendRpc("set_text", { nodeId: cloudLabel.result.id, content: "Hệ thống lưu trữ sinh trắc học\n(được mã hóa)" });
  await sendRpc("modify", { nodeId: cloudLabel.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  // Caption text under Step 2
  const captionNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 30, y: 560, width: 260, fontSize: 11 });
  await sendRpc("set_text", { nodeId: captionNode.result.id, content: "Hệ thống Petrolimex 2.0 lưu trữ dữ liệu sinh trắc học của KH an toàn, bảo mật" });
  await sendRpc("modify", { nodeId: captionNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG HOÀN CHỈNH BƯỚC 2 (HỆ THỐNG LƯU TRỮ SINH TRẮC HỌC) VỚI ĐẦY ĐỦ CHỮ VÀ ICON!");
}

drawStep2Only();
