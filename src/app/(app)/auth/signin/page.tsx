"use client";

import { FC, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import UIInput from "@/components/ui/input";
import UIButton from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const SignInPage: FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _submit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) return;

    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <main className="flex px-vw items-center w-full max-w-6xl mx-auto h-full min-h-screen gap-12 justify-between">
      <div className="flex flex-col gap-3">
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
        <p className="text-justify max-sm:text-center max-w-md text-xs sm:text-sm text-gray-500">
          BitShrt is a URL Shortner that acts as a powerfull marketing tool that
          helps you track your customer details such as location, language, user
          device and a lot more.
        </p>
      </div>
      <form className="px-6 py-8 rounded-md w-full max-w-md flex flex-col gap-6">
        <h2 className="font-medium text-2xl">Sign In</h2>

        {error &&
          (error == "CredentialsSignin" ? (
            <div className="px-3 py-2 rounded-md text-white bg-red-400">
              Sign in failed. Check the details you provided are correct.
            </div>
          ) : null)}

        <UIInput
          id="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <UIInput
          id="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <UIButton
          type="submit"
          variant="contained"
          onClick={(e) => _submit(e)}
          className="font-bold"
        >
          SUBMIT
        </UIButton>
      </form>
    </main>
  );
};

export default SignInPage;
