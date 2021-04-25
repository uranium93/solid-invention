// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    host: '127.0.0.1',
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    port: Number(process.env.TEST_DB_PORT),
    dialect: 'postgres',
    host: '127.0.0.1',
  },
  production: {
    username: '*******',
    password: '*******',
    database: '*******',
    port: 0,
    host: '*******',
    dialect: 'postgres',
  },
};
