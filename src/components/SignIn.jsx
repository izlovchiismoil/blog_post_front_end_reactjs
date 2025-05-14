import {Link} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

const SignIn = () => {
    const { user, login, logout } = useAuth();

    return (
        <div>
            {user ?
                (<Link to="/auth" className="btn btn-primary fs-5">Logout</Link>):
                (<Link to="/auth/logout" className="btn btn-primary fs-5">Sign in</Link>)
            }
        </div>
    )
}

export default SignIn;