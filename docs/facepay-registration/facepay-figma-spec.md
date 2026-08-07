# TÀI LIỆU BÓC TÁCH GIAO DIỆN & CẤU TRÚC DESIGN FIGMA (CHUẨN 100% NGUYÊN BẢN)
## LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0

---

## 1. DÁNH SÁCH BÓC TÁCH TOÀN BỘ VĂN BẢN (TEXT & LABELING 1:1)

### 1.1. TIÊU ĐỀ SƠ ĐỒ (CANVAS TITLE)
- **Tiêu đề chính:** `LUỒNG ĐĂNG KÝ FACEPAY TRÊN ỨNG DỤNG PETROLIMEX 2.0` (Màu xanh `#0E3A7E`, in hoa, in đậm, căn giữa).

---

### 1.2. 6 BƯỚC HÀNG TRÊN (STEPS 1 TO 6 HEADERS)
1. **Bước 1:**
   - Số bước: Nút tròn da cam `#F05A21`, số `1` trắng.
   - Nội dung: `KH đăng ký tài khoản trên Petrolimex 2.0 (xác thực sinh trắc học)`.
2. **Bước 2:**
   - Số bước: Nút tròn da cam `#F05A21`, số `2` trắng.
   - Nội dung: `Hệ thống lưu trữ sinh trắc học`.
3. **Bước 3:**
   - Số bước: Nút tròn da cam `#F05A21`, số `3` trắng.
   - Nội dung: `KH thực hiện liên kết token thanh toán với thẻ nội địa/ thẻ quốc tế`.
4. **Bước 4:**
   - Số bước: Nút tròn da cam `#F05A21`, số `4` trắng.
   - Nội dung: `Hệ thống Petrolimex gửi yêu cầu liên kết token đến CTT Epay`.
5. **Bước 5:**
   - Số bước: Nút tròn da cam `#F05A21`, số `5` trắng.
   - Nội dung: `CTT Epay trả về token liên kết tương ứng`.
6. **Bước 6:**
   - Số bước: Nút tròn da cam `#F05A21`, số `6` trắng.
   - Nội dung: `KH cài đặt nguồn tiền thanh toán sinh trắc học`.

---

### 1.3. BÓC TÁCH THÀNH PHẦN CHI TIẾT TRONG 6 KHỐI (HÀNG GIỮA)

#### 📱 KHỐI 1 (MÀN HÌNH 1):
- **Giao diện Điện thoại 1:**
  - Header: Logo da cam chữ **P** + `PETROLIMEX 2.0` + `Đăng ký tài khoản`.
  - Ô Nhập 1: `Số điện thoại`.
  - Ô Nhập 2: `Mật khẩu`.
  - Nút chính: `Đăng ký` (Da cam `#F05A21`).
  - Khung quét Face ID: Khung bo góc có 4 góc vuông xanh lá (`#10B981`), bên trong có ảnh minh họa chân dung người dùng (mái tóc đen, nụ cười, áo xanh).
  - Trạng thái bên dưới: Icon Check xanh lá + text `Xác thực sinh trắc học (thành công)`.
- **Chú thích phía dưới:** `KH đăng ký tài khoản và thực hiện xác thực sinh trắc học (Face ID)`.

#### ☁️ KHỐI 2 (HỆ THỐNG LƯU TRỮ):
- Nền Đám mây màu xanh nhạt (`#E1EFFE`).
- Tủ Server 2 ngăn màu xanh thẫm (`#0E3A7E`) có đèn LED.
- Badge Ổ khóa tròn màu xanh thẫm.
- Text bên trong đám mây: `Hệ thống lưu trữ sinh trắc học (được mã hóa)`.
- **Chú thích phía dưới:** `Hệ thống Petrolimex 2.0 lưu trữ dữ liệu sinh trắc học của KH an toàn, bảo mật`.

#### 💳 KHỐI 3 (MÀN HÌNH 2):
- **Giao diện Điện thoại 2:**
  - Header: `Liên kết thẻ`.
  - Option 1: Icon thẻ xanh thẫm + Text `Thẻ nội địa` + Subtext `NAPAS`.
  - Option 2: Icon thẻ xanh thẫm + Text `Thẻ quốc tế` + Subtext `VISA / Mastercard / JCB...`.
  - Khoảng trống giữa màn hình.
  - Nút chính: `Tiếp tục` (Da cam `#F05A21`) ở đáy màn hình.
- **Chú thích phía dưới:** `KH chọn và nhập thông tin thẻ nội địa hoặc thẻ quốc tế để liên kết token thanh toán`.

#### ⚙️ KHỐI 4 (PETROLIMEX GATEWAY):
- Box Server: Tủ server + Logo **P** + `PETROLIMEX 2.0`.
- Dòng 1: Icon bánh răng xanh ngọc + Text `Gửi yêu cầu liên kết token đến CTT Epay (qua API bảo mật)`.
- Dòng 2: Icon Khiên bảo mật xanh thẫm + Text `Xác thực & truyền dữ liệu an toàn`.

#### 🏦 KHỐI 5 (CTT EPAY):
- Logo `epay`: 3 chấm tròn xanh ngọc dạng cánh hoa + Chữ `epay`.
- Badge Khiên tròn xanh thẫm + Text `Xử lý liên kết và tạo token`.
- Nét đứt chỉ xuống Thẻ Token: Header `TOKEN` chữ trắng trên nền xanh thẫm (`#1E50A2`) + Mã hóa `********`.
- **Chú thích phía dưới:** `CTT Epay xác thực thông tin, xử lý và trả về token liên kết tương ứng`.

#### ⚙️ KHỐI 6 (MÀN HÌNH 3):
- **Giao diện Điện thoại 3:**
  - Header: `Nguồn tiền thanh toán (FacePay)`.
  - Item Thẻ: Text `VISA` + `•••• 1234`.
  - Setting: Subtitle `Thanh toán bằng tính trắc học` + Icon Face ID xanh ngọc + **Toggle Switch ON** (Nền xanh lá `#10B981`).
  - Khoảng trống giữa màn hình.
  - Nút chính: `Hoàn tất` (Da cam `#F05A21`) ở đáy màn hình.
- **Chú thích phía dưới:** `KH chọn thẻ đã liên kết làm nguồn tiền mặc định và bật thanh toán sinh trắc học (FacePay)`.

---

### 1.4. BỚC 7 (HÀNG DƯỚI) & CÁC ĐƯỜNG NỐI
- **Nối 1:** Mũi tên nét đứt từ chú thích Bước 2 chỉ thẳng xuống `Dữ liệu sinh trắc học (đã mã hóa)`.
- **Nối 2:** Mũi tên nét đứt từ chú thích Bước 6 chỉ thẳng xuống `Lưu trữ an toàn, bảo mật theo chuẩn bảo mật của Petrolimex`.
- **Số bước 7:** Nút tròn da cam `#F05A21`, số `7` trắng.
- **Tiêu đề Bước 7:** `Hệ thống Petrolimex 2.0 lưu trữ thông tin sinh trắc học với token tương ứng`.
- **Khung nét đứt bên trái:** Icon Face ID `Dữ liệu sinh trắc học (đã mã hóa)` + Dấu `+` + Box `TOKEN ********` + `Token thanh toán tương ứng`.
- **Khung bên phải:** Icon Ổ khóa + `Lưu trữ an toàn, bảo mật theo chuẩn bảo mật của Petrolimex`.

---

### 1.5. FOOTER BANNER
- Capsule nền xanh nhạt (`#E8F1F9`) + Icon Khiên bảo mật + Text in đậm:
  `Bảo mật – An toàn – Tuân thủ quy định của Ngân hàng Nhà nước và các tiêu chuẩn bảo mật quốc tế`.
