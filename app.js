const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(expressLayouts);
app.set("layout", "./layouts/full-width");
app.set("view engine", "ejs");

// set up static routes
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/javascript"));

// templates
app.get("/", (req, res, next) => {
  try {
    res.redirect("/view/login");
  } catch (error) {
    next(error);
  }
});

app.use("/views", require("./routes/views.route"));

// routes
app.use("/auth");

// error handler
app.use(function (err, req, res, next) {
  console.error("--error ", err.stack);
  res.render;
});
module.exports = app;
