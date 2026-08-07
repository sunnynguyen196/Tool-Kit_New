import http from 'node:http';

const token = "0b59d21459c20766e68e805a20caf5aa1d31d9c55174b902";

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

function hexColor(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [{ type: "SOLID", color: { r, g, b } }];
}

async function createText(parentId, name, textContent, x, y, options = {}) {
  const res = await sendRpc("create", {
    type: "TEXT",
    parentId: parentId,
    name: name,
    x: x,
    y: y,
    fontSize: options.fontSize || 12
  });

  if (res && res.result && res.result.id) {
    await sendRpc("set_text", {
      nodeId: res.result.id,
      text: textContent
    });
    if (options.fill) {
      await sendRpc("modify", {
        nodeId: res.result.id,
        fills: hexColor(options.fill)
      });
    }
  }
  return res;
}

async function drawCreateDisputeScreen() {
  console.log("🚀 Bắt đầu vẽ Màn hình 2: Tạo mới Yêu cầu tra soát (create-dispute-screen)...");

  // Dọn dẹp frame cũ nếu có
  try {
    const searchRes = await sendRpc("search_nodes", { name: "Tạo mới yêu cầu tra soát" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // 1. Frame tổng (1440 x 960) tại x = 3000
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Tạo mới yêu cầu tra soát",
    x: 3000,
    y: 0,
    width: 1440,
    height: 960,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  if (!mainCanvas || !mainCanvas.result || !mainCanvas.result.id) {
    console.error("❌ Lỗi tạo Main Canvas:", mainCanvas);
    return;
  }
  const mainId = mainCanvas.result.id;

  // 2. Sidebar (220 x 960)
  const sidebar = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Sidebar",
    x: 0,
    y: 0,
    width: 220,
    height: 960,
    fills: hexColor('#3B82F6')
  });
  const sidebarId = sidebar.result.id;

  await sendRpc("create", {
    type: "ELLIPSE",
    parentId: sidebarId,
    name: "Logo Circle",
    x: 20,
    y: 45,
    width: 32,
    height: 32,
    fills: hexColor('#FFFFFF')
  });

  await createText(sidebarId, "Logo Letter", "e", 30, 49, { fontSize: 18, fill: "#3B82F6" });
  await createText(sidebarId, "Brand Name", "epay Portal", 60, 50, { fontSize: 18, fill: "#FFFFFF" });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sidebarId,
    name: "Divider Line",
    x: 20,
    y: 90,
    width: 180,
    height: 1,
    fills: hexColor('#60A5FA')
  });

  const topMenuItems = [
    { text: "🏠  Trang chủ", y: 130 },
    { text: "⇆  Quản lý giao dịch", y: 175 },
    { text: "🔑  Quản lý Token", y: 220 },
    { text: "📊  Báo cáo thống kê", y: 265 },
    { text: "🏢  Quản lý ĐVCNTT", y: 310 },
    { text: "👥  Quản lý người dùng nội bộ", y: 355 },
    { text: "⚠️  Quản lý rủi ro", y: 400 }
  ];

  for (const item of topMenuItems) {
    await createText(sidebarId, item.text, item.text, 24, item.y, { fontSize: 12, fill: "#FFFFFF" });
  }

  await createText(sidebarId, "Parent Menu Text", "💬  Quản lý tra soát", 24, 445, { fontSize: 12.5, fill: "#FFFFFF" });
  await createText(sidebarId, "Parent Menu Arrow", "▲", 190, 446, { fontSize: 10, fill: "#FFFFFF" });

  const submenuContainer = await sendRpc("create", {
    type: "FRAME",
    parentId: sidebarId,
    name: "Submenu Container",
    x: 8,
    y: 470,
    width: 204,
    height: 76,
    fills: hexColor('#2563EB'),
    cornerRadius: 8
  });
  const subId = submenuContainer.result.id;

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: subId,
    name: "Sub 1 Active Pill",
    x: 4,
    y: 6,
    width: 196,
    height: 32,
    fills: hexColor('#FFFFFF'),
    cornerRadius: 16
  });

  await createText(subId, "Sub 1 Text", "☕  Tra soát đã gửi", 20, 14, { fontSize: 12, fill: "#3B82F6" });
  await createText(subId, "Sub 2 Text", "📥  Tra soát đã nhận", 20, 48, { fontSize: 12, fill: "#FFFFFF" });

  await createText(sidebarId, "Service Info Menu", "ⓘ  Thông tin dịch vụ", 24, 565, { fontSize: 12, fill: "#FFFFFF" });


  // 3. Topbar
  const topbar = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Topbar",
    x: 220,
    y: 0,
    width: 1220,
    height: 64,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#E2E8F0'),
    strokeWeight: 1
  });
  const topbarId = topbar.result.id;

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: topbarId,
    name: "Search Input Box",
    x: 26,
    y: 16,
    width: 300,
    height: 32,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 16
  });

  await createText(topbarId, "Search Placeholder", "🔍  Tìm kiếm hệ thống...", 42, 23, { fontSize: 11.5, fill: "#94A3B8" });

  await createText(topbarId, "Help Text", "❓  Trợ giúp", 770, 24, { fontSize: 12, fill: "#EF4444" });
  await createText(topbarId, "Bell Icon", "🔔", 860, 23, { fontSize: 14 });
  await createText(topbarId, "Gear Icon", "⚙", 896, 23, { fontSize: 14, fill: "#64748B" });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: topbarId,
    name: "Vertical Red Line",
    x: 930,
    y: 16,
    width: 1.5,
    height: 32,
    fills: hexColor('#EF4444')
  });

  await sendRpc("create", {
    type: "ELLIPSE",
    parentId: topbarId,
    name: "Avatar Circle",
    x: 950,
    y: 16,
    width: 32,
    height: 32,
    fills: hexColor('#EF4444')
  });

  await createText(topbarId, "Avatar Initial", "L", 961, 23, { fontSize: 13, fill: "#FFFFFF" });
  await createText(topbarId, "User Account Name", "Lisa (epay Portal)  ▼", 994, 24, { fontSize: 12.5, fill: "#0F172A" });


  // 4. Breadcrumb & Title (Chuẩn không có nút Quay lại & dòng chữ lưu ý màu đỏ)
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã gửi > Tạo mới YCTS", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Tạo mới yêu cầu tra soát", 246, 108, { fontSize: 22, fill: "#0F172A" });


  // 5. SECTION 1: THÔNG TIN YÊU CẦU (Card Block)
  const sec1Card = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Section 1 - Thông tin yêu cầu",
    x: 246,
    y: 150,
    width: 1174,
    height: 290,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });
  const sec1Id = sec1Card.result.id;

  // Header Bar Section 1
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Section 1 Header BG",
    x: 1,
    y: 1,
    width: 1172,
    height: 38,
    fills: hexColor('#F1F5F9')
  });

  await createText(sec1Id, "Section 1 Header Title", "Thông tin yêu cầu", 16, 12, { fontSize: 13, fill: "#1E293B" });
  await createText(sec1Id, "Section 1 Toggle Arrow", "∧", 1145, 12, { fontSize: 13, fill: "#475569" });

  // ROW 1: Yêu cầu (*) [Col 1] & Mô tả tình huống (*) [Col 2]
  // Col 1: Yêu cầu (*)
  await createText(sec1Id, "Yêu cầu Label", "Yêu cầu (*)", 20, 54, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Yêu cầu Input Box",
    x: 20,
    y: 72,
    width: 540,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec1Id, "Yêu cầu Input Value", "Yêu cầu xử lý tạo mới giao dịch", 32, 82, { fontSize: 11.5, fill: "#0F172A" });

  // Col 2: Mô tả tình huống (*)
  await createText(sec1Id, "Mô tả Label", "Mô tả tình huống (*)", 600, 54, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Mô tả Textarea Box",
    x: 600,
    y: 72,
    width: 554,
    height: 54,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec1Id, "Mô tả Value Line 1", "QRGW ghi nhận thao dịch thanh toán thành công, NAPAS ghi nhận", 612, 80, { fontSize: 11, fill: "#0F172A" });
  await createText(sec1Id, "Mô tả Value Line 2", "giao dịch chờ xử lý (PNDG). Yêu cầu NAPAS cập nhật trạng thái GD thành công.", 612, 98, { fontSize: 11, fill: "#0F172A" });

  // ROW 2: Đối soát viên (*) [Col 1] & Kỹ thuật viên [Col 2]
  // Col 1: Đối soát viên (*)
  await createText(sec1Id, "Đối soát viên Label", "Đối soát viên (*)", 20, 134, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Đối soát viên Multi-select Box",
    x: 20,
    y: 152,
    width: 540,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });

  // Tag 1: nhannt
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Tag nhannt Box",
    x: 28,
    y: 158,
    width: 65,
    height: 24,
    fills: hexColor('#93C5FD'),
    cornerRadius: 4
  });
  await createText(sec1Id, "Tag nhannt Text", "nhannt", 36, 163, { fontSize: 11, fill: "#1E3A8A" });

  // Tag 2: mennt ✕
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Tag mennt Box",
    x: 100,
    y: 158,
    width: 75,
    height: 24,
    fills: hexColor('#BFDBFE'),
    cornerRadius: 4
  });
  await createText(sec1Id, "Tag mennt Text", "mennt ✕", 108, 163, { fontSize: 11, fill: "#1E40AF" });
  await createText(sec1Id, "Đối soát Arrow", "∨", 540, 163, { fontSize: 10, fill: "#64748B" });

  // Col 2: Kỹ thuật viên
  await createText(sec1Id, "Kỹ thuật viên Label", "Kỹ thuật viên", 600, 134, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Kỹ thuật viên Select Box",
    x: 600,
    y: 152,
    width: 554,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec1Id, "Kỹ thuật viên Value", "inspector01 (Kỹ thuật viên 1)", 612, 162, { fontSize: 11.5, fill: "#0F172A" });
  await createText(sec1Id, "Kỹ thuật viên Arrow", "▼", 1134, 163, { fontSize: 10, fill: "#64748B" });

  // ROW 3: Kế toán viên [Col 1] & Lãnh đạo (*) [Col 2]
  // Col 1: Kế toán viên
  await createText(sec1Id, "Kế toán viên Label", "Kế toán viên", 20, 204, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Kế toán viên Select Box",
    x: 20,
    y: 222,
    width: 540,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec1Id, "Kế toán viên Value", "accountant01 (Kế toán viên 1)", 32, 232, { fontSize: 11.5, fill: "#0F172A" });
  await createText(sec1Id, "Kế toán viên Arrow", "▼", 540, 233, { fontSize: 10, fill: "#64748B" });

  // Col 2: Lãnh đạo (*)
  await createText(sec1Id, "Lãnh đạo Label", "Lãnh đạo (*)", 600, 204, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec1Id,
    name: "Lãnh đạo Select Box",
    x: 600,
    y: 222,
    width: 554,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec1Id, "Lãnh đạo Value", "tuandt (Lãnh đạo đối soát)", 612, 232, { fontSize: 11.5, fill: "#0F172A" });
  await createText(sec1Id, "Lãnh đạo Arrow", "▼", 1134, 233, { fontSize: 10, fill: "#64748B" });


  // 6. SECTION 2: THÔNG TIN GIAO DỊCH (Card Block)
  const sec2Card = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Section 2 - Thông tin giao dịch",
    x: 246,
    y: 460,
    width: 1174,
    height: 280,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });
  const sec2Id = sec2Card.result.id;

  // Header Bar Section 2
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec2Id,
    name: "Section 2 Header BG",
    x: 1,
    y: 1,
    width: 1172,
    height: 38,
    fills: hexColor('#F1F5F9')
  });

  await createText(sec2Id, "Section 2 Header Title", "Thông tin giao dịch", 16, 12, { fontSize: 13, fill: "#1E293B" });
  await createText(sec2Id, "Section 2 Toggle Arrow", "∧", 1145, 12, { fontSize: 13, fill: "#475569" });

  // ROW 1: Mã giao dịch (*) + Nút Tìm kiếm mã giao dịch
  await createText(sec2Id, "Mã giao dịch Label", "Mã giao dịch (*)", 20, 54, { fontSize: 11, fill: "#334155" });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec2Id,
    name: "Mã giao dịch Input Box",
    x: 20,
    y: 72,
    width: 320,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });

  await createText(sec2Id, "Mã giao dịch Input Value", "TX-10005", 32, 82, { fontSize: 12, fill: "#2563EB" });

  // Nút [🔍 Tìm kiếm mã giao dịch]
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec2Id,
    name: "Search Tx Button Box",
    x: 350,
    y: 72,
    width: 210,
    height: 36,
    fills: hexColor('#2563EB'),
    cornerRadius: 4
  });

  await createText(sec2Id, "Search Tx Button Text", "🔍  Tìm kiếm mã giao dịch", 365, 82, { fontSize: 11.5, fill: "#FFFFFF" });


  // ROW 2: Merchant code [Col 1] & Đối tác thanh toán [Col 2]
  await createText(sec2Id, "Merchant code Label", "Merchant code", 20, 124, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec2Id,
    name: "Merchant code Box",
    x: 20,
    y: 142,
    width: 540,
    height: 36,
    fills: hexColor('#F1F5F9'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec2Id, "Merchant code Value", "PAYME_MERCHANT", 32, 152, { fontSize: 11.5, fill: "#475569" });

  await createText(sec2Id, "Đối tác thanh toán Label", "Đối tác thanh toán", 600, 124, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec2Id,
    name: "Đối tác thanh toán Box",
    x: 600,
    y: 142,
    width: 554,
    height: 36,
    fills: hexColor('#F1F5F9'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec2Id, "Đối tác thanh toán Value", "Napas", 612, 152, { fontSize: 11.5, fill: "#475569" });


  // ROW 3: Số tiền giao dịch [Col 1], Tên dịch vụ [Col 2], Thời gian giao dịch (*) [Col 3]
  await createText(sec2Id, "Số tiền Label", "Số tiền giao dịch", 20, 194, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec2Id,
    name: "Số tiền Box",
    x: 20,
    y: 212,
    width: 350,
    height: 36,
    fills: hexColor('#F1F5F9'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec2Id, "Số tiền Value", "600,000 VND", 32, 222, { fontSize: 11.5, fill: "#0F172A" });

  await createText(sec2Id, "Tên dịch vụ Label", "Tên dịch vụ", 400, 194, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec2Id,
    name: "Tên dịch vụ Box",
    x: 400,
    y: 212,
    width: 360,
    height: 36,
    fills: hexColor('#F1F5F9'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec2Id, "Tên dịch vụ Value", "Thanh toán VietQR", 412, 222, { fontSize: 11.5, fill: "#475569" });

  await createText(sec2Id, "Thời gian GD Label", "Thời gian giao dịch (*)", 790, 194, { fontSize: 11, fill: "#334155" });
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: sec2Id,
    name: "Thời gian GD Box",
    x: 790,
    y: 212,
    width: 364,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(sec2Id, "Thời gian GD Value", "24/03/2024 09:00:04", 802, 222, { fontSize: 11.5, fill: "#0F172A" });


  // 7. ACTION FOOTER BUTTONS ([Hủy] & [Tạo mới])
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: mainId,
    name: "Cancel Button Box",
    x: 710,
    y: 765,
    width: 120,
    height: 38,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });

  await createText(mainId, "Cancel Button Text", "Hủy", 758, 776, { fontSize: 12, fill: "#334155" });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: mainId,
    name: "Submit Button Box",
    x: 846,
    y: 765,
    width: 120,
    height: 38,
    fills: hexColor('#3B82F6'),
    cornerRadius: 6
  });

  await createText(mainId, "Submit Button Text", "Tạo mới", 886, 776, { fontSize: 12, fill: "#FFFFFF" });

  console.log("🎉 ĐÃ VẼ HOÀN TẤT MÀN HÌNH 2: TẠO MỚI YÊU CẦU TRA SOÁT CHUẨN DESIGN SYSTEM!");
}

drawCreateDisputeScreen().catch(console.error);
