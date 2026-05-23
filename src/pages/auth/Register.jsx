import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../../components/Services/AuthService";
import { useNavigate } from "react-router-dom";
import bgImage from "/background.jpg";
import { showError, showSuccess } from "../../utils/Alert";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      const response = await registerUser(formData);

      showSuccess("Pendaftaran berhasil", "Akun Anda telah berhasil dibuat.");

      navigate("/login");

    } catch (error) {
      showError("Pendaftaran gagal", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-100 flex items-center justify-center p-3"
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
            <p className="text-indigo-300 uppercase tracking-widest text-sm mb-2">
              Bergabung Sekarang
            </p>

            <p className="text-slate-200 mt-2 text-lg">
              Sistem rekomendasi akademik untuk membantu mahasiswa memilih mata
              kuliah terbaik.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-lg">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-30 h-20 rounded-3xl bg-indigo-100 flex items-center justify-center mx-auto mb-5">
                <img
                  src="https://nurulfikri.ac.id/wp-content/uploads/2020/08/logo-sttnf-12-768x557.jpg"
                  alt="Campus"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-slate-500 mt-3 font-medium text-sm">
                Buat akun untuk mengakses sistem rekomendasi akademik mahasiswa.
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
                {errorMessage}
              </div>
            )}
            {/* FORM */}
            <form className="space-y-4" onSubmit={handleRegister}>
              {/* ROW 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama lengkap"
                    className="
                    w-full
                    border border-slate-200
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="
          w-full
          border border-slate-200
          rounded-2xl
          px-4 py-3
          outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email"
                  className="
                  w-full
                  border border-slate-200
                  rounded-2xl
                  px-4 py-3
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
                />
              </div>

              {/* PASSWORD */}
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
                    px-4 py-3 pr-12
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-slate-700
                  "
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full

                 bg-blue-900 hover:bg-blue-800

                  text-white

                  py-3.5
                  rounded-2xl

                  transition-all
                  font-semibold
                "
              >
                Daftar
              </button>
            </form>

            {/* Login */}
            <p className="text-center text-slate-500 mt-4">
              Sudah punya akun?
              <button
                onClick={() => navigate("/login")}
                className="text-slate-900 font-semibold ml-2 cursor-pointer"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
