const Pagination = ({ posts, setPosts, currentPage, totalPages, setTotalPages, setCurrentPage, limit, handlePageChange }) => {
    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><button className="page-link">Previous</button></li>
                <li className="page-item"><button className="page-link" onClick={()=> handlePageChange(1)}>1</button></li>
                <li className="page-item"><button className="page-link" onClick={()=> handlePageChange(2)}>2</button></li>
                <li className="page-item"><button className="page-link">...</button></li>
                <li className="page-item"><button className="page-link">25</button></li>
                <li className="page-item"><button className="page-link">Next</button></li>
            </ul>
        </nav>
    )
}

export default Pagination;