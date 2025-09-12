const { Sequelize } = require('sequelize');
require('dotenv').config({ override: true });


class SQL {
    static connect = async () => {
        if (this.sequelize) return this.sequelize;
        this.sequelize = new Sequelize(
            process.env.DATABASE,
            process.env.USER,
            process.env.PASSWORD,
            {
                host: process.env.HOST,
                dialect: process.env.DIALECT,
                dialectOptions: {
                    options: {
                        encrypt: false
                    }
                },
                logging: false
            }
        );
        return this.sequelize;
    };
}

module.exports = SQL;