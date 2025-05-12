import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import Pagination from "./Pagination.jsx";
import {getPostsByCategoryId, getPosts} from "../api.js";

const PostCards = () => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (id) {
            getPostsByCategoryId(id).then((res) => {
                setPosts(res.data.posts);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setErrorMessage("Posts not found");
                setLoading(false);
            });
        }
        else {
            getPosts().then((res) => {
                setPosts(res.data.posts);
                setLoading(false);
            }).catch((err) => {
                if (err.status === 404) {
                    setErrorMessage("Pots Not Found");
                    setLoading(false);
                }
            });
        }
    }, [id]);
    if (errorMessage) {
        return (
            <h3>{errorMessage}</h3>
        )
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    return (posts.length &&
        <>
            <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
                {
                    posts.length !== 0 ? posts.map(post => (
                        <div className="card pb-3" key={post.id} style={{ width: "18rem" }}>
                            <img src={post.imageUrl} alt={post.title} className="card-img-top" />
                            <h3 className="card-title ps-2">{post.title}</h3>
                            <p className="card-text ps-2">{post.content}</p>
                            <Link to={`/posts/${post.id}`} className="card-link ps-2">Read more...</Link>
                        </div>
                    )
                    ) : <h3 className="text-info">{errorMessage}</h3>
                }
            </div>
            <Pagination />
        </>
    );
};

export default PostCards;