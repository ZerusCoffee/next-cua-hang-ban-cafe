import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="/assets/images/logo.jpg"
        alt="Loading..."
        width={100}
        height={75}
      />
    </div>
  );
}
