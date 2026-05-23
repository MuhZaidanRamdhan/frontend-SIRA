import axiosInstance from "../../api/axios";

export const generateRecommendation = async (query) => {
  const response = await axiosInstance.post("/recommend", {
    query,
  });

  return response.data;
};
