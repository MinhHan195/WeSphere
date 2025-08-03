import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import FindPage from "../pages/Find/Find.jsx";
import AuthPage from "../pages/Auth/Auth.jsx";
import Notification from "../pages/Notification/Notification.jsx";
import FeedDetail from "../pages/FeedDetail/FeedDetail.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import MyFeeds from "../pages/Profile/MyFeeds/MyFeeds.jsx";
import MyMedia from "../pages/Profile/MyMedia/MyMedia.jsx";
import Reposts from "../pages/Profile/Reposts/Reposts.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/find" element={<FindPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/notification" element={<Notification />} />
                <Route
                    path="/:username/post/:feedId"
                    element={<FeedDetail />}
                />
                <Route path="/:username" element={<Profile />}>
                    <Route path="media" element={<MyMedia />} />
                    <Route path="reposts" element={<Reposts />} />
                    <Route index element={<MyFeeds />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;
