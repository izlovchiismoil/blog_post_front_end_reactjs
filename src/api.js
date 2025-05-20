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




// Users
export const createUser = (user) => API1.post(`/users/create`, user);
export const getUsers = () => API.get(`/users/all`);
export const getUserById = (userId) => API.get(`/users/${userId}`);
export const updateUser = (userId, user) => API1.patch(`/users/${userId}`, user);


// Authenticate
export const loginUser = (credentials) => API.post("/auth/login", credentials);


// Posts
export const createPost = (data) => API.post("/posts/create", data);
export const getPosts = () => API.get("/posts/all");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const getPostsByUserId = (userId) => API.get(`/posts/category/${userId}`);
export const updatePost = (postId, postData) => API.patch(`/posts/${postId}`, postData);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);


// Categories
export const createCategory = (data) => API.post(`/categories/create`, data);
export const getCategory = (categoryId) => API.get(`/categories/${categoryId}`);
export const getPostsByCategoryId = (categoryId) => API.get(`/posts/category/${categoryId}`);
export const getCategories = () => API.get(`/categories/all`);
export const updateCategory = (id, data) => API.patch(`/categories/${id}`, data);
