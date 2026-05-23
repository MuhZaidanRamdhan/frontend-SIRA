import axiosInstance from "../../api/axios";

export const getRoadmap = async () => {
  const response = await axiosInstance.get("/mata-kuliah/roadmap");

  return response.data;
};