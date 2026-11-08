---
type: skill-explainer
skill: test-family
updated: 2026-07-17
---

# Họ lệnh TEST — chúng liên quan với nhau thế nào?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

> Tài liệu này giải thích **mối liên quan** giữa các lệnh làm việc kiểm thử: `/test-checklist`, `/test-cases`, `/playwright-gen` (nhánh giao diện) và `/api-checklist`, `/api-test` (nhánh API). Muốn hiểu sâu từng lệnh, đọc file explainer riêng ở cuối.

## 1. Đây KHÔNG phải nhiều cách làm cùng một việc‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Các lệnh test là **những chặng nối tiếp của một hành trình** từ “cần kiểm gì” đến “kiểm được bằng máy”:

> **Liệt kê tình huống cần kiểm → viết kịch bản chi tiết → biến thành test tự động chạy.**

Hãy hình dung việc nghiệm thu một căn hộ:

1) Trước tiên lập **bảng những thứ phải kiểm** (điện, nước, cửa, chống thấm) — chưa nói cách kiểm, chỉ nói kiểm gì.
2) Rồi viết **từng phiếu kiểm chi tiết**: mở vòi nào, hứng bao nhiêu nước, áp lực bao nhiêu là đạt.
3) Cuối cùng, nếu muốn kiểm đi kiểm lại nhiều lần, **giao cho một cỗ máy tự làm theo phiếu**.

Ba bước đó chính là ba chặng của nhánh giao diện.

## 2. Bức tranh dòng chảy — hai nhánh, một triết lý‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

```text
                        ┌────────────────────────────┐
                        │  Tài liệu nghiệp vụ          │
                        │  (SRS, use case, màn hình)  │
                        └───────────┬─────────────────┘
                                    │  nguồn sự thật (không bịa)
             ┌──────────────────────┴──────────────────────┐
             ▼                                               ▼
 ══ NHÁNH GIAO DIỆN (người dùng bấm) ══        ══ NHÁNH API (hệ thống nói với nhau) ══

 ┌─────────────────────────────────┐          ┌─────────────────────────────────┐
 │ /test-checklist                 │          │ /api-checklist                  │
 │ Liệt kê tình huống cần kiểm     │          │ Liệt kê tình huống cần kiểm     │
 │ trên giao diện. Gắn mã CHK.     │          │ ở tầng API (có hỏi làm rõ trước)│
 └───────────────┬─────────────────┘          └───────────────┬─────────────────┘
                 │                                             │
                 ▼                                             ▼
 ┌─────────────────────────────────┐          ┌─────────────────────────────────┐
 │ /test-cases                     │          │ /api-test                       │
 │ Viết kịch bản chi tiết 1:1      │          │ Biến từng mục thành lần gọi     │
 │ (bước, dữ liệu, kết quả).       │          │ thử API chạy được (qua Bruno).  │
 └───────────────┬─────────────────┘          └─────────────────────────────────┘
                 │
                 ▼
 ┌─────────────────────────────────┐
 │ /playwright-gen                 │
 │ Biến kịch bản → script robot    │
 │ tự mở trình duyệt, bấm, kiểm.   │
 └─────────────────────────────────┘
```

Điểm chung của cả hai nhánh — **một triết lý duy nhất**:

> **Tài liệu .md là bản gốc → công cụ sinh ra thứ chạy được → chạy → ghi kết quả về. Con người sửa bản gốc, không sửa thứ máy sinh.**

`/test-cases` là bản gốc, `/playwright-gen` sinh script. `/api-checklist`+`/api-test` là bản gốc, Bruno là thứ chạy. Không ai sửa tay “thứ máy sinh”.

Ngoài ra, `/test-checklist` và `/test-cases` còn tạo kèm một **trang HTML nhấp-đúp-mở** (`preview.html` là khung trang, `data.js` là dữ liệu làm mới mỗi lần chạy) để xem/lọc/tìm cho dễ — và riêng `/test-cases` có thêm nút **Xuất Excel** (một dòng/bước, hoặc gộp theo kịch bản) để gửi người kiểm hoặc nhập vào TestRail/Jira. Trang HTML chỉ là “cửa sổ nhìn vào” dữ liệu; file `.md` vẫn là bản gốc.

## 3. Bảng phân biệt nhanh‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

| Lệnh | Làm gì bằng lời dễ hiểu | Trả lời câu hỏi chính |
|---|---|---|
| `/test-checklist` | Liệt kê tình huống cần kiểm trên giao diện | “Cần kiểm những gì để không sót?” |
| `/test-cases` | Viết kịch bản chi tiết cho từng tình huống | “Kiểm bằng cách nào, nhập gì, mong đợi gì?” |
| `/playwright-gen` | Biến kịch bản thành script robot tự chạy | “Làm sao chạy lại nhiều lần không tốn công?” |
| `/api-checklist` | Liệt kê tình huống cần kiểm ở tầng API | “API cần thử những gì?” |
| `/api-test` | Biến mục API thành lần gọi thử chạy được | “API thực tế trả đúng không?” |

Một câu để nhớ: **checklist chọn cái cần kiểm; test-cases/api-test viết cách kiểm; playwright-gen cho robot chạy lại.**

## 4. Vì sao tách “liệt kê” và “chi tiết” thành hai bước?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Đây là quyết định thiết kế quan trọng, dùng cho cả hai nhánh.

Nếu nhảy thẳng vào viết kịch bản chi tiết, bạn dễ **lạc vào tiểu tiết** và khó thấy mình đã sót tình huống nào. Tách bước “liệt kê” (checklist) ra trước cho phép mọi người **duyệt phạm vi khi nó còn gọn** — một trang danh sách dễ soát hơn là hàng chục trang kịch bản.

Giống như duyệt mục lục sách trước khi viết từng chương: sửa mục lục thì nhanh, sửa khi đã viết xong hết thì tốn.

## 5. Sợi chỉ đỏ: “mã theo dõi” nối cả hành trình

Mỗi tình huống trên giao diện được gắn một mã cố định — ví dụ `CHK-dang-nhap-027` — ngay từ checklist. Mã này:

* **Không đổi, không dùng lại** (như số phòng khách sạn).
* Theo sang kịch bản chi tiết (`/test-cases` bám đúng mã).
* Theo tiếp vào script tự động (`/playwright-gen` đặt mã vào tên test).

Nhờ sợi chỉ đỏ này, bạn luôn trả lời được: *“Tình huống này đã có kịch bản chưa? Đã dựng script chưa? Chạy đậu hay rớt?”* — mà không sợ lẫn lộn. Bạn không cần nhớ mã; các lệnh tự quản lý.

## 6. “Mỗi mục một việc” — vì sao nó quan trọng cho cả chuỗi

Nhánh giao diện giữ nguyên tắc **mỗi mục checklist có đúng một “kết luận cuối” để quyết định đậu/rớt** (được có nhiều bước chuẩn bị, nhưng chỉ một kết luận). Lý do dây chuyền:

* Checklist tách “logo hiển thị” và “bấm logo về trang chủ” thành hai mục.
* → `/test-cases` viết hai kịch bản riêng (không gộp, không rơi rớt nửa nào).
* → `/playwright-gen` dựng hai test rõ ràng, mỗi test kiểm đúng một điều.

Nếu ngay từ checklist gộp hai việc vào một dòng, sai lệch sẽ **lan xuống tận script**. Vì thế kỷ luật “atomic” bắt đầu từ chặng đầu.

> **Lưu ý:** nhánh API cố tình **khác** ở điểm này. Một “ý định” API (ví dụ “kiểm tra số tiền”) thường phải nở thành nhiều lần gọi thử (số 0, số âm, vượt hạn mức...) vì bản chất API là vậy — không ép 1:1 cứng. Đây là khác biệt **có chủ đích** giữa hai nhánh, không phải mâu thuẫn: giao diện thì một-hành-vi-một-kịch-bản, còn API thì một-ý-định-nhiều-lần-gọi. Cả hai đều chung một luật vàng: **không đẻ tình huống mới ngoài checklist đã duyệt.**‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

## 7. Nguyên tắc xuyên suốt: KHÔNG bịa

Cả bộ lệnh test tuân một luật chung, và đây là điều làm chúng đáng tin:

* **Nội dung lấy từ tài liệu thật:** câu thông báo lỗi chính xác, con số, quy tắc — đều rút từ đặc tả/use case/màn hình, không tự nghĩ.
* **Thiếu thì hỏi hoặc đánh dấu, không điền bừa:** chỗ nào tài liệu chưa nói, lệnh nêu câu hỏi mở hoặc ghi “cần bổ sung”.
* **Máy không đủ chắc thì không đoán:** `/playwright-gen` thiếu dữ liệu/kết quả mong đợi thì **bỏ qua hẳn** kịch bản đó; chỉ thiếu cách nhận diện một phần tử (như logo) thì **dựng bản nháp có ghi chú TODO** để dev xác nhận. Cả hai đều thà vậy còn hơn dựng một script tự-tin-giả chạy xong báo “đậu” mà chẳng kiểm gì.

Một danh sách trung thực (biết rõ mình còn thiếu gì) luôn quý hơn một danh sách trông đầy đặn nhưng lẫn lộn thật-giả.

Cùng tinh thần cẩn trọng đó áp cả lúc **chạy thật**: khi cho test tự động chạy, các lệnh **không tự chạy trên môi trường thật (production)** — vì test có thể tạo dữ liệu hoặc đổi trạng thái thật. Mặc định chỉ chạy trên môi trường thử; muốn chạm production phải cấp phép rõ ràng. “Không bịa” và “không chạy nhầm chỗ nguy hiểm” là hai mặt của cùng một sự thận trọng.

Và vì kịch bản thường viết **trước khi có sản phẩm chạy được** (nên dữ liệu thử lúc đó chỉ là mẫu), khi chạy thật `/playwright-gen` còn **tách “rớt do dữ liệu thử”** (sai/thiếu/cũ) **khỏi “rớt do ứng dụng lỗi”**, và liệt kê ra dữ liệu nào còn thiếu để bạn cấp rồi chạy lại đúng phần chưa đậu — chi tiết ở explainer riêng của lệnh.

## 8. Bằng chứng không sót nghiệp vụ — bảng “độ phủ”

Câu hỏi muôn thuở: *“làm sao chắc checklist không bỏ sót nghiệp vụ nào?”*

`/test-checklist` lập một **bảng đối chiếu**: mỗi *nghĩa vụ nghiệp vụ nhỏ* (từng nhánh của một quy tắc, từng phần của một mã lỗi) phải có mục checklist phủ — hoặc ghi rõ “tạm loại, có lý do, có người duyệt”. Bảng đếm **theo từng nghĩa vụ nhỏ**, không đếm gộp — nên chỗ thiếu lộ ra thay vì bị che. Những nghĩa vụ còn “chưa có nguồn / đang treo / mới phủ một phần” đều **chưa cho đóng phạm vi**.

Bảng này cũng biết phân biệt tình huống nào nên kiểm ở **giao diện**, tình huống nào thuộc **tầng API** — để bạn thấy được cả bức tranh và không tưởng nhầm “kiểm giao diện xong là kiểm hết”.

## 9. Giao diện đậu riêng, API đậu riêng — chưa chắc cả hệ thống đậu

Đây là chỗ dễ hiểu nhầm nhất, giống hệt bài học bên họ API:

* Kiểm giao diện đậu (màn đăng nhập hiện đúng, bấm đúng) — tốt.
* Kiểm API đậu (backend trả đúng khi gọi trực tiếp) — tốt.
* Nhưng **cả chuỗi ghép lại** — người dùng bấm trên màn → gọi API → nhận kết quả → màn cập nhật — có thể vẫn hỏng ở khớp nối.

Vì vậy hai nhánh test không thay thế nhau: **giao diện và API là hai lớp bổ sung**, cần cả hai để yên tâm rằng tính năng chạy đúng từ đầu đến cuối.

## 10. Ranh giới công việc — đây là việc BA/QC, không phải đi lập trình

BA/QC có vai trò chính:

* Quyết định phạm vi test và độ sâu (nghiệm thu nhanh hay kiểm kỹ trước phát hành).
* Bổ sung câu thông báo/quy tắc/trạng thái mà tài liệu còn thiếu.
* Duyệt danh sách và kịch bản; đọc kết quả đậu/rớt để kết luận về tính năng.
* Tả nút/ô bằng nhãn nghiệp vụ — không viết mã kỹ thuật.

Phần vượt ngoài ranh giới BA: gắn “dấu nhận diện” kỹ thuật cho phần tử khó tìm, cài đặt công cụ, dựng môi trường chạy. Đội kỹ thuật lo phần đó. BA/QC sở hữu **ý nghĩa nghiệp vụ, phạm vi, kết quả mong đợi và kết luận đậu/rớt**.

## 11. Không phải lúc nào cũng chạy đủ cả bộ

* **Chỉ cần duyệt phạm vi:** dừng ở `/test-checklist` để chốt “cần kiểm gì”, chưa vội viết chi tiết.
* **Cần kịch bản cho người kiểm tay:** đi tới `/test-cases`, xuất sang công cụ quản lý test — không nhất thiết tự động hóa.
* **Cần chạy đi chạy lại nhiều lần (hồi quy):** mới cần `/playwright-gen` dựng script tự động.
* **Tính năng có tầng API:** thêm nhánh `/api-checklist` → `/api-test` song song.

## 12. Câu chốt

> **Bộ lệnh test là một hành trình: liệt kê cái cần kiểm → viết cách kiểm → cho robot chạy lại. Hai nhánh giao diện và API bổ sung nhau, cùng chung một luật — tài liệu thật là bản gốc, không bịa, thiếu cốt lõi thì thẳng thắn báo “chưa làm được” (chỉ thiếu chút nhận diện thì để bản nháp có ghi chú) — chứ không tạo test dối.**

## Xem thêm

* [`/test-checklist` — liệt kê tình huống cần kiểm (giao diện)](test-checklist.md)
* [`/test-cases` — viết kịch bản chi tiết](test-cases.md)
* [`/playwright-gen` — biến kịch bản thành script tự động](playwright-gen.md)
* [`/api-checklist` — liệt kê tình huống cần kiểm (API)](api-checklist.md)
* [`/api-test` — thử API bằng Bruno](api-test.md)
* [`api-family.md` — cả bộ lệnh API nối với nhau](api-family.md)‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
