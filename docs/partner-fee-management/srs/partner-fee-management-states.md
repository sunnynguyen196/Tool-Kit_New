---
type: srs-states
feature: partner-fee-management
updated: 2026-10-31
---

# Quản lý Cấu hình Phí Trả Đối tác — States

## State: PartnerFeeConfig
**Related entity**: PartnerFeeConfig
**Related UC**: [[../usecases/uc-process-fee-profile.md]], [[../usecases/uc-auto-golive.md]], [[../usecases/uc-delete-fee.md]], [[../usecases/uc-view-detail-fee.md]]
**Related BR**: BR-partner-fee-management-001, BR-partner-fee-management-002, BR-partner-fee-management-003

```mermaid
stateDiagram-v2
    [*] --> Draft : 1. Lưu bản nháp (Maker)
    [*] --> New : 1b. Tạo mới trực tiếp (Maker)

    Draft --> New : 3. Hoàn thiện thông tin & Tạo mới (Maker)
    Draft --> Deleted : 4a. Xóa bản nháp (Maker)

    New --> New : 2. Cập nhật thông tin (Maker)
    New --> Pending : 5. Gửi phê duyệt (Maker)
    New --> Deleted : 4b. Xóa bản ghi (Maker)

    Pending --> New : 6. Từ chối duyệt (Checker - kèm lý do)
    Pending --> Ready : 7A. Phê duyệt (Checker - Ngày áp dụng > Hiện tại)
    Pending --> Active : 7B. Phê duyệt (Checker - Ngày áp dụng <= Hiện tại)
    Pending --> Inactive : 7C. Phê duyệt Tạm dừng (Checker)
    Pending --> Active : 7D. Phê duyệt Cập nhật / Kích hoạt lại (Checker)

    Ready --> New : 8A. Cập nhật thông tin (Maker - Reset về New)
    Ready --> Active : 8B. Auto golive (Scheduler Job quét đúng thời điểm)

    Active --> Pending : 10. Gửi duyệt Tạm dừng (Maker)
    Active --> Pending : 11. Gửi duyệt Cập nhật thông tin (Maker)

    Inactive --> Inactive : 12. Cập nhật thông tin (Maker)
    Inactive --> Pending : 13. Gửi duyệt mở Kích hoạt (Maker)

    Deleted --> [*]
```

### Invalid transitions

| Từ trạng thái | Đến trạng thái | Lý do cấm (Why not) |
|---|---|---|
| `Deleted` | Bất kỳ | Bản ghi đã xóa vĩnh viễn khỏi chu trình vận hành, không được phép phục hồi |
| `Active` | `Deleted` | Cấu hình đang hoạt động tính cước không được phép xóa; bắt buộc phải qua luồng Tạm dừng (`Inactive`) |
| `Ready` | `Deleted` | Cấu hình đã được Checker phê duyệt sẵn sàng golive không được xóa trực tiếp; phải cập nhật để reset về `New` rồi mới xóa |
| `Inactive` | `Deleted` | Cấu hình đã từng phát sinh hiệu lực tính cước phải được bảo toàn trong cơ sở dữ liệu để phục vụ đối soát và kiểm toán lịch sử (Audit Log) |
| `Pending` | `Deleted` | Bản ghi đang trong hàng đợi phê duyệt của Checker bị khóa thao tác xóa để đảm bảo tính toàn vẹn của Yêu cầu phê duyệt (YCPD) |
| `Active` | `Ready` | Cấu hình đang có hiệu lực không thể quay ngược về trạng thái chờ kích hoạt trong tương lai |
| `Draft` | `Pending` | Bản nháp chưa được xác thực đầy đủ các trường thông tin bắt buộc (*); phải bấm [Tạo mới +] để chuyển sang `New` trước khi gửi duyệt |
| `Draft` | `Active` / `Ready` | Bắt buộc phải tuân thủ nguyên tắc kiểm soát 4 mắt (Maker – Checker), không thể nhảy cóc từ nháp lên trạng thái hiệu lực |
