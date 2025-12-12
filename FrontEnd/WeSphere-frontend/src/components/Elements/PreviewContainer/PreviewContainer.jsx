import React from "react";
import ImagePreview from "./ImagePreview/ImagePreview";
import VideoPreview from "./VideoPreview/VideoPreview";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import "./PreviewContainer.css";
const PreviewContainer = (props) => {
    const { listImage, preview } = props;
    return (
        <div
            style={{
                minWidth: "100%",
                maxWidth: "679.4px",
                overflowX: "hidden",
                scrollbarWidth: "none",
            }}
        >
            <ScrollContainer
                style={{
                    display: "flex",
                    width: "100%",
                }}
            >
                {listImage.map((file, idx) => {
                    if (file instanceof File) {
                        if (file.type.startsWith("image/")) {
                            return (
                                <ImagePreview
                                    preview={preview}
                                    onRemove={props.onRemove}
                                    zoom={props.zoom}
                                    isFile={true}
                                    file={file}
                                    idx={idx}
                                    key={file.name}
                                    hasMany={
                                        listImage.length > 1 ? true : false
                                    }
                                />
                            );
                        }
                        if (file.type.startsWith("video/")) {
                            return (
                                <VideoPreview
                                    preview={preview}
                                    onRemove={props.onRemove}
                                    zoom={props.zoom}
                                    isFile={true}
                                    file={file}
                                    idx={idx}
                                    key={file.name}
                                    hasMany={
                                        listImage.length > 1 ? true : false
                                    }
                                />
                            );
                        }
                    } else {
                        if (file.type === "image") {
                            return (
                                <ImagePreview
                                    preview={preview}
                                    onRemove={props.onRemove}
                                    zoom={props.zoom}
                                    isFile={false}
                                    data={file}
                                    idx={idx}
                                    key={idx}
                                />
                            );
                        }
                        if (file.type === "video") {
                            return (
                                <VideoPreview
                                    preview={preview}
                                    onRemove={props.onRemove}
                                    zoom={props.zoom}
                                    isFile={false}
                                    data={file}
                                    idx={idx}
                                    key={idx}
                                />
                            );
                        }
                    }

                    return null;
                })}
            </ScrollContainer>
        </div>
    );
};
export default PreviewContainer;
