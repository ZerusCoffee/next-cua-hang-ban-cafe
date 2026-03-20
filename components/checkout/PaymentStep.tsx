"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Truck } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export function PaymentStep() {
  const { control } = useFormContext();

  const paymentOptions = [
    {
      id: "cod",
      label: "COD",
      desc: "Thanh toán khi nhận hàng",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "vnpay",
      label: "VNPAY",
      desc: "Cổng thanh toán VNPAY",
      logo: "/assets/images/vnpay.png",
    },
    {
      id: "momo",
      label: "MOMO",
      desc: "Ví điện tử Momo",
      logo: "/assets/images/momo.png",
    },
    {
      id: "paypal",
      label: "PayPal / Credit Card",
      desc: "PayPal hoặc thẻ tín dụng/ghi nợ",
      logo: "/assets/images/paypal.png",
    },
  ];

  return (
    <>
      <CardHeader className="bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl text-gray-900">
              Phương thức thanh toán
            </CardTitle>
            <CardDescription>Chọn cách bạn muốn thanh toán</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <FormField
          control={control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-3"
                >
                  {paymentOptions.map((item) => (
                    <div key={item.id}>
                      {/* Radio row */}
                      <div
                        className={`flex items-center gap-3 border-2 rounded-lg p-3 cursor-pointer transition-all ${
                          field.value === item.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem
                          value={item.id}
                          id={item.id}
                          className="mt-0"
                        />
                        <Label
                          htmlFor={item.id}
                          className="flex-1 cursor-pointer flex items-center gap-2"
                        >
                          <div className="flex-1">
                            <span className="font-medium text-sm block">
                              {item.label}
                            </span>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                          {item.icon ? (
                            <div className="text-gray-600">{item.icon}</div>
                          ) : item.logo ? (
                            <div className="relative w-12 h-6 shrink-0">
                              <Image
                                src={item.logo}
                                alt={item.label}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : null}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="customer_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú đơn hàng</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ghi chú cho người giao hàng..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </>
  );
}
