import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import {getUserById} from "../api.js";
import UserHeader from "../components/UserHeader.jsx";

const UserDashboard = () => {
    return (
        <main>
            <UserHeader />
            <Outlet />
        </main>
    );
}

export default UserDashboard;
