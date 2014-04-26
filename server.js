var express = require("express");
var ecstatic = require("ecstatic");
var jade = require("jade");

var app = express();

app.engine("jade", jade.__express);
app.set("view engine", "jade");
app.set("views", __dirname + "/views");

app.get("/", function (req, res) {
  res.render("index");
});

app.use(ecstatic({root: __dirname + "/public"}));

app.listen(5000);
