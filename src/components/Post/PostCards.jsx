import {Link} from "react-router-dom";
import {usePosts} from "../../contexts/PostContext.jsx";
import {useEffect, useState} from "react";

const PostCards = () => {
    const {
        posts,
        currentPage,
        setCurrentPage,
        totalPages
    } = usePosts();

    const [errorMessage, setErrorMessage] = useState(null);
    const [paginationList, setPaginationList] = useState([]);

    const handleNextPage = () => {
        if ((currentPage + 1) <= totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    const handlePreviousPage = () => {
        if ((currentPage - 1) > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    useEffect(() => {
        if (totalPages > 0) {
            const paginationArray = [];
            paginationArray.push(1);
            if (totalPages === 1) {
                setPaginationList(paginationArray);
                return;
            }
            if (totalPages <= 6) {
                for (let i = 1; i <= totalPages; i++) {
                    paginationArray.push(i);
                }
                setPaginationList(paginationArray);
                return;
            }

            if (totalPages >= 7) {
                if (currentPage === 1) {
                    paginationArray.push(2);
                    paginationArray.push(3);
                    paginationArray.push("...");
                    paginationArray.push(totalPages - 1);
                    paginationArray.push(totalPages);
                    setPaginationList(paginationArray);
                    return;
                }
                if (currentPage !== 1 && currentPage < (totalPages - 2)) {
                    paginationArray.push(currentPage);
                    paginationArray.push(currentPage + 1);
                    paginationArray.push("...");
                    paginationArray.push(totalPages - 1);
                    paginationArray.push(totalPages);
                    setPaginationList(paginationArray);
                }
            }
        }
    },[currentPage, posts]);

    return (posts?.length > 0 ?
        (
            <>
                {errorMessage && (<div className="alert alert-info">{errorMessage}</div>)}
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
                {
                    paginationList?.length > 0 && (
                        <nav className="d-flex justify-content-center" aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><button className="page-link" onClick={handlePreviousPage }>Preview</button></li>
                                {paginationList.map((item, i) => (
                                    <li key={i} className="page-item">
                                        {
                                            item !== "..." ? (<button className="page-link" onClick={() => setCurrentPage(item)}>{item}</button>)
                                                :(<button className="page-link">{item}</button>)
                                        }
                                    </li>
                                ))}
                                <li className="page-item"><button className="page-link" onClick={handleNextPage}>Next</button></li>
                            </ul>
                        </nav>
                    )
                }
            </>
        ) : <h3 className="text-info">No posts</h3>
    );
};

export default PostCards;