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
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Wallet,
  Smartphone,
  Building,
  Shield,
  Lock,
  CheckCircle,
} from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Phương thức thanh toán</h1>
              <p className="text-gray-600 mt-2">
                Quản lý các phương thức thanh toán của bạn
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
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
                  {(newMethodType === "credit-card" || newMethodType === "debit-card") && (
                    <div className="space-y-4">
                      <div>
                        <Label>Số thẻ</Label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Ngày hết hạn</Label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input placeholder="123" type="password" maxLength={3} />
                        </div>
                      </div>
                      <div>
                        <Label>Tên chủ thẻ</Label>
                        <Input placeholder="NGUYEN VAN A" />
                      </div>
                    </div>
                  )}

                  {/* E-wallet Form */}
                  {newMethodType === "e-wallet" && (
                    <div className="space-y-4">
                      <div>
                        <Label>Chọn ví điện tử</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <Button variant="outline" type="button">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-pink-500 rounded"></div>
                              MoMo
                            </div>
                          </Button>
                          <Button variant="outline" type="button">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-500 rounded"></div>
                              ZaloPay
                            </div>
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Số điện thoại</Label>
                        <Input placeholder="0987 654 321" />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Hủy
                    </Button>
                    <Button type="submit">Thêm phương thức</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Separator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Phương thức thanh toán đã lưu</CardTitle>
                <CardDescription>
                  {paymentMethods.length} phương thức thanh toán
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`border-2 relative ${
                        method.isDefault ? "border-primary" : "border-gray-200"
                      }`}
                    >
                      <CardContent className="p-6">
                        {method.isDefault && (
                          <Badge className="absolute top-3 right-3 bg-primary">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mặc định
                          </Badge>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                              {getPaymentIcon(method.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{method.name}</h3>
                                <Badge variant="outline">{method.issuer}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">
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
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add New Method Card */}
                  <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
                    <CardContent className="p-6">
                      <button
                        onClick={() => setIsDialogOpen(true)}
                        className="w-full flex flex-col items-center justify-center py-8"
                      >
                        <div className="p-3 bg-gray-100 rounded-full mb-4">
                          <Plus className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Thêm phương thức thanh toán</h3>
                        <p className="text-sm text-gray-500 text-center">
                          Thêm thẻ hoặc ví điện tử mới
                        </p>
                      </button>
                    </CardContent>
                  </Card>
                </div>

                {/* Empty State */}
                {paymentMethods.length === 0 && (
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Chưa có phương thức thanh toán nào
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Thêm phương thức thanh toán để mua sắm nhanh chóng hơn
                    </p>
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm phương thức đầu tiên
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Lịch sử giao dịch</CardTitle>
                <CardDescription>
                  Các giao dịch gần đây
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, date: "2024-01-15", amount: 1250000, method: "Visa ****4242", status: "Thành công" },
                    { id: 2, date: "2024-01-10", amount: 450000, method: "MoMo", status: "Thành công" },
                    { id: 3, date: "2024-01-05", amount: 2850000, method: "Mastercard ****8888", status: "Thành công" },
                  ].map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.date}</p>
                        <p className="text-sm text-gray-500">{transaction.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{transaction.amount.toLocaleString()}đ</p>
                        <Badge className="bg-green-100 text-green-800">{transaction.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security & Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bảo mật thanh toán</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Bảo mật PCI DSS</p>
                    <p className="text-sm text-gray-600">Tuân thủ tiêu chuẩn bảo mật quốc tế</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Lock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Mã hóa SSL 256-bit</p>
                    <p className="text-sm text-gray-600">Bảo vệ thông tin thanh toán</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chính sách thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                    <span>Chúng tôi không lưu trữ thông tin thẻ của bạn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                    <span>Mọi giao dịch đều được mã hóa end-to-end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                    <span>Hoàn tiền trong vòng 7-14 ngày làm việc</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                    <span>Hỗ trợ đa dạng phương thức thanh toán</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hỗ trợ thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Câu hỏi thường gặp
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Hướng dẫn thanh toán
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Liên hệ hỗ trợ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}