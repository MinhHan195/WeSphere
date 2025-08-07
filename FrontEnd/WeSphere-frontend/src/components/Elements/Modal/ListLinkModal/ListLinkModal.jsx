/* eslint-disable no-unused-vars */
import LinkCard from "../UpdateProfileModal/LinkCard/LinkCard";
import style from "./ListLinkModal.module.css";
const ListLinkModal = (props) => {
    const { data, show, handleHide } = props;

    const goToLink = (linkObject, _idx) => {
        window.open(linkObject.url, "_blank");
    };
    return (
        <div
            className={`${style.list_link_modal_container} ${
                show ? style.show_modal : null
            }`}
        >
            <div className={style.list_link_modal_dialog}>
                <div className={`${style.list_link_modal} card rounded-4`}>
                    <div className={style.list_link_modal_header}>
                        <p className="fw-bold p-3 m-0">Liên kết</p>
                        <button onClick={handleHide}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className={style.list_link_modal_body}>
                        {data.map((linkObject, idx) => {
                            return (
                                <LinkCard
                                    linkObject={linkObject}
                                    onClick={goToLink}
                                    idx={idx}
                                    key={idx}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ListLinkModal;
