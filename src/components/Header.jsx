import {Link, NavLink} from "react-router-dom";
import NavbarMenu from "./NavbarMenu.jsx";

const Header = () => {
    return (
        <header className="d-flex justify-content-around align-items-center border shadow mb-4">
            <div>
                <Link to="/" className="navbar-brand fs-2">Blog Posts</Link>
            </div>
            <NavbarMenu />
            <NavLink to={`/auth`} className="btn btn-primary">Sign in</NavLink>
        </header>
    )
};

export default Header;