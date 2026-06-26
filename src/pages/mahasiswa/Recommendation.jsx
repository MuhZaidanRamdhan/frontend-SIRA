import { useState } from "react";
import { Sparkles, ArrowUp } from "lucide-react";

import { generateRecommendation } from "../../components/Services/RecommendationService";
import SkeletonRecommendation from "../../components/ui/SkeletonRecommendation";

const Recommendation = () => {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasGenerated(true);

      const response = await generateRecommendation(query);

      setRecommendations(response.recommendations || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* BACKGROUND GLOW */}
      <div
        className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2

        w-64 h-64
        md:w-[500px] md:h-[500px]

        bg-indigo-300/20
        blur-3xl
        rounded-full

        pointer-events-none
      "
      />

      <div
        className="
        absolute
        top-32 right-0

        w-40 h-40
        md:w-[300px] md:h-[300px]

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
            Rekomendasi Mata Kuliah
          </h1>

          <p className="text-slate-500 mt-2">
            Sistem rekomendasi mata kuliah berbasis Retrieval-Augmented
            Generation (RAG) untuk membantu mahasiswa menentukan peminatan yang
            sesuai.
          </p>
        </div>

        {/* SIRA ASSISTANT */}
        <div
          className="
    bg-white
    border border-slate-200
    rounded-3xl
    p-5
    shadow-sm
  "
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="
        w-12 h-12
        rounded-2xl

        bg-gradient-to-br
        from-indigo-500
        to-violet-500

        flex items-center justify-center

        text-white
        shrink-0
      "
            >
              <Sparkles size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 text-lg">
                Asisten SIRA
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Masukkan minat atau bidang yang ingin dipelajari.
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div
            className="
      flex items-center gap-3

      border border-slate-200
      rounded-2xl

      bg-slate-50

      px-4 py-2

      focus-within:ring-2
      focus-within:ring-indigo-500

      transition-all
    "
          >
            <input
              type="text"
              value={query}
              disabled={loading}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh: Saya tertarik pada keamanan data..."
              className="
        flex-1
        min-w-0

        bg-transparent
        outline-none

        text-slate-700
        placeholder:text-slate-400
      "
            />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="
        shrink-0

        w-11 h-11
        rounded-2xl

        bg-gradient-to-r
        from-indigo-600
        to-violet-600

        text-white

        flex items-center justify-center

        hover:scale-105
        disabled:opacity-60

        transition-all
      "
            >
              {loading ? (
                <div
                  className="
            w-5 h-5
            border-2 border-white/30
            border-t-white
            rounded-full
            animate-spin
          "
                />
              ) : (
                <ArrowUp size={18} />
              )}
            </button>
          </div>
        </div>

        {/* RESULT SECTION */}
        <div className="mt-10">
          {/* SKELETON */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonRecommendation key={index} />
              ))}
            </div>
          )}

          {/* RESULT */}
          {!loading && recommendations.length > 0 && (
            <>
              {/* RESULT HEADER */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Hasil Rekomendasi
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Mata kuliah yang direkomendasikan berdasarkan minat
                    mahasiswa.
                  </p>
                </div>

                <div
                  className="
                  hidden md:flex
                  items-center gap-2

                  bg-indigo-100
                  text-indigo-700

                  px-4 py-2
                  rounded-2xl

                  text-sm font-semibold
                "
                >
                  {recommendations.length} Mata Kuliah
                </div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="
                    relative overflow-hidden

                    bg-white/90
                    backdrop-blur-sm

                    border border-slate-200
                    rounded-3xl
                    p-6

                    hover:shadow-2xl
                    hover:shadow-indigo-100/80
                    hover:-translate-y-1
                    hover:border-indigo-200

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
                    <div className="mt-5 pt-5 border-t border-slate-100">
                      <p
                        className="
                        text-slate-600
                        leading-7
                      "
                      >
                        {item.alasan}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* EMPTY */}
          {!loading && hasGenerated && recommendations.length === 0 && (
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
              <h3 className="text-xl font-semibold text-slate-700">
                Rekomendasi Tidak Ditemukan
              </h3>

              <p className="text-slate-500 mt-2">
                Coba gunakan konteks atau minat yang lebih spesifik.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
