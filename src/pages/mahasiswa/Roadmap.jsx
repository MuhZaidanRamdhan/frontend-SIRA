import React, { useEffect, useState } from "react";
import { getRoadmap } from "../../components/Services/RoadmapService";
// import roadmapData from "../../utils/RoadmapData";
import SkeletonRoadmapCard from "../../components/ui/SkeletonRoadmapCard";
import { BookOpen } from "lucide-react";

const Roadmap = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [roadmapData, setRoadmapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRoadmap();

        setRoadmapData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
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
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Roadmap Mata Kuliah
        </h1>

        <p className="text-slate-500 mt-2">
          Panduan mata kuliah berdasarkan semester pembelajaran.
        </p>
      </div>

      {/* ROADMAP */}
      <div className="space-y-8">
        {/* LOADING */}
        {loading ? (
          Array.from({ length: 4 }).map((_, semesterIndex) => (
            <div
              key={semesterIndex}
              className="
          bg-white/90
          backdrop-blur-sm

          rounded-[2rem]
          p-6

          shadow-sm
        "
            >
              {/* Semester Skeleton */}
              <div className="h-10 w-40 bg-slate-200 rounded-2xl mb-8 animate-pulse"></div>

              {/* Skeleton Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonRoadmapCard key={index} />
                ))}
              </div>
            </div>
          ))
        ) : roadmapData.length === 0 ? (
          /* EMPTY STATE */
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
            <BookOpen className="mx-auto w-12 h-12 text-slate-400" />

            <h3 className="text-2xl font-semibold text-slate-800 mt-5">
              Belum Ada Roadmap Mata Kuliah
            </h3>

            <p className="text-slate-500 mt-3 max-w-xl mx-auto leading-7">
              Roadmap mata kuliah belum tersedia. Silakan hubungi administrator
              untuk informasi lebih lanjut.
            </p>
          </div>
        ) : (
          roadmapData.map((item, semesterIndex) => (
            <div
              key={semesterIndex}
              className="
              h-full

              flex flex-col

              rounded-[2rem]
              p-6
              bg-white/90

              transition-all
        "
            >
              {/* HEADER SEMESTER */}
              <div className="flex items-center justify-between mb-8">
                {/* LEFT */}
                <div>
                  <span
                    className="
                inline-flex items-center gap-2

                bg-gradient-to-r
                from-indigo-500
                to-violet-500

                text-white

                px-5 py-2.5
                rounded-2xl

                text-sm
                font-semibold

                shadow-lg
                shadow-indigo-100
              "
                  >
                    Semester {item.semester}
                  </span>
                </div>
              </div>

              {/* COURSES */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {item.courses.map((course, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCourse(course)}
                    className={`
                relative
                overflow-hidden

                rounded-3xl
                p-5

                border

                transition-all duration-300

                hover:-translate-y-1
                hover:shadow-xl

                cursor-pointer

                group

                ${
                  course.peminatan === "Artificial Intelligence"
                    ? `
                      bg-gradient-to-br from-indigo-50 to-white
                      border-indigo-100
                      hover:shadow-indigo-100
                    `
                    : course.peminatan === "Cyber Security"
                      ? `
                        bg-gradient-to-br from-red-50 to-white
                        border-red-100
                        hover:shadow-red-100
                      `
                      : course.peminatan === "Pilihan"
                        ? `
                          bg-gradient-to-br from-green-50 to-white
                          border-green-100
                        `
                        : `
                          bg-gradient-to-br from-slate-50 to-white
                          border-slate-200
                          hover:shadow-slate-100
                         `
                }
              `}
                  >
                    {/* TOP ACCENT */}
                    <div
                      className={`
                  absolute top-0 left-0 w-full h-1

                  ${
                    course.peminatan === "Artificial Intelligence"
                      ? "bg-indigo-500"
                      : course.peminatan === "Cyber Security"
                        ? "bg-red-500"
                        : course.peminatan === "Pilihan"
                          ? "bg-green-500"
                          : "bg-slate-300"
                  }
                `}
                    />

                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3">
                      {/* LEFT */}
                      <div className="min-w-0 flex-1 flex flex-col h-full">
                        {/* CODE */}
                        <span
                          className="
                          inline-block
                          w-fit

                          text-[11px]
                          uppercase
                          tracking-wide

                          bg-white/80
                          text-slate-600

                          px-3 py-1
                          rounded-lg

                          border border-slate-200
                        "
                        >
                          {course.kode_mk}
                        </span>

                        {/* TITLE AREA */}
                        <div className="min-h-[72px] md:min-h-[88px]">
                          <h3
                            className="
                            font-bold
                            text-slate-800

                            mt-4

                            text-sm md:text-md
                            leading-snug

                            break-words

                            group-hover:text-indigo-700
                            transition-colors
                          "
                          >
                            {course.nama_mk}
                          </h3>
                        </div>

                        {/* SKS */}
                        <p className="text-sm text-slate-500 mt-3">
                          {course.sks} SKS
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
                          shrink-0

                          ${
                            course.peminatan === "Artificial Intelligence"
                              ? "bg-indigo-100 text-indigo-700"
                              : course.peminatan === "Cyber Security"
                                ? "bg-red-100 text-red-700"
                                : course.peminatan === "Pilihan"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-slate-100 text-slate-600"
                          }
                        `}
                      >
                        {course.peminatan === "Artificial Intelligence"
                          ? "AI"
                          : course.peminatan === "Cyber Security"
                            ? "Cyber"
                            : course.peminatan === "Pilihan"
                              ? "Pilihan"
                              : "Umum"}
                      </span>
                    </div>

                    {/* HOVER TEXT */}
                    {/* <div
                      className="
                  mt-6
                  pt-4

                  border-t border-slate-100

                  opacity-0
                  group-hover:opacity-100

                  transition-all duration-300
                "
                    >
                      <p className="text-sm text-slate-500 line-clamp-2 leading-6">
                        {course.deskripsi}
                      </p>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedCourse && (
        <div
          className="
      fixed inset-0 z-50

      bg-black/50
      backdrop-blur-sm

      flex items-end md:items-center justify-center

      p-0 md:p-5
    "
        >
          <div
            className="
        relative

        w-full
        md:max-w-2xl

        bg-white

        rounded-t-[2rem] md:rounded-[2rem]

        shadow-2xl

        max-h-[92vh]
        overflow-y-auto

        animate-in slide-in-from-bottom-5 fade-in
      "
          >
            {/* TOP ACCENT */}
            <div
              className={`
          h-1.5 w-full rounded-t-[2rem]

          ${
            selectedCourse.peminatan === "Artificial Intelligence"
              ? "bg-indigo-500"
              : selectedCourse.peminatan === "Cyber Security"
                ? "bg-red-500"
                : selectedCourse.peminatan === "Pilihan"
                  ? "bg-green-500"
                  : "bg-slate-300"
          }
        `}
            />

            {/* CLOSE */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="
          absolute top-4 right-4 z-10

          w-9 h-9
          rounded-xl

          bg-white
          border border-slate-200

          flex items-center justify-center

          text-slate-500
          hover:text-slate-800
          hover:bg-slate-50

          transition-all
        "
            >
              ✕
            </button>

            {/* CONTENT */}
            <div className="p-5 md:p-8">
              {/* HEADER */}
              <div className="pr-12">
                {/* BADGES */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {/* CODE */}
                  <span
                    className="
                text-[11px]
                uppercase
                tracking-wide

                bg-slate-100
                text-slate-700

                px-3 py-1.5
                rounded-xl

                border border-slate-200
              "
                  >
                    {selectedCourse.kode_mk}
                  </span>

                  {/* PEMINATAN */}
                  <span
                    className={`
                text-[11px]
                px-3 py-1.5
                rounded-xl
                font-medium

                ${
                  selectedCourse.peminatan === "Artificial Intelligence"
                    ? "bg-indigo-100 text-indigo-700"
                    : selectedCourse.peminatan === "Cyber Security"
                      ? "bg-red-100 text-red-700"
                      : selectedCourse.peminatan === "Pilihan"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                }
              `}
                  >
                    {selectedCourse.peminatan === "Artificial Intelligence"
                      ? "Artificial Intelligence"
                      : selectedCourse.peminatan === "Cyber Security"
                        ? "Cyber Security"
                        : selectedCourse.peminatan === "Pilihan"
                          ? "Pilihan"
                          : "Umum"}
                  </span>
                </div>

                {/* TITLE */}
                <h2
                  className="
              text-xl
              font-bold
              text-slate-900
              w-full

              leading-tight
              break-words
            "
                >
                  {selectedCourse.nama_mk}
                </h2>
              </div>

              {/* INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {/* SKS */}
                <div
                  className="
              rounded-2xl

              border border-slate-200

              bg-slate-50

              p-4
            "
                >
                  <p className="text-xs text-slate-500 mb-2">Jumlah SKS</p>

                  <h3 className="text-2xl font-bold text-slate-800">
                    {selectedCourse.sks}
                  </h3>
                </div>

                {/* PEMINATAN */}
                <div
                  className={`
              rounded-2xl
              border
              p-4

              ${
                selectedCourse.peminatan === "Artificial Intelligence"
                  ? "bg-indigo-50 border-indigo-100"
                  : selectedCourse.peminatan === "Cyber Security"
                    ? "bg-red-50 border-red-100"
                    : selectedCourse.peminatan === "Pilihan"
                      ? "bg-green-50 border-green-100"
                      : "bg-slate-50 border-slate-200"
              }
            `}
                >
                  <p className="text-xs text-slate-500 mb-2">
                    {selectedCourse.peminatan === "Pilihan"
                      ? "Mata Kuliah"
                      : "Peminatan"}
                  </p>

                  <h3 className="text-lg font-bold text-slate-800 break-words">
                    {selectedCourse.peminatan}
                  </h3>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div
                className="
            mt-5

            rounded-2xl

            border border-slate-200

            bg-white

            p-5
          "
              >
                <p className="text-xs text-slate-500 mb-3">
                  Deskripsi Mata Kuliah
                </p>

                <p
                  className="
              text-slate-700

              leading-7

              text-sm md:text-base
            "
                >
                  {selectedCourse.deskripsi}
                </p>
              </div>

              {/* FOOTER */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="
              px-5 py-3

              rounded-2xl

              bg-slate-900
              hover:bg-slate-800

              text-white
              font-medium

              transition-all
            "
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
