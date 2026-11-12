import { runFigmaCode } from './figma-runner.mjs';

const code = `
const footer = await figma.getNodeById('4104:10732');
const children = await figma.getChildren('4104:10732');
const childDetails = [];
for (const c of children) {
  const cNode = await figma.getNodeById(c.id);
  const grandChildren = await figma.getChildren(c.id);
  const gcDetails = [];
  for (const gc of grandChildren) {
    const gcNode = await figma.getNodeById(gc.id);
    gcDetails.push(gcNode);
  }
  childDetails.push({
    btn: cNode,
    children: gcDetails
  });
}
return {
  footer,
  buttons: childDetails
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
