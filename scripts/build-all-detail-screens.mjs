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
  red: '#DC2626',
  green: '#16A34A',
  amber: '#D97706',
  sky: '#0284C7'
};

// Common Sidebar builder
function buildSidebar(activeTab = 'CTT') {
  return {
    type: 'FRAME',
    name: 'Sidebar',
    width: 230,
    height: 1080,
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
                name: 'Submenu Item: QRGW',
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
              { type: 'TEXT', characters: '🏢', fontSize: 13, fill: '#64748B' },
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
              { type: 'TEXT', characters: '📊', fontSize: 13, fill: '#64748B' },
              { type: 'TEXT', characters: 'Báo cáo & Đối soát', fontSize: 12, fill: '#475569' }
            ]
          }
        ]
      }
    ]
  };
}

// Common Top Header
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
          { type: 'TEXT', characters: '🔍', fontSize: 12, fill: TOKENS.inkMuted },
          { type: 'TEXT', characters: 'Tìm kiếm theo mã cấu hình, tên đối tác...', fontSize: 11, fill: TOKENS.inkLight }
        ]
      },
      {
        type: 'FRAME',
        name: 'Right User Box',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: [
          { type: 'TEXT', characters: '🔔', fontSize: 15, fill: TOKENS.white },
          { type: 'TEXT', characters: '⚙️', fontSize: 15, fill: TOKENS.white },
          {
            type: 'FRAME',
            name: 'Profile Capsule',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 8,
            padding: { left: 6, right: 12, top: 4, bottom: 4 },
            cornerRadius: 18,
            fill: '#FFFFFF33',
            children: [
              {
                type: 'FRAME',
                name: 'Avatar Circle',
                width: 28,
                height: 28,
                cornerRadius: 14,
                fill: '#2563EB',
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: [{ type: 'TEXT', characters: 'D', fontSize: 12, fontWeight: 700, fill: TOKENS.white }]
              },
              { type: 'TEXT', characters: 'duongnta ▾', fontSize: 12, fontWeight: 500, fill: TOKENS.white }
            ]
          }
        ]
      }
    ]
  };
}

// Meta Column inside Top Meta Card
function buildMetaCol(label, val, width = 170, badgeColor = null) {
  return {
    type: 'FRAME',
    name: `Col: ${label}`,
    width,
    layoutMode: 'VERTICAL',
    itemSpacing: 3,
    children: [
      { type: 'TEXT', characters: label, fontSize: 10, fontWeight: 500, fill: '#64748B' },
      badgeColor ? {
        type: 'FRAME',
        name: 'Badge',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 8, right: 8, top: 2, bottom: 2 },
        cornerRadius: 4,
        fill: badgeColor.bg,
        children: [
          { type: 'TEXT', characters: val, fontSize: 10, fontWeight: 600, fill: badgeColor.text }
        ]
      } : {
        type: 'TEXT', characters: val, fontSize: 11, fontWeight: 600, fill: '#1E293B'
      }
    ]
  };
}

// Top Metadata Card (Block 1: Thông tin chung + Block 2: Thông tin phê duyệt)
function buildTopMetaCard(info, approval = null) {
  return {
    type: 'FRAME',
    name: 'Card: Thông tin trạng thái & Phê duyệt',
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    itemSpacing: 14,
    children: [
      {
        type: 'FRAME',
        name: 'Box: Thông tin chung',
        layoutGrow: 1,
        layoutMode: 'VERTICAL',
        padding: 14,
        cornerRadius: 8,
        fill: TOKENS.white,
        stroke: TOKENS.borderLight,
        strokeWeight: 1,
        itemSpacing: 10,
        children: [
          {
            type: 'FRAME',
            name: 'Box Header',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: '📌 THÔNG TIN CHUNG', fontSize: 11, fontWeight: 700, fill: TOKENS.ink }
            ]
          },
          {
            type: 'FRAME',
            name: 'Row 1',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildMetaCol('Mã đối tác', info.partnerCode, 160),
              buildMetaCol('Loại phí', info.feeType, 160),
              buildMetaCol('Trạng thái vận hành', info.opStatus, 150, info.opStatusBadge),
              buildMetaCol('Trạng thái CSDL', info.dbStatus, 150, info.dbStatusBadge)
            ]
          },
          {
            type: 'FRAME',
            name: 'Row 2',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildMetaCol('Ngày bắt đầu áp dụng', info.startDate, 160),
              buildMetaCol('Ngày kết thúc áp dụng', info.endDate, 160),
              buildMetaCol('Thời gian tạo', info.createdAt, 150),
              buildMetaCol('Người tạo', info.createdBy, 150)
            ]
          }
        ]
      },
      ...(approval ? [{
        type: 'FRAME',
        name: 'Box: Thông tin phê duyệt',
        width: 380,
        layoutMode: 'VERTICAL',
        padding: 14,
        cornerRadius: 8,
        fill: '#F0F9FF',
        stroke: '#BAE6FD',
        strokeWeight: 1,
        itemSpacing: 10,
        children: [
          {
            type: 'FRAME',
            name: 'Approval Header',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: '📋 THÔNG TIN PHÊ DUYỆT', fontSize: 11, fontWeight: 700, fill: '#0369A1' }
            ]
          },
          {
            type: 'FRAME',
            name: 'App Row 1',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildMetaCol('Mã yêu cầu', approval.reqCode, 180),
              buildMetaCol('Trạng thái duyệt', approval.reqStatus, 160, approval.reqStatusBadge)
            ]
          },
          {
            type: 'FRAME',
            name: 'App Row 2',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildMetaCol('Người gửi duyệt', approval.sender, 180),
              buildMetaCol('Người duyệt', approval.approver, 160)
            ]
          },
          {
            type: 'FRAME',
            name: 'App Row 3',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildMetaCol('Thời gian gửi', approval.sentAt, 180),
              buildMetaCol('Thời gian duyệt', approval.approvedAt || '—', 160)
            ]
          }
        ]
      }] : [])
    ]
  };
}

// Banner helper
function buildStatusBanner(icon, text, bgColor, strokeColor, textColor, subText = '') {
  return {
    type: 'FRAME',
    name: 'Status Banner',
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 16, right: 16, top: 10, bottom: 10 },
    cornerRadius: 8,
    fill: bgColor,
    stroke: strokeColor,
    strokeWeight: 1,
    itemSpacing: 10,
    children: [
      { type: 'TEXT', characters: icon, fontSize: 14 },
      {
        type: 'FRAME',
        name: 'Banner Text Box',
        layoutMode: 'VERTICAL',
        itemSpacing: 2,
        children: [
          { type: 'TEXT', characters: text, fontSize: 11, fontWeight: 600, fill: textColor },
          ...(subText ? [{ type: 'TEXT', characters: subText, fontSize: 11, fontWeight: 400, fill: textColor }] : [])
        ]
      }
    ]
  };
}

// Read-only Field Box
function buildReadOnlyField(label, value, width = 360) {
  return {
    type: 'FRAME',
    name: `Field: ${label}`,
    width,
    layoutMode: 'VERTICAL',
    itemSpacing: 3,
    children: [
      { type: 'TEXT', characters: label, fontSize: 10, fontWeight: 600, fill: TOKENS.inkMuted },
      {
        type: 'FRAME',
        name: 'Value Box',
        layoutAlign: 'STRETCH',
        height: 28,
        cornerRadius: 4,
        fill: '#F8FAFC',
        stroke: TOKENS.border,
        strokeWeight: 1,
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 10, right: 10 },
        children: [
          { type: 'TEXT', characters: value, fontSize: 11, fontWeight: 500, fill: TOKENS.ink }
        ]
      }
    ]
  };
}

// Tier Row Helper for Detail
function buildDetailTierRow(range, rate, min, max, bg = TOKENS.white) {
  return {
    type: 'FRAME',
    name: `Tier Row`,
    layoutAlign: 'STRETCH',
    height: 32,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 12, right: 12 },
    fill: bg,
    stroke: TOKENS.borderLight,
    strokeWeight: 1,
    children: [
      { type: 'FRAME', name: 'Col 1', width: 220, children: [{ type: 'TEXT', characters: range, fontSize: 11, fill: TOKENS.ink }] },
      { type: 'FRAME', name: 'Col 2', width: 140, children: [{ type: 'TEXT', characters: rate, fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary }] },
      { type: 'FRAME', name: 'Col 3', width: 140, children: [{ type: 'TEXT', characters: min, fontSize: 11, fill: TOKENS.ink }] },
      { type: 'FRAME', name: 'Col 4', width: 140, children: [{ type: 'TEXT', characters: max, fontSize: 11, fill: TOKENS.ink }] }
    ]
  };
}

// Brand sub-card for CTT Detail
function buildBrandCardCTT(name, type, feeText) {
  return {
    type: 'FRAME',
    name: `Brand: ${name}`,
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: 10,
    cornerRadius: 6,
    fill: TOKENS.white,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 8,
    children: [
      {
        type: 'FRAME',
        name: 'Brand Header',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: `Thương hiệu thẻ: ${name}`, fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
          { type: 'TEXT', characters: `Hình thức: ${type}`, fontSize: 11, fontWeight: 500, fill: TOKENS.bluePrimary }
        ]
      },
      {
        type: 'FRAME',
        name: 'Fee Detail Box',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: feeText, fontSize: 11, fill: '#334155' }
        ]
      }
    ]
  };
}

// Brand JCB Bậc thang sub-card for CTT Detail
function buildJcbTierCardCTT() {
  return {
    type: 'FRAME',
    name: 'Brand: JCB (Bậc thang)',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: 10,
    cornerRadius: 6,
    fill: TOKENS.white,
    stroke: TOKENS.blueBorder,
    strokeWeight: 1,
    itemSpacing: 8,
    children: [
      {
        type: 'FRAME',
        name: 'Brand Header',
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: 'Thương hiệu thẻ: JCB', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
          { type: 'TEXT', characters: 'Hình thức: Bậc thang theo Tổng GTGD', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary }
        ]
      },
      {
        type: 'FRAME',
        name: 'Tier Table',
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        cornerRadius: 4,
        stroke: TOKENS.borderLight,
        strokeWeight: 1,
        children: [
          {
            type: 'FRAME',
            name: 'Table Header',
            layoutAlign: 'STRETCH',
            height: 28,
            fill: '#F1F5F9',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            padding: { left: 12, right: 12 },
            children: [
              { type: 'FRAME', name: 'Th 1', width: 220, children: [{ type: 'TEXT', characters: 'Tổng GTGD / Tháng', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] },
              { type: 'FRAME', name: 'Th 2', width: 140, children: [{ type: 'TEXT', characters: 'Mức phí tỷ lệ (%)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] },
              { type: 'FRAME', name: 'Th 3', width: 140, children: [{ type: 'TEXT', characters: 'Mức phí tối thiểu (đ)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] },
              { type: 'FRAME', name: 'Th 4', width: 140, children: [{ type: 'TEXT', characters: 'Mức phí tối đa (đ)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] }
            ]
          },
          buildDetailTierRow('Bậc 1: 0 - 50.000.000 đ', '2.0 %', '2.000 đ', '50.000 đ', '#FFFFFF'),
          buildDetailTierRow('Bậc 2: 50.000.001 - 200.000.000 đ', '1.8 %', '2.000 đ', '50.000 đ', '#F8FAFC'),
          buildDetailTierRow('Bậc 3: > 200.000.000 đ', '1.5 %', '2.000 đ', '50.000 đ', '#FFFFFF')
        ]
      }
    ]
  };
}

// CTT Form Content Block
function buildFormContentCTT() {
  return [
    {
      type: 'FRAME',
      name: 'Khối 1: Thông tin chung (CTT)',
      layoutAlign: 'STRETCH',
      layoutMode: 'VERTICAL',
      padding: 14,
      cornerRadius: 8,
      fill: TOKENS.white,
      stroke: TOKENS.borderLight,
      strokeWeight: 1,
      itemSpacing: 10,
      children: [
        { type: 'TEXT', characters: 'Thông tin chung', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
        {
          type: 'FRAME',
          name: 'Row 1',
          layoutAlign: 'STRETCH',
          layoutMode: 'HORIZONTAL',
          itemSpacing: 16,
          children: [
            buildReadOnlyField('Mã đối tác', 'EP_000_MC_CTT - Cổng thanh toán Quốc tế Napas', 540),
            buildReadOnlyField('Tên đối tác', 'Công ty CP Thanh toán Quốc gia Napas', 540)
          ]
        },
        {
          type: 'FRAME',
          name: 'Row 2',
          layoutAlign: 'STRETCH',
          layoutMode: 'HORIZONTAL',
          itemSpacing: 16,
          children: [
            buildReadOnlyField('Loại cấu hình phí', 'Phí thanh toán', 540),
            buildReadOnlyField('Thời gian áp dụng phí', '01/11/2026 00:00:00 - Vô thời hạn', 540)
          ]
        },
        {
          type: 'FRAME',
          name: 'Row 3',
          layoutAlign: 'STRETCH',
          layoutMode: 'HORIZONTAL',
          itemSpacing: 16,
          children: [
            buildReadOnlyField('Mã MCC (Merchant Category Code)', '5411 - Grocery Stores, Supermarkets', 540),
            buildReadOnlyField('Mã dịch vụ thanh toán', 'ALL - Tất cả dịch vụ thanh toán', 540)
          ]
        }
      ]
    },
    {
      type: 'FRAME',
      name: 'Khối 2: Thông tin phí theo từng loại GD (CTT)',
      layoutAlign: 'STRETCH',
      layoutMode: 'VERTICAL',
      padding: 14,
      cornerRadius: 8,
      fill: TOKENS.white,
      stroke: TOKENS.borderLight,
      strokeWeight: 1,
      itemSpacing: 12,
      children: [
        {
          type: 'FRAME',
          name: 'Header Row',
          layoutAlign: 'STRETCH',
          layoutMode: 'HORIZONTAL',
          primaryAxisAlignItems: 'SPACE_BETWEEN',
          counterAxisAlignItems: 'CENTER',
          children: [
            { type: 'TEXT', characters: 'Thông tin phí chi tiết', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
            { type: 'TEXT', characters: '◉ Phân chia theo từng loại giao dịch (Thanh toán & Hoàn trả)', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary }
          ]
        },
        // Box Thanh toán
        {
          type: 'FRAME',
          name: 'Subcard: Giao dịch Thanh toán',
          layoutAlign: 'STRETCH',
          layoutMode: 'VERTICAL',
          padding: 12,
          cornerRadius: 6,
          fill: '#F8FAFC',
          stroke: TOKENS.border,
          strokeWeight: 1,
          itemSpacing: 8,
          children: [
            { type: 'TEXT', characters: '1. GIAO DỊCH THANH TOÁN (Theo từng thương hiệu thẻ)', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
            buildBrandCardCTT('Visa', 'Cố định theo GD', 'Mức phí tỷ lệ: 1.2% | Phí tối thiểu: 2.000 đ | Phí tối đa: 50.000 đ'),
            buildBrandCardCTT('Mastercard', 'Cố định theo GD', 'Mức phí tỷ lệ: 1.5% | Phí tối thiểu: 2.500 đ | Phí tối đa: 60.000 đ'),
            buildJcbTierCardCTT()
          ]
        },
        // Box Hoàn trả
        {
          type: 'FRAME',
          name: 'Subcard: Giao dịch Hoàn trả',
          layoutAlign: 'STRETCH',
          layoutMode: 'VERTICAL',
          padding: 12,
          cornerRadius: 6,
          fill: '#F8FAFC',
          stroke: TOKENS.border,
          strokeWeight: 1,
          itemSpacing: 8,
          children: [
            { type: 'TEXT', characters: '2. GIAO DỊCH HOÀN TRẢ', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
            {
              type: 'FRAME',
              name: 'Refund Rows',
              layoutAlign: 'STRETCH',
              layoutMode: 'HORIZONTAL',
              itemSpacing: 16,
              children: [
                buildReadOnlyField('Cách tính ngày áp dụng phí trên giao dịch', 'Ngày phát sinh giao dịch gốc', 360),
                buildReadOnlyField('Hình thức thu phí', '1 bậc phí (Cố định theo GD)', 240),
                buildReadOnlyField('Mức phí cố định', '1.500 đ / GD', 200)
              ]
            }
          ]
        }
      ]
    }
  ];
}

// QRGW Form Content Block
function buildFormContentQR() {
  return [
    {
      type: 'FRAME',
      name: 'Khối 1: Thông tin chung (QRGW)',
      layoutAlign: 'STRETCH',
      layoutMode: 'VERTICAL',
      padding: 14,
      cornerRadius: 8,
      fill: TOKENS.white,
      stroke: TOKENS.borderLight,
      strokeWeight: 1,
      itemSpacing: 10,
      children: [
        { type: 'TEXT', characters: 'Thông tin chung', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
        {
          type: 'FRAME',
          name: 'Row 1',
          layoutAlign: 'STRETCH',
          layoutMode: 'HORIZONTAL',
          itemSpacing: 16,
          children: [
            buildReadOnlyField('Mã đối tác', 'EP_000_MC_QR - Cổng thanh toán VietQR Napas', 540),
            buildReadOnlyField('Tên đối tác', 'Công ty CP Dịch vụ Cổng QR Quốc gia', 540)
          ]
        },
        {
          type: 'FRAME',
          name: 'Row 2',
          layoutAlign: 'STRETCH',
          layoutMode: 'HORIZONTAL',
          itemSpacing: 16,
          children: [
            buildReadOnlyField('Loại cấu hình phí', 'Phí thanh toán', 350),
            buildReadOnlyField('Loại QR *', 'QR tĩnh, QR động (Áp dụng cả 2 loại)', 350),
            buildReadOnlyField('Thời gian áp dụng phí', '01/11/2026 00:00:00 - Vô thời hạn', 350)
          ]
        }
      ]
    },
    {
      type: 'FRAME',
      name: 'Khối 2: Thông tin phí theo từng loại GD (QRGW)',
      layoutAlign: 'STRETCH',
      layoutMode: 'VERTICAL',
      padding: 14,
      cornerRadius: 8,
      fill: TOKENS.white,
      stroke: TOKENS.borderLight,
      strokeWeight: 1,
      itemSpacing: 12,
      children: [
        {
          type: 'FRAME',
          name: 'Header Row',
          layoutAlign: 'STRETCH',
          layoutMode: 'HORIZONTAL',
          primaryAxisAlignItems: 'SPACE_BETWEEN',
          counterAxisAlignItems: 'CENTER',
          children: [
            { type: 'TEXT', characters: 'Thông tin phí chi tiết', fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
            { type: 'TEXT', characters: '◉ Phân chia theo từng loại giao dịch (Thanh toán & Hoàn trả)', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary }
          ]
        },
        // Box Thanh toán (Bậc thang QR)
        {
          type: 'FRAME',
          name: 'Subcard: Giao dịch Thanh toán (QR Bậc thang)',
          layoutAlign: 'STRETCH',
          layoutMode: 'VERTICAL',
          padding: 12,
          cornerRadius: 6,
          fill: '#F8FAFC',
          stroke: TOKENS.border,
          strokeWeight: 1,
          itemSpacing: 8,
          children: [
            {
              type: 'FRAME',
              name: 'Sub Header',
              layoutAlign: 'STRETCH',
              layoutMode: 'HORIZONTAL',
              primaryAxisAlignItems: 'SPACE_BETWEEN',
              children: [
                { type: 'TEXT', characters: '1. GIAO DỊCH THANH TOÁN (Áp dụng QR tĩnh & QR động)', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
                { type: 'TEXT', characters: 'Hình thức: Bậc thang theo Tổng GTGD', fontSize: 11, fontWeight: 600, fill: TOKENS.bluePrimary }
              ]
            },
            {
              type: 'FRAME',
              name: 'QR Tier Table',
              layoutAlign: 'STRETCH',
              layoutMode: 'VERTICAL',
              cornerRadius: 4,
              stroke: TOKENS.borderLight,
              strokeWeight: 1,
              children: [
                {
                  type: 'FRAME',
                  name: 'Table Header',
                  layoutAlign: 'STRETCH',
                  height: 28,
                  fill: '#F1F5F9',
                  layoutMode: 'HORIZONTAL',
                  counterAxisAlignItems: 'CENTER',
                  padding: { left: 12, right: 12 },
                  children: [
                    { type: 'FRAME', name: 'Th 1', width: 220, children: [{ type: 'TEXT', characters: 'Tổng GTGD / Tháng', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] },
                    { type: 'FRAME', name: 'Th 2', width: 140, children: [{ type: 'TEXT', characters: 'Mức phí tỷ lệ (%)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] },
                    { type: 'FRAME', name: 'Th 3', width: 140, children: [{ type: 'TEXT', characters: 'Mức phí tối thiểu (đ)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] },
                    { type: 'FRAME', name: 'Th 4', width: 140, children: [{ type: 'TEXT', characters: 'Mức phí tối đa (đ)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] }
                  ]
                },
                buildDetailTierRow('Bậc 1: 0 - 20.000.000 đ', '0.8 %', '1.000 đ', '20.000 đ', '#FFFFFF'),
                buildDetailTierRow('Bậc 2: 20.000.001 - 100.000.000 đ', '0.6 %', '1.000 đ', '20.000 đ', '#F8FAFC'),
                buildDetailTierRow('Bậc 3: > 100.000.000 đ', '0.4 %', '1.000 đ', '20.000 đ', '#FFFFFF')
              ]
            }
          ]
        },
        // Box Hoàn trả
        {
          type: 'FRAME',
          name: 'Subcard: Giao dịch Hoàn trả',
          layoutAlign: 'STRETCH',
          layoutMode: 'VERTICAL',
          padding: 12,
          cornerRadius: 6,
          fill: '#F8FAFC',
          stroke: TOKENS.border,
          strokeWeight: 1,
          itemSpacing: 8,
          children: [
            { type: 'TEXT', characters: '2. GIAO DỊCH HOÀN TRẢ', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
            {
              type: 'FRAME',
              name: 'Refund Rows',
              layoutAlign: 'STRETCH',
              layoutMode: 'HORIZONTAL',
              itemSpacing: 16,
              children: [
                buildReadOnlyField('Cách tính ngày áp dụng phí trên giao dịch', 'Ngày phát sinh giao dịch gốc', 360),
                buildReadOnlyField('Hình thức thu phí', '1 bậc phí (Cố định theo GD)', 240),
                buildReadOnlyField('Mức phí cố định', '1.000 đ / GD', 200)
              ]
            }
          ]
        }
      ]
    }
  ];
}

// Action Button Bar Helper (Header)
function buildActionBtn(label, type = 'secondary', icon = '') {
  let fill = '#FFFFFF';
  let stroke = TOKENS.border;
  let textColor = TOKENS.ink;
  let fontWeight = 600;

  if (type === 'primary') {
    fill = TOKENS.bluePrimary;
    stroke = TOKENS.bluePrimary;
    textColor = TOKENS.white;
  } else if (type === 'danger') {
    fill = '#FFFFFF';
    stroke = TOKENS.red;
    textColor = TOKENS.red;
  } else if (type === 'success') {
    fill = TOKENS.green;
    stroke = TOKENS.green;
    textColor = TOKENS.white;
  }

  return {
    type: 'FRAME',
    name: `Btn: ${label}`,
    height: 32,
    cornerRadius: 6,
    fill,
    stroke,
    strokeWeight: 1,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 14, right: 14 },
    itemSpacing: 6,
    children: [
      ...(icon ? [{ type: 'TEXT', characters: icon, fontSize: 11, fill: textColor }] : []),
      { type: 'TEXT', characters: label, fontSize: 11, fontWeight, fill: textColor }
    ]
  };
}

// Slide-Over Drawer for Checker
function buildApprovalDrawer(reqCode, product = 'CTT') {
  return {
    type: 'FRAME',
    name: 'Approval Slide-over Drawer',
    x: 960,
    y: 0,
    width: 480,
    height: 1080,
    fill: TOKENS.white,
    stroke: TOKENS.border,
    strokeWeight: 1,
    layoutMode: 'VERTICAL',
    children: [
      // Drawer Header
      {
        type: 'FRAME',
        name: 'Drawer Header',
        height: 56,
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 16, right: 16 },
        fill: TOKENS.bluePrimary,
        children: [
          { type: 'TEXT', characters: `[Duyệt] Cấu hình phí: ${reqCode}`, fontSize: 13, fontWeight: 700, fill: TOKENS.white },
          { type: 'TEXT', characters: '✕', fontSize: 16, fontWeight: 600, fill: TOKENS.white }
        ]
      },
      // Drawer Subheader Meta
      {
        type: 'FRAME',
        name: 'Drawer Subheader Meta',
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        padding: 12,
        fill: '#F8FAFC',
        stroke: TOKENS.borderLight,
        strokeWeight: 1,
        itemSpacing: 6,
        children: [
          {
            type: 'FRAME',
            name: 'Meta Row 1',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            children: [
              { type: 'TEXT', characters: `Mã yêu cầu: ${reqCode}`, fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
              { type: 'TEXT', characters: 'Loại yêu cầu: Tạo mới cấu hình', fontSize: 10, fill: TOKENS.inkMuted }
            ]
          },
          {
            type: 'FRAME',
            name: 'Meta Row 2',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            children: [
              { type: 'TEXT', characters: 'Người gửi: duongnta (Maker)', fontSize: 10, fill: TOKENS.inkMuted },
              {
                type: 'FRAME',
                name: 'Pending Badge',
                padding: { left: 6, right: 6, top: 2, bottom: 2 },
                cornerRadius: 4,
                fill: '#FEF3C7',
                children: [{ type: 'TEXT', characters: 'PENDING', fontSize: 9, fontWeight: 700, fill: '#B45309' }]
              }
            ]
          }
        ]
      },
      // Drawer Body (Diff Comparison Table)
      {
        type: 'FRAME',
        name: 'Drawer Body Content',
        layoutGrow: 1,
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        padding: 14,
        itemSpacing: 14,
        children: [
          {
            type: 'FRAME',
            name: 'Diff Section Header',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: 'ĐỐI CHIẾU THÔNG TIN CẤU HÌNH', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
              { type: 'TEXT', characters: 'Bản ghi tạo mới', fontSize: 10, fill: TOKENS.bluePrimary }
            ]
          },
          // Comparison Table
          {
            type: 'FRAME',
            name: 'Comparison Table',
            layoutAlign: 'STRETCH',
            layoutMode: 'VERTICAL',
            cornerRadius: 4,
            stroke: TOKENS.border,
            strokeWeight: 1,
            children: [
              // Th
              {
                type: 'FRAME',
                name: 'Diff Header',
                height: 28,
                fill: '#F1F5F9',
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 8, right: 8 },
                children: [
                  { type: 'FRAME', name: 'Th 1', width: 140, children: [{ type: 'TEXT', characters: 'Thông tin cấu hình', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] },
                  { type: 'FRAME', name: 'Th 2', width: 130, children: [{ type: 'TEXT', characters: 'Giá trị Cũ', fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted }] },
                  { type: 'FRAME', name: 'Th 3', width: 160, children: [{ type: 'TEXT', characters: 'Giá trị Mới', fontSize: 10, fontWeight: 700, fill: TOKENS.bluePrimary }] }
                ]
              },
              buildDiffRow('Ngày bắt đầu áp dụng', '—', '01/11/2026 00:00:00'),
              buildDiffRow('Loại cấu hình phí', '—', 'Phí thanh toán'),
              ...(product === 'CTT' ? [
                buildDiffRow('Mã MCC', '—', '5411 (Grocery)'),
                buildDiffRow('Thẻ Visa / MC', '—', '1.2% / 1.5% (Cố định)'),
                buildDiffRow('Thẻ JCB', '—', 'Bậc thang 3 mức (1.5% - 2.0%)')
              ] : [
                buildDiffRow('Loại QR', '—', 'QR tĩnh & QR động'),
                buildDiffRow('Bậc thang GTGD', '—', '3 bậc (0.4% - 0.8%)')
              ]),
              buildDiffRow('Phí hoàn trả', '—', '1.000 đ (Ngày GD gốc)')
            ]
          },
          // Rejection reason input box
          {
            type: 'FRAME',
            name: 'Rejection Reason Box',
            layoutAlign: 'STRETCH',
            layoutMode: 'VERTICAL',
            itemSpacing: 6,
            children: [
              {
                type: 'FRAME',
                name: 'Label Box',
                layoutMode: 'HORIZONTAL',
                children: [
                  { type: 'TEXT', characters: '* Nhập lý do (Bắt buộc khi từ chối):', fontSize: 10, fontWeight: 600, fill: TOKENS.ink },
                  { type: 'TEXT', characters: ' *', fontSize: 10, fontWeight: 700, fill: TOKENS.red }
                ]
              },
              {
                type: 'FRAME',
                name: 'Textarea Box',
                layoutAlign: 'STRETCH',
                height: 70,
                cornerRadius: 6,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                padding: 8,
                children: [
                  { type: 'TEXT', characters: 'Nhập nội dung phản hồi hoặc lý do từ chối nếu không duyệt...', fontSize: 10, fill: TOKENS.inkLight }
                ]
              }
            ]
          }
        ]
      },
      // Drawer Footer Actions
      {
        type: 'FRAME',
        name: 'Drawer Footer Actions',
        height: 64,
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 16, right: 16 },
        itemSpacing: 16,
        stroke: TOKENS.borderLight,
        strokeWeight: 1,
        fill: '#F8FAFC',
        children: [
          {
            type: 'FRAME',
            name: 'Btn: Từ chối',
            width: 180,
            height: 38,
            cornerRadius: 6,
            fill: TOKENS.red,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '✕  Từ chối', fontSize: 12, fontWeight: 700, fill: TOKENS.white }]
          },
          {
            type: 'FRAME',
            name: 'Btn: Phê duyệt',
            width: 180,
            height: 38,
            cornerRadius: 6,
            fill: TOKENS.green,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '✓  Phê duyệt', fontSize: 12, fontWeight: 700, fill: TOKENS.white }]
          }
        ]
      }
    ]
  };
}

function buildDiffRow(field, oldVal, newVal) {
  return {
    type: 'FRAME',
    name: `Diff: ${field}`,
    layoutAlign: 'STRETCH',
    height: 30,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 8, right: 8 },
    stroke: TOKENS.borderLight,
    strokeWeight: 1,
    fill: TOKENS.white,
    children: [
      { type: 'FRAME', name: 'C1', width: 140, children: [{ type: 'TEXT', characters: field, fontSize: 10, fill: TOKENS.inkMuted }] },
      { type: 'FRAME', name: 'C2', width: 130, children: [{ type: 'TEXT', characters: oldVal, fontSize: 10, fill: '#64748B' }] },
      { type: 'FRAME', name: 'C3', width: 160, children: [{ type: 'TEXT', characters: newVal, fontSize: 10, fontWeight: 600, fill: '#0F172A' }] }
    ]
  };
}

// Full Screen Builder
export function buildDetailScreen({
  idName,
  title,
  breadcrumb,
  statusBadge,
  statusBanner,
  metaInfo,
  approvalInfo,
  actionButtons,
  product = 'CTT',
  isCheckerWithDrawer = false,
  x = 0,
  y = 2600
}) {
  const sidebar = buildSidebar(product);
  const topHeader = buildTopHeader();
  const formContent = product === 'CTT' ? buildFormContentCTT() : buildFormContentQR();

  const mainWrapper = {
    type: 'FRAME',
    name: 'Main Content Wrapper',
    layoutMode: 'VERTICAL',
    width: 1210,
    height: 1080,
    fill: '#F8FAFC',
    children: [
      topHeader,
      {
        type: 'FRAME',
        name: 'Page Scroll Area',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        padding: { left: 24, right: 24, top: 14, bottom: 20 },
        itemSpacing: 12,
        children: [
          // Top Navigation Bar
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
                name: 'Title & Breadcrumb Box',
                layoutMode: 'VERTICAL',
                itemSpacing: 3,
                children: [
                  { type: 'TEXT', characters: breadcrumb, fontSize: 11, fill: TOKENS.inkMuted },
                  {
                    type: 'FRAME',
                    name: 'Title with Badge',
                    layoutMode: 'HORIZONTAL',
                    counterAxisAlignItems: 'CENTER',
                    itemSpacing: 10,
                    children: [
                      { type: 'TEXT', characters: title, fontSize: 15, fontWeight: 700, fill: TOKENS.ink },
                      {
                        type: 'FRAME',
                        name: 'Status Badge',
                        layoutMode: 'HORIZONTAL',
                        counterAxisAlignItems: 'CENTER',
                        itemSpacing: 6,
                        padding: { left: 8, right: 8, top: 3, bottom: 3 },
                        cornerRadius: 12,
                        fill: statusBadge.bg,
                        children: [
                          { type: 'FRAME', name: 'Dot', width: 6, height: 6, cornerRadius: 3, fill: statusBadge.dot },
                          { type: 'TEXT', characters: statusBadge.text, fontSize: 10, fontWeight: 600, fill: statusBadge.color }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                type: 'FRAME',
                name: 'Action Buttons Group',
                layoutMode: 'HORIZONTAL',
                itemSpacing: 8,
                children: actionButtons
              }
            ]
          },
          // Status Banner (if provided)
          ...(statusBanner ? [statusBanner] : []),
          // Top Meta Card (Thông tin chung + Thông tin phê duyệt)
          buildTopMetaCard(metaInfo, approvalInfo),
          // Actual Form Content
          ...formContent
        ]
      }
    ]
  };

  if (!isCheckerWithDrawer) {
    return {
      type: 'FRAME',
      name: idName,
      x,
      y,
      width: 1440,
      height: 1080,
      fill: '#F8FAFC',
      layoutMode: 'HORIZONTAL',
      children: [sidebar, mainWrapper]
    };
  } else {
    // Checker Screen with Slide-over Drawer
    return {
      type: 'FRAME',
      name: idName,
      x,
      y,
      width: 1440,
      height: 1080,
      fill: '#F8FAFC',
      layoutMode: 'NONE', // freeform inside screen so drawer sits on top
      children: [
        {
          type: 'FRAME',
          name: 'Base Screen Layout',
          x: 0,
          y: 0,
          width: 1440,
          height: 1080,
          layoutMode: 'HORIZONTAL',
          children: [sidebar, mainWrapper]
        },
        // Dimmed Overlay
        {
          type: 'FRAME',
          name: 'Dimmed Overlay',
          x: 0,
          y: 0,
          width: 1440,
          height: 1080,
          fill: '#00000033'
        },
        // Slide-over Drawer
        buildApprovalDrawer(approvalInfo ? approvalInfo.reqCode : 'YC_2026_10_31_0001', product)
      ]
    };
  }
}

// Script runner for creating all 14 detail screens
async function main() {
  console.log('--- STARTING GENERATION OF 14 DETAIL SCREENS (7 CTT + 7 QRGW) ---');

  // Step 1: Clean up old 7 detail frames in Row 3
  console.log('\n1. Cleaning up old Row 3 detail frames...');
  const oldIds = [
    '4101:13484', '4101:13638', '4102:13794', '4102:13948',
    '4102:14102', '4102:14256', '4102:14412'
  ];
  const deleteCode = `
    const ids = ${JSON.stringify(oldIds)};
    let count = 0;
    for (const id of ids) {
      try {
        await figma.delete(id);
        count++;
      } catch (e) {}
    }
    return { deleted: count };
  `;
  const delRes = await runFigmaCode(deleteCode, 'Page 2');
  console.log('Cleaned old frames:', delRes?.content?.[0]?.text);

  // Define the 7 CTT Detail Screens
  const cttConfigs = [
    {
      idName: 'SCR-CTT-DT-01: Chi tiết Phí CTT - DRAFT (Bản nháp)',
      title: 'SM_PN_DC_006 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác CTT  /  Chi tiết cấu hình',
      statusBadge: { text: 'Bản nháp', bg: '#F1F5F9', color: '#475569', dot: '#64748B' },
      statusBanner: buildStatusBanner('📝', 'Bản ghi đang ở trạng thái BẢN NHÁP.', '#F8FAFC', TOKENS.border, TOKENS.ink, 'Cấu hình chưa gửi duyệt. Maker có thể tiếp tục chỉnh sửa hoặc gửi phê duyệt.'),
      metaInfo: {
        partnerCode: 'EP_000_MC_CTT',
        feeType: 'Phí thanh toán',
        opStatus: 'Chưa áp dụng',
        opStatusBadge: { bg: '#F1F5F9', text: '#475569' },
        dbStatus: 'DRAFT',
        dbStatusBadge: { bg: '#F1F5F9', text: '#475569' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 14:15:00',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: null,
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Xóa nháp', 'danger', '🗑'),
        buildActionBtn('Chỉnh sửa', 'secondary', '✏️'),
        buildActionBtn('Gửi phê duyệt', 'primary', '🚀')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: -1862,
      y: 2600
    },
    {
      idName: 'SCR-CTT-DT-02A: Chi tiết Phí CTT - PENDING (Maker View)',
      title: 'SM_PN_DC_006 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác CTT  /  Chi tiết cấu hình',
      statusBadge: { text: 'Chờ phê duyệt', bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
      statusBanner: buildStatusBanner('⏳', 'Yêu cầu tạo mới cấu hình đang CHỜ PHÊ DUYỆT bởi cấp quản lý (Checker).', '#FFFBEB', '#FDE68A', '#92400E', 'Người tạo (Maker) có thể rút lại yêu cầu nếu cần cập nhật lại thông tin.'),
      metaInfo: {
        partnerCode: 'EP_000_MC_CTT',
        feeType: 'Phí thanh toán',
        opStatus: 'Chờ áp dụng',
        opStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        dbStatus: 'PENDING',
        dbStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:30:12',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0001',
        reqStatus: 'PENDING',
        reqStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        sender: 'duongnta (Maker)',
        approver: 'Chờ duyệt (Checker)',
        sentAt: '31/10/2026 15:30:12',
        approvedAt: '—'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Rút yêu cầu', 'secondary', '↩')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: -322,
      y: 2600
    },
    {
      idName: 'SCR-CTT-DT-02B: Chi tiết Phí CTT - PENDING (Checker View - Drawer Phê duyệt)',
      title: 'SM_PN_DC_006 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác CTT  /  Phê duyệt cấu hình',
      statusBadge: { text: 'Chờ phê duyệt', bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
      statusBanner: buildStatusBanner('🔍', 'Màn hình thẩm định dành cho CHECKER kèm ngăn kéo (Drawer) đối chiếu thông tin và phê duyệt.', '#EFF6FF', '#BFDBFE', '#1E40AF'),
      metaInfo: {
        partnerCode: 'EP_000_MC_CTT',
        feeType: 'Phí thanh toán',
        opStatus: 'Chờ áp dụng',
        opStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        dbStatus: 'PENDING',
        dbStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:30:12',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0001',
        reqStatus: 'PENDING',
        reqStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        sender: 'duongnta (Maker)',
        approver: 'checker_01',
        sentAt: '31/10/2026 15:30:12',
        approvedAt: '—'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Mở ngăn duyệt 📋', 'primary')
      ],
      product: 'CTT',
      isCheckerWithDrawer: true,
      x: 1218,
      y: 2600
    },
    {
      idName: 'SCR-CTT-DT-03: Chi tiết Phí CTT - READY (Chờ hiệu lực)',
      title: 'SM_PN_DC_006 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác CTT  /  Chi tiết cấu hình',
      statusBadge: { text: 'Chờ hiệu lực', bg: '#E0F2FE', color: '#0284C7', dot: '#0EA5E9' },
      statusBanner: buildStatusBanner('ℹ️', 'Cấu hình đã được PHÊ DUYỆT thành công. Sẽ tự động có hiệu lực từ 00:00:00 01/12/2026.', '#F0F9FF', '#BAE6FD', '#0369A1', 'Đã duyệt bởi checker_01 vào lúc 09:15:00 01/11/2026.'),
      metaInfo: {
        partnerCode: 'EP_000_MC_CTT',
        feeType: 'Phí thanh toán',
        opStatus: 'Chờ hiệu lực',
        opStatusBadge: { bg: '#E0F2FE', text: '#0284C7' },
        dbStatus: 'APPROVED',
        dbStatusBadge: { bg: '#E0F2FE', text: '#0284C7' },
        startDate: '01/12/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:30:12',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0001',
        reqStatus: 'APPROVED',
        reqStatusBadge: { bg: '#DCFCE7', text: '#15803D' },
        sender: 'duongnta',
        approver: 'checker_01',
        sentAt: '31/10/2026 15:30:12',
        approvedAt: '01/11/2026 09:15:00'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Sao chép cấu hình', 'secondary', '⎘'),
        buildActionBtn('Cập nhật thông tin', 'primary', '✎')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: 2758,
      y: 2600
    },
    {
      idName: 'SCR-CTT-DT-04: Chi tiết Phí CTT - ACTIVE (Đang hoạt động)',
      title: 'SM_PN_DC_006 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác CTT  /  Chi tiết cấu hình',
      statusBadge: { text: 'Đang hoạt động', bg: '#DCFCE7', color: '#15803D', dot: '#16A34A' },
      statusBanner: buildStatusBanner('🟢', 'Cấu hình đang HOẠT ĐỘNG và áp dụng tính phí giao dịch thực tế.', '#ECFDF5', '#A7F3D0', '#065F46', 'Áp dụng chính thức từ 00:00:00 01/11/2026.'),
      metaInfo: {
        partnerCode: 'EP_000_MC_CTT',
        feeType: 'Phí thanh toán',
        opStatus: 'HOẠT ĐỘNG',
        opStatusBadge: { bg: '#DCFCE7', text: '#15803D' },
        dbStatus: 'ACTIVE',
        dbStatusBadge: { bg: '#DCFCE7', text: '#15803D' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:30:12',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0001',
        reqStatus: 'APPROVED',
        reqStatusBadge: { bg: '#DCFCE7', text: '#15803D' },
        sender: 'duongnta',
        approver: 'checker_01',
        sentAt: '31/10/2026 15:30:12',
        approvedAt: '01/11/2026 00:00:00'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Sao chép cấu hình', 'secondary', '⎘'),
        buildActionBtn('Tạm dừng', 'danger', '⏸'),
        buildActionBtn('Tạo bản ghi sửa đổi', 'primary', '✏️')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: 4298,
      y: 2600
    },
    {
      idName: 'SCR-CTT-DT-05: Chi tiết Phí CTT - INACTIVE (Tạm dừng / Hết hiệu lực)',
      title: 'SM_PN_DC_006 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác CTT  /  Chi tiết cấu hình',
      statusBadge: { text: 'Hết hiệu lực', bg: '#F1F5F9', color: '#475569', dot: '#64748B' },
      statusBanner: buildStatusBanner('⚪', 'Cấu hình đã HẾT HIỆU LỰC vào lúc 23:59:59 31/10/2026. Đã ngưng áp dụng tính phí.', '#F8FAFC', TOKENS.border, TOKENS.ink),
      metaInfo: {
        partnerCode: 'EP_000_MC_CTT',
        feeType: 'Phí thanh toán',
        opStatus: 'HẾT HIỆU LỰC',
        opStatusBadge: { bg: '#F1F5F9', text: '#475569' },
        dbStatus: 'INACTIVE',
        dbStatusBadge: { bg: '#F1F5F9', text: '#475569' },
        startDate: '01/10/2025 00:00:00',
        endDate: '31/10/2026 23:59:59',
        createdAt: '30/09/2025 10:00:00',
        createdBy: 'admin_sys'
      },
      approvalInfo: null,
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Sao chép cấu hình', 'secondary', '⎘'),
        buildActionBtn('Yêu cầu kích hoạt lại', 'primary', '▶')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: 5838,
      y: 2600
    },
    {
      idName: 'SCR-CTT-DT-06: Chi tiết Phí CTT - REJECTED (Bị từ chối)',
      title: 'SM_PN_DC_006 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác CTT  /  Chi tiết cấu hình',
      statusBadge: { text: 'Bị từ chối', bg: '#FEE2E2', color: '#B91C1C', dot: '#DC2626' },
      statusBanner: buildStatusBanner('🔴', 'Yêu cầu cấu hình bị TỪ CHỐI bởi checker_01 lúc 16:45:00 31/10/2026.', '#FEF2F2', '#FECACA', '#991B1B', 'Lý do từ chối: "Mức phí thương hiệu JCB bậc 1 vượt quá hạn mức thỏa thuận khung đối tác (tối đa 1.8%). Vui lòng điều chỉnh lại biểu phí."'),
      metaInfo: {
        partnerCode: 'EP_000_MC_CTT',
        feeType: 'Phí thanh toán',
        opStatus: 'TỪ CHỐI',
        opStatusBadge: { bg: '#FEE2E2', text: '#B91C1C' },
        dbStatus: 'REJECTED',
        dbStatusBadge: { bg: '#FEE2E2', text: '#B91C1C' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:30:12',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0001',
        reqStatus: 'REJECTED',
        reqStatusBadge: { bg: '#FEE2E2', text: '#B91C1C' },
        sender: 'duongnta',
        approver: 'checker_01',
        sentAt: '31/10/2026 15:30:12',
        approvedAt: '31/10/2026 16:45:00'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Xóa yêu cầu', 'danger', '🗑'),
        buildActionBtn('Chỉnh sửa & Gửi duyệt lại', 'primary', '✏️')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: 7378,
      y: 2600
    }
  ];

  // Define the 7 QRGW Detail Screens
  const qrConfigs = [
    {
      idName: 'SCR-QR-DT-01: Chi tiết Phí QRGW - DRAFT (Bản nháp)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác QRGW  /  Chi tiết cấu hình',
      statusBadge: { text: 'Bản nháp', bg: '#F1F5F9', color: '#475569', dot: '#64748B' },
      statusBanner: buildStatusBanner('📝', 'Bản ghi đang ở trạng thái BẢN NHÁP.', '#F8FAFC', TOKENS.border, TOKENS.ink, 'Cấu hình chưa gửi duyệt. Maker có thể tiếp tục chỉnh sửa hoặc gửi phê duyệt.'),
      metaInfo: {
        partnerCode: 'EP_000_MC_QR',
        feeType: 'Phí thanh toán',
        opStatus: 'Chưa áp dụng',
        opStatusBadge: { bg: '#F1F5F9', text: '#475569' },
        dbStatus: 'DRAFT',
        dbStatusBadge: { bg: '#F1F5F9', text: '#475569' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 14:20:00',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: null,
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Xóa nháp', 'danger', '🗑'),
        buildActionBtn('Chỉnh sửa', 'secondary', '✏️'),
        buildActionBtn('Gửi phê duyệt', 'primary', '🚀')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 9580,
      y: 2600
    },
    {
      idName: 'SCR-QR-DT-02A: Chi tiết Phí QRGW - PENDING (Maker View)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác QRGW  /  Chi tiết cấu hình',
      statusBadge: { text: 'Chờ phê duyệt', bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
      statusBanner: buildStatusBanner('⏳', 'Yêu cầu tạo mới cấu hình QRGW đang CHỜ PHÊ DUYỆT bởi cấp quản lý (Checker).', '#FFFBEB', '#FDE68A', '#92400E', 'Người tạo (Maker) có thể rút lại yêu cầu nếu cần cập nhật lại thông tin.'),
      metaInfo: {
        partnerCode: 'EP_000_MC_QR',
        feeType: 'Phí thanh toán',
        opStatus: 'Chờ áp dụng',
        opStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        dbStatus: 'PENDING',
        dbStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:45:00',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0002',
        reqStatus: 'PENDING',
        reqStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        sender: 'duongnta (Maker)',
        approver: 'Chờ duyệt (Checker)',
        sentAt: '31/10/2026 15:45:00',
        approvedAt: '—'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Rút yêu cầu', 'secondary', '↩')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 11120,
      y: 2600
    },
    {
      idName: 'SCR-QR-DT-02B: Chi tiết Phí QRGW - PENDING (Checker View - Drawer Phê duyệt)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác QRGW  /  Phê duyệt cấu hình',
      statusBadge: { text: 'Chờ phê duyệt', bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
      statusBanner: buildStatusBanner('🔍', 'Màn hình thẩm định dành cho CHECKER kèm ngăn kéo (Drawer) đối chiếu thông tin và phê duyệt.', '#EFF6FF', '#BFDBFE', '#1E40AF'),
      metaInfo: {
        partnerCode: 'EP_000_MC_QR',
        feeType: 'Phí thanh toán',
        opStatus: 'Chờ áp dụng',
        opStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        dbStatus: 'PENDING',
        dbStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:45:00',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0002',
        reqStatus: 'PENDING',
        reqStatusBadge: { bg: '#FEF3C7', text: '#B45309' },
        sender: 'duongnta (Maker)',
        approver: 'checker_01',
        sentAt: '31/10/2026 15:45:00',
        approvedAt: '—'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Mở ngăn duyệt 📋', 'primary')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: true,
      x: 12660,
      y: 2600
    },
    {
      idName: 'SCR-QR-DT-03: Chi tiết Phí QRGW - READY (Chờ hiệu lực)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác QRGW  /  Chi tiết cấu hình',
      statusBadge: { text: 'Chờ hiệu lực', bg: '#E0F2FE', color: '#0284C7', dot: '#0EA5E9' },
      statusBanner: buildStatusBanner('ℹ️', 'Cấu hình QRGW đã được PHÊ DUYỆT thành công. Sẽ tự động kích hoạt vào lúc 00:00:00 01/12/2026.', '#F0F9FF', '#BAE6FD', '#0369A1', 'Đã duyệt bởi checker_01 vào lúc 10:00:00 01/11/2026.'),
      metaInfo: {
        partnerCode: 'EP_000_MC_QR',
        feeType: 'Phí thanh toán',
        opStatus: 'Chờ hiệu lực',
        opStatusBadge: { bg: '#E0F2FE', text: '#0284C7' },
        dbStatus: 'APPROVED',
        dbStatusBadge: { bg: '#E0F2FE', text: '#0284C7' },
        startDate: '01/12/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:45:00',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0002',
        reqStatus: 'APPROVED',
        reqStatusBadge: { bg: '#DCFCE7', text: '#15803D' },
        sender: 'duongnta',
        approver: 'checker_01',
        sentAt: '31/10/2026 15:45:00',
        approvedAt: '01/11/2026 10:00:00'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Sao chép cấu hình', 'secondary', '⎘'),
        buildActionBtn('Cập nhật thông tin', 'primary', '✎')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 14200,
      y: 2600
    },
    {
      idName: 'SCR-QR-DT-04: Chi tiết Phí QRGW - ACTIVE (Đang hoạt động)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác QRGW  /  Chi tiết cấu hình',
      statusBadge: { text: 'Đang hoạt động', bg: '#DCFCE7', color: '#15803D', dot: '#16A34A' },
      statusBanner: buildStatusBanner('🟢', 'Cấu hình đang HOẠT ĐỘNG và áp dụng tính phí giao dịch thực tế.', '#ECFDF5', '#A7F3D0', '#065F46', 'Áp dụng chính thức từ 00:00:00 01/11/2026.'),
      metaInfo: {
        partnerCode: 'EP_000_MC_QR',
        feeType: 'Phí thanh toán',
        opStatus: 'HOẠT ĐỘNG',
        opStatusBadge: { bg: '#DCFCE7', text: '#15803D' },
        dbStatus: 'ACTIVE',
        dbStatusBadge: { bg: '#DCFCE7', text: '#15803D' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:45:00',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0002',
        reqStatus: 'APPROVED',
        reqStatusBadge: { bg: '#DCFCE7', text: '#15803D' },
        sender: 'duongnta',
        approver: 'checker_01',
        sentAt: '31/10/2026 15:45:00',
        approvedAt: '01/11/2026 00:00:00'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Sao chép cấu hình', 'secondary', '⎘'),
        buildActionBtn('Tạm dừng', 'danger', '⏸'),
        buildActionBtn('Tạo bản ghi sửa đổi', 'primary', '✏️')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 15740,
      y: 2600
    },
    {
      idName: 'SCR-QR-DT-05: Chi tiết Phí QRGW - INACTIVE (Tạm dừng / Hết hiệu lực)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác QRGW  /  Chi tiết cấu hình',
      statusBadge: { text: 'Hết hiệu lực', bg: '#F1F5F9', color: '#475569', dot: '#64748B' },
      statusBanner: buildStatusBanner('⚪', 'Cấu hình đã HẾT HIỆU LỰC vào lúc 23:59:59 31/10/2026. Đã ngưng áp dụng tính phí.', '#F8FAFC', TOKENS.border, TOKENS.ink),
      metaInfo: {
        partnerCode: 'EP_000_MC_QR',
        feeType: 'Phí thanh toán',
        opStatus: 'HẾT HIỆU LỰC',
        opStatusBadge: { bg: '#F1F5F9', text: '#475569' },
        dbStatus: 'INACTIVE',
        dbStatusBadge: { bg: '#F1F5F9', text: '#475569' },
        startDate: '01/10/2025 00:00:00',
        endDate: '31/10/2026 23:59:59',
        createdAt: '30/09/2025 10:00:00',
        createdBy: 'admin_sys'
      },
      approvalInfo: null,
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Sao chép cấu hình', 'secondary', '⎘'),
        buildActionBtn('Yêu cầu kích hoạt lại', 'primary', '▶')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 17280,
      y: 2600
    },
    {
      idName: 'SCR-QR-DT-06: Chi tiết Phí QRGW - REJECTED (Bị từ chối)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí  /  Phí đối tác QRGW  /  Chi tiết cấu hình',
      statusBadge: { text: 'Bị từ chối', bg: '#FEE2E2', color: '#B91C1C', dot: '#DC2626' },
      statusBanner: buildStatusBanner('🔴', 'Yêu cầu cấu hình bị TỪ CHỐI bởi checker_01 lúc 17:00:00 31/10/2026.', '#FEF2F2', '#FECACA', '#991B1B', 'Lý do từ chối: "Mức phí hoàn trả 1.000đ chưa áp dụng đúng chính sách miễn phí hoàn trả cho QR động dưới 50.000đ. Vui lòng rà soát lại."'),
      metaInfo: {
        partnerCode: 'EP_000_MC_QR',
        feeType: 'Phí thanh toán',
        opStatus: 'TỪ CHỐI',
        opStatusBadge: { bg: '#FEE2E2', text: '#B91C1C' },
        dbStatus: 'REJECTED',
        dbStatusBadge: { bg: '#FEE2E2', text: '#B91C1C' },
        startDate: '01/11/2026 00:00:00',
        endDate: 'Vô thời hạn',
        createdAt: '31/10/2026 15:45:00',
        createdBy: 'duongnta (Maker)'
      },
      approvalInfo: {
        reqCode: 'YC_2026_10_31_0002',
        reqStatus: 'REJECTED',
        reqStatusBadge: { bg: '#FEE2E2', text: '#B91C1C' },
        sender: 'duongnta',
        approver: 'checker_01',
        sentAt: '31/10/2026 15:45:00',
        approvedAt: '31/10/2026 17:00:00'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Xóa yêu cầu', 'danger', '🗑'),
        buildActionBtn('Chỉnh sửa & Gửi duyệt lại', 'primary', '✏️')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 18820,
      y: 2600
    }
  ];

  const allConfigs = [...cttConfigs, ...qrConfigs];
  console.log(`\n2. Creating ${allConfigs.length} detail screens...`);

  for (let i = 0; i < allConfigs.length; i++) {
    const cfg = allConfigs[i];
    console.log(`[${i + 1}/${allConfigs.length}] Creating ${cfg.idName}...`);
    const spec = buildDetailScreen(cfg);
    const code = `
      const spec = ${JSON.stringify(spec)};
      const res = await figma.create(spec);
      return { ok: true, id: res.id, name: res.name, x: res.x, y: res.y };
    `;
    const res = await runFigmaCode(code, 'Page 2');
    const parsed = JSON.parse(res?.content?.[0]?.text);
    console.log(`Created:`, parsed?.result);
  }

  console.log('\n--- ALL 14 DETAIL SCREENS CREATED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
