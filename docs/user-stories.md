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
  - *AC01.1*: **Khi** người dùng mở trang chủ trên điện thoại hoặc máy tính, **thì** hệ thống hiển thị topbar có hotline, ô tìm kiếm, giỏ hàng, banner khuyến mãi và danh sách khối sản phẩm theo từng ngành hàng (Tivi, Tủ lạnh, Máy giặt, Điều hòa...).
  - *AC01.2*: **Khi** người dùng bấm vào một danh mục cha (ví dụ: Điện lạnh), **thì** hệ thống xổ ra danh mục con tương ứng (Tủ lạnh, Tủ đông...) hoặc chuyển hướng đến trang danh mục đó.
  - *AC01.3*: **Khi** bấm vào logo website ở bất kỳ trang nào, **thì** hệ thống chuyển hướng người dùng quay lại trang chủ.

---

### US02: Tìm kiếm, Lọc, Sắp xếp và Phân trang Sản phẩm
- **Là**: Khách mua hàng.
- **Tôi muốn**: Tìm kiếm theo tên sản phẩm, lọc theo thương hiệu, mức giá, sắp xếp theo giá và xem danh sách phân trang.
- **Để**: Nhanh chóng chọn lọc được thiết bị phù hợp với ngân sách và thương hiệu yêu thích.
- **Tiêu chí nghiệm thu**:
  - *AC02.1*: **Khi** người dùng nhập từ khóa vào ô tìm kiếm và ấn Enter/Tìm kiếm, **thì** hệ thống trả về danh sách sản phẩm có tên hoặc mô tả chứa từ khóa đó.
  - *AC02.2*: **Khi** người dùng chọn lọc theo một hoặc nhiều thương hiệu (ví dụ: Samsung, LG), **thì** danh sách chỉ hiển thị các sản phẩm thuộc các thương hiệu đã chọn.
  - *AC02.3*: **Khi** người dùng chọn khoảng giá (ví dụ: Từ 5.000.000đ đến 10.000.000đ), **thì** hệ thống cập nhật danh sách các sản phẩm có giá bán nằm trong khoảng này.
  - *AC02.4*: **Khi** người dùng chọn sắp xếp "Giá tăng dần" hoặc "Giá giảm dần", **thì** danh sách lập tức sắp xếp lại thứ tự tương ứng.
  - *AC02.5*: **Khi** danh mục có nhiều hơn 12 sản phẩm, **thì** hệ thống hiển thị thanh phân trang rõ ràng và khi chuyển trang thì URL cập nhật số trang tương ứng (query `?page=X`).

---

### US03: Xem Chi tiết Sản phẩm & Thông số Kỹ thuật
- **Là**: Khách mua hàng.
- **Tôi muốn**: Xem đầy đủ hình ảnh, giá niêm yết, giá bán, tình trạng còn hàng và bảng thông số kỹ thuật chi tiết của sản phẩm.
- **Để**: Đánh giá chi tiết công năng thiết bị trước khi quyết định mua.
- **Tiêu chí nghiệm thu**:
  - *AC03.1*: **Khi** người dùng bấm vào một sản phẩm từ danh sách, **thì** hệ thống chuyển đến trang chi tiết sản phẩm hiển thị: Tên đầy đủ, Mã SKU, Giá gốc, Giá bán, Tỷ lệ giảm giá, và Nhãn "Còn hàng" hoặc "Hết hàng".
  - *AC03.2*: **Khi** người dùng bấm vào các ảnh thu nhỏ (thumbnails), **thì** ảnh phóng to chính chuyển đổi tương ứng ngay lập tức.
  - *AC03.3*: **Khi** sản phẩm có số lượng tồn kho bằng 0, **thì** hệ thống hiển thị trạng thái "Hết hàng" và vô hiệu hóa nút "Thêm vào giỏ" / "Mua ngay".
  - *AC03.4*: **Khi** cuộn xuống phần thông số kỹ thuật, **thì** hệ thống hiển thị bảng thông số được phân theo từng nhóm (Ví dụ: Tổng quan, Công nghệ hình ảnh/âm thanh, Kích thước - Khối lượng).

---

### US04: Quản lý Giỏ hàng
- **Là**: Khách mua hàng.
- **Tôi muốn**: Thêm sản phẩm vào giỏ, điều chỉnh số lượng hoặc xóa bỏ sản phẩm.
- **Để**: Chuẩn bị danh sách hàng hóa trước khi thanh toán.
- **Tiêu chí nghiệm thu**:
  - *AC04.1*: **Khi** người dùng bấm nút "Thêm vào giỏ hàng" ở sản phẩm còn hàng, **thì** số lượng trên biểu tượng giỏ hàng ở thanh tiêu đề tăng lên và hiển thị thông báo thành công.
  - *AC04.2*: **Khi** người dùng mở giỏ hàng và tăng số lượng vượt quá số lượng tồn kho của sản phẩm, **thì** hệ thống chặn lại và thông báo: "Số lượng yêu cầu vượt quá số lượng hiện có trong kho".
  - *AC04.3*: **Khi** người dùng bấm nút "Xóa" một sản phẩm khỏi giỏ, **thì** sản phẩm đó bị gỡ bỏ và tổng tiền giỏ hàng được tính toán lại ngay lập tức.
  - *AC04.4*: **Khi** người dùng đóng trình duyệt rồi mở lại, **thì** giỏ hàng vẫn giữ nguyên các mặt hàng trước đó (lưu trạng thái vào LocalStorage/Cookie).

---

### US05: Đặt hàng Thanh toán khi nhận hàng (COD)
- **Là**: Khách mua hàng (vãng lai hoặc đã đăng nhập).
- **Tôi muốn**: Điền thông tin giao hàng và chọn phương thức thanh toán COD để hoàn tất đơn hàng.
- **Để**: Nhận hàng tận nhà rồi mới trả tiền mặt, đảm bảo an tâm.
- **Tiêu chí nghiệm thu**:
  - *AC05.1*: **Khi** người dùng để trống các trường bắt buộc (Họ tên, SĐT, Tỉnh/Thành phố được chọn từ danh sách 34 tỉnh/thành trong `provinces.ts`, Địa chỉ cụ thể), **thì** hệ thống báo lỗi cụ thể tại từng ô nhập liệu và không cho gửi form.
  - *AC05.2*: **Khi** người dùng nhập số điện thoại không đúng định dạng Việt Nam (10 chữ số, đầu số hợp lệ), **thì** hệ thống báo lỗi "Số điện thoại không hợp lệ". Số điện thoại hợp lệ sẽ được tự động chuẩn hóa (loại bỏ dấu cách, chuyển +84 thành 0) trước khi lưu.
  - *AC05.3*: **Khi** đặt hàng thành công, **thì** hệ thống hiển thị trang cảm ơn kèm **Mã đơn hàng duy nhất** sinh từ nguồn crypto ngẫu nhiên (Ví dụ: `VE-9K2M4P7X`), đồng thời tự động xóa sạch giỏ hàng hiện tại.
  - *AC05.4*: **Khi** đơn hàng được tạo, **thì** số lượng tồn kho của các sản phẩm tương ứng trong cơ sở dữ liệu bị trừ đi tương ứng sau khi đã kiểm tra còn đủ hàng và sắp xếp để tránh deadlock.

---

### US06: Tra cứu Đơn hàng bằng Mã đơn + Số điện thoại
- **Là**: Khách mua vãng lai không có tài khoản.
- **Tôi muốn**: Tra cứu tình trạng đơn hàng bằng Mã đơn hàng và Số điện thoại đặt hàng.
- **Để**: Biết đơn hàng của mình đã được xử lý hay đang giao tới chưa.
- **Tiêu chí nghiệm thu**:
  - *AC06.1*: **Khi** người dùng gửi form tra cứu (phương thức POST) với Mã đơn và Số điện thoại đã đặt, **thì** hệ thống chuẩn hóa số điện thoại, so khớp và trả về chi tiết: Ngày đặt, Người nhận, Địa chỉ, Danh sách mặt hàng, Tổng tiền và Trạng thái đơn (`Mới`, `Đang xử lý`, `Đang giao`, `Hoàn tất`, hoặc `Đã hủy`).
  - *AC06.2*: **Khi** người dùng nhập sai Mã đơn hoặc Số điện thoại không khớp với mã đơn đó, **thì** hệ thống thông báo lỗi: "Không tìm thấy thông tin đơn hàng phù hợp. Vui lòng kiểm tra lại".
  - *AC06.3*: **Khi** một IP gửi tra cứu vượt quá 10 lần trong 1 phút, **thì** hệ thống tạm thời chặn và yêu cầu chờ một lát.

---

### US07: Đăng ký & Đăng nhập Khách hàng
- **Là**: Khách hàng.
- **Tôi muốn**: Tạo tài khoản bằng Email/SĐT và mật khẩu, đăng nhập vào hệ thống.
- **Để**: Lưu trữ thông tin cá nhân và quản lý lịch sử đơn hàng dài hạn.
- **Tiêu chí nghiệm thu**:
  - *AC07.1*: **Khi** người dùng đăng ký với email đã tồn tại trong hệ thống, **thì** hệ thống báo lỗi: "Email này đã được đăng ký tài khoản".
  - *AC07.2*: **Khi** đăng ký mật khẩu dưới 8 ký tự, **thì** hệ thống báo lỗi yêu cầu tối thiểu 8 ký tự.
  - *AC07.3*: **Khi** đăng nhập với thông tin chính xác, **thì** hệ thống cấp JWT token lưu an toàn trong cookie httpOnly và giao diện thanh tiêu đề đổi sang trạng thái hiển thị tên người dùng.
  - *AC07.4*: **Khi** đăng nhập thất bại do sai mật khẩu, **thì** hệ thống báo lỗi: "Email hoặc mật khẩu không chính xác".
  - *AC07.5*: **Khi** gửi yêu cầu đăng ký hoặc đăng nhập vượt quá 5 lần / 15 phút trên cùng một cặp IP + Email, **thì** hệ thống kích hoạt rate limit chặn tạm thời.
  - *AC07.6*: **Khi** bấm nút "Đăng xuất", **thì** cookie xác thực bị xóa và phiên làm việc kết thúc.

---

### US08: Xem Lịch sử Đơn hàng & Cập nhật Thông tin cá nhân
- **Là**: Khách hàng đã đăng nhập.
- **Tôi muốn**: Xem danh sách các đơn hàng tôi từng đặt và cập nhật địa chỉ giao hàng mặc định.
- **Để**: Quản lý lịch sử chi tiêu và tiết kiệm thời gian khi mua sắm lần sau.
- **Tiêu chí nghiệm thu**:
  - *AC08.1*: **Khi** người dùng truy cập trang "Lịch sử đơn hàng", **thì** hệ thống hiển thị toàn bộ các đơn hàng do tài khoản đó đặt theo thứ tự mới nhất xếp trước.
  - *AC08.2*: **Khi** người dùng cập nhật Họ tên, Số điện thoại hoặc Địa chỉ mặc định trong mục "Thông tin tài khoản", **thì** hệ thống lưu dữ liệu mới và áp dụng tự động cho lần thanh toán kế tiếp.

---

### US09: Xem "Sản phẩm đã xem gần đây"
- **Là**: Khách mua hàng.
- **Tôi muốn**: Nhìn thấy danh sách các sản phẩm mình vừa xem lướt qua.
- **Để**: Nhanh chóng quay lại xem và cân nhắc đặt mua mà không cần tìm kiếm lại từ đầu.
- **Tiêu chí nghiệm thu**:
  - *AC09.1*: **Khi** người dùng mở xem trang chi tiết của một sản phẩm, **thì** hệ thống ghi nhận ID sản phẩm đó vào danh sách lưu ở LocalStorage của trình duyệt (tối đa 10 sản phẩm mới nhất).
  - *AC09.2*: **Khi** người dùng cuộn xuống chân trang chi tiết hoặc trang chủ, **thì** hiển thị mục "Sản phẩm đã xem gần đây" chứa các sản phẩm này kèm giá và ảnh đại diện.

---

### US10: Gửi Form Liên hệ
- **Là**: Khách hàng cần hỗ trợ.
- **Tôi muốn**: Gửi thắc mắc hoặc yêu cầu tư vấn thông qua biểu mẫu liên hệ.
- **Để**: Được cửa hàng gọi điện hoặc gửi email phản hồi.
- **Tiêu chí nghiệm thu**:
  - *AC10.1*: **Khi** người dùng điền đầy đủ Họ tên, SĐT, Tiêu đề và Nội dung tin nhắn rồi gửi, **thì** hệ thống lưu tin nhắn vào cơ sở dữ liệu và hiển thị thông báo "Cảm ơn bạn, chúng tôi sẽ liên hệ lại sớm nhất".
  - *AC10.2*: **Khi** gửi thiếu các trường bắt buộc, **thì** hệ thống chỉ ra lỗi tại trường tương ứng và không gửi form.
  - *AC10.3*: **Khi** một IP gửi quá 3 tin nhắn liên hệ trong 15 phút, **thì** hệ thống tạm dừng nhận tin để chống spam.

---

## PHẦN 2: QUẢN TRỊ VIÊN (ADMIN)

### US11: Quản lý Danh mục & Thương hiệu
- **Là**: Quản trị viên.
- **Tôi muốn**: Tạo mới, chỉnh sửa, xóa và sắp xếp thứ tự các danh mục ngành hàng và hãng sản xuất.
- **Để**: Cấu trúc lại gian hàng theo đúng phân khúc điện máy thực tế.
- **Tiêu chí nghiệm thu**:
  - *AC11.1*: **Khi** admin thêm mới một danh mục (ví dụ: "Tủ lạnh" là con của "Điện lạnh"), **thì** danh mục hiển thị đúng cấp bậc trên menu website.
  - *AC11.2*: **Khi** admin cố gắng xóa một danh mục hoặc thương hiệu đang có sản phẩm liên kết, **thì** hệ thống ngăn chặn và thông báo: "Không thể xóa danh mục/thương hiệu đang chứa sản phẩm".
  - *AC11.3*: **Khi** admin chỉnh sửa tên danh mục, **thì** hệ thống tự động cập nhật slug URL thân thiện (ví dụ: "Máy Giặt Cửa Ngang" -> "may-giat-cua-ngang").

---

### US12: Quản lý Sản phẩm & Tải ảnh
- **Là**: Quản trị viên.
- **Tôi muốn**: Thêm mới sản phẩm, tải lên hình ảnh an toàn, nhập bảng thông số kỹ thuật, giá niêm yết, giá khuyến mãi và số lượng tồn kho.
- **Để**: Đưa sản phẩm mới lên website hoặc cập nhật kho hàng thực tế.
- **Tiêu chí nghiệm thu**:
  - *AC12.1*: **Khi** admin chọn nhiều ảnh cho sản phẩm (tối đa 5 ảnh, mỗi ảnh < 5MB), **thì** client gửi tối đa 3 request song song (mỗi request 1 ảnh duy nhất); server kiểm tra định dạng, kích thước pixel an toàn, sinh tên ngẫu nhiên, re-encode qua Sharp sang WebP (không giữ file gốc) và lưu vào **thư mục tạm (`uploads/temp/`)**. **Khi** admin lưu sản phẩm thành công, **thì** các ảnh được chuyển sang thư mục chính thức (`uploads/products/`). Các ảnh tạm mồ côi quá 24 giờ sẽ được tác vụ dọn dẹp định kỳ xóa sạch.
  - *AC12.2*: **Khi** admin tải lên tệp không phải định dạng ảnh, vượt quá 5MB hoặc số pixel vượt ngưỡng an toàn (decompression bomb), **thì** hệ thống từ chối tải và báo lỗi cụ thể.
  - *AC12.3*: **Khi** admin nhập bảng thông số kỹ thuật dạng nhóm (ví dụ: Nhóm "Tổng quan" -> "Năm ra mắt: 2026", "Xuất xứ: Thái Lan"), **thì** hệ thống lưu cấu trúc chuẩn để hiển thị ra trang chi tiết.
  - *AC12.4*: **Khi** admin cập nhật tồn kho từ 0 lên số lượng dương, **thì** sản phẩm ở phía người dùng lập tức chuyển từ "Hết hàng" sang "Còn hàng".
  - *AC12.5*: **Khi** admin bấm xóa sản phẩm, hệ thống thực hiện lệnh xóa cứng độc lập; nếu phát hiện vi phạm ràng buộc khóa ngoại (sản phẩm đã có trong đơn hàng), hệ thống tự động bắt lỗi và thực hiện một lệnh độc lập riêng biệt chuyển sang trạng thái Ẩn (`isActive = false`), trả về cấu trúc chuẩn `{ success: true, data: { isArchived: true }, message }`. Nếu sản phẩm chưa có đơn hàng, hệ thống xóa cứng bản ghi DB xong rồi mới xóa các file ảnh trên storage (lỗi xóa file chỉ ghi log), trả về `{ success: true, data: { isArchived: false }, message }`.

---

### US13: Quản lý & Cập nhật Trạng thái Đơn hàng
- **Là**: Quản trị viên.
- **Tôi muốn**: Xem danh sách toàn bộ đơn đặt hàng, xem chi tiết và chuyển đổi trạng thái đơn hàng theo đúng quy trình nghiệp vụ.
- **Để**: Phối hợp với đội ngũ kho vận giao hàng cho khách và kiểm soát tồn kho chính xác.
- **Tiêu chí nghiệm thu**:
  - *AC13.1*: **Khi** có đơn hàng mới phát sinh, **thì** đơn hàng xuất hiện ở đầu bảng quản lý với nhãn trạng thái `Mới` (`PENDING`).
  - *AC13.2*: **Khi** admin cập nhật trạng thái đơn, **thì** hệ thống chỉ cho phép chuyển đổi theo luồng hợp lệ:
    - `PENDING` -> `PROCESSING` hoặc `CANCELLED`
    - `PROCESSING` -> `SHIPPING` hoặc `CANCELLED`
    - `SHIPPING` -> `COMPLETED` hoặc `CANCELLED`
    - Không cho phép chuyển đổi trạng thái khi đơn đã ở `COMPLETED` hoặc `CANCELLED`.
  - *AC13.3*: **Khi** đơn hàng được chuyển sang `COMPLETED`, **thì** hệ thống tự động tăng số lượng bán `soldCount` cho các sản phẩm trong đơn đó để phục vụ tính năng sắp xếp bán chạy.
  - *AC13.4*: **Khi** admin hủy đơn hàng (chuyển sang `CANCELLED` từ `PENDING`, `PROCESSING` hoặc `SHIPPING`), **thì** hệ thống kiểm tra trạng thái cũ trong transaction và chỉ thực hiện hoàn trả lại tồn kho đúng một lần duy nhất.

---

### US14: Quản lý Khách hàng & Tin nhắn liên hệ
- **Là**: Quản trị viên.
- **Tôi muốn**: Xem danh sách các tài khoản khách hàng và hộp thư tin nhắn liên hệ.
- **Để**: Chăm sóc khách hàng và giải quyết các khiếu nại/tư vấn kịp thời.
- **Tiêu chí nghiệm thu**:
  - *AC14.1*: **Khi** admin truy cập mục "Khách hàng", **thì** hệ thống hiển thị danh sách người dùng gồm Họ tên, Email, SĐT, Số lượng đơn đã đặt và Ngày đăng ký.
  - *AC14.2*: **Khi** có tin nhắn mới từ form liên hệ, **thì** tin nhắn hiển thị với trạng thái `Chưa đọc`. Khi admin bấm vào xem chi tiết, **thì** trạng thái chuyển thành `Đã đọc`.
