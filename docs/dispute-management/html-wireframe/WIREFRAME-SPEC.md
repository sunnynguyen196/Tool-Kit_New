# QUY CHUẨN ĐẶC TẢ GIAO DIỆN & NGHIỆP VỤ WIREFRAME 2 (DISPUTE MANAGEMENT)
> **Single Source of Truth** — Tài liệu ghi nhớ duy nhất & bắt buộc tuân thủ cho toàn bộ màn hình Wireframe Quản lý tra soát (`dispute-management-wireframe2.html`) và Giao diện Figma Portal.
- 🚫 **Quy tắc thực thi & kiểm thử**: **KHÔNG TỰ ĐỘNG MỞ TRÌNH DUYỆT BROWSER (`browser_subagent` / `open_browser_url`)** mỗi khi cập nhật Wireframe HTML. Việc kiểm tra & xác minh được thực hiện hoàn toàn tự động thông qua HTTP script backend và Tag Balance Checker.
- Tất cả thay đổi UI/Logic phải giữ đúng tiêu chí **Single Source of Truth** trong file [WIREFRAME-SPEC.md](file:///c:/Users/Admin/BA%20MASTER%20FLOW/docs/dispute-management/html-wireframe/WIREFRAME-SPEC.md).
> **Trạng thái**: Đã được Người dùng Phê duyệt & Confirm chính thức (`USER CONFIRMED`).

---

## 1. DANH SÁCH 18 MÀN HÌNH (PANEL IDs)
Mỗi màn hình bắt buộc nằm trong `<div class="screen" id="{ID}">` với thẻ đóng `</div>` chuẩn 1-1 (Tag diff = 0).

### A. Màn hình Danh sách & Tạo mới (3 màn hình):
1. `#sent-list-screen` — Danh sách Tra soát đã gửi (TCYCTS - 9 bản ghi)
2. `#received-list-screen` — Danh sách Tra soát đã nhận (TLTS - 7 bản ghi)
3. `#create-dispute-screen` — Màn hình Tạo mới YCTS (Chuẩn giao diện Figma — Section 1 & Section 2)

### B. Màn hình Chi tiết TCYCTS (9 màn hình):
4. `#detail-ts-012` — TS-012: Chờ xử lý (TH1 — Khối Xử lý chuẩn Figma: Phương án PA_02, Chọn file log, Kỹ thuật xác nhận)
5. `#detail-ts-011` — TS-011: Đã kiểm tra (TH2 — Khối Xử lý chuẩn Figma: Kỹ thuật inspector01 xác minh xong trình duyệt)
6. `#detail-ts-001` — TS-001: Chờ phê duyệt (Lãnh đạo tuandt phê duyệt; RBAC Maker không có nút duyệt)
7. `#detail-ts-010` — TS-010: Đã duyệt
8. `#detail-ts-009` — TS-009: Chờ phản hồi đối tác (Active bước 5: Chờ phản hồi)
9. `#detail-ts-003` — TS-003: Đã phản hồi (PRCD Đồng ý + Hoàn trả ✅ Thành công)
10. `#detail-ts-005` — TS-005: Đã phản hồi (RJCD Từ chối + Hết hạn SLA)
11. `#detail-ts-007` — TS-007: Xử lý thất bại (Timeout connection)
12. `#detail-ts-008` — TS-008: Hoàn tất YCTS

### C. Màn hình Chi tiết TLTS (6 màn hình):
13. `#detail-ts-014` — TS-014: Chờ xử lý (Mã RQRN — Toggle Hoàn trả)
14. `#detail-ts-018` — TS-018: Chờ xử lý (Mã RQSP BANK — Toggle Báo có)
15. `#detail-ts-016` — TS-016: Chờ phê duyệt (Mã RQRN — RBAC Maker không có nút duyệt)
16. `#detail-ts-017` — TS-017: Đã duyệt (Mã RQSP BANK)
17. `#detail-ts-015` — TS-015: Đã phản hồi (Mã RQRN Đồng ý + Hoàn trả ✅ Thành công)
18. `#detail-ts-019` — TS-019: Đã phản hồi (Mã RQSP BANK Từ chối + Báo có ❌ Thất bại)

---

## 2. QUY CHUẨN BỘ LỌC (FILTER CARD - FULL 12 TRƯỜNG 4 CỘT) *(Đã User Confirm)*
Áp dụng đồng bộ cho CẢ MÀN HÌNH ĐÃ GỬI (`sent-list-screen`) VÀ ĐÃ NHẬN (`received-list-screen`):

| STT | Tên trường | Loại control | Các giá trị lựa chọn |
|---|---|---|---|
| 1 | `MERCHANT CODE` | `<select>` | Tất cả / PAYME_MERCHANT |
| 2 | `ĐỐI TÁC THANH TOÁN` | `<select>` | Ví Epay / Napas / Tất cả |
| 3 | `LOẠI DỊCH VỤ` | `<select>` | Thanh toán / Tất cả |
| 4 | `VAI TRÒ GỐC` | `<select>` | TCNL (Tổ chức nhận lệnh) / TCTL (Tổ chức trả lệnh) |
| 5 | `TIẾN TRÌNH TRA SOÁT (PCTS)` | `<select>` | Tất cả tiến trình / Chờ xử lý / Đã kiểm tra / Chờ phê duyệt / Đã duyệt / Chờ phản hồi / Đã phản hồi / Xử lý thất bại / Hoàn tất |
| 6 | `TRẠNG THÁI HẾT HẠN` | `<select>` | Tất cả tình trạng hết hạn / Chưa hết hạn / Đã hết hạn |
| 7 | `TRẠNG THÁI XỬ LÝ YCTS TẠI EPAY` | `<select>` | Tất cả kết quả tại Epay / Đồng ý / Từ chối |
| 8 | `TRẠNG THÁI XỬ LÝ YCTS TẠI ĐỐI TÁC` | `<select>` | Tất cả kết quả tại đối tác / PRCD / RJCD / OPEN / EXPI / EXPR / EXRJ |
| 9 | `LOẠI TRA SOÁT` | `<select>` | Tất cả / RQRN (Hoàn tiền) / RQSP (Sai sót) |
| 10 | `NGƯỜI TẠO` | `<select>` | creator01 / nhannt |
| 11 | `THỜI GIAN TẠO` | `<input type="date">` | `2026-07-22` |
| 12 | `NGƯỜI PHÊ DUYỆT` | `<select>` | Lisa / tuandt |

---

## 3. QUY CHUẨN CẤU TRÚC KHỐI Ở MÀN HÌNH CHI TIẾT

### 3.0. Quy chuẩn Đầu màn hình Chi tiết (Top Header Cleanup) *(Đã User Confirm)*
- **Bỏ hoàn toàn** nút `← Quay lại danh sách` thừa và dòng tiêu đề `Chi tiết tra soát TS-XXX [Badge]` ở phần đầu tất cả các màn hình chi tiết.
- Màn hình chi tiết bắt đầu trực tiếp bằng **Khối 1: Bộ Tiến Trình Xử Lý Tra Soát** (đã tích hợp sẵn thông tin trạng thái & mã `TS-ID`). Việc quay lại danh sách được thực hiện chuẩn hóa thông qua thanh **Breadcrumb** tương tác ở Header.

### 3.1. Khối 1: Bộ Tiến Trình Xử Lý Tra Soát (Progress Step Bar) *(Đã User Confirm)*
- **Số bước quy chuẩn**:
  - 🔵 **Luồng YCTS (Tra soát đã gửi)**: 7 Bước (`1: Chờ xử lý` → `2: Đã kiểm tra` → `3: Chờ phê duyệt` → `4: Đã duyệt` → `5: Chờ phản hồi` → `6: Đã phản hồi` → `7: Hoàn tất`).
  - 🟢 **Luồng TLTS (Tra soát đã nhận)**: 6 Bước (`1: Chờ xử lý` → `2: Chờ phê duyệt` → `3: Đã duyệt` → `4: Chờ phản hồi` → `5: Đã phản hồi` → `6: Hoàn tất`).
- **Quy tắc hiển thị Vòng tròn & Màu sắc Tiến trình**:
  - 🔢 **Giữ nguyên số thứ tự bước (1, 2, 3, 4, 5, 6, 7)**: Bên trong mỗi Vòng tròn tiến trình, số thứ tự bước luôn được giữ nguyên, **KHÔNG thay đổi thành dấu tick `✓` hay dấu x `✕`**.
  - 🎨 **Đồng nhất Màu Xanh Dương `#2563EB`**: Đường line nối các bước đã hoàn thành, Vòng tròn tiến trình, Chữ số thứ tự bước màu Trắng (`#FFFFFF`) và Tên nhãn bước bên dưới của các bước hoàn thành / active đều sử dụng màu **Xanh dương đồng bộ `#2563EB`**.
  - 🔴 **Ngoại lệ khi Xử lý thất bại / Từ chối**: Với các màn hình sự cố như `TS-007` (Xử lý thất bại) hay `TS-005`/`TS-019` (RJCD Từ chối), Vòng tròn & Badge tại bước lỗi hiển thị màu Đỏ (`#DC2626` / `#EF4444`) để cảnh báo.

### 3.2. Khối 2: Thông Tin Giao Dịch Gốc & Các Khối Read-only (Split Grid Layout 3 Cột x Hàng) *(Đã User Confirm)*
- Áp dụng thống nhất cho **Khối Giao Dịch Gốc**, **Khối Tra Soát Read-only**, **Khối Giao Dịch Hoàn Trả**, **Khối Giao Dịch Báo Có** và **Khối Thông Tin Phê Duyệt**.
- Cấu trúc hiển thị 3 cột: Mỗi cột chứa danh sách các dòng thông tin với **Nhãn nằm bên trái** (`font-weight: 600; color: #64748b;`) và **Giá trị in đậm căn lề phải** (`font-weight: 700; color: #0f172a; text-align: right;`).

### 3.3. Khối 3: Thông Tin Tra Soát (Dispute Info Block - Đầy đủ 11 Trường + Thời Gian) *(Đã User Confirm)*
- Cấu trúc 11 trường tin đồng bộ:
  - Cột 0: `Mã tra soát`, `Trạng thái YCTS`, `Lý do tra soát`, `Thời gian tạo YCTS`
  - Cột 1: `Vai trò tra soát`, `Trạng thái hết hạn`, `Số tiền tra soát`, `Thời gian xử lý YCTS`
  - Cột 2: `Loại tra soát`, `Trạng thái xử lý tại Epay`, `Trạng thái xử lý tại đối tác`, `File minh chứng đính kèm`
  - Dòng dưới: `Nội dung đề nghị tra soát`
- Với màn hình `TS-016`: Tích hợp đầy đủ các trường tin `Trạng thái hết hạn`, `Trạng thái xử lý tại Epay`, `Trạng thái xử lý tại đối tác`. Bỏ 2 trường tin `Người đề xuất` và `Người dự kiến phê duyệt`.

### 3.4. Khối 4: Thông Tin Xác Nhận Phê Duyệt (RBAC Approval Block) *(Đã User Confirm)*
- Hiển thị ở tất cả các trạng thái TRỪ trạng thái *Chờ xử lý* (`TS-012`, `TS-014`).
- Layout Split Grid 3 Cột:
  - Cột 0: `Người YCPD:` **`nhannt`** | `Thời gian tạo YCPD:` datetime
  - Cột 1: `Người phê duyệt:` **`tuandt`** | `Thời gian phê duyệt:` datetime (hoặc `—` nếu Chờ phê duyệt)
  - Cột 2: `Trạng thái YCPD:` badge text (`Chờ phê duyệt` / `Đã duyệt` / `Chưa tạo YCPD`)
- **Quy tắc Phân quyền Phê duyệt ở trạng thái "Chờ phê duyệt" (`TS-001` & `TS-016`)**:
  - 🛡️ **Role Maker (`nhannt`)**: **ẨN HOÀN TOÀN** nút Phê duyệt / Từ chối.
  - 🛡️ **Role Checker (`tuandt`)**: **HIỂN THỊ** cặp nút **`[✅ Phê duyệt]`** & **`[❌ Từ chối]`**.

### 3.5. Khối 5: Thông Tin Giao Dịch Hoàn Trả / Báo Có (Tối Ưu Cấu Trúc) *(Đã User Confirm)*
- 🚫 **Bỏ 2 trường tin**: `Mã GD hoàn trả` và `Mã GD hoàn trả đối tác` (hoặc `Mã GD đối tác hoàn`).
- 🟢 **Danh sách các trường tin hoàn tiền / báo có chuẩn**:
  - `Loại giao dịch:` Hoàn tiền GD tra soát
  - `Nguồn tiền hoàn:` Tài khoản Napas / Epay
  - `Số tiền hoàn trả:` xx,xxx VND
  - `Trạng thái hoàn trả:` ✅ Thành công
  - `Phí giao dịch:` 0 VND
  - `Thời gian tạo giao dịch` & `Thời gian hoàn tiền`
  - `Lý do hoàn trả`

### 3.6. Khối 6: Lịch Sử Thay Đổi / Nhật Ký Tiến Trình Thời Gian (Audit Trail Timeline Component) *(Đã User Confirm)*
- Tích hợp khối Timeline lưu vết mốc thời gian sự kiện trên tất cả các màn hình chi tiết.
- Hiển thị từng mốc sự kiện từ lúc khởi tạo YCTS, gửi trình duyệt, Lãnh đạo phê duyệt, phát điện đối tác đến hạch toán đóng hồ sơ hoàn tất.

---

## 4. QUY CHUẨN MÀN HÌNH TẠO MỚI YCTS & POPUP TÌM KIẾM (`create-dispute-screen` & `#txSearchModal` - USER CONFIRMED)
- Section 1 `Thông tin yêu cầu` + Section 2 `Thông tin giao dịch` (Tên nhãn `Mã giao dịch (*)`).
- Modal Tìm kiếm Giao dịch Gốc 9 trường lọc và 10 cột bảng dữ liệu. Tự động điền dữ liệu (Auto-fill) khi chọn giao dịch.

---

## 5. PHÂN QUYỀN TÍNH NĂNG TẠO YCTS (YCTS vs TLTS - USER CONFIRMED)
- 🟢 **Luồng YCTS (Tra soát đã gửi - Sent Disputes)**: Duy nhất màn hình Danh sách YCTS (`#sent-list-screen`) có Nút **`+ Tạo yêu cầu tra soát mới`**.
- 🚫 **Luồng TLTS (Tra soát đã nhận - Received Disputes)**: Màn hình Tra soát đã nhận (`#received-list-screen`) **KHÔNG CÓ** tính năng Tạo mới YCTS.