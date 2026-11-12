import fs from 'node:fs';
import readline from 'node:readline';

const file = 'C:/Users/duongnta/.gemini/antigravity/brain/1d6339a4-0b7a-4f3e-934c-fc2181b9dd0c/.system_generated/logs/transcript_full.jsonl';
const rl = readline.createInterface({ input: fs.createReadStream(file) });

rl.on('line', (line) => {
  if (line.includes('"step_index":722') || line.includes('"step_index": 722')) {
    const obj = JSON.parse(line);
    console.log('Tool calls in 722:');
    obj.tool_calls?.forEach(tc => {
      console.log('Tool:', tc.name);
      console.log('Code snippet:', tc.args?.Arguments?.code?.slice(0, 150));
    });
  }
});
