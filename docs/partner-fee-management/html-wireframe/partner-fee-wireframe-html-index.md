---
type: wireframe-html-index
feature: partner-fee-management
status: complete
version: 3.0
updated: 2026-10-29
links:
  - docs/partner-fee-management/brainstorms/partner-fee-management.md
  - docs/partner-fee-management/html-wireframe/partner-fee-full-screens.html
  - docs/partner-fee-management/html-wireframe/partner-fee-interactive-demo.html
---

# partner-fee-management — HTML Wireframes (V3.0 Full Suite)

> Bộ giao diện mẫu tương tác HTML Wireframe V3.0 đầy đủ **28 màn hình & popup** cho phân hệ Quản lý cấu hình phí trả đối tác trên EPAY Portal. Toàn bộ màn hình được thiết kế bám sát 100% hình ảnh thực tế và logic chuyển đổi trạng thái bản ghi CHP (7 trạng thái, 13 transitions, Maker/Checker).

## Danh sách File Wireframe

| # | Tên File Wireframe | Loại Giao diện | Mô tả Màn hình & Tương tác Tích hợp | Trạng thái | Ngày cập nhật |
|---|---|---|---|---|---|
| 1 | [partner-fee-full-screens.html](partner-fee-full-screens.html) | **SPA Full Screens Suite (28 màn)** | **Bộ 28 màn hình hoàn chỉnh đầy đủ nhất**: Danh sách (3 tabs), Chi tiết Maker (4 loại phí x 4 trạng thái NEW, PENDING, ACTIVE, DRAFT), Chi tiết Checker (PENDING + Action Phê duyệt/Từ chối), Lịch sử thay đổi (Audit trail timeline), Thêm mới (9 màn đầy đủ biến thể 4 loại phí), Cập nhật (4 màn), 5 Popups (Tính thử 1 bậc, Tính thử bậc thang, Gửi YCPD, Duyệt, Từ chối). | **Complete** | 2026-10-29 |
| 2 | [partner-fee-interactive-demo.html](partner-fee-interactive-demo.html) | Single Page App (SPA) Demo | Bản demo tương tác nhanh tổng quát với chuyển màn động, modal tính thử phí và chuyển đổi vai trò Maker/Checker. | Complete | 2026-10-29 |
| 3 | [partner-fee-wireframe.html](partner-fee-wireframe.html) | Standalone Viewer | Bản mirror độc lập mở trực tiếp trên mọi trình duyệt hoặc nhúng Confluence. | Complete | 2026-10-29 |

---

## 🗂️ Danh mục 28 Màn hình trong `partner-fee-full-screens.html`

### 1. Nhóm Màn hình Danh sách (3 màn)
- `screen-list-all`: Màn hình danh sách ở Tab **Tất cả** (10 bản ghi mẫu, đầy đủ trạng thái, có Bộ lọc nâng cao với Loại phí, Nguồn dữ liệu, Đối tác, PTTT, Kỳ trả phí...).
- `screen-list-active`: Màn hình danh sách ở Tab **Đang hoạt động** (Lọc nhanh các bản ghi `ACTIVE`).
- `screen-list-pending`: Màn hình danh sách ở Tab **Chờ phê duyệt** (Lọc nhanh các bản ghi `PENDING`).

### 2. Nhóm Màn hình Chi tiết (6 màn)
- `screen-screen-history`: **Lịch sử thay đổi** (Audit trail dạng timeline 6 mốc sự kiện: Tạo mới, Gửi duyệt, Duyệt, Sửa đổi, Tác vụ hệ thống).
- **Dành cho Maker (4 màn cho 4 loại phí, gồm 4 trạng thái New, Pending, Active, Draft):**
  - `screen-detail-maker-duyTri-new`: Phí duy trì sử dụng dịch vụ – Trạng thái **NEW** (Toolbar: Sửa, Gửi YCPD, Xoá; KHÔNG có panel YCPD).
  - `screen-detail-maker-xuLy-pending`: Phí xử lý giao dịch – Trạng thái **PENDING** (Toolbar: Hủy YCPD; CÓ panel YCPD hiển thị bảng so sánh đối chiếu CŨ - MỚI, KHÔNG có nút duyệt của Checker).
  - `screen-detail-maker-thanhToan-active`: Phí thanh toán – Trạng thái **ACTIVE** (Toolbar: Sửa, Tạm dừng, Gửi YCPD; KHÔNG có panel YCPD).
  - `screen-detail-maker-qlyDVGT-draft`: Phí quản lý dịch vụ gia tăng – Trạng thái **DRAFT** (Toolbar: Sửa, Gửi YCPD, Xoá; KHÔNG có panel YCPD).
- **Dành cho Checker (1 màn):**
  - `screen-detail-checker-pending`: Trạng thái **PENDING** dành cho Checker (Hiển thị đầy đủ Panel YCPD, bảng đối chiếu CŨ - MỚI, cụm nút action **[✅ Phê duyệt]** và **[❌ Từ chối]**).

### 3. Nhóm Màn hình Thêm mới (9 màn)
- **Phí duy trì dịch vụ (2 màn):**
  - `screen-create-duyTri-chung`: Áp dụng phí chung cho toàn bộ MID.
  - `screen-create-duyTri-khongApDung`: Không áp dụng phí chung (áp dụng cho từng MID – khớp ảnh 1 `a15a7a48`).
- **Phí xử lý giao dịch (3 màn):**
  - `screen-create-xuLy-chung-1bac`: Áp dụng phí chung cho toàn bộ loại GD – 1 bậc phí (khớp ảnh 2 `d4feffcd`).
  - `screen-create-xuLy-chung-bacThang`: Áp dụng phí chung cho toàn bộ loại GD – Bậc thang theo Tổng SLGD (có nút +, − thêm bớt bậc).
  - `screen-create-xuLy-khongApDung`: Không áp dụng phí chung.
- **Phí thanh toán (3 màn):**
  - `screen-create-thanhToan-chung`: Áp dụng phí chung cho toàn bộ thương hiệu thẻ (Visa, MasterCard, JCB bậc thang).
  - `screen-create-thanhToan-1bac`: Không áp dụng phí chung – Mức phí 1 bậc cho từng thương hiệu thẻ (khớp ảnh 3 `465afcd3`).
  - `screen-create-thanhToan-bacThang`: Không áp dụng phí chung – Mức phí bậc thang cho từng Cổng TGTT NAPAS, BIDV, MB (khớp ảnh 4 `e974f251`).
- **Phí quản lý dịch vụ gia tăng (1 màn):**
  - `screen-create-qlyDVGT`: Cấu hình phí dịch vụ gia tăng (Biến động số dư, Phân tích dữ liệu, Tokenization).

### 4. Nhóm Màn hình Cập nhật (4 màn)
- `screen-edit-duyTri`: Chỉnh sửa cấu hình Phí duy trì dịch vụ.
- `screen-edit-xuLy`: Chỉnh sửa cấu hình Phí xử lý giao dịch.
- `screen-edit-thanhToan`: Chỉnh sửa cấu hình Phí thanh toán.
- `screen-edit-qlyDVGT`: Chỉnh sửa cấu hình Phí quản lý DVGT.

### 5. Nhóm Popup & Modal Nghiệp vụ (5 popup)
- `modal-calc-1bac`: Popup tính thử phí – 1 bậc phí (hiển thị công thức toán học và phí thực thu).
- `modal-calc-bacthang`: Popup tính thử phí – Bậc thang (tự động phân bậc và tính phí tổng hợp).
- `modal-send-ycpd`: Popup Gửi yêu cầu phê duyệt (có ô nhập lý do gửi duyệt).
- `modal-approve`: Popup Xác nhận phê duyệt dành cho Checker.
- `modal-reject`: Popup Từ chối yêu cầu phê duyệt (bắt buộc nhập lý do từ chối).

---

## Changelog

- `2026-10-29` (V3.0): Hoàn thành bộ 28 màn hình wireframe chi tiết trong `partner-fee-full-screens.html` bám sát 100% 4 ảnh màn hình thực tế upload và các yêu cầu logic Maker/Checker, 4 loại phí, bảng đối chiếu cũ/mới, dual listbox MCC và công thức tính phí.
- `2026-10-29` (V2.1): Cập nhật vị trí Tab bar danh sách ngay trên thanh search, đưa Loại phí vào bộ lọc, ẩn thông tin YCPD cho các trạng thái không phải Pending.
- `2026-10-28` (V2.0): Khởi tạo bộ HTML Wireframe tương tác SPA.
