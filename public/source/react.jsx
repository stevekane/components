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
      return (
        <li className="ms-no-tag">no selections</li> 
      ); 
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
    return (
      <ul className="ms-dropdown">
        <li className="ms-match active">Bobby</li>  
        <li className="ms-match">Timmy</li>  
        <li className="ms-match">Sally</li>  
        <li className="ms-match">Jamie</li>  
        <li className="ms-match">Brandon</li>  
      </ul>  
    );   
  }
});

var MultiSelect = React.createClass({
  shouldComponentUpdate: function (nextProps) {
    return !isEqual(nextProps, this.props);
  },
  render: function () {
    var widget = this.props.widget;
    var set = this.props.set
    var focusIn = compose(set, partial(ms.focus, widget, true));
    var focusOut = compose(set, partial(ms.focus, widget, false));
    var addSelection = compose(set, partial(ms.addSelection, widget));
    var addActiveSelection = compose(set, partial(ms.addSelection, widget));
    var removeSelection = compose(set, partial(ms.removeSelection, widget));
    var removeLastSelection = compose(set, partial(ms.removeLastSelection, widget));
    var updateSearch = compose(set, partial(ms.updateSearch, widget));
    var updateSearch = compose(set, partial(ms.updateSearch, widget));

    var renderDropdown = function () {
      return <DropDown options={widget.matches} addSelection={addSelection} /> 
    };

    return (
      <div className="ms-wrapper">
        <TagList tags={widget.selections} removeSelection={removeSelection} />
        <input className="ms-input" onFocus={focusIn} onBlur={focusOut} />
        { widget.focused ? renderDropdown() : null }
      </div>
    ); 
  }
});

module.exports = MultiSelect;
