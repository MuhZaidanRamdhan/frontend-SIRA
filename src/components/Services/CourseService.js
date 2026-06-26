import axiosInstance from "../../api/axios";

export const getCourses = async (page = 1, limit = 5, search = "") => {
  const response = await axiosInstance.get(
    `/courses?page=${page}&limit=${limit}&search=${search}`,
  );

  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axiosInstance.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (data) => {
  const response = await axiosInstance.post("/courses", data);
  return response.data;
};

export const updateCourse = async (id, data) => {
  const response = await axiosInstance.put(`/courses/${id}`, data);

  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axiosInstance.delete(`/courses/${id}`);

  return response.data;
};
