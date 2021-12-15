const express = require( "express");
const expressEjsLayouts = require( "express-ejs-layouts");
const morgan = require( "morgan");
const { appTitle } = require( "./libs/environment.js");
const logger = require( "./libs/logger.js");
const cors = require( "cors");
const stream = require( "./libs/rotate-stream.js");
const authRoutes = require( "./routes/login.route.js");
const { statusCodes } = require( "./utils/status-codes.utils.js");
const compression = require( "compression");
const helmet = require( "helmet");
const debug = require( "debug");
const expressSession = require( 'express-session');
const cookieParser = require( "cookie-parser");
var SequelizeStore = require("connect-session-sequelize")(expressSession.Store);
const sequelize = require( "./libs/db.index.js");
// const express = require('express'),
// expressEjsLayouts = require('express-ejs-layouts'),
// morgan = require('morgon'),
// appTitle = require('./libs/environment.js')

const app = express();
const port = 5000;

const sess = {
  secret: 's3cret',
  cookie:{},
  saveUninitialized:false,
  resave:false,
  store: new SequelizeStore({
    db: sequelize,
  }),
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set("layout", "./layouts/full-width");
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(expressSession(sess));
// logger setup
app.use(
  morgan("combined", {
    stream,
    skip: (req, res) => {
      return res.statusCode < 400;
    },
  })
);
app.use(compression())
app.use(helmet());

app.locals.title = appTitle;

app.get("", (req, res) => {
  res.redirect("/views/login");
});

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  const timestamp = new Date();
  logger.error(
    `${timestamp.getDate()} ${timestamp.getMonth() + 1} ${timestamp.getFullYear()}`
  );
  logger.error(err.stack);
  res.status(statusCodes["Internal Server Error"]).send("Internal error");
});

app.listen(port, () => logger.info("App listening on port ", port));
