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

// Hàm tạo bộ khung cơ bản Sidebar + Topbar + Breadcrumb + Canvas
async function createBaseScreen(frameName, canvasX, height, code, breadcrumbTitle) {
  try {
    const searchRes = await sendRpc("search_nodes", { name: frameName });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {}

  const mainCanvas = await sendRpc("create", {
    type: "FRAME", name: frameName, x: canvasX, y: 0, width: 1440, height: height, fills: hexColor('#F8FAFC')
  });
  const mainId = mainCanvas.result.id;

  // Sidebar
  const sidebar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Sidebar", x: 0, y: 0, width: 220, height: height, fills: hexColor('#3B82F6')
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

  const subContainer = await sendRpc("create", {
    type: "FRAME", parentId: sidebarId, name: "Submenu Container", x: 8, y: 470, width: 204, height: 76, fills: hexColor('#2563EB'), cornerRadius: 8
  });
  const subId = subContainer.result.id;
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
  await createText(topbarId, "Avatar Initial", "L", 961, 23, { fontSize: 13, fill: "#FFFFFF" });
  await createText(topbarId, "User Account Name", "Lisa (epay Portal)  ▼", 994, 24, { fontSize: 12.5, fill: "#0F172A" });

  // Breadcrumb
  await createText(mainId, "Breadcrumb Text", `Quản lý tra soát > Tra soát đã gửi > Chi tiết yêu cầu tra soát : ${code}`, 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", `Chi tiết yêu cầu tra soát ${code}`, 246, 108, { fontSize: 22, fill: "#0F172A" });

  return mainId;
}

// Hàm vẽ Khối 1: Bộ tiến trình
async function createStepBar(mainId, code, activeIndex, activeStatusText, isFailed = false) {
  const stepCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 1 - Tiến trình xử lý", x: 246, y: 150, width: 1174, height: 95, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const stepId = stepCard.result.id;

  const bgHex = isFailed ? '#FEF2F2' : '#EFF6FF';
  const accentHex = isFailed ? '#DC2626' : '#2563EB';

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor(bgHex), cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor(accentHex) });

  await createText(stepId, "Banner Left Text", `📊 BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT — TRẠNG THÁI: ${activeStatusText}`, 28, 18, { fontSize: 11.5, fill: accentHex });
  await createText(stepId, "Banner Right Code", `(${code})`, 1100, 18, { fontSize: 11, fill: accentHex });

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 80, y: 56, width: 1014, height: 3, fills: hexColor('#CBD5E1') });
  if (activeIndex > 0) {
    await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line Done", x: 80, y: 56, width: activeIndex * 169, height: 3, fills: hexColor('#16A34A') });
  }

  const stepsList = [
    { num: "1", text: "Chờ xử lý" },
    { num: "2", text: "Đã kiểm tra" },
    { num: "3", text: "Chờ phê duyệt" },
    { num: "4", text: "Đã duyệt" },
    { num: "5", text: isFailed ? "Xử lý thất bại" : "Chờ phản hồi" },
    { num: "6", text: "Đã phản hồi" },
    { num: "7", text: "Hoàn tất" }
  ];

  for (let i = 0; i < stepsList.length; i++) {
    const s = stepsList[i];
    const cx = 80 + i * 169;

    let circleBg = '#F1F5F9';
    let circleBorder = '#CBD5E1';
    let numColor = '#94A3B8';
    let textColor = '#94A3B8';

    if (i < activeIndex) {
      circleBg = '#16A34A'; circleBorder = '#16A34A'; numColor = '#FFFFFF'; textColor = '#16A34A';
    } else if (i === activeIndex) {
      circleBg = isFailed ? '#DC2626' : '#2563EB';
      circleBorder = isFailed ? '#DC2626' : '#2563EB';
      numColor = '#FFFFFF';
      textColor = isFailed ? '#DC2626' : '#2563EB';
    }

    await sendRpc("create", { type: "ELLIPSE", parentId: stepId, name: `Step Circle ${s.num}`, x: cx - 14, y: 44, width: 26, height: 26, fills: hexColor(circleBg), strokes: hexColor(circleBorder) });
    await createText(stepId, `Step Num ${s.num}`, s.num, cx - 4, 50, { fontSize: 11, fill: numColor });
    await createText(stepId, `Step Label ${s.num}`, s.text, cx - 28, 74, { fontSize: 9.5, fill: textColor });
  }
}

// Hàm vẽ Khối 2: Thông tin giao dịch gốc (3 Column Component Sub-Frames)
async function createOrigTxBlock(mainId, txCode, amount, date) {
  const origCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 2 - Thông tin giao dịch gốc", x: 246, y: 260, width: 1174, height: 160, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const origId = origCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: origId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(origId, "Header Title", "THÔNG TIN GIAO DỊCH GỐC", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const c0 = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 0 (352 Fill x 94 Hug)", x: 20, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c0.result.id, "Mã giao dịch:", txCode, 0, { valColor: "#2563eb" });
  await createColRowItem(c0.result.id, "Trạng thái giao dịch:", "● Thành công", 26, { valColor: "#16a34a" });
  await createColRowItem(c0.result.id, "Merchant code:", "PAYME_MERCHANT", 52);
  await createColRowItem(c0.result.id, "PTTT:", "VietQR", 78);

  const c1 = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 1 (352 Fill x 94 Hug)", x: 411, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c1.result.id, "Ngày giao dịch:", date, 0);
  await createColRowItem(c1.result.id, "Số tiền giao dịch:", amount, 26);
  await createColRowItem(c1.result.id, "Đối tác thanh toán:", "Napas", 52);
  await createColRowItem(c1.result.id, "Tên dịch vụ:", "Thanh toán VietQR", 78);

  const c2 = await sendRpc("create", { type: "FRAME", parentId: origId, name: "Component Col 2 (352 Fill x 94 Hug)", x: 802, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c2.result.id, "Loại giao dịch:", "Thanh toán", 0);
  await createColRowItem(c2.result.id, "Loại QR:", "Dynamic QR", 26);
  await createColRowItem(c2.result.id, "Mã đơn hàng (Order ID):", `ORD-${txCode.split('-')[1]}`, 52);
  await createColRowItem(c2.result.id, "Mã GD Epay:", "EPAYPW00339312", 78);
}

// HÀM VẼ KHỐI 3: THÔNG TIN TRA SOÁT ĐẦY ĐỦ 11 TRƯỜNG TIN + PROPOSAL CONTENT
async function createFullDisputeBlock(mainId, y, data) {
  const dspCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 3 - Thông tin tra soát (Full 11 trường)", x: 246, y: y, width: 1174, height: 235, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const dspId = dspCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(dspId, "Header Title", "THÔNG TIN TRA SOÁT", 16, 10, { fontSize: 12, fill: "#1E293B" });
  await createText(dspId, "Header Arrow", "▲", 1145, 10, { fontSize: 12, fill: "#475569" });

  // Column 0 Component (4 Rows: Mã TS, Trạng thái tra soát, Lý do tra soát, File minh chứng)
  const d0 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 0 (352 Fill x 114 Hug)", x: 20, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d0.result.id, "Mã tra soát:", data.code, 0, { valColor: "#0F172A" });
  await createColRowItem(d0.result.id, "Trạng thái tra soát:", data.statusText, 26, { valColor: data.statusColor || "#2563EB" });
  await createColRowItem(d0.result.id, "Lý do tra soát:", data.reason, 52);
  await createColRowItem(d0.result.id, "File minh chứng đính kèm:", data.fileName || "minh_chung.pdf 📎", 78, { valColor: "#2563eb" });

  // Column 1 Component (3 Rows: Vai trò tra soát, Trạng thái hết hạn, Số tiền tra soát)
  const d1 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 1 (352 Fill x 114 Hug)", x: 411, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d1.result.id, "Vai trò tra soát:", data.role || "TCYCTS", 0);
  await createColRowItem(d1.result.id, "Trạng thái hết hạn:", data.expireStatus || "● Chưa hết hạn", 26, { valColor: "#16A34A" });
  await createColRowItem(d1.result.id, "Số tiền tra soát:", data.amount, 52, { valColor: "#0F172A" });

  // Column 2 Component (4 Rows: Loại tra soát, Trạng thái xử lý tại Epay, Trạng thái xử lý tại đối tác, TCPL tra soát gốc)
  const d2 = await sendRpc("create", { type: "FRAME", parentId: dspId, name: "Component Col 2 (352 Fill x 114 Hug)", x: 802, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d2.result.id, "Loại tra soát:", data.type, 0);
  await createColRowItem(d2.result.id, "Trạng thái TS tại Epay:", data.epayStatus || "—", 26, { valColor: data.epayStatusColor || "#64748B" });
  await createColRowItem(d2.result.id, "Trạng thái TS đối tác:", data.partnerStatus || "—", 52, { valColor: data.partnerStatusColor || "#64748B" });
  await createColRowItem(d2.result.id, "TCPL tra soát gốc:", data.tcpl || "Napas / Epay", 78);

  // Dashed Line & Proposal Content
  await sendRpc("create", { type: "RECTANGLE", parentId: dspId, name: "Dashed Line Separator", x: 20, y: 175, width: 1134, height: 1, fills: hexColor('#E2E8F0') });
  await createText(dspId, "Proposal Title", "Nội dung đề nghị tra soát:", 20, 190, { fontSize: 11, fill: "#64748B" });
  await createText(dspId, "Proposal Content", data.proposalText, 180, 190, { fontSize: 11, fill: "#0F172A" });
}

// Hàm vẽ Khối 5: Audit Log Box
async function createAuditLogBlock(mainId, y, logs) {
  const auditCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối Audit Log - Lịch sử thay đổi", x: 246, y: y, width: 1174, height: 35 + logs.length * 24, fills: hexColor('#F8FAFC'), strokes: hexColor('#E2E8F0'), cornerRadius: 6
  });
  const auditId = auditCard.result.id;

  await createText(auditId, "Header Title", "Lịch sử thay đổi (Audit Log):", 16, 12, { fontSize: 12.5, fill: "#1E293B" });
  for (let i = 0; i < logs.length; i++) {
    await createText(auditId, `Audit Log ${i+1}`, logs[i], 16, 38 + i * 22, { fontSize: 11, fill: "#475569" });
  }
}

// --- REDRAW FUNCTIONS FOR ALL 9 SCREENS WITH FULL 11 FIELDS IN KHỐI 3 ---

// 1. TS-012 (Chờ xử lý)
async function redrawTS012() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-012 (Chờ xử lý)", 6000, 1200, "TS-012", "Chờ xử lý");
  await createStepBar(mainId, "TS-012", 0, "Chờ xử lý");
  await createOrigTxBlock(mainId, "TX-10012", "1,500,000 VND", "25/07/2026 14:20:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-012", statusText: "● Chờ xử lý", statusColor: "#2563EB", reason: "CUSTOMER — Khách hàng khiếu nại", fileName: "minh_chung.pdf 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "1,500,000 VND", type: "RQRN — Hoàn tiền", epayStatus: "—", partnerStatus: "—", tcpl: "Napas / Epay",
    proposalText: "Khách hàng báo bị trừ 2 lần tiền cho đơn hàng ORD-10012."
  });
  await createAuditLogBlock(mainId, 685, [
    "• 2026-07-25 14:20: Yêu cầu tra soát TS-012 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý"
  ]);
  console.log("✅ Đã vẽ lại TS-012 (Đầy đủ 11 trường Khối 3)");
}

// 2. TS-011 (Đã kiểm tra)
async function redrawTS011() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-011 (Đã kiểm tra)", 7500, 1200, "TS-011", "Đã kiểm tra");
  await createStepBar(mainId, "TS-011", 1, "Đã kiểm tra");
  await createOrigTxBlock(mainId, "TX-10011", "2,000,000 VND", "25/07/2026 10:00:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-011", statusText: "● Đã kiểm tra", statusColor: "#16A34A", reason: "BANK — Lỗi giao dịch", fileName: "log_trace_011.txt 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "2,000,000 VND", type: "RQRN — Hoàn tiền", epayStatus: "—", partnerStatus: "—", tcpl: "Napas / Epay",
    proposalText: "Kỹ thuật đã kiểm tra log hệ thống ghi nhận giao dịch thành công phía Epay."
  });
  await createAuditLogBlock(mainId, 685, [
    "• 2026-07-25 10:00: Yêu cầu tra soát TS-011 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý",
    "• 2026-07-25 10:30: inspector01 đã đối soát log hệ thống. Trạng thái cập nhật thành: Đã kiểm tra"
  ]);
  console.log("✅ Đã vẽ lại TS-011 (Đầy đủ 11 trường Khối 3)");
}

// 3. TS-001 (Chờ phê duyệt)
async function redrawTS001() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-001 (Chờ phê duyệt)", 9000, 1220, "TS-001", "Chờ phê duyệt");
  await createStepBar(mainId, "TS-001", 2, "Chờ phê duyệt");
  await createOrigTxBlock(mainId, "TX-10001", "5,000,000 VND", "25/07/2026 08:00:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-001", statusText: "● Chờ phê duyệt", statusColor: "#D97706", reason: "FRAU — Nghi ngờ gian lận", fileName: "minh_chung.pdf 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "5,000,000 VND", type: "RQRN — Hoàn tiền", epayStatus: "—", partnerStatus: "—", tcpl: "Napas / Epay",
    proposalText: "Nghi ngờ giao dịch gian lận thẻ, đề nghị lãnh đạo duyệt trình gửi tra soát Napas."
  });

  const apprCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin phê duyệt RBAC", x: 246, y: 685, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = apprCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(apprId, "Header Title", "THÔNG TIN PHÊ DUYỆT RBAC", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const a0 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(a0.result.id, "Thời gian tạo YCPD:", "25/07/2026 08:00:00", 26);

  const a1 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a1.result.id, "Người phê duyệt:", "tuandt (Đang chờ)", 0);
  await createColRowItem(a1.result.id, "Thời gian phê duyệt:", "—", 26);

  const a2 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a2.result.id, "Trạng thái YCPD:", "● Chờ phê duyệt", 0, { valColor: "#D97706" });

  await createAuditLogBlock(mainId, 830, [
    "• 2026-07-25 08:00: Yêu cầu tra soát TS-001 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý",
    "• 2026-07-25 08:30: inspector01 đã kiểm tra log và trình duyệt. Trạng thái cập nhật thành: Chờ phê duyệt"
  ]);
  console.log("✅ Đã vẽ lại TS-001 (Đầy đủ 11 trường Khối 3)");
}

// 4. TS-010 (Đã duyệt)
async function redrawTS010() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-010 (Đã duyệt)", 10500, 1220, "TS-010", "Đã duyệt");
  await createStepBar(mainId, "TS-010", 3, "Đã duyệt");
  await createOrigTxBlock(mainId, "TX-10010", "4,200,000 VND", "25/07/2026 14:20:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-010", statusText: "● Đã duyệt", statusColor: "#16A34A", reason: "BANK — Lỗi hệ thống", fileName: "minh_chung.pdf 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "4,200,000 VND", type: "RQRN — Hoàn tiền", epayStatus: "—", partnerStatus: "—", tcpl: "Napas / Epay",
    proposalText: "Lãnh đạo tuandt đã phê duyệt yêu cầu tra soát TS-010."
  });

  const apprCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin phê duyệt", x: 246, y: 685, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = apprCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(apprId, "Header Title", "THÔNG TIN PHÊ DUYỆT", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const a0 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(a0.result.id, "Thời gian tạo YCPD:", "25/07/2026 14:20:00", 26);

  const a1 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a1.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(a1.result.id, "Thời gian phê duyệt:", "25/07/2026 15:00:00", 26);

  const a2 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a2.result.id, "Trạng thái YCPD:", "● Đã duyệt", 0, { valColor: "#16A34A" });

  await createAuditLogBlock(mainId, 830, [
    "• 2026-07-25 14:20: Yêu cầu tra soát TS-010 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý",
    "• 2026-07-25 14:40: inspector01 đã kiểm tra log. Trạng thái cập nhật thành: Đã kiểm tra",
    "• 2026-07-25 15:00: tuandt đã phê duyệt yêu cầu. Trạng thái cập nhật thành: Đã duyệt"
  ]);
  console.log("✅ Đã vẽ lại TS-010 (Đầy đủ 11 trường Khối 3)");
}

// 5. TS-009 (Chờ phản hồi)
async function redrawTS009() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-009 (Chờ phản hồi)", 12000, 1220, "TS-009", "Chờ phản hồi");
  await createStepBar(mainId, "TS-009", 4, "Chờ phản hồi");
  await createOrigTxBlock(mainId, "TX-10009", "3,500,000 VND", "24/07/2026 09:30:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-009", statusText: "● Chờ phản hồi", statusColor: "#2563EB", reason: "BANK — Lỗi hệ thống", fileName: "minh_chung.pdf 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "3,500,000 VND", type: "RQSP — Sai sót nghiệp vụ", epayStatus: "● OPEN", epayStatusColor: "#2563EB", partnerStatus: "● OPEN", partnerStatusColor: "#2563EB", tcpl: "Napas / Epay",
    proposalText: "Giao dịch bị lỗi phía Napas, đề nghị đối tác xử lý hoàn trả."
  });

  const apprCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin phê duyệt", x: 246, y: 685, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = apprCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(apprId, "Header Title", "THÔNG TIN PHÊ DUYỆT", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const a0 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(a0.result.id, "Thời gian tạo YCPD:", "24/07/2026 09:30:00", 26);

  const a1 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a1.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(a1.result.id, "Thời gian phê duyệt:", "24/07/2026 10:00:00", 26);

  const a2 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a2.result.id, "Trạng thái YCPD:", "● Đã duyệt", 0, { valColor: "#16A34A" });

  await createAuditLogBlock(mainId, 830, [
    "• 2026-07-24 09:30: Yêu cầu tra soát TS-009 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý",
    "• 2026-07-24 09:45: inspector01 đã kiểm tra log. Trạng thái cập nhật thành: Đã kiểm tra",
    "• 2026-07-24 10:00: tuandt đã phê duyệt yêu cầu. Trạng thái cập nhật thành: Đã duyệt",
    "• 2026-07-24 10:05: Gửi điện tra soát sang đối tác Napas. Trạng thái cập nhật thành: Chờ phản hồi"
  ]);
  console.log("✅ Đã vẽ lại TS-009 (Đầy đủ 11 trường Khối 3)");
}

// 6. TS-003 (Đã phản hồi PRCD + Hoàn tiền)
async function redrawTS003() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-003 (Đã phản hồi)", 13500, 1320, "TS-003", "Đã phản hồi");
  await createStepBar(mainId, "TS-003", 5, "Đã phản hồi");
  await createOrigTxBlock(mainId, "TX-10003", "1,500,000 VND", "20/07/2026 10:15:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-003", statusText: "● Đã phản hồi", statusColor: "#16A34A", reason: "CUSTOMER — Khách hàng khiếu nại", fileName: "minh_chung.pdf 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "1,500,000 VND", type: "RQRN — Hoàn tiền", epayStatus: "● Đồng ý", epayStatusColor: "#16A34A", partnerStatus: "● PRCD", partnerStatusColor: "#16A34A", tcpl: "Napas / Epay",
    proposalText: "Giao dịch bị lỗi phía Napas, đề nghị đối tác xử lý hoàn trả."
  });

  const apprCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin phê duyệt", x: 246, y: 685, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = apprCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(apprId, "Header Title", "THÔNG TIN PHÊ DUYỆT", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const a0 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(a0.result.id, "Thời gian tạo YCPD:", "20/07/2026 10:15:00", 26);

  const a1 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a1.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(a1.result.id, "Thời gian phê duyệt:", "20/07/2026 11:00:00", 26);

  const a2 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a2.result.id, "Trạng thái YCPD:", "● Đã duyệt", 0, { valColor: "#16A34A" });

  const refCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 5 - Thông tin hoàn tiền", x: 246, y: 830, width: 1174, height: 145, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const refId = refCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: refId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(refId, "Header Title", "KHỐI THÔNG TIN HOÀN TIỀN (9 TRƯỜNG TIÊU CHUẨN)", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const r0 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 80, fills: [], strokes: [] });
  await createColRowItem(r0.result.id, "Mã GD hoàn trả:", "REF-10003", 0, { valColor: "#2563EB" });
  await createColRowItem(r0.result.id, "Loại giao dịch:", "Hoàn tiền GD tra soát", 26);
  await createColRowItem(r0.result.id, "Nguồn tiền hoàn:", "Tài khoản Napas / Epay", 52);

  const r1 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 80, fills: [], strokes: [] });
  await createColRowItem(r1.result.id, "Mã GD đối tác hoàn:", "PREF-10003", 0);
  await createColRowItem(r1.result.id, "Số tiền hoàn trả:", "1,500,000 VND", 26, { valColor: "#2563EB" });
  await createColRowItem(r1.result.id, "Thời gian tạo giao dịch:", "20/07/2026 11:05:00", 52);

  const r2 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 80, fills: [], strokes: [] });
  await createColRowItem(r2.result.id, "Trạng thái hoàn trả:", "● Thành công", 0, { valColor: "#16A34A" });
  await createColRowItem(r2.result.id, "Phí giao dịch:", "0 VND", 26);
  await createColRowItem(r2.result.id, "Thời gian hoàn tiền:", "20/07/2026 11:10:00", 52);

  await createAuditLogBlock(mainId, 990, [
    "• 2026-07-20 10:15: Yêu cầu tra soát TS-003 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý",
    "• 2026-07-20 10:45: inspector01 đã kiểm tra log. Trạng thái cập nhật thành: Đã kiểm tra",
    "• 2026-07-20 11:00: tuandt đã phê duyệt yêu cầu. Trạng thái cập nhật thành: Đã duyệt",
    "• 2026-07-20 11:02: Gửi điện tra soát tới Napas. Trạng thái: Chờ phản hồi",
    "• 2026-07-20 11:05: Napas phản hồi PRCD (Đồng ý hoàn tiền). Trạng thái cập nhật thành: Đã phản hồi",
    "• 2026-07-20 11:10: Khởi tạo giao dịch hoàn tiền REF-10003 thành công."
  ]);
  console.log("✅ Đã vẽ lại TS-003 (Đầy đủ 11 trường Khối 3)");
}

// 7. TS-005 (Đã phản hồi RJCD Từ chối)
async function redrawTS005() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-005 (Đã phản hồi RJCD)", 15000, 1220, "TS-005", "Đã phản hồi");
  await createStepBar(mainId, "TS-005", 5, "Đã phản hồi");
  await createOrigTxBlock(mainId, "TX-10005", "1,200,000 VND", "18/07/2026 08:30:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-005", statusText: "● Từ chối", statusColor: "#DC2626", reason: "BANK — Sai lệch dữ liệu", fileName: "minh_chung.pdf 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "1,200,000 VND", type: "RQSP — Sai sót nghiệp vụ", epayStatus: "● Từ chối", epayStatusColor: "#DC2626", partnerStatus: "● RJCD", partnerStatusColor: "#DC2626", tcpl: "Napas / Epay",
    proposalText: "Giao dịch bị lỗi phía Napas, đề nghị đối tác xử lý hoàn trả."
  });

  const apprCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin phê duyệt", x: 246, y: 685, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = apprCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(apprId, "Header Title", "THÔNG TIN PHÊ DUYỆT", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const a0 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(a0.result.id, "Thời gian tạo YCPD:", "18/07/2026 08:30:00", 26);

  const a1 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a1.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(a1.result.id, "Thời gian phê duyệt:", "18/07/2026 09:15:00", 26);

  const a2 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a2.result.id, "Trạng thái YCPD:", "● Đã duyệt", 0, { valColor: "#16A34A" });

  await createAuditLogBlock(mainId, 830, [
    "• 2026-07-18 08:30: Yêu cầu tra soát TS-005 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý",
    "• 2026-07-18 09:00: inspector01 đã kiểm tra log. Trạng thái cập nhật thành: Đã kiểm tra",
    "• 2026-07-18 09:15: tuandt đã phê duyệt yêu cầu. Trạng thái cập nhật thành: Đã duyệt",
    "• 2026-07-18 09:20: Gửi điện tra soát tới Napas. Trạng thái: Chờ phản hồi",
    "• 2026-07-18 10:00: Napas phản hồi RJCD (Từ chối tra soát). Trạng thái cập nhật thành: Từ chối"
  ]);
  console.log("✅ Đã vẽ lại TS-005 (Đầy đủ 11 trường Khối 3)");
}

// 8. TS-007 (Xử lý thất bại)
async function redrawTS007() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-007 (Xử lý thất bại)", 16500, 1220, "TS-007", "Xử lý thất bại");
  await createStepBar(mainId, "TS-007", 4, "Xử lý thất bại (Lỗi kết nối đối tác)", true);
  await createOrigTxBlock(mainId, "TX-10007", "1,800,000 VND", "23/07/2026 15:30:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-007", statusText: "● Xử lý thất bại", statusColor: "#DC2626", reason: "BANK — Lỗi kết nối timeout", fileName: "minh_chung.pdf 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "1,800,000 VND", type: "RQSP — Sai sót nghiệp vụ", epayStatus: "—", partnerStatus: "—", tcpl: "Napas / Epay",
    proposalText: "Giao dịch bị lỗi phía Napas, đề nghị đối tác xử lý hoàn trả."
  });

  const apprCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin phê duyệt", x: 246, y: 685, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = apprCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(apprId, "Header Title", "THÔNG TIN PHÊ DUYỆT", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const a0 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(a0.result.id, "Thời gian tạo YCPD:", "23/07/2026 15:30:00", 26);

  const a1 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a1.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(a1.result.id, "Thời gian phê duyệt:", "23/07/2026 16:00:00", 26);

  const a2 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a2.result.id, "Trạng thái YCPD:", "● Đã duyệt", 0, { valColor: "#16A34A" });

  await createAuditLogBlock(mainId, 830, [
    "• 2026-07-23 15:30: Yêu cầu tra soát TS-007 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý",
    "• 2026-07-23 15:45: inspector01 đã kiểm tra log. Trạng thái cập nhật thành: Đã kiểm tra",
    "• 2026-07-23 16:00: tuandt đã phê duyệt yêu cầu. Trạng thái cập nhật thành: Đã duyệt",
    "• 2026-07-23 16:05: Lỗi kết nối với đối tác Napas. Trạng thái cập nhật thành: Xử lý thất bại"
  ]);
  console.log("✅ Đã vẽ lại TS-007 (Đầy đủ 11 trường Khối 3)");
}

// 9. TS-008 (Hoàn tất)
async function redrawTS008() {
  const mainId = await createBaseScreen("Chi tiết YCTS TS-008 (Hoàn tất)", 18000, 1320, "TS-008", "Hoàn tất");
  await createStepBar(mainId, "TS-008", 6, "Hoàn tất");
  await createOrigTxBlock(mainId, "TX-10008", "950,000 VND", "15/07/2026 11:00:00");
  await createFullDisputeBlock(mainId, 435, {
    code: "TS-008", statusText: "● Hoàn tất", statusColor: "#16A34A", reason: "CUSTOMER — Yêu cầu hoàn tiền", fileName: "minh_chung.pdf 📎",
    role: "TCYCTS", expireStatus: "● Chưa hết hạn", amount: "950,000 VND", type: "RQRN — Hoàn tiền", epayStatus: "● Đồng ý", epayStatusColor: "#16A34A", partnerStatus: "● PRCD", partnerStatusColor: "#16A34A", tcpl: "Napas / Epay",
    proposalText: "Yêu cầu tra soát đã được đối tác hoàn tiền thành công và hạch toán hoàn tất."
  });

  const apprCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Thông tin phê duyệt", x: 246, y: 685, width: 1174, height: 130, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const apprId = apprCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: apprId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(apprId, "Header Title", "THÔNG TIN PHÊ DUYỆT", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const a0 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(a0.result.id, "Thời gian tạo YCPD:", "15/07/2026 11:00:00", 26);

  const a1 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a1.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(a1.result.id, "Thời gian phê duyệt:", "15/07/2026 11:30:00", 26);

  const a2 = await sendRpc("create", { type: "FRAME", parentId: apprId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(a2.result.id, "Trạng thái YCPD:", "● Đã duyệt", 0, { valColor: "#16A34A" });

  const refCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 5 - Thông tin hoàn tiền", x: 246, y: 830, width: 1174, height: 145, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const refId = refCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: refId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(refId, "Header Title", "KHỐI THÔNG TIN HOÀN TIỀN (9 TRƯỜNG TIÊU CHUẨN)", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const r0 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 0", x: 20, y: 48, width: 352, height: 80, fills: [], strokes: [] });
  await createColRowItem(r0.result.id, "Mã GD hoàn trả:", "REF-10008", 0, { valColor: "#2563EB" });
  await createColRowItem(r0.result.id, "Loại giao dịch:", "Hoàn tiền GD tra soát", 26);
  await createColRowItem(r0.result.id, "Nguồn tiền hoàn:", "Tài khoản Napas / Epay", 52);

  const r1 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 1", x: 411, y: 48, width: 352, height: 80, fills: [], strokes: [] });
  await createColRowItem(r1.result.id, "Mã GD đối tác hoàn:", "PREF-10008", 0);
  await createColRowItem(r1.result.id, "Số tiền hoàn trả:", "950,000 VND", 26, { valColor: "#2563EB" });
  await createColRowItem(r1.result.id, "Thời gian tạo giao dịch:", "15/07/2026 12:00:00", 52);

  const r2 = await sendRpc("create", { type: "FRAME", parentId: refId, name: "Component Col 2", x: 802, y: 48, width: 352, height: 80, fills: [], strokes: [] });
  await createColRowItem(r2.result.id, "Trạng thái hoàn trả:", "● Thành công", 0, { valColor: "#16A34A" });
  await createColRowItem(r2.result.id, "Phí giao dịch:", "0 VND", 26);
  await createColRowItem(r2.result.id, "Thời gian hoàn tiền:", "15/07/2026 12:05:00", 52);

  await createAuditLogBlock(mainId, 990, [
    "• 2026-07-15 11:00: Yêu cầu tra soát TS-008 được khởi tạo bởi nhannt. Trạng thái: Chờ xử lý",
    "• 2026-07-15 11:15: inspector01 đã kiểm tra log. Trạng thái cập nhật thành: Đã kiểm tra",
    "• 2026-07-15 11:30: tuandt đã phê duyệt yêu cầu. Trạng thái cập nhật thành: Đã duyệt",
    "• 2026-07-15 11:35: Gửi điện tra soát tới Napas. Trạng thái: Chờ phản hồi",
    "• 2026-07-15 12:00: Napas phản hồi PRCD (Đồng ý hoàn tiền). Trạng thái cập nhật thành: Đã phản hồi",
    "• 2026-07-15 12:05: Hoàn tiền thành công. Trạng thái cập nhật thành: Hoàn tất"
  ]);
  console.log("✅ Đã vẽ lại TS-008 (Đầy đủ 11 trường Khối 3)");
}

async function runAll() {
  console.log("🚀 Bắt đầu vẽ lại toàn bộ 9 màn hình chi tiết với ĐẦY ĐỦ 11 TRƯỜNG TIN KHỐI THÔNG TIN TRA SOÁT...");
  await redrawTS012();
  await redrawTS011();
  await redrawTS001();
  await redrawTS010();
  await redrawTS009();
  await redrawTS003();
  await redrawTS005();
  await redrawTS007();
  await redrawTS008();
  console.log("🎉 ĐÃ BỔ SUNG ĐẦY ĐỦ 100% CÁC TRƯỜNG TIN KHỐI THÔNG TIN TRA SOÁT CHO TẤT CẢ CÁC MÀN HÌNH CHI TIẾT!");
}

runAll().catch(console.error);
