export const getAvatarUrl = (avatarPath: string): string => {
  if (!avatarPath) return "/assets/svg/default-avatar.png";

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8000";
  return `${baseUrl}/storage/${avatarPath}`;
};
