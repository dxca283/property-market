import { AppSidebar } from "@/components/admin/AppSideBar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { redirect } from "next/navigation";
import { AdminRejectModal } from "@/components/admin/AdminRejectModal";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  if (user?.role !== "ADMIN") {
    redirect("/403");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full flex-1 flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
      <AdminRejectModal />
    </SidebarProvider>
  );
}
