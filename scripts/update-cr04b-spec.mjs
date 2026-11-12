import fs from 'node:fs';

const TOKENS = {
  primary: '#0F172A',
  bodyBg: '#F1F5F9',
  white: '#FFFFFF',
  bluePrimary: '#2563EB',
  blueLight: '#EFF6FF',
  blueBorder: '#BFDBFE',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  ink: '#1E293B',
  inkMuted: '#64748B',
  inkLight: '#94A3B8',
  green: '#10B981',
  red: '#EF4444',
  tagBg: '#F3F4F6',
  cardBg: '#FFFFFF',
  brandCardBg: '#EFF6FF'
};

function buildSidebar() {
  return {
    type: 'FRAME',
    name: 'Sidebar Navigation',
    width: 230,
    height: 1000,
    fill: TOKENS.primary,
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 20, bottom: 20 },
    itemSpacing: 8,
    children: [
      {
        type: 'FRAME',
        name: 'Brand Logo Area',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 8,
        children: [
          {
            type: 'FRAME',
            name: 'Logo Icon',
            width: 28,
            height: 28,
            cornerRadius: 6,
            fill: TOKENS.bluePrimary,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: 'EP', fontSize: 13, fontWeight: 700, fill: TOKENS.white }]
          },
          { type: 'TEXT', characters: 'PARTNER PORTAL', fontSize: 13, fontWeight: 700, fill: TOKENS.white }
        ]
      },
      {
        type: 'FRAME',
        name: 'Menu Items',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        itemSpacing: 4,
        padding: { top: 16, bottom: 0, left: 0, right: 0 },
        children: [
          {
            type: 'FRAME',
            name: 'Menu: Dashboard',
            layoutAlign: 'STRETCH',
            height: 36,
            padding: { left: 12, right: 12 },
            cornerRadius: 6,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '📊  Dashboard', fontSize: 12, fill: TOKENS.inkLight }]
          },
          {
            type: 'FRAME',
            name: 'Menu: Partner Fee (Active)',
            layoutAlign: 'STRETCH',
            height: 36,
            padding: { left: 12, right: 12 },
            cornerRadius: 6,
            fill: TOKENS.bluePrimary,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '🏢  Cấu hình phí Đối tác', fontSize: 12, fontWeight: 600, fill: TOKENS.white }]
          },
          {
            type: 'FRAME',
            name: 'Menu: System Config',
            layoutAlign: 'STRETCH',
            height: 36,
            padding: { left: 12, right: 12 },
            cornerRadius: 6,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '⚙️  Cấu hình hệ thống', fontSize: 12, fill: TOKENS.inkLight }]
          }
        ]
      }
    ]
  };
}

function buildTopbar() {
  return {
    type: 'FRAME',
    name: 'Top Navigation Bar',
    layoutAlign: 'STRETCH',
    height: 48,
    fill: TOKENS.white,
    stroke: TOKENS.border,
    strokeWeight: 1,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 24, right: 24 },
    children: [
      {
        type: 'FRAME',
        name: 'Topbar Left',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 12,
        children: [
          { type: 'TEXT', characters: '⇇', fontSize: 16, fill: TOKENS.inkMuted },
          { type: 'TEXT', characters: 'Cấu hình biểu phí trả đối tác Cổng thanh toán', fontSize: 13, fontWeight: 600, fill: TOKENS.ink }
        ]
      },
      {
        type: 'FRAME',
        name: 'Topbar Right',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 12,
        children: [
          { type: 'TEXT', characters: '✦ Admin User', fontSize: 12, fontWeight: 500, fill: TOKENS.ink },
          {
            type: 'FRAME',
            name: 'Avatar',
            width: 28,
            height: 28,
            cornerRadius: 14,
            fill: TOKENS.bluePrimary,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: 'A', fontSize: 12, fontWeight: 700, fill: TOKENS.white }]
          }
        ]
      }
    ]
  };
}

function buildTwoTabs(activeTab = 'TT') {
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
        padding: { left: 16, right: 16, top: 6, bottom: 6 },
        cornerRadius: 4,
        fill: activeTab === 'XLGD' ? TOKENS.bluePrimary : TOKENS.white,
        stroke: activeTab === 'XLGD' ? TOKENS.bluePrimary : TOKENS.border,
        strokeWeight: 1,
        children: [{ type: 'TEXT', characters: 'Phí xử lý giao dịch', fontSize: 11, fontWeight: 600, fill: activeTab === 'XLGD' ? TOKENS.white : TOKENS.inkMuted }]
      },
      {
        type: 'FRAME',
        name: 'Tab Phí Thanh toán',
        padding: { left: 16, right: 16, top: 6, bottom: 6 },
        cornerRadius: 4,
        fill: activeTab === 'TT' ? TOKENS.bluePrimary : TOKENS.white,
        stroke: activeTab === 'TT' ? TOKENS.bluePrimary : TOKENS.border,
        strokeWeight: 1,
        children: [{ type: 'TEXT', characters: 'Phí thanh toán', fontSize: 11, fontWeight: 600, fill: activeTab === 'TT' ? TOKENS.white : TOKENS.inkMuted }]
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
    itemSpacing: 2,
    children: [
      { type: 'TEXT', characters: label, fontSize: 10, fontWeight: 600, fill: TOKENS.ink },
      {
        type: 'FRAME',
        name: 'Input Box',
        layoutAlign: 'STRETCH',
        height: 24,
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.border,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 8, right: 8 },
        children: [
          { type: 'TEXT', characters: val, fontSize: 10, fill: TOKENS.ink },
          ...(suffix ? [{ type: 'TEXT', characters: suffix, fontSize: 10, fill: TOKENS.inkMuted }] : []),
          ...(isDropdown ? [{ type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }] : [])
        ]
      }
    ]
  };
}

function buildDualListBox() {
  return {
    type: 'FRAME',
    name: 'MCC Dual Listbox Row',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    itemSpacing: 2,
    children: [
      { type: 'TEXT', characters: 'Merchant Category Code (MCC) *', fontSize: 10, fontWeight: 600, fill: TOKENS.ink },
      {
        type: 'FRAME',
        name: 'Dual List Container',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 8,
        children: [
          {
            type: 'FRAME',
            name: 'Available MCC Box',
            width: 530,
            height: 38,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            padding: { left: 8, right: 8, top: 4, bottom: 4 },
            layoutMode: 'VERTICAL',
            children: [
              { type: 'TEXT', characters: 'Danh sách MCC khả dụng:', fontSize: 9, fill: TOKENS.inkLight },
              { type: 'TEXT', characters: '4111 - Transportation, 4722 - Travel', fontSize: 9, fill: TOKENS.ink }
            ]
          },
          {
            type: 'FRAME',
            name: 'Transfer Controls',
            width: 50,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            itemSpacing: 4,
            children: [
              {
                type: 'FRAME',
                name: 'Btn Right',
                width: 22,
                height: 22,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: '>', fontSize: 10, fontWeight: 700, fill: TOKENS.ink }]
              },
              {
                type: 'FRAME',
                name: 'Btn Left',
                width: 22,
                height: 22,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: '<', fontSize: 10, fontWeight: 700, fill: TOKENS.ink }]
              }
            ]
          },
          {
            type: 'FRAME',
            name: 'Selected MCC Box',
            width: 530,
            height: 38,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.blueBorder,
            strokeWeight: 1,
            padding: { left: 8, right: 8, top: 4, bottom: 4 },
            layoutMode: 'VERTICAL',
            children: [
              { type: 'TEXT', characters: 'MCC đã chọn (Áp dụng):', fontSize: 9, fill: TOKENS.bluePrimary },
              { type: 'TEXT', characters: '5411 - Grocery Stores, Supermarkets, 5311 - Dept Stores', fontSize: 9, fontWeight: 600, fill: TOKENS.ink }
            ]
          }
        ]
      }
    ]
  };
}

function buildCommonInfoCardForPayment() {
  return {
    type: 'FRAME',
    name: 'Khối 1: Thông tin chung (Phí TT)',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 8, bottom: 8 },
    cornerRadius: 6,
    fill: TOKENS.white,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 6,
    children: [
      { type: 'TEXT', characters: 'Thông tin chung', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
      // Row 1
      {
        type: 'FRAME',
        name: 'Row 1',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Nguồn dữ liệu cấu hình *', 'CTT', 560),
          buildField('Đối tác/ Ngân hàng hưởng phí *', 'KBank', 560)
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
      // Row 3: MCC Dual Listbox
      buildDualListBox(),
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
      // Row 5: Loại DV & Phương thức TT
      {
        type: 'FRAME',
        name: 'Row 5',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Loại dịch vụ *', 'Thanh toán hóa đơn', 560),
          buildField('Phương thức thanh toán *', 'Thẻ quốc tế', 560)
        ]
      },
      // Row 6: Cổng TT & Xuất xứ thẻ
      {
        type: 'FRAME',
        name: 'Row 6',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Cổng thanh toán / Kênh kết nối *', 'CYBS/KBANK', 560),
          buildField('Xuất xứ thẻ / Kênh thanh toán *', 'NHPH trong nước', 560)
        ]
      },
      // Row 7: Đơn vị tiền tệ & Thuế VAT
      {
        type: 'FRAME',
        name: 'Row 7',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 16,
        children: [
          buildField('Đơn vị tiền tệ *', 'VND', 560),
          buildField('Thuế VAT (%) *', '8 %', 560, false)
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
    itemSpacing: 8,
    padding: { top: 4, bottom: 4 },
    children: [
      {
        type: 'FRAME',
        name: 'Btn Cancel',
        padding: { left: 16, right: 16, top: 6, bottom: 6 },
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.border,
        strokeWeight: 1,
        children: [{ type: 'TEXT', characters: 'Hủy', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }]
      },
      {
        type: 'FRAME',
        name: 'Btn Save Draft',
        padding: { left: 16, right: 16, top: 6, bottom: 6 },
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.bluePrimary,
        strokeWeight: 1,
        children: [{ type: 'TEXT', characters: 'Lưu nháp', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary }]
      },
      {
        type: 'FRAME',
        name: 'Btn Create New',
        padding: { left: 16, right: 16, top: 6, bottom: 6 },
        cornerRadius: 4,
        fill: TOKENS.bluePrimary,
        children: [{ type: 'TEXT', characters: 'Tạo mới +', fontSize: 11, fontWeight: 700, fill: TOKENS.white }]
      }
    ]
  };
}

// Bố cục mới chuẩn theo ảnh chụp media_1793847988312_9f96fbca.png
function buildBrandFeeCardWithJcbTier() {
  return {
    type: 'FRAME',
    name: 'Khối 2: Thông tin Phí cho từng thương hiệu thẻ',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 8, bottom: 10 },
    cornerRadius: 6,
    fill: '#F0F6FF', // Nền xanh nhạt chuẩn theo ảnh
    stroke: '#BFDBFE',
    strokeWeight: 1,
    itemSpacing: 8,
    children: [
      { type: 'TEXT', characters: 'Thông tin Phí cho từng thương hiệu thẻ', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },

      // Header Row: Radios & Brand Dropdown & Popup Menu
      {
        type: 'FRAME',
        name: 'Header Control Row',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        children: [
          // Radio Group trái
          {
            type: 'FRAME',
            name: 'Radio Group',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 16,
            children: [
              {
                type: 'FRAME',
                name: 'Radio 1: Chung',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 6,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Circle Unchecked',
                    width: 14,
                    height: 14,
                    cornerRadius: 7,
                    stroke: TOKENS.borderDark,
                    strokeWeight: 1.5,
                    fill: TOKENS.white
                  },
                  { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ thương hiệu thẻ', fontSize: 10, fill: TOKENS.inkMuted }
                ]
              },
              {
                type: 'FRAME',
                name: 'Radio 2: Riêng (Active)',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 6,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Circle Checked',
                    width: 14,
                    height: 14,
                    cornerRadius: 7,
                    stroke: TOKENS.bluePrimary,
                    strokeWeight: 1.5,
                    fill: TOKENS.white,
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'CENTER',
                    counterAxisAlignItems: 'CENTER',
                    children: [
                      {
                        type: 'FRAME',
                        name: 'Inner Dot',
                        width: 7,
                        height: 7,
                        cornerRadius: 3.5,
                        fill: TOKENS.bluePrimary
                      }
                    ]
                  },
                  { type: 'TEXT', characters: 'Không áp dụng', fontSize: 10, fontWeight: 700, fill: TOKENS.ink }
                ]
              }
            ]
          },

          // Cụm phải: Label + Select box
          {
            type: 'FRAME',
            name: 'Brand Select Container',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'Label Brand',
                layoutMode: 'HORIZONTAL',
                children: [
                  { type: 'TEXT', characters: 'Thương hiệu thẻ ', fontSize: 10, fontWeight: 600, fill: TOKENS.ink },
                  { type: 'TEXT', characters: '*', fontSize: 10, fontWeight: 700, fill: TOKENS.red }
                ]
              },
              {
                type: 'FRAME',
                name: 'Select Input Box',
                width: 210,
                height: 24,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.borderDark,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'SPACE_BETWEEN',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 8, right: 8 },
                children: [
                  { type: 'TEXT', characters: 'Visa, Master, JCB', fontSize: 10, fontWeight: 600, fill: TOKENS.ink },
                  { type: 'TEXT', characters: '⌵', fontSize: 10, fill: TOKENS.inkMuted }
                ]
              }
            ]
          }
        ]
      },

      // Dropdown Overlay (Menu xổ xuống popup)
      {
        type: 'FRAME',
        name: 'Multi-select Dropdown Menu Popup',
        layoutPositioning: 'ABSOLUTE',
        x: 936,
        y: 42,
        width: 210,
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.borderDark,
        strokeWeight: 1,
        padding: { left: 8, right: 6, top: 6, bottom: 6 },
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        children: [
          {
            type: 'FRAME',
            name: 'Option List',
            layoutMode: 'VERTICAL',
            itemSpacing: 6,
            children: [
              {
                type: 'FRAME',
                name: 'Item: Visa',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 6,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Checkbox Checked',
                    width: 12,
                    height: 12,
                    cornerRadius: 2,
                    fill: TOKENS.ink,
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'CENTER',
                    counterAxisAlignItems: 'CENTER',
                    children: [{ type: 'TEXT', characters: '✓', fontSize: 9, fontWeight: 700, fill: TOKENS.white }]
                  },
                  { type: 'TEXT', characters: 'Visa', fontSize: 10, fontWeight: 600, fill: TOKENS.ink }
                ]
              },
              {
                type: 'FRAME',
                name: 'Item: Master',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 6,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Checkbox Checked',
                    width: 12,
                    height: 12,
                    cornerRadius: 2,
                    fill: TOKENS.ink,
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'CENTER',
                    counterAxisAlignItems: 'CENTER',
                    children: [{ type: 'TEXT', characters: '✓', fontSize: 9, fontWeight: 700, fill: TOKENS.white }]
                  },
                  { type: 'TEXT', characters: 'Master', fontSize: 10, fontWeight: 600, fill: TOKENS.ink }
                ]
              },
              {
                type: 'FRAME',
                name: 'Item: JCB',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 6,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Checkbox Checked',
                    width: 12,
                    height: 12,
                    cornerRadius: 2,
                    fill: TOKENS.ink,
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'CENTER',
                    counterAxisAlignItems: 'CENTER',
                    children: [{ type: 'TEXT', characters: '✓', fontSize: 9, fontWeight: 700, fill: TOKENS.white }]
                  },
                  { type: 'TEXT', characters: 'JCB', fontSize: 10, fontWeight: 600, fill: TOKENS.ink }
                ]
              },
              {
                type: 'FRAME',
                name: 'Item: UnionPay',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 6,
                children: [
                  {
                    type: 'FRAME',
                    name: 'Checkbox Unchecked',
                    width: 12,
                    height: 12,
                    cornerRadius: 2,
                    stroke: TOKENS.borderDark,
                    strokeWeight: 1,
                    fill: TOKENS.white
                  },
                  { type: 'TEXT', characters: 'UnionPay', fontSize: 10, fill: TOKENS.inkMuted }
                ]
              }
            ]
          },
          {
            type: 'FRAME',
            name: 'Scrollbar Track',
            width: 4,
            height: 68,
            cornerRadius: 2,
            fill: '#F1F5F9',
            layoutMode: 'VERTICAL',
            children: [
              {
                type: 'FRAME',
                name: 'Scrollbar Thumb',
                width: 4,
                height: 36,
                cornerRadius: 2,
                fill: '#94A3B8'
              }
            ]
          }
        ]
      },

      // Sub-card 1: Visa
      buildBrandSubCardSingle({
        brand: 'Visa',
        rate: '0.74'
      }),

      // Sub-card 2: MasterCard
      buildBrandSubCardSingle({
        brand: 'MasterCard',
        rate: '0.82'
      }),

      // Sub-card 3: JCB (Bậc thang Tổng GTGD - 3 bậc)
      buildBrandSubCardJcbTier()
    ]
  };
}

// Subcard 1 bậc phí (Visa, MasterCard)
function buildBrandSubCardSingle({ brand, rate }) {
  return {
    type: 'FRAME',
    name: `Brand Card: ${brand}`,
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 6, bottom: 8 },
    cornerRadius: 4,
    fill: TOKENS.white,
    stroke: '#E2E8F0',
    strokeWeight: 1,
    itemSpacing: 6,
    children: [
      { type: 'TEXT', characters: `Thương hiệu thẻ: ${brand}`, fontSize: 10, fontWeight: 700, fill: TOKENS.ink },
      
      // Hàng 1: Hình thức thu phí
      {
        type: 'FRAME',
        name: 'Fee Type Row',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          { type: 'TEXT', characters: 'Hình thức thu phí *', fontSize: 10, fontWeight: 600, fill: TOKENS.ink, width: 120 },
          {
            type: 'FRAME',
            name: 'Input Box Fee Type',
            width: 320,
            height: 24,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: '1 bậc phí', fontSize: 10, fill: TOKENS.ink },
              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }
            ]
          }
        ]
      },

      // Hàng 2: Mức phí & 3 cột
      {
        type: 'FRAME',
        name: 'Fee Value Row',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'MAX',
        itemSpacing: 16,
        children: [
          {
            type: 'FRAME',
            name: 'Label Muc Phi',
            width: 120,
            height: 24,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: 'Mức phí ', fontSize: 10, fontWeight: 600, fill: TOKENS.ink },
              { type: 'TEXT', characters: '*', fontSize: 10, fontWeight: 700, fill: TOKENS.red }
            ]
          },
          // Cột 1: Mức phí tỷ lệ
          {
            type: 'FRAME',
            name: 'Col Rate',
            layoutMode: 'VERTICAL',
            itemSpacing: 2,
            children: [
              { type: 'TEXT', characters: 'Mức phí tỷ lệ', fontSize: 9, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Input Rate',
                width: 100,
                height: 24,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.borderDark,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'SPACE_BETWEEN',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 8, right: 8 },
                children: [
                  { type: 'TEXT', characters: rate, fontSize: 10, fill: TOKENS.ink },
                  { type: 'TEXT', characters: '%', fontSize: 10, fill: TOKENS.inkMuted }
                ]
              }
            ]
          },
          // Cột 2: Mức phí tối thiểu
          {
            type: 'FRAME',
            name: 'Col Min',
            layoutMode: 'VERTICAL',
            itemSpacing: 2,
            children: [
              { type: 'TEXT', characters: 'Mức phí tối thiểu', fontSize: 9, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Input Min',
                width: 100,
                height: 24,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.borderDark,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 8, right: 8 },
                children: [
                  { type: 'TEXT', characters: '|', fontSize: 10, fill: TOKENS.bluePrimary }
                ]
              }
            ]
          },
          // Cột 3: Mức phí tối đa
          {
            type: 'FRAME',
            name: 'Col Max',
            layoutMode: 'VERTICAL',
            itemSpacing: 2,
            children: [
              { type: 'TEXT', characters: 'Mức phí tối đa', fontSize: 9, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Input Max',
                width: 100,
                height: 24,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.borderDark,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 8, right: 8 },
                children: [
                  { type: 'TEXT', characters: '|', fontSize: 10, fill: TOKENS.bluePrimary }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

// Subcard JCB Bậc thang Tổng GTGD (3 bậc)
function buildBrandSubCardJcbTier() {
  return {
    type: 'FRAME',
    name: 'Brand Card: JCB (Bậc thang)',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 6, bottom: 8 },
    cornerRadius: 4,
    fill: TOKENS.white,
    stroke: '#E2E8F0',
    strokeWeight: 1,
    itemSpacing: 6,
    children: [
      { type: 'TEXT', characters: 'Thương hiệu thẻ: JCB', fontSize: 10, fontWeight: 700, fill: TOKENS.ink },

      // Hàng 1: Hình thức thu phí
      {
        type: 'FRAME',
        name: 'Fee Type Row JCB',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          { type: 'TEXT', characters: 'Hình thức thu phí *', fontSize: 10, fontWeight: 600, fill: TOKENS.ink, width: 120 },
          {
            type: 'FRAME',
            name: 'Input Box JCB Fee Type',
            width: 320,
            height: 24,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: 'Bậc thang Tổng GTGD', fontSize: 10, fill: TOKENS.ink },
              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }
            ]
          }
        ]
      },

      // Bậc 1
      buildTierRow({
        tierNum: 1,
        rate: '0.74',
        showActions: false
      }),

      // Bậc 2
      buildTierRow({
        tierNum: 2,
        rate: '0.73',
        showActions: true
      }),

      // Bậc 3
      buildTierRow({
        tierNum: 3,
        rate: '0.70',
        showActions: true
      })
    ]
  };
}

function buildTierRow({ tierNum, rate, showActions = false }) {
  return {
    type: 'FRAME',
    name: `Tier ${tierNum} Row`,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'MAX',
    itemSpacing: 16,
    children: [
      {
        type: 'FRAME',
        name: `Label Tier ${tierNum}`,
        width: 120,
        height: 24,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: `Mức phí bậc ${tierNum} `, fontSize: 10, fontWeight: 600, fill: TOKENS.ink },
          { type: 'TEXT', characters: '*', fontSize: 10, fontWeight: 700, fill: TOKENS.red }
        ]
      },
      // Cột 1: Tổng SLGD/ Tổng GTGD
      {
        type: 'FRAME',
        name: 'Col Range',
        layoutMode: 'VERTICAL',
        itemSpacing: 2,
        children: [
          { type: 'TEXT', characters: 'Tổng SLGD/ Tổng GTGD', fontSize: 9, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Range Inputs Container',
            width: 140,
            height: 24,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 4,
            children: [
              {
                type: 'FRAME',
                name: 'Min Box',
                width: 62,
                height: 24,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.borderDark,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: '---', fontSize: 10, fill: TOKENS.inkLight }]
              },
              { type: 'TEXT', characters: '-', fontSize: 10, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Max Box',
                width: 62,
                height: 24,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.borderDark,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: '---', fontSize: 10, fill: TOKENS.inkLight }]
              }
            ]
          }
        ]
      },
      // Cột 2: Mức phí tỷ lệ
      {
        type: 'FRAME',
        name: 'Col Rate',
        layoutMode: 'VERTICAL',
        itemSpacing: 2,
        children: [
          { type: 'TEXT', characters: 'Mức phí tỷ lệ', fontSize: 9, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Input Rate',
            width: 100,
            height: 24,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: rate, fontSize: 10, fill: TOKENS.ink },
              { type: 'TEXT', characters: '%', fontSize: 10, fill: TOKENS.inkMuted }
            ]
          }
        ]
      },
      // Cột 3: Mức phí tối thiểu
      {
        type: 'FRAME',
        name: 'Col Min',
        layoutMode: 'VERTICAL',
        itemSpacing: 2,
        children: [
          { type: 'TEXT', characters: 'Mức phí tối thiểu', fontSize: 9, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Input Min',
            width: 100,
            height: 24,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: '|', fontSize: 10, fill: TOKENS.bluePrimary }
            ]
          }
        ]
      },
      // Cột 4: Mức phí tối đa
      {
        type: 'FRAME',
        name: 'Col Max',
        layoutMode: 'VERTICAL',
        itemSpacing: 2,
        children: [
          { type: 'TEXT', characters: 'Mức phí tối đa', fontSize: 9, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Input Max',
            width: 100,
            height: 24,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: '|', fontSize: 10, fill: TOKENS.bluePrimary }
            ]
          }
        ]
      },
      // Cột 5: Actions (+ / -)
      ...(showActions ? [{
        type: 'FRAME',
        name: 'Tier Actions',
        height: 24,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 10,
        children: [
          { type: 'TEXT', characters: '+', fontSize: 15, fontWeight: 700, fill: TOKENS.bluePrimary },
          { type: 'TEXT', characters: '–', fontSize: 15, fontWeight: 700, fill: TOKENS.red }
        ]
      }] : [])
    ]
  };
}

export function generateFullCr04BUpdated() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-04B: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Theo thương hiệu thẻ)',
    x: 6160,
    y: 1560,
    width: 1440,
    height: 1000,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar(),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 1000,
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
              buildCommonInfoCardForPayment(),
              buildBrandFeeCardWithJcbTier(),
              buildFooterButtons()
            ]
          }
        ]
      }
    ]
  };
}

const spec = generateFullCr04BUpdated();
fs.writeFileSync('scripts/scr-ctt-cr-04b-updated-jcb.min.json', JSON.stringify(spec));
console.log('Successfully saved scripts/scr-ctt-cr-04b-updated-jcb.min.json, size:', JSON.stringify(spec).length, 'bytes');
