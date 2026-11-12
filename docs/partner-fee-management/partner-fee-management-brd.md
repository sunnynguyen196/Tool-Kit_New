---
type: brd
feature: partner-fee-management
status: draft
updated: 2026-11-03
links:
  - brainstorm: "docs/partner-fee-management/brainstorms/partner-fee-management.md"
  - wireframe: "docs/partner-fee-management/html-wireframe/partner-fee-full-screens.html"
---

# Quản lý Cấu hình Phí Trả Đối tác (Partner Fee Management) — Business Requirements Document (BRD)

## 1. Executive Summary

Tính năng **Quản lý Cấu hình Phí Trả Đối tác (Partner Fee Management)** trên hệ thống EPAY Portal 2.0 được xây dựng nhằm chuẩn hóa, tập trung hóa và tự động hóa toàn bộ quy trình thiết lập, quản lý và vận hành các biểu phí chi trả cho các Ngân hàng và Đối tác kết nối trung gian (Vietcombank, MBBank, KBank, BIDV, Napas, CyberSource...). 

Điểm cốt lõi của lần tái cấu trúc nghiệp vụ này là **tách bạch rõ ràng mô hình cấu hình biểu phí theo từng Nguồn dữ liệu (Kênh dịch vụ)**:
1. **Đối tác thuộc Cổng Thanh Toán (CTT - Payment Gateway):** Bao gồm đầy đủ **04 nhóm phí** chuyên biệt cho các giao dịch thẻ và cổng (Phí Duy trì dịch vụ, Phí Xử lý giao dịch, Phí Thanh toán theo thương hiệu thẻ/cổng, Phí Dịch vụ gia tăng như Tokenization, Quản lý rủi ro, FastPay bypass 3DS).
2. **Đối tác thuộc QR Gateway (QRGW - Cổng thanh toán mã QR):** Bao gồm **03 nhóm phí** đặc thù cho mạng lưới thanh toán chuyển khoản QR (Phí Duy trì dịch vụ, Phí Xử lý giao dịch, Phí Thanh toán tỷ lệ/cố định theo doanh số QR) — hoàn toàn không áp dụng Phí Dịch vụ gia tăng thẻ.

Hệ thống cung cấp cơ chế kiểm soát chéo **Maker – Checker (4-eyes principle)** chặt chẽ, hỗ trợ tính thử phí mô phỏng (Simulator), quản lý lịch sử kiểm toán (Audit Trail) chi tiết, đồng thời cung cấp cơ chế tự động kích hoạt biểu phí đúng thời điểm (Auto-golive Scheduler) để phục vụ đối soát tài chính hàng tháng chính xác 100%.

---

## 2. Business Problem & Context

### 2.1 Problem Statement

| ID | Business Condition (Hiện trạng nghiệp vụ) | Baseline (Điểm tham chiếu) | Business Impact (Tác động kinh doanh) | Evidence (Bằng chứng thực tế) |
|---|---|---|---|---|
| **BP-PFEE-01** | Cấu hình biểu phí đối tác đang phân tán giữa các bảng cấu hình kỹ thuật Backend, thiếu giao diện quản trị tập trung cho nghiệp vụ | Đang cấu hình trực tiếp DB hoặc qua file cấu hình phân mảnh | Rủi ro sai sót tham số biểu phí, phụ thuộc hoàn toàn vào đội ngũ Kỹ thuật/Dev mỗi khi ngân hàng đối tác thay đổi hợp đồng | Yêu cầu cập nhật phí mất 2 - 3 ngày làm việc; phát sinh lệch số liệu đối soát cuối tháng |
| **BP-PFEE-02** | Trộn lẫn logic cấu hình giữa kênh CTT (Thẻ, Cổng) và kênh QRGW (Mã QR) gây nhầm lẫn tham số | Một số màn hình cũ hiển thị chung các trường nhập liệu thẻ cho cả đối tác QR | Maker dễ chọn sai loại biểu phí, thiết lập thừa các dịch vụ gia tăng (Token, 3DS) cho kênh QR vốn không hỗ trợ | Báo cáo kiểm toán nội bộ ghi nhận cấu hình rác và dư thừa tham số |
| **BP-PFEE-03** | Thiếu công cụ giả lập kiểm thử tính phí trước khi biểu phí có hiệu lực | Maker tính thủ công bằng Excel ngoài hệ thống | Không lường trước được mức phí thực tế với các mô hình bậc thang phức tạp hoặc chặn trần/sàn | Phát sinh khiếu nại tài chính giữa EPAY và Đối tác sau chu kỳ đối soát |
| **BP-PFEE-04** | Quy trình phê duyệt biểu phí chưa có công cụ kiểm soát 4-eyes trực quan | Duyệt qua email hoặc văn bản giấy ký tay | Khó truy vết ai là người tạo, ai phê duyệt, lịch sử thay đổi từng tham số (Audit Trail) | Thiếu căn cứ kiểm toán đối soát độc lập theo quy chuẩn bảo mật tài chính |

### 2.2 Opportunity & Why Now

- **Quy mô đối tác tăng nhanh:** EPAY đang mở rộng kết nối song song nhiều ngân hàng thu hộ/chi hộ, cổng thẻ quốc tế (CyberSource, KBank) và mạng lưới VietQR/Napas 247. Mỗi đối tác áp dụng cơ chế tính phí khác biệt (phí cố định, phí %, bậc thang theo doanh số).
- **Yêu cầu tuân thủ & Tự động hóa đối soát:** Việc đưa toàn bộ cấu hình biểu phí lên Portal 2.0 giúp Phòng Vận hành (Operations) và Kế toán Đối soát (Settlement) chủ động kiểm soát vòng đời biểu phí, giảm 90% thời gian xử lý thủ công, ngăn ngừa rủi ro thất thoát doanh thu.

### 2.3 Strategic Alignment

- Phù hợp với chiến lược chuyển đổi số toàn diện hệ thống **EPAY Portal 2.0** — cung cấp công cụ tự phục vụ (Self-service) cho khối vận hành.
- Chuẩn hóa quản trị rủi ro vận hành theo tiêu chuẩn Ngân hàng Nhà nước và nguyên tắc tách biệt thẩm quyền Maker - Checker.

---

## 3. Current State, Future State & Gap Analysis

### 3.1 Current State (AS-IS)
- Biểu phí đối tác được lưu trữ rải rác trong cơ sở dữ liệu core hoặc file cấu hình do IT quản trị.
- Mỗi lần đối tác cập nhật phụ lục hợp đồng phí, Maker phải làm phiếu yêu cầu (Jira/Email), Dev thực hiện cấu hình thủ công.
- Không có môi trường kiểm thử trực quan công thức tính phí (Formula Validation).
- Thiếu màn hình so sánh đối chiếu phiên bản Cũ - Mới khi có chỉnh sửa biểu phí.

### 3.2 Future State (TO-BE)
- Cung cấp phân hệ **Quản lý Cấu hình Phí Trả Đối tác** trên EPAY Portal 2.0 với giao diện phân chia rõ ràng theo Nguồn dữ liệu (**CTT** vs **QRGW**).
- Maker tự tạo mới, chỉnh sửa và thử nghiệm công thức qua công cụ **Tính thử phí 🧮**.
- Checker xem bảng so sánh Diff (Old vs New) trực quan và phê duyệt/từ chối trên giao diện.
- Hệ thống Job Scheduler tự động kích hoạt biểu phí đúng mốc `Thời gian áp dụng phí` (Auto-golive).
- Lưu vết lịch sử thay đổi (Audit Trail) chi tiết tới từng trường thông tin.

### 3.3 Gap Analysis

| Khoảng trống (Gap) | Mô tả chi tiết | Mức độ ưu tiên |
|---|---|:---:|
| **GAP-01: Phân định CTT vs QRGW** | Tách bạch hoàn toàn form nhập liệu và các loại phí giữa Cổng thanh toán (4 loại phí) và QR Gateway (3 loại phí) | **P0 (Bắt buộc)** |
| **GAP-02: Phê duyệt 2 bước (Maker-Checker)** | Thiết lập quy trình 7 trạng thái bản ghi và luồng gửi/duyệt/từ chối YCPD độc lập | **P0 (Bắt buộc)** |
| **GAP-03: Công cụ tính thử phí** | Tích hợp Popup Simulator kiểm thử cả mô hình 1 bậc lẫn bậc thang (SLGD/GTGD) | **P0 (Bắt buộc)** |
| **GAP-04: Lịch sử kiểm toán (Audit Trail)** | Màn hình dòng thời gian ghi nhận ai sửa trường nào, giá trị cũ là gì, giá trị mới là gì | **P1 (Nên có)** |
| **GAP-05: Cảnh báo chồng lấn biểu phí** | Cảnh báo khi tạo cấu hình trùng lặp tổ hợp đối tác/kênh/khoảng thời gian đã có hiệu lực | **P2 (Mở rộng)** |

---

## 4. Stakeholders & Stakeholder Requirements

| Nhóm Stakeholder | Mức độ Quan tâm | Mức độ Ảnh hưởng | Kỳ vọng / Yêu cầu Nghiệp vụ cốt lõi |
|---|:---:|:---:|---|
| **Maker (Chuyên viên Vận hành / Tính cước EPAY)** | Rất cao | Trung bình | Giao diện rõ ràng, phân định đúng loại phí CTT/QRGW, có bộ chọn MCC thông minh, tính thử phí ngay trên màn hình, lưu nháp linh hoạt |
| **Checker (Trưởng phòng Vận hành / Kế toán trưởng)** | Rất cao | Rất cao | Bảng đối chiếu so sánh rõ ràng các thông số thay đổi giữa bản ghi cũ và mới; thao tác Duyệt/Từ chối nhanh kèm lý do |
| **Bộ phận Đối soát & Quyết toán (Settlement)** | Rất cao | Cao | Số liệu phí chính xác 100%, không bị sai lệch do nhầm lẫn giữa phí CTT và QR; có báo cáo xuất dữ liệu phục vụ đối chiếu định kỳ |
| **Đội ngũ Phát triển Core / Billing Engine** | Trung bình | Cao | Cấu trúc dữ liệu biểu phí chuẩn hóa, rõ ràng logic áp dụng theo thời gian hiệu lực và trạng thái `ACTIVE` |
| **Ban Giám đốc & Kiểm toán nội bộ** | Cao | Rất cao | Minh bạch chính sách phí, tuân thủ nguyên tắc 4 mắt (Maker không tự duyệt), lưu vết kiểm toán đầy đủ không thể tẩy xóa |

---

## 5. Business Objectives & Success Measures

| ID | Mục tiêu Nghiệp vụ (Business Objective) | Điểm tham chiếu (Baseline) | Chỉ tiêu mục tiêu (Target) | Khung thời gian | Tiêu chí đo lường thành công |
|---|---|---|---|---|---|
| **BO-PFEE-01** | Giảm thiểu thời gian thiết lập và áp dụng biểu phí đối tác mới | 48 - 72 giờ làm việc (phụ thuộc Dev) | **< 2 giờ** (vận hành tự cấu hình & duyệt) | 1 tháng sau Go-live | Đo thời gian từ lúc tạo bản ghi đến khi được Checker duyệt |
| **BO-PFEE-02** | Triệt tiêu sai sót do cấu hình nhầm loại phí giữa CTT và QRGW | Vẫn còn 1-2 vụ việc/quý cấu hình sai tham số | **0 sai sót (Zero-defect)** | Ngay khi Go-live | Không còn phát sinh cấu hình rác/thừa trường cho kênh QR |
| **BO-PFEE-03** | 100% bản ghi thay đổi biểu phí được kiểm soát và phê duyệt qua hệ thống | Một số thay đổi DB trực tiếp chưa có Audit log Portal | **100% tuân thủ Maker - Checker & Audit Trail** | Ngay khi Go-live | Báo cáo kiểm toán ghi nhận đầy đủ vết cho mọi bản ghi |
| **BO-PFEE-04** | Tự động hóa hoàn toàn việc kích hoạt biểu phí đúng thời hạn | Kích hoạt thủ công hoặc qua script chạy tay | **100% tự động qua Job Scheduler** | 2 tháng sau Go-live | Tỷ lệ kích hoạt đúng ngày giờ hiệu lực đạt 100% |

---

## 6. Business Scope (Phạm vi Nghiệp vụ)

### 6.1 In Scope (Thuộc phạm vi)

Hệ thống quản lý biểu phí được phân tách độc lập trực tiếp từ Menu Left thành 2 phân hệ chuyên biệt:
```
Quản lý cấu hình phí
└── Phí trả đối tác
    ├── Phí đối tác CTT
    └── Phí đối tác QRGW
```
> **Lưu ý nghiệp vụ:** Bỏ toàn bộ trường thông tin "Nguồn dữ liệu" trên form bộ lọc và bảng dữ liệu vì người dùng đã được định tuyến trực tiếp qua Menu Left.
> **Phạm vi loại phí:** Rút gọn chỉ còn **02 loại phí chính**: `Phí xử lý giao dịch` và `Phí thanh toán`.
> **Hình thức thu phí chuẩn:** Chuẩn hóa chỉ gồm **03 hình thức**: `1 bậc`, `Theo SLGD`, `Theo GTGD`.

---

#### Phần 1: Cấu hình phí cho Đối tác thuộc Cổng Thanh Toán (CTT)
Áp dụng cho các giao dịch thanh toán trực tuyến qua Thẻ quốc tế (Visa, Mastercard, JCB, Amex), Thẻ ghi nợ nội địa (NAPAS), Ví điện tử và Tài khoản ngân hàng.

1. **Phí Xử lý giao dịch (XLGD):**
   - Thu phí kỹ thuật xử lý dữ liệu giao dịch kết nối qua Cổng thanh toán (CTT).
   - **Bảng Tham số Cấu hình Chuẩn:**
     | STT | Tham số cấu hình | Kiểu dữ liệu / Control | Quy tắc & Giá trị chấp nhận |
     |:---:|---|---|---|
     | 1 | **Đối tác / Ngân hàng hưởng phí** | Dropdown list | Bắt buộc (`M`). Chọn từ danh mục đối tác kết nối (Vietcombank, KBank, MBBank, Napas, CyberSource...). |
     | 2 | **Phương thức thanh toán (PTTT)** | Dropdown / Multi-select | Bắt buộc (`M`). Giá trị: `Thẻ nội địa`, `Thẻ quốc tế`, `Tài khoản ngân hàng`. |
     | 3 | **Loại giao dịch** | Multi-select / Checkbox | Bắt buộc (`M`). Giá trị: `Thanh toán`, `Hoàn trả` (Refund).<br>*(Đặc biệt khi cấu hình cho giao dịch **Hoàn trả**: Kích hoạt thêm trường **Ngày áp dụng phí trên giao dịch**: `Ngày giao dịch gốc` hoặc `Ngày tạo giao dịch hoàn trả`)*. |
     | 4 | **Trạng thái giao dịch** | Dropdown / Radio | Bắt buộc (`M`). Giá trị: `Tất cả`, `Thành công`, `Thất bại`. Mặc định: `Thành công`. Tùy theo hợp đồng ngân hàng đối tác có thu phí cả giao dịch thất bại hay không. |
     | 5 | **Kỳ trả phí** | Dropdown list | Bắt buộc (`M`). Giá trị: `Theo phiên`, `Theo ngày`, `Theo tháng`, `Theo quý`, `Theo năm`. |
     | 6 | **Danh mục mã ngành MCC** | Dual-Listbox | Bắt buộc (`M`). Chọn tối thiểu 1 mã MCC hoặc chọn "Tất cả MCC" (áp dụng chung). Quy tắc: Không được trùng lặp MCC trong 2 biểu phí cùng active trong 1 khoảng thời gian. |
     | 7 | **Thời gian áp dụng** | DateRangePicker | Bắt buộc (`M`). Định dạng `DD/MM/YYYY`. Từ ngày (bắt buộc $\ge$ ngày hiện tại khi tạo mới), Đến ngày (tùy chọn hoặc vô thời hạn). |
     | 8 | **Thuế VAT** | Number input (%) | Bắt buộc (`M`). Mặc định `8%` hoặc `10%`. Giới hạn `0% - 100%`. |
     | 9 | **Cơ chế Áp dụng loại giao dịch** | Checkbox / Radio | **[ ] Áp dụng chung cho toàn bộ loại giao dịch** hoặc **[x] Cấu hình riêng cho từng loại giao dịch** (khi chọn riêng, hệ thống tự động sinh các khối nhập mức phí riêng biệt cho *Thanh toán* và *Hoàn trả*). |
     | 10 | **Hình thức thu phí** | Radio group | Bắt buộc (`M`). Chuẩn hóa gồm 3 lựa chọn: `1 bậc` (cố định), `Theo SLGD` (bậc thang số lượng GD), `Theo GTGD` (bậc thang giá trị GD). |
     | 11 | **Mức phí chi tiết** | Currency / Dynamic Table | - Nếu hình thức = `1 bậc`: Nhập số tiền cố định (VND/giao dịch), số nguyên $\ge 0$.<br>- Nếu hình thức = `Theo SLGD`: Bảng thiết lập các bậc theo Tổng SLGD (Từ SLGD - Đến SLGD - Mức phí VND/GD), có nút thêm/bớt bậc `[+]`, `[-]`.<br>- Nếu hình thức = `Theo GTGD`: Bảng thiết lập các bậc theo Tổng GTGD. |

2. **Phí Thanh toán (MDR - Merchant Discount Rate):**
   - Thu phí thanh toán theo tỷ lệ % trên giá trị giao dịch thành công chi trả cho đối tác/ngân hàng.
   - **Bảng Tham số Cấu hình Chuẩn:**
     | STT | Tham số cấu hình | Kiểu dữ liệu / Control | Quy tắc & Giá trị chấp nhận |
     |:---:|---|---|---|
     | 1 | **Đối tác / Ngân hàng hưởng phí** | Dropdown list | Bắt buộc (`M`). Chọn từ danh mục đối tác kết nối (Vietcombank, MBBank, KBank, BIDV, Napas, CyberSource...). |
     | 2 | **Kỳ trả phí** | Dropdown list | Bắt buộc (`M`). Giá trị: `Theo phiên`, `Theo ngày`, `Theo tháng`, `Theo quý`, `Theo năm`. |
     | 3 | **Thời gian áp dụng** | DateRangePicker | Bắt buộc (`M`). Định dạng `DD/MM/YYYY`. Từ ngày (bắt buộc $\ge$ ngày hiện tại khi tạo mới), Đến ngày (tùy chọn hoặc vô thời hạn). |
     | 4 | **Danh mục mã ngành MCC** | Dual-Listbox | Bắt buộc (`M`). Chọn tối thiểu 1 mã MCC hoặc chọn "Tất cả MCC" (áp dụng chung). Không được trùng lặp MCC giữa các biểu phí cùng active trong cùng kỳ. |
     | 5 | **Phương thức thanh toán (PTTT)** | Dropdown list | Bắt buộc (`M`). Giá trị: `Thẻ nội địa`, `Tài khoản ngân hàng`, `Thẻ quốc tế`. |
     | 6 | **Loại giao dịch** | Multi-select / Checkbox | Bắt buộc (`M`). Giá trị: `Thanh toán`, `Hoàn trả` (Refund).<br>*(Khi chọn **Hoàn trả**: Kích hoạt thêm trường **Ngày áp dụng phí trên giao dịch**: `Ngày giao dịch gốc` hoặc `Ngày tạo giao dịch hoàn trả`)*. |
     | 7 | **Thuế VAT** | Number input (%) | Bắt buộc (`M`). Mặc định `8%` hoặc `10%`. Giới hạn `0% - 100%`. |
     | 8 | **Hình thức thu phí** | Radio group | Bắt buộc (`M`). Chọn: `1 bậc` (tỷ lệ cố định), `Theo SLGD` (bậc thang số lượng GD), hoặc `Theo GTGD` (bậc thang giá trị GD). |
     | 9 | **Mức phí tỉ lệ** | Decimal input (%) | Bắt buộc (`M`). Tỷ lệ % phí trên GTGD, hỗ trợ bước nhảy `0.01%`, giới hạn `0% - 100%`. |
     | 10 | **Mức phí tối thiểu** | Currency input | Tùy chọn (`O`). Số tiền sàn tối thiểu trên 1 GD (VND). |
     | 11 | **Mức phí tối đa** | Currency input | Tùy chọn (`O`). Số tiền trần tối đa trên 1 GD (VND). Bắt buộc $\text{Min} \le \text{Max}$. |
   
   - **Cơ chế Rẽ nhánh Điều kiện Đặc biệt khi chọn PTTT = Thẻ quốc tế (TQT):**
     Khi Maker chọn **`PTTT = Thẻ quốc tế`**, hệ thống tự động kích hoạt thêm **03 trường nghiệp vụ chuyên sâu**:
     * **Trường Thương hiệu thẻ:** Multi-select chọn các thương hiệu áp dụng (`Visa`, `MasterCard`, `JCB`, `Amex`, `UnionPay`...).
     * **Checkbox Cơ chế Áp dụng Thương hiệu:**
       + `[ ] Áp dụng chung cho toàn bộ thương hiệu thẻ`: Sử dụng chung 1 biểu phí tỷ lệ và Min/Max cho tất cả các thương hiệu thẻ quốc tế đã chọn.
       + `[x] Cấu hình phí riêng từng thương hiệu thẻ`: Hệ thống tự động phân rã thành các tab/khối cấu hình riêng cho từng thương hiệu thẻ (VD: Visa tính 1.8%, MasterCard tính 2.0%, JCB tính 2.2%).
     * **Trường Nơi phát hành:** Radio button chọn phạm vi:
       + `Trong nước`: Thẻ quốc tế do các ngân hàng tại Việt Nam phát hành.
       + `Nước ngoài`: Thẻ quốc tế do các ngân hàng ngoài lãnh thổ Việt Nam phát hành.

---

#### Phần 2: Cấu hình phí cho Đối tác thuộc QR Gateway (QRGW)
Áp dụng chuyên biệt cho mạng lưới thanh toán mã QR (VietQR, Napas 247, QR Ngân hàng liên kết). Gồm **02 loại phí**:

1. **Phí Xử lý giao dịch (XLGD):**
   - Thu phí kỹ thuật xử lý dữ liệu giao dịch kết nối qua Cổng QR Gateway (QRGW) phục vụ các giao dịch mã QR.
   - **Bảng Tham số Cấu hình Chuẩn:**
     | STT | Tham số cấu hình | Kiểu dữ liệu / Control | Quy tắc & Giá trị chấp nhận |
     |:---:|---|---|---|
     | 1 | **Đối tác / Ngân hàng hưởng phí** | Dropdown list | Bắt buộc (`M`). Chọn từ danh mục đối tác kết nối kênh QR (VietinBank, BIDV, Vietcombank, Napas...). |
     | 2 | **Loại dịch vụ** | Dropdown / Radio | Bắt buộc (`M`). Giá trị: `Thu hộ` (Inbound QR Payment), `Chi hộ` (Outbound QR/Transfer). Quy tắc: Mỗi dịch vụ của mỗi đối tác chỉ được phép tồn tại 1 biểu phí được active trong 1 khoảng thời gian. |
     | 3 | **Loại giao dịch** | Multi-select / Checkbox | Bắt buộc (`M`). Giá trị: `Thanh toán`, `Hoàn trả` (Refund).<br>*(Đặc biệt khi cấu hình cho giao dịch **Hoàn trả**: Kích hoạt thêm trường **Ngày áp dụng phí trên giao dịch**: `Ngày giao dịch gốc` hoặc `Ngày tạo giao dịch hoàn trả`)*. |
     | 4 | **Trạng thái giao dịch** | Dropdown / Radio | Bắt buộc (`M`). Giá trị: `Tất cả`, `Thành công`, `Thất bại`. Mặc định: `Thành công`. Tùy theo hợp đồng ngân hàng đối tác có thu phí cả giao dịch thất bại hay không. |
     | 5 | **Kỳ trả phí** | Dropdown list | Bắt buộc (`M`). Giá trị: `Theo phiên`, `Theo ngày`, `Theo tháng`, `Theo quý`, `Theo năm`. |
     | 6 | **Thời gian áp dụng** | DateRangePicker | Bắt buộc (`M`). Định dạng `DD/MM/YYYY`. Từ ngày (bắt buộc $\ge$ ngày hiện tại khi tạo mới), Đến ngày (tùy chọn hoặc vô thời hạn). |
     | 7 | **Thuế VAT** | Number input (%) | Bắt buộc (`M`). Mặc định `8%` hoặc `10%`. Giới hạn `0% - 100%`. |
     | 8 | **Cơ chế Áp dụng loại giao dịch** | Checkbox / Radio | **[ ] Áp dụng chung cho toàn bộ loại giao dịch** hoặc **[x] Cấu hình riêng cho từng loại giao dịch**. |
     | 9 | **Hình thức thu phí** | Radio group | Bắt buộc (`M`). Chuẩn hóa gồm 3 lựa chọn: `1 bậc`, `Theo SLGD`, `Theo GTGD`. |
     | 10 | **Mức phí chi tiết** | Currency / Dynamic Table | - Nếu hình thức = `1 bậc`: Nhập số tiền cố định (VND/giao dịch), số nguyên $\ge 0$.<br>- Nếu hình thức = `Theo SLGD`: Bảng bậc thang theo SLGD.<br>- Nếu hình thức = `Theo GTGD`: Bảng bậc thang theo GTGD. |

2. **Phí Thanh toán:**
   - Thu phí thanh toán theo tỷ lệ % trên giá trị giao dịch QR thành công chi trả cho ngân hàng/đối tác chuyển mạch.
   - **Bảng Tham số Cấu hình Chuẩn:**
     | STT | Tham số cấu hình | Kiểu dữ liệu / Control | Quy tắc & Giá trị chấp nhận |
     |:---:|---|---|---|
     | 1 | **Đối tác / Ngân hàng hưởng phí** | Dropdown list | Bắt buộc (`M`). Chọn từ danh mục đối tác kết nối kênh QR (VietinBank, BIDV, Vietcombank, MBBank, Napas...). |
     | 2 | **Kỳ trả phí** | Dropdown list | Bắt buộc (`M`). Giá trị: `Theo phiên`, `Theo ngày`, `Theo tháng`, `Theo quý`, `Theo năm`. |
     | 3 | **Thời gian áp dụng** | DateRangePicker | Bắt buộc (`M`). Định dạng `DD/MM/YYYY`. Từ ngày (bắt buộc $\ge$ ngày hiện tại khi tạo mới), Đến ngày (tùy chọn hoặc vô thời hạn). |
     | 4 | **Dịch vụ** | Dropdown / Radio | Bắt buộc (`M`). Giá trị: `Thu hộ` (Inbound QR), `Chi hộ` (Outbound QR/Transfer). Duy nhất 1 biểu phí active/dịch vụ/khoảng thời gian. |
     | 5 | **Loại giao dịch** | Multi-select / Checkbox | Bắt buộc (`M`). Giá trị: `Thanh toán`, `Hoàn trả` (Refund).<br>*(Khi chọn **Hoàn trả**: Kích hoạt thêm trường **Ngày áp dụng phí trên giao dịch**: `Ngày giao dịch gốc` hoặc `Ngày tạo giao dịch hoàn trả`)*. |
     | 6 | **Thuế VAT** | Number input (%) | Bắt buộc (`M`). Mặc định `8%` hoặc `10%`. Giới hạn `0% - 100%`. |
     | 7 | **Hình thức thu phí** | Radio group | Bắt buộc (`M`). Chọn: `1 bậc`, `Theo SLGD`, hoặc `Theo GTGD`. |
     | 8 | **Mức phí tỉ lệ** | Decimal input (%) | Bắt buộc (`M`). Tỷ lệ % phí trên GTGD, hỗ trợ bước nhảy `0.01%`, giới hạn `0% - 100%`. |
     | 9 | **Mức phí tối thiểu** | Currency input (VND) | Tùy chọn (`O`). Số tiền sàn tối thiểu trên 1 GD thanh toán QR (VND). |
     | 10 | **Mức phí tối đa** | Currency input (VND) | Tùy chọn (`O`). Số tiền trần tối đa trên 1 GD thanh toán QR (VND). Quy tắc: $\text{Min} \le \text{Max}$. |
     | 11 | **Cơ chế Áp dụng loại giao dịch** | Checkbox / Switch | **[ ] Áp dụng cho toàn bộ giao dịch** hoặc **[x] Phí của từng loại giao dịch** (Thanh toán / Hoàn trả). |

   - Tích hợp công cụ **Tính thử phí 🧮** (Simulator Popup) mô phỏng mức phí thực tế theo công thức $f = \min(\text{Max}, \max(\text{Min}, \text{GTGD} \times \text{Tỷ lệ} \times (1 + \text{VAT})))$.
   *(Lưu ý: Kênh QRGW **KHÔNG** cấu hình Phí Dịch vụ gia tăng).*


#### Quy trình Quản lý vòng đời cấu hình chung
- **Vòng đời 7 trạng thái:** `DRAFT` (Nháp), `NEW` (Tạo mới), `PENDING` (Chờ duyệt), `READY` (Sẵn sàng golive), `ACTIVE` (Đang hiệu lực), `INACTIVE` (Tạm dừng/Hết hiệu lực), `DELETED` (Đã xóa).
- **Phân quyền Maker - Checker:** Tách bạch quyền tạo/sửa và quyền duyệt/từ chối.
- **Lịch sử thay đổi (Audit Trail):** Ghi nhận đầy đủ biến động dữ liệu.

### 6.2 Out of Scope (Ngoài phạm vi)
- Nghiệp vụ tính toán thanh quyết toán và đối chiếu tự động với ngân hàng (thuộc phân hệ Billing & Settlement Engine).
- Xuất hóa đơn tài chính VAT cho đối tác (thuộc hệ thống Kế toán ERP/Hóa đơn điện tử).
- Cấu hình biểu phí thu từ Khách hàng cuối / Merchant (Đơn vị chấp nhận thanh toán) — đây là biểu phí đầu vào trả Ngân hàng/Đối tác kết nối.

### 6.3 Assumptions (Giả định nghiệp vụ)
- Đơn vị tiền tệ mặc định là **VND**. Các giao dịch ngoại tệ (nếu có) sẽ được quy đổi theo tỷ giá thanh toán của ngân hàng tại ngày đối soát.
- Mọi mức phí cấu hình có trường thông tin thuế suất VAT (mặc định 8% hoặc 10%) để phục vụ tính toán tổng chi phí cuối cùng.
- Danh mục Mã ngành kinh doanh MCC (Merchant Category Code) đã được chuẩn hóa đồng bộ trên toàn hệ thống EPAY Portal.

### 6.4 Constraints (Ràng buộc nghiệp vụ)
- **Ràng buộc thời gian hiệu lực:** Thời gian bắt đầu áp dụng phí khi tạo mới không được phép nằm trong quá khứ so với ngày hiện tại (`Từ ngày` $\ge$ `Ngày hiện tại`).
- **Ràng buộc Chống Trùng lặp Biểu phí QRGW (Single Active Fee per Service & Partner):** Đối với kênh QRGW, mỗi dịch vụ (`Thu hộ` / `Chi hộ`) của mỗi đối tác chỉ được phép tồn tại duy nhất **01 biểu phí ở trạng thái `ACTIVE`** trong cùng một khoảng thời gian áp dụng.
- **Ràng buộc Không Trùng lặp MCC Kênh CTT (Non-overlapping MCC per Partner & PTTT):** Đối với kênh CTT, mỗi PTTT của mỗi đối tác được cấu hình 1 hoặc nhiều mã ngành MCC, nhưng **tuyệt đối không được trùng lặp mã MCC** giữa 2 biểu phí cùng có trạng thái `ACTIVE` trong cùng một khoảng thời gian hiệu lực.
- **Nguyên tắc tách biệt quyền hạn (4-eyes):** Cán bộ tạo bản ghi (Maker) tuyệt đối không được phép phê duyệt bản ghi do chính mình tạo ra.


### 6.5 Dependencies (Phụ thuộc hệ thống)
- Danh mục Đối tác, Cổng TGTT, Ngân hàng thụ hưởng từ hệ thống Quản lý Đối tác Core EPAY.
- Dịch vụ lập lịch Job Scheduler để tự động kích hoạt cấu hình `READY` thành `ACTIVE`.

---

## 7. High-level Business Requirements (Yêu cầu Nghiệp vụ Tổng thể)

| ID | Yêu cầu Nghiệp vụ (Business Requirement) | Đáp ứng Mục tiêu | Mức ưu tiên |
|---|---|:---:|:---:|
| **BREQ-PFEE-01** | **Phân lập Nguồn dữ liệu CTT và QRGW**: Hệ thống bắt buộc Maker chọn rõ Nguồn dữ liệu ngay từ đầu; từ đó động hóa hiển thị đúng các loại phí tương ứng (CTT hiển thị 4 loại phí; QRGW chỉ hiển thị 3 loại phí). | BO-PFEE-02 | **P0** |
| **BREQ-PFEE-02** | **Quản lý Cấu hình Phí CTT**: Hỗ trợ đầy đủ tham số cho 4 loại phí của CTT gồm: Phí duy trì MID, Phí XLGD theo MCC/loại GD, Phí thanh toán thẻ (1 bậc/bậc thang, Min/Max), và Phí VAS (Token, Risk, FastPay). | BO-PFEE-01 | **P0** |
| **BREQ-PFEE-03** | **Quản lý Cấu hình Phí QRGW**: Hỗ trợ đầy đủ tham số cho 3 loại phí của QRGW gồm: Phí duy trì dịch vụ QR, Phí XLGD QR, và Phí thanh toán theo doanh số QR. Loại bỏ hoàn toàn các trường phí VAS thẻ. | BO-PFEE-02 | **P0** |
| **BREQ-PFEE-04** | **Quy trình Phê duyệt 2 Bước (Maker - Checker)**: Cung cấp luồng chuyển trạng thái bản ghi chặt chẽ; Maker chỉ có quyền Lưu nháp, Tạo mới, Gửi YCPD, Tạm dừng; Checker có quyền Duyệt hoặc Từ chối kèm lý do bắt buộc. | BO-PFEE-03 | **P0** |
| **BREQ-PFEE-05** | **Công cụ Tính thử phí mô phỏng 🧮**: Cho phép Maker và Checker nhập số lượng GD, giá trị GD để xem trước mức phí tính toán thực tế (bao gồm VAT, Min, Max và phân rã các bậc thang). | BO-PFEE-01 | **P0** |
| **BREQ-PFEE-06** | **Tự động Kích hoạt Biểu phí (Auto-golive)**: Khi đến ngày bắt đầu áp dụng phí, hệ thống tự động chuyển cấu hình từ `READY` sang `ACTIVE` và chuyển cấu hình cũ cùng tổ hợp sang `INACTIVE`. | BO-PFEE-04 | **P0** |
| **BREQ-PFEE-07** | **Lưu vết Kiểm toán (Audit Trail Timeline)**: Ghi lại đầy đủ lịch sử thay đổi của từng trường thông tin, người thay đổi, thời gian thay đổi và lý do phê duyệt/từ chối. | BO-PFEE-03 | **P1** |
| **BREQ-PFEE-08** | **Bộ lọc Tra cứu và Xuất báo cáo**: Cho phép lọc đa tiêu chí (Nguồn dữ liệu, Đối tác, Loại phí, Trạng thái, Khoảng thời gian) và xuất dữ liệu ra file Excel phục vụ đối soát. | BO-PFEE-01 | **P1** |

---

## 8. Business Rules (Quy tắc Nghiệp vụ)

| ID | Quy tắc Nghiệp vụ (Business Rule) | Lý do & Căn cứ Nghiệp vụ (Rationale) |
|---|---|---|
| **BR-PFEE-01** | **Nguyên tắc phân định Nguồn dữ liệu:**<br>- Nếu chọn Nguồn = `CTT`: Hệ thống cho phép chọn 4 loại phí (*Duy trì*, *XLGD*, *Thanh toán*, *Dịch vụ gia tăng*).<br>- Nếu chọn Nguồn = `QRGW`: Hệ thống ẩn hoàn toàn tab *Phí dịch vụ gia tăng*, chỉ cho phép chọn 3 loại phí (*Duy trì*, *XLGD*, *Thanh toán*). | Tránh phát sinh nhầm lẫn tham số thẻ/3DS/Token trên các đối tác sử dụng dịch vụ thanh toán mã QR. |
| **BR-PFEE-02A** | **Quy tắc Duy Nhất Biểu Phí Active Kênh QRGW (Single Active Fee per Service):**<br>- Với mỗi cặp `(Đối tác hưởng phí + Loại dịch vụ + Loại phí)` trên kênh QRGW (VD: VietinBank + Thu hộ + Phí XLGD), chỉ được phép tồn tại duy nhất **01 biểu phí ở trạng thái `ACTIVE`** trong cùng một khoảng thời gian áp dụng.<br>- Nếu tạo mới hoặc kích hoạt biểu phí có khoảng thời gian giao thoa (overlap) với biểu phí đang Active cùng Đối tác và Dịch vụ, hệ thống bắt buộc **chặn (Hard Stop)** và cảnh báo xung đột thời gian. | Đảm bảo hệ thống Core QRGW không bị tranh chấp biểu phí khi tính phí xử lý/thanh toán cho từng lệnh QR. |
| **BR-PFEE-02B** | **Quy tắc Không Trùng Lặp MCC Kênh CTT (Non-overlapping MCC per PTTT):**<br>- Đối với kênh CTT: Mỗi PTTT của mỗi đối tác được phép cấu hình 1 hoặc nhiều mã ngành MCC.<br>- **Ràng buộc:** Giữa 2 biểu phí cùng trạng thái `ACTIVE` của cùng một Đối tác và cùng một PTTT trong cùng khoảng thời gian hiệu lực, **tuyệt đối không được trùng lặp bất kỳ mã MCC nào** ($\text{MCC}_{\text{biểu phí 1}} \cap \text{MCC}_{\text{biểu phí 2}} = \emptyset$).<br>- **Cơ chế kiểm soát:** Hệ thống tự động quét đối chiếu tập hợp MCC khi Maker lưu/gửi duyệt hoặc khi Checker duyệt; nếu phát hiện trùng lặp mã MCC thì báo lỗi cụ thể danh sách mã MCC bị trùng và chặn duyệt. | Cho phép đối tác áp dụng nhiều mức phí khác nhau cho các nhóm ngành nghề khác nhau (VD: Hàng không phí khác Bán lẻ), nhưng ngăn chặn triệt để xung đột áp phí khi một giao dịch phát sinh thuộc mã MCC cụ thể. |
| **BR-PFEE-03** | **Nguyên tắc Phê duyệt 4 Mắt (Segregation of Duties):**<br>- Tài khoản khởi tạo hoặc cập nhật bản ghi (Maker) không được phép thực hiện Duyệt hoặc Từ chối bản ghi đó.<br>- Checker khi Từ chối bắt buộc phải nhập lý do từ chối (tối thiểu 10 ký tự). | Đáp ứng tiêu chuẩn kiểm soát nội bộ và bảo mật giao dịch tài chính. |
| **BR-PFEE-04** | **Nguyên tắc Tính phí Bậc thang (Tiered Progression):**<br>Khi cấu hình biểu phí bậc thang theo Tổng SLGD hoặc Tổng GTGD, giá trị bắt đầu của bậc liền sau bắt buộc phải lớn hơn giá trị kết thúc của bậc liền trước đúng 1 đơn vị (không được ngắt quãng hoặc chồng lấn khoảng giá trị). | Ngăn chặn lỗi hổng tính phí khi giao dịch rơi vào khoảng giá trị bị ngắt quãng hoặc tranh chấp mức phí giữa 2 bậc. |
| **BR-PFEE-05** | **Nguyên tắc Chặn Trần/Sàn (Min/Max Cap):**<br>Đối với phí thanh toán theo tỷ lệ %: Số tiền phí tính ra sau khi nhân với GTGD và cộng VAT nếu nhỏ hơn `Mức phí tối thiểu` thì lấy bằng mức tối thiểu; nếu lớn hơn `Mức phí tối đa` thì lấy bằng mức tối đa. Mức phí tối thiểu bắt buộc phải $\le$ Mức phí tối đa. | Tuân thủ điều khoản thỏa thuận trong hợp đồng thương mại với ngân hàng thanh toán. |
| **BR-PFEE-06** | **Nguyên tắc Bất biến Lịch sử (Non-retroactive):**<br>Việc kích hoạt hoặc chỉnh sửa một cấu hình phí mới không có hiệu lực hồi tố đối với các giao dịch đã phát sinh và đã tính phí trong quá khứ. Cấu hình mới chỉ áp dụng cho giao dịch phát sinh từ thời điểm cấu hình có trạng thái `ACTIVE`. | Bảo vệ tính toàn vẹn của số liệu đối soát kế toán các kỳ trước. |
| **BR-PFEE-07** | **Quy tắc Phân tách Loại Giao dịch trong Phí XLGD:**<br>- Nếu chọn `[ ] Áp dụng chung cho toàn bộ loại giao dịch`: Hệ thống chỉ hiển thị 01 khối nhập Mức phí (Cố định hoặc Bậc thang) áp dụng chung cho cả *Thanh toán* và *Hoàn trả*.<br>- Nếu chọn `[x] Cấu hình riêng cho từng loại giao dịch`: Hệ thống tự động phân tách làm 2 tab/khối cấu hình độc lập (`Thanh toán` và `Hoàn trả`), cho phép thiết lập hình thức thu phí và mức phí khác nhau giữa 2 luồng. | Đáp ứng các thỏa thuận ngân hàng (thông thường phí hoàn trả thấp hơn hoặc cố định, trong khi phí thanh toán tính theo bậc thang). |
| **BR-PFEE-08** | **Quy tắc Ghi nhận Phí XLGD theo Trạng thái Giao dịch:**<br>- Mặc định phí XLGD chỉ tính trên giao dịch có trạng thái `Thành công`.<br>- Trường hợp hợp đồng đối tác quy định tính phí kết nối bản tin kỹ thuật bất kể kết quả giao dịch, Maker được phép tích chọn thêm trạng thái `Thất bại` để hệ thống Core Billing tính phí xử lý. | Phục vụ chính xác các điều khoản hợp đồng của một số cổng thanh toán quốc tế (VD: CyberSource thu phí kiểm tra giao dịch ngay cả khi giao dịch bị từ chối thẻ). |
| **BR-PFEE-09** | **Quy tắc Phân định Thẻ Quốc tế (TQT):**<br>- Khi chọn PTTT = `Thẻ quốc tế`, hệ thống bắt buộc Maker xác định rõ: Thương hiệu thẻ (`Visa`, `MasterCard`, `JCB`...) và Loại thẻ phát hành (`Trong nước` vs `Nước ngoài`).<br>- Nếu chọn `[ ] Áp dụng chung cho toàn bộ thương hiệu thẻ`: Dùng chung 1 tỷ lệ % và Min/Max cho tất cả thương hiệu thẻ đã chọn.<br>- Nếu chọn `[x] Cấu hình phí riêng từng thương hiệu thẻ`: Hệ thống bắt buộc nhập biểu phí riêng cho từng thương hiệu được chọn. | Do các tổ chức thẻ quốc tế (Card Schemes) và ngân hàng thanh toán áp dụng mức phí Interchange Fee khác biệt rõ rệt giữa thẻ nội địa và thẻ phát hành ngoài nước. |
| **BR-PFEE-10** | **Quy tắc Ràng buộc Chặn Min / Max Phí Thanh toán:**<br>- Mức phí tối thiểu và Mức phí tối đa là trường tùy chọn, áp dụng trên từng giao dịch phát sinh.<br>- Nếu đồng thời nhập cả hai mức thì bắt buộc `Mức phí tối thiểu` $\le$ `Mức phí tối đa`.<br>- Tiền phí thanh toán cuối cùng $f$ được chặn trong đoạn $[\text{Min}, \text{Max}]$. | Đảm bảo tính toán chính xác điều khoản trần sàn trong hợp đồng thương mại với đối tác/ngân hàng. |
| **BR-PFEE-11** | **Quy tắc Phân định Phí XLGD Kênh QRGW theo Loại Dịch Vụ:**<br>- Kênh QRGW hoàn toàn không áp dụng phân loại theo Mã ngành MCC hay PTTT thẻ. Thay vào đó, bắt buộc Maker phân loại theo **Loại dịch vụ** (`Thu hộ` vs `Chi hộ`).<br>- Giao dịch *Thu hộ* (Inbound Payment): Tiền vào tài khoản merchant qua quét mã VietQR/Napas 247.<br>- Giao dịch *Chi hộ* (Outbound Transfer): Tiền chuyển chi trả từ tài khoản hệ thống tới người thụ hưởng.<br>- Cơ chế checkbox áp dụng chung / riêng loại giao dịch (*Thanh toán* vs *Hoàn trả*) hoạt động đồng nhất như kênh CTT. | Phù hợp với đặc thù vận hành của các cổng chuyển mạch thanh toán QR và ngân hàng kết nối tài khoản thanh toán. |
| **BR-PFEE-12** | **Quy tắc Cấu hình Phí Thanh toán Kênh QRGW:**<br>- Phí thanh toán kênh QRGW phân loại theo **Dịch vụ** (`Thu hộ` vs `Chi hộ`) thay cho thương hiệu thẻ hay PTTT.<br>- Dịch vụ *Thu hộ* thường thu phí theo tỷ lệ % GTGD kèm mức chặn trần/sàn Min/Max (VND/GD).<br>- Dịch vụ *Chi hộ* có thể áp dụng tỷ lệ % hoặc mức cố định VND/lệnh chuyển tiền chi hộ.<br>- Checkbox *Áp dụng cho toàn bộ giao dịch hoặc phí của từng loại giao dịch* cho phép tách biệt biểu phí chiều Thanh toán (thành công) và chiều Hoàn trả (QR Refund). | Đảm bảo tính toán đúng chi phí chi trả đối tác ngân hàng kết nối tài khoản định danh/chuyển mạch VietQR. |

---

## 9. Cost-Benefit Analysis (Phân tích Chi phí - Lợi ích Định tính)

### 9.1 Cost Drivers (Các yếu tố phát sinh chi phí)
- Chi phí phân tích thiết kế giao diện (UI/UX) và chuẩn hóa luồng nghiệp vụ trên EPAY Portal.
- Chi phí phát triển phân hệ Portal và nâng cấp API giao tiếp với Billing Engine Backend.
- Chi phí kiểm thử tích hợp (SIT) và kiểm thử chấp nhận người dùng (UAT) đối với các kịch bản tính phí phức tạp.

### 9.2 Expected Benefits (Lợi ích dự kiến mang lại)
- **Giảm rủi ro tài chính:** Loại trừ 100% rủi ro áp sai biểu phí đối tác, hạn chế thất thoát hàng trăm triệu đồng chi phí phạt hoặc khiếu nại đối soát mỗi năm.
- **Tiết kiệm nguồn lực:** Giảm hơn 80% khối lượng công việc thủ công của bộ phận Vận hành và Kỹ thuật trong việc cấu hình phí.
- **Tăng tính minh bạch & Tốc độ đưa dịch vụ ra thị trường (Time-to-Market):** Ký hợp đồng đối tác mới có thể đưa biểu phí vào vận hành ngay trong ngày thay vì chờ đợi vài ngày như trước đây.

### 9.3 Priority & Rough ROI
- **Độ ưu tiên dự án:** **P0 - Cấp thiết**.
- **Đánh giá sơ bộ:** Lợi ích mang lại vượt trội so với chi phí phát triển; thời gian hoàn vốn định tính đạt được ngay trong quý đầu tiên vận hành nhờ ngăn chặn các sai sót đối soát.

---

## 10. Business Risks & Mitigation (Rủi ro Nghiệp vụ & Giải pháp)

| ID | Rủi ro Nghiệp vụ (Business Risk) | Mức độ | Ảnh hưởng | Biện pháp Giảm thiểu Nghiệp vụ (Mitigation) | Vai trò Chịu trách nhiệm |
|---|---|:---:|:---:|---|---|
| **RISK-PFEE-01** | Checker duyệt nhầm biểu phí sai lệch so với hợp đồng gốc | Trung bình | Rất cao | - Bắt buộc hiển thị bảng so sánh đối chiếu Old vs New trực quan.<br>- Đính kèm số hợp đồng/văn bản phê duyệt khi Maker gửi YCPD. | Checker / Trưởng phòng Vận hành |
| **RISK-PFEE-02** | Xung đột thời gian áp dụng khiến Job Scheduler không kích hoạt được biểu phí | Thấp | Cao | - Hệ thống tự động kiểm tra trùng lặp (BR-PFEE-02) ngay từ bước Maker tạo bản ghi.<br>- Bắn thông báo cảnh báo qua Telegram/Email cho Maker nếu Job kích hoạt thất bại. | Quản trị Hệ thống / Vận hành |
| **RISK-PFEE-03** | Khác biệt cách làm tròn số thập phân giữa Portal và Billing Engine | Trung bình | Trung bình | - Quy định chuẩn quy tắc làm tròn số: Tiền phí làm tròn đến hàng đơn vị VND; tỷ lệ % hỗ trợ tối đa 4 chữ số thập phân. | IT BA & Đội Core Billing |

---

## 11. Open Questions (Các Câu hỏi Cần Làm Rõ Tiếp)

- [ ] **OQ-PFEE-01:** Đối với phí Duy trì dịch vụ của kênh QRGW, đối tác thu phí theo định kỳ tháng cố định hay thu trừ dần trên từng giao dịch phát sinh?
- [ ] **OQ-PFEE-02:** Khi một cấu hình hết thời gian áp dụng (đến ngày kết thúc hiệu lực), hệ thống tự động chuyển trạng thái về `INACTIVE` hay chuyển sang trạng thái riêng `EXPIRED` để tiện tra cứu thống kê?
- [ ] **OQ-PFEE-03:** Có cần thiết lập phân quyền phê duyệt theo hạn mức (Ví dụ: Biểu phí có mức phí tối đa > 50.000.000 VND hoặc tỷ lệ > 3% phải do cấp Giám đốc Khối duyệt) hay chỉ cần 1 cấp Trưởng phòng duyệt chung?

---
<sub>Tài liệu thuộc bộ AI4BA Master Flow — Chuẩn hóa nghiệp vụ EPAY Portal 2.0</sub>
