import React, {createContext, useContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            try {
                const decodedAccessToken = jwtDecode(accessToken);
                if (!decodedAccessToken) {
                    setUser(null);
                }
                setUser(decodedAccessToken);
            }
            catch (err) {
                setUser(null);
            }
        }
    }, []);
    const login = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        const decodedAccessToken = jwtDecode(accessToken);
        setUser(decodedAccessToken);
    }
    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
