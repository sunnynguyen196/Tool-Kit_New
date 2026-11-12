import fs from 'node:fs';

const TOKENS = {
  headerBg: '#74B4F7',
  bluePrimary: '#2563EB',
  blueDark: '#1E40AF',
  blueLight: '#EFF6FF',
  blueBorder: '#BFDBFE',
  white: '#FFFFFF',
  bodyBg: '#F8FAFC',
  cardBg: '#FFFFFF',
  border: '#CBD5E1',
  borderLight: '#E2E8F0',
  ink: '#1E293B',
  inkSecondary: '#475569',
  inkMuted: '#64748B',
  inkLight: '#94A3B8',
  tagBlueBg: '#DBEAFE',
  tagBlueText: '#1E40AF',
  red: '#DC2626'
};

function buildSidebar() {
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
                fill: TOKENS.tagBlueBg,
                children: [
                  { type: 'TEXT', characters: '• Phí đối tác CTT', fontSize: 12, fontWeight: 700, fill: TOKENS.bluePrimary }
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
                fill: '#00000000',
                children: [
                  { type: 'TEXT', characters: '• Phí đối tác QRGW', fontSize: 12, fontWeight: 400, fill: TOKENS.inkSecondary }
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
          { type: 'TEXT', characters: '⚙️', fontSize: 14, fill: TOKENS.white },
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
                fill: TOKENS.red,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: 'L', fontSize: 12, fontWeight: 700, fill: TOKENS.white }]
              },
              { type: 'TEXT', characters: 'Lisa ▾', fontSize: 12, fontWeight: 500, fill: TOKENS.white }
            ]
          }
        ]
      }
    ]
  };
}

function buildPillTabs() {
  return {
    type: 'FRAME',
    name: 'Fee Category Pills',
    layoutMode: 'HORIZONTAL',
    itemSpacing: 10,
    counterAxisAlignItems: 'CENTER',
    children: [
      {
        type: 'FRAME',
        name: 'Pill: Phí duy trì',
        height: 32,
        padding: { left: 14, right: 14 },
        cornerRadius: 6,
        fill: TOKENS.blueLight,
        stroke: TOKENS.blueBorder,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        children: [{ type: 'TEXT', characters: 'Phí duy trì sử dụng dịch vụ', fontSize: 11, fontWeight: 500, fill: TOKENS.bluePrimary }]
      },
      {
        type: 'FRAME',
        name: 'Pill: Phí XLGD',
        height: 32,
        padding: { left: 14, right: 14 },
        cornerRadius: 6,
        fill: TOKENS.blueLight,
        stroke: TOKENS.blueBorder,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        children: [{ type: 'TEXT', characters: 'Phí xử lý giao dịch', fontSize: 11, fontWeight: 500, fill: TOKENS.bluePrimary }]
      },
      {
        type: 'FRAME',
        name: 'Pill: Phí thanh toán (Active)',
        height: 32,
        padding: { left: 16, right: 16 },
        cornerRadius: 6,
        fill: TOKENS.bluePrimary,
        stroke: TOKENS.bluePrimary,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        children: [{ type: 'TEXT', characters: 'Phí thanh toán', fontSize: 11, fontWeight: 700, fill: TOKENS.white }]
      },
      {
        type: 'FRAME',
        name: 'Pill: Phí gia tăng',
        height: 32,
        padding: { left: 14, right: 14 },
        cornerRadius: 6,
        fill: TOKENS.blueLight,
        stroke: TOKENS.blueBorder,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        children: [{ type: 'TEXT', characters: 'Phí quản lý dịch vụ gia tăng', fontSize: 11, fontWeight: 500, fill: TOKENS.bluePrimary }]
      }
    ]
  };
}

function buildField(label, value, width = 560, hasArrow = true, unit = null) {
  return {
    type: 'FRAME',
    name: `Field: ${label}`,
    width,
    layoutMode: 'VERTICAL',
    itemSpacing: 4,
    children: [
      { type: 'TEXT', characters: label, fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
      {
        type: 'FRAME',
        name: 'Input Box',
        height: 34,
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 10, right: 10 },
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.border,
        strokeWeight: 1,
        children: [
          { type: 'TEXT', characters: value, fontSize: 11, fill: TOKENS.ink },
          ...(hasArrow ? [{ type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }] : []),
          ...(unit ? [{ type: 'TEXT', characters: unit, fontSize: 11, fill: TOKENS.inkSecondary }] : [])
        ]
      }
    ]
  };
}

function buildDualListBox(selectedMCCs = ['4784', '5411', '4900', '5732']) {
  const sourceMCCs = [
    { code: '4784', desc: '4784 - Thu phí cầu đường cao tốc', checked: false },
    { code: '5411', desc: '5411 - Tạp hóa, siêu thị, cửa hàng tiện lợi', checked: false },
    { code: '4900', desc: '4900 - Dịch vụ tiện ích - điện, ga, nước, vệ sinh', checked: true },
    { code: '5732', desc: '5732 - Cửa hàng đồ điện', checked: false },
    { code: '5814', desc: '5814 - Cửa hàng bán đồ ăn nhanh', checked: false },
    { code: '6300', desc: '6300 - Dịch vụ bảo hiểm', checked: false }
  ];

  return {
    type: 'FRAME',
    name: 'Field: Merchant Category Code (MCC) *',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    itemSpacing: 4,
    children: [
      { type: 'TEXT', characters: 'Merchant Category Code (MCC) *', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
      {
        type: 'FRAME',
        name: 'Dual ListBox Container',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 10,
        children: [
          // Left Box
          {
            type: 'FRAME',
            name: 'Available MCC Box',
            width: 320,
            height: 96,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            padding: 6,
            layoutMode: 'VERTICAL',
            itemSpacing: 3,
            children: sourceMCCs.slice(0, 5).map(m => ({
              type: 'FRAME',
              name: `MCC Item ${m.code}`,
              layoutMode: 'HORIZONTAL',
              counterAxisAlignItems: 'CENTER',
              itemSpacing: 6,
              children: [
                {
                  type: 'FRAME',
                  name: 'Checkbox Box',
                  width: 12,
                  height: 12,
                  cornerRadius: 2,
                  fill: m.checked ? TOKENS.bluePrimary : TOKENS.white,
                  stroke: m.checked ? TOKENS.bluePrimary : TOKENS.border,
                  strokeWeight: 1,
                  layoutMode: 'HORIZONTAL',
                  primaryAxisAlignItems: 'CENTER',
                  counterAxisAlignItems: 'CENTER',
                  children: m.checked ? [{ type: 'TEXT', characters: '✓', fontSize: 8, fill: TOKENS.white }] : []
                },
                { type: 'TEXT', characters: m.desc, fontSize: 10, fill: m.checked ? TOKENS.ink : TOKENS.inkSecondary, fontWeight: m.checked ? 600 : 400 }
              ]
            }))
          },
          // Middle Transfer Buttons
          {
            type: 'FRAME',
            name: 'Transfer Action Buttons',
            layoutMode: 'VERTICAL',
            itemSpacing: 6,
            children: [
              {
                type: 'FRAME',
                name: 'Btn Transfer Right',
                width: 26,
                height: 26,
                cornerRadius: 4,
                fill: TOKENS.blueLight,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: '>', fontSize: 11, fontWeight: 700, fill: TOKENS.bluePrimary }]
              },
              {
                type: 'FRAME',
                name: 'Btn Transfer Left',
                width: 26,
                height: 26,
                cornerRadius: 4,
                fill: TOKENS.blueLight,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: '<', fontSize: 11, fontWeight: 700, fill: TOKENS.bluePrimary }]
              }
            ]
          },
          // Right Box (Selected)
          {
            type: 'FRAME',
            name: 'Selected MCC Box',
            width: 320,
            height: 96,
            cornerRadius: 4,
            fill: '#F8FAFC',
            stroke: TOKENS.border,
            strokeWeight: 1,
            padding: 6,
            layoutMode: 'VERTICAL',
            itemSpacing: 3,
            children: [
              { type: 'TEXT', characters: '• 4784 - Thu phí cầu đường cao tốc', fontSize: 10, fill: TOKENS.ink },
              { type: 'TEXT', characters: '• 5411 - Tạp hóa, siêu thị, cửa hàng tiện lợi', fontSize: 10, fill: TOKENS.ink },
              { type: 'TEXT', characters: '• 4900 - Dịch vụ tiện ích - điện, ga, nước, vệ sinh', fontSize: 10, fill: TOKENS.ink },
              { type: 'TEXT', characters: '• 5732 - Cửa hàng đồ điện', fontSize: 10, fill: TOKENS.ink }
            ]
          }
        ]
      }
    ]
  };
}

function buildCommonInfoCard({ partner = 'KBank', method = 'Thẻ quốc tế', gateway = 'CYBS/KBANK', origin = 'NHPH trong nước', currency = 'VND', desc = 'Cấu hình biểu phí thanh toán' }) {
  return {
    type: 'FRAME',
    name: 'Khối 1: Thông tin chung',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 12, bottom: 12 },
    cornerRadius: 8,
    fill: TOKENS.white,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 8,
    children: [
      { type: 'TEXT', characters: 'Thông tin chung', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
      // Row 1
      {
        type: 'FRAME',
        name: 'Row 1: Nguồn dữ liệu & Đối tác',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Nguồn dữ liệu cấu hình *', 'CTT', 560),
          buildField('Đối tác/ Ngân hàng hưởng phí *', partner, 560)
        ]
      },
      // Row 2
      {
        type: 'FRAME',
        name: 'Row 2: Kỳ trả phí & Thời gian áp dụng',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Kỳ trả phí *', 'Theo tháng', 560),
          buildField('Thời gian áp dụng phí *', '01/01/2026 📅', 560, false)
        ]
      },
      // Row 3: MCC Dual Listbox
      buildDualListBox(),
      // Row 4: Loại GD & Trạng thái GD
      {
        type: 'FRAME',
        name: 'Row 4: Loại GD & Trạng thái GD',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Loại giao dịch *', 'Thanh toán', 560),
          buildField('Trạng thái giao dịch *', 'Thành công', 560)
        ]
      },
      // Row 5: PTTT & Cổng TGTT
      {
        type: 'FRAME',
        name: 'Row 5: PTTT & Cổng TGTT',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Phương thức thanh toán *', method, 560),
          buildField('Cổng trung gian thanh toán *', gateway, 560)
        ]
      },
      // Row 6: Loại NH phát hành & Thuế VAT
      {
        type: 'FRAME',
        name: 'Row 6: NH Phát hành & Thuế VAT',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Loại ngân hàng phát hành *', origin, 560),
          buildField('Thuế VAT *', '8', 560, false, '%')
        ]
      },
      // Row 7: Đơn vị tiền tệ & Mô tả
      {
        type: 'FRAME',
        name: 'Row 7: Tiền tệ & Mô tả',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Đơn vị tiền tệ *', currency, 560),
          buildField('Mô tả', desc, 560, false)
        ]
      }
    ]
  };
}

function buildFooterButtons() {
  return {
    type: 'FRAME',
    name: 'Footer Action Buttons',
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    itemSpacing: 14,
    padding: { top: 6, bottom: 6 },
    children: [
      {
        type: 'FRAME',
        name: 'Btn: Hủy',
        width: 80,
        height: 34,
        cornerRadius: 6,
        fill: TOKENS.white,
        stroke: TOKENS.border,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        children: [{ type: 'TEXT', characters: 'Hủy', fontSize: 11, fontWeight: 500, fill: TOKENS.ink }]
      },
      {
        type: 'FRAME',
        name: 'Btn: Tính thử',
        width: 100,
        height: 34,
        cornerRadius: 6,
        fill: TOKENS.white,
        stroke: TOKENS.bluePrimary,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        children: [{ type: 'TEXT', characters: 'Tính thử 🧮', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary }]
      },
      {
        type: 'FRAME',
        name: 'Btn: Lưu nháp',
        width: 90,
        height: 34,
        cornerRadius: 6,
        fill: TOKENS.ink,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        children: [{ type: 'TEXT', characters: 'Lưu nháp', fontSize: 11, fontWeight: 600, fill: TOKENS.white }]
      },
      {
        type: 'FRAME',
        name: 'Btn: Tạo mới',
        width: 100,
        height: 34,
        cornerRadius: 6,
        fill: TOKENS.bluePrimary,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        children: [{ type: 'TEXT', characters: 'Tạo mới +', fontSize: 11, fontWeight: 700, fill: TOKENS.white }]
      }
    ]
  };
}

// SCREEN 1: SCR-CTT-CR-03: Thêm mới Phí Thanh toán CTT - Thẻ nội địa
export function generateCttCr03() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-03: Thêm mới Phí Thanh toán CTT - Thẻ nội địa',
    x: 3080,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar(),
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
            padding: { left: 24, right: 24, top: 12, bottom: 12 },
            itemSpacing: 10,
            children: [
              buildPillTabs(),
              buildCommonInfoCard({
                partner: 'Napas Direct / BIDV',
                method: 'Thẻ nội địa & Tài khoản ngân hàng',
                gateway: 'Napas Gateway Switch',
                origin: 'Trong nước',
                currency: 'VND',
                desc: 'Biểu phí thanh toán thẻ ATM & tài khoản ngân hàng nội địa 2026'
              }),
              // Khối 2: Thông tin phí thanh toán thẻ nội địa
              {
                type: 'FRAME',
                name: 'Khối 2: Thông tin phí thanh toán',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: { left: 16, right: 16, top: 10, bottom: 10 },
                cornerRadius: 8,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 8,
                children: [
                  { type: 'TEXT', characters: 'Thông tin phí thanh toán', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
                  {
                    type: 'FRAME',
                    name: 'Row Fee Config',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      buildField('Hình thức thu phí *', '1 bậc phí', 280),
                      buildField('Mức phí tỷ lệ (%) *', '0.85', 180, false, '%'),
                      buildField('Mức phí tối thiểu (Min)', '2.000', 200, false, 'VNĐ'),
                      buildField('Mức phí tối đa (Max)', '50.000', 200, false, 'VNĐ')
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

// SCREEN 2: SCR-CTT-CR-04A: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Áp dụng chung)
export function generateCttCr04A() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-04A: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Áp dụng chung)',
    x: 4620,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar(),
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
            padding: { left: 24, right: 24, top: 12, bottom: 12 },
            itemSpacing: 10,
            children: [
              buildPillTabs(),
              buildCommonInfoCard({
                partner: 'KBank',
                method: 'Thẻ quốc tế',
                gateway: 'CYBS/KBANK',
                origin: 'NHPH trong nước',
                currency: 'VND',
                desc: 'Biểu phí thanh toán thẻ quốc tế áp dụng toàn bộ thương hiệu thẻ'
              }),
              // Khối 2: Thông tin Phí cho từng thương hiệu thẻ (Biến thể Áp dụng chung)
              {
                type: 'FRAME',
                name: 'Khối 2: Thông tin Phí cho từng thương hiệu thẻ (Áp dụng chung)',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: { left: 16, right: 16, top: 10, bottom: 10 },
                cornerRadius: 8,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 8,
                children: [
                  { type: 'TEXT', characters: 'Thông tin Phí cho từng thương hiệu thẻ', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
                  // Radio row
                  {
                    type: 'FRAME',
                    name: 'Radio Group Brand Choice',
                    layoutMode: 'HORIZONTAL',
                    counterAxisAlignItems: 'CENTER',
                    itemSpacing: 24,
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
                          { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ thương hiệu thẻ', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }
                        ]
                      },
                      {
                        type: 'FRAME',
                        name: 'Radio: Không áp dụng (Unselected)',
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
                          { type: 'TEXT', characters: 'Không áp dụng', fontSize: 11, fontWeight: 400, fill: TOKENS.inkSecondary }
                        ]
                      }
                    ]
                  },
                  // Fields
                  {
                    type: 'FRAME',
                    name: 'Row Fee Inputs',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      buildField('Hình thức thu phí *', '1 bậc phí', 280),
                      buildField('Mức phí tỷ lệ (%) *', '1.6', 180, false, '%'),
                      buildField('Mức phí tối thiểu (Min)', '3.000', 200, false, 'VNĐ'),
                      buildField('Mức phí tối đa (Max)', '60.000', 200, false, 'VNĐ')
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

// SCREEN 3: SCR-CTT-CR-04B: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Tách theo thương hiệu thẻ)
export function generateCttCr04B() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-04B: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Theo thương hiệu thẻ)',
    x: 6160,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar(),
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
              buildPillTabs(),
              buildCommonInfoCard({
                partner: 'KBank',
                method: 'Thẻ quốc tế',
                gateway: 'CYBS/KBANK',
                origin: 'NHPH trong nước',
                currency: 'VND',
                desc: 'Biểu phí thanh toán thẻ quốc tế phân tách theo thương hiệu Visa, Master, JCB'
              }),
              // Khối 2: Thông tin Phí cho từng thương hiệu thẻ (Biến thể Tách thương hiệu)
              {
                type: 'FRAME',
                name: 'Khối 2: Thông tin Phí cho từng thương hiệu thẻ (Tách Brand)',
                layoutAlign: 'STRETCH',
                layoutMode: 'VERTICAL',
                padding: { left: 16, right: 16, top: 8, bottom: 8 },
                cornerRadius: 8,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                itemSpacing: 6,
                children: [
                  { type: 'TEXT', characters: 'Thông tin Phí cho từng thương hiệu thẻ', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
                  // Top Radio & Multi-select Dropdown Row
                  {
                    type: 'FRAME',
                    name: 'Row Radio & Brand Dropdown',
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
                              { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ thương hiệu thẻ', fontSize: 11, fill: TOKENS.inkSecondary }
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
                              { type: 'TEXT', characters: 'Không áp dụng', fontSize: 11, fontWeight: 700, fill: TOKENS.ink }
                            ]
                          }
                        ]
                      },
                      // Dropdown Thương hiệu thẻ
                      {
                        type: 'FRAME',
                        name: 'Field: Thương hiệu thẻ *',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 8,
                        children: [
                          { type: 'TEXT', characters: 'Thương hiệu thẻ *', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
                          {
                            type: 'FRAME',
                            name: 'Dropdown Trigger',
                            width: 220,
                            height: 30,
                            cornerRadius: 4,
                            fill: TOKENS.white,
                            stroke: TOKENS.bluePrimary,
                            strokeWeight: 1,
                            padding: { left: 8, right: 8 },
                            layoutMode: 'HORIZONTAL',
                            primaryAxisAlignItems: 'SPACE_BETWEEN',
                            counterAxisAlignItems: 'CENTER',
                            children: [
                              { type: 'TEXT', characters: 'Visa, Master, JCB', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary },
                              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.bluePrimary }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  // Brand Sub-card 1: Visa
                  {
                    type: 'FRAME',
                    name: 'Brand Card: Visa',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: '#F8FAFC',
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    children: [
                      { type: 'TEXT', characters: 'Thương hiệu thẻ: Visa', fontSize: 11, fontWeight: 700, fill: TOKENS.ink, width: 180 },
                      buildField('Hình thức thu phí *', '1 bậc phí', 220),
                      buildField('Mức phí tỷ lệ (%) *', '0.74', 160, false, '%'),
                      buildField('Mức phí tối thiểu', '3.000', 160, false, 'đ'),
                      buildField('Mức phí tối đa', '50.000', 160, false, 'đ')
                    ]
                  },
                  // Brand Sub-card 2: MasterCard
                  {
                    type: 'FRAME',
                    name: 'Brand Card: MasterCard',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'SPACE_BETWEEN',
                    counterAxisAlignItems: 'CENTER',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: '#F8FAFC',
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    children: [
                      { type: 'TEXT', characters: 'Thương hiệu thẻ: MasterCard', fontSize: 11, fontWeight: 700, fill: TOKENS.ink, width: 180 },
                      buildField('Hình thức thu phí *', '1 bậc phí', 220),
                      buildField('Mức phí tỷ lệ (%) *', '0.82', 160, false, '%'),
                      buildField('Mức phí tối thiểu', '3.000', 160, false, 'đ'),
                      buildField('Mức phí tối đa', '50.000', 160, false, 'đ')
                    ]
                  },
                  // Brand Sub-card 3: JCB (Bậc thang Tổng GTGD)
                  {
                    type: 'FRAME',
                    name: 'Brand Card: JCB (Bậc thang)',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 6, bottom: 6 },
                    cornerRadius: 4,
                    fill: '#F8FAFC',
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    itemSpacing: 4,
                    children: [
                      {
                        type: 'FRAME',
                        name: 'JCB Header Row',
                        layoutAlign: 'STRETCH',
                        layoutMode: 'HORIZONTAL',
                        primaryAxisAlignItems: 'SPACE_BETWEEN',
                        counterAxisAlignItems: 'CENTER',
                        children: [
                          { type: 'TEXT', characters: 'Thương hiệu thẻ: JCB', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
                          buildField('Hình thức thu phí *', 'Bậc thang Tổng GTGD', 300)
                        ]
                      },
                      // Tier 1
                      {
                        type: 'FRAME',
                        name: 'Tier 1 Row',
                        layoutAlign: 'STRETCH',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 10,
                        children: [
                          { type: 'TEXT', characters: 'Mức phí bậc 1 *', fontSize: 10, fontWeight: 600, fill: TOKENS.ink, width: 100 },
                          buildField('Tổng SLGD/ Tổng GTGD', '0 - 500.000.000 đ', 260, false),
                          buildField('Mức phí tỷ lệ (%)', '0.74', 140, false, '%'),
                          buildField('Mức phí tối thiểu', '3.000', 140, false, 'đ'),
                          buildField('Mức phí tối đa', '50.000', 140, false, 'đ'),
                          {
                            type: 'FRAME',
                            name: 'Btn Add Tier',
                            width: 24,
                            height: 24,
                            cornerRadius: 4,
                            fill: TOKENS.blueLight,
                            stroke: TOKENS.bluePrimary,
                            strokeWeight: 1,
                            layoutMode: 'HORIZONTAL',
                            primaryAxisAlignItems: 'CENTER',
                            counterAxisAlignItems: 'CENTER',
                            children: [{ type: 'TEXT', characters: '+', fontSize: 14, fontWeight: 700, fill: TOKENS.bluePrimary }]
                          }
                        ]
                      },
                      // Tier 2
                      {
                        type: 'FRAME',
                        name: 'Tier 2 Row',
                        layoutAlign: 'STRETCH',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 10,
                        children: [
                          { type: 'TEXT', characters: 'Mức phí bậc 2 *', fontSize: 10, fontWeight: 600, fill: TOKENS.ink, width: 100 },
                          buildField('Tổng SLGD/ Tổng GTGD', '500.000.001 - 2.000.000.000 đ', 260, false),
                          buildField('Mức phí tỷ lệ (%)', '0.73', 140, false, '%'),
                          buildField('Mức phí tối thiểu', '2.500', 140, false, 'đ'),
                          buildField('Mức phí tối đa', '45.000', 140, false, 'đ'),
                          {
                            type: 'FRAME',
                            name: 'Btn Remove Tier',
                            width: 24,
                            height: 24,
                            cornerRadius: 4,
                            fill: '#FEE2E2',
                            stroke: TOKENS.red,
                            strokeWeight: 1,
                            layoutMode: 'HORIZONTAL',
                            primaryAxisAlignItems: 'CENTER',
                            counterAxisAlignItems: 'CENTER',
                            children: [{ type: 'TEXT', characters: '–', fontSize: 14, fontWeight: 700, fill: TOKENS.red }]
                          }
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

// Write specs to files
fs.writeFileSync('scripts/scr-ctt-cr-03-new.json', JSON.stringify(generateCttCr03(), null, 2), 'utf8');
fs.writeFileSync('scripts/scr-ctt-cr-04a.json', JSON.stringify(generateCttCr04A(), null, 2), 'utf8');
fs.writeFileSync('scripts/scr-ctt-cr-04b.json', JSON.stringify(generateCttCr04B(), null, 2), 'utf8');

console.log('✅ Generated 3 new CTT Payment Fee screen specs!');
