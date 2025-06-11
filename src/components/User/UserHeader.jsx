import {useAuth} from "../../contexts/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";

const UserHeader = () => {
    const { userAuth, logoutAuth } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutAuth();
        navigate("/auth");
    };
    return (
        <header className="row border shadow pt-2 pb-2 mb-4">
            {userAuth ?
                (
                    <div className="col-12 d-flex gap-5 justify-content-between align-items-center ps-5 pe-5">
                        <p className="navbar-brand fs-2">User header</p>
                        <button className="btn btn-primary fs-5" onClick={handleLogout}>Logout</button>
                    </div>
                )
                : (
                    <div className="col-12 row">
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <Link to={`/`} className="btn btn-primary">&larr; Main</Link>
                        </div>
                        <p className="navbar-brand fs-2 col-6">User login</p>
                    </div>
                )
            }
        </header>
    );
};

export default UserHeader;