"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiTimes } from "react-icons/ti";

const LINKS = [
  { path: "/", label: "Home" },
  { path: "/travel-assist", label: "Travel Assist" },
  { path: "/email-assist", label: "Email Assist" },
  { path: "/todos-assist", label: "Todos Assist" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <header className="w-full pt-5">
      <nav className="md:w-[70%] w-[92%] mx-auto md:h-[60px] md:rounded-[30px] h-[45px] bg-white rounded-2xl px-5 flex items-center relative">
        {/* Brand */}
        <Link
          href="/"
          className="text-[#455063] font-bold tracking-wide z-[999999999]"
          aria-label="AURA home"
        >
          AURA
        </Link>

        {/* Desktop links */}
        <ul className="ml-auto hidden md:flex items-center gap-2 sm:gap-6">
          {LINKS.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`pt-2 py-1 hover:text-[#455063] ${
                  isActive(item.path) ? "border-b-4 border-[#455063] text-[#455063]" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden ml-auto inline-flex items-center justify-center p-2"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <TiTimes className="text-2xl text-[#455063]" />
          ) : (
            <RxHamburgerMenu className="text-2xl text-[#455063]" />
          )}
        </button>

        {/* Mobile menu */}
        <div className={`fixed top-0 bottom-0 sm:w-[60%] w-[80%] bg-white shadow-xl pt-[80px] transition-[left] duration-700 ease ${
            open ? "left-0" : "left-[-100%]"}`}>
          <ul className="px-4 py-3 space-y-2">
              {LINKS.map((item) => (
              <li key={item.path}>
                  <Link
                  href={item.path}
                  className={`block px-3 py-2 rounded-lg hover:bg-[#455063] hover:text-white ${
                      isActive(item.path) ? "bg-[#455063] text-white" : ""
                  }`}
                  >
                  {item.label}
                  </Link>
              </li>
              ))}
          </ul>
        </div>  
      </nav>
    </header>
  );
}