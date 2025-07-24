import "./ImagePreview.css";
import React, { useState } from "react";
import ViewImage from "../../ViewImage/ViewImage";
const ImagePreview = (props) => {
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
      <div className={`img-preview-container --container-${key}`} key={key}>
        {props.preview ? (
          <button
            className="btn btn-secondary rounded-circle btn-custom-close"
            onClick={() => props.onRemove(key)}
          >
            <i className="bi bi-x-lg p-0 m-0 text-white"></i>
          </button>
        ) : null}

        <img
          className={`img-${key}`}
          src={url}
          alt={`preview-${key}`}
          draggable="false"
          onClick={handleZoomIn}
        />
      </div>
      {props.zoom ? (
        zoom ? (
          <ViewImage idx={key} handleZoomOut={handleZoomOut} url={url} />
        ) : null
      ) : null}
    </div>
  );
};
export default ImagePreview;
