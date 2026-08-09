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

async function drawDetailTS018() {
  console.log("🚀 Bắt đầu vẽ Màn hình Chi tiết TS-018 (Luồng TLTS / Tra soát đã nhận — Chờ xử lý RQSP BANK)...");

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Chi tiết YCTS đã nhận TS-018 (TLTS - Chờ xử lý)" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // Main Canvas tại x = 21000 (1440 x 1380)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Chi tiết YCTS đã nhận TS-018 (TLTS - Chờ xử lý)",
    x: 21000,
    y: 0,
    width: 1440,
    height: 1380,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  if (!mainCanvas || !mainCanvas.result || !mainCanvas.result.id) {
    console.error("❌ Lỗi tạo Main Canvas:", mainCanvas);
    return;
  }
  const mainId = mainCanvas.result.id;

  // Sidebar (220 x 1380)
  const sidebar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Sidebar", x: 0, y: 0, width: 220, height: 1380, fills: hexColor('#3B82F6')
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
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã nhận > Chi tiết yêu cầu tra soát : TS-018", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Chi tiết yêu cầu tra soát đã nhận TS-018", 246, 108, { fontSize: 22, fill: "#0F172A" });


  // KHỐI 1: BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT ĐÃ NHẬN
  const stepCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 1 - Tiến trình xử lý TLTS", x: 246, y: 150, width: 1174, height: 95, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const stepId = stepCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor('#EFF6FF'), cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor('#2563EB') });

  await createText(stepId, "Banner Left Text", "📊 BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT ĐÃ NHẬN — TRẠNG THÁI: Chờ xử lý (Mã RQSP BANK)", 28, 18, { fontSize: 11.5, fill: "#2563EB" });
  await createText(stepId, "Banner Right Code", "(TS-018)", 1100, 18, { fontSize: 11, fill: "#2563EB" });

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 100, y: 56, width: 974, height: 3, fills: hexColor('#CBD5E1') });

  const tltsSteps = [
    { num: "1", text: "Chờ xử lý", active: true },
    { num: "2", text: "Chờ phê duyệt" },
    { num: "3", text: "Đã duyệt" },
    { num: "4", text: "Chờ phản hồi" },
    { num: "5", text: "Đã phản hồi" },
    { num: "6", text: "Hoàn tất" }
  ];

  for (let i = 0; i < tltsSteps.length; i++) {
    const s = tltsSteps[i];
    const cx = 100 + i * 194;

    let circleBg = '#F1F5F9';
    let circleBorder = '#CBD5E1';
    let numColor = '#94A3B8';
    let textColor = '#94A3B8';

    if (s.active) {
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
  await createColRowItem(c0.result.id, "Mã giao dịch:", "TX-10018", 0, { valColor: "#2563eb" });
  await createColRowItem(c0.result.id, "Trạng thái giao dịch:", "● Thành công", 26, { valColor: "#16a34a" });
  await createColRowItem(c0.result.id, "Merchant code:", "PAYME_MERCHANT", 52);
  await createColRowItem(c0.result.id, "PTTT:", "VietQR", 78);

  const c1 = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c1.result.id, "Ngày giao dịch:", "22/07/2026 11:15:00", 0);
  await createColRowItem(c1.result.id, "Số tiền giao dịch:", "2,500,000 VND", 26);
  await createColRowItem(c1.result.id, "Đối tác thanh toán:", "Napas", 52);
  await createColRowItem(c1.result.id, "Tên dịch vụ:", "Thanh toán VietQR", 78);

  const c2 = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c2.result.id, "Loại giao dịch:", "Thanh toán", 0);
  await createColRowItem(c2.result.id, "Loại QR:", "Dynamic QR", 26);
  await createColRowItem(c2.result.id, "Mã đơn hàng (Order ID):", "ORD-10018", 52);
  await createColRowItem(c2.result.id, "Mã GD Epay:", "EPAYPW00339318", 78);


  // KHỐI 3: THÔNG TIN TRA SOÁT ĐÃ NHẬN (Read-only)
  const dspCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 3 - Thông tin tra soát", x: 246, y: 435, width: 1174, height: 235, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const dspId = dspCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(dspId, "Header Title", "THÔNG TIN TRA SOÁT ĐÃ NHẬN", 16, 10, { fontSize: 12, fill: "#1E293B" });
  await createText(dspId, "Header Arrow", "▲", 1145, 10, { fontSize: 12, fill: "#475569" });

  const d0 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 0", x: 20, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d0.result.id, "Mã tra soát:", "TS-018", 0);
  await createColRowItem(d0.result.id, "Mã loại tra soát:", "RQSP (Sai sót)", 26, { valColor: "#3b82f6" });
  await createColRowItem(d0.result.id, "Số tiền tra soát:", "2,500,000 VND", 52);
  await createColRowItem(d0.result.id, "Thời gian khởi tạo:", "22/07/2026 11:20:00", 78);

  const d1 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 1", x: 411, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d1.result.id, "Chiều tra soát:", "TLTS (Tra soát đã nhận)", 0);
  await createColRowItem(d1.result.id, "Lý do (RQSP):", "BANK (Sai sót ngân hàng)", 26, { valColor: "#d97706" });
  await createColRowItem(d1.result.id, "Trạng thái tra soát:", "● Chờ xử lý", 52, { valColor: "#d97706" });
  await createColRowItem(d1.result.id, "Tệp minh chứng:", "ycts-bank-018.pdf", 78, { valColor: "#2563eb" });

  const d2 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 2", x: 802, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d2.result.id, "Người khởi tạo:", "Bank_Gateway_Partner", 0);
  await createColRowItem(d2.result.id, "Kênh nhận tra soát:", "API Gateway Napas", 26);
  await createColRowItem(d2.result.id, "SLA xử lý:", "Còn 23 giờ 45 phút", 52, { valColor: "#16a34a" });
  await createColRowItem(d2.result.id, "Ghi chú tra soát:", "Napas chuyển tra soát sai sót tiền từ Ngân hàng", 78);


  // KHỐI 4: KHUNG KHỞI TẠO PHẢN HỒI & BÁO CÓ (Form Layout Editable - Toggle Báo Có)
  const formCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Khung Phản hồi & Báo có", x: 246, y: 685, width: 1174, height: 420, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const formId = formCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Header BG", x: 1, y: 1, width: 1172, height: 38, fills: hexColor('#F1F5F9') });
  await createText(formId, "Header Title", "⚡ XỬ LÝ PHẢN HỒI TRA SOÁT & KHỞI TẠO BÁO CÓ TÀI KHOẢN (MÃ RQSP BANK)", 16, 11, { fontSize: 12, fill: "#1E293B" });

  // 1. Mã phản hồi
  await createText(formId, "Response Code Label", "MÃ PHẢN HỒI *", 24, 52, { fontSize: 11, fill: "#64748B" });
  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Response Box", x: 24, y: 70, width: 540, height: 38, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(formId, "Response Val", "PRCD (Đồng ý báo có / Chấp nhận)", 38, 81, { fontSize: 12, fill: "#16A34A" });
  await createText(formId, "Response Arrow", "▼", 538, 82, { fontSize: 11, fill: "#64748B" });

  // 2. Toggle Báo Có
  await createText(formId, "Toggle Label", "KHỞI TẠO BÁO CÓ TÀI KHOẢN *", 600, 52, { fontSize: 11, fill: "#64748B" });
  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Toggle Switch BG", x: 600, y: 72, width: 52, height: 28, fills: hexColor('#10B981'), cornerRadius: 14 });
  await sendRpc("create", { type: "ELLIPSE", parentId: formId, name: "Toggle Circle", x: 626, y: 74, width: 24, height: 24, fills: hexColor('#FFFFFF') });
  await createText(formId, "Toggle Status Text", "BẬT (ON) — Báo có 2,500,000 VND vào tài khoản Epay", 662, 78, { fontSize: 12, fill: "#10B981" });

  // 3. Số tiền Báo có
  await createText(formId, "Credit Amount Label", "SỐ TIỀN BÁO CÓ (VND) *", 24, 122, { fontSize: 11, fill: "#64748B" });
  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Credit Amount Box", x: 24, y: 140, width: 540, height: 38, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(formId, "Credit Amount Val", "2,500,000", 38, 151, { fontSize: 12, fill: "#0F172A" });

  // 4. Loại Báo có
  await createText(formId, "Credit Type Label", "LOẠI BÁO CÓ *", 600, 122, { fontSize: 11, fill: "#64748B" });
  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Credit Type Box", x: 600, y: 140, width: 550, height: 38, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(formId, "Credit Type Val", "Báo có điều chỉnh sai sót ngân hàng (100%)", 614, 151, { fontSize: 12, fill: "#0F172A" });
  await createText(formId, "Credit Type Arrow", "▼", 1124, 152, { fontSize: 11, fill: "#64748B" });

  // 5. Ghi chú phản hồi
  await createText(formId, "Note Label", "LÝ DO / GHI CHÚ PHẢN HỒI *", 24, 194, { fontSize: 11, fill: "#64748B" });
  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Note Box", x: 24, y: 212, width: 1126, height: 60, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(formId, "Note Text", "Đã xác minh sao kê ngân hàng, đồng ý báo có điều chỉnh số tiền 2,500,000 VND cho giao dịch TX-10018.", 38, 226, { fontSize: 11.5, fill: "#0F172A" });

  // 6. Tệp đính kèm
  await createText(formId, "File Upload Label", "HỒ SƠ ĐÍNH KÈM MINH CHỨNG SAO KÊ", 24, 286, { fontSize: 11, fill: "#64748B" });
  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "File Upload Box", x: 24, y: 304, width: 1126, height: 48, fills: hexColor('#F8FAFC'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(formId, "File Text", "📁 Drag & Drop tệp đính kèm minh chứng sao kê ngân hàng (.pdf, .png, .jpg)... Hoặc 📤 Tải tệp lên", 380, 320, { fontSize: 11.5, fill: "#2563EB" });

  // 7. Footer Action Buttons
  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Cancel Btn Box", x: 860, y: 366, width: 130, height: 38, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6 });
  await createText(formId, "Cancel Btn Text", "❌ Hủy bỏ yêu cầu", 874, 377, { fontSize: 11.5, fill: "#475569" });

  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Submit Btn Box", x: 1004, y: 366, width: 146, height: 38, fills: hexColor('#3B82F6'), cornerRadius: 6 });
  await createText(formId, "Submit Btn Text", "✏️ Cập nhật trả lời", 1020, 377, { fontSize: 11.5, fill: "#FFFFFF" });

  console.log("🎉 ĐÃ VẼ HOÀN TẤT MÀN HÌNH CHI TIẾT TS-018 (TLTS - CHỜ XỬ LÝ RQSP BANK) CHUẨN 100% FIGMA!");
}

drawDetailTS018().catch(console.error);
