import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api.js";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);

    const fetchData = () => {
        getPosts().then((res) => setPosts(res.data.posts)).catch(console.error);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await deletePost(id);
            fetchData();
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <Link to="/admin/new">+ Create New Post</Link>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title}
                        <Link to={`/admin/edit/${post.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
