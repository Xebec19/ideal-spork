const express = require( "express");
const expressEjsLayouts = require( "express-ejs-layouts");
const { morganMiddleware } = require('./libs/morgan');
const logger = require( "./libs/logger.js");
const cors = require( "cors");
const stream = require( "./libs/rotate-stream.js");
const { statusCodes } = require( "./utils/status-codes.utils.js");
const expressSession = require( 'express-session');
var SequelizeStore = require("connect-session-sequelize")(expressSession.Store);
const sequelize = require( "./libs/db.index.js");
const flash = require('req-flash');

const { appTitle,sessionSecret } = require( "./libs/environment.js");
const authRoutes = require( "./routes/login.route.js");
const userRoutes = require("./routes/user.route.js");

const app = express();
const port = 5000;

const sess = {
  secret: `${sessionSecret}`,
  cookie:{},
  saveUninitialized:false,
  resave:false,
  // store: new SequelizeStore({
  //   db: sequelize,
  // }),
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set("layout", "./layouts/full-width");
app.set("view engine", "ejs");
app.use(expressSession(sess));
app.use(flash());
app.use(morganMiddleware);

app.locals.title = appTitle;
app.locals.errors = flash;
app.locals.baseUrlPrefix = '';
app.get("", (req, res) => {
  res.redirect("/auth/login");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  const timestamp = new Date();
  logger.error(
    `${timestamp.getDate()} ${timestamp.getMonth() + 1} ${timestamp.getFullYear()}`
  );
  logger.error(err.stack);
  res.status(statusCodes["Internal Server Error"]).json({message:'error'}).end();
});

app.listen(port, () => logger.info(`App listening on port ${port}`, port));
