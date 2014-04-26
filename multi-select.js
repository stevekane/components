var _ = require("lodash");
var cloneDeep = _.cloneDeep;
var pluck = _.pluck;
var contains = _.contains;
var without = _.without;
var initial = _.initial;
var mutations = require('./functional-mutations');
var helpers = require('./array-helpers');
var get = mutations.get;
var set = mutations.set;

//Struct definition.  No member functions/methods
var Candidate = function Candidate (props) {
  if (!(this instanceof Candidate)) return new Candidate(props);
  if (!props.id) throw new Error("Must provide id");  
  if (!props.name) throw new Error("Must provide name");  

  this.id = props.id;
  this.name = props.name;
  this.content = props.content || props.name;
  return this;
};

//Struct definition.  No member functions/methods
var Widget = function Widget (props) {
  if (!(this instanceof Widget)) return new Widget(props);
  if (props.focused === undefined) throw new Error("Must provide focused boolean");

  this.name = props.name;
  this.focused = props.focused;
  this.search = props.search || "";
  this.candidates = props.candidates || [];
  this.selections = props.selections || [];
  return this;
};

//Widget, id -> Widget
var addSelection = function (widget, selectionId) {
  var candidateIds = pluck(widget.candidates, "id")
  var isValidSelection = contains(candidateIds, selectionId)
  var selections = isValidSelection 
    ? widget.selections.concat(selectionId)
    : cloneDeep(widget.selections);

  return set(widget, {selections: selections});
};

//Widget, id -> Widget
var removeSelection = function (widget, selectionId) {
  var selections = without(widget.selections, selectionId);

  return set(widget, {selections: selections});
};

//Widget -> Widget
var removeLastSelection = function (widget) {
  var selections = _.initial(widget.selections);  

  return set(widget, {selections: selections});
};

//Widget, String -> Widget
var updateSearch = function (widget, search) {
  return set(widget, {search: search});
};

//Widget, Boolean -> Widget
var focus = function (widget, focused) {
  return set(widget, {focused: focused});
};

//Widget -> Widget
var clearSearch = function (widget) {
  return set(widget, {search: ""});
};

//Widget -> Widget
var clearSelections = function (widget) {
  return set(widget, {selections: []});
};

//Widget -> [Candidates]
var serialize = function (widget) {
  var candidates = reduce(widget.candidates, function (candidate) {
    return contains(widget.selections, candidate.id);
  });
  return cloneDeep(candidates);
};

module.exports.Candidate = Candidate;
module.exports.Widget = Widget;
module.exports.addSelection = addSelection;
module.exports.removeSelection = removeSelection;
module.exports.removeLastSelection = removeLastSelection;
module.exports.updateSearch = updateSearch;
module.exports.focus = focus;
module.exports.clearSearch = clearSearch;
module.exports.clearSelections = clearSelections;
module.exports.serialize = serialize;
