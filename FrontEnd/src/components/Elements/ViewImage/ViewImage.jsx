import style from "./ViewImage.module.css";
const ViewImage = (props) => {
  const { idx, url, handleZoomOut } = props;
  return (
    <div className={style["zoom-container"]} onClick={handleZoomOut}>
      <div className="d-flex justify-content-center align-items-center">
        <img className={`img-${idx}`} src={url} alt={`preview-${idx}`} />
      </div>
    </div>
  );
};
export default ViewImage;
