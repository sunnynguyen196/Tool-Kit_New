---
name: ac
description: Dùng khi cần sinh/sửa/review acceptance criteria (Given/When/Then) cho user story. `/ac <feature>` (hỏi scope) hoặc `/ac <feature> --story us-NNN`.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
user-invocable: true
argument-hint: "[<feature>] [--story <us-NNN|path>] [--fr FR-{feature}-NNN]"
---
<!-- Licensed to nguyenduong280196@gmail.com — Order XKTV2KA26 -->

# /ac — Acceptance Criteria Generator / Repair / Review‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

## Goal‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

Generate, repair, hoặc review-only acceptance criteria cho user stories. AC **declarative theo business outcome** (mô tả kết quả nghiệp vụ quan sát được, KHÔNG mô tả click/field/UI mechanics), atomic, testable, linked tới FR/screen/error code. ID scope per-story.

> **AC ≠ test case.** AC chốt **business outcome + rule + branch có rủi ro** — đủ để PO/BA/Dev/QA hiểu cùng 1 kết quả, map được tới **≥1 test** nhưng KHÔNG phải toàn bộ test suite. Chi tiết boundary/format/max-length/mọi role/loading/empty state thuộc **test design của QA**, KHÔNG nhồi hết vào AC (trừ khi chính nó là hành vi nghiệp vụ/compliance được yêu cầu). Xem mục Pitfalls.

## Constraints‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

### Hard rules — never violate‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

- **L2 diff per story** trước Edit.
- **L1 batch confirm** khi làm cả feature (nói "làm hết" hoặc không chỉ định story cụ thể).
- **Clarify-first, OQ là fallback.** Nguồn (SRS/Error Matrix/rule/screen) thiếu thông tin **chặn viết AC** → **hỏi user làm rõ trước** (business language, no-re-ask); chỉ đánh **Open Question** khi user không trả lời được. KHÔNG bịa để lấp, KHÔNG đánh OQ ngay mà bỏ qua bước hỏi. Chỗ thiếu không chặn viết AC (chi tiết QA thuần) → bỏ qua, không hỏi/không OQ. Xem Approach bước 3b.
- **Mode review** ("chỉ review AC thôi", "check coverage giùm") — analysis-only, không edit.
- **Mode repair** (story đã có AC, cần sửa) — preserve existing AC IDs.
- **Mode detection mơ hồ → xác nhận trước khi ghi.** Với thao tác **write** (generate/repair), nếu câu user không tách bạch rõ mode ("làm AC đi" khi story đã có AC) → hỏi 1 câu chốt mode (generate mới / repair / chỉ review) trước Edit. KHÔNG đoán mode rồi ghi đè.
- **Generate mode gặp story ĐÃ CÓ AC** — KHÔNG append scenario mới đè lên (dễ trùng/mâu thuẫn ID). Nhận diện coverage hiện có → **tự chuyển sang repair/review** + báo user "story đã có {N} AC, chuyển repair — bổ sung chỗ thiếu thay vì sinh lại".
- **AC ID `AC-{NNN}`** per-story scope (file). KHÔNG renumber on repair.
- **Vietnamese-first** content; Gherkin keywords English.
- **Feature/story chưa tồn tại → REFUSE + route `/userstory`** (per `feature-bootstrap.md` nhóm B) — AC ghi vào story, không có `us-*.md` thì không có chỗ đặt AC, tự bịa story sẽ sai. **SRS mỏng/chưa approved (nhưng story đã có) → soft gate warn + proceed** (build AC từ US content).
- **BA conventions** (must follow) — Owner resolution từ memory `user-identity`, no-re-ask rule, IT-BA framing, Vietnamese typography, L1 prose preview. Per @../../rules/ba-conventions.md.

### Pitfalls — easy to get wrong‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍

- **Feature/story hoàn toàn không tồn tại** — refuse + route `/userstory {feature}` (không tự tạo feature/story, không bịa AC vào chỗ trống). Đây KHÁC "story đã có nhưng SRS/error matrix mỏng" (case đó soft gate proceed).
- **Story không có linked FR** — ask user infer hoặc add warning, vẫn proceed.
- **Error matrix missing** (story đã có) — generate happy + business-rule ACs. **Chỉ khi story CÓ error-path nghiệp vụ thật cần AC mà thiếu contract** (không phải lỗi/boundary QA thuần) → **hỏi user error behavior** (bước 3b, business language: "case fail nào? báo gì cho user?") trước khi fallback OQ "error-path AC pending error matrix". Story không có error-path nghiệp vụ áp dụng → bỏ qua, không hỏi/không OQ. User trả lời → viết error-path AC từ đó (đánh dấu là quyết định user cung cấp). **Nếu story động tới tiền/pháp lý/an toàn mà vẫn chưa chốt được → đánh dấu OQ này là BLOCKING DoR** (không để team hiểu nhầm thiếu handling lỗi là chấp nhận được), gợi ý bổ sung Error Matrix qua `/srs` trước khi dev.
- **Existing ACs mixed format** (bullet + Gherkin) — repair mode: normalize only if user approves.
- **Multiple screens linked** — group ACs by screen với header `### {screen}` trong AC section.
- **Edit nhiều stories (cả feature)** — show count, hỏi confirm trước proceed (`L1 plan preview`).
- **AC ID continuity** — preserve trên repair, append new on generate. Gap OK (AC-001, AC-003 nếu AC-002 deleted).
- **Compound AC — split có điều kiện, KHÔNG mù.** "user submits AND email sent": nếu email là **outcome cam kết của cùng 1 giao dịch** (submit thành công thì email PHẢI gửi) → GIỮ 1 AC (tách ra che mất tính toàn vẹn giao dịch). Chỉ split khi 2 hành vi **thật sự độc lập** (có thể pass/fail riêng, không ràng buộc giao dịch).
- **Negative/error theo rủi ro, KHÔNG theo quota.** `@qa-reviewer` rubric chỉ **flag warning** khi story có rủi ro rõ mà thiếu negative — KHÔNG ép "1 negative mỗi category". Story đơn giản không cần negative; story tiền/pháp lý cần nhiều.
- **Thứ tự ưu tiên nguồn khi mâu thuẫn:** SRS FR/BR/Error Matrix (contract) > UC (hành vi) > screen (chỉ presentation). Screen KHÔNG chứng minh rule/permission/backend outcome — **KHÔNG suy AC validation/error từ screen** khi spec chưa cam kết; chỗ thiếu → **hỏi user làm rõ trước** (bước 3b), không chốt được mới đánh OQ, tuyệt đối không bịa.
- **UC thường chỉ mô tả happy flow** — đối chiếu alternate/exception flow trong `flows.md` để không sót edge case; thiếu và chặn viết AC → hỏi user làm rõ trước (bước 3b), chưa chốt được mới đánh OQ.
- **AC vs test case** — nếu 1 tiêu chí chỉ là boundary/format/max-length/browser/locator thuần kỹ thuật → KHÔNG đưa vào AC, ghi chú "thuộc test case QA". AC map ≥1 test nhưng không thay thế test suite (exploratory/regression/security/performance).
- **`/ac` không edit AC trực tiếp** — edit `## Acceptance Criteria` section trong US file (inline). KHÔNG tạo file riêng. Update = semantic diff phần AC, KHÔNG regenerate toàn story.

## Inputs

```
/ac                                              # interactive: pick feature, then stories
/ac <feature>                                    # hỏi scope: cả feature / 1 story / 1 FR
/ac <feature> --story us-NNN                     # 1 story (auto-resolve path)
/ac <feature> --story <full-path>                # 1 story explicit path
/ac <feature> --fr FR-{feature}-NNN              # all stories covering 1 FR
```

Muốn chỉ review coverage (không sửa) hoặc chỉ sửa lỗi AC cũ (không sinh mới) — nói bằng lời, vd "chỉ review AC giùm, đừng sửa" hoặc "story này AC đang lộn xộn, sửa lại giúp".

## Context (dynamic)

Today: !`date +%Y-%m-%d`
Features có US: !`for d in docs/*/userstories/; do [ -d "$d" ] && dirname "$d" | xargs basename; done | head -10`

## Approach

1. **Resolve targets.** Mode generate (default), repair, review. Phân biệt 2 case (per `feature-bootstrap.md` nhóm B):
   - **Feature/story KHÔNG tồn tại** (feature chưa có `docs/{feature}/userstories/us-*.md`, hoặc arg gõ sai) → **REFUSE tường minh + route**: "Chưa thể chạy `/ac` cho `{feature}` — thiếu `us-*.md` (cần story để gắn AC). Feature hiện có: {list}. Chạy `/userstory {feature}` trước để tạo story, rồi quay lại." KHÔNG tự tạo feature/story.‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍
   - **Story tồn tại** → proceed. (SRS/error matrix mỏng chỉ là soft gate ở bước 3, không phải chặn.)
2. **Read** SRS spec + screens + error matrix + target stories.
   - **KG chọn nguồn trước (rẻ hơn scan):** chạy `node .claude/skills/kg/engine/kg-query.mjs coverage {feature}` và `node .claude/skills/kg/engine/kg-query.mjs facts {feature}` để lấy danh sách candidate/coverage, rồi VẪN Read đầy đủ prose file đã chọn. Tuân `.claude/rules/kg-usage.md` (3 nghĩa vụ: `--all` khi bị cap · đọc mục "Phải Read tay" · `KG-ERROR` → scan trực tiếp như cũ).
3. **Soft gate** SRS/error matrix missing (nhưng story đã có) → warn + ask proceed (build AC từ US content).
3b. **Clarify-first khi nguồn thiếu (KHÔNG đánh OQ ngay).** Trước khi đánh Open Question cho 1 chỗ mơ hồ, **hỏi user làm rõ** — OQ chỉ là fallback khi user không trả lời được. Gom các điểm mơ hồ thật sự chặn việc viết AC (outcome/rule/threshold/error-path thiếu contract) → hỏi **từng nhóm một, business language, theo no-re-ask rule** (KHÔNG hỏi lại điều spec/US/session đã có). Ví dụ: "Đơn thanh toán thất bại thì hệ thống báo gì cho khách?", "Có giới hạn số lần thử lại không?", "Ai được phép hủy sau khi đóng gói?". Quy tắc:
   - User **trả lời** → dùng câu trả lời làm nguồn viết AC (đánh dấu là quyết định nghiệp vụ user cung cấp, KHÔNG phải Fact-từ-spec sẵn có). Gợi ý user cân nhắc bổ sung ngược vào `/srs` để chốt chính thức.
   - User **"bỏ qua"/"chưa biết"/"để sau"** → lúc này mới đánh **Open Question** (KHÔNG chặn tiến độ, vẫn sinh phần AC khác được).
   - KHÔNG **bịa** số liệu/quyền/error contract để lấp — hỏi hoặc OQ, không tự điền.
   - Chỗ mơ hồ **không chặn** viết AC (nice-to-have, chi tiết QA thuần) → KHÔNG hỏi, KHÔNG OQ — bỏ qua theo nguyên tắc AC≠test case.
4. **For each story, sinh AC theo business outcome + rủi ro thực** (KHÔNG theo quota category cứng). Các loại AC **có thể** xuất hiện — chỉ sinh loại **áp dụng thật** cho story:
   - **happy-path** — outcome nghiệp vụ chính đạt được (Given precondition, When event, Then observable business result).
   - **business rule / branch** — mỗi rule/policy/threshold có rủi ro → 1 scenario (gom dưới `Rule:` nếu nhiều biến thể cùng rule).
   - **error-path** — link `E-{feature}-NNN` khi error là hành vi nghiệp vụ được yêu cầu. Error Matrix thiếu → **hỏi user error behavior trước** (bước 3b); user không chốt được mới đánh OQ. KHÔNG bịa error contract.
   - **permission** — chỉ khi story có ràng buộc phân quyền nghiệp vụ thật.
   - **validation cấp nghiệp vụ** — chỉ những ràng buộc **làm đổi kết quả nghiệp vụ**; boundary/format thuần kỹ thuật → để test case QA, KHÔNG thành AC.
   - **KHÔNG có quota "≥1 negative mỗi category".** Negative/error sinh theo rủi ro của story: 1 lỗi tiền/pháp lý có thể cần nhiều scenario; story đơn giản có thể không cần negative nào.
5. **Generate AC blocks** từ `_templates/ac-block.md`. ID `AC-{NNN}` (per-story scope, scan existing max + 1 trong file). Nhiều biến thể cùng 1 rule → dùng `Rule:` gom + `Scenario Outline` + example table (thay vì lặp nhiều block phẳng gần giống nhau). AC declarative (outcome), tránh liệt kê click/field/locator.
6. **Mode repair** (story đã có AC, user nói "sửa lại AC"/"AC đang lộn xộn") — preserve existing IDs. Fix non-testable criteria. Split compound **chỉ khi 2 hành vi thật sự độc lập** (không split outcome cam kết cùng giao dịch — xem Pitfalls).
7. **Mode review** (user nói "chỉ review AC"/"check coverage giùm") — output findings BLOCKING/WARNING/SUGGESTION, KHÔNG edit.
8. **L1 batch preview** khi làm cả feature (không chỉ định story cụ thể):
   ```
   [/ac] Sẽ edit {N} stories:
     # | path | action | summary
     1 | us-001.md | edit | generate 5 ACs (2 happy, 1 validation, 1 error, 1 ui)
   Apply? (Y/n/select):
   ```
9. **L2 diff per story:**
   ```
   [N/M] docs/{feature}/userstories/us-001.md
   --- old
   +++ new
   ...
   Apply? (Y/n/edit-prompt: <feedback>/skip)
   ```
   - `Y story 1` → ask "Apply same pattern cho stories còn lại? (Y/n)" để giảm friction.
10. **Activity.log (hook tự ghi)** (us files zero-frontmatter — KHÔNG ghi vào us file). Mỗi story edited: set env `CLAUDE_SKILL_NAME=/ac` + `CLAUDE_CHANGELOG_AUTHOR={@author}` + `CLAUDE_CHANGELOG_NOTE=[us-NNN] generated {N} ACs (outcome/rule/error)` (≤80 ký tự) trước edit; hook ghép cả dòng.
11. **Output summary** — stories touched, ACs generated/repaired, warnings.

## Output

**KHÔNG tạo file mới.** AC ghi **inline** vào section `## Acceptance Criteria` của `docs/{feature}/userstories/us-{NNN}.md` (file zero-frontmatter).

ID `AC-{NNN}` scope per-story (theo file). Mode repair giữ nguyên ID cũ, không renumber.

Hook tự ghi 1 dòng vào `docs/_shared/changelog.md` cho mỗi story bị sửa.

## References

- @../../rules/ba-conventions.md
- @../../rules/approval-gate.md
- @../../rules/kg-usage.md
- @../../rules/naming-conventions.md
- @../../rules/feature-bootstrap.md
- @../../rules/delivery-readiness.md
- @../../rules/review-format.md
- @../../rules/changelog.md
- @../../../_templates/ac-block.md‍‌​‌‌​​‌​‌​‌‌‌‌‌​‌​‌​‌‌​‌​​​‌​​​‌‌‌​‌​​‌‌​‌​​‌‌‌​​‌‌​‌‌‌‌​‌‌‌​‌​​‌‌‌​‌​‌​‌‌​​‌‌​​‌‌‌‌​​‌​​‌​​‌​‌‌​‌​​​‌‌‌​​​‌‌​‌​​‌​‌‌‌​​​‌‌​‌‌‌‌‍


<!-- wm:160b985c6b06ce6563ee2ce12d9493cd -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
