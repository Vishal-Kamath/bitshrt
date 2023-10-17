import { cn } from "@/utils/lib";
import { ButtonHTMLAttributes, FC } from "react";
import { VariantProps, cva } from "class-variance-authority";

const ButtonVariant = cva("flex items-center justify-center py-2 ", {
  variants: {
    variant: {
      "text":
        "px-2 hover:bg-gray-100 rounded-md text-gray-600 hover:text-gray-800",
      "contained": "bg-gray-400 text-white rounded-md px-6 hover:bg-gray-800",
      "outlined":
        "border-1 border-gray-300 hover:border-gray-400 px-6 rounded-md hover:outline hover:outline-4 hover:outline-gray-100",

      // Rose
      "rose-text":
        "px-2 hover:bg-rose-50 rounded-md text-rose-600 hover:text-rose-800",
      "rose-contained":
        "bg-rose-400 text-white rounded-md px-6 hover:bg-rose-600",
      "rose-outlined":
        "border-1 border-rose-300 hover:border-rose-400 px-6 rounded-md hover:outline hover:outline-4 hover:outline-rose-100",

      // Sky
      "sky-text":
        "px-2 hover:bg-sky-50 rounded-md text-sky-600 hover:text-sky-800",
      "sky-contained": "bg-sky-400 text-white rounded-md px-6 hover:bg-sky-500",
      "sky-outlined":
        "border-1 border-sky-300 hover:border-sky-400 px-6 rounded-md hover:outline hover:outline-4 hover:outline-sky-100",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariant> {}
const UIButton: FC<Props> = ({ className, children, variant, ...props }) => {
  return (
    <button
      className={cn("", ButtonVariant({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default UIButton;
