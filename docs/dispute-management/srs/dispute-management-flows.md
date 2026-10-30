# SƠ ĐỒ LUỒNG THỜI GIAN VÀ TIẾN TRÌNH XỬ LÝ TRA SOÁT (DISPUTE WORKFLOWS V2.1)

---

> **Mã tài liệu:** `EPAY-QT.CG.02_BM33_FLOWS`  
> **Dự án:** Hệ thống Quản lý Tra soát Epay - Petrolimex 2.0  
> **Phiên bản:** `v2.1` (Sơ đồ Tiến trình & 3 Nhóm Trạng thái Tra soát - Luồng CÓ kỹ thuật kiểm tra)  

---

## 1. SƠ ĐỒ LUỒNG TIẾN TRÌNH CHIỀU KHỞI TẠO TRA SOÁT (TCYCTS — CÓ KỸ THUẬT KIỂM TRA)

```mermaid
sequenceDiagram
    autonumber
    actor Maker as Chuyên viên (Maker)
    actor Inspector as Người kiểm tra (Inspector)
    actor Checker as Quản lý (Checker)
    participant MM as DB Merchant Management (MM)
    participant QR as DB Service QR / Gateway
    participant Napas as Cổng Napas / Partner

    Note over Maker, MM: 1. Tiến trình Tra soát (PCTS): Chờ xử lý
    Maker->>MM: 1. Khởi tạo YCTS mới
    
    Inspector->>MM: 2. Inspector [Xác nhận Đã kiểm tra]
    Note over MM: 1. Tiến trình Tra soát (PCTS): Đã kiểm tra
    
    Maker->>MM: 3. Nhấp [📤 Gửi yêu cầu phê duyệt]
    Note over MM: 1. Tiến trình Tra soát (PCTS): Chờ phê duyệt (Sinh YCPD ApprovePending)

    alt Checker Từ chối
        Checker->>MM: 4a. Bấm [Từ chối Phê duyệt] (YCPD = Cancel)
        Note over MM: Tiến trình giữ Chờ phê duyệt (Maker sửa/hủy YCPD)
    else Checker Đồng ý Phê duyệt
        Checker->>MM: 4b. Bấm [✅ Đồng ý Phê duyệt] (YCPD = Approved)
        Note over MM: 1. Tiến trình Tra soát (PCTS): Đã phê duyệt
        MM->>QR: 5. Kích hoạt API phát hành thông điệp YCTS
        
        alt Lỗi Validation / Mạng Gateway
            QR-->>MM: 6a. Báo lỗi phát hành
            Note over MM: 1. Tiến trình Tra soát (PCTS): Xử lý thất bại
        else Phát hành Napas Thành công
            QR->>Napas: 6b. Truyền thông điệp Tra soát (QR status: OPEN)
            Note over MM: 1. Tiến trình Tra soát (PCTS): Chờ phản hồi
            
            Napas-->>QR: 7. Trả kết quả phản hồi (EXPR / PRCD / RJCD / EXPI)
            Note over MM: 1. Tiến trình Tra soát (PCTS): Đã phản hồi
            
            alt Kết quả: Napas Đồng ý (EXPR / PRCD)
                Note over MM: 2. Trạng thái Xử lý YCTS: Đồng ý
            else Kết quả: Napas Từ chối (RJCD / EXRJ)
                Note over MM: 2. Trạng thái Xử lý YCTS: Từ chối
            else Kết quả: Quá hạn SLA (EXPI)
                Note over MM: 3. Trạng thái Tra soát hết hạn: Hết hạn
            end

            MM->>MM: 8. ĐS xác nhận & Hạch toán xong
            Note over MM: 1. Tiến trình Tra soát (PCTS): Hoàn tất
        end
    end
```

---

## 2. SƠ ĐỒ LUỒNG TIẾN TRÌNH CHIỀU PHẢN HỒI TRA SOÁT (TCTLTS — TRA SOÁT ĐÃ NHẬN / MÃ TS-014)

```mermaid
sequenceDiagram
    autonumber
    actor Napas as Cổng Napas / Đối tác
    participant QR as DB Service QR / Gateway
    participant MM as DB Merchant Management (MM)
    actor Maker as Chuyên viên Phản hồi (Maker)
    actor Checker as Quản lý Duyệt Phản hồi (Checker)

    Napas->>QR: 1. Gửi thông điệp tra soát thụ động (TS-014)
    QR->>MM: 2. Gọi API đồng bộ YCTS sang MM
    Note over MM: MM BẮT BUỘC Insert 01 bản ghi YCTS với Tiến trình (PCTS): Chờ xử lý

    Maker->>MM: 3. Mở bản ghi TS-014, lập câu trả lời (PRCD / RJCD) & Nhấp [Gửi phê duyệt]
    Note over MM: Tiến trình Tra soát (PCTS): Chờ phê duyệt (Sinh YCPD ApprovePending)

    Checker->>MM: 4. Bấm [✅ Đồng ý Phê duyệt] (YCPD = Approved)
    Note over MM: Tiến trình Tra soát (PCTS): Đã phê duyệt
    MM->>QR: 5. Gọi Service QR API truyền thông điệp câu trả lời
    QR->>Napas: 6. Phát hành câu trả lời sang Napas (Pending partner -> PRCD/RJCD)
    
    Note over MM: Tiến trình Tra soát (PCTS): Đã phản hồi
    Note over MM: 2. Trạng thái Xử lý YCTS: Đồng ý / Từ chối
    
    MM->>MM: 7. Đóng vòng đời bản ghi
    Note over MM: Tiến trình Tra soát (PCTS): Hoàn tất
```

---

### 2.1. DIỄN GIẢI CHI TIẾT TỪNG BƯỚC TIẾN TRÌNH LUỒNG TLTS (TRA SOÁT ĐÃ NHẬN / TCTLTS)

1. **Bước 1: Tiếp nhận điện tra soát thụ động (TS-014)**
   - Cổng Napas / Đối tác phát hành thông điệp yêu cầu tra soát thụ động sang Cổng Service QR Gateway của Epay.
   - Cổng Service QR thực hiện kiểm tra định dạng API. Nếu hợp lệ, lưu bản ghi ở trạng thái Gateway `OPEN`.

2. **Bước 2: Kích hoạt API đồng bộ sang hệ thống MM**
   - Cổng Service QR gọi API nội bộ kích hoạt đồng bộ thông tin bản ghi sang DB Merchant Management (MM).
   - **Quy tắc bắt buộc (BR-GENERAL-03):** Hệ thống DB MM bắt buộc phải tự động khởi tạo 01 bản ghi YCTS mới với **Trạng thái Tiến trình = `Chờ xử lý`**, **Trạng thái Xử lý YCTS = `—`**, và **Trạng thái Hết hạn = `Chưa hết hạn`**.

3. **Bước 3: Lập câu trả lời & Trình phê duyệt YCPD**
   - Chuyên viên Đối soát (Maker) truy cập Màn hình Danh sách Tra soát đã nhận (Tab *Chờ xử lý*), mở bản ghi TS-014 để xem chi tiết thông tin và tệp đính kèm từ Napas.
   - Maker chọn phương án trả lời:
     - **`PRCD` (Đồng ý):** Chấp nhận hoàn tiền / báo có / báo nợ thu hồi sai sót.
     - **`RJCD` (Từ chối):** Từ chối yêu cầu tra soát kèm lý do chi tiết.
   - Maker đính kèm tệp minh chứng (nếu có) và nhấp **[📤 Gửi yêu cầu phê duyệt]**.
   - **Cập nhật DB:** Tiến trình YCTS chuyển sang **`Chờ phê duyệt`**, hệ thống tự động **sinh 01 bản ghi YCPD mới** ở trạng thái `ApprovePending` cho Lãnh đạo.

4. **Bước 4: Phê duyệt câu trả lời YCPD (Lãnh đạo / Checker)**
   - Lãnh đạo (Checker) vào xem bản ghi YCPD ở mốc *Chờ phê duyệt*.
   - **Kịch bản 4a (Checker Từ chối):** Bấm **[❌ Từ chối Phê duyệt]**. Bản ghi YCPD chuyển status `Cancel`. YCTS giữ nguyên hoặc chuyển về **`Chờ xử lý`** để Maker điều chỉnh câu trả lời.
   - **Kịch bản 4b (Checker Đồng ý):** Bấm **[✅ Đồng ý Phê duyệt]**. Bản ghi YCPD chuyển status `Approved`. Tiến trình YCTS chuyển sang **`Đã phê duyệt`**, đồng thời hệ thống tự động kích hoạt API phát hành câu trả lời sang Cổng Service QR.

5. **Bước 5 & 6: Phát hành câu trả lời sang Napas**
   - Service QR Gateway tiếp nhận lệnh phát hành câu trả lời từ MM:
     - **Lỗi Validation / Lỗi Mạng:** Chuyển Tiến trình YCTS sang **`Xử lý thất bại`**.
     - **Phát hành Thành công:** Service QR truyền thông điệp câu trả lời (`PRCD` / `RJCD`) sang Napas. Tiến trình YCTS chuyển sang **`Chờ phản hồi`**.

6. **Bước 7: Nhận phản hồi IPN & Hoàn tất hạch toán đối soát**
   - Cổng Napas gửi thông điệp callback / IPN xác nhận kết quả:
     - Napas xác nhận Đồng ý ➔ Tiến trình YCTS = **`Đã phản hồi`**, Trạng thái Xử lý YCTS tại Epay = **`PRCD`**.
     - Napas xác nhận Từ chối ➔ Tiến trình YCTS = **`Đã phản hồi`**, Trạng thái Xử lý YCTS tại Epay = **`RJCD`**.
     - Quá SLA Napas (72h) ➔ Trạng thái Hết hạn = 🟠 **`Đã hết hạn`** (`EXPI`).
   - Kế toán / Đối soát kiểm tra hạch toán tài chính (**Khối Báo nợ 6 trường** khi thu hồi sai sót hoặc **Khối Báo có 6 trường**) và nhấp **[Hoàn tất tra soát]**.
   - Tiến trình YCTS chuyển sang **`Hoàn tất`** (Completed) - Hồ sơ bị khóa read-only 100%.

