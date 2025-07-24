import "./VideoPreview.css";
const VideoPreview = (props) => {
  const url = props.preview ? URL.createObjectURL(props.file) : props.data.url;
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
