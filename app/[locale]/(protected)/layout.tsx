import { TooltipProvider } from "@/components/ui/tooltip";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
};

export default ProtectedLayout;
