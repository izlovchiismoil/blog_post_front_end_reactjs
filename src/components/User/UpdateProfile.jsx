import {useEffect, useState} from "react";
import {getUserById, updateUser} from "../../api.js";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const UpdateProfile = () => {
    const { userAuth } = useAuth();
    const [userData, setUserData] = useState(null);
    const [initialUserData, setInitialUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getUserById(userAuth.userId).then(res => {
            setUserData(res.data.user);
            setInitialUserData(res.data.user);
        }).catch(err => setErrorMessage("No user"));
    },[userAuth.userId]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setUserData(prev => ({ ...prev, [name]: type === "file" ? files[0] : value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const changedFields = new FormData();
        for (const key in userData) {
            if (userData[key] !== initialUserData[key]) {
                changedFields.append(key, userData[key]);
            }
        }
        if (oldPassword) changedFields.append("oldPassword", oldPassword);
        if (newPassword) changedFields.append("newPassword", newPassword);

        if (![...changedFields.entries()].length) {
            setErrorMessage("No changes made.");
            return;
        }

        try {
            const res = await updateUser(userAuth.userId, changedFields);
            setUserData(res.data.updatedUser);
            setInitialUserData(res.data.updatedUser);
            setOldPassword("");
            setNewPassword("");
            navigate("/user");
        }
        catch (err) {
            setErrorMessage(err.message);
        }
    }

    return (userData ? (
            <form className="col" onSubmit={handleSubmit} encType="multipart/form-data">
                {errorMessage && <div className="alert alert-warning" role="alert">{errorMessage}</div>}
                <div className="mb-3">
                    <label htmlFor="firstName">Firstname</label>
                    <input type="text" className="form-control" name="firstName" id="firstName" value={userData?.firstName ?? ""} onChange={handleChange} placeholder="Firstname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName">Lastname</label>
                    <input type="text" className="form-control" name="lastName" id="lastName" value={userData?.lastName ?? ""} onChange={handleChange} placeholder="Lastname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="oldPassword">Old password</label>
                    <input type="password" className="form-control" name="oldPassword" id="oldPassword" value={userData?.oldPassword ?? ""} onChange={handleChange} placeholder="Old password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword">New password</label>
                    <input type="password" className="form-control" name="newPassword" id="newPassword" value={userData?.newPassword ?? ""} onChange={handleChange} placeholder="New password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="profileImage">Profile image</label>
                    <input type="file" className="form-control" name="profileImage" id="profileImage" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input type="submit" className="btn btn-primary" name="saveChanges" id="saveChanges" value="Save changes" />
                </div>
            </form>
        ) : <h3>No user</h3>
    );
}

export default UpdateProfile;