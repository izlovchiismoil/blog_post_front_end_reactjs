import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import RightSide from "./RightSide.jsx";
import Footer from "./Footer.jsx";
import { usePosts } from "../contexts/PostContext.jsx";

const Layout = () => {
    const { posts, categories } = usePosts();
    return (
            <>
                <Header />
                <div className="d-flex">
                    <main className="container">
                        <Outlet />
                    </main>
                    {
                         (posts.length > 0) && (categories.length > 0) && (
                            <RightSide posts={posts} categories={categories} />
                        )
                    }
                </div>
                <Footer />
            </>
        )
}

export default Layout;