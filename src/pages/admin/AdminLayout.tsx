import { Outlet, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/admin/AdminGuard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const AdminLayout = () => {
  const { signOut, user } = useAuth();

  return (
    <AdminGuard>
      <Helmet>
        <title>Admin | Sneaker Zone</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-14 flex items-center justify-between border-b px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <span className="font-display tracking-wider text-sm">SNEAKER ZONE · ADMIN</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
                <Button asChild variant="ghost" size="sm"><Link to="/">View site</Link></Button>
                <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
              </div>
            </header>
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AdminGuard>
  );
};

export default AdminLayout;
