const Pagination = ({ setCurrentPage, paginationList }) => {
    return (
                <nav className="d-flex justify-content-center" aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link">Preview</button></li>
                        {paginationList.map((item, i) => (
                            <li key={i} className="page-item">
                                {
                                    item !== "..." ? (<button className="page-link" onClick={() => setCurrentPage(item)}>{item}</button>)
                                        :(<button className="page-link">{item}</button>)
                                }
                            </li>
                        ))}
                        <li className="page-item"><button className="page-link">Next</button></li>
                    </ul>
                </nav>
            )
}

export default Pagination;