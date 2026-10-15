# TÀI LIỆU KIẾN TRÚC HỆ THỐNG (ARCHITECTURE)
## Dự án: Website Điện Máy VietElectro

---

## 1. Công nghệ Đề xuất & Quyết định Kỹ thuật

Hệ thống lựa chọn ngăn xếp công nghệ tinh gọn, ổn định và hiệu năng cao:

| Thành phần | Công nghệ lựa chọn | Lý do & Quyết định kỹ thuật |
| :--- | :--- | :--- |
| **Frontend** | **React 18+ (Vite) + TypeScript** | Build cực nhanh với Vite, bundling tối ưu cho mobile-first. TypeScript giúp đồng bộ kiểu dữ liệu với backend, giảm thiểu lỗi runtime. |
| **Styling** | **CSS Modules kết hợp Vanilla CSS Custom Properties (Design Tokens)** | **Quyết định kỹ thuật**: Sử dụng CSS Modules kết hợp CSS Variables dùng chung.<br/>- *Zero configuration*: Vite hỗ trợ `.module.css` mặc định, không cần cài PostCSS plugins phức tạp.<br/>- *Scoped CSS tự động*: Tránh 100% nguy cơ xung đột class name giữa các component độc lập.<br/>- *Quản lý Design System tập trung*: Tận dụng CSS Variables (Design Tokens) cho màu sắc, typography và khoảng cách nhất quán trên toàn ứng dụng.<br/>- *Dễ bảo trì UI phức tạp*: Phù hợp viết và tinh chỉnh các thành phần e-commerce đặc thù (Mega menu đa tầng, drawer giỏ hàng, animations). |
| **Backend** | **Node.js + Express + TypeScript** | Khung sườn kinh điển, hiệu năng cao, cơ chế middleware linh hoạt, thời gian khởi động nhanh, dễ bảo trì và mở rộng. |
| **Cơ sở dữ liệu** | **PostgreSQL (v15+)** | CSDL quan hệ chuẩn công nghiệp, hỗ trợ ACID toàn vẹn cho đơn hàng và giao dịch tồn kho, hỗ trợ ràng buộc CHECK ở tầng DB. |
| **ORM** | **Prisma ORM** | Type-safe 100% từ Database schema đến mã TypeScript, quản lý migration rõ ràng, hỗ trợ interactive transactions tin cậy. |
| **Kiểm tra dữ liệu**| **Zod** | Validate dữ liệu đầu vào nghiêm ngặt tại Controller server; áp dụng `.strip()` để tự động loại bỏ mọi trường lạ (đặc biệt là `role`). Không tin bất kỳ dữ liệu nào từ client. |
| **Xác thực** | **JWT lưu trong Cookie httpOnly** | Ngăn chặn đánh cắp token qua XSS. Mật khẩu tối thiểu 8 ký tự, băm bằng **Argon2** (hoặc Bcrypt). |
| **Testing** | **Vitest + Supertest + Playwright** | Vitest cho Unit Test logic; Supertest cho Integration API; Playwright kiểm thử E2E trên mobile giả lập. |

---

## 2. Cấu trúc Thư mục Dự án (Directory Structure)

Dự án được tổ chức theo mô hình Monorepo chia làm `client/` và `server/`:

```text
my-website/
├── .agents/                    # Quy tắc và workflows trợ lý ảo
├── docs/                       # Tài liệu đặc tả kỹ thuật
│   ├── PRD.md
│   ├── user-stories.md
│   ├── architecture.md
│   ├── database.md
│   └── roadmap.md
├── client/                     # Mã nguồn Frontend (React + Vite + TS)
│   ├── public/                 # Favicon, assets tĩnh
│   ├── src/
│   │   ├── assets/             # Hình ảnh logo, icons SVG
│   │   ├── components/         # Components giao diện (CSS Modules kèm theo)
│   │   │   ├── common/         # Button, Input, Modal, Badge, Breadcrumb
│   │   │   ├── layout/         # Header, TopBar, Footer, MobileNav, AdminLayout
│   │   │   ├── product/        # ProductCard, ProductList, ProductGallery, SpecsTable
│   │   │   └── cart/           # CartDrawer, CartItem, OrderSummary
│   │   ├── contexts/           # React Context (AuthContext, CartContext)
│   │   ├── data/
│   │   │   └── provinces.ts    # Danh sách 34 đơn vị hành chính cấp tỉnh (28 tỉnh, 6 thành phố)
│   │   ├── hooks/              # Custom Hooks (useDebounce, useRecentlyViewed...)
│   │   ├── pages/              # Trang giao diện
│   │   │   ├── public/         # HomePage, CatalogPage, ProductDetailPage, CartPage, CheckoutPage, OrderLookupPage, ContactPage
│   │   │   ├── customer/       # LoginPage, RegisterPage, ProfilePage, OrderHistoryPage
│   │   │   └── admin/          # Dashboard, ProductManager, OrderManager, CategoryManager, BrandManager, ContactManager
│   │   ├── services/           # Gọi API backend (axios / fetch wrapper)
│   │   ├── styles/             # Design tokens, variables.css, global.css
│   │   ├── types/              # Type definitions phía client
│   │   ├── utils/              # Format tiền VNĐ, format ngày tháng, chuẩn hóa dữ liệu
│   │   ├── App.tsx             # Định tuyến React Router
│   │   └── main.tsx            # Điểm khởi chạy React
│   ├── vercel.json             # Cấu hình proxy /api sang backend (chỉ dùng cho Dev/Test)
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                     # Mã nguồn Backend (Node.js + Express + TS)
│   ├── prisma/
│   │   ├── schema.prisma       # Định nghĩa lược đồ CSDL
│   │   ├── migrations/         # Lịch sử migration CSDL (kèm CHECK constraint SQL thủ công)
│   │   └── seed.ts             # Tạo Admin đầu tiên từ ENV & dữ liệu mẫu kèm ảnh tự tạo
│   ├── src/
│   │   ├── config/             # Cấu hình biến môi trường, constants, db
│   │   ├── controllers/        # Tiếp nhận request và trả về response
│   │   ├── middlewares/        # Middlewares: auth, role, zod validate, rate-limit, error handler, upload
│   │   ├── routes/             # Định nghĩa danh sách API endpoints
│   │   ├── services/           # Nghiệp vụ logic chính (Business logic)
│   │   ├── validations/        # Các Zod schema kiểm tra input đầu vào
│   │   ├── types/              # Định nghĩa kiểu dữ liệu TS mở rộng
│   │   ├── utils/              # Hàm tiện ích (crypto, hash, normalizePhone, removeVietnameseTones, storage)
│   │   ├── app.ts              # Khởi tạo Express app & middleware toàn cục
│   │   └── server.ts           # Lắng nghe cổng và kết nối Database
│   ├── tests/                  # Unit test & Integration test (Vitest, Supertest)
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── .gitignore
└── package.json                # Root scripts điều phối
```

---

## 3. Luồng Dữ liệu & Xử lý Yêu cầu (Request Lifecycle)

```mermaid
sequenceDiagram
    autonumber
    actor Khách as Khách hàng (Mobile/Desktop)
    participant Client as React Client (Vite)
    participant Middleware as Express Middlewares (CORS Credentials, RateLimit, TrustProxy, Cookie, Zod, Auth)
    participant Controller as Express Controller
    participant Service as Business Service
    participant Prisma as Prisma ORM
    participant DB as PostgreSQL Database

    Khách->>Client: Bấm "Đặt hàng COD"
    Client->>Middleware: Gửi POST /api/v1/orders (Chỉ gửi productId & quantity)
    Note over Middleware: 1. CORS xác thực origin cụ thể<br/>2. Trust proxy bóc tách IP thật theo số hops<br/>3. Rate-limit kiểm tra tần suất<br/>4. Zod validate & strip trường lạ
    alt Dữ liệu không hợp lệ hoặc vượt Rate Limit
        Middleware-->>Client: 400 Bad Request hoặc 429 Too Many Requests
    else Dữ liệu hợp lệ
        Middleware->>Controller: Chuyển dữ liệu đã được validate
        Controller->>Service: Gọi tạo đơn hàng COD
        Note over Service: 1. Gộp productId trùng lặp<br/>2. Sắp xếp productId tăng dần (Tránh Deadlock)
        Service->>Prisma: Bắt đầu Transaction (ACID)
        loop Với từng sản phẩm
            Prisma->>DB: UPDATE Product SET stock = stock - qty WHERE id = ? AND isActive = true AND stock >= qty
            DB-->>Prisma: Kiểm tra số dòng cập nhật (count)
            alt count == 0 (Hết hàng hoặc bị ẩn)
                Prisma-->>Service: Throw OutOfStockError / Conflict
                Service-->>Controller: Rollback Transaction
                Controller-->>Client: 409 Conflict ("Sản phẩm X không đủ hàng hoặc ngừng bán")
            end
        end
        Service->>Prisma: Đọc giá/tên từ DB và INSERT INTO Order & OrderItem
        Prisma->>DB: Lưu đơn hàng
        DB-->>Prisma: Commit Transaction
        Prisma-->>Service: Thông tin đơn hàng (orderCode ngẫu nhiên)
        Service-->>Controller: Dữ liệu đơn hàng mới
        Controller-->>Client: 201 Created { success: true, data: { orderCode: "VE-..." } }
        Client-->>Khách: Hiển thị màn hình "Đặt hàng thành công"
    end
```

---

## 4. Danh sách API Endpoints Chi tiết

Mọi response trả về tuân thủ chuẩn cấu trúc thống nhất:
- Thành công: `{ "success": true, "data": ..., "message"?: string }`
- Thất bại: `{ "success": false, "message": string, "errors"?: Array<{ field: string, message: string }> }`

### 4.1. Xác thực & Người dùng (`/api/v1/auth`, `/api/v1/users`)
| Method | Đường dẫn | Quyền | Mô tả & Rate Limit | Dữ liệu đầu vào (Zod Schema) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Đăng ký tài khoản. Tự động gán role `CUSTOMER`, strip trường `role` nếu gửi kèm. | `email`, `password` (>= 8 ký tự), `fullName`, `phone` |
| `POST` | `/api/v1/auth/login` | Public | Đăng nhập (Rate limit: 5 req/15m theo cặp IP + email). Ghi JWT vào cookie httpOnly. | `email`, `password` |
| `POST` | `/api/v1/auth/logout` | Public | Đăng xuất, xóa cookie JWT | Không có |
| `GET` | `/api/v1/auth/me` | Authenticated | Lấy thông tin tài khoản đang đăng nhập | Không có |
| `PUT` | `/api/v1/users/profile` | Authenticated | Cập nhật thông tin cá nhân | `fullName`, `phone`, `province` (chọn từ 34 tỉnh/thành), `detailAddress` (số nhà, đường, phường/xã) |
| `GET` | `/api/v1/users/orders` | Authenticated | Lịch sử đơn hàng của tài khoản | Query: `page`, `limit` (max 50) |

### 4.2. Danh mục & Thương hiệu (`/api/v1/categories`, `/api/v1/brands`)
| Method | Đường dẫn | Quyền | Mô tả | Dữ liệu đầu vào |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/categories` | Public | Lấy cây danh mục đa cấp | Query: `isActive=true` |
| `GET` | `/api/v1/categories/:id` | Public | Xem chi tiết 1 danh mục theo ID hoặc Slug | Param: `id` |
| `POST` | `/api/v1/categories` | Admin | Tạo mới danh mục | `name`, `parentId` (tùy chọn), `image`, `sortOrder` |
| `PUT` | `/api/v1/categories/:id` | Admin | Cập nhật danh mục | `name`, `parentId`, `image`, `sortOrder`, `isActive` |
| `DELETE`| `/api/v1/categories/:id` | Admin | Xóa danh mục (chặn nếu còn sản phẩm) | Param: `id` |
| `GET` | `/api/v1/brands` | Public | Lấy danh sách thương hiệu | Không có |
| `POST` | `/api/v1/brands` | Admin | Thêm mới thương hiệu | `name`, `logoUrl`, `description` |
| `PUT` | `/api/v1/brands/:id` | Admin | Cập nhật thương hiệu | `name`, `logoUrl`, `description`, `isActive` |
| `DELETE`| `/api/v1/brands/:id` | Admin | Xóa thương hiệu (chặn nếu còn sản phẩm) | Param: `id` |

### 4.3. Sản phẩm (`/api/v1/products`)
| Method | Đường dẫn | Quyền | Mô tả | Dữ liệu đầu vào |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/products` | Public | Danh sách sản phẩm (tìm kiếm không dấu, lọc giá, hãng, sắp xếp giá/bán chạy). Giới hạn `limit` tối đa 50 (mặc định 12). | Query: `q`, `category`, `brand`, `minPrice`, `maxPrice`, `sort` (price_asc, price_desc, newest, best_seller), `page`, `limit` |
| `GET` | `/api/v1/products/:slugOrId`| Public | Chi tiết sản phẩm, specs, ảnh | Param: `slugOrId` |
| `POST` | `/api/v1/products` | Admin | Tạo mới sản phẩm (Tự động sinh `normalizedName` không dấu) | `name`, `sku`, `categoryId`, `brandId`, `originalPrice`, `salePrice`, `stock`, `specs`... |
| `PUT` | `/api/v1/products/:id` | Admin | Cập nhật sản phẩm | Tương tự POST |
| `DELETE`| `/api/v1/products/:id` | Admin | Xóa sản phẩm: Thử xóa cứng; nếu bắt lỗi vi phạm khóa ngoại Prisma do có đơn hàng thì chuyển sang ẩn `isActive=false`. Xóa cứng thành công thì xóa cả file ảnh trên storage. Trả `{ success: true, data: { isArchived }, message }` | Param: `id` |
| `POST` | `/api/v1/products/upload-image`| Admin | **Tải 1 ảnh duy nhất / request** (Tối đa 5MB, pixel < 16MP, re-encode sang WebP, hủy file gốc). Client gửi tối đa 3 request song song. | Multipart `file` (single) |

### 4.4. Đơn hàng & Tra cứu (`/api/v1/orders`)
| Method | Đường dẫn | Quyền | Mô tả & Rate Limit | Dữ liệu đầu vào (Zod Schema) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/orders` | Public / Auth | Đặt hàng COD (Rate limit: 20 req/15m/IP và 3 req/10m/SĐT). **Client chỉ gửi productId và quantity**. Server tự đọc giá, tên, tồn kho trong transaction. | `customerName`, `customerPhone`, `customerEmail`, `province` (chọn từ 34 tỉnh/thành), `detailAddress` (số nhà, đường, phường/xã), `note`, `items: [{ productId: string, quantity: number }]` |
| `POST` | `/api/v1/orders/lookup` | Public | Tra cứu đơn hàng bằng Mã đơn + SĐT (Rate limit: 10 req/1m). SĐT được chuẩn hóa trước khi so khớp. Dùng POST để không lộ thông tin trên URL/log. | `orderCode`, `phone` |
| `GET` | `/api/v1/admin/orders` | Admin | Danh sách đơn hàng toàn hệ thống | Query: `status`, `search`, `page`, `limit` (max 50) |
| `GET` | `/api/v1/admin/orders/:id` | Admin | Chi tiết một đơn hàng | Param: `id` |
| `PATCH` | `/api/v1/admin/orders/:id/status`| Admin | Chuyển trạng thái đơn hàng theo luồng hợp lệ. Hoàn kho chạy đúng 1 lần khi sang `CANCELLED`. Tăng `soldCount` khi sang `COMPLETED`. | `status`: `PROCESSING` / `SHIPPING` / `COMPLETED` / `CANCELLED` |

### 4.5. Khách hàng & Liên hệ (`/api/v1/contacts`, `/api/v1/admin/customers`)
| Method | Đường dẫn | Quyền | Mô tả & Rate Limit | Dữ liệu đầu vào |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/contacts` | Public | Gửi biểu mẫu liên hệ (Rate limit: 3 req/15m) | `fullName`, `phone`, `email`, `subject`, `message` |
| `GET` | `/api/v1/admin/contacts` | Admin | Danh sách tin nhắn liên hệ | Query: `status`, `page`, `limit` |
| `PATCH` | `/api/v1/admin/contacts/:id`| Admin | Cập nhật trạng thái `READ` / `REPLIED` | `status` |
| `GET` | `/api/v1/admin/customers` | Admin | Danh sách khách hàng đã đăng ký | Query: `search`, `page`, `limit` (max 50) |

---

## 5. Xác thực, Quản trị Đầu tiên & Kiến trúc Triển khai

### 5.1. Khởi tạo Admin Đầu tiên & Bảo mật Đăng ký
- **Admin đầu tiên**: Được khởi tạo tự động trong kịch bản `prisma/seed.ts`. Thông tin lấy trực tiếp từ biến môi trường:
  ```env
  ADMIN_EMAIL="admin@vietelectro.local"
  ADMIN_INITIAL_PASSWORD="YourStrongAdminPasswordHere#2026"
  ```
  Mật khẩu được băm bằng Argon2 trước khi lưu vào CSDL.
- **Bảo mật API Đăng ký**: Schema Zod cho đăng ký người dùng chỉ chấp nhận `email`, `password`, `fullName`, `phone`. Cấu hình `.strip()` tự động loại bỏ trường `role` nếu client cố tình truyền lên. Server luôn gán cứng `role: Role.CUSTOMER`.
- **Độ dài mật khẩu**: Bắt buộc tối thiểu 8 ký tự.

### 5.2. Quyết định Kiến trúc Triển khai & Cấu hình CORS Bắt Buộc

#### 1. Bản Chạy Thật (Production) - Lựa chọn chính thức: Dùng chung Tên miền gốc
- **Cấu hình**:
  - Tên miền riêng: `vietelectro.vn`.
  - Frontend: `https://vietelectro.vn` (hoặc `https://app.vietelectro.vn` trên Vercel).
  - Backend API: `https://api.vietelectro.vn` (trên Render).
- **Cấu hình Cookie**:
  ```typescript
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    domain: ".vietelectro.vn",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  ```
- **Cấu hình CORS nghiêm ngặt**:
  ```typescript
  app.use(cors({
    origin: process.env.CLIENT_URL, // Ví dụ: 'https://vietelectro.vn' (danh sách origin cụ thể)
    credentials: true               // Cho phép nhận cookie httpOnly
  }));
  ```
  > [!IMPORTANT]
  > **Ghi chú CORS bắt buộc**: Tuyệt đối **không dùng `origin: '*'`**. Trình duyệt sẽ từ chối gửi và nhận cookie khi có `credentials: true` nếu `origin` là `*`, đồng thời gây ra lỗ hổng bảo mật nghiêm trọng.

#### 2. Môi trường Dev / Test / Staging: Reverse Proxy qua Vercel Rewrites
- **Chỉ áp dụng khi dev/test chưa có tên miền riêng**:
  Cấu hình `client/vercel.json`:
  ```json
  {
    "rewrites": [
      {
        "source": "/api/:path*",
        "destination": "https://vietelectro-api.onrender.com/api/:path*"
      }
    ]
  }
  ```
  Client gọi `/api/v1/...` cùng origin với frontend. Cookie set `httpOnly: true`, `secure: true`, `sameSite: "lax"`, không cần set `domain`.

---

## 6. Xử lý Tải Ảnh An toàn (Chiến lược Đồng Nhất: 1 Ảnh / Request)

Để đảm bảo hiệu năng, chống tấn công tải tệp và loại bỏ hoàn toàn nguy cơ vượt trần payload (4.5MB của proxy) hoặc timeout:

### 6.1. Nguyên tắc Xử lý Upload Đồng Nhất Mọi Môi Trường
- **1 ảnh duy nhất / request**: API `POST /api/v1/products/upload-image` chỉ tiếp nhận đúng 1 tệp ảnh với dung lượng tối đa 5MB.
- **Client điều phối tối đa 3 request song song**: Phía giao diện React Admin, khi người dùng chọn tối đa 5 ảnh, client sử dụng hàng đợi giới hạn (`p-limit` hoặc chunking) gửi tối đa 3 request upload song song. Cách này mang lại các lợi ích vượt trội:
  - Giữ kích thước mỗi request luôn nhỏ hơn 5MB, an toàn tuyệt đối trên cả Dev (Vercel Proxy) lẫn Production.
  - Hiển thị thanh tiến trình (progress bar) và trạng thái thành công/thất bại chi tiết cho từng ảnh riêng lẻ.
  - Phân tải CPU/RAM cho server Node.js khi xử lý nén Sharp, tránh hiện tượng nghẽn luồng xử lý (event loop blocking) do phải giải nén đồng thời nhiều ảnh lớn.

```text
Client (Admin Portal)
  ├── Chọn 5 ảnh -> Hàng đợi upload tối đa 3 request song song (Mỗi req: 1 file <= 5MB)
       │
       ▼
Express API (POST /api/v1/products/upload-image)
  ├── Multer MemoryStorage: Lưu tạm 1 file trong RAM
  ├── Kiểm tra MIME type: image/jpeg, image/png, image/webp
  ├── Sharp phân tích metadata: width <= 4096, height <= 4096, totalPixels <= 16,000,000
  ├── Tước bỏ 100% EXIF Metadata nguy hiểm
  ├── Luôn MÃ HÓA LẠI (Re-encode) thành chuẩn WebP chất lượng 80%
  │      ├── Bản tiêu chuẩn (standard): width tối đa 800px
  │      └── Bản thumbnail: width tối đa 300px
  ├── Sinh tên ngẫu nhiên: `${crypto.randomUUID()}.webp`
  ├── Lưu vào thư mục tạm (uploads/temp/) và HỦY NGAY file gốc trong RAM
       │
       ▼
Trả về: { success: true, data: { tempStandardUrl, tempThumbUrl } }
```

### 6.2. Cơ Chế Xử Lý Ảnh Mồ Côi (Khu Vực Lưu Trữ Tạm & Tác Vụ Dọn Rác 24 Giờ)
Để giải quyết triệt để tình trạng "ảnh mồ côi" (Admin upload ảnh lên nhưng sau đó hủy form hoặc đóng trình duyệt mà không lưu sản phẩm):
1. **Lưu trữ vào khu tạm (`uploads/temp/`)**: Khi upload qua API, ảnh WebP được lưu tại `server/uploads/temp/`.
2. **Commit ảnh khi lưu sản phẩm**: Khi Admin bấm "Lưu sản phẩm" (`POST /api/v1/products` hoặc `PUT /api/v1/products/:id`), server sẽ chuyển (move) các file ảnh tương ứng từ `uploads/temp/` sang thư mục chính thức `uploads/products/` và lưu URL chính thức vào bảng `ProductImage`.
3. **Tác vụ dọn rác định kỳ (Cron Job 24 Giờ)**:
   - Hệ thống thiết lập một tác vụ định kỳ chạy mỗi ngày (ví dụ vào lúc 02:00 sáng).
   - Tác vụ quét toàn bộ thư mục `uploads/temp/`, kiểm tra thời gian sửa đổi (`mtime`) của từng file.
   - Mọi tệp ảnh tạm tồn tại **quá 24 giờ** mà không được commit sang sản phẩm chính thức sẽ bị xóa sạch khỏi đĩa cứng / storage, đảm bảo không gây lãng phí dung lượng lưu trữ.

---

## 7. Nghiệp vụ Đơn hàng, Quản lý Tồn kho & Xóa Sản phẩm

### 7.1. Nguyên tắc Xử lý API Tạo Đơn hàng
1. **Client chỉ gửi `productId` và `quantity`**. Tuyệt đối không gửi giá, tên hay tổng tiền.
2. **Gộp dòng trùng**: Tự động gộp các item cùng `productId` với `quantity = sum(quantity)`.
3. **Sắp xếp theo `productId` tăng dần (Deadlock Prevention)**: Đảm bảo mọi transaction luôn xin khóa dòng theo cùng một trật tự từ điển duy nhất.
4. **Kiểm tra trạng thái mở bán**: Chỉ chấp nhận sản phẩm có `isActive = true`.

### 7.2. Đoạn Mã Chuẩn Triển khai trong OrderService

```typescript
import { prisma } from "../config/db";
import { AppError } from "../utils/AppError";
import { generateOrderCode } from "../utils/orderCode";
import { normalizePhone } from "../utils/phone";

interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

interface CreateOrderInput {
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  province: string;
  detailAddress: string;
  note?: string;
  items: CreateOrderItemInput[];
}

export async function createOrderService(input: CreateOrderInput) {
  const { customerName, customerPhone, customerEmail, province, detailAddress, note, items, userId } = input;

  const cleanPhone = normalizePhone(customerPhone);
  const fullAddress = `${detailAddress}, ${province}`;

  const itemMap = new Map<string, number>();
  for (const item of items) {
    if (item.quantity <= 0) throw new AppError("Số lượng sản phẩm phải lớn hơn 0", 400);
    itemMap.set(item.productId, (itemMap.get(item.productId) || 0) + item.quantity);
  }

  const sortedProductIds = Array.from(itemMap.keys()).sort();
  const sortedItems = sortedProductIds.map(id => ({ productId: id, quantity: itemMap.get(id)! }));

  return await prisma.$transaction(async (tx) => {
    const orderItemsData: Array<{
      productId: string;
      productName: string;
      productThumbnail: string | null;
      price: number;
      quantity: number;
      total: number;
    }> = [];

    let totalAmount = 0;

    for (const item of sortedItems) {
      const updateResult = await tx.product.updateMany({
        where: {
          id: item.productId,
          isActive: true,
          stock: { gte: item.quantity }
        },
        data: {
          stock: { decrement: item.quantity }
        }
      });

      if (updateResult.count === 0) {
        const currentProd = await tx.product.findUnique({
          where: { id: item.productId },
          select: { name: true, stock: true, isActive: true }
        });
        if (!currentProd || !currentProd.isActive) {
          throw new AppError(`Sản phẩm không tồn tại hoặc đã ngừng kinh doanh`, 409);
        }
        throw new AppError(
          `Sản phẩm "${currentProd.name}" không đủ số lượng trong kho (còn ${currentProd.stock})`,
          409
        );
      }

      const product = await tx.product.findUniqueOrThrow({
        where: { id: item.productId },
        select: { id: true, name: true, salePrice: true, thumbnail: true }
      });

      const lineTotal = product.salePrice * item.quantity;
      totalAmount += lineTotal;

      orderItemsData.push({
        productId: product.id,
        productName: product.name,
        productThumbnail: product.thumbnail,
        price: product.salePrice,
        quantity: item.quantity,
        total: lineTotal
      });
    }

    let orderCode = "";
    let isUnique = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      const candidate = generateOrderCode();
      const existing = await tx.order.findUnique({ where: { orderCode: candidate } });
      if (!existing) {
        orderCode = candidate;
        isUnique = true;
        break;
      }
    }
    if (!isUnique) throw new AppError("Không thể tạo mã đơn hàng, vui lòng thử lại", 500);

    const shippingFee = 0;
    const finalAmount = totalAmount + shippingFee;

    return await tx.order.create({
      data: {
        orderCode,
        userId: userId || null,
        customerName,
        customerPhone: cleanPhone,
        customerEmail: customerEmail || null,
        province,
        detailAddress,
        shippingAddress: fullAddress,
        note: note || null,
        paymentMethod: "COD",
        totalAmount,
        shippingFee,
        finalAmount,
        status: "PENDING",
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: true
      }
    });
  });
}
```

### 7.3. Bảng Chuyển Trạng Thái Đơn Hàng Hợp Lệ

| Trạng thái hiện tại | Trạng thái tiếp theo cho phép | Nghiệp vụ đi kèm & Quản lý Kho |
| :--- | :--- | :--- |
| **`PENDING`** (Đơn mới) | `PROCESSING` hoặc `CANCELLED` | Nếu chuyển sang `CANCELLED`: Hoàn trả tồn kho. |
| **`PROCESSING`** (Đang xử lý) | `SHIPPING` hoặc `CANCELLED` | Nếu chuyển sang `CANCELLED`: Hoàn trả tồn kho. |
| **`SHIPPING`** (Đang giao hàng) | `COMPLETED` hoặc `CANCELLED` | Nếu sang `COMPLETED`: Tăng `soldCount`. Nếu sang `CANCELLED`: Hoàn trả tồn kho. |
| **`COMPLETED`** (Hoàn tất) | *(Không được phép chuyển)* | Trạng thái kết thúc thành công (Terminal State). Khóa cứng. |
| **`CANCELLED`** (Đã hủy) | *(Không được phép chuyển)* | Trạng thái kết thúc hủy (Terminal State). Không cho phép khôi phục. |

### 7.4. Cơ Chế Hoàn Tồn Kho Khi Hủy Đơn (Đúng Một Lần Duy Nhất)
```typescript
export async function cancelOrderService(orderId: string) {
  return await prisma.$transaction(async (tx) => {
    const updateResult = await tx.order.updateMany({
      where: {
        id: orderId,
        status: { in: ["PENDING", "PROCESSING", "SHIPPING"] }
      },
      data: {
        status: "CANCELLED"
      }
    });

    if (updateResult.count === 0) {
      throw new AppError("Đơn hàng không ở trạng thái hợp lệ để hủy hoặc đã bị hủy trước đó", 400);
    }

    const items = await tx.orderItem.findMany({
      where: { orderId }
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { increment: item.quantity }
        }
      });
    }

    return { success: true, message: "Đơn hàng đã được hủy và hoàn trả tồn kho thành công" };
  });
}
```

### 7.5. Xử Lý Xóa Sản Phẩm, Dọn Ảnh Storage & Bắt Lỗi Khóa Ngoại Thực Tế

#### Các Nguyên Tắc Kỹ Thuật Cốt Lõi:
1. **Hai thao tác CSDL độc lập, KHÔNG nằm chung Transaction**:
   Trong PostgreSQL, khi một câu lệnh gặp lỗi vi phạm ràng buộc (như khóa ngoại `Restrict`), toàn bộ transaction sẽ rơi vào trạng thái hủy (`current transaction is aborted, commands ignored until end of transaction block`). Bất kỳ câu lệnh tiếp theo nào trong transaction đó (kể cả câu lệnh `UPDATE` để ẩn sản phẩm) đều sẽ bị PostgreSQL từ chối thực thi. Do đó, **thao tác xóa cứng và thao tác fallback chuyển sang ẩn BẮT BUỘC phải là hai thao tác CSDL độc lập, tuyệt đối không bọc chung trong một `prisma.$transaction`**.
2. **Kiểm thử tích hợp trên PostgreSQL thật là Nguồn Sự Thật (Source of Truth)**:
   Không phỏng đoán mã lỗi. Xây dựng bài test tích hợp trên CSDL PostgreSQL thật để xác nhận chính xác mã lỗi ném ra từ Prisma Client khi xóa sản phẩm đã có `OrderItem` (onDelete: Restrict) - mã lỗi `P2003` - và xử lý chính xác theo mã nhận được.
3. **Xóa file storage chỉ sau khi DB đã xóa xong; lỗi xóa file chỉ ghi log**:
   Chỉ khi thao tác xóa cứng bản ghi trong CSDL đã hoàn tất thành công, hệ thống mới tiến hành xóa các file ảnh vật lý trên storage (thư mục cục bộ hoặc Object Storage). Nếu thao tác xóa file vật lý gặp trục trặc (lỗi mạng, file không tồn tại), **chỉ ghi log lỗi (`logger.error`) chứ tuyệt đối không ném lỗi (không throw error)** để không làm gián đoạn phản hồi thành công trả về cho client.
4. **Cấu trúc Response Chuẩn**:
   Luôn trả về định dạng chuẩn `{ success: true, data: { isArchived }, message }`.

```typescript
import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { deleteStorageFiles } from "../utils/storage";
import { logger } from "../utils/logger";

export async function deleteProductService(productId: string) {
  // 1. Đọc trước danh sách URL ảnh để chuẩn bị xóa file storage nếu xóa DB thành công
  const images = await prisma.productImage.findMany({
    where: { productId },
    select: { url: true }
  });

  try {
    // 2. Thao tác ĐỘC LẬP 1: Thử xóa cứng sản phẩm trực tiếp (KHÔNG nằm chung transaction với fallback)
    await prisma.product.delete({
      where: { id: productId }
    });

    // 3. Xóa DB thành công -> Tiến hành dọn dẹp các tệp ảnh vật lý trên storage
    if (images.length > 0) {
      try {
        await deleteStorageFiles(images.map(img => img.url));
      } catch (fileErr) {
        // Lỗi xóa file storage chỉ ghi log cảnh báo, không throw error làm gián đoạn response thành công
        logger.error(`Lỗi dọn tệp ảnh storage cho sản phẩm ${productId}:`, fileErr);
      }
    }

    return {
      success: true,
      data: { isArchived: false },
      message: "Đã xóa vĩnh viễn sản phẩm và dọn dẹp các tệp ảnh liên quan thành công."
    };
  } catch (error) {
    // 4. Bắt lỗi vi phạm ràng buộc khóa ngoại (Xác nhận từ integration test Postgres thật là nguồn sự thật)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
      // Thao tác ĐỘC LẬP 2: Fallback cập nhật sản phẩm sang trạng thái Ẩn
      await prisma.product.update({
        where: { id: productId },
        data: { isActive: false }
      });

      return {
        success: true,
        data: { isArchived: true },
        message: "Sản phẩm đã có đơn hàng trong quá khứ nên không thể xóa vĩnh viễn; hệ thống đã tự động chuyển sang trạng thái Ẩn."
      };
    }

    throw error;
  }
}
```

---

## 8. Rate Limiting, Trust Proxy & Chuẩn Hóa Dữ Liệu

### 8.1. Cấu hình Trust Proxy, Startup Validation & Kiểm Chứng Thực Nghiệm

#### 1. Kiểm Tra Khởi Động Bắt Buộc (Fail-Fast Startup Validation)
Ứng dụng Express **bắt buộc phải từ chối khởi động (`process.exit(1)`)** nếu biến môi trường `TRUST_PROXY_HOPS` không tồn tại hoặc không phải là một số nguyên dương hợp lệ ($\ge 1$). Điều này ngăn chặn việc ứng dụng khởi động với cấu hình proxy ngầm định sai lệch, gây tê liệt hệ thống rate limit hoặc mở toang lỗ hổng IP spoofing:

```typescript
// server/src/config/env.ts hoặc entrypoint server/src/app.ts:
const rawHops = process.env.TRUST_PROXY_HOPS;
if (!rawHops || !/^\d+$/.test(rawHops) || parseInt(rawHops, 10) < 1) {
  console.error("FATAL: TRUST_PROXY_HOPS bắt buộc phải là một số nguyên dương hợp lệ (>= 1). Ứng dụng từ chối khởi động!");
  process.exit(1);
}

const trustProxyHops = parseInt(rawHops, 10);
app.set("trust proxy", trustProxyHops);
```

#### 2. Giả Thuyết Kiến Trúc Về Số Hops & Kiểm Chứng Thực Nghiệm Trên Staging Thật:
Các số hop dưới đây là **giả thuyết kỹ thuật ban đầu, BẮT BUỘC phải được kiểm chứng thực nghiệm trên môi trường Staging thật**:

- **Phương án A (Production - Trực tiếp từ Client tới Render qua custom domain `api.vietelectro.vn`)**:
  - *Mô hình giả định*: `Client -> Render Load Balancer / Edge Proxy -> Node.js Express Container`.
  - *Giả thuyết số hop*: **1 hop** (`TRUST_PROXY_HOPS=1`).
- **Phương án B (Dev / Test / Staging - Đi qua Vercel Rewrites Proxy)**:
  - *Mô hình giả định*: `Client -> Vercel Edge Proxy (Hop 1) -> Render Load Balancer (Hop 2) -> Node.js Express`.
  - *Giả thuyết số hop*: **2 hops** (`TRUST_PROXY_HOPS=2`).

> [!IMPORTANT]
> **Quy tắc cộng thêm hop khi có Cloudflare / CDN phía trước**:
> Nếu trong tương lai có thêm Cloudflare hoặc bất kỳ mạng phân phối nội dung (CDN/WAF) nào đặt phía trước hệ thống (ví dụ: `Client -> Cloudflare -> Render` hoặc `Client -> Cloudflare -> Vercel -> Render`), mỗi tầng proxy trung gian hợp lệ sẽ nối thêm một IP vào chuỗi forwarding. Khi đó, **số hop bắt buộc phải cộng thêm hop tương ứng** (ví dụ: Cloudflare + Render = 1 + 1 = 2 hops; Cloudflare + Vercel + Render = 1 + 1 + 1 = 3 hops).

#### 3. Quy Trình Kiểm Chứng Số Hops Trên Staging Thật Bằng Endpoint Debug:
1. Triển khai code lên staging với endpoint `GET /api/v1/debug/ip` (chỉ bật khi `process.env.NODE_ENV !== "production"`).
2. Dùng `curl` hoặc Postman gửi request kèm header `X-Forwarded-For` giả mạo một IP tùy ý:
   ```bash
   curl -H "X-Forwarded-For: 203.0.113.195" https://staging.vietelectro.vn/api/v1/debug/ip
   ```
3. So sánh trường `detectedIp` trong kết quả trả về:
   - Nếu `detectedIp` trả về đúng IP mạng công cộng thật của máy tester (không phải `203.0.113.195` và không phải IP nội bộ của Vercel/Render proxy) $\rightarrow$ Cấu hình số hop đã chính xác.
   - Nếu `detectedIp` bằng `203.0.113.195` $\rightarrow$ Đang tin quá sâu (Over-trusting, số hops quá cao).
   - Nếu `detectedIp` là dải IP của Vercel/Render $\rightarrow$ Đang tin quá nông (Under-trusting, số hops quá thấp).

#### 4. Rủi Ro Kỹ Thuật Khi Cấu Hình Sai Số Hops:
- **Cấu hình số hops quá cao (Over-trusting)**:
  Nếu đặt số hop lớn hơn số proxy thực tế, Express sẽ tin tưởng các IP do client tự ý chèn vào header `X-Forwarded-For`. Kẻ tấn công có thể gửi `X-Forwarded-For: 1.2.3.4, ...` giả mạo để dễ dàng né tránh Rate Limit hoặc giả mạo IP vị trí.
- **Cấu hình số hops quá thấp (Under-trusting)**:
  Nếu đặt số hop nhỏ hơn số proxy thực tế (như đặt 1 khi đi qua cả Vercel và Render), Express sẽ lấy chính IP của Vercel Edge Proxy làm `req.ip`. Khi đó **toàn bộ người dùng trên thế giới bị xem là dùng chung một địa chỉ IP duy nhất**, dẫn đến việc chỉ 1 người chạm ngưỡng rate limit sẽ làm cho toàn bộ khách hàng khác bị khóa chéo hàng loạt.

#### 5. Endpoint Debug Kiểm Tra IP & Bảo Mật Production:
- Endpoint `GET /api/v1/debug/ip` trả về `{ detectedIp: req.ip, rawForwardedFor: req.headers["x-forwarded-for"], trustProxyHops }`.
- **Quy tắc bảo mật**: Chỉ đăng ký router này khi `process.env.NODE_ENV !== "production"`.
- **Kiểm thử tự động bắt buộc**: Có bài test integration xác nhận rằng khi chạy ở môi trường `NODE_ENV === "production"`, truy cập `GET /api/v1/debug/ip` **bắt buộc phải trả về mã `404 Not Found`**.

### 8.2. Cấu hình Rate Limiting Chi Tiết
Sử dụng middleware `express-rate-limit`:
1. **Đăng nhập (`POST /api/v1/auth/login`)**:
   - Giới hạn theo **cặp IP + Email**: Tối đa **5 lần thử sai / 15 phút** cho mỗi cặp `${clientIp}_${email.toLowerCase()}`. Tránh khóa oan người dùng khác trên cùng mạng Wi-Fi/NAT văn phòng khi có 1 người quên mật khẩu.
   - Giữ thêm 1 rate limit trần theo IP: tối đa 30 requests / 15 phút / IP để chống brute force diện rộng.
2. **Đặt hàng COD (`POST /api/v1/orders`)**:
   - Nới lỏng theo IP: Tối đa **20 đơn / 15 phút / IP** (phù hợp với văn phòng, tòa nhà dùng chung IP mạng).
   - Kiểm soát theo Số điện thoại: Tối đa **3 đơn / 10 phút** cho cùng một số điện thoại đặt hàng.
3. **Tra cứu đơn hàng (`POST /api/v1/orders/lookup`)**:
   - Tối đa **10 requests / 1 phút / IP**.
4. **Gửi liên hệ (`POST /api/v1/contacts`)**:
   - Tối đa **3 requests / 15 phút / IP**.

### 8.3. Chuẩn Hóa Số Điện Thoại & Mã Đơn Crypto
- Hàm `normalizePhone`: Xóa ký tự cách, dấu gạch ngang, đổi `+84` hoặc `84` thành `0`.
- Mã đơn hàng: Sinh từ `crypto.randomBytes(4).toString("hex").toUpperCase()` $\rightarrow$ kết quả dạng `VE-9K2M4P7X` (tối thiểu 8 ký tự alphanumeric ngẫu nhiên).
- Phân trang: Áp dụng `limit = Math.min(Math.max(1, Number(req.query.limit) || 12), 50)`.

---

## 9. Giải pháp Tìm Kiếm Sản Phẩm Không Dấu Tiếng Việt

### 9.1. Hàm Chuẩn Hóa Tiếng Việt Bỏ Dấu (`removeVietnameseTones`)
Hàm chuẩn hóa Unicode NFD, bóc tách dấu thanh và **bắt buộc xử lý riêng biệt các ký tự `đ`/`Đ` thành `d`**:

```typescript
export function removeVietnameseTones(str: string): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Xóa các ký tự dấu tổ hợp
    .replace(/[đĐ]/g, "d")           // Xử lý riêng biệt đ/Đ thành d
    .toLowerCase()
    .trim();
}
```

### 9.2. Bộ Test Cases Xác Thực
| Đầu vào gốc | Kết quả sau khi chuẩn hóa | Test Case tìm kiếm thực tế |
| :--- | :--- | :--- |
| `"Điều hòa"` | `"dieu hoa"` | Khách gõ `"dieu hoa"`, `"đieu hoa"`, `"Điều Hoà"` đều khớp. |
| `"Tủ đông"` | `"tu dong"` | Khách gõ `"tu dong"`, `"tủ đông"` đều khớp. |
| `"Máy giặt"` | `"may giat"` | Khách gõ `"may giat"`, `"máy giặt"` đều khớp. |

### 9.3. Ghi Chú Kỹ Thuật về Chỉ Mục (Index) & Định Hướng Nâng Cấp
- **Hiện trạng ở phiên bản 1 (v1)**:
  - Cột `normalizedName` được đánh chỉ mục B-Tree thông thường (`@@index([normalizedName])`).
  - **Lưu ý kỹ thuật**: Chỉ mục B-Tree chỉ tối ưu cho các truy vấn khớp chính xác hoặc tìm kiếm tiền tố (`LIKE 'dieu hoa%'`), **không tăng tốc được cho truy vấn chứa từ khóa bất kỳ (`LIKE '%dieu hoa%'` / Prisma `contains`)** dẫn đến việc PostgreSQL sẽ thực hiện Sequential Scan (quét tuần tự toàn bảng).
  - **Đánh giá hiệu năng v1**: Với quy mô dữ liệu của website bán lẻ điện máy ở giai đoạn đầu (< vài nghìn sản phẩm), một truy vấn Sequential Scan trên PostgreSQL chỉ tốn **dưới 5 - 10 mili-giây**, hoàn toàn đáp ứng tốt thời gian phản hồi cho người dùng di động mà không cần thêm phụ thuộc phức tạp.
- **Định hướng mở rộng (v2)**:
  - Khi danh mục sản phẩm vượt quá 50,000 mặt hàng, hệ thống sẽ kích hoạt extension **`pg_trgm`** trong PostgreSQL và tạo chỉ mục GIN:
    ```sql
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE INDEX idx_product_normalized_name_trgm ON "Product" USING gin ("normalizedName" gin_trgm_ops);
    ```
    Chỉ mục GIN Trigram sẽ tối ưu hóa tốc độ truy vấn `LIKE '%...%'` và hỗ trợ tìm kiếm mờ (fuzzy search, chống gõ sai chính tả).
