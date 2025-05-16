import React, { useState } from "react";
import { loginUser } from "../api.js";
import {useAuth} from "../contexts/AuthContext.jsx";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const { loginAuth } = useAuth();
    const handleFormChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenResponse = await loginUser({ user: formValues });
            if (tokenResponse.status === 200) {
                const accessToken = tokenResponse.data.accessToken;
                return loginAuth(accessToken);
            }
        }
        catch (err) {
            console.error(err);
            switch (err.status) {
                case 500: return setErrorMessage("Server Error");
                default: return setErrorMessage("Invalid Credentials");
            }
        }
    };
    return (
            <form onSubmit={ handleSubmit } className="form">
                <div className="mb-3">
                    <p className="text-danger ps-1">{errorMessage}</p>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="text" name="username" placeholder="Username..." value={formValues.username} onChange={handleFormChange} />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="password" name="password" placeholder="Password..." value={formValues.password} onChange={handleFormChange} />
                </div>
                <div>
                    <input className="btn btn-primary" type="submit" value="Login" />
                </div>
            </form>
    );
};

export default Login;
