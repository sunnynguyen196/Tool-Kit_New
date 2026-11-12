---
id: QR-UC04
title: "Xóa CHP Trả đối tác QRGW"
feature: partner-fee-management
module: QRGW
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 3.5 QR-UC04: Xóa CHP Trả đối tác QRGW

## 3.5.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xóa bản ghi cấu hình phí đối tác Cổng QR Gateway (QRGW)** |
| **ID** | **QR - UC04** |
| **Description** | Cho phép Maker xóa các bản ghi cấu hình phí QRGW chưa từng phát sinh hiệu lực vận hành (`DRAFT`, `NEW`). Cấm xóa các bản ghi đã từng có hiệu lực (`ACTIVE`, `READY`, `INACTIVE`) hoặc đang trong hàng đợi duyệt (`PENDING`) nhằm bảo toàn lịch sử kiểm toán. |
| **Actor** | Maker QRGW (Chuyên viên Vận hành / Tính cước QRGW) |
| **Trigger** | Maker click chọn thao tác **[Xóa]** từ menu hàng danh sách QRGW hoặc từ nút [Xóa] trên màn hình chi tiết. |
| **Pre-Condition** | Đăng nhập tài khoản Maker; bản ghi cấu hình QRGW ở trạng thái cho phép xóa (`DRAFT`, `NEW`). |
| **Post-Condition** | Bản ghi QRGW chuyển sang trạng thái `DELETED` (xóa logic khỏi danh mục vận hành, ghi vết audit log). |
| **Basic flow** | 1. Người dùng vào menu **[Quản lý cấu hình phí] > [Phí trả đối tác] > [Phí đối tác QRGW]** ở thanh menu bên trái.<br>2. Hệ thống hiển thị màn hình danh sách cấu hình phí QRGW.<br>3. Người dùng tìm bản ghi cần xóa và chọn **[Xóa]** tại menu thao tác.<br>4. Hệ thống hiển thị popup xác nhận xóa cấu hình phí. |
| **Alternative flow** | - **A1**: Maker bấm nút **[Hủy bỏ]** trong Modal xác nhận $\rightarrow$ Đóng modal, giữ nguyên bản ghi QRGW không thay đổi. |
| **Exception flow** | - **E1 (Cấm xóa bản ghi hiệu lực)**: Người dùng cố tình gọi lệnh xóa bản ghi QRGW `ACTIVE`, `READY`, hoặc `INACTIVE` $\rightarrow$ Hệ thống hiển thị Modal cảnh báo từ chối `E-partner-fee-management-008`: *“Không thể xóa cấu hình phí đã phát sinh hiệu lực vận hành. Bạn chỉ có thể thực hiện Tạm dừng cấu hình này!”*.<br>- **E2 (Bản ghi đang chờ duyệt)**: Người dùng cố xóa bản ghi QRGW `PENDING` $\rightarrow$ Cảnh báo `E-partner-fee-management-007`: *“Cấu hình đang trong trạng thái Chờ phê duyệt. Không thể xóa vào thời điểm này!”*. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung xóa bản ghi CHP QRGW](#353-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Thao tác kiểm tra trạng thái và xóa bản ghi phản hồi $< 500$ms. |

---

## 3.5.2 Giao diện

### Màn hình Wireframe liên kết:
* **QR-UC04-WF01**: Modal Xác nhận trước khi xóa bản ghi (`4020:50006`)
* **QR-UC04-WF02**: Modal Cảnh báo cấm xóa bản ghi có hiệu lực

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Modal Xác nhận Xóa** | Dialog Container | M | N | Readonly | Modal popup hiển thị câu cảnh báo xác nhận xóa bản ghi QRGW. |
| **Nút [Hủy bỏ]** | Button | O | Y | Click | Đóng modal popup, không thực hiện bất kỳ thay đổi nào. |
| **Nút [Xác nhận xóa]** | Button | M | Y | Click | Nút hành động xác nhận. Kích hoạt API xóa logic bản ghi. |

---

## 3.5.3 Yêu cầu nghiệp vụ chung

#### Chi tiết xử lý nghiệp vụ

1. Maker click chọn [Xóa] tại dòng bản ghi QRGW trên bảng danh sách.
2. Hệ thống kiểm tra trạng thái của bản ghi.
3. Hệ thống hiển thị Modal xác nhận: *“Bạn có chắc chắn muốn xóa bản ghi [Mã phí] không? Thao tác này không thể hoàn tác.”*
4. Maker bấm nút **[Xác nhận xóa]**.
5. Hệ thống cập nhật `status = DELETED`, hủy liên kết hàng đợi và lưu vết log xóa.
6. Hệ thống hiển thị thông báo thành công, tự động tải lại bảng danh sách QRGW.


| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **QR-UC04-BR01.1** | **Quy tắc trạng thái QRGW được phép xóa** | Chỉ cho phép xóa bản ghi QRGW đối với 2 trạng thái: `DRAFT`, `NEW`. Tuyệt đối không xóa vật lý (Hard Delete) khỏi database đối với các bản ghi đã từng phát sinh hiệu lực tính cước (`ACTIVE`, `READY`, `INACTIVE`). |
| **QR-UC04-BR01.2** | **Cơ chế Soft-Delete & Audit Trail QRGW** | Khi thực hiện xóa, hệ thống cập nhật trường `status = 'DELETED'`, `deleted_at = NOW()`, `deleted_by = [Username]`. Bản ghi sẽ bị ẩn khỏi danh sách vận hành nhưng vẫn được lưu giữ trong CSDL để phục vụ kiểm toán. |

---

## 3.5.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E-007** | Bản ghi đang chờ duyệt | Maker bấm xóa cấu hình QRGW đang có trạng thái `PENDING` | Major | *“Cấu hình đang trong trạng thái Chờ phê duyệt. Không thể xóa vào thời điểm này!”* |
| **E-008** | Cấm xóa bản ghi hiệu lực | Cố tình xóa bản ghi QRGW `ACTIVE`, `READY` hoặc `INACTIVE` | Critical | *“Không thể xóa cấu hình phí đã phát sinh hiệu lực vận hành. Bạn chỉ có thể thực hiện Tạm dừng cấu hình này!”* |
| **E3** | Không có quyền thao tác | Tài khoản không có vai trò Maker QRGW | Major | *“Bạn không có thẩm quyền xóa bản ghi cấu hình phí này!”* |
| **E4** | Lỗi kết nối CSDL | Mất kết nối CSDL khi thực thi câu lệnh Soft-Delete | Major | *“Lỗi kết nối cơ sở dữ liệu khi thực hiện xóa bản ghi. Vui lòng thử lại sau!”* |
