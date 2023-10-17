import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import UIButton from "@/components/ui/button";

const HomeHeader: FC = () => {
  return (
    <header className="flex h-header bg-white justify-between items-center px-vw">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/assets/logo.svg"
          alt="Bitshrt"
          className="fill-black w-9 h-9"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-semibold font-montserrat">BitShrt</h1>
      </Link>

      <div className="flex gap-6 items-center">
        <Link href="/auth/signup">
          <UIButton variant="text" className="px-6">
            Sign up
          </UIButton>
        </Link>
        <UIButton variant="outlined" className="rounded-full">
          Get Started
        </UIButton>
      </div>
    </header>
  );
};

export default HomeHeader;
