import React, { useState } from "react";
import style from "./MovieRatingModal.module.css";
const MovieRatingModal = ({ show, handleClose, movieTitle, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    const handleRatingClick = (star) => {
        setRating(star);
    };

    const handleFormSubmit = () => {
        if (rating === 0) {
            alert("Vui lòng chọn số sao trước khi gửi!");
            return;
        }
        onSubmit({ rating, comment });
        setRating(0);
        setComment("");
        handleClose();
    };

    return (
        <div className={style.background}>
            <div className={`${style.dialog} rounded-4 shadow`}>
                <div className="py-3">
                    <h5 className="fw-bold text-center">{movieTitle}</h5>
                </div>
                <div>
                    <p className="text-center text-secondary">
                        Hãy đánh giá dựa trên trải nghiệm của người dùng
                    </p>
                </div>
                <div className="w-100 pt-3">
                    <p className="rating text-center fs-3">
                        ⭐⭐⭐⭐☆ (8.2/10)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieRatingModal;
