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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAddress, useDeleteAddress } from "@/services/address";
import { Address } from "@/types/address.type";
import {
  CheckCircle,
  Edit,
  Home,
  MapPin,
  MoreHorizontal,
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
  const { deleteAddressById } = useDeleteAddress();

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
    <div className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sổ địa chỉ</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý tất cả địa chỉ giao hàng của bạn
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          disabled={isLoading}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm địa chỉ mới
        </Button>
      </div>

      <Card className="shadow-sm border-gray-200/80 overflow-hidden">
        <CardHeader className="bg-gray-50/50 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Danh sách địa chỉ</CardTitle>
              <CardDescription className="text-xs">
                {isLoading
                  ? "Đang tải dữ liệu..."
                  : `Tổng cộng ${addresses?.length || 0} địa chỉ đã lưu`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : addresses && addresses.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                    <TableHead className="w-50 px-6 font-bold text-gray-900">
                      Người nhận
                    </TableHead>
                    <TableHead className="w-37.5 px-4 font-bold text-gray-900">
                      Điện thoại
                    </TableHead>
                    <TableHead className="px-4 font-bold text-gray-900">
                      Địa chỉ chi tiết
                    </TableHead>
                    <TableHead className="w-25 text-right pr-6 font-bold text-gray-900">
                      Thao tác
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {addresses.map((address) => (
                    <TableRow
                      key={address.id}
                      className={cn(
                        "hover:bg-gray-50/50",
                        address.is_default &&
                          "bg-primary/5 hover:bg-primary/10",
                      )}
                    >
                      <TableCell className="py-4 px-6 whitespace-normal">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-bold text-sm text-gray-900">
                              {address.full_name}
                            </span>
                          </div>
                          {address.is_default && (
                            <Badge
                              variant="secondary"
                              className="w-fit bg-green-100 text-green-700 text-[10px] h-5 border-0 font-bold"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mặc định
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-4 whitespace-normal">
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {address.phone}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-4 whitespace-normal">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                            <Home className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                            <span>{address.details}</span>
                          </div>
                          <div className="text-xs text-gray-500 ml-6">
                            {address.ward}, {address.province}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-right pr-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem
                              onClick={() => handleEdit(address)}
                              className="cursor-pointer text-sm font-medium"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(address.id)}
                              className="text-red-600 focus:text-red-600 cursor-pointer text-sm font-medium"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
                <MapPin className="h-12 w-12 text-gray-200" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Chưa có địa chỉ nào
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                Bạn chưa lưu địa chỉ giao hàng nào. Hãy thêm địa chỉ để thanh
                toán nhanh hơn.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Thêm địa chỉ đầu tiên
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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
