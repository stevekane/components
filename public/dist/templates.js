Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers['forms-multiselect'] || (depth0 && depth0['forms-multiselect']),options={hash:{
    'classNames': ("ms-wrapper"),
    'candidates': ("candidates"),
    'placeholder': ("Choose a game"),
    'values': ("games"),
    'name': ("games")
  },hashTypes:{'classNames': "STRING",'candidates': "ID",'placeholder': "STRING",'values': "ID",'name': "STRING"},hashContexts:{'classNames': depth0,'candidates': depth0,'placeholder': depth0,'values': depth0,'name': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "forms-multiselect", options))));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["components/forms-multiselect"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <li class=\"ms-tag\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <i class=\"glyphicon glyphicon-remove\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSelection", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push("></i>\n  </li>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n  <li class=\"ms-no-tag\">no selections</li>\n  ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers.each.call(depth0, "matches", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <li ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ms-match active")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSelection", "match", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n      ");
  stack1 = helpers._triageMustache.call(depth0, "match.value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </li>\n    ");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\n    <li class=\"ms-no-matches\">no matches</li>\n    ");
  }

  data.buffer.push("<ul class=\"ms-tags\">\n  ");
  stack1 = helpers.each.call(depth0, "widget.selections", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n\n");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'classNames': ("ms-input"),
    'type': ("text"),
    'value': ("search"),
    'placeholder': ("placeholder"),
    'enter': ("addActiveSelection"),
    'escape-press': ("removeLastSelection"),
    'update': ("updateSearch")
  },hashTypes:{'classNames': "STRING",'type': "STRING",'value': "ID",'placeholder': "ID",'enter': "STRING",'escape-press': "STRING",'update': "STRING"},hashContexts:{'classNames': depth0,'type': depth0,'value': depth0,'placeholder': depth0,'enter': depth0,'escape-press': depth0,'update': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n\n  <ul class=\"ms-dropdown\">\n  ");
  stack1 = helpers['if'].call(depth0, "widget.focused", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>\n");
  return buffer;
  
});