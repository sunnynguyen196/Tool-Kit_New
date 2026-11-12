import fs from 'node:fs';
import { runFigmaCode } from './figma-runner.mjs';

const TOKENS = {
  ink: '#1E293B',
  inkMuted: '#64748B',
  inkLight: '#94A3B8',
  white: '#FFFFFF',
  bluePrimary: '#2563EB',
  blueLight: '#EFF6FF',
  blueBorder: '#BFDBFE',
  border: '#CBD5E1',
  borderLight: '#E2E8F0',
  cardBg: '#F8FAFC',
  red: '#EF4444',
  tagBg: '#F3F4F6'
};

function buildSidebar(activeTab = 'QRGW') {
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
        fill: '#74B4F7',
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
                  { type: 'TEXT', characters: '▾', fontSize: 11, fill: '#475569' },
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
                fill: activeTab === 'CTT' ? '#DBEAFE' : '#00000000',
                children: [
                  { type: 'TEXT', characters: '• Phí đối tác CTT', fontSize: 12, fontWeight: activeTab === 'CTT' ? 700 : 400, fill: activeTab === 'CTT' ? TOKENS.bluePrimary : '#475569' }
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
                fill: activeTab === 'QRGW' ? '#DBEAFE' : '#00000000',
                children: [
                  { type: 'TEXT', characters: '• Phí đối tác QRGW', fontSize: 12, fontWeight: activeTab === 'QRGW' ? 700 : 400, fill: activeTab === 'QRGW' ? TOKENS.bluePrimary : '#475569' }
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
              { type: 'TEXT', characters: 'Quản lý đối tác', fontSize: 12, fill: '#475569' }
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
              { type: 'TEXT', characters: 'Báo cáo & Đối soát', fontSize: 12, fill: '#475569' }
            ]
          }
        ]
      }
    ]
  };
}

function buildTopHeader() {
  return {
    type: 'FRAME',
    name: 'Top Header',
    height: 60,
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 24, right: 24 },
    fill: '#74B4F7',
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
                fill: TOKENS.red,
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
        children: [
          {
            type: 'TEXT',
            characters: 'Phí xử lý giao dịch',
            fontSize: 12,
            fontWeight: 600,
            fill: activeTab === 'XLGD' ? TOKENS.white : '#475569'
          }
        ]
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
        children: [
          {
            type: 'TEXT',
            characters: 'Phí thanh toán',
            fontSize: 12,
            fontWeight: 600,
            fill: activeTab === 'TT' ? TOKENS.white : '#475569'
          }
        ]
      }
    ]
  };
}

function buildField(label, value, width = 560, hasChevron = true, unit = '') {
  return {
    type: 'FRAME',
    name: `Field: ${label}`,
    width,
    layoutMode: 'VERTICAL',
    itemSpacing: 3,
    children: [
      {
        type: 'FRAME',
        name: 'Label Box',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: label.replace('*', '').trim() + ' ', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
          ...(label.includes('*') ? [{ type: 'TEXT', characters: '*', fontSize: 11, fontWeight: 700, fill: TOKENS.red }] : [])
        ]
      },
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
          { type: 'TEXT', characters: value, fontSize: 11, fill: TOKENS.ink },
          ...(hasChevron ? [{ type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }] : []),
          ...(unit ? [{ type: 'TEXT', characters: unit, fontSize: 11, fill: TOKENS.inkMuted }] : [])
        ]
      }
    ]
  };
}

function buildFooterBar() {
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

function buildTierRow({ num, rangeMin = '---', rangeMax = '---', fee = '1.000 đ', showActions = false }) {
  return {
    type: 'FRAME',
    name: `Mức phí bậc ${num} Row`,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'MAX',
    itemSpacing: 16,
    children: [
      {
        type: 'FRAME',
        name: `Label Tier ${num}`,
        width: 130,
        height: 30,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: `Mức phí bậc ${num} `, fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
          { type: 'TEXT', characters: '*', fontSize: 11, fontWeight: 700, fill: TOKENS.red }
        ]
      },
      {
        type: 'FRAME',
        name: 'Col: Range',
        layoutMode: 'VERTICAL',
        itemSpacing: 3,
        children: [
          { type: 'TEXT', characters: 'Tổng SLGD/ Tổng GTGD', fontSize: 10, fontWeight: 500, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Range Box Container',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              {
                type: 'FRAME',
                name: 'Range Min Box',
                width: 66,
                height: 30,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: rangeMin, fontSize: 11, fill: TOKENS.inkLight }]
              },
              { type: 'TEXT', characters: '-', fontSize: 11, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Range Max Box',
                width: 66,
                height: 30,
                cornerRadius: 4,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: rangeMax, fontSize: 11, fill: TOKENS.inkLight }]
              }
            ]
          }
        ]
      },
      {
        type: 'FRAME',
        name: 'Col: Rate',
        layoutMode: 'VERTICAL',
        itemSpacing: 3,
        children: [
          { type: 'TEXT', characters: 'Mức phí / GD', fontSize: 10, fontWeight: 500, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Rate Box',
            width: 105,
            height: 30,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [{ type: 'TEXT', characters: fee, fontSize: 11, fontWeight: 600, fill: TOKENS.ink }]
          }
        ]
      },
      {
        type: 'FRAME',
        name: 'Col: Min Fee',
        layoutMode: 'VERTICAL',
        itemSpacing: 3,
        children: [
          { type: 'TEXT', characters: 'Mức phí tối thiểu', fontSize: 10, fontWeight: 500, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Min Fee Box',
            width: 105,
            height: 30,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [{ type: 'TEXT', characters: '|', fontSize: 11, fill: TOKENS.bluePrimary }]
          }
        ]
      },
      {
        type: 'FRAME',
        name: 'Col: Max Fee',
        layoutMode: 'VERTICAL',
        itemSpacing: 3,
        children: [
          { type: 'TEXT', characters: 'Mức phí tối đa', fontSize: 10, fontWeight: 500, fill: TOKENS.inkMuted },
          {
            type: 'FRAME',
            name: 'Max Fee Box',
            width: 105,
            height: 30,
            cornerRadius: 4,
            fill: TOKENS.white,
            stroke: TOKENS.border,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 8, right: 8 },
            children: [{ type: 'TEXT', characters: '|', fontSize: 11, fill: TOKENS.bluePrimary }]
          }
        ]
      },
      ...(showActions ? [{
        type: 'FRAME',
        name: 'Tier Action Buttons',
        height: 30,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 10,
        padding: { left: 6, right: 0 },
        children: [
          { type: 'TEXT', characters: '+', fontSize: 16, fontWeight: 700, fill: TOKENS.bluePrimary },
          { type: 'TEXT', characters: '–', fontSize: 16, fontWeight: 700, fill: TOKENS.red }
        ]
      }] : [])
    ]
  };
}

// -------------------------------------------------------------
// 1. SPEC SCR-QR-CR-01: Phí XLGD (Áp dụng chung loại GD)
// -------------------------------------------------------------
export function generateSpecQrCr01() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-01: Thêm mới Phí XLGD QRGW (Áp dụng chung loại GD)',
    x: 8040,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.cardBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar('QRGW'),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 960,
        fill: TOKENS.cardBg,
        children: [
          buildTopHeader(),
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
              {
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
                  {
                    type: 'FRAME',
                    name: 'Row 1',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Nguồn dữ liệu cấu hình *', 'QRGW', 560),
                      buildField('Đối tác/ Ngân hàng hưởng phí *', 'VietinBank QRGW', 560)
                    ]
                  },
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
                  {
                    type: 'FRAME',
                    name: 'Row 3 (Dịch vụ, Loại QR, Trạng thái)',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Loại dịch vụ QRGW *', 'Thu hộ QR (Pay-in)', 368),
                      buildField('Loại QR *', 'QR động', 368),
                      buildField('Trạng thái giao dịch *', 'Tất cả (Thành công và Thất bại)', 368)
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Row 4',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Đơn vị tiền tệ *', 'VND', 270),
                      buildField('Thuế VAT *', '8 %', 270, false),
                      buildField('Mô tả cấu hình', 'Phí XLGD thu hộ QR cố định áp dụng chung toàn bộ loại giao dịch', 560, false)
                    ]
                  }
                ]
              },
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
                              { type: 'FRAME', name: 'Outer Circle', width: 14, height: 14, cornerRadius: 7, fill: TOKENS.white, stroke: TOKENS.border, strokeWeight: 1.5 },
                              { type: 'TEXT', characters: 'Không áp dụng', fontSize: 11, fill: '#475569' }
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
              buildFooterBar()
            ]
          }
        ]
      }
    ]
  };
}

// -------------------------------------------------------------
// 2. SPEC SCR-QR-CR-02: Phí XLGD (Theo từng loại GD: Thanh toán, Hoàn trả)
// -------------------------------------------------------------
export function generateSpecQrCr02() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-02: Thêm mới Phí XLGD QRGW (Theo từng loại GD: Thanh toán, Hoàn trả)',
    x: 9580,
    y: 1560,
    width: 1440,
    height: 1020,
    fill: TOKENS.cardBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar('QRGW'),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 1020,
        fill: TOKENS.cardBg,
        children: [
          buildTopHeader(),
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
              {
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
                  {
                    type: 'FRAME',
                    name: 'Row 1',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Nguồn dữ liệu cấu hình *', 'QRGW', 560),
                      buildField('Đối tác/ Ngân hàng hưởng phí *', 'MBBank QRGW', 560)
                    ]
                  },
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
                  {
                    type: 'FRAME',
                    name: 'Row 3 (Dịch vụ, Loại QR, Trạng thái)',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Loại dịch vụ QRGW *', 'Thu hộ QR (Pay-in)', 368),
                      buildField('Loại QR *', 'QR tĩnh', 368),
                      buildField('Trạng thái giao dịch *', 'Tất cả (Thành công và Thất bại)', 368)
                    ]
                  },
                  {
                    type: 'FRAME',
                    name: 'Row 4',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Đơn vị tiền tệ *', 'VND', 270),
                      buildField('Thuế VAT *', '8 %', 270, false),
                      buildField('Mô tả cấu hình', 'Phí XLGD phân tách riêng cho Thanh toán và Hoàn trả', 560, false)
                    ]
                  }
                ]
              },
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
                              { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ loại giao dịch', fontSize: 11, fill: '#475569' }
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
                  // Sub-card 1: Thanh toán (1 bậc phí 500 đ)
                  {
                    type: 'FRAME',
                    name: 'Sub-card: Loại giao dịch: Thanh toán',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: TOKENS.cardBg,
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
                  // Sub-card 2: Hoàn trả (Bậc thang Tổng SLGD chuẩn như ảnh đính kèm)
                  {
                    type: 'FRAME',
                    name: 'Sub-card: Loại giao dịch: Hoàn trả',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 6, bottom: 8 },
                    cornerRadius: 4,
                    fill: TOKENS.cardBg,
                    stroke: TOKENS.border,
                    strokeWeight: 1,
                    itemSpacing: 6,
                    children: [
                      { type: 'TEXT', characters: 'Loại giao dịch: Hoàn trả', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
                      buildField('Cách tính ngày áp dụng phí trên giao dịch *', 'Ngày phát sinh giao dịch gốc', 380),
                      // Dropdown Hình thức thu phí Bậc thang
                      {
                        type: 'FRAME',
                        name: 'Fee Type Row',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 16,
                        children: [
                          {
                            type: 'FRAME',
                            name: 'Label Fee Type',
                            width: 130,
                            layoutMode: 'HORIZONTAL',
                            counterAxisAlignItems: 'CENTER',
                            children: [
                              { type: 'TEXT', characters: 'Hình thức thu phí ', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
                              { type: 'TEXT', characters: '*', fontSize: 11, fontWeight: 700, fill: TOKENS.red }
                            ]
                          },
                          {
                            type: 'FRAME',
                            name: 'Dropdown Fee Type',
                            width: 320,
                            height: 30,
                            cornerRadius: 4,
                            fill: TOKENS.white,
                            stroke: TOKENS.border,
                            strokeWeight: 1,
                            layoutMode: 'HORIZONTAL',
                            primaryAxisAlignItems: 'SPACE_BETWEEN',
                            counterAxisAlignItems: 'CENTER',
                            padding: { left: 10, right: 10 },
                            children: [
                              { type: 'TEXT', characters: 'Bậc thang Tổng SLGD', fontSize: 11, fill: TOKENS.ink },
                              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }
                            ]
                          }
                        ]
                      },
                      // 3 bậc thang
                      buildTierRow({ num: 1, rangeMin: '---', rangeMax: '---', fee: '1.000 đ', showActions: false }),
                      buildTierRow({ num: 2, rangeMin: '---', rangeMax: '---', fee: '800 đ', showActions: true }),
                      buildTierRow({ num: 3, rangeMin: '---', rangeMax: '---', fee: '600 đ', showActions: true })
                    ]
                  }
                ]
              },
              buildFooterBar()
            ]
          }
        ]
      }
    ]
  };
}

// -------------------------------------------------------------
// 3. SPEC SCR-QR-CR-03: Phí Thanh toán QRGW (Áp dụng chung)
// -------------------------------------------------------------
export function generateSpecQrCr03() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-03: Thêm mới Phí Thanh toán QRGW (Áp dụng chung loại GD)',
    x: 11120,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.cardBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar('QRGW'),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 960,
        fill: TOKENS.cardBg,
        children: [
          buildTopHeader(),
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
              {
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
                  {
                    type: 'FRAME',
                    name: 'Row 1',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Nguồn dữ liệu cấu hình *', 'QRGW', 560),
                      buildField('Đối tác/ Ngân hàng hưởng phí *', 'Vietcombank QRGW', 560)
                    ]
                  },
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
                  {
                    type: 'FRAME',
                    name: 'Row 3 (Dịch vụ, Loại QR, Cổng kết nối)',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Loại dịch vụ QRGW *', 'Thu hộ QR (Pay-in)', 368),
                      buildField('Loại QR *', 'QR động', 368),
                      buildField('Cổng / Kênh kết nối thanh toán *', 'VCB-QR-PAYIN', 368)
                    ]
                  },
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
                  {
                    type: 'FRAME',
                    name: 'Row 5',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Đơn vị tiền tệ *', 'VND', 270),
                      buildField('Thuế VAT *', '8 %', 270, false),
                      buildField('Mô tả cấu hình', 'Phí thanh toán Thu hộ QR áp dụng chung cho toàn bộ loại giao dịch', 560, false)
                    ]
                  }
                ]
              },
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
                              { type: 'FRAME', name: 'Outer Circle', width: 14, height: 14, cornerRadius: 7, fill: TOKENS.white, stroke: TOKENS.border, strokeWeight: 1.5 },
                              { type: 'TEXT', characters: 'Không áp dụng', fontSize: 11, fill: '#475569' }
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
              buildFooterBar()
            ]
          }
        ]
      }
    ]
  };
}

// -------------------------------------------------------------
// 4. SPEC SCR-QR-CR-04: Phí Thanh toán QRGW (Tách Loại GD)
// -------------------------------------------------------------
export function generateSpecQrCr04() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-04: Thêm mới Phí Thanh toán QRGW (Theo từng loại GD: Thanh toán, Hoàn trả)',
    x: 12660,
    y: 1560,
    width: 1440,
    height: 960,
    fill: TOKENS.cardBg,
    layoutMode: 'HORIZONTAL',
    children: [
      buildSidebar('QRGW'),
      {
        type: 'FRAME',
        name: 'Main Content Wrapper',
        layoutMode: 'VERTICAL',
        width: 1210,
        height: 960,
        fill: TOKENS.cardBg,
        children: [
          buildTopHeader(),
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
              {
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
                  {
                    type: 'FRAME',
                    name: 'Row 1',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Nguồn dữ liệu cấu hình *', 'QRGW', 560),
                      buildField('Đối tác/ Ngân hàng hưởng phí *', 'BIDV QRGW', 560)
                    ]
                  },
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
                  {
                    type: 'FRAME',
                    name: 'Row 3 (Dịch vụ, Loại QR, Cổng kết nối)',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Loại dịch vụ QRGW *', 'Thu hộ QR (Pay-in)', 368),
                      buildField('Loại QR *', 'QR tĩnh', 368),
                      buildField('Cổng / Kênh kết nối thanh toán *', 'BIDV-QR-PAYIN', 368)
                    ]
                  },
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
                  {
                    type: 'FRAME',
                    name: 'Row 5',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'HORIZONTAL',
                    itemSpacing: 16,
                    children: [
                      buildField('Đơn vị tiền tệ *', 'VND', 270),
                      buildField('Thuế VAT *', '8 %', 270, false),
                      buildField('Mô tả cấu hình', 'Phí thanh toán QRGW phân tách riêng cho Thanh toán và Hoàn trả', 560, false)
                    ]
                  }
                ]
              },
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
                              { type: 'TEXT', characters: 'Áp dụng phí chung cho toàn bộ loại giao dịch', fontSize: 11, fill: '#475569' }
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
                  // Sub-card 1: Thanh toán (Theo GTGD)
                  {
                    type: 'FRAME',
                    name: 'Sub-card: Loại giao dịch: Thanh toán',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: TOKENS.cardBg,
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
                  // Sub-card 2: Hoàn trả (1 bậc cố định theo GD)
                  {
                    type: 'FRAME',
                    name: 'Sub-card: Loại giao dịch: Hoàn trả',
                    layoutAlign: 'STRETCH',
                    layoutMode: 'VERTICAL',
                    padding: { left: 12, right: 12, top: 4, bottom: 4 },
                    cornerRadius: 4,
                    fill: TOKENS.cardBg,
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
                          buildField('Cách tính ngày áp dụng phí trên giao dịch *', 'Ngày phát sinh giao dịch gốc', 380),
                          buildField('Hình thức thu phí *', '1 bậc phí (Cố định theo GD)', 240),
                          buildField('Mức phí cố định *', '1.000', 180, false, 'đ')
                        ]
                      }
                    ]
                  }
                ]
              },
              buildFooterBar()
            ]
          }
        ]
      }
    ]
  };
}

async function main() {
  console.log('--- STARTING UPDATE OF 4 QR CREATE SCREENS WITH "LOẠI QR" FIELD ---');

  const screens = [
    { name: 'SCR-QR-CR-01', spec: generateSpecQrCr01() },
    { name: 'SCR-QR-CR-02', spec: generateSpecQrCr02() },
    { name: 'SCR-QR-CR-03', spec: generateSpecQrCr03() },
    { name: 'SCR-QR-CR-04', spec: generateSpecQrCr04() }
  ];

  for (const s of screens) {
    console.log(`\nUpdating ${s.name}...`);
    const code = `
      const oldNodes = await figma.searchNodes({ query: "${s.name}" });
      for (const n of (oldNodes?.nodes || [])) {
        if (n.type === "FRAME" && n.name.startsWith("${s.name}")) {
          await figma.delete(n.id);
          console.log("Deleted old node:", n.id, n.name);
        }
      }
      const spec = ${JSON.stringify(s.spec)};
      const res = await figma.create(spec);
      return { ok: true, id: res.id, name: res.name, x: res.x, y: res.y, width: res.width, height: res.height };
    `;

    const res = await runFigmaCode(code, 'Page 2');
    console.log(`Result for ${s.name}:\n`, res?.content?.[0]?.text);
  }

  console.log('\n--- ALL 4 QR SCREENS UPDATED SUCCESSFULLY ---');
}

if (process.argv[1] && process.argv[1].endsWith('update-qr-screens-perfect.mjs')) {
  main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
