const express = require("express");

const route = express.Router();

route.get("/login", (req, res, next) => {
  try {
    console.log("display login");
    res.render("login");
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = route;
