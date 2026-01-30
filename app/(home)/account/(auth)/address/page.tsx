"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Home,
  Briefcase,
  Check,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const addressSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  type: z.enum(["home", "office"]),
  isDefault: z.boolean(),
});

type AddressFormData = z.infer<typeof addressSchema>;

const provinces = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
];

const addresses = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    phone: "0987654321",
    address: "123 Đường ABC, Phường XYZ",
    district: "Quận 1",
    province: "TP. Hồ Chí Minh",
    ward: "Phường Bến Nghé",
    type: "home" as const,
    isDefault: true,
  },
  {
    id: 2,
    fullName: "Nguyễn Văn A",
    phone: "0987654322",
    address: "456 Đường DEF, Phường UVW",
    district: "Quận 3",
    province: "TP. Hồ Chí Minh",
    ward: "Phường 5",
    type: "office" as const,
    isDefault: false,
  },
];

export default function AddressPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      address: "",
      type: "home",
      isDefault: false,
    },
  });

  const onSubmit = (data: AddressFormData) => {
    console.log(data);
    setIsDialogOpen(false);
    form.reset();
  };

  const handleEdit = (id: number) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      form.reset(address);
      setEditingAddress(id);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      console.log("Delete address:", id);
    }
  };

  const handleAddNew = () => {
    form.reset({
      fullName: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      address: "",
      type: "home",
      isDefault: false,
    });
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sổ địa chỉ</h1>
              <p className="text-gray-600 mt-2">
                Quản lý địa chỉ giao hàng của bạn
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm địa chỉ mới
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                  </DialogTitle>
                  <DialogDescription>
                    Thêm địa chỉ giao hàng mới để thuận tiện cho việc mua sắm
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Họ và tên *</FormLabel>
                            <FormControl>
                              <Input placeholder="Nguyễn Văn A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số điện thoại *</FormLabel>
                            <FormControl>
                              <Input placeholder="0987654321" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tỉnh/Thành phố *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {provinces.map((province) => (
                                  <SelectItem key={province} value={province}>
                                    {province}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quận/Huyện *</FormLabel>
                            <FormControl>
                              <Input placeholder="Quận 1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phường/Xã *</FormLabel>
                            <FormControl>
                              <Input placeholder="Phường Bến Nghé" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ chi tiết *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Số nhà, tên đường, tòa nhà..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loại địa chỉ</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn loại địa chỉ" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="home">
                                  <div className="flex items-center gap-2">
                                    <Home className="h-4 w-4" />
                                    Nhà riêng
                                  </div>
                                </SelectItem>
                                <SelectItem value="office">
                                  <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    Văn phòng
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isDefault"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Đặt làm địa chỉ mặc định
                              </FormLabel>
                              <p className="text-sm text-gray-500">
                                Sử dụng địa chỉ này làm mặc định
                              </p>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Hủy
                      </Button>
                      <Button type="submit">
                        {editingAddress ? "Cập nhật" : "Thêm địa chỉ"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <Separator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Address List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Địa chỉ của bạn</CardTitle>
                <CardDescription>
                  {addresses.length} địa chỉ đã lưu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <Card
                      key={address.id}
                      className={`border-2 relative ${
                        address.isDefault ? "border-primary" : "border-gray-200"
                      }`}
                    >
                      <CardContent className="p-6">
                        {address.isDefault && (
                          <Badge className="absolute top-3 right-3 bg-primary">
                            <Check className="h-3 w-3 mr-1" />
                            Mặc định
                          </Badge>
                        )}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {address.type === "home" ? (
                                <Home className="h-5 w-5 text-gray-600" />
                              ) : (
                                <Briefcase className="h-5 w-5 text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{address.fullName}</h3>
                                <Badge variant="outline">
                                  {address.type === "home" ? "Nhà riêng" : "Văn phòng"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                              <p className="text-sm">
                                {address.address}, {address.ward}, {address.district}, {address.province}
                              </p>
                            </div>
                          </div>

                          <Separator />

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleEdit(address.id)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Chỉnh sửa
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleDelete(address.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add New Address Card */}
                  <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-50">
                      <div className="p-3 bg-gray-100 rounded-full mb-4">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="font-semibold mb-2">Thêm địa chỉ mới</h3>
                      <p className="text-sm text-gray-500 text-center mb-4">
                        Thêm địa chỉ giao hàng mới để thuận tiện cho việc mua sắm
                      </p>
                      <Button variant="outline" onClick={handleAddNew}>
                        Thêm địa chỉ
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Empty State */}
                {addresses.length === 0 && (
                  <div className="text-center py-12">
                    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Chưa có địa chỉ nào
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Thêm địa chỉ giao hàng để bắt đầu mua sắm
                    </p>
                    <Button onClick={handleAddNew}>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm địa chỉ đầu tiên
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hướng dẫn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Địa chỉ mặc định
                  </h4>
                  <p className="text-sm text-gray-600">
                    Địa chỉ mặc định sẽ được tự động chọn khi bạn đặt hàng
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    Loại địa chỉ
                  </h4>
                  <p className="text-sm text-gray-600">
                    Phân loại địa chỉ giúp bạn dễ dàng quản lý hơn
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-purple-500" />
                    Giới hạn địa chỉ
                  </h4>
                  <p className="text-sm text-gray-600">
                    Bạn có thể lưu tối đa 10 địa chỉ
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mẹo hữu ích</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                    <span>Đảm bảo số điện thoại chính xác để nhận thông báo giao hàng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                    <span>Ghi rõ số nhà, tên đường để dễ dàng tìm kiếm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                    <span>Cập nhật địa chỉ thường xuyên khi có thay đổi</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}