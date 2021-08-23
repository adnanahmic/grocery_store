const result = require('dotenv').config({path : __dirname + `/.env.${process.env.NODE_ENV.trim()}`});

module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY
};