---
name: figma
description: Vẽ wireframe/giao diện lên Figma desktop thông qua kết nối MCP (figma-ui-mcp). Kích hoạt bằng `/figma <feature>`. Yêu cầu đã có `html-wireframe/` hoặc `srs/{feature}-userflow.md` trước đó. Skill tự động check kết nối, quét các styles/variables hiện có, và vẽ đầy đủ mọi màn hình cùng các kịch bản lỗi.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, AskUserQuestion
user-invocable: true
disable-model-invocation: true
argument-hint: "<feature> [--flow <flow-slug>]"
---

# /figma — Figma UI Generator via MCP Bridge

> Skill chạy `context: fork` (read HTML wireframes + compose Figma JS code). Main context giữ sạch.

## Goal

Đọc đặc tả nghiệp vụ (`srs/{feature}-userflow.md`) và mã nguồn giao diện HTML tĩnh (`html-wireframe/`) để **tự động vẽ toàn bộ giao diện hoàn chỉnh lên Figma Desktop** thông qua Figma MCP Bridge (`figma-ui-mcp`). 

Quy tắc tối thượng: **Vẽ đầy đủ tất cả các màn hình và tất cả các kịch bản/cases nghiệp vụ (Happy path, Alternate paths, Error states, Loading/Empty states, Confirmation Modals) xếp song song nhau để nhóm Dev & QA có cái nhìn toàn diện.**

## Constraints

- **Kiểm tra kết nối Figma chủ động (Pha A)**: Trước khi làm bất cứ việc gì, gọi `figma_status` để kiểm tra kết nối.
  - Nếu `pluginConnected: false`, dừng ngay lập tức (HARD STOP) và in thông báo hướng dẫn:
    ```
    ⚠️ CHƯA KẾT NỐI FIGMA DESKTOP
    Vui lòng làm theo các bước sau để khởi động bridge:
    1. Mở phần mềm Figma Desktop.
    2. Mở file thiết kế của bạn.
    3. Vào Plugins → Development → Figma UI MCP Bridge → Run.
    ```
  - Sau khi kết nối thành công, kiểm tra danh sách `sessions`. Nếu có nhiều file đang mở, yêu cầu người dùng chọn session (hoặc chọn session phù hợp nhất với tên feature).
- **Quy tắc đầy đủ Màn hình & Cases nghiệp vụ (Pha D)**: 
  - Không được bỏ sót bất kỳ màn hình nào được liệt kê trong `srs/{feature}-userflow.md`.
  - Phải vẽ các trạng thái loại trừ nhau (Success state, Error state, Loading, Empty...) thành các Frame riêng biệt đặt cạnh nhau (ví dụ: `Đăng nhập - Mặc định`, `Đăng nhập - Lỗi OTP`, `Đăng nhập - Chờ gửi lại OTP`).
  - Mỗi Dialog/Modal popup phải được vẽ cả trạng thái ẩn (màn hình nền) và trạng thái hiển thị Modal (nổi đè lên màn hình).
- **Quét Design Tokens & Components (Pha B)**: Gọi `figma_rules` trước khi viết mã để lấy danh sách Variables, Paint Styles, Text Styles và Local Components có sẵn trong file Figma. Xây dựng lookup map để bind Token thay vì hardcode giá trị màu sắc hay khoảng cách.
- **Auto-layout & Grouping**: Sử dụng cấu trúc Auto-layout của Figma (`layoutMode: "VERTICAL"|"HORIZONTAL"`, `itemSpacing`, `paddingLeft/Right/Top/Bottom`) cho tất cả các Frame chứa nội dung, nút bấm và form. Hạn chế sử dụng tọa độ tuyệt đối `x, y` ngoại trừ việc định vị các Frame chính trên canvas.
- **Sử dụng component có sẵn**: Nếu phát hiện component cục bộ (vd: `button/primary`, `input/field`), sử dụng lệnh `figma.instantiate` để nhân bản thay vì vẽ lại từ các Rect/Text cơ bản.
- **Chụp ảnh màn hình kiểm chứng (Pha E)**: Sau khi vẽ xong, gọi `figma_read` với `screenshot` để lấy ảnh chụp thực tế từ Figma, in ra chat làm bằng chứng kiểm nghiệm trực quan.
- **BA Conventions**: Tuân thủ triết lý HITL (Approval Gate L1 trước khi vẽ), No-re-ask và IT-BA framing (không vẽ cấu trúc DB hay API).

---

## Inputs

```bash
/figma <feature>                    # Vẽ tất cả các luồng của feature lên Figma
/figma <feature> --flow <slug>      # Chỉ vẽ 1 luồng cụ thể
```

---

## Runtime Flow

```
/figma [args]
   │
   ▼
[Pha A] Gọi figma_status:
        - pluginConnected: false → In hướng dẫn bật plugin, dừng chờ hoặc yêu cầu chạy lại.
        - Nhiều sessions → Hỏi user chọn session ID.
   │
   ▼
[Pha B] Gọi figma_rules:
        - Quét Variables, Paint/Text Styles, Local Components.
        - Khởi tạo map: varMap, colorMap, compMap, textMap.
   │
   ▼
[Pha C] Đọc tài liệu:
        - Read `docs/{feature}/srs/{feature}-userflow.md` để lấy danh sách screens & flows.
        - Read `docs/{feature}/html-wireframe/*.html` để lấy cấu trúc elements chi tiết.
   │
   ▼
[Pha D] Lập L1 Plan Preview:
        - Liệt kê các Frame sẽ vẽ (gồm đầy đủ cases/states nghiệp vụ).
        - Đề xuất tọa độ x, y xếp đặt side-by-side trên Figma canvas.
        - Chờ user gõ Y / OK (HITL Approval Gate).
   │
   ▼
[Pha E] Viết & Thực thi mã Figma (figma_write):
        - Tạo code Javascript chạy trên sandbox Figma.
        - Sử dụng Auto-layout, bind Variables/Styles, instantiate Components.
        - Gọi figma_write truyền mã.
   │
   ▼
[Pha F] Verify & Screenshot (figma_read):
        - Gọi figma_read screenshot từng Frame vừa vẽ.
        - Hiển thị hình ảnh kiểm chứng trực tiếp ra khung chat.
   │
   ▼
[Pha G] Ghi Activity Log:
        - Ghi nhật ký vào docs/_shared/activity.log.
```

## Figma Code Syntax Guide (Dùng cho figma_write)

Mã Javascript truyền vào `figma_write` được thực thi trong môi trường sandbox của plugin. Tham khảo các mẫu sau:

### 1. Khởi tạo Layout & Map Tokens
```js
// Quét variables & styles
const vars = await figma.get_variables();
const styles = await figma.get_styles();

const varMap = {};
vars.collections.forEach(col => {
  col.variables.forEach(v => { varMap[v.name] = v.id; });
});

const colorMap = {};
styles.paintStyles.forEach(s => { colorMap[s.name] = s.hex; });
```

### 2. Vẽ Frame Auto-layout
```js
const screenFrame = await figma.create({
  type: "FRAME",
  name: "Đăng ký OTP - Nhập số điện thoại",
  x: 0,
  y: 0,
  width: 375,
  height: 812,
  fill: colorMap["color/bg-main"] || "#FFFFFF",
  layoutMode: "VERTICAL",
  primaryAxisAlignItems: "MIN",
  counterAxisAlignItems: "CENTER",
  paddingTop: 40,
  paddingBottom: 40,
  paddingLeft: 24,
  paddingRight: 24,
  itemSpacing: 24
});

// Áp dụng spacing variable nếu có
if (varMap["spacing/layout-lg"]) {
  await figma.applyVariable({ nodeId: screenFrame.id, field: "paddingTop", variableId: varMap["spacing/layout-lg"] });
}
```

### 3. Vẽ Elements Con & Hàng Form
```js
// Vẽ Text Label
const titleText = await figma.create({
  type: "TEXT",
  parentId: screenFrame.id,
  content: "Xác thực tài khoản",
  fontSize: 20,
  fontWeight: "Bold",
  fill: "#111111"
});

// Vẽ Form Row chứa Input Textbox
const inputRow = await figma.create({
  type: "FRAME",
  parentId: screenFrame.id,
  width: 327,
  height: 48,
  fill: "#F3F4F6",
  cornerRadius: 8,
  layoutMode: "HORIZONTAL",
  counterAxisAlignItems: "CENTER",
  paddingLeft: 16,
  paddingRight: 16
});

const inputText = await figma.create({
  type: "TEXT",
  parentId: inputRow.id,
  content: "Nhập số điện thoại của bạn...",
  fontSize: 14,
  fill: "#9CA3AF"
});
```

### 4. Tải Icons & Sử dụng Components
```js
// Load icon từ thư viện tích hợp sẵn
const lockIcon = await figma.loadIcon("lock-closed", {
  parentId: inputRow.id,
  size: 20,
  fill: "#9CA3AF"
});

// Sử dụng Component cục bộ nếu có
const comps = await figma.get_local_components();
const btnComp = comps.components.find(c => c.name === "Button/Primary");
if (btnComp) {
  await figma.instantiate({
    componentId: btnComp.id,
    parentId: screenFrame.id,
    overrides: { "Label": { text: "Gửi mã OTP" } }
  });
}
```

## References

- @../../rules/ba-conventions.md
- @../../rules/approval-gate.md
- @../../rules/naming-conventions.md
- @../wireframe-html/SKILL.md
- @../user-flow/SKILL.md
