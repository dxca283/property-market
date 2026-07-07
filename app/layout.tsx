import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Property Market",
  description: "Buy, rent and sell properties",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        poppins.className,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background">
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
