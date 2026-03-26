export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  category: string;
  image: string;
  date: string;
  desc: string;
};

export type BlogDetail = {
  slug: string;
  categorySlug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  content: string;
};

export type Category = {
  name: string;
  slug: string;
};

export const categories: Category[] = [
  { name: "Tất cả", slug: "" },
  { name: "News", slug: "news" },
  { name: "Coffeeholic", slug: "coffeeholic" },
  { name: "Blog", slug: "blog" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Zerus Coffee Đà Lạt: Mở cửa đón khách giữa núi rừng mộng mơ",
    slug: "zerus-coffee-da-lat-mo-cua-don-khach",
    categorySlug: "news",
    category: "News",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    date: "25/03/2026",
    desc: "Vừa qua, Zerus Coffee đã chính thức ra mắt cửa hàng mới tại Đà Lạt với không gian cực kỳ chill giữa rừng thông...",
  },
  {
    id: "2",
    title: "Hành trình 1500m tìm kiếm hạt Arabica tinh túy nhất Việt Nam",
    slug: "hanh-trinh-1500m-tim-kiem-hat-arabica",
    categorySlug: "coffeeholic",
    category: "Coffeeholic",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
    date: "24/03/2026",
    desc: "Vượt qua những cung đường đèo hiểm trở tại Cầu Đất, chúng tôi mang về những hạt cà phê Arabica thượng hạng...",
  },
  {
    id: "3",
    title: "Cách pha cà phê máy chuẩn vị Barista ngay tại căn bếp nhỏ",
    slug: "cach-pha-ca-phe-may-chuan-vi-barista",
    categorySlug: "blog",
    category: "Blog",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    date: "23/03/2026",
    desc: "Bạn hoàn toàn có thể tự tay tạo ra lớp Crema béo ngậy nếu nắm vững 3 bí quyết kỹ thuật sau đây...",
  },
  {
    id: "4",
    title: "SIGNATURE - Nơi khơi nguồn cảm hứng cà phê độc bản",
    slug: "signature-noi-khoi-nguon-cam-hung",
    categorySlug: "news",
    category: "News",
    image: "/assets/images/blog2.jpg",
    date: "22/03/2026",
    desc: "Không gian trải nghiệm Signature mới tại Quận 1 sẽ thay đổi hoàn toàn định nghĩa về việc 'đi cà phê' của bạn...",
  },
];

export const BLOG_DETAILS: Record<string, BlogDetail> = {
  "zerus-coffee-da-lat-mo-cua-don-khach": {
    slug: "zerus-coffee-da-lat-mo-cua-don-khach",
    categorySlug: "news",
    category: "News",
    title: "Zerus Coffee Đà Lạt: Mở cửa đón khách giữa núi rừng mộng mơ",
    description:
      "Vừa qua, Zerus Coffee đã chính thức ra mắt cửa hàng mới tại Đà Lạt với không gian cực kỳ chill giữa rừng thông, hứa hẹn là điểm check-in không thể bỏ lỡ.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    date: "25/03/2026",
    author: "Zerus Coffee Team",
    content: `
      <p>Sau bao ngày chờ đợi, <strong>Zerus Coffee Đà Lạt</strong> đã chính thức mở cửa chào đón những vị khách đầu tiên. Nằm ẩn mình giữa những rặng thông xanh ngát, cửa hàng mới mang đến một luồng gió hoàn toàn khác biệt so với nhịp sống hối hả của thành phố.</p>

      <h3>Không gian kiến trúc hòa quyện với thiên nhiên</h3>
      <p>Với thiết kế mở, tối đa hóa ánh sáng tự nhiên và sử dụng chất liệu gỗ mộc mạc, cửa hàng tạo cảm giác ấm cúng, gần gũi ngay khi bước vào. Điểm nhấn đặc biệt là khu vực ban công rộng lớn, nơi bạn có thể vừa nhâm nhi tách cà phê nóng hổi, vừa ngắm nhìn sương mù giăng lối trên những sườn đồi.</p>

      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Không gian Zerus Coffee Đà Lạt" />

      <h3>Menu đặc quyền dành riêng cho Đà Lạt</h3>
      <p>Không chỉ mang đến không gian tuyệt đẹp, The Coffee House còn ra mắt bộ sưu tập thức uống độc quyền lấy cảm hứng từ nông sản địa phương. Từ tách Trà Atiso Mật Ong ấm lòng đến ly Latte Hạnh Nhân béo ngậy, mỗi thức uống đều là một mảnh ghép hoàn hảo cho trải nghiệm của bạn tại xứ sở sương mù.</p>

      <p>Hãy đến và trải nghiệm không gian "Nhà" mới của chúng tôi tại Đà Lạt. Chắc chắn bạn sẽ tìm thấy những phút giây an yên và những bức ảnh "sống ảo" triệu like!</p>
    `,
  },
  "hanh-trinh-1500m-tim-kiem-hat-arabica": {
    slug: "hanh-trinh-1500m-tim-kiem-hat-arabica",
    categorySlug: "coffeeholic",
    category: "Coffeeholic",
    title: "Hành trình 1500m tìm kiếm hạt Arabica tinh túy nhất Việt Nam",
    description:
      "Vượt qua những cung đường đèo hiểm trở tại Cầu Đất, chúng tôi mang về những hạt cà phê Arabica thượng hạng, kể câu chuyện về sự tận tâm của người nông dân.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
    date: "24/03/2026",
    author: "Sourcing Team",
    content: `
      <p>Cầu Đất, Lâm Đồng - với độ cao trên 1500m so với mực nước biển, khí hậu ôn đới quanh năm và thổ nhưỡng Bazan màu mỡ, được thiên nhiên ưu ái ban tặng những điều kiện hoàn hảo nhất để trồng giống cà phê Arabica.</p>

      <h3>Từ những trái chín mọng trên cành...</h3>
      <p>Hành trình của một tách cà phê Arabica thượng hạng bắt đầu từ sự tỉ mỉ của người nông dân. Tại nông trại đối tác của The Coffee House, từng trái cà phê đều được hái tay chọn lọc, đảm bảo độ chín 100% để đạt được lượng đường tự nhiên cao nhất.</p>

      <img className="gap-4" src="/assets/images/blog1.jpg" alt="Thu hoạch hạt Arabica" />

      <h3>Đến quy trình sơ chế ướt khắt khe</h3>
      <p>Để giữ trọn vẹn hương vị nguyên bản, chúng tôi áp dụng phương pháp sơ chế ướt (Washed process). Quá trình lên men được kiểm soát chặt chẽ về nhiệt độ và thời gian, giúp hạt cà phê phát triển những nốt hương hoa quả đặc trưng, vị chua thanh tao và hậu vị ngọt sâu lắng.</p>

      <p>Mỗi ngụm cà phê Arabica Cầu Đất bạn thưởng thức không chỉ là một thức uống, mà là cả một câu chuyện về sự cống hiến, tình yêu đất đai và khát vọng nâng tầm giá trị nông sản Việt.</p>
    `,
  },
  "cach-pha-ca-phe-may-chuan-vi-barista": {
    slug: "cach-pha-ca-phe-may-chuan-vi-barista",
    categorySlug: "blog",
    category: "Blog",
    title: "Cách pha cà phê máy chuẩn vị Barista ngay tại căn bếp nhỏ",
    description:
      "Bạn hoàn toàn có thể tự tay tạo ra lớp Crema béo ngậy nếu nắm vững 3 bí quyết kỹ thuật cơ bản sau đây từ các chuyên gia pha chế của chúng tôi.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    date: "23/03/2026",
    author: "Barista Trainer",
    content: `
      <p>Pha một ly Espresso ngon bằng máy pha gia đình không còn là điều quá xa vời nếu bạn hiểu được những nguyên lý cơ bản của quá trình chiết xuất.</p>

      <h3>1. Kích thước xay (Grind Size) là chìa khóa</h3>
      <p>Bột cà phê xay quá thô sẽ khiến dòng chảy nhanh, vị nhạt và chua gắt (Under-extracted). Ngược lại, xay quá mịn làm nghẹt dòng chảy, tạo ra vị đắng chát (Over-extracted). Hãy điều chỉnh máy xay từng chút một cho đến khi dòng chảy Espresso có hình dáng giống như "đuôi chuột" (mouse tail) trút xuống.</p>

      <h3>2. Kỹ thuật Tamping (Nén) chuẩn xác</h3>
      <p>Việc nén cà phê không cần một lực quá mạnh, mà quan trọng là sự <strong>đồng đều</strong> và <strong>bằng phẳng</strong>. Một bề mặt nén không phẳng sẽ gây ra hiện tượng "Channeling" - nước len qua những khe hở yếu nhất, phá hỏng toàn bộ hương vị của shot cà phê.</p>

      <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb" alt="Kỹ thuật pha cà phê máy" />

      <h3>3. Tỷ lệ vàng (Brew Ratio)</h3>
      <p>Một tỷ lệ chiết xuất phổ biến và an toàn cho người mới bắt đầu là 1:2. Nghĩa là nếu bạn sử dụng 18g bột cà phê, hãy chiết xuất ra khoảng 36g cà phê nước trong thời gian từ 25 - 30 giây.</p>

      <p>Hãy kiên nhẫn thử nghiệm và ghi chép lại các thông số. Niềm vui lớn nhất của việc tự pha cà phê chính là khoảnh khắc bạn tìm ra "công thức hoàn hảo" của riêng mình!</p>
    `,
  },
  "signature-noi-khoi-nguon-cam-hung": {
    slug: "signature-noi-khoi-nguon-cam-hung",
    categorySlug: "news",
    category: "News",
    title: "SIGNATURE - Nơi khơi nguồn cảm hứng cà phê độc bản",
    description:
      "Không gian trải nghiệm Signature mới tại Quận 1 sẽ thay đổi hoàn toàn định nghĩa về việc 'đi cà phê' của bạn, mang đến hành trình giác quan trọn vẹn.",
    image: "/assets/images/blog2.jpg",
    date: "22/03/2026",
    author: "Zerus House Team",
    content: `
      <p>Chúng tôi tự hào giới thiệu <strong>SIGNATURE</strong> - mô hình cửa hàng cao cấp nhất của Zerus Coffee, chính thức ra mắt tại trung tâm Quận 8. Đây là kết tinh của tình yêu mãnh liệt dành cho cà phê và khát khao mang đến những trải nghiệm đẳng cấp thế giới cho khách hàng Việt Nam.</p>

      <h3>Quầy Bar Mở - Sân Khấu Của Những Barista</h3>
      <p>Khác với mô hình truyền thống, trái tim của Signature là quầy bar trung tâm thiết kế 360 độ. Tại đây, mọi rào cản giữa khách hàng và Barista được xóa bỏ. Bạn có thể trò chuyện, quan sát từng thao tác pha chế điêu luyện từ Pour Over, Syphon đến những ly Signature Drink phức tạp.</p>

      <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e" alt="Không gian quầy bar Signature" />

      <h3>Bộ sưu tập hạt Specialty giới hạn</h3>
      <p>Menu tại Signature là sự quy tụ của những hạt cà phê xuất sắc nhất thế giới, có điểm Cupping từ 85 trở lên. Đặc biệt, chúng tôi tự hào mang đến những mẻ rang thủ công trực tiếp tại cửa hàng (In-store roasting), đảm bảo hương vị tươi mới đỉnh cao.</p>

      <p>Signature không chỉ là nơi bán cà phê, mà là không gian để những tâm hồn đồng điệu cùng nhau thưởng thức, học hỏi và truyền cảm hứng.</p>
    `,
  },
};
