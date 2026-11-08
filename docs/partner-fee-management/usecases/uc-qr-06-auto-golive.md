---
id: QR-UC06
title: "Job tự động kích hoạt cấu hình QRGW"
feature: partner-fee-management
module: QRGW
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 3.7 QR-UC06: Job tự động kích hoạt cấu hình QRGW (Auto Golive)

## 3.7.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Tự động kích hoạt cấu hình phí QRGW đến ngày hiệu lực (Auto Golive)** |
| **ID** | **QR - UC06** |
| **Description** | Tác vụ nền (Background Cron Job) quét định kỳ vào 00:00:00 hàng ngày, tự động chuyển trạng thái các bản ghi CHP QRGW từ `READY` sang `ACTIVE` khi ngày áp dụng trùng hoặc trước ngày hiện tại. |
| **Actor** | Hệ thống (EPAY Scheduler / Background Job Runner) |
| **Trigger** | Cron expression kích hoạt định kỳ lúc **00:00:00** hàng ngày trên hệ thống Portal. |
| **Pre-Condition** | Bản ghi CHP QRGW đang ở trạng thái `READY` (đã được Checker QRGW phê duyệt trước đó và ngày áp dụng > ngày duyệt). |
| **Post-Condition** | Bản ghi CHP QRGW chuyển trạng thái sang `ACTIVE`, tự động ghi log lịch sử kích hoạt, gửi thông báo hoàn tất tới nhóm quản trị QRGW. |
| **Basic flow** | 1. Scheduler Job khởi chạy lúc 00:00:00.<br>2. Quét CSDL bảng `fee_profile` tìm các bản ghi QRGW có `source = 'QRGW'`, `status = 'READY'` và `apply_start_date <= CURRENT_DATE`.<br>3. Kiểm tra xem có bản ghi QRGW cùng loại nào đang `ACTIVE` không để xử lý chuyển sang `INACTIVE` (nếu có cấu hình thay thế).<br>4. Cập nhật `status = 'ACTIVE'`, ghi nhận `updated_by = 'SYSTEM'`, `updated_at = NOW()`.<br>5. Insert bản ghi Audit Log: *“Hệ thống tự động kích hoạt CHP Trả đối tác QRGW [Mã CHP] sang ACTIVE ngày [Datetime]”*.<br>6. Bắn thông báo Telegram/Email cho Maker & Checker QRGW thông báo cấu hình đã chính thức có hiệu lực. |
| **Alternative flow** | - **A1**: Không có bản ghi QRGW nào đến ngày hiệu lực $\rightarrow$ Job kết thúc và ghi log hệ thống: *“Quét QRGW hoàn tất: 0 bản ghi cần kích hoạt”*. |
| **Exception flow** | - **E1 (Lỗi Transaction)**: Lỗi CSDL khi update hàng loạt $\rightarrow$ Rollback toàn bộ transaction và bắn cảnh báo tới kênh Telegram DevOps.<br>- **E2 (Xung đột biểu phí)**: Phát hiện nhiều hơn 1 cấu hình QRGW trùng loại cùng hiệu lực $\rightarrow$ Đánh dấu bản ghi Warning và dừng kích hoạt để chờ đối soát thủ công. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung tự động kích hoạt cấu hình phí QRGW](#373-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Quét và xử lý toàn bộ bản ghi QRGW trong vòng dưới 30 giây; Đảm bảo 100% tính nguyên tố (ACID Transaction). |

---

## 3.7.2 Giao diện / Tiến trình

```text
┌───────────────────────────┐
│  EPAY SCHEDULER (00:00)   │
└─────────────┬─────────────┘
              │ 1. Trigger Cron Job QRGW
              ▼
┌───────────────────────────┐
│  Truy vấn bảng CSDL       │
│  source = 'QRGW'          │
│  status = 'READY'         │
│  apply_start_date <= TODAY│
└─────────────┬─────────────┘
              │ 2. Tìm thấy danh sách N bản ghi QRGW
              ▼
┌───────────────────────────┐
│  Kiểm tra xung đột &      │
│  Update status = 'ACTIVE' │
└─────────────┬─────────────┘
              │ 3. Ghi vết Audit Log & Thông báo QRGW
              ▼
┌───────────────────────────┐
│  Telegram Alert QRGW OK   │
└───────────────────────────┘
```

---

## 3.7.3 Yêu cầu nghiệp vụ chung

| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **QR-UC06-BR01.1** | **Thời điểm kích hoạt chính xác** | Hệ thống thực thi tác vụ quét vào đúng **00:00:00 (GMT+7)** hàng ngày. Toàn bộ các cấu hình QRGW có `apply_start_date <= Ngày hiện tại` và trạng thái `READY` sẽ được kích hoạt sang `ACTIVE` ngay đầu ngày. |
| **QR-UC06-BR01.2** | **Cơ chế thay thế biểu phí tiền nhiệm QRGW** | Trường hợp biểu phí mới kích hoạt thay thế cho một biểu phí cũ đang chạy (`ACTIVE`) cùng phạm vi (cùng ngân hàng, loại QR), hệ thống tự động cập nhật trạng thái biểu phí cũ sang `INACTIVE`. |
| **QR-UC06-BR01.3** | **Tính nguyên tố và nhật ký kiểm toán** | Toàn bộ quá trình quét và chuyển đổi trạng thái của từng bản ghi QRGW phải nằm trong Database Transaction riêng biệt. |

---

## 3.7.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Lỗi Transaction CSDL | Xảy ra lỗi deadlock hoặc timeout kết nối CSDL trong tiến trình cập nhật QRGW | Critical | *“Lỗi transaction khi kích hoạt tự động cấu hình phí QRGW [Mã CHP]. Tiến trình đã rollback an toàn!”* |
| **E2** | Xung đột biểu phí đồng thời | Phát hiện 2 biểu phí QRGW cùng phạm vi có cùng ngày hiệu lực | Major | *“Xung đột phạm vi áp dụng với cấu hình QRGW đang hoạt động. Tạm dừng kích hoạt tự động để kiểm tra đối soát!”* |
| **E3** | Lỗi kết nối dịch vụ thông báo | Không thể gửi tin nhắn Telegram hoặc Email sau khi kích hoạt QRGW | Minor | *“Kích hoạt cấu hình QRGW thành công nhưng không thể gửi cảnh báo Telegram. Vui lòng kiểm tra dịch vụ Notify!”* |
