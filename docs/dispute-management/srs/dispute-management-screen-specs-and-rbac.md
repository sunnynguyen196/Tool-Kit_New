# ĐẶC TẢ GIAO DIỆN & MA TRẬN PHÂN QUYỀN (RBAC)
## TÍNH NĂNG QUẢN LÝ TRA SOÁT (DISPUTE MANAGEMENT V2.1)

---

## 1. MA TRẬN PHÂN QUYỀN THEO VAI TRÒ CHUẨN EPAY (RBAC MATRIX)

| Vai trò / Thao tác | Tạo yêu cầu | Hủy yêu cầu | Xác nhận (Kỹ thuật / Kế toán) | Gửi phê duyệt | Phê duyệt (Lãnh đạo) | Từ chối (Lãnh đạo) | Hoàn tất | Xem chi tiết |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Đối soát** (Maker) | **X** | **x** | | **x** | | | **x** | **x** |
| **Kỹ thuật** (IT Inspector) | | | **x** | | | | | **x** |
| **Kế toán** (Accounting) | | | **x** | | | | | **x** |
| **Lãnh đạo** (Checker / Manager) | | | | | **x** | **x** | | **x** |

---

## 2. MA TRẬN CÁC USE CASE TRA SOÁT HỆ THỐNG

### 2.1. Ma trận các Use Case Tra soát đã gửi (TCYCTS — Chiều đi / Chủ động)
- **`BF29.1-UC-SENT-01`**: Tra cứu và xem danh sách YCTS đã gửi
- **`BF29.1-UC-SENT-02`**: Tạo mới yêu cầu tra soát chủ động (TCYCTS)
- **`BF29.1-UC-SENT-03`**: Xem chi tiết YCTS đã gửi (Khối 1 Tiến trình, Khối 2 GD gốc, Khối 3 Thông tin tra soát 11 trường, Khối 4 RBAC, Khối 5A Hoàn trả khi RQRN, Khối 5B Báo có khi RQSP/Báo có theo BR-GENERAL-05, Khối 6 Audit Trail Timeline)
- **`BF29.1-UC-SENT-04`**: Xác nhận kiểm tra YCTS (Chức năng chỉ dành cho yêu cầu có trạng thái = *"Chờ xử lý"* và trong luồng tiến trình CÓ kiểm tra, vai trò Kỹ thuật / Kế toán nhấp `[🔍 Xác nhận Đã kiểm tra]`)
- **`BF29.1-UC-SENT-05`**: Gửi phê duyệt YCTS (Dành cho Chuyên viên Đối soát trình Lãnh đạo duyệt)
- **`BF29.1-UC-SENT-06`**: Phê duyệt / Từ chối YCTS (Role Lãnh đạo / Checker duyệt & Kích hoạt Service QR phát hành sang Napas)
- **`BF29.1-UC-SENT-07`**: Chờ xử lý đối tác (Theo dõi bản ghi ở mốc *Chờ phản hồi* khi Service QR Gateway status `OPEN`)
- **`BF29.1-UC-SENT-08`**: Hoàn tất YCTS đã gửi (Đóng quy trình & hạch toán đối soát số liệu hoàn tiền)

### 2.2. Ma trận các Use Case Tra soát đã nhận (TCTLTS / TLTS — Chiều đến / Thụ động)
- **`BF29.1-UC-RECV-01`**: Tra cứu và xem danh sách YCTS đã nhận (TCTLTS)
- **`BF29.1-UC-RECV-02`**: Tiếp nhận điện tra soát thụ động TS-014 từ Napas (Tự động đồng bộ API sang MM ở *Chờ xử lý*)
- **`BF29.1-UC-RECV-03`**: Xem chi tiết YCTS đã nhận (Bao gồm Khối Thông tin Báo nợ 6 trường & Khối Thông tin Báo có 6 trường theo BR-GENERAL-05)
- **`BF29.1-UC-RECV-04`**: Lập câu trả lời tra soát TLTS (Maker chọn `PRCD` — Đồng ý / `RJCD` — Từ chối)
- **`BF29.1-UC-RECV-05`**: Gửi phê duyệt câu trả lời TLTS (Chuyển YCTS *Chờ phê duyệt*, sinh YCPD `ApprovePending`)
- **`BF29.1-UC-RECV-06`**: Phê duyệt / Từ chối câu trả lời TLTS (Role Lãnh đạo / Checker duyệt & Kích hoạt Service QR)
- **`BF29.1-UC-RECV-07`**: Chờ Napas xác nhận kết quả TLTS & Quản lý SLA Hết hạn (`EXPI` / Trả lời sau hết hạn)
- **`BF29.1-UC-RECV-08`**: Hoàn tất YCTS đã nhận (Hạch toán Báo nợ/Báo có & Đóng hồ sơ read-only)

---

## 3. CẤU TRÚC MÀN HÌNH CHI TIẾT & KHỐI THÔNG TIN BÁO NỢ (DETAIL SCREEN & DEBIT BLOCK SPECIFICATION)

### 3.1. Khối 3: Thông tin tra soát tiêu chuẩn (11 Trường dữ liệu)
1. **Mã tra soát** (VD: `TS-003`, `TS-016`)
2. **Trạng thái YCTS** (Badge Tiến trình, VD: `● Chờ phê duyệt`, `● Đã phản hồi`)
3. **Mã loại tra soát** (`RQRN` / `RQNF` / `RQSP`)
4. **Số tiền tra soát** (VD: `1,500,000 VND`)
5. **Chiều tra soát** (`TCYCTS` / `TCTLTS`)
6. **Trạng thái hết hạn** (Badge `Chưa hết hạn` / `Đã hết hạn`)
7. **Thời gian tạo YCTS** (`DD/MM/YYYY HH:mm:ss`)
8. **Thời gian xử lý YCTS** (`DD/MM/YYYY HH:mm:ss` hoặc `—`)
9. **Trạng thái xử lý tại Epay** (`PRCD` / `RJCD` / `—`)
10. **Trạng thái xử lý tại đối tác** (`PRCD` / `RJCD` / `—`)
11. **Tệp minh chứng đính kèm & Ghi chú tra soát**

### 3.2. Khối 5/6: Khối Thông tin Báo nợ (Debit Information Block - 6 Trường tiêu chuẩn)
Hiển thị trên màn hình chi tiết đối với các giao dịch có phát sinh hạch toán báo nợ hoặc báo nợ thu hồi sai sót (như `TS-019`, `TS-027`):
- **Tên khối Header:** `💳 KHỐI THÔNG TIN BÁO NỢ (DEBIT TRANSACTION DETAILS)`
- **6 Trường dữ liệu:**
  1. **`Mã GD báo nợ`**: Mã hạch toán báo nợ nội bộ (VD: `DR-10019`)
  2. **`Mã GD báo nợ đối tác`**: Mã tham chiếu báo nợ từ phía Napas/Đối tác (VD: `NPS-DR-019`)
  3. **`Thời gian tiếp nhận`**: Thời điểm hệ thống tiếp nhận điện báo nợ (`DD/MM/YYYY HH:mm:ss`)
  4. **`Số tiền báo nợ`**: Số tiền hạch toán báo nợ (`#,##0 VND`)
  5. **`Loại báo nợ`**: Phân loại hạch toán (VD: `Báo nợ thu hồi sai sót`)
  6. **`Trạng thái báo nợ`**: Trạng thái hạch toán (Badge 🟢 **`● Thành công`** hoặc Badge 🔴 **`❌ Thất bại`**)
