import { NavLink } from "react-router-dom";
import style from "./FilmCard.module.css";
const FilmCard = ({ data }) => {
    // data = {
    //     title: "Marvel Ironheart",
    //     actor: "Chinaka Hodge",
    //     id: "689d2df231af8d4cfc112716",
    //     poster: "https://res.cloudinary.com/dcgog8pcw/image/upload/v1755131100/e29c0fe492873043f31a5128dc98255d_q6bsve.webp",
    // };
    return (
        <NavLink to={`/movie/${data.id}`} className={`${style.link}`}>
            <div
                className={`${style.list_group_item} d-flex justify-content-between align-items-start py-3 px-0`}
            >
                <div className="d-flex">
                    <div
                        className={`me-3 ${style.avatar_container} rounded-circle`}
                    >
                        <img src={data.poster} className=" me-3 w-100 h-100" />
                    </div>

                    <div>
                        <div className="fw-semibold">{data.title}</div>
                        <div className={`${style.text_secondary} small`}>
                            {data.actor}
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};
export default FilmCard;
