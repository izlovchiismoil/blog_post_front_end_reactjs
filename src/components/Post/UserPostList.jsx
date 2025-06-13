import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {deletePost, getPosts, getPostsByAuthorId} from "../../api.js";
import {useAuth} from "../../contexts/AuthContext.jsx";

const UserPostList = () => {
    const [posts, setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { userAuth } = useAuth();
    useEffect(() => {
        if (userAuth.isAdmin) {
            getPosts().then((res) => {
                setPosts(res.data.posts);
            }).catch((err) => {
                setErrorMessage(err.message);
            });
        }
        else {
            getPostsByAuthorId(userAuth.userId).then((res) => {
                setPosts(res.data.posts);
            }).catch((err) => {
                setErrorMessage(err.message);
            });
        }
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;
        try {
            await deletePost(id);
            navigate(0);
        }
        catch (err) {
            setErrorMessage(err.message);
        }
    }
    return (
        <div className="col row">
            <div className="col-12 d-flex justify-content-end pe-5 mb-3">
                <NavLink to={`create`} className="btn btn-primary">+ Create post</NavLink>
            </div>
            {posts?.length > 0  ?
                (
                    <>
                        <div className="col-12 row shadow pt-3 pb-3 mb-3">
                            <span className="col fw-bold">Title</span>
                            <span className="col fw-bold">Author</span>
                            <span className="col fw-bold">Category</span>
                            <div className="col-3 fw-bold"></div>
                        </div>
                        {
                            posts.map(post =>
                            (
                                <div className="col-12 row shadow mb-2 pt-2 pb-2" key={post.id}>
                                    <NavLink to={`/user/posts/${post.id}`}
                                             className="col text-decoration-none">{post.title}</NavLink>
                                    <span className="col text-decoration-none">{post.user.username}</span>
                                    <NavLink to={`/user/posts/category/${post.categoryId}`}
                                             className="col text-decoration-none">{post.category.title}</NavLink>
                                    <div className="col-3 pt-2 pb-2 row">
                                        <NavLink to={`/posts/${post.id}`} target="_blank" className="col">View</NavLink>
                                        <NavLink to={`/user/posts/${post.id}/update`} className="col">Edit</NavLink>
                                        <button className="col nav-link" onClick={() => handleDelete(post.id)}>Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                        }
                    </>
                ): <div className="col alert alert-danger" role="alert">{errorMessage}</div>
            }
        </div>
    )
}

export default UserPostList;