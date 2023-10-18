"use client";

import { cn } from "@/utils/lib";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode, useEffect, useState } from "react";
import { AiOutlineLink, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

interface Props {
  session: Session;
}
const UserMenu: FC<Props> = ({ session }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const closeOnClick = () => openDropdown && setOpenDropdown(false);
    document.addEventListener("click", closeOnClick);

    return () => {
      document.removeEventListener("click", closeOnClick);
    };
  }, [openDropdown]);

  return (
    <div className="relative isolate">
      <button
        onClick={() => setOpenDropdown((open) => !open)}
        className="h-9 w-9 relative isolate bg-gray-100 rounded-full overflow-hidden"
      >
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={100}
            height={100}
          />
        )}
        <AiOutlineUser className="w-6 h-6 absolute text-gray-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
      </button>

      {openDropdown && (
        <div className="w-60 rounded-md p-3 overflow-hidden flex flex-col bg-white border-1 border-gray-200 shadow-md absolute top-12 right-0">
          <div className="flex flex-col gap-1 break-words p-2">
            <h3 className="text-sm font-semibold">{session.user.name}</h3>
            <p className="text-sm font-normal text-gray-700">
              {session.user.email}
            </p>
          </div>
          <DropDownElement
            value={
              <>
                <LuLayoutDashboard /> <span>Dashboard</span>
              </>
            }
            action="/dashboard"
          />
          <DropDownElement
            value={
              <>
                <AiOutlineLink /> <span>Links</span>
              </>
            }
            action="/dashboard/links"
          />
          <DropDownElement
            value={
              <>
                <AiOutlineSetting /> <span>Settings</span>
              </>
            }
            action="/dashboard/settings"
          />
          <DropDownElement
            value={
              <>
                <MdOutlineLogout /> <span>Logout</span>
              </>
            }
            action={signOut}
            className="hover:bg-red-100"
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;

interface DropDownProps {
  value: ReactNode;
  action: string | VoidFunction;
  className?: string;
}
const DropDownElement: FC<DropDownProps> = ({ value, action, className }) => {
  return typeof action === "string" ? (
    <Link
      href={action}
      className={cn(
        "p-2 flex gap-2 items-center hover:bg-gray-100 text-sm font-light justify-start w-full rounded-md",
        className
      )}
    >
      {value}
    </Link>
  ) : (
    <button
      onClick={action}
      className={cn(
        "p-2 flex gap-2 items-center hover:bg-gray-100 text-sm font-light justify-start w-full rounded-md",
        className
      )}
    >
      {value}
    </button>
  );
};
