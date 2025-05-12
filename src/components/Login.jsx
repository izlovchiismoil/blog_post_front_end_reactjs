import React, { useState } from "react";
import { login } from "../api.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await  login({ user: { username, password } })
                .then((res) => {
                    console.log(res.data.accessToken)
                    setAccessToken(res.data.accessToken)
                })
                .catch((err) => setError(err.message));

            if (accessToken !== "") {
                const decodedAccessToken = jwtDecode(accessToken);
                if (decodedAccessToken) {
                    localStorage.setItem("accessToken", accessToken);
                    if (decodedAccessToken.userRole === "admin") {
                        return navigate("/admin");
                    }
                    return navigate("/user");
                }
            }
            else {
                navigate("/login");
            }
        } catch (err) {
            if (err) {
                console.log(err);
                setError(err.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (<h3>{error}</h3>)}
            <input placeholder="Username..." id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Login" />
        </form>
    );
};

export default Login;
