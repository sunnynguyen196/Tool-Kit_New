---
id: QR-UC05
title: "Xử lý thông tin hồ sơ CHP Trả đối tác QRGW"
feature: partner-fee-management
module: QRGW
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 3.6 QR-UC05: Xử lý thông tin hồ sơ CHP Trả đối tác QRGW

## 3.6.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xử lý thông tin hồ sơ và Phê duyệt Maker – Checker cấu hình phí QRGW** |
| **ID** | **QR - UC05** |
| **Description** | Quản lý vòng đời tương tác Maker – Checker phân hệ QRGW theo nguyên tắc kiểm soát 4 mắt (Four-Eyes Principle): Maker gửi yêu cầu phê duyệt từ các trạng thái; Checker thẩm định đối chiếu so sánh trực quan CŨ – MỚI và ra quyết định Phê duyệt hoặc Từ chối kèm lý do; Maker rút yêu cầu hoặc điều chuyển người phê duyệt; Maker gửi yêu cầu Tạm dừng và Mở kích hoạt. |
| **Actor** | Maker QRGW, Checker QRGW, Quản lý Maker QRGW |
| **Trigger** | Maker bấm nút gửi phê duyệt / tạm dừng / kích hoạt; hoặc Checker bấm nút phê duyệt / từ chối trên hồ sơ QRGW. |
| **Pre-Condition** | Bản ghi cấu hình QRGW ở trạng thái hợp lệ tương ứng với từng hành động; người dùng có vai trò và thẩm quyền phê duyệt QRGW. |
| **Post-Condition** | Bản ghi cấu hình phí QRGW và hồ sơ YCPD liên kết được chuyển trạng thái chính xác theo đúng ma trận quy tắc nghiệp vụ. |
| **Basic flow** | 1. Người dùng vào menu **[Quản lý cấu hình phí] > [Phí trả đối tác] > [Phí đối tác QRGW]** ở thanh menu bên trái.<br>2. Hệ thống hiển thị màn hình danh sách cấu hình phí QRGW.<br>3. Người dùng tìm kiếm và chọn mã cấu hình phí cần xử lý.<br>4. Hệ thống hiển thị màn hình chi tiết hồ sơ cấu hình phí QRGW cùng các thao tác theo quyền và trạng thái. |
| **Alternative flow** | - **A1 (Rút yêu cầu)**: Khi hồ sơ QRGW đang `PENDING` và Checker chưa xử lý, Maker bấm **[Rút yêu cầu]** $\rightarrow$ Bản ghi quay về `NEW`, YCPD chuyển `Cancelled`.<br>- **A2 (Đổi người duyệt)**: Maker bấm **[Thay đổi người PD]** $\rightarrow$ Chọn Checker hợp lệ khác $\rightarrow$ Cập nhật trường Người phê duyệt trong YCPD.<br>- **A3 (Tạm dừng cấu hình)**: Maker gửi yêu cầu tạm dừng từ `ACTIVE` $\rightarrow$ Checker duyệt $\rightarrow$ Bản ghi chuyển sang `INACTIVE`.<br>- **A4 (Mở kích hoạt)**: Maker gửi yêu cầu mở kích hoạt từ `INACTIVE` $\rightarrow$ Checker duyệt $\rightarrow$ Bản ghi chuyển sang `ACTIVE` (hoặc `READY`). |
| **Exception flow** | - **E1 (Vi phạm kiểm soát 4 mắt)**: Maker cố tình tự phê duyệt bản ghi do chính mình tạo ra $\rightarrow$ Hệ thống chặn trực tiếp với mã lỗi `E-partner-fee-management-006`.<br>- **E2 (Thiếu lý do từ chối)**: Checker bấm xác nhận từ chối nhưng bỏ trống lý do hoặc nhập $< 10$ ký tự $\rightarrow$ Báo lỗi `E-partner-fee-management-005`. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung xử lý hồ sơ và Phê duyệt Maker - Checker QRGW](#363-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Thẩm định đối chiếu so sánh CŨ - MỚI phản hồi $< 1.0$ giây; Cập nhật trạng thái phê duyệt $< 1.0$ giây. |

---

## 3.6.2 Giao diện

### Màn hình Wireframe liên kết:
* **QR-UC05-WF01**: Phê duyệt / Checker — Chờ phê duyệt (`4020:47923`)
* **QR-UC05-WF02**: Phê duyệt / Checker — Màn hình Thẩm định so sánh CŨ MỚI (`4020:48856`)
* **QR-UC05-WF03**: Modal Xác nhận từ chối phê duyệt (bắt buộc nhập lý do)
* **QR-UC05-WF04**: Modal Xác nhận thay đổi người phê duyệt

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Bảng Đối chiếu So sánh CŨ - MỚI** | Dual Column Grid | M | N | Readonly | Hiển thị song song: Cột trái (Dữ liệu CŨ đang áp dụng), Cột phải (Dữ liệu MỚI đề xuất). Tự động đánh dấu các trường có sự thay đổi. |
| **Nút [Phê duyệt]** | Button | M | Y | Click | Chỉ hiển thị với Checker (và Checker $\ne$ Maker). Bấm để kích hoạt biểu phí QRGW. |
| **Nút [Từ chối]** | Button | M | Y | Click | Mở Modal yêu cầu nhập lý do từ chối trước khi chuyển trạng thái hồ sơ. |
| **Lý do từ chối (Textarea)** | Textbox | M (Khi từ chối) | Y | String $\ge 10$ chars | Bắt buộc nhập giải trình tối thiểu 10 ký tự lý do không duyệt để Maker có cơ sở chỉnh sửa. |
| **Modal [Thay đổi người PD]** | Modal Dropdown | C | Y | Select single | Danh sách chọn Checker thay thế. Ràng buộc Checker mới không trùng với Maker tạo bản ghi. |

---

## 3.6.3 Yêu cầu nghiệp vụ chung

#### Chi tiết xử lý nghiệp vụ

**[Luồng A — Maker Gửi yêu cầu phê duyệt QRGW]**:
1. Maker mở bản ghi QRGW ở trạng thái `NEW` (hoặc `ACTIVE`, `INACTIVE`).
2. Bấm nút **[Gửi yêu cầu phê duyệt]** (hoặc *Gửi duyệt cập nhật*, *Gửi tạm dừng*, *Gửi mở kích hoạt*).
3. Hệ thống sinh mã YCPD `AR_MM_MC_[Timestamp]`, insert 1 bản ghi YCPD tương ứng với trạng thái `Pending`.
4. Bản ghi CHP QRGW chuyển trạng thái tương ứng (`PENDING`).

**[Luồng B — Checker Thẩm định & Phê duyệt QRGW]**:
1. Checker đăng nhập, truy cập tab *Chờ phê duyệt* và mở hồ sơ YCPD QRGW cần xử lý.
2. Hệ thống hiển thị màn hình Thẩm định đối chiếu CŨ – MỚI (đánh dấu các trường có sự thay đổi).
3. Checker đối chiếu tham số biểu phí VietQR với hợp đồng liên ngân hàng.
4. Checker lựa chọn hành động:
   - **Trường hợp Đồng ý**: Bấm **[Phê duyệt]** $\rightarrow$ Hệ thống cập nhật YCPD thành `Approval`; Chuyển trạng thái CHP QRGW sang `READY` khi chưa quá ngày hiệu lực; việc kích hoạt sang `ACTIVE` do job Auto-golive thực hiện. YCPD vẫn chờ duyệt khi quá ngày hiệu lực được job tự động từ chối.
   - **Trường hợp Không đồng ý**: Bấm **[Từ chối]** $\rightarrow$ Hệ thống hiển thị modal bắt buộc Checker nhập lý do từ chối (tối thiểu 10 ký tự) $\rightarrow$ Cập nhật YCPD thành `Rejected`, trả bản ghi CHP QRGW về `NEW` để Maker xử lý lại.


```text
┌─────────────────┐             ┌─────────────────┐             ┌─────────────────┐
│   MAKER QRGW    │             │   EPAY SYSTEM   │             │  CHECKER QRGW   │
└────────┬────────┘             └────────┬────────┘             └────────┬────────┘
         │                               │                               │
         │  1. Gửi yêu cầu phê duyệt     │                               │
         ├──────────────────────────────>│                               │
         │                               │  2. Sinh YCPD (Pending)       │
         │                               │     Cập nhật CHP QR (Pending) │
         │                               ├──────────────────────────────>│ (Gửi thông báo)
         │                               │                               │
         │                               │  3. Mở Thẩm định CŨ - MỚI     │
         │                               │<──────────────────────────────┤
         │                               │                               │
         │                               │  4A. [PHÊ DUYỆT]              │
         │                               │<──────────────────────────────┤
         │  5A. Thông báo Duyệt QR       │     - YCPD = Approval         │
         │<──────────────────────────────┤     - CHP = READY             │
         │                               │                               │
         │                               │  4B. [TỪ CHỐI + Lý do]        │
         │                               │<──────────────────────────────┤
         │  5B. Báo Từ chối kèm lý do   │     - YCPD = Rejected         │
         │<──────────────────────────────┤     - CHP = NEW               │
         │                               │                               │
```

---

## 3.6.4 Quy tắc lưu thông tin phê duyệt

| Trạng thái hiện tại | Ý nghĩa | Hành động thao tác | Loại yêu cầu phê duyệt được tạo ra |
|---|---|---|---|
| **New** | Maker muốn gửi yêu cầu gửi phê duyệt CHP QRGW | Gửi yêu cầu phê duyệt | **Duyệt mở tạo hồ sơ CHP Trả đối tác QRGW** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt cập nhật CHP QRGW | Gửi phê duyệt cập nhật thông tin | **Duyệt cập nhật hồ sơ CHP Trả đối tác QRGW** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt tạm dừng CHP QRGW | Gửi yêu cầu tạm dừng | **Duyệt tạm dừng hồ sơ CHP Trả đối tác QRGW** |
| **Inactive** | Maker muốn gửi yêu cầu gửi phê duyệt mở kích hoạt CHP QRGW | Gửi yêu cầu mở kích hoạt | **Duyệt mở kích hoạt CHP Trả đối tác QRGW** |

---

## 3.6.5 Quy tắc ghi nhận log hành động

| STT | Trạng thái hiện tại | Chức năng | Hành động thực hiện | Đối tượng thực hiện | Trạng thái YCPD | Tiến trình phê duyệt | Hệ thống xử lý | Trạng thái sau thực hiện | Ghi nhận lịch sử log hành động |
|:---:|---|---|---|:---:|:---:|:---:|---|:---:|---|
| **1** | **Chưa có bản ghi** | Quản lý CHP QRGW | Lưu nháp bản ghi | Maker | N/A | N/A | Hệ thống lưu bản ghi với trạng thái Draft | `DRAFT` | `[Username] đã lưu nháp CHP Trả đối tác QRGW mới ngày [Datetime]` |
| **2** | **Chưa có bản ghi** | Quản lý CHP QRGW | Lưu mới bản ghi | Maker | N/A | N/A | Hệ thống lưu bản ghi với trạng thái New | `NEW` | `[Username] đã tạo CHP Trả đối tác QRGW mới ngày [Datetime]` |
| **3** | **NEW** | Quản lý CHP QRGW | Gửi yêu cầu phê duyệt | Maker | Pending | Chờ Checker duyệt | - Bản ghi chuyển sang trạng thái Pending<br>- Sinh mã YCPD `AR_MM_MC_[Timestamp]` | `PENDING` | `[Username] đã gửi Yêu cầu phê duyệt [Mã YC] cho CHP QRGW [Mã CHP] ngày [Datetime]` |
| **4** | **PENDING** | Quản lý CHP QRGW | Phê duyệt khi chưa quá ngày hiệu lực | Checker | Pending | Duyệt chờ hiệu lực | - Chuyển sang trạng thái Ready<br>- Cập nhật YCPD thành "Approval" | `READY` | `[Username] đã phê duyệt CHP QRGW [Mã CHP], trạng thái chuyển sang READY ngày [Datetime]` |
| **5** | **PENDING** | Quản lý CHP QRGW | Từ chối phê duyệt | Checker | Pending | Từ chối hồ sơ | - Chuyển về trạng thái New<br>- Cập nhật YCPD thành "Rejected" | `NEW` | `[Username] đã từ chối phê duyệt YCPD [Mã YC] của CHP QRGW [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **6** | **ACTIVE** | Quản lý CHP QRGW | Gửi yêu cầu tạm dừng | Maker | Pending | Chờ Checker duyệt tạm dừng | - Giữ nguyên trạng thái Active<br>- Sinh YCPD "Duyệt tạm dừng hồ sơ" | `ACTIVE` (Chờ tạm dừng) | `[Username] đã gửi Yêu cầu tạm dừng [Mã YC] cho CHP QRGW [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **7** | **ACTIVE** | Quản lý CHP QRGW | Phê duyệt tạm dừng | Checker | Pending | Duyệt tạm dừng | - Chuyển sang trạng thái Inactive<br>- Cập nhật YCPD thành "Approval" | `INACTIVE` | `[Username] đã phê duyệt Tạm dừng CHP QRGW [Mã CHP], trạng thái chuyển sang INACTIVE ngày [Datetime]` |

---

## 3.6.6 Gửi thông báo qua email và nhóm Telegram

1. **Thông báo qua Email**:
   - Gửi Maker QRGW: Khi Checker Phê duyệt hoặc Từ chối hồ sơ YCPD QRGW (kèm nội dung lý do).
   - Gửi Checker QRGW: Khi Maker gửi YCPD QRGW mới hoặc thay đổi người phê duyệt chỉ định đích danh Checker.
2. **Thông báo qua Nhóm Telegram Vận hành**:
   - Cấu hình Bot Telegram gửi thông báo thời gian thực vào group vận hành QRGW khi:
     - Có hồ sơ YCPD QRGW mới được khởi tạo (Mã yêu cầu, Mã CHP, Maker, Thời gian).
     - Hồ sơ YCPD QRGW được phê duyệt thành công hoặc bị từ chối.

---

## 3.6.7 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E-005** | Thiếu lý do từ chối | Checker từ chối nhưng nhập dưới 10 ký tự lý do | Major | *“Lý do từ chối là thông tin bắt buộc và phải có độ dài tối thiểu 10 ký tự. Vui lòng nhập chi tiết!”* |
| **E-006** | Vi phạm kiểm soát 4 mắt | Maker QRGW cố tình tự phê duyệt bản ghi do chính mình tạo ra | Critical | *“Người tạo yêu cầu không được phép tự phê duyệt hồ sơ này. Vui lòng chuyển hồ sơ cho Checker khác!”* |
| **E-009** | Hồ sơ đã được xử lý | Hai Checker cùng mở một hồ sơ và người thứ hai thao tác sau | Major | *“Hồ sơ yêu cầu phê duyệt này đã được xử lý bởi một Checker khác. Hệ thống sẽ tải lại dữ liệu mới nhất!”* |
| **E-011** | Lỗi gửi tin Telegram / Email | Dịch vụ gửi mail hoặc bot Telegram gặp sự cố timeout | Minor | *“Phê duyệt hồ sơ thành công nhưng không thể gửi thông báo Telegram/Email. Vui lòng kiểm tra lại dịch vụ thông báo!”* |
