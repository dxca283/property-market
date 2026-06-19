"use client"
import Link from "next/link";
import { navLinks } from "../navbar/Navbar";

const Footer = () => {
  return (
    <footer className="border-t border-black/50 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center lg:flex-row lg:px-12">
        <Link href="/" className="flex items-center text-2xl font-semibold">
          <span className="text-text">Property</span>
          <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl ml-1">
            Market
          </span>
        </Link>
        <div className="items-center gap-8 flex">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={link === "Home" ? "/" : `${link.toLowerCase()}`}
              className={`text-sm font-medium transition hover:text-primary text-text/80`}
            >
              {link}
            </Link>
          ))}
        </div>
        <p className="text-sm text-text/60 ">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
