import PostCards from "../components/Post/PostCards.jsx";
import {Outlet} from "react-router-dom";

const Home = () => {
    return (
        <>
            <section>
                <Outlet />
            </section>
            <section>
                <PostCards />
            </section>
        </>
    )
}

export default Home;