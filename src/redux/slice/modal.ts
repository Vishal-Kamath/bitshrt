import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ReactNode } from "react";

// Define a type for the slice state
interface ModalState {
  open: boolean;
  children: ReactNode;
  className?: string;
}

// Define the initial state using that type
const initialState: ModalState = {
  open: false,
  children: null,
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
    setModalChildren: (
      state,
      action: PayloadAction<{ children: ReactNode }>
    ) => {
      state.children = action.payload.children;
    },
    setModalClassName: (
      state,
      action: PayloadAction<{ className?: string }>
    ) => {
      state.className = action.payload.className;
    },
  },
});

export const { openModal, closeModal, setModalChildren, setModalClassName } =
  modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModalOpen = (state: RootState) => state.modal.open;
export const selectModalChildren = (state: RootState) => state.modal.children;
export const selectModalClassName = (state: RootState) => state.modal.className;

export default modalSlice.reducer;
