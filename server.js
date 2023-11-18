const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");
const methodOverride = require("method-override");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// view configuration to use ejs
app.set("view engine", "ejs"); /// this is we are setting which engine is we are gone use for our views
app.set("views", __dirname + "/views"); /// this is settings the path where all of our views will be stored

// configration of layout(base html files and public files)
app.use(methodOverride("_method"));
app.set("layout", "layouts/layout"); // this is saying that our base html or layout is find to layouts/layout
app.use(expressLayouts);
app.use(express.static("public")); // telling the expresss that where we put our public files

//database configuration

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("connected to mongo"));

// server configuration
app.listen(process.env.PORT || 3000);

// routing

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
