---
id: QR-UC07
type: use_case
feature: partner-fee-management
module: QRGW
status: draft
updated: 2026-11-11
---

## 2.8 QR-UC07 Tự động từ chối yêu cầu phê duyệt quá ngày hiệu lực

### 2.8.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| Use Case | Job tự động từ chối YCPD quá ngày hiệu lực thuộc QRGW |
| ID | QR-UC07 |
| Description | Job độc lập với Auto-golive, quét các yêu cầu còn chờ phê duyệt khi đã quá ngày hiệu lực của cấu hình hoặc thay đổi được đề nghị. |
| Actor | Hệ thống |
| Trigger | Đến chu kỳ quét của job; tần suất và giờ chạy chưa được chốt. |
| Pre-Condition | YCPD thuộc QRGW, vẫn ở trạng thái Pending và đã quá ngày hiệu lực. |
| Post-Condition | YCPD = Rejected; Người từ chối = Hệ thống; Thời gian từ chối = thời điểm xử lý; Lý do từ chối = “Tự động từ chối bởi hệ thống”. Hồ sơ tạo mới quay về NEW; bản ghi gốc ACTIVE/INACTIVE của yêu cầu thay đổi giữ nguyên trạng thái và thông tin đang áp dụng. |
| Basic flow | 1. Job quét YCPD Pending thuộc QRGW.<br>2. Đối chiếu ngày hiệu lực.<br>3. Kiểm tra lại YCPD vẫn Pending trước khi cập nhật.<br>4. Chuyển YCPD sang Rejected và lưu người, thời gian, lý do từ chối bởi hệ thống.<br>5. Áp dụng kết quả từ chối tương ứng loại YCPD; không kích hoạt biểu phí.<br>6. Ghi lịch sử xử lý tự động. |
| Alternative flow | Không có hồ sơ đủ điều kiện: kết thúc lượt quét, không thay đổi dữ liệu. |
| Exception flow | YCPD đã được duyệt, từ chối hoặc rút trước khi job cập nhật: bỏ qua, không ghi đè kết quả. Lỗi xử lý: không để YCPD và trạng thái hồ sơ cập nhật dở dang; ghi nhận lỗi để xử lý lại. |
| Business Rules | FR-partner-fee-management-014; BR-partner-fee-management-008; dòng 11 của ma trận vòng đời. |
| Non-functional requirement | Quét lại cùng YCPD không tạo thêm lần từ chối hoặc lịch sử từ chối trùng. |

### 2.8.2 Giao diện

Job chạy nền. Trên chi tiết và lịch sử YCPD hiển thị các trường sau:

| Component Name | Data Type | M O C | Editable | Other Validation | Action rules |
|---|---|---|---|---|---|
| Trạng thái YCPD | Badge | M | N | Rejected | Hiển thị Từ chối |
| Người từ chối | Text | M | N | Hệ thống | Không hiển thị tên Checker thay cho hệ thống |
| Thời gian từ chối | Date time | M | N | Thời điểm xử lý | Lưu và hiển thị lịch sử |
| Lý do từ chối | Text | M | N | Tự động từ chối bởi hệ thống | Hiển thị đúng nội dung đã chốt |

### 2.8.3 Yêu cầu nghiệp vụ chung

- Chỉ xử lý YCPD vẫn Pending và đã quá ngày hiệu lực; không tác động YCPD đã có kết quả.
- Trạng thái Rejected thuộc YCPD; không bổ sung REJECTED vào danh sách trạng thái CHP.
- Luồng tạo mới: CHP PENDING về NEW. Từ chối yêu cầu sửa/tạm dừng/mở kích hoạt phải bảo toàn bản ghi gốc ACTIVE/INACTIVE theo ma trận từ chối hiện hành.
- Cả người từ chối và tác nhân ghi log đều là Hệ thống; lý do cố định “Tự động từ chối bởi hệ thống”.
- Tần suất job và cách xác định hết hạn ở ranh giới ngày/giờ cần được chốt trước khi triển khai; không tự dùng lịch của job Auto-golive.

### 2.8.4 Bảng mã lỗi

| Trường hợp | Mã lỗi | Xử lý và hiển thị |
|---|---|---|
| Hồ sơ đã được xử lý trong lúc job chạy | Chưa chốt mã riêng | Bỏ qua; giữ kết quả đã có |
| Không thể hoàn tất cập nhật | Chưa chốt mã riêng | Ghi lỗi; giữ dữ liệu nhất quán để có thể xử lý lại |

### 2.8.5 Tiêu chí chấp nhận

| Tình huống | Kết quả mong đợi |
|---|---|
| YCPD Pending đã quá ngày hiệu lực | Rejected; người từ chối Hệ thống; lý do Tự động từ chối bởi hệ thống |
| YCPD Pending chưa quá ngày hiệu lực | Không bị job từ chối |
| YCPD đã được duyệt, từ chối hoặc rút | Không bị ghi đè |
| Hồ sơ tạo mới bị job từ chối | CHP về NEW để Maker xử lý lại |
| Job chạy lại với cùng YCPD | Không sinh từ chối hoặc log trùng |
