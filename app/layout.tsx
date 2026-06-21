import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import CreatePropertyModal from "@/components/modals/CreatePropertyModal";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Property Market",
  description: "Buy, rent and sell properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        {children}
        <RegisterModal />
        <LoginModal />
        <CreatePropertyModal />
      </body>
    </html>
  );
}
