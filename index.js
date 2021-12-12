import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";
import { appTitle } from "./libs/environment.js";
import logger from "./libs/logger.js";
import cors from "cors";
import stream from "./libs/rotate-stream.js";
import authRoutes from "./routes/login.route.js";
import { statusCodes } from "./utils/status-codes.utils.js";
import compression from "compression";
import helmet from "helmet";
import debug from "debug";
import expressValidator from 'express-validator'
import expressSession from 'express-session'
import cookieParser from "cookie-parser";
import * as sesspkg from 'connect-pg-simple';

const app = express();
const port = 5000;
export const _debug = debug("server"); // FIXME

const sess = {
  secret: 's3cret',
  cookie:{},
  saveUninitialized:false,
  resave:false,
  // store: new (sesspkg(session))({
  //   // Insert connect-pg-simple options here
  // }),
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
app.use(expressValidator());
app.use(expressSession(sess))
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
