import { ArrowRight, Brain, Clock3, Sparkles, BookOpen } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getLogs } from "../../components/Services/logService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const roadmapPreview = ["Machine Learning", "Keamanan Web", "Data Mining"];

const Dashboard = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [latestLog, setLatestLog] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestLog();
  }, []);

  const fetchLatestLog = async () => {
    try {
      const response = await getLogs();

      setLogs(response.data);

      if (response.data.length > 0) {
        setLatestLog(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const parsedResult = latestLog?.result ? JSON.parse(latestLog.result) : null;

  const formattedDate = latestLog?.created_at
    ? new Date(latestLog.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const stats = [
    {
      title: "Total Rekomendasi",
      value: logs.length || "Belum ada data",
      icon: Brain,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Peminatan Dominan",
      value: parsedResult?.recommendations?.[0]?.peminatan || "Belum ada data",
      icon: Sparkles,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Aktivitas Terakhir",
      value: latestLog ? formattedDate : "Belum ada aktivitas",
      icon: Clock3,
      color: "from-sky-500 to-cyan-500",
    },
  ];

  const hasRecommendations =
    parsedResult?.recommendations && parsedResult.recommendations.length > 0;

  return (
    <div>
      {/* HERO */}
      <div
        className="
          relative overflow-hidden

          rounded-[2rem]

          bg-gradient-to-br
          from-indigo-600
          via-violet-600
          to-fuchsia-600

          p-8 md:p-10

          text-white

          shadow-xl
          shadow-indigo-200
        "
      >
        {/* Glow */}
        <div
          className="
            absolute -top-20 -right-20
            w-72 h-72
            bg-white/10
            rounded-full
            blur-3xl
          "
        />

        {/* Content */}
        <div className="relative z-10 w-full">
          <div
            className="
              inline-flex items-center gap-2

              bg-white/10
              border border-white/20

              px-4 py-2
              rounded-2xl

              text-sm
              backdrop-blur-sm
            "
          >
            <Sparkles size={16} />
            Sistem Rekomendasi Mata Kuliah
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mt-6 leading-tight">
            Halo,{" "}
            {user?.name
              ?.toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase()) || "Pengguna"}
            👋
          </h1>

          <p className="text-base md:text-lg leading-7 md:leading-8">
            Temukan mata kuliah dan roadmap akademik sesuai minatmu.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => navigate("/recommendation")}
              className="
                bg-white
                text-slate-900

                px-5 md:px-6 py-3.5 md:py-4
                rounded-2xl

                font-semibold

                hover:scale-[1.02]
                transition-all

                shadow-lg
              "
            >
              Buat Rekomendasi
            </button>

            <button
              onClick={() => navigate("/roadmap")}
              className="
                flex items-center gap-2

                bg-white/10
                border border-white/20

                px-5 md:px-6 py-3.5 md:py-4
                rounded-2xl

                font-semibold

                hover:bg-white/20
                transition-all

                backdrop-blur-sm
              "
            >
              Lihat Seluruh Roadmap
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                bg-white/90
                backdrop-blur-sm

                border border-slate-200

                rounded-[2rem]
                p-6

                shadow-sm

                hover:-translate-y-1
                hover:shadow-lg

                transition-all
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-500 text-sm">{item.title}</p>

                  <h2
                    className="
                      text-xl md:text-2xl
                      font-bold
                      text-slate-900

                      mt-3

                      leading-snug
                    "
                  >
                    {item.value}
                  </h2>
                </div>

                {/* ICON */}
                <div
                  className={`
                    w-14 h-14
                    rounded-2xl

                    bg-gradient-to-br
                    ${item.color}

                    flex items-center justify-center

                    text-white

                    shadow-lg
                  `}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        {/* LAST RECOMMENDATION */}
        <div
          className="
            bg-white/90
            backdrop-blur-sm

            border border-slate-200

            rounded-[2rem]
            p-6

            shadow-sm
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Rekomendasi Terakhir
              </h2>

              <p className="text-slate-500 mt-2">
                Berdasarkan minat terbaru mahasiswa.
              </p>
            </div>

            <div
              className="
                w-14 h-14
                rounded-2xl

                bg-indigo-100
                text-indigo-600

                flex items-center justify-center
              "
            >
              <Brain size={24} />
            </div>
          </div>

          {hasRecommendations ? (
            <>
              {/* QUERY */}
              <div
                className="
                rounded-2xl
                bg-gradient-to-r
                from-indigo-50
                to-violet-50
                border border-indigo-100
                p-4 md:p-5
              "
              >
                <p className="text-sm text-slate-500 mb-2">Query terakhir</p>

                <p className="text-slate-800 font-medium leading-7">
                  "{latestLog?.query}"
                </p>
              </div>

              {/* RESULT */}
              <div className="space-y-4 mt-6">
                {parsedResult.recommendations.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="
            flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
            rounded-2xl
            border border-slate-200
            p-4
            hover:bg-slate-50
            transition-all
          "
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {item.nama_mk}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.kode_mk} • {item.sks} SKS
                      </p>
                    </div>

                    <span
                      className={`
              px-2.5 py-1.5
              rounded-xl
              text-sm
              font-medium
              ${
                item.peminatan === "Artificial Intelligence"
                  ? "bg-indigo-100 text-indigo-700"
                  : item.peminatan === "Cyber Security"
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-100 text-slate-700"
              }
            `}
                    >
                      {item.peminatan === "Artificial Intelligence"
                        ? "AI"
                        : item.peminatan === "Cyber Security"
                          ? "Cyber"
                          : "Umum"}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              className="
              rounded-2xl
              border border-dashed border-slate-300
              bg-slate-50
              py-14 px-8
              text-center
            "
            >
              <div
                className="
                w-12 h-12
                rounded-2xl
                bg-slate-200
                flex items-center justify-center
                mx-auto mb-5
              "
              >
                <Brain size={20} className="text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                Belum Ada Rekomendasi
              </h3>

              <p className="text-slate-500 mt-3 leading-7 max-w-md mx-auto">
                Belum terdapat riwayat rekomendasi mata kuliah. Silakan lakukan
                eksplorasi minat pada halaman rekomendasi.
              </p>
            </div>
          )}
        </div>

        {/* ROADMAP AKADEMIK */}
        <div
          className="
            bg-white/90
            backdrop-blur-sm

            border border-slate-200

            rounded-[2rem]
            p-6

            shadow-sm
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Roadmap Akademik
              </h2>

              <p className="text-sm md:text-base text-slate-500 mt-2 leading-7">
                Roadmap mata kuliah semester 1 hingga semester 4.
              </p>
            </div>

            <div
              className="
                hidden sm:flex

                w-14 h-14
                rounded-2xl

                bg-violet-100
                text-violet-600

                items-center justify-center
              "
            >
              <BookOpen size={24} />
            </div>
          </div>

          {/* INFO BADGE */}
          <div
            className="
              inline-flex items-center gap-2

              bg-gradient-to-r
              from-indigo-500
              to-violet-500

              text-white

              px-5 py-2
              rounded-2xl

              text-sm
              font-semibold

              shadow-lg
              shadow-indigo-100
            "
          >
            Semester 1 - 4
          </div>

          {/* COURSES */}
          <div className="space-y-4 mt-6">
            {roadmapPreview.map((item, index) => (
              <div
                key={index}
                className="
                flex items-center justify-between

                rounded-2xl

                border border-slate-200

                p-4

                hover:bg-slate-50
                hover:border-indigo-100

                transition-all
              "
              >
                <div className="min-w-0">
                  <h3
                    className="
                    font-semibold
                    text-slate-800

                    break-words
                  "
                  >
                    {item}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Mata kuliah roadmap akademik
                  </p>
                </div>

                <ArrowRight size={18} className="text-slate-400 shrink-0" />
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/roadmap")}
            className="
            w-full mt-6

            bg-slate-900
            hover:bg-slate-800

            text-white

            py-4
            rounded-2xl

            font-semibold

            transition-all
          "
          >
            Lihat Roadmap Akademik
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
