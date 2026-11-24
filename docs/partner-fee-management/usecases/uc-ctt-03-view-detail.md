---
id: CTT-UC03
title: "Xem chi tiết thông tin phí Trả đối tác CTT"
feature: partner-fee-management
module: CTT
status: approved
updated: 2026-11-24
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_ctt: docs/partner-fee-management/srs/SRS-Partner-Fee-CTT.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác v2"
---

# 2.4 CTT-UC03: Xem chi tiết thông tin phí Trả đối tác CTT

## 2.4.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xem chi tiết cấu hình phí CTT và Lịch sử thay đổi (Audit Trail)** |
| **ID** | **CTT - UC03** |
| **Description** | Hiển thị thông tin chi tiết cấu hình phí CTT và thanh tác vụ dọc theo quyền/trạng thái; lịch sử hoạt động là màn riêng. |
| **Actor** | Maker CTT, Checker CTT, Quản trị viên, Kiểm toán viên, Cán bộ Đối soát |
| **Trigger** | Người dùng click vào hyperlink **[Mã phí CTT]** trên bảng danh sách, hoặc chọn **[Xem chi tiết]** từ menu thao tác. |
| **Pre-Condition** | Bản ghi cấu hình CTT tồn tại trong CSDL và người dùng có quyền tra cứu cấu hình phí CTT. |
| **Post-Condition** | Màn hình hiển thị đầy đủ thông tin chi tiết cấu hình phí CTT và lịch sử cập nhật biến động dữ liệu. |
| **Basic flow** | 1. Người dùng vào menu **[Quản lý cấu hình phí] > [Phí trả đối tác] > [Phí đối tác CTT]** ở thanh menu bên trái.<br>2. Hệ thống hiển thị màn hình danh sách cấu hình phí CTT.<br>3. Người dùng tìm kiếm và chọn mã cấu hình phí cần xem trên danh sách.<br>4. Hệ thống hiển thị màn hình chi tiết cấu hình phí CTT đó. |
| **Alternative flow** | - **A1 (Bản ghi ACTIVE)**: Thanh tác vụ dọc bên phải giữ đủ nút theo mẫu; thao tác không khả dụng được disabled. Footer chi tiết chỉ có `Đóng`, căn giữa, không icon. Nút xử lý mở màn hình riêng.<br>- **A2 (Bản ghi PENDING — Maker View)**: Maker dùng `Rút yêu cầu`/`Thay đổi người phê duyệt` theo quyền.<br>- **A3 (Bản ghi PENDING — Checker View)**: Checker xem drawer đối chiếu và thao tác `Từ chối`/`Phê duyệt`.<br>- **A4 (Bản ghi INACTIVE)**: Thao tác không khả dụng ở trạng thái INACTIVE được giữ hiển thị nhưng disabled. |
| **Exception flow** | - **E1**: Bản ghi đã bị xóa bởi người dùng khác trong phiên làm việc $\rightarrow$ Thông báo lỗi: *“Bản ghi không tồn tại hoặc đã bị xóa”*, tự động quay lại trang danh sách. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung xem chi tiết và Audit Trail CTT](#243-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Tốc độ nạp và hiển thị toàn bộ màn hình chi tiết $< 1.0$ giây; Tải dòng thời gian lịch sử $< 1.5$ giây. |

---

## 2.4.2 Giao diện

### Màn hình Wireframe liên kết:
* **CTT-UC03-WF01**: Chi tiết CTT theo các trạng thái DRAFT/PENDING/READY/ACTIVE/INACTIVE/NEW (`4244:16231`, `4244:16477`, `4244:16743`, `4244:16987`, `4244:17234`, `4244:17484`)
* **CTT-UC03-WF02**: Drawer Checker (`4244:17738`)
* **CTT-UC03-WF03**: Màn hình Lịch sử hoạt động (`4287:13664`)

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **KHỐI THÔNG TIN CHUNG** | Container | M | N | Readonly | Section thông tin chung xếp cùng các section cấu hình phí theo chiều dọc. |
| **Mã phí** | Text | M | N | Unique String | Hiển thị mã cấu hình phí CTT (vd: `CTT_FE_VCB_001`). |
| **Loại phí** | Text | M | N | String | Loại phí CTT (vd: *Phí thanh toán*, *Phí xử lý giao dịch*). |
| **Trạng thái cấu hình** | Badge | M | N | Enum Status | Badge hiển thị trạng thái CHP: `DRAFT`, `PENDING`, `READY`, `ACTIVE`, `INACTIVE`, `NEW` (sau từ chối). |
| **Trạng thái YCPD** | Badge | C | N | Enum Status | Hiển thị trạng thái của yêu cầu phê duyệt liên kết: `PENDING`, `APPROVAL`. |
| **Người khởi tạo / Thời gian tạo** | Text / Date | M | N | String / Datetime | Tên tài khoản Maker và mốc thời gian tạo ban đầu dạng `dd/MM/yyyy, HH:mm:ss`. |
| **Người cập nhật cuối / Thời gian** | Text / Date | M | N | String / Datetime | Tên tài khoản và mốc thời gian cập nhật gần nhất. |
| **Người phê duyệt** | Text | C | N | String | Tên Checker được phân công phê duyệt hồ sơ. |
| **Thông tin YCPD** | Fields / Drawer | C | N | Readonly | Trạng thái/người phê duyệt nằm trong thông tin chung; Checker xem yêu cầu và so sánh CŨ/MỚI trong drawer. |
| **Mã yêu cầu** | Text | M | N | String | Mã định danh hồ sơ phê duyệt `AR_MM_MC_[Timestamp]`. |
| **Thời gian tạo YCPD** | Date time | M | N | Datetime | Thời điểm gửi yêu cầu phê duyệt. |
| **Trạng thái phê duyệt** | Badge | M | N | Enum | Badge hiển thị: `Pending`. |
| **Người tạo YCPD / Phòng ban** | Text | M | N | String | Tài khoản Maker đề xuất và đơn vị công tác (vd: *Kinh doanh - Maker*). |
| **Thanh tác vụ bên phải** | Vertical action rail | M | C | Click/disabled | Hiển thị đầy đủ nút theo thiết kế; disable thao tác không phù hợp trạng thái/quyền. |
| **Nút [Đóng]** | Button | M | Y | Click | Footer căn giữa, không icon; là nút duy nhất ở màn chi tiết/lịch sử. |

---

## 2.4.3 Yêu cầu nghiệp vụ chung

#### Chi tiết xử lý nghiệp vụ

1. Người dùng click vào Mã cấu hình CTT (vd: `CTT_FE_VCB_001`) trên bảng danh sách.
2. Hệ thống truy vấn CSDL và nạp thông tin bản ghi biểu phí CTT.
3. Hệ thống hiển thị màn hình Chi tiết cấu hình phí gồm:
   - Breadcrumb điều hướng: `Quản lý cấu hình phí trả đối tác CTT > [MÃ CẤU HÌNH]`.
   - Header tiêu đề: Mã phí — Tên biểu phí kèm badge trạng thái cấu hình (`ACTIVE`, `PENDING` hoặc `INACTIVE`).
   - **Khối Thông tin chung**: Mã phí, Loại phí, Trạng thái cấu hình, Trạng thái YCPD, Người tạo, Ngày tạo, Người cập nhật cuối, Ngày cập nhật, Người phê duyệt.
   - Thông tin YCPD/trạng thái và người duyệt nằm trong phần thông tin chung; Checker xem chi tiết yêu cầu trong drawer.
   - **Khối Thông tin cấu hình phí CTT**: Nguồn dữ liệu (CTT), Đối tác/Ngân hàng hưởng phí, Kỳ trả phí, Thời gian áp dụng phí, PTTT (Visa, Master, JCB, Napas), Loại GD, Đồng tiền, Thuế VAT, Mô tả.
   - **Khối Thông tin Phí cho từng loại giao dịch**: Bảng mức phí chi tiết (Tỷ lệ %, Min, Max, Phí cố định theo từng thương hiệu thẻ).
   - Thanh tác vụ dọc bên phải; footer chi tiết chỉ có `Đóng`, căn giữa, không icon.
4. Người dùng chọn thao tác lịch sử trên thanh tác vụ bên phải để mở màn hình Lịch sử hoạt động riêng.
5. Hệ thống hiển thị actor, thời điểm và nội dung thay đổi trên màn Lịch sử hoạt động; footer có nút `Đóng`.


| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **CTT-UC03-BR01.1** | **Quy tắc bố cục chi tiết** | Các section xếp theo chiều dọc; thanh tác vụ bên phải nằm ngoài vùng nội dung để không che khuất thông tin phí. |
| **CTT-UC03-BR01.2** | **Quy tắc hiển thị nút tác vụ theo vai trò** | Thanh tác vụ dọc giữ đầy đủ nút theo thiết kế; thao tác không khả dụng theo trạng thái/quyền được disabled. Checker phê duyệt/từ chối trong drawer thẩm định. |
| **CTT-UC03-BR01.3** | **Tính bất biến của Audit Log** | Bảng dòng thời gian Lịch sử hoạt động (Audit Trail) là dữ liệu chỉ đọc (Immutable Data). Không một tài khoản nào được phép chỉnh sửa hoặc xóa bỏ các bản ghi lưu vết lịch sử kiểm toán. |

---

## 2.4.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Bản ghi không tồn tại | Bản ghi CTT đã bị xóa bởi tài khoản khác trong cùng phiên | Critical | *“Bản ghi cấu hình phí không tồn tại hoặc đã bị xóa. Vui lòng quay lại màn hình danh sách!”* |
| **E2** | Không có quyền truy cập | Người dùng không có quyền xem chi tiết biểu phí CTT này | Major | *“Bạn không có quyền truy cập thông tin cấu hình phí này. Vui lòng liên hệ Quản trị viên!”* |
| **E3** | Lỗi kết nối máy chủ | Không thể truy vấn chi tiết dữ liệu biểu phí CTT từ CSDL | Major | *“Lỗi kết nối cơ sở dữ liệu khi tải thông tin chi tiết. Vui lòng thử lại sau!”* |
| **E4** | Lỗi tải dòng thời gian Audit Trail | Lỗi timeout khi truy vấn bảng `audit_logs` | Minor | *“Không thể tải danh sách lịch sử thay đổi vào lúc này. Vui lòng bấm làm mới tab Lịch sử!”* |
