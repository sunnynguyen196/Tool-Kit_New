---
id: QR-UC01
title: "Tìm kiếm và xem danh sách cấu hình phí đối tác QRGW"
feature: partner-fee-management
module: QRGW
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - erd: docs/partner-fee-management/srs/partner-fee-management-erd.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 3.2 QR-UC01: Tìm kiếm và xem danh sách cấu hình phí đối tác QRGW

## 3.2.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Tra cứu và xem danh sách cấu hình phí đối tác Cổng QR Gateway (QRGW)** |
| **ID** | **QR - UC01** |
| **Description** | Cho phép người dùng tra cứu danh sách các biểu phí trả cho ngân hàng thụ hưởng và nhà cung cấp kênh kết nối QR Gateway (BIDV, Vietcombank, MBBank, Napas VietQR...) theo bộ lọc tiêu chí chuyên biệt cho QRGW, chuyển đổi giữa 3 tab trạng thái và phân trang kết quả. |
| **Actor** | Maker QRGW, Checker QRGW, Cán bộ Đối soát QR, Kế toán chi phí, Hệ thống Merchant Management |
| **Trigger** | Người dùng click menu điều hướng: **`Quản lý cấu hình phí` > `Phí đối tác QRGW`** trên thanh Navigation bên trái; hoặc click nút [Tìm kiếm]. |
| **Pre-Condition** | - Tài khoản người dùng đã được tạo và cấp quyền tra cứu phân hệ QRGW.<br>- Người dùng đã đăng nhập vào hệ thống EPAY Portal.<br>- Dữ liệu biểu phí QRGW đã được ghi nhận trong cơ sở dữ liệu. |
| **Post-Condition** | Hệ thống hiển thị danh sách các cấu hình phí QRGW thỏa mãn đúng tiêu chí lọc và tab trạng thái kích hoạt. |
| **Basic flow** | 1. Click **[Quản lý cấu hình phí]** >> click **[Phí đối tác QRGW]** ở thanh Navigation bên trái. Hệ thống hiển thị Danh sách cấu hình phí QRGW tương ứng.<br>2. Chọn nút **[Tìm kiếm]** ở góc trên bên phải $\rightarrow$ Màn hình show ra các trường điều kiện lọc dữ liệu dành riêng cho QRGW, cho phép user lựa chọn giá trị để tra cứu.<br>3. Lựa chọn giá trị tại các trường thông tin: Đối tác/Ngân hàng (BIDV QRGW, VCB QRGW, Napas VietQR...), Loại dịch vụ QRGW (Thu hộ Pay-In / Chi hộ Pay-Out), Loại QR (QR tĩnh / QR động), Kỳ trả phí, Trạng thái.<br>4. Click nút **[Tìm kiếm]**.<br>5. Hệ thống kiểm tra tính hợp lệ thông tin, thực hiện truy vấn dữ liệu từ CSDL theo điều kiện lọc.<br>6. Hệ thống hiển thị danh sách cấu hình phí QRGW theo điều kiện lọc ở trên. |
| **Alternative flow** | - **A1**: Bấm nút **[Xóa]** $\rightarrow$ Khôi phục các tiêu chí lọc về giá trị mặc định.<br>- **A2**: Click chuyển sang **Tab Đang hoạt động** $\rightarrow$ Lọc bản ghi QRGW có `status = ACTIVE`.<br>- **A3**: Click chuyển sang **Tab Chờ phê duyệt** $\rightarrow$ Lọc bản ghi QRGW có `status = PENDING`.<br>- **A4**: Không tìm thấy bản ghi $\rightarrow$ Hiển thị bảng rỗng kèm thông báo không tìm thấy kết quả phù hợp. |
| **Exception flow** | - **E1**: Lỗi kết nối cơ sở dữ liệu hoặc API Timeout $> 10$s.<br>- **E2**: Người dùng chọn thời gian áp dụng Từ ngày lớn hơn Đến ngày $\rightarrow$ Báo lỗi inline `E-004`. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung tra cứu cấu hình phí QRGW](#323-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Hiển thị kết quả tra cứu trong vòng không quá 03 giây. |

---

## 3.2.2 Giao diện

### Màn hình Wireframe liên kết:
* **QR-UC01-WF01.1**: Danh sách QRGW — Tab Tất cả (Figma Frame ID: `4020:50223`)
* **QR-UC01-WF01.2**: Danh sách QRGW — Tab Đang hoạt động (Figma Frame ID: `4020:51051`)
* **QR-UC01-WF01.3**: Danh sách QRGW — Tab Chờ phê duyệt (Figma Frame ID: `4020:51879`)

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Tiêu đề phân hệ** | Label | M | N | - | Hiển thị: *“Quản lý cấu hình phí trả đối tác — Cổng QRGW VietQR”*. |
| **Nguồn dữ liệu** | Dropdown | M | N | Fixed = "QRGW" | Cố định giá trị `QRGW` khi truy cập qua phân hệ QRGW. |
| **Thời gian hiệu lực** | Date time | C | Y | Date time | Lựa chọn từ ngày đến ngày (tối đa 365 ngày). Mặc định: Ngày đầu tháng hiện tại đến ngày hiện tại. |
| **Loại dịch vụ QR** | Dropdown list | O | Y | Multiple selection | Mặc định = *“Tất cả”*. Danh mục: Thu hộ VietQR (Pay-In), Chi hộ VietQR (Pay-Out). |
| **Loại mã QR** | Dropdown list | O | Y | Multiple selection | Mặc định = *“Tất cả”*. Danh mục: QR Tĩnh (Static), QR Động (Dynamic). |
| **Trạng thái** | Dropdown list | O | Y | Multiple selection | Mặc định = *“NEW, ACTIVE, INACTIVE”*. Các giá trị: New, Active, Inactive, Draft. |
| **Kỳ trả phí** | Dropdown list | O | Y | Multiple selection | Mặc định = *“Tất cả”*. Các giá trị: Ngày, Tháng, Năm, Quý. |
| **Tiến trình phê duyệt** | Dropdown list | O | Y | Multiple selection | Mặc định = *“Tất cả”*. Giá trị: Chờ Checker phê duyệt, Duyệt hiệu lực ngay, Duyệt chờ ngày hiệu lực, Từ chối hồ sơ, Hủy yêu cầu. |
| **Quicksearch** | Search bar | O | Y | Text $\le 100$ chars | Tìm nhanh theo Mã cấu hình, Tên cấu hình hoặc Mô tả. Nhấn Enter để tìm. |
| **Nút [Xóa]** | Button | O | Y | Click | Clear các điều kiện tìm kiếm về giá trị mặc định. |
| **Nút [Tìm kiếm]** | Button | O | Y | Click | Thực hiện truy vấn danh sách CHP QRGW theo điều kiện lọc. |
| **Nút [Xuất tệp]** | Button | O | Y | Click | Mở menu lựa chọn định dạng file xuất (Excel/PDF). |
| **Nút [Tùy chỉnh]** | Button | O | Y | Click | Mở danh sách chọn trường tin hiển thị trên Gridview theo mục 3.2.5. |
| **Chi tiết cột dữ liệu** | Grid Table | M | N | Readonly / Link | Tham chiếu mục [3.2.5 Danh sách trường tin tùy chỉnh](#325-danh-sách-trường-tin-tùy-chỉnh). Mã phí là hyperlink mở màn hình Chi tiết. |

---

## 3.2.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **QR-UC01-BR01.1** | **Quy tắc hiển thị danh sách CHP QRGW** | - Chỉ hiển thị đối với người dùng được cấp quyền truy cập QRGW.<br>- Mặc định hiển thị các cấu hình có trạng thái: `NEW`, `ACTIVE`, `INACTIVE`.<br>- Phân trang mặc định là **20 dòng/trang**, tùy chọn: `5 / 10 / 20 / 30 / 50 / 100 / 200 / 500`. |
| **QR-UC01-BR01.2** | **Quy tắc điều hướng theo Tab trạng thái** | - Tab Tất cả: Hiển thị toàn bộ bản ghi QRGW.<br>- Tab Đang hoạt động: Lọc bản ghi QRGW có `status = ACTIVE`.<br>- Tab Chờ phê duyệt: Lọc bản ghi QRGW có `status = PENDING`. |
| **QR-UC01-BR01.3** | **Ràng buộc khoảng thời gian tra cứu** | Khoảng cách giữa Từ ngày và Đến ngày không vượt quá 365 ngày. Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |

---

## 3.2.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Lỗi kết nối CSDL | Mất kết nối CSDL khi gửi truy vấn lọc danh sách QRGW | Critical | *“Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau hoặc liên hệ Quản trị viên!”* |
| **E2** | Không có quyền truy cập | Người dùng không thuộc nhóm quyền tra cứu cấu hình phí QRGW | Major | *“Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ Quản trị viên để được cấp quyền!”* |
| **E3** | Lỗi kết nối internet | Mất kết nối mạng hoặc API Timeout $> 10$s | Major | *“Lỗi kết nối mạng internet. Vui lòng kiểm tra đường truyền và thử lại!”* |
| **E-004** | Ngày áp dụng không hợp lệ | Maker chọn Từ ngày lớn hơn Đến ngày, hoặc khoảng cách $> 365$ ngày | Major | *“Thời gian áp dụng từ ngày phải nhỏ hơn hoặc bằng đến ngày và khoảng cách không quá 365 ngày.”* |
| **E-010** | Không tìm thấy kết quả | Không có bản ghi nào trong hệ thống thỏa mãn điều kiện lọc | Info | *“Không tìm thấy kết quả phù hợp với điều kiện tìm kiếm. Vui lòng thử lại với tiêu chí khác!”* |

---

## 3.2.5 Danh sách trường tin tùy chỉnh

| STT | Tên trường tin | Lựa chọn mặc định | Giá trị dữ liệu |
|:---:|---|:---:|---|
| **1** | **STT** | **Y** | Sắp xếp theo thứ tự kết quả trả về. |
| **2** | **Mã cấu hình** | **Y** | Mã định danh biểu phí QRGW (vd: `QR_FE_NAPAS_001`). |
| **3** | **Tên cấu hình** | **Y** | Tên cấu hình phí QRGW tương ứng. |
| **4** | **Loại phí** | **Y** | Loại phí của CHP QRGW (Phí dịch vụ QR, Phí xử lý GD). |
| **5** | **Trạng thái** | **Y** | Trạng thái của CHP QRGW (`Active`, `Pending`, `Inactive`, `New`, `Draft`). |
| **6** | **Kỳ trả phí** | **Y** | Kỳ trả phí của CHP QRGW. |
| **7** | **Số lượng MC đang gắn** | **Y** | Số lượng merchant đang áp dụng cấu hình phí QR này. |
| **8** | **Thời gian hiệu lực** | **Y** | Thời điểm bắt đầu có hiệu lực tính cước. |
| **9** | **Thời gian khởi tạo** | **Y** | Thời điểm tạo bản ghi cấu hình phí QRGW. |
| **10** | **Yêu cầu phê duyệt** | **N** | Phân loại yêu cầu phê duyệt thông tin phí QRGW. |
| **11** | **Trạng thái phê duyệt** | **N** | Trạng thái phê duyệt tương ứng với YCPD. |
| **12** | **Mã yêu cầu** | **N** | Mã yêu cầu phê duyệt liên kết. |
| **13** | **Ghi chú** | **N** | Thông tin mô tả chi tiết cấu hình. |
| **14** | **Đồng tiền giao dịch** | **N** | Loại tiền tệ sử dụng khi giao dịch (VND). |
