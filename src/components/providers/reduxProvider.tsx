"use client";

import React, { HTMLAttributes } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

interface Props extends HTMLAttributes<typeof Provider> {}
const ReduxProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
