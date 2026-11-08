__STT:__ 55
__Category:__ Truy cập đăng ký
__Sub-Category:__ Truy cập
__Checklist:__ CHK-authentication-001 — Kiểm tra biểu mẫu đăng ký có thể truy cập từ phiên chưa xác thực.
__Ref:__ —
__Priority:__ 2
__Title:__ Kiểm tra biểu mẫu đăng ký có thể truy cập từ phiên chưa xác thực
__Description:__ Kiểm chứng: Kiểm tra biểu mẫu đăng ký có thể truy cập từ phiên chưa xác thực.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Từ một phiên chưa xác thực, truy cập form đăng ký.
__Expected:__ Form đăng ký mở được khi phiên chưa xác thực. [TBD: cần BA cấp wording]
__Test Data:__ —

---

__STT:__ 56
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-002 — Nhập mật khẩu hợp lệ gồm 8 ký tự; kiểm tra trường chấp nhận mật khẩu.
__Ref:__ FR-authentication-003
__Priority:__ 1
__Title:__ Nhập mật khẩu hợp lệ gồm 8 ký tự; kiểm tra trường chấp nhận mật khẩu
__Description:__ Kiểm chứng: Nhập mật khẩu hợp lệ gồm 8 ký tự; kiểm tra trường chấp nhận mật khẩu.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập mật khẩu 8 ký tự thỏa chính sách.
__Expected:__ Trường mật khẩu chấp nhận giá trị vì có độ dài 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt, đồng thời không chứa local-part email (FR-authentication-003).
__Test Data:__ Mật khẩu: Hoc2024!

---

__STT:__ 57
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-003 — Nhập mật khẩu hợp lệ gồm 20 ký tự; kiểm tra trường chấp nhận mật khẩu.
__Ref:__ FR-authentication-003
__Priority:__ 2
__Title:__ Nhập mật khẩu hợp lệ gồm 20 ký tự; kiểm tra trường chấp nhận mật khẩu
__Description:__ Kiểm chứng: Nhập mật khẩu hợp lệ gồm 20 ký tự; kiểm tra trường chấp nhận mật khẩu.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập mật khẩu 20 ký tự thỏa chính sách.
__Expected:__ Trường mật khẩu chấp nhận giá trị vì có độ dài 20 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt, đồng thời không chứa local-part email (FR-authentication-003).
__Test Data:__ Mật khẩu: Hocmatkhau2024!Abcde (20 ký tự)

---

__STT:__ 58
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-004 — Nhập mật khẩu gồm 7 ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Ref:__ FR-authentication-003, E-authentication-002
__Priority:__ 1
__Title:__ Nhập mật khẩu gồm 7 ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện
__Description:__ Kiểm chứng: Nhập mật khẩu gồm 7 ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập mật khẩu 7 ký tự vào trường mật khẩu.
__Expected:__ Form hiện lỗi inline real-time "Mật khẩu cần 8-20 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt, và không chứa phần đầu email của bạn" (E-authentication-002).
__Test Data:__ Mật khẩu: Hoc24! (7 ký tự)

---

__STT:__ 59
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-005 — Nhập mật khẩu gồm 21 ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Ref:__ FR-authentication-003, E-authentication-002
__Priority:__ 1
__Title:__ Nhập mật khẩu gồm 21 ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện
__Description:__ Kiểm chứng: Nhập mật khẩu gồm 21 ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập mật khẩu 21 ký tự vào trường mật khẩu.
__Expected:__ Form hiện lỗi inline real-time "Mật khẩu cần 8-20 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt, và không chứa phần đầu email của bạn" (E-authentication-002).
__Test Data:__ Mật khẩu: Hoclongpassword2024!A (21 ký tự)

---

__STT:__ 60
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-006 — Nhập mật khẩu không có chữ hoa; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Ref:__ FR-authentication-003, E-authentication-002
__Priority:__ 1
__Title:__ Nhập mật khẩu không có chữ hoa; kiểm tra lỗi chính sách nội tuyến xuất hiện
__Description:__ Kiểm chứng: Nhập mật khẩu không có chữ hoa; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập mật khẩu không có chữ hoa vào trường mật khẩu.
__Expected:__ Form hiện lỗi inline real-time "Mật khẩu cần 8-20 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt, và không chứa phần đầu email của bạn" (E-authentication-002).
__Test Data:__ Mật khẩu: hoc2024! (không hoa)

---

__STT:__ 61
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-007 — Nhập mật khẩu không có chữ thường; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Ref:__ FR-authentication-003, E-authentication-002
__Priority:__ 1
__Title:__ Nhập mật khẩu không có chữ thường; kiểm tra lỗi chính sách nội tuyến xuất hiện
__Description:__ Kiểm chứng: Nhập mật khẩu không có chữ thường; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập mật khẩu không có chữ thường vào trường mật khẩu.
__Expected:__ Form hiện lỗi inline real-time "Mật khẩu cần 8-20 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt, và không chứa phần đầu email của bạn" (E-authentication-002).
__Test Data:__ Mật khẩu: HOC2024! (không thường)

---

__STT:__ 62
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-008 — Nhập mật khẩu không có ký tự đặc biệt; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Ref:__ FR-authentication-003, E-authentication-002
__Priority:__ 1
__Title:__ Nhập mật khẩu không có ký tự đặc biệt; kiểm tra lỗi chính sách nội tuyến xuất hiện
__Description:__ Kiểm chứng: Nhập mật khẩu không có ký tự đặc biệt; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập mật khẩu không có ký tự đặc biệt vào trường mật khẩu.
__Expected:__ Form hiện lỗi inline real-time "Mật khẩu cần 8-20 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt, và không chứa phần đầu email của bạn" (E-authentication-002).
__Test Data:__ Mật khẩu: Hoc20240 (không ký tự đặc biệt)

---

__STT:__ 63
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-009 — Nhập mật khẩu chứa phần cục bộ của email có ít nhất ba ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Ref:__ FR-authentication-003, E-authentication-002
__Priority:__ 1
__Title:__ Nhập mật khẩu chứa phần cục bộ của email có ít nhất ba ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện
__Description:__ Kiểm chứng: Nhập mật khẩu chứa phần cục bộ của email có ít nhất ba ký tự; kiểm tra lỗi chính sách nội tuyến xuất hiện.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập email rồi nhập mật khẩu có chứa local-part của email (ít nhất 3 ký tự) vào trường mật khẩu.
__Expected:__ Form hiện lỗi inline real-time "Mật khẩu cần 8-20 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt, và không chứa phần đầu email của bạn" (E-authentication-002).
__Test Data:__ Email: learner@example.com; Mật khẩu: Learner!1

---

__STT:__ 64
__Category:__ Nhập thông tin xác thực
__Sub-Category:__ Chính sách mật khẩu
__Checklist:__ CHK-authentication-010 — Nhập mật khẩu; kiểm tra chỉ báo độ mạnh cập nhật theo thời gian thực.
__Ref:__ FR-authentication-029
__Priority:__ 3
__Title:__ Nhập mật khẩu; kiểm tra chỉ báo độ mạnh cập nhật theo thời gian thực
__Description:__ Kiểm chứng: Nhập mật khẩu; kiểm tra chỉ báo độ mạnh cập nhật theo thời gian thực.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, lần lượt nhập các mật khẩu có độ mạnh khác nhau vào trường mật khẩu.
__Expected:__ Chỉ báo mức độ mạnh của mật khẩu cập nhật theo thời gian thực khi người dùng nhập mật khẩu trên form đăng ký (FR-authentication-029).
__Test Data:__ Mật khẩu: Hoc2024!

---‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

__STT:__ 65
__Category:__ Gửi đăng ký
__Sub-Category:__ Luồng thành công
__Checklist:__ CHK-authentication-011 — Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra trạng thái tài khoản được tạo là chưa xác minh.
__Ref:__ FR-authentication-001
__Priority:__ 1
__Title:__ Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra trạng thái tài khoản được tạo là chưa xác minh
__Description:__ Kiểm chứng: Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra trạng thái tài khoản được tạo là chưa xác minh.
__Auto:__ No
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập email chưa tồn tại và mật khẩu đạt chính sách rồi gửi form.
__Expected:__ Hệ thống tạo tài khoản với trạng thái `unverified` khi email và mật khẩu hợp lệ, đồng thời email chưa tồn tại (FR-authentication-001).
__Test Data:__ Email: newuser@example.com; Mật khẩu: Hoc2024!

---

__STT:__ 66
__Category:__ Gửi đăng ký
__Sub-Category:__ Luồng thành công
__Checklist:__ CHK-authentication-012 — Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra email xác nhận chứa liên kết có hiệu lực 24 giờ được gửi đi.
__Ref:__ FR-authentication-004
__Priority:__ 1
__Title:__ Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra email xác nhận chứa liên kết có hiệu lực 24 giờ được gửi đi
__Description:__ Kiểm chứng: Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra email xác nhận chứa liên kết có hiệu lực 24 giờ được gửi đi.
__Auto:__ No
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập email chưa tồn tại và mật khẩu đạt chính sách rồi gửi form; kiểm tra hộp thư của email đã đăng ký.
__Expected:__ Sau khi tài khoản được tạo, hệ thống gửi tới địa chỉ đã đăng ký email chứa link xác nhận có hạn 24 giờ (FR-authentication-004).
__Test Data:__ Email: newuser@example.com; Mật khẩu: Hoc2024!

---

__STT:__ 67
__Category:__ Gửi đăng ký
__Sub-Category:__ Luồng thành công
__Checklist:__ CHK-authentication-013 — Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra màn hình đã gửi xác nhận hiển thị email đã gửi.
__Ref:__ FR-authentication-004
__Priority:__ 2
__Title:__ Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra màn hình đã gửi xác nhận hiển thị email đã gửi
__Description:__ Kiểm chứng: Gửi thông tin xác thực hợp lệ và duy nhất; kiểm tra màn hình đã gửi xác nhận hiển thị email đã gửi.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập email chưa tồn tại và mật khẩu đạt chính sách rồi gửi form.
__Expected:__ Hệ thống gửi email xác nhận chứa link có hạn 24 giờ tới địa chỉ đã đăng ký; SRS không nêu màn hình xác nhận sau khi gửi hoặc việc hiển thị lại địa chỉ email. [TBD: cần BA cấp wording]
__Test Data:__ Email: newuser@example.com; Mật khẩu: Hoc2024!

---

__STT:__ 68
__Category:__ Xử lý xác thực và lỗi
__Sub-Category:__ Email đã tồn tại
__Checklist:__ CHK-authentication-014 — Gửi email đã đăng ký; kiểm tra lỗi nội tuyến email trùng lặp xuất hiện.
__Ref:__ FR-authentication-002, E-authentication-001
__Priority:__ 1
__Title:__ Gửi email đã đăng ký; kiểm tra lỗi nội tuyến email trùng lặp xuất hiện
__Description:__ Kiểm chứng: Gửi email đã đăng ký; kiểm tra lỗi nội tuyến email trùng lặp xuất hiện.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhập email đã đăng ký và mật khẩu đạt chính sách rồi gửi form.
__Expected:__ Form đăng ký hiện lỗi inline "Email này đã được đăng ký. Bạn muốn [đăng nhập] hoặc [quên mật khẩu]?"; hệ thống chặn tạo tài khoản (E-authentication-001).
__Test Data:__ Email: learner@email.com; Mật khẩu: Hoc2024!

---

__STT:__ 69
__Category:__ Xử lý xác thực và lỗi
__Sub-Category:__ Email đã tồn tại
__Checklist:__ CHK-authentication-015 — Chọn liên kết khôi phục đăng nhập từ lỗi email trùng lặp; kiểm tra điều hướng đến luồng đăng nhập.
__Ref:__ E-authentication-001
__Priority:__ 2
__Title:__ Chọn liên kết khôi phục đăng nhập từ lỗi email trùng lặp; kiểm tra điều hướng đến luồng đăng nhập
__Description:__ Kiểm chứng: Chọn liên kết khôi phục đăng nhập từ lỗi email trùng lặp; kiểm tra điều hướng đến luồng đăng nhập.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Gửi form đăng ký với email đã đăng ký, rồi chọn liên kết [đăng nhập] trong lỗi inline xuất hiện.
__Expected:__ Form đăng ký hiện lỗi inline "Email này đã được đăng ký. Bạn muốn [đăng nhập] hoặc [quên mật khẩu]?"; khi chọn [đăng nhập], người dùng được chuyển sang luồng đăng nhập (E-authentication-001).
__Test Data:__ Email: learner@email.com; Mật khẩu: Hoc2024!

---

__STT:__ 70
__Category:__ Bảo mật cơ bản
__Sub-Category:__ Bảo vệ khỏi bot
__Checklist:__ CHK-authentication-016 — Kích hoạt bảo vệ khỏi bot khi đăng ký; kiểm tra captcha được yêu cầu trước khi gửi.
__Ref:__ FR-authentication-031
__Priority:__ 2
__Title:__ Kích hoạt bảo vệ khỏi bot khi đăng ký; kiểm tra captcha được yêu cầu trước khi gửi
__Description:__ Kiểm chứng: Kích hoạt bảo vệ khỏi bot khi đăng ký; kiểm tra captcha được yêu cầu trước khi gửi.
__Auto:__ Yes
__Preconditions:__ Tài khoản đã có 3 lần đăng nhập sai liên tiếp (dựng: submit sai mật khẩu 3 lần; nguồn: FR-authentication-025)

__Step:__ 1
__Action:__ Trên form đăng ký, nhập email và mật khẩu đạt chính sách, không hoàn tất captcha rồi gửi form.
__Expected:__ Form đăng ký yêu cầu captcha trước khi gửi để chống đăng ký hàng loạt bằng bot (FR-authentication-031).
__Test Data:__ Email: newuser@example.com; Mật khẩu: Hoc2024!

---

__STT:__ 71
__Category:__ Bảo mật cơ bản
__Sub-Category:__ Bảo vệ khỏi bot
__Checklist:__ CHK-authentication-017 — Kiểm tra nhật ký xác thực sau khi đăng ký; kiểm tra mật khẩu đã gửi không xuất hiện.
__Ref:__ NFR-authentication-003
__Priority:__ 1
__Title:__ Kiểm tra nhật ký xác thực sau khi đăng ký; kiểm tra mật khẩu đã gửi không xuất hiện
__Description:__ Kiểm chứng: Kiểm tra nhật ký xác thực sau khi đăng ký; kiểm tra mật khẩu đã gửi không xuất hiện.
__Auto:__ No
__Preconditions:__ —

__Step:__ 1
__Action:__ Đăng ký bằng email và mật khẩu hợp lệ, sau đó kiểm tra nhật ký xác thực tạo bởi luồng đăng ký.
__Expected:__ Nhật ký không chứa mật khẩu đã gửi; mật khẩu không được lưu dạng plaintext và không được ghi vào log (NFR-authentication-003).
__Test Data:__ Email: newuser@example.com; Mật khẩu: Hoc2024!

---

__STT:__ 72
__Category:__ Khả năng truy cập cơ bản
__Sub-Category:__ Bàn phím và nhãn
__Checklist:__ CHK-authentication-018 — Điều hướng biểu mẫu bằng Tab; kiểm tra nút gửi nhận tiêu điểm bàn phím.
__Ref:__ NFR-authentication-009
__Priority:__ 3
__Title:__ Điều hướng biểu mẫu bằng Tab; kiểm tra nút gửi nhận tiêu điểm bàn phím
__Description:__ Kiểm chứng: Điều hướng biểu mẫu bằng Tab; kiểm tra nút gửi nhận tiêu điểm bàn phím.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Trên form đăng ký, nhấn Tab lần lượt qua các trường và nút chính đến nút gửi.
__Expected:__ Form đăng ký hỗ trợ điều hướng bằng bàn phím; nút gửi nhận tiêu điểm bàn phím (NFR-authentication-009).
__Test Data:__ —

---

__STT:__ 73
__Category:__ Khả năng truy cập cơ bản
__Sub-Category:__ Bàn phím và nhãn
__Checklist:__ CHK-authentication-019 — Kiểm tra trường mật khẩu bằng trình đọc màn hình; kiểm tra trường cung cấp nhãn lập trình.
__Ref:__ NFR-authentication-009
__Priority:__ 3
__Title:__ Kiểm tra trường mật khẩu bằng trình đọc màn hình; kiểm tra trường cung cấp nhãn lập trình
__Description:__ Kiểm chứng: Kiểm tra trường mật khẩu bằng trình đọc màn hình; kiểm tra trường cung cấp nhãn lập trình.
__Auto:__ Yes
__Preconditions:__ —

__Step:__ 1
__Action:__ Dùng trình đọc màn hình di chuyển đến trường mật khẩu trên form đăng ký.
__Expected:__ Trình đọc màn hình nhận được nhãn lập trình của trường mật khẩu; form đăng ký hỗ trợ nhãn cho trình đọc màn hình ở các trường và nút chính (NFR-authentication-009).
__Test Data:__ —

---

__STT:__ 74
__Category:__ Trường hợp biên
__Sub-Category:__ Lưu giữ tài khoản chưa xác minh
__Checklist:__ CHK-authentication-020 — Chuyển tài khoản chưa xác minh vượt quá 24 giờ; kiểm tra tài khoản bị xóa.
__Ref:__ FR-authentication-028, BR-authentication-010
__Priority:__ 2
__Title:__ Chuyển tài khoản chưa xác minh vượt quá 24 giờ; kiểm tra tài khoản bị xóa
__Description:__ Kiểm chứng: Chuyển tài khoản chưa xác minh vượt quá 24 giờ; kiểm tra tài khoản bị xóa.
__Auto:__ No
__Preconditions:__ —

__Step:__ 1
__Action:__ Chuẩn bị tài khoản ở trạng thái `unverified` đã quá 24 giờ, rồi chạy hoặc chờ tiến trình nền rà tài khoản chưa xác nhận.
__Expected:__ Hệ thống tự xóa tài khoản có trạng thái `unverified` quá 24 giờ (FR-authentication-028, BR-authentication-010).
__Test Data:__ Tài khoản: `unverified`, tuổi tài khoản: >24 giờ‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
