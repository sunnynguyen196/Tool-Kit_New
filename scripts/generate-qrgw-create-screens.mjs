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
  newText: '#0369A1'
};

function buildSidebarQrgw() {
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
                children: [{ type: 'TEXT', characters: '✦', fontSize: 16, fill: '#FFFFFF' }]
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
            children: [{ type: 'TEXT', characters: '⇇', fontSize: 16, fill: '#FFFFFF' }]
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
            name: 'Item: Trang chủ',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'MIN',
            counterAxisAlignItems: 'CENTER',
            height: 40,
            padding: { left: 16, right: 16 },
            fill: '#FFFFFF',
            children: [{ type: 'TEXT', characters: 'Trang chủ', fontSize: 13, fontWeight: 500, fill: TOKENS.ink }]
          },
          {
            type: 'FRAME',
            name: 'Item: Quản lý dịch vụ',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'MIN',
            counterAxisAlignItems: 'CENTER',
            height: 40,
            padding: { left: 16, right: 16 },
            fill: '#FFFFFF',
            children: [{ type: 'TEXT', characters: 'Quản lý dịch vụ', fontSize: 13, fontWeight: 500, fill: TOKENS.ink }]
          },
          {
            type: 'FRAME',
            name: 'Item: Quản lý đối tác',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'MIN',
            counterAxisAlignItems: 'CENTER',
            height: 40,
            padding: { left: 16, right: 16 },
            fill: '#FFFFFF',
            children: [{ type: 'TEXT', characters: 'Quản lý đối tác', fontSize: 13, fontWeight: 500, fill: TOKENS.ink }]
          },
          {
            type: 'FRAME',
            name: 'Item: Quản lý cấu hình phí',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'SPACE_BETWEEN',
            counterAxisAlignItems: 'CENTER',
            height: 40,
            padding: { left: 16, right: 16 },
            fill: '#F1F5F9',
            children: [
              { type: 'TEXT', characters: 'Quản lý cấu hình phí', fontSize: 13, fontWeight: 600, fill: TOKENS.primaryAction },
              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }
            ]
          },
          {
            type: 'FRAME',
            name: 'SubItem: Phí trả đối tác',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            counterAxisAlignItems: 'CENTER',
            height: 34,
            padding: { left: 24, right: 16 },
            children: [
              { type: 'TEXT', characters: 'Phí trả đối tác', fontSize: 12, fontWeight: 500, fill: TOKENS.inkSecondary }
            ]
          },
          {
            type: 'FRAME',
            name: 'ChildItem: •  Phí đối tác CTT',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            counterAxisAlignItems: 'CENTER',
            height: 32,
            padding: { left: 36, right: 16 },
            fill: '#FFFFFF',
            stroke: '#FFFFFF',
            strokeWeight: 1,
            children: [
              { type: 'TEXT', characters: '•  Phí đối tác CTT', fontSize: 12, fontWeight: 400, fill: TOKENS.inkSecondary }
            ]
          },
          {
            type: 'FRAME',
            name: 'ChildItem: •  Phí đối tác QRGW',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            counterAxisAlignItems: 'CENTER',
            height: 32,
            padding: { left: 36, right: 16 },
            fill: '#EFF6FF',
            stroke: TOKENS.primaryAction,
            strokeWeight: 1,
            children: [
              { type: 'TEXT', characters: '•  Phí đối tác QRGW', fontSize: 12, fontWeight: 600, fill: TOKENS.primaryAction }
            ]
          },
          {
            type: 'FRAME',
            name: 'SubItem: Phí thu khách hàng',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            counterAxisAlignItems: 'CENTER',
            height: 34,
            padding: { left: 24, right: 16 },
            children: [
              { type: 'TEXT', characters: 'Phí thu khách hàng', fontSize: 12, fontWeight: 500, fill: TOKENS.inkSecondary }
            ]
          },
          {
            type: 'FRAME',
            name: 'Item: Báo cáo thống kê',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'MIN',
            counterAxisAlignItems: 'CENTER',
            height: 40,
            padding: { left: 16, right: 16 },
            fill: '#FFFFFF',
            children: [{ type: 'TEXT', characters: 'Báo cáo thống kê', fontSize: 13, fontWeight: 500, fill: TOKENS.ink }]
          },
          {
            type: 'FRAME',
            name: 'Item: Đối soát & Thanh quyết toán',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'MIN',
            counterAxisAlignItems: 'CENTER',
            height: 40,
            padding: { left: 16, right: 16 },
            fill: '#FFFFFF',
            children: [{ type: 'TEXT', characters: 'Đối soát & Thanh quyết toán', fontSize: 13, fontWeight: 500, fill: TOKENS.ink }]
          },
          {
            type: 'FRAME',
            name: 'Item: Quản trị hệ thống',
            layoutMode: 'HORIZONTAL',
            layoutAlign: 'STRETCH',
            primaryAxisAlignItems: 'MIN',
            counterAxisAlignItems: 'CENTER',
            height: 40,
            padding: { left: 16, right: 16 },
            fill: '#FFFFFF',
            children: [{ type: 'TEXT', characters: 'Quản trị hệ thống', fontSize: 13, fontWeight: 500, fill: TOKENS.ink }]
          }
        ]
      }
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
    fill: '#FFFFFF',
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
          { type: 'TEXT', characters: 'Tìm kiếm theo mã cấu hình, tên đối tác QRGW...', fontSize: 12, fill: TOKENS.inkSubtle }
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
                children: [{ type: 'TEXT', characters: 'L', fontSize: 12, fontWeight: 700, fill: '#FFFFFF' }]
              },
              { type: 'TEXT', characters: 'Lisa ▾', fontSize: 12, fontWeight: 500, fill: TOKENS.ink }
            ]
          }
        ]
      }
    ]
  };
}

function buildField(label, placeholder, width = 270, isRequired = false) {
  return {
    type: 'FRAME',
    name: `Field: ${label}`,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 4,
    children: [
      {
        type: 'TEXT',
        characters: `${label}${isRequired ? ' *' : ''}`,
        fontSize: 11,
        fontWeight: 500,
        fill: isRequired ? TOKENS.ink : TOKENS.inkSecondary
      },
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

function buildRadioGroupField(label, options, selectedIdx = 0, width = 554) {
  return {
    type: 'FRAME',
    name: `RadioField: ${label}`,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 6,
    children: [
      {
        type: 'TEXT',
        characters: `${label} *`,
        fontSize: 11,
        fontWeight: 600,
        fill: TOKENS.ink
      },
      {
        type: 'FRAME',
        name: 'Radio Options Row',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: options.map((opt, i) => {
          const isSelected = i === selectedIdx;
          return {
            type: 'FRAME',
            name: `Radio: ${opt}`,
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
                fill: isSelected ? '#EFF6FF' : '#FFFFFF',
                stroke: isSelected ? TOKENS.primaryAction : TOKENS.borderDark,
                strokeWeight: 1.5,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: isSelected ? [
                  {
                    type: 'FRAME',
                    name: 'Inner Dot',
                    width: 6,
                    height: 6,
                    cornerRadius: 3,
                    fill: TOKENS.primaryAction
                  }
                ] : []
              },
              {
                type: 'TEXT',
                characters: opt,
                fontSize: 11,
                fontWeight: isSelected ? 600 : 400,
                fill: isSelected ? TOKENS.ink : TOKENS.inkSecondary
              }
            ]
          };
        })
      }
    ]
  };
}

function buildCheckboxGroupField(label, items, width = 554) {
  return {
    type: 'FRAME',
    name: `CheckboxField: ${label}`,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 6,
    children: [
      {
        type: 'TEXT',
        characters: label,
        fontSize: 11,
        fontWeight: 600,
        fill: TOKENS.ink
      },
      {
        type: 'FRAME',
        name: 'Checkboxes Row',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: items.map(item => ({
          type: 'FRAME',
          name: `Checkbox: ${item.name}`,
          layoutMode: 'HORIZONTAL',
          counterAxisAlignItems: 'CENTER',
          itemSpacing: 6,
          children: [
            {
              type: 'FRAME',
              name: 'Box',
              width: 14,
              height: 14,
              cornerRadius: 3,
              fill: item.checked ? TOKENS.primaryAction : '#FFFFFF',
              stroke: item.checked ? TOKENS.primaryAction : TOKENS.borderDark,
              strokeWeight: 1,
              layoutMode: 'HORIZONTAL',
              primaryAxisAlignItems: 'CENTER',
              counterAxisAlignItems: 'CENTER',
              children: item.checked ? [
                { type: 'TEXT', characters: '✓', fontSize: 9, fontWeight: 700, fill: '#FFFFFF' }
              ] : []
            },
            {
              type: 'TEXT',
              characters: item.name,
              fontSize: 11,
              fontWeight: item.checked ? 600 : 400,
              fill: TOKENS.ink
            }
          ]
        }))
      }
    ]
  };
}

function buildCardWrapper(title, subtitle, contentChildren) {
  return {
    type: 'FRAME',
    name: `Card: ${title}`,
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    padding: { top: 12, bottom: 14, left: 16, right: 16 },
    cornerRadius: 8,
    fill: '#FFFFFF',
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 10,
    children: [
      {
        type: 'FRAME',
        name: 'Card Header',
        layoutMode: 'HORIZONTAL',
        layoutAlign: 'STRETCH',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        children: [
          { type: 'TEXT', characters: title, fontSize: 12, fontWeight: 700, fill: TOKENS.ink },
          { type: 'TEXT', characters: subtitle, fontSize: 10, fill: TOKENS.inkMuted }
        ]
      },
      ...contentChildren
    ]
  };
}

function buildHeaderCreateBar(titleText) {
  return {
    type: 'FRAME',
    name: 'Create Page Header',
    layoutMode: 'HORIZONTAL',
    layoutAlign: 'STRETCH',
    primaryAxisAlignItems: 'SPACE_BETWEEN',
    counterAxisAlignItems: 'CENTER',
    children: [
      {
        type: 'FRAME',
        name: 'Heading Group',
        layoutMode: 'VERTICAL',
        itemSpacing: 3,
        children: [
          { type: 'TEXT', characters: titleText, fontSize: 16, fontWeight: 700, fill: TOKENS.ink },
          { type: 'TEXT', characters: 'Quản lý cấu hình phí  /  Phí trả đối tác  /  Phí đối tác QRGW  /  Tạo mới', fontSize: 11, fill: TOKENS.inkMuted }
        ]
      },
      {
        type: 'FRAME',
        name: 'Form Actions',
        layoutMode: 'HORIZONTAL',
        itemSpacing: 8,
        children: [
          {
            type: 'FRAME',
            name: 'Btn Cancel',
            height: 32,
            padding: { left: 14, right: 14 },
            cornerRadius: 4,
            fill: '#FFFFFF',
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: 'Hủy bỏ', fontSize: 11, fontWeight: 500, fill: TOKENS.inkSecondary }]
          },
          {
            type: 'FRAME',
            name: 'Btn Draft',
            height: 32,
            padding: { left: 14, right: 14 },
            cornerRadius: 4,
            fill: '#FFFFFF',
            stroke: TOKENS.borderDark,
            strokeWeight: 1,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: '💾  Lưu nháp', fontSize: 11, fontWeight: 500, fill: TOKENS.inkSecondary }]
          },
          {
            type: 'FRAME',
            name: 'Btn Submit Approval',
            height: 32,
            padding: { left: 16, right: 16 },
            cornerRadius: 4,
            fill: TOKENS.primaryAction,
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [{ type: 'TEXT', characters: 'Gửi phê duyệt ✓', fontSize: 11, fontWeight: 600, fill: '#FFFFFF' }]
          }
        ]
      }
    ]
  };
}

// 1. SCR-QR-CR-01: Thêm mới Phí XLGD Thu hộ QR (1 bậc cố định)
export function buildScrQrCr01() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-01: Thêm mới Phí XLGD QRGW - Thu hộ QR',
    width: 1440,
    height: 960,
    x: 6500,
    y: 1560,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebarQrgw(),
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
            itemSpacing: 12,
            children: [
              buildHeaderCreateBar('Thêm mới Cấu hình Phí QRGW: Phí XLGD (Thu hộ QR - Cố định 1 bậc)'),
              // Card 1
              buildCardWrapper('1. THÔNG TIN CHUNG', 'Đặc tả thông số chung của cấu hình phí đối tác ngân hàng/Napas', [
                {
                  type: 'FRAME',
                  name: 'Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Đối tác hưởng phí', 'VietinBank QRGW ▾', 270, true),
                    buildField('Loại biểu phí', 'Phí xử lý giao dịch (XLGD) ▾', 270, true),
                    buildField('Kỳ trả phí', 'Tháng ▾', 270, true),
                    buildField('Đồng tiền thanh toán', 'VND ▾', 270, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row 2',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Thời gian áp dụng', '01/01/2026 - 31/12/2026 📅', 270, true),
                    buildField('Thuế suất VAT', '8% ▾', 270, true),
                    buildField('Căn cứ HĐ / Phụ lục', 'HĐ số 2026/VTB-QRGW-01', 270, false),
                    buildField('Quy tắc kiểm tra MCC', 'BR-PFEE-02A: Check trùng MCC active', 270, false)
                  ]
                }
              ]),
              // Card 2
              buildCardWrapper('2. LOẠI DỊCH VỤ & ĐIỀU KIỆN ÁP DỤNG', 'Loại dịch vụ Thu hộ QR, Trạng thái GD tính phí và Ngày áp dụng phí hoàn trả', [
                {
                  type: 'FRAME',
                  name: 'Row Service & MCC',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Loại dịch vụ QRGW', 'Thu hộ QR (Pay-in QR Code) ▾', 554, true),
                    buildField('Danh mục mã MCC áp dụng', 'Tất cả MCC áp dụng QR ▾', 554, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row States & Date',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildRadioGroupField(
                      'Trạng thái giao dịch tính phí (Đặc thù Phí XLGD)',
                      ['Tất cả giao dịch', 'Chỉ giao dịch Thành công', 'Chỉ giao dịch Thất bại'],
                      0,
                      554
                    ),
                    buildRadioGroupField(
                      'Ngày áp dụng phí trên giao dịch (Khi chọn GD Hoàn trả)',
                      ['Ngày giao dịch gốc', 'Ngày tạo giao dịch hoàn trả'],
                      0,
                      554
                    )
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row Types Checkbox',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildCheckboxGroupField('Loại giao dịch áp dụng tính phí *', [
                      { name: 'Giao dịch Thanh toán QR', checked: true },
                      { name: 'Giao dịch Hoàn trả tiền QR', checked: true }
                    ], 554),
                    buildField('Ghi chú điều kiện tính phí', 'Áp dụng cho mọi giao dịch QR Napas247 Pay-in', 554, false)
                  ]
                }
              ]),
              // Card 3
              buildCardWrapper('3. HÌNH THỨC THU PHÍ & MỨC PHÍ CẤU HÌNH', 'Hình thức: 1 bậc cố định theo mỗi giao dịch xử lý', [
                {
                  type: 'FRAME',
                  name: 'Pricing Row',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Hình thức thu phí', '1 bậc (Cố định theo giao dịch) ▾', 270, true),
                    buildField('Mức phí cố định (VND/GD)', '500 đ', 270, true),
                    buildField('Đơn vị tính phí', 'VND / Giao dịch', 270, false),
                    buildField('Quy tắc làm tròn', 'Không làm tròn (Số nguyên VND)', 270, false)
                  ]
                }
              ])
            ]
          }
        ]
      }
    ]
  };
}

// 2. SCR-QR-CR-02: Thêm mới Phí XLGD Chi hộ QR (Bậc thang SLGD)
export function buildScrQrCr02() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-02: Thêm mới Phí XLGD QRGW - Chi hộ QR',
    width: 1440,
    height: 960,
    x: 8040,
    y: 1560,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebarQrgw(),
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
            itemSpacing: 12,
            children: [
              buildHeaderCreateBar('Thêm mới Cấu hình Phí QRGW: Phí XLGD (Chi hộ QR - Bậc thang SLGD)'),
              buildCardWrapper('1. THÔNG TIN CHUNG', 'Đặc tả thông số chung của cấu hình phí Chi hộ QR Napas 247', [
                {
                  type: 'FRAME',
                  name: 'Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Đối tác hưởng phí', 'MBBank QRGW ▾', 270, true),
                    buildField('Loại biểu phí', 'Phí xử lý giao dịch (XLGD) ▾', 270, true),
                    buildField('Kỳ trả phí', 'Tháng ▾', 270, true),
                    buildField('Đồng tiền thanh toán', 'VND ▾', 270, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row 2',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Thời gian áp dụng', '01/01/2026 - 31/12/2026 📅', 270, true),
                    buildField('Thuế suất VAT', '8% ▾', 270, true),
                    buildField('Căn cứ HĐ / Phụ lục', 'HĐ số 2026/MBB-QRGW-DISBURSE', 270, false),
                    buildField('Quy tắc kiểm tra MCC', 'BR-PFEE-02A: Check trùng MCC active', 270, false)
                  ]
                }
              ]),
              buildCardWrapper('2. LOẠI DỊCH VỤ & ĐIỀU KIỆN ÁP DỤNG', 'Loại dịch vụ Chi hộ QR Napas247, Trạng thái GD tính phí và Ngày áp dụng phí hoàn trả', [
                {
                  type: 'FRAME',
                  name: 'Row Service & MCC',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Loại dịch vụ QRGW', 'Chi hộ QR (Pay-out QR / Napas 247) ▾', 554, true),
                    buildField('Danh mục mã MCC áp dụng', 'Tất cả MCC áp dụng Chi hộ ▾', 554, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row States & Date',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildRadioGroupField(
                      'Trạng thái giao dịch tính phí (Đặc thù Phí XLGD)',
                      ['Chỉ giao dịch Thành công', 'Tất cả giao dịch', 'Chỉ giao dịch Thất bại'],
                      0,
                      554
                    ),
                    buildRadioGroupField(
                      'Ngày áp dụng phí trên giao dịch (Khi chọn GD Hoàn trả)',
                      ['Ngày tạo giao dịch hoàn trả', 'Ngày giao dịch gốc'],
                      0,
                      554
                    )
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row Types Checkbox',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildCheckboxGroupField('Loại giao dịch áp dụng tính phí *', [
                      { name: 'Giao dịch Chi hộ thành công', checked: true },
                      { name: 'Giao dịch Tra soát / Hoàn trả chi hộ', checked: true }
                    ], 554),
                    buildField('Ghi chú điều kiện tính phí', 'Áp dụng cho mọi phiên lệnh chuyển khoản Chi hộ Napas 247', 554, false)
                  ]
                }
              ]),
              buildCardWrapper('3. HÌNH THỨC THU PHÍ & MỨC PHÍ CẤU HÌNH', 'Hình thức: Theo SLGD (Bậc thang sản lượng số lượng giao dịch trong tháng)', [
                {
                  type: 'FRAME',
                  name: 'Tier Selector Row',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Hình thức thu phí', 'Theo SLGD (Số lượng giao dịch) ▾', 360, true),
                    buildField('Kỳ chốt sản lượng tính bậc', 'Chốt số liệu ngày cuối tháng ▾', 360, true),
                    buildField('Mức phí tối thiểu nếu không đạt bậc', '1.000 đ/GD', 360, false)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Tiers Table Card',
                  layoutMode: 'VERTICAL',
                  layoutAlign: 'STRETCH',
                  cornerRadius: 6,
                  fill: '#FFFFFF',
                  stroke: TOKENS.border,
                  strokeWeight: 1,
                  children: [
                    {
                      type: 'FRAME',
                      name: 'Tier Header',
                      layoutMode: 'HORIZONTAL',
                      layoutAlign: 'STRETCH',
                      height: 32,
                      fill: TOKENS.tableHeaderBg,
                      padding: { left: 16, right: 16 },
                      counterAxisAlignItems: 'CENTER',
                      children: [
                        { type: 'FRAME', name: 'Th Bậc', width: 80, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'BẬC THANG', fontSize: 10, fontWeight: 700, fill: TOKENS.inkSecondary }] },
                        { type: 'FRAME', name: 'Th Từ SL', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'TỪ SỐ LƯỢNG (GD)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkSecondary }] },
                        { type: 'FRAME', name: 'Th Đến SL', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'ĐẾN SỐ LƯỢNG (GD)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkSecondary }] },
                        { type: 'FRAME', name: 'Th Mức phí', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'MỨC PHÍ (VND / GD)', fontSize: 10, fontWeight: 700, fill: TOKENS.inkSecondary }] },
                        { type: 'FRAME', name: 'Th Action', width: 80, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'THAO TÁC', fontSize: 10, fontWeight: 700, fill: TOKENS.inkSecondary }] }
                      ]
                    },
                    {
                      type: 'FRAME',
                      name: 'Tier Row 1',
                      layoutMode: 'HORIZONTAL',
                      layoutAlign: 'STRETCH',
                      height: 36,
                      fill: '#FFFFFF',
                      stroke: TOKENS.border,
                      strokeWeight: 1,
                      padding: { left: 16, right: 16 },
                      counterAxisAlignItems: 'CENTER',
                      children: [
                        { type: 'FRAME', name: 'Td Bậc', width: 80, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'Bậc 1', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Từ', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '0', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Đến', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '10.000', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Phí', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '1.000 đ / GD', fontSize: 11, fontWeight: 600, fill: TOKENS.primaryAction }] },
                        { type: 'FRAME', name: 'Td Del', width: 80, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '🗑️', fontSize: 12, fill: TOKENS.inkMuted }] }
                      ]
                    },
                    {
                      type: 'FRAME',
                      name: 'Tier Row 2',
                      layoutMode: 'HORIZONTAL',
                      layoutAlign: 'STRETCH',
                      height: 36,
                      fill: '#FFFFFF',
                      stroke: TOKENS.border,
                      strokeWeight: 1,
                      padding: { left: 16, right: 16 },
                      counterAxisAlignItems: 'CENTER',
                      children: [
                        { type: 'FRAME', name: 'Td Bậc', width: 80, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'Bậc 2', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Từ', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '10.001', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Đến', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '50.000', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Phí', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '800 đ / GD', fontSize: 11, fontWeight: 600, fill: TOKENS.primaryAction }] },
                        { type: 'FRAME', name: 'Td Del', width: 80, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '🗑️', fontSize: 12, fill: TOKENS.inkMuted }] }
                      ]
                    },
                    {
                      type: 'FRAME',
                      name: 'Tier Row 3',
                      layoutMode: 'HORIZONTAL',
                      layoutAlign: 'STRETCH',
                      height: 36,
                      fill: '#FFFFFF',
                      stroke: TOKENS.border,
                      strokeWeight: 1,
                      padding: { left: 16, right: 16 },
                      counterAxisAlignItems: 'CENTER',
                      children: [
                        { type: 'FRAME', name: 'Td Bậc', width: 80, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'Bậc 3', fontSize: 11, fontWeight: 600, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Từ', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '50.001', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Đến', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'Trở lên (Không giới hạn)', fontSize: 11, fill: TOKENS.inkMuted }] },
                        { type: 'FRAME', name: 'Td Phí', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '600 đ / GD', fontSize: 11, fontWeight: 600, fill: TOKENS.primaryAction }] },
                        { type: 'FRAME', name: 'Td Del', width: 80, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '🗑️', fontSize: 12, fill: TOKENS.inkMuted }] }
                      ]
                    }
                  ]
                }
              ])
            ]
          }
        ]
      }
    ]
  };
}

// 3. SCR-QR-CR-03: Thêm mới Phí Thanh toán Thu hộ QR (% GTGD, Min/Max)
export function buildScrQrCr03() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-03: Thêm mới Phí Thanh toán QRGW - Thu hộ QR',
    width: 1440,
    height: 960,
    x: 9580,
    y: 1560,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebarQrgw(),
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
            itemSpacing: 12,
            children: [
              buildHeaderCreateBar('Thêm mới Cấu hình Phí QRGW: Phí Thanh toán (Thu hộ QR - % GTGD Min/Max)'),
              buildCardWrapper('1. THÔNG TIN CHUNG', 'Đặc tả thông số hợp đồng thanh toán cổng QRGW', [
                {
                  type: 'FRAME',
                  name: 'Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Đối tác hưởng phí', 'Vietcombank QRGW ▾', 270, true),
                    buildField('Loại biểu phí', 'Phí thanh toán ▾', 270, true),
                    buildField('Kỳ trả phí', 'Tháng ▾', 270, true),
                    buildField('Đồng tiền thanh toán', 'VND ▾', 270, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row 2',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Thời gian áp dụng', '01/01/2026 - 31/12/2026 📅', 270, true),
                    buildField('Thuế suất VAT', '8% ▾', 270, true),
                    buildField('Căn cứ HĐ / Phụ lục', 'HĐ số 2026/VCB-QR-PAYIN', 270, false),
                    buildField('Quy tắc kiểm tra MCC', 'BR-PFEE-02A: Check trùng MCC active', 270, false)
                  ]
                }
              ]),
              buildCardWrapper('2. LOẠI DỊCH VỤ & DANH MỤC MCC', 'Cấu hình loại dịch vụ Thu hộ QR và danh mục mã ngành áp dụng', [
                {
                  type: 'FRAME',
                  name: 'Row Service & MCC',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Loại dịch vụ QRGW', 'Thu hộ QR (Pay-in QR Napas247) ▾', 554, true),
                    buildField('Mã ngành MCC áp dụng', '5411 (Siêu thị & Bách hóa) ▾', 554, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row Refund Date',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildCheckboxGroupField('Loại giao dịch áp dụng tính phí *', [
                      { name: 'Thanh toán QR thành công', checked: true },
                      { name: 'Giao dịch Hoàn tiền QR', checked: true }
                    ], 554),
                    buildRadioGroupField(
                      'Ngày áp dụng phí trên giao dịch (Khi chọn Hoàn trả)',
                      ['Ngày giao dịch gốc', 'Ngày tạo giao dịch hoàn trả'],
                      0,
                      554
                    )
                  ]
                }
              ]),
              buildCardWrapper('3. HÌNH THỨC THU PHÍ & MỨC PHÍ CẤU HÌNH', 'Hình thức: Theo GTGD (% Tỷ lệ có mức phí Tối thiểu và Tối đa)', [
                {
                  type: 'FRAME',
                  name: 'Pricing Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Hình thức thu phí', 'Theo GTGD (% Tỷ lệ) ▾', 270, true),
                    buildField('Mức phí tỷ lệ (%)', '0.65 %', 270, true),
                    buildField('Mức phí tối thiểu (Min)', '1.500 đ', 270, false),
                    buildField('Mức phí tối đa (Max)', '30.000 đ', 270, false)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Pricing Row 2',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Áp dụng riêng cho Hoàn trả', 'Không (Dùng chung mức phí 0.65%) ▾', 554, false),
                    buildField('Công thức tính phí hiển thị', 'Phí = Clamp(0.65% x GTGD, 1.500đ, 30.000đ) + 8% VAT', 554, false)
                  ]
                }
              ])
            ]
          }
        ]
      }
    ]
  };
}

// 4. SCR-QR-CR-04: Thêm mới Phí Thanh toán Chi hộ QR (Cố định theo dải số tiền GTGD)
export function buildScrQrCr04() {
  return {
    type: 'FRAME',
    name: 'SCR-QR-CR-04: Thêm mới Phí Thanh toán QRGW - Chi hộ QR',
    width: 1440,
    height: 960,
    x: 11120,
    y: 1560,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebarQrgw(),
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
            itemSpacing: 12,
            children: [
              buildHeaderCreateBar('Thêm mới Cấu hình Phí QRGW: Phí Thanh toán (Chi hộ QR - Theo GTGD)'),
              buildCardWrapper('1. THÔNG TIN CHUNG', 'Đặc tả thông số chung của cấu hình thanh toán Chi hộ QR Napas', [
                {
                  type: 'FRAME',
                  name: 'Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Đối tác hưởng phí', 'BIDV QRGW ▾', 270, true),
                    buildField('Loại biểu phí', 'Phí thanh toán ▾', 270, true),
                    buildField('Kỳ trả phí', 'Tháng ▾', 270, true),
                    buildField('Đồng tiền thanh toán', 'VND ▾', 270, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row 2',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Thời gian áp dụng', '01/01/2026 - 31/12/2026 📅', 270, true),
                    buildField('Thuế suất VAT', '8% ▾', 270, true),
                    buildField('Căn cứ HĐ / Phụ lục', 'HĐ số 2026/BIDV-QR-PAYOUT', 270, false),
                    buildField('Quy tắc kiểm tra MCC', 'BR-PFEE-02A: Check trùng MCC active', 270, false)
                  ]
                }
              ]),
              buildCardWrapper('2. LOẠI DỊCH VỤ & ĐIỀU KIỆN ÁP DỤNG', 'Cấu hình loại dịch vụ Chi hộ QR và điều kiện lệnh chuyển', [
                {
                  type: 'FRAME',
                  name: 'Row Service & MCC',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Loại dịch vụ QRGW', 'Chi hộ QR (Pay-out QR 247) ▾', 554, true),
                    buildField('Mã ngành MCC áp dụng', 'Tất cả MCC áp dụng Chi hộ ▾', 554, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row Refund Date',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildCheckboxGroupField('Loại giao dịch áp dụng *', [
                      { name: 'Lệnh Chi hộ hoàn tất thành công', checked: true },
                      { name: 'Lệnh Tra soát / Hoàn trả chi hộ', checked: true }
                    ], 554),
                    buildRadioGroupField(
                      'Ngày áp dụng phí khi Hoàn trả *',
                      ['Ngày tạo giao dịch hoàn trả', 'Ngày giao dịch gốc'],
                      0,
                      554
                    )
                  ]
                }
              ]),
              buildCardWrapper('3. HÌNH THỨC THU PHÍ & MỨC PHÍ CẤU HÌNH', 'Hình thức: Theo GTGD (% Tỷ lệ có trần sàn Min / Max)', [
                {
                  type: 'FRAME',
                  name: 'Pricing Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Hình thức thu phí', 'Theo GTGD (% Tỷ lệ) ▾', 270, true),
                    buildField('Mức phí tỷ lệ (%)', '0.45 %', 270, true),
                    buildField('Mức phí tối thiểu (Min)', '2.000 đ', 270, false),
                    buildField('Mức phí tối đa (Max)', '25.000 đ', 270, false)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Pricing Row 2',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Giới hạn hạn mức GD chi hộ tối đa', '500.000.000 đ / Giao dịch', 554, false),
                    buildField('Mô tả mức phí hiển thị', '0.45% (Min 2.000đ, Max 25.000đ) / Lệnh chi hộ thành công', 554, false)
                  ]
                }
              ])
            ]
          }
        ]
      }
    ]
  };
}

// Generate JSON files for all 4 QRGW Create screens
const qrCr01 = buildScrQrCr01();
const qrCr02 = buildScrQrCr02();
const qrCr03 = buildScrQrCr03();
const qrCr04 = buildScrQrCr04();

fs.writeFileSync('scripts/qr-cr-01.json', JSON.stringify(qrCr01), 'utf8');
fs.writeFileSync('scripts/qr-cr-02.json', JSON.stringify(qrCr02), 'utf8');
fs.writeFileSync('scripts/qr-cr-03.json', JSON.stringify(qrCr03), 'utf8');
fs.writeFileSync('scripts/qr-cr-04.json', JSON.stringify(qrCr04), 'utf8');
console.log('✅ Generated 4 QRGW Create screen JSON files successfully!');
