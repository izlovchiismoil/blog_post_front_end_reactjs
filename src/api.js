import axios from "axios";


// For form data enctype="multipart/form-data"
const API1 = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "multipart/form-data"
    }
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
    }
});

API.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) req.headers.authorization = `Bearer ${accessToken}`;
    return req;
});

API.interceptors.response.use((res) => {
    if (res.data.error) {
        console.log("Daxshat xatolik: ",res.data.error);
    }
});




// Users
export const createUser = (data) => API1.post(`/users/create`, data);
export const getUsers = () => API.get(`/users/all`);
export const getUserById = (id) => API.get(`/users/${id}`);
export const updateUser = (id, data) => API1.patch(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);


// Authenticate
export const loginUser = (credentials) => API.post("/auth/login", credentials);


// Post
export const createPost = (data) => API1.post("/posts/create", data);
export const getPosts = () => API.get("/posts/all");
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
