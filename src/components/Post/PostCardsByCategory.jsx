import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getPostsByCategoryId} from "../../api.js";

const PostCardsByCategory = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getPostsByCategoryId(id).then((res) => {
            setPosts(res?.data?.posts);
        }).catch((err) => {
            setPosts([]);
            setErrorMessage(err.message);
        });
    },[id]);
    return (posts.length > 0 ?
            (
                <>
                    <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
                        {
                            posts.map(post => (
                                    <div className="card pb-3" key={post.id} style={{ width: "18rem" }}>
                                        {post?.postImage && (<img src={`http://localhost:3000/api/v1/images/posts/${post?.postImage ?? "no-image.png"}`}  alt="post-image" className="card-img-top" style={{height: "200px"}} />)}
                                        <h3 className="card-title">{post.title}</h3>
                                        <p className="card-text">{post.shortTitle}</p>
                                        <Link to={`/posts/${post.id}`} className="card-link ps-2">Read more...</Link>
                                    </div>
                                )
                            )
                        }
                    </div>
                </>
            ) : (errorMessage && (<div className="alert alert-info">{errorMessage}</div>))
    );
}

export default PostCardsByCategory;