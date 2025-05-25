import {useState} from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {createPost, getCategories} from "../../api.js";
import {useAuth} from "../../contexts/AuthContext.jsx";

const UserPostCreate = () => {
    const { userAuth } = useAuth()
    const [post, setPost] = useState({
        title: "",
        shortTitle: "",
        content: "",
        categoryId: "",
        postImage: null,
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [categories, setCategories] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.data.categories);
        }).catch((err) => {
            setErrorMessage(err.message);
        });
    }, []);

    const handleChange = (e) => {
        const {name, type, value, files} = e.target;
        setPost((prev) => ({...prev, [name]:type==="file" ? files[0]: (name === "categoryId" ? Number(value) : value)}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in post) {
            formData.append(key, post[key]);
        }
        formData.append("authorId", userAuth.userId);
        const res = await createPost(formData);
        navigate("/user/posts");
    }

    return (
            <form onSubmit={handleSubmit} encType={"multipart/form-data"} className="form">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={post?.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="shortTitle" className="form-label">Short title</label>
                    <input
                        type="text"
                        id="shortTitle"
                        name="shortTitle"
                        placeholder="Short title"
                        value={post?.shortTitle}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Content"
                        value={post?.content}
                        onChange={handleChange}
                        className="form-control"
                        style={{ height: "200px" }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryId" className="form-label">Categories</label>
                    <select
                        id="categoryId"
                        className="form-select"
                        name="categoryId"
                        value={post?.categoryId ?? ""}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a category</option>
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
                    <label htmlFor="postImage" className="form-label">Choose post image</label>
                    <input type="file" id="postImage" className="form-control" name="postImage" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
            </form>
    );
}

export default UserPostCreate;