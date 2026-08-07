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

async function drawStep1Only() {
  console.log("🎨 Đang tiến hành vẽ CHỈ BƯỚC 1 (MÀN HÌNH 1) lên Figma...");

  // 1. Tạo Canvas Frame Tổng cho Bước 1
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "[BƯỚC 1] KH ĐĂNG KÝ TÀI KHOẢN & XÁC THỰC SINH TRẮC HỌC (FACE ID)",
    x: 0,
    y: 0,
    width: 420,
    height: 650,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 16
  });

  const parentId = mainCanvas.result.id;

  // 2. Tiêu đề Canvas
  const titleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 20, y: 24, fontSize: 16 });
  await sendRpc("set_text", { nodeId: titleNode.result.id, content: "LUỒNG ĐĂNG KÝ FACEPAY TRÊN PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: titleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // 3. Circle Badge 1
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

  // Step 1 Header Title
  const headTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 68, y: 62, width: 330, fontSize: 12 });
  await sendRpc("set_text", { nodeId: headTitleNode.result.id, content: "KH đăng ký tài khoản trên Petrolimex 2.0\n(xác thực sinh trắc học)" });
  await sendRpc("modify", { nodeId: headTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 4. Mobile Phone Frame 1
  const phone = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Screen 1 - Registration & Face ID",
    x: 100,
    y: 120,
    width: 220,
    height: 440,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }],
    strokeWeight: 3.5,
    cornerRadius: 30
  });

  const phoneId = phone.result.id;

  // Notch
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 75, y: 10, width: 70, height: 7, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 4 });

  // Brand Logo Orange Box
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 95, y: 30, width: 30, height: 30, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 6 });
  const pNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 104, y: 34, fontSize: 18 });
  await sendRpc("set_text", { nodeId: pNode.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const brandNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 62, y: 64, fontSize: 11 });
  await sendRpc("set_text", { nodeId: brandNode.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: brandNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  const subNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 65, y: 80, fontSize: 10 });
  await sendRpc("set_text", { nodeId: subNode.result.id, content: "Đăng ký tài khoản" });
  await sendRpc("modify", { nodeId: subNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold" } });

  // Input 1: Số điện thoại
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 20, y: 102, width: 180, height: 28, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 14 });
  const inp1Node = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 32, y: 109, fontSize: 10 });
  await sendRpc("set_text", { nodeId: inp1Node.result.id, content: "Số điện thoại" });
  await sendRpc("modify", { nodeId: inp1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.58, g: 0.64, b: 0.72 } }] } });

  // Input 2: Mật khẩu
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 20, y: 138, width: 180, height: 28, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 14 });
  const inp2Node = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 32, y: 145, fontSize: 10 });
  await sendRpc("set_text", { nodeId: inp2Node.result.id, content: "Mật khẩu" });
  await sendRpc("modify", { nodeId: inp2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.58, g: 0.64, b: 0.72 } }] } });

  // Button: Đăng ký
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 20, y: 174, width: 180, height: 30, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 15 });
  const btnNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 86, y: 181, fontSize: 12 });
  await sendRpc("set_text", { nodeId: btnNode.result.id, content: "Đăng ký" });
  await sendRpc("modify", { nodeId: btnNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // Face Scan Frame Square
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 60, y: 220, width: 100, height: 100, fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 10 });

  // 4 Green Brackets
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 65, y: 225, width: 14, height: 3, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 65, y: 225, width: 3, height: 14, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 141, y: 225, width: 14, height: 3, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 152, y: 225, width: 3, height: 14, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 65, y: 312, width: 14, height: 3, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 65, y: 301, width: 3, height: 14, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 141, y: 312, width: 14, height: 3, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 152, y: 301, width: 3, height: 14, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });

  // Face Avatar Circle inside Scanner
  await sendRpc("create", { type: "ELLIPSE", parentId: phoneId, x: 75, y: 235, width: 70, height: 70, fills: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }] });

  // Status Badge below Face ID Frame
  const statusNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 22, y: 335, fontSize: 9 });
  await sendRpc("set_text", { nodeId: statusNode.result.id, content: "✓ Xác thực sinh trắc học (thành công)" });
  await sendRpc("modify", { nodeId: statusNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], fontWeight: "Bold" } });

  // Caption text under Screen 1
  const captionNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 50, y: 580, width: 320, fontSize: 11 });
  await sendRpc("set_text", { nodeId: captionNode.result.id, content: "KH đăng ký tài khoản và thực hiện xác thực sinh trắc học (Face ID)" });
  await sendRpc("modify", { nodeId: captionNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG HOÀN CHỈNH BƯỚC 1 (MÀN HÌNH 1) VỚI ĐẦY ĐỦ CHỮ VÀ ICON!");
}

drawStep1Only();
