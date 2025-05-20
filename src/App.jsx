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
import { AuthProvider } from "./contexts/AuthContext.jsx";
import UserListDashboard from "./components/UserListDashboard.jsx";
import CategoryList from "./components/CategoryList.jsx";
import PostList from "./components/PostList.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";
import CreateUser from "./components/CreateUser.jsx";
import UserList from "./components/UserList.jsx";
import UserDetail from "./components/UserDetail.jsx";
import UpdateUser from "./components/UpdateUser.jsx";

const App = () => {
    return (
        <AuthProvider>
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
                        <Route path="login" element={<Login />} />
                        <Route path="logout" element={<Login />} />
                    </Route>
                    <Route path="/user" element={<UserDashboard />}>
                        <Route index element={<UserProfile />} />
                        <Route path="update" element={<UpdateProfile />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="users" element={<UserListDashboard />}>
                            <Route index element={<UserList />} />
                            <Route path="create" element={<CreateUser />} />
                            <Route path=":id" element={<UserDetail />} />
                            <Route path=":id/update" element={<UpdateUser />} />
                            <Route path=":id/delete" element={<UserDetail />} />
                        </Route>
                        <Route path="posts" element={<PostList />} />
                        <Route path="categories" element={<CategoryList />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
)};

export default App;