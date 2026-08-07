import fs from 'node:fs';
import path from 'node:path';

const wordDocHtml = `
<html xmlns:o='urn:schemas-microsoft-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Tài liệu Mô tả Use Case & Giao diện Chi tiết - Quản lý Tra soát (Logic V2.1)</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 210mm 297mm; /* A4 */
      margin: 20mm 15mm 20mm 15mm;
      mso-header-margin: 10mm;
      mso-footer-margin: 10mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.3;
      color: #000000;
    }
    h1 {
      font-size: 18pt;
      font-weight: bold;
      color: #002D62;
      text-align: center;
      margin-top: 18pt;
      margin-bottom: 6pt;
      text-transform: uppercase;
    }
    h2 {
      font-size: 14pt;
      font-weight: bold;
      color: #F05A21;
      text-align: center;
      margin-top: 0pt;
      margin-bottom: 18pt;
    }
    .doc-info {
      width: 100%;
      margin-bottom: 16pt;
      font-size: 11pt;
      font-style: italic;
      color: #444444;
      border-bottom: 1px solid #CCCCCC;
      padding-bottom: 6pt;
    }
    .sec-title {
      font-size: 15pt;
      font-weight: bold;
      color: #002D62;
      margin-top: 20pt;
      margin-bottom: 8pt;
      border-bottom: 1.5pt solid #002D62;
      padding-bottom: 4pt;
    }
    .uc-title {
      font-size: 13.5pt;
      font-weight: bold;
      color: #002D62;
      margin-top: 18pt;
      margin-bottom: 6pt;
    }
    .wf-section-title {
      font-size: 12.5pt;
      font-weight: bold;
      color: #F05A21;
      margin-top: 14pt;
      margin-bottom: 6pt;
    }
    .br-section-title {
      font-size: 12.5pt;
      font-weight: bold;
      color: #0073C7;
      margin-top: 14pt;
      margin-bottom: 6pt;
    }
    table.uc-table, table.wf-table, table.br-table, table.status-table, table.custom-col-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16pt;
    }
    table.uc-table th, table.uc-table td, table.wf-table th, table.wf-table td, table.br-table th, table.br-table td, table.status-table th, table.status-table td, table.custom-col-table th, table.custom-col-table td {
      border: 1px solid #000000;
      padding: 4pt 5pt;
      vertical-align: top;
      font-size: 10pt;
    }
    table.uc-table td.field-name {
      width: 24%;
      font-weight: bold;
      background-color: #F2F4F7;
      color: #000000;
    }
    table.uc-table td.field-value {
      width: 76%;
      background-color: #FFFFFF;
    }

    /* Status Table Specifics */
    table.status-table th {
      background-color: #002D62;
      color: #FFFFFF;
      font-weight: bold;
      text-align: center;
    }

    /* Wireframe Table Specifics */
    table.wf-table th, table.br-table th, table.custom-col-table th {
      background-color: #F2F4F7;
      font-weight: bold;
      text-align: center;
      vertical-align: middle;
    }
    .wf-divider-row td {
      background-color: #F2F4F7;
      font-weight: bold;
      color: #002D62;
      font-size: 10.5pt;
    }
    .wf-img-box {
      border: 1px solid #000000;
      padding: 8pt;
      background: #FAFAFA;
      text-align: center;
      margin-bottom: 10pt;
    }
    .wf-code-title {
      font-weight: bold;
      color: #002D62;
      margin-bottom: 4pt;
    }
    .br-box {
      border: 1px solid #0073C7;
      background-color: #F0F7FF;
      padding: 10pt;
      margin-bottom: 16pt;
      border-radius: 4px;
    }
    .footer-table {
      width: 100%;
      border-top: 1px dashed #666666;
      margin-top: 24pt;
      font-size: 10pt;
      font-style: italic;
      color: #555555;
    }
  </style>
</head>
<body>

  <h1>TÀI LIỆU MÔ TẢ USE CASE & GIAO DIỆN CHI TIẾT</h1>
  <h2>TÍNH NĂNG QUẢN LÝ TRA SOÁT (DISPUTE MANAGEMENT - LOGIC V2.1)</h2>

  <div class="doc-info">
    <strong>Mã tài liệu:</strong> EPAY-QT.CG.02_BM33 &nbsp;|&nbsp; 
    <strong>Dự án:</strong> Hệ thống Quản lý Tra soát Epay - Petrolimex 2.0 &nbsp;|&nbsp; 
    <strong>Phiên bản:</strong> v2.1 (Tổng hợp 3 Luồng Tra soát: TCYCTS Có kiểm tra, TCYCTS Không kiểm tra &amp; TCTLTS Trả lời YCTS)
  </div>

  <!-- ================= MỤC BỘ TRẠNG THÁI HỆ THỐNG ================= -->
  <div class="sec-title">1. MÔ TẢ BỘ TRẠNG THÁI HỆ THỐNG MỚI (CẤU TRÚC TRẠNG THÁI 3 NHÓM V2.1)</div>
  <p>Phân hệ Quản lý Tra soát vận hành theo cơ chế phân tách <strong>3 Nhóm trường trạng thái độc lập</strong> để quản lý 3 luồng xử lý: 1. Luồng TCYCTS Có kỹ thuật kiểm tra (2 Swimlanes); 2. Luồng TCYCTS Không kỹ thuật kiểm tra (2 Swimlanes); 3. Luồng TCTLTS Trả lời YCTS Thụ động (2 Swimlanes).</p>

  <div style="font-weight:bold; color:#002D62; margin-top:10pt; margin-bottom:4pt;">1.1. Nhóm 1: Trạng thái Tiến trình Tra soát (PCTS - 9 Trạng thái Tiến trình)</div>
  <table class="status-table">
    <thead>
      <tr>
        <th style="width:22%;">Mã Trạng thái Tiến trình</th>
        <th style="width:23%;">Tên Trạng thái</th>
        <th style="width:55%;">Diễn giải chi tiết nghiệp vụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Chờ xử lý</strong> (Pending)</td>
        <td>Chờ xử lý</td>
        <td>Bản ghi YCTS vừa được Maker tạo mới trên hệ thống MM hoặc bản ghi TCTLTS (TS-014) vừa được Service QR nhận từ Napas đồng bộ sang.</td>
      </tr>
      <tr>
        <td><strong>Đã hủy</strong> (Cancelled)</td>
        <td>Đã hủy</td>
        <td>Bản ghi YCTS bị Maker chủ động hủy bỏ tại mốc Chờ xử lý hoặc Chờ phê duyệt.</td>
      </tr>
      <tr>
        <td><strong>Đã kiểm tra</strong> (Inspected)</td>
        <td>Đã kiểm tra</td>
        <td><em>(Chỉ có ở Luồng TCYCTS CÓ kiểm tra)</em> Inspector (Người kiểm tra) đã kiểm tra dữ liệu và bấm <strong>[Xác nhận Đã kiểm tra]</strong>.</td>
      </tr>
      <tr>
        <td><strong>Chờ phê duyệt</strong> (ApprovePending)</td>
        <td>Chờ phê duyệt</td>
        <td>Maker bấm <strong>[📤 Gửi yêu cầu phê duyệt]</strong>, YCTS chuyển Chờ phê duyệt và <strong>sinh ra 01 bản ghi YCPD</strong> (ApprovePending).</td>
      </tr>
      <tr>
        <td><strong>Đã phê duyệt</strong> (Approved)</td>
        <td>Đã phê duyệt</td>
        <td>Quản lý (Checker) bấm <strong>[✅ Đồng ý Phê duyệt]</strong>, hệ thống duyệt bản ghi YCPD và phát hành thông điệp sang Napas.</td>
      </tr>
      <tr>
        <td><strong>Xử lý thất bại</strong> (Failure)</td>
        <td>Xử lý thất bại</td>
        <td>Phát sinh lỗi validation định dạng dữ liệu hoặc lỗi kết nối mạng khi gửi thông điệp sang Cổng Service QR.</td>
      </tr>
      <tr>
        <td><strong>Chờ phản hồi</strong> (Waiting Response)</td>
        <td>Chờ phản hồi</td>
        <td>Cổng Service QR phát hành thông điệp sang Napas thành công (Service QR status <code>OPEN</code>), chờ đối tác phản hồi.</td>
      </tr>
      <tr>
        <td><strong>Đã phản hồi</strong> (Responded)</td>
        <td>Đã phản hồi</td>
        <td>Cổng Service QR nhận kết quả từ Napas. Hệ thống tự động gán <strong>Trạng thái xử lý YCTS</strong> hoặc <strong>Trạng thái Tra soát hết hạn</strong>.</td>
      </tr>
      <tr>
        <td><strong>Hoàn tất</strong> (Completed)</td>
        <td>Hoàn tất</td>
        <td>Quy trình tra soát và hạch toán hoàn tiền/báo có đã kết thúc hoàn toàn trên toàn hệ thống.</td>
      </tr>
    </tbody>
  </table>

  <div style="font-weight:bold; color:#002D62; margin-top:10pt; margin-bottom:4pt;">1.2. Nhóm 2: Trạng thái Xử lý YCTS tại Epay / MM (Processing Outcome Status)</div>
  <table class="status-table">
    <thead>
      <tr>
        <th style="width:25%;">Trạng thái Xử lý YCTS tại Epay</th>
        <th style="width:20%;">Mã QRGW/Gateway Map</th>
        <th style="width:55%;">Diễn giải chi tiết nghiệp vụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>—</strong> (None)</td>
        <td><code>—</code></td>
        <td>Mặc định ban đầu khi chưa gửi hoặc chưa phát sinh kết quả từ đối tác.</td>
      </tr>
      <tr>
        <td><strong>OPEN</strong> (Open)</td>
        <td><code>OPEN</code></td>
        <td>Khi QRGW tiếp nhận phản hồi từ đối tác thông báo trạng thái <code>OPEN</code> (đối tác đang xử lý).</td>
      </tr>
      <tr>
        <td><strong>PRCD</strong> (Processed)</td>
        <td><code>EXPR</code> / <code>PRCD</code> / Hoàn trả TC / Báo có TC</td>
        <td><strong>[TCYCTS]</strong> Đối tác đồng ý/chấp nhận hoàn tiền/báo có.<br/><strong>[TCTLTS]</strong> Khi QRGW thông báo: Hoàn trả thành công, Báo có thành công, hoặc nhận IPN thành công sau hết hạn.</td>
      </tr>
      <tr>
        <td><strong>RJCD</strong> (Rejected)</td>
        <td><code>RJCD</code> / <code>EXRJ</code> / Hoàn trả TB / Báo có TB</td>
        <td><strong>[TCYCTS]</strong> Đối tác phản hồi từ chối yêu cầu tra soát.<br/>**[TCTLTS]** Khi QRGW thông báo: Hoàn trả thất bại, Báo có thất bại, hoặc nhận IPN thất bại sau hết hạn.</td>
      </tr>
    </tbody>
  </table>

  <div style="font-weight:bold; color:#002D62; margin-top:10pt; margin-bottom:4pt;">1.3. Nhóm 3: Trạng thái Tra soát Hết hạn YCTS (Expiration Status)</div>
  <table class="status-table">
    <thead>
      <tr>
        <th style="width:25%;">Trạng thái Tra soát Hết hạn</th>
        <th style="width:20%;">Mã Gateway Map</th>
        <th style="width:55%;">Diễn giải chi tiết nghiệp vụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Chưa hết hạn</strong> (Unexpired)</td>
        <td><code>—</code></td>
        <td>Mặc định ban đầu khi giao dịch trong thời hạn SLA xử lý.</td>
      </tr>
      <tr>
        <td><strong>Đã hết hạn</strong> (Expired)</td>
        <td><code>EXPI</code></td>
        <td>Khi QRGW nhận thông báo IPN từ đối tác với trạng thái <code>EXPI</code> (quá hạn SLA), hệ thống MM cập nhật từ Chưa hết hạn sang Đã hết hạn.</td>
      </tr>
    </tbody>
  </table>

  <!-- ================= MỤC USE CASES ================= -->
  <div class="sec-title" style="page-break-before:always;">2. MÔ TẢ CHI TIẾT CÁC USE CASE NGHIỆP VỤ (LOGIC V2.1)</div>

  <!-- ================= USE CASE 1 ================= -->
  <div class="uc-title">2.1.1.1 Use case: Tra cứu và xem danh sách yêu cầu tra soát (BF29.1-UC01 / DS01-UC01)</div>
  <table class="uc-table">
    <tr><td class="field-name">Use Case</td><td class="field-value"><strong>Tra cứu và xem danh sách yêu cầu tra soát</strong></td></tr>
    <tr><td class="field-name">ID</td><td class="field-value"><strong>BF29.1-UC01 / DS01-UC01</strong></td></tr>
    <tr><td class="field-name">Description</td><td class="field-value">Tra cứu kết quả và xem danh sách các yêu cầu tra soát giao dịch thanh toán theo Cấu trúc Trạng thái 3 Nhóm (Tiến trình tra soát, Trạng thái xử lý YCTS, Trạng thái Tra soát hết hạn).</td></tr>
    <tr><td class="field-name">Actor</td><td class="field-value">Maker, Inspector, Checker, Operator, Hệ thống Merchant Management, DB Service QR</td></tr>
    <tr><td class="field-name">Trigger</td><td class="field-value">Người dùng mở menu Quản lý tra soát > [Tra soát đã gửi] hoặc [Tra soát đã nhận].</td></tr>
    <tr><td class="field-name">Pre-Condition</td><td class="field-value">- Tài khoản người dùng đã được cấp quyền truy cập.<br/>- Người dùng đã đăng nhập thành công vào epay Portal.</td></tr>
    <tr><td class="field-name">Post-Condition</td><td class="field-value">Hệ thống hiển thị danh sách các bản ghi tra soát thỏa mãn điều kiện lọc kèm thông tin thống kê tổng tiền.</td></tr>
    <tr><td class="field-name">Basic flow</td><td class="field-value">1. Người dùng chọn mục <strong>[Quản lý tra soát]</strong> tại menu bên trái.<br/>2. Chọn <strong>[Tra soát đã gửi]</strong> (hoặc <strong>[Tra soát đã nhận]</strong>).<br/>3. Hệ thống hiển thị Màn hình Quản lý tra soát với các trường lọc, thanh Tab tiến trình (Tất cả, Chờ xử lý, Đã kiểm tra, Chờ phê duyệt, Chờ phản hồi, Đã phản hồi, Hoàn tất, Đã hủy) và Table Grid.<br/>4. Người dùng chọn/nhập điều kiện lọc và nhấp nút <strong>[Tìm kiếm]</strong>.<br/>5. Hệ thống truy vấn dữ liệu từ DB MM và DB Service QR, hiển thị danh sách kết quả phù hợp kèm thống kê tổng tiền giao dịch.</td></tr>
    <tr><td class="field-name">Non-functional requirement</td><td class="field-value">Màn hình hiển thị kết quả tra cứu trong vòng không quá 02 giây cho 1,000 bản ghi.</td></tr>
  </table>

  <!-- BẢNG ĐẶC TẢ GIAO DIỆN CHUẨN EPAY-QT.CG.02_BM33 - UC01 -->
  <div style="font-weight:bold; color:#002D62; margin-top:12pt; margin-bottom:4pt;">Bảng Đặc tả Thành phần Giao diện Chuẩn Template (EPAY-QT.CG.02_BM33 - UC01 List Screen)</div>
  <table class="wf-table">
    <thead>
      <tr>
        <th rowspan="2" style="width:20%;">Component Name</th>
        <th rowspan="2" style="width:12%;">Data Type</th>
        <th colspan="3" style="width:26%;">Validation rules</th>
        <th rowspan="2" style="width:42%;">Action rules</th>
      </tr>
      <tr>
        <th style="width:7%;">M/O/C</th>
        <th style="width:7%;">Editable</th>
        <th style="width:12%;">Other Validation</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Quản lý tra soát đã gửi</strong></td><td style="text-align:center;">Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>-</td><td>Tiêu đề màn hình quản lý tra soát đã gửi.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Điều kiện tìm kiếm/ lọc tab “Tất cả”</td></tr>
      <tr><td><strong>MERCHANT CODE</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Giá trị mặc định khi chưa chọn là 'Tất cả'. Lọc bản ghi thuộc ĐVCNTT/Cửa hàng thuộc quyền quản lý.</td></tr>
      <tr><td><strong>ĐỐI TÁC THANH TOÁN</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Giá trị mặc định khi chưa chọn là 'Ví Epay'. Lọc danh sách theo đối tác/kênh xử lý thanh toán giao dịch gốc.</td></tr>
      <tr><td><strong>TIẾN TRÌNH TRA SOÁT</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Lọc theo 9 trạng thái Tiến trình (Chờ xử lý, Đã hủy, Đã kiểm tra, Chờ phê duyệt, Đã phê duyệt, Xử lý thất bại, Chờ phản hồi, Đã phản hồi, Hoàn tất).</td></tr>
      <tr><td><strong>TRẠNG THÁI XỬ LÝ YCTS</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Lọc theo kết quả trả lời khi Tiến trình = Đã phản hồi (Đồng ý, Từ chối).</td></tr>
      <tr><td><strong>TRẠNG THÁI TRA SOÁT HẾT HẠN</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Lọc theo tình trạng quá hạn SLA khi Tiến trình = Đã phản hồi (Hết hạn).</td></tr>
      <tr><td><strong>LOẠI TRA SOÁT</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Giá trị mặc định là 'RQRN (Hoàn tiền)'. Cho phép chọn mã loại tra soát: RQRN, RQNF, RQSP.</td></tr>
      <tr><td><strong>NGƯỜI TẠO</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Max 50 ký tự</td><td>Cho phép user nhập text tương đối để tìm tài khoản Chuyên viên (Maker) khởi tạo bản ghi tra soát.</td></tr>
      <tr><td><strong>THỜI GIAN TẠO</strong></td><td style="text-align:center;">Date Picker</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Tối đa 90 ngày</td><td>Khoảng thời gian khởi tạo bản ghi. Mặc định hiển thị 30 ngày gần nhất. Cảnh báo nếu khoảng cách chọn &gt; 90 ngày.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Button chức năng</td></tr>
      <tr><td><strong>Xóa bộ lọc</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>-</td><td>Khi nhấp nút này, hệ thống xóa toàn bộ các giá trị điều kiện lọc đang chọn và khôi phục form lọc về giá trị mặc định.</td></tr>
      <tr><td><strong>Tìm kiếm</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>-</td><td>Khi nhấp nút này, hệ thống lấy dữ liệu điều kiện trên form, truy vấn DB QR &amp; MM và hiển thị kết quả lọc trên Table Grid.</td></tr>
      <tr><td><strong>+ Tạo yêu cầu tra soát</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>-</td><td>Tham chiếu đến mục <strong>BF29.1-UC02 (DS01-UC02): Lập yêu cầu tra soát giao dịch TCYCTS</strong>. Mở màn hình tạo mới (Tiến trình <em>Chờ xử lý</em>).</td></tr>
      <tr><td><strong>Tùy chỉnh</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>-</td><td>Cho phép chọn list trường tin hiển thị trên Table GridView. Hệ thống lưu cấu hình tùy chỉnh theo user, theo tab.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Danh sách các tab tại màn hình quản lý tra soát</td></tr>
      <tr><td><strong>Tất cả</strong></td><td style="text-align:center;">Tab</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>- Tab mặc định. Hiển thị tất cả yêu cầu tra soát. Sắp xếp giảm dần theo Ngày tạo.</td></tr>
      <tr><td><strong>Chờ xử lý</strong></td><td style="text-align:center;">Tab</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>- Hiển thị danh sách các bản ghi ở Tiến trình 'Chờ xử lý'.</td></tr>
      <tr><td><strong>Đã kiểm tra</strong></td><td style="text-align:center;">Tab</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>- Hiển thị danh sách các bản ghi YCTS đã được Người kiểm tra xác minh ở Tiến trình 'Đã kiểm tra'.</td></tr>
      <tr><td><strong>Chờ phê duyệt</strong></td><td style="text-align:center;">Tab</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>- Hiển thị các bản ghi đang ở Tiến trình 'Chờ phê duyệt' và đã sinh ra bản ghi YCPD tại DB MM.</td></tr>
      <tr><td><strong>Chờ phản hồi</strong></td><td style="text-align:center;">Tab</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>- Hiển thị các bản ghi đã gửi Napas thành công (Service QR status OPEN), đang ở Tiến trình 'Chờ phản hồi'.</td></tr>
      <tr><td><strong>Đã phản hồi</strong></td><td style="text-align:center;">Tab</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>- Hiển thị bản ghi đã nhận kết quả từ Napas (Tiến trình 'Đã phản hồi'), hiển thị Trạng thái xử lý YCTS (Đồng ý, Từ chối) hoặc Trạng thái hết hạn (Hết hạn).</td></tr>
      <tr><td><strong>Hoàn tất</strong></td><td style="text-align:center;">Tab</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>- Hiển thị các bản ghi tra soát đã kết thúc hoàn toàn quy trình hạch toán đối soát ở Tiến trình 'Hoàn tất'.</td></tr>
      <tr><td><strong>Đã hủy</strong></td><td style="text-align:center;">Tab</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>- Hiển thị danh sách các bản ghi bị Maker hủy bỏ ở Tiến trình 'Đã hủy'.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Thanh tìm kiếm nhanh</td></tr>
      <tr><td><strong>Quicksearch</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Max 100 ký tự</td><td>- Text hướng dẫn: "Tìm kiếm theo mã tra soát, loại tra soát, mã giao dịch gốc...". Nhập thông tin ấn enter. Chuyển tab Quicksearch giữ nguyên.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Chi tiết cột dữ liệu trên danh sách</td></tr>
      <tr><td><strong>Trường tin</strong></td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>Tham chiếu tại mục <strong>2.2.5 Danh sách trường tin tùy chỉnh</strong>.</td></tr>
      <tr><td><strong>Phân trang</strong></td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td><td>-</td><td>Sử dụng rule chung của việc hiển thị tổng bản ghi; phân trang MM (Ví dụ: Tổng tiền giao dịch: 9,850,000 VND | 06 kết quả).</td></tr>
    </tbody>
  </table>

  <!-- MỤC 2.2.5 DANH SÁCH TRƯỜNG TIN TÙY CHỈNH -->
  <div style="font-weight:bold; color:#002D62; margin-top:14pt; margin-bottom:4pt; font-size:12pt;">2.2.5. Danh sách trường tin tùy chỉnh</div>
  <table class="custom-col-table">
    <thead>
      <tr>
        <th style="width:6%;">STT</th>
        <th style="width:20%;">Trường tin</th>
        <th style="width:14%;">Lựa chọn mặc định</th>
        <th style="width:60%;">Mô tả &amp; Link Chuyển hướng (Hyperlink Use Cases)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#FDBA74; font-weight:bold; color:#7C2D12;"><td colspan="4">Tab “Tất cả”, “Chờ xử lý”, “Đã kiểm tra”, “Chờ phê duyệt”, “Chờ phản hồi”, “Đã phản hồi”, “Hoàn tất”, “Đã hủy”</td></tr>
      <tr><td style="text-align:center;">1</td><td><strong>STT</strong></td><td style="text-align:center;">Y</td><td>Số thứ tự hiển thị trong danh sách theo trang.</td></tr>
      <tr><td style="text-align:center;">2</td><td><strong>Mã tra soát</strong></td><td style="text-align:center;">Y</td><td>Mã định danh duy nhất của yêu cầu tra soát (VD: TS-003, TS-014).<br/>👉 <strong>Tham chiếu đến mục BF29.1-UC05: Xem chi tiết &amp; Lịch sử xử lý tra soát</strong>.</td></tr>
      <tr><td style="text-align:center;">3</td><td><strong>Loại tra soát</strong></td><td style="text-align:center;">Y</td><td>Mã loại tra soát chuẩn Napas: RQRN (Hoàn tiền), RQNF (Thông báo), RQSP (Tra soát số tiền).</td></tr>
      <tr><td style="text-align:center;">4</td><td><strong>Tiến trình tra soát</strong></td><td style="text-align:center;">Y</td><td>Trạng thái Tiến trình vòng đời YCTS gắn badge màu: 🟡 Chờ xử lý, 🔵 Đã kiểm tra, 🟠 Chờ phê duyệt, 🟣 Chờ phản hồi, 🟢 Đã phản hồi, 🔘 Hoàn tất, 🔴 Đã hủy / Xử lý thất bại.</td></tr>
      <tr><td style="text-align:center;">5</td><td><strong>Trạng thái xử lý YCTS</strong></td><td style="text-align:center;">Y</td><td>Kết quả xử lý khi Tiến trình = Đã phản hồi: 🟢 <strong>Đồng ý</strong>, 🔴 <strong>Từ chối</strong> (— nếu chưa phản hồi).</td></tr>
      <tr><td style="text-align:center;">6</td><td><strong>Trạng thái Tra soát hết hạn</strong></td><td style="text-align:center;">Y</td><td>Tình trạng quá mốc SLA khi Tiến trình = Đã phản hồi: 🟠 <strong>Hết hạn</strong> (— nếu trong hạn SLA).</td></tr>
      <tr><td style="text-align:center;">7</td><td><strong>Vai trò tra soát</strong></td><td style="text-align:center;">Y</td><td>Chiều giao dịch tra soát: <code>TCYCTS</code> (Tra soát đã gửi) hoặc <code>TCTLTS</code> (Tra soát đã nhận).</td></tr>
      <tr><td style="text-align:center;">8</td><td><strong>Mã GD gốc</strong></td><td style="text-align:center;">Y</td><td>Mã định danh duy nhất của giao dịch thanh toán gốc liên quan (VD: TX-10003, TX-10014).</td></tr>
      <tr><td style="text-align:center;">9</td><td><strong>Loại GD gốc</strong></td><td style="text-align:center;">Y</td><td>Loại hình dịch vụ của giao dịch gốc (VD: Thanh toán hàng hóa, Chuyển tiền...).</td></tr>
      <tr><td style="text-align:center;">10</td><td><strong>Thời gian tạo</strong></td><td style="text-align:center;">Y</td><td>Ngày giờ hệ thống ghi nhận khởi tạo bản ghi tra soát tại MM.</td></tr>
      <tr><td style="text-align:center;">11</td><td><strong>Thời gian xử lý</strong></td><td style="text-align:center;">Y</td><td>Ngày giờ hoàn tất phê duyệt / phản hồi kết quả tra soát (— nếu chưa hoàn tất).</td></tr>
      <tr><td style="text-align:center;">12</td><td><strong>Thao tác</strong></td><td style="text-align:center;">Y</td><td>Hiển thị biểu tượng 3 chấm [⋮]. Khi nhấp mở menu hành động chứa các hyperlink:<br/>- <strong>[👁️ Xem chi tiết]</strong>: Tham chiếu <strong>BF29.1-UC05</strong>.<br/>- <strong>[🔍 Xác nhận Kiểm tra]</strong>: Tham chiếu <strong>BF29.1-UC02.1</strong>.<br/>- <strong>[✏️ Cập nhật thông tin]</strong>: Tham chiếu <strong>BF29.1-UC06</strong>.<br/>- <strong>[📤 Gửi yêu cầu phê duyệt]</strong>: Tham chiếu <strong>BF29.1-UC02 / UC06</strong>.<br/>- <strong>[❌ Hủy bỏ yêu cầu]</strong>: Tham chiếu <strong>BF29.1-UC06</strong>.<br/>- <strong>[✅ Phê duyệt / ❌ Từ chối]</strong>: Tham chiếu <strong>BF29.1-UC03</strong>.</td></tr>
    </tbody>
  </table>

  <!-- ================= USE CASE 2 ================= -->
  <div class="uc-title" style="page-break-before:always;">2.1.1.2 Use case: Lập yêu cầu tra soát giao dịch TCYCTS (BF29.1-UC02)</div>
  <table class="uc-table">
    <tr><td class="field-name">Use Case</td><td class="field-value"><strong>Lập yêu cầu tra soát giao dịch (TCYCTS — Chiều đi)</strong></td></tr>
    <tr><td class="field-name">ID</td><td class="field-value"><strong>DS01-UC02 / BF29.1-UC02</strong></td></tr>
    <tr><td class="field-name">Description</td><td class="field-value">Khởi tạo và gửi yêu cầu tra soát mới cho một giao dịch thanh toán. Khi bấm khởi tạo, hệ thống MM sinh ra 01 bản ghi YCTS với trạng thái Tiến trình ban đầu là <strong>"Chờ xử lý"</strong> (Maker có thể hủy ➔ <strong>"Đã hủy"</strong>). Xử lý phân luồng Cần người kiểm tra (Tiến trình <strong>"Đã kiểm tra"</strong>) hoặc Không cần người kiểm tra (Trình thẳng <strong>"Chờ phê duyệt"</strong> sinh YCPD).</td></tr>
    <tr><td class="field-name">Actor</td><td class="field-value">Maker (Chuyên viên Tra soát / Thu ngân), Inspector (Người kiểm tra - tùy chọn), Hệ thống MM</td></tr>
    <tr><td class="field-name">Trigger</td><td class="field-value">Maker chọn nút <strong>[+ Tạo yêu cầu tra soát]</strong> tại màn hình Tra soát đã gửi.</td></tr>
    <tr><td class="field-name">Pre-Condition</td><td class="field-value">- Maker có quyền khởi tạo yêu cầu tra soát.<br/>- Giao dịch gốc thực hiện trong vòng 180 ngày trở lại và ở trạng thái thành công.</td></tr>
    <tr><td class="field-name">Post-Condition</td><td class="field-value">Bản ghi YCTS được sinh ra tại DB MM ở trạng thái Tiến trình <strong>"Chờ xử lý"</strong>. Sau đó rẽ nhánh trình kiểm tra hoặc trình phê duyệt.</td></tr>
    <tr><td class="field-name">Basic flow (Luồng CÓ Người kiểm tra - 6 Swimlanes)</td><td class="field-value">1. Maker chọn <strong>[Tạo yêu cầu tra soát]</strong>.<br/>2. Tìm kiếm và chọn giao dịch gốc thành công trong 180 ngày.<br/>3. Nhập Lý do tra soát, Loại tra soát (<code>RQSP — Sai sót nghiệp vụ</code>, mã lý do cố định <code>BANK — Ngân hàng đối tác yêu cầu</code>), Số tiền tra soát và upload chứng từ đính kèm.<br/>4. Maker chọn <strong>[Lưu Yêu cầu Tra soát]</strong>.<br/>5. Hệ thống insert 01 bản ghi YCTS mới tại DB MM với trạng thái Tiến trình là <strong>"Chờ xử lý"</strong>.<br/>6. Người kiểm tra (Inspector) vào kiểm tra dữ liệu và bấm <strong>[Xác nhận Đã kiểm tra]</strong> ➔ YCTS chuyển trạng thái Tiến trình sang <strong>"Đã kiểm tra"</strong>.<br/>7. Maker chọn bản ghi ở trạng thái <strong>"Đã kiểm tra"</strong>, nhấp <strong>[📤 Gửi yêu cầu phê duyệt]</strong>.<br/>8. Hệ thống chuyển YCTS sang trạng thái Tiến trình <strong>"Chờ phê duyệt"</strong> và <strong>sinh ra 01 bản ghi Yêu cầu Phê duyệt (YCPD)</strong> ở trạng thái <code>ApprovePending</code> tại DB MM.</td></tr>
    <tr><td class="field-name">Alternative flow (Luồng KHÔNG CÓ Người kiểm tra - 5 Swimlanes)</td><td class="field-value">1. Maker thực hiện các bước 1-3 trong Basic Flow.<br/>2. Maker chọn <strong>[📤 Gửi yêu cầu phê duyệt]</strong> trực tiếp từ màn hình khởi tạo (Tiến trình <em>Chờ xử lý</em>).<br/>3. Hệ thống sinh bản ghi YCTS ở Tiến trình <strong>"Chờ xử lý"</strong>, sau đó tự động chuyển sang <strong>"Chờ phê duyệt"</strong> (bỏ qua mốc <em>Đã kiểm tra</em>) và <strong>sinh ra 01 bản ghi YCPD</strong> tại DB MM để trình Quản lý (Checker) duyệt.</td></tr>
    <tr><td class="field-name">Non-functional requirement</td><td class="field-value">Xử lý sinh bản ghi YCTS và YCPD &lt; 1.5 giây.</td></tr>
  </table>

  <!-- BẢNG ĐẶC TẢ GIAO DIỆN CHUẨN EPAY-QT.CG.02_BM33 - UC02 -->
  <div style="font-weight:bold; color:#002D62; margin-top:12pt; margin-bottom:4pt;">Bảng Đặc tả Thành phần Giao diện Chuẩn Template (EPAY-QT.CG.02_BM33 - UC02 Form Screen)</div>
  <table class="wf-table">
    <thead>
      <tr>
        <th rowspan="2" style="width:20%;">Component Name</th>
        <th rowspan="2" style="width:12%;">Data Type</th>
        <th colspan="3" style="width:26%;">Validation rules</th>
        <th rowspan="2" style="width:42%;">Action rules</th>
      </tr>
      <tr>
        <th style="width:7%;">M/O/C</th>
        <th style="width:7%;">Editable</th>
        <th style="width:12%;">Other Validation</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Tạo yêu cầu tra soát mới</strong></td><td style="text-align:center;">Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>-</td><td>Tiêu đề màn hình tạo mới yêu cầu tra soát chủ động (TCYCTS).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Thông tin Giao dịch gốc (Popup Tìm kiếm &amp; Chọn Giao dịch gốc)</td></tr>
      <tr><td><strong>Chọn Giao dịch gốc</strong></td><td style="text-align:center;">Button / Modal</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Max 180 ngày</td><td>Nhấp để mở popup tìm kiếm và chọn giao dịch thanh toán gốc thành công trong vòng 180 ngày.</td></tr>
      <tr><td><strong>PTTT (Phương thức thanh toán)</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Mặc định chọn <strong>VietQR</strong>. Cho phép lọc theo PTTT giao dịch gốc (VietQR, Thẻ ATM/Nội địa, Thẻ quốc tế, Ví điện tử).</td></tr>
      <tr><td><strong>Trạng thái giao dịch</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Mặc định chọn <strong>Thành công</strong>. Cho phép lọc theo trạng thái giao dịch gốc (Thành công, Đã hoàn tiền, Tất cả).</td></tr>
      <tr><td><strong>Cột Grid Table: PTTT</strong></td><td style="text-align:center;">Table Column</td><td style="text-align:center;">-</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị Phương thức thanh toán trên bảng kết quả tìm kiếm giao dịch gốc (VD: VietQR).</td></tr>
      <tr><td><strong>Cột Grid Table: Trạng thái GD</strong></td><td style="text-align:center;">Table Column</td><td style="text-align:center;">-</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị Badge trạng thái giao dịch thanh toán gốc trên bảng kết quả tìm kiếm (VD: 🟢 <strong>Thành công</strong>).</td></tr>
      <tr><td><strong>Mã Giao dịch gốc</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Auto-fill</td><td>Hiển thị mã định danh duy nhất của giao dịch gốc được chọn (VD: TX-10014). Read-only cố định.</td></tr>
      <tr><td><strong>Số tiền giao dịch gốc</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Auto-fill</td><td>Hiển thị số tiền thanh toán của giao dịch gốc (VD: 950,000 VND).</td></tr>
      <tr><td><strong>Thời gian giao dịch</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Auto-fill</td><td>Hiển thị ngày giờ thực hiện giao dịch gốc (VD: 2026-07-22 14:30).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Thông tin Yêu cầu Tra soát</td></tr>
      <tr><td><strong>Lý do tra soát</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Chọn lý do khiếu nại tra soát từ danh mục chuẩn (VD: Khách hàng bị trừ tiền 2 lần, Cột bơm lỗi timeout...).</td></tr>
      <tr><td><strong>Số tiền tra soát</strong></td><td style="text-align:center;">Number Input</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>&gt; 0 và &lt;= Số tiền gốc</td><td>Mặc định bằng số tiền giao dịch gốc. Cho phép nhập số tiền nhỏ hơn hoặc bằng số tiền gốc.</td></tr>
      <tr><td><strong>Loại tra soát</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Mặc định chọn RQRN — Hoàn tiền. Danh mục gồm: RQRN, RQNF, RQSP.</td></tr>
      <tr><td><strong>Mô tả chi tiết</strong></td><td style="text-align:center;">Textarea</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Max 500 ký tự</td><td>Cho phép Chuyên viên nhập diễn giải chi tiết nguyên nhân phát sinh khiếu nại tra soát.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Hồ sơ / Chứng từ đính kèm</td></tr>
      <tr><td><strong>Tệp đính kèm chứng từ</strong></td><td style="text-align:center;">Fileupload</td><td style="text-align:center;">M khi RQRN</td><td style="text-align:center;">Y</td><td>PDF, PNG, JPG (Max 10MB)</td><td>Cho phép kéo thả hoặc chọn tệp chứng từ minh chứng (Bill thanh toán, Sao kê, Ảnh chụp camera...).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Button chức năng</td></tr>
      <tr><td><strong>Hủy bỏ</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>-</td><td>Nhấp nút này để hủy bỏ thao tác tạo mới và quay lại màn hình Danh sách tra soát.</td></tr>
      <tr><td><strong>Lưu Yêu cầu Tra soát</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Role Maker</td><td>Khởi tạo bản ghi YCTS mới tại DB MM ở trạng thái Tiến trình <strong>Chờ xử lý</strong> (Dành cho luồng rẽ nhánh qua Người kiểm tra).</td></tr>
      <tr><td><strong>[📤 Gửi yêu cầu phê duyệt]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Primary Action</td><td>Chuyển YCTS sang trạng thái Tiến trình <strong>Chờ phê duyệt</strong> và <strong>sinh ra 01 bản ghi YCPD (ApprovePending)</strong> tại DB MM.</td></tr>
    </tbody>
  </table>

  <!-- ================= USE CASE 3 ================= -->
  <div class="uc-title" style="page-break-before:always;">2.1.1.3 Use case: Phê duyệt nội bộ yêu cầu tra soát (BF29.1-UC03)</div>
  <table class="uc-table">
    <tr><td class="field-name">Use Case</td><td class="field-value"><strong>Phê duyệt nội bộ yêu cầu tra soát (Role Checker / Quản lý)</strong></td></tr>
    <tr><td class="field-name">ID</td><td class="field-value"><strong>DS01-UC03 / BF29.1-UC03</strong></td></tr>
    <tr><td class="field-name">Description</td><td class="field-value">Quản lý (Checker) xem xét bản ghi YCPD (được sinh ra khi YCTS ở Tiến trình <code>Chờ phê duyệt</code>) để đưa ra quyết định Phê duyệt (Approved) hoặc Từ chối (Cancel). Khi Phê duyệt, YCTS chuyển sang Tiến trình <code>Đã phê duyệt</code> và tự động phát hành sang Napas (chuyển sang Tiến trình <code>Chờ phản hồi</code>).</td></tr>
    <tr><td class="field-name">Actor</td><td class="field-value">Checker (Trưởng nhóm / Quản lý), Hệ thống Merchant Management, DB Service QR, Cổng Napas</td></tr>
    <tr><td class="field-name">Trigger</td><td class="field-value">Checker chọn 01 bản ghi tra soát đang ở trạng thái YCTS/YCPD <code>Chờ phê duyệt</code> (ApprovePending).</td></tr>
    <tr><td class="field-name">Pre-Condition</td><td class="field-value">- Checker có quyền phê duyệt YCPD (Tuân thủ quy tắc 4 mắt: Checker ≠ Maker sáng tạo YCPD).<br/>- Bản ghi YCPD đang ở trạng thái <code>ApprovePending</code> tại DB MM.</td></tr>
    <tr><td class="field-name">Post-Condition</td><td class="field-value">- <strong>Nếu Đồng ý Phê duyệt:</strong> YCPD status = <code>Approved</code>, YCTS chuyển Tiến trình <code>Đã phê duyệt</code> ➔ <code>Chờ phản hồi</code> (Service QR status <code>OPEN</code>).<br/>- <strong>Nếu Từ chối Phê duyệt:</strong> YCPD status = <code>Cancel</code>, đóng luồng trình duyệt nội bộ.</td></tr>
    <tr><td class="field-name">Basic flow</td><td class="field-value">1. Checker mở chi tiết bản ghi tra soát ở trạng thái Tiến trình <code>Chờ phê duyệt</code>.<br/>2. Kiểm tra thông tin tra soát, lý do, số tiền hoàn trả và chứng từ đính kèm.<br/>3. Nhập ý kiến nhận xét vào ô <strong>[Ghi chú phê duyệt hoặc lý do từ chối *]</strong>.<br/>4. Chọn <strong>[✅ Đồng ý Phê duyệt (Gọi Service QR)]</strong>.<br/>5. Hệ thống chuyển YCPD thành <code>Approved</code>, YCTS chuyển Tiến trình sang <code>Đã phê duyệt</code> và tự động kích hoạt Service QR API gửi sang Napas (chuyển Tiến trình sang <code>Chờ phản hồi</code>).</td></tr>
    <tr><td class="field-name">Non-functional requirement</td><td class="field-value">Xử lý phê duyệt và kích hoạt API Service QR &lt; 3.0 giây.</td></tr>
  </table>

  <!-- BẢNG ĐẶC TẢ GIAO DIỆN CHUẨN EPAY-QT.CG.02_BM33 - UC03 -->
  <div style="font-weight:bold; color:#002D62; margin-top:12pt; margin-bottom:4pt;">Bảng Đặc tả Thành phần Giao diện Chuẩn Template (EPAY-QT.CG.02_BM33 - UC03 Approval Screen)</div>
  <table class="wf-table">
    <thead>
      <tr>
        <th rowspan="2" style="width:20%;">Component Name</th>
        <th rowspan="2" style="width:12%;">Data Type</th>
        <th colspan="3" style="width:26%;">Validation rules</th>
        <th rowspan="2" style="width:42%;">Action rules</th>
      </tr>
      <tr>
        <th style="width:7%;">M/O/C</th>
        <th style="width:7%;">Editable</th>
        <th style="width:12%;">Other Validation</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Chi tiết &amp; Phê duyệt Tra soát</strong></td><td style="text-align:center;">Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>-</td><td>Tiêu đề màn hình Phê duyệt dành cho Quản lý (Checker View).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Thông tin Yêu cầu Phê duyệt Nội bộ (YCPD Banner)</td></tr>
      <tr><td><strong>Mã YCPD</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị mã định danh duy nhất của Yêu cầu Phê duyệt (VD: YCPD-014).</td></tr>
      <tr><td><strong>Trạng thái DB MM</strong></td><td style="text-align:center;">Badge Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Badge màu vàng nổi bật hiển thị trạng thái ApprovePending (Chờ phê duyệt).</td></tr>
      <tr><td><strong>Trạng thái DB Service QR</strong></td><td style="text-align:center;">Badge Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị trạng thái cổng QR (OPEN / Pending partner).</td></tr>
      <tr><td><strong>Thông tin Đề xuất</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị tóm tắt đề xuất (VD: Đề xuất Đồng ý hoàn tiền 950.000 VND cho KH bởi ThuNgan01).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Chi tiết Đề xuất &amp; Hồ sơ đính kèm</td></tr>
      <tr><td><strong>Số tiền tra soát đề xuất</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị số tiền đề xuất hoàn trả/tra soát (VD: 950,000 VND).</td></tr>
      <tr><td><strong>Lý do tra soát / phản hồi</strong></td><td style="text-align:center;">Textarea</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị diễn giải lý do do Chuyên viên (Maker) trình duyệt.</td></tr>
      <tr><td><strong>Tệp minh chứng đính kèm</strong></td><td style="text-align:center;">File Link</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Click to download</td><td>Đường link nhấp để tải hoặc mở xem trực tiếp tệp chứng từ đính kèm (VD: minh_chung_tra_soat.pdf).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Ý kiến Phê duyệt / Từ chối</td></tr>
      <tr><td><strong>Ghi chú phê duyệt hoặc lý do từ chối *</strong></td><td style="text-align:center;">Textarea</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Max 500 ký tự</td><td>Bắt buộc nhập khi chọn Từ chối Phê duyệt. Tùy chọn nhập khi chọn Đồng ý Phê duyệt.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Button chức năng Phê duyệt</td></tr>
      <tr><td><strong>[❌ Từ chối Phê duyệt]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Role Checker &amp; ApprovePending</td><td>Chuyển bản ghi YCPD thành Cancel, từ chối câu trả lời và đóng luồng trình duyệt nội bộ.</td></tr>
      <tr><td><strong>[✅ Đồng ý Phê duyệt (Gọi Service QR)]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Primary Action</td><td>Chuyển YCPD thành Approved, YCTS chuyển Tiến trình Đã phê duyệt ➔ Chờ phản hồi (Gửi Napas).</td></tr>
    </tbody>
  </table>

  <!-- ================= USE CASE 4 ================= -->
  <div class="uc-title" style="page-break-before:always;">2.1.1.4 Use case: Tiếp nhận và Phản hồi yêu cầu tra soát thụ động TCTLTS — Mã TS-014 (BF29.1-UC04)</div>
  <table class="uc-table">
    <tr><td class="field-name">Use Case</td><td class="field-value"><strong>Tiếp nhận và Phản hồi yêu cầu tra soát thụ động (TCTLTS — Chiều đến / Mã TS-014)</strong></td></tr>
    <tr><td class="field-name">ID</td><td class="field-value"><strong>DS01-UC04 / BF29.1-UC04</strong></td></tr>
    <tr><td class="field-name">Description</td><td class="field-value">Khi Cổng Service QR tiếp nhận YCTS thụ động từ Napas (Mã TS-014), Service QR sẽ gọi API đồng bộ dữ liệu sang MM và <strong>MM bắt buộc phải insert 01 bản ghi YCTS tại hệ thống MM với trạng thái Tiến trình ban đầu là "Chờ xử lý"</strong>. Sau đó Maker lập câu trả lời và trình Quản lý duyệt (Sơ đồ 2 Swimlanes TCTLTS).</td></tr>
    <tr><td class="field-name">Actor</td><td class="field-value">System QR, Maker (Chuyên viên Tra soát), Checker (Quản lý), Hệ thống MM, Napas</td></tr>
    <tr><td class="field-name">Trigger</td><td class="field-value">Cổng Service QR tiếp nhận thông điệp YCTS thụ động từ Napas gửi tới.</td></tr>
    <tr><td class="field-name">Pre-Condition</td><td class="field-value">Hệ thống tiếp nhận thành công thông điệp tra soát thụ động từ Napas.</td></tr>
    <tr><td class="field-name">Post-Condition</td><td class="field-value"><strong>Hệ thống MM đã insert 01 bản ghi YCTS ở Tiến trình "Chờ xử lý"</strong>. Khi Maker lập phản hồi, hệ thống chuyển YCTS sang Tiến trình "Chờ phê duyệt" và sinh bản ghi YCPD.</td></tr>
    <tr><td class="field-name">Basic flow (Luồng Phản hồi YCTS TCTLTS - 2 Swimlanes)</td><td class="field-value">1. Cổng Service QR nhận YCTS thụ động TS-014 từ Napas ➔ Kích hoạt API sang MM.<br/>2. <strong>Hệ thống MM tự động insert 01 bản ghi YCTS mới vào DB MM với trạng thái Tiến trình là "Chờ xử lý"</strong> (Service QR status = <code>OPEN</code>).<br/>3. Napas thông báo hết hạn SLA (<code>EXPI</code>) ➔ QR gửi mốc thời hạn ➔ MM cập nhật <strong>Trạng thái Tra soát Hết hạn</strong> từ <strong>"Chưa hết hạn"</strong> sang <strong>"Đã hết hạn"</strong>.<br/>4. Maker mở bản ghi TS-014 ở Tiến trình <strong>"Chờ xử lý"</strong> tại tab Tra soát đã nhận.<br/>5. Maker chọn Mã phản hồi (<code>PRCD — Đồng ý</code> hoặc <code>RJCD — Từ chối</code>), nhập Khung thông tin giao dịch hoàn trả (<code>950,000 VND</code>, <code>Toàn phần</code>), upload tệp minh chứng và nhập Ghi chú.<br/>6. Maker chọn <strong>[Gửi phê duyệt]</strong> ➔ Hệ thống chuyển YCTS sang Tiến trình <strong>"Chờ phê duyệt"</strong> và <strong>sinh ra 01 bản ghi YCPD mới</strong> ở trạng thái <code>ApprovePending</code> tại DB MM.<br/>7. Checker Phê duyệt (YCPD Approved) ➔ Hệ thống chuyển YCTS sang <strong>"Đã phê duyệt"</strong> ➔ Kích hoạt Service QR phát hành câu trả lời sang Napas.<br/>8. Napas phản hồi kết quả ➔ YCTS chuyển Tiến trình sang <strong>"Đã phản hồi"</strong> và gán <strong>Trạng thái xử lý YCTS tại Epay</strong> = <strong>"PRCD"</strong> (mã <code>PRCD</code>/<code>EXPR</code>) hoặc <strong>"RJCD"</strong> (mã <code>RJCD</code>/<code>EXRJ</code>).</td></tr>
    <tr><td class="field-name">Non-functional requirement</td><td class="field-value">Tự động insert bản ghi YCTS tại MM &lt; 1.0 giây từ khi nhận API Service QR.</td></tr>
  </table>

  <!-- BẢNG ĐẶC TẢ GIAO DIỆN CHUẨN EPAY-QT.CG.02_BM33 - UC04 -->
  <div style="font-weight:bold; color:#002D62; margin-top:12pt; margin-bottom:4pt;">Bảng Đặc tả Thành phần Giao diện Chuẩn Template (EPAY-QT.CG.02_BM33 - UC04 Response Screen)</div>
  <table class="wf-table">
    <thead>
      <tr>
        <th rowspan="2" style="width:20%;">Component Name</th>
        <th rowspan="2" style="width:12%;">Data Type</th>
        <th colspan="3" style="width:26%;">Validation rules</th>
        <th rowspan="2" style="width:42%;">Action rules</th>
      </tr>
      <tr>
        <th style="width:7%;">M/O/C</th>
        <th style="width:7%;">Editable</th>
        <th style="width:12%;">Other Validation</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Phản hồi tra soát thụ động TS-014</strong></td><td style="text-align:center;">Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>-</td><td>Tiêu đề màn hình Phản hồi YCTS chiều đến từ Napas (Maker View).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khối 0 (Tách riêng độc lập trên cùng): BỘ TIẾN TRÌNH TRẢ LỜI TRA SOÁT (6 BƯỚC CỦA LUỒNG TLTS CHUẨN SƠ ĐỒ)</td></tr>
      <tr><td><strong>Bộ tiến trình Trả lời tra soát 6 bước</strong></td><td style="text-align:center;">Stepper Widget</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>6 steps visual track</td><td>Thanh Tiến trình 6 bước chuẩn sơ đồ luồng TCTLTS Thụ động (Chờ xử lý ➔ Chờ phê duyệt ➔ Đã duyệt ➔ Chờ phản hồi ➔ Đã phản hồi ➔ Hoàn tất). KHÔNG CÓ bước Đã kiểm tra.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Banner Tiếp nhận YCTS Thụ động</td></tr>
      <tr><td><strong>Mã Tra soát thụ động</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị mã định danh tra soát do Napas cấp (VD: TS-014).</td></tr>
      <tr><td><strong>Tiến trình MM YCTS</strong></td><td style="text-align:center;">Badge Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị trạng thái Tiến trình Chờ xử lý (hoặc Chờ phê duyệt khi đang tồn tại YCPD).</td></tr>
      <tr><td><strong>Đơn vị khiếu nại</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị ngân hàng/đối tác phát hành khiếu nại (VD: Napas / Vietcombank).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khai báo Thông tin Trả lời</td></tr>
      <tr><td><strong>Mã phản hồi tra soát</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>PRCD / RJCD</td><td>Chọn kết quả trả lời: PRCD — Đồng ý hoặc RJCD — Từ chối.</td></tr>
      <tr><td><strong>Lý do từ chối chuẩn Napas</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Single selection</td><td>Bắt buộc chọn mã lý do từ chối chuẩn Napas khi chọn mã phản hồi RJCD.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khung Khởi tạo Thông tin Giao dịch Hoàn trả</td></tr>
      <tr><td><strong>Số tiền hoàn trả *</strong></td><td style="text-align:center;">Number Input</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>&gt; 0 và &lt;= Số tiền gốc</td><td>Bắt buộc nhập khi chọn PRCD. Mặc định bằng số tiền giao dịch gốc (950,000 VND).</td></tr>
      <tr><td><strong>Loại hoàn trả *</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Toàn phần / Một phần</td><td>Bắt buộc chọn khi chọn PRCD. Mặc định chọn Toàn phần.</td></tr>
      <tr><td><strong>Lý do hoàn trả *</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Max 255 ký tự</td><td>Bắt buộc nhập khi chọn PRCD (VD: Xác nhận giao dịch lỗi hệ thống, đề xuất hoàn tiền...).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Hồ sơ đính kèm &amp; Nội dung giải trình</td></tr>
      <tr><td><strong>Tệp minh chứng đính kèm</strong></td><td style="text-align:center;">Fileupload</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>PDF, PNG, JPG (Max 10MB)</td><td>Upload tệp chứng từ đối soát/chuyển khoản minh chứng (VD: minh_chung_chuyen_khoan.pdf).</td></tr>
      <tr><td><strong>Nội dung giải trình</strong></td><td style="text-align:center;">Textarea</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>Max 500 ký tự</td><td>Nhập diễn giải bổ sung gửi kèm câu trả lời cho Quản lý &amp; Napas.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Button chức năng</td></tr>
      <tr><td><strong>[✏️ Cập nhật trả lời]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Role Maker</td><td>Cập nhật thông tin YCPD tại DB MM, duy trì trạng thái Tiến trình Chờ phê duyệt.</td></tr>
      <tr><td><strong>[❌ Hủy bỏ yêu cầu]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Role Maker</td><td>Rút lại YCPD ➔ Chuyển YCPD status = Cancel, Tiến trình = Đã hủy.</td></tr>
      <tr><td><strong>[📤 Gửi yêu cầu phê duyệt]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Primary Action</td><td>Chuyển YCTS sang Tiến trình <strong>Chờ phê duyệt</strong> và <strong>sinh ra 01 bản ghi YCPD (ApprovePending)</strong> tại DB MM.</td></tr>
    </tbody>
  </table>

  <!-- ================= USE CASE 5 ================= -->
  <div class="uc-title" style="page-break-before:always;">2.1.1.5 Use case: Xem chi tiết yêu cầu tra soát (BF29.1-UC05)</div>
  <table class="uc-table">
    <tr><td class="field-name">Use Case</td><td class="field-value"><strong>Xem chi tiết &amp; Lịch sử xử lý tra soát</strong></td></tr>
    <tr><td class="field-name">ID</td><td class="field-value"><strong>DS01-UC05 / BF29.1-UC05</strong></td></tr>
    <tr><td class="field-name">Description</td><td class="field-value">Xem toàn bộ thông tin chi tiết của một yêu cầu tra soát bao gồm Cấu trúc Trạng thái 3 Nhóm (Tiến trình tra soát, Trạng thái xử lý YCTS: Đồng ý/Từ chối, Trạng thái Tra soát hết hạn: Hết hạn), thông tin GD gốc, chứng từ đính kèm và nhật ký lịch sử chuyển đổi trạng thái (Audit Trail: Chờ xử lý ➔ Đã kiểm tra ➔ Chờ phê duyệt ➔ Đã phê duyệt ➔ Chờ phản hồi ➔ Đã phản hồi ➔ Hoàn tất).</td></tr>
    <tr><td class="field-name">Actor</td><td class="field-value">Người dùng (Maker, Inspector, Checker, Operator, Admin)</td></tr>
    <tr><td class="field-name">Trigger</td><td class="field-value">Người dùng chọn 01 dòng bản ghi tra soát tại danh sách.</td></tr>
    <tr><td class="field-name">Pre-Condition</td><td class="field-value">Người dùng có quyền xem danh sách tra soát.</td></tr>
    <tr><td class="field-name">Post-Condition</td><td class="field-value">Hệ thống hiển thị toàn bộ màn hình chi tiết và tab Lịch sử xử lý.</td></tr>
    <tr><td class="field-name">Basic flow</td><td class="field-value">1. Người dùng bấm vào Mã tra soát (ví dụ: <code>TS-014</code>).<br/>2. Màn hình Chi tiết hiển thị các khối thông tin bóc tách chuẩn: Khối 1 (THÔNG TIN TRA SOÁT - bao gồm Badge Tiến trình tra soát, Badge Trạng thái xử lý YCTS, Badge Trạng thái Hết hạn), Khối 2 (THÔNG TIN GIAO DỊCH GỐC), Khối 3 (THÔNG TIN KHÁC), Khối 4 (XỬ LÝ &amp; PHẢN HỒI).<br/>3. Người dùng chọn tab <strong>[Lịch sử xử lý]</strong>.<br/>4. Hệ thống hiển thị timeline chi tiết từng mốc thời gian, thao tác, người thực hiện và trạng thái DB MM / Service QR tương ứng.</td></tr>
    <tr><td class="field-name">Non-functional requirement</td><td class="field-value">Tải màn hình chi tiết và lịch sử trong vòng &lt; 1.5 giây.</td></tr>
  </table>

  <!-- BẢNG ĐẶC TẢ GIAO DIỆN CHUẨN EPAY-QT.CG.02_BM33 - UC05 -->
  <div style="font-weight:bold; color:#002D62; margin-top:12pt; margin-bottom:4pt;">Bảng Đặc tả Thành phần Giao diện Chuẩn Template (EPAY-QT.CG.02_BM33 - UC05 Detail View Screen)</div>
  <table class="wf-table">
    <thead>
      <tr>
        <th rowspan="2" style="width:20%;">Component Name</th>
        <th rowspan="2" style="width:12%;">Data Type</th>
        <th colspan="3" style="width:26%;">Validation rules</th>
        <th rowspan="2" style="width:42%;">Action rules</th>
      </tr>
      <tr>
        <th style="width:7%;">M/O/C</th>
        <th style="width:7%;">Editable</th>
        <th style="width:12%;">Other Validation</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Chi tiết Yêu cầu Tra soát</strong></td><td style="text-align:center;">Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>-</td><td>Tiêu đề màn hình xem chi tiết bản ghi tra soát.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khối 0 (Tách riêng độc lập trên cùng): BỘ TIẾN TRÌNH TRA SOÁT / TRẢ LỜI TRA SOÁT</td></tr>
      <tr><td><strong>Bộ tiến trình Quy trình</strong></td><td style="text-align:center;">Stepper Widget</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Visual Stepper Track</td><td>Hiển thị thanh Tiến trình tương ứng theo chuẩn sơ đồ từng Luồng nghiệp vụ:<br/>- <strong>Luồng YCTS (Chủ động/Chiều đi):</strong> Bộ 7 bước (Chờ xử lý ➔ Đã kiểm tra ➔ Chờ phê duyệt ➔ Đã duyệt ➔ Chờ phản hồi ➔ Hệ thống xử lý ➔ Hoàn tất).<br/>- <strong>Luồng TLTS (Thụ động/Chiều đến):</strong> Bộ 6 bước chuẩn sơ đồ TCTLTS (Chờ xử lý ➔ Chờ phê duyệt ➔ Đã duyệt ➔ Chờ phản hồi ➔ Đã phản hồi ➔ Hoàn tất).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khối 1: THÔNG TIN TRA SOÁT (DISPUTE INFO - CÁC TRƯỜNG BẮT BUỘC NHẬP KHI TẠO/SỬA YCTS)</td></tr>
      <tr><td><strong>Mã tra soát</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: TS-011)</td><td>Hệ thống tự động sinh Mã tra soát duy nhất.</td></tr>
      <tr><td><strong>Tiến trình tra soát (MM)</strong></td><td style="text-align:center;">Badge Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>🔵 Đã kiểm tra</td><td>Badge hiển thị 1 trong 9 mốc tiến trình YCTS.</td></tr>
      <tr><td><strong>Trạng thái xử lý YCTS</strong></td><td style="text-align:center;">Badge Label</td><td style="text-align:center;">O</td><td style="text-align:center;">N</td><td>Read-only (VD: 🟢 Đồng ý / 🔴 Từ chối / —)</td><td>Kết quả phản hồi từ Ngân hàng đối tác.</td></tr>
      <tr><td><strong>Trạng thái TS hết hạn</strong></td><td style="text-align:center;">Badge Label</td><td style="text-align:center;">O</td><td style="text-align:center;">N</td><td>Read-only (VD: — / Hết hạn)</td><td>Tình trạng quá hạn SLA tra soát.</td></tr>
      <tr><td><strong>Loại tra soát (*)</strong></td><td style="text-align:center;">Select / Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Mặc định: RQSP — Sai sót nghiệp vụ</td><td>Loại tra soát cố định theo quy định luồng YCTS.</td></tr>
      <tr><td><strong>Vai trò tra soát</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>TCYCTS</td><td>Vai trò đơn vị khởi tạo tra soát (Tổ chức yêu cầu tra soát).</td></tr>
      <tr><td><strong>Lý do tra soát (*)</strong></td><td style="text-align:center;">Select / Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Mặc định: BANK — Ngân hàng đối tác yêu cầu</td><td>Mã lý do tra soát cố định theo quy định.</td></tr>
      <tr><td><strong>Số tiền tra soát (*)</strong></td><td style="text-align:center;">Number Input (Editable)</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Format: #,##0 VND (VD: 600,000 VND)</td><td><strong>TRƯỜNG BẮT BUỘC NHẬP (*):</strong> Người tạo nhập số tiền yêu cầu tra soát/hoàn trả.</td></tr>
      <tr><td><strong>Tệp đính kèm (Ảnh bill/minh chứng) (*)</strong></td><td style="text-align:center;">File Upload Input (Editable)</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>File Link (VD: 📎 bill_chuyen_tien.png 1.2 MB)</td><td><strong>TRƯỜNG BẮT BUỘC NỔI (*)</strong>: Người tạo bắt buộc đính kèm minh chứng bill chuyển tiền / chứng từ giao dịch (.png, .jpg, .pdf).</td></tr>
      <tr><td><strong>Nội dung mô tả chi tiết (*)</strong></td><td style="text-align:center;">Textarea (Editable)</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Text (VD: Khách hàng báo đã chuyển khoản thành công...)</td><td><strong>TRƯỜNG BẮT BUỘC NHẬP (*):</strong> Diễn giải chi tiết nội dung tình huống tra soát để làm căn cứ xử lý.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khối 2: THÔNG TIN GIAO DỊCH GỐC (Layout 3 Cột, Accordion Header "Thông tin giao dịch")</td></tr>
      <tr><td><strong>Mã giao dịch</strong></td><td style="text-align:center;">Textbox / Link</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Text xanh dương bold (VD: TX-10012)</td><td>Hiển thị Mã giao dịch thanh toán gốc dưới dạng link liên kết.</td></tr>
      <tr><td><strong>Trạng thái giao dịch</strong></td><td style="text-align:center;">Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Text xanh dương bold (VD: Thành công)</td><td>Hiển thị trạng thái giao dịch thanh toán gốc tại hệ thống CTT.</td></tr>
      <tr><td><strong>Merchant Code</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: PAYME_MERCHANT)</td><td>Mã đơn vị chấp nhận thanh toán (Merchant).</td></tr>
      <tr><td><strong>Ngày giao dịch</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Format: DD/MM/YYYY HH:mm:ss</td><td>Hiển thị ngày giờ thực hiện giao dịch gốc (VD: 24/03/2024 09:00:04).</td></tr>
      <tr><td><strong>Số tiền giao dịch</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Format: #,##0 VND</td><td>Hiển thị tổng số tiền gốc của giao dịch (VD: 145,000 VND).</td></tr>
      <tr><td><strong>Đối tác thanh toán</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: Napas)</td><td>Kênh / Đối tác xử lý giao dịch gốc.</td></tr>
      <tr><td><strong>Loại giao dịch</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: Thanh toán)</td><td>Phân loại giao dịch gốc (Thanh toán hàng hóa/dịch vụ).</td></tr>
      <tr><td><strong>Loại QR</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: Dynamic QR)</td><td>Loại mã QR thanh toán (Dynamic QR / Static QR).</td></tr>
      <tr><td><strong>Mã đơn hàng</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: 1722248884716)</td><td>Mã đơn hàng ghi nhận từ phía Merchant.</td></tr>
      <tr><td><strong>PTTT</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: VietQR)</td><td>Phương thức thanh toán giao dịch gốc.</td></tr>
      <tr><td><strong>Loại dịch vụ</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: Thanh toán)</td><td>Loại hình dịch vụ thanh toán.</td></tr>
      <tr><td><strong>Mã GD với CTT</strong></td><td style="text-align:center;">Textbox / Link</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Text xanh gạch chân (VD: EPAYPW00339312)</td><td>Mã tham chiếu giao dịch nội bộ lưu tại Cổng thanh toán epay.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khối Thông tin Giao dịch Báo có (Chỉ hiển thị khi YCTS được Đã phản hồi &amp; Đồng ý - 6 Trường chuẩn)</td></tr>
      <tr><td><strong>Mã giao dịch báo có</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Text xanh lá bold (VD: CR-990300)</td><td>Hiển thị Mã giao dịch báo có do CTT / Napas xử lý hoàn tiền thành công.</td></tr>
      <tr><td><strong>Mã GD báo có đối tác</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: NP-CR-990300)</td><td>Mã tham chiếu giao dịch báo có đối tác Napas.</td></tr>
      <tr><td><strong>Số tiền báo có</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Format: #,##0 VND (VD: 1,200,000 VND)</td><td>Hiển thị số tiền báo có chuyển về tài khoản.</td></tr>
      <tr><td><strong>Trạng thái báo có</strong></td><td style="text-align:center;">Badge Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>🟢 Thành công</td><td>Trạng thái thực thi giao dịch báo có.</td></tr>
      <tr><td><strong>Thời gian báo có</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Format: YYYY-MM-DD HH:mm:ss</td><td>Thời điểm ghi nhận giao dịch báo có (VD: 2026-07-21 16:30:00).</td></tr>
      <tr><td><strong>Tổ chức báo có</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: Napas)</td><td>Tổ chức ngân hàng/đơn vị báo có.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khối Thông tin Xử lý (Kỹ thuật/Kế toán xác minh - Áp dụng từ mốc Đã kiểm tra trở đi)</td></tr>
      <tr><td><strong>Loại yêu cầu xử lý</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: Loại 2: Yêu cầu xử lý tạo mới giao dịch)</td><td>Loại yêu cầu xử lý do Kỹ thuật kiểm tra thiết lập.</td></tr>
      <tr><td><strong>Mô tả tình huống</strong></td><td style="text-align:center;">Textarea</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: QRGW ghi nhận giao dịch thanh toán thành công...)</td><td>Diễn giải mô tả chi tiết tình huống lỗi/sai lệch.</td></tr>
      <tr><td><strong>Yêu cầu</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: Yêu cầu xử lý giao dịch: TT202454545000)</td><td>Chi tiết nội dung đề xuất xử lý.</td></tr>
      <tr><td><strong>Xác minh tình trạng (trước/sau xử lý)</strong></td><td style="text-align:center;">File Upload Button &amp; File List</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Button [🔒 Chọn file] &amp; List tệp log (File log.txt...)</td><td>Danh sách các tệp log/chứng từ kỹ thuật xác minh nguyên nhân.</td></tr>
      <tr><td><strong>Kỹ thuật xác nhận nguyên nhân</strong></td><td style="text-align:center;">Textarea</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only (VD: Xác nhận trạng thái giao dịch ghi nhận tại QRGW là Thành công...)</td><td>Ý kiến đánh giá và kết luận nguyên nhân từ bộ phận Kỹ thuật.</td></tr>
      <tr><td><strong>Kế toán xác nhận nguyên nhân</strong></td><td style="text-align:center;">Textarea</td><td style="text-align:center;">O</td><td style="text-align:center;">N</td><td>Read-only (VD: -)</td><td>Ý kiến đánh giá nguyên nhân đối soát từ bộ phận Kế toán.</td></tr>
      <tr><td><strong>Người phê duyệt</strong></td><td style="text-align:center;">Select &amp; Button [🔄 Thay đổi]</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Select (VD: tuandt)</td><td>Chỉ định Quản lý (Checker) tiếp nhận và duyệt yêu cầu.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khối 3: THÔNG TIN KHÁC</td></tr>
      <tr><td><strong>Merchant Code</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị mã ĐVCNTT quản lý giao dịch (VD: MERCHANT_02). Căn phải value slot.</td></tr>
      <tr><td><strong>Người khởi tạo</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị tên tài khoản Maker tạo yêu cầu (VD: creator01). Căn phải value slot.</td></tr>
      <tr><td><strong>Thời hạn SLA xử lý</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị mốc thời gian quá hạn SLA (VD: 2026-07-27 17:00). Căn phải value slot.</td></tr>
      <tr><td><strong>Quản lý phê duyệt</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">O</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị tên tài khoản Checker đã duyệt (VD: Lisa). Căn phải value slot.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khối 4: XỬ LÝ &amp; PHẢN HỒI (Audit Trail Timeline)</td></tr>
      <tr><td><strong>Nhật ký tiến trình xử lý</strong></td><td style="text-align:center;">Timeline Block</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only Timeline</td><td>Hiển thị dòng thời gian tự động các mốc: Chờ xử lý ➔ Đã kiểm tra ➔ Chờ phê duyệt ➔ Đã phê duyệt ➔ Chờ phản hồi ➔ Đã phản hồi (Đồng ý/Từ chối) ➔ Hoàn tất.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Button chức năng</td></tr>
      <tr><td><strong>In phiếu tra soát</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>-</td><td>Nhấp nút này để mở giao diện xem trước trang in phiếu tra soát dạng PDF.</td></tr>
      <tr><td><strong>Quay lại danh sách</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>-</td><td>Nhấp nút này để đóng màn hình chi tiết và quay lại màn hình danh sách tra soát.</td></tr>
    </tbody>
  </table>

  <!-- ================= USE CASE 6 ================= -->
  <div class="uc-title" style="page-break-before:always;">2.1.1.6 Use case: Cập nhật / Chỉnh sửa yêu cầu tra soát &amp; Hủy bỏ YCPD (BF29.1-UC06)</div>
  <table class="uc-table">
    <tr><td class="field-name">Use Case</td><td class="field-value"><strong>Cập nhật / Chỉnh sửa yêu cầu tra soát &amp; Hủy bỏ YCPD (Role Maker)</strong></td></tr>
    <tr><td class="field-name">ID</td><td class="field-value"><strong>DS01-UC06 / BF29.1-UC06</strong></td></tr>
    <tr><td class="field-name">Description</td><td class="field-value">Quy định chi tiết các quyền Cập nhật thông tin và Hủy bỏ yêu cầu của Maker tại các mốc Tiến trình <strong>"Chờ xử lý"</strong>, <strong>"Đã kiểm tra"</strong> và <strong>"Chờ phê duyệt"</strong>.</td></tr>
    <tr><td class="field-name">Actor</td><td class="field-value">Maker (Chuyên viên Tra soát / Thu ngân), Hệ thống MM</td></tr>
    <tr><td class="field-name">Trigger</td><td class="field-value">Maker mở bản ghi tra soát ở Tiến trình <code>Chờ xử lý</code>, <code>Đã kiểm tra</code> hoặc <code>Chờ phê duyệt</code>.</td></tr>
    <tr><td class="field-name">Pre-Condition</td><td class="field-value">- Maker là người tạo YCTS/YCPD ban đầu.<br/>- YCTS đang ở Tiến trình <code>Chờ xử lý</code>, <code>Đã kiểm tra</code> hoặc <code>Chờ phê duyệt</code>.</td></tr>
    <tr><td class="field-name">Post-Condition</td><td class="field-value">- <strong>Tại "Chờ xử lý" / "Đã kiểm tra":</strong> Cho phép Maker <strong>Cập nhật thông tin</strong> hoặc bấm <strong>Hủy yêu cầu</strong> (Tiến trình ➔ <code>Đã hủy</code>).<br/>- <strong>Tại "Chờ phê duyệt":</strong> Cho phép Maker <strong>Cập nhật thông tin</strong> (duy trì YCPD ApprovePending) hoặc <strong>Hủy bỏ YCPD</strong> (chuyển YCPD thành <em>Cancel</em>, Tiến trình YCTS ➔ <code>Đã hủy</code>).</td></tr>
    <tr><td class="field-name">Basic flow (Luồng Cập nhật ở Trạng thái Đã kiểm tra)</td><td class="field-value">1. Maker truy cập màn hình chi tiết YCTS đang ở Tiến trình <strong>"Đã kiểm tra"</strong>.<br/>2. Maker chọn <strong>[✏️ Cập nhật thông tin]</strong>.<br/>3. Điều chỉnh lại Lý do, Số tiền tra soát, Tệp đính kèm hoặc Ghi chú.<br/>4. Maker chọn <strong>[Lưu thông tin]</strong> (duy trì Tiến trình <em>Đã kiểm tra</em>) hoặc chọn <strong>[📤 Gửi yêu cầu phê duyệt]** (chuyển YCTS sang Tiến trình <em>Chờ phê duyệt</em> và <strong>sinh ra bản ghi YCPD</strong> tại DB MM).</td></tr>
    <tr><td class="field-name">Alternative flow (Luồng Hủy bỏ ở Trạng thái Chờ xử lý / Chờ phê duyệt)</td><td class="field-value">1. Maker truy cập màn hình chi tiết YCTS ở Tiến trình <strong>"Chờ xử lý"</strong> hoặc <strong>"Chờ phê duyệt"</strong>.<br/>2. Maker chọn <strong>[❌ Hủy bỏ yêu cầu]</strong>.<br/>3. Hệ thống mở popup xác nhận hủy. Khi Maker đồng ý, hệ thống cập nhật YCPD status = <em>Cancel</em> (nếu có) và chuyển trạng thái Tiến trình YCTS thành <strong>"Đã hủy"</strong>.</td></tr>
    <tr><td class="field-name">Non-functional requirement</td><td class="field-value">Xử lý cập nhật / hủy bỏ YCPD &lt; 1.5 giây.</td></tr>
  </table>

  <!-- BẢNG ĐẶC TẢ GIAO DIỆN CHUẨN EPAY-QT.CG.02_BM33 - UC06 -->
  <div style="font-weight:bold; color:#002D62; margin-top:12pt; margin-bottom:4pt;">Bảng Đặc tả Thành phần Giao diện Chuẩn Template (EPAY-QT.CG.02_BM33 - UC06 Edit Screen)</div>
  <table class="wf-table">
    <thead>
      <tr>
        <th rowspan="2" style="width:20%;">Component Name</th>
        <th rowspan="2" style="width:12%;">Data Type</th>
        <th colspan="3" style="width:26%;">Validation rules</th>
        <th rowspan="2" style="width:42%;">Action rules</th>
      </tr>
      <tr>
        <th style="width:7%;">M/O/C</th>
        <th style="width:7%;">Editable</th>
        <th style="width:12%;">Other Validation</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Cập nhật / Hủy bỏ Yêu cầu Phê duyệt</strong></td><td style="text-align:center;">Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>-</td><td>Tiêu đề màn hình Điều chỉnh &amp; Hủy bỏ dành cho Chuyên viên (Maker View).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Banner Trạng thái YCTS &amp; YCPD</td></tr>
      <tr><td><strong>Trạng thái Tiến trình hiện tại</strong></td><td style="text-align:center;">Badge Label</td><td style="text-align:center;">M</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị trạng thái Tiến trình (Chờ xử lý, Đã kiểm tra hoặc Chờ phê duyệt).</td></tr>
      <tr><td><strong>Mã YCPD liên quan</strong></td><td style="text-align:center;">Textbox</td><td style="text-align:center;">O</td><td style="text-align:center;">N</td><td>Read-only</td><td>Hiển thị mã YCPD (VD: YCPD-014 khi ở Tiến trình Chờ phê duyệt).</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Khung Điều chỉnh Thông tin Hoàn trả / Tra soát</td></tr>
      <tr><td><strong>Số tiền hoàn trả / tra soát</strong></td><td style="text-align:center;">Number Input</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>&gt; 0 và &lt;= Số tiền gốc</td><td>Cho phép Maker điều chỉnh lại số tiền cần tra soát/hoàn trả (VD: 950,000 VND).</td></tr>
      <tr><td><strong>Loại hoàn trả</strong></td><td style="text-align:center;">Dropdown list</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Toàn phần / Một phần</td><td>Cho phép chọn loại hình hoàn tiền toàn phần hoặc một phần.</td></tr>
      <tr><td><strong>Lý do tra soát / giải trình</strong></td><td style="text-align:center;">Textarea</td><td style="text-align:center;">M</td><td style="text-align:center;">Y</td><td>Max 500 ký tự</td><td>Cho phép nhập/chỉnh sửa nội dung diễn giải nguyên nhân tra soát.</td></tr>
      <tr><td><strong>Quản lý Tệp chứng từ</strong></td><td style="text-align:center;">Fileupload</td><td style="text-align:center;">O</td><td style="text-align:center;">Y</td><td>PDF, PNG, JPG (Max 10MB)</td><td>Cho phép xóa tệp đính kèm cũ hoặc tải bổ sung tệp minh chứng mới.</td></tr>
      <tr class="wf-divider-row"><td colspan="6">Button chức năng Thao tác</td></tr>
      <tr><td><strong>[✏️ Cập nhật thông tin]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Role Maker</td><td>Cập nhật dữ liệu YCTS &amp; YCPD mới tại DB MM, duy trì trạng thái Tiến trình hiện tại.</td></tr>
      <tr><td><strong>[📤 Gửi lại phê duyệt]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Role Maker &amp; Đã kiểm tra</td><td>Chuyển YCTS từ Đã kiểm tra sang Tiến trình <strong>Chờ phê duyệt</strong> và <strong>sinh ra bản ghi YCPD</strong> tại DB MM.</td></tr>
      <tr><td><strong>[❌ Hủy bỏ yêu cầu]</strong></td><td style="text-align:center;">Button</td><td style="text-align:center;">C</td><td style="text-align:center;">Y</td><td>Role Maker</td><td>Mở popup xác nhận hủy. Khi đồng ý, cập nhật Tiến trình YCTS thành <strong>Đã hủy</strong> (YCPD Cancel), đóng luồng trình duyệt.</td></tr>
    </tbody>
  </table>

  <!-- FOOTER -->
  <table class="footer-table">
    <tr>
      <td style="border:none; text-align:left;">EPAY-QT.CG.02_BM33</td>
      <td style="border:none; text-align:center;">Lưu hành nội bộ</td>
      <td style="border:none; text-align:right;">Trang 25 / 25</td>
    </tr>
  </table>

</body>
</html>
`;

const srsDir = 'd:\\BA Master Flow\\docs\\dispute-management\\srs';
const targetWordFile = path.join(srsDir, 'dispute-management-usecases.doc');
fs.writeFileSync(targetWordFile, wordDocHtml, 'utf-8');
console.log('🎉 Đã xuất thành công tệp Word CHO TẤT CẢ 3 LUỒNG (TCYCTS CÓ KIỂM TRA, TCYCTS KHÔNG KIỂM TRA & TCTLTS TRẢ LỜI TRA SOÁT)!');

/* 
DANH SÁCH BẢN GHI ĐẦY ĐỦ CHO TAB TRA SOÁT ĐÃ NHẬN (TCTLTS):
1. Trạng thái "Chờ xử lý": 
   - TS-014 (Mã RQRN - Yêu cầu hoàn trả): Chọn "PRCD - Đồng ý" hiển thị Khối thông tin giao dịch hoàn trả; Chọn "RJCD - Từ chối" tự động ẩn Khối hoàn trả.
   - TS-018 (Mã RQSP - Lý do BANK): Chọn "PRCD - Đồng ý" hiển thị Khối thông tin báo có; Chọn "RJCD - Từ chối" tự động ẩn Khối báo có.
2. Trạng thái "Chờ phê duyệt": TS-016 (Mã RQRN - Chờ Checker phê duyệt câu trả lời).
3. Trạng thái "Đã duyệt": TS-017 (Mã RQSP-BANK - Checker đã duyệt phản hồi phát hành Napas).
4. Trạng thái "Đã nhận phản hồi đối tác" / "Đã phản hồi":
   - TS-015 (Mã RQRN): Phản hồi YCTS "PRCD — Đồng ý", Khối thông tin giao dịch hoàn trả có trạng thái "Thành công" 🟢.
   - TS-019 (Mã RQSP-BANK): Phản hồi YCTS "RJCD — Từ chối", Khối thông tin báo có có trạng thái "Thất bại" 🔴.
5. Trạng thái "Hoàn tất": TS-008 (Đã đóng tiến trình tra soát thụ động). */
