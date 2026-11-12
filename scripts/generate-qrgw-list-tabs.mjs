import fs from 'node:fs';

const TOKENS = {
  brandHeaderBg: '#74B4F7',
  primaryBlue: '#1E40AF',
  primaryAction: '#2563EB',
  secondaryAction: '#4F46E5',
  exportAction: '#1E3A8A',
  
  sidebarBg: '#FFFFFF',
  bodyBg: '#F8FAFC',
  cardBg: '#FFFFFF',
  tableHeaderBg: '#F8FAFC',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  
  ink: '#1E293B',
  inkSecondary: '#475569',
  inkMuted: '#64748B',
  inkSubtle: '#94A3B8',
  linkBlue: '#2563EB',
  
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

function buildSidebar(activeSubMenu = 'QRGW') {
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
      {
        type: 'FRAME',
        name: 'Menu List',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        padding: { top: 16, bottom: 16, left: 0, right: 0 },
        itemSpacing: 4,
        children: [
          buildSidebarItem('Trang chủ', false),
          buildSidebarItem('Quản lý dịch vụ', false),
          buildSidebarItem('Quản lý đối tác', false),
          buildSidebarItem('Quản lý cấu hình phí', true, true),
          buildSubItem('Phí trả đối tác', true),
          buildChildMenuItem('•  Phí đối tác CTT', isCtt),
          buildChildMenuItem('•  Phí đối tác QRGW', isQrgw),
          buildSubItem('Phí thu khách hàng', false),
          buildSidebarItem('Báo cáo thống kê', false),
          buildSidebarItem('Đối soát & Thanh quyết toán', false),
          buildSidebarItem('Quản trị hệ thống', false)
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
      { type: 'TEXT', characters: label, fontSize: 12, fontWeight: 500, fill: TOKENS.inkSecondary }
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
          { type: 'TEXT', characters: '🔍', fontSize: 13, fill: TOKENS.inkMuted },
          { type: 'TEXT', characters: 'Tìm kiếm theo mã cấu hình, tên ngân hàng QR...', fontSize: 12, fill: TOKENS.inkSubtle }
        ]
      },
      {
        type: 'FRAME',
        name: 'Right User Box',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          { type: 'TEXT', characters: '🔔', fontSize: 14, fill: TOKENS.inkSecondary },
          { type: 'TEXT', characters: '⚙️', fontSize: 14, fill: TOKENS.inkSecondary },
          {
            type: 'FRAME',
            name: 'Profile Capsule',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 8,
            padding: { left: 8, right: 10, top: 4, bottom: 4 },
            cornerRadius: 18,
            fill: '#F1F5F9',
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
      {
        type: 'FRAME',
        name: 'Filter Row 1',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 12,
        children: [
          buildDropdown('Loại phí', '-- Tất cả -- ▾', 270),
          buildDropdown('Đối tác / Ngân hàng hưởng phí', '-- Tất cả -- ▾', 270),
          buildDropdown('Loại dịch vụ QR', '-- Tất cả (Thu hộ QR, Chi hộ QR) -- ▾', 270),
          buildDropdown('Đồng tiền', 'VND ▾', 270)
        ]
      },
      {
        type: 'FRAME',
        name: 'Filter Row 2',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 12,
        children: [
          buildDropdown('Hình thức thu phí', '-- Tất cả (1 bậc, Theo SLGD, Theo GTGD) -- ▾', 270),
          buildDropdown('Kỳ trả phí', '-- Tất cả (Phiên, Ngày, Tháng, Quý, Năm) -- ▾', 270),
          buildDropdown('Thời gian áp dụng phí', '01/01/2026 - 31/12/2026 📅', 270),
          buildDropdown('Loại giao dịch', '-- Tất cả (Thanh toán, Hoàn trả) -- ▾', 270)
        ]
      },
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

function buildQrgwTableRow(stt, code, status, partner, serviceType, feeType, pricingModel, vat, date, isCheckerAction = false) {
  let pill = buildStatusPill(status, TOKENS.activeBg, TOKENS.activeDot, TOKENS.activeText);
  if (status === 'NEW') pill = buildStatusPill(status, TOKENS.newBg, TOKENS.newDot, TOKENS.newText);
  if (status === 'PENDING') pill = buildStatusPill(status, TOKENS.pendingBg, TOKENS.pendingDot, TOKENS.pendingText);
  if (status === 'INACTIVE') pill = buildStatusPill(status, TOKENS.inactiveBg, TOKENS.inactiveDot, TOKENS.inactiveText);
  if (status === 'DRAFT') pill = buildStatusPill(status, TOKENS.draftBg, TOKENS.draftDot, TOKENS.draftText);

  let actionCell = {
    type: 'FRAME',
    name: 'Td Action',
    width: 60,
    layoutMode: 'HORIZONTAL',
    children: [{ type: 'TEXT', characters: '⋮', fontSize: 16, fontWeight: 700, fill: TOKENS.inkSecondary }]
  };

  if (isCheckerAction) {
    actionCell = {
      type: 'FRAME',
      name: 'Td Action Checker',
      width: 140,
      layoutMode: 'HORIZONTAL',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 6,
      children: [
        {
          type: 'FRAME',
          name: 'Btn Quick Approve',
          height: 24,
          padding: { left: 8, right: 8 },
          cornerRadius: 4,
          fill: '#DCFCE7',
          stroke: '#86EFAC',
          strokeWeight: 1,
          layoutMode: 'HORIZONTAL',
          counterAxisAlignItems: 'CENTER',
          children: [
            { type: 'TEXT', characters: '✓ Duyệt', fontSize: 10, fontWeight: 600, fill: '#15803D' }
          ]
        },
        {
          type: 'FRAME',
          name: 'Btn Quick Reject',
          height: 24,
          padding: { left: 8, right: 8 },
          cornerRadius: 4,
          fill: '#FEE2E2',
          stroke: '#FCA5A5',
          strokeWeight: 1,
          layoutMode: 'HORIZONTAL',
          counterAxisAlignItems: 'CENTER',
          children: [
            { type: 'TEXT', characters: '✗ Hủy', fontSize: 10, fontWeight: 600, fill: '#B91C1C' }
          ]
        },
        {
          type: 'TEXT',
          characters: '⋮',
          fontSize: 16,
          fontWeight: 700,
          fill: TOKENS.inkSecondary
        }
      ]
    };
  }

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
      { type: 'FRAME', name: 'Td STT', width: 35, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: stt, fontSize: 11, fill: TOKENS.inkMuted }] },
      { type: 'FRAME', name: 'Td Code', width: 135, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: code, fontSize: 11, fontWeight: 600, fill: TOKENS.linkBlue }] },
      { type: 'FRAME', name: 'Td Status', width: 130, layoutMode: 'HORIZONTAL', children: [pill] },
      { type: 'FRAME', name: 'Td Partner', width: 140, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: partner, fontSize: 11, fill: TOKENS.ink }] },
      { type: 'FRAME', name: 'Td Service', width: 150, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: serviceType, fontSize: 11, fontWeight: 600, fill: TOKENS.ink }] },
      { type: 'FRAME', name: 'Td FeeType', width: 120, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: feeType, fontSize: 11, fill: TOKENS.inkSecondary }] },
      { type: 'FRAME', name: 'Td Pricing', width: 150, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: pricingModel, fontSize: 11, fill: TOKENS.ink }] },
      { type: 'FRAME', name: 'Td VAT', width: 65, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: vat, fontSize: 11, fill: TOKENS.inkSecondary }] },
      { type: 'FRAME', name: 'Td Date', width: 105, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: date, fontSize: 11, fill: TOKENS.inkMuted }] },
      actionCell
    ]
  };
}

function buildPagination(totalLabel = '06 kết quả', pageLabel = '1') {
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
          { type: 'TEXT', characters: totalLabel, fontSize: 11, fill: TOKENS.inkMuted },
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
          {
            type: 'FRAME',
            name: 'Btn: <',
            width: 26,
            height: 26,
            cornerRadius: 4,
            fill: '#FFFFFF',
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '<', fontSize: 11, fontWeight: 400, fill: TOKENS.ink }]
          },
          {
            type: 'FRAME',
            name: 'Btn: 1',
            width: 26,
            height: 26,
            cornerRadius: 4,
            fill: '#475569',
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '1', fontSize: 11, fontWeight: 600, fill: '#FFFFFF' }]
          },
          ...(pageLabel === 'multi' ? [
            {
              type: 'FRAME',
              name: 'Btn: 2',
              width: 26,
              height: 26,
              cornerRadius: 4,
              fill: '#FFFFFF',
              stroke: TOKENS.border,
              strokeWeight: 1,
              layoutMode: 'HORIZONTAL',
              primaryAxisAlignItems: 'CENTER',
              counterAxisAlignItems: 'CENTER',
              children: [{ type: 'TEXT', characters: '2', fontSize: 11, fontWeight: 400, fill: TOKENS.ink }]
            },
            {
              type: 'FRAME',
              name: 'Btn: 3',
              width: 26,
              height: 26,
              cornerRadius: 4,
              fill: '#FFFFFF',
              stroke: TOKENS.border,
              strokeWeight: 1,
              layoutMode: 'HORIZONTAL',
              primaryAxisAlignItems: 'CENTER',
              counterAxisAlignItems: 'CENTER',
              children: [{ type: 'TEXT', characters: '3', fontSize: 11, fontWeight: 400, fill: TOKENS.ink }]
            }
          ] : []),
          {
            type: 'FRAME',
            name: 'Btn: >',
            width: 26,
            height: 26,
            cornerRadius: 4,
            fill: '#FFFFFF',
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '>', fontSize: 11, fontWeight: 400, fill: TOKENS.ink }]
          }
        ]
      }
    ]
  };
}

// ----------------------------------------------------
// BUILD 3 TABS FOR QRGW
// ----------------------------------------------------
const qrgwTableCols = [
  { label: 'STT', w: 35 },
  { label: 'MÃ CẤU HÌNH PHÍ', w: 135 },
  { label: 'TRẠNG THÁI CẤU HÌNH', w: 130 },
  { label: 'ĐỐI TÁC HƯỞNG PHÍ', w: 140 },
  { label: 'LOẠI DỊCH VỤ', w: 150 },
  { label: 'LOẠI PHÍ', w: 120 },
  { label: 'HÌNH THỨC THU PHÍ', w: 150 },
  { label: 'THUẾ VAT', w: 65 },
  { label: 'THỜI GIAN ÁP DỤNG', w: 105 },
  { label: 'THAO TÁC', w: 60 }
];

export function buildScreenQrgwTabAll() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-LIST-01: Danh sách Phí QRGW - Tab Tất cả',
    width: 1440,
    height: 960,
    x: 6500,
    y: 0,
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
              buildPageHeader('Quản lý cấu hình phí đối tác QRGW'),
              buildQrgwFilterBox(),
              {
                type: 'FRAME',
                name: 'Table Card Section',
                layoutMode: 'VERTICAL',
                layoutAlign: 'STRETCH',
                itemSpacing: 10,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Tabs and Quick Search Bar',
                    layoutMode: 'HORIZONTAL',
                    layoutAlign: 'STRETCH',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      {
                        type: 'FRAME',
                        name: 'Status Tabs',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 16,
                        children: [
                          {
                            type: 'FRAME',
                            name: 'Tab All Box',
                            layoutMode: 'VERTICAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 4,
                            children: [
                              { type: 'TEXT', characters: 'Tất cả (45)', fontSize: 12, fontWeight: 700, fill: TOKENS.linkBlue },
                              { type: 'FRAME', name: 'Indicator', width: 75, height: 2, fill: TOKENS.linkBlue }
                            ]
                          },
                          { type: 'TEXT', characters: 'Đang hoạt động (32)', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted },
                          { type: 'TEXT', characters: 'Chờ phê duyệt (3)', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted }
                        ]
                      },
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
                              { type: 'TEXT', characters: 'Tìm theo mã, tên ngân hàng QR...', fontSize: 11, fill: TOKENS.inkSubtle }
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
                      buildTableHeader(qrgwTableCols),
                      buildQrgwTableRow('1', 'QR_PN_DC_005', 'NEW', 'KBank', 'Thu hộ QR', 'Phí XLGD', 'Theo SLGD (500đ ~ 1.200đ)', '8%', '01/01/2026'),
                      buildQrgwTableRow('2', 'QR_PN_DC_004', 'ACTIVE', 'VietinBank', 'Chi hộ QR', 'Phí thanh toán', 'Theo GTGD (0.15%)', '8%', '01/01/2026'),
                      buildQrgwTableRow('3', 'QR_PN_DC_003', 'PENDING', 'Vietcombank', 'Thu hộ QR', 'Phí thanh toán', 'Theo GTGD (0.12%)', '8%', '15/01/2026'),
                      buildQrgwTableRow('4', 'QR_PN_DC_002', 'ACTIVE', 'BIDV', 'Thu hộ QR', 'Phí XLGD', '1 bậc (1.000 đ/GD)', '8%', '01/02/2026'),
                      buildQrgwTableRow('5', 'QR_PN_DC_001', 'INACTIVE', 'MBBank', 'Chi hộ QR', 'Phí XLGD', '1 bậc (1.500 đ/GD)', '8%', '01/02/2026'),
                      buildPagination('45 kết quả', 'multi')
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

export function buildScreenQrgwTabActive() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-LIST-02: Danh sách Phí QRGW - Tab Đang hoạt động',
    width: 1440,
    height: 960,
    x: 8040,
    y: 0,
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
              buildPageHeader('Quản lý cấu hình phí đối tác QRGW'),
              buildQrgwFilterBox(),
              {
                type: 'FRAME',
                name: 'Table Card Section',
                layoutMode: 'VERTICAL',
                layoutAlign: 'STRETCH',
                itemSpacing: 10,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Tabs and Quick Search Bar',
                    layoutMode: 'HORIZONTAL',
                    layoutAlign: 'STRETCH',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      {
                        type: 'FRAME',
                        name: 'Status Tabs',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 16,
                        children: [
                          { type: 'TEXT', characters: 'Tất cả (45)', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted },
                          {
                            type: 'FRAME',
                            name: 'Tab Active Box',
                            layoutMode: 'VERTICAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 4,
                            children: [
                              { type: 'TEXT', characters: 'Đang hoạt động (32)', fontSize: 12, fontWeight: 700, fill: TOKENS.linkBlue },
                              { type: 'FRAME', name: 'Indicator', width: 120, height: 2, fill: TOKENS.linkBlue }
                            ]
                          },
                          { type: 'TEXT', characters: 'Chờ phê duyệt (3)', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted }
                        ]
                      },
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
                              { type: 'TEXT', characters: 'Tìm trong 32 biểu phí QR active...', fontSize: 11, fill: TOKENS.inkSubtle }
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
                      buildTableHeader(qrgwTableCols),
                      buildQrgwTableRow('1', 'QR_PN_DC_004', 'ACTIVE', 'VietinBank', 'Chi hộ QR', 'Phí thanh toán', 'Theo GTGD (0.15%)', '8%', '01/01/2026'),
                      buildQrgwTableRow('2', 'QR_PN_DC_002', 'ACTIVE', 'BIDV', 'Thu hộ QR', 'Phí XLGD', '1 bậc (1.000 đ/GD)', '8%', '01/02/2026'),
                      buildQrgwTableRow('3', 'QR_PN_DC_006', 'ACTIVE', 'TPBank', 'Thu hộ QR', 'Phí thanh toán', 'Theo GTGD (0.14%)', '8%', '15/02/2026'),
                      buildQrgwTableRow('4', 'QR_PN_DC_007', 'ACTIVE', 'VPBank', 'Chi hộ QR', 'Phí XLGD', 'Theo SLGD (800đ ~ 1.500đ)', '8%', '01/03/2026'),
                      buildQrgwTableRow('5', 'QR_PN_DC_008', 'ACTIVE', 'Agribank', 'Thu hộ QR', 'Phí thanh toán', 'Theo GTGD (0.16%)', '8%', '15/03/2026'),
                      buildPagination('32 kết quả (duy nhất 1 active/dịch vụ)', 'multi')
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

export function buildScreenQrgwTabPending() {
  const pendingCols = [
    { label: 'STT', w: 35 },
    { label: 'MÃ CẤU HÌNH PHÍ', w: 135 },
    { label: 'TRẠNG THÁI CẤU HÌNH', w: 130 },
    { label: 'ĐỐI TÁC HƯỞNG PHÍ', w: 140 },
    { label: 'LOẠI DỊCH VỤ', w: 150 },
    { label: 'LOẠI PHÍ', w: 120 },
    { label: 'HÌNH THỨC THU PHÍ', w: 150 },
    { label: 'THUẾ VAT', w: 65 },
    { label: 'THỜI GIAN ÁP DỤNG', w: 105 },
    { label: 'DUYỆT / THAO TÁC', w: 140 }
  ];

  return {
    type: 'FRAME',
    name: 'SCR-QR-LIST-03: Danh sách Phí QRGW - Tab Chờ xử lý',
    width: 1440,
    height: 960,
    x: 9580,
    y: 0,
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
              buildPageHeader('Quản lý cấu hình phí đối tác QRGW'),
              buildQrgwFilterBox(),
              {
                type: 'FRAME',
                name: 'Table Card Section',
                layoutMode: 'VERTICAL',
                layoutAlign: 'STRETCH',
                itemSpacing: 10,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Tabs and Quick Search Bar',
                    layoutMode: 'HORIZONTAL',
                    layoutAlign: 'STRETCH',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      {
                        type: 'FRAME',
                        name: 'Status Tabs',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 16,
                        children: [
                          { type: 'TEXT', characters: 'Tất cả (45)', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted },
                          { type: 'TEXT', characters: 'Đang hoạt động (32)', fontSize: 12, fontWeight: 500, fill: TOKENS.inkMuted },
                          {
                            type: 'FRAME',
                            name: 'Tab Pending Box',
                            layoutMode: 'VERTICAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 4,
                            children: [
                              { type: 'TEXT', characters: 'Chờ phê duyệt (3)', fontSize: 12, fontWeight: 700, fill: '#D97706' },
                              { type: 'FRAME', name: 'Indicator', width: 110, height: 2, fill: '#D97706' }
                            ]
                          }
                        ]
                      },
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
                              { type: 'TEXT', characters: 'Tìm trong 3 yêu cầu duyệt QR...', fontSize: 11, fill: TOKENS.inkSubtle }
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
                      buildTableHeader(pendingCols),
                      buildQrgwTableRow('1', 'QR_PN_DC_003', 'PENDING', 'Vietcombank', 'Thu hộ QR', 'Phí thanh toán', 'Theo GTGD (0.12%)', '8%', '15/01/2026', true),
                      buildQrgwTableRow('2', 'QR_PN_DC_009', 'PENDING', 'Techcombank', 'Chi hộ QR', 'Phí XLGD', '1 bậc (1.200 đ/GD)', '8%', '01/02/2026', true),
                      buildQrgwTableRow('3', 'QR_PN_DC_010', 'PENDING', 'HDBank', 'Thu hộ QR', 'Phí thanh toán', 'Theo GTGD (0.15%)', '8%', '15/02/2026', true),
                      buildPagination('03 yêu cầu chờ phê duyệt', '1')
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

// Generate JSON files for QRGW tabs
const qrAll = buildScreenQrgwTabAll();
const qrActive = buildScreenQrgwTabActive();
const qrPending = buildScreenQrgwTabPending();

fs.writeFileSync('scripts/qr-tab-all.json', JSON.stringify(qrAll), 'utf8');
fs.writeFileSync('scripts/qr-tab-active.json', JSON.stringify(qrActive), 'utf8');
fs.writeFileSync('scripts/qr-tab-pending.json', JSON.stringify(qrPending), 'utf8');
console.log('✅ Generated QRGW tab JSON files successfully!');
