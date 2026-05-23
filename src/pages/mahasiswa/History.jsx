import { useEffect, useState } from "react";
import { getLogs } from "../../components/Services/logService";
import historyData from "../../utils/historyData";
import { Clock3, HistoryIcon, User2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import SkeletonHistoryCard from "../../components/ui/SkeletonHistoryCard";
import { formatDate } from "../../utils/FormatDate";

const History = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await getLogs();

      setTimeout(() => {
        if (response.success) {
          setLogs(response.data || []);
        }

        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);

      setLogs([]);

      setLoading(false);
    }
  };
  return (
    <div className="relative">
      {/* BACKGROUND GLOW */}
      <div
        className="
        absolute top-0 left-1/2
        -translate-x-1/2

        w-[500px] h-[500px]

        bg-indigo-300/20
        blur-3xl
        rounded-full

        pointer-events-none
      "
      />

      <div
        className="
        absolute top-40 right-0

        w-[300px] h-[300px]

        bg-violet-300/10
        blur-3xl
        rounded-full

        pointer-events-none
      "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            History {user?.role == "admin" ? "Pengguna" : "Mahasiswa"}
          </h1>

          <p className="text-slate-500 mt-2">
            Riwayat rekomendasi mata kuliah berdasarkan minat mahasiswa.
          </p>
        </div>

        {/* TOTAL */}
        <div className="mb-8">
          <div
            className="
            inline-flex items-center gap-5

            bg-white/90
            backdrop-blur-sm

            border border-slate-200

            rounded-3xl
            px-6 py-5

            shadow-sm
            "
          >
            {/* ICON */}
            <div
              className={`
                    w-14 h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-indigo-500
                    to-violet-500

                    flex items-center justify-center
                    text-white
              `}
            >
              <HistoryIcon size={24} />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-sm text-slate-500">
                Total Riwayat Rekomendasi
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                {logs.length} Riwayat
              </h2>
            </div>
          </div>
        </div>

        {/* HISTORY LIST */}
        <div className="space-y-6">
          {/* LOADING */}
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonHistoryCard key={index} />
            ))
          ) : logs.length === 0 ? (
            <div
              className="
              bg-white/90
              backdrop-blur-sm

              border border-dashed border-slate-300
              rounded-3xl

              p-14
              text-center
            "
            >
              <User2 className="mx-auto w-12 h-12 text-slate-400" />

              <h3 className="text-2xl font-semibold text-slate-800 mt-5">
                Belum Ada Riwayat Rekomendasi
              </h3>

              <p className="text-slate-500 mt-3 max-w-xl mx-auto leading-7">
                Hasil rekomendasi mata kuliah akan muncul setelah pengguna
                melakukan generate rekomendasi menggunakan sistem RAG.
              </p>
            </div>
          ) : (
            logs.map((log) => {
              let parsedResult = {};

              try {
                parsedResult = JSON.parse(log.result);
              } catch (error) {
                console.log(error);
              }

              return (
                <div
                  key={log.id}
                  className="
                  bg-white/90
                  backdrop-blur-sm

                  border border-slate-200
                  rounded-3xl

                  p-6

                  hover:shadow-xl
                  hover:shadow-indigo-100/70

                  transition-all duration-300
                "
                >
                  {/* ADMIN INFO */}
                  {user?.role === "admin" && (
                    <div
                      className="
                      flex flex-col sm:flex-row
                      sm:items-center sm:justify-between
                      gap-4

                      border-b border-slate-100
                      pb-5 mb-6
                    "
                    >
                      {/* LEFT */}
                      <div className="flex items-start gap-4 min-w-0">
                        {/* AVATAR */}
                        <div
                          className="
                          w-12 h-12
                          rounded-full

                          bg-gradient-to-br
                          from-indigo-500
                          to-violet-500

                          text-white

                          flex items-center justify-center
                          font-bold text-lg
                          uppercase
                          shrink-0
                        "
                        >
                          {log.username?.charAt(0)}
                        </div>

                        {/* USER INFO */}
                        <div className="min-w-0">
                          <h3
                            className="
                            font-semibold
                            text-slate-800
                            text-lg
                            break-words
                          "
                          >
                            {log.name}
                          </h3>

                          <p
                            className="
                            text-sm text-slate-500
                            break-all
                          "
                          >
                            {log.email}
                          </p>
                        </div>
                      </div>

                      {/* USERNAME */}
                      <span
                        className="
                        self-start sm:self-auto

                        text-xs
                        bg-slate-100
                        text-slate-600

                        px-3 py-2
                        rounded-xl
                        font-medium

                        break-all
                        max-w-full
                      "
                      >
                        @{log.username}
                      </span>
                    </div>
                  )}

                  {/* QUERY */}
                  <div
                    className="
                    border-l-4 border-indigo-500
                    pl-5
                    mb-6
                  "
                  >
                    <p className="text-sm text-slate-500 mb-2">Query Minat</p>

                    <h2 className="text-xl font-semibold text-slate-800 leading-relaxed">
                      "{log.query}"
                    </h2>
                  </div>

                  {/* META */}
                  <div
                    className="
                    flex flex-col md:flex-row
                    md:items-center
                    md:justify-between

                    gap-4
                    mb-8
                  "
                  >
                    {/* DATE */}
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 size={16} />

                      {formatDate(log.created_at)}
                    </div>

                    {/* TOTAL */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-500">
                        Total Rekomendasi
                      </span>

                      <div
                        className="
                        min-w-[36px]
                        h-9
                        px-3

                        rounded-xl

                        bg-indigo-100
                        text-indigo-700

                        flex items-center justify-center

                        text-sm font-semibold
                      "
                      >
                        {parsedResult.total_recommendation}
                      </div>
                    </div>
                  </div>

                  {/* RECOMMENDATION LIST */}
                  <div className="space-y-4">
                    {parsedResult?.recommendations?.map((item, index) => (
                      <div
                        key={index}
                        className="
                        relative overflow-hidden

                        bg-white
                        border border-slate-200

                        rounded-3xl
                        p-5

                        hover:shadow-lg
                        hover:shadow-indigo-100/70
                        hover:-translate-y-1

                        transition-all duration-300
                      "
                      >
                        {/* ACCENT TOP */}
                        <div
                          className={`
                          absolute top-0 left-0
                          w-full h-1

                          ${
                            item.peminatan === "Artificial Intelligence"
                              ? "bg-gradient-to-r from-indigo-500 to-violet-500"
                              : item.peminatan === "Cyber Security"
                                ? "bg-gradient-to-r from-red-500 to-orange-500"
                                : "bg-gradient-to-r from-slate-400 to-slate-500"
                          }
                        `}
                        />

                        {/* TOP */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            {/* RANK */}
                            <span
                              className="
                              inline-block

                              text-[11px]
                              uppercase
                              tracking-wide

                              bg-slate-100
                              text-slate-600

                              px-3 py-1
                              rounded-lg
                              mb-3
                            "
                            >
                              Rekomendasi #{index + 1}
                            </span>

                            {/* TITLE */}
                            <h3
                              className="
                              font-semibold
                              text-slate-800
                              text-lg

                              break-words
                              line-clamp-2
                            "
                            >
                              {item.nama_mk}
                            </h3>

                            {/* META */}
                            <p className="text-sm text-slate-500 mt-1">
                              {item.kode_mk} • {item.sks} SKS
                            </p>
                          </div>

                          {/* BADGE */}
                          <span
                            className={`
                            text-xs
                            px-3 py-2
                            rounded-xl
                            font-medium
                            whitespace-nowrap

                            ${
                              item.peminatan === "Artificial Intelligence"
                                ? "bg-indigo-100 text-indigo-700"
                                : item.peminatan === "Cyber Security"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-slate-100 text-slate-600"
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

                        {/* ALASAN */}
                        <div
                          className="
                          mt-5
                          pt-5
                          border-t border-slate-100
                        "
                        >
                          <p
                            className="
                            text-slate-600
                            leading-7
                            line-clamp-4
                          "
                          >
                            {item.alasan}.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
