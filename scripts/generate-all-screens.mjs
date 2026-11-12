import fs from 'node:fs';

// Design System Tokens matching the User's Image Style
const TOKENS = {
  // Brand & Theme
  brandHeaderBg: '#74B4F7',     // Light sky blue sidebar header
  primaryBlue: '#1E40AF',       // Navy blue for search button & active pills
  primaryAction: '#2563EB',     // Blue for links and + Thêm mới button
  secondaryAction: '#4F46E5',   // Indigo for Tùy chỉnh button
  exportAction: '#1E3A8A',      // Darker blue for Xuất tệp
  
  // Surfaces & Backgrounds
  sidebarBg: '#FFFFFF',
  bodyBg: '#F8FAFC',
  cardBg: '#FFFFFF',
  tableHeaderBg: '#F8FAFC',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  
  // Text Colors
  ink: '#1E293B',
  inkSecondary: '#475569',
  inkMuted: '#64748B',
  inkSubtle: '#94A3B8',
  linkBlue: '#2563EB',
  
  // Status Pill Badges
  activeBg: '#DCFCE7',
  activeDot: '#16A34A',
  activeText: '#15803D',
  
  newBg: '#E0F2FE',
  newDot: '#0284C7',
  newText: '#0369A1',
  
  pendingBg: '#FEF3C7',
  pendingDot: '#D97706',
  pendingText: '#B45309',
  
  inactiveBg: '#FEE2E2',
  inactiveDot: '#DC2626',
  inactiveText: '#B91C1C',
  
  draftBg: '#F1F5F9',
  draftDot: '#64748B',
  draftText: '#475569'
};

// 1. HELPER: SIDEBAR
function buildSidebar(activeSubMenu = 'CTT') {
  const isCtt = activeSubMenu === 'CTT';
  const isQrgw = activeSubMenu === 'QRGW';

  return {
    type: 'FRAME',
    name: 'Sidebar',
    width: 230,
    height: 960,
    fill: TOKENS.sidebarBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    layoutMode: 'VERTICAL',
    children: [
      // Header brand box
      {
        type: 'FRAME',
        name: 'Sidebar Header Box',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        height: 60,
        padding: { left: 16, right: 16 },
        fill: TOKENS.brandHeaderBg,
        children: [
          {
            type: 'FRAME',
            name: 'Logo Group',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'Logo Symbol',
                width: 28,
                height: 28,
                cornerRadius: 14,
                fill: '#FFFFFF44',
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [
                  { type: 'TEXT', characters: '✦', fontSize: 16, fill: '#FFFFFF' }
                ]
              },
              { type: 'TEXT', characters: 'epay', fontSize: 20, fontWeight: 700, fill: '#FFFFFF' }
            ]
          },
          // Collapse icon
          {
            type: 'FRAME',
            name: 'Collapse Btn',
            width: 24,
            height: 24,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: '⇇', fontSize: 16, fill: '#FFFFFF' }
            ]
          }
        ]
      },

      // Menu list
      {
        type: 'FRAME',
        name: 'Menu List',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        padding: { top: 16, bottom: 16, left: 0, right: 0 },
        itemSpacing: 4,
        children: [
          // Trang chủ
          buildSidebarItem('Trang chủ', false, false),
          
          // Quản lý cấu hình phí (Expanded parent)
          {
            type: 'FRAME',
            name: 'Menu: Quản lý cấu hình phí',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            height: 40,
            padding: { left: 16, right: 16 },
            fill: '#F1F5F9',
            children: [
              { type: 'TEXT', characters: 'Quản lý cấu hình phí', fontSize: 13, fontWeight: 700, fill: TOKENS.linkBlue },
              { type: 'TEXT', characters: '▴', fontSize: 10, fill: TOKENS.linkBlue }
            ]
          },

          // Submenu Container
          {
            type: 'FRAME',
            name: 'Submenu Container',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { left: 0, right: 0 },
            children: [
              // Phí trả đối tác (Active Category)
              {
                type: 'FRAME',
                name: 'SubMenu Cat: Phí trả đối tác',
                layoutMode: 'HORIZONTAL',
                layoutAlign: 'STRETCH',
                counterAxisAlignItems: 'CENTER',
                height: 36,
                padding: { left: 24, right: 16 },
                fill: '#FFFFFF',
                children: [
                  { type: 'TEXT', characters: 'Phí trả đối tác', fontSize: 12, fontWeight: 600, fill: TOKENS.linkBlue }
                ]
              },
              // 2 Sub items newly separated: CTT and QRGW
              buildChildMenuItem('•  Phí đối tác CTT', isCtt),
              buildChildMenuItem('•  Phí đối tác QRGW', isQrgw),
              
              // Other fee items
              buildSubItem('Phí thu ĐVCNTT'),
              buildSubItem('Phí thu Khách hàng')
            ]
          },

          // Quản lý Yêu cầu phê duyệt
          buildSidebarItem('Quản lý Yêu cầu phê duyệt', false, false)
        ]
      }
    ]
  };
}

function buildSidebarItem(label, isActive, hasArrow) {
  return {
    type: 'FRAME',
    name: 'Item: ' + label,
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    primaryAxisAlignItems: hasArrow ? 'SPACE_BETWEEN' : 'MIN',
    counterAxisAlignItems: 'CENTER',
    height: 40,
    padding: { left: 16, right: 16 },
    fill: isActive ? '#F1F5F9' : '#FFFFFF',
    children: [
      { type: 'TEXT', characters: label, fontSize: 13, fontWeight: isActive ? 600 : 500, fill: isActive ? TOKENS.linkBlue : TOKENS.ink },
      ...(hasArrow ? [{ type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }] : [])
    ]
  };
}

function buildSubItem(label) {
  return {
    type: 'FRAME',
    name: 'SubItem: ' + label,
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    counterAxisAlignItems: 'CENTER',
    height: 34,
    padding: { left: 24, right: 16 },
    children: [
      { type: 'TEXT', characters: label, fontSize: 12, fontWeight: 400, fill: TOKENS.inkSecondary }
    ]
  };
}

function buildChildMenuItem(label, isActive) {
  return {
    type: 'FRAME',
    name: 'ChildItem: ' + label,
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    counterAxisAlignItems: 'CENTER',
    height: 32,
    padding: { left: 36, right: 16 },
    fill: isActive ? '#EFF6FF' : '#FFFFFF',
    stroke: isActive ? TOKENS.linkBlue : '#FFFFFF',
    strokeWeight: 1,
    children: [
      { type: 'TEXT', characters: label, fontSize: 12, fontWeight: isActive ? 600 : 400, fill: isActive ? TOKENS.linkBlue : TOKENS.inkSecondary }
    ]
  };
}

// 2. HELPER: TOPBAR
function buildTopbar() {
  return {
    type: 'FRAME',
    name: 'Topbar',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    height: 56,
    padding: { left: 24, right: 24 },
    fill: TOKENS.cardBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    children: [
      // Left Search Bar rounded
      {
        type: 'FRAME',
        name: 'Top Search Bar',
        width: 380,
        height: 36,
        cornerRadius: 6,
        fill: '#FFFFFF',
        stroke: TOKENS.border,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 12, right: 12 },
        itemSpacing: 8,
        children: [
          { type: 'TEXT', characters: '🔍', fontSize: 12, fill: TOKENS.inkMuted },
          { type: 'TEXT', characters: 'Tìm kiếm ...', fontSize: 12, fill: TOKENS.inkSubtle }
        ]
      },
      // Right Tools: Trợ giúp, Bell, Gear, User
      {
        type: 'FRAME',
        name: 'Right User Tools',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 18,
        children: [
          {
            type: 'FRAME',
            name: 'Help Group',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 4,
            children: [
              { type: 'TEXT', characters: '', fontSize: 13, fill: TOKENS.inkSecondary },
              { type: 'TEXT', characters: 'Trợ giúp', fontSize: 12, fill: TOKENS.inkSecondary }
            ]
          },
          { type: 'TEXT', characters: '🔔', fontSize: 14, fill: TOKENS.inkSecondary },
          { type: 'TEXT', characters: '⚙️', fontSize: 14, fill: TOKENS.inkSecondary },
          // User Avatar pill
          {
            type: 'FRAME',
            name: 'User Info',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'Avatar Circle',
                width: 28,
                height: 28,
                cornerRadius: 14,
                fill: '#DC2626',
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [
                  { type: 'TEXT', characters: 'L', fontSize: 12, fontWeight: 700, fill: '#FFFFFF' }
                ]
              },
              { type: 'TEXT', characters: 'Lisa ▾', fontSize: 12, fontWeight: 500, fill: TOKENS.ink }
            ]
          }
        ]
      }
    ]
  };
}

// 3. SCREEN 1: DANH SÁCH PHÍ ĐỐI TÁC CTT
export function buildScreenCttList() {
  return {
    type: 'FRAME',
    name: 'SCR-PFEE-CTT-01: Danh sách Phí Đối tác CTT',
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar('CTT'),
      {
        type: 'FRAME',
        name: 'Main Content Area',
        width: 1210,
        height: 960,
        layoutMode: 'VERTICAL',
        children: [
          buildTopbar(),
          {
            type: 'FRAME',
            name: 'Page Content',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            height: 904,
            padding: { top: 16, bottom: 20, left: 24, right: 24 },
            itemSpacing: 16,
            children: [
              // Header Row
              buildPageHeader('Quản lý cấu hình phí đối tác CTT'),
              // Filter Box
              buildCttFilterBox(),
              // Table Section
              buildCttTableSection()
            ]
          }
        ]
      }
    ]
  };
}

// 4. SCREEN 2: DANH SÁCH PHÍ ĐỐI TÁC QRGW
export function buildScreenQrgwList() {
  return {
    type: 'FRAME',
    name: 'SCR-PFEE-QRGW-01: Danh sách Phí Đối tác QRGW',
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar('QRGW'),
      {
        type: 'FRAME',
        name: 'Main Content Area',
        width: 1210,
        height: 960,
        layoutMode: 'VERTICAL',
        children: [
          buildTopbar(),
          {
            type: 'FRAME',
            name: 'Page Content',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            height: 904,
            padding: { top: 16, bottom: 20, left: 24, right: 24 },
            itemSpacing: 16,
            children: [
              // Header Row
              buildPageHeader('Quản lý cấu hình phí đối tác QRGW'),
              // Filter Box QRGW
              buildQrgwFilterBox(),
              // Table Section QRGW
              buildQrgwTableSection()
            ]
          }
        ]
      }
    ]
  };
}

// 5. SCREEN 3: THÊM MỚI CẤU HÌNH PHÍ CTT
export function buildScreenCttCreate() {
  return {
    type: 'FRAME',
    name: 'SCR-PFEE-CTT-02: Thêm mới Cấu hình Phí CTT',
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar('CTT'),
      {
        type: 'FRAME',
        name: 'Main Content Area',
        width: 1210,
        height: 960,
        layoutMode: 'VERTICAL',
        children: [
          buildTopbar(),
          {
            type: 'FRAME',
            name: 'Create Form Page',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { top: 16, bottom: 20, left: 24, right: 24 },
            itemSpacing: 16,
            children: [
              // Breadcrumb & Title Row
              {
                type: 'FRAME',
                name: 'Title & Action Bar',
                layoutMode: 'HORIZONTAL',
                layoutAlign: 'STRETCH',
                primaryAxisAlignItems: 'SPACE_BETWEEN',
                counterAxisAlignItems: 'CENTER',
                children: [
                  {
                    type: 'FRAME',
                    name: 'Heading Group',
                    layoutMode: 'VERTICAL',
                    itemSpacing: 4,
                    children: [
                      { type: 'TEXT', characters: 'Thêm mới cấu hình phí đối tác CTT', fontSize: 18, fontWeight: 700, fill: TOKENS.ink },
                      { type: 'TEXT', characters: 'Quản lý cấu hình phí  /  Phí trả đối tác  /  Phí đối tác CTT  /  Tạo mới', fontSize: 11, fill: TOKENS.inkMuted }
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Form Actions',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 8,
                    children: [
                      buildButton('Hủy bỏ', '#FFFFFF', TOKENS.borderDark, TOKENS.inkSecondary),
                      buildButton('Lưu nháp', '#FFFFFF', TOKENS.borderDark, TOKENS.inkSecondary),
                      buildButton('Gửi phê duyệt ✓', TOKENS.primaryAction, TOKENS.primaryAction, '#FFFFFF')
                    ]
                  }
                ]
              },
              // Card 1: Thông tin chung
              buildFormCard('1. THÔNG TIN CHUNG', [
                [
                  { label: 'Đối tác / Ngân hàng hưởng phí *', val: 'Chọn đối tác (VietinBank, BIDV...)' },
                  { label: 'Loại phí *', val: 'Phí thanh toán ▾' },
                  { label: 'Thời gian áp dụng *', val: '01/01/2026 ~ 31/12/2026 📅' },
                  { label: 'Thuế VAT *', val: '8% ▾' }
                ],
                [
                  { label: 'Kỳ trả phí *', val: 'Tháng ▾' },
                  { label: 'Đồng tiền thanh toán', val: 'VND ▾' },
                  { label: 'Ghi chú / Căn cứ hợp đồng', val: 'HĐ số 2026/EPAY-VTB...' },
                  { label: 'Quy tắc chống trùng lặp', val: 'BR-PFEE-02A: Check trùng MCC' }
                ]
              ]),
              // Card 2: Phương thức thanh toán & Phân nhánh MCC
              buildFormCard('2. PHƯƠNG THỨC THANH TOÁN & MCC', [
                [
                  { label: 'Phương thức thanh toán *', val: 'Thẻ quốc tế (Visa, Master, JCB) ▾' },
                  { label: 'Nơi phát hành *', val: 'Trong nước  |  Nước ngoài ▾' },
                  { label: 'Trạng thái giao dịch (Phí XLGD)', val: 'Tất cả  |  Thành công  |  Thất bại ▾' },
                  { label: 'Mã MCC áp dụng *', val: '5411 (Siêu thị & Bán lẻ) ▾' }
                ],
                [
                  { label: 'Loại giao dịch áp dụng *', val: 'Thanh toán  &  Hoàn trả ▾' },
                  { label: 'Ngày áp dụng phí (Khi Hoàn trả) *', val: 'Ngày GD gốc  |  Ngày tạo GD hoàn trả ▾' },
                  { label: 'Thương hiệu thẻ áp dụng', val: '☑ Tất cả thẻ (Visa, Master, JCB)' },
                  { label: 'Cơ chế thương hiệu', val: 'Áp dụng chung mức phí các brand' }
                ]
              ]),
              // Card 3: Hình thức thu phí & Mức phí
              buildFormCard('3. HÌNH THỨC THU PHÍ & MỨC PHÍ CẤU HÌNH', [
                [
                  { label: 'Hình thức thu phí *', val: 'Theo GTGD (% Tỷ lệ) ▾' },
                  { label: 'Mức phí tỷ lệ (%) *', val: '1.25 %' },
                  { label: 'Mức phí tối thiểu (Min)', val: '5.000 đ' },
                  { label: 'Mức phí tối đa (Max)', val: '50.000 đ' }
                ],
                [
                  { label: 'Tùy chọn khác', val: 'Áp dụng biểu phí 1 bậc cố định' },
                  { label: 'Đơn vị tính', val: 'VNĐ / Giao dịch' },
                  { label: 'Kỳ tính phí', val: 'Chốt số liệu ngày cuối tháng' },
                  { label: 'Mô tả mức phí hiển thị', val: '1.25% (Min 5.000đ, Max 50.000đ)' }
                ]
              ])
            ]
          }
        ]
      }
    ]
  };
}

// 6. SCREEN 4: CHI TIẾT CẤU HÌNH PHÍ CTT
export function buildScreenCttDetail() {
  return {
    type: 'FRAME',
    name: 'SCR-PFEE-CTT-03: Chi tiết Cấu hình Phí CTT',
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar('CTT'),
      {
        type: 'FRAME',
        name: 'Main Content Area',
        width: 1210,
        height: 960,
        layoutMode: 'VERTICAL',
        children: [
          buildTopbar(),
          {
            type: 'FRAME',
            name: 'Detail Page Body',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { top: 16, bottom: 20, left: 24, right: 24 },
            itemSpacing: 16,
            children: [
              // Top Title + Status Pill + Actions
              {
                type: 'FRAME',
                name: 'Detail Header',
                layoutMode: 'HORIZONTAL',
                layoutAlign: 'STRETCH',
                primaryAxisAlignItems: 'SPACE_BETWEEN',
                counterAxisAlignItems: 'CENTER',
                children: [
                  {
                    type: 'FRAME',
                    name: 'Code & Status',
                    layoutMode: 'HORIZONTAL',
                    counterAxisAlignItems: 'CENTER',
                    itemSpacing: 12,
                    children: [
                      { type: 'TEXT', characters: 'Cấu hình: SM_PN_DC_006', fontSize: 18, fontWeight: 700, fill: TOKENS.ink },
                      buildStatusPill('ACTIVE', TOKENS.activeBg, TOKENS.activeDot, TOKENS.activeText)
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Actions',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 8,
                    children: [
                      buildButton('Quay lại danh sách ↵', '#FFFFFF', TOKENS.borderDark, TOKENS.inkSecondary),
                      buildButton('Sao chép cấu hình ⎘', '#FFFFFF', TOKENS.borderDark, TOKENS.inkSecondary),
                      buildButton('Chỉnh sửa ✎', TOKENS.primaryAction, TOKENS.primaryAction, '#FFFFFF')
                    ]
                  }
                ]
              },
              // Detail Summary Cards
              buildDetailSummaryGrid(),
              // Audit Log & Approval Info
              buildAuditLogCard()
            ]
          }
        ]
      }
    ]
  };
}

// ----------------- SUB-BUILDERS -----------------

function buildPageHeader(title) {
  return {
    type: 'FRAME',
    name: 'Page Header Row',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    children: [
      { type: 'TEXT', characters: title, fontSize: 18, fontWeight: 700, fill: TOKENS.ink },
      {
        type: 'FRAME',
        name: 'Top Right Actions',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 8,
        children: [
          // Nút Tra cứu
          {
            type: 'FRAME',
            name: 'Btn Tra Cuu',
            height: 34,
            padding: { left: 14, right: 14 },
            cornerRadius: 6,
            fill: '#FFFFFF',
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '🔍  Tra cứu', fontSize: 12, fontWeight: 500, fill: TOKENS.linkBlue }
            ]
          },
          // Nút Xuất tệp
          {
            type: 'FRAME',
            name: 'Btn Xuat Tep',
            height: 34,
            padding: { left: 14, right: 14 },
            cornerRadius: 6,
            fill: TOKENS.exportAction,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '☁  Xuất tệp ▾', fontSize: 12, fontWeight: 500, fill: '#FFFFFF' }
            ]
          },
          // Nút Thêm mới
          {
            type: 'FRAME',
            name: 'Btn Them Moi',
            height: 34,
            padding: { left: 16, right: 16 },
            cornerRadius: 6,
            fill: TOKENS.primaryAction,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '+  Thêm mới', fontSize: 12, fontWeight: 600, fill: '#FFFFFF' }
            ]
          }
        ]
      }
    ]
  };
}

function buildCttFilterBox() {
  return {
    type: 'FRAME',
    name: 'Filter Card',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    padding: { top: 14, bottom: 14, left: 16, right: 16 },
    cornerRadius: 8,
    fill: TOKENS.cardBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 10,
    children: [
      // Hàng 1
      {
        type: 'FRAME',
        name: 'Filter Row 1',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 12,
        children: [
          buildDropdown('Loại phí', '-- Tất cả -- ▾', 270),
          buildDropdown('Đối tác / Ngân hàng', '-- Tất cả -- ▾', 270),
          buildDropdown('Phương thức thanh toán', '-- Tất cả -- ▾', 270),
          buildDropdown('Đồng tiền', 'VND ▾', 270)
        ]
      },
      // Hàng 2
      {
        type: 'FRAME',
        name: 'Filter Row 2',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 12,
        children: [
          buildDropdown('Hình thức thu phí', '-- Tất cả (1 bậc, Theo SLGD, Theo GTGD) -- ▾', 270),
          buildDropdown('Kỳ trả phí', '-- Tất cả -- ▾', 270),
          buildDropdown('Thời gian áp dụng phí', '01/01/2026 - 31/12/2026 📅', 270),
          buildDropdown('Mã MCC', '-- Tất cả (5411, 4829...) -- ▾', 270)
        ]
      },
      // Hàng nút Action
      {
        type: 'FRAME',
        name: 'Filter Action Buttons',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        primaryAxisAlignItems: 'MAX',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 8,
        children: [
          {
            type: 'FRAME',
            name: 'Btn Clear Filter',
            height: 32,
            padding: { left: 14, right: 14 },
            cornerRadius: 4,
            fill: '#FFFFFF',
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: 'Xóa bộ lọc', fontSize: 11, fontWeight: 500, fill: TOKENS.inkSecondary }
            ]
          },
          {
            type: 'FRAME',
            name: 'Btn Search Filter',
            height: 32,
            padding: { left: 16, right: 16 },
            cornerRadius: 4,
            fill: TOKENS.primaryBlue,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '🔍  Tìm kiếm', fontSize: 11, fontWeight: 600, fill: '#FFFFFF' }
            ]
          }
        ]
      }
    ]
  };
}

function buildQrgwFilterBox() {
  return {
    type: 'FRAME',
    name: 'Filter Card QRGW',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    padding: { top: 14, bottom: 14, left: 16, right: 16 },
    cornerRadius: 8,
    fill: TOKENS.cardBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 10,
    children: [
      // Hàng 1
      {
        type: 'FRAME',
        name: 'Filter Row 1',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 12,
        children: [
          buildDropdown('Loại phí', '-- Tất cả -- ▾', 270),
          buildDropdown('Đối tác / Ngân hàng', '-- Tất cả -- ▾', 270),
          buildDropdown('Loại dịch vụ QRGW', 'Thu hộ / Chi hộ ▾', 270),
          buildDropdown('Đồng tiền', 'VND ▾', 270)
        ]
      },
      // Hàng 2
      {
        type: 'FRAME',
        name: 'Filter Row 2',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 12,
        children: [
          buildDropdown('Hình thức thu phí', '-- Tất cả (1 bậc, Theo SLGD, Theo GTGD) -- ▾', 270),
          buildDropdown('Kỳ trả phí', '-- Tất cả (Phiên, Ngày, Tháng...) -- ▾', 270),
          buildDropdown('Thời gian áp dụng phí', '01/01/2026 - 31/12/2026 📅', 270),
          buildDropdown('Loại giao dịch', 'Thanh toán / Hoàn trả ▾', 270)
        ]
      },
      // Hàng nút Action
      {
        type: 'FRAME',
        name: 'Filter Action Buttons',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        primaryAxisAlignItems: 'MAX',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 8,
        children: [
          {
            type: 'FRAME',
            name: 'Btn Clear Filter',
            height: 32,
            padding: { left: 14, right: 14 },
            cornerRadius: 4,
            fill: '#FFFFFF',
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: 'Xóa bộ lọc', fontSize: 11, fontWeight: 500, fill: TOKENS.inkSecondary }
            ]
          },
          {
            type: 'FRAME',
            name: 'Btn Search Filter',
            height: 32,
            padding: { left: 16, right: 16 },
            cornerRadius: 4,
            fill: TOKENS.primaryBlue,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '🔍  Tìm kiếm', fontSize: 11, fontWeight: 600, fill: '#FFFFFF' }
            ]
          }
        ]
      }
    ]
  };
}

function buildDropdown(label, placeholder, width) {
  return {
    type: 'FRAME',
    name: 'Field: ' + label,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 4,
    children: [
      { type: 'TEXT', characters: label, fontSize: 11, fontWeight: 500, fill: TOKENS.inkSecondary },
      {
        type: 'FRAME',
        name: 'Input Frame',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        height: 32,
        padding: { left: 10, right: 10 },
        cornerRadius: 4,
        fill: '#FFFFFF',
        stroke: TOKENS.border,
        strokeWeight: 1,
        children: [
          { type: 'TEXT', characters: placeholder, fontSize: 11, fill: TOKENS.ink }
        ]
      }
    ]
  };
}

function buildCttTableSection() {
  return {
    type: 'FRAME',
    name: 'Table Card Section',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    itemSpacing: 10,
    children: [
      // Tabs and Quick Search Toolbar
      {
        type: 'FRAME',
        name: 'Tabs and Quick Search Bar',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        children: [
          // Left Tabs
          {
            type: 'FRAME',
            name: 'Status Tabs',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 16,
            children: [
              { type: 'TEXT', characters: 'Tất cả', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted },
              { type: 'TEXT', characters: 'Đang hoạt động', fontSize: 12, fontWeight: 700, fill: TOKENS.linkBlue },
              { type: 'TEXT', characters: 'Chờ phê duyệt', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted }
            ]
          },
          // Right Controls
          {
            type: 'FRAME',
            name: 'Table Right Controls',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 8,
            children: [
              // Search input
              {
                type: 'FRAME',
                name: 'Table Search Box',
                width: 280,
                height: 32,
                cornerRadius: 4,
                fill: '#FFFFFF',
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 10, right: 10 },
                itemSpacing: 6,
                children: [
                  { type: 'TEXT', characters: '🔍', fontSize: 11, fill: TOKENS.inkMuted },
                  { type: 'TEXT', characters: 'Tìm kiếm theo mã cấu hình, tên cấu hình', fontSize: 11, fill: TOKENS.inkSubtle }
                ]
              },
              // Tuy Chinh button
              {
                type: 'FRAME',
                name: 'Btn Tuy Chinh',
                height: 32,
                padding: { left: 12, right: 12 },
                cornerRadius: 4,
                fill: TOKENS.secondaryAction,
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 6,
                children: [
                  { type: 'TEXT', characters: '🎛️  Tùy chỉnh', fontSize: 11, fontWeight: 600, fill: '#FFFFFF' }
                ]
              }
            ]
          }
        ]
      },

      // Table Grid Card
      {
        type: 'FRAME',
        name: 'Data Table Card',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        cornerRadius: 6,
        fill: '#FFFFFF',
        stroke: TOKENS.border,
        strokeWeight: 1,
        children: [
          // Header
          buildTableHeader([
            { label: 'STT', w: 40 },
            { label: 'MÃ CẤU HÌNH PHÍ', w: 140 },
            { label: 'TRẠNG THÁI CẤU HÌNH', w: 140 },
            { label: 'ĐỐI TÁC HƯỞNG PHÍ', w: 150 },
            { label: 'PHƯƠNG THỨC THANH TOÁN', w: 160 },
            { label: 'LOẠI PHÍ', w: 130 },
            { label: 'HÌNH THỨC THU PHÍ', w: 150 },
            { label: 'THUẾ VAT', w: 70 },
            { label: 'THỜI GIAN ÁP DỤNG', w: 110 },
            { label: 'THAO TÁC', w: 50 }
          ]),
          // Rows
          buildTableRowData('1', 'SM_PN_DC_007', 'NEW', 'VietComBank', 'Thẻ quốc tế', 'Phí thanh toán', 'Theo GTGD (1.25%)', '8%', '01/01/2026'),
          buildTableRowData('2', 'SM_PN_DC_006', 'ACTIVE', 'Vietcombank', 'Thẻ quốc tế', 'Phí thanh toán', 'Theo GTGD (1.25%)', '8%', '01/01/2026'),
          buildTableRowData('3', 'SM_PN_DC_005', 'PENDING', 'MBBank', 'Thẻ nội địa', 'Phí XLGD', '1 bậc (1.100 đ/GD)', '8%', '01/01/2026'),
          buildTableRowData('4', 'SM_PN_DC_004', 'ACTIVE', 'Techcombank', 'Tài khoản ngân hàng', 'Phí thanh toán', 'Theo SLGD (Bậc thang)', '8%', '01/01/2026'),
          buildTableRowData('5', 'SM_PN_DC_002', 'INACTIVE', 'VietComBank', 'Thẻ quốc tế', 'Phí thanh toán', 'Theo GTGD', '8%', '01/01/2026'),
          buildTableRowData('6', 'SM_PN_DC_001', 'DRAFT', 'VietComBank', 'Thẻ nội địa', 'Phí XLGD', '1 bậc', '8%', '01/01/2026'),
          // Pagination
          buildTablePagination()
        ]
      }
    ]
  };
}

function buildQrgwTableSection() {
  return {
    type: 'FRAME',
    name: 'Table Card Section QRGW',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    itemSpacing: 10,
    children: [
      // Tabs and Quick Search Toolbar
      {
        type: 'FRAME',
        name: 'Tabs and Quick Search Bar',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        children: [
          // Left Tabs
          {
            type: 'FRAME',
            name: 'Status Tabs',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 16,
            children: [
              { type: 'TEXT', characters: 'Tất cả', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted },
              { type: 'TEXT', characters: 'Đang hoạt động', fontSize: 12, fontWeight: 700, fill: TOKENS.linkBlue },
              { type: 'TEXT', characters: 'Chờ phê duyệt', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted }
            ]
          },
          // Right Controls
          {
            type: 'FRAME',
            name: 'Table Right Controls',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'Table Search Box',
                width: 280,
                height: 32,
                cornerRadius: 4,
                fill: '#FFFFFF',
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 10, right: 10 },
                itemSpacing: 6,
                children: [
                  { type: 'TEXT', characters: '🔍', fontSize: 11, fill: TOKENS.inkMuted },
                  { type: 'TEXT', characters: 'Tìm kiếm theo mã cấu hình, tên cấu hình', fontSize: 11, fill: TOKENS.inkSubtle }
                ]
              },
              {
                type: 'FRAME',
                name: 'Btn Tuy Chinh',
                height: 32,
                padding: { left: 12, right: 12 },
                cornerRadius: 4,
                fill: TOKENS.secondaryAction,
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 6,
                children: [
                  { type: 'TEXT', characters: '🎛️  Tùy chỉnh', fontSize: 11, fontWeight: 600, fill: '#FFFFFF' }
                ]
              }
            ]
          }
        ]
      },

      // Table Grid Card
      {
        type: 'FRAME',
        name: 'Data Table Card QRGW',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        cornerRadius: 6,
        fill: '#FFFFFF',
        stroke: TOKENS.border,
        strokeWeight: 1,
        children: [
          // Header (Có cột LOẠI DỊCH VỤ thay vì PTTT)
          buildTableHeader([
            { label: 'STT', w: 40 },
            { label: 'MÃ CẤU HÌNH PHÍ', w: 140 },
            { label: 'TRẠNG THÁI CẤU HÌNH', w: 140 },
            { label: 'ĐỐI TÁC HƯỞNG PHÍ', w: 150 },
            { label: 'LOẠI DỊCH VỤ', w: 160 },
            { label: 'LOẠI PHÍ', w: 130 },
            { label: 'HÌNH THỨC THU PHÍ', w: 150 },
            { label: 'THUẾ VAT', w: 70 },
            { label: 'THỜI GIAN ÁP DỤNG', w: 110 },
            { label: 'THAO TÁC', w: 50 }
          ]),
          // Rows QRGW
          buildTableRowData('1', 'QR_PN_DC_004', 'NEW', 'KBank', 'Thu hộ QR', 'Phí XLGD', 'Theo SLGD (500đ ~ 1.200đ)', '8%', '01/01/2026'),
          buildTableRowData('2', 'QR_PN_DC_003', 'ACTIVE', 'Kbank', 'Chi hộ QR', 'Phí thanh toán', 'Theo GTGD (0.15%)', '8%', '01/01/2026'),
          buildTableRowData('3', 'QR_PN_DC_002', 'ACTIVE', 'BIDV', 'Thu hộ QR', 'Phí XLGD', '1 bậc (1.000 đ/GD)', '8%', '01/02/2026'),
          buildTableRowData('4', 'QR_PN_DC_001', 'PENDING', 'Vietcombank', 'Chi hộ QR', 'Phí thanh toán', 'Theo GTGD (0.12%)', '8%', '15/02/2026'),
          // Pagination
          buildTablePagination()
        ]
      }
    ]
  };
}

function buildTableHeader(cols) {
  return {
    type: 'FRAME',
    name: 'Table Header Row',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    counterAxisAlignItems: 'CENTER',
    height: 40,
    fill: TOKENS.tableHeaderBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    padding: { left: 16, right: 16 },
    children: cols.map(c => ({
      type: 'FRAME',
      name: 'Th: ' + c.label,
      width: c.w,
      layoutMode: 'HORIZONTAL',
      counterAxisAlignItems: 'CENTER',
      children: [
        { type: 'TEXT', characters: c.label, fontSize: 10, fontWeight: 700, fill: TOKENS.inkSecondary }
      ]
    }))
  };
}

function buildTableRowData(stt, code, status, partner, method, feeType, pricingModel, vat, date) {
  let pill = buildStatusPill(status, TOKENS.activeBg, TOKENS.activeDot, TOKENS.activeText);
  if (status === 'NEW') pill = buildStatusPill(status, TOKENS.newBg, TOKENS.newDot, TOKENS.newText);
  if (status === 'PENDING') pill = buildStatusPill(status, TOKENS.pendingBg, TOKENS.pendingDot, TOKENS.pendingText);
  if (status === 'INACTIVE') pill = buildStatusPill(status, TOKENS.inactiveBg, TOKENS.inactiveDot, TOKENS.inactiveText);
  if (status === 'DRAFT') pill = buildStatusPill(status, TOKENS.draftBg, TOKENS.draftDot, TOKENS.draftText);

  return {
    type: 'FRAME',
    name: 'Row: ' + code,
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    counterAxisAlignItems: 'CENTER',
    height: 44,
    fill: '#FFFFFF',
    stroke: TOKENS.border,
    strokeWeight: 1,
    padding: { left: 16, right: 16 },
    children: [
      { type: 'FRAME', name: 'Td STT', width: 40, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: stt, fontSize: 11, fill: TOKENS.inkMuted }] },
      { type: 'FRAME', name: 'Td Code', width: 140, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: code, fontSize: 11, fontWeight: 600, fill: TOKENS.linkBlue }] },
      { type: 'FRAME', name: 'Td Status', width: 140, layoutMode: 'HORIZONTAL', children: [pill] },
      { type: 'FRAME', name: 'Td Partner', width: 150, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: partner, fontSize: 11, fill: TOKENS.ink }] },
      { type: 'FRAME', name: 'Td Method', width: 160, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: method, fontSize: 11, fill: TOKENS.ink }] },
      { type: 'FRAME', name: 'Td FeeType', width: 130, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: feeType, fontSize: 11, fill: TOKENS.inkSecondary }] },
      { type: 'FRAME', name: 'Td Pricing', width: 150, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: pricingModel, fontSize: 11, fill: TOKENS.ink }] },
      { type: 'FRAME', name: 'Td VAT', width: 70, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: vat, fontSize: 11, fill: TOKENS.inkSecondary }] },
      { type: 'FRAME', name: 'Td Date', width: 110, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: date, fontSize: 11, fill: TOKENS.inkMuted }] },
      { type: 'FRAME', name: 'Td Action', width: 50, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '☰', fontSize: 13, fill: TOKENS.inkSecondary }] }
    ]
  };
}

function buildStatusPill(statusText, bg, dotColor, textColor) {
  return {
    type: 'FRAME',
    name: 'Status Pill: ' + statusText,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 8, right: 8, top: 3, bottom: 3 },
    cornerRadius: 9999,
    fill: bg,
    itemSpacing: 6,
    children: [
      {
        type: 'FRAME',
        name: 'Dot',
        width: 6,
        height: 6,
        cornerRadius: 3,
        fill: dotColor
      },
      { type: 'TEXT', characters: statusText, fontSize: 10, fontWeight: 700, fill: textColor }
    ]
  };
}

function buildTablePagination() {
  return {
    type: 'FRAME',
    name: 'Table Pagination Bar',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    height: 44,
    padding: { left: 16, right: 16 },
    stroke: TOKENS.border,
    strokeWeight: 1,
    children: [
      {
        type: 'FRAME',
        name: 'Left Results Counter',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 8,
        children: [
          { type: 'TEXT', characters: '06 kết quả', fontSize: 11, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Page Size Selector',
            height: 26,
            padding: { left: 8, right: 8 },
            cornerRadius: 4,
            fill: '#FFFFFF',
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: '06 dòng ▾', fontSize: 11, fill: TOKENS.ink }
            ]
          }
        ]
      },
      {
        type: 'FRAME',
        name: 'Right Pagination Nav',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 4,
        children: [
          buildPageBtnItem('<', false),
          buildPageBtnItem('1', true),
          buildPageBtnItem('2', false),
          buildPageBtnItem('3', false),
          buildPageBtnItem('>', false)
        ]
      }
    ]
  };
}

function buildPageBtnItem(label, isActive) {
  return {
    type: 'FRAME',
    name: 'Btn: ' + label,
    width: 26,
    height: 26,
    cornerRadius: 4,
    fill: isActive ? TOKENS.inkSecondary : '#FFFFFF',
    stroke: TOKENS.border,
    strokeWeight: 1,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    children: [
      { type: 'TEXT', characters: label, fontSize: 11, fontWeight: isActive ? 600 : 400, fill: isActive ? '#FFFFFF' : TOKENS.ink }
    ]
  };
}

function buildFormCard(title, rows) {
  return {
    type: 'FRAME',
    name: 'Form Card: ' + title,
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    padding: { top: 14, bottom: 14, left: 16, right: 16 },
    cornerRadius: 8,
    fill: TOKENS.cardBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 10,
    children: [
      { type: 'TEXT', characters: title, fontSize: 12, fontWeight: 700, fill: TOKENS.linkBlue },
      ...rows.map((r, i) => ({
        type: 'FRAME',
        name: 'Form Row ' + (i + 1),
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 12,
        children: r.map(f => buildDropdown(f.label, f.val, 270))
      }))
    ]
  };
}

function buildButton(label, bg, strokeColor, textColor) {
  return {
    type: 'FRAME',
    name: 'Btn: ' + label,
    height: 34,
    padding: { left: 14, right: 14 },
    cornerRadius: 6,
    fill: bg,
    stroke: strokeColor,
    strokeWeight: 1,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    children: [
      { type: 'TEXT', characters: label, fontSize: 12, fontWeight: 600, fill: textColor }
    ]
  };
}

function buildDetailSummaryGrid() {
  return {
    type: 'FRAME',
    name: 'Detail Summary Grid',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    itemSpacing: 12,
    children: [
      buildFormCard('1. THÔNG TIN BẢN GHI CẤU HÌNH PHÍ', [
        [
          { label: 'Mã cấu hình', val: 'SM_PN_DC_006' },
          { label: 'Đối tác / Ngân hàng', val: 'Vietcombank (VCB)' },
          { label: 'Loại biểu phí', val: 'Phí thanh toán' },
          { label: 'Trạng thái hiệu lực', val: 'ACTIVE (Đang áp dụng)' }
        ],
        [
          { label: 'Phương thức thanh toán', val: 'Thẻ quốc tế (Visa, Master)' },
          { label: 'Nơi phát hành thẻ', val: 'Trong nước' },
          { label: 'Mã MCC cấu hình', val: '5411 (Bán lẻ / Siêu thị)' },
          { label: 'Kỳ trả phí', val: 'Hàng tháng' }
        ]
      ]),
      buildFormCard('2. MỨC PHÍ & QUY TẮC TÍNH TOÁN', [
        [
          { label: 'Hình thức thu phí', val: 'Theo GTGD (% Tỷ lệ giao dịch)' },
          { label: 'Mức phí áp dụng', val: '1.25 %' },
          { label: 'Mức phí tối thiểu (Min)', val: '5.000 VNĐ' },
          { label: 'Mức phí tối đa (Max)', val: '50.000 VNĐ' }
        ],
        [
          { label: 'Thuế suất VAT', val: '8%' },
          { label: 'Ngày áp dụng phí hoàn trả', val: 'Ngày giao dịch gốc' },
          { label: 'Thời gian áp dụng', val: '01/01/2026 ~ 31/12/2026' },
          { label: 'Quy tắc chống trùng lặp', val: 'Đã xác thực BR-PFEE-02A: Không trùng MCC' }
        ]
      ])
    ]
  };
}

function buildAuditLogCard() {
  return {
    type: 'FRAME',
    name: 'Audit Log Card',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    padding: { top: 14, bottom: 14, left: 16, right: 16 },
    cornerRadius: 8,
    fill: TOKENS.cardBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 8,
    children: [
      { type: 'TEXT', characters: '3. NHẬT KÝ THAY ĐỔI & PHÊ DUYỆT (AUDIT TRAIL)', fontSize: 12, fontWeight: 700, fill: TOKENS.linkBlue },
      { type: 'TEXT', characters: '• 01/01/2026 09:30:15 - Tạo mới cấu hình bởi: Lisa (Chuyên viên BA/Vận hành)', fontSize: 11, fill: TOKENS.inkSecondary },
      { type: 'TEXT', characters: '• 01/01/2026 10:15:42 - Duyệt cấu hình bởi: Admin Dương (Trưởng phòng Vận hành)', fontSize: 11, fill: TOKENS.inkSecondary },
      { type: 'TEXT', characters: '• 01/01/2026 10:15:45 - Hệ thống tự động kích hoạt trạng thái: ACTIVE', fontSize: 11, fill: TOKENS.activeText }
    ]
  };
}

// 7. COMPONENT OVERVIEW: ACTION MENUS THEO 6 TRẠNG THÁI
export function buildActionMenusOverview() {
  return {
    type: 'FRAME',
    name: 'SCR-COMP-ACTIONS: Ma trận Menu Thao tác (6 Trạng thái)',
    width: 1440,
    height: 480,
    fill: '#F8FAFC',
    layoutMode: 'VERTICAL',
    padding: 24,
    itemSpacing: 16,
    children: [
      // Title
      {
        type: 'FRAME',
        name: 'Header Group',
        layoutMode: 'VERTICAL',
        itemSpacing: 4,
        children: [
          { type: 'TEXT', characters: 'MA TRẬN MENU THAO TÁC (ACTION MENU KHI CLICK ICON ⋮ TẠI BẢNG DANH SÁCH)', fontSize: 16, fontWeight: 700, fill: TOKENS.ink },
          { type: 'TEXT', characters: 'Hiển thị các hành động Enable/Disable tùy biến chính xác theo 6 trạng thái vòng đời của biểu phí', fontSize: 12, fill: TOKENS.inkMuted }
        ]
      },
      // 6 Menu cards row
      {
        type: 'FRAME',
        name: 'Menus Row',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 16,
        children: [
          buildSingleActionMenuCard('DRAFT (Bản nháp)', TOKENS.draftBg, TOKENS.draftText, [
            { group: 'XỬ LÝ CẤU HÌNH', items: ['💾  Lưu nháp', '✨  Tạo mới (Gửi duyệt)'] },
            { group: 'TIỆN ÍCH', items: ['👁  Xem chi tiết', '⏱  Xem lịch sử hoạt động'] },
            { group: 'NGUY HIỂM', items: ['🗑  Xóa cấu hình'], isDanger: true }
          ]),
          buildSingleActionMenuCard('NEW (Tạo mới)', TOKENS.newBg, TOKENS.newText, [
            { group: 'XỬ LÝ CẤU HÌNH', items: ['✎  Cập nhật thông tin', '🚀  Gửi phê duyệt'] },
            { group: 'TIỆN ÍCH', items: ['👁  Xem chi tiết', '⏱  Xem lịch sử hoạt động'] }
          ]),
          buildSingleActionMenuCard('PENDING (Chờ duyệt)', TOKENS.pendingBg, TOKENS.pendingText, [
            { group: 'XỬ LÝ CẤU HÌNH (CHECKER)', items: ['✓  Duyệt cấu hình', '✗  Hủy phê duyệt (Từ chối)'] },
            { group: 'TIỆN ÍCH', items: ['👁  Xem chi tiết', '⏱  Lịch sử giao dịch'] }
          ]),
          buildSingleActionMenuCard('READY (Chờ hiệu lực)', TOKENS.newBg, TOKENS.newText, [
            { group: 'XỬ LÝ CẤU HÌNH', items: ['✎  Cập nhật thông tin'] },
            { group: 'TIỆN ÍCH', items: ['👁  Xem chi tiết', '⏱  Xem lịch sử hoạt động'] }
          ]),
          buildSingleActionMenuCard('ACTIVE (Đang chạy)', TOKENS.activeBg, TOKENS.activeText, [
            { group: 'XỬ LÝ CẤU HÌNH', items: ['✎  Cập nhật thông tin', '⏸  Yêu cầu tạm dừng'] },
            { group: 'TIỆN ÍCH', items: ['👁  Xem chi tiết', '⏱  Xem lịch sử hoạt động'] }
          ]),
          buildSingleActionMenuCard('INACTIVE (Tạm dừng)', TOKENS.inactiveBg, TOKENS.inactiveText, [
            { group: 'XỬ LÝ CẤU HÌNH', items: ['▶  Yêu cầu kích hoạt', '✎  Cập nhật thông tin'] },
            { group: 'TIỆN ÍCH', items: ['👁  Xem chi tiết', '⏱  Xem lịch sử hoạt động'] }
          ])
        ]
      }
    ]
  };
}

function buildSingleActionMenuCard(statusLabel, pillBg, pillText, groups) {
  return {
    type: 'FRAME',
    name: 'Menu: ' + statusLabel,
    width: 218,
    layoutMode: 'VERTICAL',
    padding: 10,
    cornerRadius: 8,
    fill: '#FFFFFF',
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 8,
    children: [
      // Pill Header
      {
        type: 'FRAME',
        name: 'Header Pill',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 8, right: 8, top: 4, bottom: 4 },
        cornerRadius: 4,
        fill: pillBg,
        children: [
          { type: 'TEXT', characters: statusLabel, fontSize: 10, fontWeight: 700, fill: pillText }
        ]
      },
      // Groups
      ...groups.map(g => ({
        type: 'FRAME',
        name: 'Group: ' + g.group,
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 3,
        children: [
          { type: 'TEXT', characters: g.group, fontSize: 9, fontWeight: 700, fill: TOKENS.inkSubtle },
          ...g.items.map(it => ({
            type: 'FRAME',
            name: 'Item: ' + it,
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            counterAxisAlignItems: 'CENTER',
            height: 28,
            padding: { left: 8, right: 8 },
            cornerRadius: 4,
            fill: g.isDanger ? '#FEF2F2' : '#F8FAFC',
            children: [
              { type: 'TEXT', characters: it, fontSize: 11, fontWeight: 500, fill: g.isDanger ? '#DC2626' : TOKENS.ink }
            ]
          }))
        ]
      }))
    ]
  };
}

// Generate all specs and write to JSON
const allSpecs = [
  { ...buildScreenCttList(), x: 0, y: 0 },
  { ...buildActionMenusOverview(), x: 0, y: 1020 },
  { ...buildScreenQrgwList(), x: 1540, y: 0 },
  { ...buildScreenCttCreate(), x: 3080, y: 0 },
  { ...buildScreenCttDetail(), x: 4620, y: 0 }
];

fs.writeFileSync('d:/BA Master Flow/scripts/all-screens-spec.json', JSON.stringify(allSpecs, null, 2), 'utf8');
console.log('✅ Generated all screen specs + action menus overview in all-screens-spec.json successfully!');

