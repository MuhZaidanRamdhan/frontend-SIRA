import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();
  return (
    <div
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-slate-950
        flex items-center justify-center
      "
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://kelaskaryawansabtuminggu.com/wp-content/uploads/2023/05/hero-1-777x437-1.webp')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-slate-950/85 to-violet-950/90" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo.png"
            alt="SIRA"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Heading */}
        <h1
          className="
            text-5xl md:text-7xl
            font-bold
            text-white
            leading-tight
          "
        >
          SIRA
        </h1>

        <p
          className="
            text-xl md:text-2xl
            text-indigo-200
            mt-4
            font-medium
          "
        >
          Sistem Rekomendasi Akademik
        </p>

        <p
          className="
            mt-8
            text-slate-300
            text-lg
            md:text-xl
            max-w-2xl
            mx-auto
            leading-relaxed
          "
        >
          Membantu mahasiswa menemukan mata kuliah yang selaras dengan minat
          akademik melalui sistem rekomendasi cerdas.
        </p>

        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              to="/login"
              className="
              px-8 py-4
              rounded-2xl
              bg-white
              text-slate-900
              font-semibold
              hover:scale-105
              transition-all
            "
            >
              Masuk
            </Link>

            <Link
              to="/register"
              className="
              px-8 py-4
              rounded-2xl
              border border-white/20
              text-white
              font-semibold
              hover:bg-white/10
              transition-all
            "
            >
              Daftar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
