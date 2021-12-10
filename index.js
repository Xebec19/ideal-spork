// const express = require("express");
// const expressLayouts = require("express-ejs-layouts");
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";

import stream from "./libs/rotate-stream.js";
import authRoutes from "./routes/login.route.js";

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set("layout", "./layouts/full-width");
app.set("view engine", "ejs");

// logger setup
app.use(
  morgan("combined", {
    stream,
    skip: (req, res) => {
      return res.statusCode < 400;
    },
  })
);

app.get("", (req, res) => {
  res.redirect("/auth/login");
});

app.use("/auth", authRoutes);

// app.get("/about", (req, res) => {
//   res.render("about", { title: "About Page", layout: "./layouts/sidebar" });
// });

app.use((err, req, res, next) => {
  console.error("\x1b[33m%s\x1b[0m", "error");
  console.error(err.stack);
  res.status(501).send("Internal error");
});

app.listen(port, () => console.log("App listening on port ", port));
