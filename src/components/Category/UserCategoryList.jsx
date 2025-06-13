import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {getCategories} from "../../api.js";
import {NavLink, useNavigate} from "react-router-dom";
import { deleteCategory } from "../../api.js";

const UserCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { userAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getCategories().then(res => {
            setCategories(res.data.categories);
        }).catch(err => setErrorMessage(err.message));
    },[]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        try {
            await deleteCategory(id);
            navigate(0);
        }
        catch(err) {
            setErrorMessage(err.message);
        }
    }

    return (
        <div className="col row">
            {userAuth.isAdmin && (
                <div className="col-12 d-flex justify-content-end align-items-center pt-3 pb-3 pe-5 mb-3">
                    <NavLink to={`/user/categories/create`} className="btn btn-primary">+ Create category</NavLink>
                </div>
            )
            }
            {
                categories?.length > 0 ? categories.map((category) => (
                    <div className="row pt-4 pb-4 shadow" key={category.id}>
                        <span className="col">{category.title}</span>
                        <NavLink to={`/user/posts/category/${category.id}`} className="col">Posts</NavLink>
                        <span className="col">{category.createdAt}</span>
                        <span className="col">{category.updatedAt}</span>
                        <div className="col-3 row">
                            {
                                userAuth.userRole === "admin" && (
                                    <>
                                        <NavLink to={`/user/categories/${category.id}`} className="col">View</NavLink>
                                        <NavLink to={`/user/categories/${category.id}/update`} className="col">Edit</NavLink>
                                        <button className="col nav-link"  onClick={() => handleDelete(category.id)}>Delete</button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )): <div className="alert alert-danger" role="alert">{errorMessage}</div>
            }
        </div>
    );
}

export default UserCategoryList;