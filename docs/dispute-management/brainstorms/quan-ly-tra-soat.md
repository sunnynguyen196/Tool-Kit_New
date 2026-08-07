---
type: brainstorm
feature: dispute-management
status: draft
updated: 2026-07-22
links: []
---

# Tính năng Quản lý tra soát

## 1. Idea Seed

Xây dựng tính năng mới trên hệ thống "Quản lý tra soát" (MM) để tự động hóa và quản lý tập trung các yêu cầu tra soát giao dịch.
Gồm các chức năng chính như sau:
1. Màn hình quản lý các yêu cầu tra soát (Bộ lọc, danh sách chia theo tab trạng thái).
2. Màn hình tạo yêu cầu tra soát (Tìm kiếm giao dịch gốc, nhập thông tin loại, lý do, đính kèm file).
3. Màn hình xem chi tiết và trả lời yêu cầu tra soát (Thao tác phản hồi đồng ý/từ chối).

## 2. Context

* **Bối cảnh nghiệp vụ:** Hiện tại quy trình tra soát giao dịch đang được thực hiện thủ công, dẫn đến tốn nhiều thời gian và nguồn lực. Các loại hình giao dịch gốc phức tạp và mỗi chiều giao dịch lại có các vai trò tra soát khác nhau theo từng mã.
* **Mục tiêu:** Tối ưu hóa hiệu năng đối soát của hệ thống thông qua việc tự động hóa luồng tra soát API với các đối tác thanh toán bên ngoài (Napas/Epay) và đối soát nội bộ. Hệ thống MM đóng vai trò là Hub quản lý và lưu trữ dữ liệu.

## 3. User Types (preliminary)

| User Type | Pain Point | Primary Need |
|-----------|-----------|--------------|
| **Nhân viên Vận hành MM (MM Creator/Approver/Reconciler)** | Tra soát thủ công tốn thời gian, dễ sai sót dữ liệu và khó theo dõi trạng thái yêu cầu của đối tác. | Công cụ tạo, phê duyệt và xử lý phản hồi tra soát nhanh chóng, theo dõi trạng thái tức thời. |
| **Đối tác Thanh toán (Napas/Epay/NP)** | Quy trình kết nối đối soát bất đồng bộ phức tạp, thiếu cổng API chuẩn hóa để gửi yêu cầu và nhận kết quả. | API chuẩn hóa để tự động gửi yêu cầu tra soát và nhận kết quả phản hồi tự động từ MM. |

## 4. Capabilities Breakdown

### P0 — must have
* **Màn hình Danh sách tra soát:**
  * Bộ lọc tìm kiếm: MerchantCode, Đối tác thanh toán, Loại dịch vụ (Thanh toán, Chuyển tiền), Vai trò giao dịch gốc (TCPL, TCNL), Vai trò tra soát (TCYCTS, TCTLTS), Trạng thái tra soát (Chờ phê duyệt, Khởi tạo, Chờ xử lý, Thất bại, Quá hạn, Đồng ý, Từ chối, Đồng ý sau hết hạn, Từ chối sau hết hạn), Loại tra soát (RQRN, RQSP, GDFT, RQNF), Thời gian tạo yêu cầu, Thời gian xử lý, Người tạo yêu cầu (User hệ thống, Ví Epay, Đối tác), Người phê duyệt.
  * Phân chia Grid dữ liệu theo các Tab: Tất cả, Chờ phê duyệt, Chờ xử lý, Quá hạn.
  * Hiển thị các trường tin: STT, Mã tra soát, Loại tra soát, Lý do (BANK, CUST, FRAU đối với RQSP), Trạng thái, Vai trò tra soát, Mã giao dịch gốc, Loại giao dịch gốc, Thời gian tạo, Thời gian xử lý.
  * Thao tác: Xem chi tiết, Cập nhật yêu cầu.
* **Màn hình Tạo yêu cầu tra soát chủ động (MM là TCNL):**
  * Tìm kiếm giao dịch gốc (Thanh toán / Chuyển tiền, vai trò TCNL).
  * Điền thông tin tra soát: Loại tra soát, Lý do tra soát, Số tiền tra soát, Nội dung mô tả chi tiết, Tải lên tệp đính kèm (tối đa 1 file).
  * Gửi yêu cầu sang trạng thái "Chờ phê duyệt".
* **Phê duyệt yêu cầu tra soát chủ động:**
  * Cho phép người phê duyệt MM duyệt yêu cầu.
  * Khi duyệt: Gọi sang Service QR. Nếu QR check hợp lệ thì lưu trạng thái "Khởi tạo" và QR gọi sang đối tác NP. Nếu QR check thất bại hoặc lỗi kết nối/timeout thì lưu trạng thái "Thất bại".
* **API tiếp nhận yêu cầu tra soát thụ động:**
  * Tiếp nhận yêu cầu đối tác gọi qua API. Validate yêu cầu qua Service QR, nếu hợp lệ hiển thị trên MM với trạng thái "Chờ xử lý" (không cần phê duyệt).
* **Màn hình Xem chi tiết & Phản hồi:**
  * Đối soát viên xem thông tin chi tiết và đính kèm của yêu cầu tra soát do đối tác gửi.
  * Nhập phản hồi "Đồng ý" hoặc "Từ chối". QR cập nhật trạng thái nội bộ và gọi phản hồi sang NP.

### P1 — should have
* **Luồng xử lý phụ (Chỉ xem):** Hiển thị các yêu cầu tra soát không xuất phát từ MM nhưng đi qua Service QR. Trên MM chỉ cho phép xem chi tiết, ẩn toàn bộ thao tác cập nhật/trả lời.
* **Thông báo tức thời:** Gửi cảnh báo/thông báo giao dịch tra soát mới, cập nhật trạng thái và cảnh báo khẩn cấp (high priority) khi quá hạn qua kênh Telegram group của đội vận hành đối soát.

### P2 — nice to have
* **Nhật ký thay đổi (Audit Log):** Ghi nhận chi tiết lịch sử thay đổi trạng thái yêu cầu tra soát (người thao tác, hành động phê duyệt/trả lời, thời gian, trạng thái trước/sau) và hiển thị trực quan trong màn hình Xem chi tiết.

## 5. Core Flows (Happy Path)

### 5.1 Tạo yêu cầu tra soát (YCTS) chủ động từ MM

1. Nhân viên MM vào màn hình danh sách, chọn nút "Tạo yêu cầu".
2. Hệ thống hiển thị màn hình tìm kiếm giao dịch gốc (Thanh toán hoặc Chuyển tiền) mà MM đóng vai trò là Tổ chức nhận lệnh (TCNL).
3. Nhân viên chọn giao dịch gốc, nhập các thông tin: Loại tra soát, Lý do, Số tiền tra soát, Nội dung chi tiết, đính kèm 1 file hình ảnh/bill giao dịch và bấm gửi.
4. Hệ thống MM ghi nhận yêu cầu phê duyệt với trạng thái ban đầu là "Chờ phê duyệt".
5. Người phê duyệt MM kiểm tra thông tin và thực hiện duyệt yêu cầu.
6. Hệ thống MM gọi API sang Service QR. Service QR kiểm tra tính hợp lệ nghiệp vụ:
   * Nếu hợp lệ: Service QR lưu bản ghi trạng thái "Khởi tạo" (Initiated) và gửi yêu cầu sang đối tác NP. Đồng thời MM hiển thị trạng thái "Khởi tạo".
   * Nếu không hợp lệ: Ghi nhận trạng thái "Thất bại" (Failed).
7. Đối tác NP tiếp nhận, phản hồi HTTP Status 200 (hoặc khác 200). 
   * Nếu HTTP 200: Trạng thái trên QR/MM cập nhật sang "Chờ xử lý" (Pending Processing).
   * Nếu HTTP khác 200 hoặc lỗi kết nối: Trạng thái cập nhật sang "Thất bại" (Failed).
8. Đối tác NP xử lý nghiệp vụ xong và phản hồi trả lời tra soát qua API của Service QR: Trạng thái cập nhật sang "Đồng ý" (Approved) hoặc "Từ chối" (Rejected).

```
[User MM]                  [Hệ thống MM]               [Service QR]                 [Đối tác NP]
    │                            │                            │                          │
    │ 1. Tạo yêu cầu tra soát    │                            │                          │
    ├───────────────────────────>│                            │                          │
    │                            │ 2. Lưu DB MM               │                          │
    │                            │    Trạng thái:             │                          │
    │                            │    "Chờ phê duyệt"         │                          │
    │                            │                            │                          │
    │ 3. Phê duyệt yêu cầu       │                            │                          │
    ├───────────────────────────>│                            │                          │
    │                            │ 4. Gọi API                 │                          │
    │                            ├───────────────────────────>│                          │
    │                            │                            │ 5. Kiểm tra QR           │
    │                            │                            │    - Hợp lệ?             │
    │                            │                            │      ├── Không ─────────>│ (Lưu DB QR: "Thất bại")
    │                            │                            │      │                   │ (Đồng bộ hiển thị MM: "Thất bại")
    │                            │                            │      └── Có              │
    │                            │                            │          │               │
    │                            │                            │          │ 6. Lưu DB QR  │
    │                            │                            │          │    ("Khởi tạo")
    │                            │                            │          │               │
    │                            │                            │          │ 7. Gọi API YCTS│
    │                            │                            │          ├──────────────>│
    │                            │                            │          │               │ 8. Trả về HTTP Status
    │                            │                            │          │<──────────────┤
    │                            │                            │          │               │ - HTTP = 200?
    │                            │                            │          │               │   ├── Không ──> (Lưu DB QR: "Thất bại")
    │                            │                            │          │               │   └── Có ─────> (Lưu DB QR: "Chờ xử lý")
    │                            │                            │          │               │
    │                            │                            │          │               │ (Đối tác NP xử lý nghiệp vụ...)
    │                            │                            │          │               │
    │                            │                            │          │ 9. Gọi API    │
    │                            │                            │          │    TLTS       │
    │                            │                            │          │<──────────────┤ (Đồng ý/Từ chối, Hết hạn,
    │                            │                            │          │               │  Đồng ý/Từ chối sau hết hạn)
    │                            │                            │          │               │
    │                            │                            │          │ 10. Cập nhật  │
    │                            │                            │          │     DB QR &   │
    │                            │                            │          │     hiển thị  │
    │                            │                            │          │     trên MM   │
```

### 5.2 Tiếp nhận và phản hồi YCTS từ đối tác (Epay/Napas)

1. Đối tác NP gọi API gửi yêu cầu tra soát.
2. Service QR tiếp nhận và kiểm tra tính hợp lệ. Nếu hợp lệ, Service QR lưu bản ghi trạng thái "Chờ xử lý" (Pending Processing) và đồng bộ thông tin về hiển thị trên hệ thống MM.
3. Nhân viên đối soát MM truy cập màn hình danh sách, vào tab "Chờ xử lý" để xem chi tiết yêu cầu và file đính kèm.
4. Đối soát viên thực hiện trả lời tra soát (đồng ý hoặc từ chối phản hồi) trực tiếp trên giao diện MM (không cần phê duyệt).
5. Hệ thống MM gọi API sang Service QR để cập nhật trạng thái nội bộ thành "Đồng ý" hoặc "Từ chối".
   * *Lưu ý:* Nếu trạng thái yêu cầu hiện tại đang là "Quá hạn", QR sẽ chuyển trạng thái thành "Đồng ý sau hết hạn" hoặc "Từ chối sau hết hạn".
6. Service QR gọi API trả lời tra soát sang đối tác NP.
7. Đối tác NP phản hồi lại trạng thái kết quả cuối cùng qua API, QR ghi nhận trạng thái cuối này vào một trường riêng biệt trong cơ sở dữ liệu để đối chiếu.

```
[Đối tác NP]               [Service QR]                 [Đối soát MM]               [Hệ thống MM]
     │                            │                            │                          │
     │ 1. Gọi API YCTS            │                            │                          │
     ├───────────────────────────>│                            │                          │
     │                            │ 2. Validate yêu cầu        │                          │
     │                            │    - Hợp lệ?               │                          │
     │                            │      ├── Không ───────────>│ (Trả về lỗi API cho NP)  │
     │                            │      └── Có                │                          │
     │                            │          │                 │                          │
     │                            │          │ 3. Lưu DB QR    │                          │
     │                            │          │    ("Chờ xử lý")│                          │
     │                            │          │                 │                          │
     │                            │          │ 4. Hiển thị     │                          │
     │                            │          │    trên MM      │                          │
     │                            │          │                 ├─────────────────────────>│ (Đối soát MM truy cập màn hình)
     │                            │          │                 │                          │
     │                            │          │                 │ 5. Kiểm tra & Trả lời    │
     │                            │          │                 │    (Đồng ý/Từ chối)      │
     │                            │          │                 ├─────────────────────────>│
     │                            │          │                 │                          │
     │                            │          │ 6. Cập nhật     │                          │
     │                            │          │    Trạng thái   │                          │
     │                            │          │    Nội bộ QR:   │                          │
     │                            │          │    - Nếu bình thường ──> "Đồng ý/Từ chối" │
     │                            │          │    - Nếu đã Quá hạn ──> "Đồng ý/Từ chối sau hết hạn"
     │                            │          │                 │                          │
     │                            │ 7. Gọi API TLTS sang NP    │                          │
     │<───────────────────────────┼──────────┤                 │                          │
     │                            │          │                 │                          │
     │ 8. Trả về trạng thái cuối  │          │                 │                          │
     ├───────────────────────────>│          │                 │                          │
     │                            │ 9. Lưu trạng thái cuối này │                          │
     │                            │    vào trường riêng ở DB   │                          │
```

## 6. System Behavior Deep Dive

### 6.1 Decision Points

| ID | Flow | Khi nào | YES (nhánh đồng ý) | NO (nhánh từ chối) |
|---|---|---|---|---|
| D1 | Duyệt YCTS chủ động từ MM | Người duyệt bấm đồng ý phê duyệt trên hệ thống MM | MM gọi API sang Service QR để xử lý tiếp. | Yêu cầu giữ nguyên trạng thái "Chờ phê duyệt" hoặc hủy yêu cầu. |
| D2 | Validate nghiệp vụ tại QR | QR nhận được thông tin YCTS được duyệt từ MM | Insert YCTS mới vào DB QR với trạng thái "Khởi tạo" và gọi sang NP. | Cập nhật DB QR và hiển thị trên MM với trạng thái "Thất bại" kèm mã lỗi chi tiết. |
| D3 | Phản hồi HTTP từ đối tác NP | QR gọi API gửi YCTS sang đối tác NP thành công | Trạng thái cập nhật thành "Chờ xử lý" (nếu NP trả về HTTP 200). | Trạng thái cập nhật thành "Thất bại" (nếu NP trả về HTTP khác 200 hoặc lỗi timeout/kết nối). |
| D4 | Xử lý TLTS khi quá hạn | MM thực hiện phản hồi (TLTS) cho yêu cầu đối tác gửi sang | Nếu trạng thái hiện tại là bình thường: chuyển sang "Đồng ý" / "Từ chối". | Nếu trạng thái hiện tại đang là Quá hạn: chuyển sang "Đồng ý sau hết hạn" / "Từ chối sau hết hạn". |

### 6.2 Scenario Matrix

| From State | To State | Rule | Action | Result |
|------------|----------|------|--------|--------|
| **Chờ phê duyệt** | **Khởi tạo** | Người phê duyệt MM duyệt yêu cầu thành công + QR validate hợp lệ | MM gọi QR, QR insert bản ghi "Khởi tạo" | Trạng thái hiển thị trên MM cập nhật sang "Khởi tạo" |
| **Chờ phê duyệt** | **Thất bại** | Người phê duyệt MM duyệt thành công nhưng QR check không hợp lệ hoặc lỗi kết nối | Ghi nhận trạng thái "Thất bại" trong DB QR và đồng bộ về MM | Trạng thái hiển thị trên MM chuyển sang "Thất bại" |
| **Khởi tạo** | **Chờ xử lý** | QR gọi sang đối tác NP nhận phản hồi HTTP Status 200 | Cập nhật DB QR | Yêu cầu chuyển sang trạng thái "Chờ xử lý" trên MM |
| **Khởi tạo** | **Thất bại** | QR gọi sang đối tác NP nhận phản hồi HTTP khác 200 hoặc lỗi kết nối/timeout | Cập nhật DB QR | Yêu cầu chuyển sang trạng thái "Thất bại" trên MM |
| **Chờ xử lý** | **Quá hạn** | Đối tác NP gọi API cập nhật trạng thái hết hạn xử lý (áp dụng cho cả 2 vai trò TCYC và TCTL) | Cập nhật trạng thái trong DB QR và hiển thị lên MM | Yêu cầu chuyển sang trạng thái "Quá hạn" trên MM |
| **Quá hạn** | **Đồng ý sau hết hạn** | Yêu cầu đang ở trạng thái Quá hạn nhưng đối soát viên MM hoặc đối tác NP vẫn gửi phản hồi Đồng ý | QR cập nhật trạng thái nội bộ | Yêu cầu chuyển sang trạng thái "Đồng ý sau hết hạn" |
| **Quá hạn** | **Từ chối sau hết hạn** | Yêu cầu đang ở trạng thái Quá hạn nhưng đối soát viên MM hoặc đối tác NP vẫn gửi phản hồi Từ chối | QR cập nhật trạng thái nội bộ | Yêu cầu chuyển sang trạng thái "Từ chối sau hết hạn" |

### 6.3 State Transitions

```
[Khởi tạo YCTS từ MM] -> Chờ phê duyệt ──> Khởi tạo ──> Chờ xử lý ──> Đồng ý / Từ chối
                                       ↳ Thất bại   ↳ Quá hạn ──> Đồng ý sau hết hạn / Từ chối sau hết hạn
                                                    ↳ Thất bại
```

| Entity | Từ | Sang | Trigger | Quay lại được? |
|--------|------|----|---------|-------------|
| Yêu cầu tra soát | Chờ phê duyệt | Khởi tạo | Người duyệt MM đồng ý + QR check hợp lệ | Không |
| Yêu cầu tra soát | Chờ phê duyệt | Thất bại | Người duyệt MM đồng ý nhưng QR check không hợp lệ hoặc lỗi kết nối | Không |
| Yêu cầu tra soát | Khởi tạo | Chờ xử lý | NP nhận yêu cầu thành công và trả về HTTP 200 | Không |
| Yêu cầu tra soát | Khởi tạo | Thất bại | NP trả về HTTP khác 200 hoặc xảy ra lỗi kết nối/timeout | Không |
| Yêu cầu tra soát | Chờ xử lý | Quá hạn | Đối tác NP gọi API báo hết hạn thời gian đối soát | Không |
| Yêu cầu tra soát | Quá hạn | Đồng ý sau hết hạn | Nhận được câu trả lời Đồng ý sau khi đã bị Quá hạn | Không |
| Yêu cầu tra soát | Quá hạn | Từ chối sau hết hạn | Nhận được câu trả lời Từ chối sau khi đã bị Quá hạn | Không |

### 6.4 Interrupted Transactions

| Tình huống | Hệ thống còn lại gì | Resume | Cleanup |
|---|---|---|---|
| Gọi Service QR bị lỗi kết nối/timeout khi phê duyệt | Bản ghi yêu cầu phê duyệt trên MM vẫn ở trạng thái Chờ phê duyệt hoặc chuyển Thất bại tùy cấu hình | Người vận hành bấm phê duyệt lại để kích hoạt gọi lại API | Sau X lần thử lại thất bại thì đánh dấu trạng thái "Thất bại" trên MM |
| Service QR gọi sang đối tác NP bị lỗi kết nối/timeout | Bản ghi trên QR đã được tạo với trạng thái Khởi tạo, đối tác NP chưa ghi nhận | QR thực hiện tự động gọi lại (retry) API sang NP | Nếu retry quá 3 lần vẫn thất bại, cập nhật trạng thái sang "Thất bại" trên MM |
| Link đính kèm file tải lên bị lỗi hoặc mất kết nối giữa chừng | Bản ghi tra soát được tạo thành công nhưng trường thông tin file đính kèm bị trống | Đối soát viên vào chức năng "Cập nhật yêu cầu" để thực hiện tải lại file đính kèm | Tự động xóa các file rác tải lên dở dang trong thư mục tạm sau 24 giờ |

### 6.5 Other Edge Cases

* **Tải file đính kèm dung lượng lớn:** Khi tải file bill đính kèm, nếu kích thước file lớn hơn giới hạn cho phép (ví dụ >5MB) hoặc sai định dạng (không phải PDF/JPG/PNG), hệ thống MM cần chặn ngay từ phía giao diện và hiển thị thông báo lỗi rõ ràng cho người dùng, thay vì để gửi lên server gây lỗi API.

## 7. Validation, Limits & Wording

### 7.1 Validation rules

| Field | Rule |
|---|---|
| **Thông tin tra soát tạo từ MM** | Bắt buộc chọn từ kết quả tìm kiếm giao dịch gốc (Loại dịch vụ: Thanh toán hoặc Chuyển tiền, vai trò TCNL). |
| **Loại tra soát & Lý do** | Bắt buộc chọn từ Dropdown list. |
| **Số tiền tra soát** | Số tiền tra soát phải lớn hơn 0 và nhỏ hơn hoặc bằng số tiền của giao dịch gốc được chọn. |
| **Tệp đính kèm** | Chỉ cho phép tải lên **tối đa 1 file**. Định dạng file hợp lệ: `.pdf`, `.png`, `.jpg`. Dung lượng tối đa: **5MB**. |
| **Nội dung mô tả** | Không bắt buộc, giới hạn tối đa 500 ký tự. |

### 7.2 Limits & Quotas (exact values)

| Tham số | Giá trị | Window | Behavior khi vượt |
|---|---|---|---|
| **Số lượng file đính kèm** | 1 file | Mỗi yêu cầu tra soát | Chặn tải lên file thứ 2 |
| **Dung lượng file tối đa** | 5MB | Mỗi file tải lên | Chặn lưu file và hiển thị cảnh báo lỗi kích thước |
| **Thời gian hết hạn xử lý (SLA)** | 3 - 5 ngày làm việc (Tùy theo mã nghiệp vụ giao dịch) | Từ lúc đối tác gửi yêu cầu | Đối tác NP gọi API cập nhật trạng thái sang "Quá hạn" |

### 7.3 Wording samples (exact strings)

#### Error messages

| Tình huống | Wording | Code |
|---|---|---|
| Người dùng tải lên file đính kèm lớn hơn 5MB | "Dung lượng tệp đính kèm vượt quá giới hạn cho phép (Tối đa 5MB). Vui lòng kiểm tra lại." | E-DISP-001 |
| Người dùng tải file đính kèm sai định dạng | "Định dạng tệp đính kèm không hợp lệ. Chỉ chấp nhận các tệp tin dạng .pdf, .png, .jpg." | E-DISP-002 |
| Lỗi kết nối hoặc QR check không hợp lệ khi phê duyệt | "Duyệt yêu cầu tra soát thất bại. Chi tiết lỗi hệ thống: [Mã lỗi và thông điệp chi tiết nguyên văn trả về từ Service QR]" | E-DISP-003 |

## 8. Assumptions

* **Đối tác kết nối API:** Epay và Napas có cổng tiếp nhận API tra soát và trả lời tra soát đồng bộ theo đúng chuẩn thiết kế của Service QR.
* **Thời gian xử lý đối soát:** Các giao dịch gốc luôn có thể được định danh duy nhất thông qua mã giao dịch gốc trên hệ thống MM và Service QR để liên kết chính xác.
* **Định dạng file:** Ảnh chụp giao dịch (bill) là minh chứng duy nhất cần đính kèm và dung lượng 5MB đủ để lưu trữ rõ ràng thông tin hóa đơn.
* **Đồng bộ file đính kèm:** Định dạng file đính kèm và dung lượng tối đa 5MB đã đồng bộ hoàn toàn với giới hạn xử lý của Service QR và đối tác NP (Napas/Epay).

## 9. Risks

| Rủi ro | Khả năng | Hậu quả nghiệp vụ | Cách phòng |
|--------|----------|-------------------|-----------|
| **Adoption:** Nhân viên vận hành không kịp thời xử lý YCTS từ đối tác do không có cảnh báo tức thời. | thỉnh thoảng | Yêu cầu bị trễ hạn, trạng thái chuyển sang "Quá hạn" làm ảnh hưởng đến cam kết chất lượng dịch vụ (SLA) và dòng tiền. | Tích hợp gửi thông báo khẩn cấp tức thời sang Telegram group nghiệp vụ đối soát ngay khi có YCTS mới hoặc cập nhật trạng thái. |
| **Data:** File đính kèm tải lên từ đối tác hoặc MM bị lỗi truyền dẫn hoặc dung lượng quá lớn làm nghẽn luồng gọi API sang QR Service. | thỉnh thoảng | Hệ thống báo lỗi gọi API hoặc không hiển thị được bằng chứng tra soát trên MM. | Áp dụng chẽ quy tắc validate dung lượng tệp tin (tối đa 5MB, 1 file duy nhất) ở cả đầu vào API và giao diện MM. |

## 10. Success Criteria (preliminary)

* **Giảm thiểu thời gian đối soát:** Rút ngắn thời gian xử lý một yêu cầu tra soát từ trung bình 24 giờ thủ công xuống còn dưới 1 giờ (nhờ luồng API tự động).
* **Tỷ lệ xử lý đúng hạn:** Đạt tỷ lệ xử lý tra soát đúng hạn (SLA 3-5 ngày làm việc) tối thiểu là 98%.
* **Độ chính xác dữ liệu:** Đảm bảo 100% các yêu cầu tra soát đều liên kết chính xác với giao dịch gốc và được ghi nhận đầy đủ lịch sử thay đổi trạng thái.

## 11. Open Questions

* [x] **OQ-1:** Định dạng file đính kèm và dung lượng tối đa 5MB đã đồng bộ hoàn toàn với giới hạn xử lý của Service QR và đối tác NP (Napas/Epay) chưa? ➔ *Đã chốt: Đồng bộ hoàn toàn.*
* [x] **OQ-2:** Khi đối tác NP gọi API cập nhật trạng thái "Quá hạn", hệ thống MM ngoài việc cập nhật trạng thái hiển thị thì có cần gửi thông báo khẩn cấp (high priority) qua Telegram group hay không? ➔ *Đã chốt: Có gửi qua Telegram.*
* [x] **OQ-3:** Khi phê duyệt YCTS chủ động thất bại do QR Service check lỗi, mã lỗi trả về chi tiết có cần được ánh xạ sang một bảng từ điển ngôn ngữ hiển thị thân thiện trên MM hay hiển thị nguyên văn message từ QR? ➔ *Đã chốt: Hiển thị nguyên văn mã lỗi từ QR.*

## 12. Next Steps

Sau brainstorm này (sau khi BA approve):
* `/urd dispute-management` — capture user perspective
* `/brd dispute-management` — business case
* `/prd dispute-management` — product scope
