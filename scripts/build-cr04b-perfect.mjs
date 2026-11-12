import fs from 'node:fs';
import { runFigmaCode } from './figma-runner.mjs';

const TOKENS = {
  ink: '#1E293B',
  inkMuted: '#64748B',
  inkLight: '#94A3B8',
  white: '#FFFFFF',
  bluePrimary: '#2563EB',
  blueBg: '#EFF6FF',
  red: '#EF4444',
  border: '#CBD5E1',
  cardBg: '#F8FAFC'
};

function buildTierRow({ num, rangeMin = '---', rangeMax = '---', rate = '0.74', showActions = false }) {
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
      // Cột 1: Tổng SLGD/ Tổng GTGD
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
      // Cột 2: Mức phí tỷ lệ
      {
        type: 'FRAME',
        name: 'Col: Rate',
        layoutMode: 'VERTICAL',
        itemSpacing: 3,
        children: [
          { type: 'TEXT', characters: 'Mức phí tỷ lệ', fontSize: 10, fontWeight: 500, fill: TOKENS.inkMuted },
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
            children: [
              { type: 'TEXT', characters: '|', fontSize: 11, fill: TOKENS.bluePrimary }
            ]
          }
        ]
      },
      // Cột 4: Mức phí tối đa
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
            children: [
              { type: 'TEXT', characters: '|', fontSize: 11, fill: TOKENS.bluePrimary }
            ]
          }
        ]
      },
      // Nút actions (+ / –)
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

function buildJcbSubCard() {
  return {
    type: 'FRAME',
    name: 'Brand Card: JCB (Bậc thang)',
    layoutAlign: 'STRETCH',
    layoutMode: 'VERTICAL',
    padding: { left: 14, right: 14, top: 8, bottom: 10 },
    cornerRadius: 4,
    fill: TOKENS.cardBg,
    stroke: TOKENS.border,
    strokeWeight: 1,
    itemSpacing: 8,
    children: [
      { type: 'TEXT', characters: 'Thương hiệu thẻ: JCB', fontSize: 11, fontWeight: 700, fill: TOKENS.ink },
      // Dropdown Hình thức thu phí
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
              { type: 'TEXT', characters: 'Bậc thang Tổng GTGD', fontSize: 11, fill: TOKENS.ink },
              { type: 'TEXT', characters: '▾', fontSize: 10, fill: TOKENS.inkMuted }
            ]
          }
        ]
      },
      // Bậc 1
      buildTierRow({ num: 1, rangeMin: '---', rangeMax: '---', rate: '0.74', showActions: false }),
      // Bậc 2
      buildTierRow({ num: 2, rangeMin: '---', rangeMax: '---', rate: '0.73', showActions: true }),
      // Bậc 3
      buildTierRow({ num: 3, rangeMin: '---', rangeMax: '---', rate: '0.70', showActions: true })
    ]
  };
}

async function main() {
  const jsonPath = 'scripts/scr-ctt-cr-04b-2tabs.min.json';
  const spec = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Locate and replace Brand Card: JCB (Bậc thang)
  function replaceJcb(node) {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].name && node.children[i].name.includes('JCB')) {
          node.children[i] = buildJcbSubCard();
          return true;
        }
        if (replaceJcb(node.children[i])) return true;
      }
    }
    return false;
  }

  const replaced = replaceJcb(spec);
  console.log('Replaced JCB sub-card:', replaced);

  // Set height to 1020 to ensure all content fits and no overlap with Row 3
  spec.height = 1020;
  spec.children[0].height = 1020; // sidebar
  spec.children[1].height = 1020; // main content wrapper

  fs.writeFileSync('scripts/scr-ctt-cr-04b-perfect.min.json', JSON.stringify(spec));
  console.log('Wrote scripts/scr-ctt-cr-04b-perfect.min.json');

  // Now replace on Figma
  const replaceCode = `
    const old = await figma.searchNodes({ query: "SCR-CTT-CR-04B" });
    for (const n of (old?.nodes || [])) {
      if (n.type === "FRAME" && n.name.startsWith("SCR-CTT-CR-04B")) {
        await figma.delete(n.id);
        console.log("Deleted old node:", n.id);
      }
    }
    const spec = ${JSON.stringify(spec)};
    const created = await figma.create(spec);
    return { ok: true, id: created.id, name: created.name, x: created.x, y: created.y, width: created.width, height: created.height };
  `;

  console.log('Replacing SCR-CTT-CR-04B on Figma...');
  const res = await runFigmaCode(replaceCode, 'Page 2');
  console.log('Result:\n', res?.content?.[0]?.text);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
