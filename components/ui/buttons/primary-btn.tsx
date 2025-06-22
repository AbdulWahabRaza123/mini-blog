import { cn } from "@/lib/utils";
import { SpinnerBtn } from "../spinners/spinner-btn";

interface ButtonProps {
  children: React.ReactNode;
  handleSubmit?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}
export const PrimaryButton = ({
  children,
  handleSubmit,
  isLoading = false,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      onClick={handleSubmit}
      className={cn(
        "w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg flex items-center justify-center gap-2",
        className
      )}
    >
      {isLoading && <SpinnerBtn />}
      {children}
    </button>
  );
};
