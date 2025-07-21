import "./VideoPreview.css";
const VideoPreview = (props) => {
  const url = URL.createObjectURL(props.file);
  return (
    <div className="video-preview-container" key={props.file.name}>
      <video
        src={url}
        controls
        style={{
          maxWidth: "100%",
          maxHeight: "180px",
          marginRight: 8,
          borderRadius: 8,
        }}
      />
    </div>
  );
};
export default VideoPreview;
