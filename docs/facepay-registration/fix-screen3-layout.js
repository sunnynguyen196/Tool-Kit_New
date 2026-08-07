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

async function fixScreen3Layout() {
  console.log("🎨 Đang cập nhật MÀN 3: Bỏ text, bỏ 3 chấm, căn giữa logo và căn giữa ô quét Face ID...");

  // 1. Tạo Frame Master duy nhất tại y: 4650
  const masterFrame = await sendRpc("create", {
    type: "FRAME",
    name: "[BẢN CHUẨN MÀN 3 CĂN GIỮA] LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX",
    x: 0,
    y: 4650,
    width: 1350,
    height: 650,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 20
  });

  const parentId = masterFrame.result.id;

  // 2. Tiêu đề sơ đồ chính (Navy Blue `#002D62`)
  const mainTitle = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 260, y: 24, fontSize: 24 });
  await sendRpc("set_text", { nodeId: mainTitle.result.id, content: "LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX" });
  await sendRpc("modify", { nodeId: mainTitle.result.id, props: { fills: [{ type: "SOLID", color: { r: 0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  // 3. VẼ 5 NÚT TRÒN VÀ TIÊU ĐỀ HÀNG TRÊN (STEPS 1 TO 5)
  const stepConfigs = [
    { num: "1", x: 40, title: "Khách hàng thực hiện\nđổ xăng tại cột bơm\nsố 1 có gắn\nthiết bị miniPos S30" },
    { num: "2", x: 290, title: "Khách hàng chọn\nphương thức thanh toán\nFacePay trên ứng dụng\nbán hàng tại miniPos S30", sub: "(Điều kiện: KH đã đăng ký\nFacePay trên ứng dụng\nPetrolimex 2.0)" },
    { num: "3", x: 540, title: "Khách hàng căn chỉnh\nmặt trước màn hình\nthiết bị miniPos S30" },
    { num: "4", x: 790, title: "Hệ thống Petrolimex 2.0\nkiểm tra thông tin sinh trắc học\nvà token của user tương ứng.", sub: "Gửi yêu cầu thanh toán\nbằng token đến\nCổng thanh toán Epay" },
    { num: "5", x: 1040, title: "Cổng thanh toán Epay\nxử lý giao dịch thanh toán\n& cấp phép giao dịch" }
  ];

  for (const s of stepConfigs) {
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

    const titleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: s.x, y: 112, width: 220, fontSize: 11 });
    await sendRpc("set_text", { nodeId: titleNode.result.id, content: s.title });
    await sendRpc("modify", { nodeId: titleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0, g: 0.176, b: 0.384 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

    if (s.sub) {
      const subNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: s.x, y: 172, width: 220, fontSize: 9.5 });
      await sendRpc("set_text", { nodeId: subNode.result.id, content: s.sub });
      await sendRpc("modify", { nodeId: subNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });
    }
  }

  // 4. BƯỚC 1: CỘT BƠM XĂNG PETROLIMEX (x: 25, y: 240)
  const pumpCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 1 - Gas Station Graphic",
    x: 25,
    y: 240,
    width: 200,
    height: 330,
    fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    cornerRadius: 12
  });
  const pcId = pumpCard.result.id;

  // Header Cột Bơm
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 15, y: 10, width: 170, height: 30, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 22, y: 15, width: 20, height: 20, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 4 });
  const p1 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 28, y: 17, fontSize: 13 });
  await sendRpc("set_text", { nodeId: p1.result.id, content: "P" });
  await sendRpc("modify", { nodeId: p1.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pb1 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 48, y: 20, fontSize: 10 });
  await sendRpc("set_text", { nodeId: pb1.result.id, content: "PETROLIMEX" });
  await sendRpc("modify", { nodeId: pb1.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Body Cột Bơm
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 25, y: 48, width: 150, height: 200, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 35, y: 58, width: 130, height: 65, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  // Badge 01
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 155, y: 90, width: 24, height: 24, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  const n01 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 159, y: 94, fontSize: 11 });
  await sendRpc("set_text", { nodeId: n01.result.id, content: "01" });
  await sendRpc("modify", { nodeId: n01.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // BIG LOGO PETROLIMEX EMBLEM
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 40, y: 145, width: 120, height: 90, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 65, y: 158, width: 64, height: 64, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 10 });
  const bigP = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 84, y: 168, fontSize: 38 });
  await sendRpc("set_text", { nodeId: bigP.result.id, content: "P" });
  await sendRpc("modify", { nodeId: bigP.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Orange Dashed Circle highlight POS S30
  await sendRpc("create", { type: "ELLIPSE", parentId: pcId, x: 120, y: 125, width: 56, height: 56, fills: [], strokes: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], strokeWeight: 2 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 136, y: 136, width: 24, height: 34, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 4 });

  // Arrow 1 ->
  const a1 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 238, y: 370, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a1.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a1.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // 5. BƯỚC 2: MÀN HÌNH MÁY MINIPOS S30 (KÍCH THƯỚC 84mm x 94mm -> 210px x 235px)
  const phone2 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 2 - miniPos S30 Device Screen (84x94mm)",
    x: 270,
    y: 280,
    width: 210,
    height: 235,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.8, g: 0.83, b: 0.88 } }],
    strokeWeight: 3,
    cornerRadius: 16
  });
  const p2Id = phone2.result.id;

  // Top Camera Lens
  await sendRpc("create", { type: "ELLIPSE", parentId: p2Id, x: 101, y: 8, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }] });

  // LOGO PETROLIMEX
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 50, y: 22, width: 14, height: 14, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 3 });
  const pSmall2 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 54, y: 23, fontSize: 9 });
  await sendRpc("set_text", { nodeId: pSmall2.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pSmall2.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pBrand2 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 68, y: 24, fontSize: 9 });
  await sendRpc("set_text", { nodeId: pBrand2.result.id, content: "PETROLIMEX" });
  await sendRpc("modify", { nodeId: pBrand2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  // Amount display
  const totNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 80, y: 44, fontSize: 9 });
  await sendRpc("set_text", { nodeId: totNode.result.id, content: "Tổng tiền" });
  await sendRpc("modify", { nodeId: totNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }] } });

  const amtNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 38, y: 56, fontSize: 16 });
  await sendRpc("set_text", { nodeId: amtNode.result.id, content: "500.000 VND" });
  await sendRpc("modify", { nodeId: amtNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const selNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 42, y: 80, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: selNode.result.id, content: "Chọn phương thức thanh toán" });
  await sendRpc("modify", { nodeId: selNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }] } });

  // PTT 1: VietQR
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 104, width: 180, height: 38, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  const vietLogoNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 28, y: 116, fontSize: 11 });
  await sendRpc("set_text", { nodeId: vietLogoNode.result.id, content: "Viet" });
  await sendRpc("modify", { nodeId: vietLogoNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.882, g: 0.114, b: 0.278 } }], fontWeight: "Black" } });

  const qrLogoNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 51, y: 116, fontSize: 11 });
  await sendRpc("set_text", { nodeId: qrLogoNode.result.id, content: "QR" });
  await sendRpc("modify", { nodeId: qrLogoNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const chev3 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 175, y: 116, fontSize: 12 });
  await sendRpc("set_text", { nodeId: chev3.result.id, content: ">" });
  await sendRpc("modify", { nodeId: chev3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.6, g: 0.6, b: 0.6 } }] } });

  // PTT 2: Facepay
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 152, width: 180, height: 42, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], strokeWidth: 1.5, cornerRadius: 8 });
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 24, y: 162, width: 22, height: 22, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], cornerRadius: 5 });
  await sendRpc("create", { type: "ELLIPSE", parentId: p2Id, x: 29, y: 168, width: 3, height: 3, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p2Id, x: 38, y: 168, width: 3, height: 3, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 30, y: 175, width: 10, height: 3, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], cornerRadius: 1 });

  const faceTxt = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 54, y: 164, fontSize: 12 });
  await sendRpc("set_text", { nodeId: faceTxt.result.id, content: "Facepay" });
  await sendRpc("modify", { nodeId: faceTxt.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  const chev4 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 175, y: 164, fontSize: 12 });
  await sendRpc("set_text", { nodeId: chev4.result.id, content: ">" });
  await sendRpc("modify", { nodeId: chev4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Bold" } });

  // Arrow 2 ->
  const a2 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 498, y: 370, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a2.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // 6. BƯỚC 3: MÀN HÌNH MINIPOS S30 CĂN GIỮA HOÀN TOÀN (BỎ TEXT, BỎ 3 CHẤM, CAN GIỮA LOGO & KHUNG QUÉT)
  const phone3 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 3 - miniPos S30 Face ID Centered",
    x: 530,
    y: 280,
    width: 210,
    height: 235,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.8, g: 0.83, b: 0.88 } }],
    strokeWeight: 3,
    cornerRadius: 16
  });
  const p3Id = phone3.result.id;

  // Top Camera Lens
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 101, y: 8, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }] });

  // 1. LOGO EPAY CĂN GIỮA CHÍNH XÁC (x: 75)
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 74, y: 24, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 81, y: 20, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 81, y: 28, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  const epayTxt3 = await sendRpc("create", { type: "TEXT", parentId: p3Id, x: 91, y: 20, fontSize: 14 });
  await sendRpc("set_text", { nodeId: epayTxt3.result.id, content: "epay" });
  await sendRpc("modify", { nodeId: epayTxt3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // 2. KHUNG QUÉT FACE ID CĂN GIỮA TOÀN BỘ MÀN HÌNH (Center Point x: 105, y: 130)
  // Khung hình chữ nhật bo góc chứa ảnh chân dung
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 45, y: 55, width: 120, height: 145, fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }], cornerRadius: 10 });

  // 4 Góc vuông xanh lá/xanh dương căn ôm sát khung
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 50, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 50, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 154, y: 50, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 167, y: 50, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 197, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 184, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 154, y: 197, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 167, y: 184, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  // Portrait Avatar lớn đặt căn giữa ô quét
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 65, y: 78, width: 80, height: 80, fills: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }] });

  // (LƯU Ý: ĐÃ BỎ HOÀN TOÀN TEXT 'Vui lòng căn chỉnh khuôn mặt' VÀ 3 CHẤM BÊN DƯỚI THEO ĐÚNG YÊU CẦU!)

  // Arrow 3 ->
  const a3 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 758, y: 370, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a3.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // 7. BƯỚC 4: HỆ THỐNG PETROLIMEX 2.0 PROCESS CARD (x: 790, y: 240)
  const procCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 4 - Petrolimex Backend Process Box",
    x: 790,
    y: 240,
    width: 210,
    height: 330,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    cornerRadius: 12
  });
  const prId = procCard.result.id;

  // TOP LOGO CARD PETROLIMEX 2.0
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 45, y: 12, width: 120, height: 38, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 54, y: 19, width: 24, height: 24, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 5 });
  const pBig4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 61, y: 22, fontSize: 15 });
  await sendRpc("set_text", { nodeId: pBig4.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pBig4.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pLabel4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 84, y: 26, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: pLabel4.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: pLabel4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  // Sub-card 1: Kiểm tra sinh trắc học
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 62, width: 180, height: 38, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc1Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 70, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: proc1Node.result.id, content: "👁  Kiểm tra thông tin\n    sinh trắc học" });
  await sendRpc("modify", { nodeId: proc1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Sub-card 2: Kiểm tra token user
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 110, width: 180, height: 38, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc2Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 118, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: proc2Node.result.id, content: "🔒  Kiểm tra token\n    của user" });
  await sendRpc("modify", { nodeId: proc2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Sub-card 3: Gửi yêu cầu thanh toán
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 158, width: 180, height: 46, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc3Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 164, width: 160, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: proc3Node.result.id, content: "✈  Gửi yêu cầu thanh toán\n    bằng token đến\n    Cổng thanh toán Epay" });
  await sendRpc("modify", { nodeId: proc3Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Epay Logo Bottom of Step 4
  const epayBt4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 55, y: 275, fontSize: 18 });
  await sendRpc("set_text", { nodeId: epayBt4.result.id, content: "⚛️ epay" });
  await sendRpc("modify", { nodeId: epayBt4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // Arrow 4 ->
  const a4 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 1018, y: 370, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a4.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // 8. BƯỚC 5: CỔNG THANH TOÁN EPAY CẤP PHÉP (x: 1050, y: 240)
  const epayCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Step 5 - CTT Epay Approval Box",
    x: 1050,
    y: 240,
    width: 230,
    height: 330,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    cornerRadius: 12
  });
  const epId = epayCard.result.id;

  // Top Epay Logo Box
  await sendRpc("create", { type: "RECTANGLE", parentId: epId, x: 45, y: 15, width: 140, height: 40, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  const epayTop5 = await sendRpc("create", { type: "TEXT", parentId: epId, x: 65, y: 23, fontSize: 18 });
  await sendRpc("set_text", { nodeId: epayTop5.result.id, content: "⚛️ epay" });
  await sendRpc("modify", { nodeId: epayTop5.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // Big Blue Shield Circle
  await sendRpc("create", { type: "ELLIPSE", parentId: epId, x: 65, y: 75, width: 100, height: 100, fills: [{ type: "SOLID", color: { r: 0.882, g: 0.937, b: 0.996 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: epId, x: 80, y: 90, width: 70, height: 70, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }] });

  const shieldCheck = await sendRpc("create", { type: "TEXT", parentId: epId, x: 104, y: 110, fontSize: 22 });
  await sendRpc("set_text", { nodeId: shieldCheck.result.id, content: "✓" });
  await sendRpc("modify", { nodeId: shieldCheck.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Text: Xử lý giao dịch thanh toán và cấp phép giao dịch
  const capNode = await sendRpc("create", { type: "TEXT", parentId: epId, x: 20, y: 195, width: 190, fontSize: 10 });
  await sendRpc("set_text", { nodeId: capNode.result.id, content: "Xử lý giao dịch thanh toán\nvà cấp phép giao dịch" });
  await sendRpc("modify", { nodeId: capNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  // Bottom Green Success Pill Badge
  await sendRpc("create", { type: "RECTANGLE", parentId: epId, x: 20, y: 270, width: 190, height: 32, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], cornerRadius: 16 });
  const succText = await sendRpc("create", { type: "TEXT", parentId: epId, x: 42, y: 278, fontSize: 11 });
  await sendRpc("set_text", { nodeId: succText.result.id, content: "✓  Giao dịch thành công" });
  await sendRpc("modify", { nodeId: succText.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // 9. FOOTER COMPLIANCE BANNER DƯỚI CÙNG (Capsule Banner)
  const footCapsule = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Footer Security Banner",
    x: 200,
    y: 585,
    width: 950,
    height: 44,
    fills: [{ type: "SOLID", color: { r: 0.91, g: 0.945, b: 0.976 } }],
    strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }],
    cornerRadius: 22
  });
  const fcId = footCapsule.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: fcId, x: 40, y: 13, width: 16, height: 18, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });

  const fTextLeft = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 65, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fTextLeft.result.id, content: "Bảo mật – An toàn – Thuận tiện" });
  await sendRpc("modify", { nodeId: fTextLeft.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const fBar = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 300, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fBar.result.id, content: "|" });
  await sendRpc("modify", { nodeId: fBar.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.7, g: 0.75, b: 0.8 } }] } });

  const fTextRight = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 320, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fTextRight.result.id, content: "Ứng dụng sinh trắc học & token bảo vệ mọi giao dịch" });
  await sendRpc("modify", { nodeId: fTextRight.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Zoom to view master frame
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ CẬP NHẬT HOÀN TẤT MÀN 3: BỎ TEXT, BỎ 3 CHẤM, CĂN GIỮA LOGO VÀ CĂN GIỮA Ô QUÉT FACE ID LÊN FIGMA!");
}

fixScreen3Layout();
