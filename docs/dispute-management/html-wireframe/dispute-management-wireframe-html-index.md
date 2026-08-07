---
type: wireframe-html-index
feature: dispute-management
status: draft
updated: 2026-07-22
links:
  - docs/dispute-management/srs/dispute-management-userflow.md
---

# dispute-management — HTML Wireframes

> HTML wireframe files (B&W, static) cho các flows. Mỗi file = 1 luồng người dùng, double-click mở browser. Nguồn: `srs/dispute-management-userflow.md` (chia flow) + tài liệu nghiệp vụ (elements) — độc lập với `ascii-wireframe/`.

## Flows

| # | Flow | File | Screens (theo thứ tự) | Status | Updated |
|---|------|------|-----------------------|--------|---------|
| 1 | Tạo yêu cầu tra soát | [create-dispute-flow.html](create-dispute-flow.html) | dispute-list → dispute-list-all → search-original-tx → create-dispute-request → update-dispute-request | draft | 2026-07-22 |
| 2 | Phê duyệt tra soát | [approve-dispute-flow.html](approve-dispute-flow.html) | dispute-list → dispute-list-all → dispute-approval-list → dispute-detail | draft | 2026-07-22 |
| 3 | Trả lời tra soát | [reply-dispute-flow.html](reply-dispute-flow.html) | dispute-list → dispute-list-all → dispute-detail | draft | 2026-07-22 |

| 4 | Wireframe Portal Option 1 (Danh sách gộp + Role Switcher) | [dispute-management-wireframe.html](dispute-management-wireframe.html) | view-list → view-create → view-detail → view-reply | updated | 2026-07-28 |
| 5 | Wireframe Portal Option 2 (Tách Đã gửi / Đã nhận + Role Switcher) | [dispute-management-wireframe2.html](dispute-management-wireframe2.html) | sent-list-screen → received-list-screen → detail-ts-014 → detail-ts-015 → detail-ts-007 | updated | 2026-07-28 |
| 6 | Wireframe Portal Wireframe 3 (Chuẩn 100% WIREFRAME-SPEC & Verifier 19/19 PASS) | [wireframe3.html](wireframe3.html) | sent-list-screen → received-list-screen → detail-ts-012..detail-ts-019 → txSearchModal | created | 2026-08-07 |

## Links upstream

- [[docs/dispute-management/srs/dispute-management-userflow.md|User Flow]]
- [[docs/dispute-management/brainstorms/quan-ly-tra-soat.md|Brainstorms]]

## Changelog

> Newest on top. Routing: edits đến `{flow-slug}.html` → append entry ở đây với prefix `[{flow-slug}]`.

- [wireframe3.html] Created wireframe3.html based on wf2.html without modifying wf2.html. Passed 19/19 verification tests (2026-08-07)
- [dispute-management-wireframe.html & dispute-management-wireframe2.html] Updated both versions with Role Switcher (Maker vs Checker), 2-Swimlane state logic (ApprovePending, Approved, Cancel), [Cập nhật lại trả lời] for Maker and [Đồng ý Phê duyệt (Gọi Service QR)] for Checker (2026-07-28)
- [dispute-management-wireframe2.html] added Option 2 with sub-menu split for Sent (TCYCTS) & Received (TLTS) disputes (2026-07-24)
- [create-dispute-flow.html] initial flow wireframes generated (2026-07-22)
- [approve-dispute-flow.html] initial flow wireframes generated (2026-07-22)
- [reply-dispute-flow.html] initial flow wireframes generated (2026-07-22)

