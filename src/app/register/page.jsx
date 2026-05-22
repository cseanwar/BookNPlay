"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  User,
  Link2,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const passwordRef = useRef("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      await authClient.signOut();
      toast.success("Account created successfully!");
      router.push("/login");
    }

    if (error) {
      toast.error("Signup failed");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.12)] grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-linear-to-br from-green-500 via-green-700 to-green-950 p-14">

          {/* Glow Effects */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl font-black leading-tight text-white">
              Join The Future
              <br />
              Of Sports Booking
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-white/75">
              Create your BookNPlay account and start booking premium
              sports facilities in seconds.
            </p>
          </div>

          {/* Cards */}
          <div className="relative z-10 flex flex-col gap-5">

            {/* Security Card */}
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <ShieldCheck size={22} className="text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Secure Authentication
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Protected login and account security for every user.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            {[
              {
                label: "Registered Players",
                value: "15K+",
              },
              {
                label: "Premium Facilities",
                value: "250+",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
              >
                <p className="text-sm text-white/70">
                  {item.label}
                </p>

                <h2 className="mt-2 text-4xl font-black text-white">
                  {item.value}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10 md:px-14">
          <div className="w-full max-w-xl">

            {/* Header */}
            <div className="mb-10">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
                Create Account
              </h2>

              <p className="mt-3 text-base text-slate-500">
                Join BookNPlay and start your sports journey
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={onSubmit}
              className="space-y-5"
            >

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-green-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800">
                  Profile Image URL
                </label>

                <div className="relative">
                  <Link2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="image"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-green-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-green-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Password */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      required
                      name="password"
                      type="password"
                      placeholder="Create password"
                      onChange={(e) =>
                        (passwordRef.current = e.target.value)
                      }
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-green-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      required
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-green-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <p className="-mt-1 text-sm text-slate-500">
                Password must contain uppercase, lowercase and number.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-green-500 to-green-700 text-base font-bold text-white shadow-[0_8px_28px_rgba(34,197,94,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(34,197,94,0.45)]"
              >
                Create Account
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Or Continue With
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignin}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-800 transition-all duration-300 hover:border-green-500 hover:bg-green-50"
            >
              <FcGoogle size={24} />
              Sign up with Google
            </button>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-lg text-green-600 hover:text-green-700"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;