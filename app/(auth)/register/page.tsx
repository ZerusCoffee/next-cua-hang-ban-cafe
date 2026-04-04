import { RegisterForm } from "@/components/form/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800">
              Đăng ký
            </h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Tạo tài khoản mới của bạn
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
