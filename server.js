var express = require("express");
var ecstatic = require("ecstatic");
var _ = require("lodash");
var first = _.first;
var jade = require("jade");
var candidates = require("./candidates.json").candidates;
var ms = require('./modules/multi-select/multi-select');

var widget = ms.Widget({
  name: "server-ms",
  candidates: candidates,
  selections: first(candidates, 2),
  focused: true
});

var app = express();

app.engine("jade", jade.__express);
app.set("view engine", "jade");
app.set("views", __dirname + "/views");

app.get("/", function (req, res) {
  res.render("index", widget);
});

app.get("/timestamps", function (req, res) {
  res.render("timestamps");
});

app.use(ecstatic({root: __dirname + "/public"}));

app.listen(5000);
