import { cn } from "@/lib/utils";
import { SpinnerBtn } from "../spinners/spinner-btn";

interface ButtonProps {
  children: React.ReactNode;
  handleSubmit?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}
export const OutlineButton = ({
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
        "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
        className
      )}
    >
      {isLoading && <SpinnerBtn />}
      {children}
    </button>
  );
};
