import {createUserRole, getInitialData} from "../../api.js";
import {useEffect, useState} from "react";
import {createCheckboxes} from "../CreatePermission.jsx";

const CreateUserRole = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [initialUserRole, setInitialUserRole] = useState({});

    useEffect(() => {
        getInitialData().then((res) => {
            setInitialUserRole(res.data.userRole);
        }).catch((err) => {
            setErrorMessage(err.message);
        });
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        createUserRole({userRole: formData}).then((res) => {
            setFormData(res.data.createdUserRole);
        }).catch((err) => {
            console.log(err);
            setErrorMessage(err.message);
        });
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
        <form className="col" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" id="title" className="form-control" placeholder="Title..." onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" className="form-control" placeholder="Description..." onChange={handleChange}/>
            </div>
            <div className="row">
                <h5>User permissions</h5>
                <hr/>
                {createCheckboxes(initialUserRole, handleChange)}
            </div>
            <div className="mb-3 d-flex justify-content-end align-items-center pe-5">
                <input type="submit" className="btn btn-primary" value="Save"/>
            </div>
        </form >
    );
}

export default CreateUserRole;