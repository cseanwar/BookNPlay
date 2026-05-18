"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, className, children, onClick, mobile }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        ${mobile
          ? isActive
            ? "text-[#22C55E] font-semibold"
            : "text-[#334155]"
          : isActive
            ? "border-b-2 border-b-[#22C55E] text-lg font-semibold py-1"
            : ""
        }
        ${className ?? ""}
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink;