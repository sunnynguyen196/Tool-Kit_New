import { runFigmaCode } from './figma-runner.mjs';

const code = `
const allNodes = await figma.searchNodes({ query: "Bậc thang" });
const cr04b = await figma.getNodeById('4104:12251');

function findTexts(n, acc=[]) {
  if (n.characters) acc.push({ id: n.id, text: n.characters, parent: n.parent?.name });
  if (n.children) {
    for (const c of n.children) findTexts(c, acc);
  }
  return acc;
}

const res = {
  tieredFeeNodesFound: (allNodes?.nodes || []).map(n => ({ id: n.id, name: n.name, type: n.type, page: n.page?.name })),
  cr04bTexts: cr04b ? findTexts(cr04b).filter(t => t.text.includes('Bậc') || t.text.includes('JCB') || t.text.includes('0.7')) : []
};

return res;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
