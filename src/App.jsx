import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PostDetail from "./components/Post/PostDetail.jsx";
import PostCards from "./components/Post/PostCards.jsx";
import Login from "./components/Authenticate/Login.jsx";
import AuthLayout from "./components/Authenticate/AuthLayout.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import UserCategoryList from "./components/Category/UserCategoryList.jsx";
import UserPostLayout from "./components/Post/UserPostLayout.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import CreateUser from "./components/User/CreateUser.jsx";
import UserList from "./components/User/UserList.jsx";
import UserDetail from "./components/User/UserDetail.jsx";
import UpdateUser from "./components/User/UpdateUser.jsx";
import UsersLayout from "./components/User/UsersLayout.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import UserPostList from "./components/Post/UserPostList.jsx";
import UserPostDetail from "./components/Post/UserPostDetail.jsx";
import UserPostUpdate from "./components/Post/UserPostUpdate.jsx";
import UserPostCreate from "./components/Post/UserPostCreate.jsx";
import UserCategoryLayout from "./components/Category/UserCategoryLayout.jsx";
import UserCategoryDetail from "./components/Category/UserCategoryDetail.jsx";
import UserCategoryUpdate from "./components/Category/UserCategoryUpdate.jsx";
import UserCategoryCreate from "./components/Category/UserCategoryCreate.jsx";
import UserPostsOfCategory from "./components/Post/UserPostsOfCategory.jsx";
import {PostsProvider} from "./contexts/PostContext.jsx";
import PostCardsByCategory from "./components/Post/PostCardsByCategory.jsx";
import UserRoleLayout from "./components/UserRole/UserRoleLayout.jsx";
import UserRoleList from "./components/UserRole/UserRoleList.jsx";
import CreateUserRole from "./components/UserRole/CreateUserRole.jsx";

const App = () => {
    return (
        <AuthProvider>a
            <PostsProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<PostCards />} />
                            <Route path="posts/:id" element={<PostDetail />} />
                            <Route path="posts/category/:id" element={<PostCardsByCategory />} />
                            <Route path="about" element={<About />} />
                            <Route path="contact" element={<Contact />} />
                        </Route>
                        <Route path="/auth" element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path="login" element={<Login />} />
                        </Route>
                        <Route path="/user" element={<UserDashboard />}>
                            <Route index element={<UserProfile />} />
                            <Route path="profile" element={<UserProfile />} />
                            <Route path="update" element={<UpdateProfile />} />
                            <Route path="users" element={<UsersLayout />}>
                                <Route index element={<UserList />} />
                                <Route path="create" element={<CreateUser />} />
                                <Route path=":id" element={<UserDetail />} />
                                <Route path=":id/update" element={<UpdateUser />} />
                                <Route path=":id/delete" element={<UserDetail />} />
                            </Route>
                            <Route path="posts" element={<UserPostLayout />}>
                                <Route index element={<UserPostList />} />
                                <Route path="create" element={<UserPostCreate />} />
                                <Route path=":id" element={<UserPostDetail />} />
                                <Route path=":id/update" element={<UserPostUpdate />} />
                                <Route path=":id/delete" element={<UserPostDetail />} />
                                <Route path="category/:id" element={<UserPostsOfCategory />} />
                            </Route>
                            <Route path="categories" element={<UserCategoryLayout />}>
                                <Route index element={<UserCategoryList />} />
                                <Route path=":id" element={<UserCategoryDetail />} />
                                <Route path=":id/update" element={<UserCategoryUpdate />} />
                                <Route path="create" element={<UserCategoryCreate />} />
                            </Route>
                            <Route path="roles" element={<UserRoleLayout />}>
                                <Route index element={<UserRoleList />} />
                                <Route path="create" element={<CreateUserRole />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PostsProvider>
        </AuthProvider>
)};

export default App;