// Read existing notes from local storage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
  // if (notesJSON !== null) {
  //   return JSON.parse(notesJSON);
  // } else {
  //   return [];
  // }
};

// Save notes to the localstorage
const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate DOM elements
const generateNoteDOM = (note) => {
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

  delBtn.addEventListener("click", () => {
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

// Sort your notes be one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }
};

// Render application notes
const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

  document.querySelector("#notes").innerHTML = "";

  filteredNotes.forEach((note) => {
    const noteEl = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;
