---
type: usecase-index
feature: partner-fee-management
status: draft
updated: 2026-10-31
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - erd: docs/partner-fee-management/srs/partner-fee-management-erd.md
  - flows: docs/partner-fee-management/srs/partner-fee-management-flows.md
  - states: docs/partner-fee-management/srs/partner-fee-management-states.md
---

# Quản lý Cấu hình Phí Trả Đối tác — Use Cases Index

## 1. Danh sách Use Cases (Traceability Matrix)

> Bảng ma trận truy vết per-feature kết nối đa chiều giữa Use Case, Yêu cầu chức năng (FR), Màn hình giao diện (Screens trên Figma canvas `CHP Đối tác`), Mã lỗi (Error Matrix) và Mức độ ưu tiên.

| # | Tên Use Case | Mã Slug | Cấp độ | Trạng thái | Actor chính | Đáp ứng FR | Màn hình liên kết (Figma Frame ID) | Mã lỗi liên quan | Ưu tiên |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Tìm kiếm và xem danh sách cấu hình phí trả đối tác** | [uc-search-list-fee](uc-search-list-fee.md) | Sea | Draft | Maker, Checker | FR-001, FR-002 | `4020:50223`, `4020:51051`, `4020:51879` | E-004, E-010 | P0 |
| 2 | **Xuất tệp dữ liệu CHP trả đối tác** | [uc-export-fee](uc-export-fee.md) | Fish | Draft | Maker, Checker | FR-001 | `4020:50223` (Nút [Xuất tệp ▼]) | E-010 | P1 |
| 3 | **Xem chi tiết thông tin phí trả đối tác** | [uc-view-detail-fee](uc-view-detail-fee.md) | Sea | Draft | Maker, Checker | FR-010, FR-011 | `4020:43846`, `4020:44666`, `4020:45486`, `4020:46336`, `4020:47172` | E-010 | P0 |
| 4 | **Xóa CHP trả đối tác** | [uc-delete-fee](uc-delete-fee.md) | Fish | Draft | Maker | FR-001, FR-010 | `4020:50223` (Menu row), `4020:50006` | E-007, E-008 | P1 |
| 5 | **Xử lý thông tin hồ sơ CHP trả đối tác** | [uc-process-fee-profile](uc-process-fee-profile.md) | Sea | Draft | Maker, Checker | FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-009, FR-012 | `4022:53508` – `4022:58264`, `4018:36498` – `4018:36826`, `4020:36844` – `4020:43097`, `4020:47923`, `4020:48856` | E-001, E-002, E-003, E-005, E-006, E-009 | P0 |
| 6 | **Job tự động kích hoạt cấu hình** | [uc-auto-golive](uc-auto-golive.md) | System | Draft | Scheduler Job | FR-013 | System background task (Không có màn hình UI) | E-003, E-010 | P0 |

---

## 2. CRUD Matrix (Ma trận Phân quyền & Thao tác Dữ liệu)

> Quy ước thao tác: **C** = Create (Tạo mới), **R** = Read (Tra cứu / Đọc), **U** = Update (Cập nhật / Sửa), **D** = Delete (Xóa). Ô trống = Không tác động.

| Use Case \ Thực thể | `PARTNER_FEE_CONFIG` | `FEE_TIER_DETAIL` | `FEE_SERVICE_DETAIL` | `FEE_AUDIT_LOG` | `MCC_CATEGORY` |
|---|---|---|---|---|---|
| **[uc-search-list-fee](uc-search-list-fee.md)** | **R** | | | | **R** |
| **[uc-export-fee](uc-export-fee.md)** | **R** | **R** | **R** | | |
| **[uc-view-detail-fee](uc-view-detail-fee.md)** | **R** | **R** | **R** | **R** | **R** |
| **[uc-delete-fee](uc-delete-fee.md)** | **D** (Logic: `DELETED`) | **D** | **D** | **C** (Log xóa) | |
| **[uc-process-fee-profile](uc-process-fee-profile.md)** | **C, R, U** | **C, R, U** | **C, R, U** | **C** (Ghi vết) | **R** |
| **[uc-auto-golive](uc-auto-golive.md)** | **R, U** (`READY` $\to$ `ACTIVE`) | | | **C** (Log hệ thống)| |

---

## 3. Actors Reference

| Actor | Loại | Mô tả vai trò nghiệp vụ | Nguồn thẩm quyền |
|---|---|---|---|
| **Maker** | Primary Actor (Người dùng nội bộ) | Chuyên viên Vận hành / Tính cước EPAY. Phụ trách tra cứu, thêm mới, sửa đổi, xóa nháp và gửi phê duyệt hồ sơ biểu phí. | Phân quyền vai trò Maker trên EPAY Portal |
| **Checker** | Primary Actor (Người dùng nội bộ) | Trưởng phòng / Cán bộ Phê duyệt EPAY. Phụ trách thẩm định hồ sơ so sánh CŨ - MỚI, ra quyết định Phê duyệt hoặc Từ chối hồ sơ. | Phân quyền vai trò Checker trên EPAY Portal |
| **Scheduler Job** | System Actor (Hệ thống ngầm) | Tiến trình tự động hóa chạy định kỳ trên máy chủ Portal, phụ trách quét thời gian hiệu lực và kích hoạt biểu phí tự động (Auto Golive). | Cron Job / Scheduler Service |
| **Billing & Settlement Engine** | Secondary Actor (Hệ thống nội bộ) | Động cơ tính cước và đối soát doanh thu chi phí, nhận dữ liệu cấu hình `ACTIVE` để cấn trừ phí giao dịch đối tác. | Module Billing Backend |

---

## 4. Use Case Relationships

| Mối quan hệ | Từ Use Case (From) | Đến Use Case (To) | Giải thích lý do nghiệp vụ |
|---|---|---|---|
| **extend** | `uc-export-fee` | `uc-search-list-fee` | Người dùng mở rộng thao tác xuất tệp Excel trực tiếp từ kết quả danh sách đang tìm kiếm. |
| **extend** | `uc-delete-fee` | `uc-search-list-fee` | Người dùng chọn xóa bản ghi `DRAFT` hoặc `NEW` từ menu thao tác trên từng dòng danh sách. |
| **extend** | `uc-delete-fee` | `uc-view-detail-fee` | Người dùng thực hiện xóa bản ghi từ màn hình Xem chi tiết. |
| **include** | `uc-process-fee-profile` | `uc-view-detail-fee` | Luồng thẩm định của Checker và chỉnh sửa của Maker luôn cần nạp thông tin chi tiết cấu hình hiện tại làm dữ liệu nền. |
| **trigger** | `uc-process-fee-profile` | `uc-auto-golive` | Khi Checker duyệt một cấu hình có ngày áp dụng trong tương lai (`READY`), bản ghi trở thành đối tượng theo dõi của Scheduler Job. |

---

## 5. Nguồn dữ liệu tham chiếu
- **Core Spec SRS**: [`docs/partner-fee-management/srs/partner-fee-management-spec.md`](../srs/partner-fee-management-spec.md)
- **Data ERD**: [`docs/partner-fee-management/srs/partner-fee-management-erd.md`](../srs/partner-fee-management-erd.md)
- **Sơ đồ luồng**: [`docs/partner-fee-management/srs/partner-fee-management-flows.md`](../srs/partner-fee-management-flows.md)
- **Sơ đồ trạng thái**: [`docs/partner-fee-management/srs/partner-fee-management-states.md`](../srs/partner-fee-management-states.md)
