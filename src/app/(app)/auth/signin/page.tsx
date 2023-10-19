"use client";

import { FC, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import UIInput from "@/components/ui/input";
import UIButton from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignInPage: FC = () => {
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

  const _signinWithGoogle = async () => {
    signIn("google", { redirect: true, callbackUrl: "/dashboard" });
  };

  return (
    <main className="w-full px-vw-md h-full min-h-screen">
      <section className="flex items-center py-12 max-md:flex-col w-full max-w-6xl mx-auto h-full min-h-screen gap-12 md:justify-between">
        <div className="flex w-full max-w-md flex-col gap-3">
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
          <p className="text-justify max-sm:hidden w-full text-xs sm:text-sm text-gray-500">
            BitShrt is a URL Shortner that acts as a powerfull marketing tool
            that helps you track your customer details such as location,
            language, user device and a lot more.
          </p>
        </div>
        <form className="w-full max-w-sm flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-medium text-lg">Sign In</h2>
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-400 hover:text-blue-700 underline"
              >
                sign up
              </Link>
            </p>
          </div>

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
            variant="sky-contained"
            onClick={(e) => _submit(e)}
            className="font-bold"
          >
            SUBMIT
          </UIButton>

          <div className="relative border-1 border-gray-200">
            <span className="px-3 absolute bg-white top-0 -translate-x-1/2 left-1/2 -translate-y-1/2">
              OR
            </span>
          </div>

          <UIButton
            onClick={_signinWithGoogle}
            variant="outlined"
            className="flex gap-3 text-gray-500 justify-center items-center"
          >
            <FcGoogle className="w-6 h-6" />
            Google
          </UIButton>
        </form>
      </section>
    </main>
  );
};

export default SignInPage;
