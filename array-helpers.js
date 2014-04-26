var _ = require('lodash');
var filter = _.filter;
//define helper pure functions.  because this is js local mutation is "ok"

//remove element from array at end
var removeFromEnd = function (array, item) {
  var newArray = copyArray(array); 
  newArray.pop();
  return newArray;
};

module.exports.removeFromEnd = removeFromEnd;
