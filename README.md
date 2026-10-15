# VietElectro - Nền Tảng Thương Mại Điện Tử Điện Máy

Dự án monorepo thương mại điện tử chuyên ngành điện máy, điện tử và gia dụng tại Việt Nam (Mobile-First).

## Cấu trúc Dự án

- `client/`: Giao diện khách hàng và quản trị viên xây dựng bằng React 18 (Vite), TypeScript, CSS Modules và Design Tokens.
- `server/`: API backend xây dựng bằng Node.js, Express, TypeScript, Zod validation, Vitest và Supertest.
- `tests/e2e/`: Bộ kiểm thử giao diện đầu cuối (E2E) sử dụng Playwright.
- `.github/workflows/ci.yml`: Pipeline CI tự động kiểm tra Lint, Typecheck và Test khi push hoặc mở PR vào nhánh `main`.

---

## Yêu cầu Môi trường

- **Node.js**: `>= 20.x`
- **npm**: `>= 10.x`

---

## Hướng dẫn Cài đặt & Khởi chạy

### 1. Cài đặt Dependencies

Tại thư mục gốc của dự án, chạy lệnh:

```bash
npm install
```

Lệnh này sẽ tự động cài đặt toàn bộ gói phụ thuộc cho cả `client`, `server` và công cụ E2E test Playwright thông qua cơ chế npm workspaces.

### 2. Cấu hình Biến Môi trường

Sao chép file mẫu biến môi trường tại thư mục server:

```bash
cp server/.env.example server/.env
```

Các biến môi trường cơ bản:
- `PORT`: Cổng máy chủ backend (mặc định: `5000`).
- `NODE_ENV`: Môi trường thực thi (`development` | `production` | `test`).
- `TRUST_PROXY_HOPS`: Số hop reverse proxy (Bắt buộc $\ge 0$; môi trường local dev đặt `0`, production/staging đặt $\ge 1$).

### 3. Khởi chạy Môi trường Phát triển (Development)

Chạy đồng thời hoặc độc lập:

```bash
# Chạy Frontend client (http://localhost:5173)
npm run dev:client

# Chạy Backend server (http://localhost:5000)
npm run dev:server
```

---

## Kiểm thử & Chất lượng Mã nguồn

| Lệnh | Mô tả |
| :--- | :--- |
| `npm run lint` | Chạy ESLint kiểm tra cú pháp và quy chuẩn code cho cả `client` và `server`. |
| `npm run typecheck` (hoặc `npm run tsc`) | Kiểm tra kiểu dữ liệu TypeScript (`tsc --noEmit`) cho cả `client` và `server`. |
| `npm run test` | Chạy bộ kiểm thử tự động API (Vitest + Supertest) trên `server`. |
| `npm run test:e2e` | Chạy bộ kiểm thử E2E Playwright trên trình duyệt. |
| `npm run build` | Biên dịch TypeScript và đóng gói production cho cả `client` và `server`. |
