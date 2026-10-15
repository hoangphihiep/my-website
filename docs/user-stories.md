# TÀI LIỆU USER STORIES & TIÊU CHÍ NGHIỆM THU

## Dự án: Website Điện Máy VietElectro

Tất cả tiêu chí nghiệm thu (Acceptance Criteria) được chuẩn hóa theo định dạng: **"Khi... thì..."**.

---

## PHẦN 1: KHÁCH HÀNG (CUSTOMER / GUEST)

### US01: Xem Trang chủ và Điều hướng Danh mục

- **Là**: Khách mua hàng.
- **Tôi muốn**: Truy cập trang chủ, xem banner khuyến mãi, thanh điều hướng danh mục nhiều cấp và các khối ngành hàng điện máy.
- **Để**: Dễ dàng tìm được nhóm thiết bị tôi có nhu cầu mua sắm.
- **Tiêu chí nghiệm thu**:
  - _AC01.1_: **Khi** người dùng mở trang chủ trên điện thoại hoặc máy tính, **thì** hệ thống hiển thị topbar có hotline, ô tìm kiếm, giỏ hàng, banner khuyến mãi và danh sách khối sản phẩm theo từng ngành hàng (Tivi, Tủ lạnh, Máy giặt, Điều hòa...).
  - _AC01.2_: **Khi** người dùng bấm vào một danh mục cha (ví dụ: Điện lạnh), **thì** hệ thống xổ ra danh mục con tương ứng (Tủ lạnh, Tủ đông...) hoặc chuyển hướng đến trang danh mục đó.
  - _AC01.3_: **Khi** bấm vào logo website ở bất kỳ trang nào, **thì** hệ thống chuyển hướng người dùng quay lại trang chủ.

---

### US02: Tìm kiếm, Lọc, Sắp xếp và Phân trang Sản phẩm

- **Là**: Khách mua hàng.
- **Tôi muốn**: Tìm kiếm theo tên sản phẩm, lọc theo thương hiệu, mức giá, sắp xếp theo giá và xem danh sách phân trang.
- **Để**: Nhanh chóng chọn lọc được thiết bị phù hợp với ngân sách và thương hiệu yêu thích.
- **Tiêu chí nghiệm thu**:
  - _AC02.1_: **Khi** người dùng nhập từ khóa vào ô tìm kiếm và ấn Enter/Tìm kiếm, **thì** hệ thống trả về danh sách sản phẩm có tên hoặc mô tả chứa từ khóa đó.
  - _AC02.2_: **Khi** người dùng chọn lọc theo một hoặc nhiều thương hiệu (ví dụ: Samsung, LG), **thì** danh sách chỉ hiển thị các sản phẩm thuộc các thương hiệu đã chọn.
  - _AC02.3_: **Khi** người dùng chọn khoảng giá (ví dụ: Từ 5.000.000đ đến 10.000.000đ), **thì** hệ thống cập nhật danh sách các sản phẩm có giá bán nằm trong khoảng này.
  - _AC02.4_: **Khi** người dùng chọn sắp xếp "Giá tăng dần" hoặc "Giá giảm dần", **thì** danh sách lập tức sắp xếp lại thứ tự tương ứng.
  - _AC02.5_: **Khi** danh mục có nhiều hơn 12 sản phẩm, **thì** hệ thống hiển thị thanh phân trang rõ ràng và khi chuyển trang thì URL cập nhật số trang tương ứng (query `?page=X`).

---

### US03: Xem Chi tiết Sản phẩm & Thông số Kỹ thuật

- **Là**: Khách mua hàng.
- **Tôi muốn**: Xem đầy đủ hình ảnh, giá niêm yết, giá bán, tình trạng còn hàng và bảng thông số kỹ thuật chi tiết của sản phẩm.
- **Để**: Đánh giá chi tiết công năng thiết bị trước khi quyết định mua.
- **Tiêu chí nghiệm thu**:
  - _AC03.1_: **Khi** người dùng bấm vào một sản phẩm từ danh sách, **thì** hệ thống chuyển đến trang chi tiết sản phẩm hiển thị: Tên đầy đủ, Mã SKU, Giá gốc, Giá bán, Tỷ lệ giảm giá, và Nhãn "Còn hàng" hoặc "Hết hàng".
  - _AC03.2_: **Khi** người dùng bấm vào các ảnh thu nhỏ (thumbnails), **thì** ảnh phóng to chính chuyển đổi tương ứng ngay lập tức.
  - _AC03.3_: **Khi** sản phẩm có số lượng tồn kho bằng 0, **thì** hệ thống hiển thị trạng thái "Hết hàng" và vô hiệu hóa nút "Thêm vào giỏ" / "Mua ngay".
  - _AC03.4_: **Khi** cuộn xuống phần thông số kỹ thuật, **thì** hệ thống hiển thị bảng thông số được phân theo từng nhóm (Ví dụ: Tổng quan, Công nghệ hình ảnh/âm thanh, Kích thước - Khối lượng).

---

### US04: Quản lý Giỏ hàng

- **Là**: Khách mua hàng.
- **Tôi muốn**: Thêm sản phẩm vào giỏ, điều chỉnh số lượng hoặc xóa bỏ sản phẩm.
- **Để**: Chuẩn bị danh sách hàng hóa trước khi thanh toán.
- **Tiêu chí nghiệm thu**:
  - _AC04.1_: **Khi** người dùng bấm nút "Thêm vào giỏ hàng" ở sản phẩm còn hàng, **thì** số lượng trên biểu tượng giỏ hàng ở thanh tiêu đề tăng lên và hiển thị thông báo thành công.
  - _AC04.2_: **Khi** người dùng mở giỏ hàng và tăng số lượng vượt quá số lượng tồn kho của sản phẩm, **thì** hệ thống chặn lại và thông báo: "Số lượng yêu cầu vượt quá số lượng hiện có trong kho".
  - _AC04.3_: **Khi** người dùng bấm nút "Xóa" một sản phẩm khỏi giỏ, **thì** sản phẩm đó bị gỡ bỏ và tổng tiền giỏ hàng được tính toán lại ngay lập tức.
  - _AC04.4_: **Khi** người dùng đóng trình duyệt rồi mở lại, **thì** giỏ hàng vẫn giữ nguyên các mặt hàng trước đó (lưu trạng thái vào LocalStorage/Cookie).

---

### US05: Đặt hàng Thanh toán khi nhận hàng (COD)

- **Là**: Khách mua hàng (vãng lai hoặc đã đăng nhập).
- **Tôi muốn**: Điền thông tin giao hàng và chọn phương thức thanh toán COD để hoàn tất đơn hàng.
- **Để**: Nhận hàng tận nhà rồi mới trả tiền mặt, đảm bảo an tâm.
- **Tiêu chí nghiệm thu**:
  - _AC05.1_: **Khi** người dùng điền form đặt hàng, **thì** hệ thống kiểm tra qua Zod: bắt buộc Họ tên (tối đa 100 ký tự), SĐT (hợp lệ sau khi chuẩn hóa qua `normalizePhone`), Email hợp lệ (tối đa 100 ký tự), Tỉnh/Thành phố (bắt buộc thuộc danh sách 34 đơn vị hành chính cấp tỉnh được server lưu giữ và test đối chiếu trùng khớp `provinces.ts`), Địa chỉ chi tiết (5 - 200 ký tự: số nhà, tên đường, phường/xã), Ghi chú (tối đa 500 ký tự); `items` có từ 1 đến 20 loại mặt hàng, mỗi mặt hàng có `quantity` là số nguyên từ 1 đến 10, `productId` đúng định dạng UUID. Mọi trường `userId`, giá tiền gửi từ body đều bị server bỏ qua; `userId` chỉ được gán nếu khách hàng đã đăng nhập (qua middleware `optionalAuth`). Tổng tiền đơn hàng không vượt quá 2 tỷ VNĐ (chống tràn số Int32).
  - _AC05.2_: **Khi** người dùng nhập số điện thoại không đúng định dạng Việt Nam (10 chữ số, đầu số hợp lệ), **thì** hệ thống báo lỗi "Số điện thoại không hợp lệ". Số điện thoại hợp lệ sẽ được tự động chuẩn hóa (loại bỏ dấu cách, chuyển +84 thành 0) trước khi lưu.
  - _AC05.3_: **Khi** đặt hàng thành công, **thì** hệ thống hiển thị trang cảm ơn kèm **Mã đơn hàng duy nhất** sinh từ nguồn crypto ngẫu nhiên (Ví dụ: `VE-9K2M4P7X`) với ràng buộc `UNIQUE` trên DB là chốt chặn thực tế (không cần findUnique kiểm tra trước; hệ thống tự động retry ngoài transaction tối đa 3 lần nếu xảy ra lỗi P2002 với meta.target chứa orderCode), đồng thời tự động xóa sạch giỏ hàng hiện tại.
  - _AC05.4_: **Khi** đơn hàng được tạo, **thì** hệ thống gộp các dòng trùng `productId` và kiểm tra tổng `quantity` cho mỗi sản phẩm sau khi gộp phải $\le 10$ (nếu vượt quá 10 lập tức trả lỗi 400 Bad Request); sắp xếp theo `productId` tăng dần trước khi mở transaction trừ kho nguyên tử để tránh deadlock; từ chối đặt hàng nếu sản phẩm đã bị ẩn (`isActive = false`) hoặc tồn kho không đủ.

---

### US06: Tra cứu Đơn hàng bằng Mã đơn + Số điện thoại

- **Là**: Khách mua vãng lai không có tài khoản.
- **Tôi muốn**: Tra cứu tình trạng đơn hàng bằng Mã đơn hàng và Số điện thoại đặt hàng.
- **Để**: Biết đơn hàng của mình đã được xử lý hay đang giao tới chưa.
- **Tiêu chí nghiệm thu**:
  - _AC06.1_: **Khi** người dùng gửi form tra cứu (phương thức POST) với Mã đơn và Số điện thoại đã đặt, **thì** hệ thống chuẩn hóa số điện thoại, so khớp và trả về chi tiết: Ngày đặt, Người nhận, Địa chỉ, Danh sách mặt hàng, Tổng tiền và Trạng thái đơn (`Mới`, `Đang xử lý`, `Đang giao`, `Hoàn tất`, hoặc `Đã hủy`).
  - _AC06.2_: **Khi** người dùng nhập sai Mã đơn hoặc Số điện thoại không khớp với mã đơn đó, **thì** hệ thống thông báo lỗi: "Không tìm thấy thông tin đơn hàng phù hợp. Vui lòng kiểm tra lại".
  - _AC06.3_: **Khi** một IP gửi tra cứu vượt quá 10 lần trong 1 phút, **thì** hệ thống tạm thời chặn và yêu cầu chờ một lát.

---

### US07: Đăng ký & Đăng nhập Khách hàng

- **Là**: Khách hàng.
- **Tôi muốn**: Tạo tài khoản bằng Email/SĐT và mật khẩu, đăng nhập vào hệ thống.
- **Để**: Lưu trữ thông tin cá nhân và quản lý lịch sử đơn hàng dài hạn.
- **Tiêu chí nghiệm thu**:
  - _AC07.1_: **Khi** người dùng đăng ký với email đã tồn tại trong hệ thống, **thì** hệ thống báo lỗi: "Email này đã được đăng ký tài khoản".
  - _AC07.2_: **Khi** đăng ký mật khẩu dưới 8 ký tự, **thì** hệ thống báo lỗi yêu cầu tối thiểu 8 ký tự.
  - _AC07.3_: **Khi** đăng nhập với thông tin chính xác, **thì** hệ thống cấp JWT token lưu an toàn trong cookie httpOnly và giao diện thanh tiêu đề đổi sang trạng thái hiển thị tên người dùng.
  - _AC07.4_: **Khi** đăng nhập thất bại do sai mật khẩu, **thì** hệ thống báo lỗi: "Email hoặc mật khẩu không chính xác".
  - _AC07.5_: **Khi** gửi yêu cầu đăng ký hoặc đăng nhập vượt quá 5 lần / 15 phút trên cùng một cặp IP + Email, **thì** hệ thống kích hoạt rate limit chặn tạm thời.
  - _AC07.6_: **Khi** bấm nút "Đăng xuất", **thì** cookie xác thực bị xóa và phiên làm việc kết thúc.

---

### US08: Xem Lịch sử Đơn hàng & Cập nhật Thông tin cá nhân

- **Là**: Khách hàng đã đăng nhập.
- **Tôi muốn**: Xem danh sách các đơn hàng tôi từng đặt và cập nhật địa chỉ giao hàng mặc định.
- **Để**: Quản lý lịch sử chi tiêu và tiết kiệm thời gian khi mua sắm lần sau.
- **Tiêu chí nghiệm thu**:
  - _AC08.1_: **Khi** người dùng truy cập trang "Lịch sử đơn hàng", **thì** hệ thống hiển thị toàn bộ các đơn hàng do tài khoản đó đặt theo thứ tự mới nhất xếp trước.
  - _AC08.2_: **Khi** người dùng cập nhật Họ tên, Số điện thoại hoặc Địa chỉ mặc định trong mục "Thông tin tài khoản", **thì** hệ thống lưu dữ liệu mới và áp dụng tự động cho lần thanh toán kế tiếp.

---

### US09: Xem "Sản phẩm đã xem gần đây"

- **Là**: Khách mua hàng.
- **Tôi muốn**: Nhìn thấy danh sách các sản phẩm mình vừa xem lướt qua.
- **Để**: Nhanh chóng quay lại xem và cân nhắc đặt mua mà không cần tìm kiếm lại từ đầu.
- **Tiêu chí nghiệm thu**:
  - _AC09.1_: **Khi** người dùng mở xem trang chi tiết của một sản phẩm, **thì** hệ thống ghi nhận ID sản phẩm đó vào danh sách lưu ở LocalStorage của trình duyệt (tối đa 10 sản phẩm mới nhất).
  - _AC09.2_: **Khi** người dùng cuộn xuống chân trang chi tiết hoặc trang chủ, **thì** hiển thị mục "Sản phẩm đã xem gần đây" chứa các sản phẩm này kèm giá và ảnh đại diện.

---

### US10: Gửi Form Liên hệ

- **Là**: Khách hàng cần hỗ trợ.
- **Tôi muốn**: Gửi thắc mắc hoặc yêu cầu tư vấn thông qua biểu mẫu liên hệ.
- **Để**: Được cửa hàng gọi điện hoặc gửi email phản hồi.
- **Tiêu chí nghiệm thu**:
  - _AC10.1_: **Khi** người dùng điền đầy đủ Họ tên, SĐT, Tiêu đề và Nội dung tin nhắn rồi gửi, **thì** hệ thống lưu tin nhắn vào cơ sở dữ liệu và hiển thị thông báo "Cảm ơn bạn, chúng tôi sẽ liên hệ lại sớm nhất".
  - _AC10.2_: **Khi** gửi thiếu các trường bắt buộc, **thì** hệ thống chỉ ra lỗi tại trường tương ứng và không gửi form.
  - _AC10.3_: **Khi** một IP gửi quá 3 tin nhắn liên hệ trong 15 phút, **thì** hệ thống tạm dừng nhận tin để chống spam.

---

## PHẦN 2: QUẢN TRỊ VIÊN (ADMIN)

### US11: Quản lý Danh mục & Thương hiệu

- **Là**: Quản trị viên.
- **Tôi muốn**: Tạo mới, chỉnh sửa, xóa và sắp xếp thứ tự các danh mục ngành hàng và hãng sản xuất.
- **Để**: Cấu trúc lại gian hàng theo đúng phân khúc điện máy thực tế.
- **Tiêu chí nghiệm thu**:
  - _AC11.1_: **Khi** admin thêm mới một danh mục (ví dụ: "Tủ lạnh" là con của "Điện lạnh"), **thì** danh mục hiển thị đúng cấp bậc trên menu website.
  - _AC11.2_: **Khi** admin cố gắng xóa một danh mục hoặc thương hiệu đang có sản phẩm liên kết, **thì** hệ thống ngăn chặn và thông báo: "Không thể xóa danh mục/thương hiệu đang chứa sản phẩm".
  - _AC11.3_: **Khi** admin chỉnh sửa tên danh mục, **thì** hệ thống tự động cập nhật slug URL thân thiện (ví dụ: "Máy Giặt Cửa Ngang" -> "may-giat-cua-ngang").

---

### US12: Quản lý Sản phẩm & Tải ảnh

- **Là**: Quản trị viên.
- **Tôi muốn**: Thêm mới sản phẩm, tải lên hình ảnh an toàn, nhập bảng thông số kỹ thuật, giá niêm yết, giá khuyến mãi và số lượng tồn kho.
- **Để**: Đưa sản phẩm mới lên website hoặc cập nhật kho hàng thực tế.
- **Tiêu chí nghiệm thu**:
  - _AC12.1_: **Khi** admin chọn nhiều ảnh cho sản phẩm (tối đa 5 ảnh, mỗi ảnh < 5MB), **thì** client gửi tối đa 3 request song song (mỗi request 1 ảnh duy nhất); server kiểm tra định dạng, kích thước pixel an toàn, sinh tên ngẫu nhiên, re-encode qua Sharp sang WebP (không giữ file gốc) và lưu vào **Storage Adapter (R2/S3 với tiền tố `temp/`)**, không dựa vào ổ đĩa cục bộ của Render. **Khi** admin lưu sản phẩm, client **chỉ gửi tên file tạm dạng `UUID.webp`**; server kiểm tra bằng regex chặt chẽ, từ chối mọi ký tự đường dẫn/URL, rồi thực hiện "di chuyển" bằng cách copy sang tiền tố `products/` và xóa file ở `temp/` qua Storage Adapter. Các ảnh tạm mồ côi quá 24 giờ sẽ được Object Lifecycle Rule hoặc tác vụ dọn dẹp định kỳ xóa sạch.
  - _AC12.2_: **Khi** admin tải lên tệp không phải định dạng ảnh, vượt quá 5MB hoặc số pixel vượt ngưỡng an toàn (decompression bomb), **thì** hệ thống từ chối tải và báo lỗi cụ thể.
  - _AC12.3_: **Khi** admin nhập bảng thông số kỹ thuật dạng nhóm (ví dụ: Nhóm "Tổng quan" -> "Năm ra mắt: 2026", "Xuất xứ: Thái Lan"), **thì** hệ thống lưu cấu trúc chuẩn để hiển thị ra trang chi tiết.
  - _AC12.4_: **Khi** admin cập nhật tồn kho từ 0 lên số lượng dương, **thì** sản phẩm ở phía người dùng lập tức chuyển từ "Hết hàng" sang "Còn hàng".
  - _AC12.5_: **Khi** admin bấm xóa sản phẩm, hệ thống thực hiện lệnh xóa cứng độc lập; nếu phát hiện vi phạm ràng buộc khóa ngoại (sản phẩm đã có trong đơn hàng), hệ thống tự động bắt lỗi và thực hiện một lệnh độc lập riêng biệt chuyển sang trạng thái Ẩn (`isActive = false`), trả về cấu trúc chuẩn `{ success: true, data: { isArchived: true }, message }`. Nếu sản phẩm chưa có đơn hàng, hệ thống xóa cứng bản ghi DB xong rồi mới xóa các file ảnh trên storage (lỗi xóa file chỉ ghi log), trả về `{ success: true, data: { isArchived: false }, message }`.

---

### US13: Quản lý & Cập nhật Trạng thái Đơn hàng

- **Là**: Quản trị viên.
- **Tôi muốn**: Xem danh sách toàn bộ đơn đặt hàng, xem chi tiết và chuyển đổi trạng thái đơn hàng theo đúng quy trình nghiệp vụ.
- **Để**: Phối hợp với đội ngũ kho vận giao hàng cho khách và kiểm soát tồn kho chính xác.
- **Tiêu chí nghiệm thu**:
  - _AC13.1_: **Khi** có đơn hàng mới phát sinh, **thì** đơn hàng xuất hiện ở đầu bảng quản lý với nhãn trạng thái `Mới` (`PENDING`).
  - _AC13.2_: **Khi** admin cập nhật trạng thái đơn, **thì** hệ thống chỉ cho phép chuyển đổi theo luồng hợp lệ:
    - `PENDING` -> `PROCESSING` hoặc `CANCELLED`
    - `PROCESSING` -> `SHIPPING` hoặc `CANCELLED`
    - `SHIPPING` -> `COMPLETED` hoặc `CANCELLED`
    - Không cho phép chuyển đổi trạng thái khi đơn đã ở `COMPLETED` hoặc `CANCELLED`.
  - _AC13.3_: **Khi** đơn hàng được chuyển sang `COMPLETED`, **thì** hệ thống tự động tăng số lượng bán `soldCount` cho các sản phẩm trong đơn đó để phục vụ tính năng sắp xếp bán chạy.
  - _AC13.4_: **Khi** admin hủy đơn hàng (chuyển sang `CANCELLED` từ `PENDING`, `PROCESSING` hoặc `SHIPPING`), **thì** hệ thống kiểm tra trạng thái cũ trong transaction và chỉ thực hiện hoàn trả lại tồn kho đúng một lần duy nhất.

---

### US14: Quản lý Khách hàng & Tin nhắn liên hệ

- **Là**: Quản trị viên.
- **Tôi muốn**: Xem danh sách các tài khoản khách hàng và hộp thư tin nhắn liên hệ.
- **Để**: Chăm sóc khách hàng và giải quyết các khiếu nại/tư vấn kịp thời.
- **Tiêu chí nghiệm thu**:
  - _AC14.1_: **Khi** admin truy cập mục "Khách hàng", **thì** hệ thống hiển thị danh sách người dùng gồm Họ tên, Email, SĐT, Số lượng đơn đã đặt và Ngày đăng ký.
  - _AC14.2_: **Khi** có tin nhắn mới từ form liên hệ, **thì** tin nhắn hiển thị với trạng thái `Chưa đọc`. Khi admin bấm vào xem chi tiết, **thì** trạng thái chuyển thành `Đã đọc`.
