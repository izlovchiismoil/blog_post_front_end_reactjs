import React, { useEffect, useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {getUserById} from "../api.js";
import {useAuth} from "../contexts/AuthContext.jsx";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const { userAuth } = useAuth();

    useEffect(() => {
        if (!userAuth.userId) {
            navigate("/auth");
        }
        getUserById(userAuth.userId).then((res) => {
            setUserData(res.data.user);
        }).catch((err) => {
            console.error(err);
            navigate("/auth");
        });
    }, []);
    return (
        <>
            {
                userData ? (
                    <div className="col">
                        <div className="d-flex justify-content-end align-items-center pt-2 pb-2 pe-4">
                            <NavLink to="/user/update" className="btn btn-primary">Edit user</NavLink>
                        </div>
                        <div className="row">
                            <span className="col border pt-2 pb-2">Firstname </span>
                            <span className="col border pt-2 pb-2">{userData.firstName}</span>
                        </div>
                        <div className="row">
                            <span className="col border pt-2 pb-2">Lastname </span>
                            <span className="col border pt-2 pb-2">{userData.lastName}</span>
                        </div>
                        <div className="row">
                            <span className="col border pt-2 pb-2">Username </span>
                            <span className="col border pt-2 pb-2">{userData.username}</span>
                        </div>
                        <div className="row">
                            <span className="col border pt-2 pb-2">User role </span>
                            <span className="col border pt-2 pb-2">{userData.userRole}</span>
                        </div>
                    </div>
                ) : <h3 className="col">No user</h3>
            }
        </>
    );
};

export default UserProfile;
