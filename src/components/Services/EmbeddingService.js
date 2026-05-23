import axiosInstance from "../../api/axios";

export const syncEmbedding = async () => {
  const response = await axiosInstance.post("/sync-embedding");

  return response.data;
};

export const getEmbeddingStatus = async () => {
  const response = await axiosInstance.get("/embedding-status");

  return response.data;
};
