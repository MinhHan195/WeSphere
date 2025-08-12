const sql = require("mssql");

class LinkRepository {
    constructor(client) {
        this.db = client;
    }

    async getListLinks(username) {
        const query = "select * from links where username = @username";
        const result = await this.db.request()
            .input("username", sql.VarChar, username)
            .query(query);
        return result.recordset;
    }

    async createLink(link, username) {
        const query = "INSERT INTO links (username, title, url) VALUES (@username, @title, @url)";
        await this.db.request()
            .input("username", sql.VarChar, username)
            .input("title", sql.VarChar, link.title)
            .input("url", sql.VarChar, link.url)
            .query(query);
    }

    async updateLink(link) {
        const query = "UPDATE links SET title = @title, url = @url WHERE link_id = @linkId AND username = @username";
        await this.db.request()
            .input("linkId", sql.Int, link.link_id)
            .input("username", sql.VarChar, link.username)
            .input("title", sql.VarChar, link.title)
            .input("url", sql.VarChar, link.url)
            .query(query);
    }

}

module.exports = LinkRepository;