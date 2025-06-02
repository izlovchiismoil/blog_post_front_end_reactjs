import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import Pagination from "../Pagination.jsx";
import {getPostsByCategoryId, getPosts, getPostsByPagination} from "../../api.js";

const PostCards = () => {
    const [posts, setPosts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(4);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        (id ? getPostsByCategoryId(id) : getPostsByPagination(currentPage, limit))
            .then(res => {
                setPosts(res.data.posts);
                setLoading(false);
            }).catch((err) => {
                setErrorMessage(err.message);
            });
    }, [id, currentPage, limit]);
    if (loading) {
        return <p>Loading...</p>
    }
    // const handlePageChange = (page) => {
    //     console.log(page);
    //     setCurrentPage(parseInt(page));
    // }

    return (posts.length ?
        (
            <>
                <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
                    {
                        posts.map(post => (
                                <div className="card pb-3" key={post.id} style={{ width: "18rem" }}>
                                    {post?.postImage && (<img src={`http://localhost:3000/api/v1/images/posts/${post?.postImage ?? "no-image.png"}`}  alt="post-image" className="card-img-top" style={{height: "200px"}} />)}
                                    <h3 className="card-title">{post.title}</h3>
                                    <p className="card-text">{post.shortTitle}</p>
                                    <Link to={`/posts/${post.id}`} className="card-link ps-2">Read more...</Link>
                                </div>
                            )
                        )
                    }
                </div>
                <nav className="d-flex justify-content-center" aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link">Previous</button></li>
                        <li className="page-item"><button className="page-link" onClick={()=> setCurrentPage(1)}>1</button></li>
                        <li className="page-item"><button className="page-link" onClick={()=> setCurrentPage(2)}>2</button></li>
                        <li className="page-item"><button className="page-link">...</button></li>
                        <li className="page-item"><button className="page-link">{totalPages}</button></li>
                        <li className="page-item"><button className="page-link">Next</button></li>
                    </ul>
                </nav>
                {/*<Pagination*/}
                {/*    posts={posts}*/}
                {/*    setPosts={setPosts}*/}
                {/*    currentPage={currentPage}*/}
                {/*    setCurrentPage={setCurrentPage}*/}
                {/*    totalPages={totalPages}*/}
                {/*    setTotalPages={setTotalPages}*/}
                {/*    limit={limit}*/}
                {/*    handlePageChange={handlePageChange}*/}
                {/*/>*/}
            </>
        ) : <h3 className="text-info">No posts</h3>
    );
};

export default PostCards;