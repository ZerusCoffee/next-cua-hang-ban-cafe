import { useFormContext } from "react-hook-form";
import { CreditCard, Truck } from "lucide-react";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PaymentStep() {
  const { control } = useFormContext();

  return (
    <>
      <CardHeader className="bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg"><CreditCard className="h-6 w-6 text-primary" /></div>
          <div>
            <CardTitle className="text-2xl text-gray-900">Phương thức thanh toán</CardTitle>
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
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                  {[
                    { id: "cod", label: "COD", desc: "Thanh toán khi nhận hàng", icon: <Truck className="h-5 w-5" /> },
                    { id: "vnpay", label: "VNPAY", desc: "Cổng thanh toán VNPAY", color: "text-blue-600" },
                    { id: "momo", label: "MOMO", desc: "Ví điện tử Momo", color: "text-pink-600" },
                  ].map((item) => (
                    <div key={item.id} className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer ${field.value === item.id ? "border-primary bg-primary/5" : "border-gray-200"}`}>
                      <RadioGroupItem value={item.id} id={item.id} />
                      <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                        <span className="font-medium">{item.label}</span>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </Label>
                      {item.icon || <span className={`text-sm font-bold ${item.color}`}>{item.label}</span>}
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
              <FormControl><Textarea placeholder="Ghi chú cho người giao hàng..." {...field} /></FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </>
  );
}