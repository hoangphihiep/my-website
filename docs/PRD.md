# TÀI LIỆU YÊU CẦU SẢN PHẨM (PRD)

## Dự án: Website Thương Mại Điện Tử Điện Máy & Gia Dụng (VietElectro)

---

## 1. Mục tiêu Dự án

- **Mục tiêu tổng quát**: Xây dựng nền tảng thương mại điện tử chuyên ngành điện máy, điện tử và gia dụng tại Việt Nam (Tivi, Tủ lạnh, Điều hòa, Máy giặt, Gia dụng nhà bếp...), hướng tới trải nghiệm mua sắm nhanh chóng, tin cậy, thanh toán COD minh bạch.
- **Mục tiêu người dùng**:
  - Giao diện thân thiện, ưu tiên tối đa cho thiết bị di động (Mobile-First).
  - Thông tin thông số kỹ thuật rõ ràng, chi tiết, phân nhóm chuẩn ngành điện máy.
  - Đặt hàng nhanh gọn dưới 1 phút không bắt buộc tạo tài khoản; tra cứu đơn hàng linh hoạt bằng Mã đơn + Số điện thoại.
- **Mục tiêu kinh doanh**:
  - Cung cấp công cụ quản trị đơn hàng, quản lý kho hàng và danh mục sản phẩm đơn giản, chính xác cho chủ cửa hàng.
  - Giảm thiểu tỷ lệ sót đơn và tồn kho ảo nhờ cơ chế kiểm soát tồn kho chặt chẽ.

---

## 2. Đối tượng Người dùng & Chân dung Khách hàng

### 2.1. Khách mua lẻ (End-User / Customer)

- **Hành vi**: Truy cập chủ yếu bằng smartphone (chiếm >80%), tìm kiếm thiết bị điện máy gia đình, so sánh giá cả, đối chiếu thông số kỹ thuật (công suất, kích thước, công nghệ tiết kiệm điện Inverter).
- **Kỳ vọng**:
  - Xem ngay trạng thái còn hàng/hết hàng.
  - Thao tác lọc sản phẩm theo khoảng giá và hãng sản xuất mượt mà.
  - Đặt hàng COD nhận hàng trả tiền tận nhà.
  - Tra cứu được tiến độ giao hàng mà không cần ghi nhớ mật khẩu tài khoản.

### 2.2. Khách hàng thân thiết (Registered Customer)

- Khách hàng đã tạo tài khoản để theo dõi lịch sử các lần mua sắm, lưu sẵn địa chỉ nhận hàng để tiện đặt lại trong tương lai.

### 2.3. Quản trị viên (Admin / Shop Owner)

- Chủ shop hoặc nhân viên bán hàng sử dụng laptop/máy tính để quản lý kho sản phẩm, duyệt đơn hàng, cập nhật lộ trình giao vận và phản hồi tin nhắn của khách.

---

## 3. Phong cách Thiết kế & Trải nghiệm (UI/UX)

- **Tư tưởng chủ đạo**: Lấy cảm hứng tổ chức bố cục từ các hệ thống siêu thị điện máy lớn tại Việt Nam (tiêu biểu như META.vn), được thiết kế lại độc lập với bộ nhận diện riêng:
  - **Màu sắc**: Màu đỏ đậm thương mại (#D70018 / #C70015) làm điểm nhấn cho các nút kêu gọi hành động (CTA), thông báo giá khuyến mãi; nền sáng (#F8F9FA và #FFFFFF) tạo sự thanh thoát, dễ đọc thông số.
  - **Thanh trên cùng (Top Bar)**: Hiển thị Hotline bán hàng, thông tin bảo hành, tra cứu đơn hàng nhanh, giỏ hàng nổi bật kèm số lượng và nút đăng nhập/tài khoản.
  - **Menu danh mục (Multi-level Navigation)**: Hỗ trợ phân cấp 2-3 tầng (Ví dụ: _Điện lạnh_ -> _Tủ lạnh_ -> _Tủ lạnh Side by side_).
  - **Trang chủ**: Banner khuyến mãi nổi bật, thanh tìm kiếm thông minh, các khối sản phẩm được nhóm theo ngành hàng chủ lực (Tivi - Âm thanh, Tủ lạnh - Điện lạnh, Máy giặt - Sấy, Điều hòa - Quạt mát, Gia dụng thông minh).
  - **Chân trang (Footer)**: Đầy đủ chính sách (Vận chuyển, Bảo hành - Đổi trả, Hướng dẫn mua hàng, Cam kết chính hãng, Thông tin liên hệ shop).
- **Yêu cầu bản quyền**: Không sao chép logo, hình ảnh, bài viết của META.vn hay bất kỳ bên nào; sử dụng hệ thống dữ liệu mẫu và tên thương hiệu giả định riêng (_VietElectro_).

---

## 4. Phạm vi Tính năng Phiên bản 1 (v1 Scope)

### 4.1. Dành cho Khách hàng

1. **Duyệt danh mục & Thương hiệu**:
   - Menu danh mục đa cấp, xem sản phẩm theo danh mục hoặc theo từng hãng sản xuất (Samsung, LG, Panasonic, Daikin, Sony, Casper...).
2. **Tìm kiếm, Lọc & Phân trang**:
   - Tìm kiếm sản phẩm theo tên / từ khóa tức thì.
   - Lọc kết hợp: theo danh mục con, hãng sản xuất, khoảng giá (dưới 5tr, 5-10tr, 10-20tr, trên 20tr hoặc tự nhập khoảng giá).
   - Sắp xếp: Giá tăng dần, Giá giảm dần, Hàng mới nhất, Bán chạy (dựa trên số lượng bán thực tế `soldCount`).
   - Phân trang server-side để tối ưu tốc độ tải (có giới hạn limit tối đa).
3. **Trang chi tiết sản phẩm**:
   - Thư viện ảnh sản phẩm (ảnh chính + danh sách thumbnail).
   - Tên sản phẩm, mã SKU, thương hiệu, giá niêm yết, giá khuyến mãi, trạng thái tồn kho (Còn hàng / Hết hàng).
   - Bảng thông số kỹ thuật chi tiết phân nhóm rõ ràng (Công suất, Điện áp, Nơi sản xuất, Năm ra mắt, Kích thước...).
   - Bài viết mô tả tính năng nổi bật.
4. **Giỏ hàng & Đặt hàng COD**:
   - Thêm/bớt số lượng, xóa sản phẩm khỏi giỏ hàng.
   - Form đặt hàng COD tinh gọn (Mobile-First): Họ tên, Số điện thoại, Tỉnh/Thành phố (chọn danh sách 34 đơn vị hành chính cấp tỉnh: 28 tỉnh và 6 thành phố, dữ liệu đọc từ file `client/src/data/provinces.ts`, cấp huyện đã bãi bỏ), Địa chỉ cụ thể (ô nhập tự do: số nhà, tên đường, phường/xã), Ghi chú đơn hàng.
   - **Quy tắc phí vận chuyển ở v1**: Cố định là **0 VNĐ (Miễn phí vận chuyển toàn quốc)**.
   - Hỗ trợ đặt hàng cả khi chưa đăng nhập (Khách vãng lai) và đã đăng nhập.
5. **Tra cứu đơn hàng không cần đăng nhập**:
   - Tra cứu bảo mật qua giao thức POST: Nhập **Mã đơn hàng** + **Số điện thoại đặt hàng** (được chuẩn hóa tự động) để xem chi tiết: danh sách sản phẩm, địa chỉ, tổng tiền, trạng thái đơn (Mới, Đang xử lý, Đang giao, Hoàn tất, Hủy).
6. **Tài khoản người dùng**:
   - Đăng ký tài khoản, Đăng nhập (bảo mật qua cookie httpOnly).
   - Xem và chỉnh sửa thông tin cá nhân (Họ tên, SĐT, Địa chỉ mặc định).
   - Xem lịch sử các đơn hàng đã đặt.
7. **Sản phẩm đã xem gần đây**:
   - Lưu trữ tự động ID sản phẩm vào Local Storage phía Client.
   - Hiển thị danh sách sản phẩm đã xem ở chân trang chi tiết hoặc trang chủ để khách dễ quay lại mua.
8. **Form liên hệ**:
   - Gửi yêu cầu tư vấn/hỗ trợ kèm họ tên, SĐT, email, nội dung.

### 4.2. Dành cho Quản trị viên (Admin)

1. **Quản lý Danh mục (Categories)**: Thêm, sửa, xóa danh mục, hỗ trợ danh mục cha/con, cập nhật thứ tự hiển thị.
2. **Quản lý Thương hiệu (Brands)**: Thêm, sửa, xóa hãng sản xuất và logo hãng.
3. **Quản lý Sản phẩm (Products)**:
   - Thêm mới, cập nhật, xóa sản phẩm.
   - Nhập thông số kỹ thuật (dạng bảng động key-value phân nhóm).
   - Tải lên nhiều ảnh cho sản phẩm.
   - Cập nhật giá niêm yết, giá bán, số lượng tồn kho.
4. **Quản lý Đơn hàng (Orders)**:
   - Danh sách đơn hàng với bộ lọc theo trạng thái và tìm kiếm mã đơn / SĐT.
   - Cập nhật trạng thái đơn: `MỚI` -> `ĐANG XỬ LÝ` -> `ĐANG GIAO` -> `HOÀN TẤT` hoặc `ĐÃ HỦY`.
   - Xem chi tiết từng đơn hàng và thông tin khách.
5. **Quản lý Khách hàng & Tin nhắn**:
   - Xem danh sách người dùng đã đăng ký.
   - Xem và xử lý các tin nhắn từ form liên hệ.

---

## 5. Ngoài phạm vi Phiên bản 1 (LÀM SAU - Out of Scope for v1)

Các tính năng sau đây **TUYỆT ĐỐI KHÔNG** triển khai trong phiên bản đầu để đảm bảo tiến độ và độ ổn định của hệ thống lõi:

1. **Thanh toán trực tuyến**: Không tích hợp cổng VNPAY, MoMo, ZaloPay hay cổng thẻ quốc tế (Chỉ dùng COD).
2. **Mua hàng trả góp**: Không làm tính năng xét duyệt trả góp 0% qua công ty tài chính hoặc qua thẻ tín dụng.
3. **Flash Sale & Mã giảm giá nâng cao**: Không làm đồng hồ đếm ngược Flash sale, không làm hệ thống voucher coupon phức tạp.
4. **Hệ thống Đánh giá & Bình luận (Reviews/Ratings)**: Không làm tính năng đánh giá sao hay bình luận kèm ảnh/video.
5. **Ứng dụng di động Native (App iOS/Android)**: Chỉ phát triển bản Web Responsive tối ưu Mobile.
6. **Đa chi nhánh / Đa kho hàng**: Toàn bộ hệ thống quản lý theo mô hình 1 kho trung tâm duy nhất.
