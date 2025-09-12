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
import Setting from "../pages/Setting/Setting.jsx";
import PrivacySettings from "../pages/Setting/PrivacySettings/PrivacySettings.jsx";
import OnlineStatusSetting from "../pages/Setting/OnlineStatusSetting/OnlineStatusSetting.jsx";
import Account from "../pages/Setting/Account/Account.jsx";
import Deactivate from "../pages/Setting/Deactivate/Deactivate.jsx";
import Theme from "../pages/Setting/Theme/Theme.jsx";
import Favorite from "../pages/Favorite/Favorite.jsx";
import Saved from "../pages/Saved/Saved.jsx";
import MovieDetail from "../pages/MovieDetail/MovieDetail.jsx";

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
                <Route path="/setting" element={<Setting />}>
                    <Route path="privacy" element={<PrivacySettings />} />
                    <Route
                        path="online_status"
                        element={<OnlineStatusSetting />}
                    />
                    <Route path="account" element={<Account />} />
                    <Route path="deactivate" element={<Deactivate />} />
                    <Route path="theme" element={<Theme />} />
                </Route>
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/Saved" element={<Saved />} />
                <Route path="/movie/:movie_id" element={<MovieDetail />} />
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;
