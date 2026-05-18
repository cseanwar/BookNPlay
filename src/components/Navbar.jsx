"use client";

// import { authClient } from "@/lib/auth-client";
// import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Button } from "@heroui/react";
// import { Menu, X } from "lucide-react";

const Navbar = () => {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleSignOut = async () => {
//     await authClient.signOut();
//     setMenuOpen(false);
//   };

  return (
    <div className="bg-[#F8FAFC] shadow-sm relative z-50">
      <nav className="h-15 flex items-center justify-between container mx-auto px-4 lg:px-0">

        <Link href="/">
          <Image
            src={"/logo.png"}
            height={150}
            width={150}
            alt="logo"
            className="object-contain"
          />
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <ul className="hidden lg:flex gap-8">
          <li>
            <NavLink href={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink href={"/all-facilities"}>All Facilities</NavLink>
          </li>
          <li>
            <NavLink href={"/my-bookings"}>My Bookings</NavLink>
          </li>
          <li>
            <NavLink href={"/add-facility"}>Add Facility</NavLink>
          </li>
          <li>
            <NavLink href={"/manage-my-facilities"}>Manage My Facilities</NavLink>
          </li>
        </ul>

        {/* Desktop right section */}
        <ul className="hidden lg:flex items-center gap-6">
          {/* {user ? ( */}
            {/* <> */}
              {/* <li>
                <Avatar>
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    alt={user.name}
                    src={user?.image}
                  />
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </li>
              <li>
                <Button
                  onClick={handleSignOut}
                  variant="danger"
                  className="rounded-none"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <> */}
              <li>
                <NavLink href={"/login"}>
                <Button variant="tertiary" className="rounded-sm bg-[#22C55E] text-[#334155] px-6 py-2 font-semibold">
                    Login
                </Button>
                </NavLink>
              </li>
            {/* </>
          )} */}
        </ul>

        {/* Mobile hamburger button */}
        {/* <button
          className="lg:hidden text-[#334155] p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button> */}
      </nav>

      {/* Mobile dropdown menu */}
      {/* {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-md">
          <NavLink mobile href={"/"} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink
            mobile
            href={"/destinations"}
            onClick={() => setMenuOpen(false)}
          >
            Destinations
          </NavLink>
          <NavLink
            mobile
            href={"/my-bookings"}
            onClick={() => setMenuOpen(false)}
          >
            My Bookings
          </NavLink>
          <NavLink
            mobile
            href={"/add-destination"}
            onClick={() => setMenuOpen(false)}
          >
            Add Destination
          </NavLink>

          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            {user ? (
              <>
                <div className="flex items-center gap-3">
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
                <Button
                  onClick={handleSignOut}
                  variant="danger"
                  className="rounded-none text-sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex gap-4 w-full">
                <NavLink
                  mobile
                  href={"/login"}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Navbar;