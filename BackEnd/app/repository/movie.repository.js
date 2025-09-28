const ApiError = require("../api-error");
const db = require('../../models');
class MovieRepository {
    constructor(client) {
        this.movie = db.movie;
    }

    async getMovie(movieId) {
        try {
            const result = await this.movie.findAll({ where: { id: movieId } });
            return result.length > 0 ? result[0].dataValues : null;
        } catch (error) {
            throw new ApiError(500, "Error getting movie");
        }
    }
}

module.exports = MovieRepository;