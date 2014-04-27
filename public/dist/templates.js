Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers['forms-multiselect'] || (depth0 && depth0['forms-multiselect']),options={hash:{
    'candidates': ("candidates"),
    'name': ("games")
  },hashTypes:{'candidates': "ID",'name': "STRING"},hashContexts:{'candidates': depth0,'name': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "forms-multiselect", options))));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["components/forms-multiselect"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n<ul class=\"matches\">\n  ");
  stack1 = helpers.each.call(depth0, "widget.matches", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <li>");
  stack1 = helpers._triageMustache.call(depth0, "value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n  ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n  <li>no matches</li>\n  ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <li ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSelection", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n  ");
  return buffer;
  }

  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("search"),
    'enter': ("addSelection"),
    'update': ("updateSearch"),
    'focus': ("focus"),
    'unfocus': ("unfocus")
  },hashTypes:{'type': "STRING",'value': "ID",'enter': "STRING",'update': "STRING",'focus': "STRING",'unfocus': "STRING"},hashContexts:{'type': depth0,'value': depth0,'enter': depth0,'update': depth0,'focus': depth0,'unfocus': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n\n");
  stack1 = helpers._triageMustache.call(depth0, "widget.search", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "widget.focused", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<ul class=\"selections\">\n  ");
  stack1 = helpers.each.call(depth0, "widget.selections", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});