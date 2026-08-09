import http from 'node:http';

const token = "bda4982e0ad92e5c69d71b519af0b543e8edd97d3072380a";

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

function hexColor(hex, opacity = 1) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [{ type: "SOLID", color: { r, g, b }, opacity: opacity }];
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
        fills: hexColor(options.fill, options.opacity || 1)
      });
    }
  }
  return res;
}

// Hàm hỗ trợ vẽ nhãn trái & giá trị căn phải chuẩn 100% Split Grid Layout
async function createSplitGridRow(parentId, labelText, valueText, leftX, rightX, y, options = {}) {
  // 1. Nhãn nằm căn lề trái
  await createText(parentId, `${labelText} Label`, labelText, leftX, y, { fontSize: 11, fill: "#64748B" });

  // 2. Giá trị căn lề phải (right-aligned về rightX)
  const fontSize = options.fontSize || 11;
  const approxWidth = Math.ceil(valueText.length * (fontSize * 0.62));
  const valX = rightX - approxWidth;

  await createText(parentId, `${labelText} Value`, valueText, valX, y, {
    fontSize: fontSize,
    fill: options.valColor || "#0F172A"
  });
}

// Hàm hỗ trợ vẽ badge căn phải chuẩn
async function createRightAlignedBadge(parentId, labelText, badgeText, leftX, rightX, y, bgHex, textHex, badgeWidth) {
  await createText(parentId, `${labelText} Label`, labelText, leftX, y, { fontSize: 11, fill: "#64748B" });

  const badgeX = rightX - badgeWidth;
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: parentId,
    name: `${labelText} Badge Box`,
    x: badgeX,
    y: y - 2,
    width: badgeWidth,
    height: 22,
    fills: hexColor(bgHex),
    cornerRadius: 4
  });

  const approxTextW = Math.ceil(badgeText.length * 6.5);
  const textX = badgeX + Math.floor((badgeWidth - approxTextW) / 2);
  await createText(parentId, `${labelText} Badge Text`, badgeText, textX, y + 2, {
    fontSize: 10.5,
    fill: textHex
  });
}

async function drawDetailTS001() {
  console.log("🚀 Bắt đầu vẽ lại Màn hình Chi tiết TS-001: Căn phải nội dung chuẩn 100% Split Grid Wireframe...");

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Chi tiết YCTS TS-001 (Chờ phê duyệt)" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // 1. Main Canvas tại x = 9000 (1440 x 1120)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Chi tiết YCTS TS-001 (Chờ phê duyệt)",
    x: 9000,
    y: 0,
    width: 1440,
    height: 1120,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  if (!mainCanvas || !mainCanvas.result || !mainCanvas.result.id) {
    console.error("❌ Lỗi tạo Main Canvas:", mainCanvas);
    return;
  }
  const mainId = mainCanvas.result.id;

  // 2. Sidebar (220 x 1120)
  const sidebar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Sidebar", x: 0, y: 0, width: 220, height: 1120, fills: hexColor('#3B82F6')
  });
  const sidebarId = sidebar.result.id;

  await sendRpc("create", { type: "ELLIPSE", parentId: sidebarId, name: "Logo Circle", x: 20, y: 45, width: 32, height: 32, fills: hexColor('#FFFFFF') });
  await createText(sidebarId, "Logo Letter", "e", 30, 49, { fontSize: 18, fill: "#3B82F6" });
  await createText(sidebarId, "Brand Name", "epay Portal", 60, 50, { fontSize: 18, fill: "#FFFFFF" });
  await sendRpc("create", { type: "RECTANGLE", parentId: sidebarId, name: "Divider Line", x: 20, y: 90, width: 180, height: 1, fills: hexColor('#60A5FA') });

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
    type: "FRAME", parentId: sidebarId, name: "Submenu Container", x: 8, y: 470, width: 204, height: 76, fills: hexColor('#2563EB'), cornerRadius: 8
  });
  const subId = submenuContainer.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: subId, name: "Sub 1 Active Pill", x: 4, y: 6, width: 196, height: 32, fills: hexColor('#FFFFFF'), cornerRadius: 16 });
  await createText(subId, "Sub 1 Text", "☕  Tra soát đã gửi", 20, 14, { fontSize: 12, fill: "#3B82F6" });
  await createText(subId, "Sub 2 Text", "📥  Tra soát đã nhận", 20, 48, { fontSize: 12, fill: "#FFFFFF" });

  // 3. Topbar
  const topbar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Topbar", x: 220, y: 0, width: 1220, height: 64, fills: hexColor('#FFFFFF'), strokes: hexColor('#E2E8F0')
  });
  const topbarId = topbar.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: topbarId, name: "Search Input Box", x: 26, y: 16, width: 300, height: 32, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 16 });
  await createText(topbarId, "Search Placeholder", "🔍  Tìm kiếm hệ thống...", 42, 23, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(topbarId, "Help Text", "❓  Trợ giúp", 770, 24, { fontSize: 12, fill: "#EF4444" });
  await createText(topbarId, "Bell Icon", "🔔", 860, 23, { fontSize: 14 });
  await createText(topbarId, "Gear Icon", "⚙", 896, 23, { fontSize: 14, fill: "#64748B" });
  await sendRpc("create", { type: "RECTANGLE", parentId: topbarId, name: "Vertical Red Line", x: 930, y: 16, width: 1.5, height: 32, fills: hexColor('#EF4444') });
  await sendRpc("create", { type: "ELLIPSE", parentId: topbarId, name: "Avatar Circle", x: 950, y: 16, width: 32, height: 32, fills: hexColor('#EF4444') });
  await createText(topbarId, "Avatar Initial", "L", 961, 23, { fontSize: 13, fill: "#FFFFFF" });
  await createText(topbarId, "User Account Name", "Lisa (epay Portal)  ▼", 994, 24, { fontSize: 12.5, fill: "#0F172A" });

  // 4. Breadcrumb
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã gửi > Chi tiết yêu cầu tra soát : TS-001", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Chi tiết yêu cầu tra soát TS-001", 246, 108, { fontSize: 22, fill: "#0F172A" });


  // 5. KHỐI 1: BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT (BƯỚC 3: CHỜ PHÊ DUYỆT ACTIVE)
  const stepCard = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Khối 1 - Tiến trình xử lý",
    x: 246,
    y: 150,
    width: 1174,
    height: 95,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });
  const stepId = stepCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor('#EFF6FF'), cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor('#2563EB') });

  await createText(stepId, "Banner Left Text", "📊 BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT — TRẠNG THÁI: Chờ phê duyệt", 28, 18, { fontSize: 11.5, fill: "#2563EB" });
  await createText(stepId, "Banner Right Code", "(TS-001)", 1100, 18, { fontSize: 11, fill: "#2563EB" });

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 80, y: 56, width: 1014, height: 3, fills: hexColor('#CBD5E1') });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line Done", x: 80, y: 56, width: 338, height: 3, fills: hexColor('#2563EB') });

  const stepsList = [
    { num: "1", text: "Chờ xử lý", done: true },
    { num: "2", text: "Đã kiểm tra", done: true },
    { num: "3", text: "Chờ phê duyệt", active: true },
    { num: "4", text: "Đã duyệt", active: false },
    { num: "5", text: "Chờ phản hồi", active: false },
    { num: "6", text: "Đã phản hồi", active: false },
    { num: "7", text: "Hoàn tất", active: false }
  ];

  for (let i = 0; i < stepsList.length; i++) {
    const s = stepsList[i];
    const cx = 80 + i * 169;

    let circleBg = '#F1F5F9';
    let circleBorder = '#CBD5E1';
    let numColor = '#94A3B8';
    let textColor = '#94A3B8';

    if (s.done || s.active) {
      circleBg = '#2563EB'; circleBorder = '#2563EB'; numColor = '#FFFFFF'; textColor = '#2563EB';
    }

    await sendRpc("create", { type: "ELLIPSE", parentId: stepId, name: `Step Circle ${s.num}`, x: cx - 14, y: 44, width: 26, height: 26, fills: hexColor(circleBg), strokes: hexColor(circleBorder) });
    await createText(stepId, `Step Num ${s.num}`, s.num, cx - 4, 50, { fontSize: 11, fill: numColor });
    await createText(stepId, `Step Label ${s.num}`, s.text, cx - 28, 74, { fontSize: 9.5, fill: textColor });
  }


  // 6. KHỐI 2: THÔNG TIN GIAO DỊCH GỐC (TX-10001 - Split Grid Layout 3 Cột Căn Phải Giá Trị)
  const origTxCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 2 - Thông tin giao dịch gốc", x: 246, y: 260, width: 1174, height: 160, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const origId = origTxCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: origId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(origId, "Header Title", "THÔNG TIN GIAO DỊCH GỐC", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  // Tọa độ 3 cột:
  // Cột 0: leftX = 20, rightX = 370
  // Cột 1: leftX = 400, rightX = 750
  // Cột 2: leftX = 780, rightX = 1150
  await createSplitGridRow(origId, "Mã giao dịch:", "TX-10001", 20, 370, 46, { valColor: "#2563EB" });
  await createSplitGridRow(origId, "Trạng thái giao dịch:", "Thành công", 20, 370, 72, { valColor: "#16A34A" });
  await createSplitGridRow(origId, "Merchant code:", "PAYME_MERCHANT", 20, 370, 98);
  await createSplitGridRow(origId, "PTTT:", "VietQR", 20, 370, 124);

  await createSplitGridRow(origId, "Ngày giao dịch:", "27/07/2026 09:00:00", 400, 750, 46);
  await createSplitGridRow(origId, "Số tiền giao dịch:", "1,500,000 VND", 400, 750, 72, { valColor: "#0F172A" });
  await createSplitGridRow(origId, "Đối tác thanh toán:", "Napas", 400, 750, 98);
  await createSplitGridRow(origId, "Tên dịch vụ:", "Thanh toán VietQR", 400, 750, 124);

  await createSplitGridRow(origId, "Loại giao dịch:", "Thanh toán", 780, 1150, 46);
  await createSplitGridRow(origId, "Loại QR:", "Dynamic QR", 780, 1150, 72);
  await createSplitGridRow(origId, "Mã đơn hàng (Order ID):", "ORD-10001", 780, 1150, 98);
  await createSplitGridRow(origId, "Mã GD Epay:", "EPAYPW00339301", 780, 1150, 124);


  // 7. KHỐI 3: THÔNG TIN TRA SOÁT (Read-only Split Grid Layout 3 Cột Căn Phải Giá Trị)
  const disputeCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 3 - Thông tin tra soát", x: 246, y: 435, width: 1174, height: 220, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const dspId = disputeCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F1F5F9') });
  await createText(dspId, "Header Title", "Thông tin tra soát", 16, 10, { fontSize: 12.5, fill: "#1E293B" });
  await createText(dspId, "Header Arrow", "▲", 1145, 10, { fontSize: 12, fill: "#475569" });

  // Cột 0: leftX = 20, rightX = 370
  await createSplitGridRow(dspId, "Mã tra soát:", "TS-001", 20, 370, 48, { valColor: "#2563EB" });
  await createRightAlignedBadge(dspId, "Trạng thái YCTS:", "Chờ phê duyệt", 20, 370, 74, '#FEF9C3', '#854D0E', 110);
  await createSplitGridRow(dspId, "Lý do tra soát:", "BANK — Lỗi hệ thống ngân hàng", 20, 370, 100);
  await createSplitGridRow(dspId, "Thời gian tạo YCTS:", "27/07/2026 10:15:00", 20, 370, 126);

  // Cột 1: leftX = 400, rightX = 750
  await createSplitGridRow(dspId, "Vai trò tra soát:", "TCYCTS", 400, 750, 48);
  await createRightAlignedBadge(dspId, "Trạng thái hết hạn:", "Chưa hết hạn", 400, 750, 74, '#DCFCE7', '#166534', 98);
  await createSplitGridRow(dspId, "Số tiền tra soát:", "1,500,000 VND", 400, 750, 100, { valColor: "#2563EB" });
  await createSplitGridRow(dspId, "Thời gian xử lý YCTS:", "—", 400, 750, 126);

  // Cột 2: leftX = 780, rightX = 1150
  await createSplitGridRow(dspId, "Loại tra soát:", "RQRN — Hoàn tiền", 780, 1150, 48);
  await createRightAlignedBadge(dspId, "Trạng thái xử lý tại Epay:", "—", 780, 1150, 74, '#F1F5F9', '#94A3B8', 40);
  await createRightAlignedBadge(dspId, "Trạng thái xử lý tại đối tác:", "—", 780, 1150, 100, '#F1F5F9', '#94A3B8', 40);
  await createSplitGridRow(dspId, "File minh chứng đính kèm:", "minh_chung.pdf 📎", 780, 1150, 126, { valColor: "#2563EB" });

  // Dòng Nội dung đề nghị
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Line Separator", x: 20, y: 162, width: 1134, height: 1, fills: hexColor('#E2E8F0') });
  await createText(dspId, "Proposal Title", "Nội dung đề nghị tra soát:", 20, 175, { fontSize: 11, fill: "#64748B" });
  await createText(dspId, "Proposal Content", "Giao dịch bị lỗi phía Napas, đề nghị đối tác xử lý hoàn trả.", 180, 175, { fontSize: 11, fill: "#0F172A" });


  // 8. KHỐI 4: THÔNG TIN XÁC NHẬN PHÊ DUYỆT (RBAC - Căn Phải Giá Trị)
  const approvalCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin xác nhận phê duyệt (RBAC)", x: 246, y: 670, width: 1174, height: 220, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = approvalCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F1F5F9') });
  await createText(apprId, "Header Title", "THÔNG TIN XÁC NHẬN PHÊ DUYỆT (RBAC)", 16, 10, { fontSize: 12.5, fill: "#1E293B" });

  // Lưới Split Grid 3 Cột Căn Phải:
  await createSplitGridRow(apprId, "Người YCPD:", "nhannt", 20, 370, 48);
  await createSplitGridRow(apprId, "Thời gian tạo YCPD:", "27/07/2026 10:15:00", 20, 370, 74);

  await createSplitGridRow(apprId, "Người phê duyệt:", "tuandt", 400, 750, 48);
  await createSplitGridRow(apprId, "Thời gian phê duyệt:", "—", 400, 750, 74);

  await createSplitGridRow(apprId, "Trạng thái YCPD:", "Chờ phê duyệt", 780, 1150, 48, { valColor: "#D97706" });

  // 1. Thông báo Maker (Pending Banner)
  await sendRpc("create", {
    type: "RECTANGLE", parentId: apprId, name: "Maker Pending Banner BG", x: 20, y: 110, width: 1134, height: 44, fills: hexColor('#FEF3C7'), strokes: hexColor('#FDE68A'), cornerRadius: 6
  });
  await createText(apprId, "Maker Pending Banner Text", "⏳ YÊU CẦU DỰ ÁN TS-001 ĐANG TRONG TRẠNG THÁI CHỜ LÃNH ĐẠO (tuandt) PHÊ DUYỆT. BẠN LÀ MAKER CHỈ CÓ QUYỀN XEM THÔNG TIN VÀ THAO TÁC KHI ĐƯỢC PHÂN QUYỀN.", 32, 124, { fontSize: 11, fill: "#92400E" });

  // 2. Checker Action Buttons (Right Aligned in Footer Line)
  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Footer Line", x: 20, y: 168, width: 1134, height: 1, fills: hexColor('#E2E8F0') });

  await sendRpc("create", {
    type: "RECTANGLE", parentId: apprId, name: "Reject Button Box", x: 935, y: 176, width: 100, height: 32, fills: hexColor('#FFFFFF'), strokes: hexColor('#FCA5A5'), cornerRadius: 4
  });
  await createText(apprId, "Reject Button Text", "❌ Từ chối", 955, 185, { fontSize: 11, fill: "#DC2626" });

  await sendRpc("create", {
    type: "RECTANGLE", parentId: apprId, name: "Approve Button Box", x: 1045, y: 176, width: 110, height: 32, fills: hexColor('#2563EB'), cornerRadius: 4
  });
  await createText(apprId, "Approve Button Text", "✓ Phê duyệt", 1068, 185, { fontSize: 11, fill: "#FFFFFF" });

  console.log("🎉 ĐÃ CĂN PHẢI TẤT CẢ GIÁ TRỊ SPLIT GRID LAYOUT TRÊN MÀN HÌNH CHI TIẾT TS-001 CHUẨN 100% WIREFRAME HTML!");
}

drawDetailTS001().catch(console.error);
