import React, { useEffect, useState } from "react";
import { getUserById } from "../api.js";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const UserProfile = ({ userData }) => {
    console.log(userData);
    return (
        <div>
            <h2>User data</h2>
            {userData.imageUrl && (<img src={userData.imageUrl} alt={userData.firstName} />)}
            <ul>
                <li>{userData.firstName}</li>
                <li>{userData.lastName}</li>
                <li>{userData.username}</li>
            </ul>
        </div>
    );
};

export default UserProfile;
