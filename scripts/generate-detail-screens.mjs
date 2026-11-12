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
  
  pendingBg: '#FEF3C7',
  pendingDot: '#D97706',
  pendingText: '#B45309',

  inactiveBg: '#F1F5F9',
  inactiveDot: '#64748B',
  inactiveText: '#475569',

  dangerBg: '#FEE2E2',
  dangerText: '#B91C1C'
};

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
          {
            type: 'FRAME',
            name: 'Menu Group: Fee Config',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            children: [
              {
                type: 'FRAME',
                name: 'Parent Menu Item',
                height: 40,
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 16, right: 16 },
                itemSpacing: 10,
                fill: '#EFF6FF',
                children: [
                  { type: 'TEXT', characters: '⚙️', fontSize: 13, fill: TOKENS.primaryAction },
                  { type: 'TEXT', characters: 'Quản lý cấu hình phí', fontSize: 12, fontWeight: 700, fill: TOKENS.primaryAction }
                ]
              },
              {
                type: 'FRAME',
                name: 'Submenu Tier 1',
                height: 36,
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 32, right: 16 },
                itemSpacing: 8,
                children: [
                  { type: 'TEXT', characters: '▾', fontSize: 11, fill: TOKENS.inkSecondary },
                  { type: 'TEXT', characters: 'Phí trả đối tác', fontSize: 12, fontWeight: 600, fill: TOKENS.ink }
                ]
              },
              {
                type: 'FRAME',
                name: 'Submenu Item: CTT',
                height: 34,
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 48, right: 16 },
                fill: isCtt ? '#DBEAFE' : '#00000000',
                children: [
                  {
                    type: 'TEXT',
                    characters: '• Phí đối tác CTT',
                    fontSize: 12,
                    fontWeight: isCtt ? 700 : 400,
                    fill: isCtt ? TOKENS.primaryAction : TOKENS.inkSecondary
                  }
                ]
              },
              {
                type: 'FRAME',
                name: 'Submenu Item: QRGW',
                height: 34,
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 48, right: 16 },
                fill: isQrgw ? '#DBEAFE' : '#00000000',
                children: [
                  {
                    type: 'TEXT',
                    characters: '• Phí đối tác QRGW',
                    fontSize: 12,
                    fontWeight: isQrgw ? 700 : 400,
                    fill: isQrgw ? TOKENS.primaryAction : TOKENS.inkSecondary
                  }
                ]
              }
            ]
          },
          {
            type: 'FRAME',
            name: 'Menu Item: Đối tác',
            height: 40,
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 16, right: 16 },
            itemSpacing: 10,
            children: [
              { type: 'TEXT', characters: '🏢', fontSize: 13, fill: TOKENS.inkMuted },
              { type: 'TEXT', characters: 'Quản lý đối tác', fontSize: 12, fill: TOKENS.inkSecondary }
            ]
          },
          {
            type: 'FRAME',
            name: 'Menu Item: Báo cáo',
            height: 40,
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 16, right: 16 },
            itemSpacing: 10,
            children: [
              { type: 'TEXT', characters: '📊', fontSize: 13, fill: TOKENS.inkMuted },
              { type: 'TEXT', characters: 'Báo cáo & Đối soát', fontSize: 12, fill: TOKENS.inkSecondary }
            ]
          }
        ]
      }
    ]
  };
}

function buildHeader() {
  return {
    type: 'FRAME',
    name: 'Top Header',
    height: 60,
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 24, right: 24 },
    fill: TOKENS.brandHeaderBg,
    children: [
      {
        type: 'FRAME',
        name: 'Search Bar',
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
          { type: 'TEXT', characters: 'Tìm kiếm theo mã cấu hình, tên đối tác...', fontSize: 12, fill: TOKENS.inkSubtle }
        ]
      },
      {
        type: 'FRAME',
        name: 'Right User Box',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          { type: 'TEXT', characters: '🔔', fontSize: 14, fill: '#FFFFFF' },
          { type: 'TEXT', characters: '⚙️', fontSize: 14, fill: '#FFFFFF' },
          {
            type: 'FRAME',
            name: 'Profile Capsule',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 8,
            padding: { left: 8, right: 10, top: 4, bottom: 4 },
            cornerRadius: 18,
            fill: '#FFFFFF33',
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
              { type: 'TEXT', characters: 'Lisa ▾', fontSize: 12, fontWeight: 500, fill: '#FFFFFF' }
            ]
          }
        ]
      }
    ]
  };
}

function buildStatusBadge(status) {
  let bg = TOKENS.activeBg;
  let dot = TOKENS.activeDot;
  let text = TOKENS.activeText;
  let label = 'Đang hoạt động';

  if (status === 'PENDING') {
    bg = TOKENS.pendingBg;
    dot = TOKENS.pendingDot;
    text = TOKENS.pendingText;
    label = 'Chờ phê duyệt';
  } else if (status === 'INACTIVE') {
    bg = TOKENS.inactiveBg;
    dot = TOKENS.inactiveDot;
    text = TOKENS.inactiveText;
    label = 'Hết hiệu lực';
  }

  return {
    type: 'FRAME',
    name: 'Status Badge',
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    itemSpacing: 6,
    padding: { left: 10, right: 10, top: 4, bottom: 4 },
    cornerRadius: 12,
    fill: bg,
    children: [
      {
        type: 'FRAME',
        name: 'Dot',
        width: 8,
        height: 8,
        cornerRadius: 4,
        fill: dot
      },
      {
        type: 'TEXT',
        characters: label,
        fontSize: 11,
        fontWeight: 600,
        fill: text
      }
    ]
  };
}

function buildReadOnlyField(label, value, width = 260) {
  return {
    type: 'FRAME',
    name: 'ReadOnly: ' + label,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 4,
    children: [
      {
        type: 'TEXT',
        characters: label,
        fontSize: 11,
        fontWeight: 500,
        fill: TOKENS.inkMuted
      },
      {
        type: 'FRAME',
        name: 'Value Box',
        height: 36,
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 12, right: 12 },
        cornerRadius: 6,
        fill: '#F8FAFC',
        stroke: TOKENS.border,
        strokeWeight: 1,
        children: [
          {
            type: 'TEXT',
            characters: String(value),
            fontSize: 12,
            fontWeight: 600,
            fill: TOKENS.ink
          }
        ]
      }
    ]
  };
}

function buildDetailBanner(status, customNote) {
  let bg = '#ECFDF5';
  let border = '#A7F3D0';
  let text = '#065F46';
  let icon = '🟢';
  let message = 'Cấu hình đang HOẠT ĐỘNG và áp dụng tính phí giao dịch thực tế từ 00:00 01/10/2026.';

  if (status === 'PENDING') {
    bg = '#FEF3C7';
    border = '#FDE68A';
    text = '#92400E';
    icon = '⏳';
    message = 'Cấu hình đang CHỜ PHÊ DUYỆT từ Checker. Người tạo: tran.van.b (Maker) lúc 14:30 03/11/2026.';
  } else if (status === 'INACTIVE') {
    bg = '#F1F5F9';
    border = '#CBD5E1';
    text = '#475569';
    icon = '⚪';
    message = 'Cấu hình đã HẾT HIỆU LỰC từ 00:00 01/10/2026. Đã được thay thế bởi cấu hình mới.';
  }

  if (customNote) message = customNote;

  return {
    type: 'FRAME',
    name: 'Status Banner',
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 16, right: 16, top: 10, bottom: 10 },
    cornerRadius: 8,
    fill: bg,
    stroke: border,
    strokeWeight: 1,
    itemSpacing: 10,
    children: [
      { type: 'TEXT', characters: icon, fontSize: 14 },
      {
        type: 'TEXT',
        characters: message,
        fontSize: 12,
        fontWeight: 500,
        fill: text
      }
    ]
  };
}

function buildAuditTrail() {
  const logs = [
    { time: '04/11/2026 09:30', user: 'tran.van.b (Maker)', action: 'Tạo mới và gửi yêu cầu phê duyệt cấu hình' },
    { time: '04/11/2026 11:15', user: 'le.thi.c (Checker)', action: 'Phê duyệt cấu hình biểu phí' },
    { time: '04/11/2026 11:15', user: 'Hệ thống tự động', action: 'Kích hoạt cấu hình sang trạng thái Đang hoạt động' }
  ];

  return {
    type: 'FRAME',
    name: 'Card: Audit Trail',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: 16,
    cornerRadius: 8,
    fill: TOKENS.cardBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 12,
    children: [
      {
        type: 'FRAME',
        name: 'Card Header',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 8,
        children: [
          { type: 'TEXT', characters: '🕒', fontSize: 13 },
          { type: 'TEXT', characters: 'LỊCH SỬ PHÊ DUYỆT & NHẬT KÝ HOẠT ĐỘNG (AUDIT TRAIL)', fontSize: 12, fontWeight: 700, fill: TOKENS.primaryBlue }
        ]
      },
      {
        type: 'FRAME',
        name: 'Logs List',
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        itemSpacing: 8,
        children: logs.map((log, idx) => ({
          type: 'FRAME',
          name: 'Log Item ' + (idx + 1),
          layoutAlign: 'STRETCH',
          layoutMode: 'HORIZONTAL',
          counterAxisAlignItems: 'CENTER',
          padding: { left: 12, right: 12, top: 6, bottom: 6 },
          fill: idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
          cornerRadius: 4,
          itemSpacing: 16,
          children: [
            { type: 'TEXT', characters: '•', fontSize: 12, fill: TOKENS.primaryAction },
            { type: 'TEXT', characters: log.time, fontSize: 11, fontWeight: 600, fill: TOKENS.inkSecondary, width: 130 },
            { type: 'TEXT', characters: log.user, fontSize: 11, fontWeight: 600, fill: TOKENS.ink, width: 160 },
            { type: 'TEXT', characters: log.action, fontSize: 11, fill: TOKENS.inkSecondary }
          ]
        }))
      }
    ]
  };
}

export function generateAllDetailScreens() {
  const screens = [];

  // =========================================================================
  // 1. SCR-CTT-DT-01: Chi tiết Phí Thanh toán CTT - Active (SM_PN_DC_006)
  // =========================================================================
  screens.push({
    meta: {
      screenId: 'SCR-CTT-DT-01',
      title: 'Chi tiết Phí Thanh toán CTT - Đang hoạt động',
      x: 0,
      y: 2600,
      width: 1440,
      height: 960
    },
    menu: 'CTT',
    status: 'ACTIVE',
    code: 'SM_PN_DC_006',
    configName: 'Biểu phí Thẻ quốc tế Visa/MasterCard - Napas',
    bannerNote: '🟢 Cấu hình đang HOẠT ĐỘNG và áp dụng tính phí giao dịch thực tế từ 00:00 01/10/2026.',
    generalFields: [
      { label: 'Mã cấu hình', value: 'SM_PN_DC_006' },
      { label: 'Tên cấu hình', value: 'Biểu phí Thẻ quốc tế Visa/MasterCard' },
      { label: 'Đối tác', value: 'Napas / Visa Inc' },
      { label: 'Phương thức TT', value: 'Thẻ quốc tế' },
      { label: 'Nơi phát hành thẻ', value: 'Trong nước & Nước ngoài' },
      { label: 'Thương hiệu áp dụng', value: 'Visa, MasterCard, JCB' },
      { label: 'Mã ngành (MCC)', value: 'Tất cả MCC' },
      { label: 'Thời gian hiệu lực', value: '01/10/2026 - 31/12/2027' }
    ],
    ruleFields: [
      { label: 'Loại biểu phí', value: 'Phí thanh toán' },
      { label: 'Hình thức thu phí', value: 'Theo GTGD (% giá trị)' },
      { label: 'Tỷ lệ phí (%)', value: '1.85%' },
      { label: 'Mức phí tối thiểu (Min)', value: '3.000 VNĐ' },
      { label: 'Mức phí tối đa (Max)', value: '50.000 VNĐ' },
      { label: 'Thuế VAT', value: 'Đã bao gồm VAT (10%)' },
      { label: 'Loại GD áp dụng', value: 'Thanh toán & Hoàn trả' },
      { label: 'Ngày áp dụng phí hoàn trả', value: 'Ngày giao dịch gốc' }
    ],
    actions: [
      { label: '← Quay lại', type: 'secondary' },
      { label: '⎘ Sao chép cấu hình', type: 'outline' },
      { label: '✏️ Chỉnh sửa', type: 'primary' }
    ]
  });

  // =========================================================================
  // 2. SCR-CTT-DT-02: Chi tiết Phí Thanh toán CTT - Pending Checker
  // =========================================================================
  screens.push({
    meta: {
      screenId: 'SCR-CTT-DT-02',
      title: 'Chi tiết Phí Thanh toán CTT - Chờ phê duyệt',
      x: 1540,
      y: 2600,
      width: 1440,
      height: 960
    },
    menu: 'CTT',
    status: 'PENDING',
    code: 'CTT_FE_TT_009',
    configName: 'Biểu phí Thẻ Nội địa Techcombank Gateway',
    bannerNote: '⏳ Cấu hình đang CHỜ PHÊ DUYỆT bởi Checker. Người tạo: nguyen.van.a (Maker) lúc 10:15 04/11/2026.',
    generalFields: [
      { label: 'Mã cấu hình', value: 'CTT_FE_TT_009' },
      { label: 'Tên cấu hình', value: 'Biểu phí Thẻ Nội địa Techcombank Gateway' },
      { label: 'Đối tác', value: 'Techcombank Gateway' },
      { label: 'Phương thức TT', value: 'Thẻ nội địa & TK ngân hàng' },
      { label: 'Mã ngành (MCC)', value: 'MCC 5311 - Bán lẻ tổng hợp' },
      { label: 'Thời gian hiệu lực', value: '15/11/2026 - Không thời hạn' },
      { label: 'Người tạo yêu cầu', value: 'nguyen.van.a (Maker)' },
      { label: 'Ngày gửi yêu cầu', value: '04/11/2026 10:15' }
    ],
    ruleFields: [
      { label: 'Loại biểu phí', value: 'Phí thanh toán' },
      { label: 'Hình thức thu phí', value: 'Theo GTGD (% giá trị)' },
      { label: 'Tỷ lệ phí (%)', value: '0.75%' },
      { label: 'Mức phí tối thiểu (Min)', value: '1.100 VNĐ' },
      { label: 'Mức phí tối đa (Max)', value: '15.000 VNĐ' },
      { label: 'Thuế VAT', value: 'Đã bao gồm VAT' },
      { label: 'Loại GD áp dụng', value: 'Thanh toán & Hoàn trả' },
      { label: 'Ngày áp dụng phí hoàn trả', value: 'Ngày tạo giao dịch hoàn trả' }
    ],
    actions: [
      { label: '← Quay lại', type: 'secondary' },
      { label: '↩ Rút yêu cầu', type: 'outline' },
      { label: '✕ Từ chối', type: 'danger' },
      { label: '✓ Phê duyệt cấu hình', type: 'success' }
    ]
  });

  // =========================================================================
  // 3. SCR-CTT-DT-03: Chi tiết Phí XLGD CTT - Active Bậc thang
  // =========================================================================
  screens.push({
    meta: {
      screenId: 'SCR-CTT-DT-03',
      title: 'Chi tiết Phí XLGD CTT - Đang hoạt động',
      x: 3080,
      y: 2600,
      width: 1440,
      height: 960
    },
    menu: 'CTT',
    status: 'ACTIVE',
    code: 'CTT_FE_XL_002',
    configName: 'Phí XLGD Thẻ Nội địa CTT - Bậc thang SLGD',
    bannerNote: '🟢 Cấu hình đang HOẠT ĐỘNG và áp dụng tính phí xử lý giao dịch Napas từ 01/10/2026.',
    generalFields: [
      { label: 'Mã cấu hình', value: 'CTT_FE_XL_002' },
      { label: 'Tên cấu hình', value: 'Phí XLGD Thẻ Nội địa CTT' },
      { label: 'Đối tác', value: 'Napas Switch' },
      { label: 'Phương thức TT', value: 'Thẻ nội địa & TK ngân hàng' },
      { label: 'Trạng thái GD tính phí', value: 'Tất cả (Thành công & Thất bại)' },
      { label: 'Mã ngành (MCC)', value: 'Tất cả MCC' },
      { label: 'Thời gian hiệu lực', value: '01/10/2026 - Không thời hạn' },
      { label: 'Kỳ chốt đối soát', value: 'Hàng tháng (Tháng M+1)' }
    ],
    ruleFields: [
      { label: 'Loại biểu phí', value: 'Phí xử lý giao dịch (XLGD)' },
      { label: 'Hình thức thu phí', value: 'Theo SLGD (Bậc thang luỹ thoái)' },
      { label: 'Bậc 1 (0 - 50.000 GD)', value: '650 VNĐ / giao dịch' },
      { label: 'Bậc 2 (50.001 - 200.000 GD)', value: '550 VNĐ / giao dịch' },
      { label: 'Bậc 3 (Trên 200.000 GD)', value: '450 VNĐ / giao dịch' },
      { label: 'Thuế VAT', value: 'Chưa bao gồm VAT' },
      { label: 'Loại GD áp dụng', value: 'Thanh toán & Hoàn trả' },
      { label: 'Ngày áp dụng phí hoàn trả', value: 'Ngày tạo giao dịch hoàn trả' }
    ],
    actions: [
      { label: '← Quay lại', type: 'secondary' },
      { label: '⎘ Sao chép cấu hình', type: 'outline' },
      { label: '✏️ Chỉnh sửa', type: 'primary' }
    ]
  });

  // =========================================================================
  // 4. SCR-CTT-DT-04: Chi tiết Phí XLGD CTT - Inactive
  // =========================================================================
  screens.push({
    meta: {
      screenId: 'SCR-CTT-DT-04',
      title: 'Chi tiết Phí XLGD CTT - Hết hiệu lực',
      x: 4620,
      y: 2600,
      width: 1440,
      height: 960
    },
    menu: 'CTT',
    status: 'INACTIVE',
    code: 'CTT_FE_XL_001',
    configName: 'Phí XLGD Thẻ Quốc tế Cũ (Áp dụng năm 2025)',
    bannerNote: '⚪ Cấu hình đã HẾT HIỆU LỰC từ 00:00 01/10/2026. Thay thế bởi biểu phí mới CTT_FE_XL_002.',
    generalFields: [
      { label: 'Mã cấu hình', value: 'CTT_FE_XL_001' },
      { label: 'Tên cấu hình', value: 'Phí XLGD Thẻ Quốc tế Cũ' },
      { label: 'Đối tác', value: 'Visa / MasterCard' },
      { label: 'Phương thức TT', value: 'Thẻ quốc tế' },
      { label: 'Nơi phát hành thẻ', value: 'Nước ngoài' },
      { label: 'Trạng thái GD tính phí', value: 'Chỉ giao dịch Thành công' },
      { label: 'Thời gian áp dụng', value: '01/01/2025 - 30/09/2026' },
      { label: 'Lý do đóng', value: 'Chuyển sang gói phí theo bậc thang mới' }
    ],
    ruleFields: [
      { label: 'Loại biểu phí', value: 'Phí xử lý giao dịch (XLGD)' },
      { label: 'Hình thức thu phí', value: '1 bậc (Cố định)' },
      { label: 'Mức phí cố định', value: '1.200 VNĐ / giao dịch' },
      { label: 'Thuế VAT', value: 'Đã bao gồm VAT' },
      { label: 'Loại GD áp dụng', value: 'Thanh toán' },
      { label: 'Ngày hết hạn', value: '30/09/2026' },
      { label: 'Người thực hiện đóng', value: 'admin_sys' },
      { label: 'Ngày đóng cấu hình', value: '01/10/2026 00:00' }
    ],
    actions: [
      { label: '← Quay lại', type: 'secondary' },
      { label: '⚡ Yêu cầu kích hoạt lại', type: 'outline' },
      { label: '⎘ Nhân bản cấu hình', type: 'primary' }
    ]
  });

  // =========================================================================
  // 5. SCR-QR-DT-01: Chi tiết Phí Thanh toán QRGW - Active
  // =========================================================================
  screens.push({
    meta: {
      screenId: 'SCR-QR-DT-01',
      title: 'Chi tiết Phí Thanh toán QRGW - Đang hoạt động',
      x: 6500,
      y: 2600,
      width: 1440,
      height: 960
    },
    menu: 'QRGW',
    status: 'ACTIVE',
    code: 'QR_PN_DC_003',
    configName: 'Biểu phí Thu hộ QR Pay-in VNPAY / VietQR',
    bannerNote: '🟢 Cấu hình đang HOẠT ĐỘNG và áp dụng tính phí dịch vụ Thu hộ QR từ 01/08/2026.',
    generalFields: [
      { label: 'Mã cấu hình', value: 'QR_PN_DC_003' },
      { label: 'Tên cấu hình', value: 'Biểu phí Thu hộ QR VNPAY/VietQR' },
      { label: 'Đối tác', value: 'VNPAY QR Switch' },
      { label: 'Dịch vụ áp dụng', value: 'Thu hộ QR (Pay-in)' },
      { label: 'Kênh thanh toán', value: 'Dynamic QR & Static QR' },
      { label: 'Kỳ thanh toán phí', value: 'Khấu trừ trực tiếp theo GD' },
      { label: 'Thời gian hiệu lực', value: '01/08/2026 - 31/12/2027' },
      { label: 'Trạng thái', value: 'Đang hoạt động' }
    ],
    ruleFields: [
      { label: 'Loại biểu phí', value: 'Phí thanh toán' },
      { label: 'Hình thức thu phí', value: 'Theo GTGD (% giá trị)' },
      { label: 'Tỷ lệ phí (%)', value: '0.65%' },
      { label: 'Mức phí tối thiểu (Min)', value: '1.500 VNĐ' },
      { label: 'Mức phí tối đa (Max)', value: '30.000 VNĐ' },
      { label: 'Thuế VAT', value: 'Đã bao gồm VAT' },
      { label: 'Loại GD áp dụng', value: 'Thanh toán & Hoàn tiền QR' },
      { label: 'Ngày áp dụng phí hoàn trả', value: 'Ngày tạo giao dịch hoàn trả' }
    ],
    actions: [
      { label: '← Quay lại', type: 'secondary' },
      { label: '⎘ Sao chép cấu hình', type: 'outline' },
      { label: '✏️ Chỉnh sửa', type: 'primary' }
    ]
  });

  // =========================================================================
  // 6. SCR-QR-DT-02: Chi tiết Phí Thanh toán QRGW - Pending Checker
  // =========================================================================
  screens.push({
    meta: {
      screenId: 'SCR-QR-DT-02',
      title: 'Chi tiết Phí Thanh toán QRGW - Chờ phê duyệt',
      x: 8040,
      y: 2600,
      width: 1440,
      height: 960
    },
    menu: 'QRGW',
    status: 'PENDING',
    code: 'QR_PN_DC_005',
    configName: 'Biểu phí Thu hộ VietQR Đối tác Ngân hàng Mới',
    bannerNote: '⏳ Cấu hình đang CHỜ PHÊ DUYỆT bởi Checker. Người tạo: hoang.thi.d (Maker) lúc 15:45 04/11/2026.',
    generalFields: [
      { label: 'Mã cấu hình', value: 'QR_PN_DC_005' },
      { label: 'Tên cấu hình', value: 'Biểu phí Thu hộ VietQR Ngân hàng Mới' },
      { label: 'Đối tác', value: 'VietQR Switch (Napas)' },
      { label: 'Dịch vụ áp dụng', value: 'Thu hộ QR (Pay-in)' },
      { label: 'Thời gian hiệu lực', value: '01/12/2026 - Không thời hạn' },
      { label: 'Người tạo yêu cầu', value: 'hoang.thi.d (Maker)' },
      { label: 'Ngày gửi duyệt', value: '04/11/2026 15:45' },
      { label: 'Trạng thái', value: 'Chờ phê duyệt' }
    ],
    ruleFields: [
      { label: 'Loại biểu phí', value: 'Phí thanh toán' },
      { label: 'Hình thức thu phí', value: 'Theo GTGD (% giá trị)' },
      { label: 'Tỷ lệ phí (%)', value: '0.50%' },
      { label: 'Mức phí tối thiểu (Min)', value: '1.200 VNĐ' },
      { label: 'Mức phí tối đa (Max)', value: '25.000 VNĐ' },
      { label: 'Thuế VAT', value: 'Đã bao gồm VAT' },
      { label: 'Loại GD áp dụng', value: 'Thanh toán & Hoàn trả' },
      { label: 'Ngày áp dụng phí hoàn trả', value: 'Ngày giao dịch gốc' }
    ],
    actions: [
      { label: '← Quay lại', type: 'secondary' },
      { label: '↩ Rút yêu cầu', type: 'outline' },
      { label: '✕ Từ chối', type: 'danger' },
      { label: '✓ Phê duyệt cấu hình', type: 'success' }
    ]
  });

  // =========================================================================
  // 7. SCR-QR-DT-03: Chi tiết Phí XLGD QRGW - Active Chi hộ Bậc thang
  // =========================================================================
  screens.push({
    meta: {
      screenId: 'SCR-QR-DT-03',
      title: 'Chi tiết Phí XLGD QRGW - Đang hoạt động',
      x: 9580,
      y: 2600,
      width: 1440,
      height: 960
    },
    menu: 'QRGW',
    status: 'ACTIVE',
    code: 'QR_FE_XL_001',
    configName: 'Phí XLGD Dịch vụ Chi hộ QR Napas 247',
    bannerNote: '🟢 Cấu hình đang HOẠT ĐỘNG và áp dụng tính phí xử lý chuyển tiền nhanh Napas 247 từ 01/09/2026.',
    generalFields: [
      { label: 'Mã cấu hình', value: 'QR_FE_XL_001' },
      { label: 'Tên cấu hình', value: 'Phí XLGD Chi hộ QR Napas 247' },
      { label: 'Đối tác', value: 'Napas 247 Switch' },
      { label: 'Dịch vụ áp dụng', value: 'Chi hộ QR (Pay-out)' },
      { label: 'Trạng thái GD tính phí', value: 'Chỉ giao dịch Thành công' },
      { label: 'Thời gian hiệu lực', value: '01/09/2026 - Không thời hạn' },
      { label: 'Hạn mức giao dịch chi', value: 'Tối đa 500.000.000 VNĐ/GD' },
      { label: 'Trạng thái', value: 'Đang hoạt động' }
    ],
    ruleFields: [
      { label: 'Loại biểu phí', value: 'Phí xử lý giao dịch (XLGD)' },
      { label: 'Hình thức thu phí', value: 'Theo SLGD (Bậc thang luỹ thoái)' },
      { label: 'Bậc 1 (0 - 30.000 GD)', value: '1.200 VNĐ / giao dịch' },
      { label: 'Bậc 2 (30.001 - 100.000 GD)', value: '900 VNĐ / giao dịch' },
      { label: 'Bậc 3 (Trên 100.000 GD)', value: '700 VNĐ / giao dịch' },
      { label: 'Thuế VAT', value: 'Chưa bao gồm VAT' },
      { label: 'Loại GD áp dụng', value: 'Chi hộ Napas 247' },
      { label: 'Kỳ chốt đối soát', value: 'Hàng tháng (Tháng M+1)' }
    ],
    actions: [
      { label: '← Quay lại', type: 'secondary' },
      { label: '⎘ Sao chép cấu hình', type: 'outline' },
      { label: '✏️ Chỉnh sửa', type: 'primary' }
    ]
  });

  return screens;
}

function buildActionButton(btn) {
  let bg = TOKENS.primaryAction;
  let text = '#FFFFFF';
  let border = TOKENS.primaryAction;

  if (btn.type === 'secondary') {
    bg = '#F1F5F9';
    text = TOKENS.ink;
    border = TOKENS.border;
  } else if (btn.type === 'outline') {
    bg = '#FFFFFF';
    text = TOKENS.primaryAction;
    border = TOKENS.primaryAction;
  } else if (btn.type === 'danger') {
    bg = '#DC2626';
    text = '#FFFFFF';
    border = '#DC2626';
  } else if (btn.type === 'success') {
    bg = '#16A34A';
    text = '#FFFFFF';
    border = '#16A34A';
  }

  return {
    type: 'FRAME',
    name: 'Btn: ' + btn.label,
    height: 36,
    cornerRadius: 6,
    fill: bg,
    stroke: border,
    strokeWeight: 1,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 14, right: 14 },
    children: [
      {
        type: 'TEXT',
        characters: btn.label,
        fontSize: 12,
        fontWeight: 600,
        fill: text
      }
    ]
  };
}

export function compileScreenToFigmaNode(spec) {
  // Chia 8 fields thành 2 hàng, mỗi hàng 4 cột
  const row1Fields = spec.generalFields.slice(0, 4);
  const row2Fields = spec.generalFields.slice(4, 8);

  const row1Rule = spec.ruleFields.slice(0, 4);
  const row2Rule = spec.ruleFields.slice(4, 8);

  const node = {
    type: 'FRAME',
    name: `${spec.meta.screenId}: ${spec.meta.title}`,
    x: spec.meta.x,
    y: spec.meta.y,
    width: spec.meta.width,
    height: spec.meta.height,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar(spec.menu),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 960,
        fill: TOKENS.bodyBg,
        children: [
          buildHeader(),
          {
            type: 'FRAME',
            name: 'Page Scroll Area',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { left: 24, right: 24, top: 16, bottom: 24 },
            itemSpacing: 14,
            children: [
              // Top breadcrumb & actions
              {
                type: 'FRAME',
                name: 'Top Navigation Bar',
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'SPACE_BETWEEN',
                counterAxisAlignItems: 'CENTER',
                children: [
                  {
                    type: 'FRAME',
                    name: 'Title & Breadcrumb',
                    layoutMode: 'VERTICAL',
                    itemSpacing: 4,
                    children: [
                      {
                        type: 'TEXT',
                        characters: `Quản lý cấu hình phí  /  Phí đối tác ${spec.menu}  /  Chi tiết cấu hình`,
                        fontSize: 11,
                        fill: TOKENS.inkMuted
                      },
                      {
                        type: 'FRAME',
                        name: 'Title with Badge',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 12,
                        children: [
                          {
                            type: 'TEXT',
                            characters: `${spec.code} - ${spec.configName}`,
                            fontSize: 16,
                            fontWeight: 700,
                            fill: TOKENS.ink
                          },
                          buildStatusBadge(spec.status)
                        ]
                      }
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Action Buttons Group',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 8,
                    children: spec.actions.map(buildActionButton)
                  }
                ]
              },

              // Status banner
              buildDetailBanner(spec.status, spec.bannerNote),

              // Card 1: Thông tin chung
              {
                type: 'FRAME',
                name: 'Card: Thông tin chung',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: 16,
                cornerRadius: 8,
                fill: TOKENS.cardBg,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 12,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Card Header',
                    layoutMode: 'HORIZONTAL',
                    counterAxisAlignItems: 'CENTER',
                    itemSpacing: 8,
                    children: [
                      { type: 'TEXT', characters: '📋', fontSize: 13 },
                      { type: 'TEXT', characters: 'THÔNG TIN CHUNG CẤU HÌNH', fontSize: 12, fontWeight: 700, fill: TOKENS.primaryBlue }
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Row 1',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: row1Fields.map(f => buildReadOnlyField(f.label, f.value, 275))
                  },
                  {
                    type: 'FRAME',
                    name: 'Row 2',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: row2Fields.map(f => buildReadOnlyField(f.label, f.value, 275))
                  }
                ]
              },

              // Card 2: Quy tắc & Cơ chế tính phí
              {
                type: 'FRAME',
                name: 'Card: Cơ chế tính phí',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: 16,
                cornerRadius: 8,
                fill: TOKENS.cardBg,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 12,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Card Header',
                    layoutMode: 'HORIZONTAL',
                    counterAxisAlignItems: 'CENTER',
                    itemSpacing: 8,
                    children: [
                      { type: 'TEXT', characters: '💰', fontSize: 13 },
                      { type: 'TEXT', characters: 'QUY TẮC & CƠ CHẾ TÍNH PHÍ', fontSize: 12, fontWeight: 700, fill: TOKENS.primaryBlue }
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Row 1',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: row1Rule.map(f => buildReadOnlyField(f.label, f.value, 275))
                  },
                  {
                    type: 'FRAME',
                    name: 'Row 2',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: row2Rule.map(f => buildReadOnlyField(f.label, f.value, 275))
                  }
                ]
              },

              // Card 3: Audit Trail
              buildAuditTrail()
            ]
          }
        ]
      }
    ]
  };

  return node;
}

// Chạy và export ra các file json độc lập
const allDetailScreens = generateAllDetailScreens();
console.log(`Generated ${allDetailScreens.length} detail screens specs.`);

for (const scr of allDetailScreens) {
  const figmaNode = compileScreenToFigmaNode(scr);
  const filename = `scripts/${scr.meta.screenId.toLowerCase()}.json`;
  fs.writeFileSync(filename, JSON.stringify(figmaNode, null, 2), 'utf-8');
  console.log(`Saved ${filename}`);
}
