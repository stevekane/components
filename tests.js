var test = require('tape');
var _ = require('lodash');
var contains = _.contains;
var multiSelect = require('./multi-select');
var mutations = require('./functional-mutations');
var Candidate = multiSelect.Candidate;
var Widget = multiSelect.Widget;
var addSelection = multiSelect.addSelection;
var removeSelection = multiSelect.removeSelection;
var removeLastSelection = multiSelect.removeLastSelection;
var updateSearch = multiSelect.updateSearch;
var focus = multiSelect.focus;
var clearSearch = multiSelect.clearSearch;
var clearSelections = multiSelect.clearSelections;
var serialize = multiSelect.serialize;
var set = mutations.set;
var get = mutations.get;

var candidate1 = Candidate({id: 1, value: "Billy"});
var candidate2 = Candidate({id: 2, value: "Tommy"});
var candidate3 = Candidate({id: 3, value: "Jesse"});
var candidate4 = Candidate({id: 4, value: "Molly"});

var candidates = [
  candidate1,
  candidate2,
  candidate3,
  candidate4
];

var selections = [3, 4];

var ms = Widget({
  name: "friends",
  focused: true,
  search: "puppies",
  candidates: candidates,
  selections: selections
});

var nested = {
  person: {
    name: "Steven" 
  }
};

test("creating a Widget with search returns correct list of matches", function (t) {
  t.plan(2);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "ll",
    candidates: candidates,
    selections: selections
  });

  t.same(candidate1, widget.matches[0], "ll matches Billy");
  t.same(candidate4, widget.matches[1], "ll matches Molly");
});

test("creating Widget with empty search returns all candidates as matches", function (t) {
  t.plan(1);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selections: selections
  });

  t.same(widget.matches, candidates, "empty search returns all matches");
} );

test("addSelection adds provided id to selections if id in candidates", function (t) {
  t.plan(3);
  var withNewSelection = addSelection(ms, 2);
  var withoutNewSelection = addSelection(ms, 99);

  t.ok(contains(get(withNewSelection, "selections"), 2), "added selection");
  t.ok(!contains(get(withoutNewSelection, "selections"), 99), "didnt add selection");
  t.ok(ms !== withNewSelection, "addSelection returns new object");
});

test("removeSelection removes selection by id if found", function (t) {
  t.plan(2);
  var withoutSelection = removeSelection(ms, 3);

  t.ok(!contains(get(withoutSelection, "selections"), 3), "removed selection");
  t.ok(ms !== withoutSelection, "removeSelection returns new object");
});

test("removeLastSelection removes last selection", function (t) {
  t.plan(2);
  var withoutSelection = removeLastSelection(ms);

  t.ok(!contains(get(withoutSelection, "selections"), 4), "removed last selection");
  t.ok(ms !== withoutSelection, "removeSelection returns new object");
});

test("updateSearch returns widget with new search and matches values", function (t) {
  t.plan(4);
  var newSearch = updateSearch(ms, "ll");

  t.same(get(newSearch, "search"), "ll", "search updated correctly");
  t.same(candidate1, newSearch.matches[0], "ll matches Billy");
  t.same(candidate4, newSearch.matches[1], "ll matches Molly");
  t.ok(ms !== newSearch, "updateSearch returns new object");
});

test("focus changes the value of focus", function (t) {
  t.plan(3);
  var isntFocused = focus(ms, false);
  var isFocused = focus(ms, true);

  t.same(get(isntFocused, "focused"), false, "focused set to false");
  t.same(get(isFocused, "focused"), true, "focused set to true");
  t.ok(ms !== isntFocused, "focues returns new object");
});

test("clearSearch clears the search value and updates matches", function (t) {
  t.plan(3);
  var cleared = clearSearch(ms);

  t.same(get(cleared, "search"), "", "search was cleared");
  t.same(cleared.matches.length, 4, "empty search means all candidates are matches");
  t.ok(ms !== cleared, "clearSearch returns new object");
});

test("clearSelections clears selections array", function (t) {
  t.plan(2);
  var cleared = clearSelections(ms);

  t.ok(get(cleared, "selections").length === 0, "search was cleared");
  t.ok(ms !== cleared, "clearSelections returns new object");
});

test("serialize returns expanded candidates for selections", function (t) {
  t.plan(2);
  var candidates = serialize(ms);

  t.notEqual(candidate3, candidates[0], "serialize returns new data");
  t.notEqual(candidate4, candidates[1], "serialize returns new data");
});
