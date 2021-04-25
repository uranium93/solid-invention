// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const dbConfig = {
  dev: {
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
};

export default dbConfig;
