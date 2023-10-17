"use client";

import UIInput from "@/components/ui/input";
import { FC, MouseEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import UIButton from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const SignUpPage: FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const _submit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    )
      return;

    if (password !== confirmPassword) return;

    axios
      .post("/api/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        router.push("/auth/signin");
      })
      .catch();
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
        <form className="w-full max-w-sm flex flex-col gap-9">
          <div className="flex flex-col gap-1">
            <h2 className="font-medium text-lg">Sign Up</h2>
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-blue-400 hover:text-blue-700 underline"
              >
                sign in
              </Link>
            </p>
          </div>

          {/* Input group */}
          <div className="flex flex-col gap-3">
            <UIInput
              id="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />

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

            <UIInput
              id="ConfirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

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

export default SignUpPage;
