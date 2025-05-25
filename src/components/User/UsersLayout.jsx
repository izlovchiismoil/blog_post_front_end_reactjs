import {Outlet} from "react-router-dom";

const UsersLayout = () => {
    return (
        <div className="col">
            <Outlet />
        </div>
    )
}

export default UsersLayout;