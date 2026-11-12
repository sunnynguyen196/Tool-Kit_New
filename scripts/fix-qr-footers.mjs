import { runFigmaCode } from './figma-runner.mjs';

const footerIds = ['4116:18818', '4116:19071', '4116:19255', '4116:19465'];

const code = `
const footerIds = ${JSON.stringify(footerIds)};

const btnSpecs = [
  {
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

const results = [];
for (const fid of footerIds) {
  const children = await figma.getChildren(fid);
  for (const c of children) {
    await figma.delete(c.id);
  }

  await figma.modify(fid, {
    name: 'Footer Action Buttons',
    layoutMode: 'HORIZONTAL',
    itemSpacing: 14,
    padding: { l: 0, r: 0, t: 6, b: 6 },
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    layoutAlign: 'STRETCH'
  });

  for (const b of btnSpecs) {
    await figma.create({ parentId: fid, ...b });
  }

  const newChildren = await figma.getChildren(fid);
  results.push({
    footerId: fid,
    buttons: newChildren.map(c => c.name)
  });
}

return results;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
