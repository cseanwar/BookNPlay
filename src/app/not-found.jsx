"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft, MapPinned } from "lucide-react";

const NotFoundPage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#071122] text-white flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-3xl rounded-full" />
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
      <div className="relative z-10 max-w-3xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full text-sm tracking-wide mb-8">
          <MapPinned className="w-4 h-4 text-green-400" />
          Oops! Lost Your Booking Route?
        </div>

        {/* 404 */}
        <h1 className="text-[110px] md:text-[180px] leading-none font-black bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-5">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          The page you’re trying to access doesn’t exist or may have been
          moved. Let’s get you back to discovering amazing sports facilities.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          {/* Home */}
          <Link href="/">
            <button className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:scale-105">
              <Home className="w-5 h-5 group-hover:rotate-6 transition-transform" />
              Back Home
            </button>
          </Link>

          {/* Facilities */}
          <Link href="/facilities">
            <button className="group flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-lg">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Explore Facilities
            </button>
          </Link>
        </div>

        {/* Bottom Link */}
        <div className="mt-10">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;