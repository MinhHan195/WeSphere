import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Feed from "../../components/Elements/Feed/Feed";
import MovieRatingModal from "../../components/Elements/Modal/MovieRatingModal/MovieRatingModal";
import { useDispatch } from "react-redux";
import style from "./MovieDetail.module.css";
import { useState } from "react";
import { setAlert, setLoading } from "../../redux/authSlide";
import { $api } from "../../services/service";
import { useEffect } from "react";
const MovieDetail = () => {
    const [listMyFeeds, setListMyFeeds] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const dispatch = useDispatch();

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
                                        src="https://static.nutscdn.com/vimg/300-0/68757d6484424e994701bbb562aff7a0.jpg"
                                        alt="Poster phim"
                                        className={` ${style.poster}`}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <h2>Phong Thần 2: Chiến Hỏa Tây Kỳ</h2>
                                <p>
                                    <strong>Thể loại:</strong> Hành động, Phiêu
                                    lưu
                                </p>
                                <p>
                                    <strong>Giới thiệu:</strong> Thái sư Văn
                                    Trọng trinh chiến nhiều năm ở xa trở về giữa
                                    lúc Triều Ca loạn lạc mang theo Đặng Trung,
                                    Tân Hoàn, Trương Tiết, Đào Vinh. Cùng lúc
                                    đó, Cơ Phát khởi quân cùng sự giúp đỡ của
                                    Khương Tử Nha và những vị thần Núi Côn Luân
                                </p>
                                <p>
                                    <strong>Đạo diễn:</strong> John Doe
                                </p>
                                <p>
                                    <strong>Thời lượng:</strong> 120 phút
                                </p>
                                <p className="rating">⭐⭐⭐⭐☆ (8.2/10)</p>
                                <button className="btn btn-primary me-2">
                                    🎥 Xem Trailer
                                </button>
                                <button className="btn btn-warning">
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
                    handleClose={() => setShowModal(false)}
                    movieTitle="Phong Thần 2: Chiến Hỏa Tây Kỳ"
                    // onSubmit={handleRatingSubmit}
                />
            ) : null}
        </DefaultLayout>
    );
};
export default MovieDetail;
