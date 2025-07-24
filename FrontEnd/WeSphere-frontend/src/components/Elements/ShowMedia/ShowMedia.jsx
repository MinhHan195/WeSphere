import React from "react";
import "dragscroll";

import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

import ImagePreview from "../PreviewContainer/ImagePreview/ImagePreview";
import VideoPreview from "../PreviewContainer/VideoPreview/VideoPreview";
const TestElement = (props) => {
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
