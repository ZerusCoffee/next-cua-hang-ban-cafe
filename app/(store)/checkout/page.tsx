"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAddress, useDefaultAddress } from "@/services/address";
import { CheckOut } from "@/services/checkout";
import { useCouponPreview } from "@/services/coupon";
import { Address } from "@/types/address.type";
import {
  CheckoutRequest,
  CheckoutRequestSchema,
} from "@/validation/checkout.schema";

import { AddressStep } from "@/components/checkout/AddressStep";
import { CheckoutStepper } from "@/components/checkout/components/checkout-stepper";
import { CouponStep } from "@/components/checkout/CouponStep";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentStep } from "@/components/checkout/PaymentStep";
import { ReviewStep } from "@/components/checkout/ReviewStep";
import AddAddressDialog from "@/components/dialog/add-address-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useCart } from "@/hooks/use-cart";

type Step = "address" | "coupon" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoading: cartLoading, mutate } = useCart();
  const { addresses, mutate: refreshAddresses } = useAddress();
  const { address } = useDefaultAddress();

  const [step, setStep] = useState<Step>("address");
  const [processing, setProcessing] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isPaidViaPayPal, setIsPaidViaPayPal] = useState(false);

  const form = useForm<CheckoutRequest>({
    resolver: zodResolver(CheckoutRequestSchema),
    defaultValues: {
      payment_method: "cod",
      customer_notes: "",
      coupon_code: "",
    },
  });

  const couponCode = form.watch("coupon_code");
  const { error: couponError, isLoading: couponPreviewLoading } =
    useCouponPreview(couponCode || null);

  const defaultAddress = address || null;

  useEffect(() => {
    if (!defaultAddress && !selectedAddress) return;
    else if (defaultAddress && !selectedAddress) {
      setSelectedAddress(defaultAddress);
      form.setValue("shipping_full_name", defaultAddress.full_name);
      form.setValue("shipping_phone", defaultAddress.phone);
      form.setValue("shipping_province", defaultAddress.province);
      form.setValue("shipping_ward", defaultAddress.ward);
      form.setValue("shipping_address_details", defaultAddress.details);
    } else {
      setSelectedAddress(selectedAddress);
      if (!selectedAddress) return;
      form.setValue("shipping_full_name", selectedAddress.full_name);
      form.setValue("shipping_phone", selectedAddress.phone);
      form.setValue("shipping_province", selectedAddress.province);
      form.setValue("shipping_ward", selectedAddress.ward);
      form.setValue("shipping_address_details", selectedAddress.details);
    }
  }, [defaultAddress, form, selectedAddress]);

  const paymentMethod = form.watch("payment_method");
  const isPayPalReview = step === "review" && paymentMethod === "paypal";

  const onHandleSubmit = async (data: CheckoutRequest) => {
    setProcessing(true);
    try {
      const res = await CheckOut(data);
      mutate(null, false);
      if (res.data.payment_method === "cod" || isPaidViaPayPal) {
        router.push(`/account/orders/${res.data.order_number}`);
      } else {
        router.push(
          res.data.payment_url ?? `/account/orders/${res.data.order_number}`,
        );
      }
      toast.success("Đặt hàng thành công!");
    } catch (e) {
      toast.error("Lỗi đặt hàng" + e);
    } finally {
      setProcessing(false);
    }
  };

  const nextStep = () => {
    if (step === "address") setStep("coupon");
    else if (step === "coupon") setStep("payment");
    else if (step === "payment") setStep("review");
  };

  const prevStep = () => {
    if (step === "coupon") setStep("address");
    else if (step === "payment") setStep("coupon");
    else if (step === "review") setStep("payment");
  };

  const isContinueDisabled =
    processing ||
    !selectedAddress ||
    (couponCode && couponError) ||
    couponPreviewLoading;

  if (cartLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <div className="min-h-screen bg-gray-50/50 py-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <CheckoutStepper currentStep={step} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-xl overflow-hidden">
                  {step === "address" && (
                    <AddressStep
                      addresses={addresses || []}
                      selectedAddress={selectedAddress}
                      onSelect={(addr) => setSelectedAddress(addr)}
                      onAddNew={() => setIsAddAddressOpen(true)}
                    />
                  )}
                  {step === "coupon" && <CouponStep />}
                  {step === "payment" && <PaymentStep />}
                  {step === "review" && (
                    <ReviewStep
                      selectedAddress={selectedAddress}
                      cart={cart}
                      onPayPalSuccess={(details) => {
                        const orderNumber = details?.order_number;
                        if (orderNumber) {
                          router.push(`/account/orders/${orderNumber}`);
                        } else {
                          router.push("/account/orders");
                        }
                      }}
                    />
                  )}
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    className={step === "address" ? "invisible" : ""}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại
                  </Button>

                  {!isPayPalReview && (
                    <Button
                      type="button"
                      size="lg"
                      className={
                        step === "review"
                          ? "bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold"
                          : "bg-primary text-white font-bold"
                      }
                      disabled={isContinueDisabled as boolean}
                      onClick={
                        step === "review"
                          ? form.handleSubmit(onHandleSubmit)
                          : nextStep
                      }
                    >
                      {processing || couponPreviewLoading ? (
                        <Loader2 className="animate-spin mr-2" />
                      ) : null}
                      {step === "review" ? "Xác nhận đặt hàng" : "Tiếp tục"}
                      {step !== "review" && (
                        <ChevronRight className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
              <div className="lg:col-span-1">
                <OrderSummary cart={cart} selectedAddress={selectedAddress} />
              </div>
            </div>
          </div>
        </div>

        <AddAddressDialog
          isOpen={isAddAddressOpen}
          onOpenChange={setIsAddAddressOpen}
          onSuccess={refreshAddresses}
        />
      </Form>
    </FormProvider>
  );
}
