# TÀI LIỆU MÔ TẢ USE CASE CHI TIẾT
## TÍNH NĂNG QUẢN LÝ TRA SOÁT (DISPUTE MANAGEMENT)

---

> **Mã tài liệu:** `EPAY-QT.CG.02_BM33`  
> **Dự án:** Hệ thống Quản lý Tra soát Epay - Petrolimex 2.0  
> **Phiên bản:** `v2.1` (Cập nhật Chi tiết 3 Luồng Tra soát: TCYCTS Có kiểm tra, TCYCTS Không kiểm tra & TCTLTS Trả lời YCTS Thụ động)  
> **Trạng thái:** APPROVED / READY FOR IMPLEMENTATION  

---

## 1. TỔNG QUAN KIẾN TRÚC VÀ LUỒNG DỮ LIỆU CẮT LỚP (LOGIC CẮT LỚP V2.1)

Phân hệ Quản lý Tra soát vận hành trên cơ chế quản lý dữ liệu song song 2 tầng DB độc lập (DB Service QR và DB Merchant Management - MM) kết hợp **Cấu trúc Trạng thái 3 Nhóm** để quản lý 3 luồng xử lý chính:

```
+-----------------------------------------------------------------------------------+
| 1. TRẠNG THÁI TIẾN TRÌNH TRA SOÁT (PCTS / DISPUTE PROCESS PROGRESS)               |
| (Quản lý tiến trình xử lý vòng đời bản ghi tại hệ thống MM)                       |
| [Chờ xử lý] -> [Đã hủy] -> ([Đã kiểm tra]) -> [Chờ phê duyệt] -> [Đã phê duyệt]   |
|            -> [Xử lý thất bại] -> [Chờ phản hồi] -> [Đã phản hồi] -> [Hoàn tất]   |
+-----------------------------------------------------------------------------------+
                                      |
               +----------------------+----------------------+
               |                                             |
               v (Khi GW/QR phản hồi)                        v (Khi quá SLA)
+------------------------------------+     +------------------------------------+
| 2. TRẠNG THÁI XỬ LÝ YCTS TẠI EPAY  |     | 3. TRẠNG THÁI TRA SOÁT HẾT HẠN     |
| (Mã trạng thái được lưu tại MM)    |     | (Trạng thái quá hạn SLA)           |
| - OPEN (Napas status: OPEN)        |     | - Chưa hết hạn (Mặc định)          |
| - PRCD (Napas status: EXPR/PRCD)   |     | - Đã hết hạn (QRGW báo IPN: EXPI)  |
| - RJCD (Napas status: RJCD/EXRJ)   |     |                                    |
+------------------------------------+     +------------------------------------+
```

### 1.1. Luồng TCYCTS CÓ Kỹ thuật Kiểm tra (2 Swimlanes Diagram)
- **Số Swimlanes:** 2 Swimlanes (`Hệ thống QRGW (TT YCTS tại đối tác)`, `Hệ thống MM (TT YCTS tại Epay)`).
- **Tiến trình:** Bản ghi YCTS được tạo ở **"Chờ xử lý"** ➔ Inspector thực hiện xác minh và nhấp **[Xác nhận Đã kiểm tra]** ➔ Chuyển Tiến trình sang **"Đã kiểm tra"** ➔ Maker nhấp **[Gửi yêu cầu phê duyệt]** ➔ Chuyển Tiến trình sang **"Chờ phê duyệt"** và **sinh 01 bản ghi YCPD (ApprovePending)**.

### 1.2. Luồng TCYCTS KHÔNG CÓ Kỹ thuật Kiểm tra (2 Swimlanes Diagram)
- **Số Swimlanes:** 2 Swimlanes (`Hệ thống QRGW (TT YCTS tại đối tác)`, `Hệ thống MM (TT YCTS tại Epay)`).
- **Tiến trình:** Bản ghi YCTS được tạo ở **"Chờ xử lý"** ➔ Bỏ qua bước Inspector ➔ Maker nhấp **[Gửi yêu cầu phê duyệt]** trực tiếp ➔ Chuyển Tiến trình sang **"Chờ phê duyệt"** và **sinh 01 bản ghi YCPD (ApprovePending)**.

### 1.3. Luồng TCTLTS Trả lời Yêu cầu Tra soát Thụ động (2 Swimlanes Diagram)
- **Số Swimlanes:** 2 Swimlanes (`Hệ thống QRGW (TT YCTS tại đối tác)`, `Hệ thống MM (TT YCTS tại Epay)`).
- **Tiến trình:** Cổng Service QR nhận YCTS thụ động (TS-014) từ Napas ➔ Đồng bộ API sang MM ➔ **Hệ thống MM BẮT BUỘC insert 01 bản ghi YCTS với trạng thái Tiến trình ban đầu là "Chờ xử lý"** ➔ Maker lập câu trả lời (`PRCD` - Đồng ý hoặc `RJCD` - Từ chối) ➔ Nhấp **[Gửi phê duyệt]** ➔ Chuyển Tiến trình sang **"Chờ phê duyệt"** và **sinh 01 bản ghi YCPD (ApprovePending)** ➔ Checker phê duyệt ➔ phát hành câu trả lời sang Napas.

---

## 2. MA TRẬN PHÂN QUYỀN (RBAC) VÀ QUY TẮC HIỂN THỊ NÚT THAO TÁC (LOGIC V2.1)

### 2.1. Ma trận Phân quyền theo Vai trò

| Mã UC | Tên Use Case | Maker (Chuyên viên / Thu ngân) | Inspector (Người kiểm tra) | Checker (Trưởng nhóm / Quản lý) | Operator / Viewer (Vận hành / Tra cứu) |
|---|---|:---:|:---:|:---:|:---:|
| **BF29.1-UC01** | Tra cứu & Xem danh sách Tra soát | ✅ Xem danh sách | ✅ Xem danh sách | ✅ Xem danh sách | ✅ Xem danh sách & Xuất Excel |
| **BF29.1-UC02** | Lập Yêu cầu Tra soát mới (TCYCTS) | ✅ Khởi tạo (Tiến trình: *Chờ xử lý*) | ❌ Không tạo mới | ❌ Chỉ xem | ❌ Chỉ xem |
| **BF29.1-UC02.1** | Kiểm tra YCTS (Dành cho Inspector) | ❌ | ✅ **[Xác nhận Đã kiểm tra]** | ❌ | ❌ |
| **BF29.1-UC03** | Phê duyệt Nội bộ YCPD | ❌ Không tự duyệt | ❌ | ✅ **[Đồng ý Phê duyệt]** / **[Từ chối Phê duyệt]** | ❌ Chỉ xem |
| **BF29.1-UC04** | Tiếp nhận & Phản hồi Tra soát (TCTLTS) | ✅ Lập câu trả lời (Gửi YCPD) | ❌ | ❌ | ❌ Chỉ xem |
| **BF29.1-UC05** | Xem chi tiết & Lịch sử xử lý | ✅ Xem chi tiết | ✅ Xem chi tiết | ✅ Xem chi tiết | ✅ Xem chi tiết |
| **BF29.1-UC06** | Cập nhật / Hủy YCTS & YCPD | ✅ Cập nhật ở *Đã kiểm tra* & *Chờ phê duyệt*; Hủy YCPD ở *Chờ phê duyệt* | ❌ | ❌ | ❌ Chỉ xem |

---

## 3. MÔ TẢ BỘ TRẠNG THÁI HỆ THỐNG MỚI (CẤU TRÚC 3 NHÓM TRẠNG THÁI LOGIC V2.1)

### 3.1. Nhóm 1: Trạng thái Tiến trình Tra soát (PCTS / Process Progress)
| Mã Trạng thái Tiến trình | Tên Trạng thái | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|
| **`Chờ xử lý`** (Pending) | Chờ xử lý | Bản ghi YCTS vừa được Maker tạo mới trên hệ thống MM hoặc bản ghi TCTLTS (TS-014) vừa được Service QR nhận từ Napas đồng bộ sang MM. |
| **`Đã hủy`** (Cancelled) | Đã hủy | Bản ghi YCTS bị Maker chủ động hủy bỏ tại mốc Chờ xử lý hoặc Chờ phê duyệt. |
| **`Đã kiểm tra`** (Inspected) | Đã kiểm tra | *(Chỉ có ở Luồng TCYCTS CÓ kiểm tra)* Inspector đã kiểm tra dữ liệu và bấm **[Xác nhận Đã kiểm tra]**. |
| **`Chờ phê duyệt`** *(ApprovePending)* | Chờ phê duyệt | Maker bấm **[📤 Gửi yêu cầu phê duyệt]**, YCTS chuyển Chờ phê duyệt và **sinh ra 01 bản ghi YCPD** (`ApprovePending`). |
| **`Đã phê duyệt`** (Approved) | Đã phê duyệt | Quản lý (Checker) bấm **[✅ Đồng ý Phê duyệt]**, hệ thống duyệt bản ghi YCPD và phát hành lệnh gửi sang Napas. |
| **`Xử lý thất bại`** (Process Failure) | Xử lý thất bại | Phát sinh lỗi validation định dạng dữ liệu hoặc lỗi kết nối mạng khi gửi thông điệp từ MM sang Cổng Service QR. |
| **`Chờ phản hồi`** (Waiting Response) | Chờ phản hồi | Cổng Service QR phát hành thông điệp sang Napas thành công (`OPEN`), chờ kết quả đối tác. |
| **`Đã phản hồi`** (Responded) | Đã phản hồi | Cổng Service QR nhận thông điệp kết quả từ Napas. Tự động gán **Trạng thái xử lý YCTS** hoặc **Trạng thái Tra soát hết hạn**. |
| **`Hoàn tất`** (Completed) | Hoàn tất | Quy trình tra soát và hạch toán hoàn tiền/báo có đã kết thúc hoàn toàn trên toàn hệ thống. |

### 3.2. Nhóm 2: Trạng thái Xử lý YCTS tại Epay / MM (Processing Outcome Status)
| Trạng thái Xử lý YCTS tại Epay | Tên Tiếng Anh | Mã QRGW/Gateway Map | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|---|
| **`—`** | None | `—` | Mặc định ban đầu khi chưa gửi hoặc chưa phát sinh kết quả từ đối tác. |
| **`OPEN`** | Open | `OPEN` | Khi QRGW tiếp nhận phản hồi từ đối tác thông báo trạng thái `OPEN` (đối tác đang xử lý). |
| **`PRCD`** | Processed | `EXPR` / `PRCD` / Hoàn trả TC / Báo có TC | **[TCYCTS]** Đối tác đồng ý/chấp nhận hoàn tiền/báo có.<br/>**[TCTLTS]** Khi QRGW thông báo: Hoàn trả thành công, Báo có thành công, hoặc nhận IPN thành công sau hết hạn. |
| **`RJCD`** | Rejected | `RJCD` / `EXRJ` / Hoàn trả TB / Báo có TB | **[TCYCTS]** Đối tác phản hồi từ chối yêu cầu tra soát.<br/>**[TCTLTS]** Khi QRGW thông báo: Hoàn trả thất bại, Báo có thất bại, hoặc nhận IPN thất bại sau hết hạn. |

### 3.3. Nhóm 3: Trạng thái Tra soát Hết hạn YCTS (Expiration Status)
| Trạng thái Tra soát Hết hạn | Tên Tiếng Anh | Mã Gateway Map | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|---|
| **`Chưa hết hạn`** | Unexpired | `—` | Mặc định ban đầu khi giao dịch trong thời hạn SLA xử lý. |
| **`Đã hết hạn`** | Expired | `EXPI` | Khi QRGW nhận thông báo IPN từ đối tác với trạng thái `EXPI` (quá hạn SLA), hệ thống MM cập nhật từ Chưa hết hạn sang Đã hết hạn. |

---

## 4. CHI TIẾT CÁC USE CASE NGHIỆP VỤ & BẢNG ĐẶC TẢ GIAO DIỆN CHUẨN EPAY-QT.CG.02_BM33

### 4.1. Use Case 1: Tra cứu và xem danh sách yêu cầu tra soát (`DS01-UC01 / BF29.1-UC01`)

#### 4.1.1. Bảng Đặc tả Use Case

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Tra cứu và xem danh sách yêu cầu tra soát** |
| **ID** | **BF29.1-UC01 / DS01-UC01** |
| **Description** | Tra cứu kết quả và xem danh sách các yêu cầu tra soát giao dịch thanh toán theo Cấu trúc Trạng thái 3 Nhóm (*Tiến trình tra soát*, *Trạng thái xử lý YCTS*, *Trạng thái Tra soát hết hạn*). |
| **Actor** | Người dùng (Maker, Inspector, Checker, Operator), Hệ thống Merchant Management, DB Service QR |
| **Trigger** | Người dùng truy cập menu **[Quản lý tra soát]** > **[Tra soát đã gửi]** hoặc **[Tra soát đã nhận]**. |
| **Pre-Condition** | - Tài khoản người dùng đã được cấp quyền truy cập tính năng Quản lý tra soát.<br/>- Người dùng đã đăng nhập thành công vào hệ thống epay Portal. |
| **Post-Condition** | Hệ thống hiển thị danh sách các bản ghi tra soát thỏa mãn điều kiện lọc kèm thông tin thống kê tổng tiền. |
| **Basic flow** | 1. Người dùng chọn mục **[Quản lý tra soát]** tại menu bên trái.<br/>2. Chọn **[Tra soát đã gửi]** (hoặc **[Tra soát đã nhận]**).<br/>3. Hệ thống hiển thị Màn hình Quản lý tra soát với các trường lọc, thanh Tab tiến trình (`Tất cả`, `Chờ xử lý`, `Đã kiểm tra`, `Chờ phê duyệt`, `Chờ phản hồi`, `Đã phản hồi`, `Hoàn tất`, `Đã hủy`) và Table Grid.<br/>4. Người dùng chọn/nhập điều kiện lọc và nhấp nút **[Tìm kiếm]**.<br/>5. Hệ thống truy vấn DB MM và DB Service QR, trả về danh sách kết quả phù hợp trên Table Grid kèm thông tin thống kê tổng tiền giao dịch. |
| **Non-functional requirement** | Thời gian hiển thị danh sách kết quả < 2.0 giây cho 1,000 bản ghi. |

---

#### 4.1.2. Bảng Đặc tả Giao diện Chi tiết Chuẩn Template `EPAY-QT.CG.02_BM33`

| Component Name | Data Type | Validation rules (M/O/C) | Editable | Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| **Quản lý tra soát đã gửi** | Label | M | N | - | Tiêu đề màn hình quản lý tra soát đã gửi. |
| **`-- Điều kiện tìm kiếm/ lọc tab "Tất cả"`** | | | | | |
| **MERCHANT CODE** | Dropdown list | O | Y | Single selection | Giá trị mặc định là 'Tất cả'. Lọc các bản ghi thuộc ĐVCNTT/Cửa hàng thuộc quyền quản lý. |
| **ĐỐI TÁC THANH TOÁN** | Dropdown list | O | Y | Single selection | Giá trị mặc định là 'Ví Epay'. Lọc danh sách theo đối tác/kênh xử lý thanh toán giao dịch gốc. |
| **TIẾN TRÌNH TRA SOÁT** | Dropdown list | O | Y | Single selection | Lọc theo 9 trạng thái Tiến trình (*Chờ xử lý, Đã hủy, Đã kiểm tra, Chờ phê duyệt, Đã phê duyệt, Xử lý thất bại, Chờ phản hồi, Đã phản hồi, Hoàn tất*). |
| **TRẠNG THÁI XỬ LÝ YCTS** | Dropdown list | O | Y | Single selection | Lọc theo kết quả trả lời khi Tiến trình = Đã phản hồi (*Đồng ý, Từ chối*). |
| **TRẠNG THÁI TRA SOÁT HẾT HẠN** | Dropdown list | O | Y | Single selection | Lọc theo tình trạng quá hạn SLA khi Tiến trình = Đã phản hồi (*Hết hạn*). |
| **LOẠI TRA SOÁT** | Dropdown list | O | Y | Single selection | Mặc định là 'RQRN (Hoàn tiền)'. Cho phép chọn mã loại tra soát: RQRN, RQNF, RQSP. |
| **NGƯỜI TẠO** | Textbox | O | Y | Max 50 ký tự | Nhập từ khóa tên tài khoản Chuyên viên (Maker) khởi tạo yêu cầu tra soát. |
| **THỜI GIAN TẠO** | Date Picker | M | Y | Tối đa 90 ngày | Lọc các yêu cầu tra soát phát sinh trong khoảng thời gian chọn (Mặc định 30 ngày gần nhất). |
| **NGƯỜI PHÊ DUYỆT** | Textbox | O | Y | Max 50 ký tự | Nhập từ khóa tên tài khoản Quản lý (Checker) thực hiện phê duyệt/từ chối bản ghi. |
| **`-- Button chức năng`** | | | | | |
| **Xóa bộ lọc** | Button | O | Y | - | Khi nhấp nút này, hệ thống xóa toàn bộ giá trị điều kiện lọc đang chọn và khôi phục form bộ lọc về mặc định. |
| **Tìm kiếm** | Button | O | Y | Primary Action | Lấy các giá trị điều kiện trên form, truy vấn DB QR & MM và hiển thị danh sách kết quả lên Table Grid. |
| **+ Tạo yêu cầu tra soát** | Button | O | Y | Role Maker | Tham chiếu đến mục **BF29.1-UC02: Lập yêu cầu tra soát giao dịch TCYCTS**. Mở màn hình tạo mới (Tiến trình *Chờ xử lý*). |
| **Tùy chỉnh** | Button | O | Y | - | Cho phép chọn list trường tin hiển thị trên Table GridView. Hệ thống lưu cấu hình tùy chỉnh theo user, theo tab. |
| **`-- Danh sách các tab tại màn hình quản lý tra soát`** | | | | | |
| **Tất cả** | Tab | - | - | - | Tab mặc định. Hiển thị tất cả yêu cầu tra soát không phân biệt tiến trình. Sắp xếp giảm dần theo Ngày tạo. |
| **Chờ xử lý** | Tab | - | - | - | Hiển thị tất cả danh sách các bản ghi YCTS vừa được khởi tạo tại MM hoặc từ Napas đồng bộ sang ở Tiến trình **'Chờ xử lý'**. |
| **Đã kiểm tra** | Tab | - | - | - | Hiển thị danh sách các bản ghi YCTS đã được Người kiểm tra xác minh ở Tiến trình **'Đã kiểm tra'** (Dành cho luồng cần kiểm tra). |
| **Chờ phê duyệt** | Tab | - | - | - | Hiển thị danh sách các bản ghi đang ở Tiến trình **'Chờ phê duyệt'** và đã sinh ra bản ghi YCPD tại DB MM. |
| **Chờ phản hồi** | Tab | - | - | - | Hiển thị danh sách bản ghi đã được phát hành sang Napas thành công (Service QR status `OPEN`), đang ở Tiến trình **'Chờ phản hồi'**. |
| **Đã phản hồi** | Tab | - | - | - | Hiển thị danh sách bản ghi đã nhận kết quả từ Napas (Tiến trình **'Đã phản hồi'**), hiển thị Trạng thái xử lý YCTS (*Đồng ý, Từ chối*) hoặc Trạng thái hết hạn (*Hết hạn*). |
| **Hoàn tất** | Tab | - | - | - | Hiển thị các bản ghi tra soát đã kết thúc hoàn toàn quy trình hạch toán đối soát ở Tiến trình **'Hoàn tất'**. |
| **Đã hủy** | Tab | - | - | - | Hiển thị danh sách các bản ghi bị Maker hủy bỏ ở Tiến trình **'Đã hủy'**. |
| **`-- Thanh tìm kiếm nhanh`** | | | | | |
| **Quicksearch** | Textbox | O | Y | Max 100 ký tự | Text hướng dẫn: "Tìm kiếm theo mã tra soát, loại tra soát, mã giao dịch gốc...". Nhập thông tin ấn enter. Chuyển tab Quicksearch giữ nguyên. |
| **`-- Chi tiết cột dữ liệu trên danh sách`** | | | | | |
| **Trường tin** | - | - | - | - | Tham chiếu tại mục **2.2.5 Danh sách trường tin tùy chỉnh**. |
| **Phân trang** | - | - | - | - | Sử dụng rule chung hiển thị tổng bản ghi, phân trang MM (Ví dụ: `Tổng tiền giao dịch: 9,850,000 VND | 06 kết quả`). |

---

#### 4.1.3. Danh sách trường tin tùy chỉnh

| STT | Trường tin | Lựa chọn mặc định | Mô tả & Action Rules (Hyperlink Use Cases) |
|---|---|:---:|---|
| **Tab "Tất cả", "Chờ xử lý", "Đã kiểm tra", "Chờ phê duyệt", "Chờ phản hồi", "Đã phản hồi", "Hoàn tất", "Đã hủy"** | | | |
| 1 | **STT** | Y | Số thứ tự hiển thị tăng dần trong danh sách theo trang. |
| 2 | **Mã tra soát** | Y | Mã định danh duy nhất của yêu cầu tra soát (VD: `TS-003`, `TS-014`).<br/>👉 **Tham chiếu đến mục BF29.1-UC05: Xem chi tiết & Lịch sử xử lý tra soát**. Nhấp vào mã để mở màn hình chi tiết. |
| 3 | **Loại tra soát** | Y | Mã loại tra soát chuẩn Napas: `RQRN` (Hoàn tiền), `RQNF` (Thông báo), `RQSP` (Tra soát số tiền). |
| 4 | **Tiến trình tra soát** | Y | Trạng thái Tiến trình vòng đời YCTS gắn badge màu: 🟡 `Chờ xử lý`, 🔵 `Đã kiểm tra`, 🟠 `Chờ phê duyệt`, 🟣 `Chờ phản hồi`, 🟢 `Đã phản hồi`, 🔘 `Hoàn tất`, 🔴 `Đã hủy` / `Xử lý thất bại`. |
| 5 | **Trạng thái xử lý YCTS** | Y | Kết quả xử lý khi Tiến trình = *Đã phản hồi*: 🟢 **Đồng ý**, 🔴 **Từ chối** (`—` nếu chưa phản hồi). |
| 6 | **Trạng thái Tra soát hết hạn** | Y | Tình trạng quá mốc SLA khi Tiến trình = *Đã phản hồi*: 🟠 **Hết hạn** (`—` nếu trong hạn SLA). |
| 7 | **Vai trò tra soát** | Y | Chiều giao dịch tra soát: `TCYCTS` (Tra soát đã gửi - Chủ động) hoặc `TCTLTS` (Tra soát đã nhận - Thụ động). |
| 8 | **Mã GD gốc** | Y | Mã định danh duy nhất của giao dịch thanh toán gốc liên quan (VD: `TX-10003`, `TX-10014`). |
| 9 | **Loại GD gốc** | Y | Loại hình dịch vụ của giao dịch gốc (VD: Thanh toán hàng hóa, Chuyển tiền...). |
| 10 | **Thời gian tạo** | Y | Ngày giờ hệ thống ghi nhận khởi tạo bản ghi tra soát tại MM. |
| 11 | **Thời gian xử lý** | Y | Ngày giờ hoàn tất phê duyệt / phản hồi kết quả tra soát (`—` nếu chưa hoàn tất). |
| 12 | **Thao tác** | Y | Hiển thị biểu tượng 3 chấm `[⋮]`. Khi nhấp mở menu hành động chứa các hyperlink:<br/>- **[👁️ Xem chi tiết]**: Tham chiếu đến mục **BF29.1-UC05 (Xem chi tiết tra soát)**.<br/>- **[🔍 Xác nhận Kiểm tra]**: Tham chiếu đến mục **BF29.1-UC02.1** *(Inspector khi Tiến trình Chờ xử lý)*.<br/>- **[✏️ Cập nhật thông tin]**: Tham chiếu đến mục **BF29.1-UC06** *(Maker khi Tiến trình Đã kiểm tra / Chờ phê duyệt)*.<br/>- **[📤 Gửi yêu cầu phê duyệt]**: Tham chiếu đến mục **BF29.1-UC02 / UC06** *(Maker khi Tiến trình Đã kiểm tra / Chờ xử lý)*.<br/>- **[❌ Hủy bỏ yêu cầu]**: Tham chiếu đến mục **BF29.1-UC06** *(Maker khi Tiến trình Chờ xử lý / Chờ phê duyệt)*.<br/>- **[✅ Phê duyệt / ❌ Từ chối]**: Tham chiếu đến mục **BF29.1-UC03** *(Checker khi Tiến trình Chờ phê duyệt)*. |

---

### 4.2. Use Case 2: Lập yêu cầu tra soát giao dịch TCYCTS (`DS01-UC02 / BF29.1-UC02`)

#### 4.2.1. Bảng Đặc tả Use Case

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Lập yêu cầu tra soát giao dịch (TCYCTS — Chiều đi)** |
| **ID** | **DS01-UC02 / BF29.1-UC02** |
| **Description** | Khởi tạo và gửi yêu cầu tra soát mới cho một giao dịch thanh toán. Khi bấm khởi tạo, hệ thống MM sinh ra 01 bản ghi YCTS với trạng thái Tiến trình ban đầu là **"Chờ xử lý"** (Maker có thể hủy ➔ **"Đã hủy"**). Xử lý phân luồng Cần người kiểm tra (Tiến trình **"Đã kiểm tra"**) hoặc Không cần người kiểm tra (Trình thẳng **"Chờ phê duyệt"** sinh YCPD). |
| **Actor** | Maker (Chuyên viên Tra soát / Thu ngân), Inspector (Người kiểm tra - tùy chọn), Hệ thống MM |
| **Trigger** | Maker chọn nút **[+ Tạo yêu cầu tra soát]** tại màn hình Tra soát đã gửi. |
| **Pre-Condition** | - Maker có quyền khởi tạo yêu cầu tra soát.<br/>- Giao dịch gốc thực hiện trong vòng 180 ngày trở lại và ở trạng thái thành công. |
| **Post-Condition** | Bản ghi YCTS được sinh ra tại DB MM ở trạng thái Tiến trình **"Chờ xử lý"**. Sau đó rẽ nhánh trình kiểm tra hoặc trình phê duyệt. |
| **Basic flow (Luồng CÓ Người kiểm tra - 2 Swimlanes)** | 1. Maker chọn **[Tạo yêu cầu tra soát]**.<br/>2. Tìm kiếm và chọn giao dịch gốc thành công trong 180 ngày.<br/>3. Nhập Lý do tra soát, Loại tra soát (`RQRN — Hoàn tiền`), Số tiền tra soát và upload chứng từ đính kèm.<br/>4. Maker chọn **[Lưu Yêu cầu Tra soát]**.<br/>5. Hệ thống insert 01 bản ghi YCTS mới tại DB MM với trạng thái Tiến trình là **"Chờ xử lý"**.<br/>6. Người kiểm tra (Inspector) vào kiểm tra dữ liệu và bấm **[Xác nhận Đã kiểm tra]** ➔ YCTS chuyển trạng thái Tiến trình sang **"Đã kiểm tra"**.<br/>7. Maker chọn bản ghi ở trạng thái **"Đã kiểm tra"**, nhấp **[📤 Gửi yêu cầu phê duyệt]**.<br/>8. Hệ thống chuyển YCTS sang trạng thái Tiến trình **"Chờ phê duyệt"** và **sinh ra 01 bản ghi Yêu cầu Phê duyệt (YCPD)** ở trạng thái `ApprovePending` tại DB MM. |
| **Alternative flow (Luồng KHÔNG CÓ Người kiểm tra - 2 Swimlanes)** | 1. Maker thực hiện các bước 1-3 trong Basic Flow.<br/>2. Maker chọn **[📤 Gửi yêu cầu phê duyệt]** trực tiếp từ màn hình khởi tạo (Tiến trình *Chờ xử lý*).<br/>3. Hệ thống sinh bản ghi YCTS ở Tiến trình **"Chờ xử lý"**, sau đó tự động chuyển sang **"Chờ phê duyệt"** (bỏ qua mốc *Đã kiểm tra*) và **sinh ra 01 bản ghi YCPD** tại DB MM để trình Quản lý (Checker) duyệt. |
| **Non-functional requirement** | Xử lý sinh bản ghi YCTS và YCPD < 1.5 giây. |

---

#### 4.2.2. Bảng Đặc tả Giao diện Chi tiết Chuẩn Template `EPAY-QT.CG.02_BM33` (UC02 Form Tạo mới YCTS)

| Component Name | Data Type | Validation rules (M/O/C) | Editable | Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| **Tạo yêu cầu tra soát mới** | Label | M | N | - | Tiêu đề màn hình tạo mới yêu cầu tra soát chủ động (TCYCTS). |
| **`-- Thông tin Giao dịch gốc (Popup Tìm kiếm & Chọn Giao dịch gốc)`** | | | | | |
| **Chọn Giao dịch gốc** | Button / Modal | M | Y | Max 180 ngày | Nhấp để mở popup tìm kiếm và chọn giao dịch thanh toán gốc thành công trong vòng 180 ngày. |
| **PTTT (Phương thức thanh toán)** | Dropdown list | O | Y | Single selection | Mặc định chọn `VietQR`. Cho phép lọc theo PTTT giao dịch gốc (VietQR, Thẻ ATM/Nội địa, Thẻ quốc tế, Ví điện tử). |
| **Trạng thái giao dịch** | Dropdown list | O | Y | Single selection | Mặc định chọn `Thành công`. Cho phép lọc theo trạng thái giao dịch gốc (Thành công, Đã hoàn tiền, Tất cả). |
| **Cột Grid Table: PTTT** | Table Column | - | N | Read-only | Hiển thị Phương thức thanh toán trên bảng kết quả tìm kiếm giao dịch gốc (VD: `VietQR`). |
| **Cột Grid Table: Trạng thái GD** | Table Column | - | N | Read-only | Hiển thị Badge trạng thái giao dịch thanh toán gốc trên bảng kết quả tìm kiếm (VD: 🟢 **Thành công**). |
| **Mã Giao dịch gốc** | Textbox | M | N | Auto-fill | Hiển thị mã định danh duy nhất của giao dịch gốc được chọn (VD: `TX-10014`). Read-only cố định. |
| **Số tiền giao dịch gốc** | Textbox | M | N | Auto-fill | Hiển thị số tiền thanh toán của giao dịch gốc (VD: `950,000 VND`). |
| **Thời gian giao dịch** | Textbox | M | N | Auto-fill | Hiển thị ngày giờ thực hiện giao dịch gốc (VD: `2026-07-22 14:30`). |
| **`-- Thông tin Yêu cầu Tra soát`** | | | | | |
| **Lý do tra soát** | Dropdown list | M | Y | Single selection | Chọn lý do khiếu nại tra soát từ danh mục chuẩn (VD: *Khách hàng bị trừ tiền 2 lần, Cột bơm lỗi timeout...*). |
| **Số tiền tra soát** | Number Input | M | Y | > 0 và <= Số tiền GD gốc | Mặc định bằng số tiền giao dịch gốc. Cho phép nhập số tiền nhỏ hơn hoặc bằng số tiền gốc. |
| **Loại tra soát** | Dropdown list | M | Y | Single selection | Mặc định chọn `RQRN — Hoàn tiền`. Danh mục gồm: RQRN, RQNF, RQSP. |
| **Mô tả chi tiết** | Textarea | O | Y | Max 500 ký tự | Cho phép Chuyên viên nhập diễn giải chi tiết nguyên nhân phát sinh khiếu nại tra soát. |
| **`-- Hồ sơ / Chứng từ đính kèm`** | | | | | |
| **Tệp đính kèm chứng từ** | Fileupload | M khi RQRN | Y | PDF, PNG, JPG (Max 10MB) | Cho phép kéo thả hoặc chọn tệp chứng từ minh chứng (Bill thanh toán, Sao kê, Ảnh chụp camera...). |
| **`-- Button chức năng`** | | | | | |
| **Hủy bỏ** | Button | O | Y | - | Nhấp nút này để hủy bỏ thao tác tạo mới và quay lại màn hình Danh sách tra soát. |
| **Lưu Yêu cầu Tra soát** | Button | M | Y | Role Maker | Khởi tạo bản ghi YCTS mới tại DB MM ở trạng thái Tiến trình **Chờ xử lý** (Dành cho luồng rẽ nhánh qua Người kiểm tra). |
| **[📤 Gửi yêu cầu phê duyệt]** | Button | M | Y | Primary Action | Chuyển YCTS sang trạng thái Tiến trình **Chờ phê duyệt** và **sinh ra 01 bản ghi YCPD (ApprovePending)** tại DB MM. |

---

### 4.3. Use Case 3: Phê duyệt nội bộ yêu cầu tra soát (`DS01-UC03 / BF29.1-UC03`)

#### 4.3.1. Bảng Đặc tả Use Case

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Phê duyệt nội bộ yêu cầu tra soát (Role Checker / Quản lý)** |
| **ID** | **DS01-UC03 / BF29.1-UC03** |
| **Description** | Quản lý (Checker) xem xét bản ghi YCPD (được sinh ra khi YCTS ở Tiến trình `Chờ phê duyệt`) để đưa ra quyết định Phê duyệt (Approved) hoặc Từ chối (Cancel). Khi Phê duyệt, YCTS chuyển sang Tiến trình `Đã phê duyệt` và tự động phát hành sang Napas (chuyển sang Tiến trình `Chờ phản hồi`). |
| **Actor** | Checker (Trưởng nhóm / Quản lý), Hệ thống Merchant Management, DB Service QR, Cổng Napas |
| **Trigger** | Checker chọn 01 bản ghi tra soát đang ở trạng thái YCTS/YCPD `Chờ phê duyệt` (ApprovePending). |
| **Pre-Condition** | - Checker có quyền phê duyệt YCPD (Tuân thủ quy tắc 4 mắt: Checker ≠ Maker sáng tạo YCPD).<br/>- Bản ghi YCPD đang ở trạng thái `ApprovePending` tại DB MM. |
| **Post-Condition** | - **Nếu Đồng ý Phê duyệt:** YCPD status = `Approved`, YCTS chuyển Tiến trình `Đã phê duyệt` ➔ `Chờ phản hồi` (Service QR status `OPEN`).<br/>- **Nếu Từ chối Phê duyệt:** YCPD status = `Cancel`, đóng luồng trình duyệt nội bộ. |
| **Basic flow** | 1. Checker mở chi tiết bản ghi tra soát ở trạng thái Tiến trình `Chờ phê duyệt`.<br/>2. Kiểm tra thông tin tra soát, lý do, số tiền hoàn trả và chứng từ đính kèm.<br/>3. Nhập ý kiến nhận xét vào ô **[Ghi chú phê duyệt hoặc lý do từ chối *]**.<br/>4. Chọn **[✅ Đồng ý Phê duyệt (Gọi Service QR)]**.<br/>5. Hệ thống chuyển YCPD thành `Approved`, YCTS chuyển Tiến trình sang `Đã phê duyệt` và tự động kích hoạt Service QR API gửi sang Napas (chuyển Tiến trình sang `Chờ phản hồi`). |
| **Non-functional requirement** | Xử lý phê duyệt và kích hoạt API Service QR < 3.0 giây. |

---

#### 4.3.2. Bảng Đặc tả Giao diện Chi tiết Chuẩn Template `EPAY-QT.CG.02_BM33` (UC03 Màn hình Phê duyệt Quản lý)

| Component Name | Data Type | Validation rules (M/O/C) | Editable | Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| **Chi tiết & Phê duyệt Tra soát** | Label | M | N | - | Tiêu đề màn hình Phê duyệt dành cho Quản lý (Checker View). |
| **`-- Thông tin Yêu cầu Phê duyệt Nội bộ (YCPD Banner)`** | | | | | |
| **Mã YCPD** | Textbox | M | N | Read-only | Hiển thị mã định danh duy nhất của Yêu cầu Phê duyệt (VD: `YCPD-014`). |
| **Trạng thái DB MM** | Badge Label | M | N | Read-only | Badge màu vàng nổi bật hiển thị trạng thái `ApprovePending (Chờ phê duyệt)`. |
| **Trạng thái DB Service QR** | Badge Label | M | N | Read-only | Hiển thị trạng thái cổng QR (`OPEN` / `Pending partner`). |
| **Thông tin Đề xuất** | Textbox | M | N | Read-only | Hiển thị tóm tắt đề xuất (VD: *Đề xuất Đồng ý hoàn tiền 950.000 VND cho KH bởi ThuNgan01*). |
| **`-- Chi tiết Đề xuất & Hồ sơ đính kèm`** | | | | | |
| **Số tiền tra soát đề xuất** | Textbox | M | N | Read-only | Hiển thị số tiền đề xuất hoàn trả/tra soát (VD: `950,000 VND`). |
| **Lý do tra soát / phản hồi** | Textarea | M | N | Read-only | Hiển thị diễn giải lý do do Chuyên viên (Maker) trình duyệt. |
| **Tệp minh chứng đính kèm** | File Link | M | N | Click to download | Đường link nhấp để tải hoặc mở xem trực tiếp tệp chứng từ đính kèm (VD: `minh_chung_tra_soat.pdf`). |
| **`-- Ý kiến Phê duyệt / Từ chối`** | | | | | |
| **Ghi chú phê duyệt hoặc lý do từ chối \*** | Textarea | C | Y | Max 500 ký tự | Bắt buộc nhập khi chọn Từ chối Phê duyệt. Tùy chọn nhập khi chọn Đồng ý Phê duyệt. |
| **`-- Button chức năng Phê duyệt`** | | | | | |
| **[❌ Từ chối Phê duyệt]** | Button | C | Y | Role Checker & ApprovePending | Chuyển bản ghi YCPD thành `Cancel`, từ chối câu trả lời và đóng luồng trình duyệt nội bộ. |
| **[✅ Đồng ý Phê duyệt (Gọi Service QR)]** | Button | C | Y | Primary Action | Chuyển YCPD thành `Approved`, YCTS chuyển Tiến trình `Đã phê duyệt` ➔ `Chờ phản hồi` (Gửi Napas). |

---

### 4.4. Use Case 4: Tiếp nhận và Phản hồi yêu cầu tra soát thụ động TCTLTS — Mã TS-014 (`DS01-UC04 / BF29.1-UC04`)

#### 4.4.1. Bảng Đặc tả Use Case

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Tiếp nhận và Phản hồi yêu cầu tra soát thụ động (TCTLTS — Chiều đến / Mã TS-014)** |
| **ID** | **DS01-UC04 / BF29.1-UC04** |
| **Description** | Khi Cổng Service QR tiếp nhận YCTS thụ động từ Napas (Mã TS-014), Service QR sẽ gọi API đồng bộ dữ liệu sang MM và **MM bắt buộc phải insert 01 bản ghi YCTS tại hệ thống MM với trạng thái Tiến trình ban đầu là "Chờ xử lý"**. Sau đó Maker lập câu trả lời và trình Quản lý duyệt (Sơ đồ 5 Swimlanes TCTLTS). |
| **Actor** | System QR, Maker (Chuyên viên Tra soát), Checker (Quản lý), Hệ thống MM, Napas |
| **Trigger** | Cổng Service QR tiếp nhận thông điệp YCTS thụ động từ Napas gửi tới. |
| **Pre-Condition** | Hệ thống tiếp nhận thành công thông điệp tra soát thụ động từ Napas. |
| **Post-Condition** | **Hệ thống MM đã insert 01 bản ghi YCTS ở Tiến trình "Chờ xử lý"**. Khi Maker lập phản hồi, hệ thống chuyển YCTS sang Tiến trình "Chờ phê duyệt" và sinh bản ghi YCPD. |
| **Basic flow (Luồng Phản hồi YCTS TCTLTS - 2 Swimlanes)** | 1. Cổng Service QR nhận YCTS thụ động TS-014 từ Napas ➔ Kích hoạt API sang MM.<br/>2. **Hệ thống MM tự động insert 01 bản ghi YCTS mới vào DB MM với trạng thái Tiến trình là "Chờ xử lý"** (Service QR status = `OPEN`).<br/>3. Napas thông báo hết hạn SLA (`EXPI`) ➔ QR gửi mốc thời hạn ➔ MM cập nhật **Trạng thái Tra soát Hết hạn** từ **`Chưa hết hạn`** sang **`Đã hết hạn`**.<br/>4. Maker mở bản ghi TS-014 ở Tiến trình **"Chờ xử lý"** tại tab Tra soát đã nhận.<br/>5. Maker chọn Mã phản hồi (`PRCD — Đồng ý` hoặc `RJCD — Từ chối`), nhập Khung thông tin giao dịch hoàn trả (`950,000 VND`, `Toàn phần`), upload tệp minh chứng và nhập Ghi chú.<br/>6. Maker chọn **[Gửi phê duyệt]** ➔ Hệ thống chuyển YCTS sang Tiến trình **"Chờ phê duyệt"** và **sinh ra 01 bản ghi YCPD mới** ở trạng thái `ApprovePending` tại DB MM.<br/>7. Checker Phê duyệt (YCPD Approved) ➔ Hệ thống chuyển YCTS sang **"Đã phê duyệt"** ➔ Kích hoạt Service QR phát hành câu trả lời sang Napas.<br/>8. Napas phản hồi kết quả ➔ YCTS chuyển Tiến trình sang **"Đã phản hồi"** và gán **Trạng thái xử lý YCTS tại Epay** = **`PRCD`** (mã `PRCD`/`EXPR`) hoặc **`RJCD`** (mã `RJCD`/`EXRJ`). |
| **Non-functional requirement** | Tự động insert bản ghi YCTS tại MM < 1.0 giây từ khi nhận API Service QR. |

---

#### 4.4.2. Bảng Đặc tả Giao diện Chi tiết Chuẩn Template `EPAY-QT.CG.02_BM33` (UC04 Form Phản hồi TCTLTS Maker View)

| Component Name | Data Type | Validation rules (M/O/C) | Editable | Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| **Phản hồi tra soát thụ động TS-014** | Label | M | N | - | Tiêu đề màn hình Phản hồi YCTS chiều đến từ Napas (Maker View). |
| **`-- Banner Tiếp nhận YCTS Thụ động`** | | | | | |
| **Mã Tra soát thụ động** | Textbox | M | N | Read-only | Hiển thị mã định danh tra soát do Napas cấp (VD: `TS-014`). |
| **Tiến trình MM YCTS** | Badge Label | M | N | Read-only | Hiển thị trạng thái Tiến trình `Chờ xử lý` (hoặc `Chờ phê duyệt` khi đang tồn tại YCPD). |
| **Đơn vị khiếu nại** | Textbox | M | N | Read-only | Hiển thị ngân hàng/đối tác phát hành khiếu nại (VD: `Napas / Vietcombank`). |
| **`-- Khai báo Thông tin Trả lời`** | | | | | |
| **Mã phản hồi tra soát** | Dropdown list | M | Y | PRCD / RJCD | Chọn kết quả trả lời: `PRCD — Đồng ý` hoặc `RJCD — Từ chối`. |
| **Lý do từ chối chuẩn Napas** | Dropdown list | C | Y | Single selection | Bắt buộc chọn mã lý do từ chối chuẩn Napas khi chọn mã phản hồi `RJCD`. |
| **`-- Khung Khởi tạo Thông tin Giao dịch Hoàn trả`** | | | | | |
| **Số tiền hoàn trả \*** | Number Input | C | Y | > 0 và <= Số tiền gốc | Bắt buộc nhập khi chọn `PRCD`. Mặc định bằng số tiền giao dịch gốc (`950,000 VND`). |
| **Loại hoàn trả \*** | Dropdown list | C | Y | Toàn phần / Một phần | Bắt buộc chọn khi chọn `PRCD`. Mặc định chọn `Toàn phần`. |
| **Lý do hoàn trả \*** | Textbox | C | Y | Max 255 ký tự | Bắt buộc nhập khi chọn `PRCD` (VD: *Xác nhận giao dịch lỗi hệ thống, đề xuất hoàn tiền...*). |
| **`-- Hồ sơ đính kèm & Nội dung giải trình`** | | | | | |
| **Tệp minh chứng đính kèm** | Fileupload | C | Y | PDF, PNG, JPG (Max 10MB) | Upload tệp chứng từ đối soát/chuyển khoản minh chứng (VD: `minh_chung_chuyen_khoan.pdf`). |
| **Nội dung giải trình** | Textarea | O | Y | Max 500 ký tự | Nhập diễn giải bổ sung gửi kèm câu trả lời cho Quản lý & Napas. |
| **`-- Button chức năng`** | | | | | |
| **[✏️ Cập nhật trả lời]** | Button | C | Y | Role Maker | Cập nhật thông tin YCPD tại DB MM, duy trì trạng thái Tiến trình `Chờ phê duyệt`. |
| **[❌ Hủy bỏ yêu cầu]** | Button | C | Y | Role Maker | Rút lại YCPD ➔ Chuyển YCPD status = `Cancel`, Tiến trình = `Đã hủy`. |
| **[📤 Gửi yêu cầu phê duyệt]** | Button | M | Y | Primary Action | Chuyển YCTS sang Tiến trình **Chờ phê duyệt** và **sinh ra 01 bản ghi YCPD (ApprovePending)** tại DB MM. |

---

### 4.5. Use Case 5: Xem chi tiết & Lịch sử xử lý tra soát (`DS01-UC05 / BF29.1-UC05`)

#### 4.5.1. Bảng Đặc tả Use Case

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Xem chi tiết & Lịch sử xử lý tra soát** |
| **ID** | **DS01-UC05 / BF29.1-UC05** |
| **Description** | Xem toàn bộ thông tin chi tiết của một yêu cầu tra soát bao gồm Cấu trúc Trạng thái 3 Nhóm (*Tiến trình tra soát*, *Trạng thái xử lý YCTS: Đồng ý/Từ chối*, *Trạng thái Tra soát hết hạn: Hết hạn*), thông tin GD gốc, chứng từ đính kèm và nhật ký lịch sử chuyển đổi trạng thái (Audit Trail: *Chờ xử lý* ➔ *Đã kiểm tra* ➔ *Chờ phê duyệt* ➔ *Đã phê duyệt* ➔ *Chờ phản hồi* ➔ *Đã phản hồi* ➔ *Hoàn tất*). |
| **Actor** | Người dùng (Maker, Inspector, Checker, Operator, Admin) |
| **Trigger** | Người dùng chọn 01 dòng bản ghi tra soát tại danh sách. |
| **Pre-Condition** | Người dùng có quyền xem danh sách tra soát. |
| **Post-Condition** | Hệ thống hiển thị toàn bộ màn hình chi tiết và tab Lịch sử xử lý. |
| **Basic flow** | 1. Người dùng bấm vào Mã tra soát (ví dụ: `TS-014`).<br/>2. Màn hình Chi tiết hiển thị các khối thông tin bóc tách chuẩn: Khối 1 (THÔNG TIN TRA SOÁT - bao gồm Badge Tiến trình tra soát, Badge Trạng thái xử lý YCTS, Badge Trạng thái Hết hạn), Khối 2 (THÔNG TIN GIAO DỊCH GỐC), Khối 3 (THÔNG TIN KHÁC), Khối 4 (XỬ LÝ & PHẢN HỒI).<br/>3. Người dùng chọn tab **[Lịch sử xử lý]**.<br/>4. Hệ thống hiển thị timeline chi tiết từng mốc thời gian, thao tác, người thực hiện và trạng thái DB MM / Service QR tương ứng. |
| **Non-functional requirement** | Tải màn hình chi tiết và lịch sử trong vòng < 1.5 giây. |

---

#### 4.5.2. Bảng Đặc tả Giao diện Chi tiết Chuẩn Template `EPAY-QT.CG.02_BM33` (UC05 Màn hình Xem chi tiết & Audit Log)

| Component Name | Data Type | Validation rules (M/O/C) | Editable | Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| **Chi tiết Yêu cầu Tra soát** | Label | M | N | - | Tiêu đề màn hình xem chi tiết bản ghi tra soát. |
| **`-- Khối 1: THÔNG TIN TRA SOÁT`** | | | | | |
| **Mã Tra soát** | Textbox | M | N | Read-only | Hiển thị mã định danh duy nhất của tra soát (VD: `TS-014`). Căn phải value slot. |
| **Tiến trình tra soát** | Badge Label | M | N | Read-only | Hiển thị Badge màu sắc của 1 trong 9 trạng thái Tiến trình (*Chờ xử lý, Đã kiểm tra, Chờ phê duyệt, Chờ phản hồi, Đã phản hồi...*). |
| **Trạng thái xử lý YCTS** | Badge Label | C | N | Read-only | Hiển thị Badge khi Tiến trình = *Đã phản hồi* (🟢 **Đồng ý** / 🔴 **Từ chối**). |
| **Trạng thái Tra soát hết hạn** | Badge Label | C | N | Read-only | Hiển thị Badge khi Tiến trình = *Đã phản hồi* và quá mốc SLA (🟠 **Hết hạn**). |
| **Loại tra soát** | Textbox | M | N | Read-only | Hiển thị mã loại tra soát (VD: `RQRN — Hoàn tiền`). Căn phải value slot. |
| **Số tiền tra soát** | Textbox | M | N | Read-only | Hiển thị số tiền tra soát (VD: `950,000 VND`). Căn phải value slot. |
| **Hồ sơ minh chứng đính kèm** | File Link | M | N | Click to download | Link nhấp để xem/tải tệp chứng từ đính kèm (VD: `minh_chung_tra_soat.pdf`). |
| **`-- Khối 2: THÔNG TIN GIAO DỊCH GỐC (Layout 3 Cột, Accordion Header "Thông tin giao dịch")`** | | | | | |
| **Mã giao dịch** | Textbox / Link | M | N | Text xanh bold (VD: `TX-10012`) | Hiển thị Mã giao dịch thanh toán gốc dưới dạng link liên kết. |
| **Trạng thái giao dịch** | Label | M | N | Text xanh bold (VD: `Thành công`) | Hiển thị trạng thái giao dịch thanh toán gốc tại hệ thống CTT. |
| **Merchant Code** | Textbox | M | N | Read-only (VD: `PAYME_MERCHANT`) | Mã đơn vị chấp nhận thanh toán (Merchant). |
| **Ngày giao dịch** | Textbox | M | N | Format: `DD/MM/YYYY HH:mm:ss` | Hiển thị ngày giờ thực hiện giao dịch gốc (VD: `24/03/2024 09:00:04`). |
| **Số tiền giao dịch** | Textbox | M | N | Format: `#,##0 VND` | Hiển thị tổng số tiền gốc của giao dịch (VD: `145,000 VND`). |
| **Đối tác thanh toán** | Textbox | M | N | Read-only (VD: `Napas`) | Kênh / Đối tác xử lý giao dịch gốc. |
| **Loại giao dịch** | Textbox | M | N | Read-only (VD: `Thanh toán`) | Phân loại giao dịch gốc (Thanh toán hàng hóa/dịch vụ). |
| **Loại QR** | Textbox | M | N | Read-only (VD: `Dynamic QR`) | Loại mã QR thanh toán (Dynamic QR / Static QR). |
| **Mã đơn hàng** | Textbox | M | N | Read-only (VD: `1722248884716`) | Mã đơn hàng ghi nhận từ phía Merchant. |
| **PTTT** | Textbox | M | N | Read-only (VD: `VietQR`) | Phương thức thanh toán giao dịch gốc. |
| **Loại dịch vụ** | Textbox | M | N | Read-only (VD: `Thanh toán`) | Loại hình dịch vụ thanh toán. |
| **Mã GD với CTT** | Textbox / Link | M | N | Text xanh gạch chân (VD: `EPAYPW00339312`) | Mã tham chiếu giao dịch nội bộ lưu tại Cổng thanh toán epay. |
| **`-- Khối 3: THÔNG TIN KHÁC`** | | | | | |
| **Merchant Code** | Textbox | M | N | Read-only | Hiển thị mã ĐVCNTT quản lý giao dịch (VD: `MERCHANT_02`). Căn phải value slot. |
| **Người khởi tạo** | Textbox | M | N | Read-only | Hiển thị tên tài khoản Maker tạo yêu cầu (VD: `creator01`). Căn phải value slot. |
| **Thời hạn SLA xử lý** | Textbox | M | N | Read-only | Hiển thị mốc thời gian quá hạn SLA (VD: `2026-07-27 17:00`). Căn phải value slot. |
| **Quản lý phê duyệt** | Textbox | O | N | Read-only | Hiển thị tên tài khoản Checker đã duyệt (VD: `Lisa`). Căn phải value slot. |
| **`-- Khối 4: XỬ LÝ & PHẢN HỒI (Audit Trail Timeline)`** | | | | | |
| **Nhật ký tiến trình xử lý** | Timeline Block | M | N | Read-only Timeline | Hiển thị dòng thời gian tự động các mốc: *Chờ xử lý* ➔ *Đã kiểm tra* ➔ *Chờ phê duyệt* ➔ *Đã phê duyệt* ➔ *Chờ phản hồi* ➔ *Đã phản hồi (Đồng ý/Từ chối)* ➔ *Hoàn tất*. |
| **`-- Button chức năng`** | | | | | |
| **In phiếu tra soát** | Button | O | Y | - | Nhấp nút này để mở giao diện xem trước trang in phiếu tra soát dạng PDF. |
| **Quay lại danh sách** | Button | M | Y | - | Nhấp nút này để đóng màn hình chi tiết và quay lại màn hình danh sách tra soát. |

---

### 4.6. Use Case 6: Cập nhật / Chỉnh sửa yêu cầu tra soát & Hủy bỏ YCPD (`DS01-UC06 / BF29.1-UC06`)

#### 4.6.1. Bảng Đặc tả Use Case

| Trường thông tin | Nội dung chi tiết |
|---|---|
| **Use Case** | **Cập nhật / Chỉnh sửa yêu cầu tra soát & Hủy bỏ YCPD (Role Maker)** |
| **ID** | **DS01-UC06 / BF29.1-UC06** |
| **Description** | Quy định chi tiết các quyền Cập nhật thông tin và Hủy bỏ yêu cầu của Maker tại các mốc Tiến trình **"Chờ xử lý"**, **"Đã kiểm tra"** và **"Chờ phê duyệt"**. |
| **Actor** | Maker (Chuyên viên Tra soát / Thu ngân), Hệ thống MM |
| **Trigger** | Maker mở bản ghi tra soát ở Tiến trình `Chờ xử lý`, `Đã kiểm tra` hoặc `Chờ phê duyệt`. |
| **Pre-Condition** | - Maker là người tạo YCTS/YCPD ban đầu.<br/>- YCTS đang ở Tiến trình `Chờ xử lý`, `Đã kiểm tra` hoặc `Chờ phê duyệt`. |
| **Post-Condition** | - **Tại "Chờ xử lý" / "Đã kiểm tra":** Cho phép Maker **Cập nhật thông tin** hoặc bấm **Hủy yêu cầu** (Tiến trình ➔ `Đã hủy`).<br/>- **Tại "Chờ phê duyệt":** Cho phép Maker **Cập nhật thông tin** (duy trì YCPD ApprovePending) hoặc **Hủy bỏ YCPD** (chuyển YCPD thành *Cancel*, Tiến trình YCTS ➔ `Đã hủy`). |
| **Basic flow (Luồng Cập nhật ở Trạng thái Đã kiểm tra)** | 1. Maker truy cập màn hình chi tiết YCTS đang ở Tiến trình **"Đã kiểm tra"**.<br/>2. Maker chọn **[✏️ Cập nhật thông tin]**.<br/>3. Điều chỉnh lại Lý do, Số tiền tra soát, Tệp đính kèm hoặc Ghi chú.<br/>4. Maker chọn **[Lưu thông tin]** (duy trì Tiến trình *Đã kiểm tra*) hoặc chọn **[📤 Gửi yêu cầu phê duyệt]** (chuyển YCTS sang Tiến trình *Chờ phê duyệt* và **sinh ra bản ghi YCPD** tại DB MM). |
| **Alternative flow (Luồng Hủy bỏ ở Trạng thái Chờ xử lý / Chờ phê duyệt)** | 1. Maker truy cập màn hình chi tiết YCTS ở Tiến trình **"Chờ xử lý"** hoặc **"Chờ phê duyệt"**.<br/>2. Maker chọn **[❌ Hủy bỏ yêu cầu]**.<br/>3. Hệ thống mở popup xác nhận hủy. Khi Maker đồng ý, hệ thống cập nhật YCPD status = *Cancel* (nếu có) và chuyển trạng thái Tiến trình YCTS thành **"Đã hủy"**. |
| **Non-functional requirement** | Xử lý cập nhật / hủy bỏ YCPD < 1.5 giây. |

---

#### 4.6.2. Bảng Đặc tả Giao diện Chi tiết Chuẩn Template `EPAY-QT.CG.02_BM33` (UC06 Màn hình Cập nhật / Hủy YCPD Maker View)

| Component Name | Data Type | Validation rules (M/O/C) | Editable | Other Validation | Action rules |
|---|:---:|:---:|:---:|---|---|
| **Cập nhật / Hủy bỏ Yêu cầu Phê duyệt** | Label | M | N | - | Tiêu đề màn hình Điều chỉnh & Hủy bỏ dành cho Chuyên viên (Maker View). |
| **`-- Banner Trạng thái YCTS & YCPD`** | | | | | |
| **Trạng thái Tiến trình hiện tại** | Badge Label | M | N | Read-only | Hiển thị trạng thái Tiến trình (`Chờ xử lý`, `Đã kiểm tra` hoặc `Chờ phê duyệt`). |
| **Mã YCPD liên quan** | Textbox | O | N | Read-only | Hiển thị mã YCPD (VD: `YCPD-014` khi ở Tiến trình Chờ phê duyệt). |
| **`-- Khung Điều chỉnh Thông tin Hoàn trả / Tra soát`** | | | | | |
| **Số tiền hoàn trả / tra soát** | Number Input | M | Y | > 0 và <= Số tiền gốc | Cho phép Maker điều chỉnh lại số tiền cần tra soát/hoàn trả (VD: `950,000 VND`). |
| **Loại hoàn trả** | Dropdown list | M | Y | Toàn phần / Một phần | Cho phép chọn loại hình hoàn tiền toàn phần hoặc một phần. |
| **Lý do tra soát / giải trình** | Textarea | M | Y | Max 500 ký tự | Cho phép nhập/chỉnh sửa nội dung diễn giải nguyên nhân tra soát. |
| **Quản lý Tệp chứng từ** | Fileupload | O | Y | PDF, PNG, JPG (Max 10MB) | Cho phép xóa tệp đính kèm cũ hoặc tải bổ sung tệp minh chứng mới. |
| **`-- Button chức năng Thao tác`** | | | | | |
| **[✏️ Cập nhật thông tin]** | Button | C | Y | Role Maker | Cập nhật dữ liệu YCTS & YCPD mới tại DB MM, duy trì trạng thái Tiến trình hiện tại. |
| **[📤 Gửi lại phê duyệt]** | Button | C | Y | Role Maker & Đã kiểm tra | Chuyển YCTS từ *Đã kiểm tra* sang Tiến trình **Chờ phê duyệt** và **sinh ra bản ghi YCPD** tại DB MM. |
| **[❌ Hủy bỏ yêu cầu]** | Button | C | Y | Role Maker | Mở popup xác nhận hủy. Khi đồng ý, cập nhật Tiến trình YCTS thành **Đã hủy** (YCPD Cancel), đóng luồng trình duyệt. |

---

### 📌 QUY TRÌNH NHẬP KHỐI THÔNG TIN TRA SOÁT (PHÂN BIỆT TH1 & TH2):

- **Trường hợp 1 (TH1 - Luồng KHÔNG CÓ Kỹ thuật kiểm tra / 6 Bước):**
  - **Trạng thái "Chờ xử lý" (Step 1/6):** Chuyên viên khởi tạo (Maker) thực hiện nhập trực tiếp **Khối Thông tin tra soát**:
    - *Mã tra soát*: Read-only (vd TS-012).
    - *Loại tra soát*: Mặc định **RQSP — Sai sót nghiệp vụ** (Disabled / Read-only / Không cho chỉnh sửa).
    - *Lý do tra soát*: Mặc định **BANK — Ngân hàng đối tác yêu cầu** (Disabled / Read-only / Không cho chỉnh sửa).
    - *Số tiền tra soát*: Cho phép nhập/chỉnh sửa (Input box, vd 1,500,000 VND).
    - *Tệp đính kèm*: Cho phép chọn/chỉnh sửa tệp (vd bill_chuyen_tien.png).
    - *Nội dung mô tả chi tiết*: Cho phép nhập/chỉnh sửa (Textarea mô tả chi tiết).
  - Maker nhấp **[💾 Lưu & Trình phê duyệt]** -> Hệ thống chuyển thẳng sang trạng thái **"Chờ phê duyệt"** (Checker duyệt).

- **Trường hợp 2 (TH2 - Luồng CÓ Kỹ thuật kiểm tra / 7 Bước):**
  - **Trạng thái "Chờ xử lý" (Step 1/7):** Kỹ thuật viên (Inspector) tiếp nhận xác minh nguyên nhân kỹ thuật và nhấp **[🔍 Xác nhận Đã kiểm tra]** -> Hệ thống chuyển sang trạng thái **"Đã kiểm tra"**.
  - **Trạng thái "Đã kiểm tra" (Step 2/7):** Chuyên viên khởi tạo (Maker) mới thực hiện nhập **Khối Thông tin tra soát**:
    - *Loại tra soát RQSP* & *Lý do tra soát BANK*: Mặc định (Disabled / Read-only / Không cho chỉnh sửa).
    - *Số tiền tra soát*, *Tệp đính kèm*, *Nội dung mô tả chi tiết*: Cho phép nhập/chỉnh sửa.
  - Maker nhấp **[📤 Trình phê duyệt]** -> Hệ thống chuyển sang trạng thái **"Chờ phê duyệt"** (Checker duyệt).
