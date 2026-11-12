import { runFigmaCode } from './figma-runner.mjs';

const code = `
const node = await figma.getNodeById('4104:12251');
// Search all text nodes under node or find within children
const allTexts = await figma.searchNodes({ query: "Mức phí bậc" });
return {
  cr04bExists: !!node,
  name: node?.name,
  x: node?.x,
  y: node?.y,
  width: node?.width,
  height: node?.height,
  tierTexts: (allTexts?.nodes || []).map(n => ({ id: n.id, name: n.name, type: n.type, page: n.page?.name }))
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
