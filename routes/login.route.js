import express from "express";
import { body, validationResult } from "express-validator";
import { login } from "../controllers/login.controllers.js";
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

export default route;
