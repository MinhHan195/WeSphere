import { NavLink, Outlet } from "react-router-dom";
import style from "./ProfileBar.module.css";
const ProfileBar = (props) => {
    const { username, isUser } = props;
    return (
        <div>
            <div className={style.profile_bar_header}>
                <div className={`${style.nav_profile_bar} row`}>
                    <NavLink
                        end
                        className={({ isActive }) =>
                            `nav-link ${style.nav_profile_item} col-4 ${
                                style.nav_link_custom
                            } ${isActive ? style.active : ""}`
                        }
                        to={`/${username}`}
                    >
                        Tin của bạn
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `nav-link ${style.nav_profile_item} col-4 ${
                                style.nav_link_custom
                            } ${isActive ? style.active : ""}`
                        }
                        to={`/${username}/media`}
                    >
                        File phương tiện
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `nav-link ${style.nav_profile_item} col-4 ${
                                style.nav_link_custom
                            } ${isActive ? style.active : ""}`
                        }
                        to={`/${username}/reposts`}
                    >
                        Bài đăng lại
                    </NavLink>
                </div>
            </div>
            <div className={`${style.profile_bar_bordy}`}>
                <Outlet context={{ isUser, username }} />
            </div>
        </div>
    );
};
export default ProfileBar;
