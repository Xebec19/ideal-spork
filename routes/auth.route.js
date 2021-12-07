const express = require("express");
const route = express.Router();

route.get("/", (req, res, next) => {
  // res.render("login");
  // res.redirect("/view/login");
});

module.exports = route;
