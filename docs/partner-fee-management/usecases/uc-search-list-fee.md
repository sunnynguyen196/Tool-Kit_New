---
id: BF25-UC01
title: "Tìm kiếm và xem danh sách cấu hình phí Trả đối tác"
feature: partner-fee-management
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - erd: docs/partner-fee-management/srs/partner-fee-management-erd.md
  - flows: docs/partner-fee-management/srs/partner-fee-management-flows.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 2.2 BF25-UC01: Tìm kiếm và xem danh sách cấu hình phí Trả đối tác

## 2.2.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Tra cứu và xem danh sách cấu hình phí phải Trả đối tác** |
| **ID** | **BF25 - UC01** |
| **Description** | Tra cứu cấu hình phí Trả đối tác |
| **Actor** | User thuộc nhóm quyền tương ứng, Hệ thống Merchant Management |
| **Trigger** | User click button [Tìm kiếm] sau khi hoàn tất chọn các tiêu chí cần lọc hoặc nhập thông tin cấu hình phí cần tra cứu. |
| **Pre-Condition** | - Tài khoản người dùng đã được tạo.<br>- Người dùng đã đăng nhập vào hệ thống.<br>- Người dùng có quyền truy cập chức năng xem DS phí thu và tra cứu cấu hình phí Trả đối tác.<br>- Dữ liệu giao dịch đã được hệ thống ghi nhận trong cơ sở dữ liệu. |
| **Post-Condition** | User tìm kiếm, tra cứu thành công (các) mã phí phải thu theo các tiêu chí mong muốn |
| **Basic flow** | 1. Click [Quản lý cấu hình phí] >> click [Phí Trả đối tác] ở thanh Navigation bên trái. Hệ thống hiển thị Danh sách cấu hình phí Trả đối tác tương ứng.<br>2. Chọn nút [Tìm kiếm] ở góc trên bên phải $\rightarrow$ Màn hình show ra các trường điều kiện lọc dữ liệu, cho phép user lựa chọn giá trị để tra cứu.<br>3. Lựa chọn giá trị tại các trường thông tin (không bắt buộc trường nào cũng cần lựa chọn giá trị khác giá trị mặc định)<br>4. Click nút [Tìm kiếm]<br>5. Hệ thống kiểm tra tính hợp lệ thông tin, thực hiện truy vấn dữ liệu từ CSDL theo điều kiện lọc.<br>6. Hệ thống hiển thị danh sách cấu hình phí Trả đối tác theo điều kiện lọc ở trên. |
| **Alternative flow** | - **A1**: User không nhập tiêu chí lọc $\rightarrow$ hệ thống hiển thị tất cả cấu hình phí theo giá trị lọc mặc định.<br>- **A2**: Người dùng chọn [Xóa] $\rightarrow$ Hệ thống xóa các điều kiện lọc, trả giao diện về trạng thái ban đầu với tất cả cấu hình phí theo giá trị lọc ban đầu.<br>- **A3**: Người dùng chọn [Xuất tệp] $\rightarrow$ Hệ thống xuất danh sách tổng hợp giao dịch theo các trường tin tương ứng tại bảng danh sách giao dịch (định dạng file: PDF, Excel) *(Chi tiết xem BF25-UC02)*.<br>- **A4**: User chọn tiêu chí lọc $\rightarrow$ Hệ thống hiển thị không có kết quả phù hợp với tiêu chí lọc mà user đã chọn. |
| **Exception flow** | - **E1**: Lỗi kết nối với cơ sở dữ liệu.<br>- **E2**: Người dùng không có quyền truy cập.<br>- **E3**: Lỗi kết nối mạng internet.<br>- **E4**: Người dùng nhập nội dung tìm kiếm khác Mã cấu hình, tên cấu hình, mô tả. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung tìm kiếm và xem DS cấu hình phí Trả đối tác](#223-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Màn hình hiển thị kết quả tra cứu trong vòng không quá 05 giây. |

---

## 2.2.2 Giao diện

### Màn hình Wireframe liên kết:
* **BF25-UC01-WF01.1**: Danh sách tra cứu — Tab Tất cả (Figma Frame ID: `4020:50223`)
* **BF25-UC01-WF01.2**: Danh sách tra cứu — Tab Chờ phê duyệt (Figma Frame ID: `4020:51879`)
* **BF25-UC01-WF01.3**: Danh sách tra cứu — Tab Đang hoạt động (Figma Frame ID: `4020:51051`)

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Quản lý cấu hình phí Trả đối tác** | Label | M | N | - | Tiêu đề chính của màn hình danh sách. |
| **ĐIỀU KIỆN TÌM KIẾM / LỌC** | | | | | |
| **Thời gian hiệu lực** | Date time | C | Y | Date time | - Lựa chọn từ ngày đến ngày.<br>- Tiêu chí tìm kiếm/ lọc: thời gian golive của CHP TRẢ ĐỐI TÁC.<br>- Khoảng thời gian tìm kiếm tối đa: 365 ngày.<br>- Giá trị lọc: Hôm nay, hôm qua, 7 ngày trước, 30 ngày trước, Tháng hiện tại, Tháng trước, Tùy chỉnh.<br>- Giá trị mặc định: Ngày đầu tiên của tháng hiện tại đến ngày hiện tại. |
| **Loại phí** | Dropdown list | O | Y | Multiple selection | - Giá trị mặc định = *"Tất cả"*.<br>- List danh sách loại phí thu sắp xếp hiển thị theo thứ tự abc.<br>- Loại phí bao gồm các giá trị sau: Phí sử dụng dịch vụ, Phí thanh toán, Phí xử lý giao dịch, Phí dịch vụ gia tăng. |
| **Trạng thái** | Dropdown list | O | Y | Multiple selection | - Giá trị mặc định = *"NEW, ACTIVE, INACTIVE"*.<br>- List danh sách trạng thái CHP sắp xếp hiển thị theo thứ tự abc.<br>- Trạng thái gồm các giá trị sau: New, Active, Inactive, Draft. |
| **Kỳ trả phí** | Dropdown list | O | Y | Multiple selection | - Giá trị mặc định = *"Tất cả"*.<br>- List danh sách kỳ trả phí sắp xếp hiển thị theo thứ tự abc.<br>- Kỳ trả phí gồm các giá trị sau: Ngày, Tháng, Năm, Quý. |
| **Tiến trình phê duyệt** | Dropdown list | O | Y | Multiple selection | - Giá trị mặc định = *"Tất cả"*.<br>- List danh sách tiến trình sắp xếp hiển thị theo thứ tự abc.<br>- Tiến trình phê duyệt bao gồm: Chờ Checker phê duyệt, Duyệt hiệu lực ngay, Duyệt chờ ngày hiệu lực, Từ chối hồ sơ, Hủy yêu cầu. |
| **Người tạo** | Dropdown list | O | Y | Multiple selection | - Giá trị mặc định = *"Tất cả"*.<br>- List danh sách người tạo (thêm mới cấu hình phí). |
| **Thời gian khởi tạo** | Date time | C | Y | Date time | - Lựa chọn từ ngày đến ngày.<br>- Tiêu chí tìm kiếm/ lọc: thời gian ghi nhận khởi tạo CHP Trả đối tác.<br>- Khoảng thời gian tìm kiếm tối đa: 365 ngày.<br>- Giá trị lọc: Hôm nay, hôm qua, 7 ngày trước, 30 ngày trước, Tháng hiện tại, Tháng trước, Tùy chỉnh.<br>- Giá trị mặc định: Ngày đầu tiên của tháng hiện tại đến ngày hiện tại. |
| **Người cập nhật** | Dropdown list | O | Y | Multiple selection | - Giá trị mặc định = *"Tất cả"*.<br>- List danh sách người cập nhật (cập nhật thông tin cấu hình trên Quản lý CHP Trả đối tác). |
| **Thời gian cập nhật** | Date time | C | Y | Date time | - Lựa chọn từ ngày đến ngày.<br>- Tiêu chí tìm kiếm/ lọc: thời gian ghi nhận cập nhật CHP Trả đối tác.<br>- Khoảng thời gian tìm kiếm tối đa: 365 ngày.<br>- Giá trị lọc: Hôm nay, hôm qua, 7 ngày trước, 30 ngày trước, Tháng hiện tại, Tháng trước, Tùy chỉnh.<br>- Giá trị mặc định: Ngày đầu tiên của tháng hiện tại đến ngày hiện tại. |
| **Quicksearch** | Search bar | O | Y | Text $\le 100$ chars | Cho phép tìm nhanh theo Mã cấu hình, Tên cấu hình hoặc Mô tả. Nhấn Enter để thực hiện tìm kiếm. |
| **BUTTON CHỨC NĂNG** | | | | | |
| **Nút [Xóa]** | Button | O | Y | Click | Click *"Xóa"*: Hệ thống tự động clear các điều kiện tìm kiếm về giá trị mặc định đã định nghĩa. |
| **Nút [Tìm kiếm]** | Button | O | Y | Click | Click *"Tìm kiếm"*: Hệ thống thực hiện truy vấn dữ liệu danh sách CHP và yêu cầu xử lý theo điều kiện tìm kiếm và trả kết quả hiển thị tại Gridview tương ứng. |
| **Nút [Xuất tệp]** | Button | O | Y | Click | Mở menu lựa chọn định dạng file xuất (Excel/PDF). Chi tiết mô tả phần BF25-UC02. |
| **Nút [Tùy chỉnh]** | Button | O | Y | Click | Cho phép chọn list trường tin hiển thị trên Grid view. Tất cả các trường tin được sắp xếp và hiển thị theo bảng định nghĩa: [2.2.5 Danh sách trường tin tùy chỉnh](#225-danh-sách-trường-tin-tùy-chỉnh). |
| **BẢNG DANH SÁCH DỮ LIỆU** | | | | | |
| **Chi tiết cột dữ liệu trên danh sách** | Grid Table | M | N | Readonly / Link | Tham chiếu mục [2.2.5 Danh sách trường tin tùy chỉnh](#225-danh-sách-trường-tin-tùy-chỉnh). Đã loại bỏ cột Trạng thái YCPD trên bảng danh sách chính theo quy chuẩn mới. Mã phí hiển thị dạng hyperlink xanh điều hướng đến màn hình Xem chi tiết. |

---

## 2.2.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **BF25-UC01-BR01.1** | **Quy tắc hiển thị danh sách CHP** | - Chỉ hiển thị đối với người dùng được cấp quyền tương ứng.<br>- **Danh sách mặc định được hiển thị ban đầu**:<br>  + CHP có trạng thái: `NEW`, `ACTIVE`, `INACTIVE`.<br>  + Số lượng bản ghi hiển thị mặc định là **20 dòng/trang**, có thể tùy chọn thay đổi: `5 / 10 / 20 / 30 / 50 / 100 / 200 / 500` bản ghi/trang.<br>  + Giá trị tại cột Thời gian hiệu lực của CHP = Thời gian golive của CHP.<br>- **Danh sách cột thông tin mặc định bao gồm**:<br>  + *Trường hợp Không có dữ liệu*: Hệ thống hiển thị danh sách rỗng và thông báo không tìm thấy dữ liệu.<br>  + *Trường hợp Có dữ liệu*: Hệ thống hiển thị danh sách các cột thông tin tham chiếu tại [2.2.5 Danh sách trường tin tùy chỉnh](#225-danh-sách-trường-tin-tùy-chỉnh). |
| **BF25-UC01-BR01.2** | **Quy tắc điều hướng theo Tab trạng thái** | - Kích hoạt Tab Tất cả: Hiển thị toàn bộ các bản ghi không phân biệt trạng thái.<br>- Kích hoạt Tab Đang hoạt động: Tự động gắn cờ lọc `status = ACTIVE`.<br>- Kích hoạt Tab Chờ phê duyệt: Tự động gắn cờ lọc `status = PENDING`. |
| **BF25-UC01-BR01.3** | **Ràng buộc khoảng thời gian tra cứu** | Khoảng cách giữa *Từ ngày* và *Đến ngày* không được vượt quá 365 ngày. *Từ ngày* phải luôn nhỏ hơn hoặc bằng *Đến ngày*. Nếu vi phạm, hệ thống hiển thị viền đỏ và thông báo lỗi inline `E-partner-fee-management-004`. |

---

## 2.2.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Lỗi kết nối cơ sở dữ liệu | Mất kết nối tới cơ sở dữ liệu khi gửi truy vấn lọc danh sách | Critical | *“Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau hoặc liên hệ Quản trị viên!”* |
| **E2** | Không có quyền truy cập | Người dùng không thuộc nhóm quyền tra cứu cấu hình phí | Major | *“Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ Quản trị viên để được cấp quyền!”* |
| **E3** | Lỗi kết nối mạng internet | Mất kết nối internet hoặc API Timeout $> 10$s | Major | *“Lỗi kết nối mạng internet. Vui lòng kiểm tra đường truyền và thử lại!”* |
| **E4** | Nội dung tìm kiếm không hợp lệ | Người dùng nhập nội dung tìm kiếm chứa ký tự đặc biệt nguy hiểm (SQL Injection, XSS) | Minor | *“Nội dung tìm kiếm chứa ký tự không hợp lệ. Vui lòng chỉ nhập chữ, số và dấu gạch ngang!”* |
| **E-partner-fee-004** | Ngày áp dụng không hợp lệ | Maker chọn Từ ngày lớn hơn Đến ngày, hoặc khoảng cách $> 365$ ngày | Major | *“Thời gian áp dụng từ ngày phải nhỏ hơn hoặc bằng đến ngày và khoảng cách không quá 365 ngày.”* |
| **E-partner-fee-010** | Không tìm thấy kết quả | Không có bản ghi nào trong hệ thống thỏa mãn điều kiện lọc | Info | *“Không tìm thấy kết quả phù hợp với điều kiện tìm kiếm. Vui lòng thử lại với tiêu chí khác!”* |

---

## 2.2.5 Danh sách trường tin tùy chỉnh

- **Lưu ý**: Dữ liệu được lấy theo bảng `TBL_XXXX` làm gốc, nếu thiếu thông tin sẽ join với bảng `TBL_YYYY`.
- User được phép **“Tùy chỉnh”** cột hiển thị.
- Hệ thống lưu thông tin tùy chỉnh theo từng user sau:

| STT | Tên trường tin | Lựa chọn mặc định | Giá trị dữ liệu |
|:---:|---|:---:|---|
| **1** | **STT** | **Y** | Sắp xếp theo thứ tự kết quả trả về. |
| **2** | **Mã cấu hình** | **Y** | Là mã định danh của CHP thu ĐVCNTT / Trả đối tác tương ứng. |
| **3** | **Tên cấu hình** | **Y** | Là tên cấu hình phí Trả đối tác tương ứng. |
| **4** | **Loại phí** | **Y** | Là loại phí của CHP Trả đối tác tương ứng. |
| **5** | **Trạng thái** | **Y** | Là trạng thái của CHP Trả đối tác tương ứng. |
| **6** | **Kỳ trả phí** | **Y** | Là kỳ trả phí của CHP Trả đối tác tương ứng. |
| **7** | **Số lượng MC đang gắn** | **Y** | Là số lượng CHP TRẢ ĐỐI TÁC có gắn với CHP Trả đối tác. |
| **8** | **Thời gian hiệu lực** | **Y** | Thời điểm trạng thái của CHP TRẢ ĐỐI TÁC là Ready. |
| **9** | **Thời gian khởi tạo** | **Y** | Thời điểm khởi tạo thông tin Cấu hình phí Trả đối tác trên Onboard MC. |
| **10** | **Yêu cầu phê duyệt** | **N** | Phân loại yêu cầu phê duyệt thông tin phí Trả đối tác. |
| **11** | **Trạng thái phê duyệt** | **N** | Là trạng thái phê duyệt cuối cùng tương ứng với Loại yêu cầu phê duyệt. |
| **12** | **Mã yêu cầu** | **N** | Mã yêu cầu phê duyệt CHP Trả đối tác. |
| **13** | **Ghi chú** | **N** | Thông tin mô tả chi tiết cấu hình. |
| **14** | **Đồng tiền giao dịch** | **N** | Loại tiền tệ được sử dụng khi giao dịch (VND, USD, ...). |
