import { runFigmaCode } from './figma-runner.mjs';

const code = `
const tierNodes = await figma.searchNodes({ query: "Mức phí bậc" });
const items = [];

for (const n of (tierNodes?.nodes || [])) {
  let curr = await figma.getNodeById(n.id);
  let path = [curr.name];
  // check if we can trace up
  let p = curr.parent;
  while (p && p.type !== 'PAGE' && p.type !== 'DOCUMENT') {
    path.unshift(p.name);
    p = p.parent;
  }
  items.push({
    id: n.id,
    name: n.name,
    characters: n.characters,
    path: path.slice(0, 3).join(' > ')
  });
}

return items;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
