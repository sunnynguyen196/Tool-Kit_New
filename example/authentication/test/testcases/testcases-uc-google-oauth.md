**STT:** 21
**Category:** Truy cập Google OAuth
**Sub-Category:** Truy cập
**Checklist:** CHK-authentication-057 — Kiểm tra nút đăng nhập bằng Google hiển thị trên màn hình đăng nhập.
**Ref:** FR-authentication-012
**Priority:** 2
**Title:** Kiểm tra nút đăng nhập bằng Google hiển thị trên màn hình đăng nhập
**Description:** Kiểm chứng: Kiểm tra nút đăng nhập bằng Google hiển thị trên màn hình đăng nhập.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở màn hình đăng nhập.
**Expected:** Màn đăng nhập hiển thị nút đăng nhập bằng Google để người dùng chọn luồng đăng nhập/đăng ký Google (FR-authentication-012).
**Test Data:** —

---

**STT:** 22
**Category:** Truy cập Google OAuth
**Sub-Category:** Truy cập
**Checklist:** CHK-authentication-058 — Chọn đăng nhập bằng Google; kiểm tra điều hướng đến màn hình chấp thuận của Google.
**Ref:** FR-authentication-012
**Priority:** 2
**Title:** Chọn đăng nhập bằng Google; kiểm tra điều hướng đến màn hình chấp thuận của Google
**Description:** Kiểm chứng: Chọn đăng nhập bằng Google; kiểm tra điều hướng đến màn hình chấp thuận của Google.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Tại màn hình đăng nhập, chọn nút đăng nhập bằng Google.
**Expected:** Hệ thống bắt đầu luồng đăng nhập/đăng ký Google để nhận email đã xác thực từ Google (FR-authentication-012). [TBD: cần BA cấp wording cho việc điều hướng tới màn hình chấp thuận của Google]
**Test Data:** Tài khoản Google đã xác minh: learner@email.com

---

**STT:** 23
**Category:** Hoàn tất OAuth
**Sub-Category:** Tài khoản mới
**Checklist:** CHK-authentication-059 — Hoàn tất chấp thuận của Google bằng email Google đã xác minh; kiểm tra không yêu cầu trường hồ sơ bổ sung.
**Ref:** FR-authentication-012
**Priority:** 2
**Title:** Hoàn tất chấp thuận của Google bằng email Google đã xác minh; kiểm tra không yêu cầu trường hồ sơ bổ sung
**Description:** Kiểm chứng: Hoàn tất chấp thuận của Google bằng email Google đã xác minh; kiểm tra không yêu cầu trường hồ sơ bổ sung.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Chọn đăng nhập bằng Google và hoàn tất chấp thuận bằng một tài khoản Google có email đã xác minh.
**Expected:** Khi Google trả về email đã xác thực, hệ thống xác định người dùng qua email đó theo một luồng chung cho đăng ký và đăng nhập, không yêu cầu thêm trường nào ngoài dữ liệu Google trả về (FR-authentication-012).
**Test Data:** Tài khoản Google đã xác minh, chưa tồn tại trong hệ thống: new.google@example.com

---

**STT:** 24
**Category:** Hoàn tất OAuth
**Sub-Category:** Tài khoản mới
**Checklist:** CHK-authentication-060 — Hoàn tất chấp thuận của Google bằng email mới; kiểm tra trạng thái tài khoản được tạo là đã xác minh.
**Ref:** FR-authentication-013, BR-authentication-009
**Priority:** 1
**Title:** Hoàn tất chấp thuận của Google bằng email mới; kiểm tra trạng thái tài khoản được tạo là đã xác minh
**Description:** Kiểm chứng: Hoàn tất chấp thuận của Google bằng email mới; kiểm tra trạng thái tài khoản được tạo là đã xác minh.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Chọn đăng nhập bằng Google và hoàn tất chấp thuận bằng một email Google đã xác minh chưa tồn tại trong hệ thống.
**Expected:** Hệ thống tạo tài khoản mới với trạng thái `verified`; tài khoản tạo qua Google được coi là `verified` ngay vì Google đã xác thực email (FR-authentication-013, BR-authentication-009).
**Test Data:** Tài khoản Google đã xác minh, chưa tồn tại trong hệ thống: new.google@example.com

---

**STT:** 25
**Category:** Hoàn tất OAuth
**Sub-Category:** Tài khoản mới
**Checklist:** CHK-authentication-061 — Hoàn tất chấp thuận của Google bằng email mới; kiểm tra điều hướng vào ứng dụng.
**Ref:** FR-authentication-012
**Priority:** 1
**Title:** Hoàn tất chấp thuận của Google bằng email mới; kiểm tra điều hướng vào ứng dụng
**Description:** Kiểm chứng: Hoàn tất chấp thuận của Google bằng email mới; kiểm tra điều hướng vào ứng dụng.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Chọn đăng nhập bằng Google và hoàn tất chấp thuận bằng một email Google đã xác minh chưa tồn tại trong hệ thống.
**Expected:** Khi Google trả về email đã xác thực, hệ thống hoàn tất luồng nhận diện người dùng qua email đó mà không hỏi thêm field ngoài dữ liệu Google trả về (FR-authentication-012). [TBD: cần BA cấp wording cho màn đích sau khi hoàn tất luồng Google]
**Test Data:** Tài khoản Google đã xác minh, chưa tồn tại trong hệ thống: new.google@example.com

---

**STT:** 26
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Callback thất bại
**Checklist:** CHK-authentication-065 — Hủy chấp thuận của Google; kiểm tra quay lại màn hình đăng nhập.
**Ref:** FR-authentication-015, E-authentication-008
**Priority:** 1
**Title:** Hủy chấp thuận của Google; kiểm tra quay lại màn hình đăng nhập
**Description:** Kiểm chứng: Hủy chấp thuận của Google; kiểm tra quay lại màn hình đăng nhập.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Chọn đăng nhập bằng Google, sau đó hủy chấp thuận tại Google.
**Expected:** Hệ thống trở về màn hình đăng nhập và hiển thị "Đăng nhập Google thất bại. Vui lòng thử lại." (E-authentication-008).
**Test Data:** Tài khoản Google đã xác minh: learner@email.com

---

**STT:** 27
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Callback thất bại
**Checklist:** CHK-authentication-066 — Mô phỏng callback Google thất bại; kiểm tra thông báo lỗi Google xuất hiện.
**Ref:** FR-authentication-015, E-authentication-008
**Priority:** 1
**Title:** Mô phỏng callback Google thất bại; kiểm tra thông báo lỗi Google xuất hiện
**Description:** Kiểm chứng: Mô phỏng callback Google thất bại; kiểm tra thông báo lỗi Google xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mô phỏng callback Google trả về lỗi sau khi chọn đăng nhập bằng Google.
**Expected:** Hệ thống trở về màn hình đăng nhập và hiển thị "Đăng nhập Google thất bại. Vui lòng thử lại." (E-authentication-008).
**Test Data:** Callback Google: lỗi

---‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

**STT:** 28
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Callback thất bại
**Checklist:** CHK-authentication-067 — Mô phỏng callback Google thất bại; kiểm tra không có tài khoản chưa hoàn chỉnh nào được lưu.
**Ref:** FR-authentication-015
**Priority:** 1
**Title:** Mô phỏng callback Google thất bại; kiểm tra không có tài khoản chưa hoàn chỉnh nào được lưu
**Description:** Kiểm chứng: Mô phỏng callback Google thất bại; kiểm tra không có tài khoản chưa hoàn chỉnh nào được lưu.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Mô phỏng callback Google thất bại cho một email Google chưa tồn tại trong hệ thống.
**Expected:** Callback Google thất bại không tạo tài khoản dở dang trong hệ thống (FR-authentication-015).
**Test Data:** Email Google chưa tồn tại: failed.google@example.com; callback Google: lỗi

---

**STT:** 29
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Callback thất bại
**Checklist:** CHK-authentication-068 — Mở trạng thái lỗi Google; kiểm tra có tùy chọn thử lại hiển thị.
**Ref:** E-authentication-008
**Priority:** 2
**Title:** Mở trạng thái lỗi Google; kiểm tra có tùy chọn thử lại hiển thị
**Description:** Kiểm chứng: Mở trạng thái lỗi Google; kiểm tra có tùy chọn thử lại hiển thị.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở trạng thái callback Google thất bại tại luồng đăng nhập bằng Google.
**Expected:** Hệ thống trở về màn hình đăng nhập và hiển thị "Đăng nhập Google thất bại. Vui lòng thử lại."; người dùng có thể thử lại Google hoặc dùng email/mật khẩu (E-authentication-008).
**Test Data:** Callback Google: lỗi

---

**STT:** 30
**Category:** Bảo mật cơ bản
**Sub-Category:** Nhật ký kiểm toán
**Checklist:** CHK-authentication-069 — Tự động liên kết Google với tài khoản hiện có; kiểm tra một sự kiện kiểm toán bất biến được ghi lại mà không chứa mật khẩu.
**Ref:** NFR-authentication-008
**Priority:** 2
**Title:** Tự động liên kết Google với tài khoản hiện có; kiểm tra một sự kiện kiểm toán bất biến được ghi lại mà không chứa mật khẩu
**Description:** Kiểm chứng: Tự động liên kết Google với tài khoản hiện có; kiểm tra một sự kiện kiểm toán bất biến được ghi lại mà không chứa mật khẩu.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Hoàn tất chấp thuận Google bằng email trùng với một tài khoản hiện có để hệ thống tự liên kết Google.
**Expected:** Hệ thống ghi một sự kiện tự liên kết Google trong nhật ký không sửa được; nhật ký không chứa mật khẩu (NFR-authentication-008).
**Test Data:** Tài khoản hiện có và email Google đã xác minh trùng nhau: existing@email.com

---

**STT:** 31
**Category:** Khả năng truy cập cơ bản
**Sub-Category:** Bàn phím
**Checklist:** CHK-authentication-070 — Điều hướng màn hình đăng nhập bằng Tab; kiểm tra nút đăng nhập bằng Google nhận tiêu điểm bàn phím.
**Ref:** NFR-authentication-009
**Priority:** 3
**Title:** Điều hướng màn hình đăng nhập bằng Tab; kiểm tra nút đăng nhập bằng Google nhận tiêu điểm bàn phím
**Description:** Kiểm chứng: Điều hướng màn hình đăng nhập bằng Tab; kiểm tra nút đăng nhập bằng Google nhận tiêu điểm bàn phím.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Tại màn hình đăng nhập, nhấn Tab để điều hướng qua các trường và nút chính đến nút đăng nhập bằng Google.
**Expected:** Form đăng nhập hỗ trợ điều hướng bàn phím; nút đăng nhập bằng Google nhận tiêu điểm bàn phím như một nút chính của màn hình (NFR-authentication-009).
**Test Data:** —

---

**STT:** 32
**Category:** Trường hợp biên
**Sub-Category:** Email hiện có
**Checklist:** CHK-authentication-062 — Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra liên kết nhà cung cấp Google được tạo.
**Ref:** FR-authentication-014, BR-authentication-003
**Priority:** 1
**Title:** Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra liên kết nhà cung cấp Google được tạo
**Description:** Kiểm chứng: Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra liên kết nhà cung cấp Google được tạo.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Hoàn tất chấp thuận Google bằng email trùng với một tài khoản hiện có.
**Expected:** Hệ thống tự liên kết Google vào tài khoản hiện có, đánh dấu tài khoản `verified` và đăng nhập (FR-authentication-014, BR-authentication-003).
**Test Data:** Tài khoản hiện có và email Google đã xác minh trùng nhau: existing@email.com

---

**STT:** 33
**Category:** Trường hợp biên
**Sub-Category:** Email hiện có
**Checklist:** CHK-authentication-063 — Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra không có tài khoản thứ hai được tạo.
**Ref:** FR-authentication-014, BR-authentication-002
**Priority:** 1
**Title:** Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra không có tài khoản thứ hai được tạo
**Description:** Kiểm chứng: Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra không có tài khoản thứ hai được tạo.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Hoàn tất chấp thuận Google bằng email trùng với một tài khoản hiện có.
**Expected:** Hệ thống không tạo tài khoản thứ hai: email là định danh duy nhất và một email chỉ có một tài khoản dùng chung cho cả hai phương thức (FR-authentication-014, BR-authentication-002).
**Test Data:** Tài khoản hiện có và email Google đã xác minh trùng nhau: existing@email.com

---

**STT:** 34
**Category:** Trường hợp biên
**Sub-Category:** Email hiện có
**Checklist:** CHK-authentication-064 — Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra không yêu cầu mật khẩu cũ.
**Ref:** FR-authentication-014, BR-authentication-003
**Priority:** 1
**Title:** Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra không yêu cầu mật khẩu cũ
**Description:** Kiểm chứng: Hoàn tất chấp thuận của Google bằng email của tài khoản hiện có; kiểm tra không yêu cầu mật khẩu cũ.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Hoàn tất chấp thuận Google bằng email trùng với một tài khoản hiện có.
**Expected:** Hệ thống tự liên kết Google và đăng nhập vào tài khoản hiện có mà không yêu cầu nhập mật khẩu cũ (FR-authentication-014, BR-authentication-003).
**Test Data:** Tài khoản hiện có và email Google đã xác minh trùng nhau: existing@email.com‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
