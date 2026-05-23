import axiosInstance from "../../api/axios";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");

  return response.data;
};
