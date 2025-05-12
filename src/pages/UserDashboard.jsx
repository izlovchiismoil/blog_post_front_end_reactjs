import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserProfile from "../components/UserProfile.jsx";
import PostList from "../components/PostCards.jsx";
import {jwtDecode} from "jwt-decode";
import {getUserById} from "../api.js";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({});
    const accessToken = localStorage.getItem("accessToken");
    const decodedAccessToken = jwtDecode(accessToken);
    const fetchData = () => {
        getUserById(decodedAccessToken.userId).then((res) => setUserData(res.data.user)).catch(console.error);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>User dashboard</h1>
            <Link to="/user/new">+ Create New Post</Link>
            <UserProfile userData={userData} />
        </div>
    );
}

export default UserDashboard;
