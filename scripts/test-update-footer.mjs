import { runFigmaCode } from './figma-runner.mjs';

const code = `
return {
  methods: Object.keys(figma),
  figmaKeys: Object.getOwnPropertyNames(figma)
};
`;

const res = await runFigmaCode(code, 'Page 2');
console.log(JSON.stringify(JSON.parse(res?.content?.[0]?.text), null, 2));
