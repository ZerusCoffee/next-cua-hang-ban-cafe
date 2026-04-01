// components/cancel-order-dialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CancelOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderNumber: string;
  paymentStatus: string;
  onConfirm: () => void;
  isCancelling: boolean;
}

export function CancelOrderDialog({
  open,
  onOpenChange,
  orderNumber,
  paymentStatus,
  onConfirm,
  isCancelling,
}: CancelOrderDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận hủy đơn hàng</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn hủy đơn hàng #{orderNumber}? Hành động này
            không thể hoàn tác.
            {paymentStatus === "paid" && (
              <span className="block mt-2 text-red-600">
                Lưu ý: Đơn hàng đã thanh toán sẽ được hoàn tiền theo phương thức
                thanh toán ban đầu.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isCancelling}>
            Quay lại
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isCancelling}
            className="bg-red-600 hover:bg-red-700"
          >
            {isCancelling ? "Đang xử lý..." : "Xác nhận hủy"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
