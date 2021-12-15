const express = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/login.controllers.js");
const route = express.Router();

route.all("/login", (req, res, next) => {
  try {
    res.render("login");
    return;
  } catch (error) {
    next(error);
  }
});

route.post(
  "/check-user",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString(),
  (req, res, next) => login(req, res, next)
);

module.exports = route;
