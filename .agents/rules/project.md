---
trigger: always_on
---

## Công nghệ
- Frontend: React (Vite) + TypeScript, thư mục client/.
- Backend: Node.js + Express + TypeScript, thư mục server/.
- Database: PostgreSQL, dùng Prisma làm ORM, có migration.
- Xác thực: JWT lưu trong cookie httpOnly; mật khẩu băm bằng bcrypt hoặc argon2.
- Kiểm tra dữ liệu đầu vào ở server bằng zod. Không tin dữ liệu từ client.
- Test: Vitest cho unit test, Supertest cho API, Playwright cho giao diện.
- Styling: CSS Modules + CSS Variables (design tokens), không dùng Tailwind.

## Giao tiếp
- Trả lời tôi bằng tiếng Việt, ngắn gọn, đi thẳng vào kỹ thuật. Tôi đọc được React và Node.
- Khi đề xuất thay đổi kiến trúc, nêu rõ phương án thay thế và đánh đổi.
- Giao diện web hiển thị bằng tiếng Việt, ưu tiên điện thoại (mobile-first).