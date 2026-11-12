import { runFigmaCode } from './figma-runner.mjs';

const code = `
const qrIds = ['4105:13364', '4109:14268', '4105:13646', '4105:13796'];
const results = {};

for (const id of qrIds) {
  const node = await figma.getNodeById(id);
  results[id] = {
    id,
    name: node?.name,
    x: node?.x,
    y: node?.y,
    width: node?.width,
    height: node?.height
  };
}

return results;
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
