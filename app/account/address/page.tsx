"use client";

import AddAddressDialog from "@/components/dialog/add-address-dialog";
import EditAddressDialog from "@/components/dialog/edit-address-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddress, useDeleteAddress } from "@/services/address";
import { Address } from "@/types/address.type";
import {
  Check,
  Edit,
  Home,
  MapPin,
  Phone,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddressPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const { addresses, isLoading, mutate } = useAddress();
  const { deleteAddressById } = useDeleteAddress()
  const handleEdit = (address: Address) => {
    setSelectedAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      try {
        await deleteAddressById(id);
        toast.success("Xóa địa chỉ thành công!");
        mutate();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        toast.error("Lỗi khi xóa địa chỉ");
      }
    }
  };

  const handleSuccess = () => {
    mutate();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Sổ địa chỉ
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Quản lý địa chỉ giao hàng của bạn
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Thêm địa chỉ mới
            </Button>
          </div>
          <Separator className="bg-gray-200" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Address List */}
          <div className="flex-1">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-linear-to-r from-primary/5 to-transparent">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-gray-900">
                      Địa chỉ của bạn
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {isLoading
                        ? "Đang tải địa chỉ..."
                        : `Bạn có ${addresses?.length || 0} địa chỉ đã lưu`}
                    </CardDescription>
                  </div>
                  {!isLoading && (addresses?.length || 0) > 0 && (
                    <Badge variant="outline" className="px-3 py-1">
                      {addresses?.length || 0} địa chỉ
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Loading State */}
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="border-gray-200">
                        <CardContent className="p-6 space-y-4">
                          <Skeleton className="h-6 w-1/2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <div className="flex gap-2 pt-4">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 flex-1" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Address List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses?.map((address) => (
                        <Card
                          key={address.id}
                          className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${
                            address.is_default
                              ? "border-green-500 shadow-md"
                              : "border-gray-200 hover:border-primary/30"
                          }`}
                        >
                          {address.is_default && (
                            <div className="absolute top-0 right-0">
                              <Badge className="rounded-none rounded-bl-lg bg-green-500">
                                <Check className="h-3 w-3 mr-1" />
                                Mặc định
                              </Badge>
                            </div>
                          )}

                          <CardContent className="p-6">
                            <div className="space-y-4">
                              {/* Contact Info */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-gray-500" />
                                  <h3 className="font-bold text-lg text-gray-900">
                                    {address.full_name}
                                  </h3>
                                </div>

                                <div className="flex items-center gap-2 text-gray-600">
                                  <Phone className="h-4 w-4" />
                                  <span className="font-medium">
                                    {address.phone}
                                  </span>
                                </div>

                                <div className="flex items-start gap-2 pt-2">
                                  <Home className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                                  <div className="text-gray-700">
                                    <p className="font-medium mb-1">
                                      Địa chỉ giao hàng:
                                    </p>
                                    <p className="text-sm">{address.details}</p>
                                    <p className="text-sm">
                                      {address.ward}, {address.province}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                                  onClick={() => handleEdit(address)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Chỉnh sửa
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-red-500"
                                  onClick={() => handleDelete(address.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Xóa
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Empty State */}
                    {!isLoading && (addresses?.length || 0) === 0 && (
                      <div className="text-center py-16">
                        <div className="inline-flex p-4 bg-gray-100 rounded-full mb-6">
                          <MapPin className="h-16 w-16 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Chưa có địa chỉ nào
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Bạn chưa lưu địa chỉ giao hàng nào. Hãy thêm địa chỉ
                          để trải nghiệm mua sắm thuận tiện hơn!
                        </p>
                        <Button
                          onClick={() => setIsAddDialogOpen(true)}
                          className="bg-primary hover:bg-primary/90"
                          size="lg"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Thêm địa chỉ đầu tiên
                        </Button>
                      </div>
                    )}

                    {/* Add Address Card - Always visible when not loading */}
                    {(addresses?.length || 0) > 0 && (
                      <div className="mt-6">
                        <Card
                          className="border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          <CardContent className="p-8">
                            <div className="flex flex-col items-center justify-center text-center">
                              <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                <Plus className="h-8 w-8 text-primary" />
                              </div>
                              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                                Thêm địa chỉ mới
                              </h3>
                              <p className="text-gray-600 text-sm max-w-xs">
                                Thêm địa chỉ giao hàng để có thêm lựa chọn khi
                                đặt hàng
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tips/Guide */}
          <div className="lg:w-80 space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Mẹo hữu ích
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        Địa chỉ mặc định
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Đặt một địa chỉ làm mặc định để thuận tiện cho việc
                        thanh toán nhanh.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        Cập nhật thường xuyên
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Đảm bảo thông tin địa chỉ luôn chính xác để không ảnh
                        hưởng đến quá trình giao hàng.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        Thêm nhiều địa chỉ
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Lưu địa chỉ nhà, công ty hoặc người thân để linh hoạt
                        khi đặt hàng.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Thống kê</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tổng địa chỉ</span>
                    <span className="font-bold text-lg">
                      {addresses?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Địa chỉ mặc định</span>
                    <span className="font-bold text-green-600">
                      {addresses?.filter((addr) => addr.is_default).length || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AddAddressDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={handleSuccess}
      />

      {selectedAddress && (
        <EditAddressDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          editingAddress={selectedAddress}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
