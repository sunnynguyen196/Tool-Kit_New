import fs from 'node:fs';
import { runFigmaCode } from './figma-runner.mjs';

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

function buildSidebar() {
  return {
    type: 'FRAME',
    name: 'Sidebar',
    width: 230,
    height: 1020,
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

function buildDualListBox() {
  return {
    type: 'FRAME',
    name: 'MCC Dual Listbox Row',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    itemSpacing: 3,
    children: [
      { type: 'TEXT', characters: 'Merchant Category Code (MCC) *', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
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
            height: 48,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            padding: { left: 8, right: 8, top: 4, bottom: 4 },
            layoutMode: 'VERTICAL',
            children: [
              { type: 'TEXT', characters: 'Danh sách MCC khả dụng:', fontSize: 10, fill: TOKENS.inkLight },
              { type: 'TEXT', characters: '• 4784 - Thu phí cầu đường cao tốc\n• 5411 - Tạp hóa, siêu thị, cửa hàng tiện lợi', fontSize: 10, fill: TOKENS.ink }
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
            height: 48,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.blueBorder,
            strokeWeight: 1,
            padding: { left: 8, right: 8, top: 4, bottom: 4 },
            layoutMode: 'VERTICAL',
            children: [
              { type: 'TEXT', characters: 'MCC đã chọn (Áp dụng):', fontSize: 10, fill: TOKENS.bluePrimary },
              { type: 'TEXT', characters: '• 4900 - Dịch vụ tiện ích - điện, ga, nước, vệ sinh\n• 5732 - Cửa hàng đồ điện', fontSize: 10, fontWeight: 600, fill: TOKENS.ink }
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
          buildField('Cổng trung gian thanh toán *', 'CYBS/KBANK', 560),
          buildField('Loại ngân hàng phát hành *', 'NHPH trong nước', 560)
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
          buildField('Thuế VAT *', '8 %', 560, false)
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

// KHỐI 2 THEO ĐÚNG ẢNH 1 (media_1793849182392_acf60caf.png)
function buildBrandFeeCardFromImage() {
  return {
    type: 'FRAME',
    name: 'Khối 2: Thông tin Phí cho từng thương hiệu thẻ',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 16, right: 16, top: 10, bottom: 12 },
    cornerRadius: 8,
    fill: '#F0F6FF', // Nền xanh nhạt chuẩn theo ảnh 1
    stroke: '#BFDBFE',
    strokeWeight: 1,
    itemSpacing: 8,
    children: [
      { type: 'TEXT', characters: 'Thông tin Phí cho từng thương hiệu thẻ', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },

      // Header Control Row: Radios & Brand Dropdown & Popup Menu
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
            itemSpacing: 20,
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
                    stroke: TOKENS.border,
                    strokeWeight: 1.5,
                    fill: TOKENS.white
                  },
                  { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ thương hiệu thẻ', fontSize: 11, fill: TOKENS.inkSecondary }
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
                    strokeWeight: 2,
                    fill: TOKENS.white,
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
                  { type: 'TEXT', characters: 'Thương hiệu thẻ ', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
                  { type: 'TEXT', characters: '*', fontSize: 11, fontWeight: 700, fill: TOKENS.red }
                ]
              },
              {
                type: 'FRAME',
                name: 'Select Input Box',
                width: 220,
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
                  { type: 'TEXT', characters: 'Visa, Master, JCB', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
                  { type: 'TEXT', characters: '⌵', fontSize: 10, fill: TOKENS.inkMuted }
                ]
              }
            ]
          }
        ]
      },

      // Dropdown Overlay (Menu xổ xuống popup đúng theo ảnh 1)
      {
        type: 'FRAME',
        name: 'Multi-select Dropdown Menu Popup',
        layoutPositioning: 'ABSOLUTE',
        x: 926,
        y: 42,
        width: 220,
        cornerRadius: 4,
        fill: TOKENS.white,
        stroke: TOKENS.border,
        strokeWeight: 1,
        padding: { left: 10, right: 6, top: 6, bottom: 6 },
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
                  { type: 'TEXT', characters: 'Visa', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }
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
                  { type: 'TEXT', characters: 'Master', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }
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
                  { type: 'TEXT', characters: 'JCB', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }
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
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    fill: TOKENS.white
                  },
                  { type: 'TEXT', characters: 'UnionPay', fontSize: 11, fill: TOKENS.inkMuted }
                ]
              }
            ]
          },
          {
            type: 'FRAME',
            name: 'Scrollbar Track',
            width: 4,
            height: 70,
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
      buildBrandSubCardSingle({ brand: 'Visa', rate: '0.74' }),

      // Sub-card 2: MasterCard
      buildBrandSubCardSingle({ brand: 'MasterCard', rate: '0.82' }),

      // Sub-card 3: JCB (Bậc thang Tổng GTGD)
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
      { type: 'TEXT', characters: `Thương hiệu thẻ: ${brand}`, fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
      
      // Hàng 1: Hình thức thu phí
      {
        type: 'FRAME',
        name: 'Fee Type Row',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          { type: 'TEXT', characters: 'Hình thức thu phí *', fontSize: 11, fontWeight: 600, fill: TOKENS.ink, width: 120 },
          {
            type: 'FRAME',
            name: 'Input Box Fee Type',
            width: 320,
            height: 26,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: '1 bậc phí', fontSize: 11, fill: TOKENS.ink },
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
            height: 26,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: 'Mức phí ', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
              { type: 'TEXT', characters: '*', fontSize: 11, fontWeight: 700, fill: TOKENS.red }
            ]
          },
          // Cột 1: Mức phí tỷ lệ
          {
            type: 'FRAME',
            name: 'Col Rate',
            layoutMode: 'VERTICAL',
            itemSpacing: 2,
            children: [
              { type: 'TEXT', characters: 'Mức phí tỷ lệ', fontSize: 10, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Input Rate',
                width: 100,
                height: 26,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'SPACE_BETWEEN',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 8, right: 8 },
                children: [
                  { type: 'TEXT', characters: rate, fontSize: 11, fill: TOKENS.ink },
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
              { type: 'TEXT', characters: 'Mức phí tối thiểu', fontSize: 10, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Input Min',
                width: 100,
                height: 26,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 8, right: 8 },
                children: [
                  { type: 'TEXT', characters: '|', fontSize: 11, fill: TOKENS.bluePrimary }
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
              { type: 'TEXT', characters: 'Mức phí tối đa', fontSize: 10, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Input Max',
                width: 100,
                height: 26,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 8, right: 8 },
                children: [
                  { type: 'TEXT', characters: '|', fontSize: 11, fill: TOKENS.bluePrimary }
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
      { type: 'TEXT', characters: 'Thương hiệu thẻ: JCB', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },

      // Hàng 1: Hình thức thu phí
      {
        type: 'FRAME',
        name: 'Fee Type Row JCB',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          { type: 'TEXT', characters: 'Hình thức thu phí *', fontSize: 11, fontWeight: 600, fill: TOKENS.ink, width: 120 },
          {
            type: 'FRAME',
            name: 'Input Box JCB Fee Type',
            width: 320,
            height: 26,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: 'Bậc thang Tổng GTGD', fontSize: 11, fill: TOKENS.ink },
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
        height: 26,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: `Mức phí bậc ${tierNum} `, fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
          { type: 'TEXT', characters: '*', fontSize: 11, fontWeight: 700, fill: TOKENS.red }
        ]
      },
      // Cột 1: Tổng SLGD/ Tổng GTGD
      {
        type: 'FRAME',
        name: 'Col Range',
        layoutMode: 'VERTICAL',
        itemSpacing: 2,
        children: [
          { type: 'TEXT', characters: 'Tổng SLGD/ Tổng GTGD', fontSize: 10, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Range Inputs Container',
            width: 140,
            height: 26,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 4,
            children: [
              {
                type: 'FRAME',
                name: 'Min Box',
                width: 62,
                height: 26,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: '---', fontSize: 10, fill: TOKENS.inkLight }]
              },
              { type: 'TEXT', characters: '-', fontSize: 11, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Max Box',
                width: 62,
                height: 26,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
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
          { type: 'TEXT', characters: 'Mức phí tỷ lệ', fontSize: 10, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Input Rate',
            width: 100,
            height: 26,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: rate, fontSize: 11, fill: TOKENS.ink },
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
          { type: 'TEXT', characters: 'Mức phí tối thiểu', fontSize: 10, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Input Min',
            width: 100,
            height: 26,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: '|', fontSize: 11, fill: TOKENS.bluePrimary }
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
          { type: 'TEXT', characters: 'Mức phí tối đa', fontSize: 10, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Input Max',
            width: 100,
            height: 26,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [
              { type: 'TEXT', characters: '|', fontSize: 11, fill: TOKENS.bluePrimary }
            ]
          }
        ]
      },
      // Cột 5: Actions (+ / -)
      ...(showActions ? [{
        type: 'FRAME',
        name: 'Tier Actions',
        height: 26,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 10,
        children: [
          { type: 'TEXT', characters: '+', fontSize: 16, fontWeight: 700, fill: TOKENS.bluePrimary },
          { type: 'TEXT', characters: '–', fontSize: 16, fontWeight: 700, fill: TOKENS.red }
        ]
      }] : [])
    ]
  };
}

export function generateFullCr04B() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-04B: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Theo thương hiệu thẻ)',
    x: 6160,
    y: 1560,
    width: 1440,
    height: 1020,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar(),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 1020,
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
              buildBrandFeeCardFromImage(),
              buildFooterButtons()
            ]
          }
        ]
      }
    ]
  };
}

async function main() {
  console.log('=== BƯỚC 1: XÓA FRAME SCR-CTT-CR-04B HIỆN TẠI ===');
  const deleteCode = `
    const nodes = await figma.searchNodes({ query: "SCR-CTT-CR-04B" });
    const deleted = [];
    for (const n of (nodes?.nodes || [])) {
      try {
        await figma.delete(n.id);
        deleted.push({ id: n.id, name: n.name });
      } catch (err) {
        deleted.push({ id: n.id, name: n.name, error: err.message });
      }
    }
    return { ok: true, deleted };
  `;
  const delRes = await runFigmaCode(deleteCode, 'Page 2');
  console.log('Kết quả xóa node cũ:\n', delRes?.content?.[0]?.text);

  console.log('\n=== BƯỚC 2: TẠO MỚI SCR-CTT-CR-04B VỚI TEMPLATE CHUẨN + KHỐI 2 THEO ẢNH 1 ===');
  const spec = generateFullCr04B();
  fs.writeFileSync('scripts/scr-ctt-cr-04b-2tabs.min.json', JSON.stringify(spec));
  
  const drawCode = `
    const spec = ${JSON.stringify(spec)};
    const res = await figma.create(spec);
    return { ok: true, id: res.id, name: res.name, x: res.x, y: res.y, width: res.width, height: res.height };
  `;
  const drawRes = await runFigmaCode(drawCode, 'Page 2');
  console.log('Kết quả vẽ màn hình mới:\n', drawRes?.content?.[0]?.text);

  console.log('\n=== BƯỚC 3: KIỂM TRA LẠI VỊ TRÍ HÀNG 2 TRÊN CANVAS ===');
  const checkCode = `
    const res = await figma.searchNodes({ query: "SCR-CTT-CR" });
    const nodes = (res?.nodes || []).filter(n => n.type === "FRAME" && n.name.startsWith("SCR-CTT-CR"));
    nodes.sort((a,b) => a.x - b.x);
    return { total: nodes.length, nodes: nodes.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y, width: n.width, height: n.height })) };
  `;
  const checkRes = await runFigmaCode(checkCode, 'Page 2');
  console.log('Danh sách các frame CTT Create hiện có:\n', checkRes?.content?.[0]?.text);
}

main().catch(err => {
  console.error('Lỗi thực thi:', err);
  process.exit(1);
});
