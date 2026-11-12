---
type: brainstorm
feature: partner-fee-management
status: draft
updated: 2026-10-28
links:
  - seed: "Xây dựng tính năng Quản lý cấu hình phí trả đối tác trên EPAY Portal gồm: Danh sách quản lý phí đối tác, Thêm mới cấu hình, Chỉnh sửa cấu hình, Xem chi tiết cấu hình, Gửi yêu cầu phê duyệt, Kích hoạt cấu hình, Tạm dừng cấu hình"
---

# Quản lý Cấu hình Phí Trả Đối tác — EPAY Portal 2.0

## 1. Idea Seed

Quản lý tập trung toàn bộ các biểu phí mà EPAY phải chi trả cho Đối tác / Ngân hàng (VietcomBank, MBBank, KBank, Napas, CyberSource...) khi sử dụng các dịch vụ Cổng thanh toán (CTT), QR Gateway (QRGW) và các kênh thanh toán liên kết. Hệ thống cung cấp giao diện quản trị cho Maker và Checker, hỗ trợ 4 nhóm biểu phí nghiệp vụ:
1. **Phí duy trì sử dụng dịch vụ:** Thu định kỳ theo tháng/quý/năm, áp dụng chung cho toàn bộ MID hoặc cấu hình riêng theo từng MID đối tác cung cấp, theo thiết bị.
2. **Phí xử lý giao dịch:** Thu cố định (vd: 1.800 đ/GD) theo danh mục mã ngành kinh doanh MCC (Merchant Category Code) và loại giao dịch (Thanh toán / Hoàn trả).
3. **Phí thanh toán:** Thu theo tỷ lệ % giá trị giao dịch, có chặn trần/sàn (Mức phí tối thiểu / Mức phí tối đa), cấu hình theo từng Cổng trung gian thanh toán (NAPAS, BIDV, MB...), theo thương hiệu thẻ và loại NHPH; hỗ trợ cả mô hình 1 bậc phí lẫn biểu phí Bậc thang theo Tổng SLGD / Tổng GTGD, kèm công cụ **Tính thử phí 🧮**.
4. **Phí quản lý dịch vụ gia tăng:** Biểu phí các dịch vụ GTGT chuyên biệt như *Quản lý token* (thu phí bậc thang theo số lượng token tạo mới), *Quản lý rủi ro* (thu cố định), và *FastPay (bypass OTP - off 3DS)* (thu cố định).

Quy trình quản lý vòng đời cấu hình tuân thủ mô hình 2 bước **Maker – Checker** chặt chẽ, kiểm soát qua 7 trạng thái bản ghi CHP, 13 bước chuyển dịch trạng thái, thanh tác vụ nổi (Floating Action Toolbar) và hệ thống Lưu vết kiểm toán (Audit Trail) chi tiết.

---

## 2. Context

- **Bối cảnh hiện tại:** EPAY đóng vai trò trung gian thanh toán kết nối nhiều ngân hàng thụ hưởng và nhà cung cấp kênh thanh toán. Mỗi đối tác ký kết hợp đồng với các điều khoản biểu phí khác nhau tùy thuộc vào loại hình dịch vụ, danh mục mã ngành kinh doanh của đơn vị chấp nhận thanh toán (MCC), thương hiệu thẻ (Visa, Mastercard, JCB, Napas...) và loại ngân hàng phát hành (trong nước / quốc tế).
- **Vấn đề cần giải quyết:** 
  - Trước đây cấu hình phí đối tác được quản lý phân tán hoặc thiết lập ở tầng kỹ thuật, mất nhiều thời gian tra cứu và tiềm ẩn rủi ro sai sót trong quá trình đối soát tài chính hàng tháng.
  - Thiếu công cụ kiểm thử tính phí trước khi cấu hình có hiệu lực.
  - Cần cơ chế kiểm soát phê duyệt hai bước (Maker - Checker) để đảm bảo tính minh bạch, lưu vết kiểm toán (Audit Trail) phục vụ đối soát, kiểm toán nội bộ và kiểm toán độc lập.

---

## 3. User Types (preliminary)

| User Type | Pain Point | Primary Need |
|---|---|---|
| **Maker (Chuyên viên Vận hành / Tính cước EPAY)** | Phải thao tác thủ công, khó theo dõi nhiều biểu phí phức tạp của nhiều ngân hàng đối tác | Tìm kiếm nhanh biểu phí, tạo mới/chỉnh sửa cấu hình phí với đầy đủ tham số (MCC, PTTT, loại GD), tính thử phí trước khi gửi Checker phê duyệt |
| **Checker (Trưởng phòng / Cán bộ Phê duyệt EPAY)** | Khó thẩm định mức độ chính xác của biểu phí so với hợp đồng nếu thiếu thông tin đối chiếu | Xem chi tiết toàn diện cấu hình phí (các trường thông tin chung, danh mục MCC, mức phí, thuế VAT), thực hiện phê duyệt hoặc từ chối kèm lý do rõ ràng |
| **Hệ thống Tự động (Billing & Settlement Engine)** | Nguy cơ áp sai biểu phí khi hợp đồng mới bắt đầu có hiệu lực | Đọc cấu hình phí ở trạng thái `ACTIVE` hợp lệ tại thời điểm giao dịch phát sinh để tính chính xác chi phí phải trả đối tác |
| **Hệ thống Job Lập lịch (Scheduler Job)** | Cần tự động hóa kích hoạt biểu phí đúng mốc thời gian thỏa thuận | Quét tự động các cấu hình `READY` khi chạm mốc `Thời gian áp dụng phí` để chuyển sang `ACTIVE` (Auto Golive) không cần can thiệp thủ công |

---

## 4. Capabilities Breakdown

### P0 — Must have (Bắt buộc)

- **Danh sách quản lý cấu hình phí:**
  - Hiển thị danh sách phân chia theo 5 Tabs nghiệp vụ: *Phí duy trì dịch vụ*, *Phí xử lý giao dịch*, *Phí thanh toán*, *Phí dịch vụ gia tăng*, và *Chờ phê duyệt*.
  - Bảng dữ liệu hiển thị rõ đồng thời **Trạng thái cấu hình** (`DRAFT`, `NEW`, `PENDING`, `READY`, `ACTIVE`, `INACTIVE`) và **Trạng thái YCPD** (`PENDING`, `APPROVAL`, `REJECTED`, để trống).
  - Thanh tìm kiếm nhanh (Quicksearch) theo mã cấu hình, tên cấu hình.
  - Phân trang chuẩn (Hiển thị tổng số kết quả, số dòng trên trang 10/20/50, chuyển trang).
- **Bộ lọc tra cứu nâng cao (Filter Bar):**
  - Tra cứu theo 8 tiêu chí: Nguồn dữ liệu cấu hình, Đối tác hưởng phí, Cổng TGTT, Loại dịch vụ gia tăng, Phương thức thanh toán, Kỳ trả phí, Khoảng thời gian áp dụng phí (Từ ngày - Đến ngày), Đồng tiền giao dịch.
  - Nút *Xóa bộ lọc* và *Tìm kiếm*.
- **Thêm mới cấu hình phí trả đối tác (4 loại phí):**
  - *Tab Phí duy trì sử dụng dịch vụ*: Thu phí theo MID đối tác cung cấp (Áp dụng chung hoặc riêng từng MID) hoặc theo thiết bị. Mức phí cố định VNĐ/kỳ.
  - *Tab Phí xử lý giao dịch (XLGD)*: Cấu hình 11 tham số chuẩn: Đối tác/ngân hàng hưởng phí, Phương thức thanh toán (Thẻ nội địa, thẻ quốc tế, tài khoản ngân hàng), Loại giao dịch (Thanh toán, hoàn trả), Trạng thái giao dịch (Thành công, Thất bại), Kỳ trả phí (Phiên, ngày, tháng, quý, năm), MCC qua Dual-Listbox, Thời gian áp dụng, Thuế VAT, Checkbox áp dụng chung cho toàn bộ loại giao dịch hoặc riêng từng loại GD, Hình thức thu phí (Cố định, bậc thang) và Mức phí chi tiết.
  - *Tab Phí thanh toán*: Cấu hình đầy đủ: Đối tác/ngân hàng hưởng phí, Kỳ trả phí (Phiên, ngày, tháng, quý, năm), Thời gian áp dụng, MCC qua Dual-Listbox, PTTT (Thẻ nội địa, tài khoản ngân hàng, thẻ quốc tế), Loại giao dịch (Thanh toán, hoàn trả), Thuế VAT, Hình thức thu phí (1 bậc / Bậc thang theo Tổng GTGD/SLGD), Mức phí tỉ lệ %, Mức phí tối thiểu, Mức phí tối đa. Riêng khi PTTT = Thẻ quốc tế (TQT): Tự động mở rộng trường Thương hiệu thẻ (Visa, MC, JCB...), Checkbox áp dụng chung hoặc cấu hình riêng từng thương hiệu, và Loại thẻ phát hành (Trong nước / Nước ngoài). Tích hợp công cụ Tính thử phí 🧮.
  - *Tab Phí quản lý dịch vụ gia tăng*: Cấu hình chi tiết các dịch vụ Quản lý token (bậc thang số lượng token tạo mới), Quản lý rủi ro (cố định), FastPay off 3DS (cố định).
  - Bộ chọn đa mã ngành MCC (Merchant Category Code) dạng Dual-Listbox (Transfer List) hỗ trợ tìm kiếm và chuyển chọn nhiều MCC.
  - Nút *[Hủy]*, *[Lưu nháp]* (tạo trạng thái `DRAFT`), và *[Tạo mới +]* (chuyển trạng thái `NEW`).
- **Công cụ Tính thử phí 🧮 (Fee Calculation Simulator Popup):**
  - Mô phỏng nhập SLGD/GTGD và Giá trị giao dịch để tính toán ngay số tiền phí thực tế phải trả.
  - Hỗ trợ cả 2 trường hợp: 01 bậc phí và Biểu phí bậc thang theo Tổng SLGD/Tổng GTGD.
  - Tự động áp dụng công thức $f = (\text{Mức phí tỷ lệ} \times \text{Giá trị GD}) \times \text{VAT}$ và chặn trần/sàn theo Mức phí tối thiểu / Mức phí tối đa.
- **Gửi yêu cầu phê duyệt:** Maker gửi bản ghi `DRAFT`, `NEW` hoặc bản ghi sau khi chỉnh sửa sang luồng phê duyệt (`Pending`).
- **Phê duyệt / Từ chối yêu cầu:** Checker xem chi tiết và thực hiện duyệt (chuyển sang `READY` hoặc `ACTIVE`) hoặc từ chối (trả về `NEW` kèm lý do).
- **Vòng đời trạng thái bản ghi CHP chuẩn 7 trạng thái:** `Draft`, `New`, `Pending`, `Ready`, `Active`, `Inactive`, `Deleted`.

### P1 — Should have (Nên có)

- **Màn hình Xem chi tiết & Floating Action Toolbar (Thanh tác vụ nổi bên phải):**
  - Khối THÔNG TIN CHUNG: Mã phí, Loại phí, Trạng thái cấu hình, Trạng thái YCPD, Người khởi tạo/Thời gian tạo, Người cập nhật/Thời gian cập nhật, Người phê duyệt.
  - Khối THÔNG TIN CẤU HÌNH & THÔNG TIN PHÍ: Toàn bộ thông số chi tiết của cấu hình.
  - Thanh nút tác vụ nổi:
    - ✏️ **Chỉnh sửa** (Edit): Mở chế độ chỉnh sửa cấu hình.
    - 🕒 **Lịch sử thay đổi** (Audit Trail): Xem dòng thời gian thay đổi dữ liệu.
    - 🔀 **Gửi phê duyệt** (Submit Approval): Gửi YCPD cho Maker.
    - 🔒 **Tạm dừng** (Pause / Inactivate): Gửi yêu cầu tạm dừng cấu hình `ACTIVE`.
    - 🔓 **Kích hoạt lại** (Reactivate): Gửi yêu cầu mở lại cấu hình `INACTIVE`.
    - ✔️ **Phê duyệt** (Approve): Nút duyệt nhanh cho Checker.
    - ❌ **Từ chối** (Reject): Nút từ chối cho Checker.
- **Màn hình Lịch sử thay đổi (Audit Trail Timeline View):**
  - Bộ lọc: Thông tin thay đổi (tên trường), Người cập nhật (tài khoản), Khoảng thời gian cập nhật.
  - Dòng thời gian chi tiết từng lần cập nhật: Actor, thời gian, biến động trạng thái (`Pending --> Ready`), biến động trường dữ liệu (`Field: Old --> New`).
- **Tùy chỉnh cột hiển thị (Customize Columns):** Bật/tắt các cột dữ liệu trên bảng danh sách.
- **Xuất tệp dữ liệu (Export):** Xuất danh sách cấu hình phí ra định dạng Excel (.xlsx).

### P2 — Nice to have (Mở rộng sau)

- **Sao chép cấu hình (Clone Config):** Sao chép toàn bộ thông số của một cấu hình có sẵn để tạo nhanh biểu phí mới cho đối tác khác.
- **Cảnh báo xung đột biểu phí (Conflict Overlap Warning):** Hệ thống phát hiện và cảnh báo nếu có một cấu hình khác cùng đối tác, cùng PTTT, cùng MCC đang `ACTIVE` trong cùng khoảng thời gian áp dụng.

---

## 5. Core Flows (Happy Path) & Sơ đồ Luồng

### 5.1. Luồng 1: Maker Tạo mới & Gửi yêu cầu phê duyệt cấu hình phí

1. Maker đăng nhập Portal, truy cập menu **Quản lý cấu hình phí > Phí trả đối tác**.
2. Maker bấm nút **[+ Thêm mới]**, hệ thống hiển thị màn hình thêm mới với 4 Tab loại phí.
3. Maker chọn Tab phí tương ứng (vd: *Phí thanh toán*), nhập đầy đủ Thông tin chung:
   - Chọn Nguồn dữ liệu (CTT/QRGW), Đối tác hưởng phí (KBank/Vietcombank...), Kỳ trả phí (Theo tháng...), Thời gian áp dụng.
   - Chọn các mã ngành MCC qua Dual-Listbox.
   - Chọn Cổng TGTT (CYBS/KBANK), Loại NHPH, PTTT (Thẻ quốc tế), Thuế VAT (8%).
4. Tại phần Thông tin phí: Maker chọn hình thức thu phí (1 bậc phí hoặc Bậc thang theo Tổng GTGD), nhập Mức phí tỷ lệ (1.8%), Mức phí tối thiểu, Mức phí tối đa.
5. Maker bấm nút **[Tính thử 🧮]**, nhập giá trị GD ví dụ 500.000 VNĐ để kiểm tra kết quả tính phí thực tế.
6. Maker có thể chọn:
   - Bấm **[Lưu nháp]**: Hệ thống lưu bản ghi với trạng thái cấu hình `DRAFT`, trạng thái YCPD rỗng.
   - Bấm **[Tạo mới +]**: Hệ thống validate dữ liệu và lưu bản ghi với trạng thái cấu hình `NEW`.
7. Từ màn hình danh sách, Maker mở menu thao tác `≡` tại bản ghi `NEW`, bấm **[📤 Gửi yêu cầu phê duyệt]**.
8. Hệ thống chuyển Trạng thái YCPD sang `PENDING`, hiển thị tại tab **Chờ phê duyệt**.

```
[Maker] Mở form [+ Thêm mới] ──► Chọn Tab phí & Nhập Thông tin chung
                                                │
                                                ▼
                                    Chọn MCC qua Dual-Listbox
                                                │
                                                ▼
                                    Cấu hình mức phí (%, Min, Max)
                                                │
                                                ▼
                                    [Tính thử 🧮] kiểm tra số liệu
                                                │
                          ┌─────────────────────┴─────────────────────┐
                          ▼                                           ▼
                  Bấm [Lưu nháp]                              Bấm [Tạo mới +]
                          │                                           │
                          ▼                                           ▼
                 Trạng thái: DRAFT                            Trạng thái: NEW
                          │                                           │
                          └───────► [Gửi phê duyệt] ◄─────────────────┘
                                           │
                                           ▼
                                 YCPD: PENDING (Chờ duyệt)
```

---

### 5.2. Luồng 2: Checker Thẩm định & Xử lý Yêu cầu Phê duyệt

1. Checker truy cập tab **Chờ phê duyệt** hoặc menu **Quản lý Yêu cầu phê duyệt**.
2. Checker bấm vào Mã cấu hình phí (link) hoặc nút `≡ > Xem chi tiết` để kiểm tra hồ sơ biểu phí.
3. Checker đối chiếu các thông số: Đối tác, Dịch vụ, Mã MCC, Mức phí tỷ lệ, Thuế VAT, Thời gian áp dụng.
4. Checker đưa ra quyết định:
   - **Đồng ý phê duyệt:** Bấm **[✅ Phê duyệt]** (hoặc nút ✔️ trên thanh nổi) -> Hệ thống cập nhật:
     - Trạng thái YCPD = `APPROVAL`.
     - Nếu `Thời gian áp dụng phí` > Thời điểm hiện tại: Trạng thái cấu hình chuyển thành **`READY`** (Sẵn sàng golive).
     - Nếu `Thời gian áp dụng phí` <= Thời điểm hiện tại: Trạng thái cấu hình chuyển thẳng sang **`ACTIVE`** (Đang hoạt động).
   - **Từ chối phê duyệt:** Bấm **[❌ Từ chối]** (hoặc nút ❌ trên thanh nổi) -> Hệ thống hiển thị popup yêu cầu nhập Lý do từ chối (bắt buộc) -> Cập nhật Trạng thái YCPD = `REJECTED`, Trạng thái cấu hình giữ/quay về **`NEW`**. Maker nhận thông báo để chỉnh sửa lại.

```
[Checker] Mở tab Chờ phê duyệt ──► Xem chi tiết cấu hình phí
                                                │
                          ┌─────────────────────┴─────────────────────┐
                          ▼                                           ▼
                  Bấm [✅ Phê duyệt]                          Bấm [❌ Từ chối]
                          │                                           │
             ┌────────────┴────────────┐                     Nhập lý do từ chối
             ▼                         ▼                              │
    Ngày áp dụng > Hiện tại   Ngày áp dụng <= Hiện tại                ▼
             │                         │                      Trạng thái: NEW
             ▼                         ▼                      YCPD: REJECTED
     Trạng thái: READY        Trạng thái: ACTIVE                      │
             │                         │                      Maker sửa & gửi lại
             ▼                         ▼                              
       Chờ Auto-Golive        Có hiệu lực tính cước
```

---

### 5.3. Luồng 3: Hệ thống Tự động Kích hoạt Cấu hình (Auto-Golive Job)

1. Cấu hình đã được Checker phê duyệt và đang ở trạng thái `READY` với ngày bắt đầu hiệu lực trong tương lai.
2. Hằng ngày (hoặc định kỳ mỗi giờ/mỗi 00:00:00), Scheduler Job chạy kiểm tra:
   - `SELECT * FROM fee_configs WHERE status = 'READY' AND apply_date <= NOW()`
3. Với mỗi bản ghi thỏa mãn, hệ thống tự động:
   - Cập nhật Trạng thái cấu hình: `READY` -> **`ACTIVE`**.
   - Xóa trạng thái YCPD (chuyển về rỗng).
   - Ghi nhận lịch sử kiểm toán: `Job Auto-golive kích hoạt cấu hình vào thời điểm {timestamp}`.
4. Kể từ thời điểm này, Core CTT áp dụng biểu phí này để tính phí cho các giao dịch phát sinh.

---

### 5.4. Luồng 4: Tạm dừng và Kích hoạt lại Cấu hình đang chạy

- **Tạm dừng (`ACTIVE` -> `INACTIVE`):**
  1. Maker mở menu thao tác hoặc bấm nút 🔒 trên thanh nổi tại bản ghi `ACTIVE`, chọn **[Tạm dừng]**.
  2. Maker nhập lý do tạm dừng và bấm **[Gửi phê duyệt Tạm dừng]**.
  3. Bản ghi chuyển Trạng thái YCPD sang `PENDING` (Trạng thái cấu hình vẫn là `ACTIVE`, hệ thống vẫn tính phí bình thường trong lúc chờ duyệt).
  4. Checker duyệt yêu cầu tạm dừng -> Trạng thái cấu hình chuyển thành **`INACTIVE`**, Trạng thái YCPD = `APPROVAL`. Hệ thống ngưng tính phí theo biểu phí này.
- **Kích hoạt lại (`INACTIVE` -> `ACTIVE`):**
  1. Maker mở menu thao tác hoặc bấm nút 🔓 trên thanh nổi tại bản ghi `INACTIVE`, chọn **[Kích hoạt lại]**.
  2. Maker có thể cập nhật thông tin nếu cần, sau đó bấm **[Gửi phê duyệt Kích hoạt]**.
  3. Bản ghi chuyển Trạng thái YCPD sang `PENDING`.
  4. Checker duyệt yêu cầu kích hoạt -> Trạng thái cấu hình chuyển về **`ACTIVE`**, bắt đầu có hiệu lực trở lại.

---

### 5.5. Luồng 5: Sử dụng Công cụ Tính thử phí 🧮 (Fee Calculation Simulation)

1. Maker mở màn hình Thêm mới/Chỉnh sửa cấu hình hoặc Xem chi tiết cấu hình.
2. Tại khu vực Thông tin phí, Maker bấm nút **[Tính thử 🧮]**.
3. Hệ thống bật **Popup Tính thử phí**:
   - Nếu cấu hình là **1 bậc phí**: Hiển thị Mức phí tỷ lệ %, Thuế VAT %, Mức tối thiểu, Mức tối đa. Maker nhập `Giá trị giao dịch *` -> Bấm **[Tính thử]** -> Hệ thống hiển thị `Phí phải trả` (kèm biểu tượng info giải thích công thức).
   - Nếu cấu hình là **Bậc thang theo Tổng SLGD / Tổng GTGD**: Hiển thị bảng các bậc (Bậc 1, Bậc 2, Bậc 3... kèm khoảng SLGD/GTGD và % tỷ lệ, Min, Max). Maker nhập `SLGD/GTGD *` và `Giá trị giao dịch *` -> Bấm **[Tính thử]** -> Hệ thống tự động xác định rơi vào Bậc nào và tính ra `Phí phải trả`.
4. Maker kiểm tra tính chính xác của công thức, sau đó bấm **[Đóng]** để quay lại form chính.

---

### 5.6. Luồng 6: Tra cứu Lịch sử thay đổi (Audit Trail History View)

1. Người dùng mở màn hình Xem chi tiết cấu hình phí.
2. Bấm vào icon 🕒 **Lịch sử thay đổi** trên thanh tác vụ nổi bên phải.
3. Hệ thống hiển thị màn hình **LỊCH SỬ THAY ĐỔI**:
   - Người dùng có thể lọc theo: *Thông tin thay đổi* (tên trường), *Người cập nhật* (tài khoản), *Thời gian cập nhật* (Từ ngày giờ - Đến ngày giờ).
   - Danh sách hiển thị dòng thời gian (Timeline) từng lần thay đổi từ lúc khởi tạo đến lần sửa/duyệt mới nhất.
   - Thể hiện rõ người thực hiện (`Maker01`, `Checker01`), thời điểm và chi tiết thay đổi dữ liệu:
     - Biến động trạng thái: `Pending --> Ready`, `Draft --> New`...
     - Biến động dữ liệu trường tin: `Mã NVKD: Epay001 --> Epay0002`, `User: phela_tea --> hightlands_coffee`...

---

## 6. System Behavior Deep Dive

### 6.1. Decision Points (Các điểm rẽ nhánh nghiệp vụ)

| ID | Luồng | Điều kiện kiểm tra | Nhánh ĐỒNG Ý (YES) | Nhánh TỪ CHỐI (NO) |
|---|---|---|---|---|
| **D1** | Lưu cấu hình | Maker bấm [Tạo mới +] | Validate bắt buộc toàn bộ trường: Nguồn DL, Đối tác, Kỳ trả phí, Ngày áp dụng, MCC, PTTT, Mức phí | Cho phép lưu bản ghi trạng thái `NEW` | Báo lỗi highlight đỏ các trường thiếu, giữ nguyên màn hình |
| **D2** | Lưu cấu hình | Maker bấm [Lưu nháp] | Chỉ validate: Đã chọn Đối tác và Nguồn dữ liệu | Cho phép lưu bản ghi trạng thái `DRAFT` | Báo lỗi: "Vui lòng chọn Nguồn dữ liệu và Đối tác để lưu nháp" |
| **D3** | Phê duyệt | Checker bấm [✅ Phê duyệt] | Kiểm tra `Thời gian áp dụng phí` so với ngày giờ hiện tại | Nếu `<= NOW` ➔ Chuyển thẳng `ACTIVE`; Nếu `> NOW` ➔ Chuyển sang `READY` | Duyệt thất bại nếu dữ liệu bị xung đột hoặc lỗi kết nối |
| **D4** | Chỉnh sửa | Maker sửa bản ghi đang `READY` | Người dùng xác nhận lưu thông tin chỉnh sửa | Bản ghi bị **reset về trạng thái `NEW`**; hủy kết quả duyệt trước đó, bắt buộc gửi phê duyệt lại | Giữ nguyên trạng thái `READY` nếu Maker bấm Hủy |
| **D5** | Cập nhật trên Active | Maker gửi duyệt sửa bản ghi đang `ACTIVE` | Đang có YCPD khác trên cùng bản ghi đang ở trạng thái `PENDING` không? | Báo lỗi: "Bản ghi đang có yêu cầu phê duyệt chờ xử lý. Không thể tạo thêm yêu cầu mới" | Cho phép tạo YCPD cập nhật thông tin; cấu hình cũ vẫn giữ nguyên tính cước cho đến khi Checker duyệt |
| **D6** | Xóa bản ghi | Maker chọn [Xóa] | Bản ghi có ở trạng thái `DRAFT` hoặc `NEW` không? | Cho phép xóa chuyển trạng thái sang `DELETED` | Không cho phép xóa (Disabled nút xóa đối với cấu hình `READY`, `ACTIVE`, `INACTIVE`) |

---

### 6.2. Scenario Matrix (Ma trận Kịch bản Phối hợp 2 Vai trò & Trạng thái)

| Trạng thái Cấu hình | Trạng thái YCPD | Thao tác của Maker | Thao tác của Checker | Kết quả Hệ thống |
|---|---|---|---|---|
| `DRAFT` | *(Trống)* | Chỉnh sửa / Xóa nháp / Bấm [Tạo mới +] | Không nhìn thấy tại tab Chờ duyệt | Cập nhật dữ liệu nháp, hoặc chuyển sang `NEW` |
| `NEW` | *(Trống)* | Cập nhật thông tin / Xóa / Gửi phê duyệt | Không thao tác | Chuyển sang YCPD `PENDING` khi Maker bấm gửi duyệt |
| `NEW` | `PENDING` | Khóa sửa, chỉ được Xem chi tiết | Duyệt / Từ chối (kèm lý do) | Duyệt ➔ `READY`; Từ chối ➔ `NEW` (YCPD `REJECTED`) |
| `NEW` | `REJECTED` | Xem lý do từ chối, Cập nhật thông tin, Gửi duyệt lại | Không thao tác | Quay lại chu trình gửi duyệt |
| `READY` | `APPROVAL` | Xem chi tiết / Cập nhật thông tin | Không thao tác | Nếu Cập nhật thông tin ➔ Reset trạng thái về `NEW`, YCPD = Trống |
| `ACTIVE` | *(Trống)* | Xem chi tiết / Gửi duyệt Tạm dừng / Gửi duyệt Sửa thông tin | Không thao tác | Tạo YCPD mới, Trạng thái YCPD chuyển `PENDING` |
| `ACTIVE` | `PENDING` | Khóa các thao tác gửi duyệt khác, chỉ Xem chi tiết | Duyệt Tạm dừng / Duyệt Sửa TT / Từ chối | Nếu duyệt Tạm dừng ➔ `INACTIVE`; Nếu duyệt Sửa ➔ Cập nhật giá trị mới vào `ACTIVE` |
| `INACTIVE` | *(Trống)* | Xem chi tiết / Cập nhật thông tin / Gửi duyệt Kích hoạt | Không thao tác | Chờ Maker gửi yêu cầu kích hoạt lại |
| `INACTIVE` | `PENDING` | Khóa gửi duyệt, chờ Checker xử lý | Duyệt Kích hoạt / Từ chối kích hoạt | Duyệt ➔ `ACTIVE`; Từ chối ➔ Vẫn giữ `INACTIVE` |

---

### 6.3. State Transitions Table (Bảng chuyển đổi trạng thái bản ghi CHP chuẩn 7 trạng thái)

Dựa trên sơ đồ thiết kế kiến trúc chuẩn của EPAY:

```
       [Start]
          │
          ├──(1. Lưu bản nháp)──► [Draft] ──(4. Xóa)──► [Deleted] ──► (End)
          │                         │
          │                   (3. Tạo mới)
          │                         │
          ▼                         ▼
   (Tạo mới trực tiếp) ──────► [ New ] ◄──────(6. Từ chối duyệt)────────┐
                                 │   ▲                                    │
                         (4. Xóa)│   │(2. Cập nhật)                       │
                                 │   │                                    │
                                 ▼   │                                    │
                            [Deleted]│                                    │
                                     │(4. Gửi phê duyệt)                  │
                                     ▼                                    │
                                [Pending] ────────────────────────────────┘
                                     │
                                (7. Phê duyệt)
                                     │
                                     ▼
        ┌─────────────────────── [Ready]
        │                            │
  (8. Cập nhật)             (8. Auto golive)
  (Reset về New)          (Job quét đúng thời điểm)
        │                            │
        ▼                            ▼
     [ New ]                   [ Active ] ◄───────────────────────────────┐
                                 │    │                                   │
                                 │    └──(11. Gửi duyệt cập nhật)──┐      │
                                 │       (7. Phê duyệt)            │      │
                                 │       └──► [Active (Updated)] ──┘      │
                                 │                                        │
                       (10. Gửi duyệt Tạm dừng)                           │
                       (7. Phê duyệt tạm dừng)                            │
                                 │                                        │
                                 ▼                                        │
                             [Inactive]                                   │
                                 │                                        │
                         (8. Cập nhật TT)                                 │
                                 │                                        │
                   (13. Gửi duyệt mở kích hoạt)                           │
                                 │                                        │
                                 ▼                                        │
                             [Pending] ────(7. Phê duyệt kích hoạt)───────┘
```

| STT Bước | Trạng thái Bắt đầu | Trạng thái Đích | Tên Hành động / Trigger | Vai trò Thực hiện | Điều kiện / Ghi chú Nghiệp vụ |
|:---:|---|---|---|---|---|
| **1** | *(Khởi đầu)* | `Draft` | Lưu bản nháp | Maker | Cho phép lưu khi chỉ có thông tin cơ bản |
| **2** | `New` | `New` | Cập nhật thông tin | Maker | Cập nhật thông tin khi chưa gửi duyệt hoặc sau khi bị từ chối |
| **3** | `Draft` | `New` | Tạo mới | Maker | Điền đủ trường bắt buộc và bấm [Tạo mới +] |
| **4** | `Draft` / `New` | `Deleted` | Xóa | Maker | Xóa bản ghi chưa từng có hiệu lực tính cước |
| **5** | `New` | `Pending` | Gửi phê duyệt | Maker | Tạo bản ghi YCPD, gửi sang hàng đợi của Checker |
| **6** | `Pending` | `New` | Từ chối duyệt | Checker | Bắt buộc nhập lý do từ chối; YCPD = `REJECTED` |
| **7A** | `Pending` | `Ready` | Phê duyệt (áp dụng tương lai) | Checker | Khi `Thời gian áp dụng phí` > Thời điểm duyệt |
| **7B** | `Pending` | `New` | Job tự động từ chối YCPD quá ngày hiệu lực | Hệ thống | YCPD = Rejected; Người từ chối = Hệ thống; Lý do = Tự động từ chối bởi hệ thống |
| **8A** | `Ready` | `New` | Cập nhật thông tin | Maker | **Reset về New**: Phải gửi duyệt lại từ đầu |
| **8B** | `Ready` | `Active` | Auto golive | Scheduler Job | Job tự động quét khi chạm mốc thời gian áp dụng |
| **10** | `Active` | `Pending` | Gửi phê duyệt Tạm dừng | Maker | Cấu hình vẫn giữ `Active` tính phí cho đến khi Checker duyệt |
| **7C** | `Pending` (Tạm dừng) | `Inactive` | Phê duyệt tạm dừng | Checker | Biểu phí ngưng áp dụng tính phí giao dịch |
| **11** | `Active` | `Pending` | Gửi phê duyệt cập nhật thông tin | Maker | Thông tin cũ giữ nguyên đợi duyệt, không ngắt quãng tính phí |
| **7D** | `Pending` (Cập nhật) | `Active` | Phê duyệt cập nhật thông tin | Checker | Dữ liệu cấu hình mới chính thức được ghi đè và áp dụng |
| **12** | `Inactive` | `Inactive` | Cập nhật thông tin | Maker | Cập nhật biểu phí trong thời gian tạm dừng |
| **13** | `Inactive` | `Pending` | Gửi phê duyệt mở kích hoạt | Maker | Đề xuất kích hoạt lại biểu phí |
| **7E** | `Pending` (Kích hoạt) | `Active` | Phê duyệt mở kích hoạt | Checker | Cấu hình hoạt động trở lại |

---

### 6.4. Công thức & Quy tắc Thuật toán Tính phí (Fee Calculation Formula)

Theo quy định chính thức của EPAY:

- Gọi $f$ là mức phí tính được dựa trên công thức cơ bản:
  $$f = (\text{Mức phí tỷ lệ} \times \text{Giá trị giao dịch}) \times \text{VAT}$$
- $F$ là mức phí thực tế áp dụng (phí phải thu / phải trả cuối cùng):
  - **Trường hợp 1:** Nếu $\text{Mức phí tối thiểu} \le f \le \text{Mức phí tối đa} \implies F = f$
  - **Trường hợp 2:** Nếu $f < \text{Mức phí tối thiểu} \implies F = \text{Mức phí tối thiểu}$
  - **Trường hợp 3:** Nếu $f > \text{Mức phí tối đa} \implies F = \text{Mức phí tối đa}$
  *(Ghi chú: Trường hợp không cấu hình Mức tối thiểu hoặc Mức tối đa thì bỏ qua bước so sánh tương ứng).*

- **Trường hợp Biểu phí Bậc thang (Tiered Fee):**
  - Hệ thống lấy tham số đối chiếu (Tổng SLGD hoặc Tổng GTGD trong kỳ lũy kế của đối tác) để so sánh với các khoảng của từng bậc:
    - Bậc 1: $\text{Từ } S_1 \text{ đến } S_2 \implies \text{Áp dụng tỷ lệ } r_1, \min_1, \max_1$
    - Bậc 2: $\text{Từ } S_2 + 1 \text{ đến } S_3 \implies \text{Áp dụng tỷ lệ } r_2, \min_2, \max_2$
    - Bậc $n$: $\text{Từ } S_n \text{ trở lên} \implies \text{Áp dụng tỷ lệ } r_n, \min_n, \max_n$
  - Sau khi xác định được bậc tương ứng, hệ thống áp dụng công thức tính $f$ và $F$ như trên.

---

### 6.5. Ma trận Quyền hạn trên Floating Action Toolbar (Thanh Nút Tác vụ Nổi)

| Icon / Nút tác vụ | Chức năng | `DRAFT` | `NEW` | `PENDING` | `READY` | `ACTIVE` | `INACTIVE` |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|
| ✏️ | **Chỉnh sửa** | Enable | Enable | Disabled | Enable (reset New) | Enable (gửi duyệt) | Enable |
| 🕒 | **Lịch sử thay đổi** | Enable | Enable | Enable | Enable | Enable | Enable |
| 🔀 | **Gửi phê duyệt** | Enable | Enable | Disabled | Disabled | Disabled | Disabled |
| 🔒 | **Tạm dừng cấu hình** | Disabled | Disabled | Disabled | Disabled | Enable | Disabled |
| 🔓 | **Kích hoạt lại** | Disabled | Disabled | Disabled | Disabled | Disabled | Enable |
| ✔️ | **Phê duyệt (Checker)** | Disabled | Disabled | Enable | Disabled | Disabled | Disabled |
| ❌ | **Từ chối duyệt (Checker)** | Disabled | Disabled | Enable | Disabled | Disabled | Disabled |

---

### 6.6. Interrupted Transactions & System Sync (Xử lý Giao dịch Gián đoạn)

| Tình huống sự cố | Trạng thái Dữ liệu Lưu lại | Cơ chế Phục hồi (Resume) | Quy tắc Xử lý Dọn dẹp (Cleanup) |
|---|---|---|---|
| **Maker mất mạng khi đang điền form tạo mới** | Không lưu hoặc đã lưu vào bản nháp `DRAFT` nếu bấm [Lưu nháp] trước đó | Maker vào lại tab tương ứng, mở bản nháp để tiếp tục điền | Không sinh rác hệ thống; bản nháp quá 90 ngày không chỉnh sửa sẽ có cảnh báo dọn dẹp |
| **Job Auto-Golive bị lỗi/timeout lúc 00:00:00** | Bản ghi vẫn ở trạng thái `READY` dù đã quá giờ golive | Job có cơ chế retry mỗi 5 phút hoặc Maker/Checker bấm nút kiểm tra trạng thái | Khi job retry thành công, mốc thời gian hiệu lực vẫn tính đúng từ thời điểm quy định |
| **Checker đang duyệt thì mạng ngắt kết nối** | Trạng thái YCPD vẫn giữ `PENDING` | Checker tải lại trang và thực hiện lại thao tác phê duyệt | Cơ chế Optimistic Locking ngăn chặn duyệt trùng lặp |
| **Đồng thời 2 Maker cùng chỉnh sửa 1 cấu hình** | Bản ghi lưu vết sửa đổi theo phiên bản cuối | Hệ thống kiểm tra phiên bản (version timestamp); người lưu sau nhận thông báo dữ liệu đã bị thay đổi và yêu cầu tải lại | Giữ nguyên dữ liệu hợp lệ của người lưu trước |

---

## 7. Validation, Limits & Wording

### 7.1. Validation Rules (Quy tắc Kiểm tra Dữ liệu)

| Trường thông tin | Loại Control | Ràng buộc nghiệp vụ |
|---|---|---|
| **Nguồn dữ liệu cấu hình** | Dropdown list | Bắt buộc (`M`). Giá trị: `CTT`, `QRGW`... |
| **Đối tác / Ngân hàng hưởng phí** | Dropdown list | Bắt buộc (`M`). Danh sách đối tác onboard hoạt động (`Vietcombank`, `KBank`, `MBBank`...) |
| **Kỳ trả phí** | Dropdown list | Bắt buộc (`M`). Giá trị: `Theo tháng`, `Theo quý`, `Theo năm`, `Theo ngày` |
| **Thời gian áp dụng phí** | DatePicker | Bắt buộc (`M`). Định dạng `DD/MM/YYYY`. Không được chọn ngày trong quá khứ khi tạo mới |
| **Merchant Category Code (MCC)** | Dual Listbox | Bắt buộc (`M`) đối với tab Phí xử lý GD và Phí thanh toán. Tối thiểu 1 mã MCC được chọn |
| **Phương thức thanh toán** | Dropdown list | Bắt buộc (`M`). Giá trị: `Thẻ quốc tế`, `Thẻ nội địa`, `QR Code`... |
| **Thuế VAT** | Number input | Bắt buộc (`M`). Mặc định `8%` hoặc `10%`. Giới hạn `0% - 100%` |
| **Đơn vị tiền tệ** | Dropdown list | Bắt buộc (`M`). Mặc định `VND` |
| **Mức phí cố định** | Currency input | Bắt buộc đối với Phí duy trì / Phí xử lý GD / Quản lý rủi ro / FastPay. Kiểu số nguyên `>= 0`, đơn vị VNĐ |
| **Mức phí tỷ lệ** | Decimal input | Bắt buộc đối với Phí thanh toán. Từ `0% - 100%`, bước nhảy `0.01%` |
| **Mức phí tối thiểu / tối đa** | Currency input | Tùy chọn (`O`). Nếu có cả hai thì `Mức tối thiểu <= Mức tối đa` |
| **Các bậc phí bậc thang** | Dynamic rows | Tổng SLGD/GTGD bậc sau phải bắt đầu lớn hơn bậc trước liền kề (không ngắt quãng hoặc trùng lặp) |
| **Lý do từ chối phê duyệt** | Textarea | Bắt buộc khi Checker bấm [Từ chối]. Độ dài từ 10 đến 500 ký tự |

---

### 7.2. Limits & Quotas (Chỉ số Định lượng Cụ thể)

| Chỉ số / Tham số | Giá trị Cụ thể | Đơn vị / Phạm vi | Hành vi khi vượt ngưỡng |
|---|:---:|:---:|---|
| **Số lượng MCC tối đa chọn 1 lần** | `500` | Mã ngành | Cảnh báo: "Chỉ được chọn tối đa 500 mã MCC trong một cấu hình" |
| **Độ dài trường Mô tả** | `500` | Ký tự | Cắt chuỗi và cảnh báo số ký tự vượt quá |
| **Số chữ số thập phân phí tỷ lệ** | `2` | Chữ số | Tự động làm tròn hoặc chặn nhập từ chữ số thứ 3 |
| **Mức phí cố định tối đa** | `100.000.000` | VNĐ / giao dịch hoặc tháng | Cảnh báo xác nhận giá trị lớn bất thường |
| **Số bậc tối đa trong cấu hình bậc thang** | `10` | Bậc | Nút `+` bị disabled khi đạt 10 bậc |
| **Thời gian lưu vết kiểm toán (Audit Log)** | `10` | Năm | Lưu trữ vĩnh viễn trong kho dữ liệu phục vụ đối soát, không bị purge |

---

### 7.3. Wording Samples (Exact Strings Tiếng Việt)

#### Bảng Thông báo Lỗi (Error Messages)

| Tình huống Lỗi | Mã Lỗi | Nguyên văn Thông báo Hệ thống (Exact String) |
|---|:---:|---|
| Bỏ trống trường bắt buộc | `E-CHP-001` | `"Vui lòng nhập/chọn đầy đủ các trường thông tin bắt buộc (*)."` |
| Chưa chọn mã ngành MCC | `E-CHP-002` | `"Vui lòng chọn ít nhất một mã Merchant Category Code (MCC)."` |
| Mức phí tối thiểu > tối đa | `E-CHP-003` | `"Mức phí tối thiểu không được lớn hơn mức phí tối đa."` |
| Tỷ lệ phí không hợp lệ | `E-CHP-004` | `"Mức phí tỷ lệ phải nằm trong khoảng từ 0.00% đến 100.00%."` |
| Trùng lặp cấu hình hiệu lực | `E-CHP-005` | `"Đã tồn tại cấu hình phí đang ACTIVE cho Đối tác {partner_name} - Dịch vụ {service_name} trong cùng khoảng thời gian áp dụng."` |
| Thiếu lý do từ chối duyệt | `E-CHP-006` | `"Vui lòng nhập lý do từ chối phê duyệt (tối thiểu 10 ký tự)."` |
| Bản ghi đang có YCPD Pending | `E-CHP-007` | `"Cấu hình này đang có Yêu cầu phê duyệt chờ xử lý. Không thể tạo thêm yêu cầu mới."` |
| Ngày áp dụng ở quá khứ | `E-CHP-008` | `"Thời gian áp dụng phí không được chọn ngày trong quá khứ."` |
| Bậc thang đứt quãng / trùng lặp | `E-CHP-009` | `"Khoảng giá trị bậc {n} phải liên tục và lớn hơn bậc {n-1}."` |

#### Bảng Thông báo Thành công (Success Messages)

| Tình huống Nghiệp vụ | Nguyên văn Thông báo Hệ thống (Exact String) |
|---|---|
| Lưu nháp thành công | `"Lưu nháp cấu hình phí thành công. Mã cấu hình: {config_code}."` |
| Tạo mới thành công | `"Tạo mới cấu hình phí thành công ở trạng thái NEW. Mã cấu hình: {config_code}."` |
| Gửi yêu cầu phê duyệt | `"Đã gửi yêu cầu phê duyệt cho cấu hình phí {config_code} thành công."` |
| Checker phê duyệt thành công | `"Phê duyệt cấu hình phí {config_code} thành công."` |
| Checker từ chối thành công | `"Đã từ chối yêu cầu phê duyệt cấu hình {config_code}."` |
| Tạm dừng cấu hình | `"Đã gửi yêu cầu tạm dừng cấu hình {config_code} sang cấp phê duyệt."` |
| Kích hoạt lại cấu hình | `"Đã gửi yêu cầu kích hoạt lại cấu hình {config_code} sang cấp phê duyệt."` |
| Cập nhật thành công | `"Cập nhật thông tin cấu hình phí {config_code} thành công."` |
| Xóa bản ghi thành công | `"Đã xóa cấu hình phí {config_code} thành công."` |

#### Bảng Hộp thoại Xác nhận (Confirm Dialogs)

| Hành động | Tiêu đề Dialog | Nội dung Hộp thoại Xác nhận (Exact String) |
|---|---|---|
| Xác nhận xóa | `Xác nhận xóa cấu hình` | `"Bạn có chắc chắn muốn xóa bản ghi cấu hình phí {config_code}? Thao tác này không thể hoàn tác."` |
| Xác nhận tạm dừng | `Xác nhận tạm dừng áp dụng` | `"Bạn có chắc chắn muốn gửi yêu cầu tạm dừng áp dụng cấu hình phí {config_code}? Sau khi được duyệt, cấu hình sẽ ngừng tính phí."` |
| Xác nhận kích hoạt | `Xác nhận mở kích hoạt` | `"Bạn có chắc chắn muốn gửi yêu cầu kích hoạt lại cấu hình phí {config_code}?"` |
| Cập nhật trên Ready | `Cảnh báo thay đổi cấu hình` | `"Cấu hình đang ở trạng thái READY. Việc cập nhật thông tin sẽ reset trạng thái bản ghi về NEW và phải thực hiện phê duyệt lại từ đầu. Bạn có muốn tiếp tục?"` |

---

## 8. Assumptions (Các giả định nghiệp vụ)

1. **Ràng buộc hiệu lực biểu phí theo kênh:**
   - **Kênh QRGW:** Mỗi dịch vụ (`Thu hộ` / `Chi hộ`) của mỗi đối tác chỉ được phép tồn tại duy nhất **01 biểu phí ở trạng thái `ACTIVE`** trong cùng một khoảng thời gian áp dụng.
   - **Kênh CTT:** Mỗi PTTT của mỗi đối tác được cấu hình 1 hoặc nhiều mã ngành MCC, nhưng **tuyệt đối không được trùng lặp mã MCC** giữa 2 biểu phí cùng có trạng thái `ACTIVE` trong cùng một khoảng thời gian hiệu lực ($\text{MCC}_1 \cap \text{MCC}_2 = \emptyset$).
2. Toàn bộ tiền phí tính toán mặc định sử dụng đồng tiền `VND`. Trường hợp giao dịch ngoại tệ sẽ quy đổi theo tỷ giá thanh toán của ngân hàng tại ngày đối soát.
3. Cán bộ Maker không được phép tự phê duyệt cấu hình do chính mình tạo ra (nguyên tắc 4-eyes / Segregation of Duties).
4. Các giao dịch đã tính phí trong quá khứ không bị hồi tố tính lại khi một cấu hình phí bị chỉnh sửa hoặc tạm dừng; cấu hình mới chỉ áp dụng cho các giao dịch phát sinh từ thời điểm có hiệu lực trở đi.

---

## 9. Risks & Mitigations (Rủi ro Nghiệp vụ theo IT-BA Framing)

| Rủi ro Nghiệp vụ | Khả năng | Hậu quả Nghiệp vụ | Biện pháp Phòng ngừa & Xử lý |
|---|:---:|---|---|
| **Cấu hình nhầm mức phí (vd: 18% thay vì 1.8%)** | Thỉnh thoảng | Thiệt hại tài chính nghiêm trọng cho EPAY hoặc đối tác khi đối soát cước | Bắt buộc qua bước phê duyệt Checker; tích hợp công cụ **Tính thử phí 🧮** ngay trên màn hình tạo mới để kiểm chứng trực quan trước khi gửi duyệt |
| **Giao thoa/xung đột biểu phí giữa 2 cấu hình** | Thỉnh thoảng | Hệ thống billing không xác định được cấu hình nào áp dụng, gây gián đoạn đối soát | Kiểm tra ràng buộc duy nhất (Overlap Validation) khi Maker bấm Lưu hoặc Checker bấm Duyệt |
| **Chậm trễ phê duyệt dẫn đến quá hạn áp dụng** | Thường | Biểu phí không được kích hoạt đúng ngày cam kết trong hợp đồng với ngân hàng | Có tab riêng **Chờ phê duyệt**, gửi email nhắc việc cho nhóm Checker khi có YCPD mới |
| **Sửa cấu hình đang chạy làm gián đoạn tính cước** | Hiếm | Giao dịch phát sinh trong lúc sửa không tính được phí | Cơ chế: Cấu hình `ACTIVE` vẫn giữ nguyên hiệu lực tính cước; các chỉnh sửa nằm ở bản đề xuất `PENDING`, chỉ áp dụng sau khi Checker duyệt thành công |

---

## 10. Success Criteria (Tiêu chí Đánh giá Thành công)

1. **100%** cấu hình phí đối tác mới và sửa đổi đều được kiểm soát qua quy trình Maker - Checker và lưu vết kiểm toán đầy đủ.
2. Thời gian Maker thiết lập một biểu phí mới giảm từ 30 phút (thủ công) xuống **dưới 3 phút** nhờ giao diện trực quan và bộ chọn MCC Dual-Listbox.
3. Không phát sinh bất kỳ sự cố sai lệch cước nào do áp dụng nhầm biểu phí đối tác sau khi golive tính năng.
4. Tỷ lệ tra cứu và xuất báo cáo đối soát biểu phí đạt thời gian phản hồi **< 2 giây**.

---

## 11. Open Questions (Các câu hỏi mở tiếp tục theo dõi)

- [x] **OQ-1 (Resolved):** Cấu hình biểu phí bậc thang theo sản lượng: *Đã được giải quyết qua ảnh UI — hệ thống hỗ trợ Bậc thang theo Tổng SLGD / Tổng GTGD trực tiếp tại các tab Phí thanh toán và Phí dịch vụ gia tăng (Token).*
- [ ] **OQ-2:** Nút "Xuất tệp" trên thanh công cụ sẽ xuất file theo cấu trúc chuẩn nào (Excel gồm 1 sheet tổng hợp hay 4 sheet tương ứng 4 loại phí)?
- [ ] **OQ-3:** Cơ chế phân quyền chi tiết cho Checker: Có phân chia thẩm quyền duyệt theo hạn mức phí tối đa hoặc theo từng ngân hàng đối tác cụ thể hay không?
- [ ] **OQ-4:** Khi cấu hình hết hạn hiệu lực (hết ngày kết thúc áp dụng phí nếu có), hệ thống sẽ chuyển sang trạng thái `EXPIRED` hay tự động chuyển về `INACTIVE`?

---

## 12. Next Steps (Các bước tiếp theo)

Sau khi tài liệu Brainstorming 12 Mục được cập nhật toàn diện theo 10 màn hình thực tế, các bước kế tiếp theo BA Master Flow:
1. **Thiết kế sơ đồ quy trình & Trạng thái chuyên sâu:**
   - Vẽ Sơ đồ PlantUML State Diagram chi tiết 7 trạng thái (`/state`).
   - Vẽ Sơ đồ tuần tự tương tác Maker - Checker - Job Golive (`/sequence`).
2. **Lập Tài liệu Phân tích Yêu cầu SRS & Bảng đặc tả Use Cases chuẩn EPAY-QT.CG.02_BM33:**
   - Phần 1: Bảng đặc tả Use Case 10 dòng chuẩn (UC01 Tra cứu/Danh sách, UC02 Thêm mới, UC03 Chỉnh sửa, UC04 Phê duyệt/Từ chối, UC05 Kích hoạt/Tạm dừng, UC06 Tính thử phí, UC07 Lịch sử thay đổi).
   - Phần 2: Bảng bóc tách thành phần giao diện 6 cột chuẩn EPAY.
   - Mục 2.2.5: Bảng danh sách trường tin tùy chỉnh 4 cột.
3. **Thiết kế Wireframe HTML tương tác (V2 UI):**
   - Sinh bộ prototype HTML tương tác cho đầy đủ các màn hình: Danh sách, Thêm mới (4 tabs, MCC transfer list, Tính thử) và Chi tiết / Phê duyệt / Lịch sử thay đổi.
