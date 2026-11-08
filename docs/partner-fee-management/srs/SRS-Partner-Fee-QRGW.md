---
type: srs-usecases-qrgw
feature: partner-fee-management-qrgw
title: "Tài liệu SRS — Quản lý Cấu hình Phí Đối tác QRGW (Cổng VietQR / QR Gateway)"
channel: "QRGW"
version: "V0.4"
code: "EPAY-QT.CG.02_BM.33-QRGW"
security: "Lưu hành nội bộ"
updated: 2026-11-07
links:
  - srs_ctt: docs/partner-fee-management/srs/SRS-Partner-Fee-CTT.md
  - excel: Quy_Tac_Nghiep_Vu_Cau_Hinh_Phi_Tra_Doi_Tac.xlsx
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# PHẦN 2: QUẢN LÝ CẤU HÌNH PHÍ ĐỐI TÁC QRGW (CỔNG VIETQR / QR GATEWAY)

## 1. Danh sách các Use Case phân hệ QRGW

| Mã Use Case | Tên Use Case QRGW | Actor chính | Màn hình Figma liên kết | Ưu tiên |
|---|---|---|---|:---:|
| **QR-UC01** | Tìm kiếm và xem danh sách cấu hình phí đối tác QRGW | Maker, Checker, Đối soát | `4020:50223`, `4020:51051`, `4020:51879` | P0 |
| **QR-UC02** | Xuất tệp dữ liệu danh sách cấu hình phí đối tác QRGW | Maker, Checker, Kế toán | `4020:50223` (Menu [Xuất tệp ▼]) | P1 |
| **QR-UC03** | Xem chi tiết cấu hình phí QRGW và Lịch sử thay đổi (Audit Trail) | Maker, Checker, Kiểm toán | `SCR-QR-DT-04` (`4116:32543`), `SCR-QR-DT-02A` (`4116:31644`), `4020:47172` | P0 |
| **QR-UC04** | Thêm mới cấu hình phí đối tác QRGW (Thu hộ/Chi hộ, QR Tĩnh/Động, Thanh toán/Hoàn trả) | Maker | Màn hình Form Thêm mới QRGW | P0 |
| **QR-UC05** | Xử lý thông tin hồ sơ & Phê duyệt cấu hình phí QRGW (Maker – Checker 4 mắt) | Maker, Checker, Quản lý | `4020:47923`, `4020:48856` | P0 |
| **QR-UC06** | Xóa bản ghi cấu hình phí đối tác QRGW | Maker | `4020:50006`, `4020:50223` (Menu row) | P1 |

---

## 2. Chi tiết từng Use Case phân hệ QRGW

### 2.1 QR-UC01: Tìm kiếm và xem danh sách cấu hình phí đối tác QRGW

#### 2.1.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Tra cứu và xem danh sách cấu hình phí đối tác Cổng QR Gateway (QRGW)** |
| **ID** | **QR - UC01** |
| **Description** | Cho phép người dùng tra cứu danh sách các biểu phí trả cho các ngân hàng thụ hưởng và nhà cung cấp kênh kết nối QR Gateway (BIDV, Vietcombank, MBBank, Napas VietQR...) theo bộ lọc 8 tiêu chí chuyên biệt cho QRGW, chuyển đổi giữa 3 tab trạng thái và phân trang kết quả. |
| **Actor** | Maker QRGW, Checker QRGW, Cán bộ Đối soát QR, Kế toán chi phí |
| **Trigger** | Người dùng click menu điều hướng: **`Quản lý cấu hình phí` > `Phí đối tác QRGW`** trên thanh Navigation bên trái. |
| **Pre-Condition** | Tài khoản đã đăng nhập hệ thống Portal và có quyền truy cập module Phí đối tác QRGW. |
| **Post-Condition** | Danh sách cấu hình phí QRGW được hiển thị chính xác theo điều kiện lọc và tab trạng thái kích hoạt. |
| **Basic flow** | 1. Người dùng chọn menu **`Quản lý cấu hình phí` > `Phí đối tác QRGW`**.<br>2. Hệ thống tải dữ liệu mặc định:<br>   - Tab kích hoạt mặc định: *Tab Tất cả*.<br>   - Nguồn dữ liệu cố định: `QRGW`.<br>   - Khoảng thời gian hiệu lực mặc định: *Ngày đầu tháng đến ngày hiện tại*.<br>   - Bảng dữ liệu hiển thị danh sách 20 bản ghi/trang sắp xếp theo ngày cập nhật mới nhất.<br>3. Người dùng chọn các tiêu chí lọc: Đối tác/Ngân hàng (BIDV QRGW, VCB QRGW, Napas VietQR...), Loại dịch vụ QRGW (Thu hộ Pay-In / Chi hộ Pay-Out), Loại QR (QR tĩnh / QR động), Kỳ trả phí, Trạng thái.<br>4. Bấm nút **[Tìm kiếm]**.<br>5. Hệ thống truy vấn CSDL và trả về danh sách biểu phí QRGW thỏa mãn điều kiện. |
| **Alternative flow** | - **A1**: Bấm nút **[Xóa]** $\rightarrow$ Khôi phục các tiêu chí lọc về giá trị mặc định.<br>- **A2**: Click chuyển sang *Tab Đang hoạt động* $\rightarrow$ Lọc bản ghi QRGW có `status = ACTIVE`.<br>- **A3**: Click chuyển sang *Tab Chờ phê duyệt* $\rightarrow$ Lọc bản ghi QRGW có `status = PENDING`.<br>- **A4**: Không tìm thấy bản ghi $\rightarrow$ Hiển thị bảng rỗng kèm thông báo *“Không tìm thấy kết quả phù hợp”*. |
| **Exception flow** | - **E1**: Lỗi kết nối cơ sở dữ liệu hoặc API Timeout $> 10$s.<br>- **E2**: Người dùng chọn thời gian áp dụng từ ngày lớn hơn đến ngày $\rightarrow$ Báo lỗi inline `E-004`. |
| **Business Rules** | QR-UC01-BR01.1 (Quy tắc hiển thị danh sách QRGW), QR-UC01-BR01.2 (Lọc theo tab trạng thái). |
| **Non-functional requirement** | Hiển thị kết quả tra cứu trong vòng không quá **03 giây**. |

#### 2.1.2 Giao diện

* **Màn hình Wireframe**: `QR-UC01-WF01.1` (Danh sách QRGW - Tab Tất cả), `QR-UC01-WF01.2` (Tab Đang hoạt động), `QR-UC01-WF01.3` (Tab Chờ phê duyệt).
* **Bảng Từ điển Trường Dữ liệu Màn hình QR-UC01**:

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Tiêu đề phân hệ** | Label | M | N | - | Hiển thị: *“Quản lý cấu hình phí trả đối tác — Cổng QRGW VietQR”*. |
| **Nguồn dữ liệu** | Dropdown | M | N | Fixed = "QRGW" | Cố định giá trị `QRGW` khi truy cập qua menu Phí đối tác QRGW. |
| **Đối tác / Ngân hàng** | Dropdown | O | Y | Multi-select | Danh sách ngân hàng kết nối QRGW (BIDV QRGW, Vietcombank QRGW, Napas...). |
| **Loại dịch vụ QRGW** | Dropdown | O | Y | Multi-select | `Thu hộ QR (Pay-In)`, `Chi hộ QR (Pay-Out)`. |
| **Loại QR** | Dropdown | O | Y | Multi-select | `QR tĩnh`, `QR động`. |
| **Loại giao dịch** | Dropdown | O | Y | Multi-select | `Thanh toán`, `Hoàn trả`. |
| **Thời gian hiệu lực** | DateRange | C | Y | Date format | Khoảng thời gian từ ngày đến ngày (tối đa 365 ngày). Mặc định: Đầu tháng đến hiện tại. |
| **Trạng thái cấu hình** | Dropdown | O | Y | Multi-select | New, Active, Inactive, Draft. |
| **Nút [Tìm kiếm]** | Button | O | Y | Click | Gửi truy vấn lọc dữ liệu danh sách QRGW. |
| **Nút [Xóa]** | Button | O | Y | Click | Clear bộ lọc về giá trị mặc định. |
| **Bảng Gridview QRGW** | Table | M | N | 10 cột chuẩn | Hiển thị: STT, Mã phí QRGW, Tên cấu hình, Đối tác QRGW, Loại dịch vụ, Loại QR, Kỳ trả phí, Thuế VAT, Thời gian áp dụng, Thao tác. Đã bỏ cột Trạng thái YCPD. Tham chiếu mục [2.1.5 Danh sách trường tin tùy chỉnh](#215-danh-sách-trường-tin-tùy-chỉnh). Mã phí là link xanh. |

#### 2.1.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **QR-UC01-BR01.1** | **Quy tắc phạm vi dữ liệu phân hệ QRGW** | Màn hình chỉ hiển thị các bản ghi cấu hình phí có `data_source = 'QRGW'` (bao gồm các luồng VietQR Thu hộ và Chi hộ). Tuyệt đối không hiển thị lẫn các bản ghi thuộc kênh CTT thẻ. |
| **QR-UC01-BR01.2** | **Quy tắc phân trang và hiển thị mặc định** | Phân trang mặc định là **20 dòng/trang** (có thể chọn: 5, 10, 20, 50, 100, 200, 500). Tab Tất cả mặc định nạp các bản ghi có trạng thái `NEW`, `ACTIVE`, `INACTIVE`. |

#### 2.1.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Lỗi kết nối cơ sở dữ liệu | Mất kết nối CSDL khi truy vấn danh sách QRGW | Critical | *“Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau hoặc liên hệ Quản trị viên!”* |
| **E2** | Không có quyền truy cập | Người dùng không có quyền tra cứu cấu hình phí QRGW | Major | *“Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ Quản trị viên!”* |
| **E3** | Lỗi kết nối mạng internet | Mất kết nối internet hoặc API Timeout $> 10$s | Major | *“Lỗi kết nối mạng internet. Vui lòng kiểm tra đường truyền và thử lại!”* |
| **E-004** | Ngày áp dụng không hợp lệ | Chọn Từ ngày lớn hơn Đến ngày, hoặc $> 365$ ngày | Major | *“Thời gian áp dụng từ ngày phải nhỏ hơn hoặc bằng đến ngày và khoảng cách không quá 365 ngày.”* |

#### 2.1.5 Danh sách trường tin tùy chỉnh

- **Lưu ý**: Dữ liệu được lấy theo bảng `TBL_XXXX` làm gốc, nếu thiếu thông tin sẽ join với bảng `TBL_YYYY`.
- User được phép **“Tùy chỉnh”** cột hiển thị trên Gridview QRGW.
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

### 2.2 QR-UC02: Xuất tệp dữ liệu danh sách cấu hình phí đối tác QRGW

#### 2.2.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xuất tệp dữ liệu danh sách cấu hình phí đối tác QRGW** |
| **ID** | **QR - UC02** |
| **Description** | Cho phép người dùng xuất dữ liệu bảng danh sách cấu hình phí QRGW ra tệp định dạng Excel hoặc PDF phục vụ đối soát cước VietQR và báo cáo tài chính. |
| **Actor** | Maker QRGW, Checker QRGW, Cán bộ Đối soát QR, Kế toán viên |
| **Trigger** | Click button **[Xuất tệp ▼]** trên thanh công cụ bảng danh sách QRGW. |
| **Pre-Condition** | Đã đăng nhập, có quyền xuất tệp và có kết quả danh sách QRGW trên màn hình. |
| **Post-Condition** | Tệp `.xlsx` hoặc `.pdf` được tải về máy tính với đầy đủ dữ liệu theo bộ lọc QRGW hiện tại. |
| **Basic flow** | 1. Người dùng chọn điều kiện lọc danh sách QRGW và bấm [Tìm kiếm].<br>2. Bấm [Xuất tệp ▼] $\rightarrow$ Chọn *Xuất Excel (.xlsx)* hoặc *Xuất PDF (.pdf)*.<br>3. Hệ thống kiểm tra số lượng bản ghi QRGW thỏa mãn điều kiện.<br>4. Hệ thống kết xuất dữ liệu và tải tệp về máy tính người dùng. |
| **Alternative flow** | Không có bản ghi nào $\rightarrow$ Hiển thị cảnh báo: *“Không có dữ liệu để xuất tệp”*. |
| **Business Rules** | QR-UC02-BR01.1 (Quy tắc đặt tên file QRGW), QR-UC02-BR01.2 (Lưu vết log xuất file). |
| **Non-functional requirement** | Xuất tệp $< 5$ giây cho tập dữ liệu dưới 5.000 dòng. |

#### 2.2.2 Giao diện
* Menu Dropdown [Xuất tệp ▼] gồm 2 lựa chọn: *Xuất Excel (.xlsx)* và *Xuất PDF (.pdf)*.

#### 2.2.3 Yêu cầu nghiệp vụ chung
* **QR-UC02-BR01.1**: Quy chuẩn tên tệp: `EPAY_CHP_QRGW_[TabName]_[ddMMyyyy_HHmmss].xlsx`.
* **QR-UC02-BR01.2**: Ghi nhận nhật ký xuất tệp: User ID, thời gian xuất, điều kiện lọc và số lượng bản ghi QRGW đã xuất.

---

### 2.3 QR-UC03: Xem chi tiết cấu hình phí QRGW và Lịch sử thay đổi (Audit Trail)

#### 2.3.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xem chi tiết cấu hình phí QRGW và Lịch sử thay đổi** |
| **ID** | **QR - UC03** |
| **Description** | Hiển thị toàn diện thông tin cấu hình biểu phí QRGW gồm Khối Thông tin chung, Khối YCPD (nếu có), Khối Thông tin cấu hình (Thu hộ/Chi hộ, QR Tĩnh/Động), Khối Thông tin Phí theo từng loại giao dịch (Thanh toán & Hoàn trả), thanh tác vụ động và tab dòng thời gian Audit Trail. |
| **Actor** | Maker QRGW, Checker QRGW, Kiểm toán viên, Cán bộ Đối soát QR |
| **Trigger** | Click vào hyperlink **[Mã phí QRGW]** trên bảng danh sách, hoặc chọn **[Xem chi tiết]** từ menu 3 chấm. |
| **Pre-Condition** | Bản ghi cấu hình QRGW tồn tại trong CSDL và người dùng có quyền xem. |
| **Post-Condition** | Màn hình hiển thị đầy đủ thông tin chi tiết cấu hình phí QRGW và lịch sử cập nhật. |
| **Basic flow** | 1. Click vào Mã cấu hình QRGW (vd: `QR_FE_NAPAS_002`).<br>2. Hệ thống nạp thông tin bản ghi QRGW từ CSDL.<br>3. Hệ thống hiển thị giao diện Chi tiết QRGW:<br>   - **Tiêu đề**: `QR_FE_NAPAS_002 - Biểu phí Dịch vụ Cổng QRGW VietQR` kèm badge trạng thái cấu hình (`● ACTIVE` hoặc `● PENDING`).<br>   - **Khối Thông tin chung** (chiều cao 182px, phẳng đáy): Mã phí, Loại phí, Trạng thái cấu hình badge, Trạng thái YCPD badge, Người tạo, Ngày tạo, Người cập nhật cuối, Ngày cập nhật, Người phê duyệt.<br>   - **Khối Yêu cầu phê duyệt** (chiều cao 182px, phẳng đáy): Mã yêu cầu `AR_MM_MC_...`, Thời gian tạo, Trạng thái YCPD (`● PENDING`), Người tạo, Phòng ban.<br>   - **Khối Thông tin cấu hình phí**: Nguồn dữ liệu (`QRGW`), Đối tác/Ngân hàng hưởng phí (`BIDV QRGW`), Kỳ trả phí (`Theo tháng`), Thời gian áp dụng phí (`01/01/2026`), Loại dịch vụ QRGW (`Thu hộ QR (Pay-In)`), Loại QR (`QR tĩnh`), Loại giao dịch (`Thanh toán`), Trạng thái giao dịch (`Thành công`), Đơn vị tiền tệ (`VND`), Thuế VAT (`8%`), Mô tả cấu hình.<br>   - **Khối Thông tin Phí cho từng loại giao dịch**:<br>     + Radio: `Không áp dụng` (tách riêng cho Thanh toán và Hoàn trả).<br>     + Bảng Loại giao dịch Thanh toán: Hình thức thu phí `Theo GTGD (% Tỷ lệ có Min/Max)`, Mức phí tỷ lệ `0.65%`, Min `1.500 đ`, Max `30.000 đ`.<br>     + Bảng Loại giao dịch Hoàn trả: Cách tính ngày áp dụng phí trên giao dịch `Ngày phát sinh giao dịch gốc`, Hình thức thu phí `1 bậc phí (Cố định theo GD)`, Mức phí cố định `1.000 đ`.<br>   - Thanh tác vụ chân trang động theo vai trò và trạng thái bản ghi.<br>4. Click tab **[Lịch sử hoạt động]** $\rightarrow$ Xem dòng thời gian Timeline View các biến động CŨ $\rightarrow$ MỚI. |
| **Business Rules** | QR-UC03-BR01.1 (Layout song song 182px Khối Thông tin chung và YCPD), QR-UC03-BR01.2 (Quy tắc cấu hình phí Hoàn trả theo ngày phát sinh GD gốc). |
| **Non-functional requirement** | Nạp màn hình chi tiết QRGW $< 1.0$ giây. |

#### 2.3.2 Giao diện

* **Màn hình Wireframe**:
  - `SCR-QR-DT-04` (Figma node `4116:32543`): Chi tiết Phí QRGW — Trạng thái Active.
  - `SCR-QR-DT-02A` (Figma node `4116:31644`): Chi tiết Phí QRGW — Trạng thái Pending (Maker View).
* **Bảng Từ điển Trường Dữ liệu Màn hình Chi tiết QRGW**:

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Khối Thông tin chung** | Container | M | N | Height = 182px | Chứa thông tin tổng quan bản ghi QRGW, mép đáy phẳng với Khối YCPD. |
| **Trạng thái cấu hình** | Badge | M | N | Enum Status | Hiển thị trạng thái: `ACTIVE`, `PENDING`, `INACTIVE`. |
| **Khối Yêu cầu phê duyệt** | Container | C | N | Height = 182px | Hiển thị khi bản ghi QRGW đang chờ duyệt hoặc có hồ sơ YCPD. |
| **Nút [Thay đổi người PD]** | Button | C | Y | Click | Hiển thị trong Khối YCPD cho Maker khi bản ghi PENDING. |
| **Nguồn dữ liệu cấu hình** | Text | M | N | Fixed = "QRGW" | Cố định `QRGW`. |
| **Loại dịch vụ QRGW** | Text | M | N | String | `Thu hộ QR (Pay-In)` hoặc `Chi hộ QR (Pay-Out)`. |
| **Loại QR** | Text | M | N | String | `QR tĩnh` hoặc `QR động`. |
| **Thuế VAT** | Number | M | N | 8% | Mặc định 8%. |
| **Bảng GD Thanh toán (QRGW)** | Table | M | N | Readonly | Hình thức thu phí (% Min/Max), Tỷ lệ: 0.65%, Min: 1.500 đ, Max: 30.000 đ. |
| **Bảng GD Hoàn trả (QRGW)** | Table | M | N | Readonly | Cách tính ngày áp dụng: Ngày phát sinh GD gốc, Phí cố định: 1.000 đ/giao dịch. |
| **Cụm nút Chân trang QRGW** | Button Group | M | Y | Click | Active: [Chỉnh sửa], [Tạm dừng], [Sao chép]; Pending: [Quay lại], [Lịch sử], [Rút yêu cầu] (Maker) hoặc [Từ chối], [Phê duyệt] (Checker). |

#### 2.3.3 Yêu cầu nghiệp vụ chung
* **QR-UC03-BR01.1**: Khối Thông tin chung và Khối Yêu cầu phê duyệt cố định chiều cao đúng 182px, giãn dòng 9px, mép đáy phẳng tuyệt đối.
* **QR-UC03-BR01.2**: Phí hoàn trả QRGW hỗ trợ tùy chọn: Áp dụng theo ngày phát sinh giao dịch gốc hoặc ngày phát sinh giao dịch hoàn trả thực tế.

---

### 2.4 QR-UC04: Thêm mới cấu hình phí đối tác QRGW

#### 2.4.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Thêm mới cấu hình phí đối tác Cổng QRGW VietQR** |
| **ID** | **QR - UC04** |
| **Description** | Cho phép Maker tạo mới biểu phí đối tác cho kênh QRGW (VietQR); hỗ trợ phân tách cấu hình giữa Thu hộ (Pay-In) và Chi hộ (Pay-Out); hỗ trợ QR Tĩnh và QR Động; cấu hình phí riêng biệt cho giao dịch Thanh toán (% có Min/Max) và Hoàn trả (Phí cố định theo GD); hỗ trợ Lưu nháp (`DRAFT`) hoặc Lưu mới (`NEW`). |
| **Actor** | Maker QRGW |
| **Trigger** | Maker bấm button **[+ Thêm mới]** khi đang ở phân hệ Phí đối tác QRGW. |
| **Pre-Condition** | Đăng nhập tài khoản Maker; Master Data đối tác ngân hàng QRGW đã sẵn sàng. |
| **Post-Condition** | Bản ghi cấu hình phí QRGW được lưu vào CSDL với trạng thái `DRAFT` hoặc `NEW`. |
| **Basic flow** | 1. Bấm [+ Thêm mới] $\rightarrow$ Mở form Thêm mới cấu hình phí QRGW.<br>2. Nguồn dữ liệu cố định: `QRGW`. Maker chọn Đối tác/Ngân hàng hưởng phí (BIDV QRGW, Napas...), Kỳ trả phí (Theo tháng/quý), Thời gian áp dụng phí, Thuế VAT (8%), Mô tả.<br>3. Chọn Loại dịch vụ QRGW: `Thu hộ QR (Pay-In)` hoặc `Chi hộ QR (Pay-Out)`.<br>4. Chọn Loại QR: `QR tĩnh` hoặc `QR động`.<br>5. Cấu hình chi tiết biểu phí từng loại giao dịch:<br>   - *Giao dịch Thanh toán*: Chọn hình thức *Theo GTGD (% Tỷ lệ có Min/Max)*, nhập Tỷ lệ % (vd: 0.65%), Mức phí tối thiểu Min (vd: 1.500đ), Mức phí tối đa Max (vd: 30.000đ).<br>   - *Giao dịch Hoàn trả*: Chọn Cách tính ngày áp dụng phí trên giao dịch (*Ngày phát sinh giao dịch gốc* hoặc *Ngày giao dịch hoàn trả*), chọn Hình thức thu phí *1 bậc phí (Cố định theo GD)*, nhập Mức phí cố định (vd: 1.000đ).<br>6. Bấm **[Lưu nháp]** (lưu `DRAFT`) hoặc **[Tạo mới +]** (validate đủ 100% trường (*) $\rightarrow$ lưu `NEW`). |
| **Business Rules** | QR-UC04-BR01.1 (Phân định Draft/New), QR-UC04-BR01.2 (Ràng buộc $0 \le \text{Min} \le \text{Max}$). |
| **Non-functional requirement** | Validate form tức thì; Lưu bản ghi mới $< 1.0$ giây. |

#### 2.4.2 Giao diện
* **Màn hình Wireframe**: Form Thêm mới Biểu phí QRGW VietQR (chia 2 khối giao dịch Thanh toán và Hoàn trả).

#### 2.4.3 Yêu cầu nghiệp vụ chung
* **QR-UC04-BR01.1**: Ràng buộc biểu phí giao dịch Thanh toán: Mức phí tối thiểu (Min) phải $\le$ Mức phí tối đa (Max).
* **QR-UC04-BR01.2**: Đối với phí Hoàn trả QRGW: Nếu cấu hình theo phí cố định thì không bắt buộc nhập tỷ lệ %.

---

### 2.5 QR-UC05: Xử lý thông tin hồ sơ & Phê duyệt cấu hình phí QRGW

#### 2.5.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xử lý hồ sơ và Quy trình Phê duyệt Maker – Checker cấu hình phí QRGW** |
| **ID** | **QR - UC05** |
| **Description** | Quản lý vòng đời phê duyệt và thẩm định CŨ – MỚI cho biểu phí QRGW theo nguyên tắc 4 mắt: Gửi duyệt, Rút yêu cầu, Đổi người duyệt, Phê duyệt, Từ chối, Tạm dừng và Mở kích hoạt. |
| **Actor** | Maker QRGW, Checker QRGW, Quản lý Maker |
| **Trigger** | Maker bấm gửi phê duyệt/tạm dừng/kích hoạt; hoặc Checker bấm phê duyệt/từ chối trên hồ sơ QRGW. |
| **Pre-Condition** | Bản ghi QRGW ở trạng thái hợp lệ tương ứng với từng hành động. |
| **Post-Condition** | Bản ghi QRGW và hồ sơ YCPD chuyển trạng thái chính xác theo Ma trận nghiệp vụ. |
| **Basic flow** | 1. Maker gửi yêu cầu phê duyệt từ `NEW`, `ACTIVE` hoặc `INACTIVE`.<br>2. Hệ thống sinh mã YCPD `AR_MM_MC_[Timestamp]`, insert bản ghi YCPD tương ứng trạng thái `Pending`.<br>3. Checker mở màn hình Thẩm định đối chiếu CŨ – MỚI biểu phí QRGW.<br>4. Checker bấm **[Phê duyệt]** $\rightarrow$ YCPD = `Approval`, CHP QRGW chuyển `ACTIVE` (hoặc `READY` nếu ngày áp dụng tương lai). Hoặc bấm **[Từ chối]** $\rightarrow$ Nhập lý do $\ge 10$ ký tự $\rightarrow$ YCPD = `Rejected`, CHP QRGW chuyển về `NEW` (hoặc `REJECTED`). |
| **Business Rules** | Tham chiếu mục **2.5.5: Ma trận Quy tắc Nghiệp vụ Chung Vòng đời Bản ghi QRGW**. |

#### 2.5.2 Giao diện
* **Màn hình Wireframe**: Checker Thẩm định CŨ MỚI QRGW (`4020:48856`), Chờ phê duyệt (`4020:47923`), Modal Từ chối kèm lý do.

#### 2.5.5 Yêu cầu nghiệp vụ chung (Phân hệ QRGW)
* **Bảng mapping 4 loại YCPD sinh ra cho QRGW**:
  - `New` $\rightarrow$ Gửi yêu cầu phê duyệt $\rightarrow$ **Duyệt mở tạo hồ sơ CHP Trả đối tác**
  - `Active` $\rightarrow$ Gửi phê duyệt cập nhật thông tin $\rightarrow$ **Duyệt cập nhật hồ sơ CHP Trả đối tác**
  - `Active` $\rightarrow$ Gửi yêu cầu tạm dừng $\rightarrow$ **Duyệt tạm dừng hồ sơ CHP Trả đối tác**
  - `Inactive` $\rightarrow$ Gửi yêu cầu mở kích hoạt $\rightarrow$ **Duyệt mở kích hoạt CHP Trả đối tác**
* **Ma trận 11 cột kiểm soát 30 dòng hành động bóc tách độc lập**: Áp dụng chuẩn ma trận đã thống nhất tại file [Quy_Tac_Nghiep_Vu_Cau_Hinh_Phi_Tra_Doi_Tac.xlsx](file:///c:/Users/Admin/ForWork/Quy_Tac_Nghiep_Vu_Cau_Hinh_Phi_Tra_Doi_Tac.xlsx).

---

### 2.6 QR-UC06: Xóa bản ghi cấu hình phí đối tác QRGW

#### 2.6.1 Use case
* **Use Case**: Xóa bản ghi cấu hình phí QRGW | **ID**: `QR - UC06` | **Actor**: Maker QRGW.
* **Nghiệp vụ**: Chỉ cho phép xóa bản ghi QRGW ở trạng thái `DRAFT`, `NEW`, `REJECTED`. Cấm xóa bản ghi `ACTIVE`, `READY`, `INACTIVE` (`E-008`) hoặc đang `PENDING` (`E-007`). Thực hiện Soft-Delete lưu vết audit.
