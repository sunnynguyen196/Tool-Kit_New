# Xử lý sự cố khi đăng ký & thanh toán

> Trang này liệt kê các trục trặc thường gặp trong luồng đăng ký và cách xử lý. Nếu không tìm thấy tình huống của bạn, nhắn Zalo hỗ trợ ghi ở cuối màn thanh toán.

## Bảng sự cố thường gặp

| Tình huống | Nguyên nhân có thể | Cách xử lý |
|-----------|---------------------|------------|
| Bấm **Đăng ký ngay** nhưng form không mở | Trang chưa tải xong, hoặc trình duyệt chặn | Tải lại trang, cuộn lại mục "Thông tin khóa học" rồi bấm lại |
| Nút **Đăng ký · {số tiền}** không bấm được | Còn trường bắt buộc (có dấu `*`) chưa điền | Kiểm tra Họ tên, Số điện thoại, Email, Zalo đã điền đủ chưa |
| Nhập mã giảm giá nhưng không được trừ tiền | Mã sai, hết hạn, hoặc chưa bấm **Áp dụng** | Kiểm tra lại mã; bấm **Áp dụng**; chờ dòng "✓ Mã giảm giá hợp lệ!" xuất hiện |
| Đã chuyển khoản nhưng màn vẫn "Chờ xác nhận thanh toán" | Hệ thống chưa đối soát xong, hoặc chuyển sai nội dung/số tiền | Bấm **Kiểm tra lại ngay**; chờ vài phút; nếu vẫn không được, nhắn Zalo hỗ trợ kèm ảnh biên lai |
| Chuyển khoản sai **nội dung chuyển khoản** | Gõ tay thay vì để app điền từ QR | Nhắn Zalo hỗ trợ kèm ảnh biên lai để đối soát thủ công |
| Không nhận được email xác nhận | Email gõ sai, hoặc thư vào mục spam | Kiểm tra hộp thư spam; nếu vẫn không có, nhắn Zalo hỗ trợ để cập nhật đúng email |

## Nguyên tắc quan trọng khi chuyển khoản

- Luôn để app ngân hàng **tự điền số tiền và nội dung từ mã QR** — đừng gõ tay, dễ sai.
- **Nội dung chuyển khoản** là mã định danh đơn của bạn; sai nội dung khiến hệ thống không tự nhận được tiền.
- Trang thanh toán tự kiểm tra lại nhiều lần (mỗi 5 giây). Không cần chuyển khoản lại nếu bạn đã chuyển đúng một lần.

## Liên quan

- [Đăng ký gói Trọn gói (chi tiết)](./huong-dan-dang-ky-tron-goi.md)
- [Câu hỏi thường gặp](./faq.md)
