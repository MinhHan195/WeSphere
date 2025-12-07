import React from "react";
import ThemePlugin from "./plugin/Theme/ThemePlugin.jsx";
import EventPlugin from "./plugin/Event/EventPlugin.jsx";
import AppRoutes from "./router/router.jsx";
function App() {
    return (
        <>
            <AppRoutes />
            <ThemePlugin />
            {/* <EventPlugin /> */}
        </>
    );
}
export default App;
