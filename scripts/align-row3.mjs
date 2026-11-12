import { runFigmaCode } from './figma-runner.mjs';

const coords = [
  { id: '4116:19504', x: -1862, y: 2600 },
  { id: '4116:19852', x: -322, y: 2600 },
  { id: '4116:20222', x: 1218, y: 2600 },
  { id: '4116:20666', x: 2758, y: 2600 },
  { id: '4116:21039', x: 4298, y: 2600 },
  { id: '4116:21415', x: 5838, y: 2600 },
  { id: '4116:21762', x: 7378, y: 2600 },
  { id: '4116:22135', x: 9580, y: 2600 },
  { id: '4116:22393', x: 11120, y: 2600 },
  { id: '4116:22673', x: 12660, y: 2600 },
  { id: '4116:23020', x: 14200, y: 2600 },
  { id: '4116:23303', x: 15740, y: 2600 },
  { id: '4116:23589', x: 17280, y: 2600 },
  { id: '4116:23846', x: 18820, y: 2600 }
];

const code = `
const coords = ${JSON.stringify(coords)};
const updated = [];
for (const c of coords) {
  try {
    await figma.modify(c.id, { x: c.x, y: c.y });
    updated.push(c.id);
  } catch (e) {}
}
return { count: updated.length };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
