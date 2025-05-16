import {Outlet, useNavigate} from "react-router-dom";
import UserHeader from "./UserHeader.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useEffect} from "react";

const AuthLayout = () => {
    const { userAuth } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        if (userAuth) {
            navigate("/user");
        }
    },[userAuth]);
    return (!userAuth && (
        <>
            <UserHeader />
            <main className="container">
                <Outlet />
            </main>
        </>
        )
    );
}

export default AuthLayout;