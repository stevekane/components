var _ = require("lodash");
var map = _.map;
var isEqual = _.isEqual;
var partial = _.partial;
var bind = _.bind;
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
          wanker
          { tag.value }
          <i className="glyphicon glyphicon-remove" onClick={removeSelf} >
          </i>
        </li> 
      );
    };

    return <ul className="ms-tags">{ map(tags, renderTag) }</ul>
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

    return (
      <div className="ms-wrapper">
        <TagList tags={widget.selections} removeSelection={removeSelection} />
      </div>
    ); 
  }
});

module.exports = MultiSelect;
