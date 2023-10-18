import {
  openModal,
  setModalChildren,
  setModalClassName,
} from "@/redux/slice/modal";
import { useAppDispatch } from "@/redux/store/hooks";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}
const useModal: () => [VoidFunction, FC<Props>] = () => {
  const dispatch = useAppDispatch();
  const childrenRef = useRef<ReactNode>();
  const classNameRef = useRef<string>();

  const Modal: FC<Props> = ({ children, className }) => {
    useEffect(() => {
      childrenRef.current = children;
      classNameRef.current = className;
    }, [children, className]);

    return null;
  };

  const openModalOnCLick = () => {
    dispatch(setModalChildren({ children: childrenRef.current }));
    dispatch(setModalClassName({ className: classNameRef.current }));
    dispatch(openModal());
  };

  return [openModalOnCLick, Modal];
};

export default useModal;
