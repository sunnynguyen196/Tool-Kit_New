# BỘ TRẠNG THÁI VÀ MA TRẬN CHUYỂN ĐỔI HỆ THỐNG QUẢN LÝ TRA SOÁT (LOGIC CẮT LỚP V2.1)

---

> **Mã tài liệu:** `EPAY-QT.CG.02_BM33_STATE_MACHINE`  
> **Dự án:** Hệ thống Quản lý Tra soát Epay - Petrolimex 2.0  
> **Phiên bản:** `v2.1` (Tổng hợp 3 Luồng Xử lý Tra soát: TCYCTS Có kiểm tra, TCYCTS Không kiểm tra & TCTLTS Trả lời YCTS Thụ động)  
> **Trạng thái:** APPROVED / READY FOR IMPLEMENTATION  

---

## 1. MÔ HÌNH PHÂN LỚP TRẠNG THÁI 3 NHÓM CHUẨN

Hệ thống Quản lý Tra soát chuẩn hóa toàn bộ vòng đời bản ghi tra soát trên cơ chế **3 Nhóm trường trạng thái độc lập**:

```
+-----------------------------------------------------------------------------------+
| 1. TRẠNG THÁI TIẾN TRÌNH TRA SOÁT (PCTS / DISPUTE PROCESS PROGRESS)               |
| (Quản lý tiến trình xử lý vòng đời bản ghi tại hệ thống MM)                       |
| [Chờ xử lý] -> [Đã hủy] -> ([Đã kiểm tra]) -> [Chờ phê duyệt] -> [Đã phê duyệt]   |
|            -> [Xử lý thất bại] -> [Chờ phản hồi] -> [Đã phản hồi] -> [Hoàn tất]   |
+-----------------------------------------------------------------------------------+
                                      |
               +----------------------+----------------------+
               |                                             |
               v (Khi GW/QR phản hồi)                        v (Khi quá SLA)
+------------------------------------+     +------------------------------------+
| 2. TRẠNG THÁI XỬ LÝ YCTS TẠI EPAY  |     | 3. TRẠNG THÁI TRA SOÁT HẾT HẠN     |
| (Mã trạng thái được lưu tại MM)    |     | (Trạng thái quá hạn SLA)           |
| - OPEN (Napas status: OPEN)        |     | - Chưa hết hạn (Mặc định)          |
| - PRCD (Napas status: EXPR/PRCD)   |     | - Đã hết hạn (QRGW báo IPN: EXPI)  |
| - RJCD (Napas status: RJCD/EXRJ)   |     |                                    |
+------------------------------------+     +------------------------------------+
```

---

## 2. BẢNG SO SÁNH 3 LUỒNG NGHIỆP VỤ XỬ LÝ TRA SOÁT (STATE FLOW COMPARISON)

| Tiêu chí | LUỒNG TCYCTS CÓ KIỂM TRA | LUỒNG TCYCTS KHÔNG KIỂM TRA | LUỒNG TCTLTS TRẢ LỜI TRA SOÁT |
|---|---|---|---|
| **Vai trò Giao dịch** | **TCYCTS** (Tra soát đã gửi - Chủ động) | **TCYCTS** (Tra soát đã gửi - Chủ động) | **TCTLTS** (Tra soát đã nhận - Thụ động / TS-014) |
| **Số Swimlanes** | **2 Swimlanes** | **2 Swimlanes** | **2 Swimlanes** |
| **Cấu trúc Swimlanes** | `Hệ thống QRGW (TT YCTS tại đối tác)`, `Hệ thống MM (TT YCTS tại Epay)` | `Hệ thống QRGW (TT YCTS tại đối tác)`, `Hệ thống MM (TT YCTS tại Epay)` | `Hệ thống QRGW (TT YCTS tại đối tác)`, `Hệ thống MM (TT YCTS tại Epay)` |
| **Khởi tạo Bản ghi MM** | Maker khởi tạo ➔ Tiến trình `Chờ xử lý` | Maker khởi tạo ➔ Tiến trình `Chờ xử lý` | **Cổng Service QR nhận YCTS Napas ➔ Đồng bộ API ➔ MM BẮT BUỘC insert YCTS ở `Chờ xử lý`** |
| **Vai trò Inspector** | **CÓ** bước Inspector `[Xác nhận Đã kiểm tra]` | **KHÔNG CÓ** bước Inspector | **KHÔNG CÓ** bước Inspector (Maker lập câu trả lời trình duyệt thẳng) |
| **Xử lý Trình duyệt nội bộ** | Maker gửi ➔ `Chờ phê duyệt` (Sinh YCPD) ➔ Checker duyệt ➔ `Đã phê duyệt` | Maker gửi ➔ `Chờ phê duyệt` (Sinh YCPD) ➔ Checker duyệt ➔ `Đã phê duyệt` | Maker lập câu trả lời (`PRCD`/`RJCD`) ➔ `Chờ phê duyệt` (Sinh YCPD) ➔ Checker duyệt ➔ `Đã phê duyệt` |
| **Phát hành sang Napas** | Service QR gửi YCTS sang Napas (Service QR `OPEN`) | Service QR gửi YCTS sang Napas (Service QR `OPEN`) | Service QR phát hành thông điệp trả lời (`PRCD`/`RJCD`) sang Napas |
| **Gán Trạng thái Phản hồi** | Napas trả lời ➔ `Đã phản hồi`. Gán **Trạng thái Xử lý YCTS** (*Đồng ý / Từ chối*) hoặc **Trạng thái Hết hạn** (*Hết hạn*) | Napas trả lời ➔ `Đã phản hồi`. Gán **Trạng thái Xử lý YCTS** (*Đồng ý / Từ chối*) hoặc **Trạng thái Hết hạn** (*Hết hạn*) | Napas xác nhận câu trả lời ➔ `Đã phản hồi`. Gán **Trạng thái Xử lý YCTS** (*Đồng ý / Từ chối*) hoặc **Trạng thái Hết hạn** (*Hết hạn*) |

### 3.2. Nhóm 2: Trạng thái Xử lý YCTS tại Epay / MM (Processing Outcome Status)
| Trạng thái Xử lý YCTS tại Epay | Tên Tiếng Anh | Mã QRGW/Gateway Map | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|---|
| **`—`** | None | `—` | Mặc định ban đầu khi chưa gửi hoặc chưa phát sinh kết quả từ đối tác. |
| **`OPEN`** | Open | `OPEN` | Khi QRGW tiếp nhận phản hồi từ đối tác thông báo trạng thái `OPEN` (đối tác đang xử lý). |
| **`PRCD`** | Processed | `EXPR` / `PRCD` / Hoàn trả TC / Báo có TC | **[TCYCTS]** Đối tác đồng ý/chấp nhận hoàn tiền/báo có.<br/>**[TCTLTS]** Khi QRGW thông báo: Hoàn trả thành công, Báo có thành công, hoặc nhận IPN thành công sau hết hạn. |
| **`RJCD`** | Rejected | `RJCD` / `EXRJ` / Hoàn trả TB / Báo có TB | **[TCYCTS]** Đối tác phản hồi từ chối yêu cầu tra soát.<br/>**[TCTLTS]** Khi QRGW thông báo: Hoàn trả thất bại, Báo có thất bại, hoặc nhận IPN thất bại sau hết hạn. |

### 3.3. Nhóm 3: Trạng thái Tra soát Hết hạn YCTS (Expiration Status)
| Trạng thái Tra soát Hết hạn | Tên Tiếng Anh | Mã Gateway Map | Diễn giải Chi tiết Nghiệp vụ |
|---|---|---|---|
| **`Chưa hết hạn`** | Unexpired | `—` | Mặc định ban đầu khi giao dịch trong thời hạn SLA xử lý. |
| **`Đã hết hạn`** | Expired | `EXPI` | Khi QRGW nhận thông báo IPN từ đối tác với trạng thái `EXPI` (quá hạn SLA), hệ thống MM cập nhật từ Chưa hết hạn sang Đã hết hạn. |

---

## 3. SƠ ĐỒ CHUYỂN ĐỔI TRẠNG THÁI PLANTUML CỦA 3 LUỒNG

1. **Sơ đồ Swimlane Luồng TCYCTS CÓ Kiểm tra (2 Swimlanes):**  
   👉 [dispute-management-tcycts-state-flow-swimlane.puml](file:///d:/BA%20Master%20Flow/docs/dispute-management/srs/dispute-management-tcycts-state-flow-swimlane.puml)

2. **Sơ đồ Swimlane Luồng TCYCTS KHÔNG CÓ Kiểm tra (2 Swimlanes):**  
   👉 [dispute-management-tcycts-state-flow-no-inspector-swimlane.puml](file:///d:/BA%20Master%20Flow/docs/dispute-management/srs/dispute-management-tcycts-state-flow-no-inspector-swimlane.puml)

3. **Sơ đồ Swimlane Luồng TCTLTS Trả lời YCTS Thụ động (2 Swimlanes):**  
   👉 [dispute-management-tctlts-state-flow-swimlane.puml](file:///d:/BA%20Master%20Flow/docs/dispute-management/srs/dispute-management-tctlts-state-flow-swimlane.puml)

```mermaid
stateDiagram-v2
    state "Chiều Tiếp nhận YCTS Thụ động (Napas TS-014)" as Incoming {
        [*] --> NapasSend: 1. Napas phát hành YCTS
        NapasSend --> QROpen: 2. Cổng Service QR tiếp nhận (Status OPEN)
        QROpen --> MMInsert: 3. Kích hoạt API đồng bộ sang MM
        note right of MMInsert: DB MM BẮT BUỘC insert 01 bản ghi YCTS mới với Tiến trình: Chờ xử lý
    }

    state "Chiều Lập & Phê duyệt Phản hồi (MM)" as ResponseFlow {
        MMInsert --> MakerResponse: 4. Maker lập câu trả lời (PRCD — Đồng ý / RJCD — Từ chối)
        MakerResponse --> ChoPheDuyet: 5. Maker nhấp [Gửi phê duyệt] (Sinh YCPD ApprovePending)
        
        ChoPheDuyet --> ChoXuLy: 6.1. Checker Từ chối duyệt (YCPD Cancel, YCTS về Chờ xử lý)
        ChoPheDuyet --> DaPheDuyet: 6.2. Checker Đồng ý duyệt (YCPD Approved)
    }

    state "Chiều Phát hành Câu trả lời sang Napas (Service QR)" as IssueResponse {
        DaPheDuyet --> QRCheckFailed: Lỗi Validation / Mạng tại QR (Tiến trình: Xử lý thất bại)
        DaPheDuyet --> NapasReceive: QR phát hành câu trả lời sang Napas thành công
        NapasReceive --> RespondedAccepted: Napas xác nhận Đồng ý (PRCD / EXPR)
        NapasReceive --> RespondedRejected: Napas xác nhận Từ chối (RJCD / EXRJ)
        
        note right of RespondedAccepted: Tiến trình: Đã phản hồi | TT Xử lý: Đồng ý
        note right of RespondedRejected: Tiến trình: Đã phản hồi | TT Xử lý: Từ chối
    }

    RespondedAccepted --> HoanTat: Đóng vòng đời bản ghi
    RespondedRejected --> HoanTat: Đóng vòng đời bản ghi
    HoanTat --> [*]
```
