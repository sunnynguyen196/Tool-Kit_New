import { runFigmaCode } from './figma-runner.mjs';

const code = `
const row2Screens = [
  { id: '4104:10585', name: 'SCR-CTT-CR-01A' },
  { id: '4105:13189', name: 'SCR-CTT-CR-01B' },
  { id: '4104:10909', name: 'SCR-CTT-CR-03' },
  { id: '4104:11084', name: 'SCR-CTT-CR-04A' },
  { id: '4109:13966', name: 'SCR-CTT-CR-04B' },
  { id: '4115:14663', name: 'SCR-QR-CR-01' },
  { id: '4115:14825', name: 'SCR-QR-CR-02' },
  { id: '4115:15078', name: 'SCR-QR-CR-03' },
  { id: '4115:15262', name: 'SCR-QR-CR-04' }
];

async function findFooterRecursive(nodeId) {
  const children = await figma.getChildren(nodeId);
  for (const c of children) {
    if (c.name && (c.name.includes('Footer Action') || c.name.includes('Footer'))) {
      return c;
    }
    if (c.type === 'FRAME') {
      const sub = await findFooterRecursive(c.id);
      if (sub) return sub;
    }
  }
  return null;
}

const verifyResults = [];
for (const sc of row2Screens) {
  const footerNode = await findFooterRecursive(sc.id);
  if (!footerNode) {
    verifyResults.push({ ...sc, error: 'NO_FOOTER' });
    continue;
  }
  const fFull = await figma.getNodeById(footerNode.id);
  const fChildren = await figma.getChildren(footerNode.id);
  const btnDetails = [];
  for (const b of fChildren) {
    const bNode = await figma.getNodeById(b.id);
    const bSub = await figma.getChildren(b.id);
    btnDetails.push({
      name: b.name,
      fill: bNode.fill,
      stroke: bNode.stroke,
      w: bNode.width,
      h: bNode.height,
      text: bSub.length > 0 ? bSub[0].characters : ''
    });
  }

  verifyResults.push({
    screen: sc.name,
    footerId: footerNode.id,
    footerAlign: fFull.primaryAxisAlignItems,
    buttonCount: btnDetails.length,
    buttons: btnDetails
  });
}

return verifyResults;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
