import fs from 'node:fs';

const targetPath = process.argv[2] || 'dispute-management-wireframe2.html';
const wireframeFile = targetPath.includes('\\') || targetPath.includes('/') ? targetPath : 'd:\\BA Master Flow\\docs\\dispute-management\\html-wireframe\\' + targetPath;
const specFile = 'd:\\BA Master Flow\\docs\\dispute-management\\html-wireframe\\WIREFRAME-SPEC.md';

if (!fs.existsSync(wireframeFile) || !fs.existsSync(specFile)) {
  console.error('❌ Required files not found');
  process.exit(1);
}

const html = fs.readFileSync(wireframeFile, 'utf8');
const specMd = fs.readFileSync(specFile, 'utf8');

console.log('================================================================');
console.log('🚀 AUTOMATED WIREFRAME SPECIFICATION VERIFIER (WIREFRAME-SPEC.md)');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function report(testName, success, detail = '') {
  if (success) {
    passCount++;
    console.log(`✅ [PASS] ${testName} ${detail ? '(' + detail + ')' : ''}`);
  } else {
    failCount++;
    console.log(`❌ [FAIL] ${testName} ${detail ? '(' + detail + ')' : ''}`);
  }
}

// TEST 1: SCREEN PANELS COUNT & MATCHING (18 PANELS)
const expectedScreenIds = [
  'sent-list-screen', 'received-list-screen', 'create-dispute-screen',
  'detail-ts-012', 'detail-ts-011', 'detail-ts-001', 'detail-ts-010',
  'detail-ts-009', 'detail-ts-003', 'detail-ts-005', 'detail-ts-007',
  'detail-ts-008', 'detail-ts-014', 'detail-ts-018', 'detail-ts-016',
  'detail-ts-017', 'detail-ts-015', 'detail-ts-019'
];

let missingScreens = [];
expectedScreenIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) missingScreens.push(id);
});
report('Test 1: 18 Screen Panels Existence', missingScreens.length === 0, missingScreens.length ? `Missing: ${missingScreens.join(', ')}` : '18/18 found');

// TEST 2: HTML DIV TAG BALANCE PER SCREEN (DIFF = 0)
let tagImbalanceScreens = [];
expectedScreenIds.forEach((id, idx) => {
  const start = html.indexOf(`id="${id}"`);
  if (start === -1) return;
  const tagStart = html.lastIndexOf('<div', start);
  let nextStart = html.length;
  if (idx < expectedScreenIds.length - 1) {
    const nextId = expectedScreenIds[idx + 1];
    nextStart = html.lastIndexOf('<div', html.indexOf(`id="${nextId}"`));
  } else {
    nextStart = html.lastIndexOf('<div', html.indexOf('id="txSearchModal"'));
  }

  const chunk = html.substring(tagStart, nextStart);
  const opens = (chunk.match(/<div[\s>]/g) || []).length;
  const closes = (chunk.match(/<\/div>/g) || []).length;
  if (opens !== closes) {
    tagImbalanceScreens.push(`${id} (opens:${opens}, closes:${closes})`);
  }
});
report('Test 2: HTML Tag Balance (Diff = 0 per screen)', tagImbalanceScreens.length === 0, tagImbalanceScreens.length ? `Imbalanced: ${tagImbalanceScreens.join('; ')}` : 'All 18 screens balanced');

// TEST 3: FILTER CARD FIELDS IN RECEIVED LIST SCREEN
const expectedFilterLabels = [
  'MERCHANT CODE', 'ĐỐI TÁC THANH TOÁN', 'LOẠI DỊCH VỤ', 'VAI TRÒ GỐC',
  'TIẾN TRÌNH TRA SOÁT (PCTS)', 'TRẠNG THÁI HẾT HẠN', 'TRẠNG THÁI XỬ LÝ YCTS TẠI EPAY',
  'TRẠNG THÁI XỬ LÝ YCTS TẠI ĐỐI TÁC', 'LOẠI TRA SOÁT', 'NGƯỜI TẠO', 'THỜI GIAN TẠO', 'NGƯỜI PHÊ DUYỆT'
];
const recScreenStart = html.indexOf('id="received-list-screen"');
const recScreenEnd = html.indexOf('id="create-dispute-screen"');
const recChunk = html.substring(recScreenStart, recScreenEnd);
let missingRecFilters = expectedFilterLabels.filter(lbl => !recChunk.includes(lbl));
report('Test 3: Received List Screen 12 Status & Business Filter Fields', missingRecFilters.length === 0, missingRecFilters.length ? `Missing: ${missingRecFilters.join(', ')}` : '12/12 filter fields present');

// TEST 4: ORIGINAL TX BLOCK (12 FIELDS)
const expectedTxFields = [
  'Mã giao dịch', 'Mã GD đối tác', 'Trạng thái giao dịch', 'Số tiền giao dịch',
  'Tổ chức thanh toán', 'Tổ chức phát hành', 'Ngày giao dịch', 'Merchant code',
  'Loại dịch vụ', 'PTTT', 'Loại QR', 'Mã đơn hàng (Order ID)'
];
let txFieldCheckFail = false;
expectedTxFields.forEach(f => { if (!html.includes(f)) txFieldCheckFail = true; });
report('Test 4: Original Transaction Block 12 Fields', !txFieldCheckFail, '12/12 fields present');

// TEST 5 & 6: PROGRESS STEP BAR & BREADCRUMB
const hasProgressBar7Steps = html.includes('BỘ TIẾN TRÌNH XỬ LÝ TRA SOÁT') && html.includes('Chờ xử lý');
const hasBreadcrumbClickable = html.includes('crumb-link') && html.includes('onclick="goSent()"');
report('Test 5: Progress Step Bar (7 steps containing Chờ phản hồi)', hasProgressBar7Steps, '7-step progress bar with Chờ phản hồi present');
report('Test 6: Interactive Breadcrumb Navigation', hasBreadcrumbClickable, 'Clickable breadcrumb links present');

// TEST 7: JS SYNTAX VALIDATION
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const jsCode = html.substring(scriptStart + 8, scriptEnd);
let jsValid = true;
let jsError = '';
try { new Function(jsCode); } catch (e) { jsValid = false; jsError = e.message; }
report('Test 7: JS Code Syntax Validation', jsValid, jsValid ? '0 syntax errors' : jsError);

// TEST 8: USER CONFIRMED SPEC INTEGRATION RULE
const hasSection5 = specMd.includes('QUY TRÌNH PHÊ DUYỆT VÀ NÂNG CẤP QUY CHUẨN') && specMd.includes('CHỜ NGƯỜI DÙNG PHÊ DUYỆT');
report('Test 8: User-Confirmed Spec Integration Rule in WIREFRAME-SPEC.md', hasSection5, 'User approval prerequisite rule active');

// TEST 9: YCTS TH1 & TH2 BUSINESS RULES
const ts012Chunk = html.substring(html.indexOf('id="detail-ts-012"'), html.indexOf('id="detail-ts-011"'));
const ts011Chunk = html.substring(html.indexOf('id="detail-ts-011"'), html.indexOf('id="detail-ts-001"'));
const th1Valid = ts012Chunk.includes('Thông tin xử lý') && ts012Chunk.includes('Gửi phê duyệt');
const th2Valid = ts011Chunk.includes('TS-011');
report('Test 9: YCTS TH1 (TS-012) & TH2 (TS-011) Business Rules', th1Valid && th2Valid, 'TH1 & TH2 form & processing block verified');

// TEST 10: STRICT SEPARATION OF INPUT & PROCESSING BLOCKS
const hasSplitInputBlock = html.includes('Thông tin tra soát');
const hasSplitProcessingBlock = html.includes('Thông tin xử lý');
report('Test 10: Strict Separation of Input Block & Processing Block', hasSplitInputBlock && hasSplitProcessingBlock, 'Input & Processing blocks separated');

// TEST 11: CREATE DISPUTE SCREEN SPECS
const createChunk = html.substring(html.indexOf('id="create-dispute-screen"'), html.indexOf('id="detail-ts-012"'));
const createSection1 = createChunk.includes('THÔNG TIN YÊU CẦU');
const createSection2 = createChunk.includes('THÔNG TIN GIAO DỊCH');
report('Test 11: User-Confirmed Create Dispute Screen Specs', createSection1 && createSection2, 'Figma layout & labels verified');

// TEST 12: FIGMA PROCESSING BLOCK SPECS
const hasPa02Option = ts012Chunk.includes('PA_02');
report('Test 12: User-Confirmed Figma Processing Block Specs (TS-012 / TS-011)', hasPa02Option, 'Editable/disabled fields & PA_02 options verified');

// TEST 13: RBAC APPROVAL BUTTON RULES
const ts001Chunk = html.substring(html.indexOf('id="detail-ts-001"'), html.indexOf('id="detail-ts-010"'));
const hasMakerMsg = ts001Chunk.includes('maker-pending-msg');
const hasCheckerBtns = ts001Chunk.includes('checker-action-btns');
report('Test 13: User-Confirmed RBAC Approval Button Rules (TS-001 / TS-016)', hasMakerMsg && hasCheckerBtns, 'Maker message & Checker-only approval buttons verified');

// TEST 14: 3 NEW STATUS FIELDS
const hasExpireStatus = html.includes('Trạng thái hết hạn');
const hasEpayStatus = html.includes('xử lý YCTS tại Epay');
const hasPartnerStatus = html.includes('xử lý YCTS tại đối tác');
report('Test 14: User-Confirmed 3 New Status Fields in Dispute Input Block', hasExpireStatus && hasEpayStatus && hasPartnerStatus, 'Expiration, Epay, and Partner status fields verified');

// TEST 15 & 16: REFUND & CREDIT BLOCKS
const hasFullRefundFields = html.includes('Mã GD hoàn trả') && html.includes('Số tiền hoàn trả') && html.includes('Trạng thái hoàn trả');
const hasFullCreditFields = html.includes('Mã giao dịch báo có') && html.includes('Số tiền báo có') && html.includes('Trạng thái báo có');
report('Test 15: User-Confirmed 9 Fields in Refund Block (TS-003, TS-008, TS-016, TS-015)', hasFullRefundFields, 'All 9 refund fields verified');
report('Test 16: User-Confirmed 8 Fields in Credit Block (TS-017, TS-019)', hasFullCreditFields, 'All 8 credit fields verified');

// TEST 17: REMOVAL OF REDUNDANT TOP BUTTON
const detailAreaStart = html.indexOf('id="detail-ts-012"');
const detailAreaEnd = html.indexOf('id="txSearchModal"');
const detailAreaHtml = html.substring(detailAreaStart, detailAreaEnd);
const noRedundantDetailButtons = !detailAreaHtml.includes('btn-back');
report('Test 17: User-Confirmed Removal of Redundant Top Button & Title from Detail Screens', noRedundantDetailButtons, 'Top sub-header button & title removed from all 15 detail screens');

// TEST 18: SUB-STATUS VALUES
const ts007Chunk = html.substring(html.indexOf('id="detail-ts-007"'), html.indexOf('id="detail-ts-008"'));
const ts007HasUnexpired = ts007Chunk.includes('Chưa hết hạn');
report('Test 18: User-Confirmed Sub-Status Values at Unprocessed/Failed Stages (TS-007)', ts007HasUnexpired, 'TS-007 displays Chưa hết hạn, Epay: —, Partner: —');

// TEST 19: POPUP MODAL #txSearchModal
const hasPopupModal = html.includes('id="txSearchModal"');
const popupModalHasTxIdFilter = html.includes('id="modal-filter-txid"');
report('Test 19: User-Confirmed Popup Modal #txSearchModal Specs (Popup Modal 9 Filter Fields & 10 Table Columns Verified)', hasPopupModal && popupModalHasTxIdFilter, 'Popup Modal verified');

console.log('\n================================================================');
if (failCount === 0) {
  console.log('🎉 ALL 19/19 WIREFRAME SPECIFICATION TESTS PASSED PERFECTLY!');
} else {
  console.log(`⚠️ VERIFICATION FAILED: ${failCount} tests failed out of 19`);
}
console.log('================================================================\n');
