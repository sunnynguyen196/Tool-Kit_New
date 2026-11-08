---
type: srs-flows
feature: partner-fee-management
updated: 2026-10-31
---

# Quản lý Cấu hình Phí Trả Đối tác — Flows

## Flow: Maker Tạo mới & Gửi yêu cầu phê duyệt cấu hình phí
**Trigger**: Maker bấm [+ Thêm mới] tại màn hình Quản lý cấu hình phí trên EPAY Portal.
**Related UC**: [[../usecases/uc-process-fee-profile.md]]
**Related FR**: FR-partner-fee-management-003, FR-partner-fee-management-004, FR-partner-fee-management-005, FR-partner-fee-management-006, FR-partner-fee-management-008
**Related E**: E-partner-fee-management-001, E-partner-fee-management-002, E-partner-fee-management-003, E-partner-fee-management-004

```mermaid
sequenceDiagram
    actor Maker as Chuyên viên Vận hành (Maker)
    participant UI as EPAY Portal UI
    participant Sim as Fee Simulator Modal
    participant API as Fee Config Service
    participant DB as Database (fee_configs)
    participant Noti as Notification Service
    actor Checker as Cán bộ Phê duyệt (Checker)

    Maker->>UI: Truy cập menu Quản lý cấu hình phí > [+ Thêm mới]
    UI-->>Maker: Hiển thị form Thêm mới gồm 4 tab (Duy trì, Xử lý, Thanh toán, DVGT)

    Maker->>UI: Chọn Tab phí, nhập Thông tin chung (Đối tác, Kỳ trả phí, Ngày áp dụng)
    Maker->>UI: Chọn danh mục mã ngành MCC qua Dual-Listbox
    Maker->>UI: Cấu hình mức phí (Tỷ lệ %, Min, Max hoặc Bậc thang)

    opt Kiểm thử số liệu tính phí
        Maker->>UI: Bấm nút [Tính thử 🧮]
        UI->>Sim: Khởi chạy Popup Tính thử phí
        Maker->>Sim: Nhập Giá trị GD và SLGD mô phỏng
        Sim->>Sim: Tính toán theo công thức f = (% * Giá trị GD) * VAT, chặn Min/Max
        Sim-->>Maker: Hiển thị kết quả Phí thực tế và giải thích công thức
        Maker->>Sim: Bấm [Đóng popup]
    end

    alt Nhánh 1: Maker bấm [Lưu nháp]
        Maker->>UI: Bấm [Lưu nháp]
        UI->>API: POST /api/v1/fee-configs/draft
        API->>DB: INSERT INTO fee_configs (status='DRAFT', ycpd=NULL)
        DB-->>API: Lưu thành công (ID: CHP-2026-xxx)
        API-->>UI: Response HTTP 201 Created
        UI-->>Maker: Toast thông báo: "Lưu nháp cấu hình phí thành công"
    else Nhánh 2: Maker bấm [Tạo mới +]
        Maker->>UI: Bấm [Tạo mới +]
        UI->>UI: Validate bắt buộc các trường (*) và ràng buộc Min <= Max
        alt Có lỗi validate (E-CHP-001 đến E-CHP-004)
            UI-->>Maker: Highlight đỏ trường lỗi & hiển thị thông báo lỗi
        else Dữ liệu hợp lệ
            UI->>API: POST /api/v1/fee-configs
            API->>DB: INSERT INTO fee_configs (status='NEW', ycpd=NULL)
            DB-->>API: Lưu thành công
            API-->>UI: Response HTTP 201 Created
            UI-->>Maker: Toast thông báo: "Tạo mới cấu hình phí thành công ở trạng thái NEW"
        end
    end

    opt Maker gửi yêu cầu phê duyệt
        Maker->>UI: Chọn bản ghi NEW > Bấm [📤 Gửi yêu cầu phê duyệt]
        UI->>API: POST /api/v1/fee-configs/{id}/submit-approval
        API->>DB: UPDATE fee_configs SET ycpd='PENDING' WHERE id={id}
        DB-->>API: Cập nhật thành công
        API->>Noti: Gửi thông báo có YCPD mới đến nhóm Checker
        Noti-->>Checker: Email / Notification chuông trên Portal
        API-->>UI: Response HTTP 200 OK
        UI-->>Maker: Toast thông báo: "Đã gửi yêu cầu phê duyệt thành công"
    end
```

## Flow: Checker Thẩm định & Xử lý Yêu cầu Phê duyệt
**Trigger**: Checker mở tab "Chờ phê duyệt" hoặc bấm vào thông báo YCPD trên Portal.
**Related UC**: [[../usecases/uc-process-fee-profile.md]]
**Related FR**: FR-partner-fee-management-012
**Related E**: E-partner-fee-management-005, E-partner-fee-management-006

```mermaid
sequenceDiagram
    actor Checker as Cán bộ Phê duyệt (Checker)
    participant UI as EPAY Portal UI
    participant API as Fee Config Service
    participant DB as Database (fee_configs)
    participant Audit as Audit Trail Service
    participant Noti as Notification Service
    actor Maker as Chuyên viên Vận hành (Maker)

    Checker->>UI: Mở tab "Chờ phê duyệt" > Chọn mã cấu hình phí cần duyệt
    UI->>API: GET /api/v1/fee-configs/{id}/approval-detail
    API->>DB: Truy vấn thông tin cấu hình & lịch sử so sánh CŨ - MỚI
    DB-->>API: Trả về dataset chi tiết
    API-->>UI: Render màn hình Chi tiết Checker (Panel YCPD + Nút [✅ Phê duyệt] / [❌ Từ chối])

    Checker->>UI: Thẩm định đối tác, dịch vụ, MCC, mức phí và ngày áp dụng

    alt Nhánh 1: Checker chấp thuận [✅ Phê duyệt]
        Checker->>UI: Bấm [✅ Phê duyệt]
        UI->>UI: Hiển thị popup xác nhận phê duyệt
        Checker->>UI: Xác nhận Đồng ý
        UI->>API: POST /api/v1/fee-configs/{id}/approve
        API->>API: Kiểm tra Thời gian áp dụng phí so với thời điểm hiện tại (NOW)
        alt Ngày áp dụng phí > NOW (Áp dụng trong tương lai)
            API->>DB: UPDATE fee_configs SET status='READY', ycpd='APPROVAL' WHERE id={id}
            API->>Audit: Ghi log: "Checker duyệt cấu hình; chuyển trạng thái READY"
        else Ngày áp dụng phí <= NOW (Áp dụng ngay)
            API->>DB: UPDATE fee_configs SET status='ACTIVE', ycpd='APPROVAL' WHERE id={id}
            API->>Audit: Ghi log: "Checker duyệt cấu hình; chuyển trạng thái ACTIVE"
        end
        DB-->>API: Ghi nhận thành công
        API->>Noti: Bắn thông báo phê duyệt thành công tới Maker
        Noti-->>Maker: Nhận thông báo cấu hình đã được duyệt
        API-->>UI: Response HTTP 200 OK
        UI-->>Checker: Toast thông báo: "Phê duyệt cấu hình phí thành công"
    else Nhánh 2: Checker bác bỏ [❌ Từ chối]
        Checker->>UI: Bấm [❌ Từ chối]
        UI-->>Checker: Bật popup yêu cầu nhập Lý do từ chối (bắt buộc)
        Checker->>UI: Nhập lý do từ chối (vd: "Tỷ lệ phí sai lệch so với Hợp đồng đính kèm")
        UI->>API: POST /api/v1/fee-configs/{id}/reject (kèm reject_reason)
        API->>DB: UPDATE fee_configs SET status='NEW', ycpd='REJECTED', reject_reason={reason}
        API->>Audit: Ghi log: "Checker từ chối duyệt cấu hình; Lý do: {reason}"
        DB-->>API: Ghi nhận thành công
        API->>Noti: Gửi thông báo kèm lý do từ chối về hòm thư Maker
        Noti-->>Maker: Nhận thông báo bị từ chối kèm lý do để chỉnh sửa lại
        API-->>UI: Response HTTP 200 OK
        UI-->>Checker: Toast thông báo: "Đã từ chối yêu cầu phê duyệt cấu hình"
    end
```

## Flow: Scheduler Job Tự động Kích hoạt Cấu hình & Vận hành Core Billing
**Trigger**: Job lập lịch chạy định kỳ lúc 00:00:00 hằng ngày hoặc Maker gửi duyệt Tạm dừng/Kích hoạt lại.
**Related UC**: [[../usecases/uc-auto-golive.md]], [[../usecases/uc-process-fee-profile.md]]
**Related FR**: FR-partner-fee-management-013, FR-partner-fee-management-009, FR-partner-fee-management-010
**Related E**: E-partner-fee-management-007

```mermaid
sequenceDiagram
    participant Job as Scheduler Job (00:00:00)
    participant DB as Database (fee_configs)
    participant Core as Core Billing & Settlement Engine
    participant Audit as Audit Trail Service
    actor Maker as Chuyên viên Vận hành (Maker)
    participant UI as EPAY Portal UI
    actor Checker as Cán bộ Phê duyệt (Checker)

    Note over Job,DB: Giai đoạn 1: Auto-Golive tự động kích hoạt biểu phí đến hạn
    Job->>DB: SELECT * FROM fee_configs WHERE status='READY' AND apply_date <= NOW()
    DB-->>Job: Danh sách các bản ghi thỏa mãn điều kiện
    loop Từng bản ghi cấu hình
        Job->>DB: UPDATE fee_configs SET status='ACTIVE', ycpd=NULL WHERE id={id}
        Job->>Audit: Ghi nhận log: "Job Auto-golive tự động kích hoạt cấu hình {code}"
    end
    Job->>Core: Notify Event: FEE_CONFIG_UPDATED (Reload cache biểu phí)
    Core->>DB: SELECT * FROM fee_configs WHERE status='ACTIVE'
    DB-->>Core: Nạp toàn bộ biểu phí ACTIVE vào memory cache
    Note over Core: Các giao dịch phát sinh từ thời điểm này được tính phí theo cấu hình mới

    Note over Maker,Checker: Giai đoạn 2: Quản trị Tạm dừng / Kích hoạt lại cấu hình
    alt Maker gửi duyệt Tạm dừng cấu hình đang ACTIVE
        Maker->>UI: Bấm [🔒 Tạm dừng] > Nhập lý do tạm dừng > Bấm gửi duyệt
        UI->>DB: UPDATE fee_configs SET ycpd='PENDING' (Status vẫn giữ 'ACTIVE')
        Note over Core: Cấu hình cũ vẫn tính cước bình thường trong lúc chờ duyệt
        Checker->>UI: Xem xét YCPD tạm dừng > Bấm [✅ Duyệt tạm dừng]
        UI->>DB: UPDATE fee_configs SET status='INACTIVE', ycpd='APPROVAL'
        UI->>Core: Gửi tín hiệu loại bỏ biểu phí khỏi cache
        Note over Core: Hệ thống ngừng tính phí theo biểu phí này
    else Maker gửi duyệt Mở kích hoạt lại cấu hình INACTIVE
        Maker->>UI: Bấm [🔓 Kích hoạt lại] > Bấm gửi duyệt
        UI->>DB: UPDATE fee_configs SET ycpd='PENDING'
        Checker->>UI: Xem xét > Bấm [✅ Duyệt kích hoạt]
        UI->>DB: UPDATE fee_configs SET status='ACTIVE', ycpd='APPROVAL'
        UI->>Core: Gửi tín hiệu nạp lại biểu phí vào cache Core Engine
    end
```
