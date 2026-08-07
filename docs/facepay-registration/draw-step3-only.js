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

async function drawStep3Only() {
  console.log("🎨 Đang tiến hành vẽ BƯỚC 3 (MÀN HÌNH 2: LIÊN KẾT THẺ) lên Figma...");

  // 1. Tạo Canvas Frame cho Bước 3 (x: 800)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "[BƯỚC 3] KH THỰC HIỆN LIÊN KẾT TOKEN THANH TOÁN (MÀN HÌNH 2)",
    x: 800,
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
  await sendRpc("set_text", { nodeId: titleNode.result.id, content: "MÀN HÌNH 2: CHỌN VÀ LIÊN KẾT THẺ THANH TOÁN" });
  await sendRpc("modify", { nodeId: titleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // 3. Circle Badge 3
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
  await sendRpc("set_text", { nodeId: numNode.result.id, content: "3" });
  await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Step 3 Header Title
  const headTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 68, y: 62, width: 330, fontSize: 12 });
  await sendRpc("set_text", { nodeId: headTitleNode.result.id, content: "KH thực hiện liên kết token thanh toán\nvới thẻ nội địa/ thẻ quốc tế" });
  await sendRpc("modify", { nodeId: headTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 4. Mobile Phone Frame 2
  const phone = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Screen 2 - Card Selection",
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

  // Screen Header Title: Liên kết thẻ
  const screenTitle = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 75, y: 32, fontSize: 12 });
  await sendRpc("set_text", { nodeId: screenTitle.result.id, content: "Liên kết thẻ" });
  await sendRpc("modify", { nodeId: screenTitle.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold" } });

  // Option 1: Thẻ nội địa (NAPAS)
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 15, y: 60, width: 190, height: 50, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 10 });
  
  // Icon card navy
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 25, y: 72, width: 36, height: 26, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 4 });
  const cardIcon1 = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 34, y: 76, fontSize: 13 });
  await sendRpc("set_text", { nodeId: cardIcon1.result.id, content: "💳" });

  const opt1Title = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 70, y: 68, fontSize: 11 });
  await sendRpc("set_text", { nodeId: opt1Title.result.id, content: "Thẻ nội địa" });
  await sendRpc("modify", { nodeId: opt1Title.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.231 } }], fontWeight: "Bold" } });

  const opt1Sub = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 70, y: 86, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: opt1Sub.result.id, content: "NAPAS" });
  await sendRpc("modify", { nodeId: opt1Sub.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Bold" } });

  // Option 2: Thẻ quốc tế (VISA / Mastercard / JCB...)
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 15, y: 120, width: 190, height: 50, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 10 });
  
  // Icon card navy 2
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 25, y: 132, width: 36, height: 26, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 4 });
  const cardIcon2 = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 34, y: 136, fontSize: 13 });
  await sendRpc("set_text", { nodeId: cardIcon2.result.id, content: "🌐" });

  const opt2Title = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 70, y: 128, fontSize: 11 });
  await sendRpc("set_text", { nodeId: opt2Title.result.id, content: "Thẻ quốc tế" });
  await sendRpc("modify", { nodeId: opt2Title.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.231 } }], fontWeight: "Bold" } });

  const opt2Sub = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 70, y: 146, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: opt2Sub.result.id, content: "VISA / Mastercard / JCB..." });
  await sendRpc("modify", { nodeId: opt2Sub.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }] } });

  // Button: Tiếp tục (Đáy màn hình y: 390)
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 20, y: 390, width: 180, height: 32, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 16 });
  const btnNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 84, y: 398, fontSize: 12 });
  await sendRpc("set_text", { nodeId: btnNode.result.id, content: "Tiếp tục" });
  await sendRpc("modify", { nodeId: btnNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // Caption text under Screen 2
  const captionNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 30, y: 580, width: 360, fontSize: 11 });
  await sendRpc("set_text", { nodeId: captionNode.result.id, content: "KH chọn và nhập thông tin thẻ nội địa hoặc thẻ quốc tế để liên kết token thanh toán" });
  await sendRpc("modify", { nodeId: captionNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG HOÀN CHỈNH BƯỚC 3 (MÀN HÌNH 2: LIÊN KẾT THẺ) VỚI ĐẦY ĐỦ CHỮ VÀ ICON!");
}

drawStep3Only();
