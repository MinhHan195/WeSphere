import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

import ImagePreview from "../PreviewContainer/ImagePreview/ImagePreview";
import VideoPreview from "../PreviewContainer/VideoPreview/VideoPreview";
import style from "./ShowMedia.module.css";
const TestElement = (props) => {
    const { listImage, preview } = props;
    return (
        <div className={`${style.show_media_container}`}>
            <ScrollContainer
                style={{
                    display: "flex",
                    width: "100%",
                    borderRadius: "10px",
                }}
            >
                {listImage.map((data, idx) => {
                    if (data.type === "image") {
                        return (
                            <ImagePreview
                                preview={preview}
                                onRemove={props.onRemove}
                                zoom={props.zoom}
                                data={data}
                                idx={idx}
                                key={idx}
                                hasMany={listImage.length > 1 ? true : false}
                            />
                        );
                    } else if (data.type === "video") {
                        return (
                            <VideoPreview
                                preview={preview}
                                onRemove={props.onRemove}
                                zoom={props.zoom}
                                data={data}
                                idx={idx}
                                key={idx}
                                hasMany={listImage.length > 1 ? true : false}
                            />
                        );
                    }
                    return null;
                })}
            </ScrollContainer>
        </div>
    );
};
export default TestElement;
