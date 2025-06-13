import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserRoles} from "../../api.js";

const UserRoleList = () => {
    const [userRoles, setUsersRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        getUserRoles().then((res) => {
            setUsersRoles(res.data.userRoles);
        }).catch((err) => {
            console.log(err);
            setErrorMessage(err.message);
        });
    },[]);

    return (
        <div className="col row">
            <div className="d-flex justify-content-end align-items-center pe-5 mb-3">
                <NavLink to="create" className="btn btn-primary">+ Create role</NavLink>
            </div>
            <div className="col-12">
                {userRoles?.length > 0 ? (
                    <>
                        <div className="row pt-3 pb-3">
                            <span className="col fw-bold">Title</span>
                            <span className="col fw-bold">CreatedAt</span>
                            <span className="col fw-bold">UpdatedAt</span>
                            <div className="col-3"></div>
                        </div>
                        {
                            userRoles.map(role => {
                                return (
                                    <div className="row pt-2 pb-2" key={role.id}>
                                        <span className="col">{role.title}</span>
                                        <span className="col">{role.createdAt}</span>
                                        <span className="col">{role.updatedAt}</span>
                                        <div className="col-3 d-flex justify-content-center gap-3 align-items-center">
                                            <NavLink to={"#"} className="link">View</NavLink>
                                            <NavLink to={"#"} className="link">Edit</NavLink>
                                            <button className="nav-link">Delete</button>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </>
                ): (<div className="alert alert-danger">{errorMessage}</div>)}
            </div>
        </div>
    );
}

export default UserRoleList;