---
type: srs-usecases-index
feature: partner-fee-management
version: "V0.5"
status: draft
updated: 2026-11-11
links:
  - srs_ctt: docs/partner-fee-management/srs/SRS-Partner-Fee-CTT.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
---

# Tài liệu SRS cấu hình phí trả đối tác

Bộ đặc tả được tổ chức thành hai tài liệu độc lập theo cấu trúc mẫu Word do người dùng cung cấp. Mỗi tài liệu có phần giới thiệu chung, tổng quan mô hình và bộ use case riêng.

| Phân hệ | Bộ SRS | Mã use case |
|---|---|---|
| CTT | [SRS Phí đối tác CTT](SRS-Partner-Fee-CTT.md) | CTT-UC01 đến CTT-UC07 |
| QRGW | [SRS Phí đối tác QRGW](SRS-Partner-Fee-QRGW.md) | QR-UC01 đến QR-UC07 |

Ở cả hai phân hệ, UC04 là Xóa, UC05 là Xử lý hồ sơ (gồm khởi tạo, cập nhật và phê duyệt), UC06 là Auto-golive. Trạng thái CHP sau từ chối duyệt tạo mới là NEW; kết quả YCPD là Rejected.

Tài liệu chung: [SRS chức năng](partner-fee-management-spec.md), [Quy tắc vòng đời](2.6.5-yeu-cau-nghiep-vu-chung.md), [Đặc tả màn hình V2](partner-fee-management-screens.md).

Bản gộp V0.4 được lưu [tại đây](archive/SRS-Partner-Fee-Management-UseCases-V0.4.md) để bảo toàn nội dung và lịch sử. Đây là bản lưu trữ, không dùng làm đặc tả thay cho hai bộ SRS V0.5.

UC07 là job độc lập tự động từ chối YCPD Pending đã quá ngày hiệu lực; người từ chối Hệ thống, lý do “Tự động từ chối bởi hệ thống”.
