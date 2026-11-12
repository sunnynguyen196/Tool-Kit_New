import { runFigmaCode } from './figma-runner.mjs';

const footerTargets = [
  { screen: 'SCR-CTT-CR-01B', footerId: '4105:13357' },
  { screen: 'SCR-CTT-CR-03', footerId: '4104:11075' },
  { screen: 'SCR-CTT-CR-04A', footerId: '4115:14629' },
  { screen: 'SCR-CTT-CR-04B', footerId: '4109:14259' },
  { screen: 'SCR-QR-CR-01', footerId: '4115:14818' },
  { screen: 'SCR-QR-CR-02', footerId: '4115:15071' },
  { screen: 'SCR-QR-CR-03', footerId: '4115:15255' },
  { screen: 'SCR-QR-CR-04', footerId: '4115:15465' }
];

async function updateFooter(target) {
  console.log(`Updating footer for ${target.screen} (${target.footerId})...`);
  const code = `
    const footerId = "${target.footerId}";
    
    // 1. Delete existing children
    const children = await figma.getChildren(footerId);
    for (const c of children) {
      await figma.delete(c.id);
    }

    // 2. Modify footer container to ensure proper layout
    await figma.modify(footerId, {
      name: 'Footer Action Buttons',
      layoutMode: 'HORIZONTAL',
      itemSpacing: 14,
      padding: { l: 0, r: 0, t: 6, b: 6 },
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      layoutAlign: 'STRETCH'
    });

    // 3. Create 4 standard buttons
    const btnSpecs = [
      {
        parentId: footerId,
        type: 'FRAME',
        name: 'Btn: Hủy',
        width: 80,
        height: 34,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        fill: '#ffffff',
        stroke: '#cbd5e1',
        strokeWeight: 1,
        cornerRadius: 6,
        children: [
          {
            type: 'TEXT',
            characters: 'Hủy',
            fontSize: 11,
            fontWeight: 500,
            fill: '#1e293b'
          }
        ]
      },
      {
        parentId: footerId,
        type: 'FRAME',
        name: 'Btn: Tính thử',
        width: 100,
        height: 34,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        fill: '#ffffff',
        stroke: '#2563eb',
        strokeWeight: 1,
        cornerRadius: 6,
        children: [
          {
            type: 'TEXT',
            characters: 'Tính thử 🧮',
            fontSize: 11,
            fontWeight: 600,
            fill: '#2563eb'
          }
        ]
      },
      {
        parentId: footerId,
        type: 'FRAME',
        name: 'Btn: Lưu nháp',
        width: 90,
        height: 34,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        fill: '#ffffff',
        stroke: '#2563eb',
        strokeWeight: 1,
        cornerRadius: 6,
        children: [
          {
            type: 'TEXT',
            characters: 'Lưu nháp',
            fontSize: 11,
            fontWeight: 600,
            fill: '#000000'
          }
        ]
      },
      {
        parentId: footerId,
        type: 'FRAME',
        name: 'Btn: Tạo mới',
        width: 100,
        height: 34,
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        fill: '#2563eb',
        cornerRadius: 6,
        children: [
          {
            type: 'TEXT',
            characters: 'Tạo mới +',
            fontSize: 11,
            fontWeight: 700,
            fill: '#ffffff'
          }
        ]
      }
    ];

    for (const b of btnSpecs) {
      await figma.create(b);
    }

    const newChildren = await figma.getChildren(footerId);
    return {
      screen: "${target.screen}",
      footerId,
      buttonCount: newChildren.length,
      buttons: newChildren.map(c => c.name)
    };
  `;

  const res = await runFigmaCode(code, 'Page 2');
  const parsed = JSON.parse(res?.content?.[0]?.text);
  console.log(`Result for ${target.screen}:`, parsed?.result);
}

async function main() {
  console.log('--- STARTING STANDARDIZATION OF FOOTER ACTION BUTTONS ON ALL SCREENS ---');
  for (const t of footerTargets) {
    await updateFooter(t);
  }
  console.log('--- COMPLETED ALL FOOTERS ---');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
