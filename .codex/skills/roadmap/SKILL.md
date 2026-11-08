---
name: roadmap
description: Dùng khi cần xếp ưu tiên + phân đợt Now/Next/Later cho danh sách tính năng đã có trong PRD sản phẩm (docs/_product/prd.md).
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
user-invocable: true
disable-model-invocation: true
argument-hint: "(empty — hỏi chia Now/Next/Later hay theo quý)"
---
<!-- Licensed to nguyenduong280196@gmail.com — Order XKTV2KA26 -->

# /roadmap — Product Roadmap (project-level)‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

## Goal‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Từ Feature Map trong `docs/_product/prd.md`, sinh roadmap `docs/_product/roadmap.md`: __outcome/theme alignment__ làm khung sườn (Mục 1) → bảng prioritization (MoSCoW + RICE-lite band ordinal) → phân đợt __Now / Next / Later__ (hoặc __theo quý__ khi đã có deadline cam kết) → dependency map (bảo đảm thứ tự toàn chuỗi). Template: `_templates/roadmap.md` (Now/Next/Later) hoặc `_templates/roadmap-quarterly.md` (theo quý). Là cầu giữa `/prd` (định nghĩa tính năng) và `/brainstorm` (đào sâu từng feature — bắt đầu từ horizon Now).

## Constraints‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

### Hard rules — never violate‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

- __Hard prerequisite mềm__ — cần `docs/_product/prd.md` với Feature Map. Thiếu → đề xuất chạy `/prd` trước; nếu user khăng khăng, hỏi danh sách feature thủ công rồi proceed (warn "roadmap rời rạc, nên chạy /prd để có brief đầy đủ").
- __Project-level output__ — `docs/_product/roadmap.md` (singleton). KHÔNG per-feature.
- __Approval L1__ trước Write; __L2 diff__ khi file đã tồn tại (update mode tự động, không cần flag).
- __Format Now/Next/Later hay theo quý__ — user nói bằng lời ("chia theo quý", "dùng Q1/Q2/Q3"). User KHÔNG nói rõ → __hỏi 1 câu__ "Anh muốn xếp theo Now/Next/Later (outcome-based, chưa cần ngày cứng) hay theo quý (khi đã có deadline cam kết)?" trước khi compute; KHÔNG mặc định im lặng. Không dùng flag. __2 format = 2 template khác nhau__ (`roadmap.md` vs `roadmap-quarterly.md`) — chọn theo lời user, KHÔNG chỉ đổi chữ trong cột Horizon (xem Phase C).
- __Prioritization pipeline__ — MoSCoW khoanh phạm vi → RICE-lite band ordinal rank trong Must/Should → __dependency là hạn chế cứng__ (topological sort, xem Phase C) → __rủi ro là tín hiệu mềm__ (rủi ro cao chỉ flag cảnh báo + gợi ý cân nhắc lùi horizon, KHÔNG tự động hạ nếu đã có cách phòng rõ trong Feature Map) → đặt horizon theo rank + 2 quy tắc trên. Skill giải thích điểm số, KHÔNG bịa số.
- __Thông tin cấp dự án đọc + ghi vào profile__ — thuật ngữ gọi người dùng cuối (dùng khi hỏi Reach "bao nhiêu {người dùng}/quý") + domain: đọc `docs/_shared/project-profile.md` trước; thiếu thì hỏi rồi đề xuất ghi vào profile. Per @../../rules/project-profile.md.
- __RICE-lite là band ordinal, KHÔNG phải RICE đo lường thật__ — `(Reach × Impact × Confidence) ÷ Effort`, thang Reach/Impact 1-5, Confidence 0.5/0.8/1.0, Effort S=1/M=2/L=3. Con số (vd `5.3`) CHỈ để xếp hạng tương đối trong 1 phiên, KHÔNG so sánh giữa các lần chạy / nguồn dữ liệu khác. Luôn ghi rõ điều này trong doc (blockquote đầu Mục 2 của template). Reach lý tưởng = số người/quý thật (ghi kèm nếu user có), fallback band 1-5 khi không có số.
- __KHÔNG bịa Reach/Impact — phải HỎI (P0 fix)__ — công thức cần 4 tham số; Feature Map KHÔNG có Reach/Impact. Phase B PHẢI hỏi cả 4 (Reach, Impact, Confidence, Effort) per feature bằng business-language. Feature nào user không ước lượng được → để `TBD`, KHÔNG tự chấm số rồi xếp hạng giả (vi phạm "KHÔNG bịa số"). Feature toàn TBD → xếp band bằng MoSCoW + dependency-readiness + confidence, ghi rõ "chưa đủ data cho RICE".
- __Dependency-readiness ≠ Chi tiết hóa__ — Feature Map có cột `Phụ thuộc` (tên) + `Chi tiết hóa` (✅/⬜, = đã brainstorm chưa). NHƯNG "đã chi tiết hóa" KHÔNG đồng nghĩa "dependency đã sẵn sàng để build lên trên". Với mỗi dependency (feature nội bộ HOẶC hệ thống ngoài), Phase B hỏi thêm __trạng thái sẵn sàng__ (đã có sẵn / đang làm / chưa bắt đầu). "Hard constraint" áp theo readiness này, KHÔNG suy từ dấu ✅.
- __Interview gọn — dependency/risk lấy thẳng từ Feature Map, KHÔNG hỏi lại__ — `/prd` đã có 3 cột Phụ thuộc/Rủi ro chính/Đo thành công per feature. Chỉ hỏi nếu Feature Map để TBD ở cột đó (kể cả dạng `TBD [NEEDS CLARIFICATION: ...]` — gợi ý trong ngoặc dùng làm câu hỏi mở đầu luôn). Chỉ hỏi mới: __Reach, Impact, Effort, Confidence + Evidence__, và __trạng thái sẵn sàng của mỗi dependency__. Per no-re-ask ba-conventions Mục 2.
- __Evidence đi kèm Confidence__ — mỗi feature hỏi Confidence (cao/vừa/thấp) PHẢI kèm hỏi Evidence (Giả định / Tín hiệu gián tiếp / Dữ liệu trực tiếp). Confidence "cao" mà Evidence "Giả định" là mâu thuẫn — hỏi lại xác nhận trước khi ghi.
- __IT-BA framing__ — effort hỏi ở mức "nhẹ/vừa/nặng" hoặc T-shirt size (S/M/L), KHÔNG hỏi story point / sprint velocity / tech estimate.
- __Đồng bộ với brief__ — đọc cột Chi tiết hóa của brief; feature `✅ đã chi tiết` được __ưu tiên TRONG nhóm không bị dependency chặn__ (✅ = đã brainstorm, KHÔNG phải "vé vào Now" — dependency-readiness mới quyết, xem constraint trên). Feature `⬜ chưa` thường vào Next/Later.
- __Vietnamese-first__ default, auto-detect từ brief. Muốn tiếng Anh thì nói "viết bằng tiếng Anh". Frontmatter tối giản (type/status/updated/format/next_review/links — không changelog/owner/created, xem rules/changelog.md + naming-conventions.md). `next_review` = mốc rà soát lại roadmap (điền theo horizon Now, để trống nếu chưa rõ).
- __Dọn frontmatter di sản khi update (P1-2)__ — roadmap cũ còn `owner`/`created`/`changelog` (schema trước 2026-07-12) → update mode __đề xuất bỏ qua L2 diff__ (lịch sử đã ở `docs/_shared/changelog.md`, tác giả ghi per-event). KHÔNG tự xóa im lặng — user Y ở L2 mới bỏ. `format` trơn (chỉ `now-next-later`) → giữ, chỉ thêm `next_review` nếu thiếu. Áp cùng lúc với nội dung update (1 L2 diff gộp cả frontmatter + body), KHÔNG tách vòng riêng.
- __KHÔNG có Phase resolve-OQs upstream chain__ — roadmap không sinh OQ nghiệp vụ mới (chỉ planning OQ ghi Mục 7). Bỏ Phase E nặng; chỉ ghi OQ planning nếu có.

### Pitfalls — easy to get wrong‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

- __Brief chưa có__ — đừng tự bịa feature list. Đề xuất `/prd` trước. Chỉ proceed thủ công nếu user yêu cầu rõ.
- __Feature mới thêm sau khi roadmap đã sinh__ — gọi lại `/roadmap`, skill tự đọc lại Feature Map, chèn feature mới vào horizon phù hợp, L2 diff phần thay đổi.
- __RICE-lite là band ordinal, KHÔNG bịa số__ — luôn ghi "band ordinal, xếp hạng tương đối, không phải đo lường tuyệt đối" (blockquote template). Reach/Impact PHẢI hỏi user (Phase B), KHÔNG tự chấm. Thiếu → `TBD` + xếp band bằng MoSCoW/readiness/confidence, KHÔNG xếp hạng giả. Con số `5.3` chỉ để so tương đối trong 1 phiên — đừng so giữa các lần chạy khác nguồn dữ liệu.
- __Dependency-readiness ≠ Chi tiết hóa (✅)__ — feature `✅ đã chi tiết` (đã brainstorm) KHÔNG phải "vé vào Now". "Hard constraint" áp theo __trạng thái sẵn sàng của dependency__ (hỏi ở Phase B), không suy từ dấu ✅. Feature ✅ chỉ được ưu tiên TRONG nhóm không bị dependency chặn.
- __Topological sort — áp invariant toàn chuỗi__: `horizon(dependency) ≤ horizon(feature)` cho MỌI cạnh, không chỉ 1 tầng. Chuỗi A→B→C: A ở Later thì B,C không thể ở Now/Next trước A. Không thỏa được → flag "blocked", để BA quyết.
- __Dependency vòng__ (A cần B, B cần A) — phát hiện khi dựng DAG (Phase C bước 1) → cảnh báo user, đề xuất tách hoặc chọn 1 cái làm nền. Dependency vòng là lỗi dữ liệu ở `/prd`, KHÔNG áp được topological sort cho tới khi user gỡ vòng.
- __Dependency là hạn chế cứng nhưng KHÔNG override MoSCoW__ — feature Must bị chặn bởi dependency vẫn là Must, chỉ dời horizon (Next/Later), KHÔNG hạ priority.
- __2 format = 2 template__ — Now/Next/Later dùng `_templates/roadmap.md`; theo quý dùng `_templates/roadmap-quarterly.md` (section `Qx YYYY` + Gantt Mục 1, invariant `quarter(A) ≤ quarter(B)`). KHÔNG nhồi nhãn quý vào khung Now/Next/Later.
- __Outcome-first__ — Outcome mỗi giai đoạn đứng TRƯỚC bảng xếp hạng; feature liệt kê dưới mỗi outcome. Đừng để bảng feature+điểm làm phần chính (rơi anti-pattern feature-list roadmap).
- __Diagram = Mermaid, KHÔNG ASCII__ — dependency map dùng `graph LR` tô màu; format quý thêm `gantt` timeline (Mục 1). Verify compile (`.claude/scripts/mermaid-verify.mjs --file`) trước khi báo xong. Gantt CHỈ cho format quý (có ngày thật) — Now/Next/Later không Gantt (false precision).
- __KHÔNG meta-text trong doc (ba-conventions Mục 0)__ — CẤM blockquote giải thích section ("Khung sườn là outcome...", "Đã spec hoặc discovery..."), câu mô tả rỗng dài dòng ("(Trống — sản phẩm có N feature...)"). Horizon rỗng → "*(chưa có)*" ngắn hoặc bỏ. Giọng câu liền mạch, gọn, KHÔNG label cứng `*Outcome:*/*Rủi ro:*` dày. Giữ được: chú thích công thức RICE + chú giải màu diagram (người đọc cần).
- __Rủi ro cao KHÔNG tự động hạ horizon__ — chỉ flag cảnh báo trong report. User có quyền chấp nhận rủi ro và vẫn làm Now (vd đã có mitigation ở Feature Map). Skill không tự quyết thay user.
- __Chia theo quý nhưng không có deadline__ — cảnh báo timeline theo quý dễ "false precision" ở giai đoạn discovery; gợi ý Now/Next/Later. Vẫn làm nếu user khăng khăng.
- __User không nói cách chia__ — hỏi 1 câu (Now/Next/Later hay theo quý) trước khi compute, KHÔNG tự mặc định. Đây là quyết định planning của user, không suy bừa.
- __Đồng bộ ngược brief__ — KHÔNG tự sửa Feature Map của brief từ roadmap (1 chiều: brief → roadmap). Muốn sửa feature thì chạy `/prd` (tự vào update mode).
- __Brief cũ chưa có cột Phụ thuộc/Rủi ro/Đo thành công/Evidence__ — không lỗi, chỉ hỏi bổ sung qua Phase B như feature thiếu thông tin bình thường (không cần user tự sửa `/prd` trước).
- __Frontmatter di sản (owner/created/changelog)__ — roadmap cũ còn field này (schema trước 2026-07-12): update mode đề xuất bỏ qua L2 diff (không tự xóa). Lịch sử → `changelog.md`, tác giả → cột @author per-event. `status: stale` từ hook → refresh về `draft`/`in-review` phù hợp khi update.
- __Hook stale__ không áp `_product/`.

## Inputs

```
/roadmap                          # đọc brief, hỏi cách chia (Now/Next/Later hay quý) + effort/dependency
/roadmap chia theo quý            # nói bằng lời → xếp theo Q thay vì Now/Next/Later
```

Muốn đổi hành vi mặc định, nói bằng lời (không cần flag):
- Roadmap đã tồn tại → gọi lại `/roadmap`, skill tự vào update mode (L2 diff).
- Chia theo quý thay vì Now/Next/Later → nói "chia theo quý". Không nói rõ → skill hỏi lại trước khi xếp.
- Viết bằng tiếng Anh → nói "viết bằng tiếng Anh".

## Context (dynamic)

Today: !`date +%Y-%m-%d`
Brief tồn tại: !`test -f docs/_product/prd.md && echo "YES" || echo "CHƯA — chạy /prd trước"`
Roadmap tồn tại: !`test -f docs/_product/roadmap.md && echo "YES (tự vào update mode)" || echo "chưa có"`

***

## Approach

### Phase A — Load brief & Context (silent)

1. Read `docs/_product/prd.md`. Không có → đề xuất `/prd` trước (xem Constraints).
2. Parse Mục 7 Feature Map — 2 nguồn: __bảng index__ ({slug, tên, theme, persona, MoSCoW, phụ thuộc, cột Chi tiết hóa}) + **mini-brief `### 7.{n}` mỗi feature** ({mô tả what/why/outcome, phạm vi v1/chưa làm, luồng chính, __rủi ro chính, đo thành công__, OQ riêng}). Brief cũ schema bảng-rộng (chưa có mini-brief) → đọc mọi cột từ bảng như trước, không lỗi.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍
3. Detect mode: roadmap đã tồn tại → tự động continuation mode (Read full trước, L2 diff khi Edit). Chưa tồn tại → create mode.
4. @author (cho activity log) resolve qua memory `user-identity` — KHÔNG đưa vào frontmatter. Detect language.

### Phase B — Interview (gọn, chỉ phần thiếu)

> Hỏi theo cụm, KHÔNG re-hỏi cái brief đã có. Trình cho user bảng features từ brief rồi xin bổ sung. Dependency/Rủi ro (tên) đã có trong Feature Map → chỉ hỏi feature nào để TBD. Nhưng Reach/Impact/Effort/Confidence + readiness của dependency thì KHÔNG có trong brief → phải hỏi.

1. __Reach__ — mỗi feature chạm bao nhiêu người dùng trong 1 quý? Có số thật thì cho em số (vd ~2000 học viên/quý); không có thì ước lượng band: rất ít / ít / vừa / nhiều / rất nhiều. Đề xuất band nháp từ persona ở brief, user chỉnh. Không ước lượng được → `TBD`.
2. __Impact__ — với người chạm feature đó, tác động cỡ nào? nhỏ / vừa / lớn / rất lớn. (band 1-5, đề xuất nháp từ mini-brief "Đo thành công").
3. __Effort__ — mỗi feature nặng cỡ nào? S / M / L. Đề xuất ước lượng nháp, user chỉnh. (KHÔNG hỏi story point / sprint / man-month kỹ thuật — IT-BA framing.)
4. __Confidence + Evidence__ — độ chắc chắn về giá trị/cách làm mỗi feature (cao/vừa/thấp)? Kèm ngay: "căn cứ vào đâu" — Giả định / Tín hiệu gián tiếp / Dữ liệu trực tiếp. Confidence "cao" + Evidence "Giả định" mâu thuẫn → hỏi lại xác nhận. Confidence thấp hoặc Evidence = Giả định → thường đẩy về Later/cần validate trước.
5. __Dependency + trạng thái sẵn sàng__ — CHỈ hỏi tên dependency nếu Feature Map để TBD. NHƯNG với MỌI dependency (cả cái brief đã ghi), hỏi __trạng thái sẵn sàng__: đã có sẵn / đang làm / chưa bắt đầu (áp cho cả hệ thống ngoài như Stripe, hệ thống nội bộ). Đây là dữ liệu cho hard-constraint (Phase C), KHÔNG suy từ dấu ✅ Chi tiết hóa.
6. __(Nếu MoSCoW trong brief trống/mơ hồ)__ — xác nhận Must/Should/Could/Won't cho từng feature.
7. __(Nếu user chọn chia theo quý)__ — có mốc thời gian/deadline cam kết (pháp lý / ra mắt / đã hứa stakeholder) nào không? Quý nào?

> __Feature toàn TBD ở Reach/Impact__ (user không ước lượng được cái nào) → KHÔNG ép, KHÔNG tự chấm. Ghi TBD, và Phase C xếp band feature đó bằng MoSCoW + dependency-readiness + confidence thay vì điểm RICE (ghi rõ trong doc "chưa đủ data cho RICE").

### Phase C — Compute + Synthesize

1. __RICE-lite score__ mỗi feature = (Reach × Impact × Confidence) ÷ Effort — __band ordinal, xếp hạng tương đối__, thang Reach/Impact 1-5, Confidence 0.5/0.8/1.0, Effort S=1/M=2/L=3. In công thức + số + tuyên bố "không phải đo lường tuyệt đối" (blockquote đầu Mục 2 template). Feature có Reach hoặc Impact = TBD → KHÔNG tính điểm, để `TBD` ở cột Điểm, xếp band bằng bước 2 dưới (MoSCoW + readiness + confidence).
2. __Phân horizon — topological sort trước, xếp điểm sau:__
   - __Bước 1 — Dựng đồ thị dependency + kiểm vòng__: build DAG từ cột Phụ thuộc. Có vòng (A→B→A) → cảnh báo, KHÔNG áp constraint tới khi user gỡ (xem Pitfalls).
   - __Bước 2 — Dependency là hạn chế cứng (áp toàn chuỗi, KHÔNG chỉ 1 tầng)__: topological sort đồ thị. Với mỗi cạnh A→B (B phụ thuộc A), áp **bất biến `horizon(A) ≤ horizon(B)`**. Dependency có __trạng thái sẵn sàng ≠ "đã có sẵn"__ (đang làm / chưa bắt đầu — từ Phase B) → feature phụ thuộc nó KHÔNG được vào Now, đẩy xuống horizon sau, bất kể điểm RICE. Chuỗi A→B→C: nếu A ở Later thì B,C không thể ở Now/Next trước A. Không thỏa được invariant do capacity/quý → flag "blocked", để BA quyết, KHÔNG tự xếp bừa.
   - __Bước 3 — Xếp theo điểm__ trong số feature còn được phép ở mỗi tầng: __Now__ — Must + điểm cao + không bị chặn + (ưu tiên feature đã `✅`/`🔄` chi tiết — nhưng CHỈ trong nhóm không bị dependency chặn, ✅ không phải "vé vào Now"). __Next__ — Must/Should điểm vừa, hoặc chờ dependency ở Now. __Later__ — Could, confidence thấp, hoặc phụ thuộc sâu.
   - __Bước 4 — Rủi ro là tín hiệu mềm__: feature vào Now nhưng Rủi ro chính chưa có cách phòng rõ → KHÔNG tự động hạ, chỉ flag cảnh báo kèm feature đó trong report (xem Phase E).
   - __Nếu user chọn chia theo quý__ → thay 3 horizon bằng các quý; áp cùng invariant nhưng là `quarter(A) ≤ quarter(B)`; gán quý gần/xa theo deadline cam kết (Phase B câu 7).
3. **Dependency map — Mermaid `graph LR`** (KHÔNG ASCII — khó đọc, viền lệch). Node feature + `[Tên hệ thống]` cho hệ thống ngoài, phản ánh topological order. Tô màu theo horizon bằng `classDef` (vd xanh=Now/Q sớm, vàng=Next/Q sau, xám=hệ thống ngoài). Verify compile qua `node .claude/scripts/mermaid-verify.mjs --file <path>` trước khi báo xong.
4. __Timeline Gantt (CHỈ khi format theo quý)__ — Mermaid `gantt` (Mục 1 của `roadmap-quarterly.md`): mỗi feature 1 task với mốc bắt đầu + độ dài (từ deadline cam kết Phase B câu 7 + effort). Dependency dùng `after {task-id}`. __KHÔNG vẽ Gantt cho format Now/Next/Later__ — chưa có ngày cứng, Gantt sẽ là false precision (dùng flowchart phụ thuộc thôi). Mốc suy nháp → nói rõ ở report "mốc ước lượng, user chỉnh".
5. __Evidence gate check__ — đếm feature ở horizon Now có Evidence = "Giả định". Nếu ≥ phần lớn (>50%) → chuẩn bị dòng cảnh báo cho Phase E report. NGOÀI RA: 1 feature Must quan trọng (điểm cao) dựa trên "Giả định" cũng flag riêng dù chưa tới 50%.
6. __Fill template đúng format__: `_templates/roadmap.md` (Now/Next/Later, 8 mục) HOẶC `_templates/roadmap-quarterly.md` (theo quý, 8 mục — Mục 1 = Gantt timeline). __Outcome mỗi giai đoạn đứng trước bảng xếp hạng__ (outcome-first — feature liệt kê dưới mỗi outcome). Điền `next_review` frontmatter. Điền Mục 8 Bước tiếp theo (gợi ý `/brainstorm` feature đầu Now/quý sớm nhất).
7. __DOC SẠCH — KHÔNG meta-text (bắt buộc, per ba-conventions Mục 0)__: doc sinh ra CHỈ chứa nội dung nghiệp vụ thật + số liệu. CẤM tuyệt đối: blockquote giải thích section là gì ("Khung sườn của roadmap là outcome...", "Đã spec hoặc đang discovery..."), câu mô tả trạng thái rỗng dạng giải thích ("(Trống — sản phẩm hiện có N feature...)" → nếu horizon rỗng chỉ ghi ngắn "*(chưa có)*" hoặc bỏ section). Chú thích công thức RICE + chú giải màu diagram được giữ (người đọc cần để hiểu số/hình). Giọng văn: câu liền mạch, gọn, KHÔNG label cứng kiểu `*Outcome:* ... *Rủi ro:* ...` dày đặc — viết như người kể cho đồng nghiệp.

### Phase D — Approval + Write

1. __L1 plan preview__ (prose BA-friendly per ba-conventions Mục 5 — prose nghiệp vụ, KHÔNG bảng `path|action|summary` kiểu dev):
   > Em sẽ {tạo mới | cập nhật} `docs/_product/roadmap.md` ({format}):
   > - __Outcome chính:__ {theme → outcome 1 dòng mỗi horizon}
   > - __Now ({n}):__ {list slug} · __Next ({n}):__ {list slug} · __Later ({n}):__ {list slug}
   > - Phụ thuộc chính: {A → B, ...}
   > - {nếu có} Feature bị đẩy lùi vì phụ thuộc chưa sẵn sàng: {list + lý do}.
   > - {nếu có} Feature chưa đủ data cho RICE (Reach/Impact TBD): {list}.
   > - {nếu evidence gate trigger} Cảnh báo: {N} feature ở Now còn dựa trên giả định chưa kiểm chứng.
   > - Ghi nhận activity log: "{note}".
   >
   > Apply? (Y / sửa)
2. __L2 diff — CHỈ khi update (file đã tồn tại)__: sau khi user Y ở L1, render __unified diff__ giữa roadmap cũ và bản mới (≥3 dòng context) → "Apply diff? (Y / n / sửa)". KHÔNG dùng 1 câu "Apply?" của L1 thay cho L2 (per approval-gate.md — L1 hỏi "làm gì", L2 cho user thấy CHÍNH XÁC đổi gì: horizon feature nào dời, điểm nào đổi, có nuốt Mục 8/OQ cũ không). Create mode (chưa có file) → bỏ qua L2, đi thẳng Write.
3. __Write / Edit__. Trước khi ghi set đủ env `CLAUDE_SKILL_NAME=/roadmap` + `CLAUDE_CHANGELOG_AUTHOR={@author}` + `CLAUDE_CHANGELOG_NOTE` (≤80 ký tự, vd `initial roadmap {format}, Now({n})/Next({n})/Later({n})`) — hook ghép cả dòng vào changelog.md.

### Phase E — Final report

```
✅ Roadmap: docs/_product/roadmap.md ({format})

Outcome khung sườn: {theme/outcome mỗi horizon 1 dòng}

Now:   {features} ← bắt đầu /brainstorm từ đây
Next:  {features}
Later: {features}

{nếu có feature bị đẩy lùi vì dependency chưa sẵn sàng:}
⏸  Đẩy lùi vì phụ thuộc: {feature} chờ {dependency} ({trạng thái sẵn sàng}) xong trước.

{nếu có feature Reach/Impact = TBD:}
❓ Chưa đủ data cho RICE (xếp band tạm bằng MoSCoW/confidence): {list} — bổ sung ước lượng để xếp chính xác hơn.

{nếu evidence gate trigger (Phase C bước 4):}
⚠️  {N}/{tổng Now} feature ở Now đang dựa trên "Giả định" (chưa kiểm chứng) — cân nhắc
    validate (user interview/prototype test) trước khi đầu tư build: {list feature}.

Recommended next:
  - /brainstorm {slug đầu Now}   — đào sâu feature đầu tiên ở horizon Now (roadmap đã xếp)
  - /prd             — nếu cần thêm/sửa tính năng trong brief (tự vào update mode) rồi chạy lại /roadmap
```

> __Nối downstream (P1-4)__: roadmap Now là điểm khởi đầu cho `/brainstorm`. Final report LUÔN nêu tên slug đầu horizon Now (không để `/brainstorm <slug>` chung chung) để user chỉ cần copy chạy tiếp. `/brainstorm` không-arg cũng đọc `roadmap.md` gợi ý slug đầu Now (xem brainstorm/SKILL.md).

## Output

`docs/_product/roadmap.md` — project-level singleton (`type: roadmap`).

Gồm Prioritization (MoSCoW → RICE-lite) + phân đợt Now/Next/Later hoặc theo quý + Dependency Map. Đọc 1 chiều từ `docs/_product/prd.md` Feature Map — KHÔNG sửa ngược PRD.

Hook tự ghi 1 dòng vào `docs/_shared/changelog.md`.

## References

- @../../rules/ba-conventions.md
- @../../rules/project-profile.md
- @../../rules/approval-gate.md
- @../../rules/naming-conventions.md
- @../../rules/changelog.md
- @../../../_templates/roadmap.md
- @../../../_templates/roadmap-quarterly.md‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
