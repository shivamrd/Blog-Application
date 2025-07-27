import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:8000'})

export const signin = (formData) => API.post('/user/signin',formData)

export const signup = (formData) => API.post('/user/signup',formData)

export const createBlog= (formData) => API.post('/blog/',formData)

export const getAllBlogs = (formData) => API.get('/blog/')

export const deleteBlog = (id) => API.delete(`/blog/${id}`)

export const editBlog = (id, formData) => API.put(`/blog/${id}`, formData)

export const getBlogBySearch = (searchQuery) =>
  API.get(`/blog/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
