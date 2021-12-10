import { Sequelize } from "sequelize";
import {
  dbUser,
  dbHost,
  dbDatabase,
  dbPort,
  dbPassword,
  jwtSecret,
} from "./environment";
const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
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

export default sequelize;
