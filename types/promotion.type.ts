export type Promotion = {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  category: string;
  image: string;
  startDate: string;
  endDate: string;
  desc: string;
  discountCode?: string;
};

export type PromotionDetail = {
  slug: string;
  categorySlug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  content: string;
  terms: string[];
};

export type PromotionCategory = {
  name: string;
  slug: string;
};

export const promotionCategories: PromotionCategory[] = [
  { name: "Tất cả", slug: "" },
  { name: "Ưu đãi mới", slug: "new" },
  { name: "Đặc quyền thành viên", slug: "membership" },
  { name: "Sự kiện", slug: "events" },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: "1",
    title: "Chào bạn mới - Nhận ngay ưu đãi 50% cho đơn đầu tiên",
    slug: "chao-ban-moi-uu-dai-50-phan-tram",
    categorySlug: "new",
    category: "Ưu đãi mới",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    startDate: "01/04/2026",
    endDate: "30/04/2026",
    desc: "Đăng ký tài khoản ngay hôm nay để nhận mã giảm giá 50% áp dụng cho tất cả đồ uống tại hệ thống Zerus Coffee.",
    discountCode: "WELCOME50",
  },
  {
    id: "2",
    title: "Mua 2 Tặng 1 - Ngày hội Coffeeholic hàng tuần",
    slug: "mua-2-tang-1-ngay-hoi-coffeeholic",
    categorySlug: "events",
    category: "Sự kiện",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    startDate: "05/04/2026",
    endDate: "26/04/2026",
    desc: "Duy nhất vào thứ 4 hàng tuần, khi mua 2 ly cà phê bất kỳ bạn sẽ được tặng ngay 1 ly cùng loại hoặc giá trị thấp hơn.",
  },
  {
    id: "3",
    title: "Thăng hạng thành viên - Nhận quà cực 'chill'",
    slug: "thang-hang-thanh-vien-nhan-qua-chill",
    categorySlug: "membership",
    category: "Đặc quyền thành viên",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
    startDate: "01/01/2026",
    endDate: "31/12/2026",
    desc: "Chương trình tích điểm đổi quà dành riêng cho khách hàng thân thiết. Càng uống nhiều, quà càng to!",
  },
  {
    id: "4",
    title: "Combo Bữa Sáng Năng Lượng chỉ từ 49.000đ",
    slug: "combo-bua-sang-nang-luong",
    categorySlug: "new",
    category: "Ưu đãi mới",
    image: "/assets/images/blog2.jpg",
    startDate: "10/04/2026",
    endDate: "10/05/2026",
    desc: "Bắt đầu ngày mới tràn đầy hứng khởi với combo 1 bánh mì kẹp và 1 ly cà phê sữa đá truyền thống.",
    discountCode: "BREAKFAST49",
  },
];
