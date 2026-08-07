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

async function drawStep6Only() {
  console.log("🎨 Đang tiến hành vẽ BƯỚC 6 (MÀN HÌNH 3: CÀI ĐẶT FACEPAY) lên Figma...");

  // 1. Tạo Canvas Frame cho Bước 6 (x: 2000)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "[BƯỚC 6] KH CÀI ĐẶT NGUỒN TIỀN THANH TOÁN SINH TRẮC HỌC (MÀN HÌNH 3)",
    x: 2000,
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
  await sendRpc("set_text", { nodeId: titleNode.result.id, content: "MÀN HÌNH 3: CÀI ĐẶT NGUỒN TIỀN FACEPAY" });
  await sendRpc("modify", { nodeId: titleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // 3. Circle Badge 6
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
  await sendRpc("set_text", { nodeId: numNode.result.id, content: "6" });
  await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Step 6 Header Title
  const headTitleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 68, y: 62, width: 330, fontSize: 12 });
  await sendRpc("set_text", { nodeId: headTitleNode.result.id, content: "KH cài đặt nguồn tiền thanh toán\nsinh trắc học" });
  await sendRpc("modify", { nodeId: headTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // 4. Mobile Phone Frame 3
  const phone = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Screen 3 - FacePay Settings",
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

  // Screen Header Title: Nguồn tiền thanh toán (FacePay)
  const screenTitle = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 30, y: 32, fontSize: 11 });
  await sendRpc("set_text", { nodeId: screenTitle.result.id, content: "Nguồn tiền thanh toán (FacePay)" });
  await sendRpc("modify", { nodeId: screenTitle.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold" } });

  // Linked Card Container Box (VISA •••• 1234)
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 15, y: 55, width: 190, height: 36, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  
  const visaTitleNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 26, y: 65, fontSize: 12 });
  await sendRpc("set_text", { nodeId: visaTitleNode.result.id, content: "VISA" });
  await sendRpc("modify", { nodeId: visaTitleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  const visaMaskNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 135, y: 67, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: visaMaskNode.result.id, content: "•••• 1234" });
  await sendRpc("modify", { nodeId: visaMaskNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }], fontWeight: "Bold" } });

  // Setting Subtitle: Thanh toán bằng tính trắc học
  const setSubNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 15, y: 104, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: setSubNode.result.id, content: "Thanh toán bằng tính trắc học" });
  await sendRpc("modify", { nodeId: setSubNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.231 } }], fontWeight: "Bold" } });

  // Face Icon & Toggle Row
  const faceIconNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 18, y: 126, fontSize: 18 });
  await sendRpc("set_text", { nodeId: faceIconNode.result.id, content: "😊" });

  // Toggle Switch Green ON
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 165, y: 128, width: 32, height: 18, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], cornerRadius: 10 });
  await sendRpc("create", { type: "ELLIPSE", parentId: phoneId, x: 182, y: 130, width: 14, height: 14, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });

  // Button: Hoàn tất (Đáy màn hình y: 390)
  await sendRpc("create", { type: "RECTANGLE", parentId: phoneId, x: 20, y: 390, width: 180, height: 32, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 16 });
  const btnNode = await sendRpc("create", { type: "TEXT", parentId: phoneId, x: 84, y: 398, fontSize: 12 });
  await sendRpc("set_text", { nodeId: btnNode.result.id, content: "Hoàn tất" });
  await sendRpc("modify", { nodeId: btnNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // Caption text under Screen 3
  const captionNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 30, y: 580, width: 360, fontSize: 11 });
  await sendRpc("set_text", { nodeId: captionNode.result.id, content: "KH chọn thẻ đã liên kết làm nguồn tiền mặc định và bật thanh toán sinh trắc học (FacePay)" });
  await sendRpc("modify", { nodeId: captionNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG HOÀN CHỈNH BƯỚC 6 (MÀN HÌNH 3: CÀI ĐẶT FACEPAY) VỚI ĐẦY ĐỦ CHỮ VÀ ICON!");
}

drawStep6Only();
