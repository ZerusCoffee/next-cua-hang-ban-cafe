import { Check, CreditCard, MapPin, Ticket } from "lucide-react";

interface StepperProps {
  currentStep: "address" | "coupon" | "payment" | "review";
}

const steps = [
  { id: "address", label: "Địa chỉ", icon: MapPin },
  { id: "coupon", label: "Ưu đãi", icon: Ticket },
  { id: "payment", label: "Thanh toán", icon: CreditCard },
  { id: "review", label: "Xác nhận", icon: Check },
];

export function CheckoutStepper({ currentStep }: StepperProps) {
  const getStepStatus = (stepId: string, index: number) => {
    const stepOrder = ["address", "coupon", "payment", "review"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (stepId === currentStep) return "active";
    if (index < currentIndex) return "completed";
    return "pending";
  };

  return (
    <div className="mb-10 max-w-3xl mx-auto px-4">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id, index);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
            >
              {/* Vòng tròn Icon */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 ${
                    status === "active"
                      ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                      : status === "completed"
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`absolute -bottom-7 text-xs font-medium whitespace-nowrap ${
                    status === "active" ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Thanh nối - Dùng flex-1 để nó tự giãn ra */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-1 w-full rounded-full transition-colors duration-300 ${
                      status === "completed" ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
