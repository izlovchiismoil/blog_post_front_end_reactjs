import {useState} from "react";
import {createCategory} from "../../api.js";
import {useNavigate} from "react-router-dom";

const UserCategoryCreate = () => {
    const [category, setCategory] = useState({
        title: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => setCategory(prevCategory => ({ ...prevCategory, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory({category});
            navigate("/user/categories");
        }
        catch (err) {
            console.log(err)
            setErrorMessage(err.message);
        }
    }
    return (
        <form className="col" onSubmit={handleSubmit}>
            {errorMessage && <div className="mb-3 alert alert-danger" role="alert">{errorMessage}</div>}
            <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={category.title} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input type="submit" className="btn btn-primary" value="Save" />
            </div>
        </form>
    );
}

export default UserCategoryCreate;
