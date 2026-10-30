# TÀI LIỆU PHÂN TÍCH YÊU CẦU HỆ THỐNG & ĐẶC TẢ USE CASE CHI TIẾT
## PHÂN HỆ TẠO VÀ QUẢN LÝ LINK THANH TOÁN (PAYMENT LINK MANAGEMENT)

---

> **Mã tài liệu:** `EPAY-QT.CG.02_BM33`  
> **Dự án:** Hệ thống Cổng Thanh toán Epay Portal 2.0 (Payment Link Module)  
> **Phiên bản:** `v2.0` (Cập nhật Luồng Tạo Link Đơn lẻ, Tạo Link theo Lô, Xử lý Kết quả Lô Thành công/Lỗi, Phân trang và Hosted Form Xác nhận Điều khoản)  
> **Trạng thái:** APPROVED / READY FOR IMPLEMENTATION  

---

## 1. MÔ TẢ TỔNG QUAN KIẾN TRÚC & QUY TRÌNH NGHIỆP VỤ

### 1.1. Bối cảnh & Mục tiêu Nghiệp vụ
Tính năng **Payment Link (Link thanh toán)** trên hệ thống Merchant Admin (MA) của EPAY Portal phục vụ các Đơn vị chấp nhận thanh toán (Merchant / MC) vừa và nhỏ, không có hệ thống quản lý đơn hàng hoặc website tích hợp API riêng. Hệ thống cho phép:
1. **Tạo link đơn lẻ:** Nhân viên / Quản trị viên Merchant nhập thông tin đơn hàng để tạo 01 link thanh toán kèm mã QR của link thanh toán ngay trên một màn hình; trả kết quả link và QR ngay bên dưới màn hình để chia sẻ nhanh cho khách hàng.
2. **Tạo link theo lô:** Tải lên tệp danh sách đơn hàng định dạng Excel (`.xlsx`, `.xls`, `.csv`) để xử lý hàng loạt hàng chục đến hàng trăm link thanh toán cùng lúc; tự động phân tách bản ghi hợp lệ và bản ghi lỗi, hỗ trợ xuất file lỗi chi tiết để chỉnh sửa và xuất file link thành công kèm mã QR.
3. **Thanh toán Hosted Form (Khách hàng):** Khách hàng quét mã QR hoặc bấm vào link thanh toán sẽ truy cập trang Hosted Form của EPAY; tại đây khách hàng xem thông tin 3 khối (Đơn vị cung cấp hàng hóa, Khách hàng, Đơn hàng), tích chọn xác nhận Điều khoản & Điều kiện dịch vụ, sau đó tiến hành chọn Phương thức thanh toán (PTTT) và hoàn tất thanh toán.

---

### 1.2. Bộ Trạng thái Vòng đời Đơn hàng Payment Link (Order Lifecycle Status)
Mỗi đơn hàng tạo qua Payment Link trải qua các trạng thái sau:

```
[Khởi tạo đơn hàng]
         │
         ▼
  [Chờ thanh toán] ───────────► [Hết hạn] (Quá thời gian expire_time)
         │
         ├─── Giao dịch thành công ───► [Thanh toán thành công] (Gửi email hóa đơn cho KH)
         │
         └─── Giao dịch thất bại ────► [Thanh toán thất bại] (Link vẫn còn hiệu lực, KH có thể thử lại)
                                              │
                                              └─── KH thử lại thành công ───► [Thanh toán thành công]
```

| Trạng thái Đơn hàng | Mã Hệ thống | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|
| **`Chờ thanh toán`** | `PENDING` | Đơn hàng vừa tạo thành công, link đang có hiệu lực. Khách hàng chưa thanh toán hoặc đang mở trang thanh toán. |
| **`Thanh toán thành công`** | `SUCCESS` | Khách hàng đã hoàn tất thanh toán qua cổng thanh toán Epay; Core CTT gửi thông báo IPN cập nhật đơn hàng thành công và gửi email hóa đơn cho KH. |
| **`Thanh toán thất bại`** | `FAILED` | Khách hàng thanh toán không thành công (lỗi thẻ, số dư không đủ, timeout...). Link vẫn còn hiệu lực đến thời điểm hết hạn, KH có thể nhấp lại link để thanh toán lại. |
| **`Hết hạn`** | `EXPIRED` | Đơn hàng vượt quá mốc `Thời gian hết hạn` cấu hình. Link bị khóa, khách hàng truy cập sẽ nhận thông báo đơn hàng đã hết hạn hiệu lực. |

---

### 1.3. Bộ Trạng thái và Quy tắc Xử lý Đọc File Lô (Batch File Processing Status)

| Trạng thái Xử lý Lô | Mã Hệ thống | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|
| **`Chưa xử lý`** | `RAW` | File mẫu vừa được chọn từ máy tính, đang chờ người dùng bấm nút [Đọc file]. |
| **`Đang xử lý`** | `PROCESSING` | Hệ thống tiến hành bóc tách từng dòng trong file, kiểm tra validate nghiệp vụ độc lập cho từng dòng. |
| **`Thành công 100%`** | `SUCCESS` | Toàn bộ các dòng trong file đều hợp lệ. Hệ thống sinh link và mã QR cho toàn bộ đơn hàng; hiển thị bảng kết quả kèm phân trang đầy đủ, cho phép xuất file link và gửi email hàng loạt. |
| **`Đọc file có lỗi`** | `HAS_ERRORS` | Phát hiện ít nhất 01 dòng dữ liệu không hợp lệ trong file. Các dòng lỗi hiển thị mã lỗi và chi tiết lỗi cụ thể; cột link thanh toán hiển thị `Chưa tạo`; bảng giữ nền trắng sạch sẽ (không hover/phủ nền đỏ dòng lỗi); cung cấp nút [Tải file lỗi (.xlsx)] kèm cột lý do lỗi để đối soát và nút [Chọn lại file]. |

---

### 1.4. Bảng Danh mục Mã lỗi Xử lý Dữ liệu File Lô (Batch Error Codes)

| Mã Lỗi | Tên Lỗi | Điều kiện Kích hoạt | Hành động của Hệ thống |
|---|---|---|---|
| **`ERR_01`** | Số tiền thanh toán không hợp lệ | Số tiền không phải kiểu số, hoặc `< 1.000 VNĐ` hoặc `> 200.000.000 VNĐ`. | Highlight số tiền màu đỏ; badge lỗi `ERR_01: Số tiền thanh toán phải >= 10.000đ`; cột Link = `Chưa tạo`. |
| **`ERR_02`** | Định dạng email không hợp lệ | Chuỗi email thiếu ký tự `@`, thiếu domain hoặc chứa ký tự đặc biệt sai chuẩn RFC. | Highlight email màu đỏ; badge lỗi `ERR_02: Định dạng email không hợp lệ`; cột Link = `Chưa tạo`. |
| **`ERR_03`** | Hạn thanh toán không hợp lệ | Thời gian hết hạn nằm ở thời gian quá khứ so với thời điểm đọc file hoặc vượt quá `Thời gian hiệu lực + 15 ngày`. | Highlight ngày hết hạn màu đỏ; badge lỗi `ERR_03: Hạn thanh toán ở thời gian quá khứ`; cột Link = `Chưa tạo`. |
| **`ERR_04`** | Trùng lặp mã đơn hàng | Mã đơn hàng bị lặp lại từ 2 dòng trở lên trong cùng tệp tải lên hoặc trùng mã đơn đã tồn tại trên hệ thống của Merchant. | Highlight mã đơn hàng màu đỏ; badge lỗi `ERR_04: Trùng lặp mã đơn hàng trong file`; cột Link = `Chưa tạo`. |
| **`ERR_05`** | Thiếu trường thông tin bắt buộc | Bỏ trống các cột bắt buộc: Tên dịch vụ, Mã đơn hàng, Số tiền, Ngày tạo, Ngày hết hạn, Họ tên, Email, Ngôn ngữ. | Highlight ô trống màu đỏ; badge lỗi `ERR_05: Thiếu trường thông tin bắt buộc`; cột Link = `Chưa tạo`. |
| **`ERR_06`** | Ngôn ngữ không hỗ trợ | Giá trị cột Ngôn ngữ khác `vi` hoặc `en`. | Badge lỗi `ERR_06: Ngôn ngữ chỉ chấp nhận 'vi' hoặc 'en'`; cột Link = `Chưa tạo`. |

---

## 2. MA TRẬN PHÂN QUYỀN VAI TRÒ (RBAC MATRIX)

| Chức năng / Use Case | Mã Use Case | MC Admin (Quản trị viên) | MC Staff (Nhân viên) | Customer (Khách hàng) |
|---|:---:|:---:|:---:|:---:|
| **Tạo link thanh toán đơn lẻ** | `PL-UC-01` | **X** | **X** | - |
| **Sao chép link & Tải QR link đơn** | `PL-UC-01` | **X** | **X** | - |
| **Gửi email link thanh toán đơn cho KH** | `PL-UC-01` | **X** | **X** | - |
| **Tải file template lô & Upload file** | `PL-UC-02` | **X** | **X** | - |
| **Xem kết quả lô thành công & Phân trang** | `PL-UC-03` | **X** | **X** | - |
| **Tải file Excel link thanh toán theo lô** | `PL-UC-03` | **X** | **X** | - |
| **Gửi email link theo lô hàng loạt** | `PL-UC-03` | **X** | **X** | - |
| **Xem bảng kết quả lô có lỗi & Tải file lỗi** | `PL-UC-04` | **X** | **X** | - |
| **Xem popup Modal Mã QR link thanh toán** | `PL-UC-05` | **X** | **X** | - |
| **Tải ảnh mã QR link thanh toán (PNG/SVG)** | `PL-UC-05` | **X** | **X** | - |
| **Khách hàng mở link & Xác nhận Điều khoản** | `PL-UC-06` | - | - | **X** |
| **Xem Modal chi tiết Điều khoản & Dịch vụ** | `PL-UC-07` | - | - | **X** |

---

## 3. CHI TIẾT CÁC USE CASE NGHIỆP VỤ (USE CASE SPECIFICATIONS)

---

### 3.1. USE CASE 01: TẠO LINK THANH TOÁN ĐƠN LẺ (`PL-UC-01`)

#### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE)

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Tạo link thanh toán đơn lẻ (Single Payment Link Creation)** |
| **ID** | `PL-UC-01` |
| **Description** | Cho phép Người dùng Merchant nhập đầy đủ thông tin đơn hàng và thông tin khách hàng trên một giao diện thống nhất, hệ thống tự động kiểm tra tính hợp lệ, gọi Core CTT sinh ra đường dẫn thanh toán (Payment Link) và Mã QR của link thanh toán, đồng thời hiển thị khối kết quả ngay bên dưới màn hình để sao chép link, tải mã QR hoặc kích hoạt gửi email cho khách hàng. |
| **Actor** | Merchant Admin, Merchant Staff |
| **Trigger** | Người dùng nhấp chọn menu con **[Tạo link thanh toán]** nằm trong menu cha **[Tạo link thanh toán ▾]** trên Sidebar bên trái. |
| **Pre-Condition** | Tài khoản Merchant đã đăng nhập thành công vào hệ thống EPAY Portal và được kích hoạt quyền tạo link thanh toán. |
| **Post-Condition** | Đơn hàng được lưu vào cơ sở dữ liệu ở trạng thái `Chờ thanh toán` (`PENDING`), đường dẫn thanh toán duy nhất được tạo ra kèm theo mã QR tương ứng. |
| **Basic flow** | **1.** Hệ thống hiển thị Màn hình Tạo mới link thanh toán (Screen 2) gồm 2 khối form: Thông tin đơn hàng và Thông tin khách hàng.<br/>**2.** Người dùng nhập các trường thông tin: Tên dịch vụ, Mã đơn hàng, Số tiền thanh toán, Đồng tiền (VND), Thời gian hiệu lực, Thời gian hết hạn, Nội dung đơn hàng, Ngôn ngữ hiển thị (Tiếng Việt / Tiếng Anh).<br/>**3.** Người dùng nhập thông tin khách hàng: Họ và tên, Email nhận thông báo, Số điện thoại, Địa chỉ nhận hàng.<br/>**4.** Người dùng nhấn nút **[Tạo payment link]**.<br/>**5.** Hệ thống kiểm tra validation dữ liệu phía Client và Server. Toàn bộ dữ liệu hợp lệ, hệ thống gọi Core CTT sinh mã liên kết thanh toán và mã QR.<br/>**6.** Màn hình giữ nguyên thông tin đã nhập và hiển thị mở rộng **Khối Kết quả Tạo Link Thanh toán** ngay bên dưới form (Screen 3): gồm ô chứa URL payment link, nút [Sao chép], hình ảnh mã QR của link thanh toán, nút [Tải mã QR] và nút [Gửi email].<br/>**7.** Người dùng có thể bấm nút **[Sao chép]** để copy link gửi qua kênh chat (Zalo, Messenger) hoặc bấm nút **[Gửi email]** để hệ thống tự động gửi thông báo thanh toán đến email của khách hàng. |
| **Alternative flow** | **4a. Người dùng bấm nút [Hủy bỏ]:** Hệ thống hiển thị hộp thoại xác nhận hủy thao tác; nếu người dùng đồng ý, làm trống toàn bộ dữ liệu form và ở lại màn hình tạo link. |
| **Exception flow** | **5a. Dữ liệu nhập không hợp lệ:** Hệ thống hiển thị thông báo lỗi tại chân từng trường tin vi phạm (ví dụ: Số tiền < 1.000đ, Email sai định dạng, Ngày hết hạn < Ngày hiệu lực). Màn hình giữ nguyên thông tin đã nhập để người dùng chỉnh sửa.<br/>**5b. Trùng mã đơn hàng:** Hệ thống báo lỗi "Mã đơn hàng đã tồn tại trên hệ thống, vui lòng nhập mã đơn hàng khác".<br/>**5c. Lỗi kết nối Core CTT / QRGW:** Hệ thống hiển thị thông báo lỗi "Hệ thống tạm thời không tạo được link thanh toán. Vui lòng thử lại sau giây lát". |
| **Non-functional requirement** | Thời gian xử lý tạo đơn và trả về kết quả link + mã QR < 1.5 giây. |

#### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE)

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| `-- Cột Trái: 1. Thông tin Đơn hàng` | Divider | - | - | - | Khối thông tin chi tiết về sản phẩm / dịch vụ và số tiền cần thanh toán |
| **Tên dịch vụ \*** | Textbox | M | Y | - Kiểu dữ liệu: Chuỗi ký tự UTF-8.<br/>- Độ dài: Tối đa 255 ký tự.<br/>- Không chứa mã HTML/script độc hại (XSS). | - **Cho phép nhập:** Cho phép nhập khi ở màn hình khởi tạo đơn mới. Không cho phép nhập khi hệ thống đang xử lý sinh link hoặc sau khi đã tạo link thành công.<br/>- **Mặc định / Không nhập:** Mặc định: Trống, hiển thị placeholder `Nhập tên dịch vụ`. Nếu không nhập mà bấm [Tạo link]: Báo lỗi đỏ viền ô `Vui lòng nhập tên dịch vụ`.<br/>- **Quy định khi nhập:** Tên loại hình sản phẩm, dịch vụ hoặc gói hàng hóa cung ứng cho khách hàng. |
| **Mã đơn hàng \*** | Textbox | M | Y | - Kiểu dữ liệu: Chuỗi ký tự chữ cái (a-z, A-Z), chữ số (0-9), dấu gạch ngang (`-`), gạch dưới (`_`).<br/>- Độ dài: Tối đa 50 ký tự.<br/>- Duy nhất (Unique) theo từng Merchant. | - **Cho phép nhập:** Cho phép nhập khi ở màn hình khởi tạo đơn mới. Không cho phép nhập/sửa sau khi link đã được tạo thành công.<br/>- **Mặc định / Không nhập:** Mặc định: Trống, hiển thị placeholder `Nhập mã đơn hàng` (hoặc gợi ý mã tự sinh `#ORD-YYYYMMDD-xxx`). Nếu không nhập mà bấm [Tạo link]: Báo lỗi đỏ `Vui lòng nhập mã đơn hàng`.<br/>- **Quy định khi nhập:** Mã định danh đơn hàng do Merchant tự quản lý; không được trùng lặp với bất kỳ mã đơn hàng nào đã tồn tại trên hệ thống của Merchant (báo lỗi `Mã đơn hàng đã tồn tại`). |
| **Số tiền thanh toán \*** | Textbox / Number | M | Y | - Kiểu dữ liệu: Số nguyên dương.<br/>- Giá trị: Từ `1,000` đến `200,000,000` VNĐ.<br/>- Không cho phép nhập ký tự chữ, số âm hoặc ký tự đặc biệt. | - **Cho phép nhập:** Cho phép nhập khi khởi tạo đơn mới. Không cho phép nhập/sửa khi link đã được tạo.<br/>- **Mặc định / Không nhập:** Mặc định: Trống, hiển thị placeholder `Nhập số tiền`. Nếu không nhập mà bấm [Tạo link]: Báo lỗi đỏ `Vui lòng nhập số tiền thanh toán`.<br/>- **Quy định khi nhập:** Tự động định dạng dấu chấm phân cách hàng nghìn khi người dùng nhập (ví dụ: gõ `5000000` -> hiển thị `5.000.000`). Báo lỗi nếu giá trị `< 1,000đ` hoặc `> 200,000,000đ`. |
| **Loại tiền \*** | Dropdown list | M | N | - Giá trị hợp lệ: `VND` (hoặc `USD` theo thỏa thuận hợp đồng Merchant). | - **Cho phép nhập:** Không cho phép nhập tự do; chỉ hiển thị chọn từ danh mục đồng tiền thanh toán hợp lệ do hệ thống cung cấp.<br/>- **Mặc định / Không nhập:** Mặc định: `VND`. Luôn luôn có giá trị hiển thị, không thể để trống.<br/>- **Quy định khi nhập:** Đơn vị tiền tệ hạch toán của đơn hàng. |
| **Ngày hết hạn đơn hàng \*** | Date Picker | M | Y | - Định dạng: `DD/MM/YYYY HH:mm`.<br/>- Thời gian: `> Ngày giờ hiện tại` và `<= Ngày hiện tại + 15 ngày`. | - **Cho phép nhập:** Cho phép nhập ngày hiệu lực / ngày hết hạn đơn hàng khi tạo mới.<br/>- **Mặc định / Không nhập:** Mặc định: Ngày hiện tại (23:59:59 của ngày hiện tại). Nếu người dùng không nhập: Tự động lấy giá trị mặc định là 23:59:59 của ngày hiện tại.<br/>- **Quy định khi nhập:** Chỉ cho phép nhập tối đa 15 ngày so với ngày hiện tại (hoặc ngày hiệu lực). Không cho phép chọn ngày giờ trong quá khứ so với thời điểm tạo đơn. Sau thời điểm này, link tự động hết hạn (`EXPIRED`). |
| `-- Cột Phải: 2. Thông tin Khách hàng` | Divider | - | - | - | Khối thông tin định danh và liên hệ của người mua hàng |
| **Họ tên \*** | Textbox | M | Y | - Kiểu dữ liệu: Chuỗi ký tự chữ tiếng Việt/tiếng Anh có dấu và khoảng trắng.<br/>- Độ dài: Tối đa 100 ký tự.<br/>- Không chứa chữ số hoặc ký tự đặc biệt. | - **Cho phép nhập:** Cho phép nhập khi ở màn hình khởi tạo đơn mới. Không cho phép nhập sau khi link đã tạo.<br/>- **Mặc định / Không nhập:** Mặc định: Trống, hiển thị placeholder `Nhập họ và tên`. Nếu không nhập mà bấm [Tạo link]: Báo lỗi đỏ `Vui lòng nhập họ tên khách hàng`.<br/>- **Quy định khi nhập:** Nếu tạo link cho khách hàng quốc tế, người dùng cần nhập bằng tiếng Anh không dấu theo đúng dòng lưu ý. |
| **Email** | Textbox | O | Y | - Định dạng: Chuẩn Email RFC 5322 (`user@domain.com`).<br/>- Độ dài: Tối đa 100 ký tự.<br/>- Không chứa khoảng trắng. | - **Cho phép nhập:** Cho phép nhập khi khởi tạo đơn mới.<br/>- **Mặc định / Không nhập:** Mặc định: Trống, hiển thị placeholder `Nhập email`. Nếu không nhập: Chấp nhận để trống (trường tùy chọn O), hệ thống vẫn tạo link thành công. Khi bấm nút [Gửi email], hệ thống sẽ nhắc nhở bổ sung email khách hàng trước khi gửi thư.<br/>- **Quy định khi nhập:** Nếu có nhập dữ liệu thì bắt buộc phải kiểm tra đúng định dạng email; nếu sai cú pháp báo lỗi `Định dạng email không hợp lệ`. |
| **Số điện thoại \*** | Textbox | M | Y | - Kiểu dữ liệu: Chuỗi 10 chữ số (đối với số điện thoại Việt Nam) hoặc chuẩn quốc tế E.164.<br/>- Đầu số hợp lệ: Bắt đầu bằng các đầu số viễn thông Việt Nam (`03`, `05`, `07`, `08`, `09`). | - **Cho phép nhập:** Cho phép nhập khi khởi tạo đơn mới. Không cho phép nhập sau khi đã sinh link.<br/>- **Mặc định / Không nhập:** Mặc định: Trống, hiển thị placeholder `Nhập số điện thoại`. Nếu không nhập mà bấm [Tạo link]: Báo lỗi đỏ `Vui lòng nhập số điện thoại`.<br/>- **Quy định khi nhập:** Chỉ cho phép nhập ký tự số (0-9), không chứa chữ cái hay ký tự đặc biệt. Số điện thoại dùng để liên hệ đối soát và tra cứu đơn hàng. |
| **Địa chỉ** | Textbox | O | Y | - Kiểu dữ liệu: Chuỗi ký tự UTF-8.<br/>- Độ dài: Tối đa 255 ký tự. | - **Cho phép nhập:** Cho phép nhập khi khởi tạo đơn mới.<br/>- **Mặc định / Không nhập:** Mặc định: Trống, hiển thị placeholder `Nhập địa chỉ`. Nếu không nhập: Chấp nhận để trống, hệ thống lưu giá trị null/rỗng.<br/>- **Quy định khi nhập:** Cho phép chữ cái, chữ số và các dấu phân cách thông dụng (dấu phẩy, gạch chéo, chấm). |
| `-- Cột Phải: 3. Ngôn ngữ` | Divider | - | - | - | Cấu hình ngôn ngữ hiển thị |
| **Gửi Link thanh toán bằng \*** | Dropdown list | M | Y | - Giá trị hợp lệ: Chọn 1 trong 2 giá trị `Tiếng Việt` hoặc `Tiếng Anh`. | - **Cho phép nhập:** Cho phép chọn từ dropdown danh sách. Không cho phép nhập text tự do.<br/>- **Mặc định / Không nhập:** Mặc định: `Tiếng Việt`. Luôn luôn có giá trị lựa chọn, không thể để trống.<br/>- **Quy định khi nhập:** Quyết định ngôn ngữ giao diện hiển thị trên trang Hosted Checkout Form và ngôn ngữ của mẫu Email gửi tự động cho khách hàng. |
| `-- Dòng Lưu ý & Nút Chức năng Form` | Divider | - | - | - | Khu vực lưu ý nghiệp vụ và nút hành động chính giữa |
| **Dòng lưu ý** | Label (Hint) | - | N | Văn bản tĩnh: `*Lưu ý: Nếu bạn đang tạo Link thanh toán cho Khách hàng nước ngoài, vui lòng điền Thông tin bằng Tiếng Anh.` | Căn giữa, màu xám `#475569`, font size 11.5px. Nhắc nhở người dùng chuẩn hóa thông tin quốc tế. |
| **Nút [Tạo link]** | Button | M | Y | Nền xanh đậm `#025BBD`, chữ trắng `#FFFFFF`, kích thước `120x34px`, bo góc 4px | - **Hành động:** Khi nhấp chuột, hệ thống validate toàn bộ các trường tin M/O/C theo đúng các quy tắc trên.<br/>- Nếu có trường lỗi: Dừng xử lý, hiển thị lỗi đỏ tại chân trường tin vi phạm.<br/>- Nếu 100% hợp lệ: Gọi Core CTT tạo đơn ở trạng thái `PENDING`, sinh Payment Link URL duy nhất + Mã QR của link, sau đó hiển thị Khối kết quả (State 2) ngay bên dưới. |
| `-- Phân đoạn: \| Link thanh toán` | Divider | - | - | - | Tiêu đề phân đoạn kết quả có thanh dọc màu xanh đậm (blue-pipe 3.5x15px) |
| **Trạng thái 1: Khung chưa tạo (State 1 - Chuẩn Ảnh 1 Figma)** | Container Box | - | N | - Khung trắng viền xám `#E2E8F0`, cao 200px.<br/>- Icon móc xích màu xám 🔗.<br/>- Text hướng dẫn: `Vui lòng nhập thông tin đơn hàng và nhấn 'Tiếp tục' để tạo link thanh toán & mã QR.`<br/>- Cặp nút bên dưới: Nút [Copy] (disabled viền xám) và Nút [Gửi email] (disabled nền xanh nhạt). | Hiển thị mặc định khi người dùng vừa truy cập màn hình và chưa bấm nút [Tạo link]. Không cho phép thao tác sao chép hay gửi email. |
| **Trạng thái 2: Khung đã tạo thành công (State 2 - Chuẩn Ảnh 2 Figma)** | Container Box | - | N | - Khung viền và nền xanh lá nhạt (`#F0FDF4`, viền `#BBF7D0`), bo góc 6px.<br/>- Dòng thông báo màu xanh lá: `✓ Đã tạo Link thanh toán thành công cho đơn hàng #{orderCode}!`. | Xuất hiện ngay bên dưới form sau khi người dùng bấm [Tạo link] thành công. Giữ nguyên thông tin form đã nhập phía trên. |
| **Ô chứa URL Payment Link (State 2)** | Container / Input | C | N | - Khung viền xanh dương `#60A5FA`, nền trắng, cao 36px.<br/>- Icon 🔗 kèm URL rút gọn dạng: `https://pay.epay.vn/pl/{token}`. | Chỉ đọc (Read-only). Hiển thị đường dẫn thanh toán an toàn duy nhất của đơn hàng. |
| **Nút [📋 Sao chép] (State 2)** | Button | C | Y | Nền trắng, viền xám `#CBD5E1`, icon clipboard, chữ `#334155`, nằm ngay bên trong khung URL góc phải | Khi nhấp: Tự động sao chép toàn bộ đường link thanh toán vào bộ nhớ tạm (Clipboard); hiển thị tooltip toast `Đã sao chép link thanh toán`. |
| **Khối Mã QR link thanh toán (State 2)** | QR Block | C | N | - Thẻ trắng 124x124px viền `#E2E8F0` chứa Mã QR 2D của link thanh toán (chuẩn SVG/PNG độ nét cao).<br/>- Tiêu đề: `Mã QR link thanh toán` (font đậm).<br/>- Text giải thích: `Quét bằng Camera/Zalo để mở link thanh toán`. | Mã QR trỏ tới URL Payment Link (không phải QR chuyển khoản ngân hàng tĩnh). Khi quét bằng điện thoại sẽ mở trang xác nhận điều khoản thanh toán. |
| **Link [⬇ Tải mã QR link] (State 2)** | Action Link | C | Y | Chữ màu xanh `#025BBD`, font size 11.5px, icon mũi tên tải xuống | Khi nhấp: Hệ thống tải file ảnh mã QR độ phân giải cao (`qr-link-{orderCode}.png`) về máy tính để in ấn hoặc gửi qua mạng xã hội. |
| **Nút [Gửi email] (State 2)** | Button | C | Y | Nền màu xanh đậm `#025BBD`, chữ trắng `#FFFFFF`, kích thước `120x34px`, đặt chính giữa bên dưới khối màu xanh lá | - **Cho phép nhấp:** Được kích hoạt ở trạng thái Active khi đơn hàng đã tạo thành công.<br/>- **Hành động:** Khi nhấp, hệ thống tự động gửi email thông báo thanh toán (theo mẫu Tiếng Việt hoặc Tiếng Anh đã chọn) đến địa chỉ email của khách hàng; hiển thị thông báo `Đã gửi email thanh toán thành công cho {email}`. |

---

### 3.1B. USE CASE 01B: XỬ LÝ VALIDATE BÁO LỖI CÁC TRƯỜNG TIN KHI TẠO LINK ĐƠN (`PL-UC-01B`)

#### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE)

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Xử lý Validate Báo lỗi Các Trường tin khi Tạo Link Đơn (Single Payment Link - Validation Error Handling)** |
| **ID** | `PL-UC-01B` |
| **Description** | Khi Người dùng Merchant bấm nút [Tạo link] mà dữ liệu nhập trên form vi phạm các quy tắc nghiệp vụ (để trống trường bắt buộc, trùng mã đơn, số tiền ngoài khoảng cho phép, hạn thanh toán ở quá khứ/quá 15 ngày, sai định dạng email/SĐT), hệ thống hiển thị banner cảnh báo trên đầu form, viền đỏ các ô lỗi kèm thông báo lỗi cụ thể ngay dưới từng trường tin, đồng thời giữ nguyên Khối kết quả ở Trạng thái Chưa tạo (State 1) với các nút thao tác disabled. |
| **Actor** | Merchant Admin, Merchant Staff |
| **Trigger** | Người dùng nhấp nút **[Tạo link]** tại Form Tạo link thanh toán đơn lẻ khi form còn chứa trường tin không hợp lệ. |
| **Pre-Condition** | Người dùng đang ở Màn hình Tạo link thanh toán đơn lẻ (Screen 2). |
| **Post-Condition** | Giao diện hiển thị các cảnh báo lỗi vi phạm; hệ thống **KHÔNG tạo đơn hàng** vào cơ sở dữ liệu; đường dẫn thanh toán và mã QR chưa được phát hành. |
| **Basic flow** | **1.** Người dùng nhấp nút **[Tạo link]**.<br/>**2.** Hệ thống kiểm tra validation toàn bộ các trường tin phía Client và Server theo đúng các quy tắc quy định tại `PL-UC-01`.<br/>**3.** Phát hiện ít nhất 01 trường tin không hợp lệ, hệ thống hiển thị **Banner cảnh báo đỏ** trên đầu form: `⚠️ Phát hiện thông tin đơn hàng không hợp lệ. Vui lòng kiểm tra và sửa lại các trường báo đỏ bên dưới.`<br/>**4.** Hệ thống áp dụng hiệu ứng viền đỏ `#DC2626` và nền hồng nhạt `#FEF2F2` cho các ô input vi phạm, đồng thời hiển thị thông báo lỗi cụ thể ngay bên dưới từng ô:<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Tên dịch vụ (để trống):** Hiển thị `* Vui lòng nhập tên dịch vụ`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Mã đơn hàng (bị trùng):** Hiển thị `* Mã đơn hàng đã tồn tại trên hệ thống, vui lòng nhập mã khác`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Số tiền thanh toán (< 1,000đ):** Hiển thị `* Số tiền thanh toán phải từ 1,000đ đến 200,000,000đ`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Ngày hết hạn (ở quá khứ / > 15 ngày):** Hiển thị `* Hạn thanh toán ở thời gian quá khứ. Tối đa 15 ngày so với hiện tại`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Họ tên khách hàng (để trống):** Hiển thị `* Vui lòng nhập họ tên khách hàng`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Email (sai cú pháp):** Hiển thị `* Định dạng email không hợp lệ (ví dụ: name@domain.com)`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Số điện thoại (sai độ dài/đầu số):** Hiển thị `* Số điện thoại phải gồm 10 chữ số hợp lệ`.<br/>**5.** Các trường thông tin hợp lệ (Loại tiền `VND`, Địa chỉ, Ngôn ngữ) giữ nguyên viền xám bình thường.<br/>**6.** Phân đoạn **`| Link thanh toán`** bên dưới tiếp tục giữ nguyên **Trạng thái 1 (Khung chưa tạo)**: hiển thị icon móc xích xám và 2 nút disabled `[Copy]` và `[Gửi email]` (tuyệt đối không hiển thị kết quả link khi còn lỗi).<br/>**7.** Người dùng tương tác chỉnh sửa dữ liệu vi phạm. Khi người dùng nhập đúng cú pháp, viền đỏ và dòng thông báo lỗi tương ứng tự động biến mất. |
| **Alternative flow** | **7a. Người dùng chỉnh sửa và submit lại thành công:** Khi toàn bộ các trường lỗi được sửa đúng, người dùng bấm lại [Tạo link] -> Hệ thống tạo link thành công và chuyển sang State 2 (`PL-UC-01`). |
| **Exception flow** | Không có ngoại lệ hệ thống; xử lý validation client/server đồng bộ. |
| **Non-functional requirement** | Thời gian phản hồi báo lỗi trên giao diện tức thì < 0.2 giây sau khi click nút. |

#### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE - SCREEN 2B)

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| `-- Banner Thông báo lỗi chung` | Divider | - | - | - | Cảnh báo đầu form khi submit có lỗi |
| **Banner Cảnh báo Lỗi Form** | Alert Container | - | N | Nền hồng nhạt `#FEF2F2`, viền đỏ `#FCA5A5`, chữ đỏ `#DC2626`, icon `⚠️` | Xuất hiện ở đầu Form Card khi có ít nhất 01 trường tin bị lỗi: `⚠️ Phát hiện thông tin đơn hàng không hợp lệ. Vui lòng kiểm tra và sửa lại các trường báo đỏ bên dưới.` |
| `-- Cột Trái: 1. Thông tin Đơn hàng (Trạng thái Báo lỗi)` | Divider | - | - | - | Các trường tin đơn hàng bị vi phạm |
| **Ô Tên dịch vụ (Lỗi)** | Textbox (Invalid) | M | Y | Nền `#FEF2F2`, viền đỏ `#DC2626` dày 1.5px | Khi để trống: Viền đỏ và hiển thị dòng lỗi `* Vui lòng nhập tên dịch vụ`. Khi người dùng gõ ký tự: Viền đỏ tự động chuyển về viền xám. |
| **Ô Mã đơn hàng (Lỗi)** | Textbox (Invalid) | M | Y | Nền `#FEF2F2`, viền đỏ `#DC2626`, giá trị trùng lặp | Hiển thị dòng lỗi `* Mã đơn hàng đã tồn tại trên hệ thống, vui lòng nhập mã khác`. Bắt buộc đổi sang mã đơn hàng chưa tồn tại. |
| **Ô Số tiền thanh toán (Lỗi)** | Textbox (Invalid) | M | Y | Nền `#FEF2F2`, viền đỏ `#DC2626`, giá trị `< 1.000` | Hiển thị dòng lỗi `* Số tiền thanh toán phải từ 1,000đ đến 200,000,000đ`. Yêu cầu nhập số tiền từ 1,000đ đến 200,000,000đ. |
| **Ô Ngày hết hạn đơn hàng (Lỗi)** | Date Picker (Invalid) | M | Y | Nền `#FEF2F2`, viền đỏ `#DC2626`, thời gian quá khứ hoặc `> 15 ngày` | Hiển thị dòng lỗi `* Hạn thanh toán ở thời gian quá khứ. Tối đa 15 ngày so với hiện tại`. Yêu cầu chọn ngày trong tương lai và tối đa 15 ngày. |
| `-- Cột Phải: 2. Thông tin Khách hàng (Trạng thái Báo lỗi)` | Divider | - | - | - | Các trường tin khách hàng bị vi phạm |
| **Ô Họ tên (Lỗi)** | Textbox (Invalid) | M | Y | Nền `#FEF2F2`, viền đỏ `#DC2626` | Khi để trống: Viền đỏ và hiển thị dòng lỗi `* Vui lòng nhập họ tên khách hàng`. |
| **Ô Email (Lỗi)** | Textbox (Invalid) | O | Y | Nền `#FEF2F2`, viền đỏ `#DC2626`, cú pháp sai chuẩn | Hiển thị dòng lỗi `* Định dạng email không hợp lệ (ví dụ: name@domain.com)`. Yêu cầu sửa đúng chuẩn RFC 5322 hoặc xóa trống. |
| **Ô Số điện thoại (Lỗi)** | Textbox (Invalid) | M | Y | Nền `#FEF2F2`, viền đỏ `#DC2626`, thiếu số hoặc sai đầu số | Hiển thị dòng lỗi `* Số điện thoại phải gồm 10 chữ số hợp lệ`. Yêu cầu nhập đủ 10 số đầu số hợp lệ. |
| `-- Khối Kết quả: \| Link thanh toán` | Divider | - | - | - | Phân đoạn kết quả khi form còn lỗi |
| **Khung Chưa tạo Link (State 1)** | Container Box | - | N | Khung trắng viền xám `#E2E8F0`, icon xích xám 🔗 | Tiếp tục hiển thị khung rỗng State 1 kèm text hướng dẫn. Nút [Copy] và [Gửi email] ở trạng thái disabled. |

---

### 3.2. USE CASE 02: TẠO LINK THANH TOÁN THEO LÔ — TẢI TEMPLATE & UPLOAD FILE (`PL-UC-02`)

#### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE)

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Tạo link thanh toán theo lô — Tải template & Upload file (Batch Payment Link - Template & Upload)** |
| **ID** | `PL-UC-02` |
| **Description** | Cho phép Người dùng Merchant tải tệp biểu mẫu Excel tiêu chuẩn, chuẩn bị danh sách nhiều đơn hàng trên máy tính cá nhân, sau đó chọn tệp và tải lên hệ thống để thực hiện đọc file và xử lý tạo link thanh toán đồng loạt. |
| **Actor** | Merchant Admin, Merchant Staff |
| **Trigger** | Người dùng nhấp chọn menu con **[Tạo link thanh toán lô]** nằm trong menu cha **[Tạo link thanh toán ▾]** trên Sidebar bên trái. |
| **Pre-Condition** | Tài khoản Merchant đã đăng nhập vào hệ thống EPAY Portal; thiết bị máy tính có kết nối mạng và có phần mềm bảng tính (Excel/Calc) để mở tệp. |
| **Post-Condition** | Tệp dữ liệu được tải lên máy chủ thành công và chuyển sang quy trình kiểm tra, phân tích dữ liệu lô. |
| **Basic flow** | **1.** Hệ thống hiển thị Màn hình Tạo link thanh toán theo lô — State 1 (Screen 5).<br/>**2.** Người dùng nhấp vào liên kết **[Tải file mẫu (.xlsx)]** để tải file biểu mẫu về máy tính cá nhân.<br/>**3.** Người dùng mở file mẫu và điền thông tin danh sách các đơn hàng theo đúng định dạng các cột quy định.<br/>**4.** Tại giao diện màn hình, người dùng nhấp vào ô nhập **File đơn hàng** hoặc kéo thả tệp từ máy tính vào khu vực upload.<br/>**5.** Hệ thống hiển thị tên tệp vừa chọn (ví dụ: `Danh_sach_don_hang_T10.xlsx`) kèm nút [Hủy].<br/>**6.** Người dùng nhấp nút **[Tạo link]** (hoặc [Đọc file]).<br/>**7.** Hệ thống tiếp nhận tệp, thực hiện đọc cấu trúc và chuyển sang bước kiểm tra dữ liệu từng dòng: nếu 100% dòng hợp lệ chuyển sang `PL-UC-03`, nếu có dòng lỗi chuyển sang `PL-UC-04`. |
| **Alternative flow** | **2a. Người dùng đã có file dữ liệu đúng chuẩn:** Người dùng bỏ qua bước 2 và 3, thực hiện chọn file và đọc file ngay. |
| **Exception flow** | **4a. Định dạng file không đúng quy định:** Người dùng chọn file có đuôi khác `.xlsx`, `.xls`, `.csv` -> Hệ thống báo lỗi "Định dạng tệp không được hỗ trợ. Vui lòng tải lên tệp Excel (.xlsx, .xls) hoặc CSV".<br/>**4b. Dung lượng tệp vượt quá giới hạn:** Tệp lớn hơn 10MB -> Hệ thống báo lỗi "Dung lượng tệp vượt quá 10MB. Vui lòng tách nhỏ tệp dữ liệu".<br/>**4c. Tệp rỗng (không có dữ liệu):** Tệp chỉ có dòng tiêu đề cột hoặc 0 bản ghi -> Hệ thống báo lỗi "Tệp tải lên không có dữ liệu đơn hàng. Vui lòng kiểm tra lại". |
| **Non-functional requirement** | Thời gian tải lên và đọc tệp dung lượng 5MB (< 1,000 dòng) < 2.0 giây. |

#### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE)

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| `-- Khối Tải file mẫu` | Divider | - | - | - | Khu vực cung cấp biểu mẫu chuẩn |
| **Link [Tải file mẫu (.xlsx)]** | Hyperlink | O | - | File `.xlsx` chuẩn gồm 11 cột thuộc tính đơn hàng | - **Cho phép thao tác:** Cho phép người dùng nhấp chuột tải về bất kỳ lúc nào.<br/>- **Hành động:** Trình duyệt tải tệp `Template_Payment_Link_Batch.xlsx` về máy tính. |
| `-- Khối Chọn file dữ liệu` | Divider | - | - | - | Khu vực chọn tệp nguồn từ máy tính |
| **File đơn hàng \*** | File Upload / Textbox | M | Y | - Định dạng tệp cho phép: `.xlsx`, `.xls`, `.csv`.<br/>- Dung lượng tệp tối đa: 10MB.<br/>- Giới hạn bản ghi: Tối đa 1,000 dòng dữ liệu / tệp.<br/>- Bắt buộc đúng cấu trúc 11 cột thuộc tính theo file mẫu. | - **Cho phép nhập / chọn:** Cho phép bấm duyệt file từ máy tính hoặc kéo thả tệp vào ô upload khi ở trạng thái chờ tải file. Không cho phép chọn tệp khi hệ thống đang xử lý đọc dữ liệu.<br/>- **Mặc định / Không nhập:** Mặc định: Trống, hiển thị placeholder `Chọn file từ máy tính hoặc kéo thả file vào đây`. Nếu người dùng không chọn file mà bấm [Tạo link] / [Đọc file]: Báo lỗi đỏ viền khung `Vui lòng chọn tệp danh sách đơn hàng để tải lên`.<br/>- **Quy định khi nhập / chọn:** Tên file hiển thị kèm dung lượng. Nếu chọn file sai định dạng hoặc > 10MB, hệ thống báo lỗi ngay lập tức. |
| **Dòng ghi chú lưu ý** | Label (Hint) | - | N | Văn bản tĩnh: `*Lưu ý: Nếu bạn đang tạo Link thanh toán cho Khách hàng nước ngoài, vui lòng điền Thông tin bằng Tiếng Anh.` | Căn giữa, màu xám `#64748B`, font chữ nghiêng, size 11.5px. Nhắc nhở người dùng chuẩn hóa thông tin quốc tế. |
| `-- Button Chức năng` | Divider | - | - | - | Nút điều hướng xử lý file |
| **Nút [Hủy]** | Button | O | Y | Nền trắng, viền xám `#CBD5E1`, chữ `#475569`, kích thước `100x38px` | - **Cho phép nhấp:** Được phép nhấp khi đã có tệp được chọn vào ô File đơn hàng.<br/>- **Hành động:** Bỏ tệp đã chọn, đưa ô nhập File đơn hàng về trạng thái placeholder ban đầu. |
| **Nút [Tạo link] / [Đọc file]** | Button | M | Y | Nền xanh `#2563EB`, chữ trắng `#FFFFFF`, kích thước `120x38px` | - **Cho phép nhấp:** Cho phép nhấp khi đã có tệp được chọn.<br/>- **Hành động:** Kích hoạt gửi tệp lên máy chủ để phân tích cú pháp và kiểm tra hợp lệ từng dòng: nếu 100% hợp lệ chuyển sang `PL-UC-03`, nếu có lỗi chuyển sang `PL-UC-04`. |

---

### 3.3. USE CASE 03: XỬ LÝ KẾT QUẢ TẠO LINK THEO LÔ — THÀNH CÔNG 100% (`PL-UC-03`)

#### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE)

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Xử lý kết quả tạo link theo lô — Thành công (Batch Payment Link - Success Result & List View)** |
| **ID** | `PL-UC-03` |
| **Description** | Sau khi hệ thống đọc file và xác thực 100% các dòng dữ liệu trong tệp đều hợp lệ, hệ thống tự động sinh link thanh toán và mã QR tương ứng cho từng đơn hàng, hiển thị bảng danh sách kết quả trực quan kèm phân trang chuyên nghiệp, cho phép sao chép từng link, xem mã QR dạng modal popup, xuất tệp Excel danh sách link và gửi email hàng loạt cho khách hàng. |
| **Actor** | Merchant Admin, Merchant Staff |
| **Trigger** | Hệ thống hoàn tất kiểm tra tệp dữ liệu từ `PL-UC-02` với kết quả 0 dòng lỗi. |
| **Pre-Condition** | Tệp tải lên chứa ít nhất 01 dòng dữ liệu đơn hàng và tất cả các dòng đều vượt qua các bước kiểm tra hợp lệ. |
| **Post-Condition** | Toàn bộ danh sách đơn hàng được ghi nhận vào cơ sở dữ liệu với trạng thái `Chờ thanh toán`, mỗi đơn hàng có 01 payment link và 01 mã QR link thanh toán. |
| **Basic flow** | **1.** Hệ thống hiển thị Màn hình Kết quả tạo link theo lô — State 2 (Screen 6).<br/>**2.** Hệ thống hiển thị khối Thống kê tổng số lượng đơn hàng: `Tổng số đơn hàng: N`, `Tổng số đơn hàng hợp lệ: N`, `Tổng số đơn hàng không hợp lệ: 0`.<br/>**3.** Hệ thống hiển thị Bảng danh sách kết quả (Grid Table) gồm 13 cột: STT, Tên dịch vụ, Mã đơn hàng, Số tiền TT, Ngày tạo đơn, Ngày hết hạn, Họ tên, Email, Số điện thoại, Địa chỉ, Ngôn ngữ, Link thanh toán, Mã QR Link.<br/>**4.** Tại mỗi dòng dữ liệu:<br/>&nbsp;&nbsp;&nbsp;&nbsp;- Người dùng có thể nhấp vào liên kết **[Copy]** tại cột Link thanh toán để sao chép link.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- Người dùng có thể nhấp vào liên kết **[Xem QR]** tại cột Mã QR Link để mở Popup xem chi tiết mã QR của đơn hàng đó (`PL-UC-05`).<br/>**5.** Người dùng xem và tương tác với thanh Phân trang (Pagination Bar) phía dưới bảng: chuyển trang `[ ‹ ]`, `[ 1 ]`, `[ 2 ]`... `[ › ]`, thay đổi số dòng hiển thị trên mỗi trang (`10 / trang`, `20 / trang`...) hoặc gõ số trang để nhảy tới nhanh.<br/>**6.** Người dùng có thể nhấp nút **[Tải file link]** (màu xanh lá) để xuất tệp Excel chứa toàn bộ thông tin đơn hàng kèm cột link thanh toán hoàn chỉnh.<br/>**7.** Người dùng có thể nhấp nút **[Gửi email]** (màu xanh dương) để hệ thống tự động gửi email thông báo thanh toán đồng loạt đến email của tất cả khách hàng trong danh sách lô. |
| **Alternative flow** | **7a. Gửi email hàng loạt thành công:** Hệ thống hiển thị thông báo "Đã gửi email thanh toán thành công cho N khách hàng". |
| **Exception flow** | **6a. Lỗi xuất file:** Nếu hệ thống gặp sự cố khi tạo file tải xuống -> Hiển thị thông báo "Không thể tạo file xuất. Vui lòng thử lại sau".<br/>**7b. Lỗi dịch vụ gửi mail:** Nếu máy chủ mail gián đoạn -> Hệ thống đánh dấu trạng thái gửi mail thất bại cho các đơn hàng bị ảnh hưởng và cho phép gửi lại. |
| **Non-functional requirement** | Hiển thị bảng danh sách 1,000 đơn hàng có phân trang < 1.0 giây; xuất file Excel kết quả < 3.0 giây. |

#### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE)

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| `-- Khối Thống kê Số lượng Đơn hàng` | Divider | - | - | - | Tóm tắt kết quả đọc file lô |
| **Tổng số đơn hàng** | Label | - | N | Hiển thị số nguyên dương (ví dụ: `Tổng số đơn hàng: 48`) | Màu chữ đen `#0F172A`, font đậm |
| **Tổng số đơn hàng hợp lệ** | Label | - | N | Bằng tổng số đơn hàng khi 100% thành công | Màu chữ đen `#0F172A` |
| **Tổng số đơn hàng không hợp lệ** | Label | - | N | Giá trị cố định: `0` | Màu chữ đen `#0F172A` |
| `-- Danh sách Đơn hàng theo Lô (Grid Table)` | Divider | - | - | - | Bảng hiển thị chi tiết các dòng kết quả |
| **Cột STT** | Text / Integer | - | N | Số thứ tự tăng dần từ 1 đến N | Căn giữa |
| **Cột Tên dịch vụ** | Text | - | N | Tên dịch vụ trích xuất từ file tải lên | Căn trái |
| **Cột Mã đơn hàng** | Text | - | N | Mã đơn hàng trích xuất từ file tải lên | Căn trái, font bán đậm |
| **Cột Số tiền TT** | Text / Currency | - | N | Định dạng số tiền có dấu phân cách hàng nghìn (ví dụ: `10.000`) | Căn phải |
| **Cột Ngày tạo đơn** | Text / Datetime | - | N | Định dạng `DD/MM/YYYY HH:mm:ss` | Căn giữa |
| **Cột Ngày hết hạn** | Text / Datetime | - | N | Định dạng `DD/MM/YYYY HH:mm:ss` | Căn giữa |
| **Cột Họ tên** | Text | - | N | Họ tên khách hàng trích xuất từ file | Căn trái |
| **Cột Email** | Text | - | N | Địa chỉ email khách hàng trích xuất từ file | Căn trái |
| **Cột Số điện thoại** | Text | - | N | Số điện thoại trích xuất từ file | Căn trái |
| **Cột Địa chỉ** | Text | - | N | Địa chỉ trích xuất từ file | Căn trái |
| **Cột Ngôn ngữ** | Text | - | N | Giá trị: `vi` hoặc `en` | Căn giữa |
| **Cột Link thanh toán** | Action Link | - | Y | Chữ `Copy` màu xanh `#2563EB` | Nhấp vào để sao chép đường dẫn payment link của đơn hàng tương ứng vào Clipboard. |
| **Cột Mã QR Link** | Action Link | - | Y | Chữ `Xem QR` màu xanh lá `#16A34A` | Nhấp vào để mở Popup xem chi tiết mã QR của link thanh toán (`PL-UC-05`). |
| `-- Thanh Phân trang (Pagination Bar)` | Divider | - | - | - | Cụm điều hướng phân trang cuối bảng |
| **Dòng thông tin bản ghi** | Label | - | N | Dạng: `Hiển thị 1 - 10 trong tổng số 48 đơn hàng` | Màu xám `#64748B`, font size 12px, căn trái |
| **Dropdown Số dòng / trang** | Dropdown list | O | Y | Các lựa chọn: `10 / trang`, `20 / trang`, `50 / trang`. Mặc định: `10 / trang` | Thay đổi số lượng dòng hiển thị trên mỗi trang bảng dữ liệu. |
| **Nút Trang trước [ ‹ ]** | Button | O | Y | Nền trắng viền xám, icon `‹`. Disabled khi đang ở trang 1 | Nhấp để lùi về trang trước đó. |
| **Nút Số trang [ 1 ], [ 2 ], [ 3 ]...** | Button Group | O | Y | Nút active có nền xanh `#2563EB` chữ trắng; nút khác nền trắng viền xám chữ tối | Nhấp vào số trang cụ thể để chuyển nhanh đến trang đó. |
| **Nút Trang sau [ › ]** | Button | O | Y | Nền trắng viền xám, icon `›`. Disabled khi đang ở trang cuối cùng | Nhấp để tiến tới trang tiếp theo. |
| **Ô Nhảy trang nhanh** | Textbox / Number | O | Y | Nhập số nguyên từ 1 đến tổng số trang; kèm nhãn `Đến trang` | Gõ số trang và nhấn Enter để chuyển trực tiếp đến trang mong muốn. |
| `-- Nút Thao tác Cuối Trang` | Divider | - | - | - | Cặp nút hành động cho toàn bộ lô đơn hàng |
| **Nút [Tải file link]** | Button | O | Y | Nền xanh lá `#16A34A`, chữ trắng `#FFFFFF`, kích thước `120x38` | Xuất và tải về tệp Excel tổng hợp danh sách đơn hàng đã được gắn cột link thanh toán. |
| **Nút [Gửi email]** | Button | O | Y | Nền xanh dương `#2563EB`, chữ trắng `#FFFFFF`, kích thước `110x38` | Kích hoạt hệ thống gửi email chứa thông tin thanh toán cho toàn bộ khách hàng trong lô. |

---

### 3.4. USE CASE 04: XỬ LÝ KẾT QUẢ TẠO LINK THEO LÔ — CÓ DÒNG DỮ LIỆU LỖI (`PL-UC-04`)

#### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE)

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Xử lý kết quả tạo link theo lô — Có lỗi (Batch Payment Link - Error Handling & Correction)** |
| **ID** | `PL-UC-04` |
| **Description** | Khi hệ thống phân tích tệp dữ liệu lô và phát hiện có ít nhất 01 dòng dữ liệu không hợp lệ (lỗi số tiền, email, hạn thanh toán, trùng mã...), hệ thống hiển thị bảng danh sách dữ liệu với nền trắng sạch sẽ (không phủ nền đỏ toàn dòng, không có banner cảnh báo đỏ lớn che khuất), tại cột `MÃ LỖI / CHI TIẾT LỖI` chỉ rõ nguyên nhân cụ thể của từng dòng lỗi, cột link thanh toán hiển thị trạng thái `Chưa tạo`, đồng thời cung cấp nút [Tải file lỗi (.xlsx)] để người dùng tải file kèm cột mô tả lỗi về chỉnh sửa và nút [Chọn lại file] để upload lại. |
| **Actor** | Merchant Admin, Merchant Staff |
| **Trigger** | Hệ thống hoàn tất kiểm tra tệp dữ liệu từ `PL-UC-02` và phát hiện có từ 01 dòng dữ liệu trở lên không hợp lệ. |
| **Pre-Condition** | Tệp tải lên chứa dữ liệu nhưng có các dòng vi phạm quy tắc validation (xem Bảng mã lỗi Mục 1.4). |
| **Post-Condition** | Các dòng dữ liệu hợp lệ tạm thời chưa kích hoạt link chính thức hoặc được lưu tạm; các dòng lỗi được ghi nhận mã lỗi; người dùng được cung cấp tệp Excel chứa dữ liệu lỗi để đối soát. |
| **Basic flow** | **1.** Hệ thống hiển thị Màn hình Tạo link theo lô — State 3: Đọc file có lỗi (Screen 6B).<br/>**2.** Hệ thống hiển thị số liệu thống kê: `Tổng số đơn hàng: N`, `Tổng số đơn hàng hợp lệ: X` (màu xanh lá), `Tổng số đơn hàng không hợp lệ: Y (Vui lòng kiểm tra mã lỗi)` (màu đỏ).<br/>**3.** Bảng danh sách hiển thị các dòng dữ liệu với **nền trắng sạch sẽ 100%** (không có nền đỏ hay hover đỏ trên các hàng).<br/>**4.** Tại mỗi dòng dữ liệu bị lỗi:<br/>&nbsp;&nbsp;&nbsp;&nbsp;- Trường thông tin bị lỗi được in chữ màu đỏ nổi bật (ví dụ: Số tiền = 0, Email = abc@invalid, Hạn TT trong quá khứ, Mã đơn trùng).<br/>&nbsp;&nbsp;&nbsp;&nbsp;- Tại cột **MÃ LỖI / CHI TIẾT LỖI**, hệ thống hiển thị badge thông báo chi tiết: `ERR_01: Số tiền thanh toán phải >= 10.000đ`, `ERR_02: Định dạng email không hợp lệ`, `ERR_03: Hạn thanh toán ở thời gian quá khứ`, `ERR_04: Trùng lặp mã đơn hàng trong file`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- Tại dòng hợp lệ, cột Mã lỗi hiển thị badge xanh `✓ Hợp lệ`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- Cột Link thanh toán của dòng lỗi hiển thị chữ màu xám `Chưa tạo`; cột Mã QR hiển thị dấu gạch ngang `-`.<br/>**5.** Người dùng nhấp nút **[Tải file lỗi (.xlsx)]** (màu đỏ) để xuất tệp Excel danh sách các dòng lỗi kèm theo một cột phụ ghi rõ lý do lỗi chi tiết của từng dòng.<br/>**6.** Người dùng mở file lỗi trên máy tính, thực hiện chỉnh sửa các ô sai lệch theo đúng hướng dẫn.<br/>**7.** Người dùng quay lại màn hình, nhấp nút **[Chọn lại file]** (màu xanh) để tải lên tệp đã được khắc phục lỗi và đọc lại file. |
| **Alternative flow** | **5a. Người dùng chỉ cần xem trực tiếp trên web:** Người dùng kiểm tra mã lỗi trực tiếp trên giao diện bảng mà không cần tải file nếu số lượng dòng lỗi ít. |
| **Exception flow** | **5b. Lỗi xuất file lỗi:** Nếu hệ thống gặp sự cố máy chủ khi tạo file excel lỗi -> Báo lỗi "Không thể tạo file đối soát lỗi. Vui lòng thử lại sau". |
| **Non-functional requirement** | Định vị chính xác dòng lỗi và hiển thị badge mô tả lỗi < 1.0 giây sau khi đọc file; tải file lỗi < 2.0 giây. |

#### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE)

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| `-- Khối Thống kê Trạng thái File Lô` | Divider | - | - | - | Tóm tắt tỷ lệ hợp lệ và không hợp lệ |
| **Tổng số đơn hàng** | Label | - | N | Hiển thị tổng số dòng trong file | Chữ đen `#0F172A` |
| **Tổng số đơn hàng hợp lệ** | Label | - | N | Hiển thị số lượng dòng hợp lệ | Chữ xanh lá `#16A34A` (ví dụ: `Tổng số đơn hàng hợp lệ: 2`) |
| **Tổng số đơn hàng không hợp lệ** | Label | - | N | Hiển thị số lượng dòng lỗi kèm lưu ý kiểm tra | Chữ đỏ cảnh báo `#DC2626` (ví dụ: `Tổng số đơn hàng không hợp lệ: 4 (Vui lòng kiểm tra mã lỗi)`) |
| `-- Danh sách Dữ liệu Lô & Chỉ báo Lỗi` | Divider | - | - | - | Bảng danh sách chi tiết |
| **Nền các dòng dữ liệu (Row BG)** | Container | - | - | Nền trắng `#FFFFFF` cho 100% các dòng, KHÔNG phủ màu đỏ / KHÔNG hover đỏ | Giữ giao diện sáng sủa, sạch sẽ theo quy chuẩn V2 UI |
| **Giá trị dữ liệu bị vi phạm** | Text | - | N | In màu đỏ `#DC2626` đối với các giá trị sai phạm (số tiền 0, email sai cú pháp...) | Giúp người dùng dễ dàng đối chiếu mắt thường |
| **Cột MÃ LỖI / CHI TIẾT LỖI** | Badge / Tag | - | N | - Dòng lỗi: Badge nền hồng nhạt `#FEE2E2`, viền đỏ, chữ đỏ `#DC2626` chứa mã lỗi và diễn giải ngắn.<br/>- Dòng hợp lệ: Badge nền xanh nhạt `#DCFCE7`, chữ xanh `#16A34A` hiển thị `✓ Hợp lệ`. | Cung cấp lý do chính xác vì sao dòng dữ liệu bị từ chối tạo link. |
| **Cột Link thanh toán** | Text | - | N | - Dòng lỗi: Hiển thị chữ `Chưa tạo` màu xám `#94A3B8`.<br/>- Dòng hợp lệ: Hiển thị dấu gạch ngang `-` (khi cả lô chưa hoàn tất). | Thông báo trạng thái link chưa thể phát hành do tệp có lỗi. |
| **Cột Mã QR Link** | Text | - | N | Hiển thị dấu gạch ngang `-` | Chưa phát hành QR khi lô còn lỗi. |
| `-- Thanh Phân trang (Pagination Bar)` | Divider | - | - | - | Thanh phân trang chuẩn |
| **Cụm phân trang** | Pagination Component | O | Y | Hiển thị thông tin dòng, nút lùi, trang hiện tại [1], nút tiến, chọn số dòng/trang | Giúp người dùng phân trang khi tệp lỗi có nhiều bản ghi. |
| `-- Nút Thao tác Xử lý Lỗi` | Divider | - | - | - | Cặp nút xuất lỗi và tải lại |
| **Nút [Tải file lỗi (.xlsx)]** | Button | M | Y | Nền đỏ `#DC2626`, icon tải xuống, chữ trắng `#FFFFFF`, kích thước `125x38` | Xuất và tải về tệp Excel chỉ gồm các dòng lỗi, kèm cột phụ `LÝ DO LỖI CHI TIẾT` để người dùng sửa đổi. |
| **Nút [Chọn lại file]** | Button | M | Y | Nền xanh `#2563EB`, chữ trắng `#FFFFFF`, kích thước `110x38` | Đưa người dùng quay về trạng thái chọn tệp nguồn để tải lên file đã chỉnh sửa. |
| **Dòng ghi chú hướng dẫn** | Label (Hint) | - | N | Biểu tượng bóng đèn vàng, chữ xám `#64748B`: `File lỗi sẽ xuất kèm lý do lỗi chi tiết ở từng dòng để bạn chỉnh sửa và tải lên lại.` | Hướng dẫn người dùng quy trình xử lý lỗi đối soát. |

---

### 3.5. USE CASE 05: XEM VÀ TẢI MÃ QR LINK THANH TOÁN DẠNG POPUP MODAL (`PL-UC-05`)

#### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE)

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Xem và tải mã QR link thanh toán dạng Popup Modal (View & Download Payment Link QR Modal)** |
| **ID** | `PL-UC-05` |
| **Description** | Cho phép Người dùng Merchant mở cửa sổ hộp thoại Popup (Modal Dialog) để xem chi tiết mã QR của một link thanh toán cụ thể, xem tóm tắt thông tin đơn hàng, sao chép nhanh URL thanh toán và tải file ảnh mã QR có độ phân giải cao về máy tính để in ấn hoặc gửi cho khách hàng. |
| **Actor** | Merchant Admin, Merchant Staff |
| **Trigger** | Người dùng nhấp vào nút hoặc liên kết **[Xem QR]** tại Màn hình danh sách link thanh toán hoặc tại cột Mã QR Link của Màn hình kết quả tạo lô (Screen 6). |
| **Pre-Condition** | Đơn hàng đã được tạo thành công và có mã QR hợp lệ trong hệ thống. |
| **Post-Condition** | Cửa sổ modal hiển thị mã QR và đường dẫn; tệp ảnh QR được tải xuống máy tính nếu người dùng yêu cầu. |
| **Basic flow** | **1.** Người dùng nhấp vào chữ **[Xem QR]** tại một dòng đơn hàng.<br/>**2.** Hệ thống hiển thị cửa sổ Modal Popup QR Dialog (Screen 1B) phủ lên trên màn hình hiện tại với lớp nền làm mờ (scrim/backdrop).<br/>**3.** Tại phần Header của Modal: Hiển thị icon liên kết, tiêu đề **"Mã QR link thanh toán"**, badge hiển thị **Mã đơn hàng** (ví dụ: `ORD-20261015-089`) và nút đóng [✕].<br/>**4.** Tại khối Thông tin tóm tắt: Hiển thị Tên dịch vụ (ví dụ: `Combo Cà phê Đậm vị`), Số tiền thanh toán in to đậm màu xanh `#2563EB` (ví dụ: `450,000 VND`), Tên và Email khách hàng, Thời gian hết hạn thanh toán in màu xanh lá.<br/>**5.** Tại hộp Payment Link Box: Hiển thị toàn bộ đường dẫn thanh toán rút gọn/đầy đủ kèm nút **[Sao chép]**. Người dùng bấm nút để copy link.<br/>**6.** Tại khối Hình ảnh QR: Hiển thị mã QR Code rõ nét ở kích thước 180x180px, bên cạnh có nút **[⬇ Tải mã QR link]**. Người dùng bấm nút để tải file ảnh `qr-link-{orderCode}.png` về máy tính.<br/>**7.** Người dùng nhấp nút **[Đóng]** hoặc nút [✕] ở góc phải để đóng modal và quay lại màn hình trước đó. |
| **Alternative flow** | **7a. Đóng bằng phím tắt / click ngoài:** Người dùng nhấn phím `ESC` trên bàn phím hoặc click chuột vào vùng nền xám bên ngoài hộp thoại để đóng popup. |
| **Exception flow** | **6a. Lỗi tải ảnh:** Nếu trình duyệt bị chặn download tự động -> Hiển thị thông báo "Vui lòng cho phép trình duyệt tải tệp xuống để lưu mã QR". |
| **Non-functional requirement** | Thời gian mở modal và hiển thị ảnh QR < 0.3 giây. |

#### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE)

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| `-- Header Modal Popup` | Divider | - | - | - | Khu vực thanh tiêu đề popup |
| **Tiêu đề Popup** | Label | - | N | Text: `Mã QR link thanh toán`, font size 14 bold | Căn trái |
| **Badge Mã đơn hàng** | Badge Pill | - | N | Nền xanh nhạt `#EFF6FF`, chữ xanh `#2563EB`, bo tròn | Hiển thị mã đơn hàng tương ứng của QR Code |
| **Nút Đóng [✕]** | Icon Button | O | Y | Ký tự `✕` ở góc phải trên cùng | Nhấp để đóng cửa sổ modal |
| `-- Khối Tóm tắt Thông tin Đơn hàng` | Divider | - | - | - | Thông tin tóm tắt phía trên |
| **Tên sản phẩm / Dịch vụ** | Label | - | N | Tên đơn hàng đã nhập khi tạo | Font size 13px, màu `#1E293B` |
| **Số tiền thanh toán** | Label / Amount | - | N | Số tiền định dạng chuẩn kèm đơn vị (ví dụ: `450,000 VND`) | Font size 18px bold, màu xanh Brand `#2563EB` |
| **Thông tin Khách hàng** | Label | - | N | Dạng: `Khách hàng: Nguyễn Văn An (an.nguyen@example.com)` | Font size 11px, màu `#64748B` |
| **Hạn thanh toán** | Label / Datetime | - | N | Dạng: `Hạn thanh toán: 16/10/2026 14:30:00` | Font size 11px, màu xanh lá cây `#16A34A` |
| `-- Khối Link Thanh toán & Sao chép` | Divider | - | - | - | Hộp hiển thị URL thanh toán |
| **Hộp chứa Link** | Textbox (Readonly) | - | N | Nền xám nhạt `#F1F5F9`, hiển thị URL thanh toán hoàn chỉnh | Người dùng có thể bôi đen copy thủ công |
| **Nút [Sao chép]** | Button | O | Y | Nền trắng viền xám, icon clipboard, chữ `#334155` | Nhấp để copy URL vào Clipboard; hiển thị tooltip toast "Đã sao chép". |
| `-- Khối Mã QR Code & Tải ảnh` | Divider | - | - | - | Khu vực hiển thị mã QR |
| **Hình ảnh Mã QR** | Image | - | N | Mã QR Code đen trắng, kích thước 180x180px, chuẩn sửa lỗi M | Quét bằng ứng dụng camera hoặc Zalo sẽ nhận diện link thanh toán |
| **Nút [⬇ Tải mã QR link]** | Button / Link | O | Y | Icon tải xuống, chữ xanh `#2563EB` | Tải file ảnh mã QR định dạng PNG độ nét cao về máy |
| `-- Nút Đóng Footer` | Divider | - | - | - | Chân trang modal |
| **Nút [Đóng]** | Button | O | Y | Nền trắng viền xám `#CBD5E1`, chữ `#475569`, kích thước `90x38`, bo góc 6px | Đóng popup modal, trở lại màn hình danh sách |

---

### 3.6. USE CASE 06: KHÁCH HÀNG MỞ LINK & XÁC NHẬN ĐIỀU KHOẢN THANH TOÁN (`PL-UC-06`)

#### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE)

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Khách hàng mở link & Xác nhận Điều khoản thanh toán (Customer Payment Link Terms Confirmation)** |
| **ID** | `PL-UC-06` |
| **Description** | Khi khách hàng nhấp vào đường dẫn Payment Link hoặc quét mã QR từ điện thoại di động/máy tính, hệ thống hiển thị trang Hosted Form xác nhận thanh toán (Screen 26:4 bản Tiếng Việt hoặc Screen 64:4 bản Tiếng Anh). Giao diện phân tách rõ ràng thành 3 khối thông tin: Khối 1 - Đơn vị cung cấp hàng hóa, Khối 2 - Khách hàng, Khối 3 - Đơn hàng. Khách hàng bắt buộc phải tích chọn đồng ý với Điều khoản & Điều kiện dịch vụ thì nút [Tiếp tục thanh toán] mới được kích hoạt để chuyển sang trang chọn phương thức thanh toán. |
| **Actor** | Khách hàng (Customer / Người mua hàng) |
| **Trigger** | Khách hàng nhấp vào đường link thanh toán nhận được qua email/SMS hoặc quét mã QR thanh toán bằng camera điện thoại. |
| **Pre-Condition** | Đơn hàng đang ở trạng thái `Chờ thanh toán` (`PENDING`) và chưa vượt quá thời gian hết hạn (`expire_time`). |
| **Post-Condition** | Khách hàng xác nhận đồng ý điều khoản dịch vụ và được chuyển hướng sang trang chọn phương thức thanh toán (MH01.1). |
| **Basic flow** | **1.** Khách hàng mở link thanh toán trên trình duyệt.<br/>**2.** Hệ thống tải thông tin đơn hàng từ Core CTT và hiển thị Màn hình Xác nhận điều khoản thanh toán (Screen 26:4 cho tiếng Việt hoặc Screen 64:4 cho tiếng Anh).<br/>**3.** Khách hàng kiểm tra thông tin tại 3 khối chuyên biệt:<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Khối 1 (Thông tin Đơn vị Cung cấp Hàng hóa):** Logo/Avatar đối tác, Tên Merchant, Mã số thuế / Hotline, Thẻ "Đại lý phân phối chính thức".<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Khối 2 (Thông tin Khách hàng):** Họ và tên khách hàng, Số điện thoại, Email nhận biên lai.<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Khối 3 (Thông tin Đơn hàng):** Mã đơn hàng, Tên sản phẩm/dịch vụ, Số tiền cần thanh toán, Hạn thanh toán, Nội dung đơn hàng.<br/>**4.** Khách hàng đọc dòng cam kết và tích chọn vào ô Checkbox: `Tôi đã đọc và đồng ý với Điều khoản & Điều kiện sử dụng dịch vụ thanh toán`.<br/>&nbsp;&nbsp;&nbsp;&nbsp;*(Nếu khách hàng nhấp vào chữ "Điều khoản & Điều kiện", hệ thống mở Popup xem chi tiết điều khoản theo `PL-UC-07`).*<br/>**5.** Ngay khi ô Checkbox được tích chọn, nút **[Tiếp tục thanh toán]** tự động chuyển từ trạng thái Disable (mờ, không thể bấm) sang trạng thái Active (màu xanh đậm `#2563EB`).<br/>**6.** Khách hàng nhấp nút **[Tiếp tục thanh toán]**.<br/>**7.** Hệ thống kiểm tra lại trạng thái đơn hàng thời gian thực: Đơn hàng hợp lệ -> Chuyển hướng khách hàng sang Trang chọn phương thức thanh toán (MH01.1: Thẻ ATM nội địa, Thẻ quốc tế Visa/Master, Ví điện tử, VietQR). |
| **Alternative flow** | **2a. Khách hàng chuyển đổi ngôn ngữ:** Khách hàng nhấp vào biểu tượng lá cờ [VI / EN] trên thanh header để chuyển đổi hiển thị giữa Tiếng Việt và Tiếng Anh. |
| **Exception flow** | **2b. Đơn hàng đã hết hạn:** Khách hàng mở link sau thời điểm hết hạn -> Hệ thống hiển thị trang thông báo lỗi: "Đơn hàng đã hết hạn thanh toán. Vui lòng liên hệ người bán để nhận link thanh toán mới".<br/>**2c. Đơn hàng đã được thanh toán thành công trước đó:** Khách hàng mở lại link đã thanh toán -> Hệ thống hiển thị: "Đơn hàng này đã được thanh toán thành công vào lúc {thời gian}. Quý khách vui lòng kiểm tra email để xem hóa đơn". |
| **Non-functional requirement** | Thời gian tải trang Hosted Form < 1.0 giây; tương thích giao diện hoàn hảo trên cả trình duyệt Desktop và Mobile Safari/Chrome. |

#### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE)

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| `-- Header Hosted Form` | Divider | - | - | - | Thanh điều hướng trên cùng của trang thanh toán |
| **Logo EPAY** | Image | - | N | Logo nhận diện thương hiệu cổng thanh toán EPAY | Căn trái |
| **Chuyển đổi Ngôn ngữ [VI / EN]** | Toggle Button | O | Y | Biểu tượng cờ Việt Nam (VI) và cờ Vương quốc Anh (EN) | Nhấp để đổi toàn bộ giao diện và điều khoản sang tiếng Việt hoặc tiếng Anh. |
| **Mã đơn hàng Header** | Label | - | N | Hiển thị mã đơn hàng dạng: `Mã đơn: ORD-20261015-089` | Căn phải |
| `-- Khối 1: Thông tin Đơn vị Cung cấp Hàng hóa` | Divider | - | - | - | Nhận diện thông tin người bán / Merchant |
| **Avatar / Logo Merchant** | Image / Container | - | N | Kích thước 44x44px, bo tròn, hiển thị avatar hoặc logo đại diện | Nhận diện đơn vị bán hàng uy tín |
| **Tên đơn vị bán hàng** | Label | - | N | Tên thương hiệu / Công ty của Merchant (ví dụ: `Công ty TNHH Cà phê Việt Nam`) | Font chữ đậm 14px, màu `#0F172A` |
| **Mã số thuế / Hotline đối tác** | Label | - | N | Thông tin pháp nhân: `MST: 0102030405 • Hotline: 1900 6475` | Màu xám `#64748B`, font size 11px |
| **Badge "Đại lý chính thức"** | Badge Pill | - | N | Thẻ nền xanh nhạt, chữ xanh: `Đại lý phân phối chính thức` | Khẳng định tính xác thực của merchant |
| `-- Khối 2: Thông tin Khách hàng` | Divider | - | - | - | Thông tin người thanh toán |
| **Họ và tên khách hàng** | Label | - | N | Hiển thị họ tên khách hàng nhận đơn | Font size 12px, màu `#1E293B` |
| **Số điện thoại** | Label | - | N | Số điện thoại khách hàng (ví dụ: `0985 263 431`) | Font size 12px, màu `#1E293B` |
| **Email nhận thông báo** | Label | - | N | Địa chỉ email nhận hóa đơn (ví dụ: `an.nguyen@example.com`) | Font size 12px, màu `#1E293B` |
| `-- Khối 3: Thông tin Đơn hàng Thanh toán` | Divider | - | - | - | Thông tin tài chính và sản phẩm của đơn hàng |
| **Mã đơn hàng** | Label | - | N | Hiển thị mã đơn hàng trong khung thông tin đơn hàng | Font chữ bán đậm, màu `#0F172A` |
| **Tên sản phẩm / Dịch vụ** | Label | - | N | Tên hàng hóa dịch vụ (ví dụ: `Combo Cà phê Đậm vị`) | Font chữ đậm 13px |
| **Số tiền thanh toán** | Label / Amount | - | N | Số tiền in to rõ nét kèm đơn vị (ví dụ: `450,000 VND` hoặc `$19.99 USD`) | Font size 20px bold, màu xanh Brand `#2563EB` |
| **Hạn thanh toán** | Label / Datetime | - | N | Thời gian hết hạn của đơn hàng (ví dụ: `16/10/2026 14:30:00`) | Màu xanh lá `#16A34A` |
| **Nội dung đơn hàng** | Label | - | N | Diễn giải ghi chú đơn hàng của merchant | Màu xám `#64748B` |
| `-- Khối Xác nhận Điều khoản` | Divider | - | - | - | Khu vực điều khoản bắt buộc |
| **Checkbox Đồng ý Điều khoản \*** | Checkbox | M | Y | Trạng thái mặc định: `Chưa tích (Unchecked)`. Bắt buộc tích chọn để tiếp tục | Khi tích chọn: kích hoạt nút [Tiếp tục thanh toán]. Khi bỏ tích: vô hiệu hóa nút. |
| **Liên kết "Điều khoản & Điều kiện"** | Hyperlink | - | Y | Chữ màu xanh `#2563EB`, gạch chân khi hover: `Điều khoản & Điều kiện sử dụng dịch vụ` | Nhấp vào để mở Popup hiển thị toàn bộ nội dung văn bản điều khoản (`PL-UC-07`). |
| `-- Nút Thao tác Tiếp tục` | Divider | - | - | - | Nút submit chuyển bước thanh toán |
| **Nút [Tiếp tục thanh toán]** | Button | M | Y | - Trạng thái Unchecked: Nền xám `#94A3B8`, opacity 0.5, cursor not-allowed.<br/>- Trạng thái Checked: Nền xanh `#2563EB`, chữ trắng, kích thước full width `444x48px`. | Nhấp để xác nhận đồng ý điều khoản và chuyển sang bước chọn Phương thức thanh toán (PTTT). |

---

### 3.7. USE CASE 07: XEM MODAL ĐIỀU KHOẢN & ĐIỀU KIỆN DỊCH VỤ THANH TOÁN (`PL-UC-07`)

#### 📌 PHẦN 1: BẢNG ĐẶC TẢ USE CASE TỔNG QUAN (USE CASE SPECIFICATION TABLE)

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Xem Modal Điều khoản & Điều kiện Dịch vụ Thanh toán (Payment Terms & Conditions Modal View)** |
| **ID** | `PL-UC-07` |
| **Description** | Khi khách hàng nhấp vào liên kết chữ "Điều khoản & Điều kiện" tại trang Hosted Form xác nhận thanh toán, hệ thống hiển thị cửa sổ Modal Popup (Screen 26:147) chứa toàn văn quy chế, điều khoản bảo mật, quyền và trách nhiệm của khách hàng và trung gian thanh toán EPAY; người dùng có thể cuộn đọc toàn bộ nội dung và bấm nút [Tôi đồng ý] để tự động đóng modal và tích chọn checkbox đồng ý điều khoản. |
| **Actor** | Khách hàng (Customer / Người mua hàng) |
| **Trigger** | Khách hàng nhấp vào cụm chữ gạch chân **"Điều khoản & Điều kiện"** trên trang Screen 26:4 hoặc Screen 64:4. |
| **Pre-Condition** | Khách hàng đang ở màn hình xác nhận điều khoản thanh toán. |
| **Post-Condition** | Khách hàng đã đọc điều khoản và có thể bấm đồng ý để hệ thống tự động tích chọn checkbox trên màn hình chính. |
| **Basic flow** | **1.** Khách hàng nhấp vào dòng chữ "Điều khoản & Điều kiện".<br/>**2.** Hệ thống hiển thị Modal popup `Terms Modal Dialog` kích thước `580x680px` tại trung tâm màn hình, có lớp nền mờ che phủ xung quanh.<br/>**3.** Tiêu đề modal hiển thị: **"Điều khoản & Điều kiện sử dụng dịch vụ thanh toán"** (hoặc tiếng Anh tương ứng).<br/>**4.** Khung nội dung `Terms Content Box` hiển thị toàn bộ các mục điều khoản pháp lý: Phạm vi áp dụng, Quy định bảo mật thông tin, Quyền và nghĩa vụ của người mua, Quy định xử lý giao dịch và khiếu nại, Biện pháp phòng chống gian lận. Khung có thanh cuộn dọc (scrollable) để khách hàng đọc hết nội dung.<br/>**5.** Khách hàng có 2 lựa chọn thao tác:<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Lựa chọn 1:** Nhấp nút **[Tôi đồng ý]** (màu xanh) -> Hệ thống tự động đóng modal và tự động **tích chọn ô Checkbox đồng ý điều khoản** trên màn hình Hosted Form chính, đồng thời kích hoạt nút [Tiếp tục thanh toán].<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **Lựa chọn 2:** Nhấp nút **[Đóng]** hoặc nút [✕] góc phải -> Đóng modal, giữ nguyên trạng thái checkbox trước đó trên màn hình chính. |
| **Alternative flow** | **5a. Đóng bằng click bên ngoài:** Khách hàng click chuột ra ngoài vùng modal dialog để đóng popup. |
| **Exception flow** | Không có ngoại lệ kỹ thuật nghiêm trọng. Trường hợp mất kết nối mạng nội dung tĩnh vẫn được cache để hiển thị. |
| **Non-functional requirement** | Tốc độ mở modal tức thì (< 0.1 giây), cuộn mượt mà trên màn hình cảm ứng điện thoại. |

#### 📌 PHẦN 2: BẢNG ĐẶC TẢ THÀNH PHẦN GIAO DIỆN CHI TIẾT (MAIN UI COMPONENT TABLE)

| Component Name | Data Type | Validation rules: M/O/C | Validation rules: Editable | Validation rules: Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| `-- Header Modal Điều khoản` | Divider | - | - | - | Thanh tiêu đề modal điều khoản |
| **Tiêu đề Modal** | Label | - | N | Text: `Điều khoản & Điều kiện sử dụng dịch vụ thanh toán` (hoặc `Payment Terms & Conditions`) | Font size 15px bold, màu `#0F172A` |
| **Nút Đóng [✕]** | Icon Button | O | Y | Ký tự `✕` ở góc phải trên cùng | Nhấp để đóng modal mà không thay đổi trạng thái checkbox |
| `-- Khung Nội dung Điều khoản` | Divider | - | - | - | Toàn văn điều khoản pháp lý |
| **Khung Scroll Điều khoản** | Scrollable Box | - | N | Khung chứa văn bản, kích thước `532x504px`, có thanh cuộn dọc | Chứa toàn bộ nội dung quy định thanh toán, chính sách bảo mật và hoàn tiền |
| `-- Nút Thao tác Footer Modal` | Divider | - | - | - | Cặp nút hành động cuối modal |
| **Nút [Đóng]** | Button | O | Y | Nền trắng viền xám `#CBD5E1`, chữ `#475569`, kích thước `100x38` | Đóng popup modal, giữ nguyên trạng thái checkbox màn hình chính |
| **Nút [Tôi đồng ý]** | Button | M | Y | Nền xanh Brand `#2563EB`, chữ trắng `#FFFFFF`, kích thước `196x38` | Đóng popup modal, ĐỒNG THỜI tự động tích chọn checkbox đồng ý điều khoản trên màn hình chính và active nút Tiếp tục thanh toán. |

---

## 4. QUY TẮC NGHIỆP VỤ LIÊN THÔNG (BUSINESS RULES)

### BR-PL-01: Quy tắc Duy nhất của Mã đơn hàng (Order Code Uniqueness)
1. Mỗi Merchant có một không gian mã đơn hàng độc lập.
2. Mã đơn hàng không được phép trùng lặp giữa các đơn hàng đang hoạt động hoặc đã kết thúc của cùng một Merchant.
3. Khi tạo theo lô, nếu trong cùng một file upload có từ 2 dòng trở lên trùng mã đơn hàng, hệ thống đánh dấu lỗi `ERR_04` cho toàn bộ các dòng bị trùng.

### BR-PL-02: Quy tắc Khung thời gian Hiệu lực và Hết hạn (Time Window Validity)
1. `Thời gian hiệu lực` phải lớn hơn hoặc bằng ngày giờ hiện tại tại thời điểm tạo đơn.
2. `Thời gian hết hạn` phải lớn hơn `Thời gian hiệu lực` và không được vượt quá `Thời gian hiệu lực + 15 ngày`.
3. Sau mốc thời gian hết hạn, Core CTT tự động chuyển trạng thái đơn hàng sang `Hết hạn` (`EXPIRED`). Mọi truy cập vào link thanh toán sau thời điểm này đều bị từ chối xử lý giao dịch.

### BR-PL-03: Quy tắc Định dạng và Bản quyền Mã QR Link Thanh toán
1. Mã QR sinh ra tại tính năng này là **Mã QR của Payment Link** (chứa URL truy cập Hosted Form), **tuyệt đối KHÔNG phải là mã VietQR chuyển khoản ngân hàng tĩnh**.
2. Khi khách hàng dùng ứng dụng Camera hoặc Zalo quét mã QR, ứng dụng sẽ nhận diện đường link thanh toán và mở trình duyệt để khách hàng truy cập màn hình xác nhận điều khoản và chọn PTTT.

### BR-PL-04: Quy tắc Đọc File Lô và Hiển thị Bảng Lỗi (Batch Error Presentation)
1. Khi phát hiện file tải lên có dòng lỗi, hệ thống hiển thị bảng danh sách các dòng với **nền trắng sạch sẽ (KHÔNG phủ màu đỏ / KHÔNG hover màu đỏ trên các hàng)**.
2. Tuyệt đối không hiển thị banner cảnh báo đỏ lớn che khuất tầm nhìn của bảng.
3. Các trường bị lỗi được highlight chữ màu đỏ, cột `MÃ LỖI / CHI TIẾT LỖI` hiển thị badge thông báo lỗi tương ứng (`ERR_01` đến `ERR_06`), cột link thanh toán hiển thị `Chưa tạo`.
4. Xuất file lỗi phải giữ nguyên 100% dữ liệu gốc của merchant và bổ sung thêm 01 cột `LÝ DO LỖI CHI TIẾT` ở cuối bảng để người dùng đối soát.

### BR-PL-05: Quy tắc Bắt buộc Xác nhận Điều khoản Trước khi Thanh toán
1. Khách hàng bắt buộc phải tích chọn xác nhận `Tôi đã đọc và đồng ý với Điều khoản & Điều kiện sử dụng dịch vụ thanh toán` mới được phép bấm nút `[Tiếp tục thanh toán]`.
2. Hệ thống lưu vết thời điểm xác nhận điều khoản (timestamp, IP, User-Agent) vào nhật ký giao dịch phục vụ công tác tra soát khiếu nại sau này.
