---
type: usecase-index
feature: partner-fee-management
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_ctt: docs/partner-fee-management/srs/SRS-Partner-Fee-CTT.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - erd: docs/partner-fee-management/srs/partner-fee-management-erd.md
  - flows: docs/partner-fee-management/srs/partner-fee-management-flows.md
  - states: docs/partner-fee-management/srs/partner-fee-management-states.md
---

# Quản lý Cấu hình Phí Trả Đối tác — Danh mục Use Cases (CTT & QRGW)

---

# PHẦN 1: QUẢN LÝ CẤU HÌNH PHÍ ĐỐI TÁC CTT (CỔNG THANH TOÁN)

## 1.1 Danh sách Use Cases CTT (Traceability Matrix)

| # | Mã UC | Tên Use Case CTT | Tệp tài liệu | Actor chính | Đáp ứng FR | Màn hình liên kết | Ưu tiên |
|---|---|---|---|---|---|---|:---:|
| 1 | **CTT-UC01** | Tìm kiếm và xem danh sách cấu hình phí đối tác CTT | [uc-ctt-01-search-list](uc-ctt-01-search-list.md) | Maker, Checker, Đối soát | FR-001, FR-002 | `4020:50223`, `4020:51051`, `4020:51879` | P0 |
| 2 | **CTT-UC02** | Xuất tệp dữ liệu CHP Trả đối tác CTT | [uc-ctt-02-export](uc-ctt-02-export.md) | Maker, Checker, Kế toán | FR-001 | `4020:50223` (Menu [Xuất tệp]) | P1 |
| 3 | **CTT-UC03** | Xem chi tiết thông tin phí Trả đối tác CTT | [uc-ctt-03-view-detail](uc-ctt-03-view-detail.md) | Maker, Checker, Kiểm toán | FR-010, FR-011 | `4020:43846`, `4020:45486`, `4020:47172` | P0 |
| 4 | **CTT-UC04** | Xóa CHP Trả đối tác CTT | [uc-ctt-04-delete](uc-ctt-04-delete.md) | Maker | FR-001, FR-010 | `4020:50223` (Menu row), `4020:50006` | P1 |
| 5 | **CTT-UC05** | Xử lý thông tin hồ sơ CHP Trả đối tác CTT | [uc-ctt-05-process-fee-profile](uc-ctt-05-process-fee-profile.md) | Maker, Checker, Quản lý | FR-003 đến FR-009, FR-012 | `4022:53508` – `4022:58264`, `4020:47923`, `4020:48856` | P0 |
| 6 | **CTT-UC06** | Job tự động kích hoạt cấu hình CTT | [uc-ctt-06-auto-golive](uc-ctt-06-auto-golive.md) | Hệ thống (Scheduler) | FR-013 | System background task | P0 |

## 1.2 CRUD Matrix phân hệ CTT

| Use Case CTT \ Thực thể | `PARTNER_FEE_CONFIG` | `FEE_TIER_DETAIL` | `FEE_SERVICE_DETAIL` | `FEE_AUDIT_LOG` | `MCC_CATEGORY` |
|---|---|---|---|---|---|
| **[CTT-UC01](uc-ctt-01-search-list.md)** | **R** | | | | **R** |
| **[CTT-UC02](uc-ctt-02-export.md)** | **R** | **R** | **R** | | |
| **[CTT-UC03](uc-ctt-03-view-detail.md)** | **R** | **R** | **R** | **R** | **R** |
| **[CTT-UC04](uc-ctt-04-delete.md)** | **D** (Soft-delete) | **D** | **D** | **C** (Log xóa) | |
| **[CTT-UC05](uc-ctt-05-process-fee-profile.md)** | **C, R, U** | **C, R, U** | **C, R, U** | **C** (Ghi vết) | **R** |
| **[CTT-UC06](uc-ctt-06-auto-golive.md)** | **R, U** (`READY` $\to$ `ACTIVE`) | | | **C** (Log hệ thống) | |

---

# PHẦN 2: QUẢN LÝ CẤU HÌNH PHÍ ĐỐI TÁC QRGW (CỔNG VIETQR / QR GATEWAY)

## 2.1 Danh sách Use Cases QRGW (Traceability Matrix)

| # | Mã UC | Tên Use Case QRGW | Tệp tài liệu | Actor chính | Đáp ứng FR | Màn hình liên kết | Ưu tiên |
|---|---|---|---|---|---|---|:---:|
| 1 | **QR-UC01** | Tìm kiếm và xem danh sách cấu hình phí đối tác QRGW | [uc-qr-01-search-list](uc-qr-01-search-list.md) | Maker, Checker, Đối soát QR | FR-001, FR-002 | `4020:50223`, `4020:51051`, `4020:51879` | P0 |
| 2 | **QR-UC02** | Xuất tệp dữ liệu CHP Trả đối tác QRGW | [uc-qr-02-export](uc-qr-02-export.md) | Maker, Checker, Kế toán | FR-001 | `4020:50223` (Menu [Xuất tệp]) | P1 |
| 3 | **QR-UC03** | Xem chi tiết thông tin phí Trả đối tác QRGW | [uc-qr-03-view-detail](uc-qr-03-view-detail.md) | Maker, Checker, Kiểm toán | FR-010, FR-011 | `4020:44666`, `4020:46306`, `4020:47172` | P0 |
| 4 | **QR-UC04** | Xóa CHP Trả đối tác QRGW | [uc-qr-04-delete](uc-qr-04-delete.md) | Maker | FR-001, FR-010 | `4020:50223` (Menu row), `4020:50006` | P1 |
| 5 | **QR-UC05** | Xử lý thông tin hồ sơ CHP Trả đối tác QRGW | [uc-qr-05-process-fee-profile](uc-qr-05-process-fee-profile.md) | Maker, Checker, Quản lý | FR-003 đến FR-009, FR-012 | `4020:47923`, `4020:48856` | P0 |
| 6 | **QR-UC06** | Job tự động kích hoạt cấu hình QRGW | [uc-qr-06-auto-golive](uc-qr-06-auto-golive.md) | Hệ thống (Scheduler) | FR-013 | System background task | P0 |

## 2.2 CRUD Matrix phân hệ QRGW

| Use Case QRGW \ Thực thể | `PARTNER_FEE_CONFIG` | `FEE_TIER_DETAIL` | `FEE_SERVICE_DETAIL` | `FEE_AUDIT_LOG` | `MCC_CATEGORY` |
|---|---|---|---|---|---|
| **[QR-UC01](uc-qr-01-search-list.md)** | **R** | | | | |
| **[QR-UC02](uc-qr-02-export.md)** | **R** | **R** | **R** | | |
| **[QR-UC03](uc-qr-03-view-detail.md)** | **R** | **R** | **R** | **R** | |
| **[QR-UC04](uc-qr-04-delete.md)** | **D** (Soft-delete) | **D** | **D** | **C** (Log xóa) | |
| **[QR-UC05](uc-qr-05-process-fee-profile.md)** | **C, R, U** | **C, R, U** | **C, R, U** | **C** (Ghi vết) | |
| **[QR-UC06](uc-qr-06-auto-golive.md)** | **R, U** (`READY` $\to$ `ACTIVE`) | | | **C** (Log hệ thống) | |

---

## 3. Actors Reference

| Actor | Loại | Mô tả vai trò nghiệp vụ | Nguồn thẩm quyền |
|---|---|---|---|
| **Maker (CTT / QRGW)** | Primary Actor | Chuyên viên Vận hành / Tính cước phân hệ tương ứng. Phụ trách tra cứu, thêm mới, sửa đổi, xóa nháp và gửi phê duyệt. | Phân quyền Maker trên EPAY Portal |
| **Checker (CTT / QRGW)** | Primary Actor | Trưởng phòng / Cán bộ Phê duyệt. Phụ trách thẩm định so sánh CŨ - MỚI, ra quyết định Phê duyệt hoặc Từ chối hồ sơ. | Phân quyền Checker trên EPAY Portal |
| **Scheduler Job** | System Actor | Tiến trình tự động hóa chạy lúc 00:00:00 hàng ngày, quét thời gian hiệu lực và kích hoạt biểu phí tự động (Auto Golive). | Cron Job / Scheduler Service |
| **Billing & Settlement Engine** | Secondary Actor | Động cơ tính cước và đối soát doanh thu chi phí, nhận dữ liệu cấu hình `ACTIVE` để cấn trừ phí giao dịch đối tác. | Module Billing Backend |
