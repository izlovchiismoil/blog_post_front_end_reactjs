import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import Pagination from "../Pagination.jsx";
import {getPostsByCategoryId, getPosts} from "../../api.js";

const PostCards = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if (id) {
            getPostsByCategoryId(id).then((res) => {
                setPosts(res.data.posts);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setErrorMessage("Post not found");
            });
        }
        else {
            getPosts().then((res) => {
                setPosts(res.data.posts);
                setLoading(false);
            }).catch((err) => {
                if (err.status === 404) {
                    setErrorMessage("Post not found");
                }
            });
        }
    }, [id]);
    if (loading) {
        return <p>Loading...</p>
    }

    return (posts.length ?
        (
            <>
                <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
                    {
                        posts.map(post => (
                                <div className="card pb-3" key={post.id} style={{ width: "18rem" }}>
                                    {post.postImage && (<img src={`http://localhost:3000/images/posts/${post?.postImage ?? "no-image.png"}`} alt="post-image" className="card-img-top" />)}
                                    <h3 className="card-title ps-2">{post.title}</h3>
                                    <p className="card-text ps-2">{post.content}</p>
                                    <Link to={`/posts/${post.id}`} className="card-link ps-2">Read more...</Link>
                                </div>
                            )
                        )
                    }
                </div>
                <Pagination />
            </>
        ) : <h3 className="text-info">No posts</h3>
    );
};

export default PostCards;