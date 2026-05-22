/* eslint-disable react/no-unescaped-entities */
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

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
      router.push("/");
    }

    if (error) {
      toast.error("Email or password is incorrect");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="relative hidden overflow-hidden bg-linear-to-br from-green-600 via-green-700 to-green-950 p-12 md:flex md:flex-col md:justify-between">
          {/* Glow Effects */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="mb-6 text-5xl font-black leading-tight text-white">
              Book Sports
              <br />
              Facilities Easily
            </h1>

            <p className="max-w-md text-lg leading-8 text-white/75">
              Continue booking your favorite sports facilities with
              BookNPlay. Fast, modern and seamless.
            </p>
          </div>

          {/* Stats */}
          <div className="relative z-10 space-y-4">
            {[
              {
                label: "Active Bookings",
                value: "12K+",
              },
              {
                label: "Sports Facilities",
                value: "250+",
              },
              {
                label: "Support",
                value: "24/7",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
              >
                <p className="mb-1 text-sm text-white/70">
                  {item.label}
                </p>

                <h3 className="text-4xl font-black text-white">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-10">
              <h2 className="mb-3 text-5xl font-black tracking-tight text-slate-900">
                Login
              </h2>

              <p className="text-base text-slate-500">
                Login to continue your sports journey
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={onSubmit}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-green-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-green-500 focus:bg-white"
                  />
                </div>

                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-semibold text-green-600 transition hover:text-green-700"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-green-500 to-green-700 text-base font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-xl hover:shadow-green-500/40"
              >
                Login
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs font-semibold tracking-[0.12em] text-slate-400">
                OR CONTINUE WITH
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-900 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-lg text-green-600 transition hover:text-green-700"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;