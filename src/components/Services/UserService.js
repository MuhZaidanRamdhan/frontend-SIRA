import axiosInstance from "../../api/axios";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");

  return response.data;
};

export const getUsersManagement = async (page = 1, search = "") => {
  const response = await axiosInstance.get(
    `/users-management?page=${page}&search=${search}`,
  );

  return response.data;
  log(response.data);
};
