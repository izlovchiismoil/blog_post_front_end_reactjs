import { useState, useEffect } from "react";
import {getCategories, getPostById, updatePost, updateUser} from "../../api.js";
import {useNavigate, useParams} from "react-router-dom";

const UserPostUpdate = () => {
    const [post, setPost] = useState(null);
    const [initialPost, setInitialPost] = useState(null);
    const [categories, setCategories] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPostById(id).then((res) => {
            setPost(res.data.post);
            setInitialPost(res.data.post);
        }).catch((err) => {
            setErrorMessage(err.message);
        });
        getCategories().then((res) => {
            setCategories(res.data.categories);
        }).catch((err) => {
            setErrorMessage(err.message);
        });
    },[id]);

    const handleChange = (e) => {
        const {name, type, value, files} = e.target;
        setPost((prev) => ({...prev, [name]:type==="file" ? files[0]: (name === "categoryId" ? Number(value) : value)}));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const changedFields = new FormData();
        for (let key in post) {
            if (key === "postImage" && post[key]) {
                changedFields.append(key, post[key]);
            } else if (initialPost[key] !== post[key]) {
                changedFields.append(key, post[key]);
            }
        }
       if (![...changedFields.entries()].length) {
           setErrorMessage("No changes made.");
           return;
       }
       try {
           await updatePost(id, changedFields);
           navigate("/user/posts");
       }
       catch (err) {
           setErrorMessage(err.message);
       }
    }
    return (
        post ? (
            <form onSubmit={handleSubmit} encType={"multipart/form-data"} className="form">
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={post?.title}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="shortTitle"
                        placeholder="Short title"
                        value={post?.shortTitle}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3 form-floating">
                    <textarea
                        name="content"
                        placeholder="Content"
                        value={post?.content}
                        onChange={handleChange}
                        className="form-control"
                        style={{ height: "200px" }}
                    />
                </div>
                <div className="mb-3">
                    <select
                        id="categoryId"
                        className="form-select"
                        name="categoryId"
                        value={post?.categoryId ?? ""}
                        onChange={handleChange}
                    >
                        {
                            categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <input type="file" id="postImage" className="form-control" name="postImage" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
            </form>
        ) : <h3>No post</h3>
    );
}

export default UserPostUpdate;