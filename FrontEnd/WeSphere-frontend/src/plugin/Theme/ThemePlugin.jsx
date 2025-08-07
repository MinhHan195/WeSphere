import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/authSlide.js";
import { _AUTH } from "../../constants/_auth.js";
const ThemePlugin = () => {
    const theme = useSelector((state) => state.auth.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        const theme = localStorage.getItem(_AUTH.THEME) || 200;
        dispatch(setTheme(theme));
    }, [dispatch]);

    const setLightMode = (flat) => {
        const root = document.documentElement;
        root.style.setProperty(
            "--background-color",
            flat ? "#fafafa" : "#0A0A0A"
        );
        root.style.setProperty("--primary-color", flat ? "#FFFFFF" : "#181818");
        root.style.setProperty(
            "--primary-text-color",
            flat ? "#1E1E1E" : "rgb(243, 245, 247)"
        );
        root.style.setProperty(
            "--primary-border-color",
            flat ? "rgba(0, 0, 0, 0.15)" : " rgb(51, 54, 56)"
        );
        root.style.setProperty(
            "--primary-icon-color",
            flat ? "rgb(83, 83, 83)" : "rgb(243, 245, 247)"
        );
        root.style.setProperty(
            "--primary-icon-hover-color",
            flat ? "#dcdcdc" : "#181818"
        );
        root.style.setProperty(
            "--primary-button-color",
            flat ? "#000000" : "#FFFFFF"
        );
        root.style.setProperty(
            "--secondary-text-color",
            flat ? "rgb(119, 119, 119)" : "rgb(119, 119, 119)"
        );
        root.style.setProperty(
            "--secondary-icon-color",
            flat ? "rgb(204, 204, 204)" : "rgb(204, 204, 204)"
        );
        root.style.setProperty(
            "--secondary-icon-hover-color",
            flat ? "#d3d3d3" : "#212121"
        );
        root.style.setProperty(
            "--third-icon-color",
            flat ? "#6e6d6d" : "#6e6d6d"
        );
    };

    function autoTheme() {
        const now = new Date();
        const target = new Date();
        const target2 = new Date();
        target.setHours(18, 0, 0, 0);
        target2.setHours(6, 0, 0, 0);
        if (now.getHours() === target.getHours()) {
            setLightMode(false);
        } else if (now.getHours() === target2.getHours()) {
            setLightMode(true);
        }
    }

    useEffect(() => {
        let autoUpdateTheme = null;
        if (theme == 0) {
            setLightMode(true);
            clearInterval(autoUpdateTheme);
        } else if (theme == 100) {
            setLightMode(false);
            clearInterval(autoUpdateTheme);
        } else if (theme == 200) {
            const currentHour = new Date().getHours();
            if (currentHour >= 6 && currentHour < 18) {
                setLightMode(true);
            } else {
                setLightMode(false);
            }
            autoUpdateTheme = setInterval(autoTheme, 2000); // Check every minute
        } else {
            return;
        }

        return () => {
            if (autoUpdateTheme) clearInterval(autoUpdateTheme);
        };
    }, [theme]);

    return null;
};
export default ThemePlugin;
