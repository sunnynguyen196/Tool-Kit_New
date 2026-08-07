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

async function drawDetailTS011() {
  console.log("🚀 Bắt đầu vẽ Màn hình Chi tiết TS-011: Đã kiểm tra...");

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Chi tiết YCTS TS-011 (Đã kiểm tra)" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // 1. Main Canvas tại x = 7500 (1440 x 1150)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Chi tiết YCTS TS-011 (Đã kiểm tra)",
    x: 7500,
    y: 0,
    width: 1440,
    height: 1150,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  if (!mainCanvas || !mainCanvas.result || !mainCanvas.result.id) {
    console.error("❌ Lỗi tạo Main Canvas:", mainCanvas);
    return;
  }
  const mainId = mainCanvas.result.id;

  // 2. Sidebar (220 x 1150)
  const sidebar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Sidebar", x: 0, y: 0, width: 220, height: 1150, fills: hexColor('#3B82F6')
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
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã gửi > Chi tiết yêu cầu tra soát : TS-011", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Chi tiết yêu cầu tra soát TS-011", 246, 108, { fontSize: 22, fill: "#0F172A" });


  // 5. KHỐI 1: BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT (BƯỚC 2: ĐÃ KIỂM TRA ACTIVE)
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

  await sendRpc("create", {
    type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor('#EFF6FF'), cornerRadius: 4
  });
  await sendRpc("create", {
    type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor('#2563EB')
  });

  await createText(stepId, "Banner Left Text", "📊 BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT — TRẠNG THÁI: Đã kiểm tra", 28, 18, { fontSize: 11.5, fill: "#2563EB" });
  await createText(stepId, "Banner Right Code", "(TS-011)", 1100, 18, { fontSize: 11, fill: "#2563EB" });

  // Line xanh cho bước 1 -> bước 2
  await sendRpc("create", {
    type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 80, y: 56, width: 1014, height: 3, fills: hexColor('#CBD5E1')
  });
  await sendRpc("create", {
    type: "RECTANGLE", parentId: stepId, name: "Step Line Done", x: 80, y: 56, width: 169, height: 3, fills: hexColor('#16A34A')
  });

  const stepsList = [
    { num: "1", text: "Chờ xử lý", done: true },
    { num: "2", text: "Đã kiểm tra", active: true },
    { num: "3", text: "Chờ phê duyệt", active: false },
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

    if (s.done) {
      circleBg = '#16A34A';
      circleBorder = '#16A34A';
      numColor = '#FFFFFF';
      textColor = '#16A34A';
    } else if (s.active) {
      circleBg = '#2563EB';
      circleBorder = '#2563EB';
      numColor = '#FFFFFF';
      textColor = '#2563EB';
    }

    await sendRpc("create", {
      type: "ELLIPSE",
      parentId: stepId,
      name: `Step Circle ${s.num}`,
      x: cx - 14,
      y: 44,
      width: 26,
      height: 26,
      fills: hexColor(circleBg),
      strokes: hexColor(circleBorder)
    });

    await createText(stepId, `Step Num ${s.num}`, s.num, cx - 4, 50, {
      fontSize: 11,
      fill: numColor
    });

    await createText(stepId, `Step Label ${s.num}`, s.text, cx - 28, 74, {
      fontSize: 9.5,
      fill: textColor
    });
  }


  // 6. KHỐI 2: THÔNG TIN GIAO DỊCH GỐC (Card 3 cột x 4 hàng)
  const origTxCard = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Khối 2 - Thông tin giao dịch gốc",
    x: 246,
    y: 260,
    width: 1174,
    height: 160,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });
  const origId = origTxCard.result.id;

  await sendRpc("create", {
    type: "RECTANGLE", parentId: origId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9')
  });
  await createText(origId, "Header Title", "THÔNG TIN GIAO DỊCH GỐC", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const origFields = [
    { lbl: "Mã giao dịch:", val: "TX-10011", c: 0, r: 0, valColor: "#2563EB" },
    { lbl: "Ngày giao dịch:", val: "08/03/2026 10:15:00", c: 1, r: 0 },
    { lbl: "Loại giao dịch:", val: "Thanh toán", c: 2, r: 0 },

    { lbl: "Trạng thái giao dịch:", val: "Thành công", c: 0, r: 1, valColor: "#16A34A" },
    { lbl: "Số tiền giao dịch:", val: "2,000,000 VND", c: 1, r: 1, bold: true },
    { lbl: "Loại QR:", val: "Dynamic QR", c: 2, r: 1 },

    { lbl: "Merchant code:", val: "PAYME_MERCHANT", c: 0, r: 2 },
    { lbl: "Đối tác thanh toán:", val: "Napas", c: 1, r: 2 },
    { lbl: "Mã đơn hàng (Order ID):", val: "ORD-10011", c: 2, r: 2 },

    { lbl: "PTTT:", val: "VietQR", c: 0, r: 3 },
    { lbl: "Tên dịch vụ:", val: "Thanh toán VietQR", c: 1, r: 3 },
    { lbl: "Mã GD Epay:", val: "EPAYPW00339311", c: 2, r: 3 }
  ];

  for (const f of origFields) {
    const fx = 16 + f.c * 380;
    const fy = 44 + f.r * 26;
    await createText(origId, `${f.lbl} Lbl`, f.lbl, fx, fy, { fontSize: 11, fill: "#64748B" });
    await createText(origId, `${f.lbl} Val`, f.val, fx + 160, fy, { fontSize: 11, fill: f.valColor || "#0F172A" });
  }


  // 7. KHỐI 3: THÔNG TIN TRA SOÁT (Hiển thị Trạng thái Đã kiểm tra)
  const disputeCard = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Khối 3 - Thông tin tra soát",
    x: 246,
    y: 435,
    width: 1174,
    height: 310,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });
  const dspId = disputeCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F1F5F9') });
  await createText(dspId, "Header Title", "Thông tin tra soát", 16, 10, { fontSize: 12.5, fill: "#1E293B" });
  await createText(dspId, "Header Arrow", "∧", 1145, 10, { fontSize: 12, fill: "#475569" });

  // Row 1
  await createText(dspId, "Mã TS Lbl", "Mã tra soát (Disable)", 20, 48, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Mã TS Box", x: 20, y: 64, width: 350, height: 30, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(dspId, "Mã TS Val", "TS-011", 32, 71, { fontSize: 11.5, fill: "#64748B" });

  await createText(dspId, "Vai trò Lbl", "Vai trò tra soát (Disable)", 400, 48, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Vai trò Box", x: 400, y: 64, width: 350, height: 30, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(dspId, "Vai trò Val", "TCYCTS", 412, 71, { fontSize: 11.5, fill: "#64748B" });

  await createText(dspId, "Loại TS Lbl", "Loại tra soát (Disable)", 780, 48, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Loại TS Box", x: 780, y: 64, width: 374, height: 30, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(dspId, "Loại TS Val", "RQSP — Sai sót nghiệp vụ", 792, 71, { fontSize: 11.5, fill: "#64748B" });

  // Row 2
  await createText(dspId, "Lý do Lbl", "Lý do tra soát (Disable)", 20, 106, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Lý do Box", x: 20, y: 122, width: 350, height: 30, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(dspId, "Lý do Val", "BANK — Lỗi hệ thống ngân hàng", 32, 129, { fontSize: 11, fill: "#64748B" });

  await createText(dspId, "Số tiền TS Lbl", "Số tiền tra soát (Chỉnh sửa) (*)", 400, 106, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Số tiền TS Box", x: 400, y: 122, width: 350, height: 30, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(dspId, "Số tiền TS Val", "2,000,000 VND", 412, 129, { fontSize: 11.5, fill: "#2563EB" });

  await createText(dspId, "TCPL Lbl", "TCPL tra soát gốc (Disable)", 780, 106, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "TCPL Box", x: 780, y: 122, width: 374, height: 30, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(dspId, "TCPL Val", "Napas / Epay", 792, 129, { fontSize: 11, fill: "#64748B" });

  // Row 3: 4 Trạng thái (Trạng thái YCTS: Đã kiểm tra - Blue Badge)
  await createText(dspId, "TT YCTS Lbl", "Trạng thái YCTS (*)", 20, 164, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "TT YCTS Badge", x: 20, y: 180, width: 110, height: 26, fills: hexColor('#DBEAFE'), cornerRadius: 4 });
  await createText(dspId, "TT YCTS Val", "Đã kiểm tra", 38, 186, { fontSize: 11, fill: "#1E40AF" });

  await createText(dspId, "TT Hết hạn Lbl", "Trạng thái hết hạn (*)", 320, 164, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "TT Hết hạn Badge", x: 320, y: 180, width: 110, height: 26, fills: hexColor('#DCFCE7'), cornerRadius: 4 });
  await createText(dspId, "TT Hết hạn Val", "Chưa hết hạn", 336, 186, { fontSize: 11, fill: "#15803D" });

  await createText(dspId, "TT Epay Lbl", "Trạng thái xử lý tại Epay (*)", 610, 164, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "TT Epay Badge", x: 610, y: 180, width: 60, height: 26, fills: hexColor('#F1F5F9'), cornerRadius: 4 });
  await createText(dspId, "TT Epay Val", "—", 636, 186, { fontSize: 11, fill: "#64748B" });

  await createText(dspId, "TT Đối tác Lbl", "Trạng thái xử lý tại đối tác (*)", 880, 164, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "TT Đối tác Badge", x: 880, y: 180, width: 60, height: 26, fills: hexColor('#F1F5F9'), cornerRadius: 4 });
  await createText(dspId, "TT Đối tác Val", "—", 906, 186, { fontSize: 11, fill: "#64748B" });

  // Row 4: Minh chứng & Nội dung đề nghị
  await createText(dspId, "Minh chứng Lbl", "Tệp đính kèm minh chứng (*)", 20, 218, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Attach Btn", x: 20, y: 234, width: 160, height: 28, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(dspId, "Attach Btn Text", "📎 Chọn file minh chứng...", 28, 241, { fontSize: 10.5, fill: "#334155" });
  await createText(dspId, "Attach Link", "minh_chung.pdf 📎", 195, 241, { fontSize: 11, fill: "#2563EB" });

  await createText(dspId, "Nội dung Lbl", "Nội dung đề nghị tra soát (Chỉnh sửa) (*)", 400, 218, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Nội dung Box", x: 400, y: 234, width: 754, height: 50, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(dspId, "Nội dung Val", "Giao dịch bị lỗi phía Napas, đề nghị đối tác xử lý hoàn trả.", 412, 246, { fontSize: 11, fill: "#0F172A" });


  // 8. KHỐI 4: THÔNG TIN XỬ LÝ (TH2: inspector01 xác minh xong trình duyệt)
  const handleCard = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Khối 4 - Thông tin xử lý",
    x: 246,
    y: 760,
    width: 1174,
    height: 350,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });
  const hdlId = handleCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F1F5F9') });
  await createText(hdlId, "Header Title", "Thông tin xử lý (Kỹ thuật inspector01 xác minh xong)", 16, 10, { fontSize: 12.5, fill: "#1E293B" });
  await createText(hdlId, "Header Arrow", "∧", 1145, 10, { fontSize: 12, fill: "#475569" });

  // Row 1
  await createText(hdlId, "Loại YC Lbl", "Loại yêu cầu xử lý", 20, 48, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Loại YC Box", x: 20, y: 64, width: 540, height: 28, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(hdlId, "Loại YC Val", "Loại 1: Yêu cầu cập nhật giao dịch", 32, 71, { fontSize: 11, fill: "#475569" });

  await createText(hdlId, "Mô tả Hdl Lbl", "Mô tả tình huống", 600, 48, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Mô tả Hdl Box", x: 600, y: 64, width: 554, height: 60, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(hdlId, "Mô tả Hdl Val", "QRGW ghi nhận thao dịch thanh toán thành công. Đối tác ghi nhận GD thất bại", 612, 74, { fontSize: 11, fill: "#475569" });

  // Row 2: File log xác minh
  await createText(hdlId, "Log Lbl", "Xác minh tình trạng (trước/sau xử lý) (*)", 20, 104, { fontSize: 10.5, fill: "#334155" });
  await createText(hdlId, "Log Item", "File log_trace_011.txt (inspector01) ✅", 20, 126, { fontSize: 11, fill: "#2563EB" });

  // Row 3: Kỹ thuật xác nhận & Kế toán
  await createText(hdlId, "Kỹ thuật XN Lbl", "Kỹ thuật inspector01 xác nhận nguyên nhân (*)", 20, 158, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Kỹ thuật XN Box", x: 20, y: 174, width: 540, height: 50, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(hdlId, "Kỹ thuật XN Val", "Đã kiểm tra log hệ thống QRGW và Napas: Giao dịch lỗi kết nối timeout...", 32, 186, { fontSize: 11, fill: "#0F172A" });

  await createText(hdlId, "Kế toán XN Lbl", "Kế toán xác nhận nguyên nhân", 600, 158, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Kế toán XN Box", x: 600, y: 174, width: 554, height: 50, fills: hexColor('#E2E8F0'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });

  // Row 4: Phương án & Người phê duyệt
  await createText(hdlId, "Phương án Lbl", "Đối soát xác nhận phương án xử lý (*)", 20, 234, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Phương án Box", x: 20, y: 250, width: 540, height: 30, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(hdlId, "Phương án Val", "[PA_02] Cập nhật trạng thái GD từ TC về TB", 32, 257, { fontSize: 11.5, fill: "#0F172A" });

  await createText(hdlId, "Người duyệt Lbl", "Người phê duyệt (*)", 600, 234, { fontSize: 10.5, fill: "#334155" });
  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Người duyệt Box", x: 600, y: 250, width: 200, height: 30, fills: hexColor('#F1F5F9'), strokes: hexColor('#CBD5E1'), cornerRadius: 4 });
  await createText(hdlId, "Người duyệt Val", "tuandt (Lãnh đạo đối soát)", 612, 257, { fontSize: 11.5, fill: "#1E293B" });

  // Action Buttons Footer (Trình duyệt)
  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Cancel Btn Box", x: 920, y: 300, width: 100, height: 34, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6 });
  await createText(hdlId, "Cancel Btn Text", "Hủy", 955, 310, { fontSize: 12, fill: "#334155" });

  await sendRpc("create", { type: "RECTANGLE", parentId: hdlId, name: "Submit Approval Btn Box", x: 1030, y: 300, width: 124, height: 34, fills: hexColor('#0284C7'), cornerRadius: 6 });
  await createText(hdlId, "Submit Approval Btn Text", "📤 Trình duyệt", 1052, 310, { fontSize: 12, fill: "#FFFFFF" });

  console.log("🎉 ĐÃ VẼ HOÀN TẤT MÀN HÌNH CHI TIẾT TS-011 (ĐÃ KIỂM TRA) CHUẨN FIGMA!");
}

drawDetailTS011().catch(console.error);
