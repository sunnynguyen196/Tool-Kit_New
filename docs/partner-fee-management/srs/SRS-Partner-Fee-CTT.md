---
type: srs-usecases-ctt
feature: partner-fee-management-ctt
title: "Tài liệu SRS — Quản lý Cấu hình Phí Đối tác CTT (Cổng Thanh Toán)"
channel: "CTT"
version: "V0.4"
code: "EPAY-QT.CG.02_BM.33-CTT"
security: "Lưu hành nội bộ"
updated: 2026-11-07
links:
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - excel: Quy_Tac_Nghiep_Vu_Cau_Hinh_Phi_Tra_Doi_Tac.xlsx
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# PHẦN 1: QUẢN LÝ CẤU HÌNH PHÍ ĐỐI TÁC CTT (CỔNG THANH TOÁN)

## 1. Danh sách các Use Case phân hệ CTT

| Mã Use Case | Tên Use Case CTT | Actor chính | Màn hình Figma liên kết | Ưu tiên |
|---|---|---|---|:---:|
| **CTT-UC01** | Tìm kiếm và xem danh sách cấu hình phí đối tác CTT | Maker, Checker, Đối soát | `4020:50223`, `4020:51051`, `4020:51879` | P0 |
| **CTT-UC02** | Xuất tệp dữ liệu danh sách cấu hình phí đối tác CTT | Maker, Checker, Kế toán | `4020:50223` (Menu [Xuất tệp ▼]) | P1 |
| **CTT-UC03** | Xem chi tiết cấu hình phí CTT và Lịch sử thay đổi (Audit Trail) | Maker, Checker, Kiểm toán | `SCR-CTT-DT-04` (`4116:30335`), `SCR-CTT-DT-02A` (`4116:29110`), `4020:47172` | P0 |
| **CTT-UC04** | Thêm mới cấu hình phí đối tác CTT (Duy trì, Xử lý GD, Thanh toán, DVGT, Hoàn trả) | Maker | `4022:53508` – `4022:58264`, `4018:36498` | P0 |
| **CTT-UC05** | Xử lý thông tin hồ sơ & Phê duyệt cấu hình phí CTT (Maker – Checker 4 mắt) | Maker, Checker, Quản lý | `4020:47923`, `4020:48856`, `4020:36844` – `4020:43097` | P0 |
| **CTT-UC06** | Xóa bản ghi cấu hình phí đối tác CTT | Maker | `4020:50006`, `4020:50223` (Menu row) | P1 |

---

## 2. Chi tiết từng Use Case phân hệ CTT

### 2.1 CTT-UC01: Tìm kiếm và xem danh sách cấu hình phí đối tác CTT

#### 2.1.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Tra cứu và xem danh sách cấu hình phí đối tác Cổng Thanh Toán (CTT)** |
| **ID** | **CTT - UC01** |
| **Description** | Cho phép người dùng tra cứu danh sách các biểu phí trả cho các ngân hàng và tổ chức thẻ kết nối qua Cổng thanh toán (CTT) theo bộ lọc 8 tiêu chí, chuyển đổi giữa 3 tab trạng thái và phân trang kết quả. |
| **Actor** | Maker CTT, Checker CTT, Cán bộ Đối soát, Kế toán chi phí |
| **Trigger** | Người dùng click menu điều hướng: **`Quản lý cấu hình phí` > `Phí đối tác CTT`** trên thanh Navigation bên trái. |
| **Pre-Condition** | Tài khoản đã đăng nhập hệ thống Portal và có quyền truy cập module Phí đối tác CTT. |
| **Post-Condition** | Danh sách cấu hình phí CTT được hiển thị theo đúng điều kiện tìm kiếm và tab trạng thái kích hoạt. |
| **Basic flow** | 1. Người dùng chọn menu **`Quản lý cấu hình phí` > `Phí đối tác CTT`**.<br>2. Hệ thống tải dữ liệu mặc định:<br>   - Tab kích hoạt mặc định: *Tab Tất cả*.<br>   - Nguồn dữ liệu cố định: `CTT`.<br>   - Khoảng thời gian hiệu lực mặc định: *Ngày đầu tháng đến ngày hiện tại*.<br>   - Bảng dữ liệu hiển thị danh sách 20 bản ghi/trang sắp xếp theo ngày cập nhật mới nhất.<br>3. Người dùng chọn các tiêu chí lọc: Đối tác/Ngân hàng (Vietcombank, BIDV, MBBank...), Loại phí CTT (Duy trì, Xử lý GD, Thanh toán, DVGT), PTTT (Thẻ quốc tế Visa/Master/JCB, Thẻ nội địa Napas), Kỳ trả phí, Trạng thái.<br>4. Bấm nút **[Tìm kiếm]**.<br>5. Hệ thống truy vấn CSDL và trả về danh sách biểu phí CTT thỏa mãn điều kiện. |
| **Alternative flow** | - **A1**: Bấm nút **[Xóa]** $\rightarrow$ Khôi phục các tiêu chí lọc về giá trị mặc định.<br>- **A2**: Click chuyển sang *Tab Đang hoạt động* $\rightarrow$ Lọc bản ghi `status = ACTIVE`.<br>- **A3**: Click chuyển sang *Tab Chờ phê duyệt* $\rightarrow$ Lọc bản ghi `status = PENDING`.<br>- **A4**: Không tìm thấy bản ghi $\rightarrow$ Hiển thị bảng rỗng kèm thông báo *“Không tìm thấy kết quả phù hợp”*. |
| **Exception flow** | - **E1**: Lỗi kết nối cơ sở dữ liệu hoặc API Timeout $> 10$s.<br>- **E2**: Người dùng chọn thời gian áp dụng từ ngày lớn hơn đến ngày $\rightarrow$ Báo lỗi inline `E-004`. |
| **Business Rules** | CTT-UC01-BR01.1 (Quy tắc hiển thị danh sách CTT), CTT-UC01-BR01.2 (Lọc theo tab trạng thái). |
| **Non-functional requirement** | Hiển thị kết quả tra cứu trong vòng không quá **03 giây**. |

#### 2.1.2 Giao diện

* **Màn hình Wireframe**: `CTT-UC01-WF01.1` (Danh sách CTT - Tab Tất cả), `CTT-UC01-WF01.2` (Tab Đang hoạt động), `CTT-UC01-WF01.3` (Tab Chờ phê duyệt).
* **Bảng Từ điển Trường Dữ liệu Màn hình CTT-UC01**:

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Tiêu đề phân hệ** | Label | M | N | - | Hiển thị: *“Quản lý cấu hình phí trả đối tác — Cổng Thanh Toán (CTT)”*. |
| **Nguồn dữ liệu** | Dropdown | M | N | Fixed = "CTT" | Cố định giá trị `CTT` khi truy cập qua menu Phí đối tác CTT. |
| **Đối tác / Ngân hàng** | Dropdown | O | Y | Multi-select | Danh sách ngân hàng kết nối CTT (Vietcombank, MB, BIDV, CyberSource...). |
| **Phương thức thanh toán** | Dropdown | O | Y | Multi-select | Thẻ quốc tế (Visa, Master, JCB), Thẻ ATM nội địa Napas, Ví điện tử. |
| **Loại phí CTT** | Dropdown | O | Y | Multi-select | Phí sử dụng dịch vụ, Phí thanh toán, Phí xử lý giao dịch, Phí DVGT. |
| **Thời gian hiệu lực** | DateRange | C | Y | Date format | Khoảng thời gian từ ngày đến ngày (tối đa 365 ngày). Mặc định: Đầu tháng đến hiện tại. |
| **Trạng thái cấu hình** | Dropdown | O | Y | Multi-select | New, Active, Inactive, Draft. |
| **Nút [Tìm kiếm]** | Button | O | Y | Click | Gửi truy vấn lọc dữ liệu danh sách CTT. |
| **Nút [Xóa]** | Button | O | Y | Click | Clear bộ lọc về giá trị mặc định. |
| **Bảng Gridview CTT** | Table | M | N | 10 cột chuẩn | Hiển thị: STT, Mã phí CTT, Tên cấu hình, Đối tác, PTTT, Loại phí, Kỳ trả phí, Thuế VAT, Thời gian áp dụng, Thao tác. Đã bỏ cột Trạng thái YCPD. Tham chiếu mục [2.1.5 Danh sách trường tin tùy chỉnh](#215-danh-sách-trường-tin-tùy-chỉnh). Mã phí là link xanh. |

#### 2.1.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **CTT-UC01-BR01.1** | **Quy tắc phạm vi dữ liệu phân hệ CTT** | Màn hình chỉ hiển thị các bản ghi cấu hình phí có `data_source = 'CTT'` (bao gồm các giao dịch qua Cổng thanh toán quốc tế và nội địa). Tuyệt đối không hiển thị lẫn các bản ghi thuộc kênh QRGW. |
| **CTT-UC01-BR01.2** | **Quy tắc phân trang và hiển thị mặc định** | Phân trang mặc định là **20 dòng/trang** (có thể chọn: 5, 10, 20, 50, 100, 200, 500). Tab Tất cả mặc định nạp các bản ghi có trạng thái `NEW`, `ACTIVE`, `INACTIVE`. |

#### 2.1.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Lỗi kết nối cơ sở dữ liệu | Mất kết nối CSDL khi truy vấn danh sách CTT | Critical | *“Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau hoặc liên hệ Quản trị viên!”* |
| **E2** | Không có quyền truy cập | Người dùng không có quyền tra cứu cấu hình phí CTT | Major | *“Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ Quản trị viên!”* |
| **E3** | Lỗi kết nối mạng internet | Mất kết nối internet hoặc API Timeout $> 10$s | Major | *“Lỗi kết nối mạng internet. Vui lòng kiểm tra đường truyền và thử lại!”* |
| **E-004** | Ngày áp dụng không hợp lệ | Chọn Từ ngày lớn hơn Đến ngày, hoặc $> 365$ ngày | Major | *“Thời gian áp dụng từ ngày phải nhỏ hơn hoặc bằng đến ngày và khoảng cách không quá 365 ngày.”* |

#### 2.1.5 Danh sách trường tin tùy chỉnh

- **Lưu ý**: Dữ liệu được lấy theo bảng `TBL_XXXX` làm gốc, nếu thiếu thông tin sẽ join với bảng `TBL_YYYY`.
- User được phép **“Tùy chỉnh”** cột hiển thị trên Gridview CTT.
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

### 2.2 CTT-UC02: Xuất tệp dữ liệu danh sách cấu hình phí đối tác CTT

#### 2.2.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xuất tệp dữ liệu danh sách cấu hình phí đối tác CTT** |
| **ID** | **CTT - UC02** |
| **Description** | Cho phép người dùng xuất dữ liệu bảng danh sách cấu hình phí CTT ra tệp định dạng Excel hoặc PDF phục vụ đối soát và báo cáo kế toán. |
| **Actor** | Maker CTT, Checker CTT, Cán bộ Đối soát, Kế toán viên |
| **Trigger** | Click button **[Xuất tệp ▼]** trên thanh công cụ bảng danh sách CTT. |
| **Pre-Condition** | Đã đăng nhập, có quyền xuất tệp và có kết quả danh sách CTT trên màn hình. |
| **Post-Condition** | Tệp `.xlsx` hoặc `.pdf` được tải về máy tính với đầy đủ dữ liệu theo bộ lọc CTT hiện tại. |
| **Basic flow** | 1. Người dùng chọn điều kiện lọc danh sách CTT và bấm [Tìm kiếm].<br>2. Bấm [Xuất tệp ▼] $\rightarrow$ Chọn *Xuất Excel (.xlsx)* hoặc *Xuất PDF (.pdf)*.<br>3. Hệ thống kiểm tra số lượng bản ghi CTT thỏa mãn điều kiện.<br>4. Hệ thống kết xuất dữ liệu và tải tệp về máy tính người dùng. |
| **Alternative flow** | Không có bản ghi nào $\rightarrow$ Hiển thị cảnh báo: *“Không có dữ liệu để xuất tệp”*. |
| **Business Rules** | CTT-UC02-BR01.1 (Quy tắc đặt tên file CTT), CTT-UC02-BR01.2 (Lưu vết log xuất file). |
| **Non-functional requirement** | Xuất tệp $< 5$ giây cho tập dữ liệu dưới 5.000 dòng. |

#### 2.2.2 Giao diện
* Menu Dropdown [Xuất tệp ▼] gồm 2 lựa chọn: *Xuất Excel (.xlsx)* và *Xuất PDF (.pdf)*.

#### 2.2.3 Yêu cầu nghiệp vụ chung
* **CTT-UC02-BR01.1**: Quy chuẩn tên tệp: `EPAY_CHP_CTT_[TabName]_[ddMMyyyy_HHmmss].xlsx`.
* **CTT-UC02-BR01.2**: Ghi nhận nhật ký xuất tệp: User ID, thời gian xuất, điều kiện lọc và số lượng bản ghi CTT đã xuất.

---

### 2.3 CTT-UC03: Xem chi tiết cấu hình phí CTT và Lịch sử thay đổi (Audit Trail)

#### 2.3.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xem chi tiết cấu hình phí CTT và Lịch sử thay đổi** |
| **ID** | **CTT - UC03** |
| **Description** | Hiển thị toàn diện thông tin cấu hình phí CTT gồm Khối Thông tin chung, Khối YCPD (nếu có), Khối Chi tiết mức phí theo thương hiệu thẻ/bậc phí/DVGT, thanh tác vụ động và tab dòng thời gian Audit Trail. |
| **Actor** | Maker CTT, Checker CTT, Kiểm toán viên, Cán bộ Đối soát |
| **Trigger** | Click vào hyperlink **[Mã phí CTT]** trên bảng danh sách, hoặc chọn **[Xem chi tiết]** từ menu 3 chấm. |
| **Pre-Condition** | Bản ghi cấu hình CTT tồn tại trong CSDL và người dùng có quyền xem. |
| **Post-Condition** | Màn hình hiển thị đầy đủ thông tin chi tiết cấu hình phí CTT và lịch sử cập nhật. |
| **Basic flow** | 1. Click vào Mã cấu hình CTT (vd: `CTT_FE_VCB_001`).<br>2. Hệ thống nạp thông tin bản ghi CTT từ CSDL.<br>3. Hệ thống hiển thị giao diện Chi tiết CTT:<br>   - **Khối Thông tin chung**: Mã phí CTT, Loại phí, Trạng thái cấu hình badge, Trạng thái YCPD badge, Người tạo, Ngày tạo, Người cập nhật cuối, Ngày cập nhật, Người phê duyệt.<br>   - **Khối Yêu cầu phê duyệt** (chiều cao 182px, phẳng đáy): Mã yêu cầu `AR_MM_MC_...`, Thời gian tạo, Trạng thái YCPD (`● PENDING`), Người tạo, Phòng ban.<br>   - **Khối Cấu hình phí CTT**: Đối tác, Cổng TGTT (CTT), PTTT (Thẻ quốc tế / Thẻ nội địa), Kỳ trả phí, Thuế VAT (8%), Mô tả.<br>   - **Khối Chi tiết mức phí**: Biểu phí 1 bậc hoặc Bậc thang theo thương hiệu (Visa/Master/JCB), Tỷ lệ %, Min, Max.<br>   - Thanh tác vụ nổi chân trang theo vai trò và trạng thái bản ghi.<br>4. Click tab **[Lịch sử hoạt động]** $\rightarrow$ Xem dòng thời gian Timeline View các biến động CŨ $\rightarrow$ MỚI. |
| **Business Rules** | CTT-UC03-BR01.1 (Quy tắc layout 182px Khối Thông tin chung và YCPD), CTT-UC03-BR01.2 (Phân quyền toolbar Maker/Checker). |
| **Non-functional requirement** | Nạp màn hình chi tiết CTT $< 1.0$ giây. |

#### 2.3.2 Giao diện

* **Màn hình Wireframe**:
  - `SCR-CTT-DT-04` (Figma node `4116:30335`): Chi tiết Phí CTT — Trạng thái Active.
  - `SCR-CTT-DT-02A` (Figma node `4116:29110`): Chi tiết Phí CTT — Trạng thái Pending (Maker View).
* **Bảng Từ điển Trường Dữ liệu Màn hình Chi tiết CTT**:

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Khối Thông tin chung** | Container | M | N | Height = 182px | Chứa thông tin tổng quan bản ghi CTT, mép đáy phẳng với Khối YCPD. |
| **Trạng thái cấu hình** | Badge | M | N | Enum Status | Hiển thị trạng thái: `ACTIVE`, `PENDING`, `INACTIVE`. |
| **Khối Yêu cầu phê duyệt** | Container | C | N | Height = 182px | Hiển thị khi bản ghi CTT đang chờ duyệt hoặc có hồ sơ YCPD. |
| **Nút [Thay đổi người PD]** | Button | C | Y | Click | Hiển thị trong Khối YCPD cho Maker khi bản ghi PENDING. |
| **Thương hiệu thẻ áp dụng** | Tag List | C | N | List tags | Visa, MasterCard, JCB, Napas. |
| **Bảng Mức phí CTT** | Table | M | N | Readonly | Mức phí tỷ lệ %, Phí tối thiểu (Min VND), Phí tối đa (Max VND). |
| **Cụm nút Chân trang CTT** | Button Group | M | Y | Click | Active: [Chỉnh sửa], [Tạm dừng], [Sao chép]; Pending: [Quay lại], [Rút yêu cầu] (Maker) hoặc [Từ chối], [Phê duyệt] (Checker). |

#### 2.3.3 Yêu cầu nghiệp vụ chung
* **CTT-UC03-BR01.1**: Khối Thông tin chung và Khối Yêu cầu phê duyệt cố định chiều cao đúng 182px, giãn dòng 9px, mép đáy phẳng tuyệt đối.
* **CTT-UC03-BR01.2**: Cấm Maker tự phê duyệt bản ghi do chính mình tạo ra (Nguyên tắc 4 mắt).

---

### 2.4 CTT-UC04: Thêm mới cấu hình phí đối tác CTT (4 nhóm phí & Simulator)

#### 2.4.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Thêm mới cấu hình phí đối tác Cổng Thanh Toán (CTT)** |
| **ID** | **CTT - UC04** |
| **Description** | Hỗ trợ Maker thiết lập mới biểu phí đối tác cho phân hệ CTT với 4 nhóm phí chuyên biệt (Duy trì, Xử lý GD, Thanh toán, DVGT) và Hoàn trả Thẻ QT/Nội địa; tích hợp công cụ mô phỏng Tính thử phí 🧮; cho phép Lưu nháp (`DRAFT`) hoặc Lưu mới (`NEW`). |
| **Actor** | Maker CTT |
| **Trigger** | Maker bấm button **[+ Thêm mới]** khi đang ở phân hệ Phí đối tác CTT. |
| **Pre-Condition** | Đăng nhập tài khoản Maker; Master Data ngân hàng CTT, mã ngành MCC, thương hiệu thẻ đã sẵn sàng. |
| **Post-Condition** | Bản ghi cấu hình phí CTT được lưu vào CSDL với trạng thái `DRAFT` hoặc `NEW`. |
| **Basic flow** | 1. Bấm [+ Thêm mới] $\rightarrow$ Mở form Thêm mới cấu hình phí CTT.<br>2. Nguồn dữ liệu cố định: `CTT`. Maker chọn Đối tác/Ngân hàng thụ hưởng, Kỳ trả phí, Thời gian áp dụng phí, Thuế VAT (8%), Mô tả.<br>3. Maker cấu hình loại phí CTT tương ứng:<br>   - *Phí duy trì*: Chọn toàn bộ MID hoặc từng MID.<br>   - *Phí xử lý GD*: Chọn mã ngành MCC (Dual-Listbox), chọn Áp dụng chung hoặc Tách riêng Thanh toán / Hoàn trả.<br>   - *Phí thanh toán*: Chọn Cổng CTT, PTTT, 1 bậc phí hoặc Bậc thang thương hiệu thẻ (Visa, Master, JCB); nhập Tỷ lệ %, Min, Max.<br>   - *Phí DVGT*: Tách riêng Tokenization, Quản lý rủi ro 3DS, FastPay bypass OTP.<br>   - *Biến thể Hoàn trả*: Cấu hình phí hoàn trả Thẻ quốc tế hoặc Thẻ nội địa.<br>4. *(Tùy chọn)* Bấm **[Tính thử 🧮]** $\rightarrow$ Popup Simulator mô phỏng tiền phí.<br>5. Bấm **[Lưu nháp]** (lưu `DRAFT`) hoặc **[Tạo mới +]** (validate đủ 100% trường (*) $\rightarrow$ lưu `NEW`). |
| **Business Rules** | CTT-UC04-BR01.1 (Phân định Draft/New), CTT-UC04-BR01.2 (Ràng buộc $0 \le \text{Min} \le \text{Max}$), CTT-UC04-BR01.3 (Công thức Simulator có thuế VAT). |
| **Non-functional requirement** | Validate form tức thì; Simulator tính toán $< 500$ms. |

#### 2.4.2 Giao diện
* **Màn hình Wireframe**: `4022:53508` – `4022:58264`, Popup Simulator `4018:36498` & `4018:36606`, Hoàn trả Thẻ QT/Nội địa `4018:34716` & `4018:35488`.

#### 2.4.3 Yêu cầu nghiệp vụ chung
* **CTT-UC04-BR01.1**: Ràng buộc loại trừ tương hỗ (Mutual Exclusivity) giữa Áp dụng chung và Không áp dụng (Áp dụng chi tiết theo MID/Thương hiệu/Dịch vụ).
* **CTT-UC04-BR01.2**: Bắt buộc chọn ít nhất 1 mã ngành MCC khi thiết lập Phí xử lý giao dịch CTT.

---

### 2.5 CTT-UC05: Xử lý thông tin hồ sơ & Phê duyệt cấu hình phí CTT

#### 2.5.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xử lý hồ sơ và Quy trình Phê duyệt Maker – Checker cấu hình phí CTT** |
| **ID** | **CTT - UC05** |
| **Description** | Quản lý vòng đời phê duyệt và thẩm định CŨ – MỚI cho biểu phí CTT theo nguyên tắc 4 mắt: Gửi duyệt, Rút yêu cầu, Đổi người duyệt, Phê duyệt, Từ chối, Tạm dừng và Mở kích hoạt. |
| **Actor** | Maker CTT, Checker CTT, Quản lý Maker |
| **Trigger** | Maker bấm gửi phê duyệt/tạm dừng/kích hoạt; hoặc Checker bấm phê duyệt/từ chối trên hồ sơ CTT. |
| **Pre-Condition** | Bản ghi CTT ở trạng thái hợp lệ tương ứng với từng hành động. |
| **Post-Condition** | Bản ghi CTT và hồ sơ YCPD chuyển trạng thái chính xác theo Ma trận nghiệp vụ. |
| **Basic flow** | 1. Maker gửi yêu cầu phê duyệt từ `NEW`, `ACTIVE` hoặc `INACTIVE`.<br>2. Hệ thống sinh mã YCPD `AR_MM_MC_[Timestamp]`, insert bản ghi YCPD tương ứng trạng thái `Pending`.<br>3. Checker mở màn hình Thẩm định đối chiếu CŨ – MỚI.<br>4. Checker bấm **[Phê duyệt]** $\rightarrow$ YCPD = `Approval`, CHP CTT chuyển `ACTIVE` (hoặc `READY` nếu ngày áp dụng tương lai). Hoặc bấm **[Từ chối]** $\rightarrow$ Nhập lý do $\ge 10$ ký tự $\rightarrow$ YCPD = `Rejected`, CHP CTT chuyển về `NEW` (hoặc `REJECTED`). |
| **Business Rules** | Tham chiếu mục **2.5.5: Ma trận Quy tắc Nghiệp vụ Chung Vòng đời Bản ghi CTT**. |

#### 2.5.2 Giao diện
* **Màn hình Wireframe**: Checker Thẩm định CŨ MỚI (`4020:48856`), Chờ phê duyệt (`4020:47923`), Modal Từ chối kèm lý do.

#### 2.5.5 Yêu cầu nghiệp vụ chung (Phân hệ CTT)
* **Bảng mapping 4 loại YCPD sinh ra cho CTT**:
  - `New` $\rightarrow$ Gửi yêu cầu phê duyệt $\rightarrow$ **Duyệt mở tạo hồ sơ CHP Trả đối tác**
  - `Active` $\rightarrow$ Gửi phê duyệt cập nhật thông tin $\rightarrow$ **Duyệt cập nhật hồ sơ CHP Trả đối tác**
  - `Active` $\rightarrow$ Gửi yêu cầu tạm dừng $\rightarrow$ **Duyệt tạm dừng hồ sơ CHP Trả đối tác**
  - `Inactive` $\rightarrow$ Gửi yêu cầu mở kích hoạt $\rightarrow$ **Duyệt mở kích hoạt CHP Trả đối tác**
* **Ma trận 11 cột kiểm soát 30 dòng hành động bóc tách độc lập**: Áp dụng chuẩn ma trận đã thống nhất tại file [Quy_Tac_Nghiep_Vu_Cau_Hinh_Phi_Tra_Doi_Tac.xlsx](file:///c:/Users/Admin/ForWork/Quy_Tac_Nghiep_Vu_Cau_Hinh_Phi_Tra_Doi_Tac.xlsx).

---

### 2.6 CTT-UC06: Xóa bản ghi cấu hình phí đối tác CTT

#### 2.6.1 Use case
* **Use Case**: Xóa bản ghi cấu hình phí CTT | **ID**: `CTT - UC06` | **Actor**: Maker CTT.
* **Nghiệp vụ**: Chỉ cho phép xóa bản ghi CTT ở trạng thái `DRAFT`, `NEW`, `REJECTED`. Cấm xóa bản ghi `ACTIVE`, `READY`, `INACTIVE` (`E-008`) hoặc đang `PENDING` (`E-007`). Thực hiện Soft-Delete lưu vết audit.

---
---

# PHẦN 2: QUẢN LÝ CẤU HÌNH PHÍ ĐỐI TÁC QRGW (CỔNG VIETQR / QR GATEWAY)

*(Tài liệu chi tiết xem tại tệp chuyên biệt [SRS-Partner-Fee-QRGW.md](file:///c:/Users/Admin/ForWork/Tool-Kit_New/docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md))*.
