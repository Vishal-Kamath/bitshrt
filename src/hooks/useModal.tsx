import {
  openModal,
  setModalChildren,
  setModalClassName,
} from "@/redux/slice/modal";
import { useAppDispatch } from "@/redux/store/hooks";
import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}
const useModal: () => [VoidFunction, FC<Props>] = () => {
  const dispatch = useAppDispatch();
  const [childrenState, setChildrenState] = useState<ReactNode>();
  const [classNameState, setClassNameState] = useState<string>();

  const Modal: FC<Props> = ({ children, className }) => {
    useEffect(() => {
      setChildrenState(children);
      setClassNameState(className);
    }, [children, className]);

    return null;
  };

  const openModalOnCLick = () => {
    dispatch(setModalChildren({ children: childrenState }));
    dispatch(setModalClassName({ className: classNameState }));
    dispatch(openModal());
  };

  return [openModalOnCLick, Modal];
};

export default useModal;
