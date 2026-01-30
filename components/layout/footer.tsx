import Image from "next/image";

const footerLinks = {
  intro: [
    { label: "Về Chúng Tôi", href: "#" },
    { label: "Sản phẩm", href: "#" },
    { label: "Khuyến mãi", href: "#" },
    { label: "Chuyện cà phê", href: "#" },
    { label: "Cửa Hàng", href: "#" },
    { label: "Tuyển dụng", href: "#" },
  ],
  terms: [
    { label: "Điều khoản sử dụng", href: "#" },
    { label: "Chính sách bảo mật thông tin", href: "#" },
    { label: "Hướng dẫn xuất hóa đơn GTGT", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* --- PHẦN TRÊN (MAIN CONTENT) --- */}
      <div className="container mx-auto px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* CỘT 1: GIỚI THIỆU */}
          <div className="space-y-4">
            <h3 className="text-amber-300 font-semibold tracking-wide text-sm uppercase mb-4">
              Giới Thiệu
            </h3>
            <ul className="space-y-3">
              {footerLinks.intro.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-amber-300 transition-all duration-300 ease-out hover:pl-2 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 2: ĐIỀU KHOẢN */}
          <div className="space-y-4">
            <h3 className="text-amber-300 font-semibold tracking-wide text-sm uppercase mb-4">
              Điều Khoản
            </h3>
            <ul className="space-y-3">
              {footerLinks.terms.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-amber-300 transition-all duration-300 ease-out hover:pl-2 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: THÔNG TIN LIÊN HỆ */}
          <div className="space-y-4">
            <h3 className="text-amber-300 font-semibold tracking-wide text-sm uppercase mb-4">
              © 2026 ZERUS COFFEE
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                <span className="text-amber-300 font-medium">VPGG:</span> 120
                Phố Yên Lãng, P. Yên Lãng, Q. Thanh Xuân, TP Hà Nội, Việt Nam
              </p>
              <p>
                <span className="text-amber-300 font-medium">Đặt hàng:</span>{" "}
                1800 6936
              </p>
              <p>
                <span className="text-amber-300 font-medium">Email:</span>{" "}
                support.hn@ggg.com.vn
              </p>
            </div>
          </div>

          {/* CỘT 4: LOGO & APP */}
          <div className="space-y-6">
            {/* Logo text */}
            <div>
              <h3 className="font-bold text-xl tracking-wider uppercase bg-linear-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                ZERUS COFFEE
              </h3>
              <p className="text-gray-400 text-xs mt-1 tracking-wide">
                Taste the difference
              </p>
            </div>

            {/* Download App */}
            <div>
              <p className="text-amber-300 font-medium mb-1 uppercase text-xs tracking-wide">
                Download App
              </p>
              <p className="text-amber-300 font-semibold mb-3 uppercase text-xs tracking-wide">
                Zerus Coffee App
              </p>

              {/* QR Code Placeholder với hiệu ứng mềm mại */}
              <div className="w-28 h-28 bg-linear-to-br from-gray-800 to-gray-900 p-2 rounded-xl shadow-inner border border-gray-700">
                <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">QR Code</span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-amber-300 font-medium mb-3 uppercase text-xs tracking-wide">
                Follow Us
              </p>
              <div className="flex gap-3">
                {["facebook", "youtube", "instagram"].map((platform) => (
                  <a
                    href="#"
                    key={platform}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-amber-300/20 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-amber-300/30"
                  >
                    <div className="relative w-5 h-5">
                      <Image
                        src={`/assets/images/${platform}.png`}
                        alt={`${platform} icon`}
                        fill
                        className="object-contain"
                        sizes="20px"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PHẦN DƯỚI (COPYRIGHT & INFO) --- */}
      <div className="border-t border-gray-800 bg-linear-to-t from-gray-900/50 to-transparent">
        <div className="container mx-auto px-10 py-8">
          <div className="text-xs text-gray-400 space-y-2 max-w-3xl">
            <p className="text-white font-semibold mb-2 text-sm">
              Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN
            </p>
            <p className="leading-relaxed">
              Mã số DN: 0312867172 do sở kế hoạch và đầu tư tp. HCM cấp ngày
              23/07/2014. Người đại diện: Phùng Thanh Độ
            </p>
            <p className="leading-relaxed">
              Địa chỉ: 120 Phố Yên Lãng, P. Yên Lãng, Q. Thanh Xuân, TP Hà Nội,
              Việt Nam thoại: (028) 7107 8079 Email: hi@thecoffeehouse.vn
            </p>
            <p className="pt-2 text-gray-500">
              © 2026-2027 Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN mọi
              quyền bảo lưu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
