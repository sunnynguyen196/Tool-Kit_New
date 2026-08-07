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

async function drawAll() {
  console.log("🚀 Đang tiến hành tạo Sơ đồ Luồng Đăng ký FacePay trên Figma qua Reqwise MCP...");

  // 1. Tạo Canvas Frame Tổng
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0",
    x: 0,
    y: 0,
    width: 1300,
    height: 680,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    cornerRadius: 12
  });

  const parentId = mainCanvas.result.id;
  console.log("✅ Đã tạo Canvas Frame Tổng:", parentId);

  // 2. Tạo Tiêu đề chính
  const mainTitle = await sendRpc("create", {
    type: "TEXT",
    parentId: parentId,
    name: "Main Title",
    content: "LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0",
    fontSize: 26,
    fontWeight: "Black",
    fill: "#0E3A7E",
    x: 270,
    y: 24
  });

  // 3. Danh sách 6 Bước Hàng Trên
  const steps = [
    { num: "1", title: "KH đăng ký tài khoản trên Petrolimex 2.0 (xác thực sinh trắc học)", x: 30 },
    { num: "2", title: "Hệ thống lưu trữ sinh trắc học", x: 235 },
    { num: "3", title: "KH thực hiện liên kết token thanh toán với thẻ nội địa/ thẻ quốc tế", x: 410 },
    { num: "4", title: "Hệ thống Petrolimex gửi yêu cầu liên kết token đến CTT Epay", x: 615 },
    { num: "5", title: "CTT Epay trả về token liên kết tương ứng", x: 800 },
    { num: "6", title: "KH cài đặt nguồn tiền thanh toán sinh trắc học", x: 975 }
  ];

  for (const s of steps) {
    // Vòng tròn da cam
    const circle = await sendRpc("create", {
      type: "ELLIPSE",
      parentId: parentId,
      name: `Step ${s.num} Badge`,
      x: s.x + 60,
      y: 75,
      width: 36,
      height: 36,
      fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }]
    });

    const numText = await sendRpc("create", {
      type: "TEXT",
      parentId: parentId,
      name: `Step ${s.num} Number`,
      content: s.num,
      fontSize: 18,
      fontWeight: "Black",
      fill: "#FFFFFF",
      x: circle.result.id ? s.x + 72 : s.x + 72,
      y: 83
    });

    const titleText = await sendRpc("create", {
      type: "TEXT",
      parentId: parentId,
      name: `Step ${s.num} Title`,
      content: s.title,
      fontSize: 11.5,
      fontWeight: "Bold",
      fill: "#0E3A7E",
      textAlignHorizontal: "CENTER",
      width: 170,
      x: s.x - 5,
      y: 120
    });
  }

  // 4. MÀN HÌNH 1 (ĐĂNG KÝ & FACE ID)
  const phone1 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Màn hình 1 - Đăng ký & FaceID",
    x: 20,
    y: 180,
    width: 180,
    height: 360,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }],
    strokeWeight: 3.5,
    cornerRadius: 28
  });
  const p1Id = phone1.result.id;

  // Notch
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 62, y: 8, width: 56, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });
  // Logo P
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 77, y: 24, width: 26, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "TEXT", parentId: p1Id, content: "P", fontSize: 16, fontWeight: "Black", fill: "#FFFFFF", x: 84, y: 28 });
  await sendRpc("create", { type: "TEXT", parentId: p1Id, content: "PETROLIMEX 2.0", fontSize: 10, fontWeight: "Black", fill: "#0E3A7E", x: 50, y: 54 });
  await sendRpc("create", { type: "TEXT", parentId: p1Id, content: "Đăng ký tài khoản", fontSize: 9.5, fontWeight: "Bold", fill: "#333333", x: 50, y: 68 });

  // Inputs & Button
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 15, y: 86, width: 150, height: 24, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 12 });
  await sendRpc("create", { type: "TEXT", parentId: p1Id, content: "Số điện thoại", fontSize: 9, fill: "#94A3B8", x: 24, y: 91 });

  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 15, y: 116, width: 150, height: 24, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 12 });
  await sendRpc("create", { type: "TEXT", parentId: p1Id, content: "Mật khẩu", fontSize: 9, fill: "#94A3B8", x: 24, y: 121 });

  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 15, y: 146, width: 150, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  await sendRpc("create", { type: "TEXT", parentId: p1Id, content: "Đăng ký", fontSize: 11, fontWeight: "Bold", fill: "#FFFFFF", x: 68, y: 152 });

  // Face Scan Square
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 50, y: 190, width: 80, height: 80, fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "TEXT", parentId: p1Id, content: "✓ Xác thực sinh trắc học (thành công)", fontSize: 7.5, fontWeight: "Bold", fill: "#10B981", x: 16, y: 280 });

  // Caption 1
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "KH đăng ký tài khoản và thực hiện xác thực sinh trắc học (Face ID)", fontSize: 10.5, fill: "#333333", textAlignHorizontal: "CENTER", width: 180, x: 20, y: 550 });

  // 5. BƯỚC 2: HỆ THỐNG LƯU TRỮ SINH TRẮC HỌC
  await sendRpc("create", { type: "ELLIPSE", parentId: parentId, x: 230, y: 230, width: 120, height: 95, fills: [{ type: "SOLID", color: { r: 0.882, g: 0.937, b: 0.996 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: parentId, x: 258, y: 255, width: 64, height: 40, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "Hệ thống lưu trữ sinh trắc học\n(được mã hóa)", fontSize: 9.5, fontWeight: "Bold", fill: "#0E3A7E", textAlignHorizontal: "CENTER", width: 160, x: 210, y: 335 });
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "Hệ thống Petrolimex 2.0 lưu trữ dữ liệu sinh trắc học của KH an toàn, bảo mật", fontSize: 10.5, fill: "#333333", textAlignHorizontal: "CENTER", width: 160, x: 210, y: 550 });

  // 6. MÀN HÌNH 2 (LIÊN KẾT THẺ)
  const phone2 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Màn hình 2 - Liên kết thẻ",
    x: 405,
    y: 180,
    width: 180,
    height: 360,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }],
    strokeWeight: 3.5,
    cornerRadius: 28
  });
  const p2Id = phone2.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 62, y: 8, width: 56, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });
  await sendRpc("create", { type: "TEXT", parentId: p2Id, content: "Liên kết thẻ", fontSize: 11, fontWeight: "Bold", fill: "#333333", x: 60, y: 30 });

  // Option 1
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 52, width: 150, height: 42, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "TEXT", parentId: p2Id, content: "Thẻ nội địa\nNAPAS", fontSize: 9.5, fontWeight: "Bold", fill: "#0E3A7E", x: 55, y: 60 });

  // Option 2
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 104, width: 150, height: 42, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "TEXT", parentId: p2Id, content: "Thẻ quốc tế\nVISA / Mastercard / JCB...", fontSize: 9.5, fontWeight: "Bold", fill: "#0E3A7E", x: 55, y: 112 });

  // Button 2
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 315, width: 150, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  await sendRpc("create", { type: "TEXT", parentId: p2Id, content: "Tiếp tục", fontSize: 11, fontWeight: "Bold", fill: "#FFFFFF", x: 68, y: 321 });

  // Caption 2
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "KH chọn và nhập thông tin thẻ nội địa hoặc thẻ quốc tế để liên kết token thanh toán", fontSize: 10.5, fill: "#333333", textAlignHorizontal: "CENTER", width: 180, x: 405, y: 550 });

  // 7. BƯỚC 4: PETROLIMEX GATEWAY
  await sendRpc("create", { type: "RECTANGLE", parentId: parentId, x: 615, y: 220, width: 150, height: 110, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 10 });
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "PETROLIMEX 2.0\n\nGửi yêu cầu liên kết token đến CTT Epay (qua API bảo mật)\n\nXác thực & truyền dữ liệu an toàn", fontSize: 9, fontWeight: "Bold", fill: "#0E3A7E", textAlignHorizontal: "CENTER", width: 140, x: 620, y: 235 });

  // 8. BƯỚC 5: CTT EPAY
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "epay", fontSize: 22, fontWeight: "Black", fill: "#0284C7", x: 835, y: 190 });
  await sendRpc("create", { type: "ELLIPSE", parentId: parentId, x: 840, y: 222, width: 34, height: 34, fills: [{ type: "SOLID", color: { r: 0.055, g: 0.227, b: 0.494 } }] });
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "Xử lý liên kết và tạo token", fontSize: 8.5, fontWeight: "Bold", fill: "#0E3A7E", textAlignHorizontal: "CENTER", width: 130, x: 792, y: 258 });

  // Token Badge
  await sendRpc("create", { type: "RECTANGLE", parentId: parentId, x: 815, y: 280, width: 85, height: 32, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.314, b: 0.635 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "TOKEN\n********", fontSize: 9.5, fontWeight: "Black", fill: "#FFFFFF", textAlignHorizontal: "CENTER", width: 85, x: 815, y: 284 });

  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "CTT Epay xác thực thông tin, xử lý và trả về token liên kết tương ứng", fontSize: 10.5, fill: "#333333", textAlignHorizontal: "CENTER", width: 160, x: 780, y: 550 });

  // 9. MÀN HÌNH 3 (NGUỒN TIỀN FACEPAY)
  const phone3 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Màn hình 3 - FacePay Settings",
    x: 975,
    y: 180,
    width: 180,
    height: 360,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }],
    strokeWeight: 3.5,
    cornerRadius: 28
  });
  const p3Id = phone3.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 62, y: 8, width: 56, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });
  await sendRpc("create", { type: "TEXT", parentId: p3Id, content: "Nguồn tiền thanh toán (FacePay)", fontSize: 9.5, fontWeight: "Bold", fill: "#333333", x: 18, y: 30 });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 15, y: 48, width: 150, height: 28, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "TEXT", parentId: p3Id, content: "VISA                     •••• 1234", fontSize: 9.5, fontWeight: "Black", fill: "#0E3A7E", x: 24, y: 56 });

  await sendRpc("create", { type: "TEXT", parentId: p3Id, content: "Thanh toán bằng tính trắc học", fontSize: 8.5, fontWeight: "Bold", fill: "#1E293B", x: 15, y: 86 });

  // Toggle Switch
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 135, y: 104, width: 28, height: 15, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], cornerRadius: 10 });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 150, y: 106, width: 11, height: 11, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });

  // Button 3
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 15, y: 315, width: 150, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  await sendRpc("create", { type: "TEXT", parentId: p3Id, content: "Hoàn tất", fontSize: 11, fontWeight: "Bold", fill: "#FFFFFF", x: 68, y: 321 });

  // Caption 3
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "KH chọn thẻ đã liên kết làm nguồn tiền mặc định và bật thanh toán sinh trắc học (FacePay)", fontSize: 10.5, fill: "#333333", textAlignHorizontal: "CENTER", width: 180, x: 975, y: 550 });

  // 10. FOOTER BANNER
  await sendRpc("create", { type: "RECTANGLE", parentId: parentId, x: 100, y: 615, width: 1100, height: 36, fills: [{ type: "SOLID", color: { r: 0.91, g: 0.945, b: 0.976 } }], strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], cornerRadius: 20 });
  await sendRpc("create", { type: "TEXT", parentId: parentId, content: "🛡️ Bảo mật – An toàn – Tuân thủ quy định của Ngân hàng Nhà nước và các tiêu chuẩn bảo mật quốc tế", fontSize: 12, fontWeight: "Bold", fill: "#0E3A7E", x: 280, y: 624 });

  // Zoom to view
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ TOÀN BỘ SƠ ĐỒ VÀ CÁC MÀN HÌNH NGUYÊN BẢN 100% LÊN FIGMA THÀNH CÔNG!");
}

drawAll();
