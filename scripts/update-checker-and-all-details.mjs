import fs from 'node:fs';
import { runFigmaCode } from './figma-runner.mjs';
import { generateSpecQrCr04 } from './update-qr-screens-perfect.mjs';

const TOKENS = {
  ink: '#1E293B',
  inkMuted: '#64748B',
  inkLight: '#94A3B8',
  white: '#FFFFFF',
  bluePrimary: '#2563EB',
  blueLight: '#EFF6FF',
  blueHeaderBg: '#EEF2FF',
  blueBorder: '#BFDBFE',
  border: '#CBD5E1',
  borderLight: '#E2E8F0',
  cardBg: '#F8FAFC',
  red: '#DC2626',
  green: '#16A34A',
  amber: '#D97706',
  sky: '#0284C7'
};

// 1. Load CTT create screen blocks from scr-ctt-cr-04b-perfect.min.json
const specCTT = JSON.parse(fs.readFileSync('scripts/scr-ctt-cr-04b-perfect.min.json', 'utf8'));
const mainCTT = specCTT.children.find(c => c.name === 'Main Content Wrapper');
const pageAreaCTT = mainCTT.children.find(c => c.name === 'Page Content Area' || c.name === 'Page Scroll Area');

const rawTabsCTT = pageAreaCTT.children.find(c => c.name.includes('Tabs'));
const rawK1CTT = pageAreaCTT.children.find(c => c.name.includes('Khối 1'));
const rawK2CTT = pageAreaCTT.children.find(c => c.name.includes('Khối 2'));

// 2. Load QRGW create screen blocks from generateSpecQrCr04
const specQR = generateSpecQrCr04();
const mainQR = specQR.children.find(c => c.name === 'Main Content Wrapper');
const pageAreaQR = mainQR.children.find(c => c.name === 'Page Content Area' || c.name === 'Page Scroll Area');

const rawTabsQR = pageAreaQR.children.find(c => c.name.includes('Tabs'));
const rawK1QR = pageAreaQR.children.find(c => c.name.includes('Khối 1'));
const rawK2QR = pageAreaQR.children.find(c => c.name.includes('Khối 2'));

// Helper to disable all interactive elements in form blocks
function disableFormNode(node) {
  if (!node) return null;
  const clone = JSON.parse(JSON.stringify(node));

  function traverse(n) {
    if (n.type === 'TEXT' && (n.characters === 'Thông tin chung' || n.characters === '1. Thông tin chung' || n.characters === 'Khối 1: Thông tin chung')) {
      n.characters = 'Thông tin cấu hình phí';
    }
    if (n.name && n.name.includes('Thông tin chung')) {
      n.name = n.name.replace('Thông tin chung', 'Thông tin cấu hình phí');
    }

    if (n.name && (n.name.includes('Input') || n.name.includes('Dropdown') || n.name.includes('Value Box') || (n.name.includes('Box') && n.height === 28))) {
      n.fill = '#F8FAFC';
      n.stroke = '#CBD5E1';
      if (n.children && Array.isArray(n.children)) {
        for (const child of n.children) {
          if (child.type === 'TEXT') {
            if (child.characters === '▾' || child.characters === '📅') {
              child.fill = '#94A3B8';
            } else {
              child.fill = '#334155';
            }
          }
        }
      }
    }

    if (n.name && (n.name.includes('Btn Add') || n.name.includes('Btn Del') || n.name.includes('Thêm bậc') || n.name.includes('Xóa') || n.name.includes('Btn +') || n.name.includes('Btn –'))) {
      n.visible = false;
    }

    if (n.name && n.name.includes('Radio')) {
      if (n.children && Array.isArray(n.children)) {
        for (const child of n.children) {
          if (child.type === 'TEXT') {
            if (child.characters && child.characters.includes('◉')) {
              child.fill = '#2563EB';
            } else {
              child.fill = '#475569';
            }
          }
        }
      }
    }

    if (n.children && Array.isArray(n.children)) {
      for (const c of n.children) {
        traverse(c);
      }
    }
  }

  traverse(clone);
  return clone;
}

if (rawK1CTT && rawK1CTT.children && rawK1CTT.children[0]) {
  rawK1CTT.children[0].characters = 'Thông tin cấu hình phí';
}
if (rawK1QR && rawK1QR.children && rawK1QR.children[0]) {
  rawK1QR.children[0].characters = 'Thông tin cấu hình phí';
}

const disabledTabsCTT = disableFormNode(rawTabsCTT);
const disabledK1CTT = disableFormNode(rawK1CTT);
const disabledK2CTT = disableFormNode(rawK2CTT);

const disabledTabsQR = disableFormNode(rawTabsQR);
const disabledK1QR = disableFormNode(rawK1QR);
const disabledK2QR = disableFormNode(rawK2QR);

// Build Sidebar
function buildSidebar(activeTab = 'CTT', height = 1400) {
  return {
    type: 'FRAME',
    name: 'Sidebar',
    width: 230,
    height,
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

// Build Top Header
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

// Pair cell in THÔNG TIN CHUNG (matching user's exact uploaded image 2)
function buildChungPair(label, val, badge = null, buttonCapsule = null) {
  return {
    type: 'FRAME',
    name: `Pair: ${label}`,
    layoutGrow: 1,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    itemSpacing: 12,
    children: [
      { type: 'TEXT', characters: label, width: 140, fontSize: 11, fontWeight: 500, fill: '#475569' },
      badge ? {
        type: 'FRAME',
        name: 'Badge',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 8, right: 8, top: 2, bottom: 2 },
        cornerRadius: 12,
        fill: badge.bg,
        children: [
          { type: 'TEXT', characters: `● ${badge.text}`, fontSize: 10, fontWeight: 700, fill: badge.color }
        ]
      } : {
        type: 'TEXT', characters: val, fontSize: 11, fontWeight: 600, fill: '#1E293B'
      },
      ...(buttonCapsule ? [{
        type: 'FRAME',
        name: 'Btn: Thay đổi người PD',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 8, right: 8, top: 3, bottom: 3 },
        cornerRadius: 12,
        fill: '#64748B',
        itemSpacing: 4,
        children: [
          { type: 'TEXT', characters: '🔄', fontSize: 9, fill: TOKENS.white },
          { type: 'TEXT', characters: 'Thay đổi người PD', fontSize: 10, fontWeight: 500, fill: TOKENS.white }
        ]
      }] : [])
    ]
  };
}

// Master THÔNG TIN CHUNG Block (Exact 1:1 with media_1793872229408_2c50282c.png and media_1793872146885_317a9426.png)
function buildThongTinChungCard(info, approval = null) {
  const leftBox = {
    type: 'FRAME',
    name: 'Khối Thông tin chung',
    layoutGrow: 1,
    layoutMode: 'VERTICAL',
    cornerRadius: 8,
    fill: TOKENS.white,
    stroke: '#DBEAFE',
    strokeWeight: 1,
    children: [
      // Light blue title bar
      {
        type: 'FRAME',
        name: 'Header Bar',
        height: 32,
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 16, right: 16 },
        fill: '#EFF6FF',
        children: [
          { type: 'TEXT', characters: 'THÔNG TIN CHUNG', fontSize: 11, fontWeight: 700, fill: '#1E40AF' }
        ]
      },
      // 5 Rows Grid
      {
        type: 'FRAME',
        name: 'Rows Grid',
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        padding: { left: 16, right: 16, top: 12, bottom: 12 },
        itemSpacing: 8,
        children: [
          // Row 1: Mã phí & Loại phí
          {
            type: 'FRAME',
            name: 'Row 1',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildChungPair('Mã phí', info.feeCode),
              buildChungPair('Loại phí', info.feeType)
            ]
          },
          // Row 2: Trạng thái cấu hình & Trạng thái YCPD
          {
            type: 'FRAME',
            name: 'Row 2',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildChungPair('Trạng thái cấu hình', null, info.configStatusBadge),
              buildChungPair('Trạng thái YCPD', null, info.reqStatusBadge)
            ]
          },
          // Row 3: Người khởi tạo & Người cập nhật cuối cùng
          {
            type: 'FRAME',
            name: 'Row 3',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildChungPair('Người khởi tạo', info.creator),
              buildChungPair('Người cập nhật cuối cùng', info.updater)
            ]
          },
          // Row 4: Thời gian khởi tạo & Thời gian cập nhật cuối cùng
          {
            type: 'FRAME',
            name: 'Row 4',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildChungPair('Thời gian khởi tạo', info.createdAt),
              buildChungPair('Thời gian cập nhật cuối cùng', info.updatedAt)
            ]
          },
          // Row 5: Người phê duyệt
          {
            type: 'FRAME',
            name: 'Row 5',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            children: [
              buildChungPair('Người phê duyệt', info.approver, null, true),
              { type: 'FRAME', name: 'Spacer', layoutGrow: 1 }
            ]
          }
        ]
      }
    ]
  };

  if (!approval) {
    return {
      type: 'FRAME',
      name: 'Container: Thông tin chung',
      layoutAlign: 'STRETCH',
      layoutMode: 'HORIZONTAL',
      children: [leftBox]
    };
  }

  // Right box: YÊU CẦU PHÊ DUYỆT (for PENDING states)
  const rightBox = {
    type: 'FRAME',
    name: 'Khối Yêu cầu phê duyệt',
    width: 360,
    layoutMode: 'VERTICAL',
    cornerRadius: 8,
    fill: TOKENS.white,
    stroke: '#BFDBFE',
    strokeWeight: 1,
    children: [
      {
        type: 'FRAME',
        name: 'Header Bar',
        height: 32,
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 14, right: 14 },
        fill: TOKENS.bluePrimary,
        children: [
          { type: 'TEXT', characters: '📋 YÊU CẦU PHÊ DUYỆT', fontSize: 11, fontWeight: 700, fill: TOKENS.white }
        ]
      },
      {
        type: 'FRAME',
        name: 'Content Rows',
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        padding: 12,
        itemSpacing: 6,
        children: [
          buildAppMiniRow('Mã yêu cầu', approval.reqCode),
          buildAppMiniRow('Thời gian tạo', approval.createdAt),
          buildAppMiniRow('Trạng thái phê duyệt', null, approval.statusBadge),
          buildAppMiniRow('Người tạo', approval.creator),
          buildAppMiniRow('Phòng ban', approval.dept)
        ]
      }
    ]
  };

  return {
    type: 'FRAME',
    name: 'Container: Thông tin chung & YCPD',
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    itemSpacing: 14,
    children: [leftBox, rightBox]
  };
}

function buildAppMiniRow(label, val, badge = null) {
  return {
    type: 'FRAME',
    name: `Row: ${label}`,
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    children: [
      { type: 'TEXT', characters: label, width: 130, fontSize: 10, fontWeight: 500, fill: '#64748B' },
      badge ? {
        type: 'FRAME',
        name: 'Badge',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 6, right: 6, top: 1, bottom: 1 },
        cornerRadius: 4,
        fill: badge.bg,
        children: [{ type: 'TEXT', characters: `● ${badge.text}`, fontSize: 9, fontWeight: 700, fill: badge.color }]
      } : {
        type: 'TEXT', characters: val, fontSize: 10, fontWeight: 600, fill: '#1E293B'
      }
    ]
  };
}

// Action Button Bar Helper (Footer Action Bar)
function buildActionBtn(label, type = 'secondary', icon = '') {
  let fill = '#FFFFFF';
  let stroke = TOKENS.border;
  let textColor = TOKENS.ink;
  let fontWeight = 600;

  if (type === 'primary') {
    fill = TOKENS.bluePrimary;
    stroke = TOKENS.bluePrimary;
    textColor = TOKENS.white;
    fontWeight = 700;
  } else if (type === 'danger') {
    fill = '#FFFFFF';
    stroke = TOKENS.red;
    textColor = TOKENS.red;
  } else if (type === 'success') {
    fill = TOKENS.green;
    stroke = TOKENS.green;
    textColor = TOKENS.white;
    fontWeight = 700;
  }

  return {
    type: 'FRAME',
    name: `Btn: ${label}`,
    height: 36,
    cornerRadius: 6,
    fill,
    stroke,
    strokeWeight: 1,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 18, right: 18 },
    itemSpacing: 8,
    children: [
      ...(icon ? [{ type: 'TEXT', characters: icon, fontSize: 12, fill: textColor }] : []),
      { type: 'TEXT', characters: label, fontSize: 11, fontWeight, fill: textColor }
    ]
  };
}

function buildDrawerMetaRow(label, val, badge = null, isBlue = false) {
  return {
    type: 'FRAME',
    name: `Meta Row: ${label}`,
    layoutAlign: 'STRETCH',
    height: 22,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    children: [
      { type: 'TEXT', characters: label, fontSize: 10, fontWeight: 500, fill: '#64748B' },
      badge ? {
        type: 'FRAME',
        name: 'Pending Badge',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 8, right: 8, top: 2, bottom: 2 },
        cornerRadius: 4,
        fill: badge.bg,
        children: [{ type: 'TEXT', characters: `● ${badge.text}`, fontSize: 9, fontWeight: 700, fill: badge.color }]
      } : {
        type: 'TEXT', characters: val, fontSize: 10, fontWeight: 600, fill: isBlue ? TOKENS.bluePrimary : '#1E293B'
      }
    ]
  };
}

// Rich Checker Drawer (Exact 1:1 with media_1793872146885_317a9426.png)
function buildRichCheckerDrawer(reqCode, product = 'CTT', height = 1400) {
  return {
    type: 'FRAME',
    name: 'Approval Slide-over Drawer',
    x: 900,
    y: 0,
    width: 540,
    height,
    fill: TOKENS.white,
    stroke: '#2563EB',
    strokeWeight: 2,
    layoutMode: 'VERTICAL',
    children: [
      // 1. Drawer Header Bar (Blue with Title & Close ✕)
      {
        type: 'FRAME',
        name: 'Drawer Header Bar',
        height: 44,
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 16, right: 16 },
        fill: TOKENS.bluePrimary,
        children: [
          { type: 'TEXT', characters: '📋 YÊU CẦU PHÊ DUYỆT', fontSize: 12, fontWeight: 700, fill: TOKENS.white },
          { type: 'TEXT', characters: '✕', fontSize: 16, fontWeight: 600, fill: TOKENS.white }
        ]
      },
      // 2. Drawer Subheader Meta (Tiêu đề căn trái, Dữ liệu căn phải)
      {
        type: 'FRAME',
        name: 'Drawer Subheader Meta',
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        padding: { left: 16, right: 16, top: 10, bottom: 10 },
        fill: '#F8FAFC',
        stroke: TOKENS.borderLight,
        strokeWeight: 1,
        itemSpacing: 6,
        children: [
          buildDrawerMetaRow('Mã yêu cầu', reqCode),
          buildDrawerMetaRow('Thời gian tạo', '01/11/2023 09:12:43'),
          buildDrawerMetaRow('Người tạo', 'Trần Văn B'),
          buildDrawerMetaRow('Phòng ban', 'Đối soát - Maker'),
          buildDrawerMetaRow('Trạng thái phê duyệt', null, { text: 'Pending', bg: '#FEF3C7', color: '#B45309' }),
          buildDrawerMetaRow('Loại phí', product === 'CTT' ? 'Phí thanh toán' : 'Phí thanh toán (QRGW)', null, true)
        ]
      },
      // 3. Blue Section Bar: THÔNG TIN PHÊ DUYỆT
      {
        type: 'FRAME',
        name: 'Section Bar',
        height: 30,
        layoutAlign: 'STRETCH',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        padding: { left: 16, right: 16 },
        fill: TOKENS.bluePrimary,
        children: [
          { type: 'TEXT', characters: 'THÔNG TIN PHÊ DUYỆT', fontSize: 11, fontWeight: 700, fill: TOKENS.white }
        ]
      },
      // 4. Comparison Diff Table Body (Compact, no huge spacing)
      {
        type: 'FRAME',
        name: 'Drawer Body Content',
        layoutGrow: 1,
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        padding: { left: 16, right: 16, top: 10, bottom: 10 },
        itemSpacing: 8,
        children: [
          // Table Frame
          {
            type: 'FRAME',
            name: 'Comparison Table',
            layoutAlign: 'STRETCH',
            layoutMode: 'VERTICAL',
            cornerRadius: 4,
            stroke: TOKENS.border,
            strokeWeight: 1,
            children: [
              // Th with prominent blue header buttons
              {
                type: 'FRAME',
                name: 'Diff Th',
                height: 30,
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                padding: { left: 10, right: 10 },
                fill: '#F1F5F9',
                itemSpacing: 8,
                children: [
                  { type: 'TEXT', characters: 'Thông tin cấu hình', width: 176, fontSize: 10, fontWeight: 700, fill: TOKENS.inkMuted },
                  {
                    type: 'FRAME',
                    name: 'Th 2 (GIÁ TRỊ CŨ)',
                    width: 140,
                    height: 22,
                    cornerRadius: 4,
                    fill: TOKENS.bluePrimary,
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'CENTER',
                    counterAxisAlignItems: 'CENTER',
                    children: [{ type: 'TEXT', characters: 'GIÁ TRỊ CŨ', fontSize: 10, fontWeight: 700, fill: TOKENS.white }]
                  },
                  {
                    type: 'FRAME',
                    name: 'Th 3 (GIÁ TRỊ MỚI)',
                    width: 160,
                    height: 22,
                    cornerRadius: 4,
                    fill: TOKENS.bluePrimary,
                    layoutMode: 'HORIZONTAL',
                    primaryAxisAlignItems: 'CENTER',
                    counterAxisAlignItems: 'CENTER',
                    children: [{ type: 'TEXT', characters: 'GIÁ TRỊ MỚI', fontSize: 10, fontWeight: 700, fill: TOKENS.white }]
                  }
                ]
              },
              buildDiffRow('Kỳ trả phí', 'Theo tháng', 'Theo Quý'),
              buildDiffRow('Thời gian trả phí', '01/01/2026', '01/04/2026'),
              ...(product === 'CTT' ? [
                buildDiffRow('MCC', '4747 - Thu phí cầu đường...\n5411 - Tạp hóa, siêu thị...', '4747 - Thu phí cầu đường...\n5411 - Tạp hóa, siêu thị...\n5732 - Cửa hàng đồ điện'),
                buildSectionDividerRow('Thông tin phí cho từng thương hiệu thẻ'),
                buildBrandHeaderRow('Thương hiệu thẻ: VISA'),
                buildDiffRow('  Hình thức thu phí', '1 bậc phí', 'Bậc thang theo Tổng GTGD'),
                buildDiffRow('  Mức phí tỷ lệ', '0.74 %', '—'),
                buildDiffRow('  Mức phí tối thiểu', '1.100', '—'),
                buildDiffRow('  Mức phí tối đa', '135.000', '—'),
                buildTierHeaderRow('MỨC PHÍ BẬC 1'),
                buildDiffRow('  Mức phí tỷ lệ', '—', '0.73 %'),
                buildDiffRow('  Mức phí tối thiểu', '—', '1.200'),
                buildDiffRow('  Mức phí tối đa', '—', '135.000'),
                buildTierHeaderRow('MỨC PHÍ BẬC 2'),
                buildDiffRow('  Mức phí tỷ lệ', '—', '0.70 %'),
                buildDiffRow('  Mức phí tối thiểu', '—', '1.200'),
                buildDiffRow('  Mức phí tối đa', '—', '135.000'),
                buildBrandHeaderRow('Thương hiệu thẻ: MasterCard'),
                buildDiffRow('  Mức phí tỷ lệ', '0.74 %', '0.82 %')
              ] : [
                buildDiffRow('Loại QR', 'QR tĩnh', 'QR tĩnh & QR động'),
                buildSectionDividerRow('Thông tin phí cho từng loại giao dịch'),
                buildBrandHeaderRow('Giao dịch Thanh toán (Bậc thang GTGD)'),
                buildTierHeaderRow('BẬC 1 (0 - 20 Triệu)'),
                buildDiffRow('  Mức phí tỷ lệ', '0.80 %', '0.75 %'),
                buildTierHeaderRow('BẬC 2 (20 - 100 Triệu)'),
                buildDiffRow('  Mức phí tỷ lệ', '0.60 %', '0.55 %'),
                buildBrandHeaderRow('Giao dịch Hoàn trả'),
                buildDiffRow('  Mức phí cố định', '1.500 đ', '1.000 đ (Ngày phát sinh GD gốc)')
              ])
            ]
          }
        ]
      },
      // 5. Pinned Bottom Section: Yellow Note + Rejection Reason Box + Buttons
      {
        type: 'FRAME',
        name: 'Drawer Bottom Section',
        layoutAlign: 'STRETCH',
        layoutMode: 'VERTICAL',
        padding: { left: 16, right: 16, top: 12, bottom: 16 },
        itemSpacing: 10,
        stroke: TOKENS.borderLight,
        strokeWeight: 1,
        fill: '#FAFAFA',
        children: [
          // Yellow Info Note
          {
            type: 'FRAME',
            name: 'Yellow Note',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 6,
            children: [
              { type: 'TEXT', characters: '🟡', fontSize: 10 },
              { type: 'TEXT', characters: `Biểu phí này đang được áp dụng cho #${product === 'CTT' ? 'VONTT_NAPAS' : 'BIDV_QRGW'}`, fontSize: 10, fill: '#475569' }
            ]
          },
          // Rejection Reason Box (Bổ sung thêm 1 trường tin Lý do từ chối)
          {
            type: 'FRAME',
            name: 'Rejection Reason Box',
            layoutAlign: 'STRETCH',
            layoutMode: 'VERTICAL',
            itemSpacing: 5,
            children: [
              {
                type: 'FRAME',
                name: 'Label Box',
                layoutMode: 'HORIZONTAL',
                counterAxisAlignItems: 'CENTER',
                itemSpacing: 4,
                children: [
                  { type: 'TEXT', characters: 'Lý do từ chối', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
                  { type: 'TEXT', characters: '*', fontSize: 11, fontWeight: 700, fill: TOKENS.red },
                  { type: 'TEXT', characters: '(bắt buộc khi chọn Từ chối)', fontSize: 10, fill: '#94A3B8' }
                ]
              },
              {
                type: 'FRAME',
                name: 'Textarea Box',
                layoutAlign: 'STRETCH',
                height: 56,
                cornerRadius: 6,
                fill: TOKENS.white,
                stroke: TOKENS.border,
                strokeWeight: 1,
                padding: { left: 12, right: 12, top: 8, bottom: 8 },
                children: [
                  { type: 'TEXT', characters: 'Nhập lý do từ chối phê duyệt cấu hình phí...', fontSize: 10, fill: TOKENS.inkLight }
                ]
              }
            ]
          },
          // Action Buttons: Từ chối & Phê duyệt
          {
            type: 'FRAME',
            name: 'Drawer Footer Buttons',
            height: 38,
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 16,
            children: [
              {
                type: 'FRAME',
                name: 'Btn: Từ chối',
                width: 170,
                height: 36,
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
                width: 170,
                height: 36,
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
      }
    ]
  };
}

function buildDiffRow(field, oldVal, newVal, isHighlighted = false) {
  const isMultiLine = field.includes('\n') || oldVal.includes('\n') || newVal.includes('\n');
  return {
    type: 'FRAME',
    name: `Diff: ${field.trim().split('\n')[0]}`,
    layoutAlign: 'STRETCH',
    minHeight: 26,
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 10, right: 10, top: isMultiLine ? 5 : 3, bottom: isMultiLine ? 5 : 3 },
    stroke: '#E2E8F0',
    strokeWeight: 1,
    fill: isHighlighted ? '#F0FDF4' : TOKENS.white,
    itemSpacing: 8,
    children: [
      { type: 'TEXT', characters: field, width: 176, fontSize: 10, fill: TOKENS.ink },
      { type: 'TEXT', characters: oldVal, width: 140, fontSize: 10, fill: '#64748B' },
      { type: 'TEXT', characters: newVal, width: 160, fontSize: 10, fontWeight: 600, fill: isHighlighted ? '#15803D' : '#0F172A' }
    ]
  };
}

function buildSectionDividerRow(title) {
  return {
    type: 'FRAME',
    name: `Section: ${title}`,
    height: 24,
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 10, right: 10 },
    fill: '#EFF6FF',
    stroke: '#E2E8F0',
    strokeWeight: 1,
    children: [
      { type: 'TEXT', characters: title, fontSize: 10, fontWeight: 700, fill: TOKENS.bluePrimary }
    ]
  };
}

function buildBrandHeaderRow(title) {
  return {
    type: 'FRAME',
    name: `Brand Header: ${title}`,
    height: 24,
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 10, right: 10 },
    fill: '#F8FAFC',
    stroke: '#E2E8F0',
    strokeWeight: 1,
    children: [
      { type: 'TEXT', characters: title, fontSize: 10, fontWeight: 700, fill: TOKENS.ink },
      { type: 'TEXT', characters: '▾', fontSize: 10, fill: '#64748B' }
    ]
  };
}

function buildTierHeaderRow(title) {
  return {
    type: 'FRAME',
    name: `Tier Header: ${title}`,
    height: 22,
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    counterAxisAlignItems: 'CENTER',
    padding: { left: 10, right: 10 },
    fill: '#FEF2F2',
    stroke: '#FCA5A5',
    strokeWeight: 1,
    children: [
      { type: 'TEXT', characters: title, fontSize: 9, fontWeight: 700, fill: TOKENS.red }
    ]
  };
}

// Full Screen Builder
function buildMasterDetailScreen({
  idName,
  title,
  breadcrumb,
  statusBadge,
  metaInfo,
  approvalInfo,
  actionButtons,
  product = 'CTT',
  isCheckerWithDrawer = false,
  x = 0,
  y = 2600,
  screenHeight = 1400
}) {
  const sidebar = buildSidebar(product, screenHeight);
  const topHeader = buildTopHeader();

  const disabledTabs = product === 'CTT' ? disabledTabsCTT : disabledTabsQR;
  const disabledK1 = product === 'CTT' ? disabledK1CTT : disabledK1QR;
  const disabledK2 = product === 'CTT' ? disabledK2CTT : disabledK2QR;

  const mainWrapper = {
    type: 'FRAME',
    name: 'Main Content Wrapper',
    layoutMode: 'VERTICAL',
    width: 1210,
    height: screenHeight,
    fill: '#F8FAFC',
    children: [
      topHeader,
      {
        type: 'FRAME',
        name: 'Page Content Area',
        layoutMode: 'VERTICAL',
        layoutAlign: 'STRETCH',
        padding: { left: 24, right: 24, top: 12, bottom: 20 },
        itemSpacing: 10,
        children: [
          // Top Navigation Bar (Clean breadcrumb & title, buttons moved to bottom)
          {
            type: 'FRAME',
            name: 'Top Navigation Bar',
            layoutAlign: 'STRETCH',
            layoutMode: 'HORIZONTAL',
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
              }
            ]
          },
          // Master THÔNG TIN CHUNG Block (with optional YCPD on right)
          buildThongTinChungCard(metaInfo, approvalInfo),
          // Form blocks: Khối 1: Thông tin cấu hình phí & Khối 2: Thông tin phí (Tabs removed as requested)
          disabledK1,
          disabledK2,
          // Bottom Footer Action Bar (All buttons moved to bottom)
          {
            type: 'FRAME',
            name: 'Footer Action Bar',
            layoutAlign: 'STRETCH',
            height: 56,
            cornerRadius: 8,
            fill: TOKENS.white,
            stroke: TOKENS.borderLight,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            primaryAxisAlignItems: 'CENTER',
            counterAxisAlignItems: 'CENTER',
            itemSpacing: 14,
            padding: { left: 24, right: 24 },
            children: actionButtons
          }
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
      height: screenHeight,
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
      height: screenHeight,
      fill: '#F8FAFC',
      layoutMode: 'NONE', // freeform so drawer sits on top
      children: [
        {
          type: 'FRAME',
          name: 'Base Screen Layout',
          x: 0,
          y: 0,
          width: 1440,
          height: screenHeight,
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
          height: screenHeight,
          fill: '#00000033'
        },
        // Slide-over Drawer
        buildRichCheckerDrawer(approvalInfo ? approvalInfo.reqCode : 'AR_MM_MC_1109232283324', product, screenHeight)
      ]
    };
  }
}

async function main() {
  console.log('--- STARTING COMPREHENSIVE UPDATE OF CHECKER & ALL 14 DETAIL SCREENS ---');

  // Step 1: Clean up existing 14 detail frames in Row 3
  console.log('\n1. Deleting existing Row 3 detail frames...');
  await runFigmaCode(`
    const res = await figma.searchNodes({ query: "-DT-" });
    const nodes = (res?.nodes || []).filter(x => x.type === 'FRAME' && x.name.includes('-DT-'));
    for (const n of nodes) {
      try {
        await figma.delete(n.id);
      } catch (e) {}
    }
  `, 'Page 2');

  // 7 CTT Detail Configurations
  const cttConfigs = [
    {
      idName: 'SCR-CTT-DT-01: Chi tiết Phí CTT - DRAFT (Bản nháp)',
      title: 'SM_PN_DC_001 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Bản nháp', bg: '#F1F5F9', color: '#475569', dot: '#64748B' },
      metaInfo: {
        feeCode: 'SM_PN_DC_001',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#F1F5F9', text: 'DRAFT', color: '#475569' },
        reqStatusBadge: { bg: '#F1F5F9', text: 'DRAFT', color: '#475569' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
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
      y: 2600,
      screenHeight: 1400
    },
    {
      idName: 'SCR-CTT-DT-02A: Chi tiết Phí CTT - PENDING (Maker View)',
      title: 'SM_PN_DC_001 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Chờ phê duyệt', bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
      metaInfo: {
        feeCode: 'SM_PN_DC_001',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#DCFCE7', text: 'ACTIVE', color: '#15803D' },
        reqStatusBadge: { bg: '#FEF3C7', text: 'PENDING', color: '#B45309' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: {
        reqCode: 'AR_MM_MC_1109232283324',
        createdAt: '01/11/2023, 09:12:44',
        statusBadge: { bg: '#FEF3C7', text: 'Pending', color: '#B45309' },
        creator: 'Trần Văn B',
        dept: 'Kinh doanh - Maker'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Rút yêu cầu', 'secondary', '↩')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: -322,
      y: 2600,
      screenHeight: 1400
    },
    {
      idName: 'SCR-CTT-DT-02B: Chi tiết Phí CTT - PENDING (Checker View - Drawer Phê duyệt)',
      title: 'SM_PN_DC_001 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Chờ phê duyệt', bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
      metaInfo: {
        feeCode: 'SM_PN_DC_001',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#DCFCE7', text: 'ACTIVE', color: '#15803D' },
        reqStatusBadge: { bg: '#FEF3C7', text: 'PENDING', color: '#B45309' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: {
        reqCode: 'AR_MM_MC_1109232283324',
        createdAt: '01/11/2023, 09:12:44',
        statusBadge: { bg: '#FEF3C7', text: 'Pending', color: '#B45309' },
        creator: 'Trần Văn B',
        dept: 'Đối soát - Maker'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Mở ngăn duyệt 📋', 'primary')
      ],
      product: 'CTT',
      isCheckerWithDrawer: true,
      x: 1218,
      y: 2600,
      screenHeight: 1400
    },
    {
      idName: 'SCR-CTT-DT-03: Chi tiết Phí CTT - READY (Chờ hiệu lực)',
      title: 'SM_PN_DC_001 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Chờ hiệu lực', bg: '#E0F2FE', color: '#0284C7', dot: '#0EA5E9' },
      metaInfo: {
        feeCode: 'SM_PN_DC_001',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#E0F2FE', text: 'READY', color: '#0284C7' },
        reqStatusBadge: { bg: '#DCFCE7', text: 'APPROVAL', color: '#15803D' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: null,
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Sao chép cấu hình', 'secondary', '⎘'),
        buildActionBtn('Cập nhật thông tin', 'primary', '✎')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: 2758,
      y: 2600,
      screenHeight: 1400
    },
    {
      idName: 'SCR-CTT-DT-04: Chi tiết Phí CTT - ACTIVE (Đang hoạt động)',
      title: 'SM_PN_DC_001 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Đang hoạt động', bg: '#DCFCE7', color: '#15803D', dot: '#16A34A' },
      metaInfo: {
        feeCode: 'SM_PN_DC_001',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#DCFCE7', text: 'ACTIVE', color: '#15803D' },
        reqStatusBadge: { bg: '#DCFCE7', text: 'APPROVAL', color: '#15803D' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: null,
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
      y: 2600,
      screenHeight: 1400
    },
    {
      idName: 'SCR-CTT-DT-05: Chi tiết Phí CTT - INACTIVE (Tạm dừng / Hết hiệu lực)',
      title: 'SM_PN_DC_001 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Hết hiệu lực', bg: '#F1F5F9', color: '#475569', dot: '#64748B' },
      metaInfo: {
        feeCode: 'SM_PN_DC_001',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#F1F5F9', text: 'INACTIVE', color: '#475569' },
        reqStatusBadge: { bg: '#F1F5F9', text: 'CLOSED', color: '#475569' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
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
      y: 2600,
      screenHeight: 1400
    },
    {
      idName: 'SCR-CTT-DT-06: Chi tiết Phí CTT - REJECTED (Bị từ chối)',
      title: 'SM_PN_DC_001 - Biểu phí Thẻ quốc tế Visa/MasterCard/JCB',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Bị từ chối', bg: '#FEE2E2', color: '#B91C1C', dot: '#DC2626' },
      metaInfo: {
        feeCode: 'SM_PN_DC_001',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#FEE2E2', text: 'REJECTED', color: '#B91C1C' },
        reqStatusBadge: { bg: '#FEE2E2', text: 'REJECTED', color: '#B91C1C' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: null,
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Xóa yêu cầu', 'danger', '🗑'),
        buildActionBtn('Chỉnh sửa & Gửi duyệt lại', 'primary', '✏️')
      ],
      product: 'CTT',
      isCheckerWithDrawer: false,
      x: 7378,
      y: 2600,
      screenHeight: 1400
    }
  ];

  // 7 QRGW Detail Configurations
  const qrConfigs = [
    {
      idName: 'SCR-QR-DT-01: Chi tiết Phí QRGW - DRAFT (Bản nháp)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Bản nháp', bg: '#F1F5F9', color: '#475569', dot: '#64748B' },
      metaInfo: {
        feeCode: 'QR_FE_NAPAS_002',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#F1F5F9', text: 'DRAFT', color: '#475569' },
        reqStatusBadge: { bg: '#F1F5F9', text: 'DRAFT', color: '#475569' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
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
      y: 2600,
      screenHeight: 1250
    },
    {
      idName: 'SCR-QR-DT-02A: Chi tiết Phí QRGW - PENDING (Maker View)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Chờ phê duyệt', bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
      metaInfo: {
        feeCode: 'QR_FE_NAPAS_002',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#DCFCE7', text: 'ACTIVE', color: '#15803D' },
        reqStatusBadge: { bg: '#FEF3C7', text: 'PENDING', color: '#B45309' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: {
        reqCode: 'AR_MM_MC_1109232283324',
        createdAt: '01/11/2023, 09:12:44',
        statusBadge: { bg: '#FEF3C7', text: 'Pending', color: '#B45309' },
        creator: 'Trần Văn B',
        dept: 'Kinh doanh - Maker'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Rút yêu cầu', 'secondary', '↩')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 11120,
      y: 2600,
      screenHeight: 1250
    },
    {
      idName: 'SCR-QR-DT-02B: Chi tiết Phí QRGW - PENDING (Checker View - Drawer Phê duyệt)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Chờ phê duyệt', bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
      metaInfo: {
        feeCode: 'QR_FE_NAPAS_002',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#DCFCE7', text: 'ACTIVE', color: '#15803D' },
        reqStatusBadge: { bg: '#FEF3C7', text: 'PENDING', color: '#B45309' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: {
        reqCode: 'AR_MM_MC_1109232283324',
        createdAt: '01/11/2023, 09:12:44',
        statusBadge: { bg: '#FEF3C7', text: 'Pending', color: '#B45309' },
        creator: 'Trần Văn B',
        dept: 'Đối soát - Maker'
      },
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Mở ngăn duyệt 📋', 'primary')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: true,
      x: 12660,
      y: 2600,
      screenHeight: 1250
    },
    {
      idName: 'SCR-QR-DT-03: Chi tiết Phí QRGW - READY (Chờ hiệu lực)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Chờ hiệu lực', bg: '#E0F2FE', color: '#0284C7', dot: '#0EA5E9' },
      metaInfo: {
        feeCode: 'QR_FE_NAPAS_002',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#E0F2FE', text: 'READY', color: '#0284C7' },
        reqStatusBadge: { bg: '#DCFCE7', text: 'APPROVAL', color: '#15803D' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: null,
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Sao chép cấu hình', 'secondary', '⎘'),
        buildActionBtn('Cập nhật thông tin', 'primary', '✎')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 14200,
      y: 2600,
      screenHeight: 1250
    },
    {
      idName: 'SCR-QR-DT-04: Chi tiết Phí QRGW - ACTIVE (Đang hoạt động)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Đang hoạt động', bg: '#DCFCE7', color: '#15803D', dot: '#16A34A' },
      metaInfo: {
        feeCode: 'QR_FE_NAPAS_002',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#DCFCE7', text: 'ACTIVE', color: '#15803D' },
        reqStatusBadge: { bg: '#DCFCE7', text: 'APPROVAL', color: '#15803D' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: null,
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
      y: 2600,
      screenHeight: 1250
    },
    {
      idName: 'SCR-QR-DT-05: Chi tiết Phí QRGW - INACTIVE (Tạm dừng / Hết hiệu lực)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Hết hiệu lực', bg: '#F1F5F9', color: '#475569', dot: '#64748B' },
      metaInfo: {
        feeCode: 'QR_FE_NAPAS_002',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#F1F5F9', text: 'INACTIVE', color: '#475569' },
        reqStatusBadge: { bg: '#F1F5F9', text: 'CLOSED', color: '#475569' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
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
      y: 2600,
      screenHeight: 1250
    },
    {
      idName: 'SCR-QR-DT-06: Chi tiết Phí QRGW - REJECTED (Bị từ chối)',
      title: 'QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR',
      breadcrumb: 'Quản lý cấu hình phí trả đối tác  >  [MÃ CẤU HÌNH PHÍ]',
      statusBadge: { text: 'Bị từ chối', bg: '#FEE2E2', color: '#B91C1C', dot: '#DC2626' },
      metaInfo: {
        feeCode: 'QR_FE_NAPAS_002',
        feeType: 'Phí thanh toán',
        configStatusBadge: { bg: '#FEE2E2', text: 'REJECTED', color: '#B91C1C' },
        reqStatusBadge: { bg: '#FEE2E2', text: 'REJECTED', color: '#B91C1C' },
        creator: 'Trần Văn B',
        updater: 'Nguyễn Thị C',
        createdAt: '01/11/2023, 09:12:44',
        updatedAt: '11/11/2023, 10:12:54',
        approver: 'Trần Văn A'
      },
      approvalInfo: null,
      actionButtons: [
        buildActionBtn('← Quay lại', 'secondary'),
        buildActionBtn('Lịch sử', 'secondary', '⏱'),
        buildActionBtn('Xóa yêu cầu', 'danger', '🗑'),
        buildActionBtn('Chỉnh sửa & Gửi duyệt lại', 'primary', '✏️')
      ],
      product: 'QRGW',
      isCheckerWithDrawer: false,
      x: 18820,
      y: 2600,
      screenHeight: 1250
    }
  ];

  const allConfigs = [...cttConfigs, ...qrConfigs];
  console.log(`\n2. Creating ${allConfigs.length} master detail screens...`);

  for (let i = 0; i < allConfigs.length; i++) {
    const cfg = allConfigs[i];
    console.log(`[${i + 1}/${allConfigs.length}] Creating ${cfg.idName}...`);
    const spec = buildMasterDetailScreen(cfg);
    const code = `
      const spec = ${JSON.stringify(spec)};
      const res = await figma.create(spec);
      return { ok: true, id: res.id, name: res.name, x: res.x, y: res.y };
    `;
    const res = await runFigmaCode(code, 'Page 2');
    const parsed = JSON.parse(res?.content?.[0]?.text);
    console.log(`Created:`, parsed?.result);
  }

  // Ensure perfect coordinates alignment for all 14 screens
  console.log('\n3. Verifying coordinates alignment...');
  for (const cfg of allConfigs) {
    await runFigmaCode(`
      const nodes = await figma.searchNodes({ query: "${cfg.idName.split(':')[0]}" });
      for (const n of (nodes?.nodes || [])) {
        if (n.name.startsWith("${cfg.idName.split(':')[0]}")) {
          await figma.modify(n.id, { x: ${cfg.x}, y: ${cfg.y} });
        }
      }
    `, 'Page 2');
  }

  console.log('\n--- ALL 14 MASTER DETAIL SCREENS CREATED AND ALIGNED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
