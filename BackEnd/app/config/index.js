require('dotenv').config({ override: true });

const config = {
    app: {
        port: process.env.PORT || 5178
    },
    db: {
        connectionString: {
            user: process.env.USER,
            password: process.env.PASSWORD,
            server: process.env.SERVER,
            database: process.env.DATABASE,
            options: { encrypt: false, trustServerCertificate: true }
        }
    },
};
module.exports = config;