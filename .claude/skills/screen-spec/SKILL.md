---
name: screen-spec
description: Dùng khi cần lập bảng đặc tả màn hình (Search/List/Form/Filter/Approval/Detail), bóc tách thành phần giao diện, các nút chức năng, thanh tab và danh sách trường tin tùy chỉnh theo đúng chuẩn template EPAY-QT.CG.02_BM33. Kích hoạt bằng `/screen-spec` hoặc khi được yêu cầu lưu/sinh mô tả màn hình theo chuẩn EPAY. Ưu tiên cập nhật tất cả giao diện vào Version 2 (V2 UI).
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
user-invocable: true
argument-hint: "[--feature <slug>] [mô tả màn hình/usecase]"
---

# /screen-spec — Quy tắc Sinh Tài liệu, Đặc tả Use Case & Giao diện Chuẩn EPAY-QT.CG.02_BM33

## 1. MỤC TIÊU VÀ PHẠM VI ÁP DỤNG

Skill này định nghĩa chuẩn mực quốc gia/doanh nghiệp về cấu trúc mô tả giao diện màn hình và bảng đặc tả Use Case trong các tài liệu SRS/Phân tích yêu cầu hệ thống.

Chuẩn áp dụng: **Tài liệu Phân tích Yêu cầu Hệ thống - MM (Mã tài liệu: EPAY-QT.CG.02_BM33)**.

> **🔥 QUY TẮC ƯU TIÊN GIAO DIỆN VERSION 2 (V2 UI & LOGIC V2.1):**  
> **Từ thời điểm này trở đi, tất cả mọi cập nhật mô tả giao diện, bóc tách bảng thành phần, wireframe và file HTML Preview SẼ ĐƯỢC ƯU TIÊN CẬP NHẬT TRỰC TIẾP VÀO PHIÊN BẢN VERSION 2 (V2 UI / LOGIC V2.1).**

---

## 2. QUY TẮC CẤU TRÚC 2 PHẦN BẮT BUỘC CHO MỖI USE CASE (CRITICAL MUST-FOLLOW)

Mỗi Use Case khi đặc tả BẮT BUỘC phải bao gồm đầy đủ **2 PHẦN CHUẨN** (Không được phép cắt bớt, tóm tắt hoặc bỏ dòng trong bất kỳ file `.md`, `.doc`, hoặc `.html` nào):

### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE - 10 DÒNG CHUẨN)
Bảng thông tin 2 cột (`Trường thông tin` | `Nội dung chi tiết`) bao gồm đầy đủ các mục:

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | Tên đầy đủ của Use Case (VD: **Lập yêu cầu tra soát giao dịch (TCYCTS — Chiều đi)**) |
| **ID** | Mã định danh duy nhất (VD: **DS01-UC02 / BF29.1-UC02**) |
| **Description** | Mô tả tóm tắt mục đích và hành vi chính của Use Case |
| **Actor** | Các tác nhân tham gia (VD: *Maker, Inspector, Checker, System MM, Service QR*) |
| **Trigger** | Sự kiện khởi phát Use Case (VD: *Maker bấm nút [+ Tạo yêu cầu tra soát]*) |
| **Pre-Condition** | Các điều kiện tiên quyết bắt buộc trước khi thực hiện |
| **Post-Condition** | Trạng thái dữ liệu hệ thống sau khi hoàn tất Use Case |
| **Basic flow** | Các bước thực hiện luồng chính (Đánh số 1, 2, 3... đầy đủ các bước) |
| **Alternative flow** | Các bước thực hiện luồng rẽ nhánh / luồng phụ (nếu có) |
| **Exception flow** | Xử lý các luồng ngoại lệ, lỗi hệ thống, validation error (nếu có) |
| **Non-functional requirement** | Các yêu cầu phi chức năng (VD: *Thời gian xử lý < 1.5 giây*) |

> **⚠️ NGHIÊM CẤM:** Không được phép cắt bỏ các dòng `Trigger`, `Pre-Condition`, `Post-Condition`, `Alternative flow`, `Non-functional requirement` hoặc gộp luồng `Basic flow` thành 1 dòng sơ sài trong các script xuất bản Word/HTML.

---

### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE - 6 CỘT CHUẨN)

Bảng đặc tả thành phần giao diện bắt buộc có **6 cột chuẩn** theo đúng thứ tự:

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|

#### Giải thích Ý nghĩa các Cột:
- **`Component Name`**: Tên trường tin, nút bấm, tab, ô nhập liệu hoặc khu vực hiển thị.
- **`Data Type`**: Loại control (`Label`, `Dropdown list`, `Textbox`, `Date Picker`, `Button`, `Tab`, `Action Menu`, `Timeline Block`, `Fileupload`...).
- **`Validation rules: M/O/C`**: `M` (Mandatory), `O` (Optional), `C` (Conditional).
- **`Validation rules: Editable`**: `Y` (Editable), `N` (Read-only).
- **`Validation rules: Other Validation`**: Các quy tắc kiểm tra dữ liệu (`Max 100 ký tự`, `Single selection`, `Tối đa 90 ngày`, `> 0 và <= Số tiền GD gốc`...).
- **`Action rules`**: Mô tả chi tiết giá trị mặc định, quy tắc xử lý khi chọn/gõ, tìm kiếm, lưu vết, và **THAM CHIẾU HYPERLINK ĐẾN USE CASE TƯƠNG ỨNG** nếu là nút thao tác hoặc đường link.

---

## 3. QUY TẮC BÓC TÁCH CHO TỪNG LOẠI MÀN HÌNH CHUẨN (SCREEN TYPES)

### 3.1. Màn hình Danh sách / Tra cứu (Search & List Screen - UC01)
Bảng 6 cột được chia làm 5 phân đoạn gộp cột (Divider rows):
1. `-- Điều kiện tìm kiếm/ lọc tab “Tất cả”`: Liệt kê đầy đủ 9 trường lọc.
2. `-- Button chức năng`: Nút *Xóa bộ lọc, Tìm kiếm, + Tạo mới, Tùy chỉnh*.
3. `-- Danh sách các tab tại màn hình [Tên màn hình]`: Các tab *Tất cả, Chờ xử lý, Đã kiểm tra, Chờ phê duyệt, Quá hạn*.
4. `-- Thanh tìm kiếm nhanh`: Khai báo nút `Quicksearch` (giữ nguyên tìm kiếm khi đổi tab).
5. `-- Chi tiết cột dữ liệu trên danh sách`: Dòng *Trường tin* (dẫn mục 2.2.5) & *Phân trang*.

**Mục 2.2.5 Danh sách trường tin tùy chỉnh:**
- Bảng 4 cột: `STT` | `Trường tin` | `Lựa chọn mặc định` (`Y`/`N`) | `Mô tả & Action Rules (Hyperlink Use Cases)`.
- Cột *Mã bản ghi* nhấp mở UC Xem chi tiết. Cột *Thao tác* chứa menu 3 chấm `[⋮]` hyperlink đến UC Xem chi tiết, UC Cập nhật, UC Phê duyệt.

### 3.2. Màn hình Tạo mới Yêu cầu (Creation Form Screen - UC02)
Bảng 6 cột chia làm 4 phân đoạn gộp cột:
1. `-- Thông tin Giao dịch gốc`: Mã GD gốc (link chọn), Số tiền gốc, Ngày GD, Trạng thái GD.
2. `-- Thông tin Yêu cầu Tra soát`: Lý do tra soát, Số tiền tra soát, Loại tra soát (RQRN), Mô tả chi tiết.
3. `-- Hồ sơ đính kèm`: Drag & drop fileupload (.pdf, .png, .jpg).
4. `-- Button chức năng`: Nút *Hủy* và Nút *[Lưu YCTS]* (tạo YCTS status *Chờ xử lý*) hoặc *[📤 Gửi yêu cầu phê duyệt]* (chuyển *Chờ phê duyệt* và sinh bản ghi YCPD).

### 3.3. Màn hình Phê duyệt Nội bộ (Approval Screen - UC03 & UC04 Checker View)
Bảng 6 cột chia làm 4 phân đoạn gộp cột:
1. `-- Thông tin Yêu cầu Phê duyệt Nội bộ (Banner)`: Mã YCPD, Trạng thái DB MM & DB QR, Thông tin đề xuất.
2. `-- Thông tin Chi tiết Đề xuất & Chứng từ`: Chi tiết số tiền hoàn trả, Lý do hoàn trả, File chứng từ.
3. `-- Ý kiến Phê duyệt`: Ô *Ghi chú phê duyệt hoặc lý do từ chối \** (Mandatory khi từ chối).
4. `-- Nút thao tác Phê duyệt`: Nút *[✅ Đồng ý Phê duyệt (Gọi Service QR)]* (YCPD = *Approved*, gọi Service QR phát hành sang Napas) và Nút *[❌ Từ chối Phê duyệt]* (YCPD = *Cancel*).

### 3.4. Màn hình Phản hồi Tra soát Thụ động (Passive Response Screen - UC04 Maker View)
Bảng 6 cột chia làm 5 phân đoạn gộp cột:
1. `-- Banner Cảnh báo YCPD đang chờ xử lý`: Thông tin YCTS thụ động từ Napas (`OPEN` / `Chờ xử lý`).
2. `-- Khai báo Thông tin Trả lời`: Mã phản hồi (`PRCD — Đồng ý` / `RJCD — Từ chối`).
3. `-- Khung Khởi tạo Thông tin Giao dịch Hoàn trả`: Số tiền hoàn trả (950k), Loại hoàn trả (Toàn phần/Một phần), Lý do hoàn trả.
4. `-- Hồ sơ đính kèm & Ghi chú`: Upload chứng từ minh chứng chuyển khoản.
5. `-- Nút thao tác`: Nút *[✏️ Cập nhật trả lời]* (lưu YCPD status *ApprovePending*) và Nút *[❌ Hủy bỏ yêu cầu]* (YCPD status *Cancel*).

### 3.5. Màn hình Xem chi tiết & Nhật ký (Detail View Screen - UC05)
Bảng 6 cột chia làm 4 phân đoạn gộp cột:
1. `-- Khối 1: THÔNG TIN TRA SOÁT`: Mã TS, Chiều tra soát, Số tiền, Chứng từ đính kèm.
2. `-- Khối 2: THÔNG TIN GIAO DỊCH GỐC`: Mã GD gốc, Mã Napas, Số tiền gốc, PTTT.
3. `-- Khối 3: THÔNG TIN KHÁC`: Merchant Code, Người tạo, SLA, Quản lý duyệt.
4. `-- Khối 4: XỬ LÝ & PHẢN HỒI (Audit Trail Timeline)`: Nhật ký tiến trình thời gian tự động hệ thống (Read-only).

### 3.6. Màn hình Cập nhật / Chỉnh sửa & Hủy bỏ YCPD (Edit Screen - UC06)
Bảng 6 cột chia làm 3 phân đoạn gộp cột:
1. `-- Banner Trạng thái YCTS & YCPD`: Trạng thái *Đã kiểm tra* hoặc *Chờ phê duyệt*.
2. `-- Điều chỉnh Thông tin Hoàn trả / Tra soát`: Cho phép sửa Lý do, Số tiền, Tệp đính kèm.
3. `-- Nút thao tác`:
   - Tại *Đã kiểm tra*: Nút *[✏️ Cập nhật thông tin]* và Nút *[📤 Gửi yêu cầu phê duyệt]* (chuyển *Chờ phê duyệt* & sinh YCPD).
   - Tại *Chờ phê duyệt*: Nút *[✏️ Cập nhật thông tin]* (duy trì *ApprovePending*) và Nút *[❌ Hủy bỏ yêu cầu]* (Cancel YCPD).

---

## 4. QUY TẮC ĐỒNG BỘ TỆP WORD (`.doc`) VÀ HTML PREVIEW (`.html`)

Nội dung đặc tả mô tả màn hình theo template trên phải được đồng bộ chính xác trên 3 môi trường tệp:
1. `docs/{feature}/srs/{feature}-usecases.md` (Tài liệu Markdown chuẩn V2)
2. `docs/{feature}/srs/generate-word-doc.js` (Script tạo file `.doc` chuẩn Microsoft Word Ribbon V2)
3. `docs/{feature}/srs/{feature}-usecases-word-preview.html` (File HTML Preview xem trực tiếp trên browser V2)

Font chữ chuẩn xuất bản: **Times New Roman, 12pt**, màu nhận diện `#002D62` (Navy), viền bảng `1px solid #000000`, padding `4pt 5pt`.

---

## 5. MẪU THAM CHIẾU (REFERENCE EXAMPLE)

Xem chi tiết việc áp dụng thực tế tại:
- File Markdown: `d:\BA Master Flow\docs\dispute-management\srs\dispute-management-usecases.md`
- File Output Word: `d:\BA Master Flow\docs\dispute-management\srs\dispute-management-usecases.doc`
- File Preview HTML: `d:\BA Master Flow\docs\dispute-management\srs\dispute-management-usecases-word-preview.html`
