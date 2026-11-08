---
type: skill-explainer
skill: api-assess
updated: 2026-07-15
---

# `/api-assess` là gì và nó chạy như thế nào?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

## 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

`/api-assess` giúp bạn **đánh giá đối tác hoặc API trước khi tốn công đọc kỹ hợp đồng và thử tích hợp**. Mục tiêu là hỗ trợ quyết định: nên chọn bên nào, không chọn, hay tự xây thay vì mua/tích hợp — cách cân nhắc này thường gọi là *build-vs-buy* (tự làm hay mua/thuê giải pháp).

Hãy hình dung ứng dụng của bạn là một cửa hàng, còn API của đối tác là **nhà thầu phụ giao hàng**. Trước khi giao nhiều đơn cho họ, bạn cần chấm xem: giá có hợp không, giao có đáng tin không, có cho chạy thử không, khi có sự cố có ai hỗ trợ không, và nếu sau này muốn đổi nhà thầu thì có bị kẹt không.

Nếu không đánh giá sớm, bạn có thể dành nhiều ngày đọc kỹ một bên, họp với dev và thử tích hợp — rồi mới phát hiện giá quá cao, không đáp ứng việc cần làm, hoặc không cho mang dữ liệu đi khi đổi đối tác.

Vài tình huống điển hình nên dùng `/api-assess`:

- Chưa chốt đối tác và đang có từ hai bên cung cấp dịch vụ trở lên.
- Đang cân nhắc giữa **tự xây** một khả năng và **mua/tích hợp** dịch vụ có sẵn.
- API ảnh hưởng mạnh tới phạm vi sản phẩm, chi phí, trải nghiệm khách hàng hoặc thời gian ra mắt.
- SLA (*cam kết mức độ phục vụ*), tuân thủ, quyền dữ liệu hoặc nguy cơ bị phụ thuộc đối tác là điều đáng lo.

Gõ lệnh đơn giản như:

```text
/api-assess --feature premium-payment
```

(nghĩa là: đánh giá các phương án API/đối tác cho tính năng thanh toán cao cấp).

**Một câu để nhớ:** `/api-assess` là bước “chấm nhà thầu trước khi giao việc” — để quyết có nên hợp tác hay tự làm, dựa trên bằng chứng chứ không chỉ cảm tính.

***

## 2. Toàn bộ luồng chạy — sơ đồ‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

```text
 BẠN GÕ LỆNH
 /api-assess --feature premium-payment
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 1 — Kiểm tra có còn quyền chọn không             │
 │  Đối tác chưa chốt / có nhiều bên / build-vs-buy →    │
 │  tiếp tục. Nếu đã ký hoặc bị áp đặt provider → hỏi    │
 │  đúng 1 câu: vẫn cần lưu đánh giá, hay bỏ qua?        │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 2 — Hiểu việc kinh doanh đang cần                │
 │  Đọc tài liệu sẵn có để biết outcome, phạm vi, ưu     │
 │  tiên, ngân sách, thời hạn và ràng buộc.              │
 │  Thiếu điều quan trọng → hỏi bạn, KHÔNG tự bịa.       │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 3 — Gom bằng chứng cho từng phương án            │
 │  Ưu tiên proposal, báo giá, hợp đồng, SLA, tài liệu   │
 │  chính thức, chứng nhận và chính sách dữ liệu.        │
 │  Nguồn chưa chắc → ghi rõ mức độ tin cậy.             │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 4 — Lập scorecard (bảng chấm)                    │
 │  Chấm hoặc gắn nhãn từng tiêu chí: phù hợp, cần làm   │
 │  rõ, hoặc rủi ro cao. Không đủ dữ liệu → không bịa    │
 │  điểm số, để "Cần làm rõ".                            │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 5 — So trade-off + đường thoát                   │
 │  So sánh cái được, cái mất, rủi ro vận hành, chi phí  │
 │  và khả năng đổi đối tác sau này.                     │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 6 — Xem trước rồi mới ghi (xin phép)             │
 │  Nói rõ sẽ đánh giá bao nhiêu phương án, đã có bao    │
 │  nhiêu bằng chứng và còn câu hỏi nào. Bạn gật (Y)     │
 │  mới làm tiếp.                                        │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 7 — Ghi assessment, rồi mới đưa khuyến nghị      │
 │  Evidence, giả định và câu hỏi mở đứng trước. Verdict │
 │  chọn/không chọn/tự xây nằm CUỐI cùng.                │
 └──────────────────────────────────────────────────────┘
        │
        ▼
     HOÀN TẤT — có file đánh giá để ra quyết định
```

***

## 3. Có điều kiện — khi nào KHÔNG cần chạy?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

`/api-assess` là bước `[0]` của hành trình API, nhưng **không phải thủ tục bắt buộc cho mọi tích hợp**.

Bạn nên bỏ qua khi đối tác đã ký hợp đồng, hệ sinh thái đã bắt buộc dùng một bên, hoặc đây chỉ là thay đổi nhỏ trên tích hợp cũ. Khi đó, “đánh giá để chọn” không còn thay đổi được quyết định; đi thẳng sang `/api-doc` để hiểu tài liệu của đối tác sẽ hữu ích hơn.

Nếu ngữ cảnh cho thấy bên cung cấp đã chốt, lệnh không tự tạo tài liệu cho có. Nó chỉ hỏi một câu: *“Provider đã chốt; anh/chị vẫn cần đánh giá để lưu quyết định/rủi ro, hay bỏ qua `/api-assess` và sang `/api-doc`?”*

Vẫn có lý do để chạy dù đã chốt: bạn cần lưu lại vì sao đã chọn, các rủi ro còn treo, hoặc điều kiện cần thương lượng trước khi triển khai. Nhưng đó là lựa chọn có chủ đích, không phải làm đủ bước cho đẹp quy trình.

***

## 4. Scorecard chấm những gì?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

*Scorecard* là bảng chấm gọn để nhìn các phương án trên cùng một mặt bằng. Nó không phải hồ sơ thầu dài hàng trăm trang; mỗi dòng cần có nhãn/điểm, ghi chú nghiệp vụ và nguồn bằng chứng.

Các tiêu chí chính gồm:

- **Business fit** — có hợp với mục tiêu, khách hàng và cách vận hành của doanh nghiệp không?
- **Capability coverage** — API có làm được những việc sản phẩm cần không? Đây là “đủ khả năng nghiệp vụ”, không phải liệt kê endpoint kỹ thuật.
- **Integration effort** — mức công sức phối hợp, thay đổi quy trình và thời gian tương đối; không đoán công nghệ dev sẽ dùng.
- **Reliability / uptime** — độ tin cậy và thời gian dịch vụ hoạt động ổn định.
- **SLA / support** — họ cam kết hỗ trợ gì, phản hồi sự cố trong bao lâu?
- **Sandbox** — có môi trường thử trước khi cam kết thật không?
- **Security / compliance** — bảo mật và tuân thủ có phù hợp thị trường, loại dữ liệu của bạn không?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍
- **Cost** — giá, điều kiện thương mại và chi phí có thể phát sinh.
- **Data ownership / portability** — dữ liệu thuộc về ai, có xuất và chuyển sang bên khác được không?
- **Versioning / deprecation** — họ có báo trước khi thay đổi hoặc ngừng hỗ trợ không?
- **Lock-in + exit plan** — mức phụ thuộc đối tác và đường thoát khi cần đổi bên.

Nếu có nhiều provider, bảng đặt các bên cạnh nhau để trade-off (đánh đổi) lộ rõ. Nếu là build-vs-buy, hai cột sẽ là **Tự xây** và **Mua/tích hợp**.

> **Không có đủ dữ liệu thì sao?** Ghi `Cần làm rõ`, nêu rõ thiếu gì và thiếu đó ảnh hưởng thế nào tới quyết định. Một điểm số đẹp nhưng không có căn cứ nguy hiểm hơn một ô chưa biết.

***

## 5. Vì sao khuyến nghị luôn nằm cuối?

`/api-assess` không được mở đầu bằng “chọn bên A”. Trước hết phải có bằng chứng, các giả định, câu hỏi mở và trade-off; sau đó mới đưa *verdict* (kết luận).

Cách này giống như chọn nhà thầu giao hàng: không nên nói “chọn bên rẻ nhất” trước khi biết họ có giao đúng hẹn không, xử lý hàng thất lạc ra sao, có chạy thử được không và có thể đổi nhà thầu về sau không.

Kết luận có thể là:

- **Chọn** một phương án, kèm điều kiện cần đạt trước khi ký hoặc triển khai.
- **Không chọn** vì có rủi ro hoặc khoảng trống không chấp nhận được.
- **Build-vs-buy**: nghiêng về tự xây hoặc mua/tích hợp, với lý do rõ ràng.
- **Chưa quyết định** khi evidence còn thiếu; đây là kết quả hợp lệ, không phải thất bại.

***

## 6. Kết quả để ở đâu, và lệnh này không làm gì?

Kết quả luôn nằm tại:

```text
docs/{feature}/integration/api-assess.md
```

File này ghi bối cảnh quyết định, các phương án, scorecard, trade-off, rủi ro, giả định, câu hỏi mở và khuyến nghị cuối cùng. Nếu file đã có, `/api-assess` hiểu là cập nhật: giữ lại dấu vết evidence cũ, hỏi phần thay đổi và cho bạn xem phần khác biệt trước khi sửa.

Lệnh này phục vụ BA/PO nên chỉ nói về năng lực nghiệp vụ, ảnh hưởng vận hành, chi phí, cam kết và rủi ro. Nó **không** thiết kế endpoint, SDK, payload, framework hay cách dev triển khai — **những quyết định đó thuộc dev/architect**; các lệnh BA sau chỉ *dùng* contract (tài liệu API) để thiết kế nghiệp vụ và kiểm thử, không sở hữu quyết định kỹ thuật.

Cũng đừng biến phần version, SLA thành kế hoạch theo dõi dài hạn ở đây. Trong `/api-assess`, chúng là tiêu chí để **chọn đối tác**; việc chuẩn bị theo dõi khi vận hành thật thuộc `/api-readiness`.

***

## 7. Vị trí trong họ lệnh API

`/api-assess` là chặng `[0]`, đứng trước các lệnh còn lại và chỉ chạy khi còn quyết định lựa chọn.

```text
/api-assess → /api-doc → /api-design ──┬── /api-map ([2] kèm)
(bạn ở đây)                            └── (cách phối hợp)
                                              │ map hội tụ vào design, rồi mới:
                                              ▼
                          /api-checklist → /api-test → /api-readiness
```

Nói ngắn gọn: `/api-assess` trả lời **“có nên chọn bên này không?”**; `/api-doc` mới trả lời **“họ nhận gì, làm gì, trả gì?”**; `/api-design` trả lời **“hai bên phối hợp ra sao khi có sự cố?”**

***

## Xem thêm

- `explain-skills/api-family.md` — bức tranh đầy đủ về họ 7 lệnh API và thứ tự dùng.
- `/api-doc --feature <slug>` — đọc và diễn giải tài liệu/contract của đối tác đã chọn.
- `/api-design --feature <slug>` — thiết kế cách sản phẩm và đối tác phối hợp sau khi có quyết định.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
