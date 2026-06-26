import axiosInstance from "../../api/axios";

export const getLogs = async (page = 1, limit = 5) => {
  const response = await axiosInstance.get(`/logs?page=${page}&limit=${limit}`);
  return response.data;
};
