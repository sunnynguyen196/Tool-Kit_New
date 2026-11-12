import { runFigmaCode } from './figma-runner.mjs';

// Color Palette
const COLORS = {
  primary: '#2563EB',      // Blue
  primaryDark: '#1D4ED8',
  primaryLight: '#EFF6FF',
  primaryBorder: '#BFDBFE',
  accent: '#F05A21',       // EPAY Orange
  accentLight: '#FFF7ED',
  sidebarBg: '#0F172A',    // Deep Navy
  sidebarActive: '#1E293B',
  sidebarSubActive: '#334155',
  canvasBg: '#F8FAFC',     // Light slate
  surfaceBg: '#FFFFFF',
  tableHeaderBg: '#F1F5F9',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  ink: '#0F172A',
  inkSecondary: '#475569',
  inkMuted: '#64748B',
  inkSubtle: '#94A3B8',
  
  // Status Badges
  activeBg: '#DCFCE7',
  activeText: '#15803D',
  readyBg: '#E0F2FE',
  readyText: '#0369A1',
  pendingBg: '#FEF3C7',
  pendingText: '#B45309',
  inactiveBg: '#F1F5F9',
  inactiveText: '#64748B',
  
  // Source Badges
  cttBg: '#EEF2FF',
  cttText: '#4338CA',
  qrgwBg: '#FAF5FF',
  qrgwText: '#7E22CE'
};

function buildScreenSpec() {
  return {
    type: 'FRAME',
    name: 'SCR-PFEE-01: Quản lý Cấu hình Phí Trả Đối tác (CTT & QRGW)',
    width: 1440,
    height: 1080,
    fill: COLORS.canvasBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar(),
      buildMainContent()
    ]
  };
}

// 1. SIDEBAR
function buildSidebar() {
  return {
    type: 'FRAME',
    name: 'Sidebar',
    width: 240,
    height: 1080,
    fill: COLORS.sidebarBg,
    layoutMode: 'VERTICAL',
    padding: { top: 20, bottom: 20, left: 16, right: 16 },
    itemSpacing: 20,
    children: [
      // Brand Logo
      {
        type: 'FRAME',
        name: 'Brand Header',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 10,
        height: 44,
        children: [
          {
            type: 'FRAME',
            name: 'Logo Icon',
            width: 32,
            height: 32,
            cornerRadius: 8,
            fill: COLORS.accent,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: 'E', fontSize: 18, fontWeight: 700, fill: '#FFFFFF' }
            ]
          },
          {
            type: 'FRAME',
            name: 'Logo Text Col',
            layoutMode: 'VERTICAL',
            itemSpacing: 2,
            children: [
              { type: 'TEXT', characters: 'epay Portal', fontSize: 15, fontWeight: 700, fill: '#FFFFFF' },
              { type: 'TEXT', characters: 'Cấu hình phí v2.0', fontSize: 11, fontWeight: 400, fill: COLORS.inkSubtle }
            ]
          }
        ]
      },

      // Navigation Group: QUẢN TRỊ NGHIỆP VỤ
      {
        type: 'FRAME',
        name: 'Nav Group 1',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 4,
        children: [
          { type: 'TEXT', characters: 'QUẢN TRỊ NGHIỆP VỤ', fontSize: 11, fontWeight: 600, fill: '#64748B' },
          buildNavItem('📊  Tổng quan Dashboard', false),
          buildNavItem('🏢  Đối tác & MCC', false),
          buildNavItem('⚙️  Cấu hình phí đối tác', true),
          // Sub-items of active menu
          {
            type: 'FRAME',
            name: 'Submenu',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { left: 14, top: 4, bottom: 4, right: 4 },
            itemSpacing: 2,
            children: [
              buildSubNavItem('•  Danh sách cấu hình', true),
              buildSubNavItemWithBadge('•  Yêu cầu phê duyệt', '6'),
              buildSubNavItem('•  Lịch sử cập nhật', false)
            ]
          }
        ]
      },

      // Navigation Group: GIAO DỊCH & ĐỐI SOÁT
      {
        type: 'FRAME',
        name: 'Nav Group 2',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 4,
        children: [
          { type: 'TEXT', characters: 'GIAO DỊCH & ĐỐI SOÁT', fontSize: 11, fontWeight: 600, fill: '#64748B' },
          buildNavItem('💳  Giao dịch CTT', false),
          buildNavItem('📱  Giao dịch QRGW', false),
          buildNavItem('📑  Đối soát & Quyết toán', false),
          buildNavItem('📈  Báo cáo doanh thu', false)
        ]
      },

      // Spacer
      {
        type: 'FRAME',
        name: 'Spacer',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        height: 220,
        fill: '#0F172A00'
      },

      // User Profile Footer
      {
        type: 'FRAME',
        name: 'User Profile Box',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        counterAxisAlignItems: 'CENTER',
        padding: 10,
        cornerRadius: 8,
        fill: COLORS.sidebarActive,
        itemSpacing: 10,
        children: [
          {
            type: 'FRAME',
            name: 'Avatar',
            width: 32,
            height: 32,
            cornerRadius: 16,
            fill: COLORS.primary,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: 'AD', fontSize: 12, fontWeight: 600, fill: '#FFFFFF' }
            ]
          },
          {
            type: 'FRAME',
            name: 'Profile Info',
            layoutMode: 'VERTICAL',
            itemSpacing: 2,
            children: [
              { type: 'TEXT', characters: 'Nguyễn Ánh Dương', fontSize: 12, fontWeight: 600, fill: '#FFFFFF' },
              { type: 'TEXT', characters: 'BA Lead • Vận hành', fontSize: 10, fontWeight: 400, fill: COLORS.inkSubtle }
            ]
          }
        ]
      }
    ]
  };
}

function buildNavItem(label, isActive) {
  return {
    type: 'FRAME',
    name: 'Nav: ' + label,
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    counterAxisAlignItems: 'CENTER',
    height: 36,
    padding: { left: 12, right: 12 },
    cornerRadius: 6,
    fill: isActive ? COLORS.sidebarActive : '#0F172A00',
    children: [
      {
        type: 'TEXT',
        characters: label,
        fontSize: 13,
        fontWeight: isActive ? 600 : 400,
        fill: isActive ? '#FFFFFF' : '#94A3B8'
      }
    ]
  };
}

function buildSubNavItem(label, isActive) {
  return {
    type: 'FRAME',
    name: 'SubNav: ' + label,
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    counterAxisAlignItems: 'CENTER',
    height: 28,
    padding: { left: 8, right: 8 },
    cornerRadius: 4,
    fill: isActive ? COLORS.sidebarSubActive : '#0F172A00',
    children: [
      {
        type: 'TEXT',
        characters: label,
        fontSize: 12,
        fontWeight: isActive ? 600 : 400,
        fill: isActive ? '#60A5FA' : '#94A3B8'
      }
    ]
  };
}

function buildSubNavItemWithBadge(label, badge) {
  return {
    type: 'FRAME',
    name: 'SubNavWithBadge: ' + label,
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    height: 28,
    padding: { left: 8, right: 8 },
    children: [
      {
        type: 'TEXT',
        characters: label,
        fontSize: 12,
        fontWeight: 400,
        fill: '#94A3B8'
      },
      {
        type: 'FRAME',
        name: 'Badge',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 6, right: 6, top: 1, bottom: 1 },
        cornerRadius: 9999,
        fill: COLORS.accent,
        children: [
          { type: 'TEXT', characters: badge, fontSize: 10, fontWeight: 700, fill: '#FFFFFF' }
        ]
      }
    ]
  };
}

// 2. MAIN CONTENT
function buildMainContent() {
  return {
    type: 'FRAME',
    name: 'Main Content Area',
    width: 1200,
    height: 1080,
    layoutMode: 'VERTICAL',
    children: [
      buildTopbar(),
      buildPageBody()
    ]
  };
}

// 2.1 TOPBAR
function buildTopbar() {
  return {
    type: 'FRAME',
    name: 'Topbar',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    height: 56,
    fill: COLORS.surfaceBg,
    stroke: COLORS.border,
    strokeWeight: 1,
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 24, right: 24 },
    children: [
      // Breadcrumb
      {
        type: 'FRAME',
        name: 'Breadcrumb',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 8,
        children: [
          { type: 'TEXT', characters: 'Trang chủ', fontSize: 12, fontWeight: 400, fill: COLORS.inkMuted },
          { type: 'TEXT', characters: '/', fontSize: 12, fontWeight: 400, fill: COLORS.inkSubtle },
          { type: 'TEXT', characters: 'Quản trị hệ thống', fontSize: 12, fontWeight: 400, fill: COLORS.inkMuted },
          { type: 'TEXT', characters: '/', fontSize: 12, fontWeight: 400, fill: COLORS.inkSubtle },
          { type: 'TEXT', characters: 'Cấu hình phí trả đối tác', fontSize: 12, fontWeight: 600, fill: COLORS.ink }
        ]
      },
      // Right Tools
      {
        type: 'FRAME',
        name: 'Right Utilities',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          // Quick Search Box
          {
            type: 'FRAME',
            name: 'Quick Search Input',
            width: 240,
            height: 32,
            fill: COLORS.canvasBg,
            stroke: COLORS.border,
            strokeWeight: 1,
            cornerRadius: 6,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 10, right: 10 },
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '🔍', fontSize: 11, fill: COLORS.inkMuted },
              { type: 'TEXT', characters: 'Tìm nhanh mã, tên...', fontSize: 12, fontWeight: 400, fill: COLORS.inkSubtle }
            ]
          },
          // Notification Bell
          {
            type: 'FRAME',
            name: 'Bell Notification',
            width: 32,
            height: 32,
            cornerRadius: 16,
            fill: COLORS.canvasBg,
            stroke: COLORS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: '🔔', fontSize: 13, fill: COLORS.inkSecondary }
            ]
          },
          // User Badge
          {
            type: 'FRAME',
            name: 'User Menu Pill',
            height: 32,
            padding: { left: 8, right: 8 },
            cornerRadius: 16,
            fill: COLORS.canvasBg,
            stroke: COLORS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: 'Admin (Dương)', fontSize: 12, fontWeight: 500, fill: COLORS.ink },
              { type: 'TEXT', characters: '▾', fontSize: 10, fill: COLORS.inkMuted }
            ]
          }
        ]
      }
    ]
  };
}

// 2.2 PAGE BODY
function buildPageBody() {
  return {
    type: 'FRAME',
    name: 'Page Body Container',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    height: 1024,
    padding: { top: 16, left: 24, right: 24, bottom: 20 },
    itemSpacing: 14,
    children: [
      buildPageHeaderRow(),
      buildKpiCardsRow(),
      buildFilterCard(),
      buildDataTableCard()
    ]
  };
}

// Page Header Row
function buildPageHeaderRow() {
  return {
    type: 'FRAME',
    name: 'Header & Actions',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    children: [
      {
        type: 'FRAME',
        name: 'Titles',
        layoutMode: 'VERTICAL',
        itemSpacing: 3,
        children: [
          { type: 'TEXT', characters: 'Cấu hình phí trả đối tác', fontSize: 20, fontWeight: 700, fill: COLORS.ink },
          { type: 'TEXT', characters: 'Thiết lập và quản lý các biểu phí CTT (4 loại phí) & QRGW (3 loại phí) theo quy tắc kiểm tra trùng lặp', fontSize: 12, fontWeight: 400, fill: COLORS.inkMuted }
        ]
      },
      {
        type: 'FRAME',
        name: 'Action Buttons',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 8,
        children: [
          {
            type: 'FRAME',
            name: 'Btn Export',
            height: 36,
            padding: { left: 14, right: 14 },
            cornerRadius: 6,
            fill: COLORS.surfaceBg,
            stroke: COLORS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '📥  Xuất Excel', fontSize: 12, fontWeight: 500, fill: COLORS.inkSecondary }
            ]
          },
          {
            type: 'FRAME',
            name: 'Btn Create',
            height: 36,
            padding: { left: 16, right: 16 },
            cornerRadius: 6,
            fill: COLORS.primary,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '+  Tạo mới cấu hình', fontSize: 12, fontWeight: 600, fill: '#FFFFFF' }
            ]
          }
        ]
      }
    ]
  };
}

// KPI Cards Row
function buildKpiCardsRow() {
  return {
    type: 'FRAME',
    name: 'KPI Row',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    itemSpacing: 12,
    children: [
      buildKpiCard('TỔNG SỐ CẤU HÌNH', '128', '74 CTT  •  54 QRGW', COLORS.primaryLight, COLORS.primary),
      buildKpiCard('ĐANG HIỆU LỰC', '94', '● Active (73.4%)', COLORS.activeBg, COLORS.activeText),
      buildKpiCard('SẮP HIỆU LỰC', '18', '● Ready (Kỳ tới)', COLORS.readyBg, COLORS.readyText),
      buildKpiCard('CHỜ PHÊ DUYỆT', '6', '● Pending Approval', COLORS.pendingBg, COLORS.pendingText),
      buildKpiCard('HẾT HẠN / HỦY', '10', '● Inactive (Lưu trữ)', COLORS.inactiveBg, COLORS.inactiveText)
    ]
  };
}

function buildKpiCard(label, count, subtext, badgeBg, badgeText) {
  return {
    type: 'FRAME',
    name: 'KPI: ' + label,
    width: 220,
    padding: { top: 10, bottom: 10, left: 14, right: 14 },
    cornerRadius: 8,
    fill: COLORS.surfaceBg,
    stroke: COLORS.border,
    strokeWeight: 1,
    layoutMode: 'VERTICAL',
    itemSpacing: 4,
    children: [
      { type: 'TEXT', characters: label, fontSize: 10, fontWeight: 600, fill: COLORS.inkMuted },
      {
        type: 'FRAME',
        name: 'Count Row',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'BASELINE',
        itemSpacing: 8,
        children: [
          { type: 'TEXT', characters: count, fontSize: 20, fontWeight: 700, fill: COLORS.ink },
          {
            type: 'FRAME',
            name: 'Pill',
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 6, right: 6, top: 2, bottom: 2 },
            cornerRadius: 4,
            fill: badgeBg,
            children: [
              { type: 'TEXT', characters: subtext, fontSize: 9, fontWeight: 600, fill: badgeText }
            ]
          }
        ]
      }
    ]
  };
}

// 3. FILTER CONTAINER
function buildFilterCard() {
  return {
    type: 'FRAME',
    name: 'Filter & Tabs Card',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    padding: { top: 12, bottom: 12, left: 16, right: 16 },
    cornerRadius: 8,
    fill: COLORS.surfaceBg,
    stroke: COLORS.border,
    strokeWeight: 1,
    itemSpacing: 12,
    children: [
      // Tabs Row
      {
        type: 'FRAME',
        name: 'Tabs Row',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 6,
        children: [
          buildTab('Tất cả (128)', true),
          buildTab('Cổng thanh toán CTT (74)', false),
          buildTab('QR Gateway QRGW (54)', false),
          buildTab('Phí XLGD (62)', false),
          buildTab('Phí thanh toán (50)', false),
          buildTab('Phí duy trì & DVGT (16)', false),
          buildTabWithBadge('Chờ phê duyệt', '6')
        ]
      },

      // Divider
      {
        type: 'FRAME',
        name: 'Divider',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        height: 1,
        fill: COLORS.border
      },

      // Filter Grid (2 Hàng)
      {
        type: 'FRAME',
        name: 'Filter Grid',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 10,
        children: [
          // Row 1
          {
            type: 'FRAME',
            name: 'Filter Row 1',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            itemSpacing: 12,
            children: [
              buildFilterField('Nguồn hệ thống', 'Tất cả nguồn (CTT, QRGW) ▾', 268),
              buildFilterField('Đối tác / Ngân hàng', 'Tất cả đối tác (Vietin, BIDV...) ▾', 268),
              buildFilterField('Loại biểu phí', 'Tất cả loại phí (XLGD, TT...) ▾', 268),
              buildFilterField('PTTT / Loại dịch vụ', 'Tất cả PTTT & Dịch vụ ▾', 268)
            ]
          },
          // Row 2
          {
            type: 'FRAME',
            name: 'Filter Row 2',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            itemSpacing: 12,
            children: [
              buildFilterField('Mã MCC (CTT)', 'Tất cả MCC (5411, 4829...) ▾', 268),
              buildFilterField('Kỳ trả phí', 'Tất cả kỳ (Phiên, Ngày, Tháng...) ▾', 268),
              buildFilterField('Trạng thái hiệu lực', 'Tất cả trạng thái ▾', 268),
              buildFilterField('Khoảng thời gian', '01/01/2026  ~  31/12/2026 📅', 268)
            ]
          },
          // Action Buttons Bar
          {
            type: 'FRAME',
            name: 'Filter Actions Bar',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            children: [
              {
                type: 'TEXT',
                characters: 'Quy tắc active: CTT không trùng lặp MCC trong cùng PTTT & khoảng thời gian; QRGW duy nhất 1 biểu phí/dịch vụ.',
                fontSize: 11,
                fontWeight: 400,
                fill: COLORS.inkMuted
              },
              {
                type: 'FRAME',
                name: 'Btns',
                layoutMode: 'HORIZONTAL',
                itemSpacing: 8,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Btn Reset',
                    height: 32,
                    padding: { left: 12, right: 12 },
                    layoutMode: 'HORIZONTAL',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      { type: 'TEXT', characters: 'Xóa bộ lọc ↺', fontSize: 11, fontWeight: 500, fill: COLORS.inkSecondary }
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Btn Search',
                    height: 32,
                    padding: { left: 16, right: 16 },
                    cornerRadius: 6,
                    fill: COLORS.primary,
                    layoutMode: 'HORIZONTAL',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      { type: 'TEXT', characters: '🔍  Tìm kiếm (F3)', fontSize: 11, fontWeight: 600, fill: '#FFFFFF' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

function buildTab(label, isActive) {
  return {
    type: 'FRAME',
    name: 'Tab: ' + label,
    height: 30,
    padding: { left: 12, right: 12 },
    cornerRadius: 6,
    fill: isActive ? COLORS.primaryLight : '#FFFFFF00',
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    children: [
      {
        type: 'TEXT',
        characters: label,
        fontSize: 12,
        fontWeight: isActive ? 600 : 500,
        fill: isActive ? COLORS.primary : COLORS.inkSecondary
      }
    ]
  };
}

function buildTabWithBadge(label, badge) {
  return {
    type: 'FRAME',
    name: 'TabWithBadge: ' + label,
    height: 30,
    padding: { left: 12, right: 10 },
    cornerRadius: 6,
    fill: '#FFFFFF00',
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    itemSpacing: 6,
    children: [
      { type: 'TEXT', characters: label, fontSize: 12, fontWeight: 500, fill: COLORS.inkSecondary },
      {
        type: 'FRAME',
        name: 'Badge',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 6, right: 6, top: 1, bottom: 1 },
        cornerRadius: 9999,
        fill: COLORS.pendingBg,
        children: [
          { type: 'TEXT', characters: badge, fontSize: 10, fontWeight: 700, fill: COLORS.pendingText }
        ]
      }
    ]
  };
}

function buildFilterField(label, placeholder, width) {
  return {
    type: 'FRAME',
    name: 'Field: ' + label,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 4,
    children: [
      { type: 'TEXT', characters: label, fontSize: 11, fontWeight: 600, fill: COLORS.inkSecondary },
      {
        type: 'FRAME',
        name: 'Input Box',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        counterAxisAlignItems: 'CENTER',
        height: 32,
        padding: { left: 10, right: 10 },
        cornerRadius: 6,
        fill: COLORS.canvasBg,
        stroke: COLORS.border,
        strokeWeight: 1,
        children: [
          { type: 'TEXT', characters: placeholder, fontSize: 11, fontWeight: 400, fill: COLORS.ink }
        ]
      }
    ]
  };
}

// 4. DATA TABLE CONTAINER
function buildDataTableCard() {
  return {
    type: 'FRAME',
    name: 'Table Card',
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    cornerRadius: 8,
    fill: COLORS.surfaceBg,
    stroke: COLORS.border,
    strokeWeight: 1,
    children: [
      buildTableHeader(),
      // 6 Realistic Data Rows
      buildTableRow({
        stt: '1',
        code: 'CTT-FEE-2026-001',
        source: 'CTT',
        partner: 'VietinBank',
        feeType: 'Phí thanh toán',
        method: 'Thẻ quốc tế (Visa/Master)',
        mcc: '5411',
        rate: '1.25% (Min 5k, Max 50k)',
        cycle: 'Tháng',
        period: '01/01/2026 ~ 31/12/2026',
        status: 'Active',
        statusText: 'Đang áp dụng'
      }),
      buildTableRow({
        stt: '2',
        code: 'CTT-FEE-2026-002',
        source: 'CTT',
        partner: 'VietinBank',
        feeType: 'Phí XLGD',
        method: 'Thẻ nội địa (NAPAS)',
        mcc: 'Tất cả',
        rate: 'Cố định: 1.100 đ/GD',
        cycle: 'Phiên',
        period: '01/01/2026 ~ Không hạn',
        status: 'Active',
        statusText: 'Đang áp dụng'
      }),
      buildTableRow({
        stt: '3',
        code: 'QRGW-FEE-2026-001',
        source: 'QRGW',
        partner: 'BIDV',
        feeType: 'Phí XLGD',
        method: 'Thu hộ QR (Dịch vụ)',
        mcc: '-',
        rate: 'Bậc thang: 500đ ~ 1.200đ',
        cycle: 'Ngày',
        period: '01/02/2026 ~ 31/12/2026',
        status: 'Active',
        statusText: 'Đang áp dụng'
      }),
      buildTableRow({
        stt: '4',
        code: 'QRGW-FEE-2026-002',
        source: 'QRGW',
        partner: 'Vietcombank',
        feeType: 'Phí thanh toán',
        method: 'Chi hộ QR (Dịch vụ)',
        mcc: '-',
        rate: 'Tỷ lệ 0.15% (Min 2.000đ)',
        cycle: 'Ngày',
        period: '01/04/2026 ~ 31/12/2026',
        status: 'Ready',
        statusText: 'Sắp hiệu lực'
      }),
      buildTableRow({
        stt: '5',
        code: 'CTT-FEE-2026-003',
        source: 'CTT',
        partner: 'Napas',
        feeType: 'Phí thanh toán',
        method: 'Tài khoản ngân hàng',
        mcc: '4829',
        rate: 'Cố định: 1.500 đ/GD',
        cycle: 'Tháng',
        period: '15/03/2026 ~ 31/12/2026',
        status: 'Pending',
        statusText: 'Chờ duyệt'
      }),
      buildTableRow({
        stt: '6',
        code: 'CTT-FEE-2026-004',
        source: 'CTT',
        partner: 'Sacombank',
        feeType: 'Phí duy trì DV',
        method: 'Toàn bộ phương thức',
        mcc: 'Tất cả',
        rate: '5.000.000 đ/Năm',
        cycle: 'Năm',
        period: '01/01/2026 ~ 31/12/2026',
        status: 'Active',
        statusText: 'Đang áp dụng'
      }),
      buildTableFooter()
    ]
  };
}

function buildTableHeader() {
  return {
    type: 'FRAME',
    name: 'Table Header',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    counterAxisAlignItems: 'CENTER',
    height: 38,
    fill: COLORS.tableHeaderBg,
    stroke: COLORS.border,
    strokeWeight: 1,
    padding: { left: 12, right: 12 },
    children: [
      buildCell('STT', 35, 600, COLORS.inkSecondary),
      buildCell('Mã cấu hình', 125, 600, COLORS.inkSecondary),
      buildCell('Nguồn', 65, 600, COLORS.inkSecondary),
      buildCell('Đối tác / NH', 115, 600, COLORS.inkSecondary),
      buildCell('Loại phí', 95, 600, COLORS.inkSecondary),
      buildCell('PTTT / Dịch vụ', 145, 600, COLORS.inkSecondary),
      buildCell('Mã MCC', 60, 600, COLORS.inkSecondary),
      buildCell('Hình thức & Mức phí', 165, 600, COLORS.inkSecondary),
      buildCell('Kỳ trả', 60, 600, COLORS.inkSecondary),
      buildCell('Thời gian áp dụng', 135, 600, COLORS.inkSecondary),
      buildCell('Trạng thái', 85, 600, COLORS.inkSecondary),
      buildCell('Thao tác', 40, 600, COLORS.inkSecondary)
    ]
  };
}

function buildTableRow(data) {
  // Source badge
  const isCtt = data.source === 'CTT';
  const sourceBadge = {
    type: 'FRAME',
    name: 'Badge Source',
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 6, right: 6, top: 2, bottom: 2 },
    cornerRadius: 4,
    fill: isCtt ? COLORS.cttBg : COLORS.qrgwBg,
    children: [
      { type: 'TEXT', characters: data.source, fontSize: 10, fontWeight: 700, fill: isCtt ? COLORS.cttText : COLORS.qrgwText }
    ]
  };

  // Status badge
  let stBg = COLORS.activeBg;
  let stColor = COLORS.activeText;
  if (data.status === 'Ready') {
    stBg = COLORS.readyBg;
    stColor = COLORS.readyText;
  } else if (data.status === 'Pending') {
    stBg = COLORS.pendingBg;
    stColor = COLORS.pendingText;
  } else if (data.status === 'Inactive') {
    stBg = COLORS.inactiveBg;
    stColor = COLORS.inactiveText;
  }

  const statusBadge = {
    type: 'FRAME',
    name: 'Badge Status',
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 6, right: 6, top: 2, bottom: 2 },
    cornerRadius: 4,
    fill: stBg,
    children: [
      { type: 'TEXT', characters: data.statusText, fontSize: 10, fontWeight: 600, fill: stColor }
    ]
  };

  return {
    type: 'FRAME',
    name: 'Row: ' + data.code,
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    counterAxisAlignItems: 'CENTER',
    height: 42,
    fill: COLORS.surfaceBg,
    stroke: COLORS.border,
    strokeWeight: 1,
    padding: { left: 12, right: 12 },
    children: [
      buildCell(data.stt, 35, 400, COLORS.inkMuted),
      buildCell(data.code, 125, 600, COLORS.primary),
      {
        type: 'FRAME',
        name: 'Cell Source',
        width: 65,
        layoutMode: 'HORIZONTAL',
        children: [sourceBadge]
      },
      buildCell(data.partner, 115, 500, COLORS.ink),
      buildCell(data.feeType, 95, 400, COLORS.inkSecondary),
      buildCell(data.method, 145, 400, COLORS.ink),
      buildCell(data.mcc, 60, 500, data.mcc === '-' ? COLORS.inkSubtle : COLORS.ink),
      buildCell(data.rate, 165, 500, COLORS.ink),
      buildCell(data.cycle, 60, 400, COLORS.inkSecondary),
      buildCell(data.period, 135, 400, COLORS.inkMuted),
      {
        type: 'FRAME',
        name: 'Cell Status',
        width: 85,
        layoutMode: 'HORIZONTAL',
        children: [statusBadge]
      },
      {
        type: 'FRAME',
        name: 'Cell Actions',
        width: 40,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: '👁️ ⋮', fontSize: 11, fill: COLORS.inkMuted }
        ]
      }
    ]
  };
}

function buildCell(text, width, weight, color) {
  return {
    type: 'FRAME',
    name: 'Cell: ' + text,
    width: width,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    children: [
      { type: 'TEXT', characters: text, fontSize: 11, fontWeight: weight, fill: color }
    ]
  };
}

function buildTableFooter() {
  return {
    type: 'FRAME',
    name: 'Pagination Footer',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    height: 44,
    padding: { left: 16, right: 16 },
    fill: COLORS.surfaceBg,
    stroke: COLORS.border,
    strokeWeight: 1,
    children: [
      {
        type: 'TEXT',
        characters: 'Hiển thị 1 - 6 trong tổng số 128 biểu phí',
        fontSize: 11,
        fontWeight: 400,
        fill: COLORS.inkMuted
      },
      {
        type: 'FRAME',
        name: 'Pagination Buttons',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 6,
        children: [
          {
            type: 'FRAME',
            name: 'Page Size Dropdown',
            height: 28,
            padding: { left: 8, right: 8 },
            cornerRadius: 4,
            fill: COLORS.canvasBg,
            stroke: COLORS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: '10 dòng / trang ▾', fontSize: 11, fontWeight: 400, fill: COLORS.inkSecondary }
            ]
          },
          buildPageBtn('‹', false),
          buildPageBtn('1', true),
          buildPageBtn('2', false),
          buildPageBtn('3', false),
          buildPageBtn('...', false),
          buildPageBtn('13', false),
          buildPageBtn('›', false)
        ]
      }
    ]
  };
}

function buildPageBtn(label, isActive) {
  return {
    type: 'FRAME',
    name: 'BtnPage: ' + label,
    width: 28,
    height: 28,
    cornerRadius: 4,
    fill: isActive ? COLORS.primary : COLORS.canvasBg,
    stroke: isActive ? COLORS.primary : COLORS.border,
    strokeWeight: 1,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    children: [
      {
        type: 'TEXT',
        characters: label,
        fontSize: 11,
        fontWeight: isActive ? 600 : 400,
        fill: isActive ? '#FFFFFF' : COLORS.inkSecondary
      }
    ]
  };
}

// MAIN RUNNER
async function main() {
  console.log('Generating refined screen specification for Partner Fee Management...');
  
  // Clean up previous frame
  const deleteCode = `
    try {
      await figma.delete("4069:9957");
      console.log("Deleted old frame 4069:9957");
    } catch(e) {}
    return { cleaned: true };
  `;
  await runFigmaCode(deleteCode);

  const spec = buildScreenSpec();
  
  // Format code to execute inside Reqwise Sandbox
  const code = `
    const doc = await figma.currentPage();
    console.log("Current page:", doc.name);
    
    // Create Screen
    const screen = await figma.create(${JSON.stringify(spec)});
    
    // Run layout audit to verify quality
    let audit = null;
    try {
      audit = await figma.layoutAudit(screen.id);
    } catch (e) {
      console.log("layoutAudit error:", e.message);
    }
    
    return {
      ok: true,
      screenId: screen.id,
      name: screen.name,
      issues: audit?.summary?.issues || []
    };
  `;

  console.log('Sending figma_write command to Figma via runner...');
  const result = await runFigmaCode(code);
  console.log('Finished! Result:', JSON.stringify(result, null, 2));
}

main().catch(console.error);
