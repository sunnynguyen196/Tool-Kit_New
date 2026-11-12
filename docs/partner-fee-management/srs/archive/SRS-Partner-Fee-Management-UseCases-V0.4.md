---
type: srs-usecases-full
feature: partner-fee-management
title: "Tài liệu Phân tích Yêu cầu Hệ thống (SRS) — Chi tiết Use Cases & Đặc tả Màn hình"
version: "V0.4"
code: "EPAY-QT.CG.02_BM.33"
security: "Lưu hành nội bộ"
updated: 2026-11-07
links:
  - srs_spec: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - business_rules: docs/partner-fee-management/srs/2.6.5-yeu-cau-nghiep-vu-chung.md
  - excel: Quy_Tac_Nghiep_Vu_Cau_Hinh_Phi_Tra_Doi_Tac.xlsx
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# TÀI LIỆU PHÂN TÍCH YÊU CẦU HỆ THỐNG (SRS)
## Phân hệ: Quản lý Cấu hình Phí Trả Đối tác (Partner Fee Management)
### Hệ thống: EPAY Portal 2.0 · Mã biểu mẫu: EPAY-QT.CG.02_BM.33 · Phiên bản: V0.4

---

# MỤC LỤC CHI TIẾT CÁC USE CASE

- [2.1 Tổng quan Danh mục Use Case & Traceability Matrix](#21-tổng-quan-danh-mục-use-case)
  - [2.1.7 Danh sách các loại yêu cầu phê duyệt](#217-danh-sách-các-loại-yêu-cầu-phê-duyệt)
- [2.2 BF25-UC01: Tìm kiếm và xem danh sách cấu hình phí Trả đối tác](#22-bf25-uc01-tìm-kiếm-và-xem-danh-sách-cấu-hình-phí-trả-đối-tác)
  - [2.2.1 Use case](#221-use-case)
  - [2.2.2 Giao diện](#222-giao-diện)
  - [2.2.3 Yêu cầu nghiệp vụ chung](#223-yêu-cầu-nghiệp-vụ-chung)
  - [2.2.4 Bảng mã lỗi](#224-bảng-mã-lỗi)
  - [2.2.5 Danh sách trường tin tùy chỉnh](#225-danh-sách-trường-tin-tùy-chỉnh)
- [2.3 BF25-UC02: Xuất tệp dữ liệu danh sách cấu hình phí Trả đối tác](#23-bf25-uc02-xuất-tệp-dữ-liệu-danh-sách-cấu-hình-phí-trả-đối-tác)
  - [2.3.1 Use case](#231-use-case)
  - [2.3.2 Giao diện](#232-giao-diện)
  - [2.3.3 Yêu cầu nghiệp vụ chung](#233-yêu-cầu-nghiệp-vụ-chung)
- [2.4 BF25-UC03: Xem chi tiết cấu hình phí và Lịch sử thay đổi (Audit Trail)](#24-bf25-uc03-xem-chi-tiết-cấu-hình-phí-và-lịch-sử-thay-đổi-audit-trail)
  - [2.4.1 Use case](#241-use-case)
  - [2.4.2 Giao diện](#242-giao-diện)
  - [2.4.3 Yêu cầu nghiệp vụ chung](#243-yêu-cầu-nghiệp-vụ-chung)
- [2.5 BF25-UC04: Thêm mới cấu hình phí Trả đối tác (4 nhóm phí & Simulator)](#25-bf25-uc04-thêm-mới-cấu-hình-phí-trả-đối-tác-4-nhóm-phí--simulator)
  - [2.5.1 Use case](#251-use-case)
  - [2.5.2 Giao diện](#252-giao-diện)
  - [2.5.3 Yêu cầu nghiệp vụ chung](#253-yêu-cầu-nghiệp-vụ-chung)
- [2.6 BF25-UC05: Xử lý thông tin hồ sơ & Phê duyệt cấu hình phí Trả đối tác](#26-bf25-uc05-xử-lý-thông-tin-hồ-sơ--phê-duyệt-cấu-hình-phí-trả-đối-tác)
  - [2.6.1 Use case](#261-use-case)
  - [2.6.2 Giao diện](#262-giao-diện)
  - [2.6.3 Tiến trình xử lý Maker - Checker](#263-tiến-trình-xử-lý-maker---checker)
  - [2.6.4 Quy tắc chuyển trạng thái](#264-quy-tắc-chuyển-trạng-thái)
  - [2.6.5 Yêu cầu nghiệp vụ chung (Ma trận Vòng đời 11 Cột & Mapping YCPD)](#265-yêu-cầu-nghiệp-vụ-chung)
- [2.7 BF25-UC06: Xóa bản ghi cấu hình phí Trả đối tác](#27-bf25-uc06-xóa-bản-ghi-cấu-hình-phí-trả-đối-tác)
  - [2.7.1 Use case](#271-use-case)
  - [2.7.2 Giao diện](#272-giao-diện)
  - [2.7.3 Yêu cầu nghiệp vụ chung](#273-yêu-cầu-nghiệp-vụ-chung)

---

## 2.1 Tổng quan Danh mục Use Case

| Mã UC | Tên Use Case | Actor chính | Màn hình Figma liên kết | Mức độ ưu tiên |
|---|---|---|---|:---:|
| **BF25-UC01** | Tìm kiếm và xem danh sách cấu hình phí Trả đối tác | Maker, Checker, Đối soát | `4020:50223`, `4020:51051`, `4020:51879` | P0 |
| **BF25-UC02** | Xuất tệp dữ liệu danh sách cấu hình phí Trả đối tác | Maker, Checker, Kế toán | `4020:50223` (Menu [Xuất tệp ▼]) | P1 |
| **BF25-UC03** | Xem chi tiết cấu hình phí và Lịch sử thay đổi (Audit Trail) | Maker, Checker, Kiểm toán | `4020:43846`, `4020:44666`, `4020:47172` | P0 |
| **BF25-UC04** | Thêm mới cấu hình phí Trả đối tác (4 nhóm phí & Simulator) | Maker | `4022:53508` – `4022:58264`, `4018:36498` | P0 |
| **BF25-UC05** | Xử lý thông tin hồ sơ & Phê duyệt cấu hình phí Trả đối tác | Maker, Checker, Quản lý | `4020:47923`, `4020:48856`, `4020:36844` | P0 |
| **BF25-UC06** | Xóa bản ghi cấu hình phí Trả đối tác | Maker | `4020:50006`, `4020:50223` (Row action) | P1 |

---

### 2.1.7 Danh sách các loại yêu cầu phê duyệt

Bảng định danh chuẩn các loại Yêu cầu Phê duyệt (YCPD) được hệ thống tự động khởi tạo theo từng trạng thái và hành động thao tác của Maker:

| Trạng thái hiện tại | Ý nghĩa | Hành động thao tác | Loại yêu cầu phê duyệt được tạo ra |
|---|---|---|---|
| **New** | Maker muốn gửi yêu cầu gửi phê duyệt CHP | Gửi yêu cầu phê duyệt | **Duyệt mở tạo hồ sơ CHP Trả đối tác** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt cập nhật CHP | Gửi phê duyệt cập nhật thông tin | **Duyệt cập nhật hồ sơ CHP Trả đối tác** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt tạm dừng CHP | Gửi yêu cầu tạm dừng | **Duyệt tạm dừng hồ sơ CHP Trả đối tác** |
| **Inactive** | Maker muốn gửi yêu cầu gửi phê duyệt mở kích hoạt CHP | Gửi yêu cầu mở kích hoạt | **Duyệt mở kích hoạt CHP Trả đối tác** |

---

## 2.2 BF25-UC01: Tìm kiếm và xem danh sách cấu hình phí Trả đối tác

### 2.2.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Tra cứu và xem danh sách cấu hình phí phải Trả đối tác** |
| **ID** | **BF25 - UC01** |
| **Description** | Tra cứu cấu hình phí Trả đối tác theo các tiêu chí tìm kiếm nâng cao, chuyển đổi giữa các tab trạng thái và phân trang kết quả. |
| **Actor** | User thuộc nhóm quyền tương ứng (Maker, Checker, Quản trị viên, Cán bộ Đối soát), Hệ thống Merchant Management |
| **Trigger** | User click button **[Tìm kiếm]** sau khi hoàn tất chọn các tiêu chí cần lọc hoặc nhập thông tin cấu hình phí cần tra cứu; hoặc khi click menu điều hướng. |
| **Pre-Condition** | - Tài khoản người dùng đã được tạo.<br>- Người dùng đã đăng nhập vào hệ thống EPAY Portal.<br>- Người dùng có quyền truy cập chức năng xem DS phí thu và tra cứu cấu hình phí Trả đối tác.<br>- Dữ liệu giao dịch đã được hệ thống ghi nhận trong cơ sở dữ liệu. |
| **Post-Condition** | User tìm kiếm, tra cứu thành công (các) mã phí phải thu theo các tiêu chí mong muốn. |
| **Basic flow** | 1. Click **[Quản lý cấu hình phí]** >> click **[Phí Trả đối tác]** ở thanh Navigation bên trái. Hệ thống hiển thị Danh sách cấu hình phí Trả đối tác tương ứng.<br>2. Chọn nút **[Tìm kiếm]** ở góc trên bên phải $\rightarrow$ Màn hình show ra các trường điều kiện lọc dữ liệu, cho phép user lựa chọn giá trị để tra cứu.<br>3. Lựa chọn giá trị tại các trường thông tin (không bắt buộc trường nào cũng cần lựa chọn giá trị khác giá trị mặc định).<br>4. Click nút **[Tìm kiếm]**.<br>5. Hệ thống kiểm tra tính hợp lệ thông tin, thực hiện truy vấn dữ liệu từ CSDL theo điều kiện lọc.<br>6. Hệ thống hiển thị danh sách cấu hình phí Trả đối tác theo điều kiện lọc ở trên. |
| **Alternative flow** | - **A1**: User không nhập tiêu chí lọc $\rightarrow$ Hệ thống hiển thị tất cả cấu hình phí theo giá trị lọc mặc định.<br>- **A2**: Người dùng chọn **[Xóa]** $\rightarrow$ Hệ thống xóa các điều kiện lọc, trả giao diện về trạng thái ban đầu với tất cả cấu hình phí theo giá trị lọc ban đầu.<br>- **A3**: Người dùng chọn **[Xuất tệp]** $\rightarrow$ Hệ thống xuất danh sách tổng hợp giao dịch theo các trường tin tương ứng tại bảng danh sách giao dịch (định dạng file: PDF, Excel) *(Chi tiết xem BF25-UC02)*.<br>- **A4**: User chọn tiêu chí lọc $\rightarrow$ Hệ thống hiển thị không có kết quả phù hợp với tiêu chí lọc mà user đã chọn (*Hiển thị bảng rỗng kèm thông báo Không tìm thấy dữ liệu*). |
| **Exception flow** | - **E1**: Lỗi kết nối với cơ sở dữ liệu.<br>- **E2**: Người dùng không có quyền truy cập chức năng.<br>- **E3**: Lỗi kết nối mạng internet.<br>- **E4**: Người dùng nhập nội dung tìm kiếm khác Mã cấu hình, tên cấu hình, mô tả. |
| **Business Rules** | Tham chiếu mục **2.2.3: Yêu cầu nghiệp vụ chung tìm kiếm và xem DS cấu hình phí Trả đối tác**. |
| **Non-functional requirement** | Màn hình hiển thị kết quả tra cứu trong vòng không quá **05 giây**. |

---

### 2.2.2 Giao diện

#### Màn hình Wireframe liên kết:
* **BF25-UC01-WF01.1**: Danh sách tra cứu — Tab Tất cả (Figma Frame ID: `4020:50223`)
* **BF25-UC01-WF01.2**: Danh sách tra cứu — Tab Chờ phê duyệt (Figma Frame ID: `4020:51879`)
* **BF25-UC01-WF01.3**: Danh sách tra cứu — Tab Đang hoạt động (Figma Frame ID: `4020:51051`)

#### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

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

### 2.2.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **BF25-UC01-BR01.1** | **Quy tắc hiển thị danh sách CHP** | - Chỉ hiển thị đối với người dùng được cấp quyền tương ứng.<br>- **Danh sách mặc định được hiển thị ban đầu**:<br>  + CHP có trạng thái: `NEW`, `ACTIVE`, `INACTIVE`.<br>  + Số lượng bản ghi hiển thị mặc định là **20 dòng/trang**, có thể tùy chọn thay đổi: `5 / 10 / 20 / 30 / 50 / 100 / 200 / 500` bản ghi/trang.<br>  + Giá trị tại cột Thời gian hiệu lực của CHP = Thời gian golive của CHP.<br>- **Danh sách cột thông tin mặc định bao gồm**:<br>  + *Trường hợp Không có dữ liệu*: Hệ thống hiển thị danh sách rỗng và thông báo không tìm thấy dữ liệu.<br>  + *Trường hợp Có dữ liệu*: Hệ thống hiển thị danh sách các cột thông tin tham chiếu tại [2.2.5 Danh sách trường tin tùy chỉnh](#225-danh-sách-trường-tin-tùy-chỉnh). |
| **BF25-UC01-BR01.2** | **Quy tắc điều hướng theo Tab trạng thái** | - Kích hoạt Tab Tất cả: Hiển thị toàn bộ các bản ghi không phân biệt trạng thái.<br>- Kích hoạt Tab Đang hoạt động: Tự động gắn cờ lọc `status = ACTIVE`.<br>- Kích hoạt Tab Chờ phê duyệt: Tự động gắn cờ lọc `status = PENDING`. |
| **BF25-UC01-BR01.3** | **Ràng buộc khoảng thời gian tra cứu** | Khoảng cách giữa *Từ ngày* và *Đến ngày* không được vượt quá 365 ngày. *Từ ngày* phải luôn nhỏ hơn hoặc bằng *Đến ngày*. Nếu vi phạm, hệ thống hiển thị viền đỏ và thông báo lỗi inline `E-partner-fee-management-004`. |

---

### 2.2.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Lỗi kết nối cơ sở dữ liệu | Mất kết nối tới cơ sở dữ liệu khi gửi truy vấn lọc danh sách | Critical | *“Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau hoặc liên hệ Quản trị viên!”* |
| **E2** | Không có quyền truy cập | Người dùng không thuộc nhóm quyền tra cứu cấu hình phí | Major | *“Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ Quản trị viên để được cấp quyền!”* |
| **E3** | Lỗi kết nối mạng internet | Mất kết nối internet hoặc API Timeout $> 10$s | Major | *“Lỗi kết nối mạng internet. Vui lòng kiểm tra đường truyền và thử lại!”* |
| **E4** | Nội dung tìm kiếm không hợp lệ | Người dùng nhập nội dung tìm kiếm chứa ký tự đặc biệt nguy hiểm (SQL Injection, XSS) | Minor | *“Nội dung tìm kiếm chứa ký tự không hợp lệ. Vui lòng chỉ nhập chữ, số và dấu gạch ngang!”* |
| **E-partner-fee-004** | Ngày áp dụng không hợp lệ | Maker chọn Từ ngày lớn hơn Đến ngày, hoặc khoảng cách $> 365$ ngày | Major | *“Thời gian áp dụng từ ngày phải nhỏ hơn hoặc bằng đến ngày và khoảng cách không quá 365 ngày.”* |
| **E-partner-fee-010** | Không tìm thấy kết quả | Không có bản ghi nào trong hệ thống thỏa mãn điều kiện lọc | Info | *“Không tìm thấy kết quả phù hợp với điều kiện tìm kiếm. Vui lòng thử lại với tiêu chí khác!”* |

---

### 2.2.5 Danh sách trường tin tùy chỉnh

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

---

## 2.3 BF25-UC02: Xuất tệp dữ liệu danh sách cấu hình phí Trả đối tác

### 2.3.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xuất tệp dữ liệu danh sách cấu hình phí Trả đối tác** |
| **ID** | **BF25 - UC02** |
| **Description** | Cho phép người dùng xuất dữ liệu danh sách cấu hình phí ra tệp định dạng Excel hoặc PDF phục vụ công tác đối soát cước, lưu trữ hồ sơ và báo cáo tài chính. |
| **Actor** | User thuộc nhóm quyền tương ứng (Maker, Checker, Đối soát viên, Kế toán viên) |
| **Trigger** | Người dùng click chọn button **[Xuất tệp ▼]** trên thanh công cụ phía trên bảng danh sách. |
| **Pre-Condition** | Người dùng đã đăng nhập, có quyền xuất tệp dữ liệu và đã có kết quả tìm kiếm/danh sách trên màn hình. |
| **Post-Condition** | Hệ thống sinh tệp tải về thành công (định dạng `.xlsx` hoặc `.pdf`) chứa danh sách cấu hình phí theo đúng điều kiện lọc hiện tại. |
| **Basic flow** | 1. Người dùng chọn các tiêu chí lọc và bấm [Tìm kiếm] để nạp danh sách kết quả (hoặc sử dụng danh sách mặc định).<br>2. Click button **[Xuất tệp ▼]** ở góc trên bên phải bảng danh sách.<br>3. Hệ thống hiển thị dropdown gồm 2 lựa chọn: *Xuất Excel (.xlsx)* và *Xuất PDF (.pdf)*.<br>4. Người dùng click chọn định dạng mong muốn.<br>5. Hệ thống kiểm tra số lượng bản ghi thỏa mãn điều kiện lọc.<br>6. Hệ thống thực hiện kết xuất dữ liệu và kích hoạt trình tải tệp xuống máy tính của người dùng. |
| **Alternative flow** | - **A1**: Không có bản ghi nào thỏa mãn điều kiện lọc $\rightarrow$ Hệ thống hiển thị cảnh báo: *“Không có dữ liệu để xuất tệp”*, không thực hiện sinh tệp trống.<br>- **A2**: Số lượng bản ghi vượt quá 50.000 dòng $\rightarrow$ Hệ thống hiển thị thông báo yêu cầu người dùng thu hẹp khoảng thời gian hoặc xuất dữ liệu qua hàng đợi tác vụ ngầm. |
| **Exception flow** | - **E1**: Lỗi timeout khi kết xuất tệp (> 30 giây) $\rightarrow$ Thông báo lỗi hệ thống và gợi ý người dùng thử lại.<br>- **E2**: Mất kết nối mạng internet trong lúc tải file. |
| **Business Rules** | Tham chiếu mục **2.3.3: Yêu cầu nghiệp vụ chung xuất tệp dữ liệu CHP Trả đối tác**. |
| **Non-functional requirement** | Thời gian xuất file $< 5$ giây với tập dữ liệu dưới 5.000 dòng; $< 15$ giây với tập dữ liệu từ 5.000 đến 50.000 dòng. |

---

### 2.3.2 Giao diện

#### Màn hình Wireframe liên kết:
* **BF25-UC02-WF01**: Menu Dropdown Xuất tệp trên thanh công cụ Danh sách (`4020:50223`)

#### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Button [Xuất tệp ▼]** | Button | O | Y | Click | Hiển thị menu dropdown 2 mục chọn định dạng file xuất. |
| **Option [Xuất Excel (.xlsx)]** | Menu item | O | Y | Click | Kích hoạt tiến trình kết xuất bảng tính Excel với đầy đủ định dạng số, ngày tháng và kẻ bảng chuẩn. |
| **Option [Xuất PDF (.pdf)]** | Menu item | O | Y | Click | Kích hoạt tiến trình xuất báo cáo tài liệu PDF khổ ngang (A4 Landscape) có header/footer và đánh số trang. |
| **Toast thông báo tiến trình** | Toast Banner | C | N | Readonly | Hiển thị thông báo *“Đang chuẩn bị tệp dữ liệu, vui lòng đợi...”* kèm spinner loading trong khi hệ thống đang xử lý. |

---

### 2.3.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **BF25-UC02-BR01.1** | **Quy tắc đặt tên tệp kết xuất** | Tên tệp được tự động đặt theo quy chuẩn: `EPAY_CHP_TraDoiTac_[TabTrangThai]_[ddMMyyyy_HHmmss].[ext]` (Ví dụ: `EPAY_CHP_TraDoiTac_TatCa_07112026_153000.xlsx`). |
| **BF25-UC02-BR01.2** | **Quy tắc dữ liệu trong tệp xuất** | Dữ liệu trong tệp xuất ra phải khớp 100% với danh sách kết quả tìm kiếm theo bộ lọc hiện tại trên giao diện, bao gồm cả các dòng ở các trang sau (không chỉ xuất riêng trang hiện tại). Cột Mã cấu hình giữ nguyên định dạng chuỗi văn bản để tránh bị lỗi mất số 0 đầu dòng. |
| **BF25-UC02-BR01.3** | **Quy tắc ghi nhận nhật ký xuất tệp** | 100% thao tác xuất tệp phải được ghi nhận vào nhật ký hệ thống (`audit_logs`) gồm: User thực hiện, Thời điểm xuất, Bộ tiêu chí lọc đã áp dụng và Số lượng bản ghi kết xuất. |

---

## 2.4 BF25-UC03: Xem chi tiết cấu hình phí và Lịch sử thay đổi (Audit Trail)

### 2.4.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xem chi tiết cấu hình phí và Lịch sử thay đổi** |
| **ID** | **BF25 - UC03** |
| **Description** | Hiển thị chi tiết toàn diện thông tin bản ghi cấu hình phí gồm Khối Thông tin chung, Khối Yêu cầu phê duyệt (nếu có), Khối Thông tin biểu phí theo từng loại giao dịch, thanh tác vụ động và tab dòng thời gian lưu vết kiểm toán (Audit Trail Timeline View). |
| **Actor** | Maker, Checker, Quản trị viên, Kiểm toán viên, Cán bộ Đối soát |
| **Trigger** | Người dùng click vào hyperlink **[Mã phí]** trên bảng danh sách, hoặc chọn **[Xem chi tiết]** từ menu 3 chấm. |
| **Pre-Condition** | Bản ghi cấu hình tồn tại trong CSDL và người dùng có quyền tra cứu cấu hình phí. |
| **Post-Condition** | Màn hình hiển thị đầy đủ thông tin chi tiết cấu hình phí và lịch sử cập nhật biến động dữ liệu. |
| **Basic flow** | 1. Người dùng click vào Mã cấu hình (vd: `QR_FE_NAPAS_002`) trên bảng danh sách.<br>2. Hệ thống truy vấn CSDL và nạp thông tin bản ghi.<br>3. Hệ thống hiển thị màn hình Chi tiết cấu hình phí gồm:<br>   - Breadcrumb điều hướng: `Quản lý cấu hình phí trả đối tác > [MÃ CẤU HÌNH]`.<br>   - Header tiêu đề: Mã phí — Tên biểu phí kèm badge trạng thái cấu hình (`● ACTIVE` hoặc `● PENDING`).<br>   - **Khối Thông tin chung**: Mã phí, Loại phí, Trạng thái cấu hình, Trạng thái YCPD, Người tạo, Ngày tạo, Người cập nhật cuối, Ngày cập nhật, Người phê duyệt.<br>   - **Khối Yêu cầu phê duyệt** (hiển thị khi bản ghi PENDING hoặc đã có hồ sơ YCPD): Mã yêu cầu, Thời gian tạo, Trạng thái phê duyệt, Người tạo, Phòng ban.<br>   - **Khối Thông tin cấu hình phí**: Nguồn dữ liệu, Đối tác/Ngân hàng hưởng phí, Kỳ trả phí, Thời gian áp dụng phí, Loại dịch vụ, PTTT, Loại GD, Trạng thái GD, Đồng tiền, Thuế VAT, Mô tả.<br>   - **Khối Thông tin Phí cho từng loại giao dịch**: Bảng mức phí chi tiết (Tỷ lệ %, Min, Max, Phí cố định).<br>   - Thanh nút tác vụ chân trang động theo vai trò và trạng thái bản ghi.<br>4. Người dùng click tab **[Lịch sử thay đổi / Hoạt động]**.<br>5. Hệ thống hiển thị dòng thời gian Timeline View ghi lại toàn bộ lịch sử: Người sửa, Thời gian, Trường thay đổi, Giá trị CŨ $\rightarrow$ Giá trị MỚI. |
| **Alternative flow** | - **A1 (Bản ghi ACTIVE)**: Chân trang hiển thị cụm nút: `[← Quay lại]`, `[🕒 Lịch sử]`, `[Sao chép]`, `[Tạm dừng]`, `[Chỉnh sửa]`.<br>- **A2 (Bản ghi PENDING — Maker View)**: Chân trang hiển thị: `[← Quay lại]`, `[🕒 Lịch sử]`, `[🔄 Rút yêu cầu]`, tại Khối YCPD có nút `[👥 Thay đổi người PD]`.<br>- **A3 (Bản ghi PENDING — Checker View)**: Chân trang hiển thị: `[← Quay lại]`, `[🕒 Lịch sử]`, `[✖ Từ chối]`, `[✔ Phê duyệt]`.<br>- **A4 (Bản ghi INACTIVE)**: Chân trang hiển thị: `[← Quay lại]`, `[🕒 Lịch sử]`, `[Sao chép]`, `[Kích hoạt lại]`. |
| **Exception flow** | - **E1**: Bản ghi đã bị xóa bởi người dùng khác trong phiên làm việc $\rightarrow$ Thông báo lỗi: *“Bản ghi không tồn tại hoặc đã bị xóa”*, tự động quay lại trang danh sách. |
| **Business Rules** | Tham chiếu mục **2.4.3: Yêu cầu nghiệp vụ chung xem chi tiết và Audit Trail**. |
| **Non-functional requirement** | Tốc độ nạp và hiển thị toàn bộ màn hình chi tiết $< 1.0$ giây; Tải dòng thời gian lịch sử $< 1.5$ giây. |

---

### 2.4.2 Giao diện

#### Màn hình Wireframe liên kết:
* **BF25-UC03-WF01**: Chi tiết Phí QRGW / CTT — Trạng thái Active (`SCR-QR-DT-04`, `SCR-CTT-DT-04`)
* **BF25-UC03-WF02**: Chi tiết Phí QRGW / CTT — Trạng thái Pending Maker View (`SCR-QR-DT-02A`, `SCR-CTT-DT-02A`)
* **BF25-UC03-WF03**: Xem chi tiết — Tab Dòng thời gian Lịch sử hoạt động (`4020:47172`)

#### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **KHỐI THÔNG TIN CHUNG** | Container | M | N | Readonly | Nằm góc trên bên trái, chiều cao 182px, phẳng mép đáy với Khối YCPD. |
| **Mã phí** | Text | M | N | Unique String | Hiển thị mã cấu hình phí (vd: `QR_FE_NAPAS_002`). |
| **Loại phí** | Text | M | N | String | Loại phí thu (vd: *Phí thanh toán*). |
| **Trạng thái cấu hình** | Badge | M | N | Enum Status | Badge trực quan: `ACTIVE`, `PENDING`, `INACTIVE`. |
| **Trạng thái YCPD** | Badge | C | N | Enum Status | Hiển thị trạng thái của yêu cầu phê duyệt liên kết: `PENDING`, `APPROVAL`. |
| **Người khởi tạo / Thời gian tạo** | Text / Date | M | N | String / Datetime | Tên tài khoản Maker và mốc thời gian tạo ban đầu dạng `dd/MM/yyyy, HH:mm:ss`. |
| **Người cập nhật cuối / Thời gian** | Text / Date | M | N | String / Datetime | Tên tài khoản và mốc thời gian cập nhật gần nhất. |
| **Người phê duyệt** | Text | C | N | String | Tên Checker được phân công phê duyệt hồ sơ. |
| **KHỐI YÊU CẦU PHÊ DUYỆT** | Container | C | N | Readonly | Nằm góc trên bên phải, chiều cao 182px, phẳng đáy. Chỉ hiển thị khi có hồ sơ YCPD liên kết. |
| **Mã yêu cầu** | Text | M | N | String | Mã định danh hồ sơ phê duyệt `AR_MM_MC_[Timestamp]`. |
| **Thời gian tạo YCPD** | Date time | M | N | Datetime | Thời điểm gửi yêu cầu phê duyệt. |
| **Trạng thái phê duyệt** | Badge | M | N | Enum | Badge hiển thị trạng thái: `Pending`. |
| **Người tạo YCPD / Phòng ban** | Text | M | N | String | Tài khoản Maker đề xuất và đơn vị công tác (vd: *Kinh doanh - Maker*). |
| **Nút [Thay đổi người PD]** | Button | C | Y | Click | Hiển thị trong Khối YCPD ở vai trò Maker. Click mở popup chọn Checker mới. |
| **CỤM NÚT TÁC VỤ CHÂN TRANG** | Button Group | M | Y | Click | Thanh công cụ nổi/chân trang chứa các tác vụ động theo trạng thái bản ghi và quyền hạn người dùng. |

---

### 2.4.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **BF25-UC03-BR01.1** | **Quy tắc thiết kế khung thông tin song song** | Khối *Thông tin chung* và Khối *Yêu cầu phê duyệt* phải được căn chỉnh song song trên cùng một hàng ngang, chiều cao cố định đúng **182px**, các dòng dữ liệu giãn cách đều **9px** và mép đáy phẳng hoàn toàn nhằm đảm bảo giao diện gọn gàng, không bị lệch khối. |
| **BF25-UC03-BR01.2** | **Quy tắc hiển thị nút tác vụ theo vai trò** | - Tài khoản Maker: Chỉ nhìn thấy các nút *Chỉnh sửa, Rút yêu cầu, Thay đổi người PD, Tạm dừng, Kích hoạt lại, Sao chép*. Tuyệt đối không hiển thị nút *Phê duyệt* hoặc *Từ chối*.<br>- Tài khoản Checker: Chỉ nhìn thấy các nút *Phê duyệt, Từ chối, Xem lịch sử*. Tuyệt đối không cho phép Checker tự ý sửa đổi dữ liệu biểu phí trực tiếp trên màn hình xem chi tiết. |
| **BF25-UC03-BR01.3** | **Tính bất biến của Audit Log** | Bảng dòng thời gian Lịch sử hoạt động (Audit Trail) là dữ liệu chỉ đọc (Immutable Data). Không một tài khoản nào (kể cả Quản trị viên hệ thống) được phép chỉnh sửa hoặc xóa bỏ các bản ghi lưu vết lịch sử kiểm toán. |

---

## 2.5 BF25-UC04: Thêm mới cấu hình phí Trả đối tác (4 nhóm phí & Simulator)

### 2.5.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Thêm mới cấu hình phí Trả đối tác** |
| **ID** | **BF25 - UC04** |
| **Description** | Cho phép Maker tạo mới biểu phí trả đối tác cho 4 nhóm nghiệp vụ chính (Phí duy trì dịch vụ, Phí xử lý giao dịch, Phí thanh toán, Phí quản lý DVGT) và Biến thể Hoàn trả; tích hợp công cụ mô phỏng Tính thử phí 🧮 (Simulator Popup); hỗ trợ 2 hành động hoàn tất: Lưu nháp (`DRAFT`) hoặc Lưu mới (`NEW`). |
| **Actor** | Maker (Chuyên viên Vận hành / Tính cước EPAY) |
| **Trigger** | Maker click button **[+ Thêm mới]** ở góc trên bên phải màn hình danh sách cấu hình phí. |
| **Pre-Condition** | Đăng nhập tài khoản Maker; các danh mục hệ thống (Đối tác, Ngân hàng, Cổng TGTT, Mã ngành MCC) đã được đồng bộ. |
| **Post-Condition** | Bản ghi cấu hình phí mới được lưu vào CSDL với trạng thái `DRAFT` (nếu chọn Lưu nháp) hoặc `NEW` (nếu chọn Tạo mới). |
| **Basic flow** | 1. Maker click button **[+ Thêm mới]** trên trang danh sách.<br>2. Hệ thống hiển thị form Thêm mới cấu hình phí.<br>3. Maker thiết lập Khối Thông tin cấu hình phí chung: Nguồn dữ liệu (CTT/QRGW), Đối tác/Ngân hàng thụ hưởng (*), Kỳ trả phí (*), Thời gian áp dụng phí (*), Đồng tiền (VND), Thuế VAT (mặc định 8%), Mô tả biểu phí.<br>4. Maker chọn Loại phí cần cấu hình:<br>   - *Phí duy trì*: Chọn radio *Áp dụng toàn bộ MID* hoặc *Không áp dụng* (chọn từng MID).<br>   - *Phí xử lý giao dịch*: Chọn mã ngành MCC qua Dual-Listbox, chọn radio *Áp dụng chung* hoặc *Không áp dụng* (tách cấu hình Thanh toán & Hoàn trả).<br>   - *Phí thanh toán*: Chọn Cổng TGTT, Loại NHPH, PTTT; chọn biểu phí *1 bậc phí* hoặc *Bậc thang thương hiệu thẻ* (Visa, Master, JCB); thiết lập tỷ lệ %, Mức phí tối thiểu (Min), Mức phí tối đa (Max).<br>   - *Phí quản lý DVGT*: Chọn Áp dụng chung hoặc Không áp dụng (Tách riêng Token, Rủi ro, FastPay).<br>5. *(Tùy chọn)* Maker click nút **[Tính thử 🧮]** trên màn hình Phí thanh toán $\rightarrow$ Mở Popup Simulator, nhập thử nghiệm Giá trị GD và SLGD để kiểm tra số tiền phí thực tế và kiểm tra bẫy trần/sàn Min/Max.<br>6. Maker lựa chọn hành động lưu:<br>   - **Phương án A: Bấm [Lưu nháp]** $\rightarrow$ Hệ thống lưu bản ghi với trạng thái `DRAFT`.<br>   - **Phương án B: Bấm [Tạo mới +]** $\rightarrow$ Hệ thống validate đầy đủ các trường bắt buộc (*), lưu bản ghi với trạng thái `NEW`.<br>7. Hệ thống hiển thị Toast thông báo thành công và điều hướng về trang chi tiết bản ghi mới tạo. |
| **Alternative flow** | - **A1**: Maker bấm nút **[Hủy]** $\rightarrow$ Hệ thống hiển thị modal cảnh báo: *“Bạn có chắc chắn muốn hủy quá trình thêm mới? Dữ liệu vừa nhập sẽ không được lưu.”* $\rightarrow$ Xác nhận $\rightarrow$ Quay về danh sách.<br>- **A2**: Maker bỏ trống trường bắt buộc (*) $\rightarrow$ Hệ thống viền đỏ ô nhập và hiển thị inline error `E-partner-fee-management-001`.<br>- **A3**: Maker nhập Mức phí tối thiểu > Mức phí tối đa $\rightarrow$ Hệ thống hiển thị thông báo lỗi `E-partner-fee-management-002` tại ô Max.<br>- **A4**: Trùng lặp phạm vi hiệu lực với cấu hình cùng loại đang Active $\rightarrow$ Modal cảnh báo xung đột `E-partner-fee-management-003`. |
| **Exception flow** | - **E1**: Lỗi mất kết nối mạng máy chủ (`E-partner-fee-management-010`).<br>- **E2**: Lỗi kết nối cơ sở dữ liệu khi thực hiện lệnh Insert. |
| **Business Rules** | Tham chiếu mục **2.5.3: Yêu cầu nghiệp vụ chung thêm mới cấu hình phí**. |
| **Non-functional requirement** | Tốc độ tính toán mô phỏng trong Popup Tính thử $< 500$ms; Lưu dữ liệu bản ghi mới $< 1.0$ giây. |

---

### 2.5.2 Giao diện

#### Màn hình Wireframe liên kết:
* **BF25-UC04-WF01**: Thêm mới Phí duy trì — Áp dụng toàn bộ MID & Từng MID (`4022:53508`, `4022:54185`)
* **BF25-UC04-WF02**: Thêm mới Phí xử lý GD — Áp dụng chung & Tách riêng loại GD (`4022:54899`, `4022:55659`)
* **BF25-UC04-WF03**: Thêm mới Phí thanh toán — 1 bậc phí & Bậc thang thương hiệu thẻ (`4022:56456`, `4022:57209`)
* **BF25-UC04-WF04**: Thêm mới Phí quản lý DVGT — Áp dụng chung & Tách riêng từng DV (`4024:58948`, `4022:58264`)
* **BF25-UC04-WF05**: Popup Mô phỏng Tính thử phí 🧮 (`4018:36498`, `4018:36606`)

#### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Nguồn dữ liệu cấu hình** | Dropdown list | M | Y | Select single | Chọn `CTT` (Cổng thanh toán) hoặc `QRGW` (Cổng VietQR). Mặc định chọn CTT. |
| **Đối tác/Ngân hàng hưởng phí** | Dropdown list | M | Y | Select single | Danh sách đối tác Master Data (Vietcombank, BIDV, MBBank, Napas...). |
| **Kỳ trả phí** | Dropdown list | M | Y | Select single | Các giá trị: *Theo tháng, Theo quý, Theo năm*. |
| **Thời gian áp dụng phí** | DatePicker | M | Y | Date | Chọn ngày bắt đầu có hiệu lực tính cước. Không được chọn ngày trong quá khứ khi tạo mới. |
| **Thuế VAT** | Number | M | Y | Number % | Mặc định hiển thị `8%` (hoặc `10%` theo luật thuế). Hỗ trợ chỉnh sửa số nguyên dương. |
| **Radio Chế độ áp dụng** | Radio Group | M | Y | Mutual Exclusivity | Chọn 1 trong 2: *Áp dụng phí chung* hoặc *Không áp dụng* (cấu hình chi tiết riêng). |
| **Bộ chọn mã ngành MCC** | Dual Listbox | C | Y | Transfer List | Bắt buộc chọn ít nhất 1 mã ngành MCC khi cấu hình Phí xử lý giao dịch. |
| **Mức phí tỷ lệ (%)** | Number | C | Y | Decimal (0-100) | Nhập tỷ lệ phần trăm phí (cho phép tối đa 4 chữ số thập phân, vd: `0.6500%`). |
| **Mức phí tối thiểu (Min)** | Number | C | Y | Currency (VND) | Số tiền sàn tối thiểu thu trên một giao dịch. Ràng buộc $0 \le \text{Min} \le \text{Max}$. |
| **Mức phí tối đa (Max)** | Number | C | Y | Currency (VND) | Số tiền trần tối đa thu trên một giao dịch. Ràng buộc $\text{Max} \ge \text{Min} \ge 0$. |
| **Nút [Tính thử 🧮]** | Button | O | Y | Click | Mở Modal Popup Tính thử phí để mô phỏng kiểm tra số tiền phí theo công thức. |
| **Nút [Lưu nháp]** | Button | O | Y | Click | Kiểm tra các thông tin sơ bộ và lưu bản ghi với trạng thái `DRAFT`. |
| **Nút [Tạo mới +]** | Button | M | Y | Click | Validate toàn bộ các trường bắt buộc (*) và lưu bản ghi với trạng thái `NEW`. |

---

### 2.5.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **BF25-UC04-BR01.1** | **Quy tắc phân định Lưu nháp (Draft) và Lưu mới (New)** | - **Lưu nháp (`DRAFT`)**: Cho phép Maker lưu lại tiến độ khi biểu phí chưa đầy đủ các trường bắt buộc; bản ghi nháp chưa phát sinh hiệu lực và không thể gửi phê duyệt ngay.<br>- **Lưu mới (`NEW`)**: Bắt buộc phải nhập và validate hợp lệ 100% các trường thông tin có dấu sao đỏ (*). Bản ghi ở trạng thái `NEW` sẵn sàng để gửi yêu cầu phê duyệt sang Checker. |
| **BF25-UC04-BR01.2** | **Ràng buộc Mức phí Tối thiểu và Tối đa (Min/Max)** | Tại bất kỳ bậc phí nào có thiết lập tỷ lệ phần trăm kèm hạn mức trần/sàn, hệ thống bắt buộc kiểm tra điều kiện logic: $$0 \le \text{Mức phí tối thiểu} \le \text{Mức phí tối đa}$$. Nếu Maker nhập Min > Max, hệ thống chặn lưu và viền đỏ ô nhập liệu. |
| **BF25-UC04-BR01.3** | **Công thức tính thử phí và làm tròn tiền tệ (Simulator)** | Công thức tính tiền phí thực tế ($f$) trong công cụ Simulator:<br>$$f_{\text{raw}} = \min\left(\max(V \times \text{Mức phí tỷ lệ}, \text{Mức phí tối thiểu}), \text{Mức phí tối đa}\right)$$<br>$$f = \text{round}\left(f_{\text{raw}} \times (1 + \text{Thuế VAT})\right)$$<br>Số tiền phí cuối cùng được làm tròn đến hàng đơn vị VNĐ theo chuẩn kế toán ngân hàng (Half-up). |

---

## 2.6 BF25-UC05: Xử lý thông tin hồ sơ & Phê duyệt cấu hình phí Trả đối tác

### 2.6.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xử lý thông tin hồ sơ và Phê duyệt Maker – Checker cấu hình phí Trả đối tác** |
| **ID** | **BF25 - UC05** |
| **Description** | Quản lý toàn bộ vòng đời tương tác Maker – Checker theo nguyên tắc kiểm soát 4 mắt (Four-Eyes Principle): Maker gửi yêu cầu phê duyệt từ các trạng thái; Checker thẩm định đối chiếu so sánh trực quan CŨ – MỚI và ra quyết định Phê duyệt hoặc Từ chối kèm lý do; Maker rút yêu cầu hoặc điều chuyển người phê duyệt; Maker gửi yêu cầu Tạm dừng (`Active` $\rightarrow$ `Inactive`) và Mở kích hoạt (`Inactive` $\rightarrow$ `Active`/`Ready`). |
| **Actor** | Maker, Checker, Quản lý Maker |
| **Trigger** | Maker bấm nút gửi phê duyệt / tạm dừng / kích hoạt; hoặc Checker bấm nút phê duyệt / từ chối trên hồ sơ. |
| **Pre-Condition** | Bản ghi cấu hình phí ở trạng thái hợp lệ tương ứng với từng hành động; người dùng có vai trò và thẩm quyền phê duyệt. |
| **Post-Condition** | Bản ghi cấu hình phí và hồ sơ YCPD liên kết được chuyển trạng thái chính xác theo đúng ma trận quy tắc nghiệp vụ 2.6.5. |
| **Basic flow** | **[Luồng A — Maker Gửi yêu cầu phê duyệt]**:<br>1. Maker mở bản ghi ở trạng thái `NEW` (hoặc `ACTIVE`, `INACTIVE`).<br>2. Bấm nút **[Gửi yêu cầu phê duyệt]** (hoặc *Gửi duyệt cập nhật*, *Gửi tạm dừng*, *Gửi mở kích hoạt*).<br>3. Hệ thống sinh mã YCPD `AR_MM_MC_[Timestamp]`, insert 1 bản ghi YCPD tương ứng với trạng thái `Pending`.<br>4. Bản ghi CHP chuyển trạng thái tương ứng (`PENDING`).<br><br>**[Luồng B — Checker Thẩm định & Phê duyệt]**:<br>1. Checker đăng nhập, truy cập tab *Chờ phê duyệt* và mở hồ sơ YCPD cần xử lý.<br>2. Hệ thống hiển thị màn hình Thẩm định đối chiếu CŨ – MỚI (highlight màu cam/xanh các trường có sự thay đổi).<br>3. Checker đối chiếu tham số với hợp đồng thương mại.<br>4. Checker lựa chọn hành động:<br>   - **Trường hợp Đồng ý**: Bấm **[✔ Phê duyệt]** $\rightarrow$ Hệ thống cập nhật YCPD thành `Approval`; Chuyển trạng thái CHP sang `ACTIVE` (nếu ngày áp dụng $\le$ hiện tại) hoặc `READY` (nếu ngày áp dụng $>$ hiện tại).<br>   - **Trường hợp Không đồng ý**: Bấm **[✖ Từ chối]** $\rightarrow$ Hệ thống hiển thị modal bắt buộc Checker nhập lý do từ chối (tối thiểu 10 ký tự) $\rightarrow$ Cập nhật YCPD thành `Rejected`, trả bản ghi CHP về `NEW` để Maker xử lý lại. |
| **Alternative flow** | - **A1 (Rút yêu cầu)**: Khi hồ sơ đang `PENDING` và Checker chưa xử lý, Maker bấm **[Rút yêu cầu]** $\rightarrow$ Bản ghi quay về `NEW`, YCPD chuyển `Cancelled`.<br>- **A2 (Đổi người duyệt)**: Maker bấm **[Thay đổi người PD]** $\rightarrow$ Chọn Checker hợp lệ khác $\rightarrow$ Cập nhật trường Người phê duyệt trong YCPD.<br>- **A3 (Tạm dừng cấu hình)**: Maker gửi yêu cầu tạm dừng từ `ACTIVE` $\rightarrow$ Checker duyệt $\rightarrow$ Bản ghi chuyển sang `INACTIVE`.<br>- **A4 (Mở kích hoạt)**: Maker gửi yêu cầu mở kích hoạt từ `INACTIVE` $\rightarrow$ Checker duyệt $\rightarrow$ Bản ghi chuyển sang `ACTIVE` (hoặc `READY`). |
| **Exception flow** | - **E1 (Vi phạm kiểm soát 4 mắt)**: Maker cố tình tự phê duyệt bản ghi do chính mình tạo ra $\rightarrow$ Hệ thống chặn trực tiếp với mã lỗi `E-partner-fee-management-006`.<br>- **E2 (Thiếu lý do từ chối)**: Checker bấm xác nhận từ chối nhưng bỏ trống lý do hoặc nhập $< 10$ ký tự $\rightarrow$ Báo lỗi `E-partner-fee-management-005`. |
| **Business Rules** | Tham chiếu mục **2.6.5: Ma trận Quy tắc Nghiệp vụ Chung Vòng đời Bản ghi CHP Trả đối tác**. |
| **Non-functional requirement** | Thẩm định đối chiếu so sánh CŨ - MỚI phản hồi $< 1.0$ giây; Cập nhật trạng thái phê duyệt $< 1.0$ giây. |

---

### 2.6.2 Giao diện

#### Màn hình Wireframe liên kết:
* **BF25-UC05-WF01**: Phê duyệt / Checker — Chờ phê duyệt (`4020:47923`)
* **BF25-UC05-WF02**: Phê duyệt / Checker — Màn hình Thẩm định so sánh CŨ MỚI (`4020:48856`)
* **BF25-UC05-WF03**: Modal Xác nhận từ chối phê duyệt (bắt buộc nhập lý do)
* **BF25-UC05-WF04**: Modal Xác nhận thay đổi người phê duyệt

#### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Bảng Đối chiếu So sánh CŨ - MỚI** | Dual Column Grid | M | N | Readonly | Hiển thị song song: Cột trái (Dữ liệu CŨ đang áp dụng), Cột phải (Dữ liệu MỚI đề xuất). Tự động highlight viền cam các trường có sự thay đổi. |
| **Nút [✔ Phê duyệt]** | Button | M | Y | Click | Chỉ hiển thị với Checker (và Checker $\ne$ Maker). Bấm để kích hoạt biểu phí. |
| **Nút [✖ Từ chối]** | Button | M | Y | Click | Mở Modal yêu cầu nhập lý do từ chối trước khi chuyển trạng thái hồ sơ. |
| **Lý do từ chối (Textarea)** | Textbox | M (Khi từ chối) | Y | String $\ge 10$ chars | Bắt buộc nhập giải trình tối thiểu 10 ký tự lý do không duyệt để Maker có cơ sở chỉnh sửa. |
| **Modal [Thay đổi người PD]** | Modal Dropdown | C | Y | Select single | Danh sách chọn Checker thay thế. Ràng buộc Checker mới không trùng với Maker tạo bản ghi. |

---

### 2.6.3 Tiến trình xử lý Maker - Checker

```text
┌─────────────────┐             ┌─────────────────┐             ┌─────────────────┐
│      MAKER      │             │   EPAY SYSTEM   │             │     CHECKER     │
└────────┬────────┘             └────────┬────────┘             └────────┬────────┘
         │                               │                               │
         │  1. Gửi yêu cầu phê duyệt     │                               │
         ├──────────────────────────────>│                               │
         │                               │  2. Sinh YCPD (Pending)       │
         │                               │     Cập nhật CHP (Pending)    │
         │                               ├──────────────────────────────>│ (Gửi thông báo)
         │                               │                               │
         │                               │  3. Mở Thẩm định CŨ - MỚI     │
         │                               │<──────────────────────────────┤
         │                               │                               │
         │                               │  4A. [PHÊ DUYỆT]              │
         │                               │<──────────────────────────────┤
         │  5A. Thông báo Duyệt thành công│     - YCPD = Approval         │
         │<──────────────────────────────┤     - CHP = ACTIVE / READY    │
         │                               │                               │
         │                               │  4B. [TỪ CHỐI + Lý do]        │
         │                               │<──────────────────────────────┤
         │  5B. Báo Từ chối kèm lý do   │     - YCPD = Rejected         │
         │<──────────────────────────────┤     - CHP = NEW               │
         │                               │                               │
```

---

### 2.6.4 Quy tắc chuyển trạng thái

| Từ trạng thái | Đến trạng thái | Điều kiện kích hoạt hợp lệ | Mã lỗi / Lý do nếu vi phạm |
|---|---|---|---|
| `Draft` | `New` | Maker bấm [Tạo mới +] hoàn thiện 100% trường bắt buộc (*). | Báo lỗi `E-001` nếu còn trường bắt buộc bị trống. |
| `New` | `Pending` | Maker bấm [Gửi yêu cầu phê duyệt]. | Sinh mã YCPD `AR_MM_MC_...`. |
| `Pending` | `Active` | Checker bấm [Phê duyệt] khi `Thời gian áp dụng <= Hiện tại`. | Chặn `E-006` nếu Checker trùng Maker (Vi phạm 4 mắt). |
| `Pending` | `Ready` | Checker bấm [Phê duyệt] khi `Thời gian áp dụng > Hiện tại`. | Chờ Scheduler Job quét tự động kích hoạt. |
| `Pending` | `New` | Checker bấm [Từ chối] (kèm lý do), hoặc Maker bấm [Rút yêu cầu]. | Chặn `E-005` nếu Checker không nhập đủ lý do. |
| `Ready` | `Active` | Scheduler Job tự động kích hoạt (Auto Golive) đúng thời điểm. | N/A (Hệ thống chạy tự động). |
| `Active` | `Inactive` | Maker gửi duyệt Tạm dừng $\rightarrow$ Checker phê duyệt Tạm dừng. | Biểu phí dừng áp dụng tính cước. |
| `Inactive` | `Active` / `Ready` | Maker gửi mở Kích hoạt $\rightarrow$ Checker phê duyệt Kích hoạt. | Biểu phí có hiệu lực trở lại. |
| `Draft` / `New` | `Deleted` | Maker thực hiện thao tác Xóa bản ghi. | Cấm xóa bản ghi `Active`, `Ready`, `Inactive` (`E-008`). |

---

### 2.6.5 Yêu cầu nghiệp vụ chung

#### Bảng mapping loại Yêu cầu Phê duyệt (YCPD) sinh ra theo trạng thái:

| Trạng thái hiện tại | Ý nghĩa | Hành động thao tác | Loại yêu cầu phê duyệt được tạo ra |
|---|---|---|---|
| **New** | Maker muốn gửi yêu cầu gửi phê duyệt CHP | Gửi yêu cầu phê duyệt | **Duyệt mở tạo hồ sơ CHP Trả đối tác** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt cập nhật CHP | Gửi phê duyệt cập nhật thông tin | **Duyệt cập nhật hồ sơ CHP Trả đối tác** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt tạm dừng CHP | Gửi yêu cầu tạm dừng | **Duyệt tạm dừng hồ sơ CHP Trả đối tác** |
| **Inactive** | Maker muốn gửi yêu cầu gửi phê duyệt mở kích hoạt CHP | Gửi yêu cầu mở kích hoạt | **Duyệt mở kích hoạt CHP Trả đối tác** |

#### Ma trận Quy tắc Nghiệp vụ Chi tiết (11 Cột chuẩn SRS/BA — Tách riêng từng Action):

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
| **13** | **PENDING** | Quản lý CHP Trả đối tác | Từ chối phê duyệt | Checker | Pending | Từ chối hồ sơ | Rejected | - Bản ghi chuyển về trạng thái New<br>- Cập nhật trạng thái YCPD thành "Rejected" và lưu lý do từ chối | `NEW` | Cập nhật trạng thái YCPD thành Rejected, lưu Người từ chối, Thời gian và Lý do từ chối. | `[Username] đã từ chối phê duyệt YCPD [Mã YC] của CHP Trả đối tác [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
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
| **28** | **NEW** (sau từ chối YCPD) | Quản lý CHP Trả đối tác | Chỉnh sửa thông tin | Maker | N/A | N/A | N/A | Cập nhật thông tin và giữ nguyên trạng thái New | `NEW` | N/A | `[Username] đã chỉnh sửa thông tin bản ghi bị từ chối CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **29** | **NEW** (sau từ chối YCPD) | Quản lý CHP Trả đối tác | Gửi phê duyệt lại | Maker | Pending | Chờ Checker duyệt lại | Pending | - Bản ghi được chuyển sang trạng thái Pending<br>- Insert 1 bản ghi YCPD "Duyệt mở tạo hồ sơ CHP Trả đối tác" với trạng thái "Pending" | `PENDING` | Sinh mã YCPD `AR_MM_MC_[Timestamp]`, loại yêu cầu "Duyệt mở tạo hồ sơ CHP Trả đối tác", lưu liên kết với hồ sơ YCPD bị từ chối trước đó. | `[Username] đã gửi phê duyệt lại CHP Trả đối tác [Mã CHP] ngày [Datetime]` |
| **30** | **NEW** (sau từ chối YCPD) | Quản lý CHP Trả đối tác | Xoá bản ghi bị từ chối | Maker | N/A | N/A | N/A | Bản ghi CHP chuyển trạng thái DELETED | `DELETED` | N/A | `[Username] đã xoá bản ghi bị từ chối CHP Trả đối tác [Mã CHP] ngày [Datetime]` |

---

## 2.7 BF25-UC06: Xóa bản ghi cấu hình phí Trả đối tác

### 2.7.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xóa bản ghi cấu hình phí Trả đối tác** |
| **ID** | **BF25 - UC06** |
| **Description** | Cho phép Maker xóa các bản ghi cấu hình phí chưa từng phát sinh hiệu lực vận hành (`DRAFT`, `NEW`). Cấm tuyệt đối xóa các bản ghi đã từng có hiệu lực (`ACTIVE`, `READY`, `INACTIVE`) hoặc đang trong hàng đợi duyệt (`PENDING`) nhằm bảo toàn lịch sử kiểm toán. |
| **Actor** | Maker (Chuyên viên Vận hành / Tính cước EPAY) |
| **Trigger** | Maker click chọn thao tác **[Xóa]** từ menu 3 chấm trên dòng danh sách hoặc từ nút [Xóa] trên màn hình chi tiết. |
| **Pre-Condition** | Đăng nhập tài khoản Maker; bản ghi cấu hình ở trạng thái cho phép xóa (`DRAFT`, `NEW`). |
| **Post-Condition** | Bản ghi chuyển sang trạng thái `DELETED` (xóa logic khỏi danh mục vận hành, ghi vết audit log). |
| **Basic flow** | 1. Maker click chọn [Xóa] tại dòng bản ghi trên bảng danh sách.<br>2. Hệ thống kiểm tra trạng thái của bản ghi.<br>3. Hệ thống hiển thị Modal xác nhận: *“Bạn có chắc chắn muốn xóa bản ghi [Mã phí] không? Thao tác này không thể hoàn tác.”*<br>4. Maker bấm nút **[Xác nhận xóa]**.<br>5. Hệ thống cập nhật `status = DELETED`, hủy liên kết hàng đợi và lưu vết log xóa.<br>6. Hệ thống hiển thị Toast: *“Đã xóa bản ghi thành công!”*, tự động tải lại bảng danh sách. |
| **Alternative flow** | - **A1**: Maker bấm nút **[Hủy bỏ]** trong Modal xác nhận $\rightarrow$ Đóng modal, giữ nguyên bản ghi không thay đổi. |
| **Exception flow** | - **E1 (Cấm xóa bản ghi hiệu lực)**: Người dùng cố tình gọi lệnh xóa bản ghi `ACTIVE`, `READY`, hoặc `INACTIVE` $\rightarrow$ Hệ thống hiển thị Modal cảnh báo từ chối `E-partner-fee-management-008`: *“Không thể xóa cấu hình phí đã phát sinh hiệu lực vận hành. Bạn chỉ có thể thực hiện Tạm dừng cấu hình này!”*.<br>- **E2 (Bản ghi đang chờ duyệt)**: Người dùng cố xóa bản ghi `PENDING` $\rightarrow$ Toast cảnh báo `E-partner-fee-management-007`: *“Cấu hình đang trong trạng thái Chờ phê duyệt. Không thể xóa vào thời điểm này!”*. |
| **Business Rules** | Tham chiếu mục **2.7.3: Yêu cầu nghiệp vụ chung xóa bản ghi CHP Trả đối tác**. |
| **Non-functional requirement** | Thao tác kiểm tra trạng thái và xóa bản ghi phản hồi $< 500$ms. |

---

### 2.7.2 Giao diện

#### Màn hình Wireframe liên kết:
* **BF25-UC06-WF01**: Modal Xác nhận trước khi xóa bản ghi (`4020:50006`)
* **BF25-UC06-WF02**: Modal Cảnh báo cấm xóa bản ghi có hiệu lực

#### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Modal Xác nhận Xóa** | Dialog Container | M | N | Readonly | Modal popup hiển thị câu cảnh báo xác nhận nguy cơ. |
| **Nút [Hủy bỏ]** | Button | O | Y | Click | Đóng modal popup, không thực hiện bất kỳ thay đổi nào. |
| **Nút [Xác nhận xóa]** | Button (Danger) | M | Y | Click | Màu đỏ cảnh báo (`#EF4444`). Kích hoạt API xóa logic bản ghi. |

---

### 2.7.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **BF25-UC06-BR01.1** | **Quy tắc trạng thái được phép xóa** | Chỉ cho phép xóa bản ghi đối với 2 trạng thái: `DRAFT`, `NEW`. Tuyệt đối không xóa vật lý (Hard Delete) khỏi database đối với các bản ghi đã từng phát sinh hiệu lực tính cước (`ACTIVE`, `READY`, `INACTIVE`) nhằm bảo vệ tính toàn vẹn dữ liệu cho công tác thanh kiểm tra tài chính. |
| **BF25-UC06-BR01.2** | **Cơ chế Soft-Delete & Audit Trail** | Khi thực hiện xóa, hệ thống cập nhật trường `status = 'DELETED'`, `deleted_at = NOW()`, `deleted_by = [Username]`. Bản ghi sẽ bị ẩn khỏi toàn bộ các màn hình vận hành thông thường nhưng vẫn được lưu giữ trong cơ sở dữ liệu để phục vụ truy vấn lịch sử kiểm toán. |
