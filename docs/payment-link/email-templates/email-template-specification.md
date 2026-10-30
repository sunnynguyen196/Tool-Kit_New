# TÀI LIỆU ĐẶC TẢ EMAIL TEMPLATE HỆ THỐNG PAYMENT LINK
## PHÂN HỆ LINK THANH TOÁN (PAYMENT LINK MANAGEMENT) - EPAY PORTAL

---

> **Mã tài liệu:** `EPAY-SPEC-EMAIL-01`  
> **Dự án:** Cổng Thanh toán Epay Portal 2.0  
> **Áp dụng cho:** Tính năng Tạo link thanh toán đơn lẻ (`PL-UC-01`) & Tạo link thanh toán theo lô (`PL-UC-03`)  
> **Ngôn ngữ hỗ trợ:** Tiếng Việt (`vi`) và Tiếng Anh (`en`)  
> **Trạng thái:** SẴN SÀNG TRIỂN KHAI (APPROVED)  

---

## 1. MỤC ĐÍCH & QUY TẮC KÍCH HOẠT GỬI EMAIL (TRIGGER RULES)

### 1.1. Mục đích
Hệ thống tự động hoặc theo lệnh của Quản trị viên/Nhân viên Merchant gửi email chứa **Link thanh toán duy nhất** và **Mã QR link thanh toán** đến địa chỉ email của Khách hàng, giúp khách hàng:
1. Nhận diện rõ ràng đơn vị bán hàng, mã đơn hàng, chi tiết dịch vụ và số tiền cần thanh toán.
2. Truy cập thanh toán an toàn, nhanh chóng bằng cách bấm nút **[Thanh toán ngay]** hoặc **quét mã QR** bằng Camera điện thoại / Zalo.
3. Nắm rõ thời hạn hiệu lực của đơn hàng để hoàn tất trước khi link hết hạn.

### 1.2. Các sự kiện kích hoạt (Trigger Events)
| STT | Sự kiện kích hoạt (Event) | Nơi thực hiện | Người nhận | Mẫu email áp dụng |
|:---:|---|---|---|---|
| 1 | **Nhấn nút [Gửi email] tại màn hình Tạo Link Đơn lẻ** | Giao diện Screen 3 (Sau khi tạo link thành công) | Khách hàng của đơn hàng | `EMAIL_PAYMENT_REQUEST_VI` hoặc `EMAIL_PAYMENT_REQUEST_EN` |
| 2 | **Nhấn nút [Gửi email hàng loạt] tại màn hình Tạo Link Theo Lô** | Giao diện Screen 6 (Sau khi đọc file lô hợp lệ) | Toàn bộ khách hàng có email hợp lệ trong lô | `EMAIL_PAYMENT_REQUEST_VI` hoặc `EMAIL_PAYMENT_REQUEST_EN` (tùy cột `Ngôn ngữ` từng dòng) |
| 3 | **Hệ thống tự động gửi sau khi tạo đơn qua Open API** | Merchant tích hợp Server-to-Server gọi API Tạo link | Khách hàng theo `customer_email` | Tương ứng theo trường `locale` (`vi`/`en`) |
| 4 | **Khách hàng thanh toán thành công qua Cổng EPAY** | Core CTT nhận IPN từ Ngân hàng/Ví | Khách hàng & Merchant Admin | `EMAIL_PAYMENT_SUCCESS_VI` hoặc `EMAIL_PAYMENT_SUCCESS_EN` |

---

## 2. TỪ ĐIỂN DỮ LIỆU BIẾN ĐỘNG (DYNAMIC PLACEHOLDERS / VARIABLES)

Các biến sau sẽ được Template Engine (Handlebars, Thymeleaf, Jinja2 hoặc tương đương) thay thế tự động khi xuất email:

| Tên Biến Placeholder | Kiểu dữ liệu | Ví dụ thực tế | Diễn giải nghiệp vụ |
|---|---|---|---|
| `{{merchant_name}}` | String | Công ty CP Giải pháp Giáo dục Quốc tế | Tên thương hiệu/pháp nhân Đơn vị cung cấp hàng hóa/dịch vụ |
| `{{merchant_logo_url}}`| URL | `https://cdn.epay.vn/merchants/logo-default.png` | Logo của Merchant (nếu chưa cấu hình sẽ lấy logo mặc định) |
| `{{customer_name}}` | String | Nguyễn Văn An | Họ và tên khách hàng nhận email |
| `{{customer_email}}`| String | `an.nguyen@example.com` | Địa chỉ email người nhận |
| `{{customer_phone}}`| String | `0912 345 678` | Số điện thoại khách hàng (định dạng dễ đọc) |
| `{{customer_address}}`| String | Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội | Địa chỉ nhận hàng / liên hệ của khách hàng |
| `{{order_code}}` | String | `ORD-20261015-089` | Mã định danh đơn hàng do Merchant quy định |
| `{{service_name}}` | String | Khóa học Lập trình Web Fullstack K12 | Tên hàng hóa, sản phẩm hoặc gói dịch vụ cung cấp |
| `{{amount}}` | String / Number | `5,000,000` | Số tiền thanh toán (format dấu phẩy/chấm phân cách nghìn) |
| `{{currency}}` | String | `VND` (hoặc `USD`) | Đơn vị tiền tệ của đơn hàng |
| `{{created_time}}` | Datetime | `15/10/2026 14:30:00` | Thời điểm tạo link thanh toán |
| `{{expire_time}}` | Datetime | `20/10/2026 23:59:00` | Thời điểm hết hạn hiệu lực của đơn hàng |
| `{{payment_url}}` | URL | `https://pay.epay.vn/pl/8a7b9c2d1e` | Đường link truy cập trang thanh toán Hosted Form |
| `{{qr_code_image_url}}`| URL | `https://pay.epay.vn/api/v2/qr?code=8a7b9c2d1e` | Đường dẫn ảnh mã QR của link thanh toán |
| `{{merchant_hotline}}` | String | `1900 1234` | Hotline chăm sóc khách hàng của Merchant |
| `{{merchant_email}}` | String | `support@merchant.com` | Email tiếp nhận khiếu nại/hỗ trợ của Merchant |
| `{{epay_hotline}}` | String | `1900 6470` | Tổng đài hỗ trợ Cổng thanh toán EPAY (24/7) |
| `{{epay_support_email}}`| String | `hotro@epay.vn` | Email hỗ trợ kỹ thuật cổng thanh toán EPAY |

---

## 3. MẪU 1: EMAIL THÔNG BÁO LINK THANH TOÁN & YÊU CẦU THANH TOÁN (TIẾNG VIỆT)

### 3.1. Thông tin Tiêu đề & Header
* **Sender Name:** `{{merchant_name}} via Cổng thanh toán EPAY`
* **From Address:** `no-reply@pay.epay.vn` (hoặc domain riêng của Merchant nếu cấu hình Custom Sender)
* **Reply-To:** `{{merchant_email}}`
* **Tiêu đề Email (Subject):**  
  `[Thông báo thanh toán] Yêu cầu thanh toán đơn hàng #{{order_code}} - {{merchant_name}}`
* **Preheader / Preview text:**  
  `Quý khách có yêu cầu thanh toán số tiền {{amount}} {{currency}} cho đơn hàng #{{order_code}}. Hạn thanh toán đến {{expire_time}}. Nhấn để thanh toán ngay.`

---

### 3.2. Nội dung chi tiết (Bản văn bản & Cấu trúc hiển thị)

```
================================================================================
                          [LOGO MERCHANT]   |   [LOGO EPAY]
================================================================================

                           THÔNG BÁO YÊU CẦU THANH TOÁN
               Mã đơn hàng: #{{order_code}}  •  Hạn chót: {{expire_time}}

Kính gửi Quý khách {{customer_name}},

Đơn vị cung cấp {{merchant_name}} trân trọng gửi đến Quý khách thông tin đơn hàng 
và yêu cầu thanh toán trực tuyến thông qua Cổng thanh toán EPAY.

--------------------------------------------------------------------------------
                             THÔNG TIN THANH TOÁN
--------------------------------------------------------------------------------
1. THÔNG TIN ĐƠN VỊ CẤP HÀNG HÓA
   • Tên đơn vị: {{merchant_name}}
   • Hotline hỗ trợ: {{merchant_hotline}}
   • Email hỗ trợ: {{merchant_email}}

2. THÔNG TIN KHÁCH HÀNG
   • Họ và tên: {{customer_name}}
   • Số điện thoại: {{customer_phone}}
   • Email nhận thông báo: {{customer_email}}
   • Địa chỉ: {{customer_address}}

3. THÔNG TIN ĐƠN HÀNG
   • Tên dịch vụ / Sản phẩm: {{service_name}}
   • Mã đơn hàng: {{order_code}}
   • Thời gian tạo đơn: {{created_time}}
   • Thời hạn thanh toán: {{expire_time}}

--------------------------------------------------------------------------------
   SỐ TIỀN THANH TOÁN:  {{amount}} {{currency}}
--------------------------------------------------------------------------------

                           ┌───────────────────────────┐
                           │    [ THANH TOÁN NGAY ]    │  --> Nhấn để mở trang thanh toán
                           └───────────────────────────┘
               Đường link thanh toán: {{payment_url}}

                                      - HOẶC -

                [ HÌNH ẢNH MÃ QR ]     MÃ QR LINK THANH TOÁN
                   160 x 160 px        Quét mã QR bằng Camera điện thoại hoặc 
               {{qr_code_image_url}}   ứng dụng Zalo/Trình quét để mở trang xác 
                                       nhận điều khoản và thanh toán nhanh chóng.

--------------------------------------------------------------------------------
LƯU Ý QUAN TRỌNG & BẢO MẬT:
• Link thanh toán này có hiệu lực đến hết ngày {{expire_time}}. Sau thời gian này, 
  hệ thống sẽ tự động hủy đơn và khóa link để bảo đảm an toàn.
• Khi truy cập link hoặc quét mã QR, Quý khách sẽ được xem chi tiết 3 khối thông tin 
  và xác nhận "Điều kiện & Điều khoản dịch vụ" trước khi chọn phương thức thanh toán.
• EPAY và {{merchant_name}} tuyệt đối KHÔNG BAO GIỜ yêu cầu Quý khách cung cấp 
  Mật khẩu, Mã OTP Ngân hàng hay Số thẻ qua Email hoặc Điện thoại.
• Nếu cần hỗ trợ thêm thông tin đơn hàng, vui lòng liên hệ hotline: {{merchant_hotline}}.
--------------------------------------------------------------------------------

Hệ thống Cổng Thanh toán Trực tuyến EPAY (Vietnam Payment Solution)
Hotline CSKH Cổng TT: 1900 6470  •  Email: hotro@epay.vn  •  Website: https://epay.vn
Địa chỉ: Tầng 14, Tòa tháp Diamond, Số 35 Lê Văn Lương, Cầu Giấy, Hà Nội
(Đây là email gửi tự động từ hệ thống, Quý khách vui lòng không phản hồi thư này)
```

---

## 4. MẪU 2: PAYMENT REQUEST EMAIL TEMPLATE (ENGLISH VERSION)

Áp dụng tự động khi đơn hàng có cấu hình `Ngôn ngữ = Tiếng Anh (en)`.

### 4.1. Header & Subject
* **Sender Name:** `{{merchant_name}} via EPAY Payment Gateway`
* **From Address:** `no-reply@pay.epay.vn`
* **Reply-To:** `{{merchant_email}}`
* **Subject:**  
  `[Payment Notice] Payment request for order #{{order_code}} - {{merchant_name}}`
* **Preheader / Preview text:**  
  `You have a payment request of {{amount}} {{currency}} for order #{{order_code}}. Due date: {{expire_time}}. Click to pay securely.`

---

### 4.2. Detailed English Body Structure

```
================================================================================
                          [MERCHANT LOGO]   |   [EPAY LOGO]
================================================================================

                           PAYMENT REQUEST NOTIFICATION
                 Order ID: #{{order_code}}  •  Due Date: {{expire_time}}

Dear {{customer_name}},

{{merchant_name}} has generated a secure payment link for your order via 
EPAY Payment Gateway. Please find your order details and payment instructions below:

--------------------------------------------------------------------------------
                              PAYMENT SUMMARY
--------------------------------------------------------------------------------
1. MERCHANT INFORMATION
   • Merchant Name: {{merchant_name}}
   • Hotline: {{merchant_hotline}}
   • Support Email: {{merchant_email}}

2. CUSTOMER INFORMATION
   • Full Name: {{customer_name}}
   • Phone Number: {{customer_phone}}
   • Email Address: {{customer_email}}
   • Billing/Shipping Address: {{customer_address}}

3. ORDER DETAILS
   • Product / Service: {{service_name}}
   • Order Reference: {{order_code}}
   • Created Date: {{created_time}}
   • Expiration Date: {{expire_time}}

--------------------------------------------------------------------------------
   TOTAL AMOUNT DUE:  {{amount}} {{currency}}
--------------------------------------------------------------------------------

                           ┌───────────────────────────┐
                           │       [ PAY NOW ]         │  --> Click to proceed to checkout
                           └───────────────────────────┘
                Direct Payment Link: {{payment_url}}

                                      - OR -

                [ QR CODE IMAGE ]      PAYMENT LINK QR CODE
                   160 x 160 px        Scan this QR code using your Smartphone Camera 
               {{qr_code_image_url}}   or QR scanner to review Terms & Conditions 
                                       and complete your payment securely.

--------------------------------------------------------------------------------
IMPORTANT SECURITY & TRANSACTION NOTES:
• This payment link is valid until {{expire_time}}. After this period, the link 
  will automatically expire to safeguard your transaction.
• Upon clicking the link or scanning the QR code, you will be redirected to EPAY's 
  secure hosted page to accept the Terms & Conditions before selecting payment methods.
• EPAY and {{merchant_name}} will NEVER ask for your Bank Password, OTP, or Card CVV 
  via email, phone, or messaging apps.
• If you need assistance regarding this order, please contact: {{merchant_hotline}}.
--------------------------------------------------------------------------------

EPAY Payment Solutions JSC - Licensed Payment Intermediary by State Bank of Vietnam
Support Hotline: 1900 6470  •  Email: hotro@epay.vn  •  Website: https://epay.vn
Headquarters: 14th Floor, Diamond Flower Tower, 35 Le Van Luong St., Cau Giay, Hanoi
(This is an automated notification. Please do not reply directly to this email)
```

---

## 5. MẪU 3: EMAIL THÔNG BÁO XÁC NHẬN THANH TOÁN THÀNH CÔNG (PAYMENT RECEIPT)

Gửi tự động cho Khách hàng ngay sau khi Core CTT ghi nhận giao dịch thành công.

* **Subject:** `[Xác nhận thanh toán] Đơn hàng #{{order_code}} đã thanh toán thành công - {{merchant_name}}`
* **Preheader:** `Giao dịch số tiền {{amount}} {{currency}} cho đơn hàng #{{order_code}} đã được xác nhận thành công. Xem biên lai điện tử tại đây.`
* **Nội dung chính:**
  * Thông báo giao dịch hoàn tất kèm mã giao dịch Cổng EPAY (`{{transaction_id}}`).
  * Phương thức thanh toán khách đã dùng: `{{payment_method}}` (Thẻ ATM nội địa, Thẻ quốc tế Visa/Master, Quét QR VNPAY, Ví điện tử...).
  * Thời gian hoàn tất thanh toán: `{{paid_at}}`.
  * Nút **[Tải biên lai thanh toán (PDF)]** và link theo dõi trạng thái đơn hàng.

---

## 6. QUY CHUẨN KỸ THUẬT HTML & CHỐNG SPAM (DELIVERABILITY BEST PRACTICES)

1. **Thiết kế Chuẩn Responsive Table-based:**
   - Chiều rộng container chính: Max `600px` (chuẩn công nghiệp tối ưu mọi màn hình di động).
   - Sử dụng thẻ `<table>`, `<tr>`, `<td>` với thuộc tính `border="0" cellpadding="0" cellspacing="0"` để tương thích 100% với Microsoft Outlook (desktop engine Word) và Apple Mail.
2. **Inline CSS 100%:**
   - Toàn bộ thuộc tính CSS được inline trực tiếp vào từng thẻ (không dùng thẻ `<style>` ngoài trừ media queries).
   - Font chữ hệ thống an toàn: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.
3. **Mã QR tối ưu hiển thị:**
   - Mã QR được chèn qua thẻ `<img>` có kích thước cố định `width="160" height="160"` kèm thuộc tính `alt="Mã QR link thanh toán"`.
   - Có đường link chữ `{{payment_url}}` bên dưới để dự phòng trường hợp ứng dụng mail chặn hình ảnh.
4. **Tiêu chuẩn Deliverability & Tránh Spam:**
   - Cấu hình bản ghi tên miền gửi: **SPF**, **DKIM**, **DMARC** hợp lệ cho domain `pay.epay.vn`.
   - Tỷ lệ Text/Image cân đối: Text chiếm > 75% diện tích email để không bị Gmail đánh dấu là Promotion/Spam.
   - Luôn có thông tin pháp lý đơn vị vận hành (EPAY Portal) và địa chỉ thực ở chân trang.
