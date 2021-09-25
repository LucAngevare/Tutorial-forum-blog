const axios = require("axios");

const api = axios.create({
    baseURL: "http://localhost:3355/api"
});

export const insertPost = (payload) => api.post("/movie", payload);
export const updatePostByID = (id, payload) => api.put(`/posts/${id}`, payload);
export const deletePostByID = (id) => api.delete(`/posts/${id}`);
export const getPostByID = (id) => api.get(`/movie/${id}`);
export const getAllPosts = () => api.get("/posts");

const APIs = {
    insertPost,
    updatePostByID,
    deletePostByID,
    getPostByID,
    getAllPosts
};

export default APIs;