import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {getCategoryById, updateCategory} from "../../api.js";

const UserCategoryUpdate = () => {
    const [category, setCategory] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    const categoryId = Number(id);
    const { userAuth } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        getCategoryById(categoryId)
            .then((res) => {
                setCategory(res.data.category);
            })
            .catch(err => setErrorMessage(err.message));
    },[categoryId]);

    const handleChange = (e) => setCategory(prevCategory => ({ ...prevCategory, [e.target.name]: e.target.value }));
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategory(categoryId, {category: { title: category.title }});
            navigate("/user/categories");
        }
        catch (err) {
            setErrorMessage(err.message);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="col form">
            {errorMessage && (<div className="mb-3 alert alert-danger" role="alert">{errorMessage}</div>)}
            <div className="mb-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" name="title" className="form-control" value={category?.title ?? ""} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input type="submit" value="Save changes" className="btn btn-primary" />
                </div>
            </div>
        </form>
    );
}

export default UserCategoryUpdate;