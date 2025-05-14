import {Outlet} from "react-router-dom";
import UserHeader from "./UserHeader.jsx";

const AuthLayout = () => {
    return (
        <>
            <UserHeader />
            <Outlet />
        </>
    );
}

export default AuthLayout;