# ĐẶC TẢ GIAO DIỆN & MA TRẬN PHÂN QUYỀN (RBAC)
## TÍNH NĂNG QUẢN LÝ TRA SOÁT (DISPUTE MANAGEMENT)

---

## 1. MA TRẬN PHÂN QUYỀN RBAC (ROLE-BASED ACCESS CONTROL)

| Chức năng / Màn hình | Maker (Chuyên viên Tra soát / Thu ngân) | Checker (Trưởng nhóm / Quản lý cửa hàng) | Operator / Viewer (Vận hành / Tra cứu) |
|---|:---:|:---:|:---:|
| **Tra cứu & Xem danh sách Tra soát (`BF29.1-UC01`)** | ✅ Xem tất cả YCTS thuộc đơn vị | ✅ Xem tất cả YCTS thuộc đơn vị | ✅ Xem danh sách/xuất Excel |
| **Lập Yêu cầu Tra soát mới (`BF29.1-UC02`)** | ✅ Khởi tạo & Gửi phê duyệt | ❌ (Không tự tạo & duyệt) | ❌ Chỉ xem |
| **Chỉnh sửa YCTS chủ động TCYCTS (`BF29.1-UC06`)** | ✅ Sửa khi `ApprovePending` | ❌ | ❌ Chỉ xem |
| **Phê duyệt Nội bộ TCYCTS (`BF29.1-UC03`)** | ❌ Kiểm soát 4 mắt | ✅ Duyệt / Từ chối phát hành | ❌ |
| **Trả lời Tra soát Thụ động TCTLTS (`BF29.1-UC04`)** | ✅ Tạo câu trả lời (Sinh YCPD) | ❌ | ❌ Chỉ xem |
| **Cập nhật lại Trả lời TCTLTS (`BF29.1-UC04 / UC06`)** | ✅ Sửa khi YCPD `ApprovePending` | ❌ | ❌ Chỉ xem |
| **Phê duyệt Phản hồi TCTLTS - YCPD (`BF29.1-UC03 / UC04`)** | ❌ | ✅ **[Đồng ý Phê duyệt]** / **[Từ chối Phê duyệt]** (Gọi Service QR sang Napas) | ❌ |
| **Xem chi tiết & Lịch sử xử lý (`BF29.1-UC05`)** | ✅ Xem chi tiết & Tải file | ✅ Xem chi tiết & Tải file | ✅ Xem chi tiết & Tải file |

---

## 2. QUY TẮC HIỂN THỊ NÚT THAO TÁC THEO VAI TRÒ VÀ TRẠNG THÁI

### 2.1. Đối với Màn hình Phản hồi Tra soát thụ động (TCTLTS)

#### A. Khi YCPD ở trạng thái `ApprovePending` (Đang chờ Quản lý duyệt):
- **Role Chuyên viên (Maker - Người tạo ban đầu):**
  - Hiển thị Nút **`[Cập nhật lại trả lời]`**: Cho phép chỉnh sửa lại thông tin Đồng ý/Từ chối, Lý do từ chối chuẩn Napas, Nội dung giải trình & Tệp đính kèm.
  - Ẩn nút Phê duyệt / Từ chối duyệt.
- **Role Quản lý / Checker (Người phê duyệt):**
  - Hiển thị Nút **`[Đồng ý Phê duyệt]`** *(Approved)*: Chấp thuận câu trả lời ➔ Hệ thống tự động kích hoạt **Service QR** gửi thông điệp tương ứng (Đồng ý Hoàn tiền / Từ chối) sang Napas.
  - Hiển thị Nút **`[Từ chối Phê duyệt]`** *(Cancel)*: Từ chối câu trả lời của Chuyên viên ➔ Đóng bản ghi và ghi nhận Từ chối tra soát.
  - Ẩn nút Cập nhật lại trả lời.

#### B. Khi YCPD ở trạng thái `Approved` hoặc `Cancel`:
- Tất cả các nút thao tác chuyển về trạng thái ẩn/vô hiệu hóa, chỉ cho phép xem chi tiết Lịch sử xử lý và Nhật ký truyền sang Napas (Service QR Log).
