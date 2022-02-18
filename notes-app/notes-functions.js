// Read existing notes from local storage
const getSavedNotes = function () {
  const notesJSON = localStorage.getItem("notes");
  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

// Save notes to the localstorage
const saveNotes = function (notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove note from the list
const removeNote = function (id) {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate DOM elements
const generateNoteDOM = function (note) {
  // Note text title
  const textEl = document.createElement("a");
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.setAttribute("href", `/notes-app/edit.html#${note.id}`);

  // Note delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "x";

  delBtn.addEventListener("click", function () {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  // Note element div
  const noteEl = document.createElement("div");
  noteEl.appendChild(delBtn);
  noteEl.appendChild(textEl);

  return noteEl;
};

// Render application notes
const renderNotes = function (notes, filters) {
  const filteredNotes = notes.filter(function (note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  filteredNotes.forEach(function (note) {
    const noteEl = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};
