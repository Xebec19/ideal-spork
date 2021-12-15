const { Sequelize } = require("sequelize");
const {
  dbUser,
  dbHost,
  dbDatabase,
  dbPort,
  dbPassword,
  jwtSecret,
} = require("./environment.js");
const logger = require("./logger.js");
const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  logging: msg => logger.info(msg)
});

sequelize
  .authenticate()
  .then((_res) => {
    console.info("Database connected successfully");
  })
  .catch((_error) => {
    console.error("Error while connecting to database");
    console.error(_error);
  });

module.exports = sequelize;
