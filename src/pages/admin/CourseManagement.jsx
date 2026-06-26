import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../components/Services/CourseService";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
function CourseManagement() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [formData, setFormData] = useState({
    kode_mk: "",
    nama_mk: "",
    semester: "",
    sks: "",
    peminatan: "Umum",
    deskripsi: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses(page, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [page, search]);

  const fetchCourses = async (currentPage = 1, keyword = "") => {
    try {
      setLoading(true);

      const response = await getCourses(currentPage, 5, keyword);

      if (response.success) {
        setCourses(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      kode_mk: "",
      nama_mk: "",
      semester: "",
      sks: "",
      peminatan: "Umum",
      deskripsi: "",
    });

    setSelectedCourse(null);
  };

  const handleOpenCreate = () => {
    resetForm();

    setOpenModal(true);
  };

  const handleOpenEdit = async (id) => {
    try {
      const response = await getCourseById(id);

      if (response.success) {
        setSelectedCourse(response.data);

        setFormData({
          kode_mk: response.data.kode_mk,
          nama_mk: response.data.nama_mk,
          semester: response.data.semester,
          sks: response.data.sks,
          peminatan: response.data.peminatan,
          deskripsi: response.data.deskripsi,
        });

        setOpenModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      if (selectedCourse) {
        const response = await updateCourse(selectedCourse.id, formData);

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: response.message || "Mata kuliah berhasil diperbarui.",
          });
        }
      } else {
        const response = await createCourse(formData);

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: response.message || "Mata kuliah berhasil ditambahkan.",
          });
        }
      }

      setOpenModal(false);

      resetForm();

      fetchCourses(page, search);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan pada sistem.",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Mata Kuliah?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await deleteCourse(id);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: response.message || "Mata kuliah berhasil dihapus.",
        });

        fetchCourses(page, search);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan pada sistem.",
      });
    }
  };
  return (
    <div>
      <>
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Manajemen Mata Kuliah
              </h1>

              <p className="text-slate-500 mt-2">
                Kelola data mata kuliah pada sistem SIRA.
              </p>
            </div>

            <button
              onClick={handleOpenCreate}
              className="
            px-5 py-3

            rounded-2xl

            bg-indigo-600
            hover:bg-indigo-700

            text-white
            font-semibold

            transition-all
          "
            >
              Tambah Mata Kuliah
            </button>
          </div>

          {/* SEARCH */}
          <div
            className="
          flex items-center gap-3

          border border-slate-200
          rounded-2xl

          px-4 py-3

          mb-8
        "
          >
            <Search size={20} className="text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Cari nama atau kode mata kuliah..."
              className="
            flex-1
            
            bg-transparent
            outline-none
            text-slate-600
            placeholder:text-slate-400 
          "
            />
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-center py-4">Kode</th>
                  <th className="text-center py-4">Nama Mata Kuliah</th>
                  <th className="text-center py-4">Semester</th>
                  <th className="text-center py-4">SKS</th>
                  <th className="text-center py-4">Peminatan</th>
                  <th className="text-center py-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {courses.length > 0 ? (
                  courses.map((item) => (
                    <tr
                      key={item.id}
                      className="
                    border-b border-slate-100
                    hover:bg-slate-50
                  "
                    >
                      <td className="py-5 text-center">{item.kode_mk}</td>

                      <td className="py-5 text-center font-medium text-slate-800">
                        {item.nama_mk}
                      </td>

                      <td className="py-5 text-center">{item.semester}</td>

                      <td className="py-5 text-center">{item.sks}</td>

                      <td className="py-5 text-center">
                        <span
                          className={`
                        px-3 py-1
                        rounded-xl
                        text-sm

                        ${
                          item.peminatan === "Artificial Intelligence"
                            ? "bg-indigo-100 text-indigo-700"
                            : item.peminatan === "Cyber Security"
                              ? "bg-red-100 text-red-700"
                              : item.peminatan === "Pilihan"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700"
                        }
                      `}
                        >
                          {item.peminatan}
                        </span>
                      </td>

                      <td className="py-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(item.id)}
                            className="
                          px-3 py-2

                          rounded-xl

                          bg-amber-100
                          text-amber-700

                          hover:bg-amber-200
                        "
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="
                          px-3 py-2

                          rounded-xl

                          bg-red-100
                          text-red-700

                          hover:bg-red-200
                        "
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-14">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-slate-800">
                          Mata Kuliah Tidak Ditemukan
                        </h3>

                        <p className="text-slate-500 mt-3">
                          Sistem tidak menemukan mata kuliah yang sesuai dengan
                          kata kunci pencarian.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setPage(page - 1)}
                disabled={!pagination.has_prev}
                className="
                px-4 py-2

                rounded-xl

                border border-slate-200

                disabled:opacity-40
              "
              >
                <ChevronLeft size={20} /> 
              </button>

              <span className="text-slate-500">
                {pagination.current_page} / {pagination.total_pages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={!pagination.has_next}
                className="
                px-4 py-2

                rounded-xl

                bg-indigo-600

                text-white

                disabled:opacity-40
              "
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* MODAL */}
        {openModal && (
          <div
            className="
          fixed inset-0

          bg-black/40
          backdrop-blur-sm

          flex items-center justify-center

          z-50

          p-4
        "
          >
            <div
              className="
            w-full max-w-3xl

            bg-white

            rounded-3xl

            p-8

            max-h-[90vh]
            overflow-y-auto
          "
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {selectedCourse ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Lengkapi data mata kuliah.
                  </p>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="
                w-10 h-10

                rounded-xl

                bg-slate-100
              "
                >
                  ✕
                </button>
              </div>

              {/* FORM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2">Kode Mata Kuliah</label>

                  <input
                    type="text"
                    name="kode_mk"
                    value={formData.kode_mk}
                    onChange={handleChange}
                    className="
                  w-full

                  border border-slate-200
                  rounded-2xl

                  px-4 py-3
                "
                  />
                </div>

                <div>
                  <label className="block mb-2">Semester</label>

                  <input
                    type="number"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="
                  w-full

                  border border-slate-200
                  rounded-2xl

                  px-4 py-3
                "
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2">Nama Mata Kuliah</label>

                  <input
                    type="text"
                    name="nama_mk"
                    value={formData.nama_mk}
                    onChange={handleChange}
                    className="
                  w-full

                  border border-slate-200
                  rounded-2xl

                  px-4 py-3
                "
                  />
                </div>

                <div>
                  <label className="block mb-2">SKS</label>

                  <input
                    type="number"
                    name="sks"
                    value={formData.sks}
                    onChange={handleChange}
                    className="
                  w-full

                  border border-slate-200
                  rounded-2xl

                  px-4 py-3
                "
                  />
                </div>

                <div>
                  <label className="block mb-2">Peminatan</label>

                  <select
                    name="peminatan"
                    value={formData.peminatan}
                    onChange={handleChange}
                    className="
                  w-full

                  border border-slate-200
                  rounded-2xl

                  px-4 py-3
                "
                  >
                    <option value="Umum">Umum</option>

                    <option value="Artificial Intelligence">
                      Artificial Intelligence
                    </option>

                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2">Deskripsi Mata Kuliah</label>

                  <textarea
                    rows={5}
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    className="
                  w-full

                  border border-slate-200
                  rounded-2xl

                  px-4 py-3

                  resize-none
                "
                  />
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={handleCloseModal}
                  className="
                px-5 py-3

                rounded-2xl

                border border-slate-200
              "
                >
                  Batal
                </button>

                <button
                  onClick={handleSubmit}
                  className="
                px-5 py-3

                rounded-2xl

                bg-indigo-600
                hover:bg-indigo-700

                text-white
                font-semibold
              "
                >
                  {selectedCourse ? "Simpan Perubahan" : "Tambah Mata Kuliah"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default CourseManagement;
