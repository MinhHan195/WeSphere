const SQL = require("../utils/sqlserver.util");

const movieRepository = require("../repository/movie.repository");
exports.rate = async (userId, movie_id, rate) => {
    const MovieRepository = new movieRepository(SQL.client);
    const result = await MovieRepository.rateMovie(userId, movie_id, rate);
    return result;
}

exports.getMovie = async (movieId) => {
    const MovieRepository = new movieRepository(SQL.client);
    const result = await MovieRepository.getMovie(movieId);
    return result;
}