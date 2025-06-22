import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Dispatch, ElementType, SetStateAction } from "react";

interface InputProps {
  name?: string;
  type?: string;
  value?: string;
  setValue?: (v: string) => void;
  className?: string;
  placeHolder?: string;
  isRequired?: boolean;
}
export const PrimaryInput = ({
  name,
  type = "text",
  value,
  setValue,
  className,
  placeHolder,
  isRequired = false,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      className={cn(
        "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200",
        className
      )}
      placeholder={placeHolder}
      required={isRequired}
    />
  );
};
export const PrimaryTextarea = ({
  name,
  value,
  setValue,
  className,
  placeHolder,
  isRequired = false,
}: InputProps) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      className={cn(
        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none",
        className
      )}
      rows={12}
      placeholder={placeHolder}
      required={isRequired}
    />
  );
};
interface IconInputProps extends InputProps {
  Icon: ElementType;
  isPassword?: boolean;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
}
export const PrimaryIconInput = ({
  Icon,
  name,
  type = "text",
  value,
  setValue,
  className,
  placeHolder,
  isRequired = false,
  isPassword = false,
  showPassword = false,
  setShowPassword,
}: IconInputProps) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <PrimaryInput
        type={type}
        name={name}
        value={value}
        setValue={setValue}
        className={className}
        placeHolder={placeHolder}
        isRequired={isRequired}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword && setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

interface TextIconInputProps extends IconInputProps {
  label: string;
}
export const PrimaryTextIconInput = ({
  Icon,
  name,
  type = "text",
  value,
  setValue,
  className,
  placeHolder,
  isRequired = false,
  label,
  isPassword = false,
  showPassword = false,
  setShowPassword,
}: TextIconInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <PrimaryIconInput
        Icon={Icon}
        name={name}
        type={type}
        value={value}
        setValue={setValue}
        className={className}
        placeHolder={placeHolder}
        isRequired={isRequired}
        isPassword={isPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};
