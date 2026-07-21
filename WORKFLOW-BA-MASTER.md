# BỘ WORKFLOW SKILL HOÀN CHỈNH CHO BUSINESS ANALYST (AI4BA MASTER WORKFLOW)

> **AI4BA (AI cho Business Analyst)** — Giải pháp chuẩn hóa toàn bộ vòng đời phân tích nghiệp vụ bằng trí tuệ nhân tạo.
> Triết lý cốt lõi: **Human-in-the-loop (HITL)** — AI hỗ trợ tăng tốc, BA giữ quyền kiểm soát và đưa ra quyết định nghiệp vụ cuối cùng.

---

## 🏛️ 1. TRIẾT LÝ VÀ BỘ QUY TẮC NỀN TẢNG (BA CONVENTIONS & GOVERNANCE)

Mọi Skill trong bộ toolkit này đều tuân thủ 5 nguyên tắc bắt buộc:

1. **Business Language First (Ngôn ngữ nghiệp vụ là ưu tiên hàng đầu)**:
   - Trong giai đoạn Brainstorm, URD, BRD, SRS, User Guide: Không hỏi hoặc viết tên bảng DB (`tbl_order`), endpoint API (`POST /api/v1/checkout`), framework (`React/Node`).
   - Mọi trao đổi đều dùng thuật ngữ nghiệp vụ thuần túy mà Stakeholder & Product Manager có thể đọc hiểu.

2. **Ép Độ Cụ Thể (Specific Metrics & Wording)**:
   - Không chấp nhận câu trả lời mơ hồ như "xử lý nhanh", "báo lỗi phù hợp", "giới hạn vừa đủ".
   - Bắt buộc làm rõ con số cụ thể: *“bao nhiêu lần/phút?”*, *“thời gian hết hạn OTP là bao nhiêu giây?”*, *“câu thông báo lỗi nguyên văn là gì?”*.

3. **Approval Gate (Human-In-The-Loop - Duyệt trước khi ghi)**:
   - AI không tự động ghi đè file tài liệu khi chưa có sự đồng ý của BA.
   - AI sẽ tạo bản xem trước Level 1 (L1 Preview), trình bày tóm tắt cho BA xem. BA gõ `Y` hoặc đồng ý thì AI mới thực hiện lưu file.

4. **Kế Thừa Open Questions (OQ Continuity)**:
   - Mọi câu hỏi chưa trả lời được (Open Questions) ở giai đoạn Brainstorm/BRD sẽ tự động được gắn ID (`OQ-01`, `OQ-02`...) và đẩy sang các giai đoạn sau (`/srs`, `/diagram`, `/wireframe`) để tiếp tục theo dõi cho đến khi chốt.

5. **Khai Thác Thông Tin Có Sẵn (No Re-ask)**:
   - AI chủ động quét các file context có sẵn (`notes/`, `docs/`, `srs/`) trước khi đặt câu hỏi. Không hỏi lại những gì người dùng đã cung cấp.

---

## 🔄 2. MA TRẬN VÒNG ĐỜI DỰ ÁN BA (4-PHASE BA PIPELINE)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               AI4BA MASTER PIPELINE                                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐      /brainstorm      ┌──────────────────────────────────────────────┐
│  PHASE 1:        │ ────────────────────► │ • Idea & Problem Statement                   │
│  BRAINSTORM &    │                       │ • BRD / URD (Business Requirements)          │
│  REQUIREMENTS    │                       │ • Feature Specification (SRS 12 Mục)        │
│                  │                       │ • User Story & Acceptance Criteria (AC)      │
└──────────────────┘                       └──────────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐      /user-flow       ┌──────────────────────────────────────────────┐
│  PHASE 2:        │      /bpmn            │ • User Flow & Navigation (Mermaid/PlantUML)  │
│  DIAGRAMMING &   │      /sequence        │ • BPMN 2.0 Process Diagram (Layout Engine)   │
│  MODELING        │      /usecase-diagram │ • Use Case & System Interaction Diagram      │
│                  │      /erd, /state     │ • ERD / DBML Data Architecture              │
└──────────────────┘                       └──────────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐      /wireframe-html  ┌──────────────────────────────────────────────┐
│  PHASE 3:        │ ────────────────────► │ • Interactive HTML Wireframes                │
│  INTERACTIVE     │                       │ • Single-File Navigation & Side Menu         │
│  WIREFRAMING     │                       │ • Form Simulation & Validation States        │
│                  │                       │ • Dev/Tester Annotations & Annotate Notes    │
└──────────────────┘                       └──────────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐      /userguide       ┌──────────────────────────────────────────────┐
│  PHASE 4:        │ ────────────────────► │ • Phase 1: Structure & Manual Outline        │
│  USER GUIDE &    │                       │ • Phase 2: Page Breakdown & Screenshots      │
│  RELEASE MANUAL  │                       │ • Interactive HTML Guide Viewer Bundle       │
└──────────────────┘                       └──────────────────────────────────────────────┘
```

---

## 📖 3. HƯỚNG DẪN CHI TIẾT TỪNG GIAI ĐOẠN SKILL

### 💡 GIAI ĐOẠN 1: BRAINSTORM & XÂY DỰNG ĐẶC TẢ YÊU CẦU

#### Skill: `/brainstorm`
- **Mục tiêu**: Biến câu ý tưởng ban đầu thành Board đặc tả 12 mục hoàn chỉnh.
- **Cách kích hoạt**:
  ```bash
  /brainstorm [mô tả ý tưởng hoặc đường dẫn tới file ý tưởng]
  ```
- **Ví dụ**:
  - `/brainstorm Tính năng đăng ký và đăng nhập bằng OTP WhatsApp cho App Bán Hàng`
  - `/brainstorm @notes/checkout-flow-ideas.md`
  - `/brainstorm Đổi giao diện nút bấm dark mode, brainstorm nhanh gọn` *(Chế độ nhanh)*

- **Quy trình 4 Pha của `/brainstorm`**:
  1. *Pha 1 - Phát hiện & Xác nhận*: Suy đoán tên Feature ID & Title, kiểm tra độ phức tạp (Payment, OAuth, Webhook, State...).
  2. *Pha 2 - Phỏng vấn sâu (Deep Interview)*: Hỏi lần lượt theo 7 nhóm chủ đề (Luồng chính, Ngoại lệ, Trạng thái, Số liệu con số, Wording thông báo lỗi...).
  3. *Pha 3 - Kiểm tra & Tổng hợp Board 12 Mục*:
     - Mục 1: Thông tin chung & Mục tiêu nghiệp vụ
     - Mục 2: Danh sách Actor / Roles
     - Mục 3: Luồng chính (Happy Path) & ASCII Diagram
     - Mục 4: Các điểm ra quyết định (Decision Points Matrix)
     - Mục 5: Ma trận kịch bản ngoại lệ (Scenario Matrix)
     - Mục 6: Chuyển đổi trạng thái (State Transition Table)
     - Mục 7: Xử lý giao dịch bị gián đoạn (Interrupted Transaction Matrix)
     - Mục 8: Bảng số liệu & Giới hạn kỹ thuật nghiệp vụ (Metrics & Business Limits)
     - Mục 9: Nguyên văn câu từ thông báo (Exact Wording & Toast Messages)
     - Mục 10: Ràng buộc Bảo mật & Tuân thủ (Security & Compliance)
     - Mục 11: Danh sách Open Questions (OQs)
     - Mục 12: Nhật ký thay đổi (Changelog)
  4. *Pha 4 - Approval Gate & Ghi file*: Hiển thị L1 Preview -> Người dùng gõ `Y` -> Lưu file tại `docs/brainstorm/[feature-id].md`.

---

### 🎨 GIAI ĐOẠN 2: SƠ ĐỒ HÓA VÀ MÔ HÌNH HÓA NGHIỆP VỤ

Sau khi có file Brainstorm/SRS, BA tiến hành vẽ sơ đồ để trực quan hóa cho Team Dev và QA.

#### 1. Skill `/user-flow`
- **Mục tiêu**: Biến luồng nghiệp vụ trong SRS thành sơ đồ Mermaid / PlantUML thể hiện hành trình của người dùng qua từng màn hình.
- **Lệnh**: `/user-flow @docs/brainstorm/auth-otp.md`

#### 2. Skill `/bpmn`
- **Mục tiêu**: Tạo quy trình nghiệp vụ chuẩn quốc tế BPMN 2.0 (XML/SVG) kèm theo layout tự động (Grid/ELK Layout Engine) và file HTML Viewer tương tác.
- **Lệnh**: `/bpmn Quy trình duyệt vay vốn tín chấp doanh nghiệp`

#### 3. Skill `/sequence`
- **Mục tiêu**: Vẽ sơ đồ tương tác theo thời gian giữa User, UI, API Gateway, Backend Services, Third-party Webhook.
- **Lệnh**: `/sequence Luồng thanh toán qua Cổng VnPay`

#### 4. Skill `/usecase-diagram`
- **Mục tiêu**: Tổng hợp danh sách Use Cases và sự tương tác giữa các Actor với các Subsystem.
- **Lệnh**: `/usecase-diagram @docs/srs/shopping-cart.md`

#### 5. Skill `/erd` & `/dbdiagram`
- **Mục tiêu**: Thiết kế mô hình dữ liệu thực thể (Entity Relationship) chuẩn hóa dưới dạng Mermaid, PlantUML hoặc DBML.
- **Lệnh**: `/erd Sơ đồ dữ liệu Quản lý Đơn hàng và Vận chuyển`

---

### 🖥️ GIAI ĐOẠN 3: THIẾT KẾ WIREFRAME HTML TƯƠNG TÁC

#### Skill: `/wireframe-html`
- **Mục tiêu**: Sinh bộ Wireframe HTML giao diện chuẩn responsive, chạy trực tiếp trên trình duyệt mà không cần cài Figma hay Axure.
- **Đặc điểm nổi bật**:
  - Giao diện hiện đại, bóng bẩy (Clean Modern UI / Glassmorphism / Dark-Light Mode).
  - Tích hợp Thanh điều hướng bên hông (Side Navigation Index) để chuyển đổi giữa các màn hình.
  - Mô phỏng tương tác thật: Điền form, bật modal popup, chuyển tab, thông báo lỗi.
  - Tích hợp tab **Dev & QA Annotations**: Giải thích chi tiết Validation rule, Field spec, Business logic từng nút bấm cho Coder/Tester.

- **Lệnh thực thi**:
  ```bash
  /wireframe-html @docs/brainstorm/checkout-flow.md
  ```
- **Kết quả đầu ra**:
  - File HTML gốc: `wireframes/checkout/index.html`
  - Bộ các màn hình HTML thành phần: `login.html`, `cart.html`, `payment.html`, `success.html`.

---

### 📚 GIAI ĐOẠN 4: HƯỚNG DẪN SỬ DỤNG VÀ ĐÓNG GÓI BÀN GIAO

#### Skill: `/userguide`
- **Mục tiêu**: Tạo bộ tài liệu Hướng dẫn Sử dụng Sản phẩm (User Manual) đầy đủ hình ảnh, trực quan cho end-user và đội hỗ trợ CS/Operations.

- **Quy trình 2 Pha**:
  - **Pha 1 (Structure & Outline)**: AI đọc SRS/Wireframe để lên danh sách các trang hướng dẫn theo từng vai trò (Admin, Customer, Staff).
  - **Pha 2 (Page Generation & Screenshot Integration)**: AI tự động viết nội dung chi tiết từng trang, tích hợp công cụ Playwright chụp ảnh màn hình wireframe/website thật, và đóng gói thành ứng dụng **Interactive User Guide Viewer HTML**.

- **Lệnh thực thi**:
  ```bash
  /userguide @wireframes/checkout/index.html
  ```

---

## 🛠️ 4. HƯỚNG DẪN CÀI ĐẶT TRÊN CÁC NỀN TẢNG AI

### 1. Claude Code
Trong thư mục dự án BA của bạn:
- Skill được tự động nhận diện trong thư mục `.claude/skills/`.
- Rule được nhận diện trong `.claude/rules/`.
- Chạy lệnh trực tiếp bằng dấu gạch chéo `/`: `/brainstorm`, `/user-flow`, `/wireframe-html`, `/userguide`.

### 2. Google Antigravity IDE
- Bản copy của Skill và Rule đã được đặt sẵn tại `.agents/skills/` và `.agents/rules/`.
- Bạn chỉ cần mở Antigravity tại workspace `C:\Users\Admin\BATOOLKIT` và gõ yêu cầu tương ứng.

### 3. Codex CLI
- Các skill nằm trong thư mục `.codex/skills/`.

---

## 📋 5. TỔNG KẾT BỘ FILE TÀI NGUYÊN TRONG WORKSPACE

| Thư mục / File | Mô tả chức năng |
| :--- | :--- |
| **`WORKFLOW-BA-MASTER.md`** | Tài liệu Master Workflow Hướng dẫn toàn bộ quy trình (File bạn đang đọc) |
| **`index.html`** | Ứng dụng Web BA Workflow Dashboard tương tác trực quan |
| **`.claude/skills/`** | Chứa 15 Skill chuyên sâu phục vụ đủ 4 giai đoạn làm việc BA |
| **`.claude/rules/`** | Chứa 12 Bộ Quy tắc Chuẩn hóa Nghiệp vụ (HITL, BA Language, OQs) |
| **`_templates/`** | Mẫu khung tài liệu chuẩn cho Brainstorm, Diagram, Wireframe, Guide |
| **`examples/`** | Các dự án mẫu đã được render sản phẩm thật (Food Delivery, Auth, Enrich Translate) |
