import axios from "axios";


// For form data enctype="multipart/form-data"
const API1 = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "multipart/form-data"
    },
    credentials: "include"
});

API1.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) req.headers.authorization = `Bearer ${accessToken}`;
    return req;
});


// For JSON format
const API = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

API.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) req.headers.authorization = `Bearer ${accessToken}`;
    return req;
});

// API.interceptors.response.use((res) => res, async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//             const res = await refreshAccessToken();
//             const newAccessToken = res.data.accessToken;
//             localStorage.setItem("accessToken", newAccessToken);
//             originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
//             return API(originalRequest);
//         }
//         catch (refreshError) {
//             console.error("Refresh token xatosi: ", refreshError);
//             return Promise.reject(refreshError);
//         }
//     }
//     return Promise.reject(error);
// });




// Users
export const createUser = (data) => API1.post(`/users/create`, data);
export const getUsers = () => API.get(`/users/all`);
export const getUserById = (id) => API.get(`/users/${id}`);
export const updateUser = (id, data) => API1.patch(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);


// Authenticate
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const refreshAccessToken = () => API.post(`/auth/refresh`);


// Post
export const createPost = (data) => API1.post("/posts/create", data);
export const getPosts = () => API.get("/posts/all");
export const getPostsByPagination = (page, limit) => API.get(`/posts?page=${page}&limit=${limit}`);
export const getPostById = (id) => API.get(`/posts/${id}`);
export const getPostsByAuthorId = (id) => API.get(`/posts/author/${id}`);
export const getPostsByCategoryIdByAuthorId = (authorId, categoryId) => API.get(`/posts/users/${authorId}/posts?categoryId=${categoryId}`);
export const updatePost = (id, data) => API.patch(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);


// Categories
export const createCategory = (data) => API.post(`/categories/create`, data);
export const getCategoryById = (id) => API.get(`/categories/${id}`);
export const getPostsByCategoryId = (id) => API.get(`/posts/category/${id}`);
export const getCategories = () => API.get(`/categories/all`);
export const updateCategory = (id, data) => API.patch(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
