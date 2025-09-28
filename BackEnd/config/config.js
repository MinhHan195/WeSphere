require('dotenv').config({ override: true });

module.exports = {
    development: {
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        dialectOptions: {
            options: {
                encrypt: false
            }
        },
        logging: false
    }

}