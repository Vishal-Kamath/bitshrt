import { cn } from "@/utils/lib";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
}
const UIInput: FC<Props> = ({
  className,
  id,
  value,
  placeholder,
  type,
  ...props
}) => {
  return (
    <div className="relative h-10 w-full">
      <input
        id={id}
        value={value}
        type={type || "text"}
        className="peer h-full w-full rounded-md border-1 border-gray-400 bg-transparent px-3 outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200/50 focus:border-black"
        {...props}
      />
      {placeholder && (
        <label
          htmlFor={id}
          className={cn(
            "absolute left-3 -translate-y-1/2 bg-white px-2 text-gray-500 transition-all delay-300 ease-in-out peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-black",
            !!value ? "top-0 text-xs" : "top-1/2 text-sm"
          )}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
};

export default UIInput;
