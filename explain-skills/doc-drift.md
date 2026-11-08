---
type: skill-explainer
skill: doc-drift
updated: 2026-07-26
---

# `/doc-drift` là gì và nó chạy như thế nào?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

## 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

`/doc-drift` trả lời **đúng một câu hỏi**: *"code dev đã viết có **khớp** với bộ tài liệu nghiệp vụ của mình không — thiếu chỗ nào, làm lệch chỗ nào?"*

Bạn viết tài liệu (SRS, yêu cầu, bảng lỗi, use case) mô tả tính năng *phải* hoạt động ra sao. Rồi dev code. Nhưng theo thời gian, code và tài liệu **trôi lệch nhau** ("drift"): dev sửa ngưỡng khóa tài khoản từ 5 xuống 3 lần mà quên báo, hoặc thêm một giới hạn request mà tài liệu chẳng ghi, hoặc quên làm một requirement. `/doc-drift` **đọc cả code lẫn tài liệu, so từng thứ một, rồi ra một file báo cáo** chỉ đúng chỗ nào lệch — kèm dẫn nguồn `file:dòng` cả hai bên.

Vài lúc nên gõ `/doc-drift`:

* Dev báo "xong feature rồi" — bạn muốn **kiểm code có đúng như đặc tả không** trước khi nghiệm thu.
* Feature chạy đã lâu, bạn nghi **tài liệu đã cũ so với code thật** (hoặc ngược lại).
* Bạn nhận bàn giao một hệ thống có sẵn cả code lẫn docs, muốn biết **hai bên còn khớp nhau tới đâu**.
* Trước khi cập nhật tài liệu, muốn biết **thực tế code đang làm gì** để tài liệu bám sát sự thật.

Nói gọn: **gõ `/doc-drift` khi bạn cần biết code và tài liệu có còn "nói cùng một chuyện" không — và chỗ nào không.**

> `/doc-drift` **chỉ đọc và báo cáo — không sửa gì cả.** Nó không sửa tài liệu, không sửa code, không tự tạo yêu cầu thay đổi. Nó đưa bạn một tấm biên bản để **bạn** quyết: chỗ này sửa tài liệu (vì code đúng), chỗ kia báo dev fix code (vì tài liệu đúng). Giống một kiểm toán viên: họ chỉ ra sai lệch, không tự ý sửa sổ sách.

## 2. Bạn đưa cho nó những gì‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Hai thứ:

1) **Bộ tài liệu nghiệp vụ đã có** — chính là `docs/{feature}/` trong workspace này (SRS, use case, bảng lỗi...). Đây là **chuẩn để đối chiếu** (baseline).
2) **Code của dev** — một thư mục trên máy, hoặc một link git công khai. Nó **chỉ đọc, không đụng vào** code của bạn.

```
/doc-drift authentication --code /duong-dan/toi/repo        # 1 kho code
/doc-drift authentication --code fe:./web be:./api          # 2 kho (giao diện + máy chủ)
/doc-drift authentication --code https://github.com/x/y     # kho git công khai
/doc-drift --all --code /duong-dan/monorepo                 # kiểm TẤT CẢ feature một lượt
```

Nếu feature bạn gõ **chưa có tài liệu** trong `docs/`, nó không bịa — nó nói thẳng "chưa có gì để so" và chỉ bạn đi làm tài liệu chuẩn trước.

> **Chú ý một cái bẫy:** `/code-to-srs` **không** tạo ra tài liệu chuẩn để so — nó ghi vào khu riêng `docs/_reverse/`, và bản đó sinh ra từ chính code bạn muốn đem so, nên so với nhau sẽ luôn khớp một cách vô nghĩa. Đường đi đúng khi chưa có gì:
>
> `/code-to-srs` (dựng bản nháp) → `/srs` (thành đặc tả chính thức, có người xác nhận) → `/doc-drift`
>
> Đã có sẵn tài liệu do người viết thì chỉ cần `/srs`.

## 3. Nó phân loại mỗi thứ vào 5 nhóm‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Đây là phần cốt lõi. Với **mỗi** requirement trong tài liệu, `/doc-drift` gán đúng 1 trong 5 nhãn:

| Nhãn | Nghĩa | Ví dụ |
|---|---|---|
| ✅ **Pass** | Tài liệu và code khớp nhau | Docs: mật khẩu 8-20 ký tự. Code: đúng vậy |
| ⚠️ **Mismatch** | Cả hai đều có nhưng **giá trị lệch** | Docs: khóa sau **5** lần sai. Code: khóa sau **3** lần |
| ❌ **Missing** | Tài liệu có, **code chưa làm** | Docs: đặt lại mật khẩu phải thu hồi mọi phiên. Code: chưa có |
| ➕ **Extra** | **Code có, tài liệu chưa ghi** | Code giới hạn 100 request/phút. Docs không nhắc |
| ❓ **Unverifiable** | **Không đủ bằng chứng** để kết luận | "Phản hồi < 2 giây" — không đọc được từ code tĩnh |

Nhóm quý nhất là **Mismatch** — vì nó bắt được đúng loại lỗi âm thầm nguy hiểm nhất: cả hai bên *có vẻ* đều làm, nhưng con số/câu chữ lệch nhau. Đó là chỗ mà một công cụ chỉ hỏi "có làm hay không" sẽ bỏ sót.

Nhóm ❓ **Unverifiable** cũng quan trọng: nó là **cái van an toàn chống bịa**. Khi không đủ bằng chứng (ví dụ giá trị nằm ở cấu hình môi trường, hay phụ thuộc dịch vụ Google bên ngoài), nó **thà nói "chưa chắc"** còn hơn đoán bừa thành Pass hay Missing.

## 4. Nó cũng soi chỗ nối giữa các tính năng (integration)‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Report có **2 tầng**:

* **Tầng 1 — trong từng feature:** như Mục 3 ở trên.
* **Tầng 2 — liên feature:** chỗ một tính năng **phối hợp** tính năng khác. Ví dụ: tài liệu nói "đặt lại mật khẩu xong phải thu hồi mọi phiên đăng nhập" — tức feature `authentication` phải gọi sang phần `session`. Nếu code không nối hai bên, đó là một **"Missing-link"**. Nếu giao diện (FE) gửi dữ liệu mà máy chủ (BE) hiểu khác kiểu (FE gửi `paid`, BE chờ `PAID`), đó là **"Broken-contract"**.

Đây là chỗ drift **dễ bỏ sót nhất** — vì soi từng feature riêng lẻ sẽ không bao giờ thấy chỗ nối bị hụt. Report vẽ luôn một **sơ đồ phụ thuộc** để bạn nhìn thấy các cạnh nối nào lành, cạnh nào lệch.

> Muốn soi chỗ nối giao diện↔máy chủ (FE↔BE), đưa cả hai kho code bằng `--code fe:... be:...`. Chỉ đưa 1 kho thì report nói thẳng "chỗ nối FE↔BE chưa kiểm", không giả vờ là đã xong.

## 5. Chống bịa và chống sót — hai nỗi lo lớn nhất

Một công cụ kiểu này dễ hỏng theo hai cách: **bịa** (báo lỗi không có thật) và **sót** (bỏ qua lỗi có thật). `/doc-drift` có cơ chế riêng chặn từng cái:

**Chống bịa:**
* **Mọi kết luận phải có dẫn nguồn `file:dòng` thật** ở cả hai bên. Không trích được → không được kết luận.
* Trước khi nói "code **thiếu** requirement X", nó phải chứng minh **đã tìm mà không thấy** — nêu rõ đã tìm những từ khóa nào, trên những file nào, và tập file đó đã đủ chưa. Chưa tìm đủ thì chỉ được ghi "cần kiểm thêm", không được kết luận "thiếu".
* Với những thứ không đọc được bằng mắt thường từ code (hiệu năng, phụ thuộc dịch vụ ngoài), nó xếp vào **Unverifiable** chứ **không đoán** "chắc là đạt".
* Nó **tách rời hai việc**: bước đầu chỉ **trích bằng chứng thô** (con số, câu chữ, dòng code), bước sau mới **so sánh và phán**. Lý do: khi máy vừa-tìm-vừa-phán cùng lúc, nó có xu hướng "tô vẽ cho câu chuyện hợp lý" và báo sai. Tách ra thì lượt phán chỉ được nhìn bằng chứng đã đóng băng.

**Chống sót:**
* **Trước khi soi**, nó lập một **danh sách kiểm tra** (checklist) liệt kê **mọi** requirement và mọi chỗ nối cần kiểm, rồi **hỏi bạn xác nhận** danh sách đã đủ chưa. Không requirement nào được "quên" một cách âm thầm.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍
* **Trước khi ra report**, nó **tự soi lại**: mọi dòng trong checklist đã có kết luận chưa? Finding nào thiếu bằng chứng → hạ nhãn hoặc loại. Số finding bị loại được ghi minh bạch vào report.

## 6. Report trông như thế nào

Kết quả là **một file** trong `docs/reports/doc-drift/` — bạn mở đọc như một biên bản. Nó có:

1) **Bảng tổng (Verdict)** — đếm nhanh: bao nhiêu Pass / Mismatch / Missing / Extra / Unverifiable.
2) **Phần 1 — từng feature:** các bảng Mismatch, Missing, Extra, Unverifiable — mỗi dòng có cột **Hướng xử lý** gợi ý 📄 (nên sửa tài liệu) hay 🔧 (nên báo dev fix code).
3) **Phần 2 — liên feature:** bảng các chỗ nối + sơ đồ phụ thuộc.
4) **Phần 3 — Evidence index:** truy vết đầy đủ để bạn (hoặc dev) kiểm chứng lại từng kết luận.

Cột **Hướng xử lý** chính là thứ giúp bạn ra quyết định nhanh: đọc xong mỗi dòng là biết ngay "cái này tài liệu sai (sửa docs)" hay "cái này code sai (báo dev)".

> Có một file ví dụ đầy đủ để bạn xem trước hình dạng: `docs/reports/doc-drift/2026-07-25-authentication-code-drift.md`.

## 7. Một BA thật dùng `/doc-drift` như thế nào

> **Lan (BA)** vừa nhận dev báo "xong feature đăng nhập". Trước khi gọi QA nghiệm thu, Lan muốn tự kiểm code có đúng đặc tả không. Gõ:
>
>     /doc-drift authentication --code ~/projects/auth-service
>
> `/doc-drift` đọc bộ SRS đăng nhập, lập danh sách 41 mục cần kiểm, hỏi Lan "đủ chưa?". Lan xác nhận. Nó đọc code, so từng mục, tự soi lại, rồi ra report.
>
> Lan mở report, thấy ngay bảng tổng: **4 Mismatch, 3 Missing**. Đọc kỹ:
> - Docs ghi *khóa tài khoản sau 5 lần sai*, code lại khóa sau **3 lần** → ⚠️ Mismatch. Lan nhớ lại: PO từng đồng ý hạ xuống 3 trong một cuộc họp mà chưa ai cập nhật tài liệu. Vậy **code đúng, docs cũ** → Lan sẽ chạy `/cr` sửa tài liệu.
> - Docs ghi *đặt lại mật khẩu phải thu hồi mọi phiên*, code **chưa làm** → ❌ Missing. Đây là lỗ hổng bảo mật thật → Lan báo dev fix code.
> - Code có một **giới hạn 100 request/phút** mà tài liệu không hề nhắc → ➕ Extra. Lan ghi chú để bổ sung vào SRS.
>
> Nhờ report, Lan **không phải đọc từng dòng code**, mà vẫn biết chính xác 7 chỗ cần xử lý và mỗi chỗ nên sửa bên nào. Cô cũng thấy 5 mục ❓ Unverifiable (hiệu năng, phụ thuộc Google) — những cái `/doc-drift` thành thật nói "không kết luận được bằng đọc tĩnh", để Lan chuyển cho QA test runtime.

**Điểm mấu chốt:** `/doc-drift` biến việc "đọc lại toàn bộ code so với đặc tả" — vốn tốn hàng giờ và dễ sót — thành **một tấm biên bản có dẫn nguồn**, để bạn ra quyết định trong vài phút.

## 8. Toàn bộ luồng chạy — từng bước

Bạn gõ `/doc-drift <feature> --code <đường-dẫn>`. Nó đi 8 bước:

**A. Xác định tài liệu chuẩn + lấy code.** Đọc `docs/{feature}/` làm chuẩn; mở thư mục code (hoặc tải kho git về đọc, không sửa). Feature chưa có tài liệu → dừng, chỉ bạn đi làm tài liệu chuẩn trước (theo đúng đường đi ở Mục 2 — lưu ý bản dựng-lại-từ-code chưa phải tài liệu chuẩn).

⬇️

**A2. Lập danh sách kiểm tra + hỏi bạn xác nhận.** Liệt kê mọi requirement + mọi chỗ nối cần kiểm, đếm tổng, chờ bạn duyệt. *(Đây là chốt chặn chống-sót số 1.)*

⬇️

**B. Đọc code.** Dùng năng lực đọc-code có sẵn (`code-explorer` + `stacks-reference`) để tìm đúng phần code của feature, ghi lại đã tìm gì trên file nào.

⬇️

**B2. Soi chỗ nối liên kho** *(chỉ khi bạn đưa ≥2 kho code)*. Ghép cặp lời-gọi ở giao diện với điểm-nhận ở máy chủ để tìm chỗ nối lệch.

⬇️

**C. Trích bằng chứng thô** — chỉ ghi lại con số/câu chữ/dòng code, **chưa phán**.

⬇️

**D. So sánh và phán** — đối chiếu bằng chứng đã trích với tài liệu, gán 1 trong 5 nhãn. *(Tách C và D là để chống báo sai.)*

⬇️

**D2. Tự soi lại** — mọi mục trong checklist đã có kết luận chưa? Finding nào thiếu bằng chứng → loại/hạ nhãn. *(Chốt chặn chống-sót + chống-bịa số 2.)*

⬇️

**E. Ra report** — xin bạn duyệt (L1) rồi ghi 1 file vào `docs/reports/doc-drift/`. **Hết. Không sửa tài liệu, không sửa code.**

## Xem thêm

* Chi tiết kỹ thuật đầy đủ: `.claude/skills/doc-drift/SKILL.md`
* File ví dụ output: `docs/reports/doc-drift/2026-07-25-authentication-code-drift.md`
* Thiết kế + lý do từng quyết định: `docs/reports/2026-07-24-doc-drift-skill-design.md`
* Người anh em dựng docs từ code: `explain-skills/code-to-srs.md`
* Người anh em soi thiếu luồng trong docs: `explain-skills/gap.md`‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
