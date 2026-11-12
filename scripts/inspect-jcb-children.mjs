import { runFigmaCode } from './figma-runner.mjs';

const code = `
const jcbNode = await figma.getNodeById('4104:12463');
return {
  hasChildren: !!jcbNode.children,
  childCount: jcbNode.children?.length,
  childNames: jcbNode.children?.map(c => c.name)
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
