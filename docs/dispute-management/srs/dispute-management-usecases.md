# TÀI LIỆU MÔ TẢ USE CASE CHI TIẾT
## TÍNH NĂNG QUẢN LÝ TRA SOÁT (DISPUTE MANAGEMENT CHUẨN EPAY)

---

> **Mã tài liệu:** `EPAY-QT.CG.02_BM33`  
> **Dự án:** Hệ thống Quản lý Tra soát Epay - Petrolimex 2.0  
> **Phiên bản:** `v2.9` (Cập nhật Chiều YCTS bao gồm Khối Thông tin Hoàn trả & Khối Thông tin Báo có. Khối Báo nợ thuộc Phân hệ TCTLTS)  
> **Trạng thái:** APPROVED / READY FOR IMPLEMENTATION  

---

## 1. MÔ TẢ BỘ TRẠNG THÁI HỆ THỐNG VÀ MA TRẬN CHUYỂN ĐỔI TRẠNG THÁI

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

### 1.1. Nhóm 1: Trạng thái Tiến trình Tra soát (PCTS / Process Progress)
| Mã Trạng thái Tiến trình | Tên Trạng thái | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|
| **`Chờ xử lý`** (Pending) | Chờ xử lý / Cần xử lý | Bản ghi YCTS vừa được Chuyên viên Đối soát tạo mới trên hệ thống MM hoặc điện tra soát thụ động TCTLTS vừa được Napas đồng bộ sang MM. |
| **`Đã hủy`** (Cancelled) | Đã hủy | Bản ghi YCTS bị Chuyên viên Đối soát chủ động hủy bỏ tại mốc Chờ xử lý hoặc Chờ phê duyệt. |
| **`Đã kiểm tra`** (Inspected) | Đã kiểm tra | *(Chỉ có ở Luồng TCYCTS CÓ kiểm tra)* Chuyên viên Kỹ thuật hoặc Kế toán đối soát dữ liệu và bấm **[🔍 Xác nhận Đã kiểm tra]**. |
| **`Chờ phê duyệt`** *(ApprovePending)* | Chờ phê duyệt | Đối soát bấm **[📤 Gửi yêu cầu phê duyệt]**, YCTS chuyển Chờ phê duyệt và **sinh ra 01 bản ghi YCPD** (`ApprovePending`) cho Lãnh đạo duyệt. |
| **`Đã phê duyệt`** (Approved) | Đã phê duyệt | Lãnh đạo (Checker) bấm **[✅ Đồng ý Phê duyệt]**, hệ thống duyệt bản ghi YCPD và phát hành lệnh gửi sang Napas. |
| **`Xử lý thất bại`** (Process Failure) | Xử lý thất bại | Phát sinh lỗi validation định dạng dữ liệu hoặc lỗi kết nối mạng / hạch toán Báo nợ thất bại. |
| **`Chờ phản hồi`** (Waiting Response) | Chờ phản hồi | Cổng Service QR phát hành thông điệp sang Napas thành công (`OPEN`), chờ kết quả đối tác. |
| **`Đã phản hồi`** (Responded) | Đã phản hồi | Cổng Service QR nhận kết quả từ Napas. Tự động gán **Trạng thái xử lý YCTS** hoặc **Trạng thái Tra soát hết hạn**. |
| **`Hoàn tất`** (Completed) | Hoàn tất | Quy trình tra soát và hạch toán hoàn tiền/báo có đã kết thúc hoàn toàn trên toàn hệ thống. |

### 1.2. Nhóm 2: Trạng thái Xử lý YCTS tại Epay / MM (Processing Outcome Status)
| Trạng thái Xử lý YCTS tại Epay | Tên Tiếng Anh | Mã QRGW/Gateway Map | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|---|
| **`—`** | None | `—` | Mặc định ban đầu khi chưa gửi hoặc chưa phát sinh kết quả từ đối tác. |
| **`OPEN`** | Open | `OPEN` | Khi QRGW tiếp nhận phản hồi từ đối tác thông báo trạng thái `OPEN` (đối tác đang xử lý). |
| **`PRCD`** | Processed | `EXPR` / `PRCD` / Hoàn trả TC / Báo có TC | **[TCYCTS]** Đối tác chấp nhận hoàn tiền/báo có.<br/>**[TCTLTS]** QRGW thông báo: Hoàn trả thành công, Báo có thành công, hoặc nhận IPN thành công sau hết hạn. |
| **`RJCD`** | Rejected | `RJCD` / `EXRJ` / Hoàn trả TB / Báo có TB | **[TCYCTS]** Đối tác phản hồi từ từ chối yêu cầu tra soát.<br/>**[TCTLTS]** QRGW thông báo: Hoàn trả thất bại, Báo có thất bại, hoặc nhận IPN thất bại sau hết hạn. |

### 1.3. Nhóm 3: Trạng thái Tra soát Hết hạn YCTS (Expiration Status)
| Trạng thái Tra soát Hết hạn | Tên Tiếng Anh | Mã Gateway Map | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|---|
| **`Chưa hết hạn`** | Unexpired | `—` | Mặc định ban đầu khi giao dịch trong thời hạn SLA xử lý. |
| **`Đã hết hạn`** | Expired | `EXPI` | Khi QRGW nhận thông báo IPN từ đối tác với trạng thái `EXPI` (quá hạn SLA), hệ thống MM cập nhật từ Chưa hết hạn sang Đã hết hạn. |

### 1.4. Bảng Ma trận Chuyển đổi Trạng thái Chi tiết (State Transition Matrix)
| Trạng thái Đầu vào | Hành động / Sự kiện Kích hoạt | Trạng thái Đầu ra | Vai trò Thực hiện | Bản ghi YCPD Sinh ra |
|---|---|---|---|---|
| `Chờ xử lý` | Nhấp [🔍 Xác nhận Đã kiểm tra] | `Đã kiểm tra` | Kỹ thuật / Kế toán | Chưa sinh YCPD |
| `Chờ xử lý` / `Đã kiểm tra` | Nhấp [📤 Gửi yêu cầu phê duyệt] | `Chờ phê duyệt` | Đối soát (Maker) | Sinh YCPD (ApprovePending) |
| `Chờ xử lý` / `Chờ phê duyệt` | Nhấp [❌ Hủy bỏ yêu cầu] | `Đã hủy` | Đối soát (Maker) | YCPD = Cancel |
| `Chờ phê duyệt` | Lãnh đạo nhấp [✅ Đồng ý Phê duyệt] | `Đã phê duyệt` ➔ `Chờ phản hồi` | Lãnh đạo (Checker) | YCPD = Approved |
| `Chờ phê duyệt` | Lãnh đạo nhấp [❌ Từ chối Phê duyệt] | `Đã hủy` / `Từ chối` | Lãnh đạo (Checker) | YCPD = Cancel |
| `Chờ phản hồi` | Napas trả về PRCD / RJCD / EXPI | `Đã phản hồi` | Hệ thống QRGW/Napas | - |
| `Đã phản hồi` | Hoàn tất hạch toán &amp; Đối soát xong | `Hoàn tất` | Hệ thống MM | - |

### 1.5. Bảng Ma trận Phân tích Trạng thái theo các Tab Danh sách Tra soát đã gửi (TCYC Status Matrix)

| Tab Danh sách Tra soát đã gửi (Chiều dọc) | Trạng thái YCTS (Tiến trình MM) | Trạng thái hết hạn | Trạng thái xử lý tại Epay | Trạng thái xử lý tại đối tác |
|---|---|---|---|---|
| **Tab "Chờ xử lý"** | `Chờ xử lý` (Pending) / `Đã kiểm tra` (Inspected) | `Chưa hết hạn` | `—` (Chưa phát hành) | `—` (Chưa gửi đối tác) |
| **Tab "Chờ phê duyệt"** | `Chờ phê duyệt` (ApprovePending) | `Chưa hết hạn` | `—` (Đang chờ Lãnh đạo duyệt) | `—` (Chưa phát hành sang Napas) |
| **Tab "Đã quá hạn"** | `Đã phản hồi` / `Chờ phản hồi` | 🟠 **Đã hết hạn** (Gateway IPN: `EXPI`) | `PRCD` / `OPEN` / `—` | `EXPI` (Expired) / `PRCD` / `RJCD` |

### 1.6. Bảng Ma trận Phân tích Trạng thái theo các Tab Danh sách Tra soát đã nhận (TCTLTS Status Matrix)

| Tab Danh sách Tra soát đã nhận (Chiều dọc) | Trạng thái YCTS (Tiến trình MM) | Trạng thái hết hạn | Trạng thái xử lý tại Epay | Trạng thái xử lý tại đối tác |
|---|---|---|---|---|
| **Tab "Chờ xử lý"** | `Chờ xử lý` (Pending) / `Đã kiểm tra` (Inspected) | `Chưa hết hạn` | `—` (Chưa chọn trả lời / Chưa trình duyệt) | `OPEN` (Napas chờ Epay trả lời) |
| **Tab "Chờ phê duyệt"** | `Chờ phê duyệt` (ApprovePending) | `Chưa hết hạn` | `PRCD` (Đề xuất Đồng ý) / `RJCD` (Đề xuất Từ chối) | `OPEN` (Napas chờ Epay phát hành kết quả) |
| **Tab "Đã quá hạn"** | `Đã phản hồi` / `Chờ phản hồi` | 🟠 **Đã hết hạn** (Gateway IPN: `EXPI`) | `PRCD` / `RJCD` / `—` | 🟠 `EXPI` (Expired - Quá hạn 72h SLA Napas) |

---

## 2. MÔ TẢ CÁC BUSINESS RULES CHUNG (COMMON BUSINESS RULES)

### BR-GENERAL-01: Quy tắc Khung thời gian Giao dịch gốc &amp; SLA Hết hạn Tra soát
1. **Khung thời gian Giao dịch gốc:** Chỉ cho phép khởi tạo yêu cầu tra soát cho các giao dịch thanh toán gốc ở trạng thái *Thành công* phát sinh trong vòng **180 ngày** trở lại.
2. **SLA Hết hạn:** Khi Cổng Napas gửi thông điệp IPN `EXPI`, hệ thống tự động cập nhật Trạng thái hết hạn từ *Chưa hết hạn* sang *Đã hết hạn*.

### BR-GENERAL-02: Quy tắc Kiểm soát 4 mắt (Maker-Checker Separation)
Tài khoản người dùng thực hiện khởi tạo YCTS / lập câu trả lời (Vai trò **Đối soát**) không được phép tự phê duyệt bản ghi YCPD do chính mình tạo ra. Quyền duyệt thuộc về vai trò **Lãnh đạo**.

### BR-GENERAL-03: Cấu trúc Đồng bộ 2 Tầng Database (Service QR &amp; Merchant Management)
Hệ thống vận hành trên 2 tầng DB độc lập: DB Service QR (Gateway giao tiếp Napas) và DB Merchant Management (MM quản lý YCTS &amp; YCPD nội bộ). Khi có phát sinh điện tra soát thụ động TCTLTS từ Napas, DB MM bắt buộc phải tự động insert 01 bản ghi YCTS với trạng thái Tiến trình `Chờ xử lý`.

### BR-GENERAL-04: Quy tắc Hạch toán Hoàn trả, Báo có và Báo nợ
Chi tiết giao dịch hạch toán đối soát tại Phân hệ Tra soát bao gồm 3 loại khối hạch toán tài chính chính:
1. **Khối Thông tin Hoàn trả (Refund Block - 9 trường):** Ghi nhận giao dịch hoàn tiền xử lý tra soát.
2. **Khối Thông tin Báo có (Credit Block - 6 trường):** Ghi nhận giao dịch hạch toán cộng tiền/báo có số dư đối soát YCTS.
3. **Khối Thông tin Báo nợ (Debit Block - 6 trường):** Ghi nhận giao dịch hạch toán trừ tiền/báo nợ thu hồi sai sót (Dành riêng cho Phân hệ Tra soát đã nhận TCTLTS).

### BR-GENERAL-05: Quy tắc Hiển thị Khối thông tin Hạch toán theo Chiều Tra soát &amp; Loại Tra soát
Hiển thị các khối hạch toán tài chính tại Màn hình Chi tiết YCTS được quy định cụ thể như sau:
1. **Chiều Tra soát đã gửi (TCYCTS / UC-SENT-03):** Bao gồm cả **Khối Thông tin Hoàn trả (Refund Block - 9 trường)** khi Loại tra soát = `RQRN` VÀ **Khối Thông tin Báo có (Credit Block - 6 trường)** khi Loại tra soát = `RQSP` (Nhận điện hạch toán báo có từ Napas/Đối tác cho YCTS chủ động). **Tuyệt đối KHÔNG có Khối Báo nợ.**
2. **Chiều Tra soát đã nhận (TCTLTS / UC-RECV-03):** Bao gồm cả **Khối Thông tin Báo nợ (Debit Block - 6 trường)** và **Khối Thông tin Báo có (Credit Block - 6 trường)** khi Epay chấp nhận thu hồi sai sót và thực hiện hạch toán tài chính đối soát.
3. **Loại tra soát `RQNF` (Tra soát thông tin):** Ẩn toàn bộ các khối hạch toán tài chính (Hoàn trả / Báo nợ / Báo có) trên cả 2 chiều tra soát do không phát sinh dịch chuyển dòng tiền.

---

## 3. MA TRẬN PHÂN QUYỀN VAI TRÒ CHUẨN EPAY (RBAC MATRIX)

| Vai trò / Nhóm NSD | Tạo yêu cầu | Hủy yêu cầu | Xác nhận (Kỹ thuật / Kế toán) | Gửi phê duyệt | Phê duyệt (Lãnh đạo) | Từ chối (Lãnh đạo) | Hoàn tất | Xem chi tiết |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Đối soát** (Maker) | **X** | **x** | - | **x** | - | - | **x** | **x** |
| **Kỹ thuật** (IT Inspector) | - | - | **x** | - | - | - | - | **x** |
| **Kế toán** (Accounting) | - | - | **x** | - | - | - | - | **x** |
| **Lãnh đạo** (Checker / Manager) | - | - | - | - | **x** | **x** | - | **x** |

---

## 4. CHI TIẾT CÁC USE CASE TRA SOÁT ĐÃ GỬI (TCYCTS — TRA SOÁT CHỦ ĐỘNG / CHIỀU ĐI)

### 4.1. Use Case 1: Tra cứu và xem danh sách YCTS đã gửi (`BF29.1-UC-SENT-01`)
- **Use Case:** Tra cứu và xem danh sách YCTS đã gửi
- **ID:** `BF29.1-UC-SENT-01`
- **Description:** Tra cứu kết quả và xem danh sách các yêu cầu tra soát chủ động đã gửi theo Cấu trúc Trạng thái 3 Nhóm và bộ lọc điều kiện.
- **Actor:** Đối soát, Kỹ thuật, Kế toán, Lãnh đạo, Hệ thống MM
- **Trigger:** Người dùng chọn menu [Quản lý tra soát] > [Tra soát đã gửi].
- **Pre-Condition:** Tài khoản có quyền truy cập tab Tra soát đã gửi.
- **Post-Condition:** Hiển thị danh sách YCTS đã gửi thỏa mãn điều kiện lọc trên Table Grid.
- **Basic Flow:** 1. Mở màn hình Tra soát đã gửi; 2. Hệ thống hiển thị các tab ('Tất cả', 'Chờ xử lý', 'Đã kiểm tra', 'Chờ phê duyệt', 'Quá hạn', 'Chờ phản hồi', 'Đã phản hồi', 'Hoàn tất', 'Đã hủy'); 3. Chọn điều kiện lọc & Tìm kiếm; 4. Nhấp nút [Tùy chỉnh] mở popup tùy chỉnh danh sách cột.
- **Non-functional Requirement:** Hiển thị kết quả tra cứu < 2.0s cho 1,000 bản ghi.

### 4.2. Use Case 2: Tạo mới yêu cầu tra soát chủ động TCYCTS (`BF29.1-UC-SENT-02`)
- **Use Case:** Tạo mới yêu cầu tra soát chủ động (TCYCTS)
- **ID:** `BF29.1-UC-SENT-02`
- **Description:** Chuyên viên Đối soát tạo yêu cầu tra soát mới cho một giao dịch gốc thành công trong vòng 180 ngày.
- **Actor:** Đối soát (Maker)
- **Trigger:** Chọn nút [+ Tạo yêu cầu tra soát] tại màn hình Tra soát đã gửi.
- **Pre-Condition:** Giao dịch gốc phát sinh trong vòng 180 ngày và có trạng thái Thành công.
- **Post-Condition:** Sinh bản ghi YCTS mới trên DB MM ở trạng thái Chờ xử lý.
- **Basic Flow:** 1. Bấm [Tạo yêu cầu tra soát]; 2. Tra cứu chọn giao dịch gốc; 3. Nhập lý do, loại tra soát, số tiền, tệp chứng từ; 4. Bấm [Lưu Yêu cầu Tra soát].
- **Non-functional Requirement:** Thời gian ghi nhận DB < 1.0 giây.

### 4.3. Use Case 3: Xem chi tiết YCTS đã gửi (`BF29.1-UC-SENT-03`)
- **Use Case:** Xem chi tiết YCTS đã gửi (Bao gồm Khối Hoàn trả & Khối Báo có theo BR-GENERAL-05)
- **ID:** `BF29.1-UC-SENT-03`
- **Description:** Xem toàn bộ các khối thông tin chi tiết: Khối 1 Tiến trình, Khối 2 GD gốc (10 trường), Khối 3 Thông tin tra soát (11 trường tiêu chuẩn), Khối 4 Phê duyệt RBAC, Khối 5A Thông tin Hoàn trả (9 trường tiêu chuẩn khi RQRN), Khối 5B Thông tin Báo có (6 trường tiêu chuẩn khi RQSP/Báo có theo BR-GENERAL-05) và Khối 6 Audit Trail Timeline.
- **Actor:** Đối soát, Kỹ thuật, Kế toán, Lãnh đạo
- **Trigger:** Nhấp vào Mã tra soát (Hyperlink Mã YCTS) hoặc bấm biểu tượng [👁️ Xem chi tiết] tại menu Thao tác Grid View.
- **Pre-Condition:** Tài khoản người dùng đã đăng nhập hệ thống MM và có quyền xem chi tiết bản ghi tra soát.
- **Post-Condition:** Màn hình hiển thị đầy đủ các khối thông tin chi tiết read-only. Khối Hoàn trả hiển thị khi RQRN. Khối Báo có hiển thị khi RQSP/Báo có. Tuyệt đối KHÔNG hiển thị khối Báo nợ.
- **Basic Flow:** 1. Chọn 01 bản ghi YCTS và bấm [👁️ Xem chi tiết] hoặc nhấp Mã tra soát; 2. Hệ thống tải dữ liệu từ MM & Service QR DB; 3. Render Khối 1 Tiến trình; 4. Render Khối 2 GD gốc; 5. Render Khối 3 Thông tin tra soát 11 trường; 6. Render Khối 4 RBAC; 7. **Kiểm tra BR-GENERAL-05 theo Loại tra soát:** (RQRN ➔ Khối 5A Hoàn trả 9 trường; RQSP/Báo có ➔ Khối 5B Báo có 6 trường; RQNF ➔ Ẩn); 8. Render Khối 6 Audit Trail; 9. Cho phép in phiếu PDF hoặc quay lại danh sách.
- **Non-functional Requirement:** Thời gian tải và hiển thị < 1.5 giây.

### 4.4. Use Case 4: Xác nhận kiểm tra YCTS (`BF29.1-UC-SENT-04`)
- **Use Case:** Xác nhận kiểm tra YCTS (Role Kỹ thuật / Kế toán)
- **ID:** `BF29.1-UC-SENT-04`
- **Description:** Role Kỹ thuật / Kế toán rà soát dữ liệu log kỹ thuật hoặc số liệu hạch toán, sau đó nhấp [🔍 Xác nhận Đã kiểm tra] để chuyển trạng thái YCTS sang Đã kiểm tra.
- **Actor:** Kỹ thuật (IT Inspector), Kế toán (Accounting)
- **Trigger:** Mở bản ghi YCTS ở trạng thái Chờ xử lý và bấm [🔍 Xác nhận Kiểm tra].
- **Pre-Condition:** Bản ghi YCTS đang ở trạng thái Tiến trình Chờ xử lý thuộc luồng CÓ rà soát kiểm tra.
- **Post-Condition:** Chuyển trạng thái Tiến trình YCTS từ Chờ xử lý sang Đã kiểm tra và ghi log Audit Trail.
- **Basic Flow:** 1. Bấm [🔍 Xác nhận Kiểm tra]; 2. Hệ thống hiển thị form Rà soát Kiểm tra kèm thông tin Read-only Context; 3. Chọn Phân loại đối soát (Kỹ thuật/Kế toán); 4. Nhập Ghi chú rà soát dữ liệu; 5. Đính kèm tệp biên bản kiểm tra; 6. Bấm [🔍 Xác nhận Đã kiểm tra]; 7. Cập nhật DB MM sang Đã kiểm tra và quay lại danh sách.
- **Non-functional Requirement:** Thời gian phản hồi DB < 1.0 giây.

### 4.5. Use Case 5: Gửi phê duyệt YCTS (`BF29.1-UC-SENT-05`)
- **Use Case:** Gửi phê duyệt YCTS (Role Đối soát trình Lãnh đạo)
- **ID:** `BF29.1-UC-SENT-05`
- **Description:** Chuyên viên Đối soát trình Lãnh đạo duyệt. YCTS chuyển sang Tiến trình Chờ phê duyệt và sinh ra 01 bản ghi YCPD (ApprovePending) tại DB MM.
- **Actor:** Đối soát (Maker)
- **Trigger:** Chọn nút [📤 Gửi yêu cầu phê duyệt] từ mốc 'Chờ xử lý' (luồng KHÔNG kiểm tra) hoặc 'Đã kiểm tra' (luồng CÓ kiểm tra).
- **Pre-Condition:** Bản ghi YCTS ở trạng thái Chờ xử lý (luồng KHÔNG kiểm tra) hoặc Đã kiểm tra (luồng CÓ kiểm tra).
- **Post-Condition:** Cập nhật trạng thái YCTS sang Chờ phê duyệt (ApprovePending) và sinh ra 01 bản ghi YCPD mới trên DB MM.
- **Basic Flow:** 1. Bấm [📤 Gửi yêu cầu phê duyệt]; 2. Mở form Trình Phê duyệt YCPD Nội bộ; 3. Kiểm tra tiêu đề (Auto-fill) và nhập Nội dung tóm tắt đề xuất; 4. Đính kèm tệp tờ trình; 5. Bấm [📤 Gửi yêu cầu phê duyệt]; 6. Sinh bản ghi YCPD ApprovePending, chuyển YCTS sang Chờ phê duyệt và gửi notification cho Lãnh đạo.
- **Non-functional Requirement:** Sinh bản ghi YCPD thời gian thực < 1.0 giây.

### 4.6. Use Case 6: Phê duyệt / Từ chối YCTS (`BF29.1-UC-SENT-06`)
- **Use Case:** Phê duyệt / Từ chối YCTS (Role Lãnh đạo / Checker)
- **ID:** `BF29.1-UC-SENT-06`
- **Description:** Role Lãnh đạo / Checker duyệt đề xuất YCPD và kích hoạt Service QR phát hành thông điệp điện tra soát sang Napas. Nếu Từ chối, YCPD status = Cancel.
- **Actor:** Lãnh đạo (Checker / Manager)
- **Trigger:** Lãnh đạo mở bản ghi YCPD ở mốc Chờ phê duyệt và chọn nút [✅ Đồng ý Phê duyệt] hoặc [❌ Từ chối Phê duyệt].
- **Pre-Condition:** Bản ghi YCPD đang ở trạng thái ApprovePending và tài khoản Lãnh đạo có quyền phê duyệt (Khác tài khoản Đối soát khởi tạo).
- **Post-Condition:** Nếu Đồng ý: YCPD = Approved, YCTS = Đã phê duyệt ➔ Chờ phản hồi & phát hành sang Napas. Nếu Từ chối: YCPD = Cancel, YCTS = Đã hủy / Từ chối.
- **Basic Flow:** 1. Mở bản ghi YCPD Chờ phê duyệt; 2. Xem Banner YCPD và Hồ sơ chi tiết; 3. (Đồng ý): Nhập ý kiến tùy chọn ➔ Bấm [✅ Đồng ý Phê duyệt] ➔ Chuyển YCTS sang Chờ phản hồi & phát hành sang Napas; 4. (Từ chối): Nhập lý do từ chối ➔ Bấm [❌ Từ chối Phê duyệt] ➔ Chuyển YCPD = Cancel & YCTS = Đã hủy; 5. Ghi log Audit Trail.
- **Non-functional Requirement:** Xử lý phát hành API Service QR Gateway < 2.0 giây.

### 4.7. Use Case 7: Chờ xử lý đối tác (`BF29.1-UC-SENT-07`)
- **Use Case:** Chờ xử lý đối tác (Waiting Partner Response)
- **ID:** `BF29.1-UC-SENT-07`
- **Description:** Theo dõi bản ghi ở mốc Chờ phản hồi khi Service QR Gateway status = OPEN. Khi Cổng Napas gửi phản hồi IPN (PRCD, RJCD, EXPI), hệ thống tự động cập nhật YCTS sang Tiến trình Đã phản hồi.
- **Actor:** Hệ thống Service QR Gateway, Cổng Napas, Chuyên viên Đối soát
- **Trigger:** Hệ thống Service QR Gateway nhận thông điệp Webhook / IPN phản hồi từ phía Napas.
- **Pre-Condition:** Bản ghi YCTS đã được Lãnh đạo duyệt và Service QR đã phát hành thông điệp thành công sang Napas (OPEN).
- **Post-Condition:** Tự động gán trạng thái Tiến trình YCTS sang Đã phản hồi, đồng bộ Trạng thái xử lý YCTS (PRCD/RJCD) và Trạng thái hết hạn (Đã hết hạn nếu quá SLA).
- **Basic Flow:** 1. YCTS ở mốc Chờ phản hồi (đếm ngược SLA 72h); 2. Napas gửi callback IPN; 3. Cổng Service QR tiếp nhận và bóc tách mã phản hồi; 4. Gọi webhook nội bộ sang MM; 5. Hệ thống MM cập nhật Tiến trình sang Đã phản hồi; 6. Cập nhật Trạng thái xử lý YCTS & Hết hạn; 7. Ghi log Audit Trail và thông báo cho Đối soát.
- **Non-functional Requirement:** Cập nhật dữ liệu tự động < 500ms.

### 4.8. Use Case 8: Hoàn tất YCTS đã gửi (`BF29.1-UC-SENT-08`)
- **Use Case:** Hoàn tất YCTS đã gửi (Dispute Process Completion)
- **ID:** `BF29.1-UC-SENT-08`
- **Description:** Kết thúc toàn bộ quy trình tra soát và hạch toán kế toán đối soát số liệu hoàn tiền / báo có. YCTS chuyển sang trạng thái Tiến trình Hoàn tất.
- **Actor:** Đối soát, Kế toán, Hệ thống MM
- **Trigger:** Đối soát / Kế toán thực hiện hạch toán hoàn tiền đối soát thành công và bấm [Hoàn tất tra soát].
- **Pre-Condition:** Bản ghi YCTS ở trạng thái Tiến trình Đã phản hồi và kết quả hạch toán số liệu đối soát kế toán đã được xác nhận.
- **Post-Condition:** Chuyển trạng thái Tiến trình YCTS sang Hoàn tất (Completed) - Khóa bản ghi không cho sửa đổi dữ liệu.
- **Basic Flow:** 1. Mở bản ghi YCTS ở mốc Đã phản hồi; 2. Hiển thị Khối Hạch toán Kế toán Đối soát & Đóng Bản ghi; 3. Kiểm tra Mã chứng từ hoàn tiền / báo có và số tiền hạch toán hoàn tất đối soát số liệu; 4. Bấm [Hoàn tất tra soát]; 5. Cập nhật Tiến trình YCTS sang Hoàn tất và khóa read-only hồ sơ; 6. Xuất phiếu hoàn tất PDF & lưu log Audit Trail.
- **Non-functional Requirement:** Đóng và khóa bản ghi an toàn 100%, chống sửa đổi trùng lặp.
