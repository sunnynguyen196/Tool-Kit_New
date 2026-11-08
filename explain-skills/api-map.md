---
type: skill-explainer
skill: api-map
updated: 2026-07-15
---

# `/api-map` là gì và nó chạy như thế nào?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

## Mục 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

`/api-map` lập một **bảng tra dữ liệu ba tầng** cho một tính năng có tích hợp API: mỗi ô thông tin đối tác trả về đi vào đâu trong hệ thống của mình, rồi hiện lên màn hình nào, và được biến đổi ra sao trước khi hiện.

Nói đời thường, nó giống một **bảng tra kho hàng**: nhà thầu giao về một món (có mã, tên, số lượng) → mình cất vào kho nào → rồi món đó hiện lên hóa đơn hay màn hình của khách ở chỗ nào. Ba cột, đọc một hàng là biết cả đường đi của một mẩu dữ liệu từ đối tác tới mắt người dùng.

Nó trả lời các câu hỏi thực tế:

- Đối tác trả về ô `charge.status` — vậy trong hệ thống mình nó là thông tin gì, và hiện ở màn nào?
- Ô đó có cần **biến đổi** trước khi hiện không? Ví dụ `succeeded` (từ chuyên môn) phải đổi thành chữ khách đọc được là "Đã kích hoạt"; số `99000` phải định dạng thành "99.000đ".
- Có ô nào đối tác trả về mà **chẳng màn nào dùng tới** không? (thừa)
- Có chỗ nào màn hình **cần một thông tin mà đối tác không đưa** không? (thiếu)

Ví dụ: bạn tích hợp cổng thanh toán. Cổng trả về một đống trường dữ liệu. `/api-map` xếp chúng thành bảng: `charge.status → trạng thái Payment → badge trên màn kết quả (succeeded = "Đã kích hoạt")`, `charge.amount → số tiền → dòng "Số tiền: 99.000đ"`... Nhìn bảng là biết ngay màn kết quả cần lấy dữ liệu từ đâu, và chỗ nào còn hở.

Gõ lệnh như sau:

```text
/api-map --feature premium-payment
```

`--feature` là tên tính năng đang làm. Chưa ghi thì hệ thống cố suy từ ngữ cảnh, mơ hồ mới hỏi.

**Một câu để nhớ:** `/api-map` là **bảng tra đường đi của dữ liệu** — ô đối tác trả về → lưu ở đâu → hiện ở màn nào → đổi thế nào — và nó làm lộ ra chỗ dữ liệu bị thừa (không ai dùng) hoặc thiếu (màn cần mà không có).

***

## Mục 2. Toàn bộ luồng chạy — sơ đồ‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

```text
 BẠN GÕ LỆNH
 /api-map --feature premium-payment
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 1 — Xác định tính năng                            │
 │  Hiểu bạn đang lập bảng cho tính năng nào. Chưa rõ    │
 │  thì hỏi/chọn từ danh sách, KHÔNG tự đoán im lặng.    │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 2 — Đọc ba nguồn (không bịa field)               │
 │  • Bản tóm tắt API (đối tác trả về gì) — từ /api-doc  │
 │    HOẶC bản đặc tả SRS (nếu là API của mình).         │
 │  • Danh mục thông tin hệ thống lưu (từ sơ đồ dữ liệu).│
 │  • Các màn hình đã có (nếu có) — để biết field hiện ở │
 │    đâu.                                                │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 3 — Dựng bảng ba tầng                             │
 │  Mỗi ô đối tác trả về = 1 hàng: field API → thông tin │
 │  hệ thống → màn hình hiện → cách biến đổi.            │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 4 — Soi hai chiều tìm lỗ hổng (gap)              │
 │  • Field đối tác trả mà không màn nào dùng → thừa.    │
 │  • Màn cần dữ liệu mà đối tác không trả → thiếu.      │
 │  • Lỗi đối tác chưa có chỗ xử lý trên UI → cảnh báo.  │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 5 — Xem trước rồi mới ghi (xin phép)             │
 │  Báo sẽ map bao nhiêu field, phát hiện bao nhiêu gap. │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 6 — Ghi bảng + nhắc hội tụ vào bản thiết kế      │
 │  Ghi docs/{feature}/integration/api-map.md, và nhắc   │
 │  bạn đưa bảng này vào /api-design trước khi test.     │
 └──────────────────────────────────────────────────────┘
        │
        ▼
     HOÀN TẤT — có bảng tra dữ liệu + danh sách lỗ hổng
```

***

## Mục 3. Bảng ba tầng gồm những gì?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Mỗi hàng của bảng là hành trình của **một mẩu dữ liệu**, gồm các cột:

| Cột | Nghĩa dễ hiểu | Ví dụ |
|---|---|---|
| **Field API** | Ô thông tin đối tác trả về | `charge.status` |
| **Thông tin hệ thống** | Nó là gì trong dữ liệu của mình | trạng thái của Payment (giao dịch) |
| **UI field (màn hình)** | Hiện ở đâu cho người dùng thấy | badge trạng thái trên màn kết quả thanh toán |
| **Biến đổi / kiểm** | Cần đổi gì trước khi hiện | `succeeded` → "Đã kích hoạt"; `failed` → "Thất bại" |

Cột **biến đổi** là phần giá trị nhất, và nó viết bằng **ngôn ngữ nghiệp vụ**, không phải chuyện kỹ thuật lưu trữ. Ví dụ: "chia định dạng nghìn để ra 99.000đ", "đổi mã trạng thái sang chữ khách đọc được", "chỉ hiện 4 số cuối của thẻ, không hiện full số". Đây chính là chỗ QC dựa vào để viết test kiểu "API trả `status=succeeded` thì màn hình phải hiện 'Đã kích hoạt'".

***

## Mục 4. Phát hiện lỗ hổng (gap) — giá trị chính của lệnh‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Lập bảng không chỉ để tra cứu. Khi xếp mọi field vào bảng, hai loại lỗ hổng tự lộ ra — và đây mới là lý do nên chạy `/api-map`:‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

| Loại gap | Nghĩa dễ hiểu | Ví dụ |
|---|---|---|
| **Thừa** | Đối tác trả về một ô mà không màn hình nào dùng | cổng thanh toán trả `charge.paid` nhưng đã có `status` rồi, chẳng ai hiện `paid` |
| **Thiếu** | Màn hình cần một thông tin mà đối tác không trả | màn "quản lý gói" muốn hiện tên gói "Gói tháng", nhưng API chỉ trả mã `premium_monthly` → app phải tự có bảng dịch |
| **Lỗi chưa có chỗ** | Một mã lỗi của đối tác chưa được màn nào xử lý | đối tác có lỗi "giao dịch không thể hoàn" nhưng màn hoàn tiền chưa có thông báo cho nó |

Bắt sớm những lỗ hổng này rẻ hơn nhiều so với phát hiện lúc đã dựng xong màn hình hoặc đã lên thật. Ví dụ gap "thiếu tên gói" báo cho bạn biết **phải quyết định**: app tự giữ bảng dịch mã→tên, hay xin đối tác trả thêm. Quyết trước thì đỡ phải sửa sau.

***

## Mục 5. Khác `/api-design` thế nào — và vì sao phải "hội tụ"

Đây là điểm dễ nhầm nhất. `/api-map` và `/api-design` **liên quan chặt nhưng không cùng việc**:

- `/api-map` lo **tầng field**: từng ô dữ liệu đi đâu, hiện ở đâu, đổi thế nào. Nó là *bảng tra*.
- `/api-design` lo **tầng phối hợp**: lúc nào gọi đối tác, ai giữ sự thật về trạng thái, tin báo mất thì sao, số liệu lệch thì đối soát ra sao. Nó là *bản thiết kế lắp ráp* tổng thể.

Nhớ bằng ví dụ nhà thầu giao hàng: `/api-map` là bảng "mã vận đơn nằm ô nào, hiện màn nào"; còn `/api-design` là "lúc nào gửi đơn cho nhà thầu, họ báo giao trễ thì đơn ở trạng thái gì, ai kiểm khi hai bên báo khác nhau".

Vì vậy `/api-map` **không phải một nhánh chạy lẻ rồi thôi**. Bảng tra field là **một phần nằm trong bản thiết kế** — nó phải **hội tụ vào `/api-design` trước khi sang bước lập checklist test**. Lý do: field mapping ảnh hưởng thẳng tới việc test (kiểm biến đổi, kiểm trạng thái, kiểm định dạng). Nếu bảng map và bản thiết kế lệch nhau thì test sẽ kiểm nhầm. Nên sau khi chạy `/api-map`, lệnh luôn nhắc bạn đưa nó về `/api-design` để đóng vòng.

***

## Mục 6. Việc của BA/PO là gì, không phải việc gì?

`/api-map` là việc của BA/PO vì trọng tâm là **ý nghĩa nghiệp vụ của dữ liệu**: ô này để làm gì, hiện cho ai xem, đổi ra chữ gì cho khách hiểu, và chỗ nào còn hở so với nhu cầu.

Cột "biến đổi" mô tả nghiệp vụ ("`succeeded` → Đã kích hoạt"), **không** bàn chuyện kỹ thuật lưu trữ (kiểu dữ liệu trong database, tên cột kỹ thuật, cách chuyển đổi bằng mã lập trình). Những chuyện đó là của dev. BA chỉ cần chốt: dữ liệu này ý nghĩa gì, hiện ở đâu, và khách phải thấy chữ gì.

***

## Mục 7. Vị trí trong họ lệnh API

`/api-map` đi kèm chặng **[2] — thiết kế cách ráp** trong hành trình tích hợp, nằm dưới `/api-design`:

```text
/api-assess → /api-doc → /api-design ──┬── /api-map ([2] kèm — bạn ở đây)
                                       └── (cách phối hợp)
                                              │ map hội tụ vào design, rồi mới:
                                              ▼
                          /api-checklist → /api-test → /api-readiness
```

Trước nó: `/api-doc` (đối tác trả về những field gì). Kèm nó: `/api-design` (bản thiết kế tổng mà bảng map là một phần). Sau khi hội tụ: `/api-checklist` dùng cả hai để biết cần kiểm những gì.

***

## Xem thêm

- [api-family.md](api-family.md) — bức tranh đầy đủ về họ 7 lệnh API và thứ tự dùng chúng.
- [api-selection.md](api-selection.md) — chọn đúng lệnh API theo tình huống bạn đang gặp.
- [api-design.md](api-design.md) — bản thiết kế lắp ráp mà bảng map này hội tụ vào.
- [api-workflow.md](api-workflow.md) — quy trình làm việc API từ đánh giá đối tác đến sẵn sàng chạy thật.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
