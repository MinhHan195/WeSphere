import "./ImagePreview.css";
const ImagePreview = (props) => {
  const url = URL.createObjectURL(props.file);
  const key = props.idx;
  return (
    <div className="img-preview-container" key={props.file.name}>
      <button
        className="btn btn-secondary rounded-circle btn-custom-close"
        onClick={() => props.onRemove(key)}
      >
        <i className="bi bi-x-lg p-0 m-0 text-white"></i>
      </button>
      <img src={url} alt={`preview-${key}`} draggable="false" />
    </div>
  );
};
export default ImagePreview;
