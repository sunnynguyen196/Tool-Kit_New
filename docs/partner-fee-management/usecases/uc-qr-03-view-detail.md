---
id: QR-UC03
title: "Xem chi tiết thông tin phí Trả đối tác QRGW"
feature: partner-fee-management
module: QRGW
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 3.4 QR-UC03: Xem chi tiết thông tin phí Trả đối tác QRGW

## 3.4.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xem chi tiết cấu hình phí QRGW và Lịch sử thay đổi (Audit Trail)** |
| **ID** | **QR - UC03** |
| **Description** | Hiển thị chi tiết toàn diện thông tin bản ghi biểu phí QRGW gồm Khối Thông tin chung, Khối Yêu cầu phê duyệt (nếu có), Khối Biểu phí theo loại dịch vụ VietQR (Thu hộ / Chi hộ / QR Tĩnh / QR Động), thanh tác vụ động và tab dòng thời gian lưu vết kiểm toán (Audit Trail Timeline View). |
| **Actor** | Maker QRGW, Checker QRGW, Quản trị viên, Kiểm toán viên, Cán bộ Đối soát |
| **Trigger** | Người dùng click vào hyperlink **[Mã phí QRGW]** trên bảng danh sách, hoặc chọn **[Xem chi tiết]** từ menu thao tác. |
| **Pre-Condition** | Bản ghi cấu hình QRGW tồn tại trong CSDL và người dùng có quyền tra cứu cấu hình phí QRGW. |
| **Post-Condition** | Màn hình hiển thị đầy đủ thông tin chi tiết cấu hình phí QRGW và lịch sử cập nhật biến động dữ liệu. |
| **Basic flow** | 1. Người dùng vào menu **[Quản lý cấu hình phí] > [Phí trả đối tác] > [Phí đối tác QRGW]** ở thanh menu bên trái.<br>2. Hệ thống hiển thị màn hình danh sách cấu hình phí QRGW.<br>3. Người dùng tìm kiếm và chọn mã cấu hình phí cần xem trên danh sách.<br>4. Hệ thống hiển thị màn hình chi tiết cấu hình phí QRGW đó. |
| **Alternative flow** | - **A1 (Bản ghi ACTIVE)**: Chân trang hiển thị cụm nút: `[← Quay lại]`, `[Lịch sử]`, `[Sao chép]`, `[Tạm dừng]`, `[Chỉnh sửa]`.<br>- **A2 (Bản ghi PENDING — Maker View)**: Chân trang hiển thị: `[← Quay lại]`, `[Lịch sử]`, `[Rút yêu cầu]`, tại Khối YCPD có nút `[Thay đổi người PD]`.<br>- **A3 (Bản ghi PENDING — Checker View)**: Chân trang hiển thị: `[← Quay lại]`, `[Lịch sử]`, `[Từ chối]`, `[Phê duyệt]`.<br>- **A4 (Bản ghi INACTIVE)**: Chân trang hiển thị: `[← Quay lại]`, `[Lịch sử]`, `[Sao chép]`, `[Kích hoạt lại]`. |
| **Exception flow** | - **E1**: Bản ghi đã bị xóa bởi người dùng khác trong phiên làm việc $\rightarrow$ Thông báo lỗi: *“Bản ghi không tồn tại hoặc đã bị xóa”*, tự động quay lại trang danh sách. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung xem chi tiết và Audit Trail QRGW](#343-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Tốc độ nạp và hiển thị toàn bộ màn hình chi tiết $< 1.0$ giây; Tải dòng thời gian lịch sử $< 1.5$ giây. |

---

## 3.4.2 Giao diện

### Màn hình Wireframe liên kết:
* **QR-UC03-WF01**: Chi tiết Phí QRGW — Trạng thái Active (`4020:44666`)
* **QR-UC03-WF02**: Chi tiết Phí QRGW — Trạng thái Pending Maker View (`4020:46306`)
* **QR-UC03-WF03**: Xem chi tiết — Tab Dòng thời gian Lịch sử hoạt động (`4020:47172`)

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **KHỐI THÔNG TIN CHUNG** | Container | M | N | Readonly | Căn chỉnh song song, phẳng mép đáy với Khối YCPD. |
| **Mã phí** | Text | M | N | Unique String | Hiển thị mã cấu hình phí QRGW (vd: `QR_FE_NAPAS_002`). |
| **Loại phí** | Text | M | N | String | Loại phí QRGW (vd: *Phí thanh toán VietQR*). |
| **Trạng thái cấu hình** | Badge | M | N | Enum Status | Badge hiển thị trạng thái: `ACTIVE`, `PENDING`, `INACTIVE`. |
| **Trạng thái YCPD** | Badge | C | N | Enum Status | Hiển thị trạng thái của yêu cầu phê duyệt liên kết: `PENDING`, `APPROVAL`. |
| **Người khởi tạo / Thời gian tạo** | Text / Date | M | N | String / Datetime | Tên tài khoản Maker và mốc thời gian tạo ban đầu dạng `dd/MM/yyyy, HH:mm:ss`. |
| **Người cập nhật cuối / Thời gian** | Text / Date | M | N | String / Datetime | Tên tài khoản và mốc thời gian cập nhật gần nhất. |
| **Người phê duyệt** | Text | C | N | String | Tên Checker được phân công phê duyệt hồ sơ. |
| **KHỐI YÊU CẦU PHÊ DUYỆT** | Container | C | N | Readonly | Căn chỉnh song song với Khối Thông tin chung. Chỉ hiển thị khi có hồ sơ YCPD liên kết. |
| **Mã yêu cầu** | Text | M | N | String | Mã định danh hồ sơ phê duyệt `AR_MM_MC_[Timestamp]`. |
| **Thời gian tạo YCPD** | Date time | M | N | Datetime | Thời điểm gửi yêu cầu phê duyệt. |
| **Trạng thái phê duyệt** | Badge | M | N | Enum | Badge hiển thị: `Pending`. |
| **Người tạo YCPD / Phòng ban** | Text | M | N | String | Tài khoản Maker đề xuất và đơn vị công tác (vd: *Kinh doanh - Maker*). |
| **Nút [Thay đổi người PD]** | Button | C | Y | Click | Hiển thị trong Khối YCPD ở vai trò Maker. Click mở popup chọn Checker mới. |
| **CỤM NÚT TÁC VỤ CHÂN TRANG** | Button Group | M | Y | Click | Thanh công cụ chân trang chứa các tác vụ động theo trạng thái bản ghi và quyền hạn người dùng. |

---

## 3.4.3 Yêu cầu nghiệp vụ chung

#### Chi tiết xử lý nghiệp vụ

1. Người dùng click vào Mã cấu hình QRGW (vd: `QR_FE_NAPAS_002`) trên bảng danh sách.
2. Hệ thống truy vấn CSDL và nạp thông tin bản ghi biểu phí QRGW.
3. Hệ thống hiển thị màn hình Chi tiết cấu hình phí gồm:
   - Breadcrumb điều hướng: `Quản lý cấu hình phí trả đối tác QRGW > [MÃ CẤU HÌNH]`.
   - Header tiêu đề: Mã phí — Tên biểu phí kèm badge trạng thái cấu hình (`ACTIVE`, `PENDING` hoặc `INACTIVE`).
   - **Khối Thông tin chung**: Mã phí, Loại phí, Trạng thái cấu hình, Trạng thái YCPD, Người tạo, Ngày tạo, Người cập nhật cuối, Ngày cập nhật, Người phê duyệt.
   - **Khối Yêu cầu phê duyệt** (hiển thị khi bản ghi PENDING hoặc đã có hồ sơ YCPD): Mã yêu cầu, Thời gian tạo, Trạng thái phê duyệt, Người tạo, Phòng ban.
   - **Khối Thông tin cấu hình phí QRGW**: Nguồn dữ liệu (QRGW), Đối tác/Ngân hàng hưởng phí, Kỳ trả phí, Thời gian áp dụng phí, Loại dịch vụ (Thu hộ / Chi hộ), Loại QR (Tĩnh / Động), Đồng tiền, Thuế VAT, Mô tả.
   - **Khối Thông tin Phí cho từng loại giao dịch**: Bảng mức phí chi tiết (Tỷ lệ %, Min, Max, Phí cố định theo từng giao dịch QR).
   - Thanh nút tác vụ chân trang động theo vai trò và trạng thái bản ghi.
4. Người dùng click tab **[Lịch sử thay đổi / Hoạt động]**.
5. Hệ thống hiển thị dòng thời gian Timeline View ghi lại toàn bộ lịch sử: Người sửa, Thời gian, Trường thay đổi, Giá trị CŨ $\rightarrow$ Giá trị MỚI.


| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **QR-UC03-BR01.1** | **Quy tắc thiết kế khung thông tin song song** | Khối *Thông tin chung* và Khối *Yêu cầu phê duyệt* phải được căn chỉnh song song trên cùng một hàng ngang, các dòng dữ liệu giãn cách đều và mép đáy phẳng hoàn toàn. |
| **QR-UC03-BR01.2** | **Quy tắc hiển thị nút tác vụ theo vai trò** | - Tài khoản Maker: Chỉ nhìn thấy các nút *Chỉnh sửa, Rút yêu cầu, Thay đổi người PD, Tạm dừng, Kích hoạt lại, Sao chép*. Không hiển thị nút *Phê duyệt* hoặc *Từ chối*.<br>- Tài khoản Checker: Chỉ nhìn thấy các nút *Phê duyệt, Từ chối, Xem lịch sử*. Không cho phép Checker tự ý sửa đổi dữ liệu biểu phí trực tiếp trên màn hình xem chi tiết. |
| **QR-UC03-BR01.3** | **Tính bất biến của Audit Log** | Bảng dòng thời gian Lịch sử hoạt động (Audit Trail) là dữ liệu chỉ đọc (Immutable Data). Không một tài khoản nào được phép chỉnh sửa hoặc xóa bỏ các bản ghi lưu vết lịch sử kiểm toán. |

---

## 3.4.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Bản ghi không tồn tại | Bản ghi QRGW đã bị xóa bởi tài khoản khác trong cùng phiên | Critical | *“Bản ghi cấu hình phí không tồn tại hoặc đã bị xóa. Vui lòng quay lại màn hình danh sách!”* |
| **E2** | Không có quyền truy cập | Người dùng không có quyền xem chi tiết biểu phí QRGW này | Major | *“Bạn không có quyền truy cập thông tin cấu hình phí này. Vui lòng liên hệ Quản trị viên!”* |
| **E3** | Lỗi kết nối máy chủ | Không thể truy vấn chi tiết dữ liệu biểu phí QRGW từ CSDL | Major | *“Lỗi kết nối cơ sở dữ liệu khi tải thông tin chi tiết. Vui lòng thử lại sau!”* |
| **E4** | Lỗi tải dòng thời gian Audit Trail | Lỗi timeout khi truy vấn bảng `audit_logs` | Minor | *“Không thể tải danh sách lịch sử thay đổi vào lúc này. Vui lòng bấm làm mới tab Lịch sử!”* |
