import style from "./VideoPreview.module.css";
const VideoPreview = (props) => {
    const { hasMany } = props;
    const url = props.preview
        ? URL.createObjectURL(props.file)
        : props.data.url;
    const key = props.idx;
    return (
        <div>
            <div
                className={`${style.video_preview_container} --container-${key}`}
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

                <video
                    src={url}
                    controls
                    className={style.video}
                    style={hasMany ? { height: "100%" } : { width: "100%" }}
                />
            </div>
        </div>
    );
};
export default VideoPreview;
