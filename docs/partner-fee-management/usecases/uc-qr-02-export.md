---
id: QR-UC02
title: "Xuất tệp dữ liệu CHP Trả đối tác QRGW"
feature: partner-fee-management
module: QRGW
status: approved
updated: 2026-11-08
links:
  - srs: docs/partner-fee-management/srs/partner-fee-management-spec.md
  - srs_qrgw: docs/partner-fee-management/srs/SRS-Partner-Fee-QRGW.md
  - figma: "Figma File: ForWork · Page: CHP Đối tác"
---

# 3.3 QR-UC02: Xuất tệp dữ liệu CHP Trả đối tác QRGW

## 3.3.1 Use case

| Mục | Nội dung đặc tả chi tiết |
|---|---|
| **Use Case** | **Xuất tệp dữ liệu danh sách cấu hình phí đối tác Cổng QR Gateway (QRGW)** |
| **ID** | **QR - UC02** |
| **Description** | Cho phép người dùng xuất dữ liệu danh sách biểu phí QRGW ra tệp định dạng Excel hoặc PDF phục vụ công tác đối soát cước thanh toán VietQR với các ngân hàng thành viên, lưu trữ hồ sơ và báo cáo tài chính. |
| **Actor** | Maker QRGW, Checker QRGW, Đối soát viên, Kế toán viên |
| **Trigger** | Người dùng click chọn button **[Xuất tệp ▼]** trên thanh công cụ phía trên bảng danh sách QRGW. |
| **Pre-Condition** | Người dùng đã đăng nhập, có quyền xuất tệp dữ liệu phân hệ QRGW và đã có kết quả tìm kiếm/danh sách trên màn hình. |
| **Post-Condition** | Hệ thống sinh tệp tải về thành công (định dạng `.xlsx` hoặc `.pdf`) chứa danh sách cấu hình phí QRGW theo đúng điều kiện lọc hiện tại. |
| **Basic flow** | 1. Người dùng vào menu **[Quản lý cấu hình phí] > [Phí trả đối tác] > [Phí đối tác QRGW]** ở thanh menu bên trái.<br>2. Hệ thống hiển thị màn hình danh sách cấu hình phí QRGW.<br>3. Người dùng chọn **[Xuất tệp]** trên màn hình danh sách.<br>4. Hệ thống hiển thị danh sách định dạng tệp hỗ trợ xuất. |
| **Alternative flow** | - **A1**: Không có bản ghi nào thỏa mãn điều kiện lọc $\rightarrow$ Hệ thống hiển thị cảnh báo: *“Không có dữ liệu để xuất tệp”*, không thực hiện sinh tệp trống.<br>- **A2**: Số lượng bản ghi vượt quá 50.000 dòng $\rightarrow$ Hệ thống hiển thị thông báo yêu cầu người dùng thu hẹp khoảng thời gian hoặc xuất dữ liệu qua hàng đợi tác vụ ngầm. |
| **Exception flow** | - **E1**: Lỗi timeout khi kết xuất tệp (> 30 giây) $\rightarrow$ Thông báo lỗi hệ thống và gợi ý người dùng thử lại.<br>- **E2**: Mất kết nối mạng internet trong lúc tải file. |
| **Business Rules** | [Yêu cầu nghiệp vụ chung xuất tệp dữ liệu CHP QRGW](#333-yêu-cầu-nghiệp-vụ-chung) |
| **Non-functional requirement** | Thời gian xuất file $< 5$ giây với tập dữ liệu dưới 5.000 dòng; $< 15$ giây với tập dữ liệu từ 5.000 đến 50.000 dòng. |

---

## 3.3.2 Giao diện

### Màn hình Wireframe liên kết:
* **QR-UC02-WF01**: Menu Dropdown Xuất tệp trên thanh công cụ Danh sách QRGW (`4020:50223`)

### Bảng Đặc tả Từ điển Trường Dữ liệu (Screen Data Dictionary):

| Component Name | Data Type | Validation rules (M/O/C) | Editable (Y/N) | Other Validation | Action rules |
|---|---|:---:|:---:|---|---|
| **Button [Xuất tệp ▼]** | Button | O | Y | Click | Hiển thị menu dropdown 2 mục chọn định dạng file xuất. |
| **Option [Xuất Excel (.xlsx)]** | Menu item | O | Y | Click | Kích hoạt tiến trình kết xuất bảng tính Excel với đầy đủ định dạng số, ngày tháng và kẻ bảng chuẩn. |
| **Option [Xuất PDF (.pdf)]** | Menu item | O | Y | Click | Kích hoạt tiến trình xuất báo cáo tài liệu PDF khổ ngang (A4 Landscape) có header/footer và đánh số trang. |
| **Toast thông báo tiến trình** | Toast Banner | C | N | Readonly | Hiển thị thông báo tiến trình xử lý kèm biểu tượng loading. |

---

## 3.3.3 Yêu cầu nghiệp vụ chung

#### Chi tiết xử lý nghiệp vụ

1. Người dùng chọn các tiêu chí lọc QRGW và bấm [Tìm kiếm] để nạp danh sách kết quả (hoặc sử dụng danh sách mặc định).
2. Click button **[Xuất tệp ▼]** ở góc trên bên phải bảng danh sách QRGW.
3. Hệ thống hiển thị dropdown gồm 2 lựa chọn: *Xuất Excel (.xlsx)* và *Xuất PDF (.pdf)*.
4. Người dùng click chọn định dạng mong muốn.
5. Hệ thống kiểm tra số lượng bản ghi thỏa mãn điều kiện lọc.
6. Hệ thống thực hiện kết xuất dữ liệu và kích hoạt trình tải tệp xuống máy tính của người dùng.


| Mã Quy tắc | Tên Quy tắc | Nội dung đặc tả nghiệp vụ chi tiết |
|---|---|---|
| **QR-UC02-BR01.1** | **Quy tắc đặt tên tệp kết xuất QRGW** | Tên tệp được tự động đặt theo quy chuẩn: `EPAY_CHP_QRGW_[TabTrangThai]_[ddMMyyyy_HHmmss].[ext]` (Ví dụ: `EPAY_CHP_QRGW_TatCa_08112026_153000.xlsx`). |
| **QR-UC02-BR01.2** | **Quy tắc dữ liệu trong tệp xuất QRGW** | Dữ liệu trong tệp xuất ra phải khớp 100% với danh sách kết quả tìm kiếm theo bộ lọc QRGW hiện tại, bao gồm cả các dòng ở các trang sau. Cột Mã cấu hình giữ nguyên định dạng chuỗi văn bản. |
| **QR-UC02-BR01.3** | **Quy tắc ghi nhận nhật ký xuất tệp** | 100% thao tác xuất tệp phải được ghi nhận vào nhật ký hệ thống (`audit_logs`) gồm: User thực hiện, Thời điểm xuất, Bộ tiêu chí lọc đã áp dụng và Số lượng bản ghi kết xuất. |

---

## 3.3.4 Bảng mã lỗi

| Mã lỗi | Tiêu đề lỗi | Điều kiện kích hoạt | Mức độ | Câu thông báo nguyên văn tiếng Việt & Hướng xử lý |
|---|---|---|---|---|
| **E1** | Không có dữ liệu để xuất | Danh sách tìm kiếm QRGW rỗng không có bản ghi nào | Minor | *“Không có dữ liệu để xuất tệp. Vui lòng thử lại với điều kiện tìm kiếm khác!”* |
| **E2** | Vượt quá số lượng bản ghi tối đa | Số lượng bản ghi thỏa mãn điều kiện lọc $> 50.000$ dòng | Major | *“Dữ liệu kết xuất vượt quá giới hạn 50.000 bản ghi. Vui lòng thu hẹp khoảng thời gian tìm kiếm hoặc lọc theo ngân hàng cụ thể!”* |
| **E3** | Lỗi timeout khi tạo tệp | Quá trình sinh tệp kéo dài quá 30 giây | Major | *“Hệ thống đang quá tải, không thể tạo tệp vào lúc này. Vui lòng thử lại sau giây lát!”* |
| **E4** | Mất kết nối internet khi tải tệp | Gián đoạn kết nối mạng khi tải luồng dữ liệu tệp | Major | *“Đường truyền mạng bị gián đoạn trong khi tải tệp. Vui lòng kiểm tra kết nối mạng và bấm Xuất tệp lại!”* |
