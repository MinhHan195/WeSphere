const db = require('../../models');

class MovieRateRepository {
    constructor() {
        this.movieRate = db.movie_rate;
    }

    async rateMovie(userId, movie_id, rate) {
        try {
            // const query = "INSERT INTO movie_rate (movie_id, userId, rate) VALUES (@movie_id, @UserId, @rate)";
            // const result = await this.db.request()
            //     .input("movie_id", sql.VarChar, movie_id)
            //     .input("UserId", sql.VarChar, userId)
            //     .input("rate", sql.Int, rate)
            //     .query(query);
            // if (result.rowsAffected[0] === 1) {
            //     return true
            // }
            // return false
            const result = await this.movieRate.create({ movie_id: movie_id, userId: userId, rate: rate });
            return result.dataValues ? true : false;

        } catch (error) {
            throw new ApiError(500, "Error rating movie");
        }
    }
}
module.exports = MovieRateRepository;