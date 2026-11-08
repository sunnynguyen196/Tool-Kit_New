---
id: BF25-UC03
title: "Xem chi tiết thông tin phí Trả đối tác"
feature: partner-fee-management
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - erd: docs/partner-fee-management/srs/partner-fee-management-erd.md
  - flows: docs/partner-fee-management/srs/partner-fee-management-flows.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 2.4 BF25-UC03: Xem chi tiết thông tin phí Trả đối tác

## 2.4.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xem chi tiết cấu hình phí và Lịch sử thay đổi (Audit Trail)** |
| **ID** | **BF25 - UC03** |
| **Description** | Hiển thị chi tiết toàn diện thông tin bản ghi cấu hình phí gồm Khối Thông tin chung, Khối Yêu cầu phê duyệt (nếu có), Khối Thông tin biểu phí theo từng loại giao dịch, thanh tác vụ động và tab dòng thời gian lưu vết kiểm toán (Audit Trail Timeline View). |
| **Actor** | Maker, Checker, Quản trị viên, Kiểm toán viên, Cán bộ Đối soát |
| **Trigger** | Người dùng click vào hyperlink **[Mã phí]** trên bảng danh sách, hoặc chọn **[Xem chi tiết]** từ menu 3 chấm. |
| **Pre-Condition** | Bản ghi cấu hình tồn tại trong CSDL và người dùng có quyền tra cứu cấu hình phí. |
| **Post-Condition** | Màn hình hiển thị đầy đủ thông tin chi tiết cấu hình phí và lịch sử cập nhật biến động dữ liệu. |
| **Basic flow** | 1. Người dùng click vào Mã cấu hình (vd: `QR_FE_NAPAS_002`) trên bảng danh sách.<br>2. Hệ thống truy vấn CSDL và nạp thông tin bản ghi.<br>3. Hệ thống hiển thị màn hình Chi tiết cấu hình phí gồm:<br>   - Breadcrumb điều hướng: `Quản lý cấu hình phí trả đối tác > [MÃ CẤU HÌNH]`.<br>   - Header tiêu đề: Mã phí — Tên biểu phí kèm badge trạng thái cấu hình (`● ACTIVE` hoặc `● PENDING`).<br>   - **Khối Thông tin chung**: Mã phí, Loại phí, Trạng thái cấu hình, Trạng thái YCPD, Người tạo, Ngày tạo, Người cập nhật cuối, Ngày cập nhật, Người phê duyệt.<br>   - **Khối Yêu cầu phê duyệt** (hiển thị khi bản ghi PENDING hoặc đã có hồ sơ YCPD): Mã yêu cầu, Thời gian tạo, Trạng thái phê duyệt, Người tạo, Phòng ban.<br>   - **Khối Thông tin cấu hình phí**: Nguồn dữ liệu, Đối tác/Ngân hàng hưởng phí, Kỳ trả phí, Thời gian áp dụng phí, Loại dịch vụ, PTTT, Loại GD, Trạng thái GD, Đồng tiền, Thuế VAT, Mô tả.<br>   - **Khối Thông tin Phí cho từng loại giao dịch**: Bảng mức phí chi tiết (Tỷ lệ %, Min, Max, Phí cố định).<br>   - Thanh nút tác vụ chân trang động theo vai trò và trạng thái bản ghi.<br>4. Người dùng click tab **[Lịch sử thay đổi / Hoạt động]**.<br>5. Hệ thống hiển thị dòng thời gian Timeline View ghi lại toàn bộ lịch sử: Người sửa, Thời gian, Trường thay đổi, Giá trị CŨ $\rightarrow$ Giá trị MỚI. |
| **Alternative flow** | - **A1 (Bản ghi ACTIVE)**: Chân trang hiển thị cụm nút: `[← Quay lại]`, `[🕒 Lịch sử]`, `[Sao chép]`, `[Tạm dừng]`, `[Chỉnh sửa]`.<br>- **A2 (Bản ghi PENDING — Maker View)**: Chân trang hiển thị: `[← Quay lại]`, `[🕒 Lịch sử]`, `[🔄 Rút yêu cầu]`, tại Khối YCPD có nút `[👥 Thay đổi người PD]`.<br>- **A3 (Bản ghi PENDING — Checker View)**: Chân trang hiển thị: `[← Quay lại]`, `[🕒 Lịch sử]`, `[✖ Từ chối]`, `[✔ Phê duyệt]`.<br>- **A4 (Bản ghi INACTIVE)**: Chân trang hiển thị: `[← Quay lại]`, `[🕒 Lịch sử]`, `[Sao chép]`, `[Kích hoạt lại]`. |
| **Exception flow** | - **E1**: Bản ghi đã bị xóa bởi người dùng khác trong phiên làm việc $\rightarrow$ Thông báo lỗi: *“Bản ghi không tồn tại hoặc đã bị xóa”*, tự động quay lại trang danh sách. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung xem chi tiết và Audit Trail](#243-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Tốc độ nạp và hiển thị toàn bộ màn hình chi tiết $< 1.0$ giây; Tải dòng thời gian lịch sử $< 1.5$ giây. |

---

## 2.4.2 Giao diện

### Màn hình Wireframe liên kết:
* **BF25-UC03-WF01**: Chi tiết Phí QRGW / CTT — Trạng thái Active (`4020:43846`, `4020:44666`)
* **BF25-UC03-WF02**: Chi tiết Phí QRGW / CTT — Trạng thái Pending Maker View (`4020:45486`, `4020:46306`)
* **BF25-UC03-WF03**: Xem chi tiết — Tab Dòng thời gian Lịch sử hoạt động (`4020:47172`)

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **KHỐI THÔNG TIN CHUNG** | Container | M | N | Readonly | Nằm góc trên bên trái, chiều cao 182px, phẳng mép đáy với Khối YCPD. |
| **Mã phí** | Text | M | N | Unique String | Hiển thị mã cấu hình phí (vd: `QR_FE_NAPAS_002`). |
| **Loại phí** | Text | M | N | String | Loại phí thu (vd: *Phí thanh toán*). |
| **Trạng thái cấu hình** | Badge | M | N | Enum Status | Badge trực quan: `● ACTIVE` (nền xanh lá `#dcfce7`), `● PENDING` (nền vàng cam `#fef3c7`), `● INACTIVE` (nền đỏ nhạt). |
| **Trạng thái YCPD** | Badge | C | N | Enum Status | Hiển thị trạng thái của yêu cầu phê duyệt liên kết: `● PENDING` (cam), `● APPROVAL` (xanh). |
| **Người khởi tạo / Thời gian tạo** | Text / Date | M | N | String / Datetime | Tên tài khoản Maker và mốc thời gian tạo ban đầu dạng `dd/MM/yyyy, HH:mm:ss`. |
| **Người cập nhật cuối / Thời gian** | Text / Date | M | N | String / Datetime | Tên tài khoản và mốc thời gian cập nhật gần nhất. |
| **Người phê duyệt** | Text | C | N | String | Tên Checker được phân công phê duyệt hồ sơ. |
| **KHỐI YÊU CẦU PHÊ DUYỆT** | Container | C | N | Readonly | Nằm góc trên bên phải, chiều cao 182px, phẳng đáy. Chỉ hiển thị khi có hồ sơ YCPD liên kết. |
| **Mã yêu cầu** | Text | M | N | String | Mã định danh hồ sơ phê duyệt `AR_MM_MC_[Timestamp]`. |
| **Thời gian tạo YCPD** | Date time | M | N | Datetime | Thời điểm gửi yêu cầu phê duyệt. |
| **Trạng thái phê duyệt** | Badge | M | N | Enum | Badge `● Pending` (nền vàng nhạt `#fef3c7`, chữ cam đậm `#b45309`). |
| **Người tạo YCPD / Phòng ban** | Text | M | N | String | Tài khoản Maker đề xuất và đơn vị công tác (vd: *Kinh doanh - Maker*). |
| **Nút [Thay đổi người PD]** | Button | C | Y | Click | Hiển thị trong Khối YCPD ở vai trò Maker. Click mở popup chọn Checker mới. |
| **CỤM NÚT TÁC VỤ CHÂN TRANG** | Button Group | M | Y | Click | Thanh công cụ nổi/chân trang chứa các tác vụ động theo trạng thái bản ghi và quyền hạn người dùng. |

---

## 2.4.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **BF25-UC03-BR01.1** | **Quy tắc thiết kế khung thông tin song song** | Khối *Thông tin chung* và Khối *Yêu cầu phê duyệt* phải được căn chỉnh song song trên cùng một hàng ngang, chiều cao cố định đúng **182px**, các dòng dữ liệu giãn cách đều **9px** và mép đáy phẳng hoàn toàn nhằm đảm bảo giao diện gọn gàng, không bị lệch khối. |
| **BF25-UC03-BR01.2** | **Quy tắc hiển thị nút tác vụ theo vai trò** | - Tài khoản Maker: Chỉ nhìn thấy các nút *Chỉnh sửa, Rút yêu cầu, Thay đổi người PD, Tạm dừng, Kích hoạt lại, Sao chép*. Tuyệt đối không hiển thị nút *Phê duyệt* hoặc *Từ chối*.<br>- Tài khoản Checker: Chỉ nhìn thấy các nút *Phê duyệt, Từ chối, Xem lịch sử*. Tuyệt đối không cho phép Checker tự ý sửa đổi dữ liệu biểu phí trực tiếp trên màn hình xem chi tiết. |
| **BF25-UC03-BR01.3** | **Tính bất biến của Audit Log** | Bảng dòng thời gian Lịch sử hoạt động (Audit Trail) là dữ liệu chỉ đọc (Immutable Data). Không một tài khoản nào (kể cả Quản trị viên hệ thống) được phép chỉnh sửa hoặc xóa bỏ các bản ghi lưu vết lịch sử kiểm toán. |

---

## 2.4.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Bản ghi không tồn tại | Bản ghi đã bị xóa bởi tài khoản khác trong cùng phiên | Critical | *“Bản ghi cấu hình phí không tồn tại hoặc đã bị xóa. Vui lòng quay lại màn hình danh sách!”* |
| **E2** | Không có quyền truy cập | Người dùng không có quyền xem chi tiết biểu phí này | Major | *“Bạn không có quyền truy cập thông tin cấu hình phí này. Vui lòng liên hệ Quản trị viên!”* |
| **E3** | Lỗi kết nối máy chủ | Không thể truy vấn chi tiết dữ liệu biểu phí từ CSDL | Major | *“Lỗi kết nối cơ sở dữ liệu khi tải thông tin chi tiết. Vui lòng thử lại sau!”* |
| **E4** | Lỗi tải dòng thời gian Audit Trail | Lỗi timeout khi truy vấn bảng `audit_logs` | Minor | *“Không thể tải danh sách lịch sử thay đổi vào lúc này. Vui lòng bấm làm mới tab Lịch sử!”* |
