const express = require("express");
const { body } = require("express-validator");
const { authGaurd } = require("../utils/auth-gaurd.utils");
const route = express.Router();

route.use(authGaurd);
route.all("/dashboard", (req, res, next) => {
  try {
    res.render("dashboard",{layout:"./layouts/sidebar"});
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = route;