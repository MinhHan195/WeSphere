import { NavLink } from "react-router-dom";
import style from "./Account.module.css";
const Account = () => {
    return (
        <div className="pt-">
            <NavLink to={"/setting/deactivate"} className={style.link}>
                <div className="mb-4 d-flex justify-content-between">
                    <div> Vô hiệu hóa hoặc xóa trang cá nhân</div>
                    <div className="d-flex">
                        <i className={`bi bi-chevron-right ms-1 `}></i>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};
export default Account;
