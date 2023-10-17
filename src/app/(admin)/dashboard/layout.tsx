import { FC, ReactNode } from "react";
import Header from "./components/header/header";

interface Props {
  children: ReactNode;
}
const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AdminLayout;
