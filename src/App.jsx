import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PostDetail from "./components/PostDetail.jsx";
import PostCards from "./components/PostCards.jsx";
import Login from "./components/Login.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import UserProfile from "./components/UserProfile.jsx";

const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="posts" element={<Home />}>
                            <Route path=":id" element={<PostDetail />} />
                        </Route>
                        <Route path="posts/category/:id" element={<PostCards />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                    </Route>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="logout" element={<Login />} />
                    </Route>
                    <Route path="/user" element={<UserDashboard />}>
                        <Route index element={<UserProfile />} />
                    </Route>
                </Routes>
            </BrowserRouter>

)};

export default App;