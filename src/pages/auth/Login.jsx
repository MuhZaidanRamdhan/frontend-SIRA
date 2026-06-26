import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../../components/services/authService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import bgImage from "/background.jpg";
import { showError, showSuccess } from "../../utils/Alert";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      const response = await loginUser(formData);

      login(response);

      showSuccess("Login berhasil", "Selamat datang kembali!");

      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      showError("Login gagal", error.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="relative hidden lg:block">
          <img
            src="https://kelaskaryawansabtuminggu.com/wp-content/uploads/2023/05/hero-1-777x437-1.webp"
            alt="Campus"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

          {/* Text */}
          <div className="absolute bottom-12 left-12 right-12">
            <p className="text-indigo-300 uppercase tracking-widest text-sm mb-2 font-medium">
              Selamat Datang
            </p>

            <p className="text-slate-200 mt-2 text-xl font-bold leading-relaxed w-full">
              Sekolah Tinggi Teknologi Terpadu Nurul Fikri
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-10">
              <div className="w-30 h-20 rounded-3xl bg-indigo-100 flex items-center justify-center mx-auto mb-5">
                <img
                  src="https://nurulfikri.ac.id/wp-content/uploads/2020/08/logo-sttnf-12-768x557.jpg"
                  alt="Campus"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-slate-500 mt-3 font-medium leading-relaxed">
                Masuk untuk mengakses sistem rekomendasi akademik dan eksplorasi
                mata kuliah sesuai minatmu.
              </p>
            </div>
            {/* ERROR MESSAGE */}
            {errorMessage && (
              <div
                className="
                  flex items-start gap-3

                  bg-red-50
                  border border-red-200

                  text-red-600

                  text-sm

                  px-4 py-3
                  rounded-2xl
                  mb-4
                "
              >
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* FORM */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email atau Username
                </label>

                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  placeholder="Masukkan email atau username"
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="
                    w-full
                    border border-slate-200
                    rounded-2xl
                    px-5 py-4 pr-14
                    outline-none
                    focus:ring-2 focus:ring-slate-900
                  "
                  />

                  {/* TOGGLE */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-slate-700
                    transition-all
                  "
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-2xl transition-all font-medium"
              >
                Masuk
              </button>
            </form>

            {/* Register */}
            <p className="text-center text-slate-500 mt-4">
              Belum punya akun?
              <button
                onClick={() => navigate("/register")}
                className="text-slate-900 font-semibold ml-2 cursor-pointer"
              >
                Daftar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
