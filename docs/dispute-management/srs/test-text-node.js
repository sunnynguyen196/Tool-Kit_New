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

async function testText() {
  console.log("🔍 Testing TEXT node creation...");

  const frame = await sendRpc("create", {
    type: "FRAME",
    name: "Test Text Frame",
    x: 0,
    y: 0,
    width: 400,
    height: 200,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
  });

  console.log("Frame result:", frame);
  const frameId = frame.result.id;

  // Test 1: standard create text
  const text1 = await sendRpc("create", {
    type: "TEXT",
    parentId: frameId,
    name: "Text 1",
    content: "Hello World Standard",
    fontSize: 16,
    x: 20,
    y: 20
  });
  console.log("Text 1 result:", text1);

  // Test 2: using set_text operation
  if (text1.result && text1.result.id) {
    const setRes = await sendRpc("set_text", {
      nodeId: text1.result.id,
      text: "Hello World SetText"
    });
    console.log("set_text result:", setRes);
  }

  // Test 3: checking node details
  if (text1.result && text1.result.id) {
    const nodeRes = await sendRpc("get_node", { nodeId: text1.result.id });
    console.log("get_node result:", JSON.stringify(nodeRes, null, 2));
  }
}

testText().catch(console.error);
