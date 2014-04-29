#Object wrapper

##Design goals
```object-wrapper``` is a simple POJO wrapper that
exposes getters and setters that operate on string
paths which in turn perform mutations on an inner 
object which is "hidden" from the end user.

The getter methods for ```object-wrapper``` return 
new Object-wrappers which encode a relative path to
the root of this object-wrappers tree within the larger
Object-wrapper.  This is shown below:

var tree = {
  user: {
    name: "Jean Rottenberries",
    email: "jean@gmail.com"
  }
}

var wrappedTree = Wrap(tree);

var user = wrappedTree.get("user");

set(user, "name", "Gene Roddenberry");

//tree is mutated as shown below

get(tree, "user.name") //"Gene Roddenberry"
get(user, "name") //"Gene Roddenberry"
