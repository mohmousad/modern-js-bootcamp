// Get note id from the url
const noteId = location.hash.substring(1);

// Read the notes saved in the local sotrage
const notes = getSavedNotes();

// Find the note that match the id in the url
const note = notes.find(function (note) {
  return note.id === noteId;
});

// Check if the id in url isn't valid
if (note === undefined) {
  location.assign("/notes-app/index.html");
}

// Note title read and write functions
const titleElement = document.querySelector("#note-title");
titleElement.value = note.title;
titleElement.addEventListener("input", function (e) {
  note.title = e.target.value;
  saveNotes(notes);
});

// Note body read and write functions
const bodyElement = document.querySelector("#note-body");
bodyElement.value = note.body;
bodyElement.addEventListener("input", function (e) {
  note.body = e.target.value;
  saveNotes(notes);
});

// Remove note
const removeElement = document.querySelector("#remove-note");
removeElement.addEventListener("click", function () {
  removeNote(noteId);
  saveNotes(notes);
  location.assign("/notes-app/index.html");
});
