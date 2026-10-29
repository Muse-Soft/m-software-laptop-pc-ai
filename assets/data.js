/* Dữ liệu sản phẩm mẫu. 3 nhóm chính: laptop-ai, pc, workstation + phụ kiện. */
window.PRODUCTS = [
  // Laptop AI (8)
  {id:1, name:"Laptop AI Pro 14", category:"laptop-ai", brand:"Asus", spec:"Intel Core Ultra 7 · 32GB · 1TB SSD", ram:32, price:27990000, oldPrice:31990000, stock:true, npu:true, isNew:true, featured:true},
  {id:2, name:"Laptop AI Air 13", category:"laptop-ai", brand:"Lenovo", spec:"Intel Core Ultra 5 · 16GB · 512GB SSD", ram:16, price:18990000, oldPrice:null, stock:true, npu:true, isNew:false, featured:true},
  {id:3, name:"Laptop AI Gaming 16", category:"laptop-ai", brand:"MSI", spec:"AMD Ryzen AI 9 · 32GB · 1TB SSD", ram:32, price:42990000, oldPrice:46990000, stock:true, npu:true, isNew:true, featured:true},
  {id:4, name:"Laptop AI Văn phòng 15", category:"laptop-ai", brand:"HP", spec:"Intel Core Ultra 5 · 16GB · 512GB SSD", ram:16, price:14990000, oldPrice:null, stock:true, npu:true, isNew:false, featured:false},
  {id:5, name:"Laptop AI Creator 16", category:"laptop-ai", brand:"Dell", spec:"Intel Core Ultra 9 · 64GB · 2TB SSD", ram:64, price:58990000, oldPrice:null, stock:false, npu:true, isNew:true, featured:false},
  {id:6, name:"Laptop AI Mỏng nhẹ 14", category:"laptop-ai", brand:"Acer", spec:"Snapdragon X Elite · 16GB · 1TB SSD", ram:16, price:24990000, oldPrice:null, stock:true, npu:true, isNew:false, featured:true},
  {id:7, name:"Laptop AI Doanh nhân 14", category:"laptop-ai", brand:"Lenovo", spec:"Intel Core Ultra 7 · 16GB · 1TB SSD", ram:16, price:32990000, oldPrice:null, stock:true, npu:true, isNew:false, featured:false},
  {id:8, name:"Laptop AI Sinh viên 15", category:"laptop-ai", brand:"Asus", spec:"AMD Ryzen AI 7 · 16GB · 512GB SSD", ram:16, price:16990000, oldPrice:null, stock:true, npu:true, isNew:false, featured:false},
  // PC (4)
  {id:9, name:"PC Văn phòng Pro", category:"pc", brand:"HP", spec:"Intel Core i5 · 16GB · 512GB SSD", ram:16, price:12990000, oldPrice:null, stock:true, npu:false, isNew:false, featured:true},
  {id:10, name:"PC Gaming RTX", category:"pc", brand:"MSI", spec:"AMD Ryzen 7 · 32GB · 1TB SSD", ram:32, price:34990000, oldPrice:38990000, stock:true, npu:false, isNew:false, featured:true},
  {id:11, name:"PC Đồ họa Studio", category:"pc", brand:"Dell", spec:"Intel Core i7 · 32GB · 1TB SSD", ram:32, price:28990000, oldPrice:null, stock:true, npu:false, isNew:false, featured:false},
  {id:12, name:"PC Mini Văn phòng", category:"pc", brand:"Lenovo", spec:"Intel Core i3 · 16GB · 256GB SSD", ram:16, price:9990000, oldPrice:null, stock:false, npu:false, isNew:false, featured:false},
  // Workstation AI (4)
  {id:13, name:"Workstation AI Pro", category:"workstation", brand:"Dell", spec:"Intel Xeon · 64GB · 2TB SSD · NVIDIA RTX 6000 Ada", ram:64, price:129990000, oldPrice:null, stock:true, npu:true, isNew:false, featured:true},
  {id:14, name:"Workstation AI Duo GPU", category:"workstation", brand:"Asus", spec:"AMD Threadripper · 128GB · 4TB SSD · 2x RTX 4090", ram:128, price:249990000, oldPrice:null, stock:true, npu:true, isNew:true, featured:true},
  {id:15, name:"Workstation AI Nhỏ gọn", category:"workstation", brand:"HP", spec:"Intel Core Ultra 9 · 64GB · 2TB SSD · RTX 4070", ram:64, price:79990000, oldPrice:null, stock:true, npu:true, isNew:false, featured:false},
  {id:16, name:"Workstation AI Render", category:"workstation", brand:"Lenovo", spec:"AMD Ryzen Threadripper · 64GB · 2TB SSD · RTX A6000", ram:64, price:159990000, oldPrice:null, stock:false, npu:true, isNew:false, featured:false},
  // Phụ kiện (4)
  {id:17, name:"Chuột không dây Pro", category:"phu-kien", brand:"Logitech", spec:"Không dây · 4000 DPI · Pin 70 giờ", ram:null, price:890000, oldPrice:null, stock:true, npu:false, isNew:false, featured:false},
  {id:18, name:"Bàn phím cơ RGB", category:"phu-kien", brand:"Logitech", spec:"Switch cơ · Đèn RGB · Kết nối 3 chế độ", ram:null, price:1990000, oldPrice:null, stock:true, npu:false, isNew:false, featured:false},
  {id:19, name:"Màn hình 27 inch 2K", category:"phu-kien", brand:"Dell", spec:"27 inch · 2K · 165Hz · IPS", ram:null, price:6990000, oldPrice:7990000, stock:true, npu:false, isNew:false, featured:false},
  {id:20, name:"Dock USB-C đa năng", category:"phu-kien", brand:"Asus", spec:"USB-C · 2x HDMI · Sạc 100W", ram:null, price:2490000, oldPrice:null, stock:false, npu:false, isNew:false, featured:false}
];
window.CATEGORIES = [
  {slug:"laptop-ai", name:"Laptop AI", icon:"💻"},
  {slug:"pc", name:"PC", icon:"🖥️"},
  {slug:"workstation", name:"Workstation", icon:"🧠"},
  {slug:"phu-kien", name:"Phụ kiện", icon:"⌨️"}
];
window.CATEGORY_ICON = { "laptop-ai":"💻", "pc":"🖥️", "workstation":"🧠", "phu-kien":"⌨️" };
