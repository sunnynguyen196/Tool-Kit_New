import http from 'node:http';

const token = "692e143ccec55fc20e635f9f3050a2b4af3a8ba9a5dcd650";

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

// Hàm vẽ 1 dòng thông tin trong Column Sub-Frame (Nhãn trái, giá trị căn phải x = 352)
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

async function drawDetailTS007() {
  console.log("🚀 Bắt đầu vẽ lại Màn hình Chi tiết TS-007: Xử lý thất bại (Chuẩn 100% Ảnh 1 & Ảnh 2)...");

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Chi tiết YCTS TS-007 (Xử lý thất bại)" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // 1. Main Canvas tại x = 16500 (1440 x 1180)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Chi tiết YCTS TS-007 (Xử lý thất bại)",
    x: 16500,
    y: 0,
    width: 1440,
    height: 1180,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  if (!mainCanvas || !mainCanvas.result || !mainCanvas.result.id) {
    console.error("❌ Lỗi tạo Main Canvas:", mainCanvas);
    return;
  }
  const mainId = mainCanvas.result.id;

  // 2. Sidebar (220 x 1180)
  const sidebar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Sidebar", x: 0, y: 0, width: 220, height: 1180, fills: hexColor('#3B82F6')
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
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã gửi > Chi tiết yêu cầu tra soát : TS-007", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Chi tiết yêu cầu tra soát TS-007", 246, 108, { fontSize: 22, fill: "#0F172A" });


  // 5. KHỐI 1: BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT (BƯỚC 5: XỬ LÝ THẤT BẠI 🔴 ACTIVE RED)
  const stepCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 1 - Tiến trình xử lý", x: 246, y: 150, width: 1174, height: 95, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const stepId = stepCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor('#FEF2F2'), cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor('#DC2626') });

  await createText(stepId, "Banner Left Text", "📊 BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT — TRẠNG THÁI: Xử lý thất bại (Lỗi kết nối đối tác)", 28, 18, { fontSize: 11.5, fill: "#DC2626" });
  await createText(stepId, "Banner Right Code", "(TS-007)", 1100, 18, { fontSize: 11, fill: "#DC2626" });

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 80, y: 56, width: 1014, height: 3, fills: hexColor('#CBD5E1') });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line Done", x: 80, y: 56, width: 676, height: 3, fills: hexColor('#16A34A') });

  const stepsList = [
    { num: "1", text: "Chờ xử lý", done: true },
    { num: "2", text: "Đã kiểm tra", done: true },
    { num: "3", text: "Chờ phê duyệt", done: true },
    { num: "4", text: "Đã duyệt", done: true },
    { num: "5", text: "Xử lý thất bại", failed: true },
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

    if (s.done) {
      circleBg = '#16A34A'; circleBorder = '#16A34A'; numColor = '#FFFFFF'; textColor = '#16A34A';
    } else if (s.failed) {
      circleBg = '#DC2626'; circleBorder = '#DC2626'; numColor = '#FFFFFF'; textColor = '#DC2626';
    }

    await sendRpc("create", { type: "ELLIPSE", parentId: stepId, name: `Step Circle ${s.num}`, x: cx - 14, y: 44, width: 26, height: 26, fills: hexColor(circleBg), strokes: hexColor(circleBorder) });
    await createText(stepId, `Step Num ${s.num}`, s.num, cx - 4, 50, { fontSize: 11, fill: numColor });
    await createText(stepId, `Step Label ${s.num}`, s.text, cx - 28, 74, { fontSize: 9.5, fill: textColor });
  }


  // 6. KHỐI 2: THÔNG TIN GIAO DỊCH GỐC (3 Column Component Sub-Frames)
  const origTxCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 2 - Thông tin giao dịch gốc", x: 246, y: 260, width: 1174, height: 160, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const origId = origTxCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: origId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(origId, "Header Title", "THÔNG TIN GIAO DỊCH GỐC", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  // Component Sub-Frame Col 0 (352 Fill x 94 Hug)
  const c0Frame = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 0", x: 20, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c0Frame.result.id, "Mã giao dịch:", "TX-10007", 0, { valColor: "#2563eb" });
  await createColRowItem(c0Frame.result.id, "Trạng thái giao dịch:", "● Thành công", 26, { valColor: "#16a34a" });
  await createColRowItem(c0Frame.result.id, "Merchant code:", "PAYME_MERCHANT", 52);
  await createColRowItem(c0Frame.result.id, "PTTT:", "VietQR", 78);

  // Component Sub-Frame Col 1 (352 Fill x 94 Hug)
  const c1Frame = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c1Frame.result.id, "Ngày giao dịch:", "23/07/2026 15:30:00", 0);
  await createColRowItem(c1Frame.result.id, "Số tiền giao dịch:", "1,800,000 VND", 26);
  await createColRowItem(c1Frame.result.id, "Đối tác thanh toán:", "Napas", 52);
  await createColRowItem(c1Frame.result.id, "Tên dịch vụ:", "Thanh toán VietQR", 78);

  // Component Sub-Frame Col 2 (352 Fill x 94 Hug)
  const c2Frame = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c2Frame.result.id, "Loại giao dịch:", "Thanh toán", 0);
  await createColRowItem(c2Frame.result.id, "Loại QR:", "Dynamic QR", 26);
  await createColRowItem(c2Frame.result.id, "Mã đơn hàng (Order ID):", "ORD-10007", 52);
  await createColRowItem(c2Frame.result.id, "Mã GD Epay:", "EPAYPW00339312", 78);


  // 7. KHỐI 3: THÔNG TIN TRA SOÁT (KHỚP 100% ẢNH 1 USER)
  const disputeCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 3 - Thông tin tra soát", x: 246, y: 435, width: 1174, height: 210, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const dspId = disputeCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(dspId, "Header Title", "THÔNG TIN TRA SOÁT", 16, 10, { fontSize: 12, fill: "#1E293B" });
  await createText(dspId, "Header Arrow", "▲", 1145, 10, { fontSize: 12, fill: "#475569" });

  // Component Sub-Frame Col 0 (Khớp 100% khung viền xanh như Ảnh 1)
  const d0Frame = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 0 (352 Fill x 94 Hug)", x: 20, y: 48, width: 352, height: 94, fills: [], strokes: [] });
  await createColRowItem(d0Frame.result.id, "Mã tra soát:", "TS-007", 0, { valColor: "#0F172A" });
  await createColRowItem(d0Frame.result.id, "Trạng thái tra soát:", "● Xử lý thất bại", 30, { valColor: "#DC2626" });
  await createColRowItem(d0Frame.result.id, "Loại tra soát:", "RQSP — Sai sót nghiệp vụ", 60);

  // Component Sub-Frame Col 1
  const d1Frame = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 1 (352 Fill x 94 Hug)", x: 411, y: 48, width: 352, height: 94, fills: [], strokes: [] });
  await createColRowItem(d1Frame.result.id, "Vai trò tra soát:", "TCYCTS", 0);
  await createColRowItem(d1Frame.result.id, "Lý do tra soát:", "BANK — Lỗi kết nối timeout", 30);
  await createColRowItem(d1Frame.result.id, "Số tiền tra soát:", "1,800,000 VND", 60, { valColor: "#0F172A" });

  // Component Sub-Frame Col 2
  const d2Frame = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 2 (352 Fill x 94 Hug)", x: 802, y: 48, width: 352, height: 94, fills: [], strokes: [] });
  await createColRowItem(d2Frame.result.id, "Trạng thái TS đối tác:", "—", 0);
  await createColRowItem(d2Frame.result.id, "TCPL tra soát gốc:", "Napas / Epay", 30);
  await createColRowItem(d2Frame.result.id, "Tệp đính kèm:", "minh_chung.pdf 📎", 60, { valColor: "#2563eb" });

  // Đường nét đứt & Nội dung đề nghị
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Dashed Line Separator", x: 20, y: 155, width: 1134, height: 1, fills: hexColor('#E2E8F0') });
  await createText(dspId, "Proposal Title", "Nội dung đề nghị tra soát:", 20, 170, { fontSize: 11, fill: "#64748B" });
  await createText(dspId, "Proposal Content", "Giao dịch bị lỗi phía Napas, đề nghị đối tác xử lý hoàn trả.", 180, 170, { fontSize: 11, fill: "#0F172A" });


  // 8. KHỐI 4: THÔNG TIN PHÊ DUYỆT (3 Component Sub-Frames)
  const approvalCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin phê duyệt", x: 246, y: 660, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = approvalCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(apprId, "Header Title", "THÔNG TIN PHÊ DUYỆT", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const a0Frame = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a0Frame.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(a0Frame.result.id, "Thời gian tạo YCPD:", "23/07/2026 15:30:00", 26);

  const a1Frame = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a1Frame.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(a1Frame.result.id, "Thời gian phê duyệt:", "23/07/2026 16:00:00", 26);

  const a2Frame = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a2Frame.result.id, "Trạng thái YCPD:", "● Đã duyệt", 0, { valColor: "#16A34A" });


  // 9. KHỐI 5: KHỐI LỊCH SỬ THAY ĐỔI (AUDIT LOG BLOCK CHUẨN KHỚP 100% ẢNH 2)
  const auditCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 5 - Lịch sử thay đổi (Audit Log)", x: 246, y: 805, width: 1174, height: 135, fills: hexColor('#F8FAFC'), strokes: hexColor('#E2E8F0'), cornerRadius: 6
  });
  const auditId = auditCard.result.id;

  await createText(auditId, "Header Title", "Lịch sử thay đổi (Audit Log):", 16, 14, { fontSize: 12.5, fill: "#1E293B" });

  const auditLogs = [
    "• 2026-07-23 15:30: Yêu cầu được khởi tạo. Trạng thái: Chờ xử lý",
    "• 2026-07-23 15:45: inspector01 đã kiểm tra log. Trạng thái cập nhật thành: Đã kiểm tra",
    "• 2026-07-23 16:00: tuandt đã phê duyệt yêu cầu. Trạng thái cập nhật thành: Đã duyệt",
    "• 2026-07-23 16:05: Lỗi kết nối với đối tác Napas. Trạng thái cập nhật thành: Xử lý thất bại"
  ];

  for (let i = 0; i < auditLogs.length; i++) {
    await createText(auditId, `Audit Log ${i+1}`, auditLogs[i], 16, 42 + i * 22, { fontSize: 11, fill: "#475569" });
  }

  console.log("🎉 ĐÃ VẼ LẠI NỘI DUNG TS-007 CHUẨN 100% KHỚP ẢNH 1 VÀ ẢNH 2 USER!");
}

drawDetailTS007().catch(console.error);
