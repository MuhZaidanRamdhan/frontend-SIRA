import axiosInstance from "../../api/axios";

export const getLogs = async () => {
  const response = await axiosInstance.get("/logs");

  return response.data;
};
