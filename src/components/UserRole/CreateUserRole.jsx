import {createUserRole} from "../../api.js";
import {useState} from "react";

const CreateUserRole = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
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


                {/*Post*/}
                <div className="col-12 row shadow mb-5 pt-3 pb-3">
                    <h5 className="col-12 mb-3 text-primary">Post control</h5>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="createPost" className="form-check-input" id="createPost" onChange={handleChange} />
                        <label htmlFor="createPost" className="form-check-label">Create post</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="updateOwnPost" className="form-check-input" id="updateOwnPost" onChange={handleChange} />
                        <label htmlFor="updateOwnPost" className="form-check-label">Update own post</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="updateAnyPost" className="form-check-input" id="updateAnyPost" onChange={handleChange} />
                        <label htmlFor="updateAnyPost" className="form-check-label">Update any post</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="deleteOwnPost" className="form-check-input" id="deleteOwnPost" onChange={handleChange} />
                        <label htmlFor="deleteOwnPost" className="form-check-label">Delete own post</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="deleteAnyPost" className="form-check-input" id="deleteAnyPost" onChange={handleChange} />
                        <label htmlFor="deleteAnyPost" className="form-check-label">Delete any post</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="viewOwnPost" className="form-check-input" id="viewOwnPost" onChange={handleChange} />
                        <label htmlFor="viewOwnPost" className="form-check-label">View own post</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="viewAnyPost" className="form-check-input" id="viewAnyPost" onChange={handleChange} />
                        <label htmlFor="viewAnyPost" className="form-check-label">View any post</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="publishOwnPost" className="form-check-input" id="publishOwnPost" onChange={handleChange} />
                        <label htmlFor="publishOwnPost" className="form-check-label">Publish own post</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="publishAnyPost" className="form-check-input" id="publishAnyPost" onChange={handleChange} />
                        <label htmlFor="publishAnyPost" className="form-check-label">Publish any post</label>
                    </div>
                </div>



                {/*User*/}
                <div className="col-12 row shadow mb-5 pt-3 pb-3">
                    <h5 className="col-12 mb-3 text-primary">User control</h5>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="createUser" className="form-check-input" id="createUser" onChange={handleChange} />
                        <label htmlFor="createUser" className="form-check-label">Create</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="updateUser" className="form-check-input" id="updateUser" onChange={handleChange} />
                        <label htmlFor="updateUser" className="form-check-label">Update user</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="updateAnyUser" className="form-check-input" id="updateAnyUser" onChange={handleChange} />
                        <label htmlFor="updateAnyUser" className="form-check-label">Update any user</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="deleteUser" className="form-check-input" id="deleteUser" onChange={handleChange} />
                        <label htmlFor="deleteUser" className="form-check-label">Delete user</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="deleteAnyUser" className="form-check-input" id="deleteAnyUser" onChange={handleChange} />
                        <label htmlFor="deleteAnyUser" className="form-check-label">Delete any user</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="viewUser" className="form-check-input" id="viewUser" onChange={handleChange} />
                        <label htmlFor="viewUser" className="form-check-label">View user</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="viewAnyUser" className="form-check-input" id="viewAnyUser" onChange={handleChange} />
                        <label htmlFor="viewAnyUser" className="form-check-label">View any user</label>
                    </div>
                </div>


                {/*Category*/}
                <div className="col-12 row shadow mb-5 pt-3 pb-3">
                    <h5 className="col-12 mb-3 text-primary">Category control</h5>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="createCategory" className="form-check-input" id="createCategory" onChange={handleChange} />
                        <label htmlFor="createCategory" className="form-check-label">Create category</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="updateOwnCategory" className="form-check-input" id="updateOwnCategory" onChange={handleChange} />
                        <label htmlFor="updateOwnCategory" className="form-check-label">Update own category</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="updateAnyCategory" className="form-check-input" id="updateAnyCategory" onChange={handleChange} />
                        <label htmlFor="updateAnyCategory" className="form-check-label">Update any category</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="deleteOwnCategory" className="form-check-input" id="deleteOwnCategory" onChange={handleChange} />
                        <label htmlFor="deleteOwnCategory" className="form-check-label">Delete own category</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="deleteAnyCategory" className="form-check-input" id="deleteAnyCategory" onChange={handleChange} />
                        <label htmlFor="deleteAnyCategory" className="form-check-label">Delete any category</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="viewCategory" className="form-check-input" id="viewCategory" onChange={handleChange} />
                        <label htmlFor="viewCategory" className="form-check-label">View category</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="viewAnyCategory" className="form-check-input" id="viewAnyCategory" onChange={handleChange} />
                        <label htmlFor="viewAnyCategory" className="form-check-label">View any category</label>
                    </div>
                </div>


                {/*User role*/}
                <div className="col-12 row shadow mb-5 pt-3 pb-3">
                    <h5 className="col-12 mb-3 text-primary">User role control</h5>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="createUserRole" className="form-check-input" id="createUserRole" onChange={handleChange} />
                        <label htmlFor="createUserRole" className="form-check-label">Create user role</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="updateUserRole" className="form-check-input" id="updateUserRole" onChange={handleChange} />
                        <label htmlFor="updateUserRole" className="form-check-label">Update user role</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="deleteUserRole" className="form-check-input" id="deleteUserRole" onChange={handleChange} />
                        <label htmlFor="deleteUserRole" className="form-check-label">Delete user role</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="viewUserRole" className="form-check-input" id="viewUserRole" onChange={handleChange} />
                        <label htmlFor="viewUserRole" className="form-check-label">View user role</label>
                    </div>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="viewAnyUserRole" className="form-check-input" id="viewAnyUserRole" onChange={handleChange} />
                        <label htmlFor="viewAnyUserRole" className="form-check-label">View any user role</label>
                    </div>
                </div>


                {/*Administrator*/}
                <div className="col-12 row shadow mb-5 pt-3 pb-3">
                    <h5 className="col-12 mb-3 text-primary">Administrator control</h5>
                    <div className="col d-flex gap-2">
                        <input type="checkbox" name="isAdmin" className="form-check-input" id="isAdmin" onChange={handleChange} />
                        <label htmlFor="isAdmin" className="form-check-label">Admin</label>
                    </div>
                </div>


            </div>
            <div className="mb-3 d-flex justify-content-end align-items-center pe-5">
                <input type="submit" className="btn btn-primary" value="Save"/>
            </div>
        </form >
    );
}

export default CreateUserRole;