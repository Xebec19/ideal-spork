// import sequelize from "../libs/db.index.js";
const sequelize = require('../libs/db.index');
//import pkg from "sequelize";
const { DataTypes } = require('sequelize');
const User = sequelize.define(
  "User",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_on: {
      type: DataTypes.DATE,
    },
    updated_on: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    access: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "bazaar_users",
    timestamps: true,
    createdAt: "created_on",
    updatedAt: "updated_on",
    // indexes: "user_id",
  }
);

module.exports = User;
