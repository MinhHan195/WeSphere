import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage.jsx';
import FindPage from '../pages/Find/Find.jsx';
import AuthPage from '../pages/Auth/Auth.jsx';
import Notification from "../pages/Notification/Notification.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/find" element={<FindPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/notification" element={<Notification />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;