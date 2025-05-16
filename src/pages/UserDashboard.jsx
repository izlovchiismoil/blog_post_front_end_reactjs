import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "../components/UserHeader.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import UserLeftAside from "../components/UserLeftAside.jsx";

const UserDashboard = () => {
    const { userAuth } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userAuth) {
            navigate("/auth");
        }
    },[]);
    return (userAuth && (
            <main>
                <UserHeader />
                <div className="row">
                    <UserLeftAside />
                    <Outlet />
                </div>

            </main>
        )
    );
}

export default UserDashboard;
