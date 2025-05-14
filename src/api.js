import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

API.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) req.headers.authorization = `Bearer ${accessToken}`;
    return req;
});

export const getUserById = (userId) => API.get(`/users/${userId}`);
export const getPosts = () => API.get("/posts/all");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const getPostsByCategoryId = (id) => API.get(`/posts/category/${id}`);
export const createPost = (data) => API.post("/posts/create", data);
export const updatePost = (id, data) => API.patch(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const getCategories = () => API.get(`/categories/all`);
export const getCategory = (id) => API.get(`/categories/${id}`);
export const createCategory = (data) => API.post(`/categories/create`, data);
export const updateCategory = (id, data) => API.patch(`/categories/${id}`, data);
export const login = (credentials) => API.post("/auth/login", credentials);