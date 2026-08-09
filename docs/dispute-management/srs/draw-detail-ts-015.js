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

async function createColRowItem(colFrameId, labelText, valueText, y, options = {}) {
  await createText(colFrameId, `${labelText} Label`, labelText, 0, y, { fontSize: 11, fill: "#64748B" });
  const fontSize = options.fontSize || 11;
  const approxWidth = Math.ceil(valueText.length * (fontSize * 0.62));
  const valX = Math.max(90, 352 - approxWidth);

  await createText(colFrameId, `${labelText} Value`, valueText, valX, y, {
    fontSize: fontSize,
    fill: options.valColor || "#0F172A"
  });
}

async function createBadgeItem(colFrameId, labelText, badgeText, y, bgHex, textHex, badgeWidth = 90) {
  await createText(colFrameId, `${labelText} Label`, labelText, 0, y, { fontSize: 11, fill: "#64748B" });
  const badgeX = 352 - badgeWidth;
  
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

async function drawDetailTS015() {
  console.log("🚀 Bắt đầu vẽ lại TS-015 (ĐÃ PHẢN HỒI PRCD — BỔ SUNG KHỐI RBAC & LỊCH SỬ THAY ĐỔI)...");

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Chi tiết YCTS đã nhận TS-015 (TLTS - Đã phản hồi PRCD)" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // Main Canvas tại x = 25500 (1440 x 1620)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Chi tiết YCTS đã nhận TS-015 (TLTS - Đã phản hồi PRCD)",
    x: 25500,
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
  await createText(subId, "Sub 1 Text", "☕  Tra soát đã gửi", 20, 14, { fontSize: 12, fill: "#FFFFFF" });
  await sendRpc("create", { type: "RECTANGLE", parentId: subId, name: "Sub 2 Active Pill", x: 4, y: 40, width: 196, height: 32, fills: hexColor('#FFFFFF'), cornerRadius: 16 });
  await createText(subId, "Sub 2 Text", "📥  Tra soát đã nhận", 20, 48, { fontSize: 12, fill: "#3B82F6" });

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
  await createText(topbarId, "Avatar Initial", "L", 961, 23, { fontSize: 13, fill: "#FFFFFF" });
  await createText(topbarId, "User Account Name", "Lisa (epay Portal)  ▼", 994, 24, { fontSize: 12.5, fill: "#0F172A" });

  // Breadcrumb
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã nhận > Chi tiết yêu cầu tra soát : TS-015", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Chi tiết yêu cầu tra soát đã nhận TS-015", 246, 108, { fontSize: 22, fill: "#0F172A" });


  // KHỐI 1: BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT ĐÃ NHẬN (STEP 5 ACTIVE - ĐÃ PHẢN HỒI)
  const stepCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 1 - Tiến trình xử lý TLTS", x: 246, y: 150, width: 1174, height: 95, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const stepId = stepCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor('#ECFDF5'), cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor('#10B981') });

  await createText(stepId, "Banner Left Text", "📊 BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT ĐÃ NHẬN — TRẠNG THÁI: Đã phản hồi (Mã RQRN - PRCD Đồng ý)", 28, 18, { fontSize: 11.5, fill: "#10B981" });
  await createText(stepId, "Banner Right Code", "(TS-015)", 1100, 18, { fontSize: 11, fill: "#10B981" });

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 100, y: 56, width: 974, height: 3, fills: hexColor('#CBD5E1') });

  const tltsSteps = [
    { num: "1", text: "Chờ xử lý", done: true },
    { num: "2", text: "Chờ phê duyệt", done: true },
    { num: "3", text: "Đã duyệt", done: true },
    { num: "4", text: "Chờ phản hồi", done: true },
    { num: "5", text: "Đã phản hồi", active: true },
    { num: "6", text: "Hoàn tất" }
  ];

  for (let i = 0; i < tltsSteps.length; i++) {
    const s = tltsSteps[i];
    const cx = 100 + i * 194;

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

  const c0 = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 0", x: 20, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c0.result.id, "Mã giao dịch:", "TX-10015", 0, { valColor: "#2563eb" });
  await createColRowItem(c0.result.id, "Trạng thái giao dịch:", "● Thành công", 26, { valColor: "#16a34a" });
  await createColRowItem(c0.result.id, "Merchant code:", "PAYME_MERCHANT", 52);
  await createColRowItem(c0.result.id, "PTTT:", "VietQR", 78);

  const c1 = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c1.result.id, "Ngày giao dịch:", "18/07/2026 09:00:00", 0);
  await createColRowItem(c1.result.id, "Số tiền giao dịch:", "500,000 VND", 26);
  await createColRowItem(c1.result.id, "Đối tác thanh toán:", "Napas", 52);
  await createColRowItem(c1.result.id, "Tên dịch vụ:", "Thanh toán VietQR", 78);

  const c2 = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c2.result.id, "Loại giao dịch:", "Thanh toán", 0);
  await createColRowItem(c2.result.id, "Loại QR:", "Dynamic QR", 26);
  await createColRowItem(c2.result.id, "Mã đơn hàng (Order ID):", "ORD-10015", 52);
  await createColRowItem(c2.result.id, "Mã GD Epay:", "EPAYPW00339315", 78);


  // KHỐI 3: THÔNG TIN TRA SOÁT ĐÃ NHẬN
  const dspCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 3 - Thông tin tra soát", x: 246, y: 435, width: 1174, height: 215, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const dspId = dspCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(dspId, "Header Title", "THÔNG TIN TRA SOÁT ĐÃ NHẬN", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const d0 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 0", x: 20, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d0.result.id, "Mã tra soát:", "TS-015", 0);
  await createBadgeItem(d0.result.id, "Trạng thái YCTS:", "Đã phản hồi", 26, '#D1FAE5', '#065F46', 90);
  await createColRowItem(d0.result.id, "Mã loại tra soát:", "RQRN (Hoàn tiền)", 52, { valColor: "#3b82f6" });
  await createColRowItem(d0.result.id, "Số tiền tra soát:", "500,000 VND", 78);

  const d1 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 1", x: 411, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d1.result.id, "Chiều tra soát:", "TLTS (Tra soát đã nhận)", 0);
  await createBadgeItem(d1.result.id, "Trạng thái hết hạn:", "Chưa hết hạn", 26, '#DCFCE7', '#166534', 90);
  await createColRowItem(d1.result.id, "Thời gian tạo YCTS:", "18/07/2026 09:15:00", 52);
  await createColRowItem(d1.result.id, "Thời gian xử lý YCTS:", "18/07/2026 11:30:00", 78);

  const d2 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 2", x: 802, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createBadgeItem(d2.result.id, "Trạng thái xử lý tại Epay:", "PRCD", 0, '#DCFCE7', '#166534', 60);
  await createBadgeItem(d2.result.id, "Trạng thái xử lý tại đối tác:", "PRCD", 26, '#DCFCE7', '#166534', 60);
  await createColRowItem(d2.result.id, "Tệp minh chứng đính kèm:", "ycts-rqrn-015.pdf", 52, { valColor: "#2563eb" });
  await createColRowItem(d2.result.id, "Ghi chú tra soát:", "Đã đồng ý hoàn tiền cho khách hàng", 78);


  // KHỐI 4: KHỐI THÔNG TIN XÁC NHẬN PHÊ DUYỆT (RBAC)
  const rbacInfoCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối Thông tin xác nhận phê duyệt RBAC", x: 246, y: 665, width: 1174, height: 115, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const rbacInfoId = rbacInfoCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: rbacInfoId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(rbacInfoId, "Header Title", "THÔNG TIN XÁC NHẬN PHÊ DUYỆT (RBAC)", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const rb0 = await sendRpc("create", { type: "FRAME", parentId: rbacInfoId, name: "Component Col 0", x: 20, y: 44, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(rb0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(rb0.result.id, "Thời gian tạo YCPD:", "18/07/2026 09:15:00", 26);

  const rb1 = await sendRpc("create", { type: "FRAME", parentId: rbacInfoId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(rb1.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(rb1.result.id, "Thời gian phê duyệt:", "18/07/2026 10:00:00", 26);

  const rb2 = await sendRpc("create", { type: "FRAME", parentId: rbacInfoId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(rb2.result.id, "Trạng thái YCPD:", "Đã duyệt", 0, { valColor: "#16A34A" });


  // KHỐI 5: KHỐI THÔNG TIN HOÀN TRẢ THÀNH CÔNG
  const refCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 5 - Thông tin giao dịch hoàn trả thành công", x: 246, y: 795, width: 1174, height: 160, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const refId = refCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: refId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(refId, "Header Title", "THÔNG TIN GIAO DỊCH HOÀN TRẢ THÀNH CÔNG", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const r0 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 0", x: 20, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(r0.result.id, "Số tiền hoàn trả:", "500,000 VND", 0, { valColor: "#16a34a" });
  await createColRowItem(r0.result.id, "Loại hoàn trả:", "Toàn phần (100%)", 26);

  const r1 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(r1.result.id, "Trạng thái hoàn trả:", "✅ Thành công", 0, { valColor: "#16a34a" });
  await createColRowItem(r1.result.id, "Mã lỗi:", "00 (Thành công)", 26);

  const r2 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(r2.result.id, "Thời gian tạo:", "18/07/2026 09:15:00", 0);
  await createColRowItem(r2.result.id, "Thời gian hoàn tiền:", "18/07/2026 11:30:00", 26, { valColor: "#16a34a" });
  await createColRowItem(r2.result.id, "Lý do:", "Đồng ý hoàn tiền giao dịch thừa", 52);


  // 🌟 KHỐI 6: LỊCH SỬ THAY ĐỔI / NHẬT KÝ TIẾN TRÌNH THỜI GIAN (AUDIT TRAIL TIMELINE)
  const auditCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 6 - Lịch sử thay đổi Audit Trail Timeline", x: 246, y: 970, width: 1174, height: 165, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const auditId = auditCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: auditId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F8FAFC') });
  await createText(auditId, "Header Title", "⏱️ LỊCH SỬ THAY ĐỔI / NHẬT KÝ TIẾN TRÌNH THỜI GIAN (AUDIT TRAIL TIMELINE)", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const logs = [
    { time: "18/07/2026 09:00:00", actor: "API Gateway Napas", action: "Khởi tạo YCTS thụ động TS-015 (RQRN - 500,000 VND). Trạng thái: Chờ xử lý" },
    { time: "18/07/2026 09:15:00", actor: "nhannt (Maker)", action: "Cập nhật phản hồi PRCD + Đề xuất Hoàn tiền RF-10015 (Chờ phê duyệt)" },
    { time: "18/07/2026 10:00:00", actor: "tuandt (Checker)", action: "Phê duyệt phát hành lệnh hoàn tiền RF-10015. Trạng thái cập nhật thành: Đã duyệt" },
    { time: "18/07/2026 11:30:00", actor: "System Core Epay", action: "Phát hành kết quả PRCD sang cổng Napas & Hoàn tiền RF-10015 thành công. Trạng thái: Đã phản hồi" }
  ];

  for (let i = 0; i < logs.length; i++) {
    const l = logs[i];
    const ly = 46 + i * 24;
    await sendRpc("create", { type: "ELLIPSE", parentId: auditId, name: `Dot ${i}`, x: 20, y: ly + 4, width: 6, height: 6, fills: hexColor('#10B981') });
    await createText(auditId, `Log Time ${i}`, l.time, 34, ly, { fontSize: 11, fill: "#64748B" });
    await createText(auditId, `Log Actor ${i}`, `[${l.actor}]`, 175, ly, { fontSize: 11, fill: "#2563EB" });
    await createText(auditId, `Log Action ${i}`, l.action, 310, ly, { fontSize: 11, fill: "#0F172A" });
  }

  console.log("🎉 ĐÃ VẼ LẠI TS-015 (ĐÃ PHẢN HỒI PRCD — BỔ SUNG KHỐI RBAC & LỊCH SỬ THAY ĐỔI AUDIT TRAIL)!");
}

drawDetailTS015().catch(console.error);
