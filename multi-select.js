var _ = require("lodash");
var cloneDeep = _.cloneDeep;
var clone = _.clone;
var extend = _.extend;
var pluck = _.pluck;
var contains = _.contains;
var initial = _.initial;
var reduce = _.reduce;
var filter = _.filter;

//internal function used to correctly copy the Widget with new params
//Widget, Object -> Widget
var set = function (widget, updates) {
  var propertyBlend = extend(cloneDeep(widget), cloneDeep(updates));
  return Widget(propertyBlend);
};

//helper used to calculate which candidates are matches based on string
var calculateMatches = function (string, candidates) {
  return reduce(candidates, function (matches, candidate) {
    return candidate.value.indexOf(string) > -1 
      ? matches.concat(clone(candidate))
      : matches;
  }, []);
};

//bounds selectionIndex by 0 and the size of the candidates
//Int, Int -> Int
var calculateSelectionIndex = function (length, selectionIndex) {
  if (!selectionIndex) return 0;
  else if (selectionIndex <= 0) return 0;
  else if (selectionIndex >= length) return length - 1;
  else return selectionIndex;
};

//Struct definition.  No member functions/methods
//Object -> Object
var Candidate = function Candidate (props) {
  if (!(this instanceof Candidate)) return new Candidate(props);
  if (!props.id) throw new Error("Must provide id");  

  this.id = props.id;
  this.value = props.value || this.id;
  return this;
};

//Struct definition.  No member functions/methods
//Object -> Object
var Widget = function Widget (props) {
  if (!(this instanceof Widget)) return new Widget(props);

  this.name = props.name;
  this.focused = props.focused || false;
  this.search = props.search || "";
  this.candidates = props.candidates || [];
  this.matches = calculateMatches(this.search, this.candidates);
  this.selections = props.selections || [];
  this.selectionIndex = calculateSelectionIndex(
    this.matches.length, 
    props.selectionIndex || 0
  );
  return this;
};

//Widget, id -> Widget
var addSelection = function (widget, candidate) {
  var isValidSelection = contains(widget.candidates, candidate);
  var selections = isValidSelection 
    ? widget.selections.concat(candidate)
    : widget.selections;

  return set(widget, {selections: selections});
};

//Widget, id -> Widget
var removeSelection = function (widget, candidate) {
  var selections = filter(widget.selections, function (selection) {
    return candidate.id !== selection.id; 
  });

  return set(widget, {selections: selections});
};

//Widget -> Widget
var removeLastSelection = function (widget) {
  var selections = _.initial(widget.selections);  

  return set(widget, {selections: selections});
};

//Widget -> Widget
var incrementSelectionIndex = function (widget) {
  return set(widget, {selectionIndex: widget.selectionIndex + 1});
};

//Widget -> Widget
var decrementSelectionIndex = function (widget) {
  return set(widget, {selectionIndex: widget.selectionIndex - 1});
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
module.exports.incrementSelectionIndex = incrementSelectionIndex;
module.exports.decrementSelectionIndex = decrementSelectionIndex;
module.exports.updateSearch = updateSearch;
module.exports.focus = focus;
module.exports.clearSearch = clearSearch;
module.exports.clearSelections = clearSelections;
module.exports.serialize = serialize;
module.exports.set = set;
