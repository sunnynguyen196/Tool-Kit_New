---
type: brainstorm
feature: payment-link
status: draft
updated: 2026-10-15
links:
  - seed: "brainstorm session @duongnta — xây dựng tính năng thanh toán bằng payment link trên Merchant Admin, tham khảo luồng 9Pay/VNPay"
---

# Payment Link — Thanh toán qua đường dẫn trên Merchant Admin

## 1. Idea Seed

Merchant (MC) không có hệ thống quản lý đơn hàng/giao dịch riêng. TGTT cung cấp trang Merchant Admin (MA) để MC tạo payment link, chia sẻ cho khách hàng (KH) thanh toán — không cần KH đăng nhập, không cần MC tích hợp API.

## 2. Context

Nội bộ công ty đáp ứng nhu cầu các merchant muốn sử dụng cổng thanh toán nhưng không có trang quản lý riêng. Tham khảo mô hình tương tự của 9Pay (hệ thống hóa đơn) và VNPay (hosted payment page). Tính năng phục vụ MC nhỏ/vừa, hoạt động hoàn toàn trên MA do TGTT cung cấp.

## 3. User Types

| User Type | Pain Point | Primary Need |
|---|---|---|
| **MC Admin** | Không có hệ thống quản lý đơn hàng/giao dịch riêng | Tạo và quản lý payment link trên MA của TGTT |
| **MC Staff** | Cần tạo đơn nhanh không qua lập trình | Tạo payment link, copy/gửi link cho KH |
| **Khách hàng (KH)** | Nhận link/QR từ MC, cần trả tiền nhanh không phức tạp | Mở link, xác nhận điều khoản, chọn PTTT, thanh toán |

## 4. Capabilities Breakdown

### P0 — must have

- MC tạo đơn hàng với đầy đủ thông tin bắt buộc trên MA
- Hệ thống sinh payment link + mã QR sau khi tạo đơn
- MC copy link hoặc QR để chia sẻ thủ công cho KH
- KH mở link → xác nhận điều khoản TGTT → chọn PTTT → thanh toán
- KH thấy trang thành công / lỗi sau thanh toán
- Gửi email kèm hóa đơn cho KH sau khi thanh toán thành công
- Đơn hàng có 4 trạng thái: Chờ thanh toán / Thành công / Thất bại / Hết hạn

### P1 — should have

- MC chọn gửi email chứa payment link cho KH ngay khi tạo đơn (qua Core CTT)
- Email template song ngữ VI/EN theo ngôn ngữ đã chọn khi tạo đơn
- Hosted Form hiển thị đúng ngôn ngữ theo cấu hình đơn hàng (VI/EN)
- PTTT hiển thị theo cấu hình onboard MC (không phải cấu hình cứng)
- Hosted Form hiển thị: Digital Wallet, Mã KM, Số tiền được giảm, QR thanh toán

### P2 — nice to have

- MC xem lịch sử đơn hàng / trạng thái thanh toán trên MA
- Tìm kiếm, lọc đơn hàng theo trạng thái / thời gian

## 5. Core Flows (Happy Path)

### 5.1 MC tạo Payment Link và gửi cho KH

1. MC đăng nhập MA, vào menu **Payment Link**.
2. MC nhấn "Tạo đơn hàng mới", điền đầy đủ thông tin form (xem Mục 7.1).
3. MC nhấn "Tạo" — hệ thống gọi `create_order` lên Core CTT (gồm thông tin đơn, PTTT=PaymentLink, ngôn ngữ VI/EN).
4. Core CTT kiểm tra merchant, thông tin đơn hàng; sinh Payment Link và QR Code.
5. Core CTT trả về PaymentLink + QR; MA hiển thị link kèm nút Copy và mã QR.
6. MC chọn 1 trong 2 cách gửi cho KH:
   - **Gửi email:** MC nhấn "Gửi email" → MA yêu cầu Core CTT gửi email chứa thông tin giao dịch + payment link đến email KH (theo ngôn ngữ đã chọn, dùng template cấu hình sẵn).
   - **Copy thủ công:** MC tự copy link hoặc QR, chia sẻ qua kênh khác (Zalo, SMS...).

```
[MC] Vào menu Payment Link trên MA
        │
        ▼
[MA] Hiển thị form tạo đơn hàng
        │
        ▼
[MC] Nhập thông tin đơn hàng
     ┌────────────────────────────────────────┐
     │ Tên dịch vụ             (bắt buộc)    │
     │ Mã đơn hàng             (bắt buộc)    │
     │ Số tiền + Đồng tiền     (bắt buộc)    │
     │ Thời gian hiệu lực      (bắt buộc)    │
     │ Thời gian hết hạn       (bắt buộc)    │
     │ Nội dung đơn hàng       (tùy chọn)    │
     │ Ngôn ngữ: VI / EN       (bắt buộc)    │
     │ Họ tên KH, Email KH     (bắt buộc)    │
     │ SĐT, Địa chỉ KH         (tùy chọn)    │
     └────────────────────────────────────────┘
        │
        ▼
[MC] Nhấn "Tạo đơn hàng"
        │
        ▼
[MA → Core CTT] create_order(OrderInfo, PTTT=PaymentLink, language=VI/EN)
        │
        ├── Validate fail ──► Highlight trường lỗi, hiển thị thông báo lỗi
        │                     MC ở lại form, không rời màn hình
        │
        └── Validate pass ──►
                  │
                  ▼
        [Core CTT] Kiểm tra merchant, đơn hàng
        Sinh PaymentLink + QR Code
                  │
                  ▼
        [MA] Hiển thị:
        ┌─────────────────────────────────┐
        │ Payment Link   [Nút Copy]       │
        │ Mã QR của link                  │
        └─────────────────────────────────┘
                  │
          ┌───────┴──────────┐
          ▼                  ▼
   [MC chọn Gửi Email]  [MC chọn Copy link/QR]
          │                  │
          ▼                  ▼
   Core CTT gửi email   MC tự chia sẻ
   cho KH (VI/EN)       qua kênh khác
   (thông tin GD +
    payment link)
```

### 5.2 KH thanh toán qua Payment Link

1. KH nhận link/QR từ MC (qua email hoặc kênh khác).
2. KH quét QR hoặc click vào payment link.
3. KH truy cập **Hosted Form** — hệ thống hiển thị thông tin đơn hàng và điều khoản dịch vụ TGTT (theo ngôn ngữ cấu hình đơn).
4. KH đọc và nhấn "Đồng ý điều khoản & Chọn thanh toán".
5. Hosted Form gọi `get_order_detail` lên Core CTT: truy vấn thông tin đơn + PTTT theo MC + khuyến mãi theo PTTT + QR (qua QRGW).
6. Hosted Form tổng hợp và hiển thị **MH01.1**: thông tin đơn hàng, danh sách PTTT, Digital Wallet, Mã KM, Số tiền được giảm, QR.
7. KH chọn PTTT, nhập thông tin thanh toán, nhấn "Thanh toán".
8. Core CTT kiểm tra trạng thái đơn hàng tại thời điểm submit:
   - Đơn hết hạn → báo lỗi tại payment page, link vẫn còn.
   - Đơn đã thanh toán → báo lỗi tại payment page, link vẫn còn.
   - Đơn chờ thanh toán → xử lý giao dịch.
9. Giao dịch thành công → hiển thị trang thành công (mã thanh toán, mã đơn hàng, trạng thái, nội dung đơn) + Core CTT gửi email hóa đơn cho KH (theo ngôn ngữ đã chọn).
10. Giao dịch thất bại → hiển thị thông báo lỗi tại payment page, link vẫn còn hiệu lực, KH có thể thử lại.

```
[KH] Quét QR hoặc click Payment Link
        │
        ▼
[Hosted Form] Hiển thị thông tin đơn + điều khoản TGTT
(ngôn ngữ VI/EN theo cấu hình đơn hàng)
        │
        ├── KH từ chối ──► Ở lại trang điều khoản
        │
        └── KH đồng ý & chọn thanh toán ──►
                  │
                  ▼
        [Hosted Form → Core CTT] get_order_detail
        Core CTT truy vấn:
          15.1. Thông tin đơn hàng
          15.2. PTTT tương ứng MC
          15.3. Khuyến mãi theo PTTT
          16.   Gọi QRGW lấy QR Code
                  │
                  ▼
        [Hosted Form] Tổng hợp, hiển thị MH01.1:
        ┌────────────────────────────────────────┐
        │ Thông tin đơn hàng                     │
        │ Danh sách PTTT + Digital Wallet        │
        │ Mã KM | Số tiền được giảm | QR         │
        └────────────────────────────────────────┘
                  │
                  ▼
        [KH] Chọn PTTT → Nhập thông tin → Nhấn Thanh Toán
                  │
                  ▼
        [Core CTT] Kiểm tra trạng thái đơn hàng
                  │
                  ├── Hết hạn ──► Lỗi tại payment page (TBD wording)
                  │               Link vẫn còn
                  │
                  ├── Đã TT ──► Lỗi tại payment page (TBD wording)
                  │              Link vẫn còn
                  │
                  └── Chờ TT ──► Core CTT xử lý giao dịch
                            │
                            ├── Thất bại / Lỗi CTT ──►
                            │    Thông báo lỗi phù hợp tại payment page
                            │    Đơn → [Thanh toán thất bại]
                            │    Link vẫn còn, KH có thể thử lại
                            │
                            └── Thành công ──►
                                      │
                                      ▼
                            [Trang kết quả thành công]
                            ┌──────────────────────────────┐
                            │ Mã thanh toán                │
                            │ Mã đơn hàng                  │
                            │ Trạng thái: Thành công       │
                            │ Nội dung đơn hàng            │
                            └──────────────────────────────┘
                                      │
                                      ▼
                            [Core CTT] Gửi email hóa đơn cho KH
                            (theo ngôn ngữ đã cấu hình)
                                      │
                                      ▼
                            Đơn → [Thanh toán thành công]
```

## 6. System Behavior Deep Dive

### 6.1 Decision Points

| ID | Flow | Khi nào | YES (đi tiếp) | NO (chặn / lỗi) |
|---|---|---|---|---|
| D1 | Flow 1 | Validate form tạo đơn — tất cả trường bắt buộc hợp lệ? | Core CTT tạo đơn, sinh link + QR | Highlight trường lỗi, giữ nguyên form |
| D2 | Flow 1 | Mã đơn hàng đã tồn tại trong hệ thống? | — | Báo lỗi mã trùng, MC sửa lại |
| D3 | Flow 1 | MC chọn gửi email hay copy thủ công? | Gửi email qua Core CTT | MC tự copy link/QR |
| D4 | Flow 2 | KH đồng ý điều khoản TGTT? | Hosted Form gọi get_order_detail, mở MH01.1 | Ở lại trang điều khoản |
| D5 | Flow 2 | Trạng thái đơn khi KH submit thanh toán: hết hạn? | — | Báo lỗi hết hạn tại payment page |
| D6 | Flow 2 | Trạng thái đơn khi KH submit thanh toán: đã thanh toán? | — | Báo lỗi đã thanh toán tại payment page |
| D7 | Flow 2 | Core CTT xử lý giao dịch: thành công? | Trang thành công + gửi email hóa đơn KH | Báo lỗi tại payment page, đơn → Thất bại |

### 6.2 Scenario Matrix

| Trạng thái đơn | Hành động KH | Rule | Kết quả |
|---|---|---|---|
| Chờ thanh toán | Click link → đồng ý điều khoản → submit thanh toán | Đơn còn hiệu lực | Xử lý giao dịch bình thường |
| Hết hạn | Click link → đồng ý điều khoản → submit thanh toán | Quá thời gian hết hạn | Báo lỗi tại payment page |
| Thanh toán thành công | Click link → đồng ý điều khoản → submit thanh toán | Đã có giao dịch thành công | Báo lỗi đơn đã thanh toán |
| Thanh toán thất bại | Click link → đồng ý điều khoản → submit thanh toán | Lần trước thất bại | Cho phép thử lại, xử lý giao dịch |
| Bất kỳ | Click link | Không cần đăng nhập | Vào Hosted Form bình thường |

### 6.3 State Transitions

```
Đơn hàng: [Chờ thanh toán] ──thanh toán thành công──► [Thanh toán thành công]
                │
                ├──thanh toán thất bại / lỗi CTT──► [Thanh toán thất bại]
                │   (có thể thử lại → quay về Chờ TT → Thành công)
                │
                └──quá thời gian hết hạn──► [Hết hạn]
```

| Entity | Từ | Sang | Trigger | Quay lại được? |
|---|---|---|---|---|
| Đơn hàng | Chờ thanh toán | Thanh toán thành công | KH thanh toán thành công, Core CTT xác nhận | Không |
| Đơn hàng | Chờ thanh toán | Thanh toán thất bại | Core CTT xử lý thất bại / lỗi | Có — KH thử lại, đơn có thể sang Thành công |
| Đơn hàng | Thanh toán thất bại | Thanh toán thành công | KH thử lại thành công | Không |
| Đơn hàng | Chờ thanh toán | Hết hạn | Quá thời gian hết hạn đã cấu hình | Không |

### 6.4 Interrupted Transactions

| Tình huống | Hệ thống còn lại gì | Resume | Cleanup |
|---|---|---|---|
| KH đóng browser tại Hosted Form (trang điều khoản hoặc MH01.1) | Đơn vẫn ở trạng thái Chờ thanh toán | KH mở lại link → vào từ đầu (trang điều khoản) | Không cần cleanup |
| Core CTT lỗi / timeout khi xử lý giao dịch | Đơn sang Thanh toán thất bại, link vẫn còn | KH thấy thông báo lỗi phù hợp, có thể thử lại | Không |
| QRGW không phản hồi khi lấy QR | TBD — xử lý thế nào khi không lấy được QR | TBD | TBD |
| MC tạo 2 đơn cùng mã đơn hàng | Hệ thống validate unique — đơn thứ 2 bị từ chối | MC sửa mã đơn | Không |

### 6.5 Other Edge Cases

- **PTTT của MC không được cấu hình:** Hosted Form không hiển thị được PTTT → KH không thanh toán được. Cần xử lý thông báo phù hợp (TBD).
- **Email KH không tồn tại / sai format:** Validate tại form tạo đơn; nếu sai → lỗi, MC không tạo được đơn.
- **MC onboard chưa kích hoạt tài khoản:** Không truy cập được MA — không liên quan đến payment link flow, xử lý ở tầng auth.
- **Ngôn ngữ email không khớp:** Nếu template email ngôn ngữ chưa được cấu hình trong hệ thống → TBD xử lý thế nào (fallback về VI hay báo lỗi).
- **Đơn hàng hết hạn trong khi KH đang ở Hosted Form (chưa submit):** Khi submit mới phát hiện → báo lỗi hết hạn tại payment page (D5).

## 7. Validation, Limits & Wording

### 7.1 Validation rules

| Field | Rule |
|---|---|
| Tên dịch vụ | Bắt buộc |
| Mã đơn hàng | Bắt buộc; unique trong hệ thống; không giới hạn ký tự; chấp nhận mọi ký tự |
| Số tiền | Bắt buộc; từ **1,000 đến 200,000,000** (đơn vị theo đồng tiền giao dịch); cho phép số thập phân |
| Đồng tiền giao dịch | Bắt buộc |
| Thời gian hiệu lực | Bắt buộc; **≥ ngày hiện tại** |
| Thời gian hết hạn | Bắt buộc; **≥ thời gian hiệu lực**; **≤ thời gian hiệu lực + 15 ngày** |
| Nội dung đơn hàng | Tùy chọn |
| Ngôn ngữ | Bắt buộc; chọn 1 trong: Tiếng Việt / Tiếng Anh; ảnh hưởng ngôn ngữ email + Hosted Form |
| Họ tên KH | Bắt buộc |
| Email KH | Bắt buộc; đúng định dạng email (có @, domain hợp lệ) |
| Số điện thoại KH | Tùy chọn |
| Địa chỉ KH | Tùy chọn |

### 7.2 Limits & Quotas

| Tham số | Giá trị | Behavior khi vượt |
|---|---|---|
| Số tiền tối thiểu | 1,000 (đơn vị giao dịch) | Báo lỗi tại form, không tạo được đơn |
| Số tiền tối đa | 200,000,000 (đơn vị giao dịch) | Báo lỗi tại form, không tạo được đơn |
| Thời gian hết hạn tối đa | Thời gian hiệu lực + **15 ngày** | Báo lỗi tại form, không tạo được đơn |
| Unique mã đơn hàng | 1 mã / 1 merchant | Báo lỗi trùng mã, MC phải đổi mã |

### 7.3 Wording samples

#### Error messages

| Tình huống | Wording | Code |
|---|---|---|
| Bỏ trống trường bắt buộc | TBD | E1 |
| Mã đơn hàng đã tồn tại trong hệ thống | TBD | E2 |
| Số tiền ngoài khoảng 1,000–200,000,000 | TBD | E3 |
| Thời gian hết hạn vượt quá 15 ngày kể từ ngày hiệu lực | TBD | E4 |
| Thời gian hiệu lực nhỏ hơn ngày hiện tại | TBD | E5 |
| Đơn hàng đã hết hiệu lực (tại payment page khi submit) | TBD | E6 |
| Đơn hàng đã được thanh toán (tại payment page khi submit) | TBD | E7 |

#### Success messages

| Tình huống | Wording |
|---|---|
| Tạo đơn hàng + sinh payment link thành công | TBD — S1 |
| Gửi email chứa payment link cho KH thành công | TBD — S2 |
| Thanh toán thành công (tại trang kết quả Hosted Form) | TBD — S3 |

#### Info / neutral messages

| Tình huống | Wording |
|---|---|
| Hướng dẫn copy link / QR sau khi tạo đơn | TBD |
| Nội dung email gửi KH khi tạo đơn (VI / EN template) | TBD — cần cấu hình template song ngữ trong hệ thống |
| Nội dung email hóa đơn gửi KH sau thanh toán thành công | TBD |

## 8. Assumptions

- Trang MA và Hosted Form do TGTT host hoàn toàn; MC không cần tích hợp API hay tự host.
- MC cần có tài khoản được kích hoạt trên hệ thống quản trị của TGTT để truy cập MA.
- PTTT hiển thị trên Hosted Form phụ thuộc hoàn toàn vào cấu hình onboard MC — không phải cấu hình cứng per-link.
- Hosted Form xử lý cả trang điều khoản TGTT và trang thanh toán MH01.1 (cùng 1 hệ thống, không redirect sang domain khác).
- Email template VI/EN cần được cấu hình sẵn trong hệ thống trước khi tính năng go-live.
- KH không cần tài khoản hay đăng nhập để mở payment link và thanh toán.
- Payment link không có thời hạn riêng; thời gian hết hạn thuộc về đơn hàng.
- Khi đơn hàng hết hạn, trạng thái chuyển tự động (system-driven, không cần MC thao tác).
- Không có thông báo cho MC khi KH thanh toán thành công (chỉ KH nhận email hóa đơn).

## 9. Risks

| Rủi ro | Khả năng | Hậu quả nghiệp vụ | Cách phòng |
|---|---|---|---|
| PTTT của MC chưa được cấu hình khi KH vào Hosted Form → KH không thanh toán được | Thỉnh thoảng | Mất giao dịch, KH khiếu nại, MC mất tin tưởng | Kiểm tra cấu hình PTTT trong quá trình onboard MC; hiển thị cảnh báo nếu không có PTTT nào |
| Email template VI/EN chưa được cấu hình trước go-live → không gửi được email | Thỉnh thoảng | KH không nhận được link/hóa đơn, trải nghiệm xấu | Định nghĩa rõ danh sách template cần cấu hình; kiểm tra trước khi deploy |
| Legal review điều khoản dịch vụ TGTT trên Hosted Form chậm → trễ launch | Thỉnh thoảng | Trễ go-live, ảnh hưởng kế hoạch ra mắt cho MC | Kick-off review điều khoản sớm song song với development |
| Wording thông báo lỗi/thành công chưa được chốt → UX không nhất quán | Thường | MC/KH không hiểu trạng thái đơn hàng, tăng ticket CSKH | Chốt wording trước sprint UI; ghi nhận OQ-1 đến OQ-7 |
| MC không được train cách sử dụng tính năng → tạo đơn sai thông tin | Thỉnh thoảng | Đơn hàng lỗi, KH không thanh toán được | Chuẩn bị tài liệu hướng dẫn MC; xem xét onboarding guide trên MA |
| Đơn hàng có thời gian hiệu lực rất ngắn → KH nhận link đã hết hạn trước khi thanh toán | Thường | Mất giao dịch, KH phàn nàn | Validate tối thiểu khoảng thời gian hợp lý (TBD); hiển thị cảnh báo nếu thời gian quá ngắn |

## 10. Success Criteria

- MC tạo được payment link trong vòng dưới 2 phút (từ vào form đến có link).
- KH mở link và hoàn thành thanh toán không quá 3 bước tương tác sau khi xác nhận điều khoản.
- Tỉ lệ email gửi thành công sau khi tạo đơn (nếu chọn gửi email) ≥ 99%.
- Đơn hàng cập nhật đúng trạng thái ngay sau khi Core CTT xác nhận giao dịch.

## 11. Open Questions

- [ ] OQ-1: Exact wording — lỗi bỏ trống trường bắt buộc (E1)?
- [ ] OQ-2: Exact wording — lỗi mã đơn hàng đã tồn tại (E2)?
- [ ] OQ-3: Exact wording — lỗi số tiền ngoài khoảng hợp lệ (E3)?
- [ ] OQ-4: Exact wording — lỗi thời gian hết hạn vượt 15 ngày (E4)?
- [ ] OQ-5: Exact wording — lỗi thời gian hiệu lực < ngày hiện tại (E5)?
- [ ] OQ-6: Exact wording — lỗi đơn hàng hết hạn tại payment page (E6)?
- [ ] OQ-7: Exact wording — lỗi đơn hàng đã thanh toán tại payment page (E7)?
- [ ] OQ-8: Exact wording — thông báo tạo đơn + sinh link thành công (S1)?
- [ ] OQ-9: Exact wording — thông báo gửi email link thành công (S2)?
- [ ] OQ-10: Exact wording — thông báo thanh toán thành công trên Hosted Form (S3)?
- [ ] OQ-11: QRGW không phản hồi khi Hosted Form gọi lấy QR — xử lý thế nào? Hiển thị trang thanh toán không có QR, hay báo lỗi?
- [ ] OQ-12: Ngôn ngữ email template chưa được cấu hình trong hệ thống — fallback về VI hay báo lỗi khi tạo đơn?
- [ ] OQ-13: Số tiền tối thiểu/tối đa có thay đổi theo đồng tiền giao dịch (VND vs USD) không?
- [ ] OQ-14: PTTT không được cấu hình cho MC — Hosted Form hiển thị gì cho KH?

## 12. Next Steps

Sau brainstorm này (sau khi BA approve):
- `/urd payment-link` — đặc tả yêu cầu người dùng (kế thừa 14 OQ còn hold)
- `/screen-spec payment-link` — đặc tả màn hình MA01 (form tạo đơn), Hosted Form MH01.1, trang kết quả; chốt wording OQ-1 đến OQ-10
- `/sequence payment-link` — vẽ sequence diagram chính thức 5 actors: MA / User / Hosted Form / Core CTT / QRGW
- `/brd payment-link` — business case
