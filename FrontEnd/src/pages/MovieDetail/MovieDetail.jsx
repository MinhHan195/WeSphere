import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Feed from "../../components/Elements/Feed/Feed";
import MovieRatingModal from "../../components/Elements/Modal/MovieRatingModal/MovieRatingModal";
import { useDispatch } from "react-redux";
import style from "./MovieDetail.module.css";
import { useState } from "react";
import { setAlert, setLoading } from "../../redux/authSlide";
import { $api } from "../../services/service";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const MovieDetail = () => {
    const movie_id = useParams().movie_id;
    const [listMyFeeds, setListMyFeeds] = useState([]);
    const [movie, setMovie] = useState({});
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const fetchMovieData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.movie.getMovie(movie_id);
            if (!res.isError) {
                setMovie(res.data);
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error?.errors.exceptionMessage ?? error.message,
                })
            );
        }
    };

    useEffect(() => {
        fetchMovieData();
    }, [movie_id]);

    const fetchData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getListFeedsByUserId();
            if (!res.isError) {
                setListMyFeeds(res.data);
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error?.errors.exceptionMessage ?? error.message,
                })
            );
        }
    };

    function isoToDurationHM() {
        const date = new Date(movie.duration);

        const hours = date.getUTCHours(); // UTC vì chuỗi có 'Z'
        const minutes = date.getUTCMinutes();

        let result = [];
        if (hours) result.push(`${hours} giờ`);
        if (minutes) result.push(`${minutes} phút`);

        return result.join(" ");
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <DefaultLayout>
            <div className={style.background}>
                <div className={style.header}>
                    <button>
                        <i className="bi bi-arrow-left me-2"></i>
                    </button>
                    <h5 className="fw-bold">Chi tiết phim</h5>
                </div>

                <div className={`${style.dialog} rounded-4 shadow`}>
                    <div className="container my-4">
                        <div className="row">
                            <div className="col-6">
                                <div className="rounded-3 overflow-hidden">
                                    <img
                                        src={movie.poster}
                                        alt="Poster phim"
                                        className={` ${style.poster}`}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <h2>{movie.title}</h2>
                                <p>
                                    <strong>Thể loại:</strong> {movie.category}
                                </p>
                                <p>
                                    <strong>Giới thiệu:</strong>{" "}
                                    {movie.description}
                                </p>
                                <p>
                                    <strong>Đạo diễn:</strong> {movie.actor}
                                </p>
                                <p>
                                    <strong>Thời lượng:</strong>{" "}
                                    {isoToDurationHM()}
                                </p>
                                <p className="rating">⭐⭐⭐⭐☆ (8.2/10)</p>
                                <button className="btn btn-primary me-2">
                                    🎥 Xem Trailer
                                </button>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => setShowModal(true)}
                                >
                                    ⭐ Đánh giá
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.feed} mt-3`}>
                    {listMyFeeds.length > 0
                        ? listMyFeeds.map((feed, idx) => {
                              return (
                                  <div
                                      className={`card mb-4 shadow-sm rounded-4 py-4 w-100 ${style.feed_card_item}`}
                                      key={feed.feed.id}
                                  >
                                      <Feed data={feed} key={idx} idx={idx} />
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
            {showModal ? (
                <MovieRatingModal
                    show={showModal}
                    close={() => setShowModal(false)}
                    movie={movie}
                />
            ) : null}
        </DefaultLayout>
    );
};
export default MovieDetail;
