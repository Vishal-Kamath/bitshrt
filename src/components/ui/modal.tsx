"use client";

import { cn } from "@/utils/lib";
import { FC, HTMLAttributes } from "react";
import { RxCross2 } from "react-icons/rx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  closeModal: VoidFunction;
}
const Modal: FC<Props> = ({
  open,
  className,
  closeModal,
  children,
  ...props
}) => {
  return open ? (
    <div className="z-50 absolute flex justify-center items-center px-vw top-0 left-0 min-h-screen h-full w-full bg-gray-400 bg-opacity-20 backdrop-blur-md">
      <div
        className={cn(
          "rounded-md border-gray-300 border-1 relative bg-white shadow-md",
          className
        )}
      >
        <button
          onClick={closeModal}
          className="absolute rounded-full top-3 right-3 flex justify-center items-center hover:bg-gray-100 text-gray-500 h-8 w-8"
        >
          <RxCross2 className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
