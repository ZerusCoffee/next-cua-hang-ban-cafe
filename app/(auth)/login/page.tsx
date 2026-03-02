import { LoginForm } from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Main text bên trái */}
        <div className="hidden md:flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Đăng nhập tài khoản
              <span className="block text-amber-800 mt-2">ZERUS COFFEE</span>
            </h1>

            <p className="text-gray-700 text-lg md:text-xl mb-6">
              Khám phá trải nghiệm cà phê đặc biệt và thưởng thức những khoảnh
              khắc tuyệt vời
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-1 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Đặt hàng nhanh chóng
                </h3>
                <p className="text-gray-600">
                  Mua sắm dễ dàng với vài cú nhấp chuột
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-1 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Tích điểm ưu đãi
                </h3>
                <p className="text-gray-600">
                  Nhận nhiều phần quà và khuyến mãi hấp dẫn
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-1 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Lịch sử đơn hàng
                </h3>
                <p className="text-gray-600">
                  Theo dõi và quản lý đơn hàng dễ dàng
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-1 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Thanh toán an toàn
                </h3>
                <p className="text-gray-600">
                  Bảo mật thông tin với công nghệ tiên tiến
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form login bên phải */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-amber-800">Đăng nhập</h2>
                <p className="text-gray-600 mt-2">Nhập thông tin để tiếp tục</p>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
