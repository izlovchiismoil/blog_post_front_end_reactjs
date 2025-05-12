import {Link} from "react-router-dom";

const NavbarMenu = () => {
    return (
        <nav className="navbar navbar-expand-md">
            <ul className="navbar-nav fs-5">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}
export default NavbarMenu;