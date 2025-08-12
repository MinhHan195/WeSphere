import style from "./VideoPreview.module.css";
const VideoPreview = (props) => {
    const url = props.preview
        ? URL.createObjectURL(props.file)
        : props.data.url;
    const key = props.idx;
    return (
        <div>
            <div
                className={`${style.video_preview_container} --container-${key}`}
                key={key}
            >
                {props.preview ? (
                    <div
                        className={`rounded-circle ${style.btn_close_custom}`}
                        onClick={() => props.onRemove(key)}
                    >
                        <i className="bi bi-x-lg p-0 m-0 text-white"></i>
                    </div>
                ) : null}

                <video src={url} controls className={style.video} />
            </div>
        </div>
    );
};
export default VideoPreview;
