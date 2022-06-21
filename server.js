const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const routes = require("./routes/routes");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 9000;
// const mongoString = process.env.DATABASE_URL;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    AccessControlAllowOrigin: "*",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});

module.exports = app;
