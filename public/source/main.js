var emberApp = require("./ember");
var ReactApp = require("./react");
var backboneApp = require("./backbone");

emberApp.reopen({
  rootElement: "#ember"
});
emberApp.advanceReadiness();
