import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {usePosts} from "../../contexts/PostContext.jsx";
import {getPostById} from "../../api.js";

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getPostById(id).then((res) => {
            setPost(res.data.post);
        }).catch((err) => {
            setErrorMessage(err.message);
        });
    }, [id]);
    return (post &&
                (
                    <>
                        <div>
                            <h1>{errorMessage}</h1>
                            <h2>{post.title}</h2>
                            <img src={`http://localhost:3000/api/v1/images/posts/${post.postImage}`} alt={post.title} style={{ width: "100%" }} />
                            <p>{post.content}</p>
                        </div>
                    </>
                )
            )
};

export default PostDetail;