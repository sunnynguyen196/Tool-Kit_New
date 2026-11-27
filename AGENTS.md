# BA Master Flow — Quy tắc làm việc

<!-- reqwise:begin -->
Reqwise Figma (MCP server reqwise-figma): before you interview the user for, or draw, any Figma diagram, design system, demo or copy work, call figma_docs({ section: "<kind>", level: "guide" }) and follow it.
<!-- reqwise:end -->

## Quy tắc bắt buộc khi vẽ giao diện trên Figma

- **Mỗi nhóm chức năng hoặc phần nghiệp vụ riêng phải có một Figma Section riêng.** Ví dụ: Danh sách/Tra cứu, Thêm mới phí xử lý giao dịch, Thêm mới phí thanh toán, Chi tiết/Phê duyệt, Xử lý theo trạng thái, Lịch sử hoạt động. Không gộp các phần nghiệp vụ độc lập vào chung một Section.
- Mọi frame của cùng một chức năng, gồm màn gốc, biến thể theo lựa chọn, trạng thái, lỗi và popup liên quan, phải nằm trong Section của chức năng đó. Không tạo một Section mới cho từng biến thể nhỏ nếu vẫn thuộc cùng chức năng.
- Trước khi chỉnh hoặc vẽ, kiểm tra kết nối, file/page và Section thực tế; đọc danh sách frame con của Section để xác định đúng đích. Nếu Section tương ứng đã có, cập nhật trực tiếp trong Section đó; chỉ tạo Section mới khi chưa có nhóm phù hợp. Không để frame mới trôi ra ngoài hoặc tạo Section trùng tên.
- Đặt tên Section rõ ràng, theo cấu trúc `[Phân hệ] · [STT] · [Tên nhóm chức năng]` khi dự án đã dùng quy ước này; giữ quy ước đang có của file Figma. Sắp xếp màn gốc, biến thể và popup trong cùng Section, không chồng lấn với Section khác.
- Khi dùng `figma.arrangeScreens`, kiểm tra Section ID trả về và danh sách frame con sau khi sắp xếp. Nếu công cụ tạo Section trùng thay vì tái sử dụng Section đích, đưa các frame về đúng Section hiện có; không xóa Section hoặc nội dung gốc của người dùng.
- Trước khi báo hoàn thành, đọc lại cấu trúc Section, kiểm tra tất cả frame thuộc đúng nhóm, chạy kiểm tra bố cục và xem ảnh render thực tế. Báo rõ Section, số màn đã cập nhật và phần chưa hoàn tất (nếu có).
