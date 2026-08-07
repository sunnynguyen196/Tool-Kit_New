import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const figmaCode = fs.readFileSync(path.join(__dirname, 'figma-draw-script.js'), 'utf8');

const payload = JSON.stringify({
  operation: "eval",
  params: {
    code: figmaCode
  }
});

console.log("👀 Đang theo dõi cổng MCP Bridge (38451)... Tự động vẽ ngay khi Figma kết nối!");

function checkAndDraw() {
  http.get('http://127.0.0.1:38451/health', (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      try {
        const data = JSON.parse(raw);
        if (data.pluginConnected) {
          console.log("⚡ PHÁT HIỆN FIGMA PLUGIN ĐÃ KẾT NỐI! Đang gửi lệnh vẽ...");
          sendDrawCommand();
        } else {
          setTimeout(checkAndDraw, 1000);
        }
      } catch(e) {
        setTimeout(checkAndDraw, 1000);
      }
    });
  }).on('error', () => {
    setTimeout(checkAndDraw, 1000);
  });
}

function sendDrawCommand() {
  const req = http.request({
    hostname: '127.0.0.1',
    port: 38451,
    path: '/exec',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log("🎉 KẾT QUẢ VẼ TRÊN FIGMA:", body);
      process.exit(0);
    });
  });

  req.on('error', (err) => {
    console.error("❌ Lỗi gửi lệnh:", err.message);
    setTimeout(checkAndDraw, 1000);
  });

  req.write(payload);
  req.end();
}

checkAndDraw();
