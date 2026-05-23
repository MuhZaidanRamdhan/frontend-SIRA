import {
  LayoutDashboard,
  Sparkles,
  History,
  Map,
  X,
  Upload,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Recommendation",
    path: "/recommendation",
    icon: Sparkles,
  },
  {
    name: "Roadmap",
    path: "/roadmap",
    icon: Map,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  const mahasiswaMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Rekomendasi",
      path: "/recommendation",
      icon: Sparkles,
    },
    {
      name: "Roadmap",
      path: "/roadmap",
      icon: Map,
    },
    {
      name: "Riwayat Rekomendasi",
      path: "/history",
      icon: History,
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Rekomendasi",
      path: "/admin/recommendation",
      icon: Sparkles,
    },
    {
      name: "Roadmap",
      path: "/admin/roadmap",
      icon: Map,
    },
    {
      name: "Upload Silabus",
      path: "/admin/upload-silabus",
      icon: Upload,
    },
    {
      name: "Riwayat Rekomendasi",
      path: "/admin/history",
      icon: History,
    },
  ];

  return (
    <>
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
    fixed top-0 left-0 z-50
    w-72 h-dvh
    bg-gradient-to-b
    from-white
    to-indigo-50/40

    border-r border-white/50
    backdrop-blur-xl
    p-5
    overflow-y-auto
    transition-transform duration-300

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >
        {/* TOP */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center gap-4">
            {/* LOGO */}
            <div
              className="
              w-12 h-12
              rounded-2xl
              bg-white
              border border-slate-200

              flex items-center justify-center

              shadow-sm
              overflow-hidden
            "
            >
              <img
                src="/logo.png"
                alt="Logo Kampus"
                className="w-10 h-10 object-contain"
              />
            </div>

            {/* BRAND */}
            <div>
              <h1 className="text-2xl font-black text-slate-900">SIRA</h1>

              <p
                className="text-[13px]
                leading-5 text-slate-500 mt-1"
              >
                Sistem Rekomendasi Akademik
              </p>
            </div>
          </div>

          {/* CLOSE MOBILE */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <nav className="space-y-2">
          {(user?.role === "admin" ? adminMenu : mahasiswaMenu).map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>  
                  `
              flex items-center gap-3
              px-4 py-3
              rounded-2xl
              transition-all duration-200

             ${
               isActive
                 ? `
              bg-gradient-to-r
              from-indigo-500
              to-violet-500

              text-white
              font-semibold

              shadow-lg
              shadow-indigo-200

              scale-[1.02]
            `
                 : `
              text-slate-600
              hover:bg-white
              hover:shadow-md
            `
             }
            `
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
