import React, {createContext, useContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            try {
                const decodedAccessToken = jwtDecode(accessToken);
                if (!decodedAccessToken) {
                    setUserAuth(null);
                }
                setUserAuth(decodedAccessToken);
            }
            catch (err) {
                setUserAuth(null);
            }
        }
    }, []);
    const loginAuth = (accessToken) => {
        const decodedAccessToken = jwtDecode(accessToken);
        if (!decodedAccessToken) {
            setUserAuth(null);
        }
        localStorage.setItem("accessToken", accessToken);
        return setUserAuth(decodedAccessToken);
    }
    const logoutAuth = () => {
        localStorage.removeItem("accessToken");
        return setUserAuth(null);
    }
    return (
        <AuthContext.Provider value={{userAuth, loginAuth, logoutAuth}}>
            {children}
        </AuthContext.Provider>
    );
}
