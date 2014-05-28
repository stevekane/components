var types = require("./types");
var transactions = require("./transactions");

module.exports.Video = types.Video;
module.exports.Note = types.Note;
module.exports.NoteForm = types.NoteForm;

module.exports.addNote = transactions.addNote;
module.exports.removeNote = transactions.removeNote;
module.exports.updateNoteformContent = transactions.updateNoteformContent;
module.exports.updateNoteformType = transactions.updateNoteformType;
