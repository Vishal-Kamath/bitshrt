import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./userMenu";
import { redirect } from "next/navigation";

const Header = async () => {
  const session = await getServerSession();
  if (!session) redirect("/auth/signin?error=UserNotFound");

  return (
    <header className="flex justify-between items-center px-vw py-4 border-b-1 border-gray-300">
      <div>
        <Link href="/dashboard">
          <Image
            src="/assets/logo.svg"
            alt="Bitshrt"
            className="fill-black w-9 h-9"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <UserMenu session={session} />
    </header>
  );
};

export default Header;
