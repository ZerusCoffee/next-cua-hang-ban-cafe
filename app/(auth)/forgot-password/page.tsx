import { ForgotPasswordForm } from "@/components/form/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800">
              Quên mật khẩu
            </h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Nhập email của bạn để lấy lại mật khẩu
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
