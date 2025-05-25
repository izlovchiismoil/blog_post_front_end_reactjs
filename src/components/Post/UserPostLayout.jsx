import {Outlet} from "react-router-dom";

const UserPostLayout = () => {
    return (
        <div className="col">
            <Outlet />
        </div>
    );
}

export default UserPostLayout;