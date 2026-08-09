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

async function createSplitGridRow(colFrameId, labelText, valueText, leftX, rightX, y, options = {}) {
  await createText(colFrameId, `${labelText} Label`, labelText, leftX, y, { fontSize: 11, fill: "#64748B" });
  const fontSize = options.fontSize || 11;
  const approxWidth = Math.ceil(valueText.length * (fontSize * 0.62));
  const valX = Math.max(leftX + 110, rightX - approxWidth);

  await createText(colFrameId, `${labelText} Value`, valueText, valX, y, {
    fontSize: fontSize,
    fill: options.valColor || "#0F172A"
  });
}

async function createRightAlignedBadge(colFrameId, labelText, badgeText, leftX, rightX, y, bgHex, textHex, badgeWidth = 90) {
  await createText(colFrameId, `${labelText} Label`, labelText, leftX, y, { fontSize: 11, fill: "#64748B" });
  const badgeX = rightX - badgeWidth;
  
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: colFrameId,
    name: `${labelText} Badge Box`,
    x: badgeX,
    y: y - 2,
    width: badgeWidth,
    height: 20,
    fills: hexColor(bgHex),
    cornerRadius: 4
  });

  await createText(colFrameId, `${labelText} Badge Text`, badgeText, badgeX + 8, y + 1, {
    fontSize: 10.5,
    fill: textHex
  });
}

async function drawDetailTS003() {
  console.log("🚀 Bắt đầu vẽ lại Màn hình Chi tiết TS-003 (TCYCTS - ĐÃ PHẢN HỒI PRCD + AUDIT TRAIL)...");

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Chi tiết yêu cầu tra soát TS-003 (TCYCTS - Đã phản hồi PRCD)" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // Main Canvas tại x = 9000 (1440 x 1620)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Chi tiết yêu cầu tra soát TS-003 (TCYCTS - Đã phản hồi PRCD)",
    x: 9000,
    y: 0,
    width: 1440,
    height: 1620,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  if (!mainCanvas || !mainCanvas.result || !mainCanvas.result.id) {
    console.error("❌ Lỗi tạo Main Canvas:", mainCanvas);
    return;
  }
  const mainId = mainCanvas.result.id;

  // Sidebar (220 x 1620)
  const sidebar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Sidebar", x: 0, y: 0, width: 220, height: 1620, fills: hexColor('#3B82F6')
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

  // Topbar
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
  await createText(topbarId, "Avatar Initial", "N", 961, 23, { fontSize: 13, fill: "#FFFFFF" });
  await createText(topbarId, "User Account Name", "nhannt (epay Portal)  ▼", 994, 24, { fontSize: 12.5, fill: "#0F172A" });

  // Breadcrumb
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã gửi > Chi tiết yêu cầu tra soát : TS-003", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Chi tiết yêu cầu tra soát TS-003", 246, 108, { fontSize: 22, fill: "#0F172A" });


  // KHỐI 1: BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT (STEP 6 ACTIVE - ĐÃ PHẢN HỒI)
  const stepCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 1 - Tiến trình xử lý", x: 246, y: 150, width: 1174, height: 95, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const stepId = stepCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor('#DCFCE7'), cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor('#16A34A') });

  await createText(stepId, "Banner Left Text", "📊 BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT — TRẠNG THÁI: Đã phản hồi (PRCD - Hoàn tiền Thành công)", 28, 18, { fontSize: 11.5, fill: "#16A34A" });
  await createText(stepId, "Banner Right Code", "(TS-003)", 1100, 18, { fontSize: 11, fill: "#16A34A" });

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 80, y: 56, width: 1014, height: 3, fills: hexColor('#2563EB') });

  const stepsList = [
    { num: "1", text: "Chờ xử lý", done: true },
    { num: "2", text: "Đã kiểm tra", done: true },
    { num: "3", text: "Chờ phê duyệt", done: true },
    { num: "4", text: "Đã duyệt", done: true },
    { num: "5", text: "Chờ phản hồi", done: true },
    { num: "6", text: "Đã phản hồi", active: true },
    { num: "7", text: "Hoàn tất" }
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


  // KHỐI 2: THÔNG TIN GIAO DỊCH GỐC
  const origTxCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 2 - Thông tin giao dịch gốc", x: 246, y: 260, width: 1174, height: 160, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const origId = origTxCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: origId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(origId, "Header Title", "THÔNG TIN GIAO DỊCH GỐC", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  await createSplitGridRow(origId, "Mã giao dịch:", "TX-10003", 20, 370, 46, { valColor: "#2563EB" });
  await createSplitGridRow(origId, "Trạng thái giao dịch:", "Thành công", 20, 370, 72, { valColor: "#16A34A" });
  await createSplitGridRow(origId, "Merchant code:", "PAYME_MERCHANT", 20, 370, 98);
  await createSplitGridRow(origId, "PTTT:", "VietQR", 20, 370, 124);

  await createSplitGridRow(origId, "Ngày giao dịch:", "20/07/2026 10:00:00", 400, 750, 46);
  await createSplitGridRow(origId, "Số tiền giao dịch:", "1,500,000 VND", 400, 750, 72, { valColor: "#0F172A" });
  await createSplitGridRow(origId, "Đối tác thanh toán:", "Napas", 400, 750, 98);
  await createSplitGridRow(origId, "Tên dịch vụ:", "Thanh toán VietQR", 400, 750, 124);

  await createSplitGridRow(origId, "Loại giao dịch:", "Thanh toán", 780, 1150, 46);
  await createSplitGridRow(origId, "Loại QR:", "Dynamic QR", 780, 1150, 72);
  await createSplitGridRow(origId, "Mã đơn hàng (Order ID):", "ORD-10003", 780, 1150, 98);
  await createSplitGridRow(origId, "Mã GD Epay:", "EPAYPW00339303", 780, 1150, 124);


  // KHỐI 3: THÔNG TIN TRA SOÁT
  const disputeCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 3 - Thông tin tra soát", x: 246, y: 435, width: 1174, height: 220, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const dspId = disputeCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F1F5F9') });
  await createText(dspId, "Header Title", "Thông tin tra soát", 16, 10, { fontSize: 12.5, fill: "#1E293B" });
  await createText(dspId, "Header Arrow", "▲", 1145, 10, { fontSize: 12, fill: "#475569" });

  await createSplitGridRow(dspId, "Mã tra soát:", "TS-003", 20, 370, 48, { valColor: "#2563EB" });
  await createRightAlignedBadge(dspId, "Trạng thái YCTS:", "Đã phản hồi", 20, 370, 74, '#DCFCE7', '#166534', 98);
  await createSplitGridRow(dspId, "Lý do tra soát:", "CUSTOMER — Khách hàng khiếu nại", 20, 370, 100);
  await createSplitGridRow(dspId, "Thời gian tạo YCTS:", "20/07/2026 10:15:00", 20, 370, 126);

  await createSplitGridRow(dspId, "Vai trò tra soát:", "TCYCTS", 400, 750, 48);
  await createRightAlignedBadge(dspId, "Trạng thái hết hạn:", "Chưa hết hạn", 400, 750, 74, '#DCFCE7', '#166534', 98);
  await createSplitGridRow(dspId, "Số tiền tra soát:", "1,500,000 VND", 400, 750, 100, { valColor: "#2563EB" });
  await createSplitGridRow(dspId, "Thời gian xử lý YCTS:", "20/07/2026 11:30:00", 400, 750, 126);

  await createSplitGridRow(dspId, "Loại tra soát:", "RQRN — Hoàn tiền", 780, 1150, 48);
  await createRightAlignedBadge(dspId, "Trạng thái xử lý tại Epay:", "Đồng ý", 780, 1150, 74, '#DCFCE7', '#166534', 60);
  await createRightAlignedBadge(dspId, "Trạng thái xử lý tại đối tác:", "PRCD", 780, 1150, 100, '#DCFCE7', '#166534', 55);
  await createSplitGridRow(dspId, "File minh chứng đính kèm:", "minh_chung.pdf 📎", 780, 1150, 126, { valColor: "#2563EB" });

  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Line Separator", x: 20, y: 162, width: 1134, height: 1, fills: hexColor('#E2E8F0') });
  await createText(dspId, "Proposal Title", "Nội dung đề nghị tra soát:", 20, 175, { fontSize: 11, fill: "#64748B" });
  await createText(dspId, "Proposal Content", "Giao dịch bị lỗi phía Napas, đề nghị đối tác xử lý hoàn trả.", 180, 175, { fontSize: 11, fill: "#0F172A" });


  // KHỐI 4: THÔNG TIN XÁC NHẬN PHÊ DUYỆT (RBAC)
  const approvalCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin xác nhận phê duyệt (RBAC)", x: 246, y: 670, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = approvalCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F1F5F9') });
  await createText(apprId, "Header Title", "THÔNG TIN XÁC NHẬN PHÊ DUYỆT (RBAC)", 16, 10, { fontSize: 12.5, fill: "#1E293B" });

  await createSplitGridRow(apprId, "Người YCPD:", "nhannt", 20, 370, 48);
  await createSplitGridRow(apprId, "Thời gian tạo YCPD:", "20/07/2026 10:15:00", 20, 370, 74);

  await createSplitGridRow(apprId, "Người phê duyệt:", "tuandt", 400, 750, 48);
  await createSplitGridRow(apprId, "Thời gian phê duyệt:", "20/07/2026 11:00:00", 400, 750, 74);

  await createSplitGridRow(apprId, "Trạng thái YCPD:", "Đã duyệt", 780, 1150, 48, { valColor: "#16A34A" });


  // KHỐI 5: KHỐI THÔNG TIN HOÀN TIỀN (9 TRƯỜNG TIÊU CHUẨN)
  const refundCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 5 - Thông tin hoàn tiền", x: 246, y: 815, width: 1174, height: 145, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const refId = refundCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: refId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F1F5F9') });
  await createText(refId, "Header Title", "KHỐI THÔNG TIN HOÀN TIỀN (9 TRƯỜNG TIÊU CHUẨN)", 16, 10, { fontSize: 12.5, fill: "#1E293B" });

  await createSplitGridRow(refId, "Mã GD hoàn trả:", "REF-10003", 20, 370, 48, { valColor: "#2563EB" });
  await createSplitGridRow(refId, "Loại giao dịch:", "Hoàn tiền GD tra soát", 20, 370, 74);
  await createSplitGridRow(refId, "Nguồn tiền hoàn:", "Tài khoản Napas / Epay", 20, 370, 100);

  await createSplitGridRow(refId, "Mã GD đối tác hoàn:", "PREF-10003", 400, 750, 48);
  await createSplitGridRow(refId, "Số tiền hoàn trả:", "1,500,000 VND", 400, 750, 74, { valColor: "#2563EB" });
  await createSplitGridRow(refId, "Thời gian tạo giao dịch:", "20/07/2026 11:05:00", 400, 750, 100);

  await createSplitGridRow(refId, "Trạng thái hoàn trả:", "✅ Thành công", 780, 1150, 48, { valColor: "#16A34A" });
  await createSplitGridRow(refId, "Phí giao dịch:", "0 VND", 780, 1150, 74);
  await createSplitGridRow(refId, "Thời gian hoàn tiền:", "20/07/2026 11:10:00", 780, 1150, 100);


  // 🌟 KHỐI 6: LỊCH SỬ THAY ĐỔI / NHẬT KÝ TIẾN TRÌNH THỜI GIAN (AUDIT TRAIL TIMELINE)
  const auditCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 6 - Lịch sử thay đổi Audit Trail Timeline", x: 246, y: 975, width: 1174, height: 165, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const auditId = auditCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: auditId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F8FAFC') });
  await createText(auditId, "Header Title", "⏱️ LỊCH SỬ THAY ĐỔI / NHẬT KÝ TIẾN TRÌNH THỜI GIAN (AUDIT TRAIL TIMELINE)", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const logs = [
    { time: "20/07/2026 10:15:00", actor: "nhannt (Maker)", action: "Khởi tạo YCTS chủ động TS-003 (RQRN - 1,500,000 VND). Trạng thái: Chờ xử lý" },
    { time: "20/07/2026 10:45:00", actor: "nhannt (Maker)", action: "Gửi đề xuất yêu cầu tra soát sang Lãnh đạo. Trạng thái cập nhật: Chờ phê duyệt" },
    { time: "20/07/2026 11:00:00", actor: "tuandt (Checker)", action: "Phê duyệt đề xuất YCTS TS-003. Trạng thái cập nhật thành: Đã duyệt" },
    { time: "20/07/2026 11:30:00", actor: "System Core Napas", action: "Nhận kết quả PRCD + Hoàn tiền REF-10003 thành công. Trạng thái: Đã phản hồi" }
  ];

  for (let i = 0; i < logs.length; i++) {
    const l = logs[i];
    const ly = 46 + i * 24;
    await sendRpc("create", { type: "ELLIPSE", parentId: auditId, name: `Dot ${i}`, x: 20, y: ly + 4, width: 6, height: 6, fills: hexColor('#16A34A') });
    await createText(auditId, `Log Time ${i}`, l.time, 34, ly, { fontSize: 11, fill: "#64748B" });
    await createText(auditId, `Log Actor ${i}`, `[${l.actor}]`, 175, ly, { fontSize: 11, fill: "#2563EB" });
    await createText(auditId, `Log Action ${i}`, l.action, 310, ly, { fontSize: 11, fill: "#0F172A" });
  }

  console.log("🎉 ĐÃ VẼ HOÀN TẤT MÀN HÌNH CHI TIẾT TS-003 (TCYCTS - ĐÃ PHẢN HỒI PRCD + AUDIT TRAIL)!");
}

drawDetailTS003().catch(console.error);
