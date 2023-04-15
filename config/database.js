require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      useUTC: true,
    },
    logging: true,
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      useUTC: true,
    },
    logging: true,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      useUTC: true,
    },
    logging: true,
  },
};
