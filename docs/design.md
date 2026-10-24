# Thiết kế giao diện MVP — Shop Laptop / PC / Workstation AI (TEC-30)

> Dành cho Dev triển khai TEC-31 (trang chủ + trang danh mục mẫu).
> Phạm vi MVP: trang chủ + trang danh mục. Không gồm giỏ hàng, thanh toán, tài khoản.
> Ngôn ngữ giao diện: tiếng Việt. Đơn vị tiền: VNĐ, định dạng `12.990.000 ₫`.

## 1. Nguyên tắc chung

- Một sản phẩm = một thẻ, cùng một cấu trúc ở mọi nơi (trang chủ, danh mục, gợi ý).
- Mobile-first: thiết kế cho màn hình nhỏ trước, mở rộng lên desktop (xem mục 6).
- Mọi trạng thái đều có giao diện: đang tải (skeleton), rỗng (không có sản phẩm), lỗi tải.
- Không dùng màu làm kênh thông tin duy nhất: trạng thái còn hàng / hết hàng luôn có chữ kèm theo.

## 2. Bảng màu (đặt tên để Dev dùng nhất quán)

| Token | Mã màu | Dùng cho |
|---|---|---|
| `--color-bg` | `#F6F7F9` | Nền trang |
| `--color-surface` | `#FFFFFF` | Thẻ sản phẩm, khung nội dung |
| `--color-primary` | `#0B5FFF` | Nút chính, link, giá nổi bật, tab đang chọn |
| `--color-primary-dark` | `#0847C2` | Nút chính khi hover/nhấn |
| `--color-text` | `#111827` | Tiêu đề, giá, nội dung chính |
| `--color-text-muted` | `#6B7280` | Mô tả phụ, thông số phụ |
| `--color-border` | `#E5E7EB` | Viền thẻ, đường chia |
| `--color-success` | `#15803D` | "Còn hàng" |
| `--color-danger` | `#DC2626` | "Hết hàng", giá giảm (chữ gạch của giá cũ vẫn dùng `--color-text-muted`) |
| `--color-badge-ai` | `#7C3AED` | Nhãn "AI" trên thẻ sản phẩm |

Chữ: một font sans-serif hệ thống (không nhúng font ngoài ở MVP).
Cỡ chữ: tiêu đề trang 28px desktop / 22px mobile; tên sản phẩm 16px; giá 18px đậm;
mô tả/thông số 14px; nhãn phụ 12px. Bo góc thẻ: 12px. Khoảng cách lưới: 16px.

## 3. Bố cục trang chủ (`/`)

Từ trên xuống dưới, theo đúng thứ tự này:

1. **Header (dính trên cùng khi cuộn):** logo "Laptop & PC AI" (trái) ·
   thanh tìm kiếm (giữa, desktop; xuống hàng riêng dưới logo trên mobile) ·
   menu danh mục: Laptop AI · PC · Workstation · Phụ kiện (phải, desktop;
   mobile thu thành nút menu ☰ mở danh sách dọc).
2. **Hero:** một banner ngang, tiêu đề "Máy tính AI — mạnh cho công việc,
   gọn cho mọi nơi", nút chính "Xem Laptop AI" (dẫn tới `/danh-muc/laptop-ai`),
   nút phụ "Xem tất cả sản phẩm". Ảnh minh họa: một laptop mở trên bàn làm việc.
3. **Danh mục nổi bật:** 4 ô vuông bằng nhau: Laptop AI · PC · Workstation ·
   Phụ kiện — mỗi ô gồm icon/tên + số lượng sản phẩm mẫu, bấm vào sang trang danh mục.
4. **Sản phẩm nổi bật:** lưới thẻ sản phẩm (mục 5), tiêu đề "Nổi bật",
   tối đa 8 sản phẩm, nút "Xem tất cả" cuối lưới.
5. **Vì sao chọn shop (3 cột):** Bảo hành 24 tháng · Giao hàng toàn quốc ·
   Tư vấn cấu hình AI miễn phí. Mỗi cột: tiêu đề + 1 câu mô tả ngắn.
6. **Footer:** tên shop, liên hệ (email/số điện thoại để trống, Dev điền
   placeholder), link danh mục, dòng "© Shop Laptop & PC AI".

## 4. Bố cục trang danh mục (`/danh-muc/<slug>`)

Slug danh mục MVP: `laptop-ai`, `pc`, `workstation`, `phu-kien`.

- **Tiêu đề trang:** tên danh mục + tổng số sản phẩm, ví dụ "Laptop AI (24 sản phẩm)".
- **Desktop (≥ 1024px):** 2 cột — cột trái 240px là bộ lọc (mục 4.1),
  cột phải là lưới sản phẩm 3 cột + thanh sắp xếp phía trên lưới.
- **Mobile (< 1024px):** bộ lọc thu thành nút "Lọc" mở panel trượt từ dưới lên;
  lưới sản phẩm 2 cột; thanh sắp xếp là dropdown gọn phía trên lưới.
- **Thanh sắp xếp (dropdown):** Mới nhất · Giá tăng dần · Giá giảm dần · Tên A–Z.
- **Phân trang MVP:** nút "Xem thêm" tải thêm sản phẩm; hết sản phẩm thì ẩn nút
  và hiện "Đã hiển thị tất cả sản phẩm".

### 4.1. Bộ lọc theo danh mục (áp dụng đồng thời, chọn nhiều giá trị được)

| Nhóm lọc | Tùy chọn MVP | Kiểu chọn |
|---|---|---|
| Danh mục | Laptop AI · PC · Workstation · Phụ kiện | Checkbox (trang danh mục đang xem được tick sẵn) |
| Thương hiệu | Tối thiểu 4 hãng mẫu, Dev dùng dữ liệu mẫu có sẵn | Checkbox |
| Khoảng giá | Dưới 15 triệu · 15–30 triệu · 30–50 triệu · Trên 50 triệu | Checkbox |
| RAM | 16GB · 32GB · 64GB trở lên | Checkbox |
| NPU / AI | Có NPU (chạy AI trên máy) · Không yêu cầu | Checkbox đơn |
| Tình trạng | Còn hàng (ẩn sản phẩm hết hàng) | Checkbox đơn |

Hành vi: đổi lọc thì lưới cập nhật ngay, không cần nút "Áp dụng";
nút "Xóa tất cả lọc" luôn hiện khi có ít nhất một lọc đang bật;
không có sản phẩm khớp thì hiện trạng thái rỗng: "Không có sản phẩm phù hợp —
thử bỏ bớt bộ lọc" + nút "Xóa tất cả lọc".

## 5. Thẻ sản phẩm (dùng chung mọi trang)

Cấu trúc từ trên xuống, không được lược bớt trường nào ở MVP:

1. Ảnh sản phẩm (tỉ lệ 4:3, nền trắng, ảnh mẫu placeholder nếu chưa có ảnh thật).
2. Nhãn chồng góc trái trên ảnh: "AI" (tím `--color-badge-ai`) nếu sản phẩm có NPU;
   nhãn "Mới" (xanh primary) nếu là sản phẩm mới — tối đa 2 nhãn, "AI" trước.
3. Tên sản phẩm (tối đa 2 dòng, dòng thừa cắt bằng dấu …).
4. Thông số tóm tắt, 1 dòng: `CPU · RAM · SSD`, ví dụ
   `Intel Core Ultra 7 · 32GB · 1TB SSD`. Workstation thêm GPU vào cuối nếu có.
5. Giá: giá bán đậm 18px; giá cũ gạch ngang (màu muted) nếu có giảm giá.
6. Dòng trạng thái: "● Còn hàng" (xanh lá) hoặc "○ Hết hàng" (đỏ);
   nút "Xem chi tiết" luôn hiện, nút "Hết hàng" bị vô hiệu hóa (không bấm được).

Ví dụ thẻ (dữ liệu mẫu, Dev thay bằng dữ liệu thật ở TEC-31):

> **Laptop AI Pro 14** — Intel Core Ultra 7 · 32GB · 1TB SSD —
> **27.990.000 ₫** (giá cũ 31.990.000 ₫) — ● Còn hàng — nhãn AI.

## 6. Nhất quán mobile ↔ desktop

| Yếu tố | Mobile (< 1024px) | Desktop (≥ 1024px) |
|---|---|---|
| Lưới sản phẩm | 2 cột | 3 cột (trang danh mục), 4 cột (trang chủ) |
| Bộ lọc | Nút "Lọc" → panel trượt dưới lên | Cột trái cố định 240px |
| Header | Logo + nút menu ☰; tìm kiếm xuống hàng riêng | Một hàng: logo · tìm kiếm · menu |
| Hero | Ảnh trên, chữ + nút dưới | 2 cột: chữ trái, ảnh phải |
| Thẻ sản phẩm | Giữ nguyên cấu trúc mục 5, chỉ thu nhỏ ảnh | Giữ nguyên cấu trúc mục 5 |

Quy tắc bất biến: cùng một sản phẩm phải hiện cùng tên, cùng giá, cùng thông số,
cùng trạng thái còn/hết hàng trên cả hai cỡ màn hình — chỉ bố cục thay đổi,
không được giấu thông tin ở mobile.

## 7. Checklist bàn giao cho Dev (TEC-31)

- [ ] Trang chủ đủ 6 khối theo đúng thứ tự mục 3.
- [ ] Trang danh mục đủ 4 slug, lưới + sắp xếp + phân trang "Xem thêm".
- [ ] Bộ lọc đủ 6 nhóm ở mục 4.1, lọc nhiều giá trị, có trạng thái rỗng.
- [ ] Thẻ sản phẩm đủ 6 thành phần ở mục 5, dùng chung mọi trang.
- [ ] Bảng màu đúng token và mã màu ở mục 2.
- [ ] Kiểm tra ở 2 cỡ màn hình: 390px (mobile) và 1440px (desktop) — cùng dữ liệu,
      không mất thông tin ở mobile.
