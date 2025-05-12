import React, { createContext, useContext, useEffect, useState } from "react";
import {getCategories, getPosts} from "../api.js";

export const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostsProvider = ({ children }) => {
    const [postsData, setPostsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);

    const fetchPosts = async () => {
        const res = await getPosts();
        setPostsData(res.data.posts);
    };
    const fetchCategories = async () => {
        const res = await getCategories();
        setCategoriesData(res.data.categories);
    };
    useEffect(() => {
        fetchCategories();
        fetchPosts();
    }, []);
    return (
        <PostContext.Provider value={{ posts: postsData, categories: categoriesData, refetchPosts: fetchPosts, refetchCategories: fetchCategories }} >
            { children }
        </PostContext.Provider>
    )
}