import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {getCategoryById} from "../../api.js";

const UserCategoryDetail = () => {
    const [category, setCategory] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        getCategoryById(id)
            .then((res) => {
                setCategory(res.data.category);
            })
            .catch((err) => {setErrorMessage(err.message); });
    },[id]);
    return (
        category ? (
            <div className="col">
                <div className="d-flex justify-content-end align-items-center pe-5">
                    <NavLink to={`/user/categories/${id}/update`} className="btn btn-primary">Edit category</NavLink>
                </div>
                <div className="row shadow pt-4 pb-4">
                    <span className="col">Category title</span>
                    <span className="col">{category.title}</span>
                </div>
                <div className="row shadow pt-4 pb-4">
                    <span className="col">Category created date</span>
                    <span className="col">{category.createdAt}</span>
                </div>
                <div className="row shadow pt-4 pb-4">
                    <span className="col">Category updated at</span>
                    <span className="col">{category.updatedAt}</span>
                </div>
            </div>
        ) : <h3>No category</h3>
    );
}

export default UserCategoryDetail;