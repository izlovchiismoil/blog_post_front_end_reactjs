import {useAuth} from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
    const { userAuth, logoutAuth } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutAuth();
        navigate("/auth");
    };
    return (
        <header className="d-flex justify-content-around align-items-center border shadow pt-2 pb-2 mb-4">
            {userAuth ?
                (
                    <>
                        <div>
                            <p className="navbar-brand fs-2">User header</p>
                        </div>
                        <button className="btn btn-primary fs-5" onClick={handleLogout}>Logout</button>
                    </>
                )
                : (<p className="navbar-brand fs-2">User login</p>)
            }
        </header>
    );
};

export default UserHeader;