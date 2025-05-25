import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../api.js";

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        getPostById(id).then((res) => {
            setPost(res.data.post);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    return (post &&
                (
                    <>
                        <div>
                            <h2>{post.title}</h2>
                            <img src={post.imageUrl} alt={post.title} style={{ width: "100%" }} />
                            <p>{post.content}</p>
                        </div>
                    </>
                )
            )
};

export default PostDetail;