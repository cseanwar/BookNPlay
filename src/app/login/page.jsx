/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Logged in successfully!");
      redirect("/");
    }
    if (error) {
      toast.error("Email or password is incorrect");
    }
  };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });

    }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8 w-full max-w-lg">
        <h1 className="text-4xl md:text-5xl text-[#0C0B0B] mb-2">Login</h1>
        <p className="text-[#6C696D] text-base md:text-lg">
          Resume your adventure with Wanderlust
        </p>
      </div>

      {/* Form container — no Card, just a bordered box */}
      <div className="w-full max-w-lg border border-gray-200 shadow-sm p-6 md:p-10">
        <Form
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
          style={{ width: "100%" }}
        >
          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                  return "Please enter a valid email address";
                return null;
              }}
            >
              <Label className="text-[#0C0B0B] font-medium text-base md:text-lg">
                Email Address
              </Label>
              <div className="relative w-full">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                />
                <Input
                  className="rounded-none bg-[#F8FAFC] text-sm text-[#6C696D] pl-9"
                  style={{ width: "100%" }}
                  placeholder="john@example.com"
                />
              </div>
              <FieldError />
            </TextField>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-full">
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8)
                  return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value))
                  return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value))
                  return "Password must contain at least one number";
                return null;
              }}
            >
              <Label className="text-[#0C0B0B] font-medium text-base md:text-lg">
                Password
              </Label>
              <div className="relative w-full">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                />
                <Input
                  className="rounded-none bg-[#F8FAFC] text-sm text-[#6C696D] pl-9"
                  style={{ width: "100%" }}
                  placeholder="Enter your password"
                />
              </div>
              <Description className="text-red-500 text-xs md:text-sm">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            className="rounded-none w-full bg-[#15A1BF] text-white text-base md:text-lg font-bold py-5 mt-2"
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5 w-full overflow-hidden">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="whitespace-nowrap text-sm text-[#6C696D] shrink-0">
            Or sign in with
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google button */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full rounded-none py-5 font-semibold text-base md:text-lg mb-5"
          style={{ width: "100%" }}
        >
          <FcGoogle /> Sign in with Google
        </Button>

        {/* Sign up link */}
        <p className="text-[#6C696D] text-base text-center">
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="text-[#15A1BF] font-semibold text-lg">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;