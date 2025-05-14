import {Link} from "react-router-dom";
import SignIn from "./SignIn.jsx";

const UserHeader = () => {
    return (
        <header className="d-flex justify-content-around align-items-center border shadow pt-2 pb-2">
            <div>
                <Link to="/" className="navbar-brand fs-2">User header</Link>
            </div>
            <SignIn />
        </header>
    );
};

export default UserHeader;