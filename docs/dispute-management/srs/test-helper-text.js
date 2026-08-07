import http from 'node:http';

const token = "0b59d21459c20766e68e805a20caf5aa1d31d9c55174b902";

function sendRpc(op, params = {}) {
  const payload = JSON.stringify({ op, params });
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 38470,
      path: '/rpc',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function hexColor(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [{ type: "SOLID", color: { r, g, b } }];
}

async function createText(parentId, name, textContent, x, y, options = {}) {
  const res = await sendRpc("create", {
    type: "TEXT",
    parentId: parentId,
    name: name,
    x: x,
    y: y,
    fontSize: options.fontSize || 12
  });

  if (res && res.result && res.result.id) {
    await sendRpc("set_text", {
      nodeId: res.result.id,
      text: textContent
    });
    if (options.fill) {
      await sendRpc("modify", {
        nodeId: res.result.id,
        fills: hexColor(options.fill)
      });
    }
  }
  return res;
}

async function test() {
  const frame = await sendRpc("create", {
    type: "FRAME",
    name: "Test Helper Frame",
    x: 0,
    y: 0,
    width: 400,
    height: 200,
    fills: hexColor('#FFFFFF')
  });

  const frameId = frame.result.id;

  const t1 = await createText(frameId, "Title", "Quản lý tra soát", 20, 20, { fontSize: 22, fill: "#0F172A" });
  const t2 = await createText(frameId, "Sub", "Danh sách yêu cầu tra soát", 20, 60, { fontSize: 14, fill: "#3B82F6" });
  const t3 = await createText(frameId, "Status", "● Chờ phê duyệt", 20, 100, { fontSize: 12, fill: "#D97706" });

  console.log("T1 node:", await sendRpc("get_node", { nodeId: t1.result.id }));
  console.log("T2 node:", await sendRpc("get_node", { nodeId: t2.result.id }));
  console.log("T3 node:", await sendRpc("get_node", { nodeId: t3.result.id }));
}

test().catch(console.error);
