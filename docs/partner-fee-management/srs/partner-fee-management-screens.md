---
type: screen-index
feature: partner-fee-management
status: approved
updated: 2026-10-31
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - erd: docs/partner-fee-management/srs/partner-fee-management-erd.md
  - flows: docs/partner-fee-management/srs/partner-fee-management-flows.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# Quản lý Cấu hình Phí Trả Đối tác — UX Screen Specifications

> Tài liệu đặc tả giao diện người dùng (UI/UX Screen Specs) 6 lớp chuẩn BA cho toàn bộ 28 màn hình trên Figma canvas (file `ForWork`, page `CHP Đối tác`), kết nối trực tiếp với Core Spec SRS và các Use Case nghiệp vụ.

---

## 1. Bản đồ tổng thể 28 Màn hình trên Figma Canvas

| STT | Tên Màn hình / Phân khu | Mã Frame ID Figma | Tọa độ Canvas (x, y) | Kích thước (w x h) | Vai trò sử dụng |
|---|---|---|---|---|---|
| **KHU VỰC 1: MÀN HÌNH DANH SÁCH (3 TAB TRẠNG THÁI)** | | | | | |
| 1 | Danh sách / Tab Tất cả / 1920 | `4020:50223` | (0, 0) | 1920 x 1080 | Maker, Checker |
| 2 | Danh sách / Tab Đang hoạt động / 1920 | `4020:51051` | (2050, 0) | 1920 x 1080 | Maker, Checker |
| 3 | Danh sách / Tab Chờ phê duyệt / 1920 | `4020:51879` | (4100, 0) | 1920 x 1080 | Maker, Checker |
| **KHU VỰC 2: MÀN HÌNH THÊM MỚI 4 LOẠI PHÍ (8 BIẾN THỂ) & CỤM POPUP TÍNH THỬ** | | | | | |
| 4 | Thêm mới - Phí duy trì | Áp dụng toàn bộ MID | `4022:53508` | (0, 1320) | 1920 x 1065 | Maker |
| 5 | Thêm mới - Phí duy trì | Áp dụng từng MID đối tác | `4022:54185` | (2050, 1320) | 1920 x 1144 | Maker |
| 6 | Thêm mới - Phí xử lý GD | Áp dụng chung (1 bậc) | `4022:54899` | (4100, 1320) | 1920 x 1153 | Maker |
| 7 | Thêm mới - Phí xử lý GD | Tách riêng từng loại GD | `4022:55659` | (6150, 1320) | 1920 x 1456 | Maker |
| 8 | Thêm mới - Phí thanh toán | 1 bậc phí | `4022:56456` | (0, 2950) | 1920 x 1292 | Maker |
| 9 | Thêm mới - Phí thanh toán | Bậc thang thương hiệu | `4022:57209` | (2050, 2950) | 1920 x 1941 | Maker |
| 10 | Thêm mới - Phí quản lý DVGT | Áp dụng chung | `4024:58948` | (4100, 2950) | 1920 x 1100 | Maker |
| 11 | Thêm mới - Phí quản lý DVGT | Tách riêng từng DV | `4022:58264` | (6150, 2950) | 1920 x 1830 | Maker |
| 12 | Popup tính thử phí - Phí thanh toán (1 mức) | `4018:36498` | (8250, 2950) | 964 x 650 | Maker |
| 13 | Popup tính thử phí - Nhiều mức / Bậc thang | `4018:36606` | (9300, 2950) | 964 x 795 | Maker |
| 14 | Alert tính thử phí | `4018:36826` | (10350, 2950) | 419 x 191 | Maker |
| 15 | Thêm mới phí trả đối tác | Thẻ QT Hoàn trả | `4018:34716` | (0, 5050) | 1920 x 1358 | Maker |
| 16 | Thêm mới phí trả đối tác | Thẻ nội địa Hoàn trả | `4018:35488` | (2050, 5050) | 1920 x 2120 | Maker |
| **KHU VỰC 3: MÀN HÌNH CHỈNH SỬA / CẬP NHẬT (8 MÀN TRƯỚC VÀ SAU UPDATE)** | | | | | |
| 17 | Chỉnh sửa Phí duy trì - Trước update | `4020:36844` | (0, 7500) | 1920 x 1439 | Maker |
| 18 | Thông tin Phí duy trì - Sau update | `4020:37698` | (2000, 7500) | 1920 x 1439 | Maker |
| 19 | Chỉnh sửa Phí xử lý GD - Trước update | `4020:38552` | (4000, 7500) | 1920 x 1784 | Maker |
| 20 | Chỉnh sửa Phí xử lý GD - Sau update | `4020:39384` | (6000, 7500) | 1920 x 1784 | Maker |
| 21 | Chỉnh sửa Phí thanh toán - Trước update | `4020:40216` | (0, 9500) | 1920 x 2278 | Maker |
| 22 | Chỉnh sửa Phí thanh toán - Sau update | `4020:41285` | (2000, 9500) | 1920 x 2278 | Maker |
| 23 | Chỉnh sửa Phí DVGT - Trước update | `4020:42349` | (4000, 9500) | 1920 x 1914 | Maker |
| 24 | Chỉnh sửa Phí DVGT - Sau update | `4020:43097` | (6000, 9500) | 1920 x 1914 | Maker |
| **KHU VỰC 4: MÀN HÌNH XEM CHI TIẾT & LỊCH SỬ HOẠT ĐỘNG (5 MÀN)** | | | | | |
| 25 | Xem chi tiết / Active / 1920 | `4020:43846` | (0, 12100) | 1920 x 1224 | Maker, Checker |
| 26 | Xem chi tiết / Pending / 1920 | `4020:44666` | (2000, 12100) | 1920 x 1257 | Maker, Checker |
| 27 | Xem chi tiết / Draft / 1920 | `4020:45486` | (4000, 12100) | 1920 x 1288 | Maker |
| 28 | Xem chi tiết / Inactive / 1920 | `4020:46336` | (6000, 12100) | 1920 x 1273 | Maker, Checker |
| 29 | Xem chi tiết / Tab Lịch sử hoạt động | `4020:47172` | (8000, 12100) | 1920 x 1080 | Maker, Checker, Audit |
| **KHU VỰC 5: PHÊ DUYỆT CHECKER & CÁC MODALS/TOASTS** | | | | | |
| 30 | Phê duyệt / Checker - Chờ phê duyệt | `4020:47923` | (0, 13700) | 1920 x 2039 | Checker |
| 31 | Phê duyệt / Checker - Thẩm định CŨ MỚI | `4020:48856` | (2000, 13700) | 1920 x 2039 | Checker |
| 32 | Confirm trước khi Dừng hoạt động | `4020:50006` | (4000, 13700) | 594 x 254 | Maker |
| 33 | Modal: Xác nhận lưu cập nhật | `4020:50037` | (4700, 13700) | 381 x 196 | Maker |
| 34 | Modal: Xác nhận hủy cập nhật | `4020:50067` | (5200, 13700) | 381 x 196 | Maker |
| 35 | Modal: Xác nhận hủy thêm mới | `4020:50097` | (4000, 14050) | 381 x 196 | Maker |
| 36 | Modal: Xác nhận lưu nháp | `4020:50127` | (4500, 14050) | 381 x 196 | Maker |
| 37 | Toasts thông báo thành công | `4020:50157` - `4020:50205` | (4000 - 5500, 14400) | 417 x 223 | Hệ thống |

---

## 2. Đặc tả Chi tiết 6 Lớp cho các Màn hình Trọng tâm

### 2.1. Màn hình Danh sách Cấu hình Phí (Frame `4020:50223`, `4020:51051`, `4020:51879`)

| # | Control Items | Control Type | Data Type | Đặc tả 6 Lớp Chuẩn BA (6-Layer Specifications) |
|---|---|---|---|---|
| 1 | **Tab Điều hướng Trạng thái** (*Tất cả / Đang hoạt động / Chờ phê duyệt*) | Tab Bar | Select | • **Mục đích**: Phân nhóm dữ liệu theo vòng đời bản ghi (FR-001).<br>• **Validation**: Chỉ được kích hoạt 1 tab tại một thời điểm.<br>• **States**: Active (chữ xanh đậm, gạch chân xanh), Inactive (chữ xám).<br>• **Navigation**: Click chuyển tab tức thì không tải lại trang; nạp lại bảng dữ liệu theo filter trạng thái.<br>• **Error**: Nếu API lỗi, hiển thị Toast `E-partner-fee-management-010`.<br>• **Audit**: Không ghi log chuyển tab. |
| 2 | **Thời gian áp dụng phí** | DatePicker Range | Date / Time | • **Mục đích**: Lọc biểu phí theo khoảng thời gian hiệu lực.<br>• **Validation**: Trường đơn tích hợp dạng `dd/mm/yyyy - dd/mm/yyyy`; ràng buộc `Từ ngày <= Đến ngày`.<br>• **States**: Default (`01/01/2026 - 31/12/2026`), Focus, Error (viền đỏ khi `Từ ngày > Đến ngày`).<br>• **Navigation**: Click icon 📅 mở lịch chọn ngày, icon 🕒 chọn giờ.<br>• **Error**: `E-partner-fee-management-004`: *“Thời gian áp dụng từ ngày phải nhỏ hơn hoặc bằng đến ngày.”*<br>• **Audit**: N/A. |
| 3 | **Cụm nút Bộ lọc** (*[Xóa bộ lọc]*, *[🔍 Tìm kiếm]*) | Button Group | Click | • **Mục đích**: Thực thi hoặc đặt lại các tiêu chí lọc nâng cao.<br>• **Vị trí**: Đặt tại hàng 4 riêng biệt căn phải.<br>• **States**: Default, Hover, Submitting (spinner trên nút Tìm kiếm).<br>• **Navigation**: [Xóa bộ lọc] khôi phục mặc định; [Tìm kiếm] gọi API `GET /api/v1/fee-configs`.<br>• **Error**: Báo lỗi `E-partner-fee-management-010` nếu mất kết nối mạng. |
| 4 | **Bảng dữ liệu Danh sách** | Data Table | ReadOnly / Action | • **Mục đích**: Hiển thị danh sách biểu phí với 10 cột chuẩn.<br>• **Quy chuẩn**: Đã loại bỏ cột Trạng thái YCPD để tránh trùng lặp; Mã cấu hình dạng link xanh.<br>• **States**: Loading skeleton, Loaded, Empty state (*“Không tìm thấy kết quả phù hợp”*).<br>• **Navigation**: Click Mã cấu hình $\to$ Xem chi tiết (`4020:43846`); Click menu 3 chấm $\to$ Chọn Sửa/Xóa/Gửi duyệt.<br>• **Audit**: Ghi log lượt xem danh sách nếu có cấu hình audit view. |

---

### 2.2. Màn hình Thêm mới & Biến thể Phí (Frames `4022:53508` đến `4022:58264`)

| # | Control Items | Control Type | Data Type | Đặc tả 6 Lớp Chuẩn BA (6-Layer Specifications) |
|---|---|---|---|---|
| 1 | **Radio Chế độ Áp dụng** (*Áp dụng chung / Không áp dụng*) | Radio Group | Check | • **Mục đích**: Quyết định mức độ chi tiết của cấu hình phí theo `BR-002`.<br>• **Validation**: Loại trừ tương hỗ (Mutual Exclusivity) — chỉ được chọn 1 phương án.<br>• **States**: Checked (`radio_button_checked`), Unchecked (`radio_button_unchecked`).<br>• **Navigation**: Chọn "Không áp dụng" $\to$ Kích hoạt dropdown chọn đối tượng con và hiển thị các khối cấu hình riêng biệt.<br>• **Error**: N/A.<br>• **Audit**: Lưu cờ `is_general_apply` vào CSDL. |
| 2 | **Bộ chọn mã ngành MCC** (*Phí xử lý GD*) | Transfer Dual-Listbox | Select Multiple | • **Mục đích**: Gán danh mục mã ngành kinh doanh MCC áp dụng biểu phí.<br>• **Validation**: Bắt buộc chọn ít nhất 1 mã ngành MCC.<br>• **States**: Danh mục nguồn bên trái, Danh mục đích bên phải; nút `[ > ]` chuyển chọn, `[ < ]` bỏ chọn.<br>• **Navigation**: Tìm kiếm nhanh mã ngành bằng ô search trong từng listbox.<br>• **Error**: `E-partner-fee-management-001` nếu danh mục đích rỗng khi bấm Tạo mới.<br>• **Audit**: Lưu danh sách mã ngành liên kết trong bảng `FEE_SERVICE_DETAIL`. |
| 3 | **Mức phí tỷ lệ %, Min, Max** (*Phí thanh toán*) | Textbox / Number | Number | • **Mục đích**: Thiết lập công thức thu phí tỷ lệ có chặn trần/sàn.<br>• **Validation**: Ràng buộc $0 \le \text{Min} \le \text{Max}$ (`BR-003`). Tỷ lệ % từ 0 đến 100.<br>• **States**: Default, Focus, Error (viền đỏ ô Max khi Min > Max).<br>• **Error**: `E-partner-fee-management-002`: *“Mức phí tối đa phải lớn hơn hoặc bằng mức phí tối thiểu.”*<br>• **Audit**: Ghi log giá trị số cụ thể vào lịch sử kiểm toán. |
| 4 | **Nút [Tính thử 🧮]** | Button | Click | • **Mục đích**: Mở công cụ mô phỏng tính phí trước khi lưu cấu hình.<br>• **Vị trí**: Nằm tại hàng nút hành động phía chân trang màn hình Phí thanh toán.<br>• **States**: Active (viền xanh nhạt, icon máy tính).<br>• **Navigation**: Click $\to$ Mở Popup tính thử phí (`4018:36498` / `4018:36606`).<br>• **Error**: N/A.<br>• **Audit**: Không ghi log kiểm toán cho thao tác tính thử. |
| 5 | **Cụm nút Chân trang** (*[Hủy]*, *[Lưu nháp]*, *[Tạo mới +]*) | Button Group | Click | • **Mục đích**: Hoàn tất hoặc hủy bỏ quá trình thiết lập biểu phí.<br>• **Navigation**:<br>  - `[Hủy]`: Mở modal xác nhận hủy (`4020:50097`) $\to$ Quay về danh sách.<br>  - `[Lưu nháp]`: Mở modal lưu nháp (`4020:50127`) $\to$ Lưu trạng thái `DRAFT`.<br>  - `[Tạo mới +]`: Validate toàn bộ form $\to$ Lưu trạng thái `NEW` $\to$ Toast thành công (`4020:50205`).<br>• **Error**: Kích hoạt `E-partner-fee-management-001` hoặc `003` nếu có lỗi dữ liệu.<br>• **Audit**: Ghi nhận bản ghi `CREATE` vào `FEE_AUDIT_LOG`. |

---

### 2.3. Popup Tính thử phí 🧮 (Frame `4018:36498` & `4018:36606`)

| # | Control Items | Control Type | Data Type | Đặc tả 6 Lớp Chuẩn BA (6-Layer Specifications) |
|---|---|---|---|---|
| 1 | **Khối Thông tin Cấu hình** | Card Container | ReadOnly | • **Mục đích**: Trích xuất tham số của cấu hình đang soạn thảo (Hình thức thu phí, Thương hiệu thẻ, Thuế VAT, Min, Max).<br>• **States**: Readonly tĩnh, nền xám nhạt.<br>• **Navigation**: Đồng bộ tự động từ form cha. |
| 2 | **Giá trị giao dịch * & SLGD *** | Textbox | Number | • **Mục đích**: Nhập số liệu giả định phục vụ tính toán mô phỏng.<br>• **Validation**: Bắt buộc là số nguyên dương $> 0$. Format tự động dấu phân cách hàng nghìn (vd: `10,000,000`).<br>• **States**: Focus, Error (khi nhập số âm hoặc chữ cái).<br>• **Error**: `E-partner-fee-management-009`: *“Giá trị giao dịch phải là số nguyên dương lớn hơn 0.”* |
| 3 | **Nút [Tính thử]** | Button | Click | • **Mục đích**: Kích hoạt động cơ tính toán theo công thức `BR-004`.<br>• **States**: Default (nền xanh nhạt), Active, Submitting.<br>• **Outcome**: Tính toán tức thì trong < 500ms; hiển thị số tiền vào ô `Phí phải trả` (kèm icon ℹ️ giải thích công thức chặn trần/sàn). |
| 4 | **Nút [Đóng]** | Button | Click | • **Mục đích**: Đóng popup, quay lại form tạo mới mà không làm mất dữ liệu đang nhập. |

---

### 2.4. Màn hình Xem chi tiết & Floating Action Toolbar (Frames `4020:43846` đến `4020:47172`)

| # | Control Items | Control Type | Data Type | Đặc tả 6 Lớp Chuẩn BA (6-Layer Specifications) |
|---|---|---|---|---|
| 1 | **Floating Action Toolbar** (*Thanh tác vụ nổi bên phải*) | Vertical Toolbar | Dynamic Action | • **Mục đích**: Cung cấp các thao tác nghiệp vụ tức thời theo trạng thái bản ghi (FR-010).<br>• **Hiển thị động theo trạng thái**:<br>  - `ACTIVE`: `[✏️ Chỉnh sửa]`, `[🕒 Lịch sử thay đổi]`, `[🔒 Tạm dừng]`.<br>  - `PENDING` (Checker): `[🔍 Thẩm định CŨ - MỚI]`, `[✔️ Phê duyệt]`, `[❌ Từ chối]`.<br>  - `INACTIVE`: `[✏️ Chỉnh sửa]`, `[🔓 Kích hoạt lại]`.<br>  - `DRAFT`/`NEW`: `[✏️ Chỉnh sửa]`, `[📤 Gửi phê duyệt]`, `[🗑️ Xóa]`.<br>• **Security**: Maker không thấy nút Duyệt/Từ chối (`NFR-002`). |
| 2 | **Tab Lịch sử hoạt động** | Timeline Container | ReadOnly | • **Mục đích**: Trực quan hóa dòng thời gian kiểm toán Audit Trail (FR-011).<br>• **Hiển thị**: Danh sách các sự kiện theo thứ tự thời gian giảm dần (Ai sửa, lúc nào, trường nào, Giá trị cũ $\to$ Giá trị mới).<br>• **Filter**: Hỗ trợ lọc theo Người cập nhật và Khoảng thời gian. |

---

### 2.5. Màn hình Thẩm định Phê duyệt Checker (Frames `4020:47923` & `4020:48856`)

| # | Control Items | Control Type | Data Type | Đặc tả 6 Lớp Chuẩn BA (6-Layer Specifications) |
|---|---|---|---|---|
| 1 | **Bảng Đối chiếu CŨ - MỚI** | Split Comparison | ReadOnly | • **Mục đích**: Hỗ trợ Checker phát hiện nhanh chóng các điểm thay đổi của biểu phí so với hợp đồng (FR-012).<br>• **Quy chuẩn**: Cột trái hiển thị Dữ liệu CŨ, Cột phải hiển thị Dữ liệu MỚI. Highlight nền vàng/xanh các ô có sự thay đổi.<br>• **States**: Readonly tĩnh. |
| 2 | **Nút [Phê duyệt]** | Button | Click | • **Mục đích**: Kích hoạt hiệu lực cấu hình phí.<br>• **Navigation**: Mở Modal xác nhận $\to$ Chuyển trạng thái sang `ACTIVE` (nếu ngày áp dụng hiện tại) hoặc `READY` (nếu ngày áp dụng tương lai).<br>• **Error**: `E-partner-fee-management-006` nếu Maker tự duyệt. |
| 3 | **Nút [Từ chối]** | Button | Click | • **Mục đích**: Bác bỏ yêu cầu phê duyệt và trả về cho Maker chỉnh sửa.<br>• **Navigation**: Mở Modal từ chối bắt buộc nhập lý do (tối thiểu 10 ký tự) $\to$ Trả về `NEW`.<br>• **Error**: `E-partner-fee-management-005` nếu bỏ trống lý do. |
