// Testing top meta card structure matching the user's reference image
export function buildTopMetaCard(info, approval) {
  return {
    type: 'FRAME',
    name: 'Card: Thông tin trạng thái & Phê duyệt',
    layoutAlign: 'STRETCH',
    layoutMode: 'HORIZONTAL',
    itemSpacing: 16,
    children: [
      // Left box: THÔNG TIN CHUNG
      {
        type: 'FRAME',
        name: 'Box: Thông tin chung',
        layoutGrow: 1,
        layoutMode: 'VERTICAL',
        padding: 16,
        cornerRadius: 8,
        fill: '#FFFFFF',
        stroke: '#E2E8F0',
        strokeWeight: 1,
        itemSpacing: 10,
        children: [
          {
            type: 'FRAME',
            name: 'Box Header',
            layoutMode: 'HORIZONTAL',
            counterAxisAlignItems: 'CENTER',
            children: [
              { type: 'TEXT', characters: 'THÔNG TIN CHUNG', fontSize: 12, fontWeight: 700, fill: '#1E293B' }
            ]
          },
          {
            type: 'FRAME',
            name: 'Grid Rows',
            layoutAlign: 'STRETCH',
            layoutMode: 'VERTICAL',
            itemSpacing: 8,
            children: [
              // Row 1
              {
                type: 'FRAME',
                name: 'Row 1',
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                children: [
                  buildMetaCol('Mã đối tác', info.partnerCode, 180),
                  buildMetaCol('Loại phí', info.feeType, 180),
                  buildMetaCol('Trạng thái vận hành', info.opStatus, 180, info.opStatusColor),
                  buildMetaCol('Trạng thái CSDL', info.dbStatus, 180, info.dbStatusColor)
                ]
              },
              // Row 2
              {
                type: 'FRAME',
                name: 'Row 2',
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                children: [
                  buildMetaCol('Ngày bắt đầu áp dụng', info.startDate, 180),
                  buildMetaCol('Ngày kết thúc áp dụng', info.endDate, 180),
                  buildMetaCol('Thời gian tạo', info.createdAt, 180),
                  buildMetaCol('Người tạo', info.createdBy, 180)
                ]
              }
            ]
          }
        ]
      },
      // Right box: THÔNG TIN PHÊ DUYỆT (Only if approval data is present)
      ...(approval ? [{
        type: 'FRAME',
        name: 'Box: Thông tin phê duyệt',
        width: 380,
        layoutMode: 'VERTICAL',
        padding: 16,
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
              { type: 'TEXT', characters: '📋 THÔNG TIN PHÊ DUYỆT', fontSize: 12, fontWeight: 700, fill: '#0369A1' }
            ]
          },
          {
            type: 'FRAME',
            name: 'Approval Rows',
            layoutAlign: 'STRETCH',
            layoutMode: 'VERTICAL',
            itemSpacing: 8,
            children: [
              {
                type: 'FRAME',
                name: 'App Row 1',
                layoutAlign: 'STRETCH',
                layoutMode: 'HORIZONTAL',
                children: [
                  buildMetaCol('Mã yêu cầu', approval.reqCode, 180),
                  buildMetaCol('Trạng thái duyệt', approval.reqStatus, 160, approval.reqStatusColor)
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
          }
        ]
      }] : [])
    ]
  };
}

function buildMetaCol(label, val, width = 180, badgeColor = null) {
  return {
    type: 'FRAME',
    name: `Col: ${label}`,
    width,
    layoutMode: 'VERTICAL',
    itemSpacing: 2,
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
          { type: 'TEXT', characters: val, fontSize: 11, fontWeight: 600, fill: badgeColor.text }
        ]
      } : {
        type: 'TEXT', characters: val, fontSize: 11, fontWeight: 600, fill: '#1E293B'
      }
    ]
  };
}
