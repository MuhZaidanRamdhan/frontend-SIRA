import axiosInstance from "../../api/axios";

export const getRoadmap = async () => {
  const response = await axiosInstance.get("/courses/roadmap");

  return response.data;
};