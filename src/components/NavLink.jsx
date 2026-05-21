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
      // className={`${isActive ? "text-[#22C55E] font-semibold" : ""} ${className}`}

      className={`
        ${mobile
          ? isActive
            ? "text-[#22C55E] font-semibold"
            : "text-[#334155]"
          : isActive
            ? "text-[#22C55E] font-semibold text-lg"
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