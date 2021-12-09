import express from "express";
import { body } from "express-validator";
const route = express.Router();

route.get("/login", (req, res, next) => {
  try {
    res.render("login");
    return;
  } catch (error) {
    next(error);
  }
});

route.post(
  "/login",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Invalid parameters");
      }
    } catch (error) {
      next(error);
    }
  }
);

export default route;
