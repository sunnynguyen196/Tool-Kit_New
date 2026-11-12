---
type: screen-index
feature: partner-fee-management
status: approved
updated: 2026-11-09
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

### 1.1 PHÂN HỆ CẤU HÌNH PHÍ ĐỐI TÁC CTT (Section Node `4139:39`)

| STT | Mã màn hình & Tên trên Figma | Node ID Figma | Tọa độ (x, y) | Kích thước | Vai trò sử dụng |
|:---:|---|---|---|---|---|
| **HÀNG 1: MÀN HÌNH DANH SÁCH (SEARCH & LIST - 3 TABS)** | | | | | |
| 1 | `SCR-PFEE-CTT-01: Danh sách Phí Đối tác CTT` (Tab Tất cả) | `4082:10325` | (135, 686) | 1440 x 960 | Maker, Checker |
| 2 | `SCR-CTT-LIST-02: Danh sách Phí CTT - Tab Đang hoạt động` | `4087:10703` | (1675, 686) | 1440 x 960 | Maker, Checker |
| 3 | `SCR-CTT-LIST-03: Danh sách Phí CTT - Tab Chờ xử lý` | `4088:10992` | (3215, 686) | 1440 x 960 | Maker, Checker |
| **HÀNG 2: MÀN HÌNH THÊM MỚI (CREATE FORMS - 5 BIẾN THỂ)** | | | | | |
| 4 | `SCR-CTT-CR-01A: Thêm mới Phí XLGD CTT (Áp dụng chung loại GD)` | `4104:10585` | (135, 2246) | 1440 x 960 | Maker |
| 5 | `SCR-CTT-CR-01B: Thêm mới Phí XLGD CTT (Tách riêng Thanh toán / Hoàn trả)` | `4105:13189` | (1675, 2246) | 1440 x 960 | Maker |
| 6 | `SCR-CTT-CR-03: Thêm mới Phí Thanh toán CTT - Thẻ nội địa` | `4104:10909` | (3215, 2246) | 1440 x 960 | Maker |
| 7 | `SCR-CTT-CR-04A: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Áp dụng chung)` | `4104:11084` | (4755, 2246) | 1440 x 960 | Maker |
| 8 | `SCR-CTT-CR-04B: Thêm mới Phí Thanh toán CTT - Thẻ quốc tế (Theo thương hiệu thẻ)` | `4109:13966` | (6295, 2246) | 1440 x 1207 | Maker |
| **HÀNG 3: MÀN HÌNH XEM CHI TIẾT THEO 6 TRẠNG THÁI & DRAWER CHECKER** | | | | | |
| 9 | `SCR-CTT-DT-01: Chi tiết Phí CTT - DRAFT (Bản nháp)` | `4116:28761` | (135, 3586) | 1440 x 1400 | Maker |
| 10 | `SCR-CTT-DT-02A: Chi tiết Phí CTT - PENDING (Maker View)` | `4116:29110` | (1675, 3586) | 1440 x 1400 | Maker |
| 11 | `SCR-CTT-DT-02B: Chi tiết Phí CTT - PENDING (Checker View - Drawer Phê duyệt)` | `4118:863` | (3215, 3586) | 1440 x 1400 | Checker |
| 12 | `SCR-CTT-DT-03: Chi tiết Phí CTT - READY (Chờ hiệu lực)` | `4116:29986` | (4755, 3586) | 1440 x 1400 | Maker, Checker |
| 13 | `SCR-CTT-DT-04: Chi tiết Phí CTT - ACTIVE (Đang hoạt động)` | `4116:30335` | (6295, 3586) | 1440 x 1400 | Maker, Checker |
| 14 | `SCR-CTT-DT-05: Chi tiết Phí CTT - INACTIVE (Tạm dừng / Hết hiệu lực)` | `4116:30687` | (7835, 3586) | 1440 x 1400 | Maker, Checker |
| 15 | `SCR-CTT-DT-06: Chi tiết Phí CTT - NEW (YCPD bị từ chối)` | `4116:31036` | (9375, 3586) | 1440 x 1487 | Maker |
| 16 | `Xem chi tiết / Tab Lịch sử hoạt động / 1920 (Audit Trail CTT)` | `4140:4426` | (11068, 3562) | 1918 x 1080 | Maker, Checker, Audit |

---

### 1.2 PHÂN HỆ CẤU HÌNH PHÍ ĐỐI TÁC QRGW (Section Node `4139:40`)

| STT | Mã màn hình & Tên trên Figma | Node ID Figma | Tọa độ (x, y) | Kích thước | Vai trò sử dụng |
|:---:|---|---|---|---|---|
| **HÀNG 1: MÀN HÌNH DANH SÁCH (SEARCH & LIST - 3 TABS)** | | | | | |
| 17 | `SCR-QR-LIST-01: Danh sách Phí QRGW - Tab Tất cả` | `4088:11297` | (109, 686) | 1440 x 960 | Maker, Checker |
| 18 | `SCR-QR-LIST-02: Danh sách Phí QRGW - Tab Đang hoạt động` | `4089:11559` | (1649, 686) | 1440 x 960 | Maker, Checker |
| 19 | `SCR-QR-LIST-03: Danh sách Phí QRGW - Tab Chờ xử lý` | `4090:11821` | (3189, 686) | 1440 x 960 | Maker, Checker |
| **HÀNG 2: MÀN HÌNH THÊM MỚI (CREATE FORMS - 4 BIẾN THỂ)** | | | | | |
| 20 | `SCR-QR-CR-01: Thêm mới Phí XLGD QRGW (Áp dụng chung loại GD)` | `4116:18663` | (109, 2246) | 1440 x 960 | Maker |
| 21 | `SCR-QR-CR-02: Thêm mới Phí XLGD QRGW (Tách riêng Thanh toán / Hoàn trả)` | `4116:18825` | (1649, 2246) | 1440 x 1020 | Maker |
| 22 | `SCR-QR-CR-03: Thêm mới Phí Thanh toán QRGW (Áp dụng chung loại GD)` | `4116:19078` | (3189, 2246) | 1440 x 960 | Maker |
| 23 | `SCR-QR-CR-04: Thêm mới Phí Thanh toán QRGW (Tách riêng Thanh toán / Hoàn trả)` | `4116:19262` | (4729, 2246) | 1440 x 960 | Maker |
| **HÀNG 3: MÀN HÌNH XEM CHI TIẾT THEO 6 TRẠNG THÁI & DRAWER CHECKER** | | | | | |
| 24 | `SCR-QR-DT-01: Chi tiết Phí QRGW - DRAFT (Bản nháp)` | `4116:31385` | (109, 3586) | 1440 x 1250 | Maker |
| 25 | `SCR-QR-DT-02A: Chi tiết Phí QRGW - PENDING (Maker View)` | `4116:31644` | (1649, 3586) | 1440 x 965 | Maker |
| 26 | `SCR-QR-DT-02B: Chi tiết Phí QRGW - PENDING (Checker View - Drawer Phê duyệt)` | `4118:1345` | (3189, 3586) | 1440 x 1400 | Checker |
| 27 | `SCR-QR-DT-03: Chi tiết Phí QRGW - READY (Chờ hiệu lực)` | `4116:32284` | (4729, 3586) | 1440 x 1250 | Maker, Checker |
| 28 | `SCR-QR-DT-04: Chi tiết Phí QRGW - ACTIVE (Đang hoạt động)` | `4116:32543` | (6269, 3586) | 1440 x 1250 | Maker, Checker |
| 29 | `SCR-QR-DT-05: Chi tiết Phí QRGW - INACTIVE (Tạm dừng / Hết hiệu lực)` | `4116:32805` | (7809, 3586) | 1440 x 1250 | Maker, Checker |
| 30 | `SCR-QR-DT-06: Chi tiết Phí QRGW - NEW (YCPD bị từ chối)` | `4116:33064` | (9349, 3586) | 1440 x 1250 | Maker |
| 31 | `Xem chi tiết / Tab Lịch sử hoạt động / 1920 (Audit Trail QRGW)` | `4140:3342` | (11086, 3569) | 1918 x 1080 | Maker, Checker, Audit |

---

### 1.3 CÁC MODALS XÁC NHẬN, TOASTS VÀ CỤM SIMULATOR TÍNH THỬ PHÍ

| STT | Tên Modal / Toast / Popup | Node ID Figma | Kích thước | Mô tả & Trigger |
|:---:|---|---|---|---|
| 32 | `confirm trước khi "Dừng hoạt động cấu hình"` | `4140:3190` | 594 x 254 | Hiển thị khi Maker chọn [Tạm dừng] hoặc Checker duyệt tạm dừng |
| 33 | `Modal: Xác nhận lưu cập nhật` | `4140:3206` | 381 x 196 | Hiển thị khi Maker bấm [Lưu cập nhật] từ màn hình Chỉnh sửa |
| 34 | `Modal: Xác nhận hủy cập nhật` | `4140:3221` | 381 x 196 | Hiển thị khi bấm [Hủy] trong luồng chỉnh sửa |
| 35 | `Modal: Xác nhận hủy thêm mới` | `4140:3236` | 381 x 196 | Hiển thị khi bấm [Hủy] trong luồng thêm mới |
| 36 | `Modal: Xác nhận lưu nháp` | `4140:3251` | 381 x 196 | Hiển thị khi Maker bấm [Lưu nháp] tạo trạng thái `DRAFT` |
| 37 | `Toast: Dừng hoạt động thành công` | `4140:3266` | 417 x 223 | Toast notification khi chuyển trạng thái sang `INACTIVE` |
| 38 | `Toast: Cập nhật thành công` | `4140:3273` | 417 x 223 | Toast notification khi gửi duyệt cập nhật thành công |
| 39 | `Toast: Lưu nháp thành công` | `4140:3280` | 417 x 223 | Toast notification khi lưu bản ghi nháp thành công |
| 40 | `Toast: Tạo mới thành công` | `4140:3287` | 417 x 223 | Toast notification khi gửi duyệt tạo mới thành công |
| 41 | `Popup tính thử phí - Phí thanh toán (1 mức)` | `4140:4057` / `4140:3754` | 964 x 650 | Modal mô phỏng tính phí 1 bậc khi bấm `[Tính thử 🧮]` |
| 42 | `Popup tính thử phí - Nhiều mức phí / Bậc thang` | `4140:4147` / `4140:3844` | 964 x 795 | Modal mô phỏng biểu phí bậc thang theo Tổng GTGD/Tổng SLGD |
| 43 | `Alert` | `4140:4321` / `4140:4018` | 419 x 191 | Hộp thoại cảnh báo dữ liệu không hợp lệ |
| 44 | `SCR-COMP-ACTIONS: Ma trận Menu Thao tác (6 Trạng thái)` | `4083:10606` | 1440 x 551 | Component đặc tả menu thao tác 3 chấm `[⋮]` theo từng trạng thái |

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
