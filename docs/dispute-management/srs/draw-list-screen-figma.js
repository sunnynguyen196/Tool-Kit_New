// ============================================================================
// FIGMA AUTOMATION SCRIPT: MÀN HÌNH DANH SÁCH TRA SOÁT ĐÃ GỬI (TCYCTS)
// Kích thước chuẩn: 1440 x 960
// ============================================================================

(async function drawDisputeListScreen() {
  console.log("🚀 Đang khởi tạo bản vẽ Màn hình Danh sách Tra soát...");

  // 1. Tải Font chữ Inter
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "SemiBold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "ExtraBold" });

  // Helper: Chuyển hex sang màu Figma
  function hexColor(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    return [{ type: 'SOLID', color: { r, g, b } }];
  }

  // 2. Tạo Frame Canvas Chính (1440 x 960)
  const mainFrame = figma.createFrame();
  mainFrame.name = "Màn hình danh sách tra soát đã gửi (TCYCTS)";
  mainFrame.resize(1440, 960);
  mainFrame.x = 0;
  mainFrame.y = 0;
  mainFrame.fills = hexColor('#F8FAFC'); // Nền xám nhạt thanh lịch

  // 3. VẼ SIDEBAR (Deep Navy Blue - 240px x 960px)
  const sidebar = figma.createFrame();
  sidebar.name = "Sidebar";
  sidebar.resize(240, 960);
  sidebar.x = 0;
  sidebar.y = 0;
  sidebar.fills = hexColor('#0F172A'); // Slate 900 rất sang trọng
  mainFrame.appendChild(sidebar);

  // Logo Brand
  const brandIcon = figma.createRectangle();
  brandIcon.resize(24, 24);
  brandIcon.x = 20;
  brandIcon.y = 20;
  brandIcon.fills = hexColor('#F05A21'); // Điểm nhấn da cam Epay
  brandIcon.cornerRadius = 6;
  sidebar.appendChild(brandIcon);

  const brandIconText = figma.createText();
  brandIconText.fontName = { family: "Inter", style: "ExtraBold" };
  brandIconText.characters = "e";
  brandIconText.fontSize = 15;
  brandIconText.fills = hexColor('#FFFFFF');
  brandIconText.x = brandIcon.x + 7;
  brandIconText.y = brandIcon.y + 2;
  sidebar.appendChild(brandIconText);

  const brandName = figma.createText();
  brandName.fontName = { family: "Inter", style: "Bold" };
  brandName.characters = "epay Portal";
  brandName.fontSize = 16;
  brandName.fills = hexColor('#FFFFFF');
  brandName.x = 54;
  brandName.y = 22;
  sidebar.appendChild(brandName);

  // Đường phân cách logo
  const logoLine = figma.createRectangle();
  logoLine.resize(200, 1);
  logoLine.x = 20;
  logoLine.y = 60;
  logoLine.fills = hexColor('#1E293B');
  sidebar.appendChild(logoLine);

  // Menu Items
  const menuItems = [
    { text: "🏠  Trang chủ", active: false },
    { text: "⇆  Quản lý giao dịch", active: false },
    { text: "🔑  Quản lý Token", active: false },
    { text: "📊  Báo cáo thống kê", active: false },
    { text: "🏢  Quản lý ĐVCNTT", active: false },
    { text: "👥  Quản lý người dùng", active: false },
    { text: "⚠️  Quản lý rủi ro", active: false },
    { text: "💬  Quản lý tra soát", active: true } // Parent active
  ];

  let currentY = 80;
  menuItems.forEach(item => {
    const itemFrame = figma.createFrame();
    itemFrame.name = item.text;
    itemFrame.resize(220, 36);
    itemFrame.x = 10;
    itemFrame.y = currentY;
    itemFrame.fills = item.active ? hexColor('#1E293B') : []; // Highlight parent
    itemFrame.cornerRadius = 6;
    sidebar.appendChild(itemFrame);

    const txt = figma.createText();
    txt.fontName = { family: "Inter", style: item.active ? "SemiBold" : "Medium" };
    txt.characters = item.text;
    txt.fontSize = 12;
    txt.fills = hexColor(item.active ? '#FFFFFF' : '#94A3B8');
    txt.x = 16;
    txt.y = 10;
    itemFrame.appendChild(txt);

    if (item.active) {
      // Icon mũi tên xuống
      const arrow = figma.createText();
      arrow.fontName = { family: "Inter", style: "Bold" };
      arrow.characters = "▼";
      arrow.fontSize = 8;
      arrow.fills = hexColor('#94A3B8');
      arrow.x = 194;
      arrow.y = 14;
      itemFrame.appendChild(arrow);
    }

    currentY += 40;
  });

  // Submenu
  const subMenuY = currentY - 4;
  const subMenuFrame = figma.createFrame();
  subMenuFrame.name = "Submenu";
  subMenuFrame.resize(220, 76);
  subMenuFrame.x = 10;
  subMenuFrame.y = subMenuY;
  subMenuFrame.fills = hexColor('#020617'); // Đậm hơn
  subMenuFrame.cornerRadius = 6;
  sidebar.appendChild(subMenuFrame);

  // Sub item 1: Tra soát đã gửi (Active)
  const sub1 = figma.createFrame();
  sub1.resize(200, 28);
  sub1.x = 10;
  sub1.y = 8;
  sub1.fills = hexColor('#2563EB'); // Nền xanh active
  sub1.cornerRadius = 4;
  subMenuFrame.appendChild(sub1);

  const sub1Txt = figma.createText();
  sub1Txt.fontName = { family: "Inter", style: "Bold" };
  sub1Txt.characters = "📨  Tra soát đã gửi";
  sub1Txt.fontSize = 11.5;
  sub1Txt.fills = hexColor('#FFFFFF');
  sub1Txt.x = 16;
  sub1Txt.y = 7;
  sub1.appendChild(sub1Txt);

  // Sub item 2: Tra soát đã nhận
  const sub2 = figma.createFrame();
  sub2.resize(200, 28);
  sub2.x = 10;
  sub2.y = 40;
  sub2.fills = [];
  subMenuFrame.appendChild(sub2);

  const sub2Txt = figma.createText();
  sub2Txt.fontName = { family: "Inter", style: "Medium" };
  sub2Txt.characters = "📥  Tra soát đã nhận";
  sub2Txt.fontSize = 11.5;
  sub2Txt.fills = hexColor('#94A3B8');
  sub2Txt.x = 16;
  sub2Txt.y = 7;
  sub2.appendChild(sub2Txt);


  // 4. VẼ HEADER/TOPBAR (x = 240, y = 0, 1200px x 60px)
  const topbar = figma.createFrame();
  topbar.name = "Topbar";
  topbar.resize(1200, 60);
  topbar.x = 240;
  topbar.y = 0;
  topbar.fills = hexColor('#FFFFFF');
  topbar.strokes = hexColor('#E2E8F0');
  topbar.strokeWeight = 1;
  mainFrame.appendChild(topbar);

  // Ô tìm kiếm hệ thống
  const searchBox = figma.createRectangle();
  searchBox.resize(240, 32);
  searchBox.x = 20;
  searchBox.y = 14;
  searchBox.fills = hexColor('#F1F5F9');
  searchBox.cornerRadius = 16;
  topbar.appendChild(searchBox);

  const searchBoxTxt = figma.createText();
  searchBoxTxt.fontName = { family: "Inter", style: "Regular" };
  searchBoxTxt.characters = "🔍  Tìm kiếm hệ thống...";
  searchBoxTxt.fontSize = 11.5;
  searchBoxTxt.fills = hexColor('#94A3B8');
  searchBoxTxt.x = 36;
  searchBoxTxt.y = 22;
  topbar.appendChild(searchBoxTxt);

  // Bên phải: Role + User Profile
  const supportTxt = figma.createText();
  supportTxt.fontName = { family: "Inter", style: "Medium" };
  supportTxt.characters = "🌐  Hỗ trợ nhóm";
  supportTxt.fontSize = 12;
  supportTxt.fills = hexColor('#475569');
  supportTxt.x = 730;
  supportTxt.y = 22;
  topbar.appendChild(supportTxt);

  const bellIcon = figma.createText();
  bellIcon.fontName = { family: "Inter", style: "Regular" };
  bellIcon.characters = "🔔";
  bellIcon.fontSize = 14;
  bellIcon.x = 830;
  bellIcon.y = 21;
  topbar.appendChild(bellIcon);

  // Role Switcher Box
  const roleBox = figma.createRectangle();
  roleBox.resize(180, 28);
  roleBox.x = 860;
  roleBox.y = 16;
  roleBox.fills = hexColor('#F1F5F9');
  roleBox.strokes = hexColor('#CBD5E1');
  roleBox.cornerRadius = 14;
  topbar.appendChild(roleBox);

  const roleLabel = figma.createText();
  roleLabel.fontName = { family: "Inter", style: "Regular" };
  roleLabel.characters = "Role:";
  roleLabel.fontSize = 11;
  roleLabel.fills = hexColor('#64748B');
  roleLabel.x = 874;
  roleLabel.y = 23;
  topbar.appendChild(roleLabel);

  const roleValue = figma.createText();
  roleValue.fontName = { family: "Inter", style: "Bold" };
  roleValue.characters = "Chuyên viên (Maker)  ▼";
  roleValue.fontSize = 11;
  roleValue.fills = hexColor('#0F172A');
  roleValue.x = 906;
  roleValue.y = 23;
  topbar.appendChild(roleValue);

  // User Profile
  const userAvatar = figma.createEllipse();
  userAvatar.resize(28, 28);
  userAvatar.x = 1060;
  userAvatar.y = 16;
  userAvatar.fills = hexColor('#2563EB');
  topbar.appendChild(userAvatar);

  const userAvatarTxt = figma.createText();
  userAvatarTxt.fontName = { family: "Inter", style: "Bold" };
  userAvatarTxt.characters = "M";
  userAvatarTxt.fontSize = 11.5;
  userAvatarTxt.fills = hexColor('#FFFFFF');
  userAvatarTxt.x = userAvatar.x + 9;
  userAvatarTxt.y = userAvatar.y + 7;
  topbar.appendChild(userAvatarTxt);

  const userName = figma.createText();
  userName.fontName = { family: "Inter", style: "SemiBold" };
  userName.characters = "Maker_ThuNgan01";
  userName.fontSize = 12;
  userName.fills = hexColor('#0F172A');
  userName.x = 1096;
  userName.y = 22;
  topbar.appendChild(userName);


  // 5. NỘI DUNG CHÍNH (x = 240, y = 60, khu vực content)
  // BREADCRUMB
  const crumb = figma.createText();
  crumb.fontName = { family: "Inter", style: "Regular" };
  crumb.characters = "Quản lý tra soát  >  Tra soát đã gửi (TCYCTS)";
  crumb.fontSize = 11.5;
  crumb.fills = hexColor('#64748B');
  crumb.x = 260;
  crumb.y = 80;
  mainFrame.appendChild(crumb);

  // Tiêu đề & Nút Tạo mới
  const pageTitle = figma.createText();
  pageTitle.fontName = { family: "Inter", style: "Bold" };
  pageTitle.characters = "Quản lý tra soát đã gửi";
  pageTitle.fontSize = 18;
  pageTitle.fills = hexColor('#0F172A');
  pageTitle.x = 260;
  pageTitle.y = 108;
  mainFrame.appendChild(pageTitle);

  // Badge vai trò
  const roleBadge = figma.createRectangle();
  roleBadge.resize(110, 20);
  roleBadge.x = 490;
  roleBadge.y = 110;
  roleBadge.fills = hexColor('#E2E8F0');
  roleBadge.cornerRadius = 4;
  mainFrame.appendChild(roleBadge);

  const roleBadgeTxt = figma.createText();
  roleBadgeTxt.fontName = { family: "Inter", style: "SemiBold" };
  roleBadgeTxt.characters = "Vai trò: TCYCTS";
  roleBadgeTxt.fontSize = 10.5;
  roleBadgeTxt.fills = hexColor('#334155');
  roleBadgeTxt.x = roleBadge.x + 10;
  roleBadgeTxt.y = roleBadge.y + 4;
  mainFrame.appendChild(roleBadgeTxt);

  // Nút Tạo yêu cầu tra soát (Gradient / Vibrant Color)
  const createBtn = figma.createRectangle();
  createBtn.resize(180, 34);
  createBtn.x = 1220;
  createBtn.y = 104;
  createBtn.fills = hexColor('#2563EB'); // Xanh dương thương hiệu
  createBtn.cornerRadius = 6;
  mainFrame.appendChild(createBtn);

  const createBtnTxt = figma.createText();
  createBtnTxt.fontName = { family: "Inter", style: "Bold" };
  createBtnTxt.characters = "+ Tạo yêu cầu tra soát";
  createBtnTxt.fontSize = 11.5;
  createBtnTxt.fills = hexColor('#FFFFFF');
  createBtnTxt.x = createBtn.x + (180 - createBtnTxt.width) / 2;
  createBtnTxt.y = createBtn.y + 10;
  mainFrame.appendChild(createBtnTxt);


  // 6. FILTER CARD (1140px x 240px)
  const filterCard = figma.createFrame();
  filterCard.name = "Filter Card";
  filterCard.resize(1140, 230);
  filterCard.x = 260;
  filterCard.y = 154;
  filterCard.fills = hexColor('#FFFFFF');
  filterCard.strokes = hexColor('#E2E8F0');
  filterCard.cornerRadius = 6;
  mainFrame.appendChild(filterCard);

  // Khởi tạo Helper vẽ Trường lọc (Label + Dropdown)
  function drawFilterField(label, value, x, y, width = 260) {
    const lbl = figma.createText();
    lbl.fontName = { family: "Inter", style: "Bold" };
    lbl.characters = label;
    lbl.fontSize = 9.5;
    lbl.fills = hexColor('#475569');
    lbl.x = x;
    lbl.y = y;
    filterCard.appendChild(lbl);

    const inputRect = figma.createRectangle();
    inputRect.resize(width, 30);
    inputRect.x = x;
    inputRect.y = y + 16;
    inputRect.fills = hexColor('#FFFFFF');
    inputRect.strokes = hexColor('#CBD5E1');
    inputRect.cornerRadius = 4;
    filterCard.appendChild(inputRect);

    const val = figma.createText();
    val.fontName = { family: "Inter", style: "Regular" };
    val.characters = value;
    val.fontSize = 11;
    val.fills = hexColor('#1E293B');
    val.x = x + 10;
    val.y = y + 25;
    filterCard.appendChild(val);

    const arrow = figma.createText();
    arrow.fontName = { family: "Inter", style: "Regular" };
    arrow.characters = "▼";
    arrow.fontSize = 8;
    arrow.fills = hexColor('#64748B');
    arrow.x = x + width - 20;
    arrow.y = y + 26;
    filterCard.appendChild(arrow);
  }

  // 12 fields chia làm 3 hàng, mỗi hàng 4 cột
  const fields = [
    { lbl: "MERCHANT CODE", val: "Tất cả", col: 0, row: 0 },
    { lbl: "ĐỐI TÁC THANH TOÁN", val: "Tất cả", col: 1, row: 0 },
    { lbl: "LOẠI DỊCH VỤ", val: "Thanh toán", col: 2, row: 0 },
    { lbl: "VAI TRÒ GỐC", val: "TCNL (Tổ chức nhận lệnh)", col: 3, row: 0 },
    
    { lbl: "TIẾN TRÌNH TRA SOÁT (PCTS)", val: "Tất cả tiến trình", col: 0, row: 1 },
    { lbl: "TRẠNG THÁI HẾT HẠN", val: "Tất cả tình trạng hết hạn", col: 1, row: 1 },
    { lbl: "TRẠNG THÁI XỬ LÝ YCTS TẠI EPAY", val: "Tất cả kết quả tại Epay", col: 2, row: 1 },
    { lbl: "TRẠNG THÁI XỬ LÝ YCTS TẠI ĐỐI TÁC", val: "Tất cả kết quả tại đối tác", col: 3, row: 1 },
    
    { lbl: "LOẠI TRA SOÁT", val: "Tất cả", col: 0, row: 2 },
    { lbl: "NGƯỜI TẠO", val: "creator01", col: 1, row: 2 },
    { lbl: "THỜI GIAN TẠO", val: "2026-07-22", col: 2, row: 2 },
    { lbl: "NGƯỜI PHÊ DUYỆT", val: "Lisa", col: 3, row: 2 }
  ];

  fields.forEach(f => {
    const posX = 20 + f.col * 276;
    const posY = 16 + f.row * 56;
    drawFilterField(f.lbl, f.val, posX, posY, 256);
  });

  // Nút Hành động dưới Filter Card
  const resetBtn = figma.createRectangle();
  resetBtn.resize(100, 30);
  resetBtn.x = 910;
  resetBtn.y = 184;
  resetBtn.fills = hexColor('#FFFFFF');
  resetBtn.strokes = hexColor('#CBD5E1');
  resetBtn.cornerRadius = 4;
  filterCard.appendChild(resetBtn);

  const resetBtnTxt = figma.createText();
  resetBtnTxt.fontName = { family: "Inter", style: "SemiBold" };
  resetBtnTxt.characters = "Xóa bộ lọc";
  resetBtnTxt.fontSize = 11;
  resetBtnTxt.fills = hexColor('#475569');
  resetBtnTxt.x = resetBtn.x + (100 - resetBtnTxt.width) / 2;
  resetBtnTxt.y = resetBtn.y + 9;
  filterCard.appendChild(resetBtnTxt);

  const searchBtn = figma.createRectangle();
  searchBtn.resize(100, 30);
  searchBtn.x = 1020;
  searchBtn.y = 184;
  searchBtn.fills = hexColor('#2563EB');
  searchBtn.cornerRadius = 4;
  filterCard.appendChild(searchBtn);

  const searchBtnTxt = figma.createText();
  searchBtnTxt.fontName = { family: "Inter", style: "Bold" };
  searchBtnTxt.characters = "Tìm kiếm";
  searchBtnTxt.fontSize = 11;
  searchBtnTxt.fills = hexColor('#FFFFFF');
  searchBtnTxt.x = searchBtn.x + (100 - searchBtnTxt.width) / 2;
  searchBtnTxt.y = searchBtn.y + 9;
  filterCard.appendChild(searchBtnTxt);


  // 7. TAB STRIP (x = 260, y = 398)
  const tabStripFrame = figma.createFrame();
  tabStripFrame.name = "Tab Strip";
  tabStripFrame.resize(1140, 34);
  tabStripFrame.x = 260;
  tabStripFrame.y = 398;
  tabStripFrame.fills = [];
  mainFrame.appendChild(tabStripFrame);

  // Dòng gạch chân tab strip
  const tabLine = figma.createRectangle();
  tabLine.resize(1140, 1);
  tabLine.x = 0;
  tabLine.y = 33;
  tabLine.fills = hexColor('#E2E8F0');
  tabStripFrame.appendChild(tabLine);

  const tabs = [
    { text: "Tất cả", active: true, x: 10 },
    { text: "Chờ phê duyệt", active: false, x: 80 },
    { text: "Chờ xử lý", active: false, x: 200 },
    { text: "Quá hạn", active: false, x: 290 }
  ];

  tabs.forEach(tab => {
    const t = figma.createText();
    t.fontName = { family: "Inter", style: tab.active ? "Bold" : "SemiBold" };
    t.characters = tab.text;
    t.fontSize = 12;
    t.fills = hexColor(tab.active ? '#0F172A' : '#3B82F6');
    t.x = tab.x;
    t.y = 8;
    tabStripFrame.appendChild(t);

    if (tab.active) {
      // Thanh xanh lam highlight dưới chữ
      const highlight = figma.createRectangle();
      highlight.resize(t.width, 2);
      highlight.x = tab.x;
      highlight.y = 32;
      highlight.fills = hexColor('#0F172A');
      tabStripFrame.appendChild(highlight);
    }
  });


  // 8. TABLE CARD (1140px x 480px, x = 260, y = 444)
  const tableCard = figma.createFrame();
  tableCard.name = "Table Card";
  tableCard.resize(1140, 480);
  tableCard.x = 260;
  tableCard.y = 444;
  tableCard.fills = hexColor('#FFFFFF');
  tableCard.strokes = hexColor('#E2E8F0');
  tableCard.cornerRadius = 6;
  mainFrame.appendChild(tableCard);

  // Table Toolbar
  const quickSearch = figma.createRectangle();
  quickSearch.resize(320, 28);
  quickSearch.x = 16;
  quickSearch.y = 12;
  quickSearch.fills = hexColor('#FFFFFF');
  quickSearch.strokes = hexColor('#CBD5E1');
  quickSearch.cornerRadius = 4;
  tableCard.appendChild(quickSearch);

  const quickSearchTxt = figma.createText();
  quickSearchTxt.fontName = { family: "Inter", style: "Regular" };
  quickSearchTxt.characters = "🔍  Tìm kiếm theo mã tra soát, loại...";
  quickSearchTxt.fontSize = 11;
  quickSearchTxt.fills = hexColor('#94A3B8');
  quickSearchTxt.x = 26;
  quickSearchTxt.y = 20;
  tableCard.appendChild(quickSearchTxt);

  const settingBtn = figma.createRectangle();
  settingBtn.resize(100, 28);
  settingBtn.x = 1024;
  settingBtn.y = 12;
  settingBtn.fills = hexColor('#FFFFFF');
  settingBtn.strokes = hexColor('#CBD5E1');
  settingBtn.cornerRadius = 4;
  tableCard.appendChild(settingBtn);

  const settingBtnTxt = figma.createText();
  settingBtnTxt.fontName = { family: "Inter", style: "Medium" };
  settingBtnTxt.characters = "⚙  Tùy chỉnh";
  settingBtnTxt.fontSize = 11;
  settingBtnTxt.fills = hexColor('#475569');
  settingBtnTxt.x = settingBtn.x + (100 - settingBtnTxt.width) / 2;
  settingBtnTxt.y = settingBtn.y + 8;
  tableCard.appendChild(settingBtnTxt);

  // Table Header Row
  const thBg = figma.createRectangle();
  thBg.resize(1138, 32);
  thBg.x = 1;
  thBg.y = 52;
  thBg.fills = hexColor('#F8FAFC');
  tableCard.appendChild(thBg);

  const cols = [
    { text: "STT", x: 16, w: 40 },
    { text: "MÃ TRA SOÁT", x: 66, w: 100 },
    { text: "LOẠI TRA SOÁT", x: 176, w: 100 },
    { text: "LÝ DO (RQSP)", x: 286, w: 150 },
    { text: "TIẾN TRÌNH", x: 446, w: 110 },
    { text: "VAI TRÒ TS", x: 566, w: 100 },
    { text: "MÃ GD GỐC", x: 676, w: 100 },
    { text: "LOẠI GD GỐC", x: 786, w: 100 },
    { text: "THỜI GIAN TẠO", x: 896, w: 130 },
    { text: "THAO TÁC", x: 1046, w: 80 }
  ];

  cols.forEach(col => {
    const th = figma.createText();
    th.fontName = { family: "Inter", style: "Bold" };
    th.characters = col.text;
    th.fontSize = 9.5;
    th.fills = hexColor('#475569');
    th.x = col.x;
    th.y = 62;
    tableCard.appendChild(th);
  });

  // Divider Line dưới Header
  const headDivider = figma.createRectangle();
  headDivider.resize(1138, 1);
  headDivider.x = 1;
  headDivider.y = 84;
  headDivider.fills = hexColor('#E2E8F0');
  tableCard.appendChild(headDivider);

  // Helper vẽ badge tiến trình
  function drawBadge(parent, text, x, y, type) {
    const bg = figma.createRectangle();
    bg.resize(100, 20);
    bg.x = x;
    bg.y = y;
    bg.cornerRadius = 10;
    
    let txtColor = '#1E3A8A';
    if (type === 'yellow') {
      bg.fills = hexColor('#FEF9C3'); // Chờ xử lý
      txtColor = '#854D0E';
    } else if (type === 'orange') {
      bg.fills = hexColor('#FFEDD5'); // Đã kiểm tra
      txtColor = '#9A3412';
    } else if (type === 'blue') {
      bg.fills = hexColor('#DBEAFE'); // Chờ phê duyệt
      txtColor = '#1E40AF';
    } else if (type === 'green') {
      bg.fills = hexColor('#DCFCE7'); // Đã phản hồi
      txtColor = '#166534';
    } else if (type === 'red') {
      bg.fills = hexColor('#FEE2E2'); // Xử lý thất bại
      txtColor = '#991B1B';
    } else {
      bg.fills = hexColor('#F1F5F9'); // Mặc định
      txtColor = '#475569';
    }
    
    parent.appendChild(bg);

    const txt = figma.createText();
    txt.fontName = { family: "Inter", style: "Bold" };
    txt.characters = text;
    txt.fontSize = 9.5;
    txt.fills = hexColor(txtColor);
    txt.x = x + (100 - txt.width) / 2;
    txt.y = y + 5;
    parent.appendChild(txt);
  }

  // Vẽ 5 dòng Mockup Data chuẩn
  const rowData = [
    { stt: "1", id: "TS-012", type: "Sai sót", reason: "Sai sót nghiệp vụ", status: "Chờ xử lý", sType: "yellow", role: "Chủ động", origId: "TX-10012", origType: "Thanh toán", time: "24/03/2024 09:00:04" },
    { stt: "2", id: "TS-011", type: "Sai sót", reason: "Sai sót nghiệp vụ", status: "Đã kiểm tra", sType: "orange", role: "Chủ động", origId: "TX-10011", origType: "Thanh toán", time: "24/03/2024 09:00:04" },
    { stt: "3", id: "TS-001", type: "Sai sót", reason: "Sai sót nghiệp vụ", status: "Chờ phê duyệt", sType: "blue", role: "Chủ động", origId: "TX-10001", origType: "Thanh toán", time: "24/03/2024 09:00:04" },
    { stt: "4", id: "TS-003", type: "Hoàn tiền", reason: "—", status: "Đã phản hồi", sType: "green", role: "Chủ động", origId: "TX-10003", origType: "Thanh toán", time: "24/03/2024 09:00:04" },
    { stt: "5", id: "TS-007", type: "Hoàn tiền", reason: "—", status: "Xử lý thất bại", sType: "red", role: "Chủ động", origId: "TX-10007", origType: "Thanh toán", time: "24/03/2024 09:00:04" }
  ];

  let rowY = 85;
  rowData.forEach(row => {
    // Kẻ lề hàng
    const line = figma.createRectangle();
    line.resize(1138, 1);
    line.x = 1;
    line.y = rowY + 39;
    line.fills = hexColor('#F1F5F9');
    tableCard.appendChild(line);

    // Điền text các cột
    const cellSTT = figma.createText();
    cellSTT.fontName = { family: "Inter", style: "Regular" };
    cellSTT.characters = row.stt;
    cellSTT.fontSize = 11;
    cellSTT.fills = hexColor('#475569');
    cellSTT.x = 16;
    cellSTT.y = rowY + 13;
    tableCard.appendChild(cellSTT);

    const cellID = figma.createText();
    cellID.fontName = { family: "Inter", style: "Bold" };
    cellID.characters = row.id;
    cellID.fontSize = 11;
    cellID.fills = hexColor('#2563EB'); // Link blue color
    cellID.x = 66;
    cellID.y = rowY + 13;
    tableCard.appendChild(cellID);

    const cellType = figma.createText();
    cellType.fontName = { family: "Inter", style: "Regular" };
    cellType.characters = row.type;
    cellType.fontSize = 11;
    cellType.fills = hexColor('#0F172A');
    cellType.x = 176;
    cellType.y = rowY + 13;
    tableCard.appendChild(cellType);

    const cellReason = figma.createText();
    cellReason.fontName = { family: "Inter", style: "Regular" };
    cellReason.characters = row.reason;
    cellReason.fontSize = 11;
    cellReason.fills = hexColor('#0F172A');
    cellReason.x = 286;
    cellReason.y = rowY + 13;
    tableCard.appendChild(cellReason);

    // Vẽ badge tiến trình
    drawBadge(tableCard, row.status, 446, rowY + 10, row.sType);

    const cellRole = figma.createText();
    cellRole.fontName = { family: "Inter", style: "Regular" };
    cellRole.characters = row.role;
    cellRole.fontSize = 11;
    cellRole.fills = hexColor('#0F172A');
    cellRole.x = 566;
    cellRole.y = rowY + 13;
    tableCard.appendChild(cellRole);

    const cellOrig = figma.createText();
    cellOrig.fontName = { family: "Inter", style: "SemiBold" };
    cellOrig.characters = row.origId;
    cellOrig.fontSize = 11;
    cellOrig.fills = hexColor('#0F172A');
    cellOrig.x = 676;
    cellOrig.y = rowY + 13;
    tableCard.appendChild(cellOrig);

    const cellOrigType = figma.createText();
    cellOrigType.fontName = { family: "Inter", style: "Regular" };
    cellOrigType.characters = row.origType;
    cellOrigType.fontSize = 11;
    cellOrigType.fills = hexColor('#0F172A');
    cellOrigType.x = 786;
    cellOrigType.y = rowY + 13;
    tableCard.appendChild(cellOrigType);

    const cellTime = figma.createText();
    cellTime.fontName = { family: "Inter", style: "Regular" };
    cellTime.characters = row.time;
    cellTime.fontSize = 10.5;
    cellTime.fills = hexColor('#475569');
    cellTime.x = 896;
    cellTime.y = rowY + 13;
    tableCard.appendChild(cellTime);

    // Nút Thao tác: Chi tiết
    const actionTxt = figma.createText();
    actionTxt.fontName = { family: "Inter", style: "Bold" };
    actionTxt.characters = "Chi tiết";
    actionTxt.fontSize = 11;
    actionTxt.fills = hexColor('#3B82F6');
    actionTxt.x = 1046;
    actionTxt.y = rowY + 13;
    tableCard.appendChild(actionTxt);

    rowY += 40;
  });

  // Table Footer Area
  const tFootBg = figma.createRectangle();
  tFootBg.resize(1138, 44);
  tFootBg.x = 1;
  tFootBg.y = 435;
  tFootBg.fills = hexColor('#F8FAFC');
  tableCard.appendChild(tFootBg);

  const tFootBorder = figma.createRectangle();
  tFootBorder.resize(1138, 1);
  tFootBorder.x = 1;
  tFootBorder.y = 435;
  tFootBorder.fills = hexColor('#E2E8F0');
  tableCard.appendChild(tFootBorder);

  const sumTxt = figma.createText();
  sumTxt.fontName = { family: "Inter", style: "Regular" };
  sumTxt.characters = "Tổng tiền giao dịch: ";
  sumTxt.fontSize = 11.5;
  sumTxt.fills = hexColor('#475569');
  sumTxt.x = 20;
  sumTxt.y = 450;
  tableCard.appendChild(sumTxt);

  const sumVal = figma.createText();
  sumVal.fontName = { family: "Inter", style: "Bold" };
  sumVal.characters = "9,850,000 VND";
  sumVal.fontSize = 12;
  sumVal.fills = hexColor('#0F172A');
  sumVal.x = 135;
  sumVal.y = 450;
  tableCard.appendChild(sumVal);

  // Pagination controls
  const pCount = figma.createText();
  pCount.fontName = { family: "Inter", style: "Regular" };
  pCount.characters = "Hiển thị kết quả: 9 dòng";
  pCount.fontSize = 11.5;
  pCount.fills = hexColor('#64748B');
  pCount.x = 880;
  pCount.y = 450;
  tableCard.appendChild(pCount);

  // Arrow left
  const pLeft = figma.createText();
  pLeft.fontName = { family: "Inter", style: "Bold" };
  pLeft.characters = "<";
  pLeft.fontSize = 11.5;
  pLeft.fills = hexColor('#94A3B8');
  pLeft.x = 1040;
  pLeft.y = 450;
  tableCard.appendChild(pLeft);

  // Page active
  const pActiveBg = figma.createRectangle();
  pActiveBg.resize(20, 20);
  pActiveBg.x = 1066;
  pActiveBg.y = 447;
  pActiveBg.fills = hexColor('#2563EB');
  pActiveBg.cornerRadius = 4;
  tableCard.appendChild(pActiveBg);

  const pActive = figma.createText();
  pActive.fontName = { family: "Inter", style: "Bold" };
  pActive.characters = "1";
  pActive.fontSize = 11;
  pActive.fills = hexColor('#FFFFFF');
  pActive.x = pActiveBg.x + (20 - pActive.width) / 2;
  pActive.y = pActiveBg.y + 4;
  tableCard.appendChild(pActive);

  // Arrow right
  const pRight = figma.createText();
  pRight.fontName = { family: "Inter", style: "Bold" };
  pRight.characters = ">";
  pRight.fontSize = 11.5;
  pRight.fills = hexColor('#94A3B8');
  pRight.x = 1100;
  pRight.y = 450;
  tableCard.appendChild(pRight);


  // Select canvas frame & zoom into view
  figma.currentPage.selection = [mainFrame];
  figma.viewport.scrollAndZoomIntoView([mainFrame]);

  console.log("✅ ĐÃ THIẾT KẾ HOÀN TẤT MÀN HÌNH DANH SÁCH YCTS LÊN FIGMA!");
})();
