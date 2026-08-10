import http from 'node:http';
import fs from 'node:fs';

function getLeaderToken() {
  try {
    const leaderPath = "C:\\Users\\duongnta\\AppData\\Local\\Temp\\reqwise-figma-mcp\\leader.json";
    if (fs.existsSync(leaderPath)) {
      const data = JSON.parse(fs.readFileSync(leaderPath, 'utf8'));
      if (data && data.token) return data.token;
    }
  } catch(e) {}
  return "cb9ce3d109105c2c44925e1da92f524f5a5aa9df1499bc39";
}

const token = getLeaderToken();

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

async function safeCreate(params, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await sendRpc("create", params);
    if (res && res.result && res.result.id) {
      return res;
    }
    await new Promise(r => setTimeout(r, 200));
  }
  throw new Error(`Failed to create node ${params.name} after ${retries} retries`);
}

async function createText(parentId, name, textContent, x, y, options = {}) {
  const res = await safeCreate({
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
  
  await safeCreate({
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

async function drawDetailTS019() {
  const frameName = "Chi tiết YCTS đã nhận TS-019 (TLTS - Đã phản hồi RJCD & Khối Báo nợ Thành công)";
  console.log(`🚀 Bắt đầu vẽ lại Màn hình Chi tiết TS-019 (TLTS - Giữ nguyên thông tin & Bổ sung Khối Báo nợ Thành công)...`);

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Chi tiết YCTS đã nhận TS-019" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // Main Canvas tại x = 27000 (1440 x 1820)
  const mainCanvas = await safeCreate({
    type: "FRAME",
    name: frameName,
    x: 27000,
    y: 0,
    width: 1440,
    height: 1820,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  const mainId = mainCanvas.result.id;

  // Sidebar (220 x 1820)
  const sidebar = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Sidebar", x: 0, y: 0, width: 220, height: 1820, fills: hexColor('#3B82F6')
  });
  const sidebarId = sidebar.result.id;

  await safeCreate({ type: "ELLIPSE", parentId: sidebarId, name: "Logo Circle", x: 20, y: 45, width: 32, height: 32, fills: hexColor('#FFFFFF') });
  await createText(sidebarId, "Logo Letter", "e", 30, 49, { fontSize: 18, fill: "#3B82F6" });
  await createText(sidebarId, "Brand Name", "epay Portal", 60, 50, { fontSize: 18, fill: "#FFFFFF" });
  await safeCreate({ type: "RECTANGLE", parentId: sidebarId, name: "Divider Line", x: 20, y: 90, width: 180, height: 1, fills: hexColor('#60A5FA') });

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

  const submenuContainer = await safeCreate({
    type: "FRAME", parentId: sidebarId, name: "Submenu Container", x: 8, y: 470, width: 204, height: 76, fills: hexColor('#2563EB'), cornerRadius: 8
  });
  const subId = submenuContainer.result.id;
  await createText(subId, "Sub 1 Text", "☕  Tra soát đã gửi", 20, 14, { fontSize: 12, fill: "#FFFFFF" });
  await safeCreate({ type: "RECTANGLE", parentId: subId, name: "Sub 2 Active Pill", x: 4, y: 40, width: 196, height: 32, fills: hexColor('#FFFFFF'), cornerRadius: 16 });
  await createText(subId, "Sub 2 Text", "📥  Tra soát đã nhận", 20, 48, { fontSize: 12, fill: "#3B82F6" });

  // Topbar
  const topbar = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Topbar", x: 220, y: 0, width: 1220, height: 64, fills: hexColor('#FFFFFF'), strokes: hexColor('#E2E8F0')
  });
  const topbarId = topbar.result.id;
  await safeCreate({ type: "RECTANGLE", parentId: topbarId, name: "Search Input Box", x: 26, y: 16, width: 300, height: 32, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 16 });
  await createText(topbarId, "Search Placeholder", "🔍  Tìm kiếm hệ thống...", 42, 23, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(topbarId, "Help Text", "❓  Trợ giúp", 770, 24, { fontSize: 12, fill: "#EF4444" });
  await createText(topbarId, "Bell Icon", "🔔", 860, 23, { fontSize: 14 });
  await createText(topbarId, "Gear Icon", "⚙", 896, 23, { fontSize: 14, fill: "#64748B" });
  await safeCreate({ type: "RECTANGLE", parentId: topbarId, name: "Vertical Red Line", x: 930, y: 16, width: 1.5, height: 32, fills: hexColor('#EF4444') });
  await safeCreate({ type: "ELLIPSE", parentId: topbarId, name: "Avatar Circle", x: 950, y: 16, width: 32, height: 32, fills: hexColor('#EF4444') });
  await createText(topbarId, "Avatar Initial", "L", 961, 23, { fontSize: 13, fill: "#FFFFFF" });
  await createText(topbarId, "User Account Name", "Lisa (epay Portal)  ▼", 994, 24, { fontSize: 12.5, fill: "#0F172A" });

  // Breadcrumb
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã nhận > Chi tiết yêu cầu tra soát : TS-019", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Chi tiết yêu cầu tra soát đã nhận TS-019", 246, 108, { fontSize: 22, fill: "#0F172A" });

  // KHỐI 1: BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT ĐÃ NHẬN (GIỮ NGUYÊN BẢN TS-019)
  const stepCard = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Khối 1 - Tiến trình xử lý TLTS", x: 246, y: 150, width: 1174, height: 95, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const stepId = stepCard.result.id;

  await safeCreate({ type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor('#FEF2F2'), cornerRadius: 4 });
  await safeCreate({ type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor('#EF4444') });

  await createText(stepId, "Banner Left Text", "📊 BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT ĐÃ NHẬN — TRẠNG THÁI: Đã phản hồi (Mã RJCD Từ chối Báo có)", 28, 18, { fontSize: 11.5, fill: "#EF4444" });
  await createText(stepId, "Banner Right Code", "(TS-019)", 1100, 18, { fontSize: 11, fill: "#EF4444" });

  await safeCreate({ type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 100, y: 56, width: 974, height: 3, fills: hexColor('#CBD5E1') });

  const tltsSteps = [
    { num: "1", text: "Chờ xử lý", done: true },
    { num: "2", text: "Chờ phê duyệt", done: true },
    { num: "3", text: "Đã duyệt", done: true },
    { num: "4", text: "Chờ phản hồi", done: true },
    { num: "5", text: "Đã phản hồi", reject: true },
    { num: "6", text: "Hoàn tất" }
  ];

  for (let i = 0; i < tltsSteps.length; i++) {
    const s = tltsSteps[i];
    const cx = 100 + i * 194;

    let circleBg = '#F1F5F9';
    let circleBorder = '#CBD5E1';
    let numColor = '#94A3B8';
    let textColor = '#94A3B8';

    if (s.done) {
      circleBg = '#2563EB'; circleBorder = '#2563EB'; numColor = '#FFFFFF'; textColor = '#2563EB';
    } else if (s.reject) {
      circleBg = '#EF4444'; circleBorder = '#EF4444'; numColor = '#FFFFFF'; textColor = '#EF4444';
    }

    await safeCreate({ type: "ELLIPSE", parentId: stepId, name: `Step Circle ${s.num}`, x: cx - 14, y: 44, width: 26, height: 26, fills: hexColor(circleBg), strokes: hexColor(circleBorder) });
    await createText(stepId, `Step Num ${s.num}`, s.num, cx - 4, 50, { fontSize: 11, fill: numColor });
    await createText(stepId, `Step Label ${s.num}`, s.text, cx - 28, 74, { fontSize: 9.5, fill: textColor });
  }

  // KHỐI 2: THÔNG TIN GIAO DỊCH GỐC (GIỮ NGUYÊN BẢN TS-019)
  const origTxCard = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Khối 2 - Thông tin giao dịch gốc", x: 246, y: 260, width: 1174, height: 160, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const origId = origTxCard.result.id;

  await safeCreate({ type: "RECTANGLE", parentId: origId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(origId, "Header Title", "THÔNG TIN GIAO DỊCH GỐC", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const c0 = await safeCreate({ type: "FRAME", parentId: origId, name: "Component Col 0", x: 20, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c0.result.id, "Mã giao dịch:", "TX-10019", 0, { valColor: "#2563eb" });
  await createColRowItem(c0.result.id, "Trạng thái giao dịch:", "● Thành công", 26, { valColor: "#16a34a" });
  await createColRowItem(c0.result.id, "Merchant code:", "PAYME_MERCHANT", 52);
  await createColRowItem(c0.result.id, "PTTT:", "VietQR", 78);

  const c1 = await safeCreate({ type: "FRAME", parentId: origId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c1.result.id, "Ngày giao dịch:", "22/07/2026 08:00:00", 0);
  await createColRowItem(c1.result.id, "Số tiền giao dịch:", "3,000,000 VND", 26);
  await createColRowItem(c1.result.id, "Đối tác thanh toán:", "Napas", 52);
  await createColRowItem(c1.result.id, "Tên dịch vụ:", "Thanh toán VietQR", 78);

  const c2 = await safeCreate({ type: "FRAME", parentId: origId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(c2.result.id, "Loại giao dịch:", "Thanh toán", 0);
  await createColRowItem(c2.result.id, "Loại QR:", "Dynamic QR", 26);
  await createColRowItem(c2.result.id, "Mã đơn hàng (Order ID):", "ORD-10019", 52);
  await createColRowItem(c2.result.id, "Mã GD Epay:", "EPAYPW00339319", 78);

  // KHỐI 3: THÔNG TIN TRA SOÁT ĐÃ NHẬN (GIỮ NGUYÊN BẢN TS-019)
  const dspCard = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Khối 3 - Thông tin tra soát", x: 246, y: 435, width: 1174, height: 215, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const dspId = dspCard.result.id;

  await safeCreate({ type: "RECTANGLE", parentId: dspId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F8FAFC') });
  await createText(dspId, "Header Title", "THÔNG TIN TRA SOÁT ĐÃ NHẬN", 16, 10, { fontSize: 12, fill: "#1E293B" });

  const d0 = await safeCreate({ type: "FRAME", parentId: dspId, name: "Component Col 0", x: 20, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d0.result.id, "Mã tra soát:", "TS-019", 0);
  await createBadgeItem(d0.result.id, "Trạng thái YCTS:", "Đã phản hồi", 26, '#FEE2E2', '#991B1B', 90);
  await createColRowItem(d0.result.id, "Mã loại tra soát:", "RQSP (Sai sót)", 52, { valColor: "#3b82f6" });
  await createColRowItem(d0.result.id, "Lý do (RQSP):", "BANK (Sai sót ngân hàng)", 78, { valColor: "#d97706" });

  const d1 = await safeCreate({ type: "FRAME", parentId: dspId, name: "Component Col 1", x: 411, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d1.result.id, "Chiều tra soát:", "TLTS (Tra soát đã nhận)", 0);
  await createBadgeItem(d1.result.id, "Trạng thái hết hạn:", "Chưa hết hạn", 26, '#DCFCE7', '#166534', 90);
  await createColRowItem(d1.result.id, "Thời gian tạo YCTS:", "22/07/2026 08:30:00", 52);
  await createColRowItem(d1.result.id, "Thời gian xử lý YCTS:", "22/07/2026 10:15:00", 78);

  const d2 = await safeCreate({ type: "FRAME", parentId: dspId, name: "Component Col 2", x: 802, y: 46, width: 352, height: 114, fills: [], strokes: [] });
  await createColRowItem(d2.result.id, "Trạng thái xử lý tại Epay:", "RJCD", 0, { valColor: "#dc2626" });
  await createColRowItem(d2.result.id, "Trạng thái xử lý tại đối tác:", "RJCD", 26, { valColor: "#dc2626" });
  await createColRowItem(d2.result.id, "Tệp minh chứng đính kèm:", "ycts-rqsp-019.pdf", 52, { valColor: "#2563eb" });
  await createColRowItem(d2.result.id, "Ghi chú tra soát:", "Từ chối báo có do sai lệch thông tin sao kê", 78);

  // KHỐI 4: KHỐI THÔNG TIN XÁC NHẬN PHÊ DUYỆT (RBAC) (GIỮ NGUYÊN BẢN TS-019)
  const rbacInfoCard = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Khối Thông tin xác nhận phê duyệt RBAC", x: 246, y: 665, width: 1174, height: 115, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const rbacInfoId = rbacInfoCard.result.id;

  await safeCreate({ type: "RECTANGLE", parentId: rbacInfoId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(rbacInfoId, "Header Title", "THÔNG TIN XÁC NHẬN PHÊ DUYỆT (RBAC)", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const rb0 = await safeCreate({ type: "FRAME", parentId: rbacInfoId, name: "Component Col 0", x: 20, y: 44, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(rb0.result.id, "Người YCPD:", "nhannt", 0);
  await createColRowItem(rb0.result.id, "Thời gian tạo YCPD:", "22/07/2026 08:30:00", 26);

  const rb1 = await safeCreate({ type: "FRAME", parentId: rbacInfoId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(rb1.result.id, "Người phê duyệt:", "tuandt", 0);
  await createColRowItem(rb1.result.id, "Thời gian phê duyệt:", "22/07/2026 09:15:00", 26);

  const rb2 = await safeCreate({ type: "FRAME", parentId: rbacInfoId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 60, fills: [], strokes: [] });
  await createColRowItem(rb2.result.id, "Trạng thái YCPD:", "● Đã duyệt", 0, { valColor: "#16A34A" });

  // KHỐI 5: KHỐI THÔNG TIN BÁO CÓ TỪ CHỐI (GIỮ NGUYÊN BẢN TS-019)
  const creditCard = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Khối 5 - Thông tin giao dịch báo có từ chối", x: 246, y: 795, width: 1174, height: 160, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const creditId = creditCard.result.id;

  await safeCreate({ type: "RECTANGLE", parentId: creditId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(creditId, "Header Title", "THÔNG TIN GIAO DỊCH BÁO CÓ TỪ CHỐI (RJCD)", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const r0 = await safeCreate({ type: "FRAME", parentId: creditId, name: "Component Col 0", x: 20, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(r0.result.id, "Mã GD báo có:", "CR-10019", 0, { valColor: "#2563eb" });
  await createColRowItem(r0.result.id, "Số tiền báo có:", "3,000,000 VND", 26, { valColor: "#dc2626" });
  await createColRowItem(r0.result.id, "Loại báo có:", "Báo có điều chỉnh sai sót", 52);

  const r1 = await safeCreate({ type: "FRAME", parentId: creditId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(r1.result.id, "Mã GD báo có đối tác:", "NPS-CR-019", 0);
  await createColRowItem(r1.result.id, "Trạng thái báo có:", "❌ Từ chối (RJCD phát hành)", 26, { valColor: "#dc2626" });
  await createColRowItem(r1.result.id, "Mã lỗi:", "99 (Từ chối báo có)", 52, { valColor: "#dc2626" });

  const r2 = await safeCreate({ type: "FRAME", parentId: creditId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(r2.result.id, "Thời gian phản hồi:", "22/07/2026 10:15:00", 0);
  await createColRowItem(r2.result.id, "Người phản hồi:", "tuandt", 26);
  await createColRowItem(r2.result.id, "Lý do từ chối:", "Không tìm thấy điện chuyển tiền ngân hàng khớp lệnh", 52, { valColor: "#dc2626" });

  // 🌟 KHỐI 6 BỔ SUNG: KHỐI THÔNG TIN BÁO NỢ (TRẠNG THÁI THÀNH CÔNG)
  const debitCard = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Khối 6 - Khối thông tin báo nợ", x: 246, y: 970, width: 1174, height: 160, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const debitId = debitCard.result.id;

  await safeCreate({ type: "RECTANGLE", parentId: debitId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F1F5F9') });
  await createText(debitId, "Header Title", "💳 KHỐI THÔNG TIN BÁO NỢ (DEBIT TRANSACTION DETAILS)", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const deb0 = await safeCreate({ type: "FRAME", parentId: debitId, name: "Component Col 0", x: 20, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(deb0.result.id, "Mã GD báo nợ:", "DR-10019", 0, { valColor: "#2563eb" });
  await createColRowItem(deb0.result.id, "Số tiền báo nợ:", "3,000,000 VND", 26, { valColor: "#0F172A" });

  const deb1 = await safeCreate({ type: "FRAME", parentId: debitId, name: "Component Col 1", x: 411, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(deb1.result.id, "Mã GD báo nợ đối tác:", "NPS-DR-019", 0);
  await createColRowItem(deb1.result.id, "Loại báo nợ:", "Báo nợ thu hồi sai sót", 26);

  const deb2 = await safeCreate({ type: "FRAME", parentId: debitId, name: "Component Col 2", x: 802, y: 44, width: 352, height: 104, fills: [], strokes: [] });
  await createColRowItem(deb2.result.id, "Thời gian tiếp nhận:", "22/07/2026 10:15:00", 0);
  await createBadgeItem(deb2.result.id, "Trạng thái báo nợ:", "Thành công", 26, '#DCFCE7', '#166534', 85);

  // KHỐI 7: LỊCH SỬ THAY ĐỔI / NHẬT KÝ TIẾN TRÌNH THỜI GIAN (AUDIT TRAIL TIMELINE)
  const auditCard = await safeCreate({
    type: "FRAME", parentId: mainId, name: "Khối 7 - Lịch sử thay đổi Audit Trail Timeline", x: 246, y: 1145, width: 1174, height: 165, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const auditId = auditCard.result.id;

  await safeCreate({ type: "RECTANGLE", parentId: auditId, name: "Header BG", x: 1, y: 1, width: 1172, height: 34, fills: hexColor('#F8FAFC') });
  await createText(auditId, "Header Title", "⏱️ LỊCH SỬ THAY ĐỔI / NHẬT KÝ TIẾN TRÌNH THỜI GIAN (AUDIT TRAIL TIMELINE)", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  const logs = [
    { time: "22/07/2026 08:00:00", actor: "API Gateway Napas", action: "Khởi tạo YCTS thụ động TS-019 (RQSP BANK - 3,000,000 VND). Trạng thái: Chờ xử lý" },
    { time: "22/07/2026 08:30:00", actor: "nhannt (Maker)", action: "Cập nhật phản hồi RJCD (Từ chối) + Tạo đề xuất Từ chối Báo có CR-10019 (Chờ phê duyệt)" },
    { time: "22/07/2026 09:15:00", actor: "tuandt (Checker)", action: "Phê duyệt đề xuất Từ chối RJCD. Trạng thái cập nhật thành: Đã duyệt" },
    { time: "22/07/2026 10:15:00", actor: "System Core Epay", action: "Phát hành kết quả RJCD sang cổng Napas & Hạch toán Báo nợ DR-10019 thành công. Trạng thái: Đã phản hồi" }
  ];

  for (let i = 0; i < logs.length; i++) {
    const l = logs[i];
    const ly = 46 + i * 24;
    await safeCreate({ type: "ELLIPSE", parentId: auditId, name: `Dot ${i}`, x: 20, y: ly + 4, width: 6, height: 6, fills: hexColor('#2563EB') });
    await createText(auditId, `Log Time ${i}`, l.time, 34, ly, { fontSize: 11, fill: "#64748B" });
    await createText(auditId, `Log Actor ${i}`, `[${l.actor}]`, 175, ly, { fontSize: 11, fill: "#2563EB" });
    await createText(auditId, `Log Action ${i}`, l.action, 310, ly, { fontSize: 11, fill: "#0F172A" });
  }

  console.log("🎉 ĐÃ VẼ LẠI TS-019 GIỮ NGUYÊN 100% THÔNG TIN GỐC VÀ BỔ SUNG KHỐI THÔNG TIN BÁO NỢ THÀNH CÔNG!");
}

drawDetailTS019().catch(console.error);
