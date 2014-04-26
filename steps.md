#Define your design goals

#List all events and their intended behaviors

#Construct data structures for your component

#Build your data transformations as pure functions

#Use your data transformations as a module within your framework


#Examples

##Multi-select input with tags

###Design goals
Multi-select widgets provided by basic HTML are clumsy to use and offer very
little to keyboard users.  The time spent changing "selection paradigms" from
text inputs is considerable and adds up when you are entering a lot of data.

We would like to be able to use a "search" input to search through a list of
options and select them by hitting enter.  When enter is pressed, the currently
selected option should be added to a list of selections.  To delete a selection,
the user will click an icon on the tag representing that selection.

We may want to extend or enhance the features of this widget to include even
more keyboard interactions in the future.

###List all events and their intended behaviors

1. Type into the text input to change list of filtered elements.  Top element
should always be the closest match.
2. When the element is not focused the list of options should not be visible
3. When the enter key is pressed, the top selection of the list should be added
to the list of selections.
4. When a tag's "X" is clicked, it should be removed from the list.
5. When the escape key is pressed it should remove the last selection.

###Construct data structures for your component
Candidate
  id
  name
  content

Widget
  name: (optional) String
  focused: Boolean
  search: String
  candidates: [Candidate]
  selections: [Candidate.id]
