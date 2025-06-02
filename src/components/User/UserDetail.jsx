import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {getUserById} from "../../api.js";

const UserDetail = () => {
    const [userData, setUserData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        getUserById(id).then((res) => {
            setUserData(res.data.user);
        }).catch((err) => {
            console.log(err);
            setErrorMessage("No user found.");
        });
    },[]);
    return (
        userData ? (
            <>
                <div className="alert-danger" role="alert">{errorMessage}</div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end pe-5">
                        <NavLink className="btn btn-primary" to={`/user/users/${userData?.id ?? ""}/update`}>Edit user</NavLink>
                    </div>
                    {userData.profileImage && (
                        <div className="col-12">
                            <img src={`http://localhost:3000/images/profile/${userData?.profileImage ?? "no-image.png"}`} alt="profile-image" style={{width: "100px"}} />
                        </div>
                    )}
                    <div className="col-12 row">
                        <span className="col border pt-1 pb-1 fw-bold">Firstname</span>
                        <span className="col border pt-1 pb-1">{userData?.firstName ?? ""}</span>
                    </div>
                    <div className="col-12 row">
                        <span className="col border pt-1 pb-1 fw-bold">Lastname</span>
                        <span className="col border pt-1 pb-1">{userData?.lastName ?? ""}</span>
                    </div>
                    <div className="col-12 row">
                        <span className="col border pt-1 pb-1 fw-bold">Username</span>
                        <span className="col border pt-1 pb-1">{userData?.username ?? ""}</span>
                    </div>
                </div>
            </>
        ) : <h3>No user</h3>
    )
}

export default UserDetail;