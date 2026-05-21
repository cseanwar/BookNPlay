"use client";

import Link from "next/link";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const ErrorPage = ({ error, reset }) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#071122] flex items-center justify-center px-4 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
          Oops! An unexpected error occurred while loading this page.
          Please try again or return to the homepage.
        </p>

        {/* Error Message */}
        {error?.message && (
          <div className="mt-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-left text-sm text-red-300 overflow-auto">
            {error.message}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          {/* Retry */}
          <button
            onClick={() => reset()}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 transition-all duration-300 font-semibold text-lg shadow-2xl hover:scale-105"
          >
            Try Again
          </button>

          {/* Home */}
          <Link href="/">
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 font-semibold text-lg">
              <Home className="w-5 h-5" />
              Back Home
            </button>
          </Link>
        </div>

        {/* Go Back */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;