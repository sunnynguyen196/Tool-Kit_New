// ============================================================================
// FIGMA AUTOMATION SCRIPT: LUỒNG ĐĂNG KÝ FACEPAY PETROLIMEX 2.0 (CHUẨN 100% 1:1)
// Hướng dẫn: Mở Figma -> Plugins -> Development -> Open Console -> Paste đoạn mã này
// ============================================================================

(async function drawPetrolimexFacePayFlow() {
  console.log("🚀 Đang khởi tạo bản vẽ Luồng Đăng ký FacePay Petrolimex 2.0...");

  // 1. Tải Font chữ Roboto
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
  await figma.loadFontAsync({ family: "Roboto", style: "Black" });

  // 2. Tạo Frame Canvas Tổng
  const canvasFrame = figma.createFrame();
  canvasFrame.name = "LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0";
  canvasFrame.resize(1300, 680);
  canvasFrame.x = 0;
  canvasFrame.y = 0;
  canvasFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  canvasFrame.cornerRadius = 12;

  // 3. Tạo Tiêu đề chính
  const mainTitle = figma.createText();
  mainTitle.fontName = { family: "Roboto", style: "Black" };
  mainTitle.characters = "LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0";
  mainTitle.fontSize = 26;
  mainTitle.fills = [{ type: 'SOLID', color: { r: 0.055, g: 0.227, b: 0.494 } }]; // #0E3A7E
  mainTitle.x = (1300 - mainTitle.width) / 2;
  mainTitle.y = 24;
  canvasFrame.appendChild(mainTitle);

  // 4. Định nghĩa Mảng thông tin 6 Bước hàng trên
  const stepsData = [
    { num: "1", title: "KH đăng ký tài khoản trên Petrolimex 2.0 (xác thực sinh trắc học)", x: 30 },
    { num: "2", title: "Hệ thống lưu trữ sinh trắc học", x: 235 },
    { num: "3", title: "KH thực hiện liên kết token thanh toán với thẻ nội địa/ thẻ quốc tế", x: 410 },
    { num: "4", title: "Hệ thống Petrolimex gửi yêu cầu liên kết token đến CTT Epay", x: 615 },
    { num: "5", title: "CTT Epay trả về token liên kết tương ứng", x: 800 },
    { num: "6", title: "KH cài đặt nguồn tiền thanh toán sinh trắc học", x: 975 }
  ];

  // Vẽ các Vòng tròn Số bước & Tiêu đề phía trên
  stepsData.forEach(step => {
    // Vòng tròn số da cam #F05A21
    const circle = figma.createEllipse();
    circle.resize(36, 36);
    circle.x = step.x + (160 - 36) / 2;
    circle.y = 75;
    circle.fills = [{ type: 'SOLID', color: { r: 0.941, g: 0.353, b: 0.129 } }];
    canvasFrame.appendChild(circle);

    const numText = figma.createText();
    numText.fontName = { family: "Roboto", style: "Black" };
    numText.characters = step.num;
    numText.fontSize = 18;
    numText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    numText.x = circle.x + (36 - numText.width) / 2;
    numText.y = circle.y + (36 - numText.height) / 2;
    canvasFrame.appendChild(numText);

    // Text tiêu đề bước
    const title = figma.createText();
    title.fontName = { family: "Roboto", style: "Bold" };
    title.characters = step.title;
    title.fontSize = 12;
    title.textAlignHorizontal = "CENTER";
    title.resize(170, 40);
    title.textAutoResize = "HEIGHT";
    title.fills = [{ type: 'SOLID', color: { r: 0.055, g: 0.227, b: 0.494 } }];
    title.x = step.x + (160 - 170) / 2;
    title.y = 120;
    canvasFrame.appendChild(title);
  });

  // Helper Function: Vẽ Màn hình Điện thoại (Mobile Frame)
  function createPhoneFrame(name, x, y) {
    const phone = figma.createFrame();
    phone.name = name;
    phone.resize(180, 360);
    phone.x = x;
    phone.y = y;
    phone.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    phone.strokes = [{ type: 'SOLID', color: { r: 0.118, g: 0.118, b: 0.118 } }];
    phone.strokeWeight = 3.5;
    phone.cornerRadius = 28;

    // Notch
    const notch = figma.createRectangle();
    notch.resize(55, 6);
    notch.x = (180 - 55) / 2;
    notch.y = 8;
    notch.fills = [{ type: 'SOLID', color: { r: 0.118, g: 0.118, b: 0.118 } }];
    notch.cornerRadius = 3;
    phone.appendChild(notch);

    canvasFrame.appendChild(phone);
    return phone;
  }

  // 5. BƯỚC 1: MÀN HÌNH 1 (ĐĂNG KÝ & FACE ID)
  const phone1 = createPhoneFrame("Màn hình 1 - Đăng ký & FaceID", 20, 180);
  
  // Logo Petrolimex
  const logoP = figma.createRectangle();
  logoP.resize(26, 26);
  logoP.x = (180 - 26) / 2;
  logoP.y = 24;
  logoP.fills = [{ type: 'SOLID', color: { r: 0.941, g: 0.353, b: 0.129 } }];
  logoP.cornerRadius = 6;
  phone1.appendChild(logoP);

  const pLetter = figma.createText();
  pLetter.fontName = { family: "Roboto", style: "Black" };
  pLetter.characters = "P";
  pLetter.fontSize = 16;
  pLetter.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  pLetter.x = logoP.x + 7;
  pLetter.y = logoP.y + 3;
  phone1.appendChild(pLetter);

  const brandTitle = figma.createText();
  brandTitle.fontName = { family: "Roboto", style: "Black" };
  brandTitle.characters = "PETROLIMEX 2.0";
  brandTitle.fontSize = 10;
  brandTitle.fills = [{ type: 'SOLID', color: { r: 0.055, g: 0.227, b: 0.494 } }];
  brandTitle.x = (180 - brandTitle.width) / 2;
  brandTitle.y = 54;
  phone1.appendChild(brandTitle);

  const subTitle = figma.createText();
  subTitle.fontName = { family: "Roboto", style: "Bold" };
  subTitle.characters = "Đăng ký tài khoản";
  subTitle.fontSize = 9.5;
  subTitle.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
  subTitle.x = (180 - subTitle.width) / 2;
  subTitle.y = 68;
  phone1.appendChild(subTitle);

  // Form Inputs
  const input1 = figma.createRectangle();
  input1.resize(150, 24);
  input1.x = 15;
  input1.y = 86;
  input1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  input1.strokes = [{ type: 'SOLID', color: { r: 0.796, g: 0.835, b: 0.882 } }];
  input1.cornerRadius = 12;
  phone1.appendChild(input1);

  const inputText1 = figma.createText();
  inputText1.fontName = { family: "Roboto", style: "Regular" };
  inputText1.characters = "Số điện thoại";
  inputText1.fontSize = 9;
  inputText1.fills = [{ type: 'SOLID', color: { r: 0.58, g: 0.64, b: 0.72 } }];
  inputText1.x = 24;
  inputText1.y = 91;
  phone1.appendChild(inputText1);

  const input2 = figma.createRectangle();
  input2.resize(150, 24);
  input2.x = 15;
  input2.y = 116;
  input2.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  input2.strokes = [{ type: 'SOLID', color: { r: 0.796, g: 0.835, b: 0.882 } }];
  input2.cornerRadius = 12;
  phone1.appendChild(input2);

  const inputText2 = figma.createText();
  inputText2.fontName = { family: "Roboto", style: "Regular" };
  inputText2.characters = "Mật khẩu";
  inputText2.fontSize = 9;
  inputText2.fills = [{ type: 'SOLID', color: { r: 0.58, g: 0.64, b: 0.72 } }];
  inputText2.x = 24;
  inputText2.y = 121;
  phone1.appendChild(inputText2);

  // Nút Đăng ký
  const btn1 = figma.createRectangle();
  btn1.resize(150, 26);
  btn1.x = 15;
  btn1.y = 146;
  btn1.fills = [{ type: 'SOLID', color: { r: 0.941, g: 0.353, b: 0.129 } }];
  btn1.cornerRadius = 13;
  phone1.appendChild(btn1);

  const btnText1 = figma.createText();
  btnText1.fontName = { family: "Roboto", style: "Bold" };
  btnText1.characters = "Đăng ký";
  btnText1.fontSize = 11;
  btnText1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  btnText1.x = btn1.x + (150 - btnText1.width) / 2;
  btnText1.y = btn1.y + 6;
  phone1.appendChild(btnText1);

  // Frame Quét Face ID
  const faceScanBox = figma.createRectangle();
  faceScanBox.resize(80, 80);
  faceScanBox.x = (180 - 80) / 2;
  faceScanBox.y = 190;
  faceScanBox.fills = [{ type: 'SOLID', color: { r: 0.972, g: 0.98, b: 0.988 } }];
  faceScanBox.strokes = [{ type: 'SOLID', color: { r: 0.886, g: 0.91, b: 0.941 } }];
  faceScanBox.cornerRadius = 8;
  phone1.appendChild(faceScanBox);

  // Badge Check xanh lá
  const checkBadge = figma.createText();
  checkBadge.fontName = { family: "Roboto", style: "Bold" };
  checkBadge.characters = "✓ Xác thực sinh trắc học (thành công)";
  checkBadge.fontSize = 8;
  checkBadge.fills = [{ type: 'SOLID', color: { r: 0.063, g: 0.725, b: 0.506 } }]; // #10B981
  checkBadge.x = (180 - checkBadge.width) / 2;
  checkBadge.y = 280;
  phone1.appendChild(checkBadge);

  // 6. BƯỚC 2: HỆ THỐNG LƯU TRỮ SINH TRẮC HỌC
  const cloudBg = figma.createEllipse();
  cloudBg.resize(120, 95);
  cloudBg.x = 230;
  cloudBg.y = 230;
  cloudBg.fills = [{ type: 'SOLID', color: { r: 0.882, g: 0.937, b: 0.996 } }]; // #E1EFFE
  canvasFrame.appendChild(cloudBg);

  const serverRack = figma.createRectangle();
  serverRack.resize(64, 40);
  serverRack.x = cloudBg.x + (120 - 64) / 2;
  serverRack.y = cloudBg.y + (95 - 40) / 2 - 4;
  serverRack.fills = [{ type: 'SOLID', color: { r: 0.055, g: 0.227, b: 0.494 } }];
  serverRack.cornerRadius = 6;
  canvasFrame.appendChild(serverRack);

  const cloudText = figma.createText();
  cloudText.fontName = { family: "Roboto", style: "Bold" };
  cloudText.characters = "Hệ thống lưu trữ sinh trắc học\n(được mã hóa)";
  cloudText.fontSize = 9.5;
  cloudText.textAlignHorizontal = "CENTER";
  cloudText.fills = [{ type: 'SOLID', color: { r: 0.055, g: 0.227, b: 0.494 } }];
  cloudText.x = 205;
  cloudText.y = 335;
  canvasFrame.appendChild(cloudText);

  // 7. BƯỚC 3: MÀN HÌNH 2 (LIÊN KẾT THẺ)
  const phone2 = createPhoneFrame("Màn hình 2 - Liên kết thẻ", 405, 180);

  const screen2Title = figma.createText();
  screen2Title.fontName = { family: "Roboto", style: "Bold" };
  screen2Title.characters = "Liên kết thẻ";
  screen2Title.fontSize = 11;
  screen2Title.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
  screen2Title.x = (180 - screen2Title.width) / 2;
  screen2Title.y = 30;
  phone2.appendChild(screen2Title);

  // Card Option 1: NAPAS
  const opt1 = figma.createRectangle();
  opt1.resize(150, 42);
  opt1.x = 15;
  opt1.y = 52;
  opt1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  opt1.strokes = [{ type: 'SOLID', color: { r: 0.796, g: 0.835, b: 0.882 } }];
  opt1.cornerRadius = 8;
  phone2.appendChild(opt1);

  const optText1 = figma.createText();
  optText1.fontName = { family: "Roboto", style: "Bold" };
  optText1.characters = "Thẻ nội địa\nNAPAS";
  optText1.fontSize = 9.5;
  optText1.fills = [{ type: 'SOLID', color: { r: 0.118, g: 0.161, b: 0.231 } }];
  optText1.x = 55;
  optText1.y = 60;
  phone2.appendChild(optText1);

  // Card Option 2: VISA
  const opt2 = figma.createRectangle();
  opt2.resize(150, 42);
  opt2.x = 15;
  opt2.y = 104;
  opt2.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  opt2.strokes = [{ type: 'SOLID', color: { r: 0.796, g: 0.835, b: 0.882 } }];
  opt2.cornerRadius = 8;
  phone2.appendChild(opt2);

  const optText2 = figma.createText();
  optText2.fontName = { family: "Roboto", style: "Bold" };
  optText2.characters = "Thẻ quốc tế\nVISA / Mastercard / JCB...";
  optText2.fontSize = 9.5;
  optText2.fills = [{ type: 'SOLID', color: { r: 0.118, g: 0.161, b: 0.231 } }];
  optText2.x = 55;
  optText2.y = 112;
  phone2.appendChild(optText2);

  // Nút Tiếp tục (Đáy màn hình)
  const btn2 = figma.createRectangle();
  btn2.resize(150, 26);
  btn2.x = 15;
  btn2.y = 315;
  btn2.fills = [{ type: 'SOLID', color: { r: 0.941, g: 0.353, b: 0.129 } }];
  btn2.cornerRadius = 13;
  phone2.appendChild(btn2);

  const btnText2 = figma.createText();
  btnText2.fontName = { family: "Roboto", style: "Bold" };
  btnText2.characters = "Tiếp tục";
  btnText2.fontSize = 11;
  btnText2.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  btnText2.x = btn2.x + (150 - btnText2.width) / 2;
  btnText2.y = btn2.y + 6;
  phone2.appendChild(btnText2);

  // 8. BƯỚC 4: PETROLIMEX GATEWAY
  const petroBox = figma.createRectangle();
  petroBox.resize(150, 110);
  petroBox.x = 615;
  petroBox.y = 220;
  petroBox.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  petroBox.strokes = [{ type: 'SOLID', color: { r: 0.796, g: 0.835, b: 0.882 } }];
  petroBox.cornerRadius = 10;
  canvasFrame.appendChild(petroBox);

  const petroLabel = figma.createText();
  petroLabel.fontName = { family: "Roboto", style: "Bold" };
  petroLabel.characters = "Gửi yêu cầu liên kết token đến CTT\nEpay (qua API bảo mật)\n\nXác thực & truyền dữ liệu an toàn";
  petroLabel.fontSize = 9;
  petroLabel.resize(140, 80);
  petroLabel.fills = [{ type: 'SOLID', color: { r: 0.055, g: 0.227, b: 0.494 } }];
  petroLabel.x = 620;
  petroLabel.y = 240;
  canvasFrame.appendChild(petroLabel);

  // 9. BƯỚC 5: CTT EPAY
  const epayTitle = figma.createText();
  epayTitle.fontName = { family: "Roboto", style: "Black" };
  epayTitle.characters = "epay";
  epayTitle.fontSize = 22;
  epayTitle.fills = [{ type: 'SOLID', color: { r: 0.007, g: 0.517, b: 0.78 } }]; // #0284C7
  epayTitle.x = 835;
  epayTitle.y = 190;
  canvasFrame.appendChild(epayTitle);

  const tokenBox = figma.createRectangle();
  tokenBox.resize(90, 32);
  tokenBox.x = 815;
  tokenBox.y = 270;
  tokenBox.fills = [{ type: 'SOLID', color: { r: 0.118, g: 0.314, b: 0.635 } }]; // #1E50A2
  tokenBox.cornerRadius = 6;
  canvasFrame.appendChild(tokenBox);

  const tokenText = figma.createText();
  tokenText.fontName = { family: "Roboto", style: "Black" };
  tokenText.characters = "TOKEN\n********";
  tokenText.fontSize = 9.5;
  tokenText.textAlignHorizontal = "CENTER";
  tokenText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  tokenText.x = tokenBox.x + (90 - tokenText.width) / 2;
  tokenText.y = tokenBox.y + 4;
  canvasFrame.appendChild(tokenText);

  // 10. BƯỚC 6: MÀN HÌNH 3 (NGUỒN TIỀN FACEPAY)
  const phone3 = createPhoneFrame("Màn hình 3 - FacePay Settings", 975, 180);

  const screen3Title = figma.createText();
  screen3Title.fontName = { family: "Roboto", style: "Bold" };
  screen3Title.characters = "Nguồn tiền thanh toán (FacePay)";
  screen3Title.fontSize = 9.5;
  screen3Title.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
  screen3Title.x = (180 - screen3Title.width) / 2;
  screen3Title.y = 30;
  phone3.appendChild(screen3Title);

  const visaBox = figma.createRectangle();
  visaBox.resize(150, 28);
  visaBox.x = 15;
  visaBox.y = 48;
  visaBox.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  visaBox.strokes = [{ type: 'SOLID', color: { r: 0.886, g: 0.91, b: 0.941 } }];
  visaBox.cornerRadius = 6;
  phone3.appendChild(visaBox);

  const visaText = figma.createText();
  visaText.fontName = { family: "Roboto", style: "Black" };
  visaText.characters = "VISA                     •••• 1234";
  visaText.fontSize = 9.5;
  visaText.fills = [{ type: 'SOLID', color: { r: 0.055, g: 0.227, b: 0.494 } }];
  visaText.x = 24;
  visaText.y = 56;
  phone3.appendChild(visaText);

  const toggleText = figma.createText();
  toggleText.fontName = { family: "Roboto", style: "Bold" };
  toggleText.characters = "Thanh toán bằng tính trắc học";
  toggleText.fontSize = 8.5;
  toggleText.fills = [{ type: 'SOLID', color: { r: 0.118, g: 0.161, b: 0.231 } }];
  toggleText.x = 15;
  toggleText.y = 86;
  phone3.appendChild(toggleText);

  // Toggle Switch Green
  const toggleBg = figma.createRectangle();
  toggleBg.resize(28, 15);
  toggleBg.x = 135;
  toggleBg.y = 104;
  toggleBg.fills = [{ type: 'SOLID', color: { r: 0.063, g: 0.725, b: 0.506 } }];
  toggleBg.cornerRadius = 10;
  phone3.appendChild(toggleBg);

  const toggleDot = figma.createEllipse();
  toggleDot.resize(11, 11);
  toggleDot.x = 150;
  toggleDot.y = 106;
  toggleDot.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  phone3.appendChild(toggleDot);

  // Nút Hoàn tất (Đáy màn hình)
  const btn3 = figma.createRectangle();
  btn3.resize(150, 26);
  btn3.x = 15;
  btn3.y = 315;
  btn3.fills = [{ type: 'SOLID', color: { r: 0.941, g: 0.353, b: 0.129 } }];
  btn3.cornerRadius = 13;
  phone3.appendChild(btn3);

  const btnText3 = figma.createText();
  btnText3.fontName = { family: "Roboto", style: "Bold" };
  btnText3.characters = "Hoàn tất";
  btnText3.fontSize = 11;
  btnText3.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  btnText3.x = btn3.x + (150 - btnText3.width) / 2;
  btnText3.y = btn3.y + 6;
  phone3.appendChild(btnText3);

  // 11. FOOTER BANNER CAPSULE
  const footerCapsule = figma.createRectangle();
  footerCapsule.resize(1100, 36);
  footerCapsule.x = 100;
  footerCapsule.y = 615;
  footerCapsule.fills = [{ type: 'SOLID', color: { r: 0.91, g: 0.945, b: 0.976 } }];
  footerCapsule.strokes = [{ type: 'SOLID', color: { r: 0.733, g: 0.878, b: 0.976 } }];
  footerCapsule.cornerRadius = 20;
  canvasFrame.appendChild(footerCapsule);

  const footerText = figma.createText();
  footerText.fontName = { family: "Roboto", style: "Bold" };
  footerText.characters = "🛡️  Bảo mật – An toàn – Tuân thủ quy định của Ngân hàng Nhà nước và các tiêu chuẩn bảo mật quốc tế";
  footerText.fontSize = 12;
  footerText.fills = [{ type: 'SOLID', color: { r: 0.055, g: 0.227, b: 0.494 } }];
  footerText.x = footerCapsule.x + (1100 - footerText.width) / 2;
  footerText.y = footerCapsule.y + 9;
  canvasFrame.appendChild(footerText);

  // Select canvas frame & zoom into view
  figma.currentPage.selection = [canvasFrame];
  figma.viewport.scrollAndZoomIntoView([canvasFrame]);

  console.log("✅ ĐÃ THIẾT KẾ HOÀN TẤT TOÀN BỘ SƠ ĐỒ CÁC MÀN HÌNH LÊN FIGMA!");
})();
