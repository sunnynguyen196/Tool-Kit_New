import { runFigmaCode } from './figma-runner.mjs';

const code = `
const frame = await figma.create({
  type: "FRAME",
  name: "Test Absolute",
  x: 7000,
  y: 0,
  layoutMode: "VERTICAL",
  width: 200,
  height: 100,
  fill: "#FFFFFF",
  children: [
    {
      type: "FRAME",
      name: "Popup",
      layoutPositioning: "ABSOLUTE",
      x: 20,
      y: 20,
      width: 100,
      height: 60,
      fill: "#F1F5F9"
    }
  ]
});
const id = frame.id;
await figma.delete(id);
return { ok: true, id };
`;

const res = await runFigmaCode(code, 'Page 2');
console.log('Result:\n', res?.content?.[0]?.text);
