import http from 'node:http';

const paths = ['/', '/exec', '/eval', '/run', '/cmd', '/execute', '/post', '/evalCode'];
const payload = JSON.stringify({
  operation: "eval",
  params: {
    code: "console.log('hello');"
  }
});

paths.forEach(path => {
  const req = http.request({
    hostname: '127.0.0.1',
    port: 38470,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(`POST ${path}: status = ${res.statusCode}, body = ${body}`);
    });
  });
  req.on('error', err => {
    console.error(`POST ${path} error:`, err.message);
  });
  req.write(payload);
  req.end();
});
