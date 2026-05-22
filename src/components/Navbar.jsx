"use client";

import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import NavLink from "./NavLink";
import { Avatar, Button } from "@heroui/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    setMenuOpen(false);
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <div
      className={`py-2 relative z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-[#F8FAFC] shadow-sm"
      }`}
    >
      <nav className="flex items-center justify-between container mx-auto px-4 lg:px-0">
        {/* Logo + Site Name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            height={150}
            width={150}
            alt="logo"
            className="object-contain"
          />
        </Link>

        {/* Desktop nav — public links only */}
        <ul className="hidden lg:flex gap-8">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/facilities">All Facilities</NavLink>
          </li>
          {/* <li>
            <NavLink href="/about-us">About Us</NavLink>
          </li> */}
        </ul>

        {/* Desktop right section */}
        <div className="hidden lg:flex items-center gap-3">
          {isPending ? (
            // Loading state — avoids layout flash
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar + name trigger */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <Avatar>
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    alt={user.name}
                    src={user?.image}
                  />
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <span className="text-sm font-medium text-[#334155]">
                  {user.name}
                </span>
                <ChevronDown size={16} className="text-[#6C696D]" />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-2 flex flex-col">
                  <NavLink
                    href="/my-bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 text-sm"
                  >
                    My Bookings
                  </NavLink>
                  <NavLink
                    href="/add-facility"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 text-sm"
                  >
                    Add Facility
                  </NavLink>
                  <NavLink
                    href="/manage-my-facilities"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 text-sm"
                  >
                    Manage My Facilities
                  </NavLink>
                  <div className="border-t border-gray-100 mt-2 pt-2 px-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-2 py-2 text-base font-semibold text-red-500 hover:bg-green-50 rounded-lg cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-linear-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                Login
              </button>
            </Link>
            // <div className="flex items-center gap-2">

            //   <Link href="/register">
            //     <button className="bg-[#1E293B] text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            //       Register
            //     </button>
            //   </Link>
            // </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-[#334155] p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-md">
          <NavLink mobile href="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink mobile href="/facilities" onClick={() => setMenuOpen(false)}>
            All Facilities
          </NavLink>

          {isPending ? (
            <div className="w-full h-8 bg-gray-100 animate-pulse rounded" />
          ) : user ? (
            <>
              <NavLink
                mobile
                href="/my-bookings"
                onClick={() => setMenuOpen(false)}
              >
                My Bookings
              </NavLink>
              <NavLink
                mobile
                href="/add-facility"
                onClick={() => setMenuOpen(false)}
              >
                Add Facility
              </NavLink>
              <NavLink
                mobile
                href="/manage-my-facilities"
                onClick={() => setMenuOpen(false)}
              >
                Manage My Facilities
              </NavLink>
              <div className="flex justify-between items-center text-center">
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                  <span className="text-sm font-medium text-[#334155]">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-left text-sm text-red-500 hover:text-red-600 font-medium cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-100 pt-4">
              <NavLink mobile href="/login" onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              {/* <Link mobile href="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
