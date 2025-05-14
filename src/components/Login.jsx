import React, { useState } from "react";
import { login } from "../api.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenResponse = await login({ user: { username, password } });
            if (tokenResponse.status === 200) {
                const accessToken = tokenResponse.data.accessToken;
                const decodedAccessToken = jwtDecode(accessToken);
                if (!decodedAccessToken) {
                    return navigate("/auth");
                }
                localStorage.setItem("accessToken", tokenResponse.data.accessToken);
                return navigate("/user");
            }
        }
        catch (err) {
            console.error(err);
            if (err.status === 401) {
                return setErrorMessage("Username or password is incorrect (401)");
            }
            else if (err.status === 404) {
                return setErrorMessage("Username or password is incorrect (404)");
            }
            else if (err.status === 403) {
                return setErrorMessage("Access denied");
            }
            else if (err.status === 500) {
                return setErrorMessage("Server Error");
            }
            else if (err.status === 400) {
                return setErrorMessage("Bad Request");
            }
            else if (err) {
                return setErrorMessage(err.message);
            }
        }
    };

    return (
        <form onSubmit={ handleSubmit } className="form">
            <div className="mb-3">
                <p className="text-danger ps-1">{errorMessage}</p>
            </div>
            <div className="mb-3">
                <input className="form-control" type="text" name="username" placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <input className="form-control" type="password" name="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <input className="btn btn-primary" type="submit" value="Login" />
            </div>
        </form>
    );
};

export default Login;
