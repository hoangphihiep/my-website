# KẾ HOẠCH PHÁT TRIỂN (DEVELOPMENT ROADMAP)
## Dự án: Website Điện Máy VietElectro

Lộ trình được phân rã thành các tính năng nhỏ độc lập. **Mỗi nhiệm vụ được thiết kế vừa vặn để hoàn thành trọn vẹn trong một phiên làm việc (Single Coding Session)**.

---

```mermaid
gantt
    title Lộ trình Triển khai Dự án VietElectro theo Phiên làm việc
    dateFormat  YYYY-MM-DD
    section Hạ tầng & DB
    P1.1: Khởi tạo Repo client/server       :p1_1, 2026-10-16, 1d
    P1.2: Prisma Schema & SQL Constraints    :p1_2, after p1_1, 1d
    section Xác thực & Bảo mật
    P2.1: Middlewares (Zod, RateLimit, CORS) :p2_1, after p1_2, 1d
    P2.2: Auth API & JWT httpOnly Cookie     :p2_2, after p2_1, 1d
    section Catalog Engine
    P3.1: Upload ảnh Sharp & WebP An toàn   :p3_1, after p2_2, 1d
    P3.2: CRUD Danh mục & Hãng sản xuất      :p3_2, after p3_1, 1d
    P3.3: CRUD Sản phẩm & Search không dấu   :p3_3, after p3_2, 1d
    P3.4: Seed Admin ENV & Ảnh mẫu tự tạo    :p3_4, after p3_3, 1d
    section Đơn hàng & Tồn kho
    P4.1: API Tạo đơn COD & Tránh Deadlock   :p4_1, after p3_4, 1d
    P4.2: Test Concurrency Promise.all trên Postgres thật :p4_2, after p4_1, 1d
    P4.3: State Machine Đơn hàng & Hoàn kho  :p4_3, after p4_2, 1d
    P4.4: Tra cứu POST /orders/lookup        :p4_4, after p4_3, 1d
    section Giao diện Khách hàng
    P5.1: Design Tokens, Layout & TopBar     :p5_1, after p4_4, 1d
    P5.2: Trang chủ, Mega Menu & Ngành hàng  :p5_2, after p5_1, 1d
    P5.3: Bộ lọc, Sắp xếp bán chạy & Paging  :p5_3, after p5_2, 1d
    P5.4: Chi tiết SP & SP đã xem gần đây    :p5_4, after p5_3, 1d
    P6.1: Giỏ hàng CartContext & Validation  :p6_1, after p5_4, 1d
    P6.2: Màn Checkout COD & Tra cứu đơn     :p6_2, after p6_1, 1d
    P6.3: Đăng nhập/Đăng ký & Lịch sử đơn    :p6_3, after p6_2, 1d
    section Quản trị & Nghiệm thu
    P7.1: Admin Layout & Quản lý Sản phẩm    :p7_1, after p6_3, 1d
    P7.2: Quản lý Đơn hàng & Duyệt đơn       :p7_2, after p7_1, 1d
    P8.1: Playwright E2E & Tối ưu Lighthouse :p8_1, after p7_2, 1d
```

---

## Giai đoạn 1: Khởi tạo Hạ tầng & Cơ sở Dữ liệu

### [Phiên 1.1] Khởi tạo Cấu trúc Monorepo & Công cụ Phát triển
- **Mục tiêu**: Thiết lập cấu trúc thư mục `client/` và `server/`, cấu hình Typescript và công cụ kiểm thử.
- **Nhiệm vụ cụ thể**:
  - Khởi tạo `client/` bằng React (Vite) + TypeScript + cấu hình CSS Modules.
  - Khởi tạo `server/` bằng Node.js + Express + TypeScript.
  - Cấu hình ESLint, Prettier, TypeScript `tsconfig.json` cho cả 2 phía.
  - Cài đặt và kiểm tra môi trường chạy test với Vitest và Supertest.

### [Phiên 1.2] Lược đồ Prisma & Ràng buộc CHECK qua Migration Thủ công
- **Mục tiêu**: Kết nối CSDL PostgreSQL, tạo schema Prisma và áp dụng các ràng buộc toàn vẹn dữ liệu bằng quy trình migration thủ công.
- **Nhiệm vụ cụ thể**:
  - Tạo file `server/prisma/schema.prisma` với 9 models (`User`, `Category`, `Brand`, `Product`, `ProductImage`, `ProductSpecification`, `Order`, `OrderItem`, `Contact`).
  - Chạy `npx prisma migrate dev --create-only --name init_schema_with_checks`.
  - Chèn các câu lệnh SQL thủ công vào file migration: `CHECK (stock >= 0)`, `CHECK ("soldCount" >= 0)`, `CHECK ("salePrice" >= 0)`, `CHECK (quantity > 0)`.
  - Thực thi migration vào PostgreSQL và kiểm tra trong DB.

---

## Giai đoạn 2: Backend Core - Xác thực & Base Middlewares

### [Phiên 2.1] Thiết lập Middlewares Nền tảng (Trust Proxy, Zod, Rate Limit, CORS, Error Handler)
- **Mục tiêu**: Xây dựng lớp phòng vệ bảo mật, bóc tách IP thật theo số hop proxy, cấu hình CORS an toàn và chuẩn hóa request/response.
- **Nhiệm vụ cụ thể**:
  - Cấu hình trust proxy linh hoạt với kiểm tra khởi động bắt buộc (Fail-fast): Ứng dụng Express **từ chối khởi động (`process.exit(1)`)** nếu `TRUST_PROXY_HOPS` không phải số nguyên dương hợp lệ ($\ge 1$).
  - Ghi nhận số hop A=1 (Production Render trực tiếp) và B=2 (Staging qua Vercel rewrite) là **giả thuyết cần kiểm chứng bằng endpoint debug trên staging thật** (`GET /api/v1/debug/ip` gửi request kèm `X-Forwarded-For` giả và so sánh `req.ip`); nếu có thêm Cloudflare/CDN phía trước thì cộng thêm hop tương ứng.
  - Viết bài test integration xác nhận endpoint debug `GET /api/v1/debug/ip` bắt buộc trả về `404 Not Found` trên môi trường Production.
  - Cấu hình Rate Limit: Đăng nhập theo cặp IP + Email (5 lần/15m), đặt hàng COD (20 đơn/15m/IP và 3 đơn/10m/SĐT), tra cứu (10 req/1m), liên hệ (3 req/15m).
  - Cấu hình CORS: `credentials: true` và `origin` cụ thể từ biến môi trường `CLIENT_URL`, tuyệt đối không dùng `origin: '*'`.
  - Xây dựng Zod validation middleware tự động strip các trường lạ ngoài schema.
  - Xây dựng Global Error Handler trả về chuẩn `{ success: false, message, errors }`.
  - Cấu hình CookieParser, Helmet.

### [Phiên 2.2] Module Xác thực (Auth API) với Cookie httpOnly
- **Mục tiêu**: Hoàn thiện API Đăng ký, Đăng nhập, Đăng xuất và middleware phân quyền.
- **Nhiệm vụ cụ thể**:
  - Xây dựng Zod schema đăng ký (mật khẩu >= 8 ký tự, strip `role`, gán cứng `CUSTOMER`).
  - Xây dựng hàm băm và xác thực mật khẩu bằng Argon2.
  - API Đăng nhập cấp JWT lưu trong cookie `httpOnly` (`sameSite: "lax"`, `secure`).
  - API Đăng xuất xóa cookie và API `/auth/me` lấy thông tin phiên.
  - Xây dựng middleware `authenticate` và `authorize(['ADMIN'])`.
  - Viết Unit test & API test hoàn chỉnh cho module Auth bằng Supertest.

---

## Giai đoạn 3: Module Catalog - Danh mục, Thương hiệu, Sản phẩm & Seed

### [Phiên 3.1] Xử lý Tải ảnh An toàn (Đồng Nhất 1 Ảnh / Request) & Dọn Ảnh Mồ Côi 24 Giờ
- **Mục tiêu**: Xây dựng endpoint upload 1 ảnh/request an toàn, client điều phối gửi tối đa 3 request song song, đồng nhất trên mọi môi trường và quản lý ảnh mồ côi.
- **Nhiệm vụ cụ thể**:
  - API `POST /api/v1/products/upload-image`: Multer nhận đúng 1 tệp ảnh / request vào RAM (MemoryStorage), tối đa 5MB.
  - Dùng Sharp kiểm tra kích thước pixel (width/height <= 4096px, total <= 16MP chống Pixel Flood / RAM exhaustion).
  - Luôn chuyển đổi và nén ảnh sang WebP (quality 80%), tạo 2 kích thước (standard 800px & thumb 300px).
  - Sinh tên file ngẫu nhiên từ `crypto.randomUUID()`. Hủy ngay file gốc trong RAM sau khi ghi storage.
  - Chuẩn hóa: Phía client khi tải nhiều ảnh sẽ gửi tối đa 3 request upload song song, giữ request nhẹ, không lo chạm trần giới hạn payload hay timeout.
  - Quản lý ảnh mồ côi:
    - Lưu ảnh WebP mới upload vào thư mục tạm `uploads/temp/`.
    - Khi Admin bấm Lưu sản phẩm (`POST /products` hoặc `PUT /products/:id`), server chuyển file từ `uploads/temp/` sang `uploads/products/`.
    - Thiết lập tác vụ định kỳ (Cron Job) quét dọn và xóa sạch các file ảnh tạm trong `uploads/temp/` có tuổi thọ vượt quá 24 giờ.

### [Phiên 3.2] API CRUD Danh mục & Thương hiệu
- **Mục tiêu**: Quản trị danh mục phân cấp đa tầng và thương hiệu sản phẩm.
- **Nhiệm vụ cụ thể**:
  - API lấy cây danh mục đa cấp (hỗ trợ parent - child) và danh sách thương hiệu.
  - API CRUD danh mục và thương hiệu cho Admin.
  - Logic chặn xóa danh mục/thương hiệu nếu còn sản phẩm trực thuộc.

### [Phiên 3.3] API Sản phẩm, Xóa An toàn & Tìm kiếm Không Dấu (đ/Đ)
- **Mục tiêu**: Quản trị sản phẩm, xử lý tìm kiếm không dấu chuẩn xác và xóa sản phẩm thông minh không giả định mã lỗi.
- **Nhiệm vụ cụ thể**:
  - Xây dựng hàm `removeVietnameseTones()` bóc tách Unicode NFD và xử lý riêng biệt `đ`/`Đ` thành `d`.
  - Viết Unit test xác thực hàm với các từ khóa: `"Điều hòa"` -> `"dieu hoa"`, `"Tủ đông"` -> `"tu dong"`, `"Máy giặt"` -> `"may giat"`.
  - API CRUD Sản phẩm: lưu bảng specs phân nhóm, thư viện ảnh và tự động cập nhật `normalizedName`.
  - Xử lý xóa sản phẩm:
    - Thao tác xóa cứng và thao tác fallback ẩn là **hai thao tác độc lập, KHÔNG nằm chung một transaction** (vì PostgreSQL hủy toàn bộ transaction khi một câu lệnh lỗi).
    - Test tích hợp trên **PostgreSQL thật là nguồn sự thật** xác nhận chính xác mã lỗi Prisma khi xóa sản phẩm đã có `OrderItem` (onDelete: Restrict) - mã `P2003`, không giả định mã lỗi.
    - Khi bắt được mã lỗi khóa ngoại: Thực hiện lệnh độc lập thứ hai cập nhật `isActive = false`, trả response chuẩn `{ success: true, data: { isArchived: true }, message }`.
    - Khi xóa cứng DB thành công (chưa có đơn hàng): Tiến hành xóa file trên storage; **lỗi xóa file storage chỉ ghi log (`logger.error`), không throw error**, trả về `{ success: true, data: { isArchived: false }, message }`.
  - API Tìm kiếm & Lọc sản phẩm: tìm kiếm không dấu qua `normalizedName`, lọc danh mục, hãng, khoảng giá, sắp xếp theo giá, mới nhất hoặc bán chạy (`soldCount`), phân trang an toàn (limit max 50).
  - Ghi chú kiến trúc: Index B-Tree đáp ứng tốt cho v1 (< vài nghìn sản phẩm), quy hoạch mở rộng `pg_trgm` GIN index cho v2.

### [Phiên 3.4] Script Seeding Dữ liệu Mẫu & Ảnh Minh Họa Tự Tạo
- **Mục tiêu**: Nạp dữ liệu mẫu ban đầu để chạy thử nghiệm độc lập không phụ thuộc dữ liệu ngoài.
- **Nhiệm vụ cụ thể**:
  - Viết `server/prisma/seed.ts` đọc tài khoản Admin từ biến môi trường (`ADMIN_EMAIL`, `ADMIN_INITIAL_PASSWORD`).
  - Tự tạo bộ ảnh minh họa chuẩn (sử dụng vector SVG/WebP nội bộ có nhãn sản phẩm và kích thước chuẩn, cam kết không copy ảnh vi phạm bản quyền từ META.vn hay bất kỳ nguồn nào).
  - Khởi tạo 20+ thiết bị điện máy mẫu (Tivi Sony, Tủ lạnh Panasonic, Máy giặt Electrolux, Điều hòa Daikin...) kèm thông số kỹ thuật phân nhóm.

---

## Giai đoạn 4: Quản lý Đơn hàng, Tồn kho & Tra cứu Đơn

### [Phiên 4.1] Nghiệp vụ Tạo Đơn hàng COD & Phòng chống Deadlock
- **Mục tiêu**: Xây dựng API đặt hàng COD an toàn, chỉ nhận `productId` và `quantity`.
- **Nhiệm vụ cụ thể**:
  - Zod validation cho form đặt hàng: chuẩn hóa SĐT, địa chỉ gồm Tỉnh/Thành + Địa chỉ chi tiết.
  - Xử lý gộp dòng trùng `productId` và sắp xếp danh sách `productId` tăng dần trước khi trừ kho.
  - Viết `createOrderService`: chạy transaction, trừ kho atomic (`UPDATE ... WHERE stock >= qty AND isActive = true`), đọc giá/tên từ DB, áp dụng phí vận chuyển = 0đ (v1).
  - Sinh mã đơn hàng ngẫu nhiên tối thiểu 8 ký tự từ crypto (`VE-XXXXXXXX`) kèm retry 3 lần.

### [Phiên 4.2] Kiểm thử Concurrency Chống Bán Vượt Kho trên PostgreSQL Thật
- **Mục tiêu**: Chứng minh bằng test tự động rằng hệ thống không bao giờ bị over-selling khi nhiều người cùng đặt.
- **Nhiệm vụ cụ thể**:
  - Thiết lập kịch bản kiểm thử Supertest kết nối trực tiếp vào **CSDL PostgreSQL thật** (không dùng Mock/In-memory).
  - Chuẩn bị sản phẩm thử nghiệm có `stock = 1`.
  - Gửi đồng thời 5 requests đặt hàng cùng lúc bằng `Promise.all([req1, req2, req3, req4, req5])`.
  - Khẳng định (Assert): Đúng duy nhất 1 request trả về `201 Created`, 4 requests còn lại nhận `409 Conflict`, và số lượng tồn kho cuối cùng trong PostgreSQL bằng chính xác `0` (không âm).

### [Phiên 4.3] Quản lý Trạng thái Đơn hàng & Cơ chế Hoàn Kho Độc Nhất
- **Mục tiêu**: Xây dựng luồng chuyển đổi trạng thái đơn hàng theo State Machine.
- **Nhiệm vụ cụ thể**:
  - Triển khai máy trạng thái: `PENDING` -> `PROCESSING` -> `SHIPPING` -> `COMPLETED` / `CANCELLED`.
  - Khi đơn sang `COMPLETED`: Tự động tăng `soldCount` cho các sản phẩm trong đơn.
  - Khi đơn sang `CANCELLED`: Kiểm tra trạng thái cũ trong transaction, thực hiện hoàn trả tồn kho đúng một lần duy nhất. Chặn thao tác hủy nếu đơn đã hoàn tất hoặc đã bị hủy trước đó.

### [Phiên 4.4] Tra cứu Đơn hàng Bảo mật & API Khách hàng
- **Mục tiêu**: Cho phép khách vãng lai tra cứu đơn hàng và xem danh sách đơn đã đặt.
- **Nhiệm vụ cụ thể**:
  - API `POST /api/v1/orders/lookup`: Nhận body `{ orderCode, phone }`, tự động chuẩn hóa SĐT trước khi so khớp, áp dụng Rate Limit (10 req/1m).
  - API `GET /api/v1/users/orders`: Xem lịch sử đơn hàng của tài khoản đã đăng nhập.
  - API `POST /api/v1/contacts`: Tiếp nhận tin nhắn liên hệ kèm Rate Limit (3 req/15m).

---

## Giai đoạn 5: Frontend - Giao diện Mobile-First, Trang chủ & Danh mục

### [Phiên 5.1] Design System (CSS Modules) & Layout Khung (TopBar, Header, Footer)
- **Mục tiêu**: Xây dựng nhận diện thương hiệu VietElectro chuẩn phong cách META.vn.
- **Nhiệm vụ cụ thể**:
  - Thiết lập bảng màu CSS Variables: Đỏ thương mại `#D70018`, nền `#F8F9FA`, text typography tiếng Việt.
  - Xây dựng TopBar: Hotline, tra cứu đơn hàng nhanh, giỏ hàng có badge số lượng.
  - Xây dựng Header: Ô tìm kiếm thông minh, nút Tài khoản/Đăng nhập.
  - Xây dựng Footer: Đầy đủ chính sách (Vận chuyển 0đ, Bảo hành, Đổi trả, Thông tin cửa hàng).

### [Phiên 5.2] Trang chủ: Banner & Khối Sản phẩm Ngành hàng
- **Mục tiêu**: Xây dựng trang chủ thu hút với các khối ngành hàng điện máy chủ lực.
- **Nhiệm vụ cụ thể**:
  - Mega Menu danh mục đa tầng trên Desktop và Drawer menu vuốt mượt trên Mobile.
  - Banner trượt khuyến mãi nổi bật.
  - Khối sản phẩm nhóm theo ngành hàng: Tivi, Tủ lạnh, Máy giặt, Điều hòa, Gia dụng.

### [Phiên 5.3] Trang Danh mục & Bộ lọc Tìm kiếm Đa Tiêu chí
- **Mục tiêu**: Trang duyệt sản phẩm với bộ lọc chuyên sâu cho điện máy.
- **Nhiệm vụ cụ thể**:
  - Bộ lọc khoảng giá (dưới 5tr, 5-10tr, 10-20tr, trên 20tr hoặc tự nhập khoảng giá).
  - Bộ lọc thương hiệu (Samsung, LG, Panasonic, Daikin...).
  - Thanh sắp xếp: Giá tăng dần, Giá giảm dần, Hàng mới nhất, Bán chạy (dựa vào `soldCount`).
  - Thanh phân trang với URL query state đồng bộ.

### [Phiên 5.4] Trang Chi tiết Sản phẩm & Mục "Đã xem gần đây"
- **Mục tiêu**: Trình bày thông tin kỹ thuật chuyên sâu và ghi nhớ lịch sử duyệt sản phẩm.
- **Nhiệm vụ cụ thể**:
  - Gallery hình ảnh sản phẩm với thumbnail chuyển đổi tức thì.
  - Hiển thị giá niêm yết, giá khuyến mãi, nhãn Còn hàng/Hết hàng (vô hiệu hóa nút mua khi tồn = 0).
  - Bảng thông số kỹ thuật dạng nhóm (Tổng quan, Công nghệ, Kích thước - Khối lượng).
  - Hook `useRecentlyViewed`: Tự động lưu tối đa 10 ID sản phẩm vào LocalStorage và hiển thị khối carousel sản phẩm đã xem ở chân trang.

---

## Giai đoạn 6: Frontend - Giỏ hàng, Đặt hàng COD & Quản lý Tài khoản

### [Phiên 6.1] Giỏ hàng (CartContext) & Kiểm soát Tồn kho Client
- **Mục tiêu**: Quản lý giỏ hàng phía Client lưu trữ LocalStorage.
- **Nhiệm vụ cụ thể**:
  - Thêm, bớt số lượng, xóa sản phẩm khỏi giỏ.
  - Kiểm tra chặn tăng số lượng vượt quá tồn kho thực tế của sản phẩm.
  - Drawer giỏ hàng nhanh và trang giỏ hàng chi tiết.

### [Phiên 6.2] Trang Thanh toán COD & Tra cứu Đơn hàng
- **Mục tiêu**: Hoàn tất hành trình đặt mua hàng COD không cần đăng nhập.
- **Nhiệm vụ cụ thể**:
  - Form đặt hàng COD: Họ tên, Số điện thoại, Tỉnh/Thành (dropdown chọn 34 đơn vị hành chính cấp tỉnh nạp từ file `client/src/data/provinces.ts`), Địa chỉ chi tiết (số nhà, đường, phường/xã), Ghi chú.
  - Hiển thị phí vận chuyển 0 VNĐ và tổng tiền cuối cùng.
  - Màn hình xác nhận thành công hiển thị Mã đơn hàng (`VE-XXXXXXXX`).
  - Trang Tra cứu đơn hàng: Form POST nhập Mã đơn + SĐT, hiển thị timeline trạng thái đơn.

### [Phiên 6.3] Trang Đăng ký, Đăng nhập, Hồ sơ cá nhân & Liên hệ
- **Mục tiêu**: Quản trị tài khoản khách hàng cá nhân.
- **Nhiệm vụ cụ thể**:
  - Form Đăng ký (mật khẩu >= 8 ký tự) & Đăng nhập (bảo vệ cookie httpOnly).
  - Trang cập nhật Họ tên, SĐT, Tỉnh/Thành và Địa chỉ mặc định.
  - Trang xem Lịch sử các đơn hàng đã đặt kèm chi tiết mặt hàng và trạng thái.
  - Trang Liên hệ gửi thắc mắc/tư vấn.

---

## Giai đoạn 7: Giao diện Quản trị viên (Admin Portal)

### [Phiên 7.1] Layout Quản trị & Màn hình Quản lý Sản phẩm (Upload ảnh)
- **Mục tiêu**: Cung cấp công cụ cho chủ shop thêm/sửa sản phẩm và tải ảnh WebP.
- **Nhiệm vụ cụ thể**:
  - Layout Admin với Sidebar điều hướng và Route Guard (chỉ mở cho role `ADMIN`).
  - Danh sách sản phẩm có tìm kiếm, lọc theo danh mục và chuyển đổi trạng thái Ẩn/Hiện.
  - Form Thêm/Sửa sản phẩm: Tải lên tối đa 5 ảnh, xem trước thumbnail, nhập bảng thông số kỹ thuật động theo nhóm.

### [Phiên 7.2] Quản lý Danh mục, Thương hiệu, Đơn hàng & Tin nhắn
- **Mục tiêu**: Hoàn thiện toàn bộ các chức năng quản trị còn lại.
- **Nhiệm vụ cụ thể**:
  - Quản lý Danh mục (hỗ trợ phân cấp cha/con) và Thương hiệu (logo hãng).
  - Quản lý Đơn hàng: Bảng danh sách đơn hàng có lọc theo trạng thái (`PENDING`, `PROCESSING`, `SHIPPING`, `COMPLETED`, `CANCELLED`).
  - Modal xem chi tiết đơn hàng và các nút chuyển đổi trạng thái đơn (kèm cảnh báo xác nhận khi Hủy đơn hoàn kho).
  - Màn hình xem danh sách Khách hàng và Hộp thư Tin nhắn liên hệ.

---

## Giai đoạn 8: Kiểm thử Toàn diện (Playwright E2E), Tối ưu & Đóng gói Triển khai

### [Phiên 8.1] Kiểm thử Tự động E2E với Playwright
- **Mục tiêu**: Tự động hóa kiểm thử toàn bộ hành trình người dùng trên môi trường giả lập Mobile.
- **Nhiệm vụ cụ thể**:
  - Kịch bản 1 (Khách mua hàng): Mở trang chủ -> Tìm kiếm "may giat" -> Lọc theo giá -> Chọn sản phẩm -> Thêm vào giỏ -> Đặt hàng COD -> Tra cứu trạng thái đơn hàng vừa tạo.
  - Kịch bản 2 (Chủ shop duyệt đơn): Đăng nhập Admin -> Mở chi tiết đơn hàng mới -> Chuyển sang `Đang xử lý` -> Chuyển sang `Đang giao` -> Chuyển sang `Hoàn tất` (xác nhận tăng `soldCount`).

### [Phiên 8.2] Tối ưu Hiệu năng Mobile & Chuẩn bị Triển khai (Deploy Ready)
- **Mục tiêu**: Đảm bảo tốc độ tải trang cao và cấu hình sẵn sàng đưa lên môi trường Production.
- **Nhiệm vụ cụ thể**:
  - Đo đạc và tối ưu chỉ số Google Lighthouse Mobile (điểm Performance > 90, tối ưu nén ảnh WebP, lazy load component).
  - Viết file cấu hình Reverse Proxy `client/vercel.json` để đồng bộ cookie SameSite khi triển khai Frontend trên Vercel và Backend trên Render.
  - Chuẩn bị file `.env.example` và tài liệu hướng dẫn vận hành, migration CSDL lên Supabase/Neon.
