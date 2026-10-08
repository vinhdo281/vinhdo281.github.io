# Cyber-Tech Robotics & Engineering Portfolio

Website hồ sơ cá nhân và học thuật cao cấp phong cách **Cyber-Tech / Sci-Fi HUD**, được thiết kế tối ưu hóa trực tiếp cho **GitHub Pages**.

---

## ⚡ Tính năng nổi bật

* **Giao diện Cyber-Tech:** Hiệu ứng viền Neon, lưới nền số hóa, bảng điều khiển Telemetry Terminal thời gian thực.
* **Song ngữ tức thì (VI / EN):** Nút chuyển đổi Anh - Việt trên thanh điều hướng, lưu tự động qua `localStorage`.
* **Chế độ Sáng / Tối (Dark / Light Theme):** Mặc định giao diện Dark Cyber, hỗ trợ Light Lab mode siêu sắc nét.
* **Tìm kiếm nhanh thông minh (Ctrl + K):** Modal tìm kiếm toàn trang theo thời gian thực (hỗ trợ cả tiếng Việt và tiếng Anh).
* **Trích dẫn BibTeX 1-click:** Nút sao chép mã trích dẫn kèm thông báo Toast hiện đại.
* **Tương thích 100% GitHub Pages:** Kèm file `.nojekyll`, hoạt động ngay khi đẩy lên không cần cài đặt Ruby hay Node.js.

---

## 📁 Cấu trúc thư mục

```text
portfolio-site/
├── index.html            # Trang chủ: Giới thiệu, Telemetry Terminal, Tiêu biểu
├── research.html         # Hướng nghiên cứu cốt lõi & lý thuyết
├── publications.html     # Danh sách bài báo khoa học + BibTeX
├── portfolio.html        # Dự án kỹ thuật + Bộ lọc danh mục tương tác
├── blog.html             # Bài viết kỹ thuật & Engineering notes
├── cv.html               # Học vấn, giải thưởng & Ma trận kỹ năng
├── .nojekyll             # Cấu hình bypass cho GitHub Pages
├── assets/
│   ├── css/
│   │   └── style.css     # Toàn bộ CSS phong cách Cyber-Tech & Responsive
│   ├── js/
│   │   ├── main.js       # Xử lý ngôn ngữ, theme, tìm kiếm, BibTeX toast
│   │   └── search-data.js# Cơ sở dữ liệu tìm kiếm Ctrl+K
│   └── images/
│       ├── avatar.svg    # Ảnh đại diện phong cách Robot (thay bằng ảnh của bạn)
│       └── favicon.svg   # Biểu tượng tab trình duyệt
└── README.md
```

---

## 🚀 Hướng dẫn 3 bước đẩy lên GitHub Pages

### Bước 1: Tạo Repository trên GitHub
1. Vào [GitHub](https://github.com/new).
2. Tạo Repository mới đặt tên là: `<username>.github.io` (Ví dụ: `nguyenvana.github.io`).
3. Đặt trạng thái là **Public**.

### Bước 2: Đẩy toàn bộ mã nguồn lên GitHub
Mở terminal PowerShell tại thư mục `portfolio-site`:
```powershell
cd C:\Users\ADMIN\portfolio-site
git init
git add .
git commit -m "Khoi tao website cyber-tech portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```
*(Thay `<username>` bằng tên tài khoản GitHub thật của bạn)*.

### Bước 3: Kiểm tra và hoàn tất
1. Vào repo trên GitHub $\rightarrow$ **Settings** $\rightarrow$ **Pages**.
2. Đảm bảo **Source** đang chọn `Deploy from a branch` và chọn branch `main` / `/(root)`.
3. Truy cập vào `https://<username>.github.io` để chiêm ngưỡng trang web!
