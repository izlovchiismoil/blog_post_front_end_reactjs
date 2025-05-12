import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import RightSide from "./RightSide.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
    return (
        <>
            <Header />
            <div className="d-flex">
                <main className="container">
                    <Outlet />
                </main>
                <RightSide />
            </div>
            <Footer />
        </>
    )
}

export default Layout;