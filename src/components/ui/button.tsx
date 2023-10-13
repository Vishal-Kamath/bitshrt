import { cn } from "@/utils/lib";
import { ButtonHTMLAttributes, FC } from "react";
import { VariantProps, cva } from "class-variance-authority";

const ButtonVariant = cva("flex items-center justify-center py-2 ", {
  variants: {
    variant: {
      text: "border-b-1 border-gray-300 px-2 hover:border-emerald-400 hover:bg-emerald-50",
      contained:
        "bg-emerald-300 text-white rounded-md px-6 hover:bg-emerald-400",
      outlined:
        "border-1 border-gray-300 hover:border-emerald-400 px-6 rounded-md hover:outline hover:outline-4 hover:outline-emerald-100",
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
