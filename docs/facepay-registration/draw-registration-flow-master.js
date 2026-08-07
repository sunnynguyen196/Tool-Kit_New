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

async function drawRegistrationFlowMaster() {
  console.log("🎨 Đang tiến hành vẽ 1 FRAME DUY NHẤT 'LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0'...");

  // 1. Tạo Frame Master duy nhất tại vị trí x: 0, y: 700 (Song song với sơ đồ Thanh toán)
  const masterFrame = await sendRpc("create", {
    type: "FRAME",
    name: "LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0",
    x: 0,
    y: 700,
    width: 1360,
    height: 660,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 20
  });

  const parentId = masterFrame.result.id;

  // 2. Tiêu đề sơ đồ chính (Navy Blue `#002D62`)
  const mainTitle = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 310, y: 24, fontSize: 24 });
  await sendRpc("set_text", { nodeId: mainTitle.result.id, content: "LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: mainTitle.result.id, props: { fills: [{ type: "SOLID", color: { r: 0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  // 3. VẼ 7 NÚT TRÒN VÀ TIÊU ĐỀ HÀNG TRÊN (STEPS 1 TO 7)
  const stepConfigs = [
    { num: "1", x: 25, title: "KH đăng ký tài khoản trên Petrolimex 2.0\n(xác thực sinh trắc học)" },
    { num: "2", x: 215, title: "Hệ thống lưu trữ\nsinh trắc học" },
    { num: "3", x: 395, title: "KH thực hiện liên kết token thanh toán\nvới thẻ nội địa/ thẻ quốc tế" },
    { num: "4", x: 585, title: "Hệ thống Petrolimex gửi yêu cầu\nliên kết token đến CTT Epay" },
    { num: "5", x: 775, title: "CTT Epay trả về token\nliên kết tương ứng" },
    { num: "6", x: 955, title: "KH cài đặt nguồn tiền\nthanh toán sinh trắc học" },
    { num: "7", x: 1135, title: "Hệ thống Petrolimex 2.0 lưu trữ thông tin\nsinh trắc học với token tương ứng" }
  ];

  for (const s of stepConfigs) {
    const circle = await sendRpc("create", {
      type: "ELLIPSE",
      parentId: parentId,
      x: s.x + 65,
      y: 68,
      width: 34,
      height: 34,
      fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }]
    });

    const numNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: s.x + 77, y: 75, fontSize: 17 });
    await sendRpc("set_text", { nodeId: numNode.result.id, content: s.num });
    await sendRpc("modify", { nodeId: numNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

    const titleNode = await sendRpc("create", { type: "TEXT", parentId: parentId, x: s.x - 10, y: 110, width: 185, fontSize: 10.5 });
    await sendRpc("set_text", { nodeId: titleNode.result.id, content: s.title });
    await sendRpc("modify", { nodeId: titleNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0, g: 0.176, b: 0.384 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });
  }

  // 4. MÀN HÌNH 1 - ĐĂNG KÝ & FACE ID (x: 20, y: 175)
  const phone1 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Screen 1 - Registration & Face ID",
    x: 20,
    y: 175,
    width: 175,
    height: 350,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }],
    strokeWeight: 3,
    cornerRadius: 26
  });
  const p1Id = phone1.result.id;

  // Notch
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 57, y: 8, width: 60, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });

  // Logo P
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 75, y: 22, width: 24, height: 24, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 5 });
  const p1Node = await sendRpc("create", { type: "TEXT", parentId: p1Id, x: 81, y: 25, fontSize: 15 });
  await sendRpc("set_text", { nodeId: p1Node.result.id, content: "P" });
  await sendRpc("modify", { nodeId: p1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const b1Node = await sendRpc("create", { type: "TEXT", parentId: p1Id, x: 48, y: 50, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: b1Node.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: b1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const s1Node = await sendRpc("create", { type: "TEXT", parentId: p1Id, x: 50, y: 64, fontSize: 9 });
  await sendRpc("set_text", { nodeId: s1Node.result.id, content: "Đăng ký tài khoản" });
  await sendRpc("modify", { nodeId: s1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold" } });

  // Inputs
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 15, y: 82, width: 145, height: 24, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 12 });
  const i1Node = await sendRpc("create", { type: "TEXT", parentId: p1Id, x: 25, y: 87, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: i1Node.result.id, content: "Số điện thoại" });
  await sendRpc("modify", { nodeId: i1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.58, g: 0.64, b: 0.72 } }] } });

  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 15, y: 112, width: 145, height: 24, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 12 });
  const i2Node = await sendRpc("create", { type: "TEXT", parentId: p1Id, x: 25, y: 117, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: i2Node.result.id, content: "Mật khẩu" });
  await sendRpc("modify", { nodeId: i2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.58, g: 0.64, b: 0.72 } }] } });

  // Button Đăng ký
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 15, y: 142, width: 145, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  const bt1Node = await sendRpc("create", { type: "TEXT", parentId: p1Id, x: 65, y: 148, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: bt1Node.result.id, content: "Đăng ký" });
  await sendRpc("modify", { nodeId: bt1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // Face Scan Box
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 47, y: 180, width: 80, height: 80, fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "ELLIPSE", parentId: p1Id, x: 57, y: 190, width: 60, height: 60, fills: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }] });

  // Green Brackets
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 42, y: 175, width: 12, height: 2.5, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 42, y: 175, width: 2.5, height: 12, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 120, y: 175, width: 12, height: 2.5, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 130, y: 175, width: 2.5, height: 12, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 42, y: 263, width: 12, height: 2.5, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 42, y: 253, width: 2.5, height: 12, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 120, y: 263, width: 12, height: 2.5, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p1Id, x: 130, y: 253, width: 2.5, height: 12, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }] });

  // Status Badge
  const st1Node = await sendRpc("create", { type: "TEXT", parentId: p1Id, x: 12, y: 270, width: 150, fontSize: 8 });
  await sendRpc("set_text", { nodeId: st1Node.result.id, content: "✓ Xác thực sinh trắc học (thành công)" });
  await sendRpc("modify", { nodeId: st1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  // Caption 1
  const cap1 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 15, y: 535, width: 185, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: cap1.result.id, content: "KH đăng ký tài khoản và thực hiện xác thực sinh trắc học (Face ID)" });
  await sendRpc("modify", { nodeId: cap1.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // 5. BƯỚC 2 - ĐÁM MÂY LƯU TRỮ SINH TRẮC HỌC (x: 215, y: 215)
  await sendRpc("create", { type: "ELLIPSE", parentId: parentId, x: 215, y: 215, width: 160, height: 120, fills: [{ type: "SOLID", color: { r: 0.882, g: 0.937, b: 0.996 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: parentId, x: 250, y: 245, width: 90, height: 22, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: parentId, x: 250, y: 272, width: 90, height: 22, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });

  // Padlock Badge
  await sendRpc("create", { type: "ELLIPSE", parentId: parentId, x: 280, y: 282, width: 30, height: 30, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], strokes: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokeWeight: 2 });
  const lockIcon2 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 288, y: 289, fontSize: 13 });
  await sendRpc("set_text", { nodeId: lockIcon2.result.id, content: "🔒" });

  const c2Node = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 200, y: 345, width: 190, fontSize: 10 });
  await sendRpc("set_text", { nodeId: c2Node.result.id, content: "Hệ thống lưu trữ sinh trắc học\n(được mã hóa)" });
  await sendRpc("modify", { nodeId: c2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  const cap2 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 200, y: 535, width: 190, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: cap2.result.id, content: "Hệ thống Petrolimex 2.0 lưu trữ dữ liệu sinh trắc học của KH an toàn, bảo mật" });
  await sendRpc("modify", { nodeId: cap2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // 6. MÀN HÌNH 2 - LIÊN KẾT THẺ (x: 400, y: 175)
  const phone2 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Screen 2 - Card Selection",
    x: 400,
    y: 175,
    width: 175,
    height: 350,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }],
    strokeWeight: 3,
    cornerRadius: 26
  });
  const p2Id = phone2.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 57, y: 8, width: 60, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });
  
  const scTitle2 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 55, y: 26, fontSize: 11 });
  await sendRpc("set_text", { nodeId: scTitle2.result.id, content: "Liên kết thẻ" });
  await sendRpc("modify", { nodeId: scTitle2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold" } });

  // Option 1
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 12, y: 48, width: 150, height: 42, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 20, y: 56, width: 20, height: 14, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 2 });
  const opt1Txt = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 46, y: 54, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: opt1Txt.result.id, content: "Thẻ nội địa\nNAPAS" });
  await sendRpc("modify", { nodeId: opt1Txt.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Option 2
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 12, y: 98, width: 150, height: 42, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 20, y: 106, width: 20, height: 14, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 2 });
  const opt2Txt = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 46, y: 104, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: opt2Txt.result.id, content: "Thẻ quốc tế\nVISA / Mastercard..." });
  await sendRpc("modify", { nodeId: opt2Txt.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Button Tiếp tục
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 305, width: 145, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  const bt2Node = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 65, y: 311, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: bt2Node.result.id, content: "Tiếp tục" });
  await sendRpc("modify", { nodeId: bt2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // Caption 3
  const cap3 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 395, y: 535, width: 185, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: cap3.result.id, content: "KH chọn và nhập thông tin thẻ nội địa hoặc thẻ quốc tế để liên kết token thanh toán" });
  await sendRpc("modify", { nodeId: cap3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // 7. BƯỚC 4 - PETROLIMEX GATEWAY CARD (x: 585, y: 215)
  const petroCard = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Petrolimex Gateway Container",
    x: 585,
    y: 215,
    width: 175,
    height: 180,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }],
    cornerRadius: 10
  });
  const pc4Id = petroCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: pc4Id, x: 30, y: 12, width: 115, height: 34, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pc4Id, x: 38, y: 18, width: 20, height: 20, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 4 });
  const p4Node = await sendRpc("create", { type: "TEXT", parentId: pc4Id, x: 44, y: 21, fontSize: 13 });
  await sendRpc("set_text", { nodeId: p4Node.result.id, content: "P" });
  await sendRpc("modify", { nodeId: p4Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const b4Node = await sendRpc("create", { type: "TEXT", parentId: pc4Id, x: 62, y: 23, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: b4Node.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: b4Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const f1Node = await sendRpc("create", { type: "TEXT", parentId: pc4Id, x: 12, y: 60, width: 150, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: f1Node.result.id, content: "⚙️ Gửi yêu cầu liên kết token đến CTT Epay (qua API bảo mật)" });
  await sendRpc("modify", { nodeId: f1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  const f2Node = await sendRpc("create", { type: "TEXT", parentId: pc4Id, x: 12, y: 120, width: 150, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: f2Node.result.id, content: "🛡️ Xác thực & truyền dữ liệu an toàn" });
  await sendRpc("modify", { nodeId: f2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // 8. BƯỚC 5 - CTT EPAY BOX (x: 775, y: 215)
  const epayCard5 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "CTT Epay Container",
    x: 775,
    y: 215,
    width: 165,
    height: 180,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    cornerRadius: 10
  });
  const ep5Id = epayCard5.result.id;

  const epLogo5 = await sendRpc("create", { type: "TEXT", parentId: ep5Id, x: 42, y: 15, fontSize: 18 });
  await sendRpc("set_text", { nodeId: epLogo5.result.id, content: "⚛️ epay" });
  await sendRpc("modify", { nodeId: epLogo5.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "ELLIPSE", parentId: ep5Id, x: 68, y: 55, width: 30, height: 30, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }] });
  const sh5Icon = await sendRpc("create", { type: "TEXT", parentId: ep5Id, x: 76, y: 62, fontSize: 13 });
  await sendRpc("set_text", { nodeId: sh5Icon.result.id, content: "🛡️" });

  const lab5Node = await sendRpc("create", { type: "TEXT", parentId: ep5Id, x: 10, y: 92, width: 145, fontSize: 9 });
  await sendRpc("set_text", { nodeId: lab5Node.result.id, content: "Xử lý liên kết và tạo token" });
  await sendRpc("modify", { nodeId: lab5Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  // Token Card
  await sendRpc("create", { type: "RECTANGLE", parentId: ep5Id, x: 38, y: 125, width: 90, height: 34, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.314, b: 0.635 } }], cornerRadius: 6 });
  const t5Node = await sendRpc("create", { type: "TEXT", parentId: ep5Id, x: 65, y: 129, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: t5Node.result.id, content: "TOKEN" });
  await sendRpc("modify", { nodeId: t5Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  const tv5Node = await sendRpc("create", { type: "TEXT", parentId: ep5Id, x: 52, y: 140, fontSize: 11 });
  await sendRpc("set_text", { nodeId: tv5Node.result.id, content: "********" });
  await sendRpc("modify", { nodeId: tv5Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const cap5 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 765, y: 535, width: 185, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: cap5.result.id, content: "CTT Epay xác thực thông tin, xử lý và trả về token liên kết tương ứng" });
  await sendRpc("modify", { nodeId: cap5.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // 9. MÀN HÌNH 3 - CÀI ĐẶT NGUỒN TIỀN FACEPAY (x: 955, y: 175)
  const phone3 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Screen 3 - FacePay Settings",
    x: 955,
    y: 175,
    width: 175,
    height: 350,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }],
    strokeWeight: 3,
    cornerRadius: 26
  });
  const p3Id = phone3.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 57, y: 8, width: 60, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });

  const scTitle3 = await sendRpc("create", { type: "TEXT", parentId: p3Id, x: 15, y: 26, width: 145, fontSize: 9 });
  await sendRpc("set_text", { nodeId: scTitle3.result.id, content: "Nguồn tiền thanh toán (FacePay)" });
  await sendRpc("modify", { nodeId: scTitle3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 12, y: 48, width: 150, height: 28, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 6 });
  const visaNode = await sendRpc("create", { type: "TEXT", parentId: p3Id, x: 20, y: 55, fontSize: 10 });
  await sendRpc("set_text", { nodeId: visaNode.result.id, content: "VISA                  •••• 1234" });
  await sendRpc("modify", { nodeId: visaNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const bioSubNode = await sendRpc("create", { type: "TEXT", parentId: p3Id, x: 12, y: 86, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: bioSubNode.result.id, content: "Thanh toán bằng tính trắc học" });
  await sendRpc("modify", { nodeId: bioSubNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.231 } }], fontWeight: "Bold" } });

  // Toggle Switch Green ON
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 130, y: 104, width: 30, height: 16, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], cornerRadius: 10 });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 145, y: 106, width: 12, height: 12, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });

  // Button Hoàn tất
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 15, y: 305, width: 145, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  const bt3Node = await sendRpc("create", { type: "TEXT", parentId: p3Id, x: 65, y: 311, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: bt3Node.result.id, content: "Hoàn tất" });
  await sendRpc("modify", { nodeId: bt3Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  const cap6 = await sendRpc("create", { type: "TEXT", parentId: parentId, x: 950, y: 535, width: 185, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: cap6.result.id, content: "KH chọn thẻ đã liên kết làm nguồn tiền mặc định và bật thanh toán sinh trắc học (FacePay)" });
  await sendRpc("modify", { nodeId: cap6.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], textAlignHorizontal: "CENTER" } });

  // 10. BƯỚC 7 - LƯU TRỮ RÀNG BUỘC & TÍNH BẢO MẬT (x: 1140, y: 215)
  // Dashed Box
  const dashed7 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Dashed Binding Box",
    x: 1140,
    y: 215,
    width: 200,
    height: 120,
    fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }],
    strokeWeight: 1.5,
    cornerRadius: 8
  });
  const d7Id = dashed7.result.id;

  const d1Txt = await sendRpc("create", { type: "TEXT", parentId: d7Id, x: 10, y: 15, width: 180, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: d1Txt.result.id, content: "😊 Dữ liệu sinh trắc học (đã mã hóa)" });
  await sendRpc("modify", { nodeId: d1Txt.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  const plus7 = await sendRpc("create", { type: "TEXT", parentId: d7Id, x: 92, y: 42, fontSize: 14 });
  await sendRpc("set_text", { nodeId: plus7.result.id, content: "+" });
  await sendRpc("modify", { nodeId: plus7.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: d7Id, x: 55, y: 65, width: 90, height: 30, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.314, b: 0.635 } }], cornerRadius: 6 });
  const t7Txt = await sendRpc("create", { type: "TEXT", parentId: d7Id, x: 80, y: 68, fontSize: 8 });
  await sendRpc("set_text", { nodeId: t7Txt.result.id, content: "TOKEN" });
  await sendRpc("modify", { nodeId: t7Txt.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  const tv7Txt = await sendRpc("create", { type: "TEXT", parentId: d7Id, x: 68, y: 78, fontSize: 10 });
  await sendRpc("set_text", { nodeId: tv7Txt.result.id, content: "********" });
  await sendRpc("modify", { nodeId: tv7Txt.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Lock Storage Card
  const lockCard7 = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Lock Storage Box",
    x: 1140,
    y: 350,
    width: 200,
    height: 75,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }],
    cornerRadius: 8
  });
  const l7Id = lockCard7.result.id;

  const lockTxt7 = await sendRpc("create", { type: "TEXT", parentId: l7Id, x: 12, y: 15, width: 175, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: lockTxt7.result.id, content: "🔒 Lưu trữ an toàn, bảo mật theo chuẩn bảo mật của Petrolimex" });
  await sendRpc("modify", { nodeId: lockTxt7.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // 11. FOOTER CAPSULE BANNER (Dưới cùng)
  const footCapsule = await sendRpc("create", {
    type: "FRAME",
    parentId: parentId,
    name: "Footer Security Banner",
    x: 100,
    y: 595,
    width: 1160,
    height: 42,
    fills: [{ type: "SOLID", color: { r: 0.91, g: 0.945, b: 0.976 } }],
    strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }],
    cornerRadius: 21
  });
  const fcId = footCapsule.result.id;

  const fTxtNode = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 150, y: 13, fontSize: 11.5 });
  await sendRpc("set_text", { nodeId: fTxtNode.result.id, content: "🛡️  Bảo mật – An toàn – Tuân thủ quy định của Ngân hàng Nhà nước và các tiêu chuẩn bảo mật quốc tế" });
  await sendRpc("modify", { nodeId: fTxtNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Zoom to view master frame
  await sendRpc("zoom_to_fit", { nodeId: parentId });

  console.log("🎉 ĐÃ VẼ XONG 1 FRAME DUY NHẤT 'LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0' LÊN FIGMA!");
}

drawRegistrationFlowMaster();
