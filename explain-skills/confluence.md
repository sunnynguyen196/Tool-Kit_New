---
type: skill-explainer
skill: confluence
updated: 2026-07-26
---

# `/confluence` là gì và nó chạy như thế nào?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

> Lệnh này là **người anh em song sinh** của `/jira`. Nếu bạn chưa đọc `explain-skills/jira.md`, nên đọc trước — vì các ý tưởng cốt lõi (**sổ liên kết**, **so sánh 3 phía**, **kiểm tra lại trước khi ghi đè**, **cầu nối MCP**) là **chung** cho cả hai, giải thích kỹ ở đó. Tài liệu này tập trung vào phần **riêng của Confluence**.

## 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

`/confluence` là lệnh để **đồng bộ hai chiều** giữa **tài liệu mô tả** bạn viết ở máy (URD, BRD, PRD, đặc tả SRS, use case, mô tả màn hình...) và các **trang (page)** trên **Confluence** — nơi cả công ty (kể cả người không rành kỹ thuật: sếp, khách hàng, kế toán...) vào đọc và bình luận.

Khác biệt cốt lõi so với `/jira`:
* `/jira` lo **công việc** (ai làm gì, tới đâu) — dành cho đội dev/PM.
* `/confluence` lo **nội dung để đọc** (tính năng này là gì, hoạt động ra sao) — dành cho người đọc, để họ hiểu và góp ý.

Vài tình huống điển hình nên dùng `/confluence`:

* Bạn viết xong tài liệu tính năng "thanh toán", muốn đưa lên Confluence cho sếp và khách hàng đọc, xem sơ đồ, để lại bình luận.
* Có người vừa sửa một trang trên Confluence (hoặc để lại bình luận), bạn muốn mang thay đổi/góp ý đó về lại tài liệu gốc.
* Sếp đưa link một trang Confluence có sẵn và bảo "lấy về đây làm tài liệu".

Gõ đơn giản như:

```
/confluence payment
```

Chỉ gõ vậy là chế độ **chỉ xem** — so sánh hai bên, in bảng lệch/khớp, **không đụng gì cả**. Bốn chế độ (`--push` đẩy lên, `--pull` kéo về, `--reconcile` hòa giải chỗ đụng nhau, `import <trang>` lấy trang có sẵn về) hoạt động **giống hệt `/jira`** — xem Mục 2 của `explain-skills/jira.md`.

> **Một câu để nhớ:** `/confluence` = "giữ cho các trang tài liệu trên Confluence và tài liệu gốc ở máy luôn nói giống nhau — và luôn cho bạn xem trước khi đổi bất cứ bên nào".

---

## 2. Mapping — vì sao cần, và vì sao gộp chung với `/jira`‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Lý do cần sổ liên kết đã giải thích kỹ ở `/jira` Mục 3 (tóm tắt: để **không tạo trang trùng** mỗi lần đẩy, và để biết **ai đã sửa gì** kể từ lần đồng bộ trước). Với Confluence cũng đúng y hệt: trang trên Confluence mang một mã số riêng (ví dụ `67901`), không liên quan gì về chữ nghĩa với tên file ở máy (`payment-prd.md`) — nên cần một dòng ghi lại sự liên kết *"`payment-prd.md` = trang `67901`"*.

**Điểm đáng nói riêng: cuốn sổ này là MỘT, gộp chung cả Jira lẫn Confluence.** Vì sao lại gộp thay vì mỗi bên một sổ?

Hãy hình dung: một user story `us-003` của bạn vừa là **một công việc trên Jira** (`PAY-123`), vừa có thể xuất hiện như **một trang mô tả trên Confluence** (`67905`). Nếu để hai cuốn sổ riêng, muốn biết "story này đang nằm ở đâu, khớp chưa" bạn phải tra hai chỗ, và hai chỗ rất dễ **lệch nhau** theo thời gian (sổ Jira ghi một kiểu, sổ Confluence ghi kiểu khác).

Gộp làm một cuốn (`sync-state.yaml`) thì **tra một chỗ ra hết**: `us-003` ứng với công việc Jira nào, trang Confluence nào, mỗi bên khớp tới đâu — gọn và khỏi lệch.

---

## 3. Bốn thứ RIÊNG của Confluence mà Jira không có‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Vì Confluence là "nơi đọc" chứ không phải "bảng công việc", nó có mấy đặc thù mà `/confluence` phải xử lý khéo:

### (a) Cây trang (page tree) — tài liệu có thứ bậc cha–con‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Trên Confluence, các trang xếp thành **cây có thứ bậc**: một trang "Tính năng thanh toán" (trang cha) có các trang con "URD", "BRD", "Các màn hình"... Khi đẩy lên, `/confluence` dựng đúng cây đó cho gọn gàng, dễ điều hướng. Khi **lấy về** (`import`) một cây trang có sẵn, nó lấy cả cây con — và ghi **mỗi trang con một dòng trong sổ liên kết** (không gộp mù thành một), để lần sau đồng bộ đúng từng trang.

### (b) Bình luận (comment) — góp ý, KHÔNG phải nội dung chính thức

Người đọc trên Confluence hay để lại bình luận ("chỗ này nên thêm điều kiện X", "câu này chưa rõ"...). Đây là **góp ý quý giá nhưng chưa phải yêu cầu chính thức**. Nếu trộn thẳng bình luận vào nội dung tài liệu, tài liệu sẽ biến thành một mớ hỗn độn giữa "điều đã chốt" và "ý kiến đang bàn".

Vì vậy `/confluence` mang bình luận về một **"hộp thư góp ý" riêng** (kèm tên người, ngày, link tới đúng chỗ trên Confluence), để bạn xem xét từng cái: tiếp thu / bỏ qua / lập yêu-cầu-thay-đổi. Tài liệu gốc **không bị bình luận làm vấy bẩn**.

### (c) Nội dung "đặc thù Confluence" không chuyển sạch được — vùng "giữ nguyên"

Trên Confluence có những thứ **không có bản tương đương ở tài liệu văn bản thuần** của bạn: sơ đồ vẽ bằng tiện ích riêng, tệp đính kèm, khung màu, bình luận gắn giữa dòng... Khi kéo về, những thứ này **không thể "dịch" sạch sang văn bản ở máy**.

`/confluence` xử lý cẩn thận: nó **giữ nguyên bản gốc của những phần đó từ Confluence** (gọi là "vùng giữ nguyên"), chỉ chèn một dấu-chỗ trong tài liệu ở máy để bạn thấy "ở đây có sơ đồ/tệp đính kèm". Quan trọng: **nó tuyệt đối không tự coi là "đã khớp xong" chỉ vì đã chèn dấu-chỗ** — vì nếu lần sau đẩy ngược lên mà dựng lại trang từ bản văn bản thiếu mấy phần đó, sơ đồ/đính kèm trên Confluence sẽ **bị xóa mất**. Nên chừng nào bạn chưa quyết "phần này lấy bên nào làm chuẩn", nó **chặn không cho đẩy đè** phần đó.

### (d) Sơ đồ (mermaid) — lệnh lo việc hiển thị

Tài liệu của bạn hay có sơ đồ luồng vẽ bằng "mermaid". Confluence **không tự vẽ được** loại sơ đồ này — dán thẳng vào thì người đọc chỉ thấy một đống mã.

Khi đẩy lên, `/confluence` kiểm xem Confluence bên bạn hiển thị được sơ đồ không, rồi chọn một trong ba đường:

* **Hiển thị được** (Confluence đã cài phần mở rộng vẽ sơ đồ) → chèn sơ đồ, lên trang xem được hình ngay.
* **Không hiển thị được** → vẽ sẵn thành **ảnh** rồi đưa ảnh lên. Người đọc vẫn thấy hình, chỉ là không sửa trực tiếp trên Confluence được.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍
* **Không xác định được** → **hỏi bạn chọn**, ngay ở bước duyệt kế hoạch.

---

## 4. Luồng chạy — giống `/jira`, khác vài chỗ

Luồng tổng thể **giống hệt `/jira`** (xem sơ đồ Mục 4 ở đó): kết nối → mở sổ liên kết → lấy bản mới nhất + so 3 phía → in bảng đối chiếu → (nếu có cờ) kiểm tra lại lần cuối → xem trước rồi ghi → cập nhật sổ. Vài khác biệt của Confluence:

* **Bước so sánh** phân biệt **ba tình huống** dễ bị lẫn:

  | Trang trên Confluence | Hệ thống làm gì |
  |---|---|
  | Bị **chuyển sang chỗ khác** (vẫn còn) | Cập nhật vị trí, không báo động |
  | Bị **xóa hẳn** | Hỏi bạn: tạo lại hay bỏ ghép nối. **Không tự xóa** tài liệu ở máy |
  | Còn đó nhưng bạn **hết quyền** | Báo bạn đi xin quyền. Không nhầm thành "đã xóa", không tự tạo bản khác (đẻ trang trùng lặp) |
* **Bước ghi (kéo về)** có thêm việc **giữ vùng "giữ nguyên"** như nói ở Mục 3(c).
* **Chống ghi đè:** giống `/jira`, trước khi đẩy đè một trang, hệ thống lấy lại bản mới nhất và so — nếu vừa có người sửa thì dừng, không đè. (Chi tiết vì sao ở `/jira` Mục 5.)
* **Chặn cứng tài liệu "lỗi thời" (stale):** cũng giống `/jira`, trang nào có tài liệu gốc đã đổi mà chưa đối chiếu lại thì **bị từ chối đẩy lên, không có cách ép qua**. Ở Confluence điều này còn đáng ngại hơn: người đọc trang Confluence thường là **khách hàng hoặc phòng ban khác** — họ không có cách nào biết bản họ đang đọc đã lỗi thời. Gỡ bằng cách chạy `/cr` đối chiếu cho hết stale rồi đẩy lại. (Chi tiết ở `/jira` Mục 6.)
* **Vùng "giữ nguyên" chưa chốt cũng chặn đẩy** — xem Mục 3(c).

---

## 5. Kết nối tới Confluence — hiện chỉ hỗ trợ bản Cloud

Phần này **giống hệt `/jira`** (xem Mục 6 ở đó), chỉ đổi tên hệ thống. Tóm tắt lại vì rất hay gặp:

* **Confluence Cloud** (của Atlassian, `*.atlassian.net`): có sẵn cầu nối MCP chính thức, đăng nhập một lần là dùng.

* **Confluence tự quản (công ty tự cài) — hiện CHƯA dùng được**, giống hệt `/jira` (xem `/jira` Mục 7). Cầu nối chính thức chỉ nói chuyện với bản Cloud. Lối đi thay thế: để lệnh soạn nội dung rồi bạn tự đưa lên, hoặc nhờ đội kỹ thuật phát triển thêm.

* **Với bản Cloud**, trước khi trình kế hoạch cho bạn duyệt, hệ thống luôn **dò xem cầu nối làm được gì** — đặc biệt ba khả năng Confluence hay cần: tải tệp đính kèm, đọc bình luận, hiển thị sơ đồ. Thiếu khả năng nào thì báo rõ và đề xuất cách thay thế ngay từ đầu, không để duyệt xong mới phát hiện bất khả thi.

> Chìa khóa đăng nhập chỉ nằm trong cấu hình kết nối, **không ghi vào tài liệu hay sổ liên kết** (sổ này thường chia sẻ chung cả nhóm).

---

## 6. Ví dụ thực tế

Chị **Hà**, BA tính năng "thanh toán", đã đẩy user story lên Jira xong (bằng `/jira`). Giờ chị muốn đưa **tài liệu mô tả** lên Confluence cho khách hàng đọc và góp ý. Công ty chị dùng Confluence Cloud.

1. Lần đầu, hệ thống dò khả năng của cầu nối: đọc/tạo/sửa trang được, đọc bình luận được, nhưng **chưa có phần mở rộng vẽ sơ đồ**. Nó báo ngay và đề xuất chuyển sơ đồ thành ảnh. Chị Hà đồng ý.

2. Chị gõ `/confluence payment` (chỉ xem). Hệ thống báo: chưa trang nào tồn tại, đề xuất dựng cây trang mới (trang cha "Payment" + các trang con URD/BRD/PRD/SRS/màn hình).

3. Chị gõ `/confluence payment --push`. Hệ thống hỏi vài thứ lần đầu (đưa vào "không gian" nào trên Confluence, có cài tiện ích vẽ sơ đồ chưa), kiểm tra cầu nối làm được gì, rồi cho chị xem cây trang sẽ tạo. Chị gật. Hệ thống tạo trang, **ghi vào sổ liên kết chung** (cùng cuốn với Jira): `payment-prd.md = trang 67901`...

4. Khách hàng đọc, để lại 3 bình luận trên trang PRD. Vài hôm sau chị gõ `/confluence payment`. Hệ thống báo: *"Trang PRD có 3 bình luận mới; nội dung trang không đổi."* Chị gõ `--pull`, 3 bình luận được mang về **hộp thư góp ý** (kèm tên khách, ngày, link) — tài liệu PRD gốc không bị đụng. Chị đọc, thấy 1 góp ý hợp lý, quyết định lập một yêu-cầu-thay-đổi (`/cr`) để xử lý đàng hoàng.

5. Đồng thời, một đồng nghiệp đã sửa trực tiếp phần mô tả trên trang SRS, mà chị cũng vừa sửa file SRS ở máy. Hệ thống báo *"đụng nhau"*. Chị gõ `--reconcile`, xem hai bản cạnh nhau, chọn gộp. Trước khi ghi đè lên Confluence, hệ thống kiểm tra lại thấy trang không đổi tiếp — rồi mới ghi. Sơ đồ và tệp đính kèm trên trang đó được **giữ nguyên**, không bị mất.

6. Hệ thống cập nhật sổ liên kết và in tóm tắt. Chị Hà không mất bình luận nào của khách, không mất phần đồng nghiệp sửa, không mất sơ đồ — mọi thứ được giữ đúng chỗ.

---

## Xem thêm

* Người anh em `/jira` — đồng bộ **công việc** (không phải nội dung đọc), **chung cuốn sổ liên kết** với lệnh này. Các khái niệm nền (mapping, so 3 phía, chống ghi đè, cầu nối MCP) giải thích kỹ ở `explain-skills/jira.md`.
* Chi tiết kỹ thuật đầy đủ: file gốc `.claude/skills/confluence/SKILL.md`, quy tắc chung `.claude/rules/atlassian-sync.md`, và phần sơ đồ mermaid ở `.claude/skills/confluence/references/mermaid-adf.md`.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
