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

function buildField(label, value, width = 270, isRequired = false) {
  return {
    type: 'FRAME',
    name: 'Field: ' + label,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 4,
    children: [
      {
        type: 'TEXT',
        characters: label + (isRequired ? ' *' : ''),
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
          { type: 'TEXT', characters: value, fontSize: 11, fill: TOKENS.ink }
        ]
      }
    ]
  };
}

function buildRadioGroupField(label, options, selectedIndex = 0, width = 554) {
  return {
    type: 'FRAME',
    name: 'RadioField: ' + label,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 6,
    children: [
      { type: 'TEXT', characters: label + ' *', fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
      {
        type: 'FRAME',
        name: 'Radio Options Row',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: options.map((opt, i) => {
          const isSelected = i === selectedIndex;
          return {
            type: 'FRAME',
            name: 'Radio: ' + opt,
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
                  { type: 'FRAME', name: 'Inner Dot', width: 6, height: 6, cornerRadius: 3, fill: TOKENS.primaryAction }
                ] : []
              },
              { type: 'TEXT', characters: opt, fontSize: 11, fontWeight: isSelected ? 600 : 400, fill: isSelected ? TOKENS.ink : TOKENS.inkSecondary }
            ]
          };
        })
      }
    ]
  };
}

function buildCheckboxGroupField(label, options, width = 554) {
  return {
    type: 'FRAME',
    name: 'CheckboxField: ' + label,
    width: width,
    layoutMode: 'VERTICAL',
    itemSpacing: 6,
    children: [
      { type: 'TEXT', characters: label, fontSize: 11, fontWeight: 600, fill: TOKENS.ink },
      {
        type: 'FRAME',
        name: 'Checkboxes Row',
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        children: options.map(opt => {
          return {
            type: 'FRAME',
            name: 'Checkbox: ' + opt.name,
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
                fill: opt.checked ? TOKENS.primaryAction : '#FFFFFF',
                stroke: opt.checked ? TOKENS.primaryAction : TOKENS.borderDark,
                strokeWeight: 1,
                layoutMode: 'HORIZONTAL',
                primaryAxisAlignItems: 'CENTER',
                counterAxisAlignItems: 'CENTER',
                children: opt.checked ? [
                  { type: 'TEXT', characters: '✓', fontSize: 9, fontWeight: 700, fill: '#FFFFFF' }
                ] : []
              },
              { type: 'TEXT', characters: opt.name, fontSize: 11, fontWeight: opt.checked ? 600 : 400, fill: TOKENS.ink }
            ]
          };
        })
      }
    ]
  };
}

function buildCardWrapper(title, subtitle, children) {
  return {
    type: 'FRAME',
    name: 'Card: ' + title,
    layoutMode: 'VERTICAL',
    layoutAlign: 'STRETCH',
    padding: { top: 12, bottom: 14, left: 16, right: 16 },
    cornerRadius: 8,
    fill: TOKENS.cardBg,
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
          ...(subtitle ? [{ type: 'TEXT', characters: subtitle, fontSize: 10, fill: TOKENS.inkMuted }] : [])
        ]
      },
      ...children
    ]
  };
}

function buildCreateHeader(screenTitle, breadcrumb) {
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
          { type: 'TEXT', characters: screenTitle, fontSize: 16, fontWeight: 700, fill: TOKENS.ink },
          { type: 'TEXT', characters: breadcrumb, fontSize: 11, fill: TOKENS.inkMuted }
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
            children: [
              { type: 'TEXT', characters: 'Hủy bỏ', fontSize: 11, fontWeight: 500, fill: TOKENS.inkSecondary }
            ]
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
            children: [
              { type: 'TEXT', characters: '💾  Lưu nháp', fontSize: 11, fontWeight: 500, fill: TOKENS.inkSecondary }
            ]
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
            children: [
              { type: 'TEXT', characters: 'Gửi phê duyệt ✓', fontSize: 11, fontWeight: 600, fill: '#FFFFFF' }
            ]
          }
        ]
      }
    ]
  };
}

// =========================================================================
// SCREEN 1: SCR-CTT-CR-01 (XLGD - Thẻ nội địa & TKNH)
// =========================================================================
export function buildScrCttCr01() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-01: Thêm mới Phí XLGD CTT - Thẻ nội địa & TKNH',
    width: 1440,
    height: 960,
    x: 0,
    y: 1560,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar('CTT'),
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
              buildCreateHeader(
                'Thêm mới Cấu hình Phí CTT: Phí XLGD (Thẻ nội địa & TKNH)',
                'Quản lý cấu hình phí  /  Phí trả đối tác  /  Phí đối tác CTT  /  Tạo mới'
              ),
              // Card 1: Thông tin chung
              buildCardWrapper('1. THÔNG TIN CHUNG', 'Đặc tả các thông số căn bản của hợp đồng cấu hình phí', [
                {
                  type: 'FRAME',
                  name: 'Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Đối tác / Ngân hàng hưởng phí', 'Vietcombank ▾', 270, true),
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
                    buildField('Căn cứ HĐ / Phụ lục', 'HĐ số 2026/VCB-CTT-01', 270, false),
                    buildField('Quy tắc kiểm tra MCC', 'BR-PFEE-02A: Check trùng MCC active', 270, false)
                  ]
                }
              ]),
              // Card 2: Phương thức thanh toán & Điều kiện áp dụng
              buildCardWrapper('2. PHƯƠNG THỨC THANH TOÁN & ĐIỀU KIỆN ÁP DỤNG', 'Cấu hình PTTT Nội địa, Trạng thái GD tính phí và Ngày áp dụng phí hoàn trả', [
                {
                  type: 'FRAME',
                  name: 'Row PTTT & MCC',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Phương thức thanh toán', 'Thẻ nội địa & Tài khoản ngân hàng ▾', 554, true),
                    buildField('Danh mục mã MCC áp dụng', 'Tất cả MCC (Hoặc chọn: 5411, 4829...) ▾', 554, true)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row Radio States',
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
                      { name: 'Giao dịch Thanh toán', checked: true },
                      { name: 'Giao dịch Hoàn trả', checked: true }
                    ], 554),
                    buildField('Ghi chú điều kiện tính phí', 'Áp dụng cho mọi phiên giao dịch qua kênh Napas', 554, false)
                  ]
                }
              ]),
              // Card 3: Hình thức thu phí & Mức phí
              buildCardWrapper('3. HÌNH THỨC THU PHÍ & MỨC PHÍ CẤU HÌNH', 'Hình thức: 1 bậc cố định theo giao dịch', [
                {
                  type: 'FRAME',
                  name: 'Pricing Row',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Hình thức thu phí', '1 bậc (Cố định theo giao dịch) ▾', 270, true),
                    buildField('Mức phí cố định (VND/GD)', '1.100 đ', 270, true),
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

// =========================================================================
// SCREEN 2: SCR-CTT-CR-02 (XLGD - Thẻ quốc tế, Nơi phát hành)
// =========================================================================
export function buildScrCttCr02() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-02: Thêm mới Phí XLGD CTT - Thẻ quốc tế',
    width: 1440,
    height: 960,
    x: 1540,
    y: 1560,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar('CTT'),
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
              buildCreateHeader(
                'Thêm mới Cấu hình Phí CTT: Phí XLGD Thẻ quốc tế (Có Nơi phát hành)',
                'Quản lý cấu hình phí  /  Phí trả đối tác  /  Phí đối tác CTT  /  Tạo mới'
              ),
              // Card 1: Thông tin chung
              buildCardWrapper('1. THÔNG TIN CHUNG', 'Đặc tả thông số hợp đồng ngân hàng thanh toán quốc tế', [
                {
                  type: 'FRAME',
                  name: 'Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Đối tác / Ngân hàng hưởng phí', 'Techcombank ▾', 270, true),
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
                    buildField('Thời gian áp dụng', '01/02/2026 - 31/12/2026 📅', 270, true),
                    buildField('Thuế suất VAT', '8% ▾', 270, true),
                    buildField('Căn cứ HĐ / Phụ lục', 'HĐ số 2026/TCB-INT-FEE', 270, false),
                    buildField('Quy tắc kiểm tra MCC', 'BR-PFEE-02A: Check trùng MCC active', 270, false)
                  ]
                }
              ]),
              // Card 2: Phương thức thanh toán & Nơi phát hành
              buildCardWrapper('2. PHƯƠNG THỨC THANH TOÁN & NƠI PHÁT HÀNH THẺ QUỐC TẾ', 'Phân tách rõ Thẻ Trong nước / Nước ngoài và Trạng thái giao dịch tính phí', [
                {
                  type: 'FRAME',
                  name: 'Row PTTT & Nơi phát hành',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Phương thức thanh toán', 'Thẻ quốc tế (Visa, Master, JCB) ▾', 554, true),
                    buildRadioGroupField('Nơi phát hành thẻ * (Đặc thù Thẻ quốc tế)', ['Trong nước', 'Nước ngoài'], 0, 554)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row States & MCC',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildRadioGroupField('Trạng thái giao dịch tính phí *', ['Tất cả giao dịch', 'Chỉ Thành công', 'Chỉ Thất bại'], 1, 554),
                    buildField('Danh mục mã MCC áp dụng', '5411 (Siêu thị & Cửa hàng tiện lợi) ▾', 554, true)
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
                      { name: 'Thanh toán', checked: true },
                      { name: 'Hoàn trả', checked: true }
                    ], 554),
                    buildRadioGroupField('Ngày áp dụng phí khi Hoàn trả *', ['Ngày giao dịch gốc', 'Ngày tạo GD hoàn trả'], 1, 554)
                  ]
                }
              ]),
              // Card 3: Hình thức thu phí Bậc thang SLGD
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
                    buildField('Mức phí tối thiểu nếu không đạt bậc', '1.500 đ/GD', 360, false)
                  ]
                },
                // Bảng Bậc thang SLGD
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
                        { type: 'FRAME', name: 'Td Đến', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '5.000', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Phí', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '1.500 đ / GD', fontSize: 11, fontWeight: 600, fill: TOKENS.primaryAction }] },
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
                        { type: 'FRAME', name: 'Td Từ', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '5.001', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Đến', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '20.000', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Phí', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '1.200 đ / GD', fontSize: 11, fontWeight: 600, fill: TOKENS.primaryAction }] },
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
                        { type: 'FRAME', name: 'Td Từ', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '20.001', fontSize: 11, fill: TOKENS.ink }] },
                        { type: 'FRAME', name: 'Td Đến', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: 'Trở lên (Không giới hạn)', fontSize: 11, fill: TOKENS.inkMuted }] },
                        { type: 'FRAME', name: 'Td Phí', width: 260, layoutMode: 'HORIZONTAL', children: [{ type: 'TEXT', characters: '1.000 đ / GD', fontSize: 11, fontWeight: 600, fill: TOKENS.primaryAction }] },
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

// =========================================================================
// SCREEN 3: SCR-CTT-CR-03 (Phí Thanh toán - Thẻ nội địa & TKNH)
// =========================================================================
export function buildScrCttCr03() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-03: Thêm mới Phí Thanh toán CTT - Thẻ nội địa',
    width: 1440,
    height: 960,
    x: 3080,
    y: 1560,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar('CTT'),
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
              buildCreateHeader(
                'Thêm mới Cấu hình Phí CTT: Phí Thanh toán (Thẻ nội địa & TKNH)',
                'Quản lý cấu hình phí  /  Phí trả đối tác  /  Phí đối tác CTT  /  Tạo mới'
              ),
              // Card 1: Thông tin chung
              buildCardWrapper('1. THÔNG TIN CHUNG', 'Đặc tả thông số hợp đồng thu phí thanh toán với ngân hàng', [
                {
                  type: 'FRAME',
                  name: 'Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Đối tác / Ngân hàng hưởng phí', 'BIDV ▾', 270, true),
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
                    buildField('Căn cứ HĐ / Phụ lục', 'HĐ số 2026/BIDV-PGW-FEE', 270, false),
                    buildField('Quy tắc kiểm tra MCC', 'BR-PFEE-02A: Check trùng MCC active', 270, false)
                  ]
                }
              ]),
              // Card 2: Phương thức thanh toán & MCC
              buildCardWrapper('2. PHƯƠNG THỨC THANH TOÁN & DANH MỤC MCC', 'Cấu hình phương thức thanh toán Thẻ ghi nợ nội địa / TK ngân hàng', [
                {
                  type: 'FRAME',
                  name: 'Row PTTT & MCC',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Phương thức thanh toán', 'Thẻ ghi nợ nội địa (ATM / Napas) ▾', 554, true),
                    buildField('Mã ngành MCC áp dụng', '5311 (Trung tâm thương mại & Bách hóa) ▾', 554, true)
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
                      { name: 'Thanh toán thành công', checked: true },
                      { name: 'Giao dịch Hoàn trả tiền', checked: true }
                    ], 554),
                    buildRadioGroupField(
                      'Ngày áp dụng phí trên giao dịch (Khi chọn Hoàn trả) *',
                      ['Ngày giao dịch gốc', 'Ngày tạo giao dịch hoàn trả'],
                      0,
                      554
                    )
                  ]
                }
              ]),
              // Card 3: Mức phí thanh toán % Tỷ lệ có Min/Max
              buildCardWrapper('3. HÌNH THỨC THU PHÍ & MỨC PHÍ CẤU HÌNH', 'Hình thức: Theo GTGD (% Tỷ lệ có trần sàn Min / Max)', [
                {
                  type: 'FRAME',
                  name: 'Pricing Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Hình thức thu phí', 'Theo GTGD (% Tỷ lệ) ▾', 270, true),
                    buildField('Mức phí tỷ lệ (%)', '0.85 %', 270, true),
                    buildField('Mức phí tối thiểu (Min)', '2.000 đ', 270, false),
                    buildField('Mức phí tối đa (Max)', '50.000 đ', 270, false)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Pricing Row 2',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Áp dụng riêng cho Hoàn trả', 'Không (Dùng chung mức phí 0.85%) ▾', 554, false),
                    buildField('Công thức tính phí hiển thị', 'Phí = Clamp(0.85% x GTGD, 2.000đ, 50.000đ) + 8% VAT', 554, false)
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

// =========================================================================
// SCREEN 4: SCR-CTT-CR-04 (Phí Thanh toán - Thẻ quốc tế: Brand, Nơi phát hành, Min/Max)
// =========================================================================
export function buildScrCttCr04() {
  return {
    type: 'FRAME',
    name: 'SCR-CTT-CR-04: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế',
    width: 1440,
    height: 960,
    x: 4620,
    y: 1560,
    fill: TOKENS.bodyBg,
    layoutMode: 'HORIZONTAL',
    itemSpacing: 0,
    children: [
      buildSidebar('CTT'),
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
              buildCreateHeader(
                'Thêm mới Cấu hình Phí CTT: Phí Thanh toán Thẻ quốc tế (Đặc thù Brand, Nơi phát hành, Min/Max)',
                'Quản lý cấu hình phí  /  Phí trả đối tác  /  Phí đối tác CTT  /  Tạo mới'
              ),
              // Card 1: Thông tin chung
              buildCardWrapper('1. THÔNG TIN CHUNG', 'Đặc tả thông số hợp đồng ngân hàng thanh toán thẻ quốc tế', [
                {
                  type: 'FRAME',
                  name: 'Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Đối tác / Ngân hàng hưởng phí', 'VietinBank ▾', 270, true),
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
                    buildField('Căn cứ HĐ / Phụ lục', 'HĐ số 2026/VTB-INT-MERCHANT', 270, false),
                    buildField('Quy tắc kiểm tra MCC', 'BR-PFEE-02A: Check trùng MCC active', 270, false)
                  ]
                }
              ]),
              // Card 2: Thương hiệu thẻ & Nơi phát hành
              buildCardWrapper('2. THƯƠNG HIỆU THẺ, NƠI PHÁT HÀNH & MCC', 'Cấu hình thương hiệu thẻ quốc tế và phân định Thẻ trong nước / Nước ngoài', [
                {
                  type: 'FRAME',
                  name: 'Row Brands & Origin',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildCheckboxGroupField('Thương hiệu thẻ áp dụng *', [
                      { name: 'Visa', checked: true },
                      { name: 'MasterCard', checked: true },
                      { name: 'JCB', checked: true },
                      { name: 'Amex', checked: false }
                    ], 554),
                    buildRadioGroupField('Nơi phát hành thẻ * (Đặc thù Thẻ quốc tế)', ['Trong nước', 'Nước ngoài'], 0, 554)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Row Mechanism & MCC',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildRadioGroupField(
                      'Cơ chế cấu hình mức phí theo thương hiệu *',
                      ['Áp dụng chung 1 mức phí cho tất cả thương hiệu', 'Cấu hình biểu phí riêng theo từng thương hiệu'],
                      0,
                      554
                    ),
                    buildField('Mã ngành MCC áp dụng', 'Tất cả MCC (Hoặc chọn mã cụ thể) ▾', 554, true)
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
                      { name: 'Giao dịch Thanh toán', checked: true },
                      { name: 'Giao dịch Hoàn trả', checked: true }
                    ], 554),
                    buildRadioGroupField(
                      'Ngày áp dụng phí khi Hoàn trả *',
                      ['Ngày giao dịch gốc', 'Ngày tạo giao dịch hoàn trả'],
                      0,
                      554
                    )
                  ]
                }
              ]),
              // Card 3: Mức phí % Tỷ lệ có Min/Max
              buildCardWrapper('3. HÌNH THỨC THU PHÍ & MỨC PHÍ CẤU HÌNH', 'Hình thức: Theo GTGD (% Tỷ lệ có mức phí Tối thiểu và Tối đa)', [
                {
                  type: 'FRAME',
                  name: 'Pricing Row 1',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Hình thức thu phí', 'Theo GTGD (% Tỷ lệ) ▾', 270, true),
                    buildField('Mức phí tỷ lệ (%)', '1.25 %', 270, true),
                    buildField('Mức phí tối thiểu (Min)', '5.000 đ', 270, false),
                    buildField('Mức phí tối đa (Max)', '100.000 đ', 270, false)
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Pricing Row 2',
                  layoutMode: 'HORIZONTAL',
                  layoutAlign: 'STRETCH',
                  itemSpacing: 12,
                  children: [
                    buildField('Tùy chọn cấu hình riêng cho Nước ngoài', 'Tự động cộng thêm 0.2% phụ phí Cross-border', 554, false),
                    buildField('Mô tả mức phí hiển thị', '1.25% (Min 5.000đ, Max 100.000đ) / GD thành công', 554, false)
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

// Generate JSON files for all 4 CTT Create screens
const cr01 = buildScrCttCr01();
const cr02 = buildScrCttCr02();
const cr03 = buildScrCttCr03();
const cr04 = buildScrCttCr04();

fs.writeFileSync('scripts/ctt-cr-01.json', JSON.stringify(cr01), 'utf8');
fs.writeFileSync('scripts/ctt-cr-02.json', JSON.stringify(cr02), 'utf8');
fs.writeFileSync('scripts/ctt-cr-03.json', JSON.stringify(cr03), 'utf8');
fs.writeFileSync('scripts/ctt-cr-04.json', JSON.stringify(cr04), 'utf8');
console.log('✅ Generated 4 CTT Create screen JSON files successfully!');
