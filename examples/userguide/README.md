# Ví dụ đầy đủ — Cẩm nang "Đăng ký khóa học AI4BA"

> Một cẩm nang vận hành hoàn chỉnh do skill `/userguide` sinh ra, hướng dẫn người dùng cách **đăng ký + thanh toán khóa AI4BA v2** trên [ai4ba.com](https://ai4ba.com). Toàn bộ nội dung và ảnh minh họa lấy từ **luồng đăng ký THẬT** (gói Trọn gói 3.200.000đ, mã giảm giá demo `EXAMPLE1D` giảm 1đ), chụp bằng chính engine Playwright của skill.
>
> Đây là bản mẫu để bạn đối chiếu khi chạy `/userguide` trên sản phẩm của mình.

---

## Cách xem

**Mở cẩm nang:** double-click `course-registration/../course-registration-userguide.html` (file `.html` ở thư mục `course-registration/`) — mở bằng trình duyệt, không cần server. Sidebar bên trái điều hướng theo nhóm; ô tìm kiếm lọc nhanh; các trang là section trong cùng một trang (SPA), cross-link nội bộ không mở file rời.

---

## Cấu trúc ví dụ

```
course-registration/
├── course-registration-userguide.html   ← CỬA VÀO: double-click mở browser (light-only, self-contained)
└── course-registration/                  ← folder bundle (mọi file phụ)
    ├── index.md                           ← master metadata + bảng Sections + Open Questions
    ├── data.js                            ← nội dung 6 trang nhúng cho file .html (window.GUIDE)
    ├── pages/                             ← 6 trang cẩm nang (zero-frontmatter, Every Page Is Page One)
    │   ├── 00-tong-quan.md                ← Tổng quan (Explanation)
    │   ├── 01-bat-dau-nhanh.md            ← Bắt đầu nhanh (Tutorial — 1 đường duy nhất)
    │   ├── huong-dan-dang-ky-tron-goi.md  ← How-to chi tiết (3 ảnh thật + 1 placeholder)
    │   ├── tra-cuu-goi-hoc-phi.md         ← Tra cứu (Reference — bảng khô)
    │   ├── xu-ly-su-co.md                 ← Xử lý sự cố (Troubleshooting)
    │   └── faq.md                         ← Câu hỏi thường gặp (FAQ)
    └── images/                            ← ảnh chụp thật từ ai4ba.com (callout đánh số)
        ├── 01-thong-tin-khoa-hoc.png      ← chọn gói + nút Đăng ký ngay  (callout 1,2)
        ├── 02-dien-thong-tin.png          ← form đã điền + mã giảm giá   (callout 1,2,3)
        ├── 03-quet-qr-thanh-toan.png      ← màn QR chờ xác nhận          (callout 1,2)
        └── 04-thanh-toan-thanh-cong.png   ← placeholder (chờ chụp thật sau thanh toán)
```

---

## Cẩm nang này minh họa gì

| Nguyên tắc của `/userguide` | Thể hiện trong ví dụ |
|---|---|
| **Xương sống Diátaxis** (6 trụ) | 6 trang chia đúng loại: Explanation · Tutorial · How-to · Reference · Troubleshooting · FAQ — nhưng tên trang thân thiện tiếng Việt, KHÔNG lộ chữ "Diátaxis" |
| **Không trộn loại trong 1 trang** | "Bắt đầu nhanh" đi 1 đường duy nhất; "Tra cứu học phí" là bảng khô; "How-to" là các bước task-based |
| **Tiêu đề How-to bắt đầu bằng động từ** | "Đăng ký gói Trọn gói và thanh toán qua QR" (động từ "Đăng ký") |
| **Every Page Is Page One** | Mỗi trang có context tối thiểu + mục "Liên quan" cross-link, không giả định đã đọc trang trước |
| **Ảnh thật + callout đánh số** | 3 ảnh chụp từ ai4ba.com, mỗi ảnh có badge số (1)(2)(3) khớp bảng thao tác 5 cột |
| **Placeholder cho ảnh chưa chụp được** | Màn "Thanh toán thành công" chỉ hiện sau thanh toán thật → để placeholder + brief chi tiết để chụp bổ sung |
| **Truy nguồn, không bịa** | index.md ghi nguồn mỗi trang; giá trị (giá gói, quyền lợi) lấy đúng từ trang thật; lịch khai giảng đánh Open Question vì thay đổi theo đợt |
| **Output gọn: 1 file mở + 1 bundle** | Top-level chỉ lộ file `.html`; index/data/pages/images gom trong folder bundle cùng tên |

---

## Luồng nghiệp vụ được tài liệu hóa

Đăng ký khóa học tự phục vụ trên một trang: **Chọn gói** (Trọn gói 3.200.000đ / Special 1 kèm 1 5.200.000đ) → **Điền thông tin** (họ tên, SĐT, email, Zalo, mã giảm giá, câu hỏi) → **Thanh toán** (quét QR chuyển khoản, đối chiếu số tiền + nội dung) → **Thành công** (hệ thống tự đối soát, hiện màn thành công + email xác nhận).

> Ví dụ này chọn cách **chụp web thật** thay vì đọc ngược BA docs — hợp lý khi sản phẩm đã chạy nhưng chưa có bộ SRS/use case. Khi bạn đã có BA docs (`docs/{feature}/`), `/userguide` sẽ đọc ngược chúng để dựng cẩm nang phủ rộng hơn (xem `../huong-dan/04-cach-hoat-dong.md`).
