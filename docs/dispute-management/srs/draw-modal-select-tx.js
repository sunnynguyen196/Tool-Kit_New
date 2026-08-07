import http from 'node:http';

const token = "0b59d21459c20766e68e805a20caf5aa1d31d9c55174b902";

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

async function drawModalSelectTx() {
  console.log("🚀 Bắt đầu vẽ lại Màn hình 3: Điều chỉnh khoảng cách các hàng Bộ lọc thông thoáng chuẩn Design System...");

  try {
    const searchRes = await sendRpc("search_nodes", { name: "Màn hình Chọn giao dịch gốc (Modal)" });
    if (searchRes && searchRes.result && searchRes.result.length > 0) {
      for (const node of searchRes.result) {
        console.log("🗑️ Xóa frame cũ:", node.name, "ID:", node.id);
        await sendRpc("delete", { nodeId: node.id });
      }
    }
  } catch (err) {
    console.log("⚠️ Lỗi dọn dẹp:", err.message);
  }

  // 1. Main Canvas tại x = 4500 (1440 x 960)
  const mainCanvas = await sendRpc("create", {
    type: "FRAME",
    name: "Màn hình Chọn giao dịch gốc (Modal)",
    x: 4500,
    y: 0,
    width: 1440,
    height: 960,
    fills: hexColor('#F8FAFC'),
    cornerRadius: 0
  });

  if (!mainCanvas || !mainCanvas.result || !mainCanvas.result.id) {
    console.error("❌ Lỗi tạo Main Canvas:", mainCanvas);
    return;
  }
  const mainId = mainCanvas.result.id;

  // 2. VẼ HOÀN CHỈNH NỀN MÀN HÌNH TẠO YCTS (BACKGROUND SCREEN 2)
  const sidebar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Sidebar BG", x: 0, y: 0, width: 220, height: 960, fills: hexColor('#3B82F6')
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

  // Topbar BG
  const topbar = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Topbar BG", x: 220, y: 0, width: 1220, height: 64, fills: hexColor('#FFFFFF'), strokes: hexColor('#E2E8F0')
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

  // Breadcrumb & Title BG
  await createText(mainId, "Breadcrumb Text", "Quản lý tra soát > Tra soát đã gửi > Tạo mới YCTS", 246, 84, { fontSize: 11.5, fill: "#94A3B8" });
  await createText(mainId, "Page Title Text", "Tạo mới yêu cầu tra soát", 246, 108, { fontSize: 22, fill: "#0F172A" });

  // Section 1 Card BG
  const sec1Card = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Section 1 BG", x: 246, y: 150, width: 1174, height: 280, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const sec1Id = sec1Card.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: sec1Id, name: "Sec 1 Hdr", x: 1, y: 1, width: 1172, height: 38, fills: hexColor('#F1F5F9') });
  await createText(sec1Id, "Sec 1 Title", "Thông tin yêu cầu", 16, 12, { fontSize: 13, fill: "#1E293B" });

  // Section 2 Card BG
  const sec2Card = await sendRpc("create", {
    type: "FRAME", parentId: mainId, name: "Section 2 BG", x: 246, y: 450, width: 1174, height: 280, fills: hexColor('#FFFFFF'), strokes: hexColor('#CBD5E1'), cornerRadius: 6
  });
  const sec2Id = sec2Card.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: sec2Id, name: "Sec 2 Hdr", x: 1, y: 1, width: 1172, height: 38, fills: hexColor('#F1F5F9') });
  await createText(sec2Id, "Sec 2 Title", "Thông tin giao dịch", 16, 12, { fontSize: 13, fill: "#1E293B" });


  // 3. LỚP PHỦ TỐI MÀN HÌNH (MODAL OVERLAY - rgba(15, 23, 42, 0.5))
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: mainId,
    name: "Darkened Modal Overlay",
    x: 0,
    y: 0,
    width: 1440,
    height: 960,
    fills: hexColor('#0F172A', 0.5)
  });


  // 4. HỘP THOẠI MODAL CHÍNH RỘNG CHUẨN (920px x 630px)
  const modalCard = await sendRpc("create", {
    type: "FRAME",
    parentId: mainId,
    name: "Modal Dialog Card",
    x: 260,
    y: 130,
    width: 920,
    height: 630,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 8
  });
  const modalId = modalCard.result.id;

  // Modal Header Bar
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: modalId,
    name: "Modal Header BG",
    x: 1,
    y: 1,
    width: 918,
    height: 46,
    fills: hexColor('#F8FAFC')
  });

  await createText(modalId, "Modal Header Title", "🔍  Tìm kiếm Giao dịch gốc", 20, 14, { fontSize: 14, fill: "#1E293B" });
  await createText(modalId, "Modal Header Count", "(4 giao dịch)", 195, 16, { fontSize: 12, fill: "#64748B" });
  await createText(modalId, "Modal Close Icon", "×", 885, 12, { fontSize: 20, fill: "#94A3B8" });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: modalId,
    name: "Header Divider Line",
    x: 1,
    y: 47,
    width: 918,
    height: 1,
    fills: hexColor('#E2E8F0')
  });


  // 5. FILTER CARD INSIDE POPUP MODAL (KHOẢNG CÁCH HÀNG THÔNG THOÁNG CHUẨN - HEIGHT 220PX)
  const filterBox = await sendRpc("create", {
    type: "FRAME",
    parentId: modalId,
    name: "Modal Filter Card",
    x: 16,
    y: 56,
    width: 888,
    height: 220,
    fills: hexColor('#F8FAFC'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });
  const filterBoxId = filterBox.result.id;

  async function createModalFilterFieldSpaced(label, value, col, row, isSelect = false) {
    const x = 12 + col * 288;
    const y = 12 + row * 58; // KHOẢNG CÁCH HÀNG 58PX CHUẨN ĐẸP

    await createText(filterBoxId, `${label} Label`, label, x, y, { fontSize: 9.5, fill: "#475569" });

    await sendRpc("create", {
      type: "RECTANGLE",
      parentId: filterBoxId,
      name: `${label} Input Box`,
      x: x,
      y: y + 16,
      width: 275,
      height: 28,
      fills: hexColor('#FFFFFF'),
      strokes: hexColor('#CBD5E1'),
      cornerRadius: 4
    });

    await createText(filterBoxId, `${label} Value`, value, x + 8, y + 23, { fontSize: 10.5, fill: "#0F172A" });

    if (isSelect) {
      await createText(filterBoxId, `${label} Icon`, "▼", x + 258, y + 24, { fontSize: 9, fill: "#64748B" });
    }
  }

  // Hàng 0 (y = 12)
  await createModalFilterFieldSpaced("MÃ GIAO DỊCH GỐC", "TX-10005", 0, 0);
  await createModalFilterFieldSpaced("MÃ GIAO DỊCH ĐỐI TÁC", "NAPAS_99005", 1, 0);
  await createModalFilterFieldSpaced("TRẠNG THÁI GIAO DỊCH", "Thành công", 2, 0, true);

  // Hàng 1 (y = 70)
  await createModalFilterFieldSpaced("PTTT", "VietQR", 0, 1, true);
  await createModalFilterFieldSpaced("SỐ TIỀN GIAO DỊCH", "600,000 VND", 1, 1);
  await createModalFilterFieldSpaced("TỔ CHỨC THANH TOÁN", "Napas", 2, 1, true);

  // Hàng 2 (y = 128)
  await createModalFilterFieldSpaced("TỔ CHỨC PHÁT HÀNH", "VietinBank", 0, 2, true);
  await createModalFilterFieldSpaced("NGÀY GIAO DỊCH", "2024-03-24", 1, 2);
  await createModalFilterFieldSpaced("MERCHANT", "PAYME_MERCHANT", 2, 2, true);

  // Hàng 3 (y = 182) -> CỤM BUTTON CĂN PHẢI BIỆT LẬP THÔNG THOÁNG
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: filterBoxId,
    name: "Reset Modal Filter Btn",
    x: 716,
    y: 182,
    width: 75,
    height: 28,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(filterBoxId, "Reset Modal Filter Text", "Xóa lọc", 735, 190, { fontSize: 10.5, fill: "#475569" });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: filterBoxId,
    name: "Search Modal Filter Btn",
    x: 798,
    y: 182,
    width: 78,
    height: 28,
    fills: hexColor('#2563EB'),
    cornerRadius: 4
  });
  await createText(filterBoxId, "Search Modal Filter Text", "Tìm kiếm", 814, 190, { fontSize: 10.5, fill: "#FFFFFF" });


  // 6. TABLE OF ORIGINAL TRANSACTIONS INSIDE POPUP (10 CỘT CHUẨN WIREFRAME HTML)
  const tableCard = await sendRpc("create", {
    type: "FRAME",
    parentId: modalId,
    name: "Modal Table Card Grid",
    x: 16,
    y: 286,
    width: 888,
    height: 280,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 6
  });
  const tableCardId = tableCard.result.id;

  // Table Header BG
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Table Header BG",
    x: 1,
    y: 1,
    width: 886,
    height: 32,
    fills: hexColor('#F1F5F9')
  });

  const modal10Cols = [
    { text: "CHỌN", x: 12 },
    { text: "MÃ GIAO DỊCH GỐC", x: 50 },
    { text: "MÃ GD ĐỐI TÁC", x: 160 },
    { text: "TRẠNG THÁI", x: 260 },
    { text: "PTTT", x: 345 },
    { text: "SỐ TIỀN GIAO DỊCH", x: 405 },
    { text: "MERCHANT", x: 525 },
    { text: "TỔ CHỨC TT", x: 635 },
    { text: "TỔ CHỨC PH", x: 720 },
    { text: "NGÀY GIAO DỊCH", x: 795 }
  ];

  for (const col of modal10Cols) {
    await createText(tableCardId, `${col.text} Label`, col.text, col.x, 11, { fontSize: 9, fill: "#64748B" });
  }

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: tableCardId,
    name: "Table Header Line",
    x: 1,
    y: 33,
    width: 886,
    height: 1,
    fills: hexColor('#E2E8F0')
  });

  // 4 BẢN GHI ĐẦY ĐỦ CỦA WIREFRAME HTML (TX-10005, TX-10012, TX-10011, TX-10001)
  const full4ModalRows = [
    { selected: true,  txId: "TX-10005", partnerTx: "NAPAS_99005", status: "Thành công", pttt: "VietQR", amount: "600,000 VND", merchant: "PAYME_MERCHANT", partner: "Napas", issuer: "VietinBank", time: "24/03/2024 09:00:04" },
    { selected: false, txId: "TX-10012", partnerTx: "NAPAS_99012", status: "Thành công", pttt: "VietQR", amount: "1,500,000 VND", merchant: "PAYME_MERCHANT", partner: "Napas", issuer: "Vietcombank", time: "24/03/2024 09:00:04" },
    { selected: false, txId: "TX-10011", partnerTx: "NAPAS_99011", status: "Thành công", pttt: "VietQR", amount: "2,000,000 VND", merchant: "PAYME_MERCHANT", partner: "Napas", issuer: "BIDV", time: "24/03/2024 08:30:15" },
    { selected: false, txId: "TX-10001", partnerTx: "NAPAS_99001", status: "Thành công", pttt: "VietQR", amount: "500,000 VND", merchant: "PAYME_MERCHANT", partner: "Napas", issuer: "Agribank", time: "24/03/2024 08:00:00" }
  ];

  let currentY = 34;
  for (let i = 0; i < full4ModalRows.length; i++) {
    const r = full4ModalRows[i];

    await sendRpc("create", {
      type: "RECTANGLE",
      parentId: tableCardId,
      name: `Row ${i+1} Divider`,
      x: 1,
      y: currentY + 36,
      width: 886,
      height: 1,
      fills: hexColor('#F1F5F9')
    });

    const radioFill = r.selected ? '#2563EB' : '#FFFFFF';
    await sendRpc("create", {
      type: "ELLIPSE",
      parentId: tableCardId,
      name: `Radio Circle ${r.txId}`,
      x: 18,
      y: currentY + 11,
      width: 14,
      height: 14,
      fills: hexColor(radioFill),
      strokes: hexColor(r.selected ? '#2563EB' : '#CBD5E1')
    });
    if (r.selected) {
      await sendRpc("create", {
        type: "ELLIPSE",
        parentId: tableCardId,
        name: `Radio Inner ${r.txId}`,
        x: 22,
        y: currentY + 15,
        width: 6,
        height: 6,
        fills: hexColor('#FFFFFF')
      });
    }

    await createText(tableCardId, `TxId ${r.txId}`, r.txId, 50, currentY + 10, { fontSize: 10.5, fill: "#2563EB" });
    await createText(tableCardId, `PartnerTx ${r.txId}`, r.partnerTx, 160, currentY + 10, { fontSize: 10.5, fill: "#0F172A" });

    await sendRpc("create", {
      type: "ELLIPSE",
      parentId: tableCardId,
      name: `Status Dot ${r.txId}`,
      x: 260,
      y: currentY + 14,
      width: 5,
      height: 5,
      fills: hexColor('#10B981')
    });
    await createText(tableCardId, `Status Text ${r.txId}`, r.status, 270, currentY + 10, { fontSize: 10, fill: "#10B981" });

    await createText(tableCardId, `PTTT ${r.txId}`, r.pttt, 345, currentY + 10, { fontSize: 10, fill: "#0F172A" });
    await createText(tableCardId, `Amount ${r.txId}`, r.amount, 405, currentY + 10, { fontSize: 10.5, fill: "#0F172A" });
    await createText(tableCardId, `Merchant ${r.txId}`, r.merchant, 525, currentY + 10, { fontSize: 9.5, fill: "#475569" });
    await createText(tableCardId, `Partner ${r.txId}`, r.partner, 635, currentY + 10, { fontSize: 10, fill: "#0F172A" });
    await createText(tableCardId, `Issuer ${r.txId}`, r.issuer, 720, currentY + 10, { fontSize: 10, fill: "#0F172A" });
    await createText(tableCardId, `Time ${r.txId}`, r.time, 795, currentY + 10, { fontSize: 9.5, fill: "#475569" });

    currentY += 37;
  }


  // 7. FOOTER POPUP (HỦY BỎ & XÁC NHẬN CHỌN GIAO DỊCH CHUẨN WIREFRAME)
  const ftrY = 578;
  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: modalId,
    name: "Modal Footer BG",
    x: 1,
    y: ftrY,
    width: 918,
    height: 50,
    fills: hexColor('#F8FAFC')
  });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: modalId,
    name: "Modal Footer Line",
    x: 1,
    y: ftrY,
    width: 918,
    height: 1,
    fills: hexColor('#E2E8F0')
  });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: modalId,
    name: "Cancel Btn Box",
    x: 640,
    y: ftrY + 9,
    width: 85,
    height: 32,
    fills: hexColor('#FFFFFF'),
    strokes: hexColor('#CBD5E1'),
    cornerRadius: 4
  });
  await createText(modalId, "Cancel Btn Text", "Hủy bỏ", 662, ftrY + 17, { fontSize: 11, fill: "#334155" });

  await sendRpc("create", {
    type: "RECTANGLE",
    parentId: modalId,
    name: "Confirm Select Btn Box",
    x: 735,
    y: ftrY + 9,
    width: 170,
    height: 32,
    fills: hexColor('#2563EB'),
    cornerRadius: 4
  });
  await createText(modalId, "Confirm Select Btn Text", "Xác nhận chọn giao dịch", 750, ftrY + 17, { fontSize: 11, fill: "#FFFFFF" });

  console.log("🎉 ĐÃ KHẮC PHỤC HOÀN HẢO MÀN HÌNH 3: KHOẢNG CÁCH HÀNG BỘ LỌC THÔNG THOÁNG CHUẨN DESIGN SYSTEM!");
}

drawModalSelectTx().catch(console.error);
