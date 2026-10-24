# QA — TEC-33: Kiểm tra toàn bộ MVP (m-software-laptop-pc-ai)

- Commit kiểm tra: `b375d05` (main, sau merge TEC-32 — PR #3).
- Phạm vi: trang chủ, 4 trang danh mục, trang chi tiết, tìm kiếm/lọc, hiển thị mobile/desktop.
- Phương pháp: đọc code mới nhất trên main + chạy thật `assets/app.js` + `assets/data.js`
  bằng bộ giả lập DOM tối thiểu trong Node (không có trình duyệt thật trên máy QA);
  kiểm tra cú pháp JS, toàn bộ link nội bộ, logic lọc/sắp xếp/phân trang, chi tiết từng loại sản phẩm.
- Kết luận: **ĐẠT — không có lỗi chặn.** 1 lỗi nhỏ không chặn + 2 ghi chú (xem cuối).

## Checklist

| # | Mục kiểm tra | Kết quả |
|---|---|---|
| 1 | Trang chủ: hero, 4 ô danh mục, 8 sản phẩm nổi bật, 3 khối "Vì sao chọn shop", footer | Đạt — render đủ 8 thẻ nổi bật, đúng tên/giá |
| 2 | Danh mục: 4 trang, tiêu đề + số lượng đúng dữ liệu (Laptop AI 8, PC 4, Workstation 4, Phụ kiện 4) | Đạt |
| 3 | Danh mục: phân trang "Xem thêm" 6 → 8, hết thì hiện "Đã hiển thị tất cả" | Đạt — kiểm chứng bằng chạy thật |
| 4 | Lọc: danh mục, thương hiệu, khoảng giá, RAM, NPU, còn hàng — kết hợp nhiều điều kiện | Đạt — VD: Laptop AI + Asus = 2 sản phẩm đúng |
| 5 | Sắp xếp: mới nhất, giá tăng/giảm, tên A–Z | Đạt — giá tăng dần bắt đầu đúng bằng "Laptop AI Sinh viên 15" |
| 6 | Tìm kiếm trang chủ: lọc trong danh sách nổi bật, không khớp hiện trạng thái rỗng | Đạt — "Asus" = 2 thẻ; từ khóa lạ = trạng thái rỗng |
| 7 | Tìm kiếm danh mục + `?q=`: tìm "Workstation" qua tham số URL cho đúng 4 sản phẩm | Đạt |
| 8 | Chi tiết: id=1 đúng tên/giá/breadcrumb/sản phẩm cùng danh mục (4 thẻ) | Đạt |
| 9 | Chi tiết: id=5 hết hàng — nút bị vô hiệu hóa, hiển thị "Hết hàng" | Đạt |
| 10 | Chi tiết: id=999 không tồn tại — hiện "Không tìm thấy sản phẩm", ẩn khối chi tiết | Đạt |
| 11 | Chi tiết: id=20 phụ kiện (RAM null) — RAM hiển thị "—", không vỡ bảng | Đạt |
| 12 | Giá/định dạng: VNĐ dạng `27.990.000 ₫`, giá cũ gạch ngang khi có giảm giá | Đạt |
| 13 | Toàn bộ link nội bộ (header, danh mục, footer, nút) đều trỏ tới file tồn tại | Đạt — quét toàn bộ file HTML, 0 link hỏng |
| 14 | Responsive: breakpoint 1024px — mobile: menu ☰, nút "Lọc", lưới 2 cột, tìm kiếm xuống hàng; desktop: lưới danh mục 3 cột, trang chủ 4 cột, bộ lọc cột trái 240px | Đạt — đối chiếu CSS (2 `@media(max-width:1023px)`, 8 `@media(min-width:1024px)`) |
| 15 | Cú pháp JS: `node --check` cho `assets/app.js` và `assets/data.js` | Đạt |
| 16 | Cùng 1 sản phẩm hiện cùng tên/giá/thông số/trạng thái ở mọi trang | Đạt — 1 nguồn dữ liệu `data.js` duy nhất |

## Lỗi nhỏ — KHÔNG chặn (ghi để sửa ở task sau, không sửa trong QA này)

- **QA-1 (nhỏ):** Nút "Xóa tất cả lọc" (và nút cùng tên ở trạng thái rỗng) không xóa
  nội dung ô tìm kiếm. Hệ quả: sau khi tìm 1 từ khóa không khớp, bấm "Xóa tất cả lọc"
  vẫn thấy trạng thái rỗng cho tới khi tự xóa tay ô tìm kiếm. Cách sửa gợi ý:
  trong handler của `#clear-filters`, thêm xóa `search-input.value` trước khi render lại.
- **Ghi chú:** Nút "Xem tất cả sản phẩm" ở hero trang chủ hiện dẫn tới trang Laptop AI
  (không phải tất cả danh mục) — chấp nhận được ở MVP, PO quyết có đổi hay không.
- **Ghi chú:** Tìm kiếm ở trang chủ chỉ lọc trong 8 sản phẩm nổi bật, muốn tìm toàn bộ
  thì dùng trang danh mục hoặc ô tìm kiếm ở trang chi tiết (Enter → `?q=`). Không phải lỗi chặn.

## Hạn chế kiểm chứng

- Không chạy trình duyệt thật (máy QA không có Chromium/Playwright); kiểm chứng
  responsive dựa trên CSS + chạy logic JS thật, chưa đo bằng ảnh chụp màn hình ở 390px/1440px.
  Nếu PO cần, task sau có thể bổ sung kiểm chứng bằng trình duyệt thật.
