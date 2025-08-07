import React, { useEffect, useState } from "react";
import { Environment } from "../../../../../environments/environment";
import style from "./LinkCard.module.css";
const LinkCard = (props) => {
    const { linkObject, onClick, idx } = props;
    const [getCleanUrlPath, setCleanUrlPath] = useState("");
    const path = `https://img.logo.dev/${linkObject.url.split("/")[2]}?token=${
        Environment.LOGO_TOKEN
    }`;

    useEffect(() => {
        const { hostname, pathname } = new URL(linkObject.url);
        setCleanUrlPath(hostname.replace(/^www\./, "") + pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            className={`w-100 d-flex align-items-center p-2 justify-content-start ${style.link_card}`}
            onClick={() => {
                onClick(linkObject, idx);
            }}
        >
            <div className={`${style.logo_custom}`}>
                <img src={path} alt="logo" />
            </div>
            <div className="ms-3 border-bottom flex-grow-1 py-3">
                <p className={`fw-bold mb-0 text-capitalize ${style.title}`}>
                    {linkObject.title}
                </p>
                <p className="pb-0 mb-0">
                    <a
                        className={`link-underline link-underline-opacity-0 ${style.link_card_url}`}
                        href={linkObject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {getCleanUrlPath}
                    </a>
                </p>
            </div>
        </div>
    );
};
export default LinkCard;
