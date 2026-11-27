---
type: screen-index
feature: partner-fee-management
status: approved
updated: 2026-11-27
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_ctt: docs/partner-fee-management/srs/SRS-Partner-Fee-CTT.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - flows: docs/partner-fee-management/srs/partner-fee-management-flows.md
  - states: docs/partner-fee-management/srs/partner-fee-management-states.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác v2"
---

# Quản lý Cấu hình Phí Trả Đối tác — UX Screen Specifications (V2)

> Tài liệu đặc tả bản đồ giao diện người dùng (UI/UX Screen Specs) cho toàn bộ màn hình trên Figma canvas (file `ForWork`, page `CHP Đối tác v2`), phân chia trực tiếp theo 2 phân hệ độc lập: **CẤU HÌNH PHÍ ĐỐI TÁC CTT** và **CẤU HÌNH PHÍ ĐỐI TÁC QRGW**.

---

## 1. Bản đồ Tổng thể Màn hình trên Figma Canvas (Page: `CHP Đối tác v2`)

### 1.1 PHÂN HỆ CẤU HÌNH PHÍ ĐỐI TÁC CTT

| STT | Mã màn hình & Tên trên Figma | Node ID Figma | Tọa độ (x, y) | Kích thước | Vai trò sử dụng |
|:---:|---|---|---|---|---|
| **HÀNG 1: MÀN HÌNH DANH SÁCH (SEARCH & LIST - 3 TABS)** | | | | | |
| 1 | SCR-PFEE-CTT-01: Danh sách Phí Đối tác CTT (Tab Tất cả) | 4237:14372 | (200, 352) | 1440 x 1024 | Maker, Checker |
| 2 | SCR-CTT-LIST-02: Danh sách Phí CTT (Tab Đang hoạt động) | 4237:14634 | (1740, 352) | 1440 x 1024 | Maker, Checker |
| 3 | SCR-CTT-LIST-03: Danh sách Phí CTT (Tab Chờ xử lý) | 4237:14896 | (3280, 352) | 1440 x 1024 | Maker, Checker |
| **HÀNG 2: MÀN HÌNH THÊM MỚI PHÍ XỬ LÝ GIAO DỊCH CTT (SECTION 4216:15214)** | | | | | |
| 4a | SCR-CTT-CR-01A: Thêm mới Phí XLGD CTT (Áp dụng chung loại GD) | 4241:15120 | (200, 352) | 1440 x 1040 | Maker |
| 4b | SCR-CTT-CR-01B: Thêm mới Phí XLGD CTT (Tách riêng Thanh toán và Hoàn trả - Bậc thang) | 4241:15346 | (1740, 352) | 1440 x 1280 | Maker |
| 4c | SCR-CTT-CR-01C: Thêm mới Phí XLGD CTT (Giao dịch Hoàn trả / 1 bậc) | 4242:15691 | (3280, 352) | 1440 x 1040 | Maker |
| 4d | SCR-CTT-CR-01D: Thêm mới Phí XLGD CTT (Thẻ nội địa / Bậc thang) | 4242:15916 | (4820, 352) | 1440 x 1280 | Maker |
| 4e | SCR-CTT-CR-CALC: Tính thử phí xử lý giao dịch CTT (Modal Calc-xl) | 4216:14798 | (6360, 352) | 760 x 577 | Maker |
| **HÀNG 2B: MÀN HÌNH THÊM MỚI PHÍ THANH TOÁN CTT (SECTION 4216:15234)** | | | | | |
| 5a | SCR-CTT-CR-04A: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Áp dụng chung / 1 bậc phí) | 4235:6194 | (200, 352) | 1440 x 1040 | Maker |
| 5b | SCR-CTT-CR-04B: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Cấu hình riêng theo thương hiệu / Bậc thang) | 4235:6676 | (1740, 352) | 1440 x 1520 | Maker |
| 5c | SCR-CTT-CR-03A: Thêm mới Phí Thanh toán CTT - Thẻ nội địa (1 bậc phí) | 4235:7052 | (3280, 352) | 1440 x 1040 | Maker |
| 5d | SCR-CTT-CR-03B: Thêm mới Phí Thanh toán CTT - Thẻ nội địa (Bậc thang) | 4235:7304 | (4820, 352) | 1440 x 1100 | Maker |
| **HÀNG 3: MÀN HÌNH CHI TIẾT THEO TRẠNG THÁI & DRAWER CHECKER** | | | | | |
| 9 | `CTT / Chi tiết Phí CTT / DRAFT (Bản nháp) / 1440` | `4244:16231` | (200, 752) | 1504 x 1320 | Maker |
| 10 | `CTT / Chi tiết Phí CTT / PENDING (Maker View) / 1440` | `4244:16477` | (1804, 752) | 1504 x 1250 | Maker |
| 11 | `CTT / Chi tiết Phí CTT / PENDING (Checker View / Drawer Phê duyệt) / 1440` | `4244:17738` | (9824, 752) | 1504 x 1400 | Checker |
| 12 | `CTT / Chi tiết Phí CTT / READY (Chờ hiệu lực) / 1440` | `4244:16743` | (3408, 752) | 1504 x 1320 | Maker, Checker |
| 13 | `CTT / Chi tiết Phí CTT / ACTIVE (Đang hoạt động) / 1440` | `4244:16987` | (5012, 752) | 1504 x 1320 | Maker, Checker |
| 14 | `CTT / Chi tiết Phí CTT / INACTIVE (Tạm dừng / Hết hiệu lực) / 1440` | `4244:17234` | (6616, 752) | 1504 x 1320 | Maker, Checker |
| 15 | `CTT / Chi tiết cấu hình / 1504 / NEW sau từ chối` | `4244:17484` | (8220, 752) | 1504 x 1320 | Maker |
| 16 | `CTT / Lịch sử hoạt động / 1504` | `4287:13664` | (200, 352) | 1504 x 1250 | Maker, Checker, Audit |

---

### 1.2 PHÂN HỆ CẤU HÌNH PHÍ ĐỐI TÁC QRGW (Section Node `4302:3265`)

Danh mục hiện hành được đối chiếu trực tiếp với Figma ngày 27/11/2026. Tọa độ tính tương đối trong từng Section con; `4139:40` là frame lưu trữ, không phải Section đang sử dụng.

| STT | Tên trên Figma | Node ID Figma | Tọa độ (x, y) | Kích thước | Vai trò sử dụng |
|:---:|---|---|---|---|---|
| **QRGW · 01 · Tra cứu và danh sách (Section `4216:15620`)** | | | | | |
| 17 | QRGW / Danh sách Phí QRGW / Tab Tất cả / 1440 | `4088:11297` | (200, 352) | 1440 x 1024 | Maker, Checker |
| 18 | QRGW / Danh sách Phí QRGW / Tab Đang hoạt động / 1440 | `4089:11559` | (1740, 352) | 1440 x 1024 | Maker, Checker |
| 19 | QRGW / Danh sách Phí QRGW / Tab Chờ xử lý / 1440 | `4090:11821` | (3280, 352) | 1440 x 1024 | Maker, Checker |
| **QRGW · 02 · Thêm mới phí xử lý giao dịch (Section `4216:15623`)** | | | | | |
| 20 | QRGW / XLGD áp dụng chung / 1 bậc phí / 1440 | `4116:18663` | (200, 352) | 1440 x 1040 | Maker |
| 21 | QRGW / XLGD theo loại giao dịch / Bậc thang / 1440 | `4116:18825` | (1740, 352) | 1440 x 1149 | Maker |
| 21a | QRGW / XLGD theo loại giao dịch / Bậc thang / 1440 / Một bậc phí | `4389:11325` | (1740, 1601) | 1440 x 1075 | Maker |
| **QRGW · 03 · Thêm mới phí thanh toán (Section `4216:15626`)** | | | | | |
| 22 | QRGW / Phí thanh toán áp dụng chung / 1 bậc phí / 1440 | `4116:19078` | (200, 352) | 1440 x 1040 | Maker |
| 22a | QRGW / Phí thanh toán áp dụng chung / 1 bậc phí / 1440 / Bậc thang | `4390:11790` | (200, 1492) | 1440 x 1040 | Maker |
| 23 | QRGW / Phí thanh toán theo loại giao dịch / 1 bậc phí / 1440 | `4116:19262` | (1740, 352) | 1440 x 1118 | Maker |
| 23a | QRGW / Phí thanh toán theo loại giao dịch / 1 bậc phí / 1440 / Bậc thang | `4390:12055` | (1740, 1570) | 1440 x 1207 | Maker |
| **QRGW · 04 · Chi tiết và phê duyệt (Section `4216:15629`)** | | | | | |
| 24 | QRGW / Chi tiết Phí QRGW / DRAFT (Bản nháp) / 1504 | `4116:31385` | (200, 352) | 1504 x 1412 | Maker |
| 25 | QRGW / Chi tiết Phí QRGW / PENDING (Maker View) / 1504 | `4116:31644` | (1804, 352) | 1504 x 1313 | Maker |
| 27 | QRGW / Chi tiết Phí QRGW / READY (Chờ hiệu lực) / 1504 | `4116:32284` | (3408, 352) | 1504 x 1412 | Maker, Checker |
| 28 | QRGW / Chi tiết Phí QRGW / ACTIVE (Đang hoạt động) / 1504 | `4116:32543` | (5012, 352) | 1504 x 1412 | Maker, Checker |
| 29 | QRGW / Chi tiết Phí QRGW / INACTIVE (Tạm dừng / Hết hiệu lực) / 1504 | `4116:32805` | (6616, 352) | 1504 x 1412 | Maker, Checker |
| 30 | QRGW / Chi tiết Phí QRGW / REJECTED (Bị từ chối) / 1504 | `4116:33064` | (8220, 352) | 1504 x 1412 | Maker |
| 26a | QRGW / Chi tiết Phí QRGW / PENDING (Checker View / Drawer Phê duyệt) / 1441 | `4270:11065` | (200, 2152) | 1504 x 1400 | Checker |
| 26 | QRGW / Chi tiết Phí QRGW / PENDING (Checker View / Drawer Phê duyệt) / 1504 | `4118:1345` | (9824, 352) | 1504 x 1400 | Checker |
| **QRGW · Lịch sử hoạt động (Section `4271:11495`)** | | | | | |
| 31 | QRGW / Lịch sử hoạt động / 1504 | `4270:11424` | (80, 80) | 1504 x 1250 | Maker, Checker, Audit |
| **HÀNG 4: MÀN HÌNH XỬ LÝ CẤU HÌNH CTT THEO TRẠNG THÁI** | | | | | |
| 32 | `CTT / Xử lý DRAFT / 1504` | `4276:11637` | (200, 352) | 1504 x 1328 | Maker |
| 33 | `CTT / Xử lý NEW sau từ chối / 1504` | `4276:12834` | (6616, 352) | 1504 x 1328 | Maker |
| 34 | `CTT / Xử lý READY / 1504` | `4276:11937` | (1804, 352) | 1504 x 1328 | Maker |
| 35 | `CTT / Xử lý ACTIVE / 1504` | `4276:12231` | (3408, 352) | 1504 x 1328 | Maker |
| 36 | `CTT / Xử lý INACTIVE / 1504` | `4276:12532` | (5012, 352) | 1504 x 1328 | Maker |
| **QRGW · Xử lý cấu hình (Section `4273:13064`)** | | | | | |
| 37 | QRGW / Xử lý DRAFT / 1504 | `4273:11572` | (200, 352) | 1504 x 1420 | Maker |
| 38 | QRGW / Xử lý NEW sau từ chối / 1504 | `4273:11873` | (1804, 352) | 1504 x 1420 | Maker |
| 39 | QRGW / Xử lý READY / 1504 | `4273:12182` | (3408, 352) | 1504 x 1420 | Maker |
| 40 | QRGW / Xử lý ACTIVE / 1504 | `4273:12468` | (5012, 352) | 1504 x 1420 | Maker |
| 41 | QRGW / Xử lý INACTIVE / 1504 | `4273:12767` | (6616, 352) | 1504 x 1420 | Maker |

Các popup tính thử và cảnh báo nằm trong Section 03; nhóm xác nhận/thông báo nằm trong Section 05 (4216:15632), xem mục 1.3.

**Quy tắc thao tác:** Màn chi tiết có thanh tác vụ dọc bên phải theo quyền/trạng thái; nút không khả dụng ở trạng thái hiện tại được disabled. Footer của màn chi tiết và lịch sử chỉ có nút `Đóng`, căn giữa, không icon. Màn xử lý mở từ nút hồ sơ trên thanh bên phải; footer căn giữa gồm `Đóng` và các nút nghiệp vụ theo trạng thái. DRAFT: `Xóa nháp`, `Cập nhật thông tin`, `Gửi phê duyệt`; NEW sau từ chối: `Xóa cấu hình`, `Cập nhật thông tin`, `Gửi phê duyệt lại`; READY: `Cập nhật thông tin`; ACTIVE: `Cập nhật thông tin`, `Gửi phê duyệt cập nhật`, `Gửi yêu cầu tạm dừng`; INACTIVE: `Cập nhật thông tin`, `Gửi yêu cầu mở kích hoạt`. PENDING Maker không có màn chỉnh sửa.

**Lịch sử hoạt động:** Màn hình CTT/QRGW hiển thị các sự kiện theo thời gian, tên/ vai trò người thực hiện, dấu thời gian và nội dung thay đổi (bao gồm chuyển trạng thái/YCPD hoặc thay đổi trường cấu hình); footer chỉ có `Đóng`.

---

### 1.3 CÁC MODALS XÁC NHẬN, TOASTS VÀ CỤM SIMULATOR TÍNH THỬ PHÍ

| STT | Tên Modal / Toast / Popup | Node ID Figma | Kích thước | Mô tả & Trigger |
|:---:|---|---|---|---|
| 42 | `confirm trước khi "Dừng hoạt động cấu hình"` | `4140:3190` | 594 x 254 | Hiển thị khi Maker chọn [Tạm dừng] hoặc Checker duyệt tạm dừng |
| 43 | `Modal: Xác nhận lưu cập nhật` | `4140:3206` | 381 x 196 | Hiển thị khi Maker bấm [Lưu cập nhật] từ màn hình Chỉnh sửa |
| 44 | `Modal: Xác nhận hủy cập nhật` | `4140:3221` | 381 x 196 | Hiển thị khi bấm [Hủy] trong luồng chỉnh sửa |
| 45 | `Modal: Xác nhận hủy thêm mới` | `4140:3236` | 381 x 196 | Hiển thị khi bấm [Hủy] trong luồng thêm mới |
| 46 | `Modal: Xác nhận lưu nháp` | `4140:3251` | 381 x 196 | Hiển thị khi Maker bấm [Lưu nháp] tạo trạng thái `DRAFT` |
| 47 | `Toast: Dừng hoạt động thành công` | `4140:3266` | 417 x 223 | Toast notification khi chuyển trạng thái sang `INACTIVE` |
| 48 | `Toast: Cập nhật thành công` | `4140:3273` | 417 x 223 | Toast notification khi gửi duyệt cập nhật thành công |
| 49 | `Toast: Lưu nháp thành công` | `4140:3280` | 417 x 223 | Toast notification khi lưu bản ghi nháp thành công |
| 50 | `Toast: Tạo mới thành công` | `4140:3287` | 417 x 223 | Toast notification khi gửi duyệt tạo mới thành công |
| 51 | `Popup tính thử phí - Phí thanh toán (1 mức)` | `4140:4057` / `4140:3754` | 964 x 650 | Modal mô phỏng tính phí 1 bậc khi bấm `[Tính thử 🧮]` |
| 52 | `Popup tính thử phí - Nhiều mức phí / Bậc thang` | `4140:4147` / `4140:3844` | 964 x 795 | Modal mô phỏng biểu phí bậc thang theo Tổng GTGD/Tổng SLGD |
| 53 | `Alert` | `4140:4321` / `4140:4018` | 419 x 191 | Hộp thoại cảnh báo dữ liệu không hợp lệ |
| 54 | `SCR-COMP-ACTIONS: Ma trận Menu Thao tác (6 Trạng thái)` | `4083:10606` | 1440 x 551 | Component đặc tả menu thao tác 3 chấm `[⋮]` theo từng trạng thái |

---

## 2. Quy chuẩn Thiết kế V2 UI (Modern Clean Theme)

1. **Header Sidebar**: Nền xanh lam nhạt (`#74B4F7`), biểu tượng kết nối mạng trắng + chữ `epay`, nút thu gọn menu (`⇇`).
2. **Cấu trúc Menu phân nhánh**:
   ```
   Trang chủ
   Quản lý cấu hình phí [▴]
      Phí trả đối tác
         • Phí đối tác CTT (Active)
         • Phí đối tác QRGW
      Phí thu ĐVCNTT
      Phí thu Khách hàng
   Quản lý Yêu cầu phê duyệt
   ```
3. **Phân định Nguồn dữ liệu**: **Không hiển thị** trường / cột `Nguồn dữ liệu` vì người dùng đã được điều hướng tách biệt trực tiếp từ Menu Left.
4. **Loại phí**: Chỉ gồm **02 loại phí cốt lõi**:
   - `Phí xử lý giao dịch`
   - `Phí thanh toán`
5. **Hình thức thu phí**: Chỉ gồm **03 hình thức**:
   - `1 bậc phí` (Cố định VND hoặc tỷ lệ % cố định)
   - `Theo SLGD` (Bậc thang số lượng giao dịch)
   - `Theo GTGD` (Bậc thang giá trị giao dịch)
6. **Bộ Status Badges dạng Pill**:
   - `● ACTIVE`: Nền xanh lá nhạt (`#DCFCE7`), text xanh đậm (`#15803D`)
   - `● NEW`: Nền xanh ngọc nhạt (`#E0F2FE`), text cyan (`#0369A1`)
   - `● PENDING`: Nền vàng cam (`#FEF3C7`), text hổ phách (`#B45309`)
   - `● READY`: Nền tím nhạt (`#F3E8FF`), text tím đậm (`#6B21A8`)
   - `● INACTIVE`: Nền đỏ hồng (`#FEE2E2`), text đỏ đậm (`#B91C1C`)
   - `● DRAFT`: Nền xám nhạt (`#F1F5F9`), text xám (`#475569`)
   - **Badge trạng thái YCPD** `● REJECTED` (không phải trạng thái CHP): Nền đỏ cam (`#FFE4E6`), text đỏ gạch (`#BE123C`)

### Lịch sử hoạt động CTT — cập nhật 17/11/2026

Figma: ForWork → CHP Đối tác v2 → CTT · 06 · Lịch sử hoạt động (section 4288:13868). Màn 4287:13664 dùng layout Portal hiện hành; khối timeline có tiêu đề xanh nhạt, ghi người thao tác, thời gian, hành động, giá trị cũ/mới và trạng thái CHP/YCPD. Dữ liệu trên bản vẽ là minh họa cho CTT_FE_KBANK_001.

Đã nối biểu tượng Xem lịch sử hoạt động từ 6 màn chi tiết và 5 màn xử lý hồ sơ CTT. Footer chỉ có Đóng, quay lại màn đã mở lịch sử. Màn tham chiếu 4140:4426 được giữ lại; không dùng làm màn hiện hành.
