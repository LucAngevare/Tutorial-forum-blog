const axios = require("axios");

const api = axios.create({
    baseURL: "http://blog.lucangevare.nl:3355/api"
});

export const insertPost = (payload) => api.post("/post", payload);
export const updatePostByID = (id, payload) => api.put(`/posts/${id}`, payload);
export const deletePostByID = (id) => api.delete(`/posts/${id}`);
export const getPostByID = (id) => api.get(`/post/${id}`);
export const getAllPosts = () => api.get("/posts");
export const checkLogin = (payload) => api.post("/user/check", payload);
export const getUserByID = (id) => api.get(`/user/${id}`);
export const getAllUsers = () => api.get("/user/all");
export const signUp = (payload) => api.post("/user/signup", payload);
export const getAllPostsByUser = (id) => api.get(`/posts/user/${id}`);

const APIs = {
    insertPost,
    updatePostByID,
    deletePostByID,
    getPostByID,
    getAllPosts,
    checkLogin,
    getUserByID,
    getAllUsers,
    signUp,
    getAllPostsByUser
};

export default APIs;
