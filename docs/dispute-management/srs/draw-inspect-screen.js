import http from 'node:http';
import fs from 'node:fs';

function getLeaderToken() {
  try {
    const leaderPath = "C:\\Users\\duongnta\\AppData\\Local\\Temp\\reqwise-figma-mcp\\leader.json";
    if (fs.existsSync(leaderPath)) {
      const data = JSON.parse(fs.readFileSync(leaderPath, 'utf8'));
      if (data && data.token) return data.token;
    }
  } catch (e) {}
  return "0b59d21459c20766e68e805a20caf5aa1d31d9c55174b902";
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

async function drawInspectScreen() {
  console.log("🚀 Bắt đầu vẽ Màn hình Kiểm tra Kỹ thuật / Kế toán (BF29.1-UC-SENT-04) lên Figma với Token:", token);

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Màn hình Kiểm tra YCTS (Role Kỹ thuật / Kế toán - UC-SENT-04)" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Không tìm thấy frame cũ, tiếp tục tạo mới...");
  }

  // Main Canvas tại x = 11000 (1440 x 980)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Màn hình Kiểm tra YCTS (Role Kỹ thuật / Kế toán - UC-SENT-04)",
    x: 11000,
    y: 0,
    width: 1440,
    height: 980,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  if (!mainCanvas || !mainCanvas.result || !mainCanvas.result.id) {
    console.error("❌ Lỗi tạo Main Canvas:", mainCanvas);
    return;
  }
  const mainId = mainCanvas.result.id;

  // Sidebar (220 x 980)
  const sidebar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Sidebar", x: 0, y: 0, width: 220, height: 980, fills: hexColor('#3B82F6')
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
  await createText(topbarId, "Avatar Initial", "L", 961, 23, { fontSize: 13, fill: "#FFFFFF" });
  await createText(topbarId, "User Account Name", "Lisa (epay Portal)  ▼", 994, 24, { fontSize: 12.5, fill: "#0F172A" });

  // Breadcrumb & Page Title
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã gửi > Màn hình Kiểm tra YCTS (Role Kỹ thuật / Kế toán)", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Kiểm tra & Xác nhận YCTS đang ở trạng thái Chờ xử lý (BF29.1-UC-SENT-04)", 246, 108, { fontSize: 20, fill: "#0F172A" });

  // KHỐI 1: BANNER TRẠNG THÁI TIẾN TRÌNH (CHỜ XỬ LÝ)
  const stepCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 1 - Tiến trình xử lý Banner", x: 246, y: 150, width: 1174, height: 95, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const stepId = stepCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner BG", x: 16, y: 12, width: 1142, height: 28, fills: hexColor('#FEF3C7'), cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Banner Accent Bar", x: 16, y: 12, width: 4, height: 28, fills: hexColor('#D97706') });

  await createText(stepId, "Banner Left Text", "🔍 MÀN HÌNH XÁC NHẬN KIỂM TRA DÀNH CHO ROLE KỸ THUẬT / KẾ TOÁN — TRẠNG THÁI BẢN GHI: Chờ xử lý (Pending)", 28, 18, { fontSize: 11.5, fill: "#B45309" });
  await createText(stepId, "Banner Right Code", "(TS-004)", 1100, 18, { fontSize: 11, fill: "#B45309" });

  await sendRpc("create", { type: "RECTANGLE", parentId: stepId, name: "Step Line BG", x: 80, y: 56, width: 1014, height: 3, fills: hexColor('#E2E8F0') });

  const stepsList = [
    { num: "1", text: "Chờ xử lý", active: true },
    { num: "2", text: "Đã kiểm tra" },
    { num: "3", text: "Chờ phê duyệt" },
    { num: "4", text: "Đã duyệt" },
    { num: "5", text: "Chờ phản hồi" },
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

    if (s.active) {
      circleBg = '#D97706'; circleBorder = '#D97706'; numColor = '#FFFFFF'; textColor = '#D97706';
    }

    await sendRpc("create", { type: "ELLIPSE", parentId: stepId, name: `Step Circle ${s.num}`, x: cx - 14, y: 44, width: 26, height: 26, fills: hexColor(circleBg), strokes: hexColor(circleBorder) });
    await createText(stepId, `Step Num ${s.num}`, s.num, cx - 4, 50, { fontSize: 11, fill: numColor });
    await createText(stepId, `Step Label ${s.num}`, s.text, cx - 28, 74, { fontSize: 9.5, fill: textColor });
  }

  // KHỐI 2: THÔNG TIN HỒ SƠ YCTS CẦN KIỂM TRA (READ-ONLY CONTEXT)
  const contextCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 2 - Thông tin YCTS Chờ xử lý", x: 246, y: 260, width: 1174, height: 180, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const ctxId = contextCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: ctxId, name: "Header BG", x: 1, y: 1, width: 1172, height: 36, fills: hexColor('#F1F5F9') });
  await createText(ctxId, "Header Title", "THÔNG TIN HOÀN CẢNH BẢN GHI TRA SOÁT CHỜ XỬ LÝ (READ-ONLY CONTEXT)", 16, 10, { fontSize: 11.5, fill: "#1E293B" });

  await createSplitGridRow(ctxId, "Mã tra soát:", "TS-004", 20, 370, 48, { valColor: "#2563EB" });
  await createSplitGridRow(ctxId, "Mã giao dịch gốc:", "TX-10004", 20, 370, 74, { valColor: "#2563EB" });
  await createSplitGridRow(ctxId, "Lý do tra soát:", "CUSTOMER — Khách hàng khiếu nại", 20, 370, 100);
  await createSplitGridRow(ctxId, "Thời gian tạo YCTS:", "20/07/2026 09:30:00", 20, 370, 126);

  await createSplitGridRow(ctxId, "Loại tra soát:", "RQRN — Hoàn tiền", 400, 750, 48);
  await createSplitGridRow(ctxId, "ĐVCNTT / Cửa hàng:", "CH Petrolimex 02", 400, 750, 74);
  await createSplitGridRow(ctxId, "Người tạo:", "nhannt (Chuyên viên Đối soát)", 400, 750, 100);
  await createSplitGridRow(ctxId, "Trạng thái hết hạn:", "Chưa hết hạn", 400, 750, 126, { valColor: "#16A34A" });

  await createSplitGridRow(ctxId, "Số tiền tra soát:", "2,500,000 VND", 780, 1150, 48, { valColor: "#2563EB" });
  await createSplitGridRow(ctxId, "Kênh thanh toán:", "QRGW Dynamic QR", 780, 1150, 74);
  await createSplitGridRow(ctxId, "Số tiền gốc:", "2,500,000 VND", 780, 1150, 100);
  await createSplitGridRow(ctxId, "Trạng thái YCTS:", "🟡 Chờ xử lý", 780, 1150, 126, { valColor: "#D97706" });

  await sendRpc("create", { type: "RECTANGLE", parentId: ctxId, name: "Line Separator", x: 20, y: 150, width: 1134, height: 1, fills: hexColor('#E2E8F0') });
  await createText(ctxId, "Desc Label", "Mô tả khiếu nại:", 20, 158, { fontSize: 11, fill: "#64748B" });
  await createText(ctxId, "Desc Text", "Khách hàng bị trừ tiền 2 lần cho đơn hàng ORD-10004 tại trụ bơm 02 do sự cố timeout mạng.", 130, 158, { fontSize: 11, fill: "#0F172A" });

  // KHỐI 3: KHỐI FORM THAO TÁC RÀ SOÁT & XÁC NHẬN CỦA KỸ THUẬT / KẾ TOÁN
  const formCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 3 - Form Thao tác Rà soát Kỹ thuật / Kế toán", x: 246, y: 455, width: 1174, height: 380, fills: hexColor('#FFFFFF'), strokes: hexColor('#3B82F6'), cornerRadius: 6
  });
  const formId = formCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: formId, name: "Header BG", x: 1, y: 1, width: 1172, height: 38, fills: hexColor('#EFF6FF') });
  await createText(formId, "Header Title", "🔍 FORM THAO TÁC RÀ SOÁT DỮ LIỆU & XÁC NHẬN ĐÃ KIỂM TRA (ROLE KỸ THUẬT / KẾ TOÁN)", 16, 11, { fontSize: 12.5, fill: "#1E40AF" });

  // Thành phần 1: Radio group chọn loại kiểm tra
  await createText(formId, "Radio Group Label", "Phân loại đối soát rà soát dữ liệu *", 20, 55, { fontSize: 11.5, fill: "#1E293B" });

  // Radio 1 (Selected - Kỹ thuật)
  await sendRpc("create", { type: "ELLIPSE", parentId: formId, name: "Radio 1 Circle", x: 20, y: 78, width: 16, height: 16, fills: hexColor('#FFFFFF'), strokes: hexColor('#2563EB') });
  await sendRpc("create", { type: "ELLIPSE", parentId: formId, name: "Radio 1 Dot", x: 24, y: 82, width: 8, height: 8, fills: hexColor('#2563EB') });
  await createText(formId, "Radio 1 Text", "Kỹ thuật đối soát hệ thống (IT Inspector — Rà soát Log QRGW / Gateway / DB Partner)", 42, 79, { fontSize: 11.5, fill: "#0F172A" });

  // Radio 2 (Unselected - Kế toán)
  await sendRpc("create", { type: "ELLIPSE", parentId: formId, name: "Radio 2 Circle", x: 540, y: 78, width: 16, height: 16, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1') });
  await createText(formId, "Radio 2 Text", "Kế toán đối soát số liệu (Accounting — Rà soát số dư dòng tiền đối soát)", 562, 79, { fontSize: 11.5, fill: "#475569" });

  // Thành phần 2: Textarea Ghi chú rà soát
  await createText(formId, "Textarea Label", "Ghi chú kết quả rà soát dữ liệu * (Bắt buộc nhập chi tiết để trình duyệt)", 20, 115, { fontSize: 11.5, fill: "#1E293B" });
  
  const textareaBox = await sendRpc("create", {
    type: "FRAME", parentId: formId, name: "Textarea Box", x: 20, y: 135, width: 1134, height: 100, fills: hexColor('#FFFFFF'), strokes: hexColor('#93C5FD'), cornerRadius: 4
  });
  const txtId = textareaBox.result.id;
  await createText(txtId, "Textarea Content", "Đã rà soát log giao tiếp Cổng Service QR & DB Partner. Giao dịch TX-10004 bị trừ tiền 2 lần do sự cố rớt mạng timeout 504. Dữ liệu khớp 100%, đủ điều kiện chuyển trạng thái sang [Đã kiểm tra] để trình duyệt Napas.", 12, 12, { fontSize: 11.5, fill: "#0F172A" });

  // Thành phần 3: File Upload Dropzone
  await createText(formId, "Upload Label", "Tệp biên bản rà soát kỹ thuật / đối soát số liệu (Tùy chọn đính kèm PDF, DOCX, XLSX max 10MB)", 20, 250, { fontSize: 11.5, fill: "#1E293B" });

  const dropzone = await sendRpc("create", {
    type: "FRAME", parentId: formId, name: "Upload Dropzone Box", x: 20, y: 272, width: 1134, height: 60, fills: hexColor('#F0F9FF'), strokes: hexColor('#93C5FD'), cornerRadius: 4
  });
  const dropId = dropzone.result.id;
  await createText(dropId, "File Icon Name", "📄 bien_ban_kiem_tra_ky_thuat_ts004.pdf (1.2 MB — Đã tải lên thành công)", 16, 20, { fontSize: 11.5, fill: "#2563EB" });
  
  await sendRpc("create", { type: "RECTANGLE", parentId: dropId, name: "Delete File Btn BG", x: 1040, y: 14, width: 80, height: 32, fills: hexColor('#FEF2F2'), strokes: hexColor('#FCA5A5'), cornerRadius: 4 });
  await createText(dropId, "Delete File Btn Text", "🗑️  Xóa", 1060, 22, { fontSize: 11, fill: "#DC2626" });

  // KHỐI 4: NÚT THAO TÁC ACTION BUTTONS FOOTER
  const footerCard = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Khối 4 - Action Buttons Bar", x: 246, y: 850, width: 1174, height: 70, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const ftId = footerCard.result.id;

  // Nút Quay lại danh sách
  await sendRpc("create", { type: "RECTANGLE", parentId: ftId, name: "Back Button BG", x: 20, y: 15, width: 180, height: 40, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6 });
  await createText(ftId, "Back Button Text", "← Quay lại danh sách", 42, 27, { fontSize: 12, fill: "#475569" });

  // Nút Xác nhận Đã kiểm tra (Primary Action)
  await sendRpc("create", { type: "RECTANGLE", parentId: ftId, name: "Confirm Inspect Btn BG", x: 920, y: 15, width: 234, height: 40, fills: hexColor('#3B82F6'), cornerRadius: 6 });
  await createText(ftId, "Confirm Inspect Btn Text", "🔍  Xác nhận Đã kiểm tra", 955, 27, { fontSize: 12.5, fill: "#FFFFFF" });

  console.log("🎉 ĐÃ VẼ HOÀN TẤT MÀN HÌNH KIỂM TRA YCTS (BF29.1-UC-SENT-04) TRÊN FIGMA!");
}

drawInspectScreen().catch(console.error);
