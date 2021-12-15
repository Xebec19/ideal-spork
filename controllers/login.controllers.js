const User = require("../models/users.model.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const statusCodes = require("../utils/status-codes.utils.js");
const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid parameters");
    }
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: ["email", "password", "first_name", "last_name"],
    });
    if (!user) {
      // throw new Error("No user found");
      res
        .status(statusCodes["Not Found"])
        .json({ message: "User not found" })
        .end();
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          throw new Error(err);
        }
        if (result) {
          res.status(statusCodes.OK).json(user).end();
        } else{
          res
            .status(statusCodes["Precondition Failed"])
            .json({ message: "Invalid password" })
            .end();
        }
      });
    }
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = login;
