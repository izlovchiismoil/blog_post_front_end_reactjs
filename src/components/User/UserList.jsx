import {useEffect, useState} from "react";
import {getUsers, deleteUser} from "../../api.js";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";

const UserList = () => {
    const [users, setUsers] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { userAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then(res => setUsers(res.data.users)).catch(err => setErrorMessage("No users"));
    },[]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            await deleteUser(id);
            navigate(0);
        }
        catch(err) {
            setErrorMessage(err.message);
        }
    }

    return (
        <>
            <div className="col-12 d-flex justify-content-end pe-5 pb-4 pt-4">
                <NavLink to="/user/users/create" className="btn btn-primary">+ Create user</NavLink>
            </div>
            {
                users ? (
                    <div className="row">
                        <div className="col row pt-4 pb-4">
                            <span className="col fw-bold">Username</span>
                            <span className="col fw-bold">User role</span>
                        </div>
                        <div className="col-3"></div>
                        {
                            users.map(user => (
                                    <div className="col-12 row pt-4 pb-4 shadow" key={user.id}>
                                        <span className="col">{user.username}</span>
                                        <span className="col">{user.userRole}</span>
                                        <div className="col-3 row">
                                            {userAuth.userRole === "admin" ? (
                                                <>
                                                    <NavLink to={`/user/users/${user.id}`} className="col">View</NavLink>
                                                    <NavLink to={`/user/users/${user.id}/update`} className="col">Edit</NavLink>
                                                    <button onClick={() => handleDelete(user.id)} className="col nav-link">Delete</button>
                                                </>

                                            ) : <span className="col"></span>
                                            }
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                ): <h3>No users</h3>
            }
        </>
    );
}

export default UserList;