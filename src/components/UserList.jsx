import {useEffect, useState} from "react";
import {getUsers} from "../api.js";
import {NavLink} from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        getUsers().then(res => setUsers(res.data.users)).catch(err => setErrorMessage("No users"));
    },[]);
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
                                            {user.userRole !== "admin" ? (
                                                <>
                                                    <NavLink to={`/user/users/${user.id}`} className="col">View</NavLink>
                                                    <NavLink to={`/user/users/${user.id}/update`} className="col">Edit</NavLink>
                                                    <NavLink to={`/user/users/${user.id}/delete`} className="col">Delete</NavLink>
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