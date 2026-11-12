---
id: CTT-UC01
title: "Tìm kiếm và xem danh sách cấu hình phí đối tác CTT"
feature: partner-fee-management
module: CTT
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_ctt: docs/partner-fee-management/srs/SRS-Partner-Fee-CTT.md
  - erd: docs/partner-fee-management/srs/partner-fee-management-erd.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 2.2 CTT-UC01: Tìm kiếm và xem danh sách cấu hình phí đối tác CTT

## 2.2.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Tra cứu và xem danh sách cấu hình phí đối tác Cổng Thanh Toán (CTT)** |
| **ID** | **CTT - UC01** |
| **Description** | Tra cứu danh sách các biểu phí trả cho ngân hàng và tổ chức thẻ kết nối qua Cổng thanh toán (CTT) theo bộ lọc tiêu chí, chuyển đổi giữa các tab trạng thái và phân trang kết quả. |
| **Actor** | Maker CTT, Checker CTT, Cán bộ Đối soát, Kế toán chi phí, Hệ thống Merchant Management |
| **Trigger** | Người dùng click menu điều hướng: **`Quản lý cấu hình phí` > `Phí đối tác CTT`** trên thanh Navigation bên trái; hoặc click nút [Tìm kiếm]. |
| **Pre-Condition** | - Tài khoản người dùng đã được tạo và kích hoạt.<br>- Người dùng đã đăng nhập vào hệ thống EPAY Portal.<br>- Người dùng có quyền truy cập chức năng xem danh sách và tra cứu cấu hình phí CTT.<br>- Dữ liệu biểu phí CTT đã được ghi nhận trong cơ sở dữ liệu. |
| **Post-Condition** | Hệ thống hiển thị danh sách các mã phí CTT thỏa mãn đúng tiêu chí tìm kiếm và tab trạng thái kích hoạt. |
| **Basic flow** | 1. Người dùng vào menu **[Quản lý cấu hình phí] > [Phí trả đối tác] > [Phí đối tác CTT]** ở thanh menu bên trái.<br>2. Hệ thống hiển thị màn hình danh sách cấu hình phí CTT.<br>3. Người dùng chọn **[Tìm kiếm]** để mở bộ lọc.<br>4. Hệ thống hiển thị các tiêu chí tra cứu cấu hình phí CTT. |
| **Alternative flow** | - **A1**: User không nhập tiêu chí lọc $\rightarrow$ Hệ thống hiển thị tất cả cấu hình phí CTT theo giá trị lọc mặc định.<br>- **A2**: Người dùng chọn **[Xóa]** $\rightarrow$ Hệ thống xóa các điều kiện lọc, trả giao diện về trạng thái ban đầu với tất cả cấu hình phí CTT theo giá trị lọc ban đầu.<br>- **A3**: Người dùng chọn **[Xuất tệp]** $\rightarrow$ Hệ thống xuất danh sách tổng hợp theo các trường tin tương ứng tại bảng danh sách (định dạng file: PDF, Excel) *(Chi tiết xem CTT-UC02)*.<br>- **A4**: User chọn tiêu chí lọc $\rightarrow$ Hệ thống hiển thị bảng rỗng kèm thông báo không tìm thấy kết quả phù hợp. |
| **Exception flow** | - **E1**: Lỗi kết nối với cơ sở dữ liệu hoặc API Timeout $> 10$s.<br>- **E2**: Người dùng không có quyền truy cập chức năng CTT.<br>- **E3**: Lỗi kết nối mạng internet.<br>- **E4**: Người dùng chọn thời gian áp dụng Từ ngày lớn hơn Đến ngày. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung tra cứu cấu hình phí CTT](#223-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Màn hình hiển thị kết quả tra cứu trong vòng không quá 03 giây. |

---

## 2.2.2 Giao diện

### Màn hình Wireframe liên kết:
* **CTT-UC01-WF01.1**: Danh sách CTT — Tab Tất cả (Figma Frame ID: `4020:50223`)
* **CTT-UC01-WF01.2**: Danh sách CTT — Tab Đang hoạt động (Figma Frame ID: `4020:51051`)
* **CTT-UC01-WF01.3**: Danh sách CTT — Tab Chờ phê duyệt (Figma Frame ID: `4020:51879`)

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Tiêu đề phân hệ** | Label | M | N | - | Hiển thị: *“Quản lý cấu hình phí trả đối tác — Cổng Thanh Toán (CTT)”*. |
| **Nguồn dữ liệu** | Dropdown | M | N | Fixed = "CTT" | Cố định giá trị `CTT` khi truy cập qua phân hệ CTT. |
| **Thời gian hiệu lực** | Date time | C | Y | Date time | Lựa chọn từ ngày đến ngày (tối đa 365 ngày). Mặc định: Ngày đầu tháng hiện tại đến ngày hiện tại. |
| **Loại phí** | Dropdown list | O | Y | Multiple selection | Mặc định = *“Tất cả”*. Các giá trị: Phí duy trì dịch vụ, Phí xử lý giao dịch, Phí thanh toán, Phí quản lý DVGT. |
| **Trạng thái** | Dropdown list | O | Y | Multiple selection | Mặc định = *“NEW, ACTIVE, INACTIVE”*. Các giá trị: New, Active, Inactive, Draft. |
| **Phương thức thanh toán** | Dropdown list | O | Y | Multiple selection | Mặc định = *“Tất cả”*. Danh mục CTT: Thẻ quốc tế (Visa, Master, JCB), Thẻ nội địa ATM, Chuyển khoản ngân hàng. |
| **Kỳ trả phí** | Dropdown list | O | Y | Multiple selection | Mặc định = *“Tất cả”*. Các giá trị: Ngày, Tháng, Năm, Quý. |
| **Tiến trình phê duyệt** | Dropdown list | O | Y | Multiple selection | - Giá trị mặc định = “Tất cả”.<br>- Danh sách hiển thị theo thứ tự ABC.<br>- Tiến trình phê duyệt bao gồm các giá trị tham chiếu tại [Danh sách các loại yêu cầu phê duyệt](../srs/SRS-Partner-Fee-CTT.md#217-danh-sách-các-loại-yêu-cầu-phê-duyệt). |
| **Quicksearch** | Search bar | O | Y | Text $\le 100$ chars | Tìm nhanh theo Mã cấu hình, Tên cấu hình hoặc Mô tả. Nhấn Enter để tìm. |
| **Nút [Xóa]** | Button | O | Y | Click | Clear các điều kiện tìm kiếm về giá trị mặc định. |
| **Nút [Tìm kiếm]** | Button | O | Y | Click | Thực hiện truy vấn danh sách CHP CTT theo điều kiện lọc. |
| **Nút [Xuất tệp]** | Button | O | Y | Click | Mở menu lựa chọn định dạng file xuất (Excel/PDF). |
| **Nút [Tùy chỉnh]** | Button | O | Y | Click | Mở danh sách chọn trường tin hiển thị trên Gridview theo mục 2.2.5. |
| **Chi tiết cột dữ liệu** | Grid Table | M | N | Readonly / Link | Tham chiếu mục [2.2.5 Danh sách trường tin tùy chỉnh](#225-danh-sách-trường-tin-tùy-chỉnh). Mã phí là hyperlink mở màn hình Chi tiết. |

---

## 2.2.3 Yêu cầu nghiệp vụ chung

#### Chi tiết xử lý nghiệp vụ

1. Click **[Quản lý cấu hình phí]** >> click **[Phí đối tác CTT]** ở thanh Navigation bên trái. Hệ thống hiển thị Danh sách cấu hình phí CTT tương ứng.
2. Chọn nút **[Tìm kiếm]** ở góc trên bên phải $\rightarrow$ Màn hình show ra các trường điều kiện lọc dữ liệu dành riêng cho CTT, cho phép user lựa chọn giá trị để tra cứu.
3. Lựa chọn giá trị tại các trường thông tin: Đối tác/Ngân hàng (Vietcombank, BIDV, MBBank...), Loại phí CTT (Duy trì dịch vụ, Xử lý GD, Thanh toán, DVGT), PTTT (Thẻ quốc tế Visa/Master/JCB, Thẻ nội địa Napas), Kỳ trả phí, Trạng thái.
4. Click nút **[Tìm kiếm]**.
5. Hệ thống kiểm tra tính hợp lệ thông tin, thực hiện truy vấn dữ liệu từ CSDL theo điều kiện lọc.
6. Hệ thống hiển thị danh sách cấu hình phí CTT theo điều kiện lọc ở trên.


| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **CTT-UC01-BR01.1** | **Quy tắc hiển thị danh sách CHP CTT** | - Chỉ hiển thị đối với người dùng được cấp quyền truy cập CTT.<br>- Mặc định hiển thị các cấu hình có trạng thái: `NEW`, `ACTIVE`, `INACTIVE`.<br>- Phân trang mặc định là **20 dòng/trang**, tùy chọn: `5 / 10 / 20 / 30 / 50 / 100 / 200 / 500`. |
| **CTT-UC01-BR01.2** | **Quy tắc điều hướng theo Tab trạng thái** | - Tab Tất cả: Hiển thị toàn bộ bản ghi CTT.<br>- Tab Đang hoạt động: Lọc bản ghi CTT có `status = ACTIVE`.<br>- Tab Chờ phê duyệt: Lọc bản ghi CTT có `status = PENDING`. |
| **CTT-UC01-BR01.3** | **Ràng buộc khoảng thời gian tra cứu** | Khoảng cách giữa Từ ngày và Đến ngày không vượt quá 365 ngày. Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |

---

## 2.2.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Lỗi kết nối CSDL | Mất kết nối CSDL khi gửi truy vấn lọc danh sách | Critical | *“Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau hoặc liên hệ Quản trị viên!”* |
| **E2** | Không có quyền truy cập | Người dùng không thuộc nhóm quyền tra cứu cấu hình phí CTT | Major | *“Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ Quản trị viên để được cấp quyền!”* |
| **E3** | Lỗi kết nối internet | Mất kết nối mạng hoặc API Timeout $> 10$s | Major | *“Lỗi kết nối mạng internet. Vui lòng kiểm tra đường truyền và thử lại!”* |
| **E-004** | Ngày áp dụng không hợp lệ | Maker chọn Từ ngày lớn hơn Đến ngày, hoặc khoảng cách $> 365$ ngày | Major | *“Thời gian áp dụng từ ngày phải nhỏ hơn hoặc bằng đến ngày và khoảng cách không quá 365 ngày.”* |
| **E-010** | Không tìm thấy kết quả | Không có bản ghi nào trong hệ thống thỏa mãn điều kiện lọc | Info | *“Không tìm thấy kết quả phù hợp với điều kiện tìm kiếm. Vui lòng thử lại với tiêu chí khác!”* |

---

## 2.2.5 Danh sách trường tin tùy chỉnh

| STT | Tên trường tin | Lựa chọn mặc định | Giá trị dữ liệu |
|:---:|---|:---:|---|
| **1** | **STT** | **Y** | Sắp xếp theo thứ tự kết quả trả về. |
| **2** | **Mã cấu hình** | **Y** | Mã định danh biểu phí CTT (vd: `CTT_FE_VCB_001`). |
| **3** | **Tên cấu hình** | **Y** | Tên cấu hình phí CTT tương ứng. |
| **4** | **Loại phí** | **Y** | Loại phí của CHP CTT. |
| **5** | **Trạng thái** | **Y** | Trạng thái của CHP CTT (`Active`, `Pending`, `Inactive`, `New`, `Draft`). |
| **6** | **Kỳ trả phí** | **Y** | Kỳ trả phí của CHP CTT. |
| **7** | **Thời gian hiệu lực** | **Y** | Thời điểm bắt đầu có hiệu lực tính cước. |
| **8** | **Thời gian khởi tạo** | **Y** | Thời điểm tạo bản ghi cấu hình phí CTT. |
| **9** | **Yêu cầu phê duyệt** | **N** | Phân loại yêu cầu phê duyệt thông tin phí CTT. |
| **10** | **Trạng thái phê duyệt** | **N** | Trạng thái phê duyệt tương ứng với YCPD. |
| **11** | **Mã yêu cầu** | **N** | Mã yêu cầu phê duyệt liên kết. |
| **12** | **Ghi chú** | **N** | Thông tin mô tả chi tiết cấu hình. |
| **13** | **Đồng tiền giao dịch** | **N** | Loại tiền tệ sử dụng khi giao dịch (VND, USD...). |
