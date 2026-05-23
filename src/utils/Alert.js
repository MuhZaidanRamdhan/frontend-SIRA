import Swal from "sweetalert2";

export const showSuccess = (title, text) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#4f46e5",
    confirmButtonText: "OK",
  });
};

export const showError = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Tutup",
  });
};

export const showConfirm = async (title, text) => {
  return await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
};
