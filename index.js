const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const supportRoute = require("./controller/supportRoute");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://test:12345@cluster0.w7cuatz.mongodb.net/test");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var db = mongoose.connection;
db.on("open", () => {
  console.log("Connected to DB");
});
db.on("error", () => {
  console.log("Error occured");
});

app.use("/supportRoute", supportRoute);
app.listen(4000, () => {
  console.log("Server started at 4000");
});
