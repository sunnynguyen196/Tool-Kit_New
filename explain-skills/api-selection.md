---
type: skill-explainer
skill: api-selection
updated: 2026-07-15
---

# Chọn lệnh API/tích hợp nào? — bàn chỉ đường cho mọi việc dính tới API‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

> Tài liệu này là __điểm bắt đầu__ khi bạn biết mình cần "làm gì đó với API" — của đối tác hay của chính mình — nhưng __chưa biết nên dùng lệnh nào__. Nó chỉ đường tới đúng lệnh theo *việc bạn đang cần*, rồi bạn đọc file explainer riêng của lệnh đó để hiểu sâu. Nói cách khác: đây là *tấm bản đồ tổng*, các file kia là *đường đi chi tiết*.
>
> Có hai file bạn nên đọc kèm: `explain-skills/api-workflow.md` (bảy chặng của một tích hợp, theo __thứ tự thời gian__) và `explain-skills/api-family.md` (bảy lệnh __liên quan nhau thế nào__, dùng ẩn dụ nhà thầu phụ). File bạn đang đọc lo câu hỏi khác hai file kia: __"việc trước mắt của tôi thì gõ lệnh nào?"__

## 1. Vì sao cần một tài liệu chỉ đường riêng?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Làm việc với API có __nhiều lệnh__ — mỗi lệnh mạnh ở một khâu. Câu hỏi thường gặp không phải "lệnh này chạy thế nào" (đã có explainer riêng), mà là câu *đứng trước* đó: __"việc tôi đang cần thì thuộc khâu nào, gõ lệnh nào?"__

Chọn nhầm thì mất công: ví dụ bạn muốn *thiết kế cách hệ thống phối hợp với đối tác khi có sự cố* mà lại đi chạy lệnh *lập bảng tra field*, thì kết quả không trả lời đúng câu bạn cần. Tệ hơn: nhiều người nhầm __test API__ với __test giao diện__ — hai việc khác hẳn, hai bộ lệnh khác nhau (xem Mục 4).

Tài liệu này giải bài toán đó: bạn mô tả __việc mình đang cần__, nó chỉ cho bạn __đúng lệnh__.

> Lưu ý phân biệt: có một file khác tên gần giống — `.claude/rules/api-integration.md`. File đó là __nội quy cho máy__ (quy tắc kỹ thuật đầy đủ: thứ tự, ba làn, hai chiều, ranh giới). File bạn đang đọc là __bản cho người__, giải thích cùng chuyện bằng lời thường.

---

## 2. Bảy câu hỏi để chọn đúng lệnh API‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Cách nhanh nhất: hỏi __"việc trước mắt của tôi là gì?"__ rồi so với bảy khâu dưới đây. Mỗi khâu là một *loại việc* khác nhau trong hành trình đưa API vào sản phẩm.

| Việc bạn đang cần làm | Ví dụ | Lệnh | Khâu |
|---|---|---|---|
| __Cân nhắc có nên hợp tác__ với đối tác này không (giá, độ tin cậy, có bản thử không) — khi chưa chốt chọn ai | so 2 cổng thanh toán, tính build-vs-buy | `/api-assess` | [0] |
| __Đọc hiểu tài liệu API của đối tác__ — họ cho làm gì, cần gì, trả gì, lỗi nào | nhận file OpenAPI/PDF của cổng thanh toán | `/api-doc` | [1] |
| __Thiết kế cách hệ thống phối hợp__ với đối tác — khi nào gọi, ai giữ trạng thái đúng, tin báo ngược thất lạc thì sao, thử lại có tính tiền 2 lần không | ghép luồng thanh toán vào app đang chạy | `/api-design` | [2] ⭐ |
| __Lập bảng tra dữ liệu__ — ô đối tác trả về → lưu ở đâu → hiện ở màn nào | map field charge → màn kết quả | `/api-map` | [2] kèm |
| __Liệt kê các trường hợp cần test__ (hiểu API rồi mới lập, chỗ chưa rõ thì ghi câu hỏi) | trước khi viết test thật | `/api-checklist` | [3] |
| __Thử thật__ bằng Bruno (như Postman — AI điền sẵn request, bạn bấm chạy, ghi đậu/rớt) | gọi thử endpoint charge | `/api-test` | [4] |
| __Kiểm tra trước khi "lên sóng"__ thật — đổi môi trường thử sang thật, ai trực khi lỗi, kế hoạch lùi, theo dõi khi đối tác đổi API | trước khi mở thanh toán cho khách thật | `/api-readiness` | [5] |

Một câu để nhớ: __cân nhắc → assess; hiểu → doc; thiết kế cách ráp → design (kèm map tra field); liệt kê cần thử → checklist; thử thật → test; chuẩn bị chạy thật → readiness.__

> __Đây là một hành trình có thứ tự__ (khác họ sơ đồ, nơi các lệnh thay thế nhau). Nhưng __không phải lúc nào cũng chạy đủ bảy__ — xem Mục 3.

---

## 3. Cắt bớt khâu nào tùy tình huống‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

| Tình huống của bạn | Chạy lệnh nào |
|---|---|
| __API đối tác, chưa chốt chọn ai__ | Đủ bảy: `/api-assess → /api-doc → /api-design (+/api-map) → /api-checklist → /api-test → /api-readiness` |
| __API đối tác, đã ký hợp đồng rồi__ | Bỏ `/api-assess`: bắt đầu từ `/api-doc` |
| __API của CHÍNH MÌNH__ (own — backend mình tự làm) | Bỏ `/api-assess` + `/api-doc` (không có đối tác để đánh giá/đọc tài liệu). Nguồn thay thế là bản đặc tả SRS của mình. Vẫn cần `/api-design` __bất cứ khi nào có phối hợp giữa các dịch vụ, trạng thái, hay giao dịch quan trọng__ (không chỉ khi gọi sang đối tác) + `/api-checklist` + `/api-test` + `/api-readiness` |
| __Chỉ muốn lập checklist + thử một endpoint nhanh__ (dò thử, ad-hoc) | `/api-checklist → /api-test` để khám phá nhanh. __Nhưng đây KHÔNG thay pipeline production__: một tích hợp thật đụng tiền/trạng thái vẫn phải qua `/api-design` (+`/api-map`) — không được dùng lối tắt này để bỏ gate thiết kế |
| __Thay đổi nhỏ trên tích hợp đang chạy__ | Đọc lại phần liên quan, cập nhật `/api-design`, test đúng phần bị ảnh hưởng, soát `/api-readiness` — không làm lại cả hành trình |

---

## 4. ⚠️ Test API ≠ Test giao diện — đừng nhầm hai bộ lệnh‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Đây là chỗ __rất hay nhầm__, và bạn đã hỏi đúng câu này. Có __hai "họ test" song song__, phục vụ hai loại kiểm thử khác nhau:

| | __Test API__ (kiểm request/response) | __Test giao diện__ (kiểm hành vi màn hình) |
|---|---|---|
| Kiểm cái gì | App gọi endpoint đúng chưa: gửi đúng dữ liệu, nhận đúng HTTP/lỗi | Người dùng bấm nút, nhập form, thấy màn hình đúng chưa |‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍
| Lập danh sách cần thử | `/api-checklist` | `/test-checklist` |
| Viết case chi tiết | `/api-test` (→ request Bruno __chạy được__, như Postman) | `/test-cases` (→ test case chi tiết dạng văn bản: các bước thủ công cho tester, hoặc nguồn để dev tự động hoá bằng Playwright/TestRail sau) |
| Một item nở ra mấy case | __n–n__: 1 item checklist có thể thành __nhiều__ case cùng ý-định (vd "validation số tiền" → null/âm/vượt-hạn) | __1:1__: mỗi item checklist ra __đúng 1__ test case |
| Ví dụ 1 case | "gọi `POST /charges` với thẻ hết hạn → nhận 402 `expired_card`" | "ở màn thanh toán, nhập thẻ hết hạn → hiện thông báo 'Thẻ đã hết hạn'" |

Cả hai đều theo __cùng một nếp 2 bước__: *lập checklist (liệt kê cần thử) → expand thành case chi tiết*. Khác nhau ở __tầng kiểm__ (một bên là __cửa sau__ — API, máy nói với máy; một bên là __cửa trước__ — màn hình, người bấm) __và ở cách nở case__ (API n–n, giao diện 1:1 — xem hàng trên).

__Chọn nhanh:__
* Bạn đang tích hợp / gọi một API (của đối tác hay của mình)? → họ __API test__: `/api-checklist` → `/api-test`.
* Bạn đang kiểm một màn hình / luồng người dùng bấm? → họ __giao diện__: `/test-checklist` → `/test-cases`.

> Hai họ __bổ trợ nhau__, không loại trừ. Một tính năng thanh toán đầy đủ thường cần __cả hai__: test API (cửa sau — gọi cổng thanh toán đúng chưa) *và* test giao diện (cửa trước — màn kết quả hiện đúng lỗi chưa). Cùng một lỗi "thẻ hết hạn" được kiểm ở hai tầng khác nhau.

---

## 5. Bảng "tình huống thật → nên dùng lệnh gì"

Đôi khi dễ chọn hơn nếu nhìn tình huống cụ thể:

| Tình huống bạn đang gặp | Nên dùng | Lệnh |
|---|---|---|
| "Sếp đưa 2 cổng thanh toán, hỏi nên chọn cái nào" | Đánh giá đối tác | `/api-assess` |
| "Đối tác gửi file tài liệu API, tôi cần hiểu họ cho làm gì" | Đọc hiểu tài liệu | `/api-doc` |
| "Cần chốt: khi khách bấm Thanh toán, app gọi đối tác lúc nào, nếu tin báo ngược thất lạc thì sao" | Thiết kế cách phối hợp | `/api-design` |
| "Cần biết ô 'mã giao dịch' đối tác trả về sẽ hiện ở màn nào" | Bảng tra dữ liệu | `/api-map` |
| "Cần liệt kê các trường hợp phải thử với API charge trước khi test" | Checklist test API | `/api-checklist` |
| "Cần gọi thử endpoint charge với vài loại thẻ, xem đậu/rớt" | Thử thật bằng Bruno | `/api-test` |
| "Sắp mở thanh toán thật cho khách, cần soát đã sẵn sàng chưa" | Gate lên sóng | `/api-readiness` |
| "Cần kiểm màn hình đăng nhập bấm nút có báo lỗi đúng không" | Test __giao diện__ (không phải API) | `/test-checklist` → `/test-cases` |

Nếu tình huống của bạn không khớp hàng nào, quay lại __bảy câu hỏi ở Mục 2__ — hầu hết việc dính tới API đều rơi vào một trong bảy khâu đó.

---

## 6. Hai nguyên tắc chung — đọc trước khi bắt tay

__"Test API xong" chưa phải "tích hợp xong".__ Đọc tài liệu rồi test cho đậu mới là *khúc giữa*. Bỏ khâu đầu (`/api-assess` — có nên hợp tác) thì tốn công nhầm đối tác; bỏ khâu giữa (`/api-design` — cách ráp) thì test đúng từng phần mà tổng thể vẫn sai; bỏ khâu cuối (`/api-readiness` — chuẩn bị chạy thật) thì vỡ lúc lên sóng. Đủ cả ba khúc mới biến "gọi được API" thành "một năng lực vận hành được".

__Đây là việc của BA/PO, không phải đi lập trình API.__ Cả bảy lệnh đều ở tầng nghiệp vụ: hiểu đối tác, thiết kế cách phối hợp ở góc nghiệp vụ, test kiểu Postman (AI điền sẵn, bạn bấm chạy + đọc kết quả). Cái *vượt sang lập trình viên* — dựng hạ tầng, chọn thuật toán thử-lại, cấu hình theo dõi — thì BA chỉ __ghi lại yêu cầu và kế hoạch__, không tự làm. Bạn nói "không được thu tiền hai lần"; lập trình viên quyết *làm cách nào*.

---

## Xem thêm

Sau khi bàn chỉ đường này giúp bạn chọn __lệnh__, đọc tiếp để hiểu sâu:

__Hai file nhìn toàn cảnh họ API:__
* `explain-skills/api-workflow.md` — bảy chặng theo __thứ tự thời gian__ (bảng quy trình, kiểu why-this-approach).
* `explain-skills/api-family.md` — bảy lệnh __liên quan nhau thế nào__ (ẩn dụ nhà thầu phụ).

__Explainer từng lệnh:__
* `explain-skills/api-assess.md` · `api-doc.md` · `api-design.md` · `api-map.md` · `api-checklist.md` · `api-test.md` · `api-readiness.md`.

__Quy tắc gốc (cho máy / người muốn chi tiết kỹ thuật):__
* `.claude/rules/api-integration.md` — nội quy đầy đủ (thứ tự, ba làn own/3rd/mixed, hai chiều, ranh giới BA↔dev). Bản kỹ thuật; file bạn vừa đọc là bản diễn giải cho người.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
