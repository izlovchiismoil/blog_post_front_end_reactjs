import {Link, NavLink, useLocation} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";

const UserDashboard = () => {
    const { userAuth } = useAuth();
    const location = useLocation();
    const isActive = (path="/user") => location.pathname === path ? "active" : "";
    return (
        userAuth.userRole === "admin" ? (
            <div className="col-2">
                <ul className="list-group shadow">
                    <li className={`list-group-item ${isActive("/user/profile")}`}>
                        <NavLink to="profile" className="text-decoration-none link-underline">Profile</NavLink>
                    </li>
                    <li className={`list-group-item ${isActive("/user/users")}`}>
                        <NavLink to="users" className="text-decoration-none link-underline">Users</NavLink>
                    </li>
                    <li className={`list-group-item ${isActive("/user/posts")}`}>
                        <NavLink to="posts" className="text-decoration-none link-underline">Posts</NavLink>
                    </li>
                    <li className={`list-group-item ${isActive("/user/categories")}`}>
                        <NavLink to="categories" className="text-decoration-none link-underline">Categories</NavLink>
                    </li>
                </ul>
            </div>
        )
            : (
                <div className="col-2">
                    <ul className="list-group">
                        <li className={`list-group-item ${isActive("/user/profile")}`}>
                            <NavLink to="profile" className="text-decoration-none link-underline">Profile</NavLink>
                        </li>
                        <li className={`list-group-item ${isActive("/user/posts")}`}>
                            <NavLink to="posts" className="text-decoration-none link-underline">Posts</NavLink>
                        </li>
                        <li className={`list-group-item ${isActive("/user/categories")}`}>
                            <NavLink to="categories" className="text-decoration-none link-underline">Categories</NavLink>
                        </li>
                    </ul>
                </div>
            )
    );
}

export default UserDashboard;