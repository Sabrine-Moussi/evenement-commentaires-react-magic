
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout = () => {
  // Effet pour le titre de la page et appliquer le thème sombre
  useEffect(() => {
    document.title = "Administration | EventsManager";
    // Appliquer le thème sombre au layout d'administration
    document.documentElement.classList.add('dark');
    
    // Nettoyer en enlevant la classe quand on quitte le layout admin
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Administration | EventsManager</title>
      </Helmet>

      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
