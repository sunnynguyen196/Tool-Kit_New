---
type: srs-erd
feature: partner-fee-management
updated: 2026-10-31
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - flows: docs/partner-fee-management/srs/partner-fee-management-flows.md
  - states: docs/partner-fee-management/srs/partner-fee-management-states.md
---

# Quản lý Cấu hình Phí Trả Đối tác — Entity Relationship Diagram (ERD)

> Scope: Phân hệ Quản lý Cấu hình Phí Trả Đối tác (partner-fee-management) trên EPAY Portal 2.0.

## 1. Diagram (Mermaid ERD)

```mermaid
erDiagram
    PARTNER ||--o{ PARTNER_FEE_CONFIG : "has configs"
    PARTNER_FEE_CONFIG ||--o{ FEE_TIER_DETAIL : "has tiers"
    PARTNER_FEE_CONFIG ||--o{ FEE_SERVICE_DETAIL : "has service items"
    PARTNER_FEE_CONFIG ||--o{ FEE_AUDIT_LOG : "tracks history"
    PARTNER_FEE_CONFIG }o--o{ MCC_CATEGORY : "applies to"

    PARTNER {
        string partner_id PK "Mã đối tác (VCB, MB, KBANK, CYBERSOURCE...)"
        string partner_name "Tên đối tác / Ngân hàng"
        string partner_type "Loại đối tác (BANK, GATEWAY, AGGREGATOR)"
        string status "Trạng thái hợp tác (ACTIVE, INACTIVE)"
    }

    PARTNER_FEE_CONFIG {
        uuid id PK "Khóa chính bản ghi"
        string fee_code UK "Mã cấu hình phí (vd: SM_PN_DC_001)"
        string fee_name "Tên cấu hình phí"
        string fee_type "Loại phí: MAINTENANCE, TRANSACTION, PAYMENT, ADDED_SERVICE"
        string data_source "Nguồn dữ liệu cấu hình (CTT, QRGW)"
        string partner_id FK "Mã đối tác thụ hưởng"
        string cycle_type "Kỳ trả phí (MONTHLY, QUARTERLY, YEARLY)"
        string payment_method "Phương thức thanh toán (INTERNATIONAL_CARD, DOMESTIC_CARD...)"
        string payment_gateway "Cổng trung gian thanh toán (NAPAS, CYBS, MB, BIDV...)"
        string issuing_bank_type "Loại ngân hàng phát hành (DOMESTIC, INTERNATIONAL)"
        timestamp apply_from "Thời gian bắt đầu áp dụng phí"
        timestamp apply_to "Thời gian kết thúc áp dụng phí (nullable)"
        boolean is_general_apply "Cờ áp dụng chung (TRUE = Áp dụng chung, FALSE = Tách riêng)"
        string currency "Đơn vị tiền tệ (VND)"
        decimal vat_rate "Thuế VAT (8.00%, 10.00%)"
        string description "Mô tả cấu hình"
        string status "Trạng thái CHP (DRAFT, NEW, PENDING, READY, ACTIVE, INACTIVE, DELETED)"
        string ycpd_status "Trạng thái YCPD (PENDING, APPROVED, REJECTED, NULL)"
        string reject_reason "Lý do từ chối phê duyệt (nếu có)"
        string created_by "Tài khoản Maker tạo"
        timestamp created_at "Thời điểm tạo"
        string updated_by "Tài khoản Maker/Checker cập nhật"
        timestamp updated_at "Thời điểm cập nhật"
        string approved_by "Tài khoản Checker phê duyệt"
        timestamp approved_at "Thời điểm phê duyệt"
    }

    FEE_TIER_DETAIL {
        uuid id PK "Khóa chính bậc phí"
        uuid fee_config_id FK "Mã cấu hình phí liên kết"
        string tier_type "Loại bậc: SINGLE_TIER, VOLUME_TIER, AMOUNT_TIER, TOKEN_TIER"
        int tier_order "Thứ tự bậc (1, 2, 3...)"
        decimal from_val "Giá trị bắt đầu của bậc (SLGD, GTGD, SL Token)"
        decimal to_val "Giá trị kết thúc của bậc (null nếu không giới hạn trên)"
        decimal fee_rate "Mức phí tỷ lệ % (vd: 0.7500%)"
        decimal min_fee "Mức phí tối thiểu chặn sàn (VND)"
        decimal max_fee "Mức phí tối đa chặn trần (VND)"
        decimal fixed_fee "Mức phí cố định trên mỗi GD hoặc mỗi kỳ (VND)"
    }

    FEE_SERVICE_DETAIL {
        uuid id PK "Khóa chính chi tiết dịch vụ/đối tượng"
        uuid fee_config_id FK "Mã cấu hình phí liên kết"
        string item_type "Loại đối tượng: MID, TRANSACTION_TYPE, CARD_BRAND, ADDED_SERVICE"
        string item_code "Mã đối tượng (MID_01, PAYMENT, REFUND, VISA, MASTER, TOKEN, RISK, FASTPAY)"
        string item_name "Tên đối tượng hiển thị"
        string fee_mode "Hình thức thu phí (1 bậc phí, Bậc thang...)"
        decimal specific_fee "Mức phí riêng áp dụng cho đối tượng (VND hoặc %)"
        decimal min_fee "Mức phí tối thiểu riêng (VND)"
        decimal max_fee "Mức phí tối đa riêng (VND)"
    }

    FEE_AUDIT_LOG {
        uuid id PK "Khóa chính dòng log"
        uuid fee_config_id FK "Mã cấu hình phí"
        string action_type "Loại hành động (CREATE, UPDATE, SUBMIT_APPROVAL, APPROVE, REJECT, PAUSE, REACTIVATE)"
        string old_status "Trạng thái trước thay đổi"
        string new_status "Trạng thái sau thay đổi"
        string changed_field "Tên trường dữ liệu thay đổi"
        text old_value "Giá trị cũ"
        text new_value "Giá trị mới"
        string user_id "Tài khoản người thực hiện"
        string user_role "Vai trò (MAKER, CHECKER, SYSTEM_JOB)"
        string ip_address "Địa chỉ IP người thao tác"
        timestamp created_at "Thời điểm ghi log kiểm toán"
    }

    MCC_CATEGORY {
        string mcc_code PK "Mã ngành (vd: 4784, 5411, 4900, 5732, 5814, 6300)"
        string mcc_name "Tên ngành kinh doanh (vd: Siêu thị, Cửa hàng điện máy, Bảo hiểm...)"
        string group_name "Nhóm ngành (Dịch vụ thiết yếu, Tiêu dùng, Bán lẻ...)"
    }
```

---

## 2. Entity Reference (Từ điển dữ liệu chi tiết)

| Thực thể (Entity) | Mục đích nghiệp vụ | Khóa chính / Khóa ngoại | Các thuộc tính cốt lõi |
|---|---|---|---|
| **`PARTNER_FEE_CONFIG`** | Lưu trữ thông tin tổng thể của một cấu hình biểu phí trả cho đối tác; quản trị vòng đời qua 7 trạng thái bản ghi và trạng thái YCPD. | PK: `id`<br>FK: `partner_id` | `fee_code`, `fee_name`, `fee_type`, `partner_id`, `status`, `ycpd_status`, `apply_from`, `apply_to`, `is_general_apply`, `vat_rate`. |
| **`FEE_TIER_DETAIL`** | Lưu trữ các mức phí chi tiết theo mô hình 1 bậc phí hoặc nhiều bậc phí bậc thang (theo Tổng SLGD, Tổng GTGD hoặc Tổng số lượng Token). | PK: `id`<br>FK: `fee_config_id` | `tier_order`, `from_val`, `to_val`, `fee_rate`, `min_fee`, `max_fee`, `fixed_fee`. |
| **`FEE_SERVICE_DETAIL`** | Lưu trữ thông số phân rã khi chọn chế độ "Không áp dụng" (tách riêng từng MID, từng loại giao dịch Thanh toán/Hoàn trả, từng thương hiệu thẻ Visa/Master/JCB, hoặc từng dịch vụ gia tăng). | PK: `id`<br>FK: `fee_config_id` | `item_type`, `item_code`, `item_name`, `fee_mode`, `specific_fee`, `min_fee`, `max_fee`. |
| **`FEE_AUDIT_LOG`** | Lưu vết toàn bộ lịch sử biến động dữ liệu và trạng thái cấu hình (bất biến - Immutable), phục vụ kiểm toán nội bộ, đối soát và giải trình thanh tra. | PK: `id`<br>FK: `fee_config_id` | `action_type`, `old_status`, `new_status`, `changed_field`, `old_value`, `new_value`, `user_id`, `created_at`. |
| **`PARTNER`** | Quản lý danh mục các đối tác thụ hưởng, ngân hàng kết nối cổng thanh toán. | PK: `partner_id` | `partner_name`, `partner_type`, `status`. |
| **`MCC_CATEGORY`** | Danh mục mã ngành kinh doanh chuẩn quốc tế phục vụ phân loại đơn vị chấp nhận thanh toán khi cấu hình phí xử lý giao dịch. | PK: `mcc_code` | `mcc_name`, `group_name`. |

---

## 3. Notes & Assumptions

1. **Tính bất biến của Audit Log**: Bảng `FEE_AUDIT_LOG` chỉ cho phép thao tác `INSERT`, tuyệt đối cấm mọi thao tác `UPDATE` và `DELETE` ở tầng CSDL để đảm bảo tính pháp lý kiểm toán.
2. **Khóa logic chống xung đột**: CSDL áp dụng Unique Index có điều kiện trên bộ trường `(partner_id, payment_method, payment_gateway, fee_type)` đối với các bản ghi có trạng thái `ACTIVE` hoặc `READY` trong cùng khoảng thời gian chồng lấn `[apply_from, apply_to]`.
3. **Lưu trữ số tiền và tỷ lệ**: Mọi trường tiền tệ lưu dưới dạng `DECIMAL(15, 2)` (VND); mọi tỷ lệ phần trăm lưu dưới dạng `DECIMAL(7, 4)` (hỗ trợ độ chính xác đến 4 chữ số sau dấu phẩy).
