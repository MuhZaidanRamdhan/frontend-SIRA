import {
  Upload,
  Database,
  AlertTriangle,
  CheckCircle2,
  X,
  FileText,
} from "lucide-react";

import { useRef, useState } from "react";
import { uploadSilabus } from "../../components/Services/UploadService";
import { showError, showSuccess } from "../../utils/Alert";
import { syncEmbedding } from "../../components/Services/EmbeddingService";

const UploadSilabus = () => {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setUploaded(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      setSelectedFile(file);
      setUploaded(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploaded(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const response = await uploadSilabus(selectedFile);

      setUploaded(true);

      showSuccess(
        "Upload Berhasil",
        response.message || "Silabus berhasil diunggah.",
      );

      setTimeout(() => {
        setSelectedFile(null);
        setUploaded(false);
      }, 1500);
    } catch (error) {
      showError(
        "Upload Gagal",
        error.response?.data?.message ||
          "Terjadi kesalahan saat mengunggah silabus.",
      );
    }
  };

  const handleSyncEmbedding = async () => {
    try {
      setSyncLoading(true);

      const response = await syncEmbedding();

      showSuccess(
        "Sinkronisasi Berhasil",
        response.message || "Embedding berhasil diperbarui.",
      );
    } catch (error) {
      showError(
        "Sinkronisasi Gagal",
        error.response?.data?.message ||
          "Terjadi kesalahan saat sinkronisasi embedding.",
      );
    } finally {
      setSyncLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Upload Silabus</h1>

        <p className="text-slate-500 mt-3 text-lg">
          Upload dataset silabus mata kuliah dan sinkronisasi embedding ke
          sistem RAG.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        {/* INFO BOX */}
        <div
          className="
            bg-amber-50
            border border-amber-200
            rounded-2xl
            p-4
            mb-6
          "
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-600" />

            <h3 className="font-semibold text-amber-800">
              Informasi Upload Dataset
            </h3>
          </div>

          <ul className="space-y-1.5 text-sm text-amber-700 leading-6">
            <li>
              • Upload dataset silabus akan memperbarui roadmap mata kuliah
              mahasiswa.
            </li>

            <li>
              • Pastikan format CSV sesuai dengan struktur kolom yang ada di
              database agar sinkronisasi berjalan dengan benar.
            </li>

            <li>
              • Setelah upload berhasil, lakukan proses{" "}
              <span className="font-semibold">Sync Embedding</span> agar data
              terbaru dapat digunakan oleh sistem rekomendasi RAG.
            </li>

            <li>
              • Jika embedding belum disinkronisasi, sistem rekomendasi masih
              menggunakan data lama.
            </li>

            <li>
              • Kolom CSV harus berisi:{" "}
              <span className="font-semibold">
                kode_mk, nama_mk, sks, peminatan dan deskripsi
              </span>
            </li>
          </ul>
        </div>

        {/* DROPZONE */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
          className="
            border-2 border-dashed border-slate-300
            rounded-3xl
            p-16
            text-center
            cursor-pointer
            hover:border-indigo-400
            hover:bg-indigo-50/30
            transition-all
          "
        >
          <Upload size={52} className="mx-auto text-slate-400" />

          <h2 className="text-3xl font-semibold text-slate-800 mt-6">
            Upload File Silabus CSV
          </h2>

          <p className="text-slate-500 mt-3 text-lg">
            Drag & drop file CSV atau klik untuk memilih file.
          </p>

          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* FILE PREVIEW */}
        {selectedFile && (
          <div
            className="
              mt-6
              border border-slate-200
              rounded-2xl
              p-5
              flex items-center justify-between
            "
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <FileText className="text-indigo-600" size={28} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {selectedFile.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {uploaded && (
                <CheckCircle2 className="text-green-500" size={28} />
              )}

              <button
                onClick={handleRemoveFile}
                className="
                  w-9 h-9
                  rounded-xl
                  hover:bg-red-50
                  flex items-center justify-center
                  text-slate-400
                  hover:text-red-500
                  transition-all
                "
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-6">
          {/* Upload */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="
              flex items-center gap-3
              bg-slate-900
              hover:bg-slate-800
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              px-6 py-4
              rounded-2xl
              font-semibold
              transition-all
            "
          >
            <Upload size={20} />
            Upload File
          </button>

          {/* Sync */}
          <button
            onClick={handleSyncEmbedding}
            disabled={syncLoading}
            className="
              flex items-center gap-3
              bg-gradient-to-r from-indigo-600 to-violet-600
              hover:opacity-90
              text-white
              px-6 py-4
              rounded-2xl
              font-semibold
              transition-all
            "
          >
            <Database size={20} />
            {syncLoading ? "Menyinkronkan..." : "Sinkronkan Embedding"}
          </button>

          {/* Download Template */}
          <a
            href="/file/template_silabus.csv"
            download="template_silabus.csv"
            className="
              flex items-center gap-3
              border border-slate-200
              hover:bg-slate-50
              text-slate-700
              px-6 py-4
              rounded-2xl
              font-semibold
              transition-all
            "
          >
            <FileText size={20} />
            Download Template
          </a>
        </div>
      </div>

      {/* ALUR SISTEM */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Alur Pengelolaan Data
        </h2>

        <p className="text-slate-500 mb-8">
          Proses pengelolaan data silabus hingga siap digunakan sistem
          rekomendasi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            {
              title: "Unggah Silabus",
              desc: "Admin mengunggah data silabus mata kuliah.",
            },
            {
              title: "Validasi Data",
              desc: "Sistem memeriksa dan menyimpan data ke basis data.",
            },
            {
              title: "Sinkronisasi",
              desc: "Data diproses agar siap digunakan oleh sistem rekomendasi.",
            },
            {
              title: "Rekomendasi Aktif",
              desc: "Mahasiswa dapat mengakses rekomendasi mata kuliah.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
          border border-slate-200
          rounded-2xl
          p-6
          bg-gradient-to-br
          from-white
          to-slate-50
          hover:shadow-md
          transition-all
        "
            >
              <div
                className="
            w-10 h-10
            rounded-2xl
            bg-indigo-100
            text-indigo-600
            flex items-center justify-center
            font-semibold
            mb-4
          "
              >
                {index + 1}
              </div>

              <h3 className="font-semibold text-slate-800 text-lg">
                {item.title}
              </h3>

              <p className="text-slate-500 mt-3 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadSilabus;
