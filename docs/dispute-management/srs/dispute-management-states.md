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

---

## 4. MÔ TẢ CHI TIẾT MA TRẬN VÀ QUY TRÌNH CHUYỂN ĐỔI TRẠNG THÁI LUỒNG TLTS (TRA SOÁT ĐÃ NHẬN / TCTLTS)

### 4.1. Khái niệm và Nguyên tắc Cắt lớp Trạng thái Luồng TLTS

Luồng **TLTS (Trả lời Tra soát / TCTLTS)** áp dụng cho chiều tiếp nhận điện tra soát thụ động (Mã điện **TS-014**) từ phía Napas/Đối tác gửi đến Epay thông qua Cổng Service QR Gateway.

Nghiệp vụ vận hành trên cơ chế đồng bộ **3 Nhóm trường trạng thái độc lập**:
1. **Tiến trình Tra soát (PCTS - DB MM):** Quản lý vòng đời xử lý nội bộ tại Epay (`Chờ xử lý` ➔ `Chờ phê duyệt` ➔ `Đã phê duyệt` ➔ `Chờ phản hồi` ➔ `Đã phản hồi` ➔ `Hoàn tất`).
2. **Trạng thái Xử lý YCTS tại Epay (Processing Outcome - DB MM):** Kết quả trả lời nghiệp vụ (`—` ➔ `OPEN` ➔ `PRCD` - Đồng ý / `RJCD` - Từ chối).
3. **Trạng thái Tra soát Hết hạn (Expiration Status - DB MM):** Đánh dấu tình trạng quá hạn SLA xử lý (`Chưa hết hạn` ➔ `Đã hết hạn` khi Gateway nhận thông điệp IPN `EXPI`).

### 4.2. Bảng Mô tả Chi tiết các Trạng thái Tiến trình Tra soát (PCTS) Luồng TCTLTS

| Mã Trạng thái Tiến trình (PCTS) | Tên Trạng thái hiển thị | Diễn giải Chi tiết Nghiệp vụ tại Luồng TCTLTS | Trạng thái Xử lý YCTS tại Epay | Trạng thái Hết hạn | Nút bấm / Thao tác khả dụng |
|---|---|---|---|---|---|
| **`Chờ xử lý`** *(Pending)* | Chờ xử lý / Cần xử lý | Bản ghi YCTS điện TS-014 thụ động vừa được Napas truyền sang Service QR và tự động đồng bộ insert vào MM DB. | `—` *(Chưa lập câu trả lời)* | `Chưa hết hạn` | **[💬 Trả lời tra soát]** *(Maker chọn PRCD / RJCD & đính kèm file)* |
| **`Chờ phê duyệt`** *(ApprovePending)* | Chờ phê duyệt | Maker chọn câu trả lời (PRCD/RJCD) và bấm **[📤 Gửi yêu cầu phê duyệt]**, sinh bản ghi YCPD trình Lãnh đạo. | `PRCD` *(Đề xuất Đồng ý)* / `RJCD` *(Đề xuất Từ chối)* | `Chưa hết hạn` | **[✅ Đồng ý Phê duyệt]** / **[❌ Từ chối Phê duyệt]** *(Role Checker)* |
| **`Đã phê duyệt`** *(Approved)* | Đã phê duyệt | Checker bấm duyệt YCPD (`Approved`). Hệ thống chuẩn bị gọi Service QR API phát hành câu trả lời sang Napas. | `PRCD` / `RJCD` | `Chưa hết hạn` | Xem chi tiết *(Read-only)* |
| **`Xử lý thất bại`** *(Process Failure)* | Xử lý thất bại | Phát sinh lỗi validation định dạng dữ liệu hoặc lỗi kết nối API Service QR Gateway khi phát hành câu trả lời. | `—` / `OPEN` | `Chưa hết hạn` | Xem chi tiết / Ghi log Audit Trail |
| **`Chờ phản hồi`** *(Waiting Response)* | Chờ phản hồi | Cổng Service QR phát hành thông điệp câu trả lời sang Napas thành công (`OPEN`), chờ callback IPN từ Napas. | `OPEN` | `Chưa hết hạn` | Xem chi tiết *(Đếm ngược SLA 72h)* |
| **`Đã phản hồi`** *(Responded)* | Đã phản hồi | Napas gửi callback IPN xác nhận câu trả lời (`PRCD` / `RJCD`) hoặc thông báo quá hạn SLA. | `PRCD` *(Đồng ý)* / `RJCD` *(Từ chối)* | `Chưa hết hạn` hoặc 🟠 `Đã hết hạn` | **[Hoàn tất tra soát]** *(Kế toán đối soát hạch toán Báo nợ / Báo có)* |
| **`Hoàn tất`** *(Completed)* | Hoàn tất | Quy trình phản hồi tra soát và hạch toán Báo nợ / Báo có đối soát đã kết thúc thành công. | `PRCD` / `RJCD` | `Chưa hết hạn` hoặc `Đã hết hạn` | Xem chi tiết & In phiếu PDF *(Khóa Read-only 100%)* |
| **`Đã hủy`** *(Cancelled)* | Đã hủy | YCPD bị Checker từ chối hoặc Maker hủy câu trả lời đề xuất (bản ghi YCTS quay về *Chờ xử lý* để Maker lập lại). | `—` | `Chưa hết hạn` | Xem chi tiết |

### 4.3. Ma trận Chuyển đổi Trạng thái Chi tiết Luồng TLTS (State Transition Matrix)

| STT | Trạng thái Đầu vào | Hành động / Sự kiện Kích hoạt | Trạng thái Đầu ra (3 Nhóm) | Vai trò Thực hiện | Bản ghi YCPD Sinh ra |
|---|---|---|---|---|---|
| **1** | *(Không có)* | Napas phát hành điện TS-014 sang Service QR Gateway | **1. Tiến trình MM:** `Chờ xử lý`<br/>**2. TT Xử lý tại Epay:** `—`<br/>**3. TT Hết hạn:** `Chưa hết hạn` | Cổng Service QR & DB MM (Tự động API) | Chưa sinh YCPD |
| **2** | `Chờ xử lý` | Maker lập câu trả lời (Đồng ý `PRCD` / Từ chối `RJCD`) & nhấp **[📤 Gửi yêu cầu phê duyệt]** | **1. Tiến trình MM:** `Chờ phê duyệt`<br/>**2. TT Xử lý tại Epay:** `PRCD` / `RJCD`<br/>**3. TT Hết hạn:** `Chưa hết hạn` | Chuyên viên Đối soát (Maker) | **Sinh 01 bản ghi YCPD** (`ApprovePending`) |
| **3a** | `Chờ phê duyệt` | Checker kiểm tra & nhấp **[❌ Từ chối Phê duyệt]** | **1. Tiến trình MM:** `Chờ xử lý`<br/>**2. TT Xử lý tại Epay:** `—`<br/>**3. TT Hết hạn:** `Chưa hết hạn` | Lãnh đạo Phê duyệt (Checker) | **YCPD status = Cancel** (Cho phép Maker sửa/lập lại câu trả lời) |
| **3b** | `Chờ phê duyệt` | Checker kiểm tra & nhấp **[✅ Đồng ý Phê duyệt]** | **1. Tiến trình MM:** `Đã phê duyệt`<br/>**2. TT Xử lý tại Epay:** `PRCD` / `RJCD`<br/>**3. TT Hết hạn:** `Chưa hết hạn` | Lãnh đạo Phê duyệt (Checker) | **YCPD status = Approved** |
| **4a** | `Đã phê duyệt` | Service QR kiểm tra bị Lỗi Validation / Lỗi Mạng Gateway | **1. Tiến trình MM:** `Xử lý thất bại`<br/>**2. TT Xử lý tại Epay:** `—`<br/>**3. TT Hết hạn:** `Chưa hết hạn` | Service QR Gateway | Ghi log Audit Trail lỗi |
| **4b** | `Đã phê duyệt` | Service QR phát hành câu trả lời sang Napas thành công | **1. Tiến trình MM:** `Chờ phản hồi`<br/>**2. TT Xử lý tại Epay:** `OPEN`<br/>**3. TT Hết hạn:** `Chưa hết hạn` | Service QR Gateway | Chờ callback/IPN từ Napas |
| **5a** | `Chờ phản hồi` | Napas gửi callback IPN xác nhận câu trả lời Đồng ý (`PRCD` / `EXPR`) | **1. Tiến trình MM:** `Đã phản hồi`<br/>**2. TT Xử lý tại Epay:** `PRCD` (Đồng ý)<br/>**3. TT Hết hạn:** `Chưa hết hạn` | Cổng Napas / Partner | Cập nhật kết quả cuối |
| **5b** | `Chờ phản hồi` | Napas gửi callback IPN xác nhận câu trả lời Từ chối (`RJCD` / `EXRJ`) | **1. Tiến trình MM:** `Đã phản hồi`<br/>**2. TT Xử lý tại Epay:** `RJCD` (Từ chối)<br/>**3. TT Hết hạn:** `Chưa hết hạn` | Cổng Napas / Partner | Cập nhật kết quả cuối |
| **5c** | `Chờ phản hồi` / `Chờ xử lý` | Quá thời hạn SLA, Napas gửi IPN báo quá hạn (`EXPI`) | **1. Tiến trình MM:** Giữ nguyên<br/>**2. TT Xử lý tại Epay:** Giữ nguyên<br/>**3. TT Hết hạn:** 🟠 **Đã hết hạn** (`EXPI`) | Cổng Napas / Partner | Chuyển bản ghi sang Tab **Quá hạn** |
| **6** | `Đã phản hồi` | Kế toán / Đối soát hoàn tất hạch toán Báo nợ / Báo có thành công | **1. Tiến trình MM:** `Hoàn tất`<br/>**2. TT Xử lý tại Epay:** `PRCD` / `RJCD`<br/>**3. TT Hết hạn:** Theo mốc thực tế | Hệ thống MM & Kế toán | Khóa bản ghi read-only 100% |

### 4.3. Quy tắc Xử lý SLA Hết hạn (`EXPI`) và Trả lời Sau Hết hạn

1. **Khi chưa hết hạn (SLA < 72h):**
   - Maker trả lời Đồng ý ➔ Trạng thái xử lý = `PRCD` (Đồng ý).
   - Maker trả lời Từ chối ➔ Trạng thái xử lý = `RJCD` (Từ chối).
2. **Khi đã quá hạn SLA (Nhận IPN `EXPI`):**
   - Trạng thái hết hạn chuyển từ `Chưa hết hạn` sang 🟠 **`Đã hết hạn`**. Bản ghi tự động xuất hiện tại **Tab "Đã quá hạn"**.
   - Nếu Epay/Merchant vẫn thực hiện trả lời sau khi bị quá hạn:
     - Trả lời Đồng ý sau hết hạn ➔ Trạng thái xử lý = `PRCD`, Trạng thái hết hạn = `Đã hết hạn` (Napas mapping: `EXPR`).
     - Trả lời Từ chối sau hết hạn ➔ Trạng thái xử lý = `RJCD`, Trạng thái hết hạn = `Đã hết hạn` (Napas mapping: `EXRJ`).

### 4.4. Quy tắc Hạch toán Tài chính Chiều TLTS (Khối Báo nợ & Khối Báo có)

Theo **`BR-GENERAL-05`**, trên màn hình chi tiết bản ghi tra soát chiều đã nhận (TLTS / TCTLTS):
- **Khối Thông tin Báo nợ (Debit Block - 6 trường tiêu chuẩn):** Hiển thị khi Epay đồng ý thu hồi sai sót / báo nợ số dư Merchant (`Mã GD báo nợ`, `Mã GD báo nợ đối tác`, `Thời gian tiếp nhận`, `Số tiền báo nợ`, `Loại báo nợ`, `Trạng thái báo nợ`).
- **Khối Thông tin Báo có (Credit Block - 6 trường tiêu chuẩn):** Hiển thị khi hạch toán cộng tiền lại cho đối tác/khách hàng.
- **Loại tra soát `RQNF` (Tra soát thông tin):** Ẩn toàn bộ các khối hạch toán tài chính do không phát sinh dịch chuyển dòng tiền.

### 4.5. Bảng Ma trận Hiển thị Khối thông tin Màn hình Chi tiết YCTS Luồng Tra soát đã gửi (TCYCTS)

| STT | Khối thông tin trên Màn hình Chi tiết (Luồng TCYCTS) | 1. Chờ xử lý | 2. Chờ kiểm tra | 3. Chờ phê duyệt | 4. Đã phê duyệt / Chờ phản hồi | 5. Xử lý thất bại | 6. Đã phản hồi | 7. Hoàn tất | 8. Đã hủy |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | **Khối Tiến trình & SLA** | x | x | x | x | x | x | x | x |
| **2** | **Khối Thông tin Giao dịch Gốc** | x | x | x | x | x | x | x | x |
| **3** | **Khối Thông tin Tra soát (YCTS)** | x | x | x | x | x | x | x | x |
| **4** | **Khối Đề xuất Phản hồi / Kết quả xử lý** | x | x | x | x | x | x | x | x |
| **5** | **Khối Phê duyệt RBAC (Thông tin YCPD)** | | | x | x | x | x | x | x |
| **6** | **Khối Thông tin Giao dịch Hoàn tiền** | x | x | x | x | x | x | x | |
| **7** | **Khối Thông tin Giao dịch Báo có** | x | x | x | x | x | x | x | |
| **8** | **Khối Thông tin Giao dịch Báo nợ** | | | | | | | | |
| **9** | **Khối Nhật ký Audit Trail Timeline** | x | x | x | x | x | x | x | x |
| **10** | **Vùng Nút bấm Thao tác (Action Bar)** | x | x | x | | x | x | | |

### 4.6. Bảng Ma trận Hiển thị Khối thông tin Màn hình Chi tiết YCTS Luồng Tra soát đã nhận (TCTLTS / TLTS)

| STT | Khối thông tin trên Màn hình Chi tiết (Luồng TLTS) | 1. Chờ xử lý | 2. Chờ phê duyệt | 3. Đã phê duyệt / Chờ phản hồi | 4. Xử lý thất bại | 5. Đã phản hồi | 6. Hoàn tất | 7. Đã hủy |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | **Khối Tiến trình & SLA** | x | x | x | x | x | x | x |
| **2** | **Khối Thông tin Giao dịch Gốc** | x | x | x | x | x | x | x |
| **3** | **Khối Thông tin Tra soát đã nhận (YCTS)** | x | x | x | x | x | x | x |
| **4** | **Khối Đề xuất Phản hồi / Kết quả xử lý** | x | x | x | x | x | x | x |
| **5** | **Khối Phê duyệt RBAC (Thông tin YCPD)** | | x | x | x | x | x | x |
| **6** | **Khối Thông tin Giao dịch Hoàn tiền** | x | x | x | x | x | x | |
| **7** | **Khối Thông tin Giao dịch Báo có** | x | x | x | x | x | x | |
| **8** | **Khối Thông tin Giao dịch Báo nợ** | x | x | x | x | x | x | |
| **9** | **Khối Nhật ký Audit Trail Timeline** | x | x | x | x | x | x | x |
| **10** | **Vùng Nút bấm Thao tác (Action Bar)** | x | x | | x | x | | |



