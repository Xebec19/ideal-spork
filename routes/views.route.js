const express = require("express");

const route = express.Router();

route.get("/login", (req, res, next) => {
  try {
    res.render("login").end();
  } catch (error) {
    next(error);
  }
});

module.exports = route;
