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

async function drawStep5Only() {
  console.log("🎨 Đang tiến hành vẽ BƯỚC 5 (CTT EPAY TRẢ VỀ TOKEN) lên Figma...");

  // 1. Tạo Canvas Frame cho Bước 5 (x: 1620)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "[BƯỚC 5] CTT EPAY TRẢ VỀ TOKEN LIÊN KẾT TƯƠNG ỨNG",
    x: 1620,
    y: 0,
    width: 320,
    height: 650,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 16
  });

  const parentId = mainCanvas.result.id;

  // 2. Circle Badge 5
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
  await sendRpc("set_text", { nodeId: numNode.result.id, content: "5" });
  await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Step 5 Header Title
  const headTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 68, y: 68, width: 230, fontSize: 13 });
  await sendRpc("set_text", { nodeId: headTitleNode.result.id, content: "CTT Epay trả về token liên kết tương ứng" });
  await sendRpc("modify", { nodeId: headTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 3. Epay Brand Graphic
  const atomIcon = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 105, y: 190, fontSize: 24 });
  await sendRpc("set_text", { nodeId: atomIcon.result.id, content: "⚛️" });

  const epayTextNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 135, y: 190, fontSize: 24 });
  await sendRpc("set_text", { nodeId: epayTextNode.result.id, content: "epay" });
  await sendRpc("modify", { nodeId: epayTextNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // Shield Circle Badge
  await sendRpc("create", {
    type: "ELLIPSE",
    parentId: parentId,
    x: 140,
    y: 235,
    width: 40,
    height: 40,
    fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }]
  });

  const shieldIcon = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 151, y: 244, fontSize: 16 });
  await sendRpc("set_text", { nodeId: shieldIcon.result.id, content: "🛡️" });

  const processLabelNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 40, y: 285, width: 240, fontSize: 10 });
  await sendRpc("set_text", { nodeId: processLabelNode.result.id, content: "Xử lý liên kết và tạo token" });
  await sendRpc("modify", { nodeId: processLabelNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  // Token Blue Display Card
  const tokenBox = await sendRpc("create", {
    type: "RECTANGLE",
    parentId: parentId,
    x: 110,
    y: 315,
    width: 100,
    height: 38,
    fills: [{ type: "SOLID", color: { r: 0.118, g: 0.314, b: 0.635 } }], // #1E50A2
    cornerRadius: 8
  });

  const tokenTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 140, y: 320, fontSize: 9 });
  await sendRpc("set_text", { nodeId: tokenTitleNode.result.id, content: "TOKEN" });
  await sendRpc("modify", { nodeId: tokenTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  const tokenValNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 130, y: 334, fontSize: 12 });
  await sendRpc("set_text", { nodeId: tokenValNode.result.id, content: "********" });
  await sendRpc("modify", { nodeId: tokenValNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Caption text under Step 5
  const captionNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 30, y: 560, width: 260, fontSize: 11 });
  await sendRpc("set_text", { nodeId: captionNode.result.id, content: "CTT Epay xác thực thông tin, xử lý và trả về token liên kết tương ứng" });
  await sendRpc("modify", { nodeId: captionNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG HOÀN CHỈNH BƯỚC 5 (CTT EPAY TRẢ VỀ TOKEN) VỚI ĐẦY ĐỦ CHỮ VÀ ICON!");
}

drawStep5Only();
