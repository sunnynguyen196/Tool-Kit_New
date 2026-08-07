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

async function drawFullPaymentFlow() {
  console.log("🎨 Đang tiến hành vẽ TOÀN BỘ SƠ ĐỒ 'LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX' VÀO 1 FRAME...");

  // 1. Tạo Frame Canvas Master duy nhất (1350 x 720)
  const masterFrame = await sendRpc("create", {
    type: "FRAME",
    name: "LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX",
    x: 0,
    y: 1500, // Đặt tách biệt bên dưới các frame lẻ
    width: 1350,
    height: 720,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 20
  });

  const parentId = masterFrame.result.id;

  // 2. Tiêu đề sơ đồ chính (Navy Blue)
  const mainTitle = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 260, y: 24, fontSize: 24 });
  await sendRpc("set_text", { nodeId: mainTitle.result.id, content: "LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX" });
  await sendRpc("modify", { nodeId: mainTitle.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // 3. VẼ 5 NÚT TRÒN VÀ TIÊU ĐỀ HÀNG TRÊN (STEPS 1 TO 5)
  const stepConfigs = [
    { num: "1", x: 40, title: "Khách hàng thực hiện\nđổ xăng tại cột bơm\nsố 1 có gắn\nthiết bị miniPos S30" },
    { num: "2", x: 290, title: "Khách hàng chọn\nphương thức thanh toán\nFacePay trên ứng dụng\nbán hàng tại miniPos S30", sub: "(Điều kiện: KH đã đăng ký\nFacePay trên ứng dụng\nPetrolimex 2.0)" },
    { num: "3", x: 540, title: "Khách hàng căn chỉnh\nmặt trước màn hình\nthiết bị miniPos S30" },
    { num: "4", x: 790, title: "Hệ thống Petrolimex 2.0\nkiểm tra thông tin sinh trắc học\nvà token của user tương ứng.", sub: "Gửi yêu cầu thanh toán\nbằng token đến\nCổng thanh toán Epay" },
    { num: "5", x: 1040, title: "Cổng thanh toán Epay\nxử lý giao dịch thanh toán\n& cấp phép giao dịch" }
  ];

  for (const s of stepConfigs) {
    // Vòng tròn da cam
    const circle = await sendRpc("create", {
      type: "ELLIPSE",
      parentId: parentId,
      x: s.x + 90,
      y: 68,
      width: 36,
      height: 36,
      fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }]
    });

    const numNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: s.x + 102, y: 76, fontSize: 18 });
    await sendRpc("set_text", { nodeId: numNode.result.id, content: s.num });
    await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

    // Step Header Title
    const titleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: s.x, y: 112, width: 220, fontSize: 11 });
    await sendRpc("set_text", { nodeId: titleNode.result.id, content: s.title });
    await sendRpc("modify", { nodeId: titleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

    if (s.sub) {
      const subNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: s.x, y: 172, width: 220, fontSize: 9.5 });
      await sendRpc("set_text", { nodeId: subNode.result.id, content: s.sub });
      await sendRpc("modify", { nodeId: subNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });
    }
  }

  // 4. BƯỚC 1: ĐỒ HỌA CỘT BƠM XĂNG PETROLIMEX (x: 25, y: 230)
  const pumpCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 1 - Gas Station Graphic",
    x: 25,
    y: 230,
    width: 200,
    height: 380,
    fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    cornerRadius: 12
  });
  const pcId = pumpCard.result.id;

  // Header Cột Bơm
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 15, y: 12, width: 170, height: 32, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 22, y: 18, width: 20, height: 20, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 4 });
  const p1 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 28, y: 21, fontSize: 13 });
  await sendRpc("set_text", { nodeId: p1.result.id, content: "P" });
  await sendRpc("modify", { nodeId: p1.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pb1 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 48, y: 22, fontSize: 10 });
  await sendRpc("set_text", { nodeId: pb1.result.id, content: "PETROLIMEX" });
  await sendRpc("modify", { nodeId: pb1.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Body Cột Bơm & Tủ dưới
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 25, y: 52, width: 150, height: 220, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 35, y: 65, width: 130, height: 75, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  // Badge 01
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 155, y: 100, width: 24, height: 24, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 4 });
  const n01 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 159, y: 104, fontSize: 11 });
  await sendRpc("set_text", { nodeId: n01.result.id, content: "01" });
  await sendRpc("modify", { nodeId: n01.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Big P cabinet bottom
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 40, y: 160, width: 120, height: 100, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 70, y: 180, width: 60, height: 60, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 10 });
  const bigP = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 86, y: 188, fontSize: 36 });
  await sendRpc("set_text", { nodeId: bigP.result.id, content: "P" });
  await sendRpc("modify", { nodeId: bigP.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Orange Dashed Circle highlight POS S30
  await sendRpc("create", { type: "ELLIPSE", parentId: pcId, x: 120, y: 135, width: 60, height: 60, fills: [], strokes: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], strokeWeight: 2 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 138, y: 146, width: 24, height: 38, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 4 });

  // Arrow 1 ->
  const a1 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 238, y: 400, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a1.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a1.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // 5. BƯỚC 2: MÀN HÌNH MINIPOS S30 CHỌN FACEPAY (x: 270, y: 230)
  const phone2 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 2 - miniPos S30 Screen 1",
    x: 270,
    y: 230,
    width: 210,
    height: 380,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 2,
    cornerRadius: 24
  });
  const p2Id = phone2.result.id;

  // Top Camera Lens
  await sendRpc("create", { type: "ELLIPSE", parentId: p2Id, x: 100, y: 10, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }] });

  // Petrolimex logo inside POS
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 50, y: 24, width: 14, height: 14, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 3 });
  const pSmall2 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 54, y: 25, fontSize: 9 });
  await sendRpc("set_text", { nodeId: pSmall2.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pSmall2.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pBrand2 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 68, y: 26, fontSize: 9 });
  await sendRpc("set_text", { nodeId: pBrand2.result.id, content: "PETROLIMEX" });
  await sendRpc("modify", { nodeId: pBrand2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // Amount display
  const totNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 80, y: 46, fontSize: 9 });
  await sendRpc("set_text", { nodeId: totNode.result.id, content: "Tổng tiền" });
  await sendRpc("modify", { nodeId: totNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }] } });

  const amtNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 38, y: 58, fontSize: 16 });
  await sendRpc("set_text", { nodeId: amtNode.result.id, content: "500.000 VND" });
  await sendRpc("modify", { nodeId: amtNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  const selNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 42, y: 84, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: selNode.result.id, content: "Chọn phương thức thanh toán" });
  await sendRpc("modify", { nodeId: selNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }] } });

  // Payment Options Cards
  // Opt 1: Thẻ nội địa
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 104, width: 180, height: 32, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  const c1 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 25, y: 112, fontSize: 10 });
  await sendRpc("set_text", { nodeId: c1.result.id, content: "💳   Thẻ nội địa" });
  await sendRpc("modify", { nodeId: c1.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.231 } }], fontWeight: "Bold" } });

  // Opt 2: Thẻ quốc tế
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 144, width: 180, height: 32, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  const c2 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 25, y: 152, fontSize: 10 });
  await sendRpc("set_text", { nodeId: c2.result.id, content: "🌐   Thẻ quốc tế" });
  await sendRpc("modify", { nodeId: c2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.231 } }], fontWeight: "Bold" } });

  // Opt 3: VietQR
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 184, width: 180, height: 32, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  const c3 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 25, y: 192, fontSize: 10 });
  await sendRpc("set_text", { nodeId: c3.result.id, content: "🔴   VietQR" });
  await sendRpc("modify", { nodeId: c3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.231 } }], fontWeight: "Bold" } });

  // Opt 4: Facepay (Highlighted Card!)
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 224, width: 180, height: 36, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], strokeWidth: 1.5, cornerRadius: 8 });
  const c4 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 25, y: 232, fontSize: 11 });
  await sendRpc("set_text", { nodeId: c4.result.id, content: "😊   Facepay" });
  await sendRpc("modify", { nodeId: c4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // Arrow 2 ->
  const a2 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 498, y: 400, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a2.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // 6. BƯỚC 3: MÀN HÌNH MINIPOS S30 CĂN CHỈNH KHUÔN MẶT (x: 530, y: 230)
  const phone3 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 3 - miniPos S30 Screen 2 Face ID",
    x: 530,
    y: 230,
    width: 210,
    height: 380,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 2,
    cornerRadius: 24
  });
  const p3Id = phone3.result.id;

  // Top Camera Lens
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 100, y: 10, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }] });

  // Epay Logo Top
  const epayIcon3 = await sendRpc("create", { type: "TEXT", parentId: p3Id, x: 70, y: 24, fontSize: 16 });
  await sendRpc("set_text", { nodeId: epayIcon3.result.id, content: "⚛️ epay" });
  await sendRpc("modify", { nodeId: epayIcon3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // Face Camera Box with Blue Corner Brackets
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 45, y: 55, width: 120, height: 130, fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }], cornerRadius: 8 });

  // Corner Brackets
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 50, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 50, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 154, y: 50, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 167, y: 50, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 182, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 169, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 154, y: 182, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 167, y: 169, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  // Face Avatar Portrait
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 65, y: 70, width: 80, height: 80, fills: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }] });

  // Subtitle: Vui lòng căn chỉnh khuôn mặt
  const alignNode = await sendRpc("create", { type: "TEXT", parentId: p3Id, x: 30, y: 200, width: 150, fontSize: 10 });
  await sendRpc("set_text", { nodeId: alignNode.result.id, content: "Vui lòng căn chỉnh\nkhuôn mặt" });
  await sendRpc("modify", { nodeId: alignNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  // Dots indicator at bottom
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 86, y: 240, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 100, y: 240, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 114, y: 240, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }] });

  // Arrow 3 ->
  const a3 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 758, y: 400, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a3.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // 7. BƯỚC 4: HỆ THỐNG PETROLIMEX BACKEND PROCESS CARD (x: 790, y: 230)
  const procCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 4 - Petrolimex Backend Process Box",
    x: 790,
    y: 230,
    width: 210,
    height: 380,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    cornerRadius: 12
  });
  const prId = procCard.result.id;

  // Top Petrolimex Logo
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 50, y: 15, width: 110, height: 40, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 60, y: 23, width: 24, height: 24, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 4 });
  const pBig4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 67, y: 26, fontSize: 14 });
  await sendRpc("set_text", { nodeId: pBig4.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pBig4.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pLabel4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 88, y: 30, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: pLabel4.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: pLabel4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  // Sub-card 1: Kiểm tra sinh trắc học
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 75, width: 180, height: 40, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc1Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 85, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: proc1Node.result.id, content: "👁  Kiểm tra thông tin\n    sinh trắc học" });
  await sendRpc("modify", { nodeId: proc1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // Sub-card 2: Kiểm tra token user
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 130, width: 180, height: 40, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc2Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 140, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: proc2Node.result.id, content: "🔒  Kiểm tra token\n    của user" });
  await sendRpc("modify", { nodeId: proc2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // Sub-card 3: Gửi yêu cầu thanh toán
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 185, width: 180, height: 50, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc3Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 192, width: 160, fontSize: 9 });
  await sendRpc("set_text", { nodeId: proc3Node.result.id, content: "✈  Gửi yêu cầu thanh toán\n    bằng token đến\n    Cổng thanh toán Epay" });
  await sendRpc("modify", { nodeId: proc3Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // Epay Logo Bottom of Step 4
  const epayBt4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 55, y: 310, fontSize: 20 });
  await sendRpc("set_text", { nodeId: epayBt4.result.id, content: "⚛️ epay" });
  await sendRpc("modify", { nodeId: epayBt4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // Arrow 4 ->
  const a4 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 1018, y: 400, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a4.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // 8. BƯỚC 5: CỔNG THANH TOÁN EPAY XỬ LÝ & CẤP PHÉP (x: 1050, y: 230)
  const epayCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 5 - CTT Epay Approval Box",
    x: 1050,
    y: 230,
    width: 230,
    height: 380,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    cornerRadius: 12
  });
  const epId = epayCard.result.id;

  // Top Epay Logo Box
  await sendRpc("create", { type: "RECTANGLE", parentId: epId, x: 45, y: 20, width: 140, height: 45, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  const epayTop5 = await sendRpc("create", { type: "TEXT", parentId: epId, x: 65, y: 30, fontSize: 20 });
  await sendRpc("set_text", { nodeId: epayTop5.result.id, content: "⚛️ epay" });
  await sendRpc("modify", { nodeId: epayTop5.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // Big Blue Shield Circle
  await sendRpc("create", { type: "ELLIPSE", parentId: epId, x: 55, y: 95, width: 120, height: 120, fills: [{ type: "SOLID", color: { r: 0.882, g: 0.937, b: 0.996 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: epId, x: 75, y: 115, width: 80, height: 80, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }] });

  const shieldCheck = await sendRpc("create", { type: "TEXT", parentId: epId, x: 102, y: 138, fontSize: 26 });
  await sendRpc("set_text", { nodeId: shieldCheck.result.id, content: "✓" });
  await sendRpc("modify", { nodeId: shieldCheck.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Text: Xử lý giao dịch thanh toán và cấp phép giao dịch
  const capNode = await sendRpc("create", { type: "TEXT", parentId: epId, x: 20, y: 235, width: 190, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: capNode.result.id, content: "Xử lý giao dịch thanh toán\nvà cấp phép giao dịch" });
  await sendRpc("modify", { nodeId: capNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  // Bottom Green Success Pill Badge
  await sendRpc("create", { type: "RECTANGLE", parentId: epId, x: 20, y: 310, width: 190, height: 34, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], cornerRadius: 17 });
  const succText = await sendRpc("create", { type: "TEXT", parentId: epId, x: 42, y: 319, fontSize: 11.5 });
  await sendRpc("set_text", { nodeId: succText.result.id, content: "✓  Giao dịch thành công" });
  await sendRpc("modify", { nodeId: succText.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // 9. FOOTER COMPLIANCE BANNER DƯỚI CÙNG (Capsule Banner)
  const footCapsule = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Footer Security Banner",
    x: 200,
    y: 645,
    width: 950,
    height: 44,
    fills: [{ type: "SOLID", color: { r: 0.91, g: 0.945, b: 0.976 } }],
    strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }],
    cornerRadius: 22
  });
  const fcId = footCapsule.result.id;

  const fShield = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 40, y: 10, fontSize: 18 });
  await sendRpc("set_text", { nodeId: fShield.result.id, content: "🛡️" });

  const fTextLeft = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 70, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fTextLeft.result.id, content: "Bảo mật – An toàn – Thuận tiện" });
  await sendRpc("modify", { nodeId: fTextLeft.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Black" } });

  const fBar = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 305, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fBar.result.id, content: "|" });
  await sendRpc("modify", { nodeId: fBar.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.7, g: 0.75, b: 0.8 } }] } });

  const fTextRight = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 325, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fTextRight.result.id, content: "Ứng dụng sinh trắc học & token bảo vệ mọi giao dịch" });
  await sendRpc("modify", { nodeId: fTextRight.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], fontWeight: "Bold" } });

  // Zoom to view master frame
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ HOÀN THÀNH TOÀN BỘ SƠ ĐỒ 'LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX' VÀO 1 FRAME DUY NHẤT!");
}

drawFullPaymentFlow();
