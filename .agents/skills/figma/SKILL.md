---
name: figma
description: Quy tắc, Bộ Design System chuẩn (Tokens, Components, Layouts) và Mã trợ giúp JSON-RPC để tự động hóa vẽ giao diện Figma chuẩn 100% cho mọi luồng hệ thống Portal.
---

# FIGMA AUTOMATION DESIGN SYSTEM SKILL (BỘ DESIGN SYSTEM CHUẨN FIGMA)

> **Tài liệu quy chuẩn độc lập & nguồn tri thức duy nhất (Single Source of Truth) cho tất cả các luồng vẽ giao diện Figma (Tra soát, FacePay, Thanh toán, Quản lý người dùng, v.v.).**

---

## 🎨 1. DESIGN SYSTEM TOKENS (BẢNG MÃ MÀU & QUY CHUẨN NGUYÊN TẮC)

### Color Palette (Mã màu HEX chuẩn)
| Tên Token | Mã HEX | Công dụng / Vị trí áp dụng |
|---|---|---|
| `Primary Brand Blue` | `#3B82F6` | Màu nền Sidebar chính, Nút thao tác chính (Primary Button), Active Tab Bar, Icon Nút Thao tác 3 chấm `⋮` |
| `Primary Hover Blue` | `#2563EB` | Nút active phụ, Nút chọn mã giao dịch, Nút Phân trang Active Page [1] |
| `Submenu BG Box` | `#2563EB` | Khối chứa các menu con trong Sidebar |
| `Active Submenu Pill` | `#FFFFFF` | Thẻ bo tròn nền trắng (`cornerRadius: 16`) cho Submenu đang chọn trong Sidebar (chữ màu `#3B82F6`) |
| `Canvas Background` | `#F8FAFC` | Nền Slate-50 nhạt phủ toàn bộ màn hình 1440x960 |
| `Card Component Fill` | `#FFFFFF` | Nền trắng cho tất cả Filter Card, Table Grid Card, Form Section Blocks |
| `Card Component Stroke`| `#CBD5E1` / `#E2E8F0` | Viền mỏng 1px cho các khối thẻ Card và Input Controls |
| `Header Bar BG` | `#F1F5F9` | Nền xám Slate-100 cho Header của Table Grid và Header của Form Section Card (H: 36-38px) |
| `Text Primary` | `#0F172A` / `#1E293B` | Chữ tiêu đề, giá trị dữ liệu chính, văn bản nổi bật |
| `Text Secondary/Muted` | `#64748B` / `#94A3B8` | Chữ breadcrumb, placeholder tìm kiếm, nhãn phụ (label) |
| `Readonly Field BG` | `#F1F5F9` | Nền xám nhạt cho ô Input chỉ đọc (Readonly) |
| `Readonly Field Text` | `#475569` | Màu chữ xám Slate cho ô Input chỉ đọc |

### Status Colors (Màu trạng thái theo Chấm Bullet Dot `●`)
- 🟡 **`Chờ xử lý` / `Chờ phê duyệt` / `Chờ kiểm tra`**: Amber/Orange `#D97706`
- 🔵 **`Đã kiểm tra` / `Đã duyệt` / `Chờ phản hồi`**: Blue `#3B82F6`
- 🟢 **`Đã phản hồi` / `Hoàn tất` / `PRCD (Đồng ý/Chấp nhận)`**: Green `#10B981` / `#16A34A`
- 🔴 **`Xử lý thất bại` / `RJCD (Từ chối)`**: Red `#EF4444` / `#DC2626`
- ⚪ **`Khác / Chưa phát sinh`**: Gray `#64748B` (`—`)

---

## 📐 2. LAYOUT & COMPONENT SPECIFICATIONS (CẤU TRÚC THÀNH PHẦN CHUẨN)

### A. Màn hình Canvas (Frame Tổng)
- **Kích thước tiêu chuẩn:** `1440 x 960` (Dành cho Form/Detail) hoặc `1440 x 980` (Dành cho List Grid có nhiều bản ghi).
- **Background:** `#F8FAFC`.

### B. Sidebar Component (Khối Menu bên trái — 220px x 960px)
- **Position & Size:** `x = 0`, `y = 0`, `width = 220`, `height = 960/980`, `fills: #3B82F6`.
- **Logo Area:** Circle `32x32` trắng tại `x = 20, y = 45` chữ `e` xanh `#3B82F6` + Chữ `epay Portal` trắng `x = 60, y = 50`.
- **Vách ngăn:** Đường kẻ `180x1` nhạt màu `#60A5FA` tại `y = 90`.
- **Active Submenu Item:** Nền trắng bo tròn `196x32` (`cornerRadius: 16`) tại `x = 12, y = 476`, chữ `#3B82F6` (`☕ Tra soát đã gửi` hoặc `📥 Tra soát đã nhận`).

### C. Topbar Component (Thanh tiêu đề trên — 1220px x 64px)
- **Position & Size:** `x = 220`, `y = 0`, `width = 1220`, `height = 64`, `fills: #FFFFFF`, `stroke: #E2E8F0`.
- **Ô Tìm kiếm Pill:** `300x32` (`cornerRadius: 16`) tại `x = 26, y = 16`, chữ `🔍 Tìm kiếm hệ thống...` (`#94A3B8`).
- **Góc phải Topbar:** `❓ Trợ giúp` (màu đỏ `#EF4444`), `🔔` (vàng), `⚙` (xám `#64748B`), vách ngăn đỏ `1.5x32`, Avatar tròn đỏ `32x32` chữ `L` trắng và tên `Lisa (epay Portal) ▼` (`#0F172A`).

### D. Header Page Title & Breadcrumb
- **Breadcrumb:** Text `Quản lý tra soát > ...` tại `x = 246, y = 84`, font size 11.5px, color `#94A3B8`.
- **Page Title:** Text tiêu đề tại `x = 246, y = 108`, font size 22px, font weight bold, color `#0F172A`.
- **Nút "+ Tạo yêu cầu tra soát"** (nếu ở màn Danh sách): `174x34`, background `#3B82F6`, `cornerRadius: 6`, chữ trắng tại `x = 1246, y = 104`.

### E. Filter Card Component (Bộ lọc 12 Trường — Lưới 4 Cột x 3 Hàng)
- **Position & Size:** `x = 246`, `y = 154`, `width = 1174`, `height = 230`, `fills: #FFFFFF`, `stroke: #E2E8F0`, `cornerRadius: 6`.
- **Lưới Inputs (4 cột x 3 hàng):**
  - Cột 0: `x = 20`, Cột 1: `x = 300`, Cột 2: `x = 580`, Cột 3: `x = 860`.
  - Hàng 0: `y = 14`, Hàng 1: `y = 70`, Hàng 2: `y = 126`.
  - Mỗi Input box: `width = 260`, `height = 30`, `cornerRadius: 4`, stroke `#E2E8F0`.
- **Nút Hành động:** `Xóa bộ lọc` (Outline `#FFFFFF`, border `#CBD5E1`) tại `x = 935, y = 186` & `Tìm kiếm` (Primary `#3B82F6`) tại `x = 1045, y = 186`.

### F. Table Grid Component (Bảng dữ liệu & Phân trang)
- **Position & Size:** `x = 246`, `y = 444`, `width = 1174`, `height = 520`, `fills: #FFFFFF`, `stroke: #E2E8F0`, `cornerRadius: 6`.
- **Toolbar:** Ô tìm kiếm nhanh `1030x36` + Nút `⚙ Tùy chỉnh` (`100x36`).
- **Table Header Bar:** `y = 60`, height `36`, `#F8FAFC`.
- **Cột Thao tác (`THAO TÁC`):** Hiển thị biểu tượng 3 chấm dọc **`⋮`** (font size 16, màu xanh `#3B82F6`).
- **Cột Trạng thái Epay (`TT TẠI EPAY`):** Hiển thị các giá trị `OPEN`, `PRCD` (xanh), `RJCD` (đỏ), `—`.
- **Footer Phân trang:** 
  - Trái: `Tổng tiền giao dịch: X VND`
  - Phải: `Hiển thị kết quả: N dòng` đi kèm cụm nút phân trang bo góc `[ < ]` `[ 1 ]` (Background `#2563EB` chữ trắng) `[ > ]`.

### G. Form Section Block (Khối thông tin tạo mới / chi tiết)
- **Outer Block:** Width `1174`, background `#FFFFFF`, stroke `#CBD5E1`, `cornerRadius: 6`.
- **Header Bar:** Height `38`, background `#F1F5F9`, tiêu đề chữ đậm `#1E293B` font size 13px + mũi tên mở rộng `∧`.
- **Nút Thao tác Footer (Action Buttons):** Cặp nút bo góc `cornerRadius: 6` kích thước `120x38` gồm nút `Hủy` / `Quay lại` (Nền trắng viền xám) và `Tạo mới` / `Phê duyệt` (Nền xanh nổi bật `#3B82F6`).

---

## 🛠️ 3. FIGMA JSON-RPC EXECUTION ENGINE (MÃ NGUỒN TÁI SỬ DỤNG VẼ BẰNG NODE.JS)

Dưới đây là đoạn mã trợ giúp Node.js chuẩn (Helper Engine) dùng để gửi lệnh vẽ JSON-RPC lên Figma qua cổng `38470`. Mọi script vẽ thuộc bất kỳ luồng nào sau này **chỉ cần copy lại khối mã engine này**:

```javascript
import http from 'node:http';

const token = "0b59d21459c20766e68e805a20caf5aa1d31d9c55174b902";

function sendRpc(op, params = {}) {
  const payload = JSON.stringify({ op, params });
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 38470,
      path: '/rpc',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch(e) { resolve(body); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function hexColor(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [{ type: "SOLID", color: { r, g, b } }];
}

// BẮT BUỘC DÙNG HELPER NÀY ĐỂ VẼ TEXT (Tránh lỗi ô vuông trắng mất chữ do Figma API)
async function createText(parentId, name, textContent, x, y, options = {}) {
  const res = await sendRpc("create", {
    type: "TEXT",
    parentId: parentId,
    name: name,
    x: x,
    y: y,
    fontSize: options.fontSize || 12
  });

  if (res && res.result && res.result.id) {
    await sendRpc("set_text", {
      nodeId: res.result.id,
      text: textContent
    });
    if (options.fill) {
      await sendRpc("modify", {
        nodeId: res.result.id,
        fills: hexColor(options.fill)
      });
    }
  }
  return res;
}
```

---

## 📋 4. THỨ TỰ CÁC MÀN HÌNH THEO LUỒNG DISPUTE (YCTS FLOW STEPS)
1. **Màn hình danh sách Tra soát đã gửi** (`#sent-list-screen`) — ✅ *Đã vẽ*
2. **Màn hình danh sách Tra soát đã nhận** (`#received-list-screen`) — ✅ *Đã vẽ*
3. **Màn hình Tạo mới YCTS** (`#create-dispute-screen`) — ✅ *Đã vẽ*
4. **Màn hình Chọn giao dịch gốc (Modal)** (`#modal-select-tx`) — ⏳ *Màn tiếp theo*
5. **Các màn hình Chi tiết tương ứng** (`#detail-ts-012` đến `#detail-ts-019`)

---
