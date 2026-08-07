import http from 'node:http';

const ports = [38451, 38470, 38471, 38472, 38473, 38474, 38475];

ports.forEach(port => {
  const req = http.get(`http://127.0.0.1:${port}/health`, res => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      console.log(`Port ${port}:`, raw);
    });
  });
  req.on('error', err => {
    // Port closed
  });
});
