import React, { createContext, useContext, useEffect, useState } from "react";
import {getCategories, getPostsByPagination} from "../api.js";

export const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostsProvider = ({ children }) => {
    const [postsData, setPostsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);


    const fetchPosts = async (curPage, limData) => {
        const res = await getPostsByPagination(curPage, limData);
        setPostsData(res.data.posts);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
    };
    const fetchCategories = async () => {
        const res = await getCategories();
        setCategoriesData(res.data.categories);
    };
    useEffect(() => {
        const fetchAll = async () => {
            await fetchPosts(currentPage, limit);
            await fetchCategories();
        };
        fetchAll();
    }, [currentPage, setCurrentPage]);

    return (
        <PostContext.Provider value={{
            posts: postsData,
            categories: categoriesData,
            refetchPosts: fetchPosts,
            refetchCategories: fetchCategories,
            currentPage,
            setCurrentPage,
            limit,
            setLimit,
            totalPages,
            setTotalPages
        }} >
            { children }
        </PostContext.Provider>
    )
}