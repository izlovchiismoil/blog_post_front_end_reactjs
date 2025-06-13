import {useContext, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {getPostsByCategoryId, getPostsByCategoryIdByAuthorId} from "../../api.js";
import {useAuth} from "../../contexts/AuthContext.jsx";

const UserPostsOfCategory = () => {
    const [posts, setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    const { userAuth } = useAuth();
    useEffect(() => {
        getPostsByCategoryIdByAuthorId(userAuth.userId, id)
            .then((res) => setPosts(res.data.posts))
            .catch((err) => setErrorMessage(err.message));
    },[id]);

    const handleDelete = (e) => {
        console.log("delete", e);
    }

    return (
        <div className="col">
            {posts?.length ?
                (
                    <>
                        <div className="col-12 row shadow pt-3 pb-3">
                            <span className="col fw-bold">Post title</span>
                            <span className="col fw-bold">Post author</span>
                            <span className="col fw-bold">Post category</span>
                            <div className="col-3"></div>
                        </div>
                        {
                            posts.map(post =>
                                (
                                    <div className="col-12 row shadow mb-2 pt-2 pb-2" key={post?.id}>
                                        <NavLink to={`/user/posts/${post?.id}`}
                                                 className="col text-decoration-none">{post.title}</NavLink>
                                        <span className="col text-decoration-none">{post?.user?.username}</span>
                                        <NavLink to={`/user/posts/category/${post?.categoryId}`}
                                                 className="col text-decoration-none">{post.category.title}</NavLink>
                                        <div className="col-3 pt-2 pb-2 row">
                                            <NavLink to={`/user/posts/${post?.id}`} className="col">View</NavLink>
                                            <NavLink to={`/user/posts/${post?.id}/update`} className="col">Edit</NavLink>
                                            <button className="col nav-link" onClick={() => handleDelete(post?.id)}>Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </>

                ): <div className="col alert alert-danger" role="alert">No posts of category</div>
            }
        </div>
    );
}

export default UserPostsOfCategory;