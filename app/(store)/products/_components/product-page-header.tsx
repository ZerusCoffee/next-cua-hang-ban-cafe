export default function ProductPageHeader() {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-amber-900 to-amber-700 text-white py-12">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
          Thực đơn <span className="text-amber-200">Zerus</span>
        </h1>
        <p className="text-lg text-amber-100 max-w-2xl">
          Khám phá các loại đồ uống và snack thơm ngon, được chế biến từ những
          nguyên liệu tươi ngon nhất
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-300 rounded-full" />
            <span className="text-amber-200">Giao hàng tận nơi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
