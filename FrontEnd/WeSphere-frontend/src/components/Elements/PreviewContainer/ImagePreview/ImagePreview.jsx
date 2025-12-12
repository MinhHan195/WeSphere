import React, { useState } from "react";
import ViewImage from "../../ViewImage/ViewImage";
import style from "./ImagePreview.module.css";
const ImagePreview = (props) => {
    const { hasMany } = props;
    const url = props.isFile ? URL.createObjectURL(props.file) : props.data.url;
    const key = props.idx;
    const [zoom, setZoom] = useState(false);

    const handleZoomIn = (e) => {
        e.stopPropagation();
        setZoom(true);
    };

    const handleZoomOut = (e) => {
        e.stopPropagation();
        setZoom(false);
    };
    return (
        <div>
            <div
                className={`${style.img_preview_container} --container-${key}`}
                key={key}
                style={hasMany ? { height: "250px" } : { height: "auto" }}
            >
                {props.preview ? (
                    <div
                        className={`rounded-circle ${style.btn_close_custom}`}
                        onClick={() => props.onRemove(key)}
                    >
                        <i className="bi bi-x-lg p-0 m-0 text-white"></i>
                    </div>
                ) : null}

                <img
                    className={`img-${key}`}
                    src={url}
                    alt={`preview-${key}`}
                    draggable="false"
                    onClick={handleZoomIn}
                    style={hasMany ? { height: "100%" } : { width: "100%" }}
                />
            </div>
            {props.zoom ? (
                zoom ? (
                    <ViewImage
                        idx={key}
                        handleZoomOut={handleZoomOut}
                        url={url}
                    />
                ) : null
            ) : null}
        </div>
    );
};
export default ImagePreview;
