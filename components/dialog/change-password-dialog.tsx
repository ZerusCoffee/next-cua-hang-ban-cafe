"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle
} from "@/components/ui/dialog";
import { Shield } from "lucide-react";
import { ChangePasswordForm } from "../form/change-password-form";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0 rounded-3xl shadow-2xl">
        <div className="bg-[#D94E28] p-6 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black uppercase italic tracking-tighter text-white">
                Đổi mật khẩu
              </DialogTitle>
              <DialogDescription className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
                Bảo vệ tài khoản của bạn
              </DialogDescription>
            </div>
          </div>
        </div>
        <div className="p-8 bg-white">
          <ChangePasswordForm
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
