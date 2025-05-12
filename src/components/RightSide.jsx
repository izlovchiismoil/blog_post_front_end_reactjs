import {Link} from "react-router-dom";
import {getPosts, getCategories} from "../api.js";
import {useState, useEffect} from "react";

const RightSide = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, categoriesRes] = await Promise.all([
                    getPosts(),
                    getCategories()
                ]);
                setPosts(postsRes.data.posts);
                setCategories(categoriesRes.data.categories);
                setLoading(false);
            }
            catch (err) {
                console.error('Error fetching data:', err);
            }
        }
        fetchData();
    }, []);
    if (loading) {
        return <h3>Loading...</h3>
    }
    return (
        <aside className="d-flex flex-column gap-4 w-25">
                <ul className="list-group">
                   <li className="list-group-item active" aria-current="true">
                       <Link to="/" className="text-light text-decoration-none">Last posts</Link>
                   </li>
                    <li className="list-group-item">
                       <Link to={`/posts/${posts[0].id}`} className="text-decoration-none">{posts[0].title}</Link>
                   </li>
                    <li className="list-group-item">
                        <Link to={`/posts/${posts[1].id}`} className="text-decoration-none">{posts[1].title}</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/posts/${posts[2].id}`} className="text-decoration-none">{posts[2].title}</Link>
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item active" aria-current="true">
                        <Link to="/" className="text-light text-decoration-none">Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/posts/category/${categories[0].id}`} className="text-decoration-none">{categories[0].title}</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/posts/category/${categories[1].id}`} className="text-decoration-none">{categories[1].title}</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/posts/category/${categories[2].id}`} className="text-decoration-none">{categories[2].title}</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/posts/category/${categories[3].id}`} className="text-decoration-none">{categories[3].title}</Link>
                    </li>
                </ul>
        </aside>
    )
}

export default RightSide;