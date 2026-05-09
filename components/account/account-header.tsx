"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { updateAvatar, useUser } from "@/services/user";
import { getAvatarUrl } from "@/utils/avatar";
import dayjs from "dayjs";
import { Camera, CheckCircle, Clock } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export function AccountHeader() {
  const { user, mutate } = useUser();
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        setIsUploading(true);
        await updateAvatar(formData);
        toast.success("Cập nhật ảnh đại diện thành công!");
        mutate();
      } catch {
        toast.error("Upload thất bại");
      } finally {
        setIsUploading(false);
      }
    },
    [mutate],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isUploading,
  });

  return (
    <div className="bg-linear-to-r from-[#D94E28] to-[#FF8C66] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div {...getRootProps()} className="relative group cursor-pointer">
              <input {...getInputProps()} />
              <Avatar className="h-20 w-20 border-4 border-white/30 group-hover:border-white transition-all duration-200 shadow-xl">
                {isUploading ? (
                  <div className="flex items-center justify-center h-full w-full bg-black/50 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                  </div>
                ) : (
                  <AvatarImage src={getAvatarUrl(user?.avatar)} />
                )}
              </Avatar>

              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="h-6 w-6 text-white" />
              </div>

              {isDragActive && (
                <div className="absolute inset-0 bg-[#D94E28]/80 rounded-full flex items-center justify-center">
                  <p className="text-white text-[10px] font-bold uppercase">
                    Thả ảnh
                  </p>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">
                {user?.name || "Người dùng"}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {user?.email_verified_at ? (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-0 backdrop-blur-sm whitespace-nowrap text-[10px] font-bold px-2 py-0.5"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    ĐÃ XÁC THỰC
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-amber-400 text-amber-900 border-0 whitespace-nowrap text-[10px] font-bold px-2 py-0.5"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    CHƯA XÁC THỰC
                  </Badge>
                )}
                {user?.created_at && (
                  <Badge
                    variant="secondary"
                    className="bg-black/10 text-white border-0 backdrop-blur-sm whitespace-nowrap text-[10px] font-bold px-2 py-0.5"
                  >
                    THÀNH VIÊN TỪ {dayjs(user.created_at).format("MM/YYYY")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
