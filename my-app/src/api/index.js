import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const signin = (data) => API.post("/user/signin", data);
export const signup = (data) => API.post("/user/signup", data);

export const getBlogsByRole = (userId, role) =>
  API.get(`/blog/role`, {
    params: { userId, role },
  });

export const getBlogBySearch = (params) =>
  API.get(`/blog/search`, { params });

export const createBlog = (data) => API.post("/blog", data);
export const deleteBlog = (id) => API.delete(`/blog/${id}`);
export const editBlog = (id, data) => API.put(`/blog/${id}`, data);
