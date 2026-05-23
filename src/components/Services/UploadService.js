import axiosInstance from "../../api/axios";

export const uploadSilabus = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axiosInstance.post("/upload-silabus", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
