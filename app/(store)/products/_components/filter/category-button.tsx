import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CategoryButtonType = {
  label: string;
  handleClick: () => void;
  isSelect: boolean;
};

export default function CategoryButton({
  label,
  handleClick,
  isSelect,
}: CategoryButtonType) {
  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        "h-10 px-4 md:px-8 shrink-0 transition-all duration-300 rounded-full font-bold uppercase text-[12px] md:text-[13px] tracking-wider",
        isSelect
          ? ["bg-[#D94E28] text-white shadow-lg shadow-orange-100 scale-105"]
          : [
              "bg-stone-50 text-stone-500 hover:bg-orange-50 hover:text-[#D94E28] border border-stone-100",
            ],
        "active:scale-95",
      )}
    >
      <span className="relative z-10 truncate">{label}</span>
    </Button>
  );
}
