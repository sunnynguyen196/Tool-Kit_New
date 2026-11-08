---
type: skill-explainer
skill: user-flow
updated: 2026-07-26
---

# `/user-flow` là gì và nó chạy như thế nào?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

## 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

`/user-flow` (user flow = "luồng đi của người dùng") là lệnh bạn gõ khi cần __vạch ra bản đồ__: một tính năng sẽ gồm những màn hình nào, người dùng đi từ màn này qua màn kia ra sao, và khi có sự cố (nhập sai, hết giờ...) thì đi đâu.

Hãy hình dung nó giống như __bản đồ tàu điện ngầm của một tính năng__: mỗi màn hình là một ga, các mũi tên là đường đi giữa các ga, và bản đồ chỉ rõ cả những nhánh rẽ khi có chuyện bất thường. Nó trả lời câu hỏi cốt lõi: *"tính năng này có mấy màn, đi lại thế nào, và chia thành mấy luồng con?"*

Đây là __bước làm rất sớm__ — làm trước khi vẽ bất kỳ màn hình cụ thể nào. Vài tình huống điển hình nên dùng:

* Bạn có một tính năng mới (vd "quên mật khẩu") và muốn xác định rõ nó gồm những màn nào trước khi bắt tay vẽ giao diện.
* Bạn chuẩn bị vẽ wireframe (bản nháp màn hình) nhưng chưa rõ nên chia thành mấy luồng, mỗi luồng gồm màn nào.
* Bạn muốn rà lại xem một tính năng đã tính đủ các tình huống chưa — không chỉ trường hợp "mọi thứ suôn sẻ" mà cả các trường hợp lỗi và ngoại lệ.

Gõ lệnh đơn giản như:

```
/user-flow forgot-password
```

Hoặc thậm chí chỉ cần mô tả bằng lời, chưa cần đặt tên tính năng:

```
/user-flow "người dùng quên mật khẩu, gửi mã OTP qua email, rồi đặt lại mật khẩu"
```

Hệ thống sẽ tự hiểu và đặt tên tính năng cho bạn (rồi hỏi xác nhận).

> __Một câu để nhớ:__ `/user-flow` = "vạch bản đồ các màn hình và đường đi của một tính năng — làm trước khi vẽ màn cụ thể".

---

## 2. Vì sao đây là bước ĐẦU TIÊN, và các bước sau dựa vào nó ra sao?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Điểm quan trọng nhất cần hiểu: `/user-flow` là __nguồn sự thật duy nhất__ cho việc "tính năng này chia thành mấy luồng, mỗi luồng gồm màn nào". Mọi lệnh vẽ màn hình phía sau đều __đọc lại bản đồ này__ để biết phải vẽ gì.

```
        /user-flow  ◄── bạn đang ở đây (vạch bản đồ luồng)
             │
             │  (tạo ra "bản đồ luồng" — dùng chung)
             │
     ┌───────┴───────┐
     ▼               ▼
 /wireframe-ascii   /wireframe-html
 (nháp bằng ký tự)  (nháp HTML đen trắng)
     │
     │  (bản nháp ASCII là nền cho bước đẹp)
     ▼
   /figma · /prototype-html
   (thiết kế đẹp có màu)
```

> __Lưu ý đường đi:__ `/figma` và `/prototype-html` (bước dựng bản đẹp) đọc __bản nháp ASCII__ làm nền cho phần *nội dung từng màn*. Nhưng `/prototype-html` __còn đọc thẳng bản đồ luồng này nữa__ — để lấy cách chia luồng, thiết bị chính, và __bảng chuyển màn__ (Mục 6). Nói cách khác nó nhận đầu vào từ __cả hai__, chứ không chỉ nối tiếp sau `/wireframe-ascii`. Bản HTML đen trắng là một cách xem khác cùng bậc với ASCII (đặc biệt hợp màn nhiều bảng/cột), không bắt buộc nằm trên đường lên bản đẹp.

Vì sao phải làm bản đồ trước? Hãy tưởng tượng bạn thuê thợ xây nhà mà chưa có bản vẽ mặt bằng — mỗi người tự đoán "chắc phòng khách ở đây, bếp ở kia", kết quả là mỗi người làm một kiểu, ráp lại không khớp. Bản đồ luồng chính là "bản vẽ mặt bằng" đó: một khi đã chốt, cả bản vẽ ASCII lẫn bản vẽ HTML đều __chia luồng giống hệt nhau__, không lệch. Và nếu sau này bạn sửa bản đồ, thì __lần chạy vẽ tiếp theo__ sẽ lấy bản đồ mới làm chuẩn — (lưu ý: nó không tự động sửa lại các bản vẽ đã tạo trước đó; bạn chạy lại lệnh vẽ thì bản mới mới theo bản đồ mới).

Nếu bạn gõ lệnh vẽ wireframe mà chưa có bản đồ này, hệ thống sẽ **tự chạy `/user-flow` trước** rồi mới vẽ — chính vì bước này là nền móng bắt buộc.

Một điều `/user-flow` __KHÔNG làm__: nó không vẽ chi tiết từng màn hình (đó là việc của `/wireframe-ascii` / `/wireframe-html`). Nó chỉ dừng ở mức "bản đồ" — có màn gì, đi đâu, chia luồng ra sao. Vẽ ruột từng màn là bước sau.

Một việc nhỏ mà quan trọng `/user-flow` __có làm__: nó hỏi bạn "tính năng này chủ yếu chạy trên __điện thoại, máy tính bảng, hay máy tính?__" và __ghi câu trả lời vào bản đồ__ (gọi là "thiết bị chính"). Nhờ vậy khi bạn vẽ wireframe hay dựng bản demo sau này, hệ thống biết luôn phải vẽ theo bề rộng nào, không phải hỏi lại. Còn phần __màu sắc và diện mạo__ thì nằm ở một file khác tên **`docs/design.md`** (bộ quy chuẩn thiết kế của dự án) — `/user-flow` không đụng tới màu, nhưng ở bước dựng bản đẹp (`/prototype-html`, `/figma`), hệ thống sẽ ghép "thiết bị chính" trong bản đồ với "màu sắc" trong `design.md` để ra giao diện hoàn chỉnh. Tóm lại: **bản đồ lo phần luồng + thiết bị, `design.md` lo phần màu — hai file bổ trợ nhau.**

---

## 3. Toàn bộ luồng chạy — sơ đồ‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Điểm đặc trưng nhất của lệnh này: nó __không bao giờ tự đoán bừa__. Chỗ nào chưa rõ về nghiệp vụ, nó dừng lại hỏi bạn. Và trước khi ghi bản đồ ra file, nó __dừng hẳn chờ bạn gõ chữ "chốt"__.

```
 BẠN GÕ LỆNH
 /user-flow forgot-password
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 1 — "Đã làm bản đồ này rồi chưa?"          │
 │  Nếu tính năng đã có bản đồ luồng ĐÃ DUYỆT từ trước → │
 │  hệ thống báo "dùng lại luôn" và dừng, khỏi làm lại.  │
 │  (cơ chế này tránh làm lại từ đầu — xem Mục 7)        │
 └──────────────────────────────────────────────────────┘
        │  (chưa có → làm tiếp)
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 2 — Đọc tài liệu nghiệp vụ đã có           │
 │  Đọc các ghi chép ý tưởng, yêu cầu người dùng... của  │
 │  tính năng để hiểu nó làm gì. Chưa có gì → hệ thống   │
 │  tự suy luận rồi hỏi bạn xác nhận ở bước sau.         │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 3 — HỎI những chỗ chưa rõ (KHÔNG đoán)     │  ◄── hỏi/đáp
 │  Hệ thống tóm tắt cách nó hiểu tính năng, rồi liệt kê │      nhiều vòng
 │  câu hỏi cho chỗ còn mơ hồ: "mã OTP sống mấy phút?",  │
 │  "sai bao nhiêu lần thì khoá?"... CHỜ bạn trả lời.    │
 │  Bạn chưa biết → nó ghi lại thành "câu hỏi mở", KHÔNG │
 │  tự bịa số. (vì sao → xem Mục 5)                      │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 4 — Dựng bản nháp bản đồ                    │
 │  Hệ thống lập: (1) danh sách màn hình, (2) cách chia  │
 │  luồng, (3) sơ đồ đường đi phủ đủ 3 loại tình huống:  │
 │  suôn sẻ / có lỗi / ngoại lệ (xem Mục 4).             │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 5 — Cho bạn xem bản mô tả, sửa tới khi ưng  │  ◄── sửa
 │  In ra bằng lời (không phải sơ đồ khó đọc): luồng     │      tối đa
 │  chính, các nhánh lỗi, danh sách màn, cách chia luồng.│      3 vòng
 │  "Đồng ý / Sửa / Hủy". Sửa tối đa 3 vòng.             │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 6 — "Trợ lý soát luồng" rà lại              │
 │  Mời trợ lý flow-reviewer đọc và bắt lỗi: luồng cụt?  │
 │  sót màn? thiếu tình huống? Hệ thống sửa theo góp ý.  │
 │  (xem Mục 6)                                          │
 └──────────────────────────────────────────────────────┘
        │
        ▼
   ┌────────────────────────────────────────────────────┐
   │  ██████████████  HARD STOP  ██████████████         │
   │                                                      │
   │  HỆ THỐNG DỪNG HẲN Ở ĐÂY.                           │
   │  In bản đồ (đã qua soát) + danh sách màn + cách chia │
   │  luồng, rồi chờ bạn gõ:                              │
   │      "chốt"  → đồng ý, ghi ra file                  │
   │      "sửa"   → quay lại chỉnh                       │
   │      "hủy"   → dừng, không ghi gì                   │
   └────────────────────────────────────────────────────┘
        │  (chỉ ghi khi bạn gõ "chốt")
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 7 — Xem trước file rồi ghi + tự kiểm sơ đồ  │
 │  Trước khi ghi, hệ thống còn cho bạn xem nhanh "sẽ tạo│
 │  file gì" và chờ bạn gõ Y lần cuối. Sau đó ghi bản đồ │
 │  ra file. Sơ đồ được viết bằng một "ngôn ngữ vẽ"      │
 │  (mermaid) — hệ thống tự kiểm xem có vẽ ra hình đúng  │
 │  không, lỗi thì tự sửa. (xem Mục 8)                   │
 └──────────────────────────────────────────────────────┘
        │
        ▼
     HOÀN TẤT — gợi ý bước tiếp: /wireframe-ascii, /wireframe-html, /srs
```

---

## 4. Vì sao phải phủ ĐỦ ba loại tình huống?‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Đây là một trong những giá trị lớn nhất của `/user-flow`. Nó không chỉ vẽ đường đi "khi mọi thứ suôn sẻ", mà buộc phải tính cả những lúc trục trặc. Ba loại tình huống:

1. __Suôn sẻ (happy case)__ — người dùng làm đúng, mọi thứ thành công. Vd: nhập email → nhận mã → đặt lại mật khẩu → xong.

2. __Có lỗi (error case)__ — người dùng làm sai hoặc hệ thống trục trặc. Vd: nhập sai mã OTP, mã hết hạn, nhập email không đúng định dạng.

3. __Ngoại lệ / trường hợp biên (edge case)__ — những tình huống ít gặp nhưng vẫn có thể xảy ra. Vd: email không tồn tại trong hệ thống, người dùng bấm nút hai lần, quay lại giữa chừng rồi làm lại.

Vì sao quan trọng? Vì __phần lớn lỗi phần mềm thực tế nằm ở nhóm 2 và 3, chứ không phải nhóm 1.__ Ai cũng nghĩ tới luồng suôn sẻ, nhưng dễ quên mất "nếu người dùng nhập sai 5 lần thì sao?", "nếu bấm gửi lại mã liên tục thì sao?". Nếu không tính từ đầu ở bước bản đồ, thì tới khi vẽ màn hình và code, những màn "báo lỗi", "báo hết hạn" sẽ bị bỏ sót — và người phát hiện ra thường là khách hàng khi đã dùng thật.

Bằng cách bắt bản đồ phủ đủ 3 loại ngay từ đầu, `/user-flow` giúp bạn nhìn thấy trước "à, tính năng này cần thêm màn thông báo mã hết hạn" — trước khi tốn công vẽ và code.

---

## 5. Vì sao "KHÔNG đoán" lại là nguyên tắc cứng?

Trong suốt quá trình, mỗi khi gặp chỗ chưa rõ về nghiệp vụ, `/user-flow` __dừng lại hỏi bạn__ thay vì tự điền một con số hợp lý. Ví dụ nó sẽ hỏi "mã OTP có hiệu lực bao lâu?", "sai bao nhiêu lần thì khoá tài khoản?" — chứ không tự quyết "chắc là 5 phút, khoá sau 3 lần".

Nếu bạn chưa biết câu trả lời, nó __ghi lại thành một "câu hỏi mở"__ (danh sách những điều còn phải chốt) — chứ tuyệt đối không bịa một giá trị rồi ghi vào tài liệu như thể đó là sự thật.

Vì sao khắt khe vậy? Vì bản đồ luồng là nền móng cho mọi bước sau. Nếu ở đây hệ thống tự bịa "mã sống 5 phút", thì con số bịa đó sẽ __lan xuống__ wireframe, rồi tài liệu kỹ thuật, rồi dev code theo — và không ai biết đó là số bịa cho tới khi nghiệp vụ thật hoá ra là 10 phút. Một con số sai ở gốc gây hậu quả dây chuyền.

Nói cách khác: `/user-flow` thà để lại một câu hỏi chưa trả lời (rõ ràng là "chưa biết") còn hơn điền một câu trả lời sai trông như đã biết. Điều chưa biết mà được ghi rõ thì dễ đi hỏi lại; còn điều bịa trông như thật thì âm thầm gây hại.

---

## 6. "Bảng chuyển màn" — thứ quyết định các nút bấm sau này

Ngoài sơ đồ và danh sách màn, bản đồ còn có một phần dễ bị bỏ qua nhưng rất quan trọng: __bảng chuyển màn__. Mỗi dòng trả lời đúng một câu: *từ màn nào, bấm cái gì, trong điều kiện nào, thì đi tới màn nào?*

| Từ màn | Đến màn | Bấm gì | Điều kiện |
|---|---|---|---|
| Nhập email | Nhập mã OTP | Bấm "Gửi mã" | email có trong hệ thống |
| Nhập email | *(ở nguyên tại chỗ)* | Bấm "Gửi mã" | email không tồn tại → hiện báo lỗi |
| Nhập mã OTP | Đặt mật khẩu mới | Bấm "Xác nhận" | mã đúng và còn hạn |‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Bảng này đáng đứng riêng vì nó là __nguồn duy nhất__ để các bản demo sau nối điều hướng: `/wireframe-html` và `/prototype-html` đọc thẳng nó, __không__ tự suy diễn lại từ sơ đồ — nhờ vậy chỉ cần sửa một nơi.

Kèm theo đó: __bảng phải phủ cả nhánh lỗi__, không chỉ đường đi suôn sẻ. Dòng "email không tồn tại → ở nguyên tại chỗ, hiện báo lỗi" trông thừa, nhưng thiếu nó thì bản demo sẽ không biết làm gì khi người dùng nhập sai.

---

## 7. "Trợ lý soát luồng" (flow-reviewer) làm gì?

Trước khi đưa bản đồ cho bạn chốt lần cuối, `/user-flow` mời một **trợ lý chuyên trách tên `flow-reviewer`** (vai "người soát trải nghiệm người dùng") đọc lại bản đồ và cho ý kiến độc lập — giống như nhờ một đồng nghiệp có con mắt UX rà giúp trước khi trình sếp.

Trợ lý này soi ba loại lỗi hay gặp mà người dựng bản đồ dễ bỏ sót:

* __Luồng cụt__ — có màn đi vào được nhưng không có đường ra (người dùng bị kẹt, không biết đi tiếp thế nào).
* __Sót màn hình__ — thiếu một màn cần thiết, vd quên màn "báo link đã hết hạn" hay màn "báo thành công".
* __Thiếu tình huống__ — bản đồ mới phủ luồng suôn sẻ mà chưa phủ đủ các trường hợp lỗi / ngoại lệ (nối tiếp ý ở Mục 4).

Sau khi trợ lý góp ý, hệ thống __tự sửa bản đồ cho tốt hơn__ (bổ sung màn thiếu, nối lại luồng cụt), rồi báo ngắn gọn cho bạn biết đã sửa gì. Nhờ bước này, tới lúc bạn chốt thì bản đồ đã được rà khá kỹ — đỡ cảnh vẽ xong màn hình rồi mới phát hiện thiếu.

Cần nhấn mạnh: __trợ lý chỉ góp ý cho tốt hơn, quyền chốt cuối cùng vẫn là bạn__ ở bước HARD STOP. Trợ lý không tự ý thay đổi quyết định nghiệp vụ của bạn.

---

## 8. Vì sao có bước "đã làm rồi thì dùng lại luôn"?

Ở Giai đoạn 1, nếu tính năng đã có bản đồ luồng __đã được duyệt từ trước__, hệ thống báo "dùng lại luôn" và dừng ngay, không bắt bạn làm lại từ đầu.

Vì sao cần cơ chế này? Vì bản đồ luồng được __rất nhiều bước sau đọc tới__ — mỗi lần bạn gõ `/wireframe-ascii`, `/wireframe-html`, hay `/srs`, chúng đều cần đọc bản đồ này. Nếu mỗi lần như vậy hệ thống lại chạy lại toàn bộ quá trình hỏi/đáp + soát + chốt thì cực kỳ phiền và mất thời gian.

Hệ thống giải quyết bằng cách __ghi một "dấu vân tay" của bản đồ lúc bạn chốt__ (gọi kỹ thuật là `flow_hash` — bạn không cần nhớ tên này). Lần sau khi cần dùng, nó so dấu vân tay:
* __Còn khớp__ (không ai sửa gì) → dùng lại luôn, khỏi hỏi.
* __Đã lệch__ (có người sửa bản đồ sau khi duyệt) → nó cảnh báo bạn "bản đồ đã đổi so với lúc duyệt", hỏi bạn muốn lấy bản mới làm chuẩn hay rà lại.

Nhờ vậy bạn chỉ phải làm bản đồ kỹ __một lần__, các lần sau nó tự dùng lại — trừ khi bạn chủ động nói "rà lại từ đầu".

---

## 9. Vì sao phải tự kiểm sơ đồ sau khi ghi file?

Bản đồ luồng được vẽ bằng một "ngôn ngữ vẽ sơ đồ" tên là __mermaid__ — bạn viết ra các dòng lệnh, và công cụ sẽ biến chúng thành hình vẽ (các ô, mũi tên). Vấn đề: nếu viết sai một chút cú pháp, hình sẽ __không vẽ ra được__ — và điều tệ là lỗi này không lộ ra ngay trong lúc trò chuyện, mà chỉ hiện khi bạn mở file bằng công cụ xem.

Để tránh việc bạn mở file ra mới phát hiện "sơ đồ bị vỡ", ngay sau khi ghi file, hệ thống __tự chạy một bước kiểm tra__: thử biến bản đồ thành hình xem có ra được không.
* __Ra được__ → báo "sơ đồ vẽ OK", xong.
* __Không ra được__ → hệ thống tự đọc lỗi và sửa (tối đa 2 lần). Vẫn không được thì báo bạn rõ chỗ lỗi, chứ không âm thầm để lại file hỏng rồi báo "xong".

Có một điểm tinh tế: __máy kiểm cho qua chưa chắc đã an toàn__ — công cụ bạn dùng để xem file sau này khắt khe hơn máy kiểm. Vì vậy hệ thống còn rà thêm một lượt theo quy tắc tương thích với các trình xem phổ biến, tránh cảnh kiểm thì qua mà mở thật lại vỡ.

Đây là chi tiết nhỏ nhưng thể hiện nguyên tắc chung: __không báo "hoàn thành" khi kết quả thực tế còn lỗi__ — và không coi "máy bảo qua" là bằng chứng đủ.

---

## 10. Ví dụ thực tế

Anh __Tuấn__, một BA, được giao làm tính năng "quên mật khẩu" mới toanh — chưa có tài liệu gì. Anh muốn vạch bản đồ luồng trước khi vẽ màn hình. Anh gõ:

```
/user-flow "người dùng quên mật khẩu, nhập email nhận mã OTP, rồi đặt lại mật khẩu"
```

1. Hệ thống thấy chưa có tính năng nào tên vậy, nên nó tự đề xuất tên `forgot-password` và hỏi anh Tuấn xác nhận. Anh đồng ý.

2. Chưa có tài liệu nghiệp vụ nào, nên hệ thống tự suy luận sơ bộ rồi chuyển sang hỏi. Nó tóm tắt cách hiểu, rồi hỏi: *"Mã OTP sống bao lâu? Sai bao nhiêu lần thì khoá? Nếu email không tồn tại thì báo gì?"* Anh Tuấn trả lời: mã sống 5 phút, sai 5 lần thì khoá. Riêng câu "email không tồn tại báo gì" anh chưa chắc — hệ thống __ghi lại thành câu hỏi mở__, không tự bịa.

3. Hệ thống dựng bản nháp bản đồ, in ra bằng lời cho anh Tuấn xem: luồng chính (nhập email → nhập OTP → đặt mật khẩu mới → thành công), các nhánh lỗi (OTP sai, OTP hết hạn), danh sách 4 màn, và cách chia thành 1 luồng. Anh Tuấn thấy thiếu, gõ: `Sửa: thêm màn báo khi tài khoản bị khoá do sai quá 5 lần`. Hệ thống vẽ lại có thêm màn đó.

4. Anh Tuấn gõ `Đồng ý`. Hệ thống mời trợ lý `flow-reviewer` rà lại. Trợ lý phát hiện: sau màn "OTP hết hạn" không có đường quay lại để gửi mã mới — một luồng cụt. Hệ thống tự bổ sung nút "gửi lại mã", rồi báo anh Tuấn: *"Đã thêm đường gửi lại mã sau khi OTP hết hạn theo góp ý của người soát luồng."*

5. Hệ thống dừng ở HARD STOP, in ra bản đồ hoàn chỉnh + danh sách 5 màn + cách chia luồng, và hỏi: *"Confirm để em ghi bản đồ? (chốt / sửa / hủy)"*. Anh Tuấn đọc, thấy ổn, gõ `chốt`.

6. Hệ thống cho anh Tuấn xem nhanh "sẽ tạo file bản đồ luồng ở đâu" và chờ anh gõ `Y` lần cuối. Anh gõ `Y`, hệ thống ghi file, rồi tự kiểm tra sơ đồ có vẽ ra hình được không — OK. Nó báo hoàn tất, kèm gợi ý: *"Xong bản đồ luồng. Bước tiếp anh có thể chạy `/wireframe-ascii forgot-password` để vẽ nháp màn hình bằng ký tự, hoặc `/wireframe-html` để xem đúng tỉ lệ trong trình duyệt."* File cũng ghi lại 1 câu hỏi mở ("email không tồn tại báo gì") để anh Tuấn nhớ đi hỏi Product Manager sau.

Toàn bộ quá trình, anh Tuấn không phải tự đoán gì: chỗ nào chưa rõ hệ thống đều hỏi, chỗ nào anh chưa biết thì được ghi lại rõ ràng, và bản đồ được rà kỹ trước khi chốt.

---

## Xem thêm

Tài liệu này chỉ giải thích ý tưởng và luồng chạy ở mức dễ hiểu. Muốn xem đầy đủ chi tiết kỹ thuật (từng Phase A–G, cấu trúc file, quy ước sơ đồ mermaid), đọc file gốc: `.claude/skills/user-flow/SKILL.md`.

Các lệnh liên quan (chạy SAU `/user-flow`):
* `/wireframe-ascii` — vẽ nháp màn hình bằng ký tự, hiện trong chat; xem `explain-skills/wireframe-ascii.md`.
* `/wireframe-html` — vẽ nháp màn hình dạng HTML đen trắng, đúng tỉ lệ thiết bị; xem `explain-skills/wireframe-html.md`.
* `/srs` — biến bản đồ + nghiệp vụ thành tài liệu đặc tả kỹ thuật đầy đủ.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
