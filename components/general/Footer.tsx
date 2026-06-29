"use client";
import { Link } from "@/i18n/navigation";
import { navLinks } from "../navbar/Navbar";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("navbar");
  const t2 = useTranslations("footer")
  return (
    <footer className="border-t border-black/50 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center lg:flex-row lg:px-12">
        <Link href="/" className="flex items-center text-2xl font-semibold">
          <span className="text-text">Property</span>
          <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl ml-1">
            Market
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text/80 transition hover:text-primary"
            >
              {t(item.label)}
            </Link>
          ))}
        </div>
        <p className="text-sm text-text/60 ">
          &copy; {new Date().getFullYear()} {t2("copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
