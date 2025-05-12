import {Link} from "react-router-dom";
import NavbarMenu from "./NavbarMenu.jsx";
import SignIn from "./SignIn.jsx";

const Header = () => {
    return (
        <header className="d-flex justify-content-around align-items-center border shadow mb-4">
            <div>
                <Link to="/" className="navbar-brand fs-2">Blog Posts</Link>
            </div>
            <NavbarMenu />
            <SignIn />
        </header>
    )
};

export default Header;