import {Link} from "react-router-dom";

const SignIn = () => {
    return (
        <div>
            <Link to="/login" className="btn btn-primary fs-5">Sign in</Link>
        </div>
    )
}

export default SignIn;