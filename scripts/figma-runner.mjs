import { spawn } from 'node:child_process';
import fs from 'node:fs';

export async function runFigmaCode(code, page = 'Page 2', file = 'ForWork') {
  return new Promise((resolve, reject) => {
    const child = spawn('C:\\Users\\duongnta\\AppData\\Local\\Programs\\reqwise-figma\\reqwise-figma.exe', [
      'C:\\Users\\duongnta\\AppData\\Local\\Programs\\reqwise-figma\\resources\\mcp\\dist\\server\\boot.mjs'
    ], { env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' } });

    let out = '';
    let timeoutTimer = null;

    child.stdout.on('data', d => {
      out += d.toString();
      const lines = out.split('\n').filter(Boolean);
      for (const l of lines) {
        try {
          const obj = JSON.parse(l);
          if (obj.id === 2) {
            if (timeoutTimer) clearTimeout(timeoutTimer);
            child.kill();
            resolve(obj.result);
            return;
          }
        } catch {}
      }
    });

    child.stderr.on('data', d => console.error('STDERR:', d.toString()));

    const init = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'antigravity', version: '1.0' } }
    });
    child.stdin.write(init + '\n');

    setTimeout(() => {
      const call = JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: {
          name: 'figma_write',
          arguments: { file, page, code }
        }
      });
      child.stdin.write(call + '\n');
    }, 400);

    timeoutTimer = setTimeout(() => {
      child.kill();
      reject(new Error('Timeout (30s) waiting for figma_write. Raw: ' + out));
    }, 30000);
  });
}

// CLI usage: node scripts/figma-runner.mjs <file.js>
if (process.argv[1] && process.argv[1].endsWith('figma-runner.mjs')) {
  const file = process.argv[2];
  if (!file) {
    console.log('Usage: node scripts/figma-runner.mjs <script-path.js>');
    process.exit(1);
  }
  const code = fs.readFileSync(file, 'utf8');
  console.log('🚀 Executing code on Figma from:', file);
  runFigmaCode(code)
    .then(res => {
      const text = res?.content?.[0]?.text;
      if (text) {
        try {
          const parsed = JSON.parse(text);
          console.log('✅ Parsed Figma result:', JSON.stringify(parsed, null, 2));
        } catch {
          console.log('✅ Raw result:', text);
        }
      } else {
        console.log('✅ Result:', JSON.stringify(res, null, 2));
      }
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
