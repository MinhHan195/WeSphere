const ApiError = require("../api-error");
const ObjectId = require('bson-objectid');
const sql = require("mssql");
class MovieRepository {
    constructor(client) {
        this.db = client;
    }

    async rateMovie(userId, movie_id, rate) {
        try {
            const query = "INSERT INTO movie_rate (movie_id, userId, rate) VALUES (@movie_id, @UserId, @rate)";
            const result = await this.db.request()
                .input("movie_id", sql.VarChar, movie_id)
                .input("UserId", sql.VarChar, userId)
                .input("rate", sql.Int, rate)
                .query(query);
            if (result.rowsAffected[0] === 1) {
                return true
            }
            return false
        } catch (error) {
            throw new ApiError(500, "Error rating movie");
        }
    }

    async getMovie(movieId) {
        try {
            const query = "select * from movie where id = @id";
            const result = await this.db.request()
                .input("id", sql.VarChar, movieId)
                .query(query);
            return result.recordset[0];
        } catch (error) {
            throw new ApiError(500, "Error getting movie");
        }
    }
}

module.exports = MovieRepository;