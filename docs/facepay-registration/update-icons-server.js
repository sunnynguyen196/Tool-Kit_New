import http from 'node:http';

const token = "479ac1abb5a90d33777c610b6cfed7f450959e522ae1dbb2";

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

async function updateIconsAndServer() {
  console.log("🎨 Đang cập nhật ICON THẺ NỘI ĐỊA/QUỐC TẾ và ICON SERVER RACK CHO PETROLIMEX BƯỚC 4...");

  // --- 1. CẬP NHẬT FRAME 1: LUỒNG THANH TOÁN (x: 0, y: 0) ---
  const masterPayment = await sendRpc("create", {
    type: "FRAME",
    name: "LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX",
    x: 0,
    y: 0,
    width: 1350,
    height: 650,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 20
  });

  const payId = masterPayment.result.id;

  // Tiêu đề
  const tPay = await sendRpc("create", { type: "TEXT", parentId: payId, x: 260, y: 24, fontSize: 24 });
  await sendRpc("set_text", { nodeId: tPay.result.id, content: "LUỒNG THANH TOÁN FACEPAY TẠI CỘT BƠM PETROLIMEX" });
  await sendRpc("modify", { nodeId: tPay.result.id, props: { fills: [{ type: "SOLID", color: { r: 0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  // 5 Steps Header
  const stepPayConfigs = [
    { num: "1", x: 40, title: "Khách hàng thực hiện\nđổ xăng tại cột bơm\nsố 1 có gắn\nthiết bị miniPos S30" },
    { num: "2", x: 290, title: "Khách hàng chọn\nphương thức thanh toán\nFacePay trên ứng dụng\nbán hàng tại miniPos S30", sub: "(Điều kiện: KH đã đăng ký\nFacePay trên ứng dụng\nPetrolimex 2.0)" },
    { num: "3", x: 540, title: "Khách hàng căn chỉnh\nmặt trước màn hình\nthiết bị miniPos S30" },
    { num: "4", x: 790, title: "Hệ thống Petrolimex 2.0\nkiểm tra thông tin sinh trắc học\nvà token của user tương ứng.", sub: "Gửi yêu cầu thanh toán\nbằng token đến\nCổng thanh toán Epay" },
    { num: "5", x: 1040, title: "Cổng thanh toán Epay\nxử lý giao dịch thanh toán\n& cấp phép giao dịch" }
  ];

  for (const s of stepPayConfigs) {
    await sendRpc("create", { type: "ELLIPSE", parentId: payId, x: s.x + 90, y: 68, width: 36, height: 36, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }] });
    const n = await sendRpc("create", { type: "TEXT", parentId: payId, x: s.x + 102, y: 76, fontSize: 18 });
    await sendRpc("set_text", { nodeId: n.result.id, content: s.num });
    await sendRpc("modify", { nodeId: n.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

    const t = await sendRpc("create", { type: "TEXT", parentId: payId, x: s.x, y: 112, width: 220, fontSize: 11 });
    await sendRpc("set_text", { nodeId: t.result.id, content: s.title });
    await sendRpc("modify", { nodeId: t.result.id, props: { fills: [{ type: "SOLID", color: { r: 0, g: 0.176, b: 0.384 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

    if (s.sub) {
      const sb = await sendRpc("create", { type: "TEXT", parentId: payId, x: s.x, y: 172, width: 220, fontSize: 9.5 });
      await sendRpc("set_text", { nodeId: sb.result.id, content: s.sub });
      await sendRpc("modify", { nodeId: sb.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });
    }
  }

  // Step 1 Gas Pump
  const pCard = await sendRpc("create", { type: "FRAME", parentId: payId, name: "Step 1 - Gas Pump", x: 25, y: 240, width: 200, height: 330, fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 12 });
  const pcId = pCard.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 15, y: 10, width: 170, height: 30, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 22, y: 15, width: 20, height: 20, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 4 });
  const p1 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 28, y: 17, fontSize: 13 });
  await sendRpc("set_text", { nodeId: p1.result.id, content: "P" });
  await sendRpc("modify", { nodeId: p1.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pb1 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 48, y: 20, fontSize: 10 });
  await sendRpc("set_text", { nodeId: pb1.result.id, content: "PETROLIMEX" });
  await sendRpc("modify", { nodeId: pb1.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 25, y: 48, width: 150, height: 200, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 35, y: 58, width: 130, height: 65, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 155, y: 90, width: 24, height: 24, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  const n01 = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 159, y: 94, fontSize: 11 });
  await sendRpc("set_text", { nodeId: n01.result.id, content: "01" });
  await sendRpc("modify", { nodeId: n01.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 40, y: 145, width: 120, height: 90, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 6 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 65, y: 158, width: 64, height: 64, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 10 });
  const bigP = await sendRpc("create", { type: "TEXT", parentId: pcId, x: 84, y: 168, fontSize: 38 });
  await sendRpc("set_text", { nodeId: bigP.result.id, content: "P" });
  await sendRpc("modify", { nodeId: bigP.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "ELLIPSE", parentId: pcId, x: 120, y: 125, width: 56, height: 56, fills: [], strokes: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], strokeWeight: 2 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pcId, x: 136, y: 136, width: 24, height: 34, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 4 });

  // Arrow 1
  const a1 = await sendRpc("create", { type: "TEXT", parentId: payId, x: 238, y: 370, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a1.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a1.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // Step 2 miniPOS S30 Screen 1
  const pos2 = await sendRpc("create", { type: "FRAME", parentId: payId, name: "Step 2 - miniPos S30 Screen 1", x: 270, y: 280, width: 210, height: 235, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.8, g: 0.83, b: 0.88 } }], strokeWeight: 3, cornerRadius: 16 });
  const p2Id = pos2.result.id;

  await sendRpc("create", { type: "ELLIPSE", parentId: p2Id, x: 101, y: 8, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 50, y: 22, width: 14, height: 14, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 3 });
  const pSmall2 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 54, y: 23, fontSize: 9 });
  await sendRpc("set_text", { nodeId: pSmall2.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pSmall2.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pBrand2 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 68, y: 24, fontSize: 9 });
  await sendRpc("set_text", { nodeId: pBrand2.result.id, content: "PETROLIMEX" });
  await sendRpc("modify", { nodeId: pBrand2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const totNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 80, y: 44, fontSize: 9 });
  await sendRpc("set_text", { nodeId: totNode.result.id, content: "Tổng tiền" });
  await sendRpc("modify", { nodeId: totNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }] } });

  const amtNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 38, y: 56, fontSize: 16 });
  await sendRpc("set_text", { nodeId: amtNode.result.id, content: "500.000 VND" });
  await sendRpc("modify", { nodeId: amtNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const selNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 42, y: 80, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: selNode.result.id, content: "Chọn phương thức thanh toán" });
  await sendRpc("modify", { nodeId: selNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.392, g: 0.455, b: 0.545 } }] } });

  // VietQR Option
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 104, width: 180, height: 38, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  const vietLogoNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 28, y: 116, fontSize: 11 });
  await sendRpc("set_text", { nodeId: vietLogoNode.result.id, content: "Viet" });
  await sendRpc("modify", { nodeId: vietLogoNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.882, g: 0.114, b: 0.278 } }], fontWeight: "Black" } });

  const qrLogoNode = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 51, y: 116, fontSize: 11 });
  await sendRpc("set_text", { nodeId: qrLogoNode.result.id, content: "QR" });
  await sendRpc("modify", { nodeId: qrLogoNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const chev3 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 175, y: 116, fontSize: 12 });
  await sendRpc("set_text", { nodeId: chev3.result.id, content: ">" });
  await sendRpc("modify", { nodeId: chev3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.6, g: 0.6, b: 0.6 } }] } });

  // Facepay Option
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 15, y: 152, width: 180, height: 42, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], strokeWidth: 1.5, cornerRadius: 8 });
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 24, y: 162, width: 22, height: 22, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], cornerRadius: 5 });
  await sendRpc("create", { type: "ELLIPSE", parentId: p2Id, x: 29, y: 168, width: 3, height: 3, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p2Id, x: 38, y: 168, width: 3, height: 3, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p2Id, x: 30, y: 175, width: 10, height: 3, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], cornerRadius: 1 });

  const faceTxt = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 54, y: 164, fontSize: 12 });
  await sendRpc("set_text", { nodeId: faceTxt.result.id, content: "Facepay" });
  await sendRpc("modify", { nodeId: faceTxt.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  const chev4 = await sendRpc("create", { type: "TEXT", parentId: p2Id, x: 175, y: 164, fontSize: 12 });
  await sendRpc("set_text", { nodeId: chev4.result.id, content: ">" });
  await sendRpc("modify", { nodeId: chev4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Bold" } });

  // Arrow 2
  const a2 = await sendRpc("create", { type: "TEXT", parentId: payId, x: 498, y: 370, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a2.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a2.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // Step 3 miniPOS S30 Screen 2
  const pos3 = await sendRpc("create", { type: "FRAME", parentId: payId, name: "Step 3 - miniPos S30 Screen 2 Centered", x: 530, y: 280, width: 210, height: 235, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.8, g: 0.83, b: 0.88 } }], strokeWeight: 3, cornerRadius: 16 });
  const p3Id = pos3.result.id;

  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 101, y: 8, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 74, y: 24, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 81, y: 20, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 81, y: 28, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  const epayTxt3 = await sendRpc("create", { type: "TEXT", parentId: p3Id, x: 91, y: 20, fontSize: 14 });
  await sendRpc("set_text", { nodeId: epayTxt3.result.id, content: "epay" });
  await sendRpc("modify", { nodeId: epayTxt3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 45, y: 55, width: 120, height: 145, fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }], cornerRadius: 10 });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 50, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 50, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 154, y: 50, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 167, y: 50, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 197, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 40, y: 184, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 154, y: 197, width: 16, height: 3, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: p3Id, x: 167, y: 184, width: 3, height: 16, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  await sendRpc("create", { type: "ELLIPSE", parentId: p3Id, x: 65, y: 88, width: 80, height: 80, fills: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }] });

  // Arrow 3
  const a3 = await sendRpc("create", { type: "TEXT", parentId: payId, x: 758, y: 370, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a3.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a3.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // STEP 4 PETROLIMEX BACKEND VỚI ICON SERVER RACK CHUẨN (CẬP NHẬT THEO YÊU CẦU USER!)
  const procCard = await sendRpc("create", { type: "FRAME", parentId: payId, name: "Step 4 - Petrolimex Backend Process Box", x: 790, y: 240, width: 210, height: 330, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 12 });
  const prId = procCard.result.id;

  // TOP CARD VỚI ICON SERVER RACK VÀ LOGO PETROLIMEX 2.0
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 25, y: 10, width: 160, height: 45, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], cornerRadius: 8 });
  
  // Icon Server Rack Navy Blue
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 35, y: 17, width: 34, height: 30, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 40, y: 22, width: 24, height: 6, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], cornerRadius: 1 });
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 40, y: 34, width: 24, height: 6, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], cornerRadius: 1 });

  // Logo P & Text Petrolimex 2.0
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 78, y: 18, width: 18, height: 18, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 4 });
  const pBig4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 83, y: 20, fontSize: 12 });
  await sendRpc("set_text", { nodeId: pBig4.result.id, content: "P" });
  await sendRpc("modify", { nodeId: pBig4.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const pLabel4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 76, y: 38, fontSize: 8 });
  await sendRpc("set_text", { nodeId: pLabel4.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: pLabel4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  // Sub-cards
  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 65, width: 180, height: 38, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc1Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 73, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: proc1Node.result.id, content: "👁  Kiểm tra thông tin\n    sinh trắc học" });
  await sendRpc("modify", { nodeId: proc1Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 112, width: 180, height: 38, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc2Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 120, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: proc2Node.result.id, content: "🔒  Kiểm tra token\n    của user" });
  await sendRpc("modify", { nodeId: proc2Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: prId, x: 15, y: 160, width: 180, height: 46, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 6 });
  const proc3Node = await sendRpc("create", { type: "TEXT", parentId: prId, x: 25, y: 166, width: 160, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: proc3Node.result.id, content: "✈  Gửi yêu cầu thanh toán\n    bằng token đến\n    Cổng thanh toán Epay" });
  await sendRpc("modify", { nodeId: proc3Node.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Epay Bottom
  const epayBt4 = await sendRpc("create", { type: "TEXT", parentId: prId, x: 55, y: 275, fontSize: 18 });
  await sendRpc("set_text", { nodeId: epayBt4.result.id, content: "⚛️ epay" });
  await sendRpc("modify", { nodeId: epayBt4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  // Arrow 4
  const a4 = await sendRpc("create", { type: "TEXT", parentId: payId, x: 1018, y: 370, fontSize: 18 });
  await sendRpc("set_text", { nodeId: a4.result.id, content: "➔" });
  await sendRpc("modify", { nodeId: a4.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] } });

  // Step 5 Epay Approval
  const epayCard = await sendRpc("create", { type: "FRAME", parentId: payId, name: "Step 5 - CTT Epay Approval Box", x: 1050, y: 240, width: 230, height: 330, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 12 });
  const epId = epayCard.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: epId, x: 45, y: 15, width: 140, height: 40, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 8 });
  const epayTop5 = await sendRpc("create", { type: "TEXT", parentId: epId, x: 65, y: 23, fontSize: 18 });
  await sendRpc("set_text", { nodeId: epayTop5.result.id, content: "⚛️ epay" });
  await sendRpc("modify", { nodeId: epayTop5.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "ELLIPSE", parentId: epId, x: 65, y: 75, width: 100, height: 100, fills: [{ type: "SOLID", color: { r: 0.882, g: 0.937, b: 0.996 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: epId, x: 80, y: 90, width: 70, height: 70, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }] });
  const shieldCheck = await sendRpc("create", { type: "TEXT", parentId: epId, x: 104, y: 110, fontSize: 22 });
  await sendRpc("set_text", { nodeId: shieldCheck.result.id, content: "✓" });
  await sendRpc("modify", { nodeId: shieldCheck.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const capNode = await sendRpc("create", { type: "TEXT", parentId: epId, x: 20, y: 195, width: 190, fontSize: 10 });
  await sendRpc("set_text", { nodeId: capNode.result.id, content: "Xử lý giao dịch thanh toán\nvà cấp phép giao dịch" });
  await sendRpc("modify", { nodeId: capNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: epId, x: 20, y: 270, width: 190, height: 32, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], cornerRadius: 16 });
  const succText = await sendRpc("create", { type: "TEXT", parentId: epId, x: 42, y: 278, fontSize: 11 });
  await sendRpc("set_text", { nodeId: succText.result.id, content: "✓  Giao dịch thành công" });
  await sendRpc("modify", { nodeId: succText.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // Footer Banner
  const footCapsule = await sendRpc("create", { type: "FRAME", parentId: payId, name: "Footer Security Banner", x: 200, y: 585, width: 950, height: 44, fills: [{ type: "SOLID", color: { r: 0.91, g: 0.945, b: 0.976 } }], strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], cornerRadius: 22 });
  const fcId = footCapsule.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: fcId, x: 40, y: 13, width: 16, height: 18, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  const fTextLeft = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 65, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fTextLeft.result.id, content: "Bảo mật – An toàn – Thuận tiện" });
  await sendRpc("modify", { nodeId: fTextLeft.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });
  const fBar = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 300, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fBar.result.id, content: "|" });
  await sendRpc("modify", { nodeId: fBar.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.7, g: 0.75, b: 0.8 } }] } });
  const fTextRight = await sendRpc("create", { type: "TEXT", parentId: fcId, x: 320, y: 14, fontSize: 12 });
  await sendRpc("set_text", { nodeId: fTextRight.result.id, content: "Ứng dụng sinh trắc học & token bảo vệ mọi giao dịch" });
  await sendRpc("modify", { nodeId: fTextRight.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });


  // --- 2. CẬP NHẬT FRAME 2: LUỒNG ĐĂNG KÝ (x: 0, y: 700) ---
  const masterReg = await sendRpc("create", {
    type: "FRAME",
    parentId: undefined,
    name: "LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0",
    x: 0,
    y: 700,
    width: 1360,
    height: 660,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }],
    strokeWeight: 1,
    cornerRadius: 20
  });

  const regId = masterReg.result.id;

  const tReg = await sendRpc("create", { type: "TEXT", parentId: regId, x: 310, y: 24, fontSize: 24 });
  await sendRpc("set_text", { nodeId: tReg.result.id, content: "LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: tReg.result.id, props: { fills: [{ type: "SOLID", color: { r: 0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  // 7 Steps Header
  const stepRegConfigs = [
    { num: "1", x: 25, title: "KH đăng ký tài khoản trên Petrolimex 2.0\n(xác thực sinh trắc học)" },
    { num: "2", x: 215, title: "Hệ thống lưu trữ\nsinh trắc học" },
    { num: "3", x: 395, title: "KH thực hiện liên kết token thanh toán\nvới thẻ nội địa/ thẻ quốc tế" },
    { num: "4", x: 585, title: "Hệ thống Petrolimex gửi yêu cầu\nliên kết token đến CTT Epay" },
    { num: "5", x: 775, title: "CTT Epay trả về token\nliên kết tương ứng" },
    { num: "6", x: 955, title: "KH cài đặt nguồn tiền\nthanh toán sinh trắc học" },
    { num: "7", x: 1135, title: "Hệ thống Petrolimex 2.0 lưu trữ thông tin\nsinh trắc học với token tương ứng" }
  ];

  for (const s of stepRegConfigs) {
    await sendRpc("create", { type: "ELLIPSE", parentId: regId, x: s.x + 65, y: 68, width: 34, height: 34, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }] });
    const n = await sendRpc("create", { type: "TEXT", parentId: regId, x: s.x + 77, y: 75, fontSize: 17 });
    await sendRpc("set_text", { nodeId: n.result.id, content: s.num });
    await sendRpc("modify", { nodeId: n.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

    const t = await sendRpc("create", { type: "TEXT", parentId: regId, x: s.x - 10, y: 110, width: 185, fontSize: 10.5 });
    await sendRpc("set_text", { nodeId: t.result.id, content: s.title });
    await sendRpc("modify", { nodeId: t.result.id, props: { fills: [{ type: "SOLID", color: { r: 0, g: 0.176, b: 0.384 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });
  }

  // Reg Step 1
  const phone1 = await sendRpc("create", { type: "FRAME", parentId: regId, name: "Screen 1 - Registration", x: 20, y: 175, width: 175, height: 350, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], strokeWeight: 3, cornerRadius: 26 });
  const r1Id = phone1.result.id;
  await sendRpc("create", { type: "RECTANGLE", parentId: r1Id, x: 57, y: 8, width: 60, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });
  await sendRpc("create", { type: "RECTANGLE", parentId: r1Id, x: 75, y: 22, width: 24, height: 24, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 5 });
  const p1R = await sendRpc("create", { type: "TEXT", parentId: r1Id, x: 81, y: 25, fontSize: 15 });
  await sendRpc("set_text", { nodeId: p1R.result.id, content: "P" });
  await sendRpc("modify", { nodeId: p1R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });
  const b1R = await sendRpc("create", { type: "TEXT", parentId: r1Id, x: 48, y: 50, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: b1R.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: b1R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: r1Id, x: 15, y: 82, width: 145, height: 24, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 12 });
  const i1R = await sendRpc("create", { type: "TEXT", parentId: r1Id, x: 25, y: 87, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: i1R.result.id, content: "Số điện thoại" });
  await sendRpc("modify", { nodeId: i1R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.58, g: 0.64, b: 0.72 } }] } });

  await sendRpc("create", { type: "RECTANGLE", parentId: r1Id, x: 15, y: 112, width: 145, height: 24, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 12 });
  const i2R = await sendRpc("create", { type: "TEXT", parentId: r1Id, x: 25, y: 117, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: i2R.result.id, content: "Mật khẩu" });
  await sendRpc("modify", { nodeId: i2R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.58, g: 0.64, b: 0.72 } }] } });

  await sendRpc("create", { type: "RECTANGLE", parentId: r1Id, x: 15, y: 142, width: 145, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  const bt1R = await sendRpc("create", { type: "TEXT", parentId: r1Id, x: 65, y: 148, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: bt1R.result.id, content: "Đăng ký" });
  await sendRpc("modify", { nodeId: bt1R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: r1Id, x: 47, y: 180, width: 80, height: 80, fills: [{ type: "SOLID", color: { r: 0.972, g: 0.98, b: 0.988 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "ELLIPSE", parentId: r1Id, x: 57, y: 190, width: 60, height: 60, fills: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }] });

  const st1R = await sendRpc("create", { type: "TEXT", parentId: r1Id, x: 12, y: 270, width: 150, fontSize: 8 });
  await sendRpc("set_text", { nodeId: st1R.result.id, content: "✓ Xác thực sinh trắc học (thành công)" });
  await sendRpc("modify", { nodeId: st1R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  // Reg Step 2 Cloud
  await sendRpc("create", { type: "ELLIPSE", parentId: regId, x: 215, y: 215, width: 160, height: 120, fills: [{ type: "SOLID", color: { r: 0.882, g: 0.937, b: 0.996 } }] });
  await sendRpc("create", { type: "RECTANGLE", parentId: regId, x: 250, y: 245, width: 90, height: 22, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: regId, x: 250, y: 272, width: 90, height: 22, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "ELLIPSE", parentId: regId, x: 280, y: 282, width: 30, height: 30, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], strokes: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokeWeight: 2 });
  const lock2 = await sendRpc("create", { type: "TEXT", parentId: regId, x: 288, y: 289, fontSize: 13 });
  await sendRpc("set_text", { nodeId: lock2.result.id, content: "🔒" });

  // Reg Step 3 Mobile Screen 2 (THẺ NỘI ĐỊA VÀ THẺ QUỐC TẾ VỚI ICON VECTOR CHUẨN!)
  const phone2R = await sendRpc("create", { type: "FRAME", parentId: regId, name: "Screen 2 - Card Binding", x: 400, y: 175, width: 175, height: 350, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], strokeWeight: 3, cornerRadius: 26 });
  const r2Id = phone2R.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: r2Id, x: 57, y: 8, width: 60, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });
  const scTitle2R = await sendRpc("create", { type: "TEXT", parentId: r2Id, x: 55, y: 26, fontSize: 11 });
  await sendRpc("set_text", { nodeId: scTitle2R.result.id, content: "Liên kết thẻ" });
  await sendRpc("modify", { nodeId: scTitle2R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold" } });

  // Thẻ nội địa Card Vector Icon chuẩn
  await sendRpc("create", { type: "RECTANGLE", parentId: r2Id, x: 12, y: 48, width: 150, height: 42, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "RECTANGLE", parentId: r2Id, x: 20, y: 58, width: 22, height: 16, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 3 });
  await sendRpc("create", { type: "RECTANGLE", parentId: r2Id, x: 22, y: 62, width: 18, height: 3, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });
  
  const opt1TxtR = await sendRpc("create", { type: "TEXT", parentId: r2Id, x: 48, y: 54, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: opt1TxtR.result.id, content: "Thẻ nội địa\nNAPAS" });
  await sendRpc("modify", { nodeId: opt1TxtR.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Thẻ quốc tế Card Vector Icon chuẩn
  await sendRpc("create", { type: "RECTANGLE", parentId: r2Id, x: 12, y: 98, width: 150, height: 42, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 8 });
  await sendRpc("create", { type: "RECTANGLE", parentId: r2Id, x: 20, y: 108, width: 22, height: 16, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 3 });
  await sendRpc("create", { type: "ELLIPSE", parentId: r2Id, x: 27, y: 112, width: 8, height: 8, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });

  const opt2TxtR = await sendRpc("create", { type: "TEXT", parentId: r2Id, x: 48, y: 104, fontSize: 9.5 });
  await sendRpc("set_text", { nodeId: opt2TxtR.result.id, content: "Thẻ quốc tế\nVISA / Mastercard..." });
  await sendRpc("modify", { nodeId: opt2TxtR.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: r2Id, x: 15, y: 305, width: 145, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  const bt2R = await sendRpc("create", { type: "TEXT", parentId: r2Id, x: 65, y: 311, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: bt2R.result.id, content: "Tiếp tục" });
  await sendRpc("modify", { nodeId: bt2R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // Reg Step 4 Petrolimex Gateway VỚI ICON SERVER RACK VÀ LOGO PETROLIMEX 2.0 CHUẨN!
  const petroCardR = await sendRpc("create", { type: "FRAME", parentId: regId, name: "Petrolimex Gateway Container", x: 585, y: 215, width: 175, height: 180, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 10 });
  const pc4RId = petroCardR.result.id;

  // Top Box chứa Icon Server Rack & Logo P
  await sendRpc("create", { type: "RECTANGLE", parentId: pc4RId, x: 15, y: 10, width: 145, height: 42, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], cornerRadius: 6 });
  
  // Icon Server Rack Navy Blue
  await sendRpc("create", { type: "RECTANGLE", parentId: pc4RId, x: 22, y: 16, width: 30, height: 28, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], cornerRadius: 4 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pc4RId, x: 26, y: 21, width: 22, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], cornerRadius: 1 });
  await sendRpc("create", { type: "RECTANGLE", parentId: pc4RId, x: 26, y: 32, width: 22, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], cornerRadius: 1 });

  // Logo P & Text
  await sendRpc("create", { type: "RECTANGLE", parentId: pc4RId, x: 60, y: 17, width: 16, height: 16, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 3 });
  const p4R = await sendRpc("create", { type: "TEXT", parentId: pc4RId, x: 65, y: 18, fontSize: 11 });
  await sendRpc("set_text", { nodeId: p4R.result.id, content: "P" });
  await sendRpc("modify", { nodeId: p4R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const b4R = await sendRpc("create", { type: "TEXT", parentId: pc4RId, x: 58, y: 35, fontSize: 7.5 });
  await sendRpc("set_text", { nodeId: b4R.result.id, content: "PETROLIMEX 2.0" });
  await sendRpc("modify", { nodeId: b4R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const f1R = await sendRpc("create", { type: "TEXT", parentId: pc4RId, x: 10, y: 60, width: 155, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: f1R.result.id, content: "⚙️ Gửi yêu cầu liên kết token đến CTT Epay (qua API bảo mật)" });
  await sendRpc("modify", { nodeId: f1R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  const f2R = await sendRpc("create", { type: "TEXT", parentId: pc4RId, x: 10, y: 120, width: 155, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: f2R.result.id, content: "🛡️ Xác thực & truyền dữ liệu an toàn" });
  await sendRpc("modify", { nodeId: f2R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Reg Step 5 CTT Epay
  const epayCard5R = await sendRpc("create", { type: "FRAME", parentId: regId, name: "CTT Epay Container", x: 775, y: 215, width: 165, height: 180, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 10 });
  const ep5RId = epayCard5R.result.id;

  await sendRpc("create", { type: "ELLIPSE", parentId: ep5RId, x: 38, y: 22, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: ep5RId, x: 45, y: 18, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });
  await sendRpc("create", { type: "ELLIPSE", parentId: ep5RId, x: 45, y: 26, width: 5, height: 5, fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }] });

  const epLogo5R = await sendRpc("create", { type: "TEXT", parentId: ep5RId, x: 55, y: 17, fontSize: 18 });
  await sendRpc("set_text", { nodeId: epLogo5R.result.id, content: "epay" });
  await sendRpc("modify", { nodeId: epLogo5R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "ELLIPSE", parentId: ep5RId, x: 68, y: 55, width: 30, height: 30, fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }] });
  const sh5R = await sendRpc("create", { type: "TEXT", parentId: ep5RId, x: 76, y: 62, fontSize: 13 });
  await sendRpc("set_text", { nodeId: sh5R.result.id, content: "🛡️" });

  const lab5R = await sendRpc("create", { type: "TEXT", parentId: ep5RId, x: 10, y: 92, width: 145, fontSize: 9 });
  await sendRpc("set_text", { nodeId: lab5R.result.id, content: "Xử lý liên kết và tạo token" });
  await sendRpc("modify", { nodeId: lab5R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold", textAlignHorizontal: "CENTER" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: ep5RId, x: 38, y: 125, width: 90, height: 34, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.314, b: 0.635 } }], cornerRadius: 6 });
  const t5R = await sendRpc("create", { type: "TEXT", parentId: ep5RId, x: 65, y: 129, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: t5R.result.id, content: "TOKEN" });
  await sendRpc("modify", { nodeId: t5R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  const tv5R = await sendRpc("create", { type: "TEXT", parentId: ep5RId, x: 52, y: 140, fontSize: 11 });
  await sendRpc("set_text", { nodeId: tv5R.result.id, content: "********" });
  await sendRpc("modify", { nodeId: tv5R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  // Reg Step 6 Mobile Screen 3
  const phone3R = await sendRpc("create", { type: "FRAME", parentId: regId, name: "Screen 3 - FacePay Settings", x: 955, y: 175, width: 175, height: 350, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], strokeWeight: 3, cornerRadius: 26 });
  const r3Id = phone3R.result.id;

  await sendRpc("create", { type: "RECTANGLE", parentId: r3Id, x: 57, y: 8, width: 60, height: 6, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.118, b: 0.118 } }], cornerRadius: 3 });
  const scTitle3R = await sendRpc("create", { type: "TEXT", parentId: r3Id, x: 15, y: 26, width: 145, fontSize: 9 });
  await sendRpc("set_text", { nodeId: scTitle3R.result.id, content: "Nguồn tiền thanh toán (FacePay)" });
  await sendRpc("modify", { nodeId: scTitle3R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }], fontWeight: "Bold" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: r3Id, x: 12, y: 48, width: 150, height: 28, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.886, g: 0.91, b: 0.941 } }], cornerRadius: 6 });
  const visaR = await sendRpc("create", { type: "TEXT", parentId: r3Id, x: 20, y: 55, fontSize: 10 });
  await sendRpc("set_text", { nodeId: visaR.result.id, content: "VISA                  •••• 1234" });
  await sendRpc("modify", { nodeId: visaR.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  const bioSubR = await sendRpc("create", { type: "TEXT", parentId: r3Id, x: 12, y: 86, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: bioSubR.result.id, content: "Thanh toán bằng tính trắc học" });
  await sendRpc("modify", { nodeId: bioSubR.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.231 } }], fontWeight: "Bold" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: r3Id, x: 130, y: 104, width: 30, height: 16, fills: [{ type: "SOLID", color: { r: 0.063, g: 0.725, b: 0.506 } }], cornerRadius: 10 });
  await sendRpc("create", { type: "ELLIPSE", parentId: r3Id, x: 145, y: 106, width: 12, height: 12, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }] });

  await sendRpc("create", { type: "RECTANGLE", parentId: r3Id, x: 15, y: 305, width: 145, height: 26, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.353, b: 0.129 } }], cornerRadius: 13 });
  const bt3R = await sendRpc("create", { type: "TEXT", parentId: r3Id, x: 65, y: 311, fontSize: 10.5 });
  await sendRpc("set_text", { nodeId: bt3R.result.id, content: "Hoàn tất" });
  await sendRpc("modify", { nodeId: bt3R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  // Reg Step 7 Dashed Binding & Lock
  const dashed7R = await sendRpc("create", { type: "FRAME", parentId: regId, name: "Dashed Binding Box", x: 1140, y: 215, width: 200, height: 120, fills: [{ type: "SOLID", color: { r: 0.941, g: 0.976, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.007, g: 0.517, b: 0.78 } }], strokeWeight: 1.5, cornerRadius: 8 });
  const d7RId = dashed7R.result.id;

  const d1R = await sendRpc("create", { type: "TEXT", parentId: d7RId, x: 10, y: 15, width: 180, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: d1R.result.id, content: "😊 Dữ liệu sinh trắc học (đã mã hóa)" });
  await sendRpc("modify", { nodeId: d1R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  const plus7R = await sendRpc("create", { type: "TEXT", parentId: d7RId, x: 92, y: 42, fontSize: 14 });
  await sendRpc("set_text", { nodeId: plus7R.result.id, content: "+" });
  await sendRpc("modify", { nodeId: plus7R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Black" } });

  await sendRpc("create", { type: "RECTANGLE", parentId: d7RId, x: 55, y: 65, width: 90, height: 30, fills: [{ type: "SOLID", color: { r: 0.118, g: 0.314, b: 0.635 } }], cornerRadius: 6 });
  const t7R = await sendRpc("create", { type: "TEXT", parentId: d7RId, x: 80, y: 68, fontSize: 8 });
  await sendRpc("set_text", { nodeId: t7R.result.id, content: "TOKEN" });
  await sendRpc("modify", { nodeId: t7R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Bold" } });

  const tv7R = await sendRpc("create", { type: "TEXT", parentId: d7RId, x: 68, y: 78, fontSize: 10 });
  await sendRpc("set_text", { nodeId: tv7R.result.id, content: "********" });
  await sendRpc("modify", { nodeId: tv7R.result.id, props: { fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], fontWeight: "Black" } });

  const lockCard7R = await sendRpc("create", { type: "FRAME", parentId: regId, name: "Lock Storage Box", x: 1140, y: 350, width: 200, height: 75, fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }], strokes: [{ type: "SOLID", color: { r: 0.796, g: 0.835, b: 0.882 } }], cornerRadius: 8 });
  const l7RId = lockCard7R.result.id;
  const lockTxt7R = await sendRpc("create", { type: "TEXT", parentId: l7RId, x: 12, y: 15, width: 175, fontSize: 8.5 });
  await sendRpc("set_text", { nodeId: lockTxt7R.result.id, content: "🔒 Lưu trữ an toàn, bảo mật theo chuẩn bảo mật của Petrolimex" });
  await sendRpc("modify", { nodeId: lockTxt7R.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Footer Banner
  const footRegCapsule = await sendRpc("create", { type: "FRAME", parentId: regId, name: "Footer Security Banner", x: 100, y: 595, width: 1160, height: 42, fills: [{ type: "SOLID", color: { r: 0.91, g: 0.945, b: 0.976 } }], strokes: [{ type: "SOLID", color: { r: 0.733, g: 0.878, b: 0.976 } }], cornerRadius: 21 });
  const frcId = footRegCapsule.result.id;
  const fTxtRNode = await sendRpc("create", { type: "TEXT", parentId: frcId, x: 150, y: 13, fontSize: 11.5 });
  await sendRpc("set_text", { nodeId: fTxtRNode.result.id, content: "🛡️  Bảo mật – An toàn – Tuân thủ quy định của Ngân hàng Nhà nước và các tiêu chuẩn bảo mật quốc tế" });
  await sendRpc("modify", { nodeId: fTxtRNode.result.id, props: { fills: [{ type: "SOLID", color: { r: 0.0, g: 0.176, b: 0.384 } }], fontWeight: "Bold" } });

  // Zoom to view master frame
  await sendRpc("zoom_to_fit", { nodeId: regId });

  console.log("🎉 ĐÃ CẬP NHẬT HOÀN TẤT ICON THẺ NỘI ĐỊA/QUỐC TẾ VÀ ICON SERVER RACK CHO CẢ 2 BỘ SƠ ĐỒ LÊN FIGMA!");
}

updateIconsAndServer();
