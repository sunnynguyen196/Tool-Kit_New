---
type: userstory-index
feature: partner-fee-management
status: approved
updated: 2026-10-31
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - usecases: docs/partner-fee-management/usecases/usecase-index.md
  - screens: docs/partner-fee-management/srs/partner-fee-management-screens.md
---

# Quản lý Cấu hình Phí Trả Đối tác — User Stories Index

> Bảng tổng hợp và ma trận truy vết danh mục User Stories cho phân hệ Quản lý Cấu hình Phí Trả Đối tác (`partner-fee-management`), liên kết trực tiếp giữa Persona người dùng, Yêu cầu chức năng (FR), Use Case (UC), Màn hình giao diện Figma và Tiêu chí chấp nhận (AC).

---

## 1. Danh sách User Stories (Traceability Matrix)

| # | Mã ID | Tiêu đề User Story | Persona | Đáp ứng FR | Thuộc Use Case | Màn hình liên kết | Độ ưu tiên | Trạng thái |
|---|---|---|---|---|---|---|---|---|
| 1 | [US-001](us-001.md) | Tra cứu và xem danh sách cấu hình phí trả đối tác | Maker, Checker | FR-001, FR-002 | [[../usecases/uc-search-list-fee|uc-search-list-fee]] | `4020:50223`, `4020:51051`, `4020:51879` | P0 | Approved |
| 2 | [US-002](us-002.md) | Xuất tệp dữ liệu danh sách CHP trả đối tác ra Excel | Maker, Checker | FR-001 | [[../usecases/uc-export-fee|uc-export-fee]] | `4020:50223` (Nút [Xuất tệp ▼]) | P1 | Approved |
| 3 | [US-003](us-003.md) | Xem chi tiết cấu hình phí và dòng thời gian Audit Trail | Maker, Checker | FR-010, FR-011 | [[../usecases/uc-view-detail-fee|uc-view-detail-fee]] | `4020:43846` – `4020:47172` | P0 | Approved |
| 4 | [US-004](us-004.md) | Xóa cấu hình phí ở trạng thái DRAFT và NEW | Maker | FR-001, FR-010 | [[../usecases/uc-delete-fee|uc-delete-fee]] | `4020:50223`, `4020:50006` | P1 | Approved |
| 5 | [US-005](us-005.md) | Xử lý hồ sơ biểu phí: Thêm mới 4 loại phí, Tính thử phí 🧮, Sửa, Thẩm định Cũ-Mới & Phê duyệt | Maker, Checker | FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-009, FR-012 | [[../usecases/uc-process-fee-profile|uc-process-fee-profile]] | `4022:53508` – `4022:58264`, `4018:36498`, `4020:36844` – `4020:43097`, `4020:47923`, `4020:48856` | P0 | Approved |
| 6 | [US-006](us-006.md) | Job lập lịch tự động kích hoạt cấu hình phí (Auto-Golive) | Scheduler Job | FR-013 | [[../usecases/uc-auto-golive|uc-auto-golive]] | System background process | P0 | Approved |

---

## 2. Persona Overview

* **Maker (Chuyên viên Vận hành / Tính cước EPAY)**: Người chịu trách nhiệm quản trị danh mục biểu phí ngân hàng, thiết lập tham số mức phí, chạy thử số liệu và trình duyệt.
* **Checker (Cán bộ Phê duyệt / Trưởng phòng EPAY)**: Người chịu trách nhiệm kiểm soát 4 mắt, thẩm định sự sai khác giữa biểu phí thực tế và hợp đồng, ra quyết định duyệt hoặc từ chối.
* **Scheduler Job**: Tiến trình nền tự động hóa của hệ thống, bảo đảm chuyển giao hiệu lực hợp đồng mượt mà, đúng thời khắc 00:00:00 mà không cần can thiệp con người.

---

## 3. Links Upstream
- **Core Spec SRS**: [`docs/partner-fee-management/srs/partner-fee-management-spec.md`](../srs/partner-fee-management-spec.md)
- **Use Cases Folder**: [`docs/partner-fee-management/usecases/`](../usecases/)
- **UX Screen Specs**: [`docs/partner-fee-management/srs/partner-fee-management-screens.md`](../srs/partner-fee-management-screens.md)
- **Data ERD**: [`docs/partner-fee-management/srs/partner-fee-management-erd.md`](../srs/partner-fee-management-erd.md)
