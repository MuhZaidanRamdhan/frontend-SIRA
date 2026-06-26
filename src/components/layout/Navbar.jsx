import { LogOut, Menu, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { showConfirm, showSuccess } from "../../utils/Alert";

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const titles = {
    "/dashboard": "Dashboard",
    "/recommendation": "Rekomendasi AI",
    "/roadmap": "Roadmap Mata Kuliah",
    "/history": "Riwayat Rekomendasi",

    "/admin/dashboard": "Dashboard Admin",
    "/admin/recommendation": "Rekomendasi AI",
    "/admin/roadmap": "Roadmap Mata Kuliah",
    "/admin/upload-silabus": "Upload Silabus",
    "/admin/history": "Riwayat Rekomendasi",
    "/admin/users": "Manajemen Pengguna",
    "/admin/courses": "Manajemen Mata Kuliah",
  };

  const currentTitle = titles[location.pathname] || "Dashboard";

  const handleLogout = async () => {
    const result = await showConfirm(
      "Keluar dari akun saat ini?",
      "Anda akan mengakhiri sesi penggunaan sistem.",
    );

    if (result.isConfirmed) {
      showSuccess("Logout berhasil", "Anda telah berhasil keluar.");
      logout();
      navigate("/");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 h-15 bg-gradient-to-r from-white to-indigo-50/60 border-b border-slate-200 px-4 md:px-5 flex items-center justify-between backdrop-blur-xl">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* MOBILE SIDEBAR BUTTON */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="
        md:hidden
        p-2
        rounded-lg
        hover:bg-slate-100
        transition-all
      "
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <div
            className="
        w-2 h-2
        rounded-full
        bg-gradient-to-r
        from-indigo-500
        to-violet-500
      "
          />

          <p className="text-sm font-medium text-slate-600">{currentTitle}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative" ref={dropdownRef}>
        {/* PROFILE BUTTON */}
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="
        flex items-center gap-2
        px-2 py-1.5
        rounded-xl
        hover:bg-white/70
        border border-transparent hover:border-slate-200
        transition-all
      "
        >
          {/* USER INFO */}
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-xs font-semibold text-slate-800">
              {user?.username}
            </p>

            <p className="text-[11px] text-slate-500 capitalize">
              {user?.role}
            </p>
          </div>

          {/* AVATAR */}
          <div
            className={`
          w-9 h-9
          rounded-xl
          flex items-center justify-center
          text-sm
          font-semibold
          uppercase

          ${
            user?.role === "admin"
              ? "bg-red-100 text-red-700"
              : "bg-indigo-100 text-indigo-700"
          }
        `}
          >
            {user?.username?.charAt(0)}
          </div>

          {/* ICON */}
          <ChevronDown
            size={16}
            className={`
          hidden sm:block
          text-slate-400
          transition-transform
          ${openDropdown ? "rotate-180" : ""}
        `}
          />
        </button>

        {/* DROPDOWN */}
        {openDropdown && (
          <div
            className="
          absolute right-0 top-14

          w-64

          bg-white
          border border-slate-200

          rounded-xl
          shadow-lg

          overflow-hidden
          z-50

          animate-in fade-in zoom-in-95 duration-100
        "
          >
            {/* TOP USER */}
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {/* AVATAR */}
                <div
                  className={`
                w-10 h-10
                rounded-xl
                flex items-center justify-center
                font-semibold
                uppercase
                text-sm

                ${
                  user?.role === "admin"
                    ? "bg-red-100 text-red-700"
                    : "bg-indigo-100 text-indigo-700"
                }
              `}
                >
                  {user?.username?.charAt(0)}
                </div>

                {/* INFO */}
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate">
                    {user?.username}
                  </p>

                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>

                  <span
                    className={`
                  inline-block mt-1
                  text-[11px]
                  px-2 py-0.5
                  rounded-md
                  capitalize

                  ${
                    user?.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : "bg-indigo-100 text-indigo-700"
                  }
                `}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>

            {/* MENU */}
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="
              w-full
              flex items-center gap-2

              px-3 py-2.5

              rounded-lg

              text-sm
              text-slate-600

              hover:bg-red-50
              hover:text-red-600

              transition-all
            "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
