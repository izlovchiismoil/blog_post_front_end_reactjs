const PostList = () => {
    return (
        <div className="col row">
            <div className="col-12 row pt-4 pb-4 shadow">
                <div className="col-9">Post 1</div>
                <div className="col-3 row">
                    <span className="col">View</span>
                    <span className="col">Edit</span>
                    <span className="col">Delete</span>
                </div>
            </div>
            <div className="col-12 row pt-4 pb-4 shadow">
                <div className="col-9">Post 2</div>
                <div className="col-3 row">
                    <span className="col">View</span>
                    <span className="col">Edit</span>
                    <span className="col">Delete</span>
                </div>
            </div>
            <div className="col-12 row pt-4 pb-4 shadow">
                <div className="col-9">Post 3</div>
                <div className="col-3 row">
                    <span className="col">View</span>
                    <span className="col">Edit</span>
                    <span className="col">Delete</span>
                </div>
            </div>
        </div>
    );
}

export default PostList;