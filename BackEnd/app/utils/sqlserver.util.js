const sql = require('mssql');

class SQL {
    static connect = async (connectionString) => {
        if (this.client) return this.client;
        this.client = await sql.connect(connectionString)
        return this.client;
    };
}

module.exports = SQL;