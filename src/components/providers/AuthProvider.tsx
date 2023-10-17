"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
