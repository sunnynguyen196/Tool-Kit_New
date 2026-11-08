**STT:** 35
**Category:** Truy cập đăng nhập
**Sub-Category:** Truy cập
**Checklist:** CHK-authentication-037 — Kiểm tra biểu mẫu đăng nhập bằng email có thể truy cập từ phiên chưa xác thực.
**Ref:** —
**Priority:** 2
**Title:** Kiểm tra biểu mẫu đăng nhập bằng email có thể truy cập từ phiên chưa xác thực
**Description:** Kiểm chứng: Kiểm tra biểu mẫu đăng nhập bằng email có thể truy cập từ phiên chưa xác thực.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Từ một phiên chưa xác thực, truy cập màn đăng nhập.
**Expected:** Màn login hiển thị form email/mật khẩu cho phiên chưa xác thực.
**Test Data:** —

---

**STT:** 36
**Category:** Gửi thông tin xác thực
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-038 — Gửi thông tin xác thực hợp lệ cho tài khoản đã xác minh và không bị khóa; kiểm tra điều hướng vào ứng dụng.
**Ref:** FR-authentication-008
**Priority:** 1
**Title:** Gửi thông tin xác thực hợp lệ cho tài khoản đã xác minh và không bị khóa; kiểm tra điều hướng vào ứng dụng
**Description:** Kiểm chứng: Gửi thông tin xác thực hợp lệ cho tài khoản đã xác minh và không bị khóa; kiểm tra điều hướng vào ứng dụng.
**Auto:** Yes
**Preconditions:** Tài khoản đã có 5 lần đăng nhập sai liên tiếp (dựng: submit sai mật khẩu 5 lần; nguồn: FR-authentication-026)

**Step:** 1
**Action:** Nhập email và mật khẩu đúng của tài khoản đã verified, không bị khóa, rồi gửi form đăng nhập.
**Expected:** Hệ thống tạo phiên đăng nhập và cho người dùng vào app (FR-authentication-008).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

---

**STT:** 37
**Category:** Gửi thông tin xác thực
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-039 — Đăng nhập thành công sau các lần thất bại trước đó; kiểm tra bộ đếm lần thử thất bại được đặt lại.
**Ref:** FR-authentication-008
**Priority:** 1
**Title:** Đăng nhập thành công sau các lần thất bại trước đó; kiểm tra bộ đếm lần thử thất bại được đặt lại
**Description:** Kiểm chứng: Đăng nhập thành công sau các lần thất bại trước đó; kiểm tra bộ đếm lần thử thất bại được đặt lại.
**Auto:** No
**Preconditions:** Đã nhận link đặt lại mật khẩu còn hạn (dựng: gửi yêu cầu quên mật khẩu; nguồn: FR-authentication-017)

**Step:** 1
**Action:** Nhập email và mật khẩu đúng của tài khoản đã verified, không bị khóa, rồi gửi form đăng nhập sau các lần đăng nhập sai trước đó.
**Expected:** Hệ thống tạo phiên đăng nhập và cho người dùng vào app (FR-authentication-008). SRS chưa đặc tả điều kiện đặt lại bộ đếm lần đăng nhập sai sau khi đăng nhập thành công [TBD: cần BA cấp wording]
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

---

**STT:** 38
**Category:** Gửi thông tin xác thực
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-040 — Mở biểu mẫu đăng nhập; kiểm tra tùy chọn nhớ đăng nhập mặc định tắt.
**Ref:** FR-authentication-011
**Priority:** 2
**Title:** Mở biểu mẫu đăng nhập; kiểm tra tùy chọn nhớ đăng nhập mặc định tắt
**Description:** Kiểm chứng: Mở biểu mẫu đăng nhập; kiểm tra tùy chọn nhớ đăng nhập mặc định tắt.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở màn đăng nhập và quan sát tùy chọn remember-me.
**Expected:** Tùy chọn remember-me ở trạng thái tắt mặc định (FR-authentication-011).
**Test Data:** —

---

**STT:** 39
**Category:** Gửi thông tin xác thực
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-041 — Đăng nhập khi bật tùy chọn nhớ đăng nhập; kiểm tra phiên thiết bị vẫn hợp lệ trong 30 ngày.
**Ref:** FR-authentication-011, NFR-authentication-006
**Priority:** 1
**Title:** Đăng nhập khi bật tùy chọn nhớ đăng nhập; kiểm tra phiên thiết bị vẫn hợp lệ trong 30 ngày
**Description:** Kiểm chứng: Đăng nhập khi bật tùy chọn nhớ đăng nhập; kiểm tra phiên thiết bị vẫn hợp lệ trong 30 ngày.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Bật tùy chọn remember-me, nhập email và mật khẩu đúng, rồi gửi form đăng nhập; kiểm tra lại phiên trên cùng thiết bị trong thời hạn 30 ngày.
**Expected:** Hệ thống giữ phiên đăng nhập trên thiết bị đó trong 30 ngày (FR-authentication-011, NFR-authentication-006).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

---

**STT:** 40
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Thông tin xác thực không hợp lệ
**Checklist:** CHK-authentication-042 — Gửi mật khẩu sai cho email hiện có; kiểm tra thông báo chung về thông tin xác thực không hợp lệ xuất hiện.
**Ref:** FR-authentication-010, E-authentication-003
**Priority:** 1
**Title:** Gửi mật khẩu sai cho email hiện có; kiểm tra thông báo chung về thông tin xác thực không hợp lệ xuất hiện
**Description:** Kiểm chứng: Gửi mật khẩu sai cho email hiện có; kiểm tra thông báo chung về thông tin xác thực không hợp lệ xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Nhập email của tài khoản hiện có cùng mật khẩu sai rồi gửi form đăng nhập.
**Expected:** Form đăng nhập hiện "Email hoặc mật khẩu không đúng" và tăng bộ đếm sai +1 (E-authentication-003).
**Test Data:** Email: learner@email.com / Mật khẩu: Sai123!

---

**STT:** 41
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Thông tin xác thực không hợp lệ
**Checklist:** CHK-authentication-043 — Gửi email không tồn tại; kiểm tra cùng thông báo chung về thông tin xác thực không hợp lệ xuất hiện.
**Ref:** FR-authentication-010, NFR-authentication-007
**Priority:** 1
**Title:** Gửi email không tồn tại; kiểm tra cùng thông báo chung về thông tin xác thực không hợp lệ xuất hiện
**Description:** Kiểm chứng: Gửi email không tồn tại; kiểm tra cùng thông báo chung về thông tin xác thực không hợp lệ xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Nhập email không tồn tại cùng một mật khẩu rồi gửi form đăng nhập.
**Expected:** Form đăng nhập hiện cùng thông báo chung "Email hoặc mật khẩu không đúng", không tiết lộ email nào tồn tại (FR-authentication-010, NFR-authentication-007).
**Test Data:** Email: unknown@email.com / Mật khẩu: Hoc2024!

---

**STT:** 42
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Thông tin xác thực không hợp lệ
**Checklist:** CHK-authentication-044 — Gửi thông tin xác thực không hợp lệ; kiểm tra bộ đếm lần thử thất bại tăng thêm một.
**Ref:** FR-authentication-010
**Priority:** 1
**Title:** Gửi thông tin xác thực không hợp lệ; kiểm tra bộ đếm lần thử thất bại tăng thêm một
**Description:** Kiểm chứng: Gửi thông tin xác thực không hợp lệ; kiểm tra bộ đếm lần thử thất bại tăng thêm một.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Nhập email của tài khoản hiện có cùng mật khẩu sai rồi gửi form đăng nhập.
**Expected:** Form đăng nhập hiện "Email hoặc mật khẩu không đúng" và bộ đếm lần đăng nhập sai tăng +1 (FR-authentication-010).
**Test Data:** Email: learner@email.com / Mật khẩu: Sai123!

---

**STT:** 43
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Chưa xác minh và lỗi mạng
**Checklist:** CHK-authentication-050 — Gửi thông tin xác thực đúng cho tài khoản chưa xác minh; kiểm tra quyền truy cập ứng dụng bị chặn.
**Ref:** FR-authentication-009, E-authentication-004
**Priority:** 1
**Title:** Gửi thông tin xác thực đúng cho tài khoản chưa xác minh; kiểm tra quyền truy cập ứng dụng bị chặn
**Description:** Kiểm chứng: Gửi thông tin xác thực đúng cho tài khoản chưa xác minh; kiểm tra quyền truy cập ứng dụng bị chặn.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Nhập email và mật khẩu đúng của tài khoản ở trạng thái unverified rồi gửi form đăng nhập.
**Expected:** Form hiện "Tài khoản chưa được xác nhận. [Gửi lại email xác nhận]" và chặn người dùng vào app (E-authentication-004).
**Test Data:** Email: unverified@email.com / Mật khẩu: Hoc2024!

---

**STT:** 44
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Chưa xác minh và lỗi mạng
**Checklist:** CHK-authentication-051 — Gửi thông tin xác thực đúng cho tài khoản chưa xác minh; kiểm tra nút gửi lại xác nhận xuất hiện.
**Ref:** FR-authentication-009, E-authentication-004
**Priority:** 2
**Title:** Gửi thông tin xác thực đúng cho tài khoản chưa xác minh; kiểm tra nút gửi lại xác nhận xuất hiện
**Description:** Kiểm chứng: Gửi thông tin xác thực đúng cho tài khoản chưa xác minh; kiểm tra nút gửi lại xác nhận xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Nhập email và mật khẩu đúng của tài khoản ở trạng thái unverified rồi gửi form đăng nhập.
**Expected:** Form hiện "Tài khoản chưa được xác nhận. [Gửi lại email xác nhận]", gồm tùy chọn gửi lại email xác nhận (E-authentication-004).
**Test Data:** Email: unverified@email.com / Mật khẩu: Hoc2024!

---‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

**STT:** 45
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Chưa xác minh và lỗi mạng
**Checklist:** CHK-authentication-052 — Mô phỏng lỗi mạng khi đăng nhập; kiểm tra bộ đếm lần thử thất bại không thay đổi.
**Ref:** FR-authentication-027, BR-authentication-011
**Priority:** 1
**Title:** Mô phỏng lỗi mạng khi đăng nhập; kiểm tra bộ đếm lần thử thất bại không thay đổi
**Description:** Kiểm chứng: Mô phỏng lỗi mạng khi đăng nhập; kiểm tra bộ đếm lần thử thất bại không thay đổi.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Mô phỏng lỗi mạng khi gửi form đăng nhập bằng email và mật khẩu.
**Expected:** Lần đăng nhập thất bại do lỗi mạng không làm tăng bộ đếm lần đăng nhập sai (FR-authentication-027, BR-authentication-011).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

---

**STT:** 46
**Category:** Bảo mật cơ bản
**Sub-Category:** Captcha và khóa tài khoản
**Checklist:** CHK-authentication-045 — Tạo ba lần thử không hợp lệ liên tiếp; kiểm tra captcha hiển thị ở lần thử tiếp theo.
**Ref:** FR-authentication-025, BR-authentication-006
**Priority:** 1
**Title:** Tạo ba lần thử không hợp lệ liên tiếp; kiểm tra captcha hiển thị ở lần thử tiếp theo
**Description:** Kiểm chứng: Tạo ba lần thử không hợp lệ liên tiếp; kiểm tra captcha hiển thị ở lần thử tiếp theo.
**Auto:** Yes
**Preconditions:** Tài khoản đã có 3 lần đăng nhập sai liên tiếp (dựng: submit sai mật khẩu 3 lần; nguồn: FR-authentication-025)

**Step:** 1
**Action:** Sau 3 lần đăng nhập sai liên tiếp, thực hiện lần thử đăng nhập tiếp theo.
**Expected:** Hệ thống yêu cầu captcha ở lần thử đăng nhập tiếp theo (FR-authentication-025, BR-authentication-006).
**Test Data:** Email: learner@email.com / Mật khẩu: Sai123!

---

**STT:** 47
**Category:** Bảo mật cơ bản
**Sub-Category:** Captcha và khóa tài khoản
**Checklist:** CHK-authentication-046 — Gửi lần thử tiếp theo mà không hoàn tất captcha; kiểm tra đăng nhập bị chặn.
**Ref:** FR-authentication-025
**Priority:** 1
**Title:** Gửi lần thử tiếp theo mà không hoàn tất captcha; kiểm tra đăng nhập bị chặn
**Description:** Kiểm chứng: Gửi lần thử tiếp theo mà không hoàn tất captcha; kiểm tra đăng nhập bị chặn.
**Auto:** Yes
**Preconditions:** Tài khoản đã có 3 lần đăng nhập sai liên tiếp (dựng: submit sai mật khẩu 3 lần; nguồn: FR-authentication-025)

**Step:** 1
**Action:** Nhập email và mật khẩu đúng, để captcha chưa hoàn tất, rồi gửi form đăng nhập.
**Expected:** Hệ thống yêu cầu captcha ở các lần thử sau 3 lần đăng nhập sai liên tiếp; khi captcha chưa được hoàn tất, đăng nhập không được thực hiện (FR-authentication-025).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

---

**STT:** 48
**Category:** Bảo mật cơ bản
**Sub-Category:** Captcha và khóa tài khoản
**Checklist:** CHK-authentication-047 — Tạo năm lần thử không hợp lệ liên tiếp; kiểm tra việc khóa tài khoản được ghi nhận trong 24 giờ.
**Ref:** FR-authentication-026, BR-authentication-005
**Priority:** 1
**Title:** Tạo năm lần thử không hợp lệ liên tiếp; kiểm tra việc khóa tài khoản được ghi nhận trong 24 giờ
**Description:** Kiểm chứng: Tạo năm lần thử không hợp lệ liên tiếp; kiểm tra việc khóa tài khoản được ghi nhận trong 24 giờ.
**Auto:** No
**Preconditions:** Tài khoản đã có 5 lần đăng nhập sai liên tiếp (dựng: submit sai mật khẩu 5 lần; nguồn: FR-authentication-026)

**Step:** 1
**Action:** Gửi 5 lần đăng nhập liên tiếp bằng email của cùng tài khoản và mật khẩu sai.
**Expected:** Sau 5 lần đăng nhập sai liên tiếp, hệ thống khóa tài khoản trong 24 giờ và tự mở khóa sau đó (FR-authentication-026, BR-authentication-005).
**Test Data:** Email: learner@email.com / Mật khẩu: Sai123!

---

**STT:** 49
**Category:** Bảo mật cơ bản
**Sub-Category:** Captcha và khóa tài khoản
**Checklist:** CHK-authentication-048 — Gửi thông tin xác thực cho tài khoản bị khóa; kiểm tra thông báo khóa tạm thời xuất hiện.
**Ref:** FR-authentication-026, E-authentication-005
**Priority:** 1
**Title:** Gửi thông tin xác thực cho tài khoản bị khóa; kiểm tra thông báo khóa tạm thời xuất hiện
**Description:** Kiểm chứng: Gửi thông tin xác thực cho tài khoản bị khóa; kiểm tra thông báo khóa tạm thời xuất hiện.
**Auto:** Yes
**Preconditions:** Tài khoản đã có 5 lần đăng nhập sai liên tiếp (dựng: submit sai mật khẩu 5 lần; nguồn: FR-authentication-026)

**Step:** 1
**Action:** Nhập email và mật khẩu đúng của tài khoản đang bị khóa rồi gửi form đăng nhập.
**Expected:** Form hiện "Tài khoản tạm khóa do nhiều lần đăng nhập sai. Vui lòng thử lại sau {X} giờ." (E-authentication-005).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

---

**STT:** 50
**Category:** Bảo mật cơ bản
**Sub-Category:** Captcha và khóa tài khoản
**Checklist:** CHK-authentication-049 — Chuyển tài khoản bị khóa vượt quá 24 giờ; kiểm tra tài khoản đủ điều kiện đăng nhập trở lại.
**Ref:** FR-authentication-026
**Priority:** 2
**Title:** Chuyển tài khoản bị khóa vượt quá 24 giờ; kiểm tra tài khoản đủ điều kiện đăng nhập trở lại
**Description:** Kiểm chứng: Chuyển tài khoản bị khóa vượt quá 24 giờ; kiểm tra tài khoản đủ điều kiện đăng nhập trở lại.
**Auto:** No
**Preconditions:** Tài khoản đã có 5 lần đăng nhập sai liên tiếp (dựng: submit sai mật khẩu 5 lần; nguồn: FR-authentication-026)

**Step:** 1
**Action:** Chuyển thời điểm kiểm thử đến sau 24 giờ kể từ khi tài khoản bị khóa, rồi gửi form đăng nhập với email và mật khẩu đúng.
**Expected:** Hệ thống tự mở khóa tài khoản sau 24 giờ và cho phép đăng nhập trở lại khi thông tin xác thực khớp (FR-authentication-026).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

---

**STT:** 51
**Category:** Khả năng truy cập cơ bản
**Sub-Category:** Bàn phím và nhãn
**Checklist:** CHK-authentication-056 — Điều hướng biểu mẫu đăng nhập bằng Tab; kiểm tra trường email nhận tiêu điểm bàn phím.
**Ref:** NFR-authentication-009
**Priority:** 3
**Title:** Điều hướng biểu mẫu đăng nhập bằng Tab; kiểm tra trường email nhận tiêu điểm bàn phím
**Description:** Kiểm chứng: Điều hướng biểu mẫu đăng nhập bằng Tab; kiểm tra trường email nhận tiêu điểm bàn phím.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở màn đăng nhập và nhấn phím Tab để điều hướng qua các thành phần của form.
**Expected:** Form đăng nhập hỗ trợ điều hướng bàn phím; trường email nhận tiêu điểm bàn phím (NFR-authentication-009).
**Test Data:** —

---

**STT:** 52
**Category:** Trường hợp biên
**Sub-Category:** Phiên đồng thời
**Checklist:** CHK-authentication-053 — Đăng nhập cùng tài khoản trên thiết bị thứ hai; kiểm tra phiên trên thiết bị đầu tiên vẫn hoạt động.
**Ref:** FR-authentication-021
**Priority:** 1
**Title:** Đăng nhập cùng tài khoản trên thiết bị thứ hai; kiểm tra phiên trên thiết bị đầu tiên vẫn hoạt động
**Description:** Kiểm chứng: Đăng nhập cùng tài khoản trên thiết bị thứ hai; kiểm tra phiên trên thiết bị đầu tiên vẫn hoạt động.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Đăng nhập cùng một tài khoản trên thiết bị thứ hai, rồi tiếp tục sử dụng phiên đang đăng nhập trên thiết bị thứ nhất.
**Expected:** Hệ thống cho phép cùng tài khoản đăng nhập đồng thời trên nhiều thiết bị; phiên trên thiết bị thứ nhất vẫn hoạt động (FR-authentication-021).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

---

**STT:** 53
**Category:** Trường hợp biên
**Sub-Category:** Phiên đồng thời
**Checklist:** CHK-authentication-054 — Chọn đăng xuất trên thiết bị hiện tại; kiểm tra thiết bị đó trở về trạng thái chưa xác thực.
**Ref:** FR-authentication-022
**Priority:** 1
**Title:** Chọn đăng xuất trên thiết bị hiện tại; kiểm tra thiết bị đó trở về trạng thái chưa xác thực
**Description:** Kiểm chứng: Chọn đăng xuất trên thiết bị hiện tại; kiểm tra thiết bị đó trở về trạng thái chưa xác thực.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Trên thiết bị đang đăng nhập, chọn đăng xuất.
**Expected:** Hệ thống thu hồi phiên của thiết bị hiện tại; thiết bị trở về trạng thái chưa xác thực và không hiện hộp thoại xác nhận (FR-authentication-022).
**Test Data:** —

---

**STT:** 54
**Category:** Trường hợp biên
**Sub-Category:** Phiên đồng thời
**Checklist:** CHK-authentication-055 — Chọn đăng xuất trên một thiết bị; kiểm tra phiên đang hoạt động trên thiết bị khác vẫn sử dụng được.
**Ref:** FR-authentication-022
**Priority:** 1
**Title:** Chọn đăng xuất trên một thiết bị; kiểm tra phiên đang hoạt động trên thiết bị khác vẫn sử dụng được
**Description:** Kiểm chứng: Chọn đăng xuất trên một thiết bị; kiểm tra phiên đang hoạt động trên thiết bị khác vẫn sử dụng được.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Trên thiết bị thứ nhất đang đăng nhập, chọn đăng xuất; sau đó tiếp tục sử dụng phiên đang hoạt động trên thiết bị thứ hai.
**Expected:** Hệ thống chỉ thu hồi phiên của thiết bị thứ nhất; phiên đang hoạt động trên thiết bị thứ hai không bị ảnh hưởng và vẫn sử dụng được (FR-authentication-022).
**Test Data:** —‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
