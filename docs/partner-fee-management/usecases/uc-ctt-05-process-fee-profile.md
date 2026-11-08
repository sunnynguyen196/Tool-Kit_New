---
id: CTT-UC05
title: "Xử lý thông tin hồ sơ CHP Trả đối tác CTT"
feature: partner-fee-management
module: CTT
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_ctt: docs/partner-fee-management/srs/SRS-Partner-Fee-CTT.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 2.6 CTT-UC05: Xử lý thông tin hồ sơ CHP Trả đối tác CTT

## 2.6.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xử lý thông tin hồ sơ và Phê duyệt Maker – Checker cấu hình phí CTT** |
| **ID** | **CTT - UC05** |
| **Description** | Quản lý vòng đời tương tác Maker – Checker phân hệ CTT theo nguyên tắc kiểm soát 4 mắt (Four-Eyes Principle): Maker gửi yêu cầu phê duyệt từ các trạng thái; Checker thẩm định đối chiếu so sánh trực quan CŨ – MỚI và ra quyết định Phê duyệt hoặc Từ chối kèm lý do; Maker rút yêu cầu hoặc điều chuyển người phê duyệt; Maker gửi yêu cầu Tạm dừng và Mở kích hoạt. |
| **Actor** | Maker CTT, Checker CTT, Quản lý Maker CTT |
| **Trigger** | Maker bấm nút gửi phê duyệt / tạm dừng / kích hoạt; hoặc Checker bấm nút phê duyệt / từ chối trên hồ sơ CTT. |
| **Pre-Condition** | Bản ghi cấu hình CTT ở trạng thái hợp lệ tương ứng với từng hành động; người dùng có vai trò và thẩm quyền phê duyệt CTT. |
| **Post-Condition** | Bản ghi cấu hình phí CTT và hồ sơ YCPD liên kết được chuyển trạng thái chính xác theo đúng ma trận quy tắc nghiệp vụ. |
| **Basic flow** | **[Luồng A — Maker Gửi yêu cầu phê duyệt CTT]**:<br>1. Maker mở bản ghi CTT ở trạng thái `NEW` (hoặc `ACTIVE`, `INACTIVE`).<br>2. Bấm nút **[Gửi yêu cầu phê duyệt]** (hoặc *Gửi duyệt cập nhật*, *Gửi tạm dừng*, *Gửi mở kích hoạt*).<br>3. Hệ thống sinh mã YCPD `AR_MM_MC_[Timestamp]`, insert 1 bản ghi YCPD tương ứng với trạng thái `Pending`.<br>4. Bản ghi CHP CTT chuyển trạng thái tương ứng (`PENDING`).<br><br>**[Luồng B — Checker Thẩm định & Phê duyệt CTT]**:<br>1. Checker đăng nhập, truy cập tab *Chờ phê duyệt* và mở hồ sơ YCPD CTT cần xử lý.<br>2. Hệ thống hiển thị màn hình Thẩm định đối chiếu CŨ – MỚI (đánh dấu các trường có sự thay đổi).<br>3. Checker đối chiếu tham số biểu phí thẻ CTT với hợp đồng thương mại.<br>4. Checker lựa chọn hành động:<br>   - **Trường hợp Đồng ý**: Bấm **[Phê duyệt]** $\rightarrow$ Hệ thống cập nhật YCPD thành `Approval`; Chuyển trạng thái CHP CTT sang `ACTIVE` (nếu ngày áp dụng $\le$ hiện tại) hoặc `READY` (nếu ngày áp dụng $>$ hiện tại).<br>   - **Trường hợp Không đồng ý**: Bấm **[Từ chối]** $\rightarrow$ Hệ thống hiển thị modal bắt buộc Checker nhập lý do từ chối (tối thiểu 10 ký tự) $\rightarrow$ Cập nhật YCPD thành `Rejected`, trả bản ghi CHP CTT về `NEW` (hoặc `REJECTED`) để Maker xử lý lại. |
| **Alternative flow** | - **A1 (Rút yêu cầu)**: Khi hồ sơ CTT đang `PENDING` và Checker chưa xử lý, Maker bấm **[Rút yêu cầu]** $\rightarrow$ Bản ghi quay về `NEW`, YCPD chuyển `Cancelled`.<br>- **A2 (Đổi người duyệt)**: Maker bấm **[Thay đổi người PD]** $\rightarrow$ Chọn Checker hợp lệ khác $\rightarrow$ Cập nhật trường Người phê duyệt trong YCPD.<br>- **A3 (Tạm dừng cấu hình)**: Maker gửi yêu cầu tạm dừng từ `ACTIVE` $\rightarrow$ Checker duyệt $\rightarrow$ Bản ghi chuyển sang `INACTIVE`.<br>- **A4 (Mở kích hoạt)**: Maker gửi yêu cầu mở kích hoạt từ `INACTIVE` $\rightarrow$ Checker duyệt $\rightarrow$ Bản ghi chuyển sang `ACTIVE` (hoặc `READY`). |
| **Exception flow** | - **E1 (Vi phạm kiểm soát 4 mắt)**: Maker cố tình tự phê duyệt bản ghi do chính mình tạo ra $\rightarrow$ Hệ thống chặn trực tiếp với mã lỗi `E-partner-fee-management-006`.<br>- **E2 (Thiếu lý do từ chối)**: Checker bấm xác nhận từ chối nhưng bỏ trống lý do hoặc nhập $< 10$ ký tự $\rightarrow$ Báo lỗi `E-partner-fee-management-005`. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung xử lý hồ sơ và Phê duyệt Maker - Checker CTT](#263-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Thẩm định đối chiếu so sánh CŨ - MỚI phản hồi $< 1.0$ giây; Cập nhật trạng thái phê duyệt $< 1.0$ giây. |

---

## 2.6.2 Giao diện

### Màn hình Wireframe liên kết:
* **CTT-UC05-WF01**: Phê duyệt / Checker — Chờ phê duyệt (`4020:47923`)
* **CTT-UC05-WF02**: Phê duyệt / Checker — Màn hình Thẩm định so sánh CŨ MỚI (`4020:48856`)
* **CTT-UC05-WF03**: Modal Xác nhận từ chối phê duyệt (bắt buộc nhập lý do)
* **CTT-UC05-WF04**: Modal Xác nhận thay đổi người phê duyệt

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Bảng Đối chiếu So sánh CŨ - MỚI** | Dual Column Grid | M | N | Readonly | Hiển thị song song: Cột trái (Dữ liệu CŨ đang áp dụng), Cột phải (Dữ liệu MỚI đề xuất). Tự động đánh dấu các trường có sự thay đổi. |
| **Nút [Phê duyệt]** | Button | M | Y | Click | Chỉ hiển thị với Checker (và Checker $\ne$ Maker). Bấm để kích hoạt biểu phí CTT. |
| **Nút [Từ chối]** | Button | M | Y | Click | Mở Modal yêu cầu nhập lý do từ chối trước khi chuyển trạng thái hồ sơ. |
| **Lý do từ chối (Textarea)** | Textbox | M (Khi từ chối) | Y | String $\ge 10$ chars | Bắt buộc nhập giải trình tối thiểu 10 ký tự lý do không duyệt để Maker có cơ sở chỉnh sửa. |
| **Modal [Thay đổi người PD]** | Modal Dropdown | C | Y | Select single | Danh sách chọn Checker thay thế. Ràng buộc Checker mới không trùng với Maker tạo bản ghi. |

---

## 2.6.3 Yêu cầu nghiệp vụ chung

```text
┌─────────────────┐             ┌─────────────────┐             ┌─────────────────┐
│    MAKER CTT    │             │   EPAY SYSTEM   │             │   CHECKER CTT   │
└────────┬────────┘             └────────┬────────┘             └────────┬────────┘
         │                               │                               │
         │  1. Gửi yêu cầu phê duyệt     │                               │
         ├──────────────────────────────>│                               │
         │                               │  2. Sinh YCPD (Pending)       │
         │                               │     Cập nhật CHP CTT (Pending)│
         │                               ├──────────────────────────────>│ (Gửi thông báo)
         │                               │                               │
         │                               │  3. Mở Thẩm định CŨ - MỚI     │
         │                               │<──────────────────────────────┤
         │                               │                               │
         │                               │  4A. [PHÊ DUYỆT]              │
         │                               │<──────────────────────────────┤
         │  5A. Thông báo Duyệt CTT      │     - YCPD = Approval         │
         │<──────────────────────────────┤     - CHP = ACTIVE / READY    │
         │                               │                               │
         │                               │  4B. [TỪ CHỐI + Lý do]        │
         │                               │<──────────────────────────────┤
         │  5B. Báo Từ chối kèm lý do   │     - YCPD = Rejected         │
         │<──────────────────────────────┤     - CHP = NEW / REJECTED    │
         │                               │                               │
```

---

## 2.6.4 Quy tắc lưu thông tin phê duyệt

| Trạng thái hiện tại | Ý nghĩa | Hành động thao tác | Loại yêu cầu phê duyệt được tạo ra |
|---|---|---|---|
| **New** | Maker muốn gửi yêu cầu gửi phê duyệt CHP CTT | Gửi yêu cầu phê duyệt | **Duyệt mở tạo hồ sơ CHP Trả đối tác CTT** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt cập nhật CHP CTT | Gửi phê duyệt cập nhật thông tin | **Duyệt cập nhật hồ sơ CHP Trả đối tác CTT** |
| **Active** | Maker muốn gửi yêu cầu gửi phê duyệt tạm dừng CHP CTT | Gửi yêu cầu tạm dừng | **Duyệt tạm dừng hồ sơ CHP Trả đối tác CTT** |
| **Inactive** | Maker muốn gửi yêu cầu gửi phê duyệt mở kích hoạt CHP CTT | Gửi yêu cầu mở kích hoạt | **Duyệt mở kích hoạt CHP Trả đối tác CTT** |

---

## 2.6.5 Quy tắc ghi nhận log hành động

| STT | Trạng thái hiện tại | Chức năng | Hành động thực hiện | Đối tượng thực hiện | Trạng thái YCPD | Tiến trình phê duyệt | Hệ thống xử lý | Trạng thái sau thực hiện | Ghi nhận lịch sử log hành động |
|:---:|---|---|---|:---:|:---:|:---:|---|:---:|---|
| **1** | **Chưa có bản ghi** | Quản lý CHP CTT | Lưu nháp bản ghi | Maker | N/A | N/A | Hệ thống lưu bản ghi với trạng thái Draft | `DRAFT` | `[Username] đã lưu nháp CHP Trả đối tác CTT mới ngày [Datetime]` |
| **2** | **Chưa có bản ghi** | Quản lý CHP CTT | Lưu mới bản ghi | Maker | N/A | N/A | Hệ thống lưu bản ghi với trạng thái New | `NEW` | `[Username] đã tạo CHP Trả đối tác CTT mới ngày [Datetime]` |
| **3** | **NEW** | Quản lý CHP CTT | Gửi yêu cầu phê duyệt | Maker | Pending | Chờ Checker duyệt | - Bản ghi chuyển sang trạng thái Pending<br>- Sinh mã YCPD `AR_MM_MC_[Timestamp]` | `PENDING` | `[Username] đã gửi Yêu cầu phê duyệt [Mã YC] cho CHP CTT [Mã CHP] ngày [Datetime]` |
| **4** | **PENDING** | Quản lý CHP CTT | Phê duyệt ($\le$ Hiện tại) | Checker | Pending | Duyệt hiệu lực ngay | - Chuyển sang trạng thái Active<br>- Cập nhật YCPD thành "Approval" | `ACTIVE` | `[Username] đã phê duyệt CHP CTT [Mã CHP], trạng thái chuyển sang ACTIVE ngày [Datetime]` |
| **5** | **PENDING** | Quản lý CHP CTT | Từ chối phê duyệt | Checker | Pending | Từ chối hồ sơ | - Chuyển về trạng thái New<br>- Cập nhật YCPD thành "Rejected" | `NEW` | `[Username] đã từ chối phê duyệt YCPD [Mã YC] của CHP CTT [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **6** | **ACTIVE** | Quản lý CHP CTT | Gửi yêu cầu tạm dừng | Maker | Pending | Chờ Checker duyệt tạm dừng | - Giữ nguyên trạng thái Active<br>- Sinh YCPD "Duyệt tạm dừng hồ sơ" | `ACTIVE` (Chờ tạm dừng) | `[Username] đã gửi Yêu cầu tạm dừng [Mã YC] cho CHP CTT [Mã CHP], Lý do: [Lý do] ngày [Datetime]` |
| **7** | **ACTIVE** | Quản lý CHP CTT | Phê duyệt tạm dừng | Checker | Pending | Duyệt tạm dừng | - Chuyển sang trạng thái Inactive<br>- Cập nhật YCPD thành "Approval" | `INACTIVE` | `[Username] đã phê duyệt Tạm dừng CHP CTT [Mã CHP], trạng thái chuyển sang INACTIVE ngày [Datetime]` |

---

## 2.6.6 Gửi thông báo qua email và nhóm Telegram

1. **Thông báo qua Email**:
   - Gửi Maker CTT: Khi Checker Phê duyệt hoặc Từ chối hồ sơ YCPD CTT (kèm nội dung lý do).
   - Gửi Checker CTT: Khi Maker gửi YCPD CTT mới hoặc thay đổi người phê duyệt chỉ định đích danh Checker.
2. **Thông báo qua Nhóm Telegram Vận hành**:
   - Cấu hình Bot Telegram gửi thông báo thời gian thực vào group vận hành CTT khi:
     - Có hồ sơ YCPD CTT mới được khởi tạo (Mã yêu cầu, Mã CHP, Maker, Thời gian).
     - Hồ sơ YCPD CTT được phê duyệt thành công hoặc bị từ chối.

---

## 2.6.7 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E-005** | Thiếu lý do từ chối | Checker từ chối nhưng nhập dưới 10 ký tự lý do | Major | *“Lý do từ chối là thông tin bắt buộc và phải có độ dài tối thiểu 10 ký tự. Vui lòng nhập chi tiết!”* |
| **E-006** | Vi phạm kiểm soát 4 mắt | Maker CTT cố tình tự phê duyệt bản ghi do chính mình tạo ra | Critical | *“Người tạo yêu cầu không được phép tự phê duyệt hồ sơ này. Vui lòng chuyển hồ sơ cho Checker khác!”* |
| **E-009** | Hồ sơ đã được xử lý | Hai Checker cùng mở một hồ sơ và người thứ hai thao tác sau | Major | *“Hồ sơ yêu cầu phê duyệt này đã được xử lý bởi một Checker khác. Hệ thống sẽ tải lại dữ liệu mới nhất!”* |
| **E-011** | Lỗi gửi tin Telegram / Email | Dịch vụ gửi mail hoặc bot Telegram gặp sự cố timeout | Minor | *“Phê duyệt hồ sơ thành công nhưng không thể gửi thông báo Telegram/Email. Vui lòng kiểm tra lại dịch vụ thông báo!”* |
