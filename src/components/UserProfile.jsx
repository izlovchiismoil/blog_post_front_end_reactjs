import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {getUserById} from "../api.js";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate("/auth");
            return;
        }
        let decodedAccessToken;
        try {
            decodedAccessToken = jwtDecode(accessToken);
        }
        catch (err) {
            console.error("Invalid token:", err);
            localStorage.removeItem("accessToken");
            navigate("/auth");
            return;
        }
        getUserById(decodedAccessToken.userId).then((res) => {
            setUserData(res.data.user);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
            localStorage.removeItem("accessToken");
            navigate("/auth");
        });
    }, [navigate]);
    if (loading) {
        return <h3>Loading...</h3>;
    }
    return (userData ? (
        <div>
            <h2>User profile</h2>
            <p>{errorMessage}</p>
            <section>
                <div>
                    <span>Firstname: </span>
                    <span>{userData.firstName}</span>
                </div>
                <div>
                    <span>Lastname: </span>
                    <span>{userData.lastName}</span>
                </div>
                <div>
                    <span>Username: </span>
                    <span>{userData.username}</span>
                </div>
                <div>
                    <span>User role: </span>
                    <span>{userData.role}</span>
                </div>
            </section>
        </div>
    ) : <h3>No user data</h3>
    );
};

export default UserProfile;
