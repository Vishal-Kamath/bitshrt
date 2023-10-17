"use client";

import UIInput from "@/components/ui/input";
import { FC, MouseEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import UIButton from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        <h2 className="font-medium text-lg">Sign up</h2>
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

export default SignUpPage;
