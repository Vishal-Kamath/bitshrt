"use client";

import { cn } from "@/utils/lib";
import { FC, DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
}
const UIInput2: FC<Props> = ({
  id,
  placeholder,
  className,
  type = "text",
  ...props
}) => {
  return (
    <div className="flex flex-col group gap-1">
      <label htmlFor={id} className="text-gray-900 font-medium text-sm">
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        className={cn(
          "border-1 h-9 px-3 font-normal border-gray-400 rounded-md outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200/50 group-focus-within:border-gray-900",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default UIInput2;
