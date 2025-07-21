import React, { useRef, useState, useEffect } from "react";
import ImagePreview from "./ImagePreview/ImagePreview";
import VideoPreview from "./VideoPreview/VideoPreview";
import "./PreviewContainer.css";
const PreviewContainer = (props) => {
  const listImage = props.listImage;
  const previewRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragMoved(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) / 7;
    if (Math.abs(walk) > 5) setDragMoved(true);
    setTranslateX((prev) => {
      const previewWidth = previewRef.current
        ? previewRef.current.offsetWidth
        : 0;
      if (listImage.length * 210 < previewWidth) return 0;
      const maxTranslate = 0;
      const minTranslate = -(listImage.length * 210 - previewWidth);
      let next = prev + walk;
      if (next > maxTranslate) next = maxTranslate;
      if (next < minTranslate) next = minTranslate;
      return next;
    });
    document.querySelector(
      ".preview"
    ).style.transform = `translateX(${translateX}px)`;
    setStartX(x);
  };

  useEffect(() => {
    const handleWindowMouseUp = () => {
      setIsDragging(false);
      setDragMoved(false);
    };
    window.addEventListener("mouseup", handleWindowMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, []);

  const handleClick = (e) => {
    if (dragMoved) {
      console.log("click");
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  return (
    <div>
      <div className="preview-container">
        <div
          className="preview"
          ref={previewRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          {listImage.map((file, idx) => {
            if (file.type.startsWith("image/")) {
              return (
                <ImagePreview
                  onRemove={props.onRemove}
                  file={file}
                  idx={idx}
                  key={file.name}
                />
              );
            }
            if (file.type.startsWith("video/")) {
              return (
                <VideoPreview
                  onRemove={props.onRemove}
                  file={file}
                  idx={idx}
                  key={file.name}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
export default PreviewContainer;
