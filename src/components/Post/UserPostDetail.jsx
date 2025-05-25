import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {getPostById} from "../../api.js";

const UserPostDetail = () => {
    const [post, setPost] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        getPostById(id).then((res) => {
            setPost(res.data.post);
        }).catch(err => setErrorMessage(err.message));
    }, [id]);
    return (
        <div className="col row">
            <div className="col-12 d-flex justify-content-end align-items-center pt-3 pb-3">
                <NavLink to={`/user/posts/${post?.id}/update`} className="btn btn-primary text-decoration-none me-4">Edit post</NavLink>
            </div>
            {post ? (
                <>
                    <div className="row shadow pt-3 pb-3">
                        <span className="col">Post id</span>
                        <span className="col">{post?.id ?? ""}</span>
                    </div>
                    <div className="row shadow pt-3 pb-3">
                        <span className="col">Post title</span>
                        <p className="col">{post?.title ?? ""}</p>
                    </div>
                    <div className="row shadow pt-3 pb-3">
                        <span className="col">Short title</span>
                        <p className="col">{post?.shortTitle ?? ""}</p>
                    </div>
                    <div className="row shadow pt-3 pb-3">
                        <span className="col">Post author</span>
                        <span className="col">{post?.user?.username ?? ""}</span>
                    </div>
                    <div className="row shadow pt-3 pb-3">
                        <span className="col">Post category</span>
                        <span className="col">{post?.category?.title ?? ""}</span>
                    </div>
                    <div className="row shadow pt-3 pb-3">
                        <span className="col">Post cerated date</span>
                        <span className="col">{post?.createdAt ?? ""}</span>
                    </div>
                    <div className="row shadow pt-3 pb-3">
                        <span className="col">Post updated date</span>
                        <span className="col">{post?.updatedAt ?? ""}</span>
                    </div>
                    <div className="row shadow pt-3 pb-3">
                        <span className="col">Post content</span>
                        <p className="col">{post?.content ?? ""}</p>
                    </div>
                </>
            ) : <h3 className="col">No post</h3> }
        </div>
    );
}

export default UserPostDetail;