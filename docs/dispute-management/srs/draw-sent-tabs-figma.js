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

function hexColor(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [{ type: "SOLID", color: { r, g, b } }];
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
        fills: hexColor(options.fill)
      });
    }
  }
  return res;
}

// Hàm vẽ màn hình danh sách Tra soát đã gửi cho 1 Tab cụ thể
async function drawSentTabScreen(frameName, canvasX, activeTabName, pctsFilterVal, expireFilterVal, dataRows, totalAmount, resultCountText, includeExpireColumn = false) {
  console.log(`🚀 Bắt đầu vẽ Màn hình Danh sách YCTS: "${frameName}" (Tab: ${activeTabName}, Cột TT Hết Hạn: ${includeExpireColumn})...`);

  // Xóa frame cũ nếu đã tồn tại
  try {
    const searchRes = await sendRpc("search_nodes", { name: frameName });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // 1. Frame tổng (1440 x 980)
  const mainCanvas = await safeCreate({
    type: "FRAME",
    name: frameName,
    x: canvasX,
    y: 423,
    width: 1440,
    height: 980,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  const mainId = mainCanvas.result.id;

  // 2. Sidebar (220 x 980)
  const sidebar = await safeCreate({
    type: "FRAME",
    parentId: mainId,
    name: "Sidebar",
    x: 0,
    y: 0,
    width: 220,
    height: 980,
    fills: hexColor('#3B82F6')
  });
  const sidebarId = sidebar.result.id;

  await safeCreate({
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

  await safeCreate({
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

  const submenuContainer = await safeCreate({
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

  await safeCreate({
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

  // 3. Topbar (1220 x 64)
  const topbar = await safeCreate({
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

  await safeCreate({
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

  await safeCreate({
    type: "RECTANGLE",
    parentId: topbarId,
    name: "Vertical Red Line",
    x: 930,
    y: 16,
    width: 1.5,
    height: 32,
    fills: hexColor('#EF4444')
  });

  await safeCreate({
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

  // 4. Breadcrumb & Title
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã gửi", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Quản lý tra soát đã gửi", 246, 108, { fontSize: 22, fill: "#0F172A" });

  await safeCreate({
    type: "RECTANGLE",
    parentId: mainId,
    name: "Create Button Box",
    x: 1246,
    y: 104,
    width: 174,
    height: 34,
    fills: hexColor('#3B82F6'),
    cornerRadius: 6
  });

  await createText(mainId, "Create Button Text", "+ Tạo yêu cầu tra soát", 1264, 114, { fontSize: 11.5, fill: "#FFFFFF" });

  // 5. Filter Card Component 12 Trường
  const filterCard = await safeCreate({
    type: "FRAME",
    parentId: mainId,
    name: "Filter Card Component",
    x: 246,
    y: 154,
    width: 1174,
    height: 230,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#E2E8F0'),
    cornerRadius: 6
  });
  const filterCardId = filterCard.result.id;

  async function createFilterField4(label, value, col, row) {
    const x = 20 + col * 280;
    const y = 14 + row * 56;
    
    await createText(filterCardId, `${label} Label`, label, x, y, { fontSize: 9.5, fill: "#64748B" });

    await safeCreate({
      type: "RECTANGLE",
      parentId: filterCardId,
      name: `${label} Box`,
      x: x,
      y: y + 16,
      width: 260,
      height: 30,
      fills: hexColor('#FFFFFF'),
      strokes: hexColor('#E2E8F0'),
      cornerRadius: 4
    });

    await createText(filterCardId, `${label} Value`, value, x + 10, y + 23, { fontSize: 11, fill: "#0F172A" });

    const icon = label.includes("THỜI GIAN") ? "📅" : "▼";
    await createText(filterCardId, `${label} Icon`, icon, x + 240, y + 24, { fontSize: 10, fill: "#64748B" });
  }

  const filterFieldsDef = [
    { lbl: "MERCHANT CODE", val: "Tất cả", c: 0, r: 0 },
    { lbl: "ĐỐI TÁC THANH TOÁN", val: "Ví Epay", c: 1, r: 0 },
    { lbl: "LOẠI DỊCH VỤ", val: "Thanh toán", c: 2, r: 0 },
    { lbl: "VAI TRÒ GỐC", val: "TCNL (Tổ chức nhận lệnh)", c: 3, r: 0 },

    { lbl: "TIẾN TRÌNH TRA SOÁT (PCTS)", val: pctsFilterVal, c: 0, r: 1 },
    { lbl: "TRẠNG THÁI HẾT HẠN", val: expireFilterVal, c: 1, r: 1 },
    { lbl: "TRẠNG THÁI XỬ LÝ YCTS TẠI EPAY", val: "Tất cả kết quả tại Epay", c: 2, r: 1 },
    { lbl: "TRẠNG THÁI XỬ LÝ YCTS TẠI ĐỐI TÁC", val: "Tất cả kết quả tại đối tác", c: 3, r: 1 },

    { lbl: "LOẠI TRA SOÁT", val: "Tất cả", c: 0, r: 2 },
    { lbl: "NGƯỜI TẠO", val: "creator01", c: 1, r: 2 },
    { lbl: "THỜI GIAN TẠO", val: "2026-07-22", c: 2, r: 2 },
    { lbl: "NGƯỜI PHÊ DUYỆT", val: "Lisa", c: 3, r: 2 }
  ];

  for (const f of filterFieldsDef) {
    await createFilterField4(f.lbl, f.val, f.c, f.r);
  }

  await safeCreate({
    type: "RECTANGLE",
    parentId: filterCardId,
    name: "Reset Button Box",
    x: 935,
    y: 186,
    width: 100,
    height: 30,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });

  await createText(filterCardId, "Reset Button Text", "Xóa bộ lọc", 955, 194, { fontSize: 11, fill: "#475569" });

  await safeCreate({
    type: "RECTANGLE",
    parentId: filterCardId,
    name: "Search Button Box",
    x: 1045,
    y: 186,
    width: 105,
    height: 30,
    fills: hexColor('#3B82F6'),
    cornerRadius: 4
  });

  await createText(filterCardId, "Search Button Text", "Tìm kiếm", 1073, 194, { fontSize: 11, fill: "#FFFFFF" });

  // 6. Tab Strip Row
  const tabStrip = await safeCreate({
    type: "FRAME",
    parentId: mainId,
    name: "Tab Strip Row",
    x: 246,
    y: 398,
    width: 1174,
    height: 34,
    fills: []
  });
  const tabStripId = tabStrip.result.id;

  await safeCreate({
    type: "RECTANGLE",
    parentId: tabStripId,
    name: "Separator Line",
    x: 0,
    y: 33,
    width: 1174,
    height: 1,
    fills: hexColor('#E2E8F0')
  });

  const tabsList = [
    { text: "Tất cả", name: "Tất cả", x: 16, barW: 38 },
    { text: "Chờ phê duyệt", name: "Chờ phê duyệt", x: 96, barW: 88 },
    { text: "Chờ xử lý", name: "Chờ xử lý", x: 216, barW: 60 },
    { text: "Quá hạn", name: "Quá hạn", x: 306, barW: 50 }
  ];

  for (const tab of tabsList) {
    const isCurrentActive = (tab.name === activeTabName);
    await createText(tabStripId, tab.text, tab.text, tab.x, 8, {
      fontSize: 12.5,
      fill: isCurrentActive ? "#3B82F6" : "#475569"
    });
    
    if (isCurrentActive) {
      await safeCreate({
        type: "RECTANGLE",
        parentId: tabStripId,
        name: "Active Tab Bar",
        x: tab.x,
        y: 32,
        width: tab.barW,
        height: 2,
        fills: hexColor('#3B82F6')
      });
    }
  }

  // 7. Table Card Grid Component
  const tableCard = await safeCreate({
    type: "FRAME",
    parentId: mainId,
    name: "Table Card Grid",
    x: 246,
    y: 444,
    width: 1174,
    height: 520,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#E2E8F0'),
    cornerRadius: 6
  });
  const tableCardId = tableCard.result.id;

  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Quick Search Bar Box",
    x: 16,
    y: 12,
    width: 1030,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });

  await createText(tableCardId, "Quick Search Placeholder", "🔍  Tìm kiếm theo mã tra soát, loại tra soát, mã giao dịch gốc...", 28, 22, { fontSize: 11.5, fill: "#94A3B8" });

  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Custom Button Box",
    x: 1056,
    y: 12,
    width: 100,
    height: 36,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });

  await createText(tableCardId, "Custom Button Text", "⚙  Tùy chỉnh", 1070, 22, { fontSize: 11.5, fill: "#475569" });

  // Table Header Bar
  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Header BG",
    x: 1,
    y: 60,
    width: 1172,
    height: 36,
    fills: hexColor('#F8FAFC')
  });

  // Cấu trúc cột Table Header
  const columnsDef = includeExpireColumn ? [
    { text: "STT", x: 14 },
    { text: "MÃ TRA SOÁT", x: 46 },
    { text: "LOẠI TS", x: 135 },
    { text: "LÝ DO", x: 205 },
    { text: "TRẠNG THÁI", x: 275 },
    { text: "TT HẾT HẠN", x: 370 },
    { text: "TT TẠI EPAY", x: 475 },
    { text: "VAI TRÒ TS", x: 565 },
    { text: "MÃ GD GỐC", x: 650 },
    { text: "LOẠI GD GỐC", x: 745 },
    { text: "THỜI GIAN TẠO", x: 835 },
    { text: "THỜI GIAN XỬ LÝ", x: 960 },
    { text: "THAO TÁC", x: 1110 }
  ] : [
    { text: "STT", x: 16 },
    { text: "MÃ TRA SOÁT", x: 50 },
    { text: "LOẠI TRA SOÁT", x: 145 },
    { text: "LÝ DO (RQSP)", x: 245 },
    { text: "TRẠNG THÁI", x: 340 },
    { text: "TT TẠI EPAY", x: 450 },
    { text: "VAI TRÒ TS", x: 540 },
    { text: "MÃ GD GỐC", x: 650 },
    { text: "LOẠI GD GỐC", x: 745 },
    { text: "THỜI GIAN TẠO", x: 835 },
    { text: "THỜI GIAN XỬ LÝ", x: 960 },
    { text: "THAO TÁC", x: 1110 }
  ];

  for (const col of columnsDef) {
    await createText(tableCardId, `${col.text} Header Label`, col.text, col.x, 72, { fontSize: 9.5, fill: "#64748B" });
  }

  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Header Separation Line",
    x: 1,
    y: 96,
    width: 1172,
    height: 1,
    fills: hexColor('#E2E8F0')
  });

  async function drawStatusBullet(text, x, y, type) {
    let dotColor = '#64748B';
    if (type === 'yellow' || type === 'orange') dotColor = '#D97706';
    else if (type === 'blue') dotColor = '#3B82F6';
    else if (type === 'green') dotColor = '#10B981';
    else if (type === 'red') dotColor = '#EF4444';

    await safeCreate({
      type: "ELLIPSE",
      parentId: tableCardId,
      name: `${text} Dot`,
      x: x,
      y: y + 4,
      width: 6,
      height: 6,
      fills: hexColor(dotColor)
    });

    await createText(tableCardId, `${text} Text`, text, x + 12, y, { fontSize: 11, fill: dotColor });
  }

  let currentY = 97;
  for (const r of dataRows) {
    await safeCreate({
      type: "RECTANGLE",
      parentId: tableCardId,
      name: `Row ${r.stt} Line`,
      x: 1,
      y: currentY + 35,
      width: 1172,
      height: 1,
      fills: hexColor('#F1F5F9')
    });

    if (includeExpireColumn) {
      await createText(tableCardId, `STT ${r.stt}`, r.stt, 14, currentY + 10, { fontSize: 11, fill: "#475569" });
      await createText(tableCardId, `ID ${r.id}`, r.id, 46, currentY + 10, { fontSize: 11, fill: "#2563EB" });
      await createText(tableCardId, `Type ${r.id}`, r.type, 135, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      await createText(tableCardId, `Reason ${r.id}`, r.reason, 205, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      
      await drawStatusBullet(r.status, 275, currentY + 10, r.sType);

      await drawStatusBullet(r.expireStatus || "● Đã quá hạn", 370, currentY + 10, 'red');

      await createText(tableCardId, `EpayStatus ${r.id}`, r.epayStatus, 475, currentY + 10, {
        fontSize: 11,
        fill: r.epayStatus === 'PRCD' ? '#16A34A' : (r.epayStatus === 'RJCD' ? '#DC2626' : (r.epayStatus === 'OPEN' ? '#2563EB' : '#0F172A'))
      });

      await createText(tableCardId, `Role ${r.id}`, r.role, 565, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      await createText(tableCardId, `Orig ${r.id}`, r.origId, 650, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      await createText(tableCardId, `OrigType ${r.id}`, r.origType, 745, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      await createText(tableCardId, `Time ${r.id}`, r.time, 835, currentY + 10, { fontSize: 10.5, fill: "#475569" });
      await createText(tableCardId, `HandleTime ${r.id}`, r.handleTime, 960, currentY + 10, { fontSize: 10.5, fill: "#475569" });
    } else {
      await createText(tableCardId, `STT ${r.stt}`, r.stt, 16, currentY + 10, { fontSize: 11, fill: "#475569" });
      await createText(tableCardId, `ID ${r.id}`, r.id, 50, currentY + 10, { fontSize: 11, fill: "#2563EB" });
      await createText(tableCardId, `Type ${r.id}`, r.type, 145, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      await createText(tableCardId, `Reason ${r.id}`, r.reason, 245, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      
      await drawStatusBullet(r.status, 340, currentY + 10, r.sType);

      await createText(tableCardId, `EpayStatus ${r.id}`, r.epayStatus, 450, currentY + 10, {
        fontSize: 11,
        fill: r.epayStatus === 'PRCD' ? '#16A34A' : (r.epayStatus === 'RJCD' ? '#DC2626' : (r.epayStatus === 'OPEN' ? '#2563EB' : '#0F172A'))
      });

      await createText(tableCardId, `Role ${r.id}`, r.role, 540, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      await createText(tableCardId, `Orig ${r.id}`, r.origId, 650, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      await createText(tableCardId, `OrigType ${r.id}`, r.origType, 745, currentY + 10, { fontSize: 11, fill: "#0F172A" });
      await createText(tableCardId, `Time ${r.id}`, r.time, 835, currentY + 10, { fontSize: 10.5, fill: "#475569" });
      await createText(tableCardId, `HandleTime ${r.id}`, r.handleTime, 960, currentY + 10, { fontSize: 10.5, fill: "#475569" });
    }
    
    await createText(tableCardId, `Action ${r.id}`, "⋮", 1115, currentY + 7, { fontSize: 16, fill: "#3B82F6" });

    currentY += 36;
  }

  // Footer Phân trang
  const ftrY = 475;
  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Table Footer Box",
    x: 1,
    y: ftrY,
    width: 1172,
    height: 44,
    fills: hexColor('#FFFFFF')
  });

  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Table Footer Separator",
    x: 1,
    y: ftrY,
    width: 1172,
    height: 1,
    fills: hexColor('#E2E8F0')
  });

  await createText(tableCardId, "Total Sum Label", `Tổng tiền giao dịch: ${totalAmount}`, 20, ftrY + 14, { fontSize: 11.5, fill: "#0F172A" });
  await createText(tableCardId, "Result Count Text", resultCountText, 940, ftrY + 14, { fontSize: 11.5, fill: "#3B82F6" });

  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Btn Prev",
    x: 1082,
    y: ftrY + 10,
    width: 22,
    height: 22,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(tableCardId, "Icon Prev", "<", 1089, ftrY + 14, { fontSize: 11, fill: "#64748B" });

  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Btn Page 1 Active",
    x: 1110,
    y: ftrY + 10,
    width: 22,
    height: 22,
    fills: hexColor('#2563EB'),
    cornerRadius: 4
  });
  await createText(tableCardId, "Text Page 1", "1", 1118, ftrY + 14, { fontSize: 11, fill: "#FFFFFF" });

  await safeCreate({
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Btn Next",
    x: 1138,
    y: ftrY + 10,
    width: 22,
    height: 22,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(tableCardId, "Icon Next", ">", 1145, ftrY + 14, { fontSize: 11, fill: "#64748B" });

  console.log(`🎉 ĐÃ VẼ XONG MÀN HÌNH YCTS: "${frameName}"!`);
}

// Data các bản ghi cho Tab Chờ phê duyệt
const pendingApprovalRows = [
  { stt: "1", id: "TS-001", type: "RQRN", reason: "CUSTOMER", status: "Chờ phê duyệt", sType: "orange", epayStatus: "—", role: "TCYCTS", origId: "TX-10001", origType: "Thanh toán", time: "07/27/2026", handleTime: "—" },
  { stt: "2", id: "TS-013", type: "RQSP", reason: "BANK",     status: "Chờ phê duyệt", sType: "orange", epayStatus: "—", role: "TCYCTS", origId: "TX-10013", origType: "Thanh toán", time: "07/28/2026", handleTime: "—" },
  { stt: "3", id: "TS-014", type: "RQRN", reason: "FRAU",     status: "Chờ phê duyệt", sType: "orange", epayStatus: "—", role: "TCYCTS", origId: "TX-10014", origType: "Thanh toán", time: "07/29/2026", handleTime: "—" },
  { stt: "4", id: "TS-020", type: "RQSP", reason: "BANK",     status: "Chờ phê duyệt", sType: "orange", epayStatus: "—", role: "TCYCTS", origId: "TX-10020", origType: "Thanh toán", time: "07/30/2026", handleTime: "—" }
];

// Data các bản ghi cho Tab Chờ xử lý (Luồng YCTS)
const pendingProcessRows = [
  { stt: "1", id: "TS-012", type: "RQSP", reason: "CUSTOMER", status: "Chờ xử lý", sType: "yellow", epayStatus: "—", role: "TCYCTS", origId: "TX-10012", origType: "Thanh toán", time: "07/27/2026", handleTime: "—" },
  { stt: "2", id: "TS-024", type: "RQRN", reason: "BANK",     status: "Chờ xử lý", sType: "yellow", epayStatus: "—", role: "TCYCTS", origId: "TX-10024", origType: "Thanh toán", time: "07/28/2026", handleTime: "—" },
  { stt: "3", id: "TS-025", type: "RQSP", reason: "BANK",     status: "Chờ xử lý", sType: "yellow", epayStatus: "—", role: "TCYCTS", origId: "TX-10025", origType: "Thanh toán", time: "07/29/2026", handleTime: "—" }
];

// Data các bản ghi cho Tab Quá hạn (Luồng YCTS)
const overdueRows = [
  { stt: "1", id: "TS-002", type: "RQRN", reason: "CUSTOMER", status: "Chờ phản hồi", sType: "blue",   expireStatus: "Đã quá hạn", epayStatus: "OPEN", role: "TCYCTS", origId: "TX-10002", origType: "Thanh toán", time: "07/10/2026", handleTime: "—" },
  { stt: "2", id: "TS-004", type: "RQSP", reason: "BANK",     status: "Chờ xử lý",   sType: "yellow", expireStatus: "Đã quá hạn", epayStatus: "—",    role: "TCYCTS", origId: "TX-10004", origType: "Thanh toán", time: "07/05/2026", handleTime: "—" },
  { stt: "3", id: "TS-006", type: "RQSP", reason: "BANK",     status: "Chờ phê duyệt",sType: "orange", expireStatus: "Đã quá hạn", epayStatus: "—",   role: "TCYCTS", origId: "TX-10006", origType: "Thanh toán", time: "07/02/2026", handleTime: "—" }
];

async function run() {
  console.log("🚀 Bắt đầu sinh các Màn hình Danh sách (Luồng YCTS)...");
  
  // Màn 1: Tab Chờ phê duyệt (x = 3400)
  await drawSentTabScreen(
    "Quản lý tra soát đã gửi - Tab Chờ phê duyệt",
    3400,
    "Chờ phê duyệt",
    "Chờ phê duyệt",
    "Tất cả tình trạng hết hạn",
    pendingApprovalRows,
    "18,500,000 VND",
    "Hiển thị kết quả: 4 dòng",
    false
  );

  // Màn 2: Tab Chờ xử lý (x = 6600)
  await drawSentTabScreen(
    "Quản lý tra soát đã gửi - Tab Chờ xử lý",
    6600,
    "Chờ xử lý",
    "Chờ xử lý",
    "Tất cả tình trạng hết hạn",
    pendingProcessRows,
    "11,200,000 VND",
    "Hiển thị kết quả: 3 dòng",
    false
  );

  // Màn 3: Tab Quá hạn (x = 5000)
  await drawSentTabScreen(
    "Quản lý tra soát đã gửi - Tab Quá hạn",
    5000,
    "Quá hạn",
    "Tất cả tiến trình",
    "Đã hết hạn SLA",
    overdueRows,
    "7,200,000 VND",
    "Hiển thị kết quả: 3 dòng",
    true
  );

  console.log("🎉 ĐÃ CẬP NHẬT HOÀN TẤT CÁC MÀN HÌNH YCTS LÊN FIGMA!");
}

run().catch(console.error);
