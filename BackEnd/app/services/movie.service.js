const SQL = require("../utils/sqlserver.util");

const MovieRateRepository = require("../repository/movie_rate.repository");
exports.rate = async (userId, movie_id, rate) => {
    const movieRateRepository = new MovieRateRepository();
    const result = await movieRateRepository.rateMovie(userId, movie_id, rate);
    return result;
}

exports.getMovie = async (movieId) => {
    const MovieRepository = new movieRepository(SQL.client);
    const result = await MovieRepository.getMovie(movieId);
    return result;
}