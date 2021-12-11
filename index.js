import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";
import { appTitle } from "./libs/environment.js";
import logger from "./libs/logger.js";

import stream from "./libs/rotate-stream.js";
import authRoutes from "./routes/login.route.js";

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set("layout", "./layouts/full-width");
app.set("view engine", "ejs");

// logger setup
app.use(
  morgan("combined", {
    stream,
    skip: (req, res) => {
      return res.statusCode < 400;
    },
  })
);

app.locals.title = appTitle;

app.get("", (req, res) => {
  res.redirect("/views/login");
});

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(501).send("Internal error");
});

app.listen(port, () => logger.info("App listening on port ", port));
