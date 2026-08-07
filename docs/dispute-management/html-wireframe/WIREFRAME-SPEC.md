# QUY CHUẨN ĐẶC TẢ GIAO DIỆN & NGHIỆP VỤ WIREFRAME 2 (DISPUTE MANAGEMENT)
> **Single Source of Truth** — Tài liệu ghi nhớ duy nhất & bắt buộc tuân thủ cho toàn bộ màn hình Wireframe Quản lý tra soát (`dispute-management-wireframe2.html`).
- 🚫 **Quy tắc thực thi & kiểm thử**: **KHÔNG TỰ ĐỘNG MỞ TRÌNH DUYỆT BROWSER (`browser_subagent` / `open_browser_url`)** mỗi khi cập nhật Wireframe HTML. Việc kiểm tra & xác minh được thực hiện hoàn toàn tự động thông qua HTTP script backend và Tag Balance Checker.
- Tất cả thay đổi UI/Logic phải giữ đúng tiêu chí **Single Source of Truth** trong file [WIREFRAME-SPEC.md](file:///d:/BA%20Master%20Flow/docs/dispute-management/html-wireframe/WIREFRAME-SPEC.md).
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
10. `#detail-ts-005` — TS-005: Đã phản hồi (RJCD Từ chối)
11. `#detail-ts-007` — TS-007: Xử lý thất bại (Timeout connection)
12. `#detail-ts-008` — TS-008: Hoàn tất

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
- **Bỏ hoàn toàn** nút `← Quay lại danh sách` thừa và dòng tiêu đề `Chi tiết tra soát TS-XXX [Badge]` ở phần đầu tất cả 15 màn hình chi tiết (`TS-012` đến `TS-019`).
- Màn hình chi tiết bắt đầu trực tiếp bằng **Khối 1: Bộ Tiến Trình Xử Lý Tra Soát** (đã tích hợp sẵn thông tin trạng thái & mã `TS-ID`). Việc quay lại danh sách được thực hiện chuẩn hóa thông qua thanh **Breadcrumb** tương tác ở Header.

### 3.1. Khối 1: Bộ Tiến Trình Xử Lý Tra Soát (Progress Step Bar - 7 Bước Chuẩn)
- Visual 7 bước ngang: `1: Chờ xử lý` → `2: Đã kiểm tra` → `3: Chờ phê duyệt` → `4: Đã duyệt` → **`5: Chờ phản hồi`** → `6: Đã phản hồi` → `7: Hoàn tất`.
- **Quy tắc luồng tiến trình khi Xử lý thất bại (`TS-007`)**:
  Do YCTS `TS-007` đã được Lãnh đạo `tuandt` phê duyệt ở bước 4 (`Đã duyệt`) nhưng sau đó bị sự cố lỗi kết nối timeout với Đối tác, tiến trình thể hiện chính xác theo chuỗi biến đổi trạng thái: `1: Chờ xử lý (Xanh)` → `2: Đã kiểm tra (Xanh)` → `3: Chờ phê duyệt (Xanh)` → `4: Đã duyệt (Xanh)` → **`5: Xử lý thất bại (🔴 Đỏ)`** → `6: Đã phản hồi` → `7: Hoàn tất`.

### 3.2. Khối 2: Thông Tin Giao Dịch Gốc & Các Khối Read-only (Split Grid Layout 3 Cột x Hàng) *(Đã User Confirm)*
- **Quy chuẩn Layout Nhãn - Giá trị (Split Grid Layout)**:
  - Áp dụng thống nhất cho **Khối Giao Dịch Gốc**, **Khối Tra Soát Read-only**, **Khối Giao Dịch Hoàn Trả**, **Khối Giao Dịch Báo Có** và **Khối Thông Tin Phê Duyệt**.
  - Cấu trúc hiển thị 3 cột: Mỗi cột chứa danh sách các dòng thông tin với **Nhãn nằm bên trái** (`font-weight: 600; color: #64748b;`) và **Giá trị in đậm căn lề phải** (`font-weight: 700; color: #0f172a; text-align: right;`), phân tách rõ ràng theo đúng mẫu giao diện Portal.
  - 🚫 **Ngoại lệ duy nhất**: Khối Tra Soát của màn hình **"Chờ xử lý" (TS-012, TS-014, TS-018)** và **"Đã kiểm tra" (TS-011)** giữ nguyên dạng **Form nhập liệu (Form Layout)** với các ô Input/Textarea.

### 3.3. Khối 3: Thông Tin Tra Soát (Dispute Input Info Block) *(Đã User Confirm)*
- **Quy tắc phân loại hiển thị Khối Tra Soát theo Luồng Nghiệp Vụ (TCYCTS vs TCTL/TLTS)**:
  - 🔵 **Luồng TCYCTS (Tra soát đã gửi — TS-012, TS-011, TS-001, TS-010, TS-009, TS-003, TS-005, TS-007, TS-008)**:
    - ✏️ **Trạng thái "Chờ xử lý" (TS-012) & "Đã kiểm tra" (TS-011)**: Hiển thị khối tra soát dạng **Form nhập liệu (Form Layout)** hỗ trợ nhập liệu, sửa số tiền tra soát, nội dung đề nghị và đính kèm lại tệp minh chứng.
    - 🔒 **Tất cả các trạng thái còn lại (TS-001, TS-010, TS-009, TS-003, TS-005, TS-007, TS-008)**: Hiển thị khối tra soát dạng **Lưới tĩnh Read-only (Split Grid Layout)** với 4 badge trạng thái phía trên và 3 hàng x 3 cột lề trái/phải thông tin tra soát (khớp mẫu TS-007).
  - 🟢 **Luồng TCTL / TLTS (Tra soát đã nhận — TS-014, TS-018, TS-016, TS-017, TS-015, TS-019)**:
    - 🔒 **TẤT CẢ CÁC TRẠNG THÁI CỦA LUỒNG TCTL (Kể cả "Chờ xử lý" TS-014, TS-018)**: Hiển thị khối tra soát dạng **Lưới thông tin tĩnh Read-only GIỐNG HỆT KHỐI GIAO DỊCH GỐC**, không sử dụng Form nhập liệu hay ô input/textarea nào trong Khối Tra Soát.

### 3.4. Khối 4: Thông Tin Phê Duyệt & RBAC Phân Quyền (Approval Info Block & RBAC Rules)
- Dành cho các màn hình khác *Chờ xử lý* & *Đã kiểm tra*: `Người YCPD`, `Người phê duyệt`, `Thời gian tạo YCPD`, `Thời gian phê duyệt`, `Trạng thái YCPD`.
- **Quy tắc RBAC Phân quyền Phê duyệt ở trạng thái "Chờ phê duyệt" (`TS-001` & `TS-016`)**:
  - 🛡️ **Role Maker (`nhannt` / `creator01`)**: **ẨN HOÀN TOÀN** nút Phê duyệt / Từ chối. Hiển thị thông báo `⏳ ĐANG CHỜ LÃNH ĐẠO (tuandt) PHÊ DUYỆT`.
  - 🛡️ **Role Checker (`tuandt`)**: **HIỂN THỊ** cặp nút **`[✅ Phê duyệt YCTS]`** & **`[❌ Từ chối]`** để Lãnh đạo thao tác.

### 3.5. Khối 5: Thông Tin Giao Dịch Hoàn Trả (Refund Info Block - Đầy đủ 9 Trường 3 Cột) *(Đã User Confirm)*
Bổ sung đầy đủ 9 trường thông tin hoàn trả (Lưới 3 cột x 3 hàng, hiển thị card riêng biệt `margin-bottom: 14px;` ở các màn `TS-003`, `TS-008`, `TS-016`, `TS-015`):
1. 🔹 `Mã giao dịch hoàn trả`
2. 🔹 `Mã GD hoàn trả đối tác`
3. 🔹 `Số tiền hoàn trả`
4. 🔹 `Trạng thái hoàn trả` (`✅ Thành công` / `⏱️ Chờ xử lý` / `❌ Thất bại`)
5. 🔹 `Thời gian tạo`
6. 🔹 `Thời gian giao dịch`
7. 🔹 `Loại hoàn trả` (`Toàn phần` / `Một phần`)
8. 🔹 `Mã lỗi` (e.g. `00 (Thành công)`)
9. 🔹 `Lý do`

### 3.6. Khối 6: Thông Tin Giao Dịch Báo Có (Credit Info Block - Đầy đủ 8 Trường 3 Cột) *(Đã User Confirm)*
Bổ sung đầy đủ 8 trường thông tin báo có (Lưới 3 cột x 3 hàng, hiển thị card riêng biệt `margin-bottom: 14px;` độc lập không dính / đè lên Khối Phê duyệt ở các màn `TS-017`, `TS-019`):
1. 🔹 `Mã giao dịch báo có`
2. 🔹 `Mã GD báo có đối tác`
3. 🔹 `Số tiền báo có`
4. 🔹 `Trạng thái báo có` (`✅ Thành công` / `❌ Thất bại`)
5. 🔹 `Thời gian tạo`
6. 🔹 `Thời gian giao dịch`
7. 🔹 `Mã lỗi` (e.g. `00 (Thành công)`)
8. 🔹 `Lý do`

---

## 4. QUY CHUẨN MÀN HÌNH TẠO MỚI YCTS & POPUP TÌM KIẾM (`create-dispute-screen` & `#txSearchModal` - USER CONFIRMED)
- Section 1 `Thông tin yêu cầu` + Section 2 `Thông tin giao dịch` (Tên nhãn `Mã giao dịch (*)`).
- Không có nút Quay lại danh sách và không có dòng chữ Lưu ý màu đỏ.

### 4.1. Popup Modal Tìm Kiếm Giao Dịch Gốc (`#txSearchModal` - USER CONFIRMED)
- **Nút gọi Popup Modal**: Nút `🔍 Tìm kiếm mã giao dịch` trên màn hình Tạo mới YCTS (`#create-dispute-screen`).
- **Bộ Lọc Tìm Kiếm Trong Popup Modal (9 Trường Tin)**: `MÃ GIAO DỊCH GỐC`, `MÃ GIAO DỊCH ĐỐI TÁC`, `TRẠNG THÁI GIAO DỊCH`, `PTTT`, `SỐ TIỀN GIAO DỊCH`, `TỔ CHỨC THANH TOÁN`, `TỔ CHỨC PHÁT HÀNH`, `NGÀY GIAO DỊCH`, `MERCHANT`.
- **Bảng Dữ Liệu Giao Dịch Gốc Trong Popup Modal (10 Cột)**: `CHỌN` | `MÃ GIAO DỊCH GỐC` | `MÃ GD ĐỐI TÁC` | `TRẠNG THÁI GD` | `PTTT` | `SỐ TIỀN GIAO DỊCH` | `MERCHANT` | `TỔ CHỨC THANH TOÁN` | `TỔ CHỨC PHÁT HÀNH` | `NGÀY GIAO DỊCH`.
- **Tự động điền dữ liệu (Auto-fill)**: Khi chọn 1 giao dịch từ danh sách và nhấn *'✓ Chọn giao dịch này'*, toàn bộ 6 trường thông tin giao dịch (*Mã GD gốc, Mã GD đối tác, Số tiền giao dịch, Tổ chức thanh toán, Tổ chức phát hành, Ngày giao dịch*) trên Form Tạo mới YCTS được cập nhật tự động.

---

## 5. QUY TRÌNH PHÊ DUYỆT VÀ NÂNG CẤP QUY CHUẨN (USER-CONFIRMED SPEC INTEGRATION)
Bắt buộc tuân thủ nguyên tắc Phê duyệt từ Người dùng:
1. Đọc quy chuẩn trong `WIREFRAME-SPEC.md`.
2. Thực thi nâng cấp mã nguồn wireframe và trình bày demo.
3. **CHỜ NGƯỜI DÙNG PHÊ DUYỆT - CRITICAL**: Chưa vội ghi vào file spec cho tới khi có lệnh Confirm từ Quý khách.
4. Ghi nhận quy chuẩn chính thức & bổ sung Test Case vào `verify_wireframe_spec.mjs`.
5. Chạy Regression Test đảm bảo đạt `PASS 100%`.


## 6. QUY CHUẨN CÁC MÀN HÌNH CHI TIẾT LUỒNG TCTL / TLTS (TRA SOÁT ĐÃ NHẬN) *(Đã User Confirm)*
- 🟢 **Bỏ bước "Đã kiểm tra" trong Tiến Trình TLTS**: Tiến trình tra soát của luồng TLTS là tiến trình 6 bước (bỏ qua bước Đã kiểm tra): `1: Chờ xử lý` → `2: Chờ phê duyệt` → `3: Đã duyệt` → `4: Chờ phản hồi` → `5: Đã phản hồi` → `6: Hoàn tất`.

### 6.1. Quy tắc Màn hình TLTS "Chờ xử lý" (TS-014 & TS-018):
1. 🔹 **Mã RQRN (Hoàn tiền - TS-014)**:
   - Khi chọn kết quả xử lý **"Đồng ý (PRCD)"**, hệ thống tự động hiển thị **Khối Thông Tin Giao Dịch Hoàn Trả** để Cán bộ nhập thông tin hoàn trả (*Mã GD hoàn trả, Mã GD hoàn trả đối tác, Số tiền hoàn trả, Loại hoàn trả, Lý do*). Khi chọn **"Từ chối (RJCD)"**, ẩn khối hoàn trả.
2. 🔹 **Mã RQSP lý do BANK (Báo có - TS-018)**:
   - Khi chọn kết quả xử lý **"Đồng ý (PRCD)"**, hệ thống tự động hiển thị **Khối Thông Tin Giao Dịch Báo Có** để Cán bộ nhập thông tin báo có (*Mã GD báo có, Mã GD báo có đối tác, Số tiền báo có, Lý do*). Khi chọn **"Từ chối (RJCD)"**, ẩn khối báo có.

### 6.2. Quy tắc Màn hình TLTS "Chờ phê duyệt", "Đã duyệt", "Chờ phản hồi":
- các màn hình **TS-016 (Chờ phê duyệt)**, **TS-017 (Đã duyệt)** luôn hiển thị kèm **Khối Thông Tin Hoàn Trả** (với RQRN - TS-016 ở trạng thái `⏱️ Chờ xử lý`) hoặc **Khối Thông Tin Báo Có** (với RQSP BANK - TS-017 ở trạng thái `✅ Thành công`).

### 6.3. Quy tắc Màn hình TLTS "Đã phản hồi" (TS-015 & TS-019):
- 🔹 **TS-015 (PRCD Đồng ý)**: Trạng thái xử lý Epay = `PRCD`, Trạng thái xử lý Đối tác = `PRCD`, Trạng thái hoàn trả = `✅ Thành công`.
- 🔹 **TS-019 (RJCD Từ chối)**: Trạng thái xử lý Epay = `RJCD`, Trạng thái xử lý Đối tác = `RJCD`, Trạng thái báo có = `❌ Thất bại`.

### 4.2. Quy Tắc Phân Quyền Tính Năng Tạo YCTS (YCTS vs TLTS - USER CONFIRMED)
- 🟢 **Luồng YCTS (Tra soát đã gửi - Sent Disputes)**: Duy nhất màn hình Danh sách YCTS (`#sent-list-screen`) có Nút **`+ Tạo yêu cầu tra soát mới`** cho phép Maker khởi tạo YCTS.
- 🚫 **Luồng TLTS (Tra soát đã nhận - Received Disputes)**: Màn hình Tra soát đã nhận (`#received-list-screen`) **KHÔNG CÓ** tính năng Tạo mới YCTS (chỉ tiếp nhận và xử lý phản hồi yêu cầu từ đối tác).