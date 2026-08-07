import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đọc mã Figma JS từ draw-list-screen-figma.js
const figmaCode = fs.readFileSync(path.join(__dirname, 'draw-list-screen-figma.js'), 'utf8');

const payload = JSON.stringify({
  operation: "eval",
  params: {
    code: figmaCode
  }
});

const req = http.request({
  hostname: '127.0.0.1',
  port: 38470, // Cổng 38470 đang mở và có plugin kết nối
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
    console.log('Response Status:', res.statusCode);
    console.log('Response Body:', body);
  });
});

req.on('error', (err) => {
  console.error('Request Error:', err.message);
});

req.write(payload);
req.end();
