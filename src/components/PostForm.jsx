import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getPostById, createPost, updatePost, getCategories} from "../api.js";

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        shortTitle: "",
        content: "",
        authorId: "",
        categoryId: "",
        imageUrl: ""
    });
    const [categories, setCategories] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getCategories().then((res) => {
            console.log(res.data.categories);
            if (res?.data) setCategories(res.data.categories);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    useEffect(() => {
        if (id) {
            getPostById(id).then(res => {
                setFormData({
                    title: res.data.post.title || "",
                    shortTitle: res.data.post.shortTitle || "",
                    content: res.data.post.content || "",
                    authorId: res.data.post.authorId || "",
                    categoryId: res.data.post.category || "",
                    imageUrl: res.data.post.imageUrl || ""
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) await updatePost(id, formData);
        else await createPost(formData);
        navigate("/admin");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="shortTitle"
                placeholder="Short title"
                value={formData.shortTitle}
                onChange={handleChange}
                required
            />
            <textarea
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
                required
            />
            <select name="categoryId" required>
                {formData.categoryId === "" && categories && categories.map((category) => (<option key={category.id} value={category.id}>{category.title}</option>))}
                {formData.categoryId !== "" && categories.map((category) => (
                    category.id === formData.categoryId ? <option key={category.id} value={category.id} selected>{category.title}</option> : <option key={category.id} value={category.id}>{category.title}</option>
                ))}
            </select>
            <input type="text" value={formData.imageUrl} name="imageUrl" onChange={handleChange} placeholder="Image url" alt={formData.title} />
            <button type="submit">Save</button>
        </form>
    );
};

export default PostForm;
