import fs from 'node:fs';
import readline from 'node:readline';

const file = 'C:/Users/duongnta/.gemini/antigravity/brain/1d6339a4-0b7a-4f3e-934c-fc2181b9dd0c/.system_generated/logs/transcript_full.jsonl';
const rl = readline.createInterface({ input: fs.createReadStream(file) });

const matchSteps = [];
rl.on('line', (line) => {
  if (line.includes('figma_write') && line.includes('call_mcp_tool')) {
    const obj = JSON.parse(line);
    matchSteps.push(obj.step_index);
  }
});

rl.on('close', () => {
  console.log('Matching steps:', matchSteps.slice(-10));
});
