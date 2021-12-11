import express from "express";
import { body, validationResult } from "express-validator";
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
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Invalid parameters");
      }
      const { email, password } = req.body;
      
      res.status(201).json({ message: "Hello" }).end();
      return;
    } catch (error) {
      next(error);
    }
  }
);

export default route;
