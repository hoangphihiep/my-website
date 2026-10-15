# KẾ HOẠCH PHÁT TRIỂN (DEVELOPMENT ROADMAP)

## Dự án: Website Điện Máy VietElectro

Lộ trình được phân rã thành các tính năng nhỏ độc lập. **Mỗi nhiệm vụ được thiết kế vừa vặn để hoàn thành trọn vẹn trong một phiên làm việc (Single Coding Session)**.

---

```mermaid
gantt
    title Lộ trình Triển khai Dự án VietElectro theo Phiên làm việc
    dateFormat  YYYY-MM-DD
    section Hạ tầng & DB
    P1.1: Repo, Lint, Test & CI Actions     :p1_1, 2026-10-16, 1d
    P1.2: Prisma Schema & SQL Constraints    :p1_2, after p1_1, 1d
    section Xác thực & Bảo mật
    P2.1: Middlewares (TrustProxy, Zod, CORS):p2_1, after p1_2, 1d
    P2.2: Auth API, Cookie & Seed Admin ENV  :p2_2, after p2_1, 1d
    section Catalog Engine
    P3.1: Upload Storage Adapter & Dọn 24h   :p3_1, after p2_2, 1d
    P3.2: CRUD Danh mục & Hãng sản xuất      :p3_2, after p3_1, 1d
    P3.3: CRUD Sản phẩm & Search không dấu   :p3_3, after p3_2, 1d
    P3.4: Seed Catalog & Ảnh mẫu tự tạo      :p3_4, after p3_3, 1d
    section Đơn hàng & Tồn kho
    P4.1: API Tạo đơn COD & Tránh Deadlock   :p4_1, after p3_4, 1d
    P4.2: Test Concurrency & Validation DB Thật:p4_2, after p4_1, 1d
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

### [Phiên 1.1] Khởi tạo Cấu trúc Monorepo, Công cụ Kiểm thử & CI Pipeline

- **Mục tiêu**: Thiết lập cấu trúc monorepo `client/` và `server/`, thiết lập linting, kiểm tra kiểu nghiêm ngặt, hạ tầng test, tệp bỏ qua và tích hợp liên tục (CI).
- **Nhiệm vụ cụ thể**:
  - Khởi tạo thư mục `client/` bằng React (Vite) + TypeScript + CSS Modules.
  - Khởi tạo thư mục `server/` bằng Node.js + Express + TypeScript.
  - Cấu hình file `.gitignore` bao gồm: `server/uploads/`, `playwright-report/`, `test-results/`, `node_modules/`, `.env`, `dist/`.
  - Cấu hình **ESLint** (linting) và Prettier cho toàn bộ mã nguồn cả hai phía.
  - Cấu hình kiểm tra kiểu TypeScript: script `tsc --noEmit` cho cả client và server.
  - Cài đặt và cấu hình bộ công cụ kiểm thử: **Vitest** (unit & integration test) + **Supertest** (API endpoint test).
  - Khởi tạo khung kiểm thử giao diện **Playwright** (scaffolding `playwright.config.ts` và thư mục `tests/e2e/`).
  - Thiết lập **GitHub Actions** CI workflow (`.github/workflows/ci.yml`): Tự động kích hoạt khi có Pull Request hoặc Push vào nhánh `main` để chạy kiểm tra 3 bước: `lint`, `tsc` (typecheck), và `test` (Vitest).

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
  - Cấu hình trust proxy linh hoạt với kiểm tra khởi động bắt buộc (Fail-fast):
    - Khai báo rõ ràng qua biến môi trường `TRUST_PROXY_HOPS`, bắt buộc là số nguyên không âm ($\ge 0$).
    - Cho phép `0` cho môi trường Local Development (chạy trực tiếp không qua proxy).
    - Trên Production (`NODE_ENV === "production"`), bắt buộc `TRUST_PROXY_HOPS >= 1` (Render luôn nằm sau reverse proxy), fail-fast nếu thiếu hoặc bằng 0.
  - Ghi nhận số hop A=1 (Production Render trực tiếp) và B=2 (Staging qua Vercel rewrite) là **giả thuyết cần kiểm chứng bằng endpoint debug trên staging thật** (`GET /api/v1/debug/ip` gửi request kèm `X-Forwarded-For` giả và so sánh `req.ip`); nếu có thêm Cloudflare/CDN phía trước thì cộng thêm hop tương ứng.
  - Viết bài test integration xác nhận endpoint debug `GET /api/v1/debug/ip` bắt buộc trả về `404 Not Found` trên môi trường Production.
  - Cấu hình Rate Limit: Đăng nhập theo cặp IP + Email (5 lần/15m), đặt hàng COD (20 đơn/15m/IP và 3 đơn/10m/SĐT), tra cứu (10 req/1m), liên hệ (3 req/15m).
  - Cấu hình CORS: `credentials: true` và `origin` cụ thể từ biến môi trường `CLIENT_URL`, tuyệt đối không dùng `origin: '*'`.
  - Xây dựng Zod validation middleware tự động strip các trường lạ ngoài schema.
  - Xây dựng Global Error Handler trả về chuẩn `{ success: false, message, errors }`.
  - Cấu hình CookieParser, Helmet.

### [Phiên 2.2] Module Xác thực (Auth API) với Cookie httpOnly & Seed Admin ENV

- **Mục tiêu**: Hoàn thiện API Đăng ký, Đăng nhập, Đăng xuất, middleware phân quyền và nạp ngay tài khoản Admin đầu tiên từ biến môi trường để kiểm thử.
- **Nhiệm vụ cụ thể**:
  - Xây dựng Zod schema đăng ký (mật khẩu >= 8 ký tự, strip `role`, gán cứng `CUSTOMER`).
  - Xây dựng hàm băm và xác thực mật khẩu bằng Argon2.
  - API Đăng nhập cấp JWT lưu trong cookie `httpOnly` (`sameSite: "lax"`, `secure`).
  - API Đăng xuất xóa cookie và API `/auth/me` lấy thông tin phiên.
  - Xây dựng middleware `authenticate` và `authorize(['ADMIN'])`.
  - **Script Seed Admin ban đầu (`server/prisma/seed-admin.ts`)**: Đọc tài khoản Admin từ biến môi trường (`ADMIN_EMAIL`, `ADMIN_INITIAL_PASSWORD`), băm mật khẩu bằng Argon2 và nạp vào CSDL với `role = ADMIN` để kiểm thử ngay luồng bảo mật và phân quyền sau phiên này.
  - Viết Unit test & API test hoàn chỉnh cho module Auth bằng Supertest.

---

## Giai đoạn 3: Module Catalog - Danh mục, Thương hiệu, Sản phẩm & Seed

### [Phiên 3.1] Xử lý Tải ảnh An toàn Qua Storage Adapter & Dọn Ảnh Mồ Côi 24 Giờ

- **Mục tiêu**: Xây dựng endpoint upload 1 ảnh/request an toàn qua Storage Adapter (R2/S3 tiền tố temp/), client điều phối gửi tối đa 3 request song song, đồng nhất trên mọi môi trường và quản lý ảnh mồ côi.
- **Nhiệm vụ cụ thể**:
  - API `POST /api/v1/products/upload-image`: Multer nhận đúng 1 tệp ảnh / request vào RAM (MemoryStorage), tối đa 5MB.
  - Dùng Sharp kiểm tra kích thước pixel (width/height <= 4096px, total <= 16MP chống Pixel Flood / RAM exhaustion).
  - Luôn chuyển đổi và nén ảnh sang WebP (quality 80%), tạo 2 kích thước (standard 800px & thumb 300px).
  - Sinh tên file ngẫu nhiên từ `crypto.randomUUID()`. Hủy ngay file gốc trong RAM sau khi đẩy lên Storage.
  - **Storage Adapter (R2/S3)**: Tải ảnh trực tiếp lên Object Storage với tiền tố `temp/` (không dựa vào ổ đĩa cục bộ của Render), trả về tên file `tempFileName` dạng `${uuid}.webp`.
  - Phía Client: Khi chọn nhiều ảnh sẽ gửi tối đa 3 request upload song song qua hàng đợi. Khi lưu sản phẩm, **client chỉ gửi danh sách tên file tạm dạng `UUID.webp`**, server kiểm tra regex chặt chẽ và thực hiện "di chuyển" file bằng cách copy sang tiền tố `products/` rồi xóa file tại `temp/` qua Storage Adapter.
  - Object Lifecycle Rule (hoặc Cron Job định kỳ) tự động quét và xóa sạch các file tạm có tiền tố `temp/` quá 24 giờ.

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

### [Phiên 3.4] Script Seeding Dữ liệu Mẫu Catalog & Ảnh Minh Họa Tự Tạo

- **Mục tiêu**: Nạp dữ liệu mẫu ban đầu cho danh mục, hãng và thiết bị điện máy để chạy thử nghiệm độc lập không phụ thuộc dữ liệu ngoài.
- **Nhiệm vụ cụ thể**:
  - Viết `server/prisma/seed-catalog.ts` nạp danh mục, thương hiệu và thông số kỹ thuật điện máy.
  - Tự tạo bộ ảnh minh họa chuẩn (sử dụng vector SVG/WebP nội bộ có nhãn sản phẩm và kích thước chuẩn, cam kết không copy ảnh vi phạm bản quyền từ META.vn hay bất kỳ nguồn nào).
  - Khởi tạo 20+ thiết bị điện máy mẫu (Tivi Sony, Tủ lạnh Panasonic, Máy giặt Electrolux, Điều hòa Daikin...) kèm thông số kỹ thuật phân nhóm.

---

## Giai đoạn 4: Quản lý Đơn hàng, Tồn kho & Tra cứu Đơn

### [Phiên 4.1] Nghiệp vụ Tạo Đơn hàng COD, Validation Chặt Chẽ & Phòng chống Deadlock

- **Mục tiêu**: Xây dựng API đặt hàng COD an toàn, validate toàn diện qua Zod, gộp dòng trùng và sắp xếp ngoài transaction, xử lý retry mã đơn ngoài transaction.
- **Nhiệm vụ cụ thể**:
  - Zod validation cho form tạo đơn:
    - `customerName`: Tối đa 100 ký tự.
    - `customerPhone`: Chuẩn hóa qua `normalizePhone` trước khi regex kiểm tra di động 10 số.
    - `customerEmail`: Email hợp lệ, tối đa 100 ký tự (optional).
    - `province`: Bắt buộc thuộc danh sách 34 đơn vị hành chính cấp tỉnh (server lưu bản sao tại `server/src/data/provinces.ts` và có test đối chiếu).
    - `detailAddress`: Tối thiểu 5 ký tự và tối đa 200 ký tự.
    - `note`: Tối đa 500 ký tự.
    - `quantity`: Số nguyên từ 1 đến 10 (`z.number().int().min(1).max(10)`).
    - `items`: Mảng từ 1 đến 20 dòng (`z.array(...).min(1).max(20)`).
    - `productId`: Bắt buộc đúng định dạng UUID.
    - Tuyệt đối không cho phép gửi `userId`, `price` trong body (strip hoàn toàn).
  - Middleware `optionalAuth`: Bóc tách `userId` từ token cookie nếu có phiên đăng nhập, khách vãng lai để `null`.
  - Tầng Service (`createOrderService`):
    - Thực hiện **gộp dòng trùng `productId`** ở ngay đầu hàm, **HOÀN TOÀN NGOÀI TRANSACTION**.
    - **Kiểm tra giới hạn số lượng sau khi gộp**: Nếu tổng `quantity` cho bất kỳ sản phẩm nào sau khi gộp vượt quá 10, lập tức trả lỗi `400 Bad Request`.
    - **Sắp xếp mảng `productId` tăng dần** ngoài transaction để phòng ngừa Deadlock.
    - Kiểm tra chống tràn số Int32 của `totalAmount`: Nếu vượt quá 2 tỷ VNĐ, từ chối tạo đơn.
    - Transaction nguyên tử: Trừ kho atomic (`UPDATE ... WHERE stock >= qty AND isActive = true`), đọc giá/tên từ DB, áp dụng phí ship = 0đ.
    - Ràng buộc `UNIQUE` trên `orderCode` là nguồn sự thật: Bỏ hoàn toàn bước `findUnique` kiểm tra trước; bắt lỗi Prisma `P2002` ở **NGOÀI transaction**, **chỉ retry tối đa 3 lần nếu `meta.target` chứa `orderCode`** (các lỗi P2002 khác quăng lỗi bình thường).

### [Phiên 4.2] Kiểm thử Tích Hợp Concurrency & Data Integrity trên PostgreSQL Thật

- **Mục tiêu**: Dùng Supertest kiểm thử tự động toàn diện logic tạo đơn và tính toàn vẹn dữ liệu kết nối trực tiếp CSDL PostgreSQL thật (không dùng Mock).
- **Nhiệm vụ cụ thể**:
  - **Test Concurrency chống over-selling**:
    - Chuẩn bị sản phẩm thử nghiệm có `stock = 1`.
    - Gửi đồng thời 5 requests đặt hàng cùng lúc bằng `Promise.all([req1, req2, req3, req4, req5])`.
    - Khẳng định (Assert): Đúng duy nhất 1 request nhận `201 Created`, 4 requests còn lại nhận `409 Conflict`, và số lượng tồn kho cuối cùng trong PostgreSQL bằng chính xác `0` (không âm).
  - **Test Zod Validation & Độ dài**:
    - Gửi `quantity` âm (`-1`), bằng `0`, hoặc số lẻ (`1.5`): Khẳng định server từ chối với mã lỗi `400 Bad Request`.
    - Gửi `quantity > 10` hoặc `items` rỗng (`[]`) hoặc `items > 20`: Khẳng định trả về `400 Bad Request`.
    - Gửi `customerName > 100`, `detailAddress > 200`, `note > 500`: Khẳng định trả về `400 Bad Request`.
    - Gửi `province` ngoài danh sách 34 đơn vị hành chính: Khẳng định trả về `400 Bad Request`.
  - **Test Gộp Dòng Trùng & Chặn Quá Số Lượng**:
    - Gửi request chứa 2 dòng cùng 1 `productId` với số lượng 2 và 3: Khẳng định server gộp thành 1 dòng có số lượng 5 và trừ kho chính xác 5 sản phẩm.
    - Gửi request chứa 2 dòng cùng 1 `productId` với số lượng 6 và 5 (tổng = 11 > 10): Khẳng định server từ chối với mã lỗi `400 Bad Request`.
  - **Test Đối Chiếu Danh Sách Tỉnh Thành**:
    - Unit test xác nhận `server/src/data/provinces.ts` và `client/src/data/provinces.ts` trùng khớp 100% về số lượng (34 đơn vị) và nội dung.
  - **Test Sản phẩm Ngừng Kinh doanh**:
    - Đặt hàng sản phẩm có `isActive = false`: Khẳng định server từ chối với mã `409 Conflict` (hoặc `400 Bad Request`).
  - **Test Bảo mật Dữ liệu Client**:
    - Cố tình gửi `price: 1000` hoặc `userId: "hacked-user-id"` trong request body: Khẳng định server bỏ qua hoàn toàn, giá tính theo DB thật và `userId` gán theo cookie phiên thực tế.
  - **Test Retry Mã Đơn P2002**:
    - Xác nhận chỉ retry khi lỗi P2002 liên quan đến `orderCode`; các lỗi P2002 khác bị từ chối ngay.

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
