import User from "../models/users.model.js";
import { validationResult } from "express-validator";

export const login = async(req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid parameters");
    }
    const { email, password } = req.body;
    const user = User.findOne({ where: email });
    res.status(201).json(user).end();
    return;
  } catch (error) {
    next(error);
  }
};
