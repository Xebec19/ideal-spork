// import * as de from "dotenv";
const dotenv = require('dotenv').config();
if (dotenv.error) {
  console.error("Error occurred while setting dot env files : ", dotenv.error);
}

 const dbUser = process.env.DB_USER
 const dbHost = process.env.DB_HOST;
 const dbDatabase = process.env.DB_DATABASE;
 const dbPort = process.env.DB_PORT;
 const dbPassword = process.env.DB_PASSWORD;
 const jwtSecret = process.env.JWT_SECRET;
 const appTitle = process.env.APP_TITLE;

 module.exports = {dbUser,dbHost,dbDatabase,dbPort,dbPassword,jwtSecret,appTitle};