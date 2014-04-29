var _ = require("lodash");
var map = _.map;
var isEqual = _.isEqual;
var partial = _.partial;
var compose = _.compose;
var ms = require("../../modules/multi-select/multi-select");

var TagList = React.createClass({
  render: function () {
    var removeSelection = this.props.removeSelection;
    var tags = this.props.tags;

    var renderTag = function (tag, index) {
      var removeSelf = partial(removeSelection, index);

      return (
        <li className="ms-tag">
          { tag.value }
          <i className="glyphicon glyphicon-remove" onClick={removeSelf} >
          </i>
        </li> 
      );
    };

    var renderNoTags = function () {
      return <li className="ms-no-tag">no selections</li>;
    };

    return (
      <ul className="ms-tags">
        { tags.length ? map(tags, renderTag) : renderNoTags() }
      </ul>
    );
  }
});

var DropDown = React.createClass({
  render: function () {
    var options = this.props.options;
    var addSelection = this.props.addSelection;

    var renderOption = function (option, index) {
      var addSelf = partial(addSelection, option);

      return <li className="ms-match" onClick={addSelf}>{ option.value }</li>;
    };

    var renderNoOptions = function () {
      return <li className="ms-no-matches">no matches</li>;
    };

    return (
      <ul className="ms-dropdown">
        { options.length ? map(options, renderOption) : renderNoOptions() }
      </ul>
    );
  }
});

var MultiSelect = React.createClass({
  shouldComponentUpdate: function (nextProps) {
    return !isEqual(nextProps, this.props);
  },
  render: function () {
    var self = this;
    var widget = this.props.widget;
    var transact = this.props.transact;
    var addSelection = partial(transact, ms.addSelection);
    var addActiveSelection = partial(transact, ms.addActiveSelection);
    var removeSelection = partial(transact, ms.removeSelection);
    var removeLastSelection = partial(transact, ms.removeLastSelection);
    var updateSearch = partial(transact, ms.updateSearch);
    var focusIn = partial(transact, ms.focus, true);
    
    //wrap in timer to prevent focus event from firing before click
    var focusOut = function () {
      setTimeout(function () {
        transact(ms.focus, false);
      }, 100);
    };

    //used with the form input element
    var handleChange = function (event) {
      updateSearch(event.target.value);
    };

    //used to detect espace and enter keys
    var handleKeyUp = function (event) {
      if (event.keyCode === 13) addActiveSelection();
      else if (event.keyCode === 27) removeLastSelection();
    };

    var renderDropdown = function () {
      return <DropDown options={widget.matches} addSelection={addSelection} /> 
    };

    return (
      <div className="ms-wrapper">
        <TagList tags={widget.selections} removeSelection={removeSelection} />
        <input className="ms-input" 
          type="text"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          value={widget.search} 
          placeholder="Choose a game"
          onFocus={focusIn} 
          onBlur={focusOut} />
        { widget.focused ? renderDropdown() : null }
      </div>
    ); 
  }
});

module.exports = MultiSelect;
