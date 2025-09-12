import React, { useEffect, useState } from "react";
import style from "./MovieRatingModal.module.css";
import { $api } from "../../../../services/service";
const MovieRatingModal = ({ show, close, movie }) => {
    const [currentRating, setCurrentRating] = useState(0);
    const [ratingText, setRatingText] = useState("Nhấp vào sao để đánh giá");
    const [submitBtn, setSubmitBtn] = useState(true);
    const ratingMessages = {
        0: "Nhấp vào sao để đánh giá",
        1: "😞 Rất không hài lòng",
        2: "😐 Không hài lòng",
        3: "😊 Bình thường",
        4: "😃 Hài lòng",
        5: "🤩 Rất hài lòng",
    };

    function click(e) {
        // const submitBtn = document.getElementById("submitBtn");
        const rating = parseInt(e.target.dataset.rating);
        setCurrentRating(rating);
        highlightStars(rating);
        setRatingText(ratingMessages[rating]);
        setSubmitBtn(false);
        e.target.classList.add("clicked");
        setTimeout(() => {
            e.target.classList.remove("clicked");
        }, 300);
    }

    function mouseEnter(e) {
        highlightStars(e.target.dataset.rating, true);
    }
    function mouseLeave() {
        highlightStars(currentRating, true);
        setRatingText(ratingMessages[currentRating]);
    }

    function highlightStars(rating, isHover = false) {
        const stars = document.querySelectorAll(`.${style.star}`);
        stars.forEach((star, index) => {
            star.classList.remove(style.filled, style.hover);

            if (index < rating) {
                if (isHover && rating > currentRating) {
                    star.classList.add(style.hover);
                } else if (!isHover || rating <= currentRating) {
                    star.classList.add(style.filled);
                }
            }
        });

        if (isHover && rating > currentRating) {
            setRatingText(ratingMessages[rating]);
        } else if (!isHover) {
            setRatingText(ratingMessages[currentRating]);
        }
    }

    function closeModal() {
        const modalOverlay = document.getElementById("modalOverlay");
        modalOverlay.classList.remove(style.active);
        setTimeout(() => {
            close();
        }, 300);
        // document.body.style.overflow = "auto";
    }

    function closeModalCLickBackground(e) {
        const modalOverlay = document.getElementById("modalOverlay");
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove(style.active);
            setTimeout(() => {
                close();
            }, 300);
            // document.body.style.overflow = "auto";
        }
    }

    function openModal() {
        const modalOverlay = document.getElementById("modalOverlay");
        modalOverlay.classList.add(style.active);
        // document.body.style.overflow = "hidden";
        // // Reset modal
        // resetModal();
    }

    async function submit() {
        try {
            const data = {
                movie_id: movie.id,
                rate: currentRating,
            };
            const res = await $api.movie.rate(data);
            if (!res.isError) {
                const successMessage =
                    document.getElementById("successMessage");
                successMessage.style.display = "block";
                setTimeout(() => {
                    successMessage.style.display = "none";
                    closeModal();
                }, 2000);
            } else {
                console.error("Error submitting rating:", res.errors);
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    }

    useEffect(() => {
        if (show) {
            openModal();
        }
    }, [show]);

    return (
        <div
            className={`${style.modal_overlay} ${style.active}`}
            id="modalOverlay"
            onClick={closeModalCLickBackground}
        >
            <div className={style.modal_custom}>
                <button className={style.close_btn} onClick={closeModal}>
                    &times;
                </button>

                <h2 className={style.modal_title}>Đánh giá của bạn</h2>
                <p className={style.modal_subtitle}>
                    Hãy cho chúng tôi biết trải nghiệm của bạn như thế nào!
                </p>

                <div className={style.star_rating} id="starRating">
                    <span
                        className={style.star}
                        data-rating="1"
                        onClick={click}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    ></span>
                    <span
                        className={style.star}
                        data-rating="2"
                        onClick={click}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    ></span>
                    <span
                        className={style.star}
                        data-rating="3"
                        onClick={click}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    ></span>
                    <span
                        className={style.star}
                        data-rating="4"
                        onClick={click}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    ></span>
                    <span
                        className={style.star}
                        data-rating="5"
                        onClick={click}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    ></span>
                </div>

                <div className={style.rating_text} id="ratingText">
                    {ratingText}
                </div>

                <div className={style.success_message} id="successMessage">
                    ✅ Cảm ơn bạn đã đánh giá! Chúng tôi sẽ ghi nhận điểm số của
                    bạn.
                </div>

                <div className={style.modal_buttons}>
                    <button
                        className={`${style.btn} ${style.btn_secondary}`}
                        onClick={closeModal}
                    >
                        Hủy
                    </button>
                    <button
                        className={`${style.btn}  ${style.btn_primary}`}
                        id="submitBtn"
                        onClick={submit}
                        disabled={submitBtn}
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieRatingModal;
