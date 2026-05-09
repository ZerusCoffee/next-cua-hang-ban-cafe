"use client";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Building,
  CheckCircle,
  CreditCard,
  Edit,
  Lock,
  Plus,
  Shield,
  Smartphone,
  Trash2,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  {
    id: 1,
    type: "credit-card" as const,
    name: "Thẻ tín dụng",
    lastFour: "4242",
    expiry: "12/25",
    issuer: "Visa",
    isDefault: true,
  },
  {
    id: 2,
    type: "debit-card" as const,
    name: "Thẻ ghi nợ",
    lastFour: "8888",
    expiry: "10/24",
    issuer: "Mastercard",
    isDefault: false,
  },
  {
    id: 3,
    type: "e-wallet" as const,
    name: "Ví điện tử",
    wallet: "Momo",
    phone: "0987****89",
    isDefault: false,
  },
];

const getPaymentIcon = (type: string) => {
  switch (type) {
    case "credit-card":
    case "debit-card":
      return <CreditCard className="h-5 w-5" />;
    case "e-wallet":
      return <Smartphone className="h-5 w-5" />;
    case "bank-transfer":
      return <Building className="h-5 w-5" />;
    default:
      return <Wallet className="h-5 w-5" />;
  }
};

export default function PaymentPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMethodType, setNewMethodType] = useState("credit-card");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Phương thức thanh toán
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý các phương thức thanh toán của bạn
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Thêm phương thức
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Thêm phương thức thanh toán</DialogTitle>
              <DialogDescription>
                Chọn loại phương thức thanh toán bạn muốn thêm
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <RadioGroup
                value={newMethodType}
                onValueChange={setNewMethodType}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="credit-card"
                    id="credit-card"
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor="credit-card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <CreditCard className="mb-3 h-6 w-6" />
                    <span>Thẻ tín dụng</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="debit-card"
                    id="debit-card"
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor="debit-card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <CreditCard className="mb-3 h-6 w-6" />
                    <span>Thẻ ghi nợ</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="e-wallet"
                    id="e-wallet"
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor="e-wallet"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Smartphone className="mb-3 h-6 w-6" />
                    <span>Ví điện tử</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="bank-transfer"
                    id="bank-transfer"
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor="bank-transfer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Building className="mb-3 h-6 w-6" />
                    <span>Chuyển khoản</span>
                  </Label>
                </div>
              </RadioGroup>

              {/* Credit/Debit Card Form */}
              {(newMethodType === "credit-card" ||
                newMethodType === "debit-card") && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">Số thẻ</Label>
                    <Input placeholder="1234 5678 9012 3456" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Ngày hết hạn</Label>
                      <Input placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">CVV</Label>
                      <Input
                        placeholder="123"
                        type="password"
                        maxLength={3}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Tên chủ thẻ</Label>
                    <Input placeholder="NGUYEN VAN A" className="mt-1" />
                  </div>
                </div>
              )}

              {/* E-wallet Form */}
              {newMethodType === "e-wallet" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">Chọn ví điện tử</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button variant="outline" type="button" size="sm">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-pink-500 rounded"></div>
                          MoMo
                        </div>
                      </Button>
                      <Button variant="outline" type="button" size="sm">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-blue-500 rounded"></div>
                          ZaloPay
                        </div>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Số điện thoại</Label>
                    <Input placeholder="0987 654 321" className="mt-1" />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit" size="sm">
                  Thêm phương thức
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="shadow-sm border-gray-200/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Phương thức thanh toán đã lưu
              </CardTitle>
              <CardDescription className="text-xs">
                {paymentMethods.length} phương thức thanh toán
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <Card
                    key={method.id}
                    className={`border transition-all relative ${
                      method.isDefault
                        ? "border-primary bg-primary/5"
                        : "border-gray-100"
                    }`}
                  >
                    <CardContent className="p-4">
                      {method.isDefault && (
                        <Badge className="absolute top-3 right-3 bg-primary text-[10px] h-5">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mặc định
                        </Badge>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm shrink-0">
                            {getPaymentIcon(method.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-semibold text-sm">
                                {method.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-[10px] py-0"
                              >
                                {method.issuer}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500">
                              {method.type.includes("card") ? (
                                <>
                                  **** **** **** {method.lastFour}
                                  <span className="mx-2">•</span>
                                  Hết hạn: {method.expiry}
                                </>
                              ) : (
                                <>
                                  {method.wallet}
                                  <span className="mx-2">•</span>
                                  {method.phone}
                                </>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-primary hover:bg-primary/5"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add New Method Card */}
                <Card
                  className="border border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <CardContent className="p-6">
                    <div className="w-full flex flex-col items-center justify-center py-4">
                      <div className="p-2 bg-gray-50 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="h-5 w-5 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        Thêm phương thức mới
                      </h3>
                      <p className="text-xs text-gray-500 text-center">
                        Thêm thẻ hoặc ví điện tử mới
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {paymentMethods.length === 0 && (
                <div className="text-center py-16">
                  <CreditCard className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Chưa có phương thức thanh toán nào
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Thêm phương thức thanh toán để mua sắm nhanh chóng hơn
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm phương thức đầu tiên
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="shadow-sm border-gray-200/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Lịch sử giao dịch</CardTitle>
              <CardDescription className="text-xs">
                Các giao dịch gần đây
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    date: "2024-01-15",
                    amount: 1250000,
                    method: "Visa ****4242",
                    status: "Thành công",
                  },
                  {
                    id: 2,
                    date: "2024-01-10",
                    amount: 450000,
                    method: "MoMo",
                    status: "Thành công",
                  },
                  {
                    id: 3,
                    date: "2024-01-05",
                    amount: 2850000,
                    method: "Mastercard ****8888",
                    status: "Thành công",
                  },
                ].map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 border border-gray-50 rounded-lg hover:bg-gray-50/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.date}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {transaction.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {transaction.amount.toLocaleString()}đ
                      </p>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] h-5 border-0">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security & Info */}
        <div className="space-y-6">
          <Card className="shadow-sm border-gray-200/80">
            <CardHeader>
              <CardTitle className="text-base">Bảo mật thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <Shield className="h-5 w-5 text-green-600 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-green-900">
                    Bảo mật PCI DSS
                  </p>
                  <p className="text-[10px] text-green-700">
                    Tuân thủ tiêu chuẩn quốc tế
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Lock className="h-5 w-5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-blue-900">
                    Mã hóa SSL 256-bit
                  </p>
                  <p className="text-[10px] text-blue-700">
                    Bảo vệ thông tin tuyệt đối
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200/80">
            <CardHeader>
              <CardTitle className="text-base">Chính sách</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-[11px] text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                  <span>Không lưu trữ thông tin thẻ trực tiếp</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                  <span>Giao dịch mã hóa end-to-end</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                  <span>Hoàn tiền nhanh chóng từ 7-14 ngày</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                  <span>Hỗ trợ đa dạng các loại thẻ và ví</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200/80">
            <CardHeader>
              <CardTitle className="text-base">Hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-[11px] h-9"
                >
                  Câu hỏi thường gặp
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-[11px] h-9"
                >
                  Hướng dẫn thanh toán
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-[11px] h-9"
                >
                  Liên hệ hỗ trợ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
