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

async function drawStep4Only() {
  console.log("🎨 Đang tiến hành vẽ BƯỚC 4 (HỆ THỐNG PETROLIMEX GATEWAY) lên Figma...");

  // 1. Tạo Canvas Frame cho Bước 4 (x: 1250)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "[BƯỚC 4] HỆ THỐNG PETROLIMEX GỬI YÊU CẦU LIÊN KẾT TOKEN DẾN CTT EPAY",
    x: 1250,
    y: 0,
    width: 320,
    height: 650,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 16
  });

  const parentId = mainCanvas.result.id;

  // 2. Circle Badge 4
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
  await sendRpc("set_text", { nodeId: numNode.result.id, content: "4" });
  await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Step 4 Header Title
  const headTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 68, y: 62, width: 230, fontSize: 12 });
  await sendRpc("set_text", { nodeId: headTitleNode.result.id, content: "Hệ thống Petrolimex gửi yêu cầu\nliên kết token đến CTT Epay" });
  await sendRpc("modify", { nodeId: headTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 3. Petrolimex Gateway Card Box
  const petroCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Petrolimex Gateway Container",
    x: 45,
    y: 180,
    width: 230,
    height: 250,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }],
    strokeWeight: 1,
    cornerRadius: 12
  });

  const cardId = petroCard.result.id;

  // Server Rack Graphic Top
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: cardId,
    x: 75,
    y: 20,
    width: 80,
    height: 48,
    fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }],
    cornerRadius: 6
  });

  // Server slot lines & LEDs
  await sendRpc("create", { type: "RECTANGLE", parentId: cardId, x: 83, y: 28, width: 64, height: 8, fills: [{ type: "SOLID", color: { r: 0.114, g: 0.306, b: 0.847 } }], cornerRadius: 2 });
  await sendRpc("create", { type: "ELLIPSE", parentId: cardId, x: 87, y: 30, width: 4, height: 4, fills: [{ type: "SOLID", color: { r: 0.376, g: 0.647, b: 0.98 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: cardId, x: 83, y: 48, width: 64, height: 8, fills: [{ type: "SOLID", color: { r: 0.114, g: 0.306, b: 0.847 } }], cornerRadius: 2 });
  await sendRpc("create", { type: "ELLIPSE", parentId: cardId, x: 87, y: 50, width: 4, height: 4, fills: [{ type: "SOLID", color: { r: 0.376, g: 0.647, b: 0.98 } }] });

  // Logo P & Brand Name inside Card
  await sendRpc("create", { type: "RECTANGLE", parentId: cardId, x: 45, y: 82, width: 18, height: 18, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 4 });
  const pNode = await sendRpc("create", { type: "TEXT", parentId: cardId, x: 50, y: 84, fontSize: 11 });
  await sendRpc("set_text", { nodeId: pNode.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const brandNode = await sendRpc("create", { type: "TEXT", parentId: cardId, x: 70, y: 85, fontSize: 11 });
  await sendRpc("set_text", { nodeId: brandNode.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: brandNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // Feature Row 1: Gear Icon + Text
  const gearIcon = await sendRpc("create", { type: "TEXT", parentId: cardId, x: 15, y: 122, fontSize: 16 });
  await sendRpc("set_text", { nodeId: gearIcon.result.id, content: "⚙️" });

  const feat1Node = await sendRpc("create", { type: "TEXT", parentId: cardId, x: 38, y: 120, width: 175, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: feat1Node.result.id, content: "Gửi yêu cầu liên kết token đến CTT Epay (qua API bảo mật)" });
  await sendRpc("modify", { nodeId: feat1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // Feature Row 2: Shield Icon + Text
  const shieldIcon = await sendRpc("create", { type: "TEXT", parentId: cardId, x: 15, y: 175, fontSize: 16 });
  await sendRpc("set_text", { nodeId: shieldIcon.result.id, content: "🛡️" });

  const feat2Node = await sendRpc("create", { type: "TEXT", parentId: cardId, x: 38, y: 177, width: 175, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: feat2Node.result.id, content: "Xác thực & truyền dữ liệu an toàn" });
  await sendRpc("modify", { nodeId: feat2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG HOÀN CHỈNH BƯỚC 4 (PETROLIMEX GATEWAY) VỚI ĐẦY ĐỦ CHỮ VÀ ICON!");
}

drawStep4Only();
