"use client";

import Link from "next/link";
import Button from "../ui/Button";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuthStore } from "@/store/useAuthStore";
import useCreatePropertyModal from "@/store/usePropertyStore";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export const navLinks = ["Home", "Properties", "Marketplace"];

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { openLogin } = useAuthStore();
  const { onOpen: openCreateProperty } = useCreatePropertyModal();
  const { data: session, isPending } = authClient.useSession();

  const isTransparent = variant === "transparent";
  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    toast.success("Logout successfully");
  };
  return (
    <section
      className={`top-0 left-0 z-50 w-full 
        ${isTransparent ? "absolute" : "sticky border-b border-black/5 bg-card"}
    `}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav
          className={`flex h-20 items-center justify-between ${isTransparent ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl" : "px-0"}`}
        >
          {/* Logo*/}
          <Link href="/" className="flex items-center text-2xl font-semibold">
            <span className={isTransparent ? "text-gray-300" : "text-text"}>
              Property
            </span>
            <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl ml-1">
              Market
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className={`text-sm font-medium transition hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline" onClick={openLogin}>
                Login
              </Button>
            )}

            {!isPending && session && (
              <Button
                icon={<FaHome />}
                onClick={openCreateProperty}
                iconPosition="left"
                variant="outline"
              >
                Add Property
              </Button>
            )}
          </div>

          {/*mobile menu button */}
          <button
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition lg:hidden ${isTransparent ? "border border-white/10 bg-white/5 text-white" : "border border-black/10 bg-background text-text"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoClose size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>
        </nav>
        {/*Mobile menu */}
        {isOpen && (
          <div
            className={`mt-4 rounded-3xl p-6 backdrop-blur-2xl lg:hidden ${isTransparent ? "border border-white/10 bg-secondary/95" : "border border-black/5 bg-white"}`}
          >
            <div className="flex flex-col gap-5 text-text">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className={`transition hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}
                >
                  {link}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 ">
                {session ? (
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="outline" onClick={openLogin}>
                    Login
                  </Button>
                )}
                {!isPending && session && (
                  <Button
                    icon={<FaHome />}
                    onClick={openCreateProperty}
                    iconPosition="left"
                    variant="outline"
                  >
                    Add Property
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
