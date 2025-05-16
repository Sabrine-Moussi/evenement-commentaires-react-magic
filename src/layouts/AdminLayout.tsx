
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout = () => {
  // Effet pour le titre de la page
  useEffect(() => {
    document.title = "Administration | EventsManager";
  }, []);

  return (
    <>
      <Helmet>
        <title>Administration | EventsManager</title>
      </Helmet>

      <SidebarProvider collapsedWidth={56}>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <AdminHeader />
            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;
