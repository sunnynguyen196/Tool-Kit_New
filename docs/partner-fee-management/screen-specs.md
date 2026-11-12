# BẢNG ĐẶC TẢ GIAO DIỆN HỆ THỐNG (SCREEN SPECIFICATION)
## Phân hệ: Quản lý Cấu hình Phí Trả Đối tác (CTT & QRGW)
**Mã tài liệu:** EPAY-QT.CG.02_BM33  
**Phiên bản:** 2.1 (V2 UI - Standard Modern Light Theme)  
**Ngày cập nhật:** 04/11/2026  
**Tác giả:** Business Analyst Team (Lead: Nguyễn Ánh Dương)

---

## 1. DANH MỤC MÀN HÌNH (SCREEN INVENTORY)

| STT | Mã màn hình | Tên màn hình | Phân hệ / Menu Left | Loại màn hình | Trạng thái |
|:---:|---|---|---|---|:---:|
| 1 | **SCR-PFEE-CTT-01** | Danh sách Cấu hình Phí Đối tác CTT | Quản lý cấu hình phí > Phí trả đối tác > Phí đối tác CTT | Search & List Grid | Hoàn thành |
| 2 | **SCR-PFEE-QRGW-01** | Danh sách Cấu hình Phí Đối tác QRGW | Quản lý cấu hình phí > Phí trả đối tác > Phí đối tác QRGW | Search & List Grid | Hoàn thành |
| 3 | **SCR-PFEE-CTT-02** | Thêm mới Cấu hình Phí Đối tác CTT | Quản lý cấu hình phí > Phí trả đối tác > Phí đối tác CTT > Thêm mới | Form / Multi-card Input | Hoàn thành |
| 4 | **SCR-PFEE-CTT-03** | Chi tiết Cấu hình Phí Đối tác CTT | Quản lý cấu hình phí > Phí trả đối tác > Phí đối tác CTT > Chi tiết | Detail / View & Audit Log | Hoàn thành |

---

## 2. QUY CHUẨN THIẾT KẾ V2 (DESIGN SYSTEM COMPLIANCE)

- **Phong cách chủ đạo:** Modern Clean White & Slate (Theme sáng đồng bộ theo mẫu chuẩn EPAY Portal 2.0).
- **Header Sidebar:** Màu xanh lam nhạt (`#74B4F7`), logo biểu tượng kết nối mạng trắng + chữ `epay`, nút thu gọn menu (`⇇`).
- **Sidebar Nền trắng (`#FFFFFF`):**
  - Cấu trúc Menu Left mới:
    ```
    Trang chủ
    Quản lý cấu hình phí [▴]
       Phí trả đối tác
          • Phí đối tác CTT (Active)
          • Phí đối tác QRGW
       Phí thu ĐVCNTT
       Phí thu Khách hàng
    Quản lý Yêu cầu phê duyệt
    ```
- **Thanh Topbar:**
  - Search box bo góc lớn: `🔍 Tìm kiếm ...`
  - Cụm tiện ích: Trợ giúp ``, Thông báo `🔔`, Cài đặt `⚙️`, Avatar tròn đỏ `Lisa ▾`.
- **Phân định Nguồn dữ liệu:** **BỎ** hoàn toàn trường / cột `Nguồn dữ liệu` vì người dùng đã được điều hướng tách biệt trực tiếp từ Menu Left.
- **Rút gọn Loại phí:** Chỉ gồm **02 loại phí**:
  1. `Phí xử lý giao dịch`
  2. `Phí thanh toán`
- **Chuẩn hóa Hình thức thu phí:** Chỉ gồm **03 hình thức**:
  1. `1 bậc` (cố định VND hoặc tỷ lệ % cố định)
  2. `Theo SLGD` (bậc thang số lượng giao dịch)
  3. `Theo GTGD` (bậc thang giá trị giao dịch)
- **Status Badges dạng Pill chuẩn:**
  - `● ACTIVE`: Nền xanh lá nhạt (`#DCFCE7`), text xanh đậm (`#15803D`)
  - `● NEW`: Nền xanh ngọc nhạt (`#E0F2FE`), text cyan (`#0369A1`)
  - `● PENDING`: Nền vàng cam (`#FEF3C7`), text hổ phách (`#B45309`)
  - `● INACTIVE`: Nền đỏ hồng (`#FEE2E2`), text đỏ đậm (`#B91C1C`)
  - `● DRAFT`: Nền xám nhạt (`#F1F5F9`), text xám (`#475569`)

---

## 3. ĐẶC TẢ CHI TIẾT MÀN HÌNH DANH SÁCH (SCR-PFEE-CTT-01 & SCR-PFEE-QRGW-01)

### 3.1 Khối Tiêu đề & Cụm nút Hành động (Page Header & Actions)
| Tên thành phần | Loại Control | Mô tả hành động / Logic |
|---|---|---|
| **Tiêu đề trang** | Text Display | "Quản lý cấu hình phí đối tác CTT" (hoặc QRGW), font 18px Bold `#1E293B`. |
| **Nút [🔍 Tra cứu]** | Button (White / Blue border) | Mở rộng / Thu gọn vùng bộ lọc tìm kiếm nâng cao. |
| **Nút [☁ Xuất tệp ▾]** | Split Button (Dark Blue `#1E3A8A`) | Xuất dữ liệu biểu phí hiện tại ra file Excel (`.xlsx`) hoặc CSV. |
| **Nút [+ Thêm mới]** | Button (Primary Blue `#2563EB`) | Chuyển hướng sang màn hình Thêm mới cấu hình phí (`SCR-PFEE-CTT-02`). |

### 3.2 Khối Bộ lọc Tìm kiếm (Filter Card 4x2)
| Hàng | Tên trường | Loại Control | Giá trị mặc định / Lựa chọn | Quy tắc nghiệp vụ |
|:---:|---|---|---|---|
| **Hàng 1** | **Loại phí** | Dropdown | `-- Tất cả --` | Chỉ gồm: *Phí xử lý giao dịch*, *Phí thanh toán*. |
| | **Đối tác / Ngân hàng** | Dropdown | `-- Tất cả --` | Lấy từ danh mục Đối tác kết nối hoạt động. |
| | **Phương thức thanh toán / Dịch vụ** | Dropdown | `-- Tất cả --` | CTT: *Thẻ nội địa, Thẻ quốc tế, Tài khoản NH*.<br>QRGW: *Thu hộ, Chi hộ*. |
| | **Đồng tiền** | Dropdown | `VND ▾` | Mặc định VND, hỗ trợ USD nếu có GD quốc tế. |
| **Hàng 2** | **Hình thức thu phí** | Dropdown | `-- Tất cả --` | Gồm: *1 bậc*, *Theo SLGD*, *Theo GTGD*. |
| | **Kỳ trả phí** | Dropdown | `-- Tất cả --` | Gồm: *Phiên, Ngày, Tháng, Quý, Năm*. |
| | **Thời gian áp dụng phí** | DateRangePicker | `01/01/2026 - 31/12/2026 📅` | Lọc các cấu hình có khoảng hiệu lực giao với khoảng chọn. |
| | **Mã MCC (CTT) / Loại GD (QRGW)** | Dropdown | `-- Tất cả --` | CTT: Danh mục MCC (*5411, 4829...*).<br>QRGW: *Thanh toán, Hoàn trả*. |
| **Action** | **[Xóa bộ lọc]** | Button Ghost | Reset các trường về `-- Tất cả --`. | |
| | **[🔍 Tìm kiếm]** | Button Navy `#1E40AF` | Thực thi lọc dữ liệu trên lưới table theo điều kiện AND. | |

### 3.3 Nhóm Tab Trạng thái & Công cụ Lưới (Tabs & Table Controls)
- **Tab chuyển đổi:**
  - `Tất cả`
  - `Đang hoạt động` (Active tab - gạch chân / in đậm màu xanh `#2563EB`)
  - `Chờ phê duyệt`
- **Ô tìm kiếm nhanh:** Input placeholder `🔍 Tìm kiếm theo mã cấu hình, tên cấu hình` (width 280px).
- **Nút [🎛️ Tùy chỉnh]:** Nút tím indigo `#4F46E5`, mở popup ẩn/hiện và sắp xếp thứ tự các cột trên bảng.

### 3.4 Bảng dữ liệu Lưới (Data Table Grid)
| STT | Tên cột hiển thị | Độ rộng (px) | Kiểu dữ liệu / Format | Ghi chú nghiệp vụ |
|:---:|---|:---:|---|---|
| 1 | **STT** | 40 | Số thứ tự tăng dần | Đánh số thứ tự trong trang hiện tại. |
| 2 | **MÃ CẤU HÌNH PHÍ** | 140 | Text Link (`#2563EB`) | Click chuyển hướng sang màn hình Chi tiết cấu hình (`SCR-PFEE-CTT-03`). |
| 3 | **TRẠNG THÁI CẤU HÌNH** | 140 | Status Pill Badge | Hiển thị: `● NEW`, `● ACTIVE`, `● PENDING`, `● INACTIVE`, `● DRAFT`. |
| 4 | **ĐỐI TÁC HƯỞNG PHÍ** | 150 | Text thường | Tên ngân hàng / đối tác (VD: Vietcombank, MBBank, KBank...). |
| 5 | **PHƯƠNG THỨC THANH TOÁN / LOẠI DỊCH VỤ** | 160 | Text thường | CTT: PTTT (*Thẻ quốc tế, Thẻ nội địa...*).<br>QRGW: Dịch vụ (*Thu hộ QR, Chi hộ QR*). |
| 6 | **LOẠI PHÍ** | 130 | Text thường | Chỉ hiển thị: *Phí xử lý giao dịch* hoặc *Phí thanh toán*. |
| 7 | **HÌNH THỨC THU PHÍ** | 150 | Text + Thông số | Hiển thị 1 trong 3 hình thức: *1 bậc (mức phí)*, *Theo SLGD (bậc)*, *Theo GTGD (% tỷ lệ)*. |
| 8 | **THUẾ VAT** | 70 | Text (%) | Thuế suất áp dụng (8% hoặc 10%). |
| 9 | **THỜI GIAN ÁP DỤNG** | 110 | Date (`DD/MM/YYYY`) | Ngày bắt đầu hiệu lực của cấu hình phí. |
| 10 | **THAO TÁC** | 50 | Action Icon `⋮` / `☰` | Mở Action Menu theo ma trận trạng thái (chi tiết mục 3.4.1). |

#### 3.4.1 Ma trận Phân quyền & Hiển thị Menu Thao tác theo Trạng thái (Action Menu Matrix)

Khi người dùng click vào icon `⋮` (Thao tác) tại từng dòng bản ghi trên bảng danh sách, hệ thống hiển thị Dropdown Menu ngữ cảnh với các hành động được bật (Enable) hoặc ẩn/vô hiệu hóa tương ứng theo từng trạng thái:

| Trạng thái cấu hình | 1. Xử lý cấu hình chi tiết (Action nghiệp vụ) | 2. Xem chi tiết | 3. Xem lịch sử hoạt động | 4. Xóa cấu hình |
|---|---|:---:|:---:|:---:|
| **DRAFT** *(Bản nháp)* | • **Lưu nháp**<br>• **Tạo mới** (Chuyển sang gửi duyệt) | **Enable** | **Enable** | **Enable** *(Xóa vĩnh viễn bản nháp)* |
| **NEW** *(Tạo mới)* | • **Cập nhật thông tin**<br>• **Gửi phê duyệt** | **Enable** | **Enable** | *Disabled / Ẩn* |
| **PENDING** *(Chờ phê duyệt)* | • **Duyệt** *(Dành cho Checker)*<br>• **Hủy phê duyệt** *(Từ chối duyệt)* | **Enable** | **Enable** | *Disabled / Ẩn* |
| **READY** *(Chờ hiệu lực)* | • **Cập nhật thông tin** *(Tạo version chỉnh sửa mới)* | **Enable** | **Enable** | *Disabled / Ẩn* |
| **ACTIVE** *(Đang hoạt động)* | • **Cập nhật thông tin**<br>• **Yêu cầu tạm dừng** | **Enable** | **Enable** | *Disabled / Ẩn* |
| **INACTIVE** *(Tạm dừng / Hết hạn)* | • **Yêu cầu kích hoạt**<br>• **Cập nhật thông tin** | **Enable** | **Enable** | *Disabled / Ẩn* |

> **Ghi chú UI/UX:** 
> - Màn hình danh sách sẽ thiết kế thêm biến thể **Popup/Dropdown Menu đang mở (Open State)** trên dòng có trạng thái `ACTIVE` và dòng `PENDING` để Dev/Tester thấy rõ cấu trúc visual menu.

### 3.5 Thanh Phân trang (Pagination Bar)
- **Bên trái:** `06 kết quả` | dropdown `06 dòng ▾` (chọn 10, 20, 50, 100 dòng/trang).
- **Bên phải:** Cụm điều hướng `[ < ]  [ 1 ]  [ 2 ]  [ 3 ]  [ > ]`.

---

## 4. ĐẶC TẢ CHI TIẾT MÀN HÌNH THÊM MỚI (SCR-PFEE-CTT-02)

Màn hình được tổ chức dưới dạng Multi-Card Form rõ ràng, chia làm 3 khối nghiệp vụ:
1. **Khối 1: Thông tin chung:**
   - Đối tác / Ngân hàng hưởng phí (*).
   - Loại phí (*): Radio/Dropdown chọn `Phí xử lý giao dịch` hoặc `Phí thanh toán`.
   - Thời gian áp dụng (*): DateRangePicker (Từ ngày - Đến ngày).
   - Thuế VAT (*): 8% hoặc 10%.
   - Kỳ trả phí (*): Phiên, Ngày, Tháng, Quý, Năm.
   - Đồng tiền: VND.
   - Ghi chú / Căn cứ hợp đồng.
2. **Khối 2: Phương thức thanh toán & Phân nhánh MCC (CTT):**
   - Phương thức thanh toán (*): Thẻ quốc tế, Thẻ nội địa, Tài khoản NH.
   - Khi chọn `Thẻ quốc tế`: Kích hoạt thêm chọn Thương hiệu thẻ (Visa, Master, JCB...), Checkbox áp dụng chung hoặc cấu hình riêng từng thương hiệu, và **Nơi phát hành** (`Trong nước` / `Nước ngoài`).
   - Danh mục mã ngành MCC (*): Chọn mã cụ thể hoặc "Tất cả MCC". Tự động validate rule `BR-PFEE-02A` (chống trùng MCC trong cùng khoảng thời gian active).
   - Áp dụng loại giao dịch: Checkbox chọn Thanh toán / Hoàn trả.
   - **Khi chọn loại giao dịch `Hoàn trả`:** Tự động kích hoạt thêm trường **Ngày áp dụng phí trên giao dịch**:
     + `Ngày giao dịch gốc`
     + `Ngày tạo giao dịch hoàn trả`
   - **Đối với loại biểu phí `Phí XLGD`:** Tự động kích hoạt trường **Trạng thái giao dịch**:
     + `Tất cả`
     + `Thành công`
     + `Thất bại`
3. **Khối 3: Hình thức thu phí & Mức phí chi tiết:**
   - Chọn 1 trong 3 hình thức:
     - `1 bậc`: Nhập mức phí cố định VND hoặc % tỷ lệ duy nhất.
     - `Theo SLGD`: Bảng bậc thang số lượng giao dịch trong kỳ (Từ GD - Đến GD - Mức phí).
     - `Theo GTGD`: Bảng bậc thang giá trị giao dịch hoặc tỷ lệ % có Min/Max.
   - Nút hành động: `[Hủy bỏ]`, `[Lưu nháp]`, `[Gửi phê duyệt ✓]`.

---

## 5. ĐẶC TẢ CHI TIẾT MÀN HÌNH CHI TIẾT (SCR-PFEE-CTT-03)

- **Header Status:** Mã cấu hình `SM_PN_DC_006` kèm Status Pill `● ACTIVE`.
- **Thanh công cụ:** Nút `[Quay lại danh sách ↵]`, `[Sao chép cấu hình ⎘]`, `[Chỉnh sửa ✎]`.
- **Card 1: Thông tin bản ghi cấu hình phí:** Xem lại đầy đủ các thông tin đối tác, PTTT, Nơi phát hành thẻ, loại phí, MCC, kỳ trả phí (Read-only).
- **Card 2: Mức phí & Quy tắc tính toán:** Bảng biểu phí chi tiết, tỷ lệ %, mức Min/Max, thuế VAT, Ngày áp dụng phí hoàn trả, và thời gian áp dụng.
- **Card 3: Nhật ký thay đổi & Phê duyệt (Audit Trail):** Dòng thời gian ghi nhận chi tiết thời điểm tạo (Maker), thời điểm duyệt (Checker), người duyệt và lịch sử kích hoạt.
