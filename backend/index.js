const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const indexRouter = require('./routes/index');
const bodyParser = require("body-parser");

const app = express();

const corsOptions = { origin: "*" };
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
app.use(indexRouter);

app.get("/", (req, res) => {
  res.send("Hello to the api");
});
app.listen(3000, () => console.log(`app listening on port 3000...`));

module.exports = db;