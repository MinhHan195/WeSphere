const movieService = require("../services/movie.service");
const ObjectId = require('bson-objectid');
exports.rate = async (req, res, next) => {
    try {
        console.log(ObjectId().toString());
        const userId = req.user.UserId;
        const { movie_id, rate } = req.body;
        const result = await movieService.rate(userId, movie_id, rate);
        res.send({
            isError: !result,
            message: result ? "Gửi đánh giá thành công" : "Gửi đánh giá thất bại"
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getMovie = async (req, res, next) => {
    try {
        const movieId = req.params.movie_id;
        const movie = await movieService.getMovie(movieId);
        res.send({
            isError: !movie,
            data: movie
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}