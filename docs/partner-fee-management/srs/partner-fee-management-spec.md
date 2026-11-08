---
type: srs
feature: partner-fee-management
status: draft
updated: 2026-10-31
links:
  - upstream: docs/partner-fee-management/brainstorms/partner-fee-management.md
  - flows: docs/partner-fee-management/srs/partner-fee-management-flows.md
  - states: docs/partner-fee-management/srs/partner-fee-management-states.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# Quản lý Cấu hình Phí Trả Đối tác — Software Requirements Specification (SRS)

## 1. Scope

Tính năng **Quản lý cấu hình phí trả đối tác** (`partner-fee-management`) trên hệ thống **EPAY Portal 2.0** là phân hệ quản trị tập trung toàn bộ các biểu phí mà EPAY phải chi trả cho các Ngân hàng thụ hưởng và Nhà cung cấp kênh thanh toán đối tác (Vietcombank, MBBank, KBank, BIDV, Napas, CyberSource...) khi xử lý giao dịch qua Cổng thanh toán (CTT), QR Gateway (QRGW) và các dịch vụ giá trị gia tăng liên kết.

### 1.1. Trong phạm vi (In-Scope)
- **Quản lý danh sách cấu hình phí**: 3 tab trạng thái (*Tất cả*, *Đang hoạt động*, *Chờ phê duyệt*), phân trang, thanh tìm kiếm nhanh và tùy chỉnh cột.
- **Bộ lọc tra cứu nâng cao 8 tiêu chí**: Hỗ trợ lọc theo đối tác, loại phí, PTTT, cổng TGTT, kỳ trả phí, đồng tiền, nguồn dữ liệu và khoảng thời gian áp dụng (*Từ ngày - Đến ngày* tích hợp DatePicker & TimePicker).
- **Thêm mới cấu hình phí đầy đủ 4 nhóm nghiệp vụ (8 biến thể màn hình)**:
  1. *Phí duy trì sử dụng dịch vụ*: Biến thể Áp dụng toàn bộ MID và Biến thể Không áp dụng (Áp dụng riêng từng MID đối tác cung cấp).
  2. *Phí xử lý giao dịch*: Biến thể Áp dụng chung và Biến thể Không áp dụng (Tách riêng từng loại giao dịch: Thanh toán, Hoàn trả), tích hợp bộ chọn đa mã ngành MCC (Transfer Dual-Listbox).
  3. *Phí thanh toán*: Biến thể 1 bậc phí và Biến thể Bậc thang nhiều mức phí theo thương hiệu thẻ (Visa, MasterCard, JCB) và Cổng TGTT.
  4. *Phí quản lý dịch vụ gia tăng (DVGT)*: Biến thể Áp dụng chung và Biến thể Không áp dụng (Tách riêng 3 dịch vụ: Quản lý token, Quản lý rủi ro, FastPay bypass OTP/off 3DS).
  5. *Biến thể Giao dịch hoàn trả*: Cấu hình phí hoàn trả cho Thẻ quốc tế và Thẻ nội địa.
- **Công cụ Mô phỏng Tính thử phí 🧮 (Fee Calculation Simulator Popup)**: Hỗ trợ tính toán kiểm thử trước khi gửi duyệt cho cả 01 bậc phí và biểu phí bậc thang theo Tổng SLGD / Tổng GTGD, tự động tính thuế VAT và chặn trần/sàn (Min/Max).
- **Vòng đời cấu hình & Cơ chế kiểm soát 4 mắt (Maker – Checker)**:
  - 7 trạng thái bản ghi: `DRAFT`, `NEW`, `PENDING`, `READY`, `ACTIVE`, `INACTIVE`, `DELETED`.
  - Luồng Maker gửi duyệt; Checker thẩm định so sánh CŨ - MỚI, phê duyệt hoặc từ chối kèm lý do.
  - Job lập lịch tự động kích hoạt (Auto-Golive) khi chạm mốc thời gian hiệu lực.
- **Xem chi tiết & Thanh tác vụ nổi (Floating Action Toolbar)**: Xem đầy đủ tham số, chuyển đổi nhanh giữa các tác vụ (Sửa, Xem lịch sử, Gửi duyệt, Tạm dừng, Kích hoạt lại).
- **Lưu vết kiểm toán (Audit Trail Timeline View)**: Theo dõi toàn bộ lịch sử biến động dữ liệu và trạng thái cấu hình phục vụ đối soát, thanh tra và kiểm toán độc lập.

### 1.2. Ngoài phạm vi (Out-of-Scope)
- Động cơ tính cước và cấn trừ thanh toán thực tế định kỳ hàng tháng (thuộc Billing & Settlement Engine backend).
- Quản lý biểu phí thu từ Khách hàng / ĐVCNTT (thuộc module Phí thu ĐVCNTT và Phí thu Khách hàng riêng biệt).
- Ký duyệt điện tử CA/OTP ngoài hệ thống Portal nội bộ.

---

## 2. Actors & Stakeholders

| Actor | Loại | Mục tiêu nghiệp vụ | Trong scope? |
|---|---|---|---|
| **Maker (Chuyên viên Vận hành / Tính cước EPAY)** | Người dùng nội bộ | Tra cứu, thiết lập mới, cập nhật cấu hình phí, mô phỏng tính thử phí và gửi yêu cầu phê duyệt cho Checker | Có |
| **Checker (Trưởng phòng / Cán bộ Phê duyệt EPAY)** | Người dùng nội bộ | Thẩm định tính chính xác của biểu phí so với hợp đồng (đối chiếu Cũ - Mới), phê duyệt hoặc từ chối cấu hình phí kèm lý do | Có |
| **Billing & Settlement Engine** | Hệ thống nội bộ | Đọc cấu hình phí ở trạng thái `ACTIVE` hợp lệ tại thời điểm giao dịch phát sinh để tính chính xác chi phí phải trả đối tác | Có (Tích hợp) |
| **Scheduler Job (Hệ thống Lập lịch)** | Hệ thống ngầm | Quét tự động định kỳ các cấu hình `READY` khi chạm mốc `Thời gian áp dụng phí` để chuyển sang `ACTIVE` (Auto Golive) | Có (Tự động) |
| **Kiểm toán viên / Đối soát viên** | Người dùng nội bộ | Tra cứu lịch sử thay đổi (Audit Trail) để đối soát số liệu và giải trình kiểm toán | Có |

---

## 3. Functional Requirements (FR)

| ID | Title | Description | Priority | Verify by | Source |
|---|---|---|---|---|---|
| **FR-partner-fee-management-001** | Danh sách cấu hình phí trả đối tác | Hệ thống phải hiển thị danh sách cấu hình phí dạng bảng gồm 10 cột chuẩn: STT, Mã cấu hình, Tên cấu hình, Loại phí, Đối tác, Kỳ trả phí, Ngày áp dụng, Trạng thái cấu hình (badge màu trực quan), Thao tác (menu 3 chấm). Hỗ trợ 3 tabs trạng thái: *Tất cả*, *Đang hoạt động*, *Chờ phê duyệt*. Phân trang mặc định 10 bản ghi/trang. | P0 | Test | Brainstorm Mục 4 |
| **FR-partner-fee-management-002** | Bộ lọc tra cứu nâng cao | Hệ thống phải cung cấp thanh bộ lọc gồm 8 tiêu chí: Nguồn dữ liệu, Đối tác/Ngân hàng hưởng phí, Cổng TGTT, Loại phí, Phương thức thanh toán, Kỳ trả phí, Khoảng thời gian áp dụng phí (Trường đơn tích hợp Từ ngày - Đến ngày kèm icon chọn lịch và giờ), Đồng tiền (VND). Cụm nút *[Xóa bộ lọc]* và *[🔍 Tìm kiếm]* nằm riêng biệt ở hàng 4 căn phải. | P0 | Test | Brainstorm Mục 4 |
| **FR-partner-fee-management-003** | Thêm mới Phí duy trì dịch vụ | Hệ thống phải hỗ trợ Maker tạo mới cấu hình Phí duy trì sử dụng dịch vụ với 2 biến thể:<br>1. *Áp dụng toàn bộ MID*: Thu phí cố định chung cho toàn bộ MID đối tác cung cấp.<br>2. *Không áp dụng (Áp dụng riêng từng MID)*: Cho phép chọn danh sách MID (`MID 1, MID 2, MID 3`) và thiết lập mức phí riêng cho từng MID. | P0 | Test / Demo | Brainstorm Mục 4, Figma Frame 4022:53508 & 4022:54185 |
| **FR-partner-fee-management-004** | Thêm mới Phí xử lý giao dịch | Hệ thống phải hỗ trợ Maker chọn danh mục mã ngành MCC qua Dual-Listbox và thiết lập mức phí xử lý giao dịch theo 2 biến thể:<br>1. *Áp dụng chung*: Thu 1 mức phí cố định chung cho tất cả các loại giao dịch.<br>2. *Không áp dụng (Áp dụng riêng từng loại GD)*: Tách riêng cấu hình phí cho `Loại giao dịch: Thanh toán` và `Loại giao dịch: Hoàn trả` (hỗ trợ 1 bậc phí hoặc bậc thang). | P0 | Test / Demo | Brainstorm Mục 4, Figma Frame 4022:54899 & 4022:55659 |
| **FR-partner-fee-management-005** | Thêm mới Phí thanh toán | Hệ thống phải hỗ trợ Maker thiết lập biểu phí thanh toán theo Cổng TGTT, Loại NHPH, PTTT theo 2 biến thể:<br>1. *Áp dụng chung*: Cấu hình 1 mức phí chung cho toàn bộ thương hiệu thẻ.<br>2. *Không áp dụng*: Cho phép chọn danh sách thương hiệu thẻ (`Visa, Master, JCB`) và cấu hình biểu phí riêng cho từng thương hiệu (hỗ trợ 1 bậc phí hoặc Bậc thang theo Tổng GTGD/Tổng SLGD, tỷ lệ %, mức phí tối thiểu, mức phí tối đa). Tích hợp nút *[Tính thử 🧮]*. | P0 | Test / Demo | Brainstorm Mục 4, Figma Frame 4022:56456 & 4022:57209 |
| **FR-partner-fee-management-006** | Thêm mới Phí quản lý DVGT | Hệ thống phải hỗ trợ Maker cấu hình biểu phí dịch vụ giá trị gia tăng theo 2 biến thể:<br>1. *Áp dụng chung*: Thiết lập 1 mức phí chung cho toàn bộ dịch vụ gia tăng.<br>2. *Không áp dụng (Tách riêng từng DV)*: Tách riêng cấu hình cho 3 dịch vụ chuyên biệt: *Quản lý token* (thu bậc thang theo số lượng token tạo mới), *Quản lý rủi ro* (thu cố định), và *FastPay (bypass OTP/off 3DS)* (thu cố định). | P0 | Test / Demo | Brainstorm Mục 4, Figma Frame 4024:58948 & 4022:58264 |
| **FR-partner-fee-management-007** | Thêm mới Biến thể Hoàn trả | Hệ thống phải cung cấp màn hình cấu hình phí chuyên biệt cho giao dịch hoàn trả đối với Thẻ quốc tế và Thẻ nội địa theo từng Cổng trung gian thanh toán (NAPAS, BIDV, MB...). | P0 | Test / Demo | Figma Frame 4018:34716 & 4018:35488 |
| **FR-partner-fee-management-008** | Công cụ Tính thử phí 🧮 (Simulator Popup) | Khi Maker bấm nút *[Tính thử 🧮]* trên màn hình Phí thanh toán, hệ thống phải hiển thị Modal Popup cho phép nhập Giá trị giao dịch và SLGD giả định, tự động tính toán ra số tiền phí thực tế phải trả theo công thức biểu phí, hiển thị minh bạch công thức và chặn trần/sàn Min/Max. Hỗ trợ cả biểu phí 1 mức và biểu phí bậc thang. | P0 | Test / Demo | Brainstorm Mục 4, Figma Frame 4018:36498 & 4018:36606 |
| **FR-partner-fee-management-009** | Chỉnh sửa / Cập nhật cấu hình phí | Hệ thống phải cho phép Maker chỉnh sửa cấu hình phí ở các trạng thái cho phép (`NEW`, `READY`, `ACTIVE`, `INACTIVE`). Bản ghi `ACTIVE` sau khi chỉnh sửa sẽ chuyển sang trạng thái `PENDING` để chờ Checker phê duyệt thẩm định Cũ - Mới. | P0 | Test | Brainstorm Mục 4, Figma Frame 4020:36844 - 4020:43097 |
| **FR-partner-fee-management-010** | Xem chi tiết & Floating Action Toolbar | Hệ thống phải cung cấp màn hình Xem chi tiết toàn diện thông tin cấu hình phí cùng thanh tác vụ nổi (Floating Action Toolbar) bên phải màn hình chứa các nút chức năng động theo trạng thái bản ghi: *Chỉnh sửa*, *Lịch sử thay đổi*, *Gửi phê duyệt*, *Tạm dừng*, *Kích hoạt lại*, *Phê duyệt*, *Từ chối*. | P1 | Test | Brainstorm Mục 4, Figma Frame 4020:43846 - 4020:46336 |
| **FR-partner-fee-management-011** | Lịch sử thay đổi (Audit Trail Timeline View) | Hệ thống phải lưu trữ và hiển thị toàn bộ lịch sử thay đổi của cấu hình phí dưới dạng dòng thời gian (Timeline View), cho biết ai đã sửa, vào thời điểm nào, giá trị cũ là gì, giá trị mới là gì và thay đổi trạng thái như thế nào. Có bộ lọc theo trường thông tin và người cập nhật. | P1 | Test | Brainstorm Mục 4, Figma Frame 4020:47172 |
| **FR-partner-fee-management-012** | Quy trình Phê duyệt Maker - Checker | Hệ thống phải cung cấp giao diện thẩm định cho Checker so sánh song song giữa dữ liệu CŨ và dữ liệu MỚI (highlight các trường có sự thay đổi). Checker có quyền [Phê duyệt] (kích hoạt cấu hình) hoặc [Từ chối] (bắt buộc nhập lý do từ chối tối thiểu 10 ký tự để trả về Maker xử lý). | P0 | Test | Brainstorm Mục 4, Figma Frame 4020:47923 & 4020:48856 |
| **FR-partner-fee-management-013** | Vòng đời trạng thái & Auto Golive Scheduler | Hệ thống phải quản lý bản ghi theo đúng 7 trạng thái chuẩn (`DRAFT`, `NEW`, `PENDING`, `READY`, `ACTIVE`, `INACTIVE`, `DELETED`). Scheduler Job chạy tự động quét các cấu hình `READY` có `Thời gian áp dụng phí <= Hiện tại` để chuyển sang `ACTIVE` và cập nhật cấu hình cũ tương ứng sang `INACTIVE`. | P0 | Test / Phân tích | States doc, Brainstorm Mục 4 |

---

## 4. Non-Functional Requirements (NFR)

| ID | Phân loại | Yêu cầu phi chức năng (NFR) | Mức độ | Tiêu chí chấp nhận (Acceptance Criteria) |
|---|---|---|---|---|
| **NFR-partner-fee-management-001** | Performance (Hiệu năng) | Tốc độ phản hồi giao diện tra cứu danh sách và thực hiện bộ lọc phải đạt dưới 1.5 giây với cơ sở dữ liệu lên đến 100.000 bản ghi cấu hình. Tốc độ tính toán mô phỏng trong Popup Tính thử phí phải dưới 500ms. | P0 | Kiểm thử tải (Load test) 100 CCU; 95% request trả lời < 1.5s; Popup simulator < 500ms. |
| **NFR-partner-fee-management-002** | Security & RBAC (Phân quyền) | Phân định tuyệt đối quyền hạn giữa vai trò Maker và Checker theo nguyên tắc kiểm soát 4 mắt (Four-Eyes Principle). Maker không bao giờ được tự phê duyệt bản ghi do chính mình tạo ra hoặc gửi duyệt. | P0 | Kiểm thử phân quyền: Tài khoản Maker khi đăng nhập không hiển thị nút [Phê duyệt]/[Từ chối]; chặn trực tiếp ở API Backend với HTTP 403 Forbidden. |
| **NFR-partner-fee-management-003** | Data Integrity (Toàn vẹn & Chính xác) | Tính toán tài chính phải chính xác tuyệt đối. Các tỷ lệ phần trăm hỗ trợ đến 4 chữ số thập phân (vd: `0.7525%`), số tiền làm tròn đến hàng đơn vị VNĐ theo nguyên tắc kế toán ngân hàng chuẩn (Half-up). | P0 | Bộ test case tính toán tài chính khớp 100% kết quả đối chiếu với bảng tính Excel kế toán độc lập. |
| **NFR-partner-fee-management-004** | Auditability (Lưu vết kiểm toán) | 100% các thao tác Thêm mới, Chỉnh sửa, Gửi duyệt, Phê duyệt, Từ chối, Tạm dừng, Kích hoạt lại đều phải được ghi log Audit Trail bất biến (Immutable), bao gồm User ID, IP, Timestamp, Old Value, New Value. | P0 | Không có bất kỳ giao dịch cập nhật dữ liệu nào vượt qua hệ thống mà không sinh bản ghi trong bảng `audit_logs`. |
| **NFR-partner-fee-management-005** | Reliability (Độ tin cậy & Sẵn sàng) | Scheduler Job tự động kích hoạt cấu hình phí (Auto-Golive) phải chạy với tần suất quét 1 phút/lần, đảm bảo đúng thời điểm chuyển giao ngày hiệu lực (00:00:00) với độ sẵn sàng đạt 99.99%. | P0 | Kiểm thử kích hoạt tự động đúng mốc thời gian thỏa thuận, không bị trễ quá 60 giây và có cơ chế retry tự động khi lỗi mạng. |

---

## 5. Business Rules (BR)

### 5.1. Danh mục Quy tắc Nghiệp vụ Tổng quát

| ID | Quy tắc nghiệp vụ (Business Rule) | Điều kiện kích hoạt (Trigger) | Implements FR | Nguồn tham chiếu |
|---|---|---|---|---|
| **BR-partner-fee-management-001** | **Nguyên tắc kiểm soát 4 mắt (Four-Eyes Principle)**: Một cấu hình phí chỉ được chuyển sang trạng thái `ACTIVE` hoặc `READY` khi có sự phê duyệt của một tài khoản Checker độc lập. Maker tạo/sửa bản ghi không được phép phê duyệt bản ghi đó. | Khi Checker thực hiện duyệt YCPD | FR-partner-fee-management-012 | Chính sách KSVN & QLRR EPAY |
| **BR-partner-fee-management-002** | **Quy tắc Loại trừ tương hỗ giữa Áp dụng chung và Không áp dụng (Mutual Exclusivity)**: Tại mỗi nhóm biểu phí, Maker chỉ được chọn 1 trong 2 chế độ: hoặc *Áp dụng phí chung*, hoặc *Không áp dụng* (cấu hình chi tiết riêng). Khi chọn một phương án, giao diện và dữ liệu của phương án còn lại tự động vô hiệu hóa. | Khi Maker click chọn Radio button tại khối Thông tin phí | FR-partner-fee-management-003, 004, 005, 006 | Thiết kế UI/UX Design System |
| **BR-partner-fee-management-003** | **Ràng buộc Mức phí Tối thiểu và Tối đa**: Tại các biểu phí thu theo tỷ lệ %, nếu có thiết lập Mức phí tối thiểu và Mức phí tối đa thì giá trị phải thỏa mãn: $$0 \le \text{Mức phí tối thiểu} \le \text{Mức phí tối đa}$$. Không được để Mức phí tối thiểu lớn hơn Mức phí tối đa. | Khi nhập dữ liệu hoặc bấm nút [Tạo mới +] / [Lưu cập nhật] | FR-partner-fee-management-005, 008 | Quy chuẩn tính cước ngân hàng |
| **BR-partner-fee-management-004** | **Công thức tính thử phí và xử lý trần/sàn**: Số tiền phí thực tế phải trả ($f$) cho một giao dịch có giá trị $V$ được tính theo công thức:<br>$$f_{\text{raw}} = \min\left(\max(V \times \text{Mức phí tỷ lệ}, \text{Mức phí tối thiểu}), \text{Mức phí tối đa}\right)$$<br>$$f = \text{round}\left(f_{\text{raw}} \times (1 + \text{Thuế VAT})\right)$$ | Khi bấm nút [Tính thử] trong Popup Simulator | FR-partner-fee-management-008 | Quy tắc đối soát đối tác EPAY |
| **BR-partner-fee-management-005** | **Quy tắc Auto Golive của Scheduler Job**: Scheduler Job quét định kỳ. Khi phát hiện cấu hình có trạng thái `READY` và `Thời gian áp dụng phí` $\le$ `Thời điểm hiện tại`, hệ thống tự động: (1) Chuyển cấu hình `READY` thành `ACTIVE`; (2) Tìm cấu hình cùng đối tác/PTTT/MCC đang `ACTIVE` trước đó để chuyển sang `INACTIVE`. | Khi Job Scheduler quét thời gian định kỳ (1 phút/lần) | FR-partner-fee-management-013 | Quy trình vận hành hệ thống |
| **BR-partner-fee-management-006** | **Quy tắc Cập nhật bản ghi đang Active**: Khi Maker cập nhật một cấu hình đang ở trạng thái `ACTIVE`, bản ghi hiện tại vẫn duy trì trạng thái `ACTIVE` phục vụ tính cước cho đến khi bản ghi chỉnh sửa được Checker phê duyệt chính thức. | Khi Maker bấm [Lưu cập nhật] từ màn hình Chỉnh sửa | FR-partner-fee-management-009, 012 | BRD Mục 4 & States doc |
| **BR-partner-fee-management-007** | **Quy tắc Bảo toàn dữ liệu lịch sử (Cấm xóa bản ghi có hiệu lực)**: Chỉ cho phép xóa vĩnh viễn (`DELETED`) các bản ghi ở trạng thái `DRAFT` hoặc `NEW`. Các bản ghi ở trạng thái `PENDING`, `READY`, `ACTIVE`, `INACTIVE` tuyệt đối không được xóa khỏi CSDL để phục vụ kiểm toán và đối soát. | Khi Maker bấm thao tác Xóa bản ghi | FR-partner-fee-management-001, 010 | Chính sách Kiểm toán tài chính |

---

### 5.2. 2.6.5 Yêu cầu nghiệp vụ chung — Ma trận Vòng đời Bản ghi Cấu hình Phí Trả Đối tác

#### 5.2.1. Bảng mapping loại Yêu cầu Phê duyệt (YCPD) sinh ra theo trạng thái:

| Trạng thái hiện tại | Ý nghĩa | Hành động thao tác | Loại yêu cầu phê duyệt được tạo ra |
|---|---|---|---|
| **New** | Maker muốn gửi yêu cầu gửi phê duyệt CHP | Gửi yêu cầu phê duyệt | **Duyệt mở tạo hồ sơ CHP Trả đối tác** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt cập nhật CHP | Gửi phê duyệt cập nhật thông tin | **Duyệt cập nhật hồ sơ CHP Trả đối tác** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt tạm dừng CHP | Gửi yêu cầu tạm dừng | **Duyệt tạm dừng hồ sơ CHP Trả đối tác** |
| **Inactive** | Maker muốn gửi yêu cầu gửi phê duyệt mở kích hoạt CHP | Gửi yêu cầu mở kích hoạt | **Duyệt mở kích hoạt CHP Trả đối tác** |

#### 5.2.2. Ma trận Quy tắc Nghiệp vụ Chi tiết (11 Cột chuẩn SRS/BA):

| STT | Trạng thái hiện tại của CHP | Chức năng thực hiện | Hành động thực hiện | Đối tượng thực hiện | Trạng thái YCPD | Tiến trình phê duyệt | Trạng thái YC sau khi phê duyệt | Hệ thống xử lý | Trạng thái CHP sau khi thực hiện | Quy tắc lưu thông tin yêu cầu phê duyệt | Ghi nhận lịch sử log hành động |
|:---:|---|---|---|:---:|:---:|:---:|:---:|---|:---:|---|---|
| **1** | **Chưa có bản ghi** | Quản lý CHP Trả đối tác | Lưu nháp bản ghi | Maker | N/A | N/A | N/A | Hệ thống lưu bản ghi với trạng thái Draft | `DRAFT` | N/A | `[Username] đã lưu nháp CHP Trả đối tác mới ngày [Datetime]` |
| **2** | **Chưa có bản ghi** | Quản lý CHP Trả đối tác | Lưu mới bản ghi | Maker / Hệ thống Onboard MC | N/A | N/A | N/A | Hệ thống lưu bản ghi với trạng thái New | `NEW` | N/A | `[Username] đã tạo CHP Trả đối tác mới ngày [Datetime]` |
| **3** | **DRAFT** | Quản lý CHP Trả đối tác | Chỉnh sửa thông tin | Maker | N/A | N/A | N/A | Cập nhật thông tin và giữ nguyên trạng thái Draft | `DRAFT` | N/A | `[Username] đã cập nhật bản nháp CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **4** | **DRAFT** | Quản lý CHP Trả đối tác | Lưu mới | Maker | N/A | N/A | N/A | Bản ghi CHP chuyển trạng thái New | `NEW` | N/A | `[Username] đã hoàn thiện và tạo mới CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **5** | **DRAFT** | Quản lý CHP Trả đối tác | Xoá bản nháp | Maker | N/A | N/A | N/A | Bản ghi CHP chuyển trạng thái DELETED | `DELETED` | N/A | `[Username] đã xoá bản nháp CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **6** | **NEW** | Quản lý CHP Trả đối tác | Chỉnh sửa thông tin | Maker | N/A | N/A | N/A | Cập nhật thông tin và giữ nguyên trạng thái New | `NEW` | N/A | `[Username] đã cập nhật thông tin CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **7** | **NEW** | Quản lý CHP Trả đối tác | Gửi yêu cầu phê duyệt | Maker | Pending | Chờ Checker phê duyệt (1 cấp) | Pending | - Bản ghi được chuyển sang trạng thái Pending<br>- Insert 1 bản ghi YCPD "Duyệt mở tạo hồ sơ CHP Trả đối tác" với trạng thái "Pending" | `PENDING` | Sinh mã YCPD `AR_MM_MC_[Timestamp]`, loại yêu cầu "Duyệt mở tạo hồ sơ CHP Trả đối tác", lưu Maker, phòng ban, danh sách Checker. | `[Username] đã gửi Yêu cầu phê duyệt [Mã YC] cho CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **8** | **NEW** | Quản lý CHP Trả đối tác | Xoá bản ghi | Maker | N/A | N/A | N/A | Bản ghi CHP chuyển trạng thái DELETED | `DELETED` | N/A | `[Username] đã xoá bản ghi CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **9** | **PENDING** | Quản lý CHP Trả đối tác | Rút yêu cầu phê duyệt | Maker | Pending | Hủy yêu cầu phê duyệt | Cancelled | - Bản ghi được chuyển về trạng thái New<br>- Cập nhật trạng thái YCPD thành "Cancelled" | `NEW` | Cập nhật trạng thái YCPD thành Cancelled, lưu thời gian rút yêu cầu. | `[Username] đã rút Yêu cầu phê duyệt [Mã YC] của CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **10** | **PENDING** | Quản lý CHP Trả đối tác | Thay đổi người phê duyệt | Maker / Quản lý Maker | Pending | Chuyển Checker phê duyệt | Pending | Cập nhật người phê duyệt mới trong bản ghi YCPD | `PENDING` | Cập nhật trường Người phê duyệt trong hồ sơ YCPD, lưu lịch sử điều chuyển. | `[Username] đã thay đổi người phê duyệt sang [Tên Checker mới] cho YCPD [Mã YC] ngày [Datetime]` |
| **11** | **PENDING** | Quản lý CHP Trả đối tác | Phê duyệt (Ngày áp dụng $\le$ Hiện tại) | Checker | Pending | Phê duyệt hiệu lực ngay | Approval | - Bản ghi được chuyển sang trạng thái Active<br>- Cập nhật trạng thái YCPD thành "Approval" | `ACTIVE` | Cập nhật trạng thái YCPD thành Approval, lưu Người duyệt, Thời gian duyệt, đóng hồ sơ YCPD. | `[Username] đã phê duyệt CHP Trả đối tác [Mã CHP], trạng thái chuyển sang ACTIVE ngày [Datetime]` |
| **12** | **PENDING** | Quản lý CHP Trả đối tác | Phê duyệt (Ngày áp dụng $>$ Hiện tại) | Checker | Pending | Phê duyệt chờ ngày hiệu lực | Approval | - Bản ghi được chuyển sang trạng thái Ready<br>- Cập nhật trạng thái YCPD thành "Approval" | `READY` | Cập nhật trạng thái YCPD thành Approval, lưu Người duyệt, Thời gian duyệt, đóng hồ sơ YCPD. | `[Username] đã phê duyệt CHP Trả đối tác [Mã CHP], trạng thái chuyển sang READY ngày [Datetime]` |
| **13** | **PENDING** | Quản lý CHP Trả đối tác | Từ chối phê duyệt | Checker | Pending | Từ chối hồ sơ | Rejected | - Bản ghi chuyển về trạng thái New (hoặc Rejected)<br>- Cập nhật trạng thái YCPD thành "Rejected" và lưu lý do từ chối | `NEW` / `REJECTED` | Cập nhật trạng thái YCPD thành Rejected, lưu Người từ chối, Thời gian và Lý do từ chối. | `[Username] đã từ chối phê duyệt YCPD [Mã YC] của CHP Trả đối tác [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **14** | **READY** | Quản lý CHP Trả đối tác | Tự động kích hoạt (Đến ngày áp dụng) | Hệ thống (Scheduler) | Approval | Tự động kích hoạt | Approval | Bản ghi được chuyển sang trạng thái Active khi đến ngày áp dụng phí | `ACTIVE` | Kế thừa hồ sơ YCPD đã duyệt, lưu vết kích hoạt tự động bởi System. | `Hệ thống tự động kích hoạt CHP Trả đối tác [Mã CHP] sang ACTIVE ngày [Datetime]` |
| **15** | **READY** | Quản lý CHP Trả đối tác | Chỉnh sửa cấu hình | Maker | Approval | Hủy chờ hiệu lực để chỉnh sửa | N/A | Bản ghi CHP chuyển trạng thái New | `NEW` | Đóng hồ sơ phê duyệt cũ, tạo phiên bản chỉnh sửa mới. | `[Username] đã chỉnh sửa CHP Trả đối tác [Mã CHP], trạng thái chuyển về NEW ngày [Datetime]` |
| **16** | **ACTIVE** | Quản lý CHP Trả đối tác | Gửi phê duyệt cập nhật thông tin | Maker | Pending | Chờ Checker duyệt cập nhật | Pending | - Tạo bản ghi sửa đổi với trạng thái Pending (bản ghi Active gốc vẫn duy trì hoạt động tính phí)<br>- Insert 1 bản ghi YCPD "Duyệt cập nhật hồ sơ CHP Trả đối tác" với trạng thái "Pending" | Bản ghi gốc: `ACTIVE`<br>Bản ghi sửa đổi: `PENDING` | Sinh mã YCPD `AR_MM_MC_[Timestamp]`, loại yêu cầu "Duyệt cập nhật hồ sơ CHP Trả đối tác", lưu snapshot so sánh thông tin cũ - mới. | `[Username] đã gửi Yêu cầu phê duyệt cập nhật [Mã YC] cho CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **17** | **ACTIVE** | Quản lý CHP Trả đối tác | Phê duyệt cập nhật thông tin | Checker | Pending | Phê duyệt cập nhật | Approval | - Bản ghi được cập nhật thông tin mới và chuyển trạng thái Active<br>- Cập nhật trạng thái YCPD thành "Approval" | `ACTIVE` | Cập nhật trạng thái YCPD thành Approval, lưu Người duyệt, Thời gian duyệt. | `[Username] đã phê duyệt cập nhật CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **18** | **ACTIVE** | Quản lý CHP Trả đối tác | Từ chối cập nhật thông tin | Checker | Pending | Từ chối cập nhật | Rejected | - Huỷ bản ghi sửa đổi, bản ghi gốc giữ nguyên trạng thái Active<br>- Cập nhật trạng thái YCPD thành "Rejected" và lưu lý do từ chối | `ACTIVE` | Cập nhật trạng thái YCPD thành Rejected, lưu Người từ chối, Thời gian và Lý do từ chối. | `[Username] đã từ chối YCPD cập nhật [Mã YC] của CHP Trả đối tác [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **19** | **ACTIVE** | Quản lý CHP Trả đối tác | Gửi yêu cầu tạm dừng | Maker | Pending | Chờ Checker duyệt tạm dừng | Pending | - Bản ghi giữ nguyên trạng thái Active<br>- Insert 1 bản ghi YCPD "Duyệt tạm dừng hồ sơ CHP Trả đối tác" với trạng thái "Pending" | `ACTIVE` (Chờ tạm dừng) | Sinh mã YCPD `AR_MM_MC_[Timestamp]`, loại yêu cầu "Duyệt tạm dừng hồ sơ CHP Trả đối tác", lưu Maker đề xuất và lý do tạm dừng. | `[Username] đã gửi Yêu cầu tạm dừng [Mã YC] cho CHP Trả đối tác [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **20** | **ACTIVE** | Quản lý CHP Trả đối tác | Phê duyệt tạm dừng | Checker | Pending | Phê duyệt tạm dừng | Approval | - Bản ghi được chuyển sang trạng thái Inactive<br>- Cập nhật trạng thái YCPD thành "Approval" | `INACTIVE` | Cập nhật trạng thái YCPD thành Approval, lưu Người duyệt, Thời gian duyệt. | `[Username] đã phê duyệt Tạm dừng CHP Trả đối tác [Mã CHP], trạng thái chuyển sang INACTIVE ngày [Datetime]` |
| **21** | **ACTIVE** | Quản lý CHP Trả đối tác | Từ chối tạm dừng | Checker | Pending | Từ chối tạm dừng | Rejected | - Bản ghi giữ nguyên trạng thái Active<br>- Cập nhật trạng thái YCPD thành "Rejected" và lưu lý do từ chối | `ACTIVE` | Cập nhật trạng thái YCPD thành Rejected, lưu Người từ chối, Thời gian và Lý do từ chối. | `[Username] đã từ chối yêu cầu tạm dừng CHP Trả đối tác [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **22** | **ACTIVE** | Quản lý CHP Trả đối tác | Sao chép cấu hình | Maker | N/A | N/A | N/A | Hệ thống lưu bản ghi mới với trạng thái Draft/New; bản ghi gốc giữ nguyên trạng thái Active | Bản ghi mới: `NEW`<br>Bản ghi gốc: `ACTIVE` | N/A | `[Username] đã sao chép cấu hình từ [Mã CHP gốc] sang cấu hình mới ngày [Datetime]` |
| **23** | **INACTIVE** | Quản lý CHP Trả đối tác | Gửi yêu cầu mở kích hoạt | Maker | Pending | Chờ Checker duyệt mở kích hoạt | Pending | - Bản ghi giữ nguyên trạng thái Inactive<br>- Insert 1 bản ghi YCPD "Duyệt mở kích hoạt CHP Trả đối tác" với trạng thái "Pending" | `INACTIVE` (Chờ mở kích hoạt) | Sinh mã YCPD `AR_MM_MC_[Timestamp]`, loại yêu cầu "Duyệt mở kích hoạt CHP Trả đối tác", lưu Maker đề xuất và lý do kích hoạt lại. | `[Username] đã gửi Yêu cầu mở kích hoạt [Mã YC] cho CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **24** | **INACTIVE** | Quản lý CHP Trả đối tác | Phê duyệt mở kích hoạt ($\le$ Hiện tại) | Checker | Pending | Phê duyệt kích hoạt ngay | Approval | - Bản ghi được chuyển sang trạng thái Active<br>- Cập nhật trạng thái YCPD thành "Approval" | `ACTIVE` | Cập nhật trạng thái YCPD thành Approval, lưu Người duyệt, Thời gian duyệt. | `[Username] đã phê duyệt mở kích hoạt CHP Trả đối tác [Mã CHP], trạng thái chuyển sang ACTIVE ngày [Datetime]` |
| **25** | **INACTIVE** | Quản lý CHP Trả đối tác | Phê duyệt mở kích hoạt ($>$ Hiện tại) | Checker | Pending | Phê duyệt chờ ngày hiệu lực | Approval | - Bản ghi được chuyển sang trạng thái Ready<br>- Cập nhật trạng thái YCPD thành "Approval" | `READY` | Cập nhật trạng thái YCPD thành Approval, lưu Người duyệt, Thời gian duyệt. | `[Username] đã phê duyệt mở kích hoạt CHP Trả đối tác [Mã CHP], trạng thái chuyển sang READY ngày [Datetime]` |
| **26** | **INACTIVE** | Quản lý CHP Trả đối tác | Từ chối mở kích hoạt | Checker | Pending | Từ chối mở kích hoạt | Rejected | - Bản ghi giữ nguyên trạng thái Inactive<br>- Cập nhật trạng thái YCPD thành "Rejected" và lưu lý do từ chối | `INACTIVE` | Cập nhật trạng thái YCPD thành Rejected, lưu Người từ chối, Thời gian và Lý do từ chối. | `[Username] đã từ chối yêu cầu mở kích hoạt CHP Trả đối tác [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **27** | **INACTIVE** | Quản lý CHP Trả đối tác | Sao chép cấu hình | Maker | N/A | N/A | N/A | Hệ thống lưu bản ghi mới với trạng thái Draft/New; bản ghi gốc giữ nguyên trạng thái Inactive | Bản ghi mới: `NEW`<br>Bản ghi gốc: `INACTIVE` | N/A | `[Username] đã sao chép cấu hình từ [Mã CHP gốc] sang cấu hình mới ngày [Datetime]` |
| **28** | **REJECTED** | Quản lý CHP Trả đối tác | Chỉnh sửa thông tin | Maker | N/A | N/A | N/A | Cập nhật thông tin và giữ nguyên trạng thái Rejected | `REJECTED` | N/A | `[Username] đã chỉnh sửa thông tin bản ghi bị từ chối CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **29** | **REJECTED** | Quản lý CHP Trả đối tác | Gửi phê duyệt lại | Maker | Pending | Chờ Checker duyệt lại | Pending | - Bản ghi được chuyển sang trạng thái Pending<br>- Insert 1 bản ghi YCPD "Duyệt mở tạo hồ sơ CHP Trả đối tác" với trạng thái "Pending" | `PENDING` | Sinh mã YCPD `AR_MM_MC_[Timestamp]`, loại yêu cầu "Duyệt mở tạo hồ sơ CHP Trả đối tác", lưu liên kết với hồ sơ YCPD bị từ chối trước đó. | `[Username] đã gửi phê duyệt lại CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **30** | **REJECTED** | Quản lý CHP Trả đối tác | Xoá bản ghi bị từ chối | Maker | N/A | N/A | N/A | Bản ghi CHP chuyển trạng thái DELETED | `DELETED` | N/A | `[Username] đã xoá bản ghi bị từ chối CHP Trả đối tác [Mã CHP] ngày [Datetime]` |

---

## 6. Error Matrix

| Error ID | Tiêu đề lỗi | Điều kiện kích hoạt (Trigger) | Mức độ | Liên kết FR | Trạng thái màn hình | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|---|---|
| **E-partner-fee-management-001** | Thiếu trường bắt buộc | Maker bấm [Tạo mới +] hoặc [Lưu cập nhật] nhưng bỏ trống các trường đánh dấu sao đỏ (*) như Đối tác, Kỳ trả phí, Ngày áp dụng. | Major | FR-003, 004, 005, 006 | Viền đỏ ô nhập lỗi, hiển thị inline text | *“Vui lòng nhập đầy đủ các thông tin bắt buộc (*)”* — Focus con trỏ chuột vào trường lỗi đầu tiên. |
| **E-partner-fee-management-002** | Min lớn hơn Max | Maker nhập Mức phí tối thiểu > Mức phí tối đa tại cấu hình phí thanh toán hoặc popup tính thử. | Major | FR-005, 008 | Viền đỏ ô Mức phí tối đa | *“Mức phí tối đa phải lớn hơn hoặc bằng mức phí tối thiểu. Vui lòng kiểm tra lại!”* |
| **E-partner-fee-management-003** | Trùng lặp cấu hình hiệu lực | Tạo mới cấu hình có cùng Đối tác, PTTT, Loại GD và khoảng thời gian áp dụng trùng với một cấu hình đang `ACTIVE` hoặc `READY`. | Critical | FR-003, 004, 005 | Modal Warning cảnh báo xung đột | *“Cấu hình phí cho Đối tác [Tên đối tác] với phương thức [PTTT] đã tồn tại trong khoảng thời gian này. Vui lòng kiểm tra lại thời gian áp dụng!”* |
| **E-partner-fee-management-004** | Ngày áp dụng không hợp lệ | Maker chọn `Thời gian áp dụng từ` lớn hơn `Thời gian áp dụng đến`, hoặc chọn ngày áp dụng trong quá khứ khi tạo mới. | Major | FR-002, 003 | Viền đỏ ô chọn ngày | *“Thời gian áp dụng từ ngày phải nhỏ hơn hoặc bằng đến ngày và không được nằm trong quá khứ.”* |
| **E-partner-fee-management-005** | Thiếu lý do từ chối | Checker bấm nút [Xác nhận từ chối] nhưng không nhập lý do hoặc nhập dưới 10 ký tự. | Minor | FR-012 | Viền đỏ textarea trong Modal từ chối | *“Vui lòng nhập lý do từ chối phê duyệt (tối thiểu 10 ký tự) để Maker có cơ sở chỉnh sửa.”* |
| **E-partner-fee-management-006** | Vi phạm kiểm soát 4 mắt | Maker cố tình sử dụng quyền duyệt hoặc gọi API duyệt bản ghi do chính tài khoản của mình tạo ra. | Critical | FR-012 | Toast Banner thông báo lỗi | *“Bạn không có quyền phê duyệt cấu hình phí do chính mình tạo ra (Vi phạm quy tắc Kiểm soát 4 mắt).”* |
| **E-partner-fee-management-007** | Bản ghi đang chờ duyệt | Maker cố tình bấm Sửa hoặc Xóa một cấu hình phí đang ở trạng thái `PENDING` (đang nằm trong hàng đợi của Checker). | Major | FR-009, 010 | Toast Banner cảnh báo | *“Cấu hình đang trong trạng thái Chờ phê duyệt. Không thể thực hiện chỉnh sửa hoặc xóa vào thời điểm này!”* |
| **E-partner-fee-management-008** | Cấm xóa bản ghi hiệu lực | Thao tác xóa bản ghi ở trạng thái `ACTIVE`, `READY`, hoặc `INACTIVE`. | Critical | FR-001, 010 | Modal thông báo từ chối thao tác | *“Không thể xóa cấu hình phí đã phát sinh hiệu lực vận hành. Bạn chỉ có thể thực hiện Tạm dừng cấu hình này!”* |
| **E-partner-fee-management-009** | Dữ liệu tính thử không hợp lệ | Maker nhập Giá trị giao dịch <= 0 hoặc chứa ký tự chữ cái trong Popup Tính thử phí. | Minor | FR-008 | Inline error dưới ô Giá trị GD | *“Giá trị giao dịch phải là số nguyên dương lớn hơn 0. Vui lòng nhập lại!”* |
| **E-partner-fee-management-010** | Lỗi mất kết nối mạng | Mất kết nối internet hoặc API Timeout (> 10s) khi bấm Lưu nháp, Tạo mới hoặc Phê duyệt. | Major | All FRs | Toast Error viền đỏ góc trên phải | *“Không thể kết nối đến máy chủ. Dữ liệu của bạn chưa được lưu, vui lòng kiểm tra kết nối mạng và thử lại!”* |

---

## 7. Success Criteria

| ID | Outcome nghiệp vụ | Phương pháp đo lường | Mốc đạt mục tiêu (Target) |
|---|---|---|---|
| **SC-partner-fee-management-01** | Giảm thiểu thời gian thiết lập và cấu hình biểu phí mới cho ngân hàng đối tác | Thời gian trung bình từ khi Maker mở form Thêm mới đến khi hoàn tất gửi duyệt Checker | Giảm 60% thời gian thao tác (từ 45 phút xuống dưới 15 phút/cấu hình) |
| **SC-partner-fee-management-02** | Loại bỏ hoàn toàn sai sót khi tính cước chi phí đối tác hàng tháng | Số lượng khiếu nại đối soát hoặc biên bản lệch cước giữa EPAY và Ngân hàng do cấu hình sai biểu phí | **0 vụ lệch cước** do lỗi cấu hình hệ thống |
| **SC-partner-fee-management-03** | Tối ưu hóa hiệu suất phê duyệt của Checker nhờ công cụ thẩm định Cũ - Mới trực quan | Tỷ lệ yêu cầu phê duyệt được xử lý đúng hạn trong vòng 4 giờ làm việc | Đạt $\ge 98\%$ YCPD xử lý đúng SLA |
| **SC-partner-fee-management-04** | Đảm bảo tính tuân thủ và lưu vết kiểm toán 100% | Báo cáo kiểm toán nội bộ và kiểm toán độc lập về tính toàn vẹn của Audit Trail cấu hình phí | Đạt 100% tuân thủ, không có phát hiện sai phạm kiểm toán (Zero finding) |

---

## 8. Data Entities (Tóm tắt cấu trúc dữ liệu)

```text
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│        PartnerFeeConfig         │ 1       * │          FeeTierDetail          │
│ (Bản ghi Cấu hình Phí Đối tác)  ├───────────┤   (Chi tiết Bậc thang / Nhóm)   │
├─────────────────────────────────┤           ├─────────────────────────────────┤
│ • id (PK, UUID / Code)          │           │ • id (PK)                       │
│ • fee_code: VARCHAR(50) UNIQUE  │           │ • fee_config_id (FK)            │
│ • fee_name: VARCHAR(255)        │           │ • tier_order: INT (1, 2, 3...)  │
│ • fee_type: ENUM (4 loại phí)   │           │ • from_value: DECIMAL(15,2)     │
│ • partner_id / partner_code     │           │ • to_value: DECIMAL(15,2)       │
│ • payment_method: VARCHAR(50)   │           │ • fee_rate: DECIMAL(7,4) (%)    │
│ • payment_gateway: VARCHAR(50)  │           │ • min_fee: DECIMAL(15,2) (VND)  │
│ • cycle_type: ENUM (Tháng/Quý)  │           │ • max_fee: DECIMAL(15,2) (VND)  │
│ • apply_from: TIMESTAMP         │           │ • fixed_fee: DECIMAL(15,2)      │
│ • apply_to: TIMESTAMP (nullable)│           └─────────────────────────────────┘
│ • is_general_apply: BOOLEAN     │
│ • currency: VARCHAR(10) (VND)   │           ┌─────────────────────────────────┐
│ • vat_rate: DECIMAL(5,2) (8%)   │ 1       * │           FeeAuditLog           │
│ • status: ENUM (7 trạng thái)   ├───────────┤     (Lưu vết Lịch sử Kiểm toán) │
│ • ycpd_status: ENUM (YCPD)      │           ├─────────────────────────────────┤
│ • created_by, created_at        │           │ • id (PK)                       │
│ • updated_by, updated_at        │           │ • fee_config_id (FK)            │
│ • approved_by, approved_at      │           │ • action_type: VARCHAR(50)      │
└─────────────────────────────────┘           │ • changed_field: VARCHAR(100)   │
                                              │ • old_value: TEXT               │
                                              │ • new_value: TEXT               │
                                              │ • updated_by, updated_at        │
                                              └─────────────────────────────────┘
```

---

## 9. Flows Summary (Dẫn chiếu `partner-fee-management-flows.md`)

Chi tiết sơ đồ luồng tuần tự (Sequence Diagram) đã được đặc tả hoàn chỉnh tại file `docs/partner-fee-management/srs/partner-fee-management-flows.md`:
1. **Luồng 1: Maker Tạo mới & Gửi yêu cầu phê duyệt cấu hình phí**:
   - Thao tác form 4 tab, chọn mã ngành MCC, nhập mức phí.
   - Luồng rẽ nhánh: Bấm [Tính thử 🧮] qua Popup Simulator.
   - Nhánh Lưu nháp (`DRAFT`) vs Tạo mới (`NEW`) vs Gửi yêu cầu phê duyệt (`PENDING`).
2. **Luồng 2: Checker Thẩm định & Phê duyệt cấu hình phí**:
   - Màn hình so sánh đối chiếu CŨ - MỚI (highlight sai khác).
   - Nhánh Phê duyệt (chuyển sang `READY` nếu ngày áp dụng tương lai, hoặc `ACTIVE` nếu ngày áp dụng hiện tại).
   - Nhánh Từ chối (nhập lý do từ chối tối thiểu 10 ký tự, chuyển về `NEW` cho Maker).
3. **Luồng 3: Tự động kích hoạt cấu hình (Auto Golive by Scheduler Job)**:
   - Job ngầm quét mỗi 1 phút/lần, kích hoạt bản ghi `READY` sang `ACTIVE`.

---

## 10. Screens Summary (Dẫn chiếu 28 Màn hình UI trên Figma Canvas)

Toàn bộ 28 màn hình giao diện đã được vẽ hoàn chỉnh tại file **`ForWork`**, page **`CHP Đối tác`** với các phân khu quy hoạch rõ ràng:

### Khu vực 1: Màn hình Danh sách (Toạ độ $y = 0$)
- `4020:50223`: Danh sách / Tab Tất cả / 1920 (Bảng dữ liệu 10 cột, bỏ cột Trạng thái YCPD, bộ lọc chuẩn từ ngày - đến ngày).
- `4020:51051`: Danh sách / Tab Đang hoạt động / 1920.
- `4020:51879`: Danh sách / Tab Chờ phê duyệt / 1920.

### Khu vực 2: Màn hình Thêm mới 4 loại phí & Popup tính thử (Toạ độ $y = 1240 \dots 4800$)
- **Hàng 2A ($y = 1320$) — Phí Duy trì & Phí Xử lý giao dịch**:
  - `4022:53508`: Thêm mới - Phí duy trì sử dụng dịch vụ | Áp dụng toàn bộ MID.
  - `4022:54185`: Thêm mới - Phí duy trì sử dụng dịch vụ | Áp dụng từng MID đối tác cung cấp.
  - `4022:54899`: Thêm mới - Phí xử lý giao dịch | Áp dụng chung (1 bậc phí, Dual-listbox MCC).
  - `4022:55659`: Thêm mới - Phí xử lý giao dịch | Không áp dụng (Tách riêng từng loại GD: Thanh toán, Hoàn trả).
- **Hàng 2B ($y = 2950$) — Phí Thanh toán, Phí Quản lý DVGT & Cụm Popup tính thử**:
  - `4022:56456`: Thêm mới - Phí thanh toán | 1 bậc phí (Có nút [Tính thử 🧮]).
  - `4022:57209`: Thêm mới - Phí thanh toán | Nhiều mức phí (Bậc thang theo thương hiệu thẻ Visa, Master, JCB).
  - `4024:58948`: Thêm mới - Phí quản lý DVGT | Áp dụng chung cho toàn bộ dịch vụ gia tăng.
  - `4022:58264`: Thêm mới - Phí quản lý DVGT | Không áp dụng (Tách riêng 3 dịch vụ: Quản lý token, Quản lý rủi ro, FastPay).
  - `4018:36498`: Popup tính thử phí - Phí thanh toán (1 mức phí).
  - `4018:36606`: Popup tính thử phí - Phí thanh toán / Nhiều mức phí (Bậc thang).
  - `4018:36826`: Alert cảnh báo kết quả tính thử phí.
- **Hàng 2C ($y = 5050$) — Biến thể Hoàn trả**:
  - `4018:34716`: Thêm mới phí trả đối tác | Thẻ quốc tế | Hoàn trả.
  - `4018:35488`: Thêm mới phí trả đối tác | Thẻ nội địa | Hoàn trả.

### Khu vực 3: Màn hình Chỉnh sửa / Cập nhật (Toạ độ $y = 7500 \dots 9500$)
- 8 Màn hình Chỉnh sửa tương ứng với 4 loại phí ở trạng thái *Trước khi update* và *Sau khi có sự update*.

### Khu vực 4: Xem chi tiết & Lịch sử hoạt động (Toạ độ $y = 12100$)
- 5 Màn hình Xem chi tiết theo trạng thái (`ACTIVE`, `PENDING`, `DRAFT`, `INACTIVE`) và Màn hình Tab Lịch sử hoạt động (Timeline Audit Trail).

### Khu vực 5: Màn hình Phê duyệt Checker & Modals/Toasts (Toạ độ $y = 13700$)
- 2 Màn hình Checker Thẩm định (Chờ duyệt và Thẩm định Cũ - Mới).
- 5 Modals xác nhận: Dừng hoạt động, Xác nhận lưu cập nhật, Xác nhận hủy cập nhật, Xác nhận hủy thêm mới, Xác nhận lưu nháp.
- 4 Toasts thông báo: Dừng hoạt động thành công, Cập nhật thành công, Lưu nháp thành công, Tạo mới thành công.

---

## 11. Constraints, Dependencies & Assumptions

### Constraints (Ràng buộc bắt buộc)
| Ràng buộc | Nguồn gốc / Chủ quản |
|---|---|
| Bắt buộc tuân thủ nguyên tắc kiểm soát 4 mắt (Maker - Checker) theo tiêu chuẩn ISO 27001 và kiểm soát nội bộ ngành thanh toán. | Ban Kiểm soát & Quản trị Rủi ro EPAY |
| Mức thuế VAT mặc định áp dụng 8% (hoặc 10% tùy thời kỳ quy định pháp luật thuế). | Phòng Tài chính Kế toán |
| Các trường thông tin danh mục đối tác, ngân hàng, cổng TGTT, mã ngành MCC phải đồng bộ trực tiếp từ Master Data của Portal. | Đội ngũ Kiến trúc Hệ thống Core |

### Dependencies (Phụ thuộc vào các bên khác)
| Thành phần phụ thuộc | Đơn vị chủ quản | Ảnh hưởng nếu chưa sẵn sàng |
|---|---|---|
| Master Data API (Đối tác, Ngân hàng, Kênh thanh toán, Mã ngành MCC) | Core Platform Team | Maker không thể tải được danh sách lựa chọn trong các dropdown và dual-listbox |
| Notification Service (Email, Chuông thông báo trên Portal) | Infrastructure Team | Checker không nhận được thông báo khi có yêu cầu phê duyệt mới cần xử lý |
| Billing & Settlement Engine (Động cơ tính phí) | Billing Team | Bản ghi `ACTIVE` không được đọc vào hệ thống tính cước thực tế |

### Assumptions (Giả định nghiệp vụ)
| Giả định | Hệ quả nếu giả định bị sai |
|---|---|
| Mỗi đối tác trong một khoảng thời gian nhất định chỉ có duy nhất 1 cấu hình phí có hiệu lực (`ACTIVE`) cho cùng một bộ tham số (PTTT, Loại GD, Cổng TGTT). | Hệ thống phát sinh lỗi xung đột tính cước kép (Double Charging) cho đối tác; cần bổ sung cơ chế giải quyết xung đột mức độ ưu tiên. |
| Thời gian hệ thống của Server Portal và Scheduler Job đồng bộ qua giao thức NTP chuẩn xác tuyệt đối đến từng giây. | Scheduler Job có thể kích hoạt sớm hoặc muộn hơn so với thời điểm hợp đồng đối tác có hiệu lực. |

---

## 12. Open Questions (Câu hỏi mở & Theo dõi)

- [x] **OQ-01**: *Khi Maker chỉnh sửa một cấu hình đang `ACTIVE`, bản ghi hiện tại có bị tạm dừng tính cước không?*  
  -> **Đã chốt**: KHÔNG. Bản ghi `ACTIVE` cũ vẫn tiếp tục phục vụ tính cước bình thường cho đến khi Checker phê duyệt bản ghi chỉnh sửa mới (`BR-partner-fee-management-006`).
- [x] **OQ-02**: *Có cho phép xóa cấu hình phí đã từng có hiệu lực không?*  
  -> **Đã chốt**: CẤM XÓA. Chỉ được xóa bản ghi `DRAFT` và `NEW`. Các bản ghi đã từng có hiệu lực chỉ được phép `INACTIVE` để bảo tồn lịch sử đối soát (`BR-partner-fee-management-007`).
- [ ] **OQ-03**: *Trong tương lai có cần tích hợp tính năng cảnh báo tự động khi hợp đồng biểu phí đối tác sắp hết hạn (vd: trước 30 ngày) không?*  
  -> *Đề xuất chuyển sang Backlog P2 cho đợt nâng cấp tiếp theo.*

