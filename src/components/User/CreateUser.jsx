import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { createUser } from "../../api.js";

const CreateUser = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        userRole: "",
        password: "",
        reEnterPassword: "",
        profileImage: "user.png"
    });
    const [errorMessage, setErrorMessage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.reEnterPassword) {
            return setErrorMessage("Passwords do not match");
        }
        const formData = new FormData();
        for (let key in userData) {
            formData.append(key, userData[key]);
        }
        createUser(formData).then((res) => {
            setUserData(res.data.createdUser);
            navigate("/user/users");
        }).catch(err => {
            console.log(err);
            setErrorMessage(err.response.data.error);
        });
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setUserData(prev => ({ ...prev, [name]: type === "file" ? files[0] : value }));
    }

    return (
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
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" id="username" value={userData?.username ?? ""} onChange={handleChange} placeholder="Username" />
            </div>
            <div className="mb-3">
                <label htmlFor="userRole">User role</label>
                <input type="text" className="form-control" name="userRole" id="userRole" value={userData?.userRole ?? ""} onChange={handleChange} placeholder="User role" />
            </div>
            <div className="mb-3">
                <label htmlFor="password">New password</label>
                <input type="password" className="form-control" name="password" id="password" value={userData?.password ?? ""} onChange={handleChange} placeholder="New password" />
            </div>
            <div className="mb-3">
                <label htmlFor="reEnterPassword">Re-enter password</label>
                <input type="password" className="form-control" name="reEnterPassword" id="reEnterPassword" value={userData?.reEnterPassword ?? ""} onChange={handleChange} placeholder="Re-enter password" />
            </div>
            <div className="mb-3">
                <label htmlFor="profileImage">Choose profile image</label>
                <input type="file" className="form-control" accept="image/*" name="profileImage" id="profileImage" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input type="submit" className="btn btn-primary" name="saveChanges" id="saveChanges" value="Save" />
            </div>
        </form>
    );
}

export default CreateUser;