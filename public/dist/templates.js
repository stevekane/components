Ember.TEMPLATES["components/forms-multiselect"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n<ul class=\"selections\">\n  ");
  stack1 = helpers.each.call(depth0, "widget.selections", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers._triageMustache.call(depth0, "id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n    <li>no selections</li>\n  ");
  }

  data.buffer.push(escapeExpression((helper = helpers['forms-input'] || (depth0 && depth0['forms-input']),options={hash:{
    'value': ("widget.search"),
    'action': ("addSelection"),
    'focus': ("focus"),
    'unfocus': ("unfocus")
  },hashTypes:{'value': "ID",'action': "STRING",'focus': "STRING",'unfocus': "STRING"},hashContexts:{'value': depth0,'action': depth0,'focus': depth0,'unfocus': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "forms-input", options))));
  data.buffer.push("\n\n");
  stack1 = helpers._triageMustache.call(depth0, "widget.search", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "widget.focused", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});