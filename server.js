const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv/config");
const cors = require("cors");
const api = process.env.API_URL;
const errorHandler = require("./HELPERS/error-handler");
const cookieParser = require("cookie-parser");
const cookieAuthentication = require("./HELPERS/cookieAuth");
//ROUTE DEFINITION
const userRouter = require("./ROUTES/userRoute");
const tableRouter = require("./ROUTES/table2");
const seatArrangementRouter = require("./ROUTES/seatArr2");

//MIDDLEWEAR
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//app.use(authJwt());
app.use(cookieParser());
app.use(errorHandler);

//ROUTES
app.use(`${api}/userRoute`, userRouter);
app.use(`${api}/tableRoute`, cookieAuthentication, tableRouter);
app.use(
  `${api}/seatArrangementRoute`,
  cookieAuthentication,
  seatArrangementRouter
);

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.CONNECTION_STRING) //call mongoose.connect and pass connection string as parameter
    .then(() => {
      console.log("EVENT SEATING DATABASE CONNECTION IS READY");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = app;
