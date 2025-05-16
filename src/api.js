import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});
API.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) req.headers.authorization = `Bearer ${accessToken}`;
    return req;
});
export const getUsers = () => API.get(`/users/all`);
export const getUserById = (userId) => API.get(`/users/${userId}`);
export const updateUser = (userId, user) => API.patch(`/users/${userId}`, user);
export const getPosts = () => API.get("/posts/all");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const getPostsByCategoryId = (categoryId) => API.get(`/posts/category/${categoryId}`);
export const getPostsByUserId = (userId) => API.get(`/posts/category/${userId}`);
export const createPost = (data) => API.post("/posts/create", data);
export const updatePost = (postId, data) => API.patch(`/posts/${postId}`, data);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const getCategories = () => API.get(`/categories/all`);
export const getCategory = (categoryId) => API.get(`/categories/${categoryId}`);
export const createCategory = (data) => API.post(`/categories/create`, data);
export const updateCategory = (id, data) => API.patch(`/categories/${id}`, data);
export const loginUser = (credentials) => API.post("/auth/login", credentials);