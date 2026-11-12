import fs from 'node:fs';

const TOKENS = {
  headerBg: '#74B4F7',
  bluePrimary: '#2563EB',
  blueDark: '#1E40AF',
  blueLight: '#EFF6FF',
  blueBorder: '#BFDBFE',
  white: '#FFFFFF',
  bodyBg: '#F8FAFC',
  border: '#CBD5E1',
  borderLight: '#E2E8F0',
  ink: '#1E293B',
  inkSecondary: '#475569',
  inkMuted: '#64748B',
  inkLight: '#94A3B8',
  tagBlueBg: '#DBEAFE',
  red: '#DC2626'
};

function buildSidebarQrgw() {
  return {
    type: 'FRAME',
    name: 'Sidebar',
    width: 230,
    height: 960,
    fill: TOKENS.white,
    stroke: TOKENS.borderLight,
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
        fill: TOKENS.headerBg,
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
                children: [{ type: 'TEXT', characters: '✦', fontSize: 16, fill: TOKENS.white }]
              },
              { type: 'TEXT', characters: 'epay', fontSize: 20, fontWeight: 700, fill: TOKENS.white }
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
            children: [{ type: 'TEXT', characters: '⇇', fontSize: 16, fill: TOKENS.white }]
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
                fill: TOKENS.blueLight,
                children: [
                  { type: 'TEXT', characters: '⚙️', fontSize: 13, fill: TOKENS.bluePrimary },
                  { type: 'TEXT', characters: 'Quản lý cấu hình phí', fontSize: 12, fontWeight: 700, fill: TOKENS.bluePrimary }
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
                fill: '#00000000',
                children: [
                  { type: 'TEXT', characters: '• Phí đối tác CTT', fontSize: 12, fontWeight: 400, fill: TOKENS.inkSecondary }
                ]
              },
              {
                type: 'FRAME',
                name: 'Submenu Item: QRGW (Active)',
                height: 34,
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 48, right: 16 },
                fill: TOKENS.tagBlueBg,
                children: [
                  { type: 'TEXT', characters: '• Phí đối tác QRGW', fontSize: 12, fontWeight: 700, fill: TOKENS.bluePrimary }
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

function buildTopbar() {
  return {
    type: 'FRAME',
    name: 'Top Header',
    height: 60,
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 24, right: 24 },
    fill: TOKENS.headerBg,
    children: [
      {
        type: 'FRAME',
        name: 'Search Bar',
        width: 380,
        height: 36,
        cornerRadius: 6,
        fill: TOKENS.white,
        stroke: TOKENS.borderLight,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 12, right: 12 },
        itemSpacing: 8,
        children: [
          { type: 'TEXT', characters: '🔍', fontSize: 13, fill: TOKENS.inkMuted },
          { type: 'TEXT', characters: 'Tìm kiếm theo mã cấu hình, tên đối tác...', fontSize: 12, fill: TOKENS.inkLight }
        ]
      },
      {
        type: 'FRAME',
        name: 'Right User Box',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          { type: 'TEXT', characters: '🔔', fontSize: 14, fill: TOKENS.white },
          { type: 'TEXT', characters: '📍', fontSize: 14, fill: TOKENS.white },
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
                name: 'User Avatar Red',
                width: 26,
                height: 26,
                cornerRadius: 13,
                fill: '#EF4444',
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: 'L', fontSize: 12, fontWeight: 700, fill: TOKENS.white }]
              },
              { type: 'TEXT', characters: 'Lisa ▾', fontSize: 12, fontWeight: 600, fill: TOKENS.white }
            ]
          }
        ]
      }
    ]
  };
}

function buildTwoTabs(activeTab = 'XLGD') {
  return {
    type: 'FRAME',
    name: 'Loại phí Tabs (2 tabs chuẩn)',
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    itemSpacing: 8,
    children: [
      {
        type: 'FRAME',
        name: 'Tab Phí XLGD',
        padding: { left: 18, right: 18, top: 8, bottom: 8 },
        cornerRadius: 6,
        fill: activeTab === 'XLGD' ? TOKENS.bluePrimary : TOKENS.white,
        stroke: activeTab === 'XLGD' ? TOKENS.bluePrimary : TOKENS.border,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        children: [{ type: 'TEXT', characters: 'Phí xử lý giao dịch', fontSize: 12, fontWeight: 600, fill: activeTab === 'XLGD' ? TOKENS.white : TOKENS.inkSecondary }]
      },
      {
        type: 'FRAME',
        name: 'Tab Phí Thanh toán',
        padding: { left: 18, right: 18, top: 8, bottom: 8 },
        cornerRadius: 6,
        fill: activeTab === 'TT' ? TOKENS.bluePrimary : TOKENS.white,
        stroke: activeTab === 'TT' ? TOKENS.bluePrimary : TOKENS.border,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        children: [{ type: 'TEXT', characters: 'Phí thanh toán', fontSize: 12, fontWeight: 600, fill: activeTab === 'TT' ? TOKENS.white : TOKENS.inkSecondary }]
      }
    ]
  };
}

function buildField(label, val, width = 560, isDropdown = true, suffix = '') {
  return {
    type: 'FRAME',
    name: `Field: ${label}`,
    width,
    layoutMode: 'VERTICAL',
    itemSpacing: 3,
    children: [
      { type: 'TEXT', characters: label, fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
      {
        type: 'FRAME',
        name: 'Input Box',
        layoutAlign: 'STRETCH',
        height: 28,
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.border,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 10, right: 10 },
        children: [
          { type: 'TEXT', characters: val, fontSize: 11, fill: TOKENS.ink },
          ...(suffix ? [{ type: 'TEXT', characters: suffix, fontSize: 11, fill: TOKENS.inkMuted }] : []),
          ...(isDropdown ? [{ type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }] : [])
        ]
      }
    ]
  };
}

function buildFooterButtons() {
  return {
    type: 'FRAME',
    name: 'Footer Action Bar',
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'MAX',
    counterAxisAlignItems: 'CENTER',
    itemSpacing: 10,
    padding: { top: 6, bottom: 6 },
    children: [
      {
        type: 'FRAME',
        name: 'Btn Cancel',
        padding: { left: 18, right: 18, top: 8, bottom: 8 },
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.border,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        children: [{ type: 'TEXT', characters: 'Hủy', fontSize: 12, fontWeight: 600, fill: TOKENS.ink }]
      },
      {
        type: 'FRAME',
        name: 'Btn Save Draft',
        padding: { left: 18, right: 18, top: 8, bottom: 8 },
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.bluePrimary,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        children: [{ type: 'TEXT', characters: 'Lưu nháp', fontSize: 12, fontWeight: 600, fill: TOKENS.bluePrimary }]
      },
      {
        type: 'FRAME',
        name: 'Btn Create New',
        padding: { left: 18, right: 18, top: 8, bottom: 8 },
        cornerRadius: 4,
        fill: TOKENS.bluePrimary,
        layoutMode: 'HORIZONTAL',
        children: [{ type: 'TEXT', characters: 'Tạo mới +', fontSize: 12, fontWeight: 700, fill: TOKENS.white }]
      }
    ]
  };
}

// KHỐI 1 QRGW CHO PHÍ XLGD (KHÔNG CÓ TRƯỜNG MCC - 4 HÀNG)
function buildCommonInfoCardQrgwXlgdNoMcc({ partner = 'VietinBank QRGW', service = 'Thu hộ QR (Pay-in)', desc = 'Cấu hình phí XLGD QRGW' }) {
  return {
    type: 'FRAME',
    name: 'Khối 1: Thông tin chung (QRGW XLGD - Không MCC)',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 10, bottom: 10 },
    cornerRadius: 8,
    fill: TOKENS.white,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 6,
    children: [
      { type: 'TEXT', characters: 'Thông tin chung', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
      // Row 1
      {
        type: 'FRAME',
        name: 'Row 1',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Nguồn dữ liệu cấu hình *', 'QRGW', 560),
          buildField('Đối tác/ Ngân hàng hưởng phí *', partner, 560)
        ]
      },
      // Row 2
      {
        type: 'FRAME',
        name: 'Row 2',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Kỳ trả phí *', 'Theo tháng', 560),
          buildField('Thời gian áp dụng phí *', '01/01/2026 📅', 560, false)
        ]
      },
      // Row 3: Loại DV & Trạng thái GD
      {
        type: 'FRAME',
        name: 'Row 3',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Loại dịch vụ QRGW *', service, 560),
          buildField('Trạng thái giao dịch *', 'Tất cả (Thành công và Thất bại)', 560)
        ]
      },
      // Row 4: Tiền tệ, VAT & Mô tả
      {
        type: 'FRAME',
        name: 'Row 4',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Đơn vị tiền tệ *', 'VND', 270),
          buildField('Thuế VAT *', '8 %', 270, false),
          buildField('Mô tả cấu hình', desc, 560, false)
        ]
      }
    ]
  };
}

// KHỐI 1 QRGW CHO PHÍ THANH TOÁN (KHÔNG CÓ TRƯỜNG MCC - 5 HÀNG)
function buildCommonInfoCardQrgwPaymentNoMcc({ partner = 'Vietcombank QRGW', service = 'Thu hộ QR (Pay-in)', channel = 'VCB-QR-PAYIN', desc = 'Cấu hình biểu phí thanh toán QRGW' }) {
  return {
    type: 'FRAME',
    name: 'Khối 1: Thông tin chung (QRGW Phí TT - Không MCC)',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 10, bottom: 10 },
    cornerRadius: 8,
    fill: TOKENS.white,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 6,
    children: [
      { type: 'TEXT', characters: 'Thông tin chung', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
      // Row 1
      {
        type: 'FRAME',
        name: 'Row 1',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Nguồn dữ liệu cấu hình *', 'QRGW', 560),
          buildField('Đối tác/ Ngân hàng hưởng phí *', partner, 560)
        ]
      },
      // Row 2
      {
        type: 'FRAME',
        name: 'Row 2',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Kỳ trả phí *', 'Theo tháng', 560),
          buildField('Thời gian áp dụng phí *', '01/01/2026 📅', 560, false)
        ]
      },
      // Row 3: Loại DV & Kênh kết nối
      {
        type: 'FRAME',
        name: 'Row 3',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Loại dịch vụ QRGW *', service, 560),
          buildField('Cổng / Kênh kết nối thanh toán *', channel, 560)
        ]
      },
      // Row 4: Loại GD & Trạng thái GD
      {
        type: 'FRAME',
        name: 'Row 4',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Loại giao dịch *', 'Thanh toán', 560),
          buildField('Trạng thái giao dịch *', 'Thành công', 560)
        ]
      },
      // Row 5: Tiền tệ, VAT & Mô tả
      {
        type: 'FRAME',
        name: 'Row 5',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Đơn vị tiền tệ *', 'VND', 270),
          buildField('Thuế VAT *', '8 %', 270, false),
          buildField('Mô tả cấu hình', desc, 560, false)
        ]
      }
    ]
  };
}

// 1. SCR-QR-CR-01: Phí XLGD QRGW - Áp dụng chung toàn bộ loại giao dịch
export function generateQrCr01() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-01: Thêm mới Phí XLGD QRGW (Áp dụng chung loại GD)',
    x: 8040,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebarQrgw(),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 960,
        fill: TOKENS.bodyBg,
        children: [
          buildTopbar(),
          {
            type: 'FRAME',
            name: 'Page Content Area',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { left: 24, right: 24, top: 10, bottom: 10 },
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'Breadcrumb Bar',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: 'Quản lý cấu hình phí trả đối tác  >  Thêm mới', fontSize: 13, fontWeight: 700, fill: TOKENS.ink }]
              },
              buildTwoTabs('XLGD'),
              buildCommonInfoCardQrgwXlgdNoMcc({
                partner: 'VietinBank QRGW',
                service: 'Thu hộ QR (Pay-in)',
                desc: 'Phí XLGD thu hộ QR cố định áp dụng chung toàn bộ loại giao dịch'
              }),
              // Khối 2: Thông tin phí
              {
                type: 'FRAME',
                name: 'Khối 2: Thông tin Phí xử lý giao dịch (Áp dụng chung)',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: { left: 16, right: 16, top: 10, bottom: 10 },
                cornerRadius: 8,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 8,
                children: [
                  { type: 'TEXT', characters: 'Thông tin Phí cho từng loại giao dịch', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
                  {
                    type: 'FRAME',
                    name: 'Header Control Row',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      {
                        type: 'FRAME',
                        name: 'Radio Group',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 20,
                        children: [
                          {
                            type: 'FRAME',
                            name: 'Radio: Áp dụng chung (Selected)',
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 6,
                            children: [
                              {
                                type: 'FRAME',
                                name: 'Outer Circle',
                                width: 14,
                                height: 14,
                                cornerRadius: 7,
                                fill: TOKENS.white,
                                stroke: TOKENS.bluePrimary,
                                strokeWeight: 2,
                                layoutMode: 'HORIZONTAL',
                                primaryAxisAlignItems: 'CENTER',
                                counterAxisAlignItems: 'CENTER',
                                children: [{ type: 'FRAME', name: 'Inner Dot', width: 6, height: 6, cornerRadius: 3, fill: TOKENS.bluePrimary }]
                              },
                              { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ loại giao dịch', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }
                            ]
                          },
                          {
                            type: 'FRAME',
                            name: 'Radio: Không áp dụng',
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 6,
                            children: [
                              {
                                type: 'FRAME',
                                name: 'Outer Circle',
                                width: 14,
                                height: 14,
                                cornerRadius: 7,
                                fill: TOKENS.white,
                                stroke: TOKENS.border,
                                strokeWeight: 1.5
                              },
                              { type: 'TEXT', characters: 'Không áp dụng', fontSize: 11, fill: TOKENS.inkSecondary }
                            ]
                          }
                        ]
                      },
                      {
                        type: 'FRAME',
                        name: 'Field: Chọn loại GD (Disabled)',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 8,
                        children: [
                          { type: 'TEXT', characters: 'Loại giao dịch *', fontSize: 11, fontWeight: 600, fill: TOKENS.inkLight },
                          {
                            type: 'FRAME',
                            name: 'Disabled Dropdown',
                            width: 220,
                            height: 28,
                            cornerRadius: 4,
                            fill: '#F1F5F9',
                            stroke: TOKENS.borderLight,
                            strokeWeight: 1,
                            padding: { left: 8, right: 8 },
                            layoutMode: 'HORIZONTAL',
                            primaryAxisAlignItems: 'SPACE_BETWEEN',
                            counterAxisAlignItems: 'CENTER',
                            children: [
                              { type: 'TEXT', characters: 'Chọn loại giao dịch', fontSize: 11, fill: TOKENS.inkLight },
                              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkLight }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Fee Inputs Row',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      buildField('Hình thức thu phí *', '1 bậc phí (Cố định)', 320),
                      buildField('Mức phí cố định (VND/GD) *', '500', 240, false, 'đ'),
                      buildField('Ghi chú điều kiện tính phí', 'Áp dụng cho mọi giao dịch QR Napas247 Pay-in', 560, false)
                    ]
                  }
                ]
              },
              buildFooterButtons()
            ]
          }
        ]
      }
    ]
  };
}

// 2. SCR-QR-CR-02: Phí XLGD QRGW - Tách theo từng loại giao dịch (Thanh toán & Hoàn trả)
export function generateQrCr02() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-02: Thêm mới Phí XLGD QRGW (Theo từng loại GD: Thanh toán, Hoàn trả)',
    x: 9580,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebarQrgw(),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 960,
        fill: TOKENS.bodyBg,
        children: [
          buildTopbar(),
          {
            type: 'FRAME',
            name: 'Page Content Area',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { left: 24, right: 24, top: 10, bottom: 10 },
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'Breadcrumb Bar',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: 'Quản lý cấu hình phí trả đối tác  >  Thêm mới', fontSize: 13, fontWeight: 700, fill: TOKENS.ink }]
              },
              buildTwoTabs('XLGD'),
              buildCommonInfoCardQrgwXlgdNoMcc({
                partner: 'MBBank QRGW',
                service: 'Thu hộ QR (Pay-in)',
                desc: 'Phí XLGD phân tách riêng cho Thanh toán và Hoàn trả'
              }),
              // Khối 2: Tách loại giao dịch
              {
                type: 'FRAME',
                name: 'Khối 2: Thông tin Phí cho từng loại giao dịch (Tách Loại GD)',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: { left: 16, right: 16, top: 8, bottom: 8 },
                cornerRadius: 8,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 6,
                children: [
                  { type: 'TEXT', characters: 'Thông tin Phí cho từng loại giao dịch', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
                  {
                    type: 'FRAME',
                    name: 'Header Control Row',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      {
                        type: 'FRAME',
                        name: 'Radio Group',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 20,
                        children: [
                          {
                            type: 'FRAME',
                            name: 'Radio: Áp dụng chung',
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 6,
                            children: [
                              { type: 'FRAME', name: 'Circle', width: 14, height: 14, cornerRadius: 7, fill: TOKENS.white, stroke: TOKENS.border, strokeWeight: 1.5 },
                              { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ loại giao dịch', fontSize: 11, fill: TOKENS.inkSecondary }
                            ]
                          },
                          {
                            type: 'FRAME',
                            name: 'Radio: Không áp dụng (Selected)',
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 6,
                            children: [
                              {
                                type: 'FRAME',
                                name: 'Circle',
                                width: 14,
                                height: 14,
                                cornerRadius: 7,
                                fill: TOKENS.white,
                                stroke: TOKENS.bluePrimary,
                                strokeWeight: 2,
                                layoutMode: 'HORIZONTAL',
                                primaryAxisAlignItems: 'CENTER',
                                counterAxisAlignItems: 'CENTER',
                                children: [{ type: 'FRAME', name: 'Dot', width: 6, height: 6, cornerRadius: 3, fill: TOKENS.bluePrimary }]
                              },
                              { type: 'TEXT', characters: 'Không áp dụng', fontSize: 11, fontWeight: 700, fill: TOKENS.ink }
                            ]
                          }
                        ]
                      },
                      {
                        type: 'FRAME',
                        name: 'Field: Chọn loại GD (Active)',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 8,
                        children: [
                          { type: 'TEXT', characters: 'Loại giao dịch *', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
                          {
                            type: 'FRAME',
                            name: 'Active Dropdown',
                            width: 220,
                            height: 28,
                            cornerRadius: 4,
                            fill: TOKENS.white,
                            stroke: TOKENS.bluePrimary,
                            strokeWeight: 1,
                            padding: { left: 8, right: 8 },
                            layoutMode: 'HORIZONTAL',
                            primaryAxisAlignItems: 'SPACE_BETWEEN',
                            counterAxisAlignItems: 'CENTER',
                            children: [
                              { type: 'TEXT', characters: 'Thanh toán, hoàn trả', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary },
                              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.bluePrimary }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  // Sub-card 1: Thanh toán
                  {
                    type: 'FRAME',
                    name: 'Sub-card: Loại giao dịch: Thanh toán',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: '#F8FAFC',
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    itemSpacing: 4,
                    children: [
                      { type: 'TEXT', characters: 'Loại giao dịch: Thanh toán', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
                      {
                        type: 'FRAME',
                        name: 'Row Inputs',
                        layoutAlign: 'STRETCH',
                        layoutMode: 'HORIZONTAL',
                        itemSpacing: 24,
                        counterAxisAlignItems: 'CENTER',
                        children: [
                          buildField('Hình thức thu phí *', '1 bậc phí', 320),
                          buildField('Mức phí *', '500', 240, false, 'đ')
                        ]
                      }
                    ]
                  },
                  // Sub-card 2: Hoàn trả (CÓ TRƯỜNG CÁCH TÍNH NGÀY ÁP DỤNG PHÍ)
                  {
                    type: 'FRAME',
                    name: 'Sub-card: Loại giao dịch: Hoàn trả',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: '#F8FAFC',
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    itemSpacing: 4,
                    children: [
                      { type: 'TEXT', characters: 'Loại giao dịch: Hoàn trả', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
                      {
                        type: 'FRAME',
                        name: 'Row Inputs',
                        layoutAlign: 'STRETCH',
                        layoutMode: 'HORIZONTAL',
                        itemSpacing: 20,
                        counterAxisAlignItems: 'CENTER',
                        children: [
                          buildField('Hình thức thu phí *', '1 bậc phí', 240),
                          buildField('Mức phí *', '800', 180, false, 'đ'),
                          buildField('Cách tính ngày áp dụng phí trên giao dịch *', 'Ngày phát sinh giao dịch gốc', 380)
                        ]
                      }
                    ]
                  }
                ]
              },
              buildFooterButtons()
            ]
          }
        ]
      }
    ]
  };
}

// 3. SCR-QR-CR-03: Phí Thanh toán QRGW - Áp dụng chung toàn bộ loại giao dịch
export function generateQrCr03() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-03: Thêm mới Phí Thanh toán QRGW (Áp dụng chung loại GD)',
    x: 11120,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebarQrgw(),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 960,
        fill: TOKENS.bodyBg,
        children: [
          buildTopbar(),
          {
            type: 'FRAME',
            name: 'Page Content Area',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { left: 24, right: 24, top: 10, bottom: 10 },
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'Breadcrumb Bar',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: 'Quản lý cấu hình phí trả đối tác  >  Thêm mới', fontSize: 13, fontWeight: 700, fill: TOKENS.ink }]
              },
              buildTwoTabs('TT'),
              buildCommonInfoCardQrgwPaymentNoMcc({
                partner: 'Vietcombank QRGW',
                service: 'Thu hộ QR (Pay-in)',
                channel: 'VCB-QR-PAYIN',
                desc: 'Phí thanh toán Thu hộ QR áp dụng chung cho toàn bộ loại giao dịch'
              }),
              // Khối 2: Thông tin phí thanh toán (Áp dụng chung)
              {
                type: 'FRAME',
                name: 'Khối 2: Thông tin Phí thanh toán (Áp dụng chung)',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: { left: 16, right: 16, top: 10, bottom: 10 },
                cornerRadius: 8,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 8,
                children: [
                  { type: 'TEXT', characters: 'Thông tin Phí thanh toán', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
                  {
                    type: 'FRAME',
                    name: 'Header Control Row',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      {
                        type: 'FRAME',
                        name: 'Radio Group',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 20,
                        children: [
                          {
                            type: 'FRAME',
                            name: 'Radio: Áp dụng chung (Selected)',
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 6,
                            children: [
                              {
                                type: 'FRAME',
                                name: 'Outer Circle',
                                width: 14,
                                height: 14,
                                cornerRadius: 7,
                                fill: TOKENS.white,
                                stroke: TOKENS.bluePrimary,
                                strokeWeight: 2,
                                layoutMode: 'HORIZONTAL',
                                primaryAxisAlignItems: 'CENTER',
                                counterAxisAlignItems: 'CENTER',
                                children: [{ type: 'FRAME', name: 'Inner Dot', width: 6, height: 6, cornerRadius: 3, fill: TOKENS.bluePrimary }]
                              },
                              { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ loại giao dịch', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }
                            ]
                          },
                          {
                            type: 'FRAME',
                            name: 'Radio: Không áp dụng',
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 6,
                            children: [
                              {
                                type: 'FRAME',
                                name: 'Outer Circle',
                                width: 14,
                                height: 14,
                                cornerRadius: 7,
                                fill: TOKENS.white,
                                stroke: TOKENS.border,
                                strokeWeight: 1.5
                              },
                              { type: 'TEXT', characters: 'Không áp dụng', fontSize: 11, fill: TOKENS.inkSecondary }
                            ]
                          }
                        ]
                      },
                      {
                        type: 'FRAME',
                        name: 'Field: Chọn loại GD (Disabled)',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 8,
                        children: [
                          { type: 'TEXT', characters: 'Loại giao dịch *', fontSize: 11, fontWeight: 600, fill: TOKENS.inkLight },
                          {
                            type: 'FRAME',
                            name: 'Disabled Dropdown',
                            width: 220,
                            height: 28,
                            cornerRadius: 4,
                            fill: '#F1F5F9',
                            stroke: TOKENS.borderLight,
                            strokeWeight: 1,
                            padding: { left: 8, right: 8 },
                            layoutMode: 'HORIZONTAL',
                            primaryAxisAlignItems: 'SPACE_BETWEEN',
                            counterAxisAlignItems: 'CENTER',
                            children: [
                              { type: 'TEXT', characters: 'Chọn loại giao dịch', fontSize: 11, fill: TOKENS.inkLight },
                              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkLight }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Fee Inputs Row',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      buildField('Hình thức thu phí *', 'Theo GTGD (% Tỷ lệ có Min/Max)', 300),
                      buildField('Mức phí tỷ lệ (%) *', '0.65', 220, false, '%'),
                      buildField('Mức phí tối thiểu (Min)', '1.500', 220, false, 'đ'),
                      buildField('Mức phí tối đa (Max)', '30.000', 220, false, 'đ')
                    ]
                  }
                ]
              },
              buildFooterButtons()
            ]
          }
        ]
      }
    ]
  };
}

// 4. SCR-QR-CR-04: Phí Thanh toán QRGW - Tách theo từng loại giao dịch (Thanh toán & Hoàn trả)
export function generateQrCr04() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-04: Thêm mới Phí Thanh toán QRGW (Theo từng loại GD: Thanh toán, Hoàn trả)',
    x: 12660,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebarQrgw(),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 960,
        fill: TOKENS.bodyBg,
        children: [
          buildTopbar(),
          {
            type: 'FRAME',
            name: 'Page Content Area',
            layoutMode: 'VERTICAL',
            layoutAlign: 'STRETCH',
            padding: { left: 24, right: 24, top: 10, bottom: 10 },
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'Breadcrumb Bar',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: 'Quản lý cấu hình phí trả đối tác  >  Thêm mới', fontSize: 13, fontWeight: 700, fill: TOKENS.ink }]
              },
              buildTwoTabs('TT'),
              buildCommonInfoCardQrgwPaymentNoMcc({
                partner: 'BIDV QRGW',
                service: 'Thu hộ QR (Pay-in)',
                channel: 'BIDV-QR-PAYIN',
                desc: 'Phí thanh toán QRGW phân tách riêng cho Thanh toán và Hoàn trả'
              }),
              // Khối 2: Tách loại giao dịch
              {
                type: 'FRAME',
                name: 'Khối 2: Thông tin Phí cho từng loại giao dịch (Tách Loại GD)',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: { left: 16, right: 16, top: 8, bottom: 8 },
                cornerRadius: 8,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 6,
                children: [
                  { type: 'TEXT', characters: 'Thông tin Phí cho từng loại giao dịch', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
                  {
                    type: 'FRAME',
                    name: 'Header Control Row',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      {
                        type: 'FRAME',
                        name: 'Radio Group',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 20,
                        children: [
                          {
                            type: 'FRAME',
                            name: 'Radio: Áp dụng chung',
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 6,
                            children: [
                              { type: 'FRAME', name: 'Circle', width: 14, height: 14, cornerRadius: 7, fill: TOKENS.white, stroke: TOKENS.border, strokeWeight: 1.5 },
                              { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ loại giao dịch', fontSize: 11, fill: TOKENS.inkSecondary }
                            ]
                          },
                          {
                            type: 'FRAME',
                            name: 'Radio: Không áp dụng (Selected)',
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            itemSpacing: 6,
                            children: [
                              {
                                type: 'FRAME',
                                name: 'Circle',
                                width: 14,
                                height: 14,
                                cornerRadius: 7,
                                fill: TOKENS.white,
                                stroke: TOKENS.bluePrimary,
                                strokeWeight: 2,
                                layoutMode: 'HORIZONTAL',
                                primaryAxisAlignItems: 'CENTER',
                                counterAxisAlignItems: 'CENTER',
                                children: [{ type: 'FRAME', name: 'Dot', width: 6, height: 6, cornerRadius: 3, fill: TOKENS.bluePrimary }]
                              },
                              { type: 'TEXT', characters: 'Không áp dụng', fontSize: 11, fontWeight: 700, fill: TOKENS.ink }
                            ]
                          }
                        ]
                      },
                      {
                        type: 'FRAME',
                        name: 'Field: Chọn loại GD (Active)',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 8,
                        children: [
                          { type: 'TEXT', characters: 'Loại giao dịch *', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
                          {
                            type: 'FRAME',
                            name: 'Active Dropdown',
                            width: 220,
                            height: 28,
                            cornerRadius: 4,
                            fill: TOKENS.white,
                            stroke: TOKENS.bluePrimary,
                            strokeWeight: 1,
                            padding: { left: 8, right: 8 },
                            layoutMode: 'HORIZONTAL',
                            primaryAxisAlignItems: 'SPACE_BETWEEN',
                            counterAxisAlignItems: 'CENTER',
                            children: [
                              { type: 'TEXT', characters: 'Thanh toán, hoàn trả', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary },
                              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.bluePrimary }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  // Sub-card 1: Thanh toán
                  {
                    type: 'FRAME',
                    name: 'Sub-card: Loại giao dịch: Thanh toán',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: '#F8FAFC',
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    itemSpacing: 4,
                    children: [
                      { type: 'TEXT', characters: 'Loại giao dịch: Thanh toán', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
                      {
                        type: 'FRAME',
                        name: 'Row Inputs',
                        layoutAlign: 'STRETCH',
                        layoutMode: 'HORIZONTAL',
                        itemSpacing: 16,
                        counterAxisAlignItems: 'CENTER',
                        children: [
                          buildField('Hình thức thu phí *', 'Theo GTGD (% Tỷ lệ có Min/Max)', 300),
                          buildField('Mức phí tỷ lệ (%) *', '0.65', 220, false, '%'),
                          buildField('Mức phí tối thiểu (Min)', '1.500', 220, false, 'đ'),
                          buildField('Mức phí tối đa (Max)', '30.000', 220, false, 'đ')
                        ]
                      }
                    ]
                  },
                  // Sub-card 2: Hoàn trả (CÓ TRƯỜNG CÁCH TÍNH NGÀY ÁP DỤNG PHÍ)
                  {
                    type: 'FRAME',
                    name: 'Sub-card: Loại giao dịch: Hoàn trả',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: '#F8FAFC',
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    itemSpacing: 4,
                    children: [
                      { type: 'TEXT', characters: 'Loại giao dịch: Hoàn trả', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
                      {
                        type: 'FRAME',
                        name: 'Row Inputs',
                        layoutAlign: 'STRETCH',
                        layoutMode: 'HORIZONTAL',
                        itemSpacing: 20,
                        counterAxisAlignItems: 'CENTER',
                        children: [
                          buildField('Hình thức thu phí *', '1 bậc phí (Cố định theo GD)', 240),
                          buildField('Mức phí cố định *', '1.000', 180, false, 'đ'),
                          buildField('Cách tính ngày áp dụng phí trên giao dịch *', 'Ngày phát sinh giao dịch gốc', 380)
                        ]
                      }
                    ]
                  }
                ]
              },
              buildFooterButtons()
            ]
          }
        ]
      }
    ]
  };
}

// Generate & save files
const specs = [
  { name: 'scripts/scr-qr-cr-01-2tabs.min.json', data: generateQrCr01() },
  { name: 'scripts/scr-qr-cr-02-2tabs.min.json', data: generateQrCr02() },
  { name: 'scripts/scr-qr-cr-03-2tabs.min.json', data: generateQrCr03() },
  { name: 'scripts/scr-qr-cr-04-2tabs.min.json', data: generateQrCr04() }
];

for (const s of specs) {
  fs.writeFileSync(s.name, JSON.stringify(s.data));
  console.log(`Saved ${s.name} (${JSON.stringify(s.data).length} bytes)`);
}
