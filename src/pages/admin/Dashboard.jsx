import {
  BookOpen,
  Users,
  History,
  RefreshCw,
  Upload,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getRoadmap } from "../../components/Services/RoadmapService";
import { getLogs } from "../../components/Services/logService";
import { getUsers } from "../../components/Services/UserService";
import { getEmbeddingStatus } from "../../components/Services/EmbeddingService";

const actions = [
  {
    title: "Upload Silabus",
    desc: "Unggah dataset mata kuliah terbaru.",
    icon: Upload,
    path: "/admin/upload-silabus",
  },
  {
    title: "Sinkronkan Sistem",
    desc: "Perbarui data rekomendasi.",
    icon: RefreshCw,
    path: "/admin/upload-silabus",
  },
  {
    title: "Lihat Riwayat",
    desc: "Pantau aktivitas rekomendasi mahasiswa.",
    icon: History,
    path: "/history",
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [embeddingStatus, setEmbeddingStatus] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matkulResponse = await getRoadmap();
        const historyResponse = await getLogs();
        const userResponse = await getUsers();
        const embeddingResponse = await getEmbeddingStatus();

        setCourses(matkulResponse.data || []);
        setLogs(historyResponse.data || []);
        setUsers(userResponse || []);
        setEmbeddingStatus(embeddingResponse || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case "aktif":
        return "Aktif";
      case "perlu_sinkronisasi":
        return "Perlu Sinkronisasi";
      default:
        return "Belum Sinkron";
    }
  };

  const totalMatkul = courses.reduce(
    (total, semester) => total + semester.courses.length,
    0,
  );

  const totalUsers = users.total_data;

  const formatDate = (date) => {
    return new Date(date).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stats = [
    {
      title: "Total Mata Kuliah",
      value: totalMatkul,
      icon: BookOpen,
    },
    {
      title: "Total Riwayat",
      value: logs.length,
      icon: History,
    },
    {
      title: "Status Sinkronisasi",
      value: getStatusLabel(embeddingStatus?.status),
      icon: Sparkles,
    },
    {
      title: "Total User",
      value: totalUsers,
      icon: Users,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "aktif":
        return {
          bg: "bg-white",
          icon: "text-indigo-600",
          border: "border-slate-200",
          text: "Seluruh data mata kuliah telah berhasil disinkronkan dengan basis pengetahuan sistem. Sistem rekomendasi berada dalam kondisi optimal dan siap digunakan untuk menghasilkan rekomendasi mata kuliah yang relevan berdasarkan minat mahasiswa.",
        };

      case "perlu_sinkronisasi":
        return {
          bg: "bg-amber-50",
          icon: "text-amber-600",
          border: "border-amber-200",
          text: "Terdeteksi adanya pembaruan data silabus yang belum diproses ke dalam basis pengetahuan sistem. Sinkronisasi perlu segera dilakukan agar proses rekomendasi tetap menggunakan data terbaru dan menjaga tingkat relevansi hasil rekomendasi.",
        };

      default:
        return {
          bg: "bg-red-50",
          icon: "text-red-600",
          border: "border-red-200",
          text: "Sistem belum memiliki data sinkronisasi yang valid. Proses sinkronisasi awal perlu dilakukan terlebih dahulu agar data mata kuliah dapat diproses dan digunakan sebagai dasar dalam menghasilkan rekomendasi akademik.",
        };
    }
  };

  const statusStyle = getStatusStyle(embeddingStatus?.status);

  return (
    <div>
      {/* HEADING */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Dashboard Admin
        </h1>

        <p className="text-slate-500 mt-2">
          Pusat kontrol pengelolaan sistem rekomendasi akademik.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                bg-white
                border border-slate-200
                rounded-3xl
                p-6
                shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>

                  <h2 className="text-xl font-bold text-slate-900 mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className="
                    w-12 h-12
                    rounded-2xl
                    bg-indigo-100
                    text-indigo-600
                    flex items-center justify-center
                  "
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK ACTION */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-5">Aksi Cepat</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to={item.path}
                className="
                  bg-white
                  border border-slate-200
                  rounded-3xl
                  p-6
                  hover:shadow-md
                  transition-all
                "
              >
                <div
                  className="
                    w-14 h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-indigo-500
                    to-violet-500
                    text-white
                    flex items-center justify-center
                    mb-5
                  "
                >
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-500 mt-2 leading-7">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className={`
    mt-8
    ${statusStyle.bg}
    border ${statusStyle.border}
    rounded-3xl
    p-6 md:p-7
    shadow-sm
  `}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="
        w-10 h-10
        rounded-2xl
        bg-white
        flex items-center justify-center
      "
          >
            <Sparkles className={statusStyle.icon} size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Status Sistem</p>

            <p className="text-lg font-semibold text-slate-900">
              {getStatusLabel(embeddingStatus?.status)}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              {embeddingStatus?.last_sync
                ? `Sinkronisasi terakhir: ${formatDate(embeddingStatus.last_sync)}`
                : "Belum tersedia"}
            </p>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-white/60">
          <p className="text-slate-600 leading-7">{statusStyle.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
